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
    this._orbitAngle = 0;

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
    this.setProgress(0);
    this.setCamMode('launch');
    if (this._cbReady) this._cbReady();
  }

  onReady(cb) { this._cbReady = cb; if (this.viewer) cb(); }
  onPick(cb) { this._cbPick = cb; }

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

    const cc = scene.screenSpaceCameraController;
    cc.enableCollisionDetection = true;
    cc.minimumZoomDistance = 60;
    cc.maximumZoomDistance = 12_000_000;

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
  setProgress(t) {
    this.progress = Math.max(0, Math.min(1, t));
    const p = this._posAt(this.progress);
    this._dronePos = carto(p.lon, p.lat, p.height);
    // heading from a short look-ahead
    const la = this._posAt(Math.min(1, this.progress + 0.004));
    this._droneHeading = Math.atan2(la.lon - p.lon, la.lat - p.lat);
    // build glowing trail up to current progress
    const trail = [];
    const steps = 80;
    for (let i = 0; i <= steps; i++) {
      const tt = (i / steps) * this.progress;
      const q = this._posAt(tt);
      trail.push(q.lon, q.lat, q.height);
    }
    this._trail = C.Cartesian3.fromDegreesArrayHeights(trail);

    // impact flash near the end
    if (this.progress > 0.985 && !this._impactFired) {
      this._fireImpact();
      this._impactFired = true;
    } else if (this.progress < 0.9) {
      this._impactFired = false;
    }

    this._applyCamera();
    return this.readout();
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

  // -- 8 camera modes ---------------------------------------------------------
  setCamMode(id) {
    this.camMode = id;
    const cc = this.viewer.scene.screenSpaceCameraController;
    const free = id === 'freefly';
    cc.enableRotate = cc.enableTranslate = cc.enableZoom = cc.enableTilt = cc.enableLook = free || id === 'orbit';
    if (id === 'launch') {
      this.viewer.camera.flyTo({
        destination: carto(LAUNCH_SITE.lon - 0.04, LAUNCH_SITE.lat - 0.05, 6500),
        orientation: { heading: C.Math.toRadians(20), pitch: C.Math.toRadians(-28), roll: 0 }, duration: 1.4,
      });
    } else if (id === 'impact') {
      this.viewer.camera.flyTo({
        destination: carto(IMPACT_SITE.lon - 0.02, IMPACT_SITE.lat - 0.03, 4200),
        orientation: { heading: C.Math.toRadians(18), pitch: C.Math.toRadians(-32), roll: 0 }, duration: 1.4,
      });
    } else if (id === 'freefly') {
      this.flyOverview(1.4);
    }
    this._applyCamera(true);
  }

  _applyCamera(force = false) {
    if (!this.viewer) return;
    const id = this.camMode;
    const p = this._posAt(this.progress);
    // terminal-dive aware framing: steeper look-down as the munition noses over
    const diving = this.progress >= (this.ballistic?.diveStart ?? 0.86);
    const divePitchDeg = diving ? C.Math.toDegrees(p.pitch || 0) : 0;
    const cam = this.viewer.camera;
    const hdgDeg = bearing(
      this._posAt(Math.max(0, this.progress - 0.01)).lon, this._posAt(Math.max(0, this.progress - 0.01)).lat,
      p.lon, p.lat
    );

    if (id === 'chase') {
      // tail-chase: follow the airframe pitch so the terminal dive frames correctly
      const back = destPoint(p.lon, p.lat, (hdgDeg + 180) % 360, diving ? 900 : 1400);
      const chasePitch = -12 + (diving ? divePitchDeg * 0.7 : 0);
      cam.setView({ destination: carto(back[0], back[1], p.height + (diving ? 320 : 500)), orientation: { heading: C.Math.toRadians(hdgDeg), pitch: C.Math.toRadians(chasePitch), roll: 0 } });
    } else if (id === 'topdown') {
      cam.setView({ destination: carto(p.lon, p.lat, Math.max(9000, p.height + 9000)), orientation: { heading: C.Math.toRadians(hdgDeg), pitch: C.Math.toRadians(-89.9), roll: 0 } });
    } else if (id === 'orbit') {
      if (!force) this._orbitAngle += 0.0035;
      const off = destPoint(p.lon, p.lat, (this._orbitAngle * 57.3) % 360, 2200);
      cam.setView({ destination: carto(off[0], off[1], p.height + 1200), orientation: { heading: C.Math.toRadians((this._orbitAngle * 57.3 + 180) % 360), pitch: C.Math.toRadians(-20), roll: 0 } });
    } else if (id === 'thermal') {
      // EO/IR style: slightly behind + above the seeker, tilt tracks the dive
      const back = destPoint(p.lon, p.lat, (hdgDeg + 180) % 360, diving ? 800 : 1100);
      const irPitch = -22 + (diving ? divePitchDeg * 0.6 : 0);
      cam.setView({ destination: carto(back[0], back[1], p.height + (diving ? 500 : 700)), orientation: { heading: C.Math.toRadians(hdgDeg), pitch: C.Math.toRadians(irPitch), roll: 0 } });
    } else if (id === 'cinema') {
      // auto-cut director: switch framing by phase
      const phaseT = this.progress;
      if (phaseT < 0.15) { const o = destPoint(p.lon, p.lat, (hdgDeg + 120) % 360, 1800); cam.setView({ destination: carto(o[0], o[1], p.height + 900), orientation: { heading: C.Math.toRadians((hdgDeg + 300) % 360), pitch: C.Math.toRadians(-16), roll: 0 } }); }
      else if (phaseT > 0.85) { cam.setView({ destination: carto(IMPACT_SITE.lon - 0.015, IMPACT_SITE.lat - 0.02, 3000), orientation: { heading: C.Math.toRadians(18), pitch: C.Math.toRadians(-30), roll: 0 } }); }
      else { const back = destPoint(p.lon, p.lat, (hdgDeg + 200) % 360, 1600); cam.setView({ destination: carto(back[0], back[1], p.height + 600), orientation: { heading: C.Math.toRadians((hdgDeg + 20) % 360), pitch: C.Math.toRadians(-10), roll: 0 } }); }
    }
    // 'launch','impact','freefly' handled in setCamMode (static fly-to)
  }

  // -- waypoint navigation ----------------------------------------------------
  gotoWaypoint(i) {
    const wp = CORRIDOR.waypoints;
    const idx = Math.max(0, Math.min(wp.length - 1, i));
    const t = idx / (wp.length - 1);
    this.setProgress(t);
    const w = wp[idx];
    const off = destPoint(w.lon, w.lat, 200, 5000);
    this.viewer.camera.flyTo({
      destination: carto(off[0], off[1], this._altAt(t) + 3500),
      orientation: { heading: C.Math.toRadians(20), pitch: C.Math.toRadians(-30), roll: 0 }, duration: 1.2,
    });
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
    try { this.handler && this.handler.destroy(); } catch (_) {}
    try { this.viewer && this.viewer.destroy(); } catch (_) {}
  }
}
