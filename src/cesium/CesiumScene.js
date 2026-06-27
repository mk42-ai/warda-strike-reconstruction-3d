// ============================================================================
//  CesiumScene — IMP-08 Warda strike 3D theatre + overwatch engine (pure Cesium)
//  React drives it imperatively:
//    setProgress(t01), setCamMode(id), gotoWaypoint(i), setThermal(on),
//    setLayer(name,on), setIonToken(tok), setPlaying(b), onReady(cb), onPick(cb)
//  Imagery: token-free ESRI World Imagery (real satellite) + ESRI World
//  Elevation 3D terrain. Optional Cesium ion token → World Terrain + Google
//  Photorealistic 3D Tiles auto-upgrade.
// ============================================================================
import * as Cesium from 'cesium';
import {
  LAUNCH_SITE, IMPACT_SITE, CORRIDOR, corridorCoords, GEOFENCE,
  VIIRS_DETECTIONS, analyzeThermal, TIMELINE, IMAGERY,
} from '../data/scenario.js';
import {
  buildPath, pathPointAt, legAt, destPoint, bearing, haversine,
  simulateBallistic, ballisticAt,
} from '../utils/geo.js';
import { MARKER_URIS, BRAND } from '../brand/assets.js';

const C = Cesium;
const carto = (lon, lat, h = 0) => C.Cartesian3.fromDegrees(lon, lat, h);
// Centralized CSS-colour parser (avoids repeating C.Color.fromCssColorString).
const col = (css) => C.Color.fromCssColorString(css);

// -- numeric guards: every value applied to the camera is validated ----------
// A finite-number guard with a safe fallback. Used to clamp/validate ALL
// interpolation math before it touches the camera so a single NaN/undefined
// (e.g. from a degenerate look-ahead at t=1) can never corrupt camera state.
const num = (v, fallback = 0) => (Number.isFinite(v) ? v : fallback);
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, num(v, lo)));
// Critically-damped lerp: frame-rate-independent smoothing factor.
// k≈ how fast we converge; dt = seconds since last frame.
const damp = (current, target, k, dt) => {
  const c = num(current, target);
  const t = num(target, c);
  return c + (t - c) * (1 - Math.exp(-k * Math.max(0, Math.min(0.1, dt))));
};
// Shortest-arc damp for headings (degrees) so 359°→1° doesn't spin the long way.
const dampAngleDeg = (current, target, k, dt) => {
  let c = num(current, target), t = num(target, c);
  let d = ((t - c + 540) % 360) - 180;       // shortest signed delta
  return c + d * (1 - Math.exp(-k * Math.max(0, Math.min(0.1, dt))));
};
// A Cartesian3 is only valid if all three components are finite.
const validCartesian = (p) => !!p && Number.isFinite(p.x) && Number.isFinite(p.y) && Number.isFinite(p.z);

export default class CesiumScene {
  constructor(container) {
    this.container = container;
    this._destroyed = false;
    this.ionMode = 'free';
    this.camMode = 'orbit';
    this.thermal = false;
    this.progress = 0;
    this._cbReady = null;
    this._cbPick = null;
    this._cbTick = null;
    this._orbitAngle = 0;

    // -- single authoritative camera-driver state ----------------------------
    // ONE requestAnimationFrame loop drives playback + camera (no stacked loops
    // across the synchronized plays or thermal mode). React only sets target
    // state and reads back via onTick(); it never owns an animation loop.
    this._playing = false;        // scripted auto-play running?
    this._trackMode = 'launch';   // current camera mode id
    this._camState = null;        // smoothed camera frame {lon,lat,h,heading,pitch}
    this._rafId = 0;
    this._lastT = 0;
    this._impactFired = false;

    // densified launch→impact ground track (great-circle corridor)
    const coords = corridorCoords();
    this.path = buildPath(coords, 90);
    this.cruiseAlt = CORRIDOR.cruiseAltM;
    // Real ballistic flight physics (cannon-es): climb → cruise → terminal dive
    // converging on the geocoded impact point. Supplies altitude + pitch per t.
    this.ballistic = simulateBallistic(this.path.total, {
      cruiseAltM: CORRIDOR.cruiseAltM,
      impactAngleDeg: 62,
      climbFrac: 0.10,
      diveFrac: 0.86,
    });
    this.thermalReport = analyzeThermal(VIIRS_DETECTIONS);

    this._initViewer();
    this._buildStatic();
    this._buildDrone();
    this._buildThermalLayer();
    this._installPick();
    this._installResize();
    this.setProgress(0);
    this.setCamMode('launch');
    this._startLoop();              // start the SINGLE authoritative driver loop
    if (this._cbReady) this._cbReady();
  }

  onReady(cb) { this._cbReady = cb; if (this.viewer) cb(); }
  onPick(cb) { this._cbPick = cb; }
  onTick(cb) { this._cbTick = cb; }   // React subscribes to per-frame readouts here

  // ==========================================================================
  //  SINGLE authoritative animation loop / camera driver.
  //  Owns playback advance + camera smoothing + controls.update()-equivalent.
  //  React NEVER runs its own requestAnimationFrame; it only flips _playing,
  //  _trackMode, progress targets and reads back through onTick(). This removes
  //  the previously-stacked rAF loops (playback loop + orbit/cinema refresh +
  //  thermal) that fought over the camera and caused jumps/NaN during the strike.
  // ==========================================================================
  _startLoop() {
    cancelAnimationFrame(this._rafId);   // never stack loops
    this._lastT = performance.now();
    const frame = (now) => {
      if (this._destroyed) return;
      const dt = Math.max(0, Math.min(0.1, (now - this._lastT) / 1000));
      this._lastT = now;

      // 1) advance scripted playback (auto-play) — the ONLY progress driver
      if (this._playing) {
        let np = this.progress + dt / TIMELINE.flightSeconds;
        if (np >= 1) { np = 1; this._playing = false; }
        this._setProgressInternal(np);
      }

      // 2) drive the camera every frame with damped smoothing (useFrame-style)
      this._driveCamera(dt);

      // 3) emit readout to React (telemetry HUD) — no React-side loop needed.
      //    Throttle to actual changes so an idle scene doesn't re-render React
      //    60×/s (matches the original "update only during motion" behaviour).
      if (this._cbTick) {
        const changed =
          this._playing !== this._lastEmitPlaying ||
          Math.abs(this.progress - (this._lastEmitProgress ?? -1)) > 1e-4;
        if (changed) {
          this._lastEmitPlaying = this._playing;
          this._lastEmitProgress = this.progress;
          this._cbTick(this.readout(), { playing: this._playing, progress: this.progress });
        }
      }

      this._rafId = requestAnimationFrame(frame);
    };
    this._rafId = requestAnimationFrame(frame);
  }

  // resize handling: keep aspect ratio + projection matrix correct. Cesium's
  // viewer.resize() recomputes the PerspectiveFrustum aspectRatio; we also
  // re-assert near/far so frustum stays valid after canvas size changes.
  _installResize() {
    this._onResize = () => {
      if (!this.viewer || this._destroyed) return;
      try {
        this.viewer.resize();
        this._applyFrustum(this._trackMode);
      } catch (_) {}
    };
    window.addEventListener('resize', this._onResize);
    // also observe the host element (rail collapse etc. without window resize)
    try {
      this._ro = new ResizeObserver(() => this._onResize());
      this._ro.observe(this.container);
    } catch (_) { this._ro = null; }
  }

  // Per-mode near/far clipping planes (frustum). Tight planes near the building,
  // wide planes for the Iran→Dubai corridor — updated on mode switch AND resize.
  _applyFrustum(mode) {
    const cam = this.viewer?.camera;
    if (!cam || !cam.frustum || cam.frustum.near == null) return;
    // building-scale modes need a close near plane; overview needs a far one.
    const tight = (mode === 'impact' || mode === 'chase' || mode === 'thermal' || mode === 'topdown');
    cam.frustum.near = tight ? 1.0 : 5.0;
    cam.frustum.far = 30_000_000;
    // PerspectiveFrustum recomputes aspectRatio from the canvas automatically;
    // touching near/far is enough to refresh the projection matrix next render.
  }

  // -- altitude from the real cannon-es ballistic profile (climb→cruise→dive) --
  _altAt(t) {
    const h = ballisticAt(this.ballistic, t).height;
    return Math.max(IMPACT_SITE.height, h);
  }

  // terminal-dive pitch (radians, negative = nose-down) from the physics sim
  _pitchAt(t) {
    return ballisticAt(this.ballistic, t).pitch;
  }

  _posAt(t) {
    const p = pathPointAt(this.path, t);
    const b = ballisticAt(this.ballistic, t);
    return {
      lon: p.lon, lat: p.lat,
      height: Math.max(IMPACT_SITE.height, b.height),
      heading: p.heading, pitch: b.pitch, speed: b.speed,
    };
  }

  _initViewer() {
    // STEP-3 3D backdrop (NO TOKEN): real photorealistic ground textures for the
    // OFFLINE photorealistic backdrop from REAL server-side captured tiles
    // (no client-side Cesium/Google key, no runtime ESRI/Cesium/Google tile
    // request). The globe starts with no base layer; local captured PNGs are
    // added below as georeferenced SingleTile imagery layers covering the
    // Bandar Abbas → Dubai → Al Warqa corridor. Default ellipsoid terrain is
    // used so nothing is fetched from the network at runtime.
    this.viewer = new C.Viewer(this.container, {
      baseLayer: false,
      baseLayerPicker: false, geocoder: false, homeButton: false,
      sceneModePicker: false, navigationHelpButton: false, animation: false,
      timeline: false, fullscreenButton: false, infoBox: false,
      selectionIndicator: false, shadows: true,
      terrainShadows: C.ShadowMode.ENABLED, requestRenderMode: false,
      contextOptions: { webgl: { alpha: false, antialias: true, powerPreference: 'high-performance' } },
    });
    this.viewer._cesiumWidget._creditContainer.style.display = 'none';
    this._addCapturedImagery();

    const scene = this.viewer.scene;
    scene.highDynamicRange = true;
    scene.msaaSamples = 4;
    scene.globe.enableLighting = true;
    scene.globe.dynamicAtmosphereLighting = true;
    scene.globe.dynamicAtmosphereLightingFromSun = true;
    scene.globe.showGroundAtmosphere = true;
    scene.globe.atmosphereLightIntensity = 12.0;
    scene.globe.depthTestAgainstTerrain = true;
    scene.globe.baseColor = C.Color.fromCssColorString('#0b1424');
    scene.fog.enabled = true;
    scene.fog.density = 0.00010;
    scene.skyAtmosphere.show = true;
    scene.skyAtmosphere.atmosphereLightIntensity = 18.0;

    // bloom for tracers / thermal glow
    const bloom = scene.postProcessStages.bloom;
    bloom.enabled = true;
    bloom.uniforms.glowOnly = false;
    bloom.uniforms.contrast = 128;
    bloom.uniforms.brightness = -0.2;
    bloom.uniforms.delta = 1.0;
    bloom.uniforms.sigma = 2.6;
    bloom.uniforms.stepSize = 1.0;

    // -- OrbitControls-equivalent: free rotate + zoom + tilt at any time -------
    // Cesium's screenSpaceCameraController IS the orbit/zoom controller. We give
    // it enableDamping-style inertia and zoom limits scaled for the scene
    // (Warda building ~40 m up to the whole Iran→Dubai corridor). During a
    // scripted play these inputs are detached (see _setUserControls) so user
    // orbit never fights the script; they resume cleanly afterwards.
    const cc = scene.screenSpaceCameraController;
    cc.enableCollisionDetection = true;
    cc.enableInputs = true;
    cc.enableRotate = true;
    cc.enableZoom = true;
    cc.enableTilt = true;
    cc.enableTranslate = true;
    cc.enableLook = true;
    // inertia ≈ enableDamping with a sensible dampingFactor (0=off,→1=floaty)
    cc.inertiaSpin = 0.85;
    cc.inertiaTranslate = 0.85;
    cc.inertiaZoom = 0.82;
    // min/max zoom for scene scale: 40 m (building) → 18,000 km (full corridor)
    cc.minimumZoomDistance = 40;
    cc.maximumZoomDistance = 18_000_000;
    this._userControls = cc;
    // a perspective frustum with explicit, valid near/far from the start
    if (scene.camera.frustum && scene.camera.frustum.near != null) {
      scene.camera.frustum.near = 1.0;
      scene.camera.frustum.far = 30_000_000;
    }

    // dusk lighting matching the ~21:55Z night VIIRS detections
    const iso = `${'2026-06-22'}T${String(TIMELINE.startHour).padStart(2,'0')}:55:00Z`;
    this.viewer.clock.currentTime = C.JulianDate.fromIso8601(iso);
    this.viewer.clock.shouldAnimate = false;

    // Terrain: default smooth ellipsoid (no network fetch). Relief is conveyed
    // by the 3D-photorealistic captured tiles draped as imagery; an optional
    // Cesium ion token can still upgrade to World Terrain via setIonToken().
    this.flyOverview(0);
  }

  // Drape the REAL captured satellite/3D tiles as georeferenced local imagery
  // layers (offline). Each capture is centered on its lat/lon with a small
  // rectangle so the corridor reads as photorealistic ground without any
  // external tile request.
  _addCapturedImagery() {
    const layers = this.viewer.imageryLayers;
    const add = (file, lonC, latC, halfDeg, alpha) => {
      try {
        const rect = C.Rectangle.fromDegrees(lonC - halfDeg, latC - halfDeg, lonC + halfDeg, latC + halfDeg);
        const prov = new C.SingleTileImageryProvider({ url: file, rectangle: rect, tileWidth: 256, tileHeight: 256 });
        const layer = layers.addImageryProvider(prov);
        if (alpha != null) layer.alpha = alpha;
        return layer;
      } catch (e) { return null; }
    };
    const B = IMAGERY.backdrop || {};
    // wide Dubai overview ground texture near the impact cluster
    add(B.groundOverlay || '/imagery/dubai-2d.png', 55.2708, 25.2048, 0.45, 1.0);
    // launch area (Bandar Abbas) + corridor midpoint relief panels
    add(B.launchArea || '/imagery/bandar-abbas-3d.png', 56.2893, 27.1842, 0.30, 0.95);
    add(B.corridorMid || '/imagery/gulf-midpoint-3d.png', 55.8469, 26.185, 0.30, 0.95);
    // high-detail Al Warqa impact-site capture on top (2D satellite footprint)
    add('/imagery/alwarqa-2d.png', 55.4045, 25.1858, 0.06, 1.0);
  }

  flyOverview(d = 2.2) {
    // frame the WHOLE Iran→Dubai corridor (both endpoints)
    const midLon = (LAUNCH_SITE.lon + IMPACT_SITE.lon) / 2;
    const midLat = (LAUNCH_SITE.lat + IMPACT_SITE.lat) / 2;
    this.viewer.camera.flyTo({
      destination: carto(midLon - 0.2, midLat - 1.5, 360000),
      orientation: { heading: C.Math.toRadians(-18), pitch: C.Math.toRadians(-46), roll: 0 },
      duration: d,
    });
  }

  // -- static geometry: corridor, waypoints, endpoints, geofence -------------
  _buildStatic() {
    const v = this.viewer;

    // corridor great-circle polyline (clamped arc at cruise alt)
    const arcPos = [];
    const N = 240;
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      const p = this._posAt(t);
      arcPos.push(p.lon, p.lat, p.height);
    }
    this.corridorEntity = v.entities.add({
      polyline: {
        positions: C.Cartesian3.fromDegreesArrayHeights(arcPos),
        width: 3.0,
        material: new C.PolylineGlowMaterialProperty({ glowPower: 0.28, color: C.Color.fromCssColorString(BRAND.accent) }),
      },
    });
    // ground shadow track
    v.entities.add({
      polyline: {
        positions: C.Cartesian3.fromDegreesArray(corridorCoords().flat()),
        width: 2.0, clampToGround: true,
        material: new C.PolylineDashMaterialProperty({ color: C.Color.fromCssColorString(BRAND.accent2).withAlpha(0.5), dashLength: 16 }),
      },
    });

    // 6 numbered waypoint markers
    this.waypointEntities = CORRIDOR.waypoints.map((w, i) => v.entities.add({
      id: `wp-${i}`,
      position: carto(w.lon, w.lat, this._altAt(i / (CORRIDOR.waypoints.length - 1)) + 200),
      point: { pixelSize: 11, color: C.Color.fromCssColorString(BRAND.accent), outlineColor: C.Color.WHITE, outlineWidth: 2, disableDepthTestDistance: Number.POSITIVE_INFINITY },
      label: {
        text: `${w.legOrder}  ${w.name}`,
        font: '600 14px Segoe UI, sans-serif',
        fillColor: C.Color.WHITE,
        showBackground: true,
        backgroundColor: C.Color.fromCssColorString(BRAND.primary).withAlpha(0.82),
        backgroundPadding: new C.Cartesian2(8, 5),
        pixelOffset: new C.Cartesian2(0, -26),
        style: C.LabelStyle.FILL,
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
        scaleByDistance: new C.NearFarScalar(60000, 1.0, 1_400_000, 0.4),
      },
      _wp: w,
    }));

    // launch site billboard + pad ring
    v.entities.add({
      id: 'launch-site',
      position: carto(LAUNCH_SITE.lon, LAUNCH_SITE.lat, LAUNCH_SITE.height),
      billboard: { image: MARKER_URIS.launch, width: 40, height: 47, verticalOrigin: C.VerticalOrigin.BOTTOM, disableDepthTestDistance: Number.POSITIVE_INFINITY },
      label: { text: 'IRAN LAUNCH SITE', font: '700 13px Segoe UI', fillColor: C.Color.fromCssColorString('#ff8a7a'), showBackground: true, backgroundColor: C.Color.fromCssColorString('#2a0c08').withAlpha(0.85), pixelOffset: new C.Cartesian2(0, 14), disableDepthTestDistance: Number.POSITIVE_INFINITY },
      _site: LAUNCH_SITE,
    });

    // impact site billboard
    v.entities.add({
      id: 'impact-site',
      position: carto(IMPACT_SITE.lon, IMPACT_SITE.lat, IMPACT_SITE.height),
      billboard: { image: MARKER_URIS.impact, width: 40, height: 47, verticalOrigin: C.VerticalOrigin.BOTTOM, disableDepthTestDistance: Number.POSITIVE_INFINITY },
      label: { text: 'WARDA APTS · IMPACT', font: '700 13px Segoe UI', fillColor: C.Color.fromCssColorString('#e0b3ff'), showBackground: true, backgroundColor: C.Color.fromCssColorString('#1a0a1f').withAlpha(0.85), pixelOffset: new C.Cartesian2(0, 14), disableDepthTestDistance: Number.POSITIVE_INFINITY },
      _site: IMPACT_SITE,
    });

    // endurance-derived geofence ring (66.7 km) around the impact/Dubai cluster
    this.geofenceEntity = v.entities.add({
      position: carto(GEOFENCE.centerLon, GEOFENCE.centerLat, 0),
      ellipse: {
        semiMajorAxis: GEOFENCE.radiusM, semiMinorAxis: GEOFENCE.radiusM,
        material: C.Color.fromCssColorString(BRAND.accent).withAlpha(0.06),
        outline: true, outlineColor: C.Color.fromCssColorString(BRAND.accent).withAlpha(0.9), outlineWidth: 2,
        height: 0, heightReference: C.HeightReference.NONE,
      },
    });
    // dashed warning ring + label
    v.entities.add({
      position: carto(GEOFENCE.centerLon, GEOFENCE.centerLat, 0),
      ellipse: { semiMajorAxis: GEOFENCE.radiusM, semiMinorAxis: GEOFENCE.radiusM, fill: false, outline: true, outlineColor: C.Color.fromCssColorString(BRAND.warn).withAlpha(0.55), outlineWidth: 1, height: 1500 },
    });
    // geofence crossing point (where corridor trips the ring)
    this._geofenceCross = this._findGeofenceCrossing();
    if (this._geofenceCross) {
      v.entities.add({
        position: carto(this._geofenceCross.lon, this._geofenceCross.lat, this._altAt(this._geofenceCross.t) + 200),
        point: { pixelSize: 10, color: C.Color.fromCssColorString(BRAND.warn), outlineColor: C.Color.BLACK, outlineWidth: 2, disableDepthTestDistance: Number.POSITIVE_INFINITY },
        label: { text: 'GEOFENCE TRIPWIRE · +8.2 min warning', font: '600 12px Segoe UI', fillColor: C.Color.fromCssColorString(BRAND.warn), showBackground: true, backgroundColor: C.Color.fromCssColorString('#2a2400').withAlpha(0.85), pixelOffset: new C.Cartesian2(0, -22), disableDepthTestDistance: Number.POSITIVE_INFINITY },
      });
    }
  }

  _findGeofenceCrossing() {
    let prev = null;
    for (let i = 0; i <= 400; i++) {
      const t = i / 400;
      const p = pathPointAt(this.path, t);
      const d = haversine(p.lon, p.lat, GEOFENCE.centerLon, GEOFENCE.centerLat);
      if (prev && prev.d > GEOFENCE.radiusM && d <= GEOFENCE.radiusM) {
        return { lon: p.lon, lat: p.lat, t };
      }
      prev = { d };
    }
    return null;
  }

  // -- animated Shahed-136 drone + glowing trail -----------------------------
  _buildDrone() {
    const v = this.viewer;
    this._dronePos = carto(LAUNCH_SITE.lon, LAUNCH_SITE.lat, LAUNCH_SITE.height);
    this._droneHeading = 0;
    this._trail = [];

    this.droneEntity = v.entities.add({
      position: new C.CallbackProperty(() => this._dronePos, false),
      billboard: {
        image: MARKER_URIS.shahed,
        width: 46, height: 46,
        rotation: new C.CallbackProperty(() => -this._droneHeading, false),
        alignedAxis: C.Cartesian3.UNIT_Z,
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
        scaleByDistance: new C.NearFarScalar(3000, 1.6, 600000, 0.35),
      },
      label: {
        text: 'SHAHED-136 · OWA',
        font: '600 12px Segoe UI', fillColor: C.Color.fromCssColorString(BRAND.accent),
        showBackground: true, backgroundColor: C.Color.fromCssColorString(BRAND.primary).withAlpha(0.8),
        pixelOffset: new C.Cartesian2(0, 26), disableDepthTestDistance: Number.POSITIVE_INFINITY,
        scaleByDistance: new C.NearFarScalar(40000, 1.0, 500000, 0.0),
      },
    });

    this.trailEntity = v.entities.add({
      polyline: {
        positions: new C.CallbackProperty(() => this._trail, false),
        width: 3.0,
        material: new C.PolylineGlowMaterialProperty({ glowPower: 0.5, color: C.Color.fromCssColorString('#ff7a18') }),
      },
    });
  }

  // -- VIIRS thermal/IR detection layer --------------------------------------
  _buildThermalLayer() {
    const v = this.viewer;
    this.thermalEntities = [];
    this.thermalReport.alerts.forEach((a) => {
      const sevColor = a.severity === 'CRITICAL' ? '#ff2d1a'
        : a.severity === 'HIGH' ? '#ff7a18'
        : a.severity === 'ELEVATED' ? '#ffcf3f' : '#ffe9a8';
      const radius = 600 + a.frp * 320;
      const e = v.entities.add({
        show: false,
        position: carto(a.lon, a.lat, 30),
        ellipse: {
          semiMajorAxis: radius, semiMinorAxis: radius,
          material: C.Color.fromCssColorString(sevColor).withAlpha(0.35),
          outline: true, outlineColor: C.Color.fromCssColorString(sevColor).withAlpha(0.9),
          height: 20,
        },
        point: { pixelSize: 6 + Math.min(14, a.frp * 1.4), color: C.Color.fromCssColorString(sevColor), outlineColor: C.Color.BLACK, outlineWidth: 1, disableDepthTestDistance: Number.POSITIVE_INFINITY },
        _thermal: a,
      });
      this.thermalEntities.push(e);
      if (a.suspicious) {
        const al = v.entities.add({
          show: false,
          position: carto(a.lon, a.lat, 30),
          billboard: { image: MARKER_URIS.thermalAlert, width: 26, height: 26, pixelOffset: new C.Cartesian2(0, -20), disableDepthTestDistance: Number.POSITIVE_INFINITY },
          label: { text: `${a.severity} · ${a.frp.toFixed(1)} MW`, font: '600 11px monospace', fillColor: C.Color.fromCssColorString(sevColor), showBackground: true, backgroundColor: C.Color.BLACK.withAlpha(0.7), pixelOffset: new C.Cartesian2(0, -40), disableDepthTestDistance: Number.POSITIVE_INFINITY },
          _thermal: a,
        });
        this.thermalEntities.push(al);
      }
    });
  }

  setThermal(on) {
    this.thermal = on;
    this.thermalEntities.forEach((e) => (e.show = on));
    // thermal palette: desaturate globe + lift bloom
    const scene = this.viewer.scene;
    scene.globe.baseColor = on ? C.Color.fromCssColorString('#0a0a0a') : C.Color.fromCssColorString('#0b1424');
    scene.postProcessStages.bloom.uniforms.brightness = on ? 0.25 : -0.2;
    scene.globe.atmosphereLightIntensity = on ? 3.0 : 12.0;
    this.imageryAlpha(on ? 0.32 : 1.0);
    if (on) this.setCamMode('thermal');
  }

  imageryAlpha(a) {
    const layers = this.viewer.imageryLayers;
    if (layers.length) layers.get(0).alpha = a;
  }

  // -- progress / animation update -------------------------------------------
  // Public scrub/seek entry (React slider + waypoint nav). Updates the world
  // geometry only; the SINGLE driver loop smoothly moves the camera next frame.
  setProgress(t) {
    this._setProgressInternal(t);
    return this.readout();
  }

  // Playback control: React flips this flag; the driver loop owns the advance.
  // No React-side requestAnimationFrame is ever created (kills stacked loops).
  setPlaying(on) {
    this._playing = !!on;
    if (this._playing && this.progress >= 1) this._setProgressInternal(0);
    this._lastT = performance.now();   // avoid a dt spike on resume
    return this._playing;
  }

  // Internal world-state advance: drone pose + glowing trail + impact flash.
  // Every value is NaN-guarded so a degenerate sample can never poison state.
  _setProgressInternal(t) {
    this.progress = clamp(t, 0, 1);
    const p = this._posAt(this.progress);
    const lon = num(p.lon), lat = num(p.lat), h = num(p.height, IMPACT_SITE.height);
    const dp = carto(lon, lat, h);
    if (validCartesian(dp)) this._dronePos = dp;     // never apply a NaN position
    // heading from a short look-ahead (guarded)
    const la = this._posAt(Math.min(1, this.progress + 0.004));
    const hd = Math.atan2(num(la.lon) - lon, num(la.lat) - lat);
    this._droneHeading = num(hd, this._droneHeading || 0);
    // build glowing trail up to current progress (skip any NaN samples)
    const trail = [];
    const steps = 80;
    for (let i = 0; i <= steps; i++) {
      const tt = (i / steps) * this.progress;
      const q = this._posAt(tt);
      if (Number.isFinite(q.lon) && Number.isFinite(q.lat)) {
        trail.push(q.lon, q.lat, num(q.height, IMPACT_SITE.height));
      }
    }
    this._trail = C.Cartesian3.fromDegreesArrayHeights(trail);

    // impact flash near the end
    if (this.progress > 0.985 && !this._impactFired) {
      this._fireImpact();
      this._impactFired = true;
    } else if (this.progress < 0.9) {
      this._impactFired = false;
    }
  }

  _fireImpact() {
    const v = this.viewer;
    const flash = v.entities.add({
      position: carto(IMPACT_SITE.lon, IMPACT_SITE.lat, IMPACT_SITE.height),
      ellipse: { semiMajorAxis: 400, semiMinorAxis: 400, material: C.Color.fromCssColorString('#ff7a18').withAlpha(0.7), height: 10 },
      point: { pixelSize: 26, color: C.Color.fromCssColorString('#fff2c0'), disableDepthTestDistance: Number.POSITIVE_INFINITY },
    });
    let r = 400, op = 0.7;
    const grow = setInterval(() => {
      r += 220; op -= 0.06;
      if (op <= 0 || this._destroyed) { clearInterval(grow); v.entities.remove(flash); return; }
      flash.ellipse.semiMajorAxis = r; flash.ellipse.semiMinorAxis = r;
      flash.ellipse.material = C.Color.fromCssColorString('#ff7a18').withAlpha(Math.max(0, op));
    }, 60);
  }

  readout() {
    const info = legAt(this.path, this.progress);
    const p = this._posAt(this.progress);
    const wp = CORRIDOR.waypoints;
    const legIdx = Math.min(wp.length - 2, info.leg);
    const distToImpactM = (1 - this.progress) * this.path.total;
    // physics-derived ground speed (m/s → km/h) from the ballistic sim
    const speedKmh = (p.speed || CORRIDOR.cruiseSpeedKmh / 3.6) * 3.6;
    const etaMin = (distToImpactM / 1000) / Math.max(1, speedKmh) * 60;
    const divePitchDeg = -C.Math.toDegrees(p.pitch || 0); // + = nose-down
    return {
      progress: this.progress,
      lon: p.lon, lat: p.lat, altM: p.height,
      legFrom: wp[legIdx]?.name, legTo: wp[legIdx + 1]?.name,
      phase: wp[legIdx]?.phase,
      travelledKm: info.travelledM / 1000,
      totalKm: this.path.total / 1000,
      distToImpactKm: distToImpactM / 1000,
      etaMin, speedKmh, divePitchDeg,
    };
  }

  // -- 8 camera modes (single-driver, eased, NaN-guarded) --------------------
  // setCamMode no longer flyTo()s (async tweens fought the per-frame driver and
  // caused the strike-sequence jumps). It records the mode, seeds the smoothed
  // frame from the CURRENT real camera (so easing starts where the camera
  // actually is → no snap), and resets the frustum + aspect. The single driver
  // loop then damps toward the new framing.
  setCamMode(id) {
    this.camMode = id;
    this._trackMode = id;
    this._camSettled = false;                    // begin a fresh eased transition
    this._camFrame = this._currentCameraFrame() || this._camFrame; // start from reality
    this._applyFrustum(id);                       // reset near/far for this mode
    try { this.viewer.resize(); } catch (_) {}    // refresh aspect / projection matrix
    return this.readout();
  }

  // Read the live camera back into a {lon,lat,h,heading,pitch} frame so damped
  // easing can begin from the camera's real pose (prevents snap on handoff).
  _currentCameraFrame() {
    try {
      const cam = this.viewer.camera;
      const c = cam.positionCartographic;
      if (!c || !Number.isFinite(c.height)) return null;
      return {
        lon: C.Math.toDegrees(c.longitude),
        lat: C.Math.toDegrees(c.latitude),
        h: c.height,
        heading: C.Math.toDegrees(cam.heading),
        pitch: C.Math.toDegrees(cam.pitch),
      };
    } catch (_) { return null; }
  }

  // Enable/detach user orbit+zoom input. Detached during scripted plays so user
  // input never fights the script; re-enabled (from the camera's current pose,
  // so no snap) when a scripted transition settles or playback stops.
  _setUserControls(enabled) {
    const cc = this._userControls;
    if (!cc) return;
    if (cc.enableInputs === enabled) return;      // avoid per-frame churn
    cc.enableInputs = enabled;
  }

  // Compute the TARGET camera frame for a mode at the current progress. Returns
  // {lon,lat,h,heading,pitch} (degrees) or null. All inputs NaN-guarded.
  _targetFrame(mode) {
    const frame = (lon, lat, h, headingDeg, pitchDeg) => {
      if (!Number.isFinite(lon) || !Number.isFinite(lat) || !Number.isFinite(h)) return null;
      return { lon, lat, h, heading: num(headingDeg, 0), pitch: clamp(pitchDeg, -89.9, 89.9) };
    };
    const p = this._posAt(this.progress);
    const lon = num(p.lon), lat = num(p.lat), h = num(p.height, IMPACT_SITE.height);
    const diving = this.progress >= (this.ballistic?.diveStart ?? 0.86);
    const divePitchDeg = diving ? num(C.Math.toDegrees(num(p.pitch))) : 0;
    const b0 = this._posAt(Math.max(0, this.progress - 0.01));
    const hdgDeg = num(bearing(num(b0.lon, lon), num(b0.lat, lat), lon, lat), this._camFrame?.heading || 0);

    switch (mode) {
      case 'launch':
        return frame(LAUNCH_SITE.lon - 0.04, LAUNCH_SITE.lat - 0.05, 6500, 20, -28);
      case 'impact':
        return frame(IMPACT_SITE.lon - 0.02, IMPACT_SITE.lat - 0.03, 4200, 18, -32);
      case 'freefly': {
        const midLon = (LAUNCH_SITE.lon + IMPACT_SITE.lon) / 2;
        const midLat = (LAUNCH_SITE.lat + IMPACT_SITE.lat) / 2;
        return frame(midLon - 0.2, midLat - 1.5, 360000, -18, -46);
      }
      case 'waypoint':
        return this._waypointTarget || null;
      case 'chase': {
        const back = destPoint(lon, lat, (hdgDeg + 180) % 360, diving ? 900 : 1400);
        return frame(back[0], back[1], h + (diving ? 320 : 500), hdgDeg, -12 + (diving ? divePitchDeg * 0.7 : 0));
      }
      case 'topdown':
        return frame(lon, lat, Math.max(9000, h + 9000), hdgDeg, -89.9);
      case 'orbit': {
        this._orbitAngle += 0.0035;
        const off = destPoint(lon, lat, (this._orbitAngle * 57.3) % 360, 2200);
        return frame(off[0], off[1], h + 1200, (this._orbitAngle * 57.3 + 180) % 360, -20);
      }
      case 'thermal': {
        const back = destPoint(lon, lat, (hdgDeg + 180) % 360, diving ? 800 : 1100);
        return frame(back[0], back[1], h + (diving ? 500 : 700), hdgDeg, -22 + (diving ? divePitchDeg * 0.6 : 0));
      }
      case 'cinema': {
        const t = this.progress;
        if (t < 0.15) { const o = destPoint(lon, lat, (hdgDeg + 120) % 360, 1800); return frame(o[0], o[1], h + 900, (hdgDeg + 300) % 360, -16); }
        if (t > 0.85) { return frame(IMPACT_SITE.lon - 0.015, IMPACT_SITE.lat - 0.02, 3000, 18, -30); }
        const back = destPoint(lon, lat, (hdgDeg + 200) % 360, 1600);
        return frame(back[0], back[1], h + 600, (hdgDeg + 20) % 360, -10);
      }
      default:
        return null;
    }
  }

  // The per-frame camera driver (called ONLY by the single loop). Decides who
  // owns the camera this frame (script vs user), damps toward the target frame,
  // validates every vector, and applies via setView — never an async flyTo.
  _driveCamera(dt) {
    if (!this.viewer) return;
    const mode = this._trackMode;
    const always = (mode === 'orbit' || mode === 'cinema');        // auto-cameras
    const followWhilePlaying = (mode === 'chase' || mode === 'topdown' || mode === 'thermal');

    // is the loop scripting the camera this frame?
    let scripted;
    if (always) scripted = true;
    else if (this._playing && followWhilePlaying) scripted = true;
    else scripted = !this._camSettled;                            // easing a one-shot move

    // hand off input: detached while scripted, enabled (no snap) otherwise
    this._setUserControls(!scripted);
    if (!scripted) return;                                        // user owns the camera

    const target = this._targetFrame(mode);
    if (!target) { this._camSettled = true; return; }

    // damped lerp/slerp toward target (frame-rate independent)
    const k = always ? 3.0 : 4.5;
    const f = this._camFrame ? { ...this._camFrame } : { ...target };
    f.lon = damp(f.lon, target.lon, k, dt);
    f.lat = damp(f.lat, target.lat, k, dt);
    f.h = damp(f.h, target.h, k, dt);
    f.heading = dampAngleDeg(f.heading, target.heading, k, dt);
    f.pitch = clamp(damp(f.pitch, target.pitch, k, dt), -89.9, 89.9);

    // validate BEFORE applying — a NaN here would corrupt the camera
    const dest = carto(num(f.lon), num(f.lat), num(f.h, 100));
    if (!validCartesian(dest) || !Number.isFinite(f.heading) || !Number.isFinite(f.pitch)) {
      return; // skip this frame; keep last good camera
    }
    this._camFrame = f;
    this.viewer.camera.setView({
      destination: dest,
      orientation: {
        heading: C.Math.toRadians(f.heading),
        pitch: C.Math.toRadians(f.pitch),
        roll: 0,
      },
    });

    // one-shot transitions: detect settle, then release control to the user
    if (!always && !(this._playing && followWhilePlaying)) {
      const settled =
        Math.abs(f.lon - target.lon) < 1e-4 &&
        Math.abs(f.lat - target.lat) < 1e-4 &&
        Math.abs(f.h - target.h) < Math.max(2, Math.abs(target.h) * 0.01);
      if (settled) this._camSettled = true;       // next frame → user controls
    }
  }

  // -- waypoint navigation ----------------------------------------------------
  gotoWaypoint(i) {
    const wp = CORRIDOR.waypoints;
    const idx = clamp(i, 0, wp.length - 1);
    const t = idx / (wp.length - 1);
    // stop scripted play so the waypoint move isn't fought by playback advance
    this._playing = false;
    this._setProgressInternal(t);
    const w = wp[idx];
    const off = destPoint(num(w.lon), num(w.lat), 200, 5000);
    // record the eased target for the single driver (no async flyTo)
    this._waypointTarget = {
      lon: num(off[0], w.lon), lat: num(off[1], w.lat),
      h: num(this._altAt(t) + 3500, 4000), heading: 20, pitch: -30,
    };
    this.camMode = 'waypoint';
    this._trackMode = 'waypoint';
    this._camSettled = false;                         // begin eased transition
    this._camFrame = this._currentCameraFrame() || this._camFrame;
    this._applyFrustum('waypoint');
    try { this.viewer.resize(); } catch (_) {}
    return { idx, ...this.readout() };
  }

  setLayer(name, on) {
    if (name === 'corridor' && this.corridorEntity) this.corridorEntity.show = on;
    if (name === 'geofence' && this.geofenceEntity) this.geofenceEntity.show = on;
    if (name === 'waypoints') this.waypointEntities.forEach((e) => (e.show = on));
  }

  // -- optional Ion upgrade: World Terrain + Google Photoreal 3D Tiles --------
  async setIonToken(token) {
    if (!token) return { ok: false, msg: 'empty token' };
    try {
      C.Ion.defaultAccessToken = token;
      this.ionMode = 'ion';
      const terrain = await C.createWorldTerrainAsync({ requestVertexNormals: true, requestWaterMask: true });
      if (this._destroyed) return { ok: false };
      this.viewer.terrainProvider = terrain;
      try {
        const photoreal = await C.createGooglePhotorealistic3DTileset();
        if (this._destroyed) return { ok: false };
        photoreal.maximumScreenSpaceError = 12;
        this.viewer.scene.primitives.add(photoreal);
        this._photoreal = photoreal;
        return { ok: true, msg: 'Google Photorealistic 3D Tiles + World Terrain active' };
      } catch (e) {
        try {
          const osm = await C.createOsmBuildingsAsync();
          this.viewer.scene.primitives.add(osm);
          return { ok: true, msg: 'World Terrain + OSM Buildings active (Google tiles unavailable on this token)' };
        } catch (_) { return { ok: true, msg: 'World Terrain active' }; }
      }
    } catch (e) {
      this.ionMode = 'free';
      return { ok: false, msg: 'Invalid Ion token: ' + (e?.message || e) };
    }
  }

  _installPick() {
    this.handler = new C.ScreenSpaceEventHandler(this.viewer.scene.canvas);
    this.handler.setInputAction((m) => {
      const picked = this.viewer.scene.pick(m.position);
      if (picked && picked.id && this._cbPick) {
        const e = picked.id;
        if (e._site) this._cbPick({ type: 'site', data: e._site });
        else if (e._wp) this._cbPick({ type: 'waypoint', data: e._wp });
        else if (e._thermal) this._cbPick({ type: 'thermal', data: e._thermal });
      }
    }, C.ScreenSpaceEventType.LEFT_CLICK);
  }

  destroy() {
    this._destroyed = true;
    cancelAnimationFrame(this._rafId);                 // stop the single driver loop
    try { if (this._onResize) window.removeEventListener('resize', this._onResize); } catch (_) {}
    try { this._ro && this._ro.disconnect(); } catch (_) {}
    try { this.handler && this.handler.destroy(); } catch (_) {}
    try { this.viewer && this.viewer.destroy(); } catch (_) {}
  }
}
