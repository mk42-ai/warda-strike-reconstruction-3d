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

// -- DEFECT 2: soft radial particle sprite (fire/smoke/debris) ---------------
// Generates a circular radial-gradient PNG data-URI at runtime so the strike
// particle systems have a soft round texture without shipping any image asset.
// Fully guarded: returns undefined if canvas/2d is unavailable (caller skips
// that particle layer rather than crashing).
const radialSprite = (inner, outer) => {
  try {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const g = c.getContext('2d');
    if (!g) return undefined;
    const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, inner);
    grad.addColorStop(0.5, outer);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = grad;
    g.beginPath();
    g.arc(32, 32, 32, 0, Math.PI * 2);
    g.fill();
    return c.toDataURL('image/png');
  } catch (_) { return undefined; }
};

// -- pitch clamp: the camera may never look edge-on (toward horizon) nor badly
// straight-down/under terrain. Every transition AND user interaction is clamped
// into this sane downward-looking band.
const PITCH_MIN = -85; // steepest (near-nadir but never fully down)
const PITCH_MAX = -10; // shallowest (never edge-on / under-terrain at the horizon)
const clampPitch = (deg) => clamp(deg, PITCH_MIN, PITCH_MAX);

// Explicit lookAt targets (Cartesian3) for the named framing locations, using
// the exact coordinates supplied for this scene. carto(lon,lat,height).
const TARGETS = {
  launch:  () => carto(56.2808, 27.1865, 40),   // Bandar Abbas launch
  gulfMid: () => carto(55.8350, 26.1822, 0),    // Gulf-corridor midpoint
  dubai:   () => carto(55.2744, 25.1972, 0),    // Dubai overview
  impact:  () => carto(55.3892, 25.1779, 20),   // Al Warqa / Warda impact
};

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

    // -- render-error AUTO-RECOVERY (safety net) -------------------------------
    // Cesium catches per-frame render exceptions, raises scene.renderError and
    // (by default) STOPS rendering — which would freeze the play sequence with a
    // blank/black canvas. We listen for it and, on the first error, strip the
    // optional post-processing (bloom/silhouette), drop HDR/MSAA to the safe
    // path, and keep the loop alive so the strike still plays. rethrowRenderErrors
    // stays false so a single bad frame never kills the app.
    try {
      scene.rethrowRenderErrors = false;
      scene.renderError.addEventListener((_scene, err) => {
        if (this._renderRecovered) return;     // recover once
        this._renderRecovered = true;
        // eslint-disable-next-line no-console
        console.warn('[CesiumScene] renderError — disabling post-processing and recovering:', err);
        try {
          const pp = scene.postProcessStages;
          if (pp) { if (pp.bloom) pp.bloom.enabled = false; if (pp.fxaa) pp.fxaa.enabled = false; pp.removeAll && pp.removeAll(); }
        } catch (_) {}
        try { scene.highDynamicRange = false; } catch (_) {}
        try { scene.msaaSamples = 1; } catch (_) {}
        try { scene.requestRender(); } catch (_) {}
      });
    } catch (_) { /* renderError event unavailable → rely on per-call guards */ }

    // -- TASK B: realism tuning of the EXISTING scene/tileset config -----------
    // (No new Google/ion credentials — only tuning params already available.)
    // HDR render targets + MSAA + FXAA + edge-sharpening for clean, sharp tiles;
    // physically based sun + image-based/ambient lighting; tuned atmosphere/fog.
    //
    // HARDENING (fix): each advanced render feature is FEATURE-DETECTED and
    // individually try/guarded so an unsupported GPU/context (e.g. SwiftShader,
    // low-end mobile, headless) NO-OPS gracefully instead of throwing during
    // construction or on scene.render(). A throw here used to abort the whole
    // CesiumScene constructor → sceneRef stayed null → the Play button (which
    // calls sceneRef.current?.setPlaying() with optional chaining) silently did
    // nothing. Guarding every call is what keeps the scene — and Play — alive.
    // HDR: only enable if the runtime reports support for it.
    try {
      if (scene.highDynamicRangeSupported !== false) scene.highDynamicRange = true;
    } catch (_) { /* HDR unsupported → SDR path */ }
    // MSAA: only when the context actually supports multisampling.
    try {
      if (scene.msaaSupported !== false) scene.msaaSamples = 4;
      else scene.msaaSamples = 1;
    } catch (_) { try { scene.msaaSamples = 1; } catch (__) {} }
    // FXAA: cheap, broadly supported, but still guarded.
    try {
      if (scene.postProcessStages && scene.postProcessStages.fxaa) {
        scene.postProcessStages.fxaa.enabled = true;
      }
    } catch (_) { /* FXAA unavailable → MSAA/native AA still apply */ }
    // physically based sun + globe lighting
    scene.globe.enableLighting = true;
    scene.globe.dynamicAtmosphereLighting = true;
    scene.globe.dynamicAtmosphereLightingFromSun = true;
    scene.globe.showGroundAtmosphere = true;
    scene.globe.atmosphereLightIntensity = 14.0;   // a touch brighter key light
    // image-based / ambient lighting so shadowed faces read with realistic fill
    try {
      scene.globe.lightingFadeOutDistance = 40_000.0;
      scene.globe.lightingFadeInDistance = 20_000.0;
      scene.globe.nightFadeOutDistance = 40_000.0;
      scene.globe.atmosphereScatteringIntensity = 2.6;
      if (scene.light) scene.light.intensity = 3.0;             // sun intensity
      if ('imageBasedLighting' in scene && scene.imageBasedLighting) {
        scene.imageBasedLighting.imageBasedLightingFactor = new C.Cartesian2(1.0, 1.0);
        scene.imageBasedLighting.luminanceAtZenith = 0.5;       // ambient IBL fill
      }
      if ('sphericalHarmonicCoefficients' in scene) { /* default env IBL kept */ }
    } catch (_) {}
    scene.globe.depthTestAgainstTerrain = true;    // tiles/markers sit on terrain
    scene.globe.baseColor = C.Color.fromCssColorString('#0b1424');
    scene.globe.maximumScreenSpaceError = 1.5;     // sharper terrain/imagery detail
    scene.globe.preloadSiblings = true;            // fewer holes while moving
    // tuned distance fog → depth cue without washing the corridor out
    scene.fog.enabled = true;
    scene.fog.density = 0.00012;
    scene.fog.screenSpaceErrorFactor = 4.0;
    scene.skyAtmosphere.show = true;
    scene.skyAtmosphere.atmosphereLightIntensity = 18.0;
    // ACES tone mapping on the Cesium HDR pipeline — FEATURE-DETECTED so it
    // no-ops on builds that lack the Tonemapper enum / postProcessStages slot.
    try {
      if ('Tonemapper' in C && scene.postProcessStages && 'tonemapper' in scene.postProcessStages) {
        scene.postProcessStages.tonemapper = C.Tonemapper.ACES;
      }
    } catch (_) { /* tonemapper unsupported on this Cesium build → skip */ }
    // camera preloads: warm tiles for flight destinations + when hidden so a
    // damped flyTo lands on already-streamed, high-detail geometry (no pop-in).
    try {
      scene.preloadFlightDestinations = true;
      scene.camera.percentageChanged = 0.1;
    } catch (_) {}

    // bloom for tracers / thermal glow (guarded: no-op if unavailable)
    try {
      const bloom = scene.postProcessStages.bloom;
      if (bloom) {
        bloom.enabled = true;
        bloom.uniforms.glowOnly = false;
        bloom.uniforms.contrast = 128;
        bloom.uniforms.brightness = -0.2;
        bloom.uniforms.delta = 1.0;
        bloom.uniforms.sigma = 2.6;
        bloom.uniforms.stepSize = 1.0;
      }
    } catch (_) { /* bloom unavailable on this GPU → skip glow */ }

    // edge-sharpening post-process: crisp building/tile silhouettes on top of
    // MSAA+FXAA (subtle, presentation-grade — not a hard outline).
    //
    // HARDENING (fix): an edge-detection stage MUST NOT be added to the pipeline
    // on its own — it has to be wrapped in a silhouette COMPOSITE, and the whole
    // feature requires post-process depth-texture support. Adding it raw (as the
    // previous build did) throws inside scene.render() on GPUs/contexts without
    // that support, which kills the render loop and freezes the play sequence.
    // We now gate on PostProcessStageLibrary.isSilhouetteSupported(scene) and
    // wrap the edge stage in createSilhouetteStage(), all inside try/catch, so
    // it no-ops gracefully where unsupported (MSAA+FXAA still apply).
    try {
      const lib = C.PostProcessStageLibrary;
      const supported = typeof lib.isSilhouetteSupported === 'function'
        ? lib.isSilhouetteSupported(scene)
        : false;
      if (supported && !this._sharpenAdded) {
        const edge = lib.createEdgeDetectionStage();
        edge.uniforms.length = 0.10;
        edge.uniforms.color = C.Color.fromCssColorString('#0b3d2e').withAlpha(0.16);
        const silhouette = lib.createSilhouetteStage([edge]);
        scene.postProcessStages.add(silhouette);
        this._sharpenAdded = true;
      }
    } catch (_) { /* silhouette/edge unsupported on this GPU → MSAA+FXAA only */ }

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
    // FIX 1: zoom must work fully — close to the building and far out to space.
    // 5 m (right on the structure) → 20,000 km (well beyond the whole corridor).
    cc.enableZoom = true;
    cc.minimumZoomDistance = 5;
    cc.maximumZoomDistance = 20_000_000;
    this._userControls = cc;
    // a perspective frustum with explicit, valid near/far from the start
    if (scene.camera.frustum && scene.camera.frustum.near != null) {
      scene.camera.frustum.near = 1.0;
      scene.camera.frustum.far = 30_000_000;
    }

    // -- DEFECT 1 FIX: physically sensible DAYLIGHT across all 8 camera modes ---
    // The scene clock was previously pinned to night (~21:55Z) while globe
    // lighting was ON, so with sun-driven lighting the globe, imagery, drone and
    // buildings rendered dark/black in every camera mode. We set the clock to
    // mid-MORNING LOCAL time over Dubai (Gulf Standard Time = UTC+4). 06:00Z =
    // 10:00 local → a high, warm sun that lights the whole Iran→Dubai corridor
    // consistently. Guarded so a bad date string can never abort init.
    try {
      // Fixed mid-MORNING daylight (summer-solstice sun, ~09:30Z). Stored on the
      // instance so EVERY camera mode / play / thermal toggle can re-assert it
      // via _applyDaylight() and the lighting can never flip to night.
      this._dayIso = '2025-06-21T09:30:00Z';
      this._applyDaylight();
      // Make the sun the lighting source and ensure globe lighting is on so the
      // daylight actually reaches terrain/imagery in every mode.
      if (scene.sun) scene.sun.show = true;
      if (scene.moon) scene.moon.show = false;
      scene.globe.enableLighting = true;
      // brighten the lit side so captured imagery never reads muddy/black
      scene.globe.atmosphereLightIntensity = 20.0;
      if (scene.light) {
        scene.light = new C.SunLight();        // explicit physically based sun
        scene.light.intensity = 3.0;
      }
    } catch (_) { /* keep default clock/lighting if anything is unavailable */ }

    // Terrain: default smooth ellipsoid (no network fetch). Relief is conveyed
    // by the 3D-photorealistic captured tiles draped as imagery; an optional
    // Cesium ion token can still upgrade to World Terrain via setIonToken().
    this.flyOverview(0);
  }

  // Re-assert the fixed DAYTIME clock + sun lighting. Called on init AND from
  // every camera-mode switch / waypoint / thermal toggle / play so the scene
  // lighting is GUARANTEED to stay daylight (never flips to night) in all modes.
  // Fully guarded: a missing API or bad date string can never abort a mode switch.
  _applyDaylight() {
    try {
      const scene = this.viewer && this.viewer.scene;
      if (!scene) return;
      if (this._dayIso) {
        this.viewer.clock.currentTime = C.JulianDate.fromIso8601(this._dayIso);
      }
      scene.globe.enableLighting = true;                 // sun lighting in EVERY mode
      if (scene.sun) scene.sun.show = true;
      if (scene.moon) scene.moon.show = false;
      if (scene.skyAtmosphere) scene.skyAtmosphere.show = true;
      if (scene.fog) scene.fog.enabled = true;
      scene.globe.showGroundAtmosphere = true;
      // keep a physically based sun light (not a fixed flashlight at the camera)
      try { if (!(scene.light instanceof C.SunLight)) { scene.light = new C.SunLight(); scene.light.intensity = 3.0; } } catch (_) {}
    } catch (_) { /* never let a lighting refresh break a mode switch */ }
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
        // crisp ground texture: linear min/mag filtering + a touch of contrast
        // & saturation so the captured satellite tiles read sharp and realistic.
        try {
          layer.magnificationFilter = C.TextureMagnificationFilter.LINEAR;
          layer.minificationFilter = C.TextureMinificationFilter.LINEAR;
          layer.contrast = 1.06;
          layer.saturation = 1.08;
          layer.gamma = 1.02;
          layer.brightness = 1.02;
        } catch (_) {}
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
    // Clean, well-framed DEFAULT start view: frame the whole Iran→Dubai
    // corridor via an explicit lookAt target (Dubai) + HeadingPitchRange with a
    // damped ease, instead of landing on a raw camera pose. Pitch is clamped.
    this._flyToFrame(TARGETS.dubai(), -18, -55, 380000, Math.max(0.001, d));
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

    // -- DEFECT 3 FIX: render the REAL 3D drone model in the play scene --------
    // Previously the moving drone was a Cesium BILLBOARD built from an SVG data
    // URI whose <svg> declared only a viewBox (no width/height) — Cesium could
    // not rasterise it, so it drew a black quad ("black box"). We now load a
    // real Shahed-136 glTF (public/models/shahed136.glb) as an entity.model,
    // oriented along the flight heading + dive pitch. The billboard is kept as a
    // GUARDED FALLBACK (shown only if the model fails to load) so the drone is
    // never invisible. orientation is a CallbackProperty driven by the same
    // _dronePos/_droneHeading the driver already updates each frame.
    const positionCb = new C.CallbackProperty(() => this._dronePos, false);
    const orientationCb = new C.CallbackProperty(() => {
      try {
        const hpr = new C.HeadingPitchRoll(
          num(this._droneHeading, 0),
          num(this._dronePitch, 0),
          0,
        );
        return C.Transforms.headingPitchRollQuaternion(this._dronePos, hpr);
      } catch (_) { return undefined; }
    }, false);

    this._modelFailed = false;
    this.droneEntity = v.entities.add({
      position: positionCb,
      orientation: orientationCb,
      model: {
        uri: `${import.meta.env.BASE_URL || '/'}shahed136.glb`,
        minimumPixelSize: 64,        // always ≥64px even from corridor distance
        maximumScale: 2000,
        scale: 12,                   // prominent but not unrealistic up close
        runAnimations: false,
        // rely on the GLB's own PBR materials + the scene sun (DEFECT 1 daylight)
        heightReference: C.HeightReference.NONE,
      },
      // billboard fallback (hidden unless the model fails to load — see below)
      billboard: {
        image: MARKER_URIS.shahed,
        width: 46, height: 46,
        rotation: new C.CallbackProperty(() => -this._droneHeading, false),
        alignedAxis: C.Cartesian3.UNIT_Z,
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
        scaleByDistance: new C.NearFarScalar(3000, 1.6, 600000, 0.35),
        show: new C.CallbackProperty(() => this._modelFailed === true, false),
      },
      label: {
        text: 'SHAHED-136 · OWA',
        font: '600 12px Segoe UI', fillColor: C.Color.fromCssColorString(BRAND.accent),
        showBackground: true, backgroundColor: C.Color.fromCssColorString(BRAND.primary).withAlpha(0.8),
        pixelOffset: new C.Cartesian2(0, 26), disableDepthTestDistance: Number.POSITIVE_INFINITY,
        scaleByDistance: new C.NearFarScalar(40000, 1.0, 500000, 0.0),
      },
    });

    // If the glTF fails to load (404 / decode error / GPU), reveal the billboard
    // fallback so the drone is still visible — and log it. Guarded.
    try {
      const model = this.droneEntity.model;
      if (model && model.readyEvent && model.errorEvent) {
        model.errorEvent.addEventListener((err) => {
          // eslint-disable-next-line no-console
          console.warn('[CesiumScene] drone model failed to load → billboard fallback:', err);
          this._modelFailed = true;
        });
      }
    } catch (_) { /* older Cesium: rely on the model, fallback stays hidden */ }

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
    // guarded bloom (may be unavailable on this GPU after renderError recovery)
    try { if (scene.postProcessStages && scene.postProcessStages.bloom) scene.postProcessStages.bloom.uniforms.brightness = on ? 0.25 : -0.2; } catch (_) {}
    // restore the DAYLIGHT intensity (20.0) when leaving thermal, not the old 12.0
    scene.globe.atmosphereLightIntensity = on ? 3.0 : 20.0;
    this.imageryAlpha(on ? 0.32 : 1.0);
    if (!on) this._applyDaylight();              // re-assert daylight leaving thermal
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
    if (this._playing) this._applyDaylight();   // both plays start in daylight
    // HARDENING (fix): make sure nothing about the render/clock config can keep
    // the play sequence from advancing. The progress driver is our own rAF loop,
    // but we also wake the Cesium clock + force continuous rendering on Play so
    // animation is guaranteed to run on every GPU/config.
    try {
      if (this.viewer) {
        const scene = this.viewer.scene;
        if (this._playing) {
          this.viewer.clock.shouldAnimate = true;     // wake the clock
          scene.requestRenderMode = false;            // never throttle while playing
          scene.maximumRenderTimeChange = Infinity;
          scene.requestRender();                       // kick an immediate frame
        } else {
          this.viewer.clock.shouldAnimate = false;
        }
      }
      // re-arm the single driver loop if it was ever cancelled (defensive)
      if (this._playing && !this._destroyed && !this._rafId) this._startLoop();
      // FIX 1: when PAUSED, hand the camera fully back to the user — settle the
      // one-shot driver and drop any reference-frame lock so zoom-out works
      // immediately while paused (the camera must never stay frame-locked idle).
      if (!this._playing && this.viewer) {
        this._camSettled = true;
        this._impactHold = false;
        try { this.viewer.camera.lookAtTransform(C.Matrix4.IDENTITY); } catch (_) {}  // unconditional unlock
        const cc = this._userControls;
        if (cc) { cc.enableInputs = true; cc.enableZoom = true; cc.enableRotate = true; cc.enableTranslate = true; cc.enableTilt = true; }
      }
    } catch (_) { /* non-fatal: rAF driver still advances progress */ }
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
    // DEFECT 3: drive the loaded model's PITCH from the ballistic profile so the
    // terminal dive renders nose-down (p.pitch is the signed flight-path angle:
    // negative = descending → nose-down, which is exactly Cesium HPR's sign).
    this._dronePitch = num(p.pitch, 0);
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
    // -- DEFECT 2 FIX: unmistakable strike VFX at the Warda impact point -------
    // The strike is now: (1) the active camera frames the impact, (2) a white
    // flash, (3) an expanding shockwave ring, (4) a fireball + (5) rising smoke
    // + (6) debris particle systems, and (7) a brief bloom boost so the blast
    // glows. EVERY new piece is wrapped in try/catch so a GPU/runtime that lacks
    // particles or post-processing degrades gracefully (the flash always shows)
    // instead of crashing the play loop.

    // (1) FIX 3: STABLE impact camera. The old code kept FOLLOWING the drone in
    // chase/thermal/topdown at the impact instant — but the drone has stopped, so
    // the per-frame follow jittered. We now ALWAYS stop following, switch the
    // driver to the STATIC 'impact' frame, and damp-fly to centre the impact
    // point, then HOLD steady (no jitter) for the whole explosion. _impactHold
    // blocks any re-follow; after the blast we cleanly hand back to free orbit
    // (lookAtTransform→IDENTITY via _setUserControls). Pitch is clamped (-45°).
    this._impactHold = true;
    this._prevTrackMode = this._trackMode;
    this._trackMode = 'impact';          // static target → no drone follow
    this._camSettled = true;             // the flyTo owns the move
    try { this._flyToFrame(TARGETS.impact(), 18, -45, 2600, 2.2); } catch (_) {}
    // release the hold + hand back to free orbit after the explosion settles
    if (this._impactHoldTimer) { try { clearTimeout(this._impactHoldTimer); } catch (_) {} }
    this._impactHoldTimer = setTimeout(() => {
      if (this._destroyed) return;
      this._impactHold = false;
      this._camSettled = true;
      try { this._setUserControls(true); } catch (_) {}   // resets IDENTITY + enables zoom
    }, 5200);

    // (2a) bright WHITE FLASH billboard at the impact instant that fades fast.
    // A camera-facing billboard reads as a true blast flash (not a ground disc)
    // and is guaranteed visible regardless of view angle.
    let flashBillboard = null;
    try {
      const flashImg = radialSprite('rgba(255,255,255,1)', 'rgba(255,240,200,0.85)');
      if (flashImg) {
        flashBillboard = v.entities.add({
          position: carto(IMPACT_SITE.lon, IMPACT_SITE.lat, IMPACT_SITE.height + 30),
          billboard: {
            image: flashImg, width: 480, height: 480,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
            color: C.Color.WHITE.withAlpha(1.0),
          },
        });
      }
    } catch (_) {}

    // (2b) hot ground flash disc + (3) fast-expanding SHOCKWAVE RING. Both bigger
    // and longer than before so the blast clearly reads from any camera mode.
    const flash = v.entities.add({
      position: carto(IMPACT_SITE.lon, IMPACT_SITE.lat, IMPACT_SITE.height),
      ellipse: { semiMajorAxis: 650, semiMinorAxis: 650, material: C.Color.fromCssColorString('#ff7a18').withAlpha(0.85), height: 10 },
      point: { pixelSize: 40, color: C.Color.fromCssColorString('#fffceb'), disableDepthTestDistance: Number.POSITIVE_INFINITY },
    });
    const shock = v.entities.add({
      position: carto(IMPACT_SITE.lon, IMPACT_SITE.lat, IMPACT_SITE.height + 4),
      ellipse: {
        semiMajorAxis: 150, semiMinorAxis: 150, height: 12,
        fill: false, outline: true,
        outlineColor: C.Color.fromCssColorString('#ffe6a6').withAlpha(0.95), outlineWidth: 6,
      },
    });
    let r = 650, op = 0.85, sr = 150, fb = 1.0, tick = 0;
    const grow = setInterval(() => {
      tick++;
      r += 300; op -= 0.035; sr += 900; fb -= 0.08;   // slower fade → lasts longer
      // flash billboard fades out quickly (first ~0.6s)
      if (flashBillboard) {
        try { flashBillboard.billboard.color = C.Color.WHITE.withAlpha(Math.max(0, fb)); } catch (_) {}
      }
      if (op <= 0 || this._destroyed) {
        clearInterval(grow);
        try { v.entities.remove(flash); v.entities.remove(shock); if (flashBillboard) v.entities.remove(flashBillboard); } catch (_) {}
        return;
      }
      flash.ellipse.semiMajorAxis = r; flash.ellipse.semiMinorAxis = r;
      flash.ellipse.material = C.Color.fromCssColorString('#ff7a18').withAlpha(Math.max(0, op));
      shock.ellipse.semiMajorAxis = sr; shock.ellipse.semiMinorAxis = sr;
      shock.ellipse.outlineColor = C.Color.fromCssColorString('#ffe6a6').withAlpha(Math.max(0, op));
    }, 60);

    // (4–6) particle systems: fireball + smoke + debris (sprite PNGs)
    try { this._spawnImpactParticles(); } catch (e) { /* particles unsupported → flash/shock still play */ }

    // (7) stronger, temporary BLOOM boost so the blast glows, then restore (guarded)
    try {
      const bloom = v.scene.postProcessStages && v.scene.postProcessStages.bloom;
      if (bloom) {
        const prev = bloom.uniforms.brightness;
        bloom.enabled = true;
        bloom.uniforms.brightness = 0.9;                 // brighter spike
        setTimeout(() => { try { bloom.uniforms.brightness = this.thermal ? 0.25 : prev; } catch (_) {} }, 1800);
      }
    } catch (_) {}
  }

  // DEFECT 2 helper: three short-lived Cesium ParticleSystems at the impact
  // point — a bright fireball, rising dark smoke, and scattered debris. Each is
  // added to scene.primitives with an ENU model matrix and auto-removed after a
  // few seconds. Fully guarded by the caller; any failure leaves the flash/shock
  // intact. Uses runtime-generated radial sprites (no shipped image assets).
  _spawnImpactParticles() {
    const scene = this.viewer.scene;
    if (!C.ParticleSystem || !C.CircleEmitter) return;   // capability check
    const pos = carto(IMPACT_SITE.lon, IMPACT_SITE.lat, IMPACT_SITE.height + 6);
    if (!validCartesian(pos)) return;
    const modelMatrix = C.Transforms.eastNorthUpToFixedFrame(pos);
    // FIX 2: prefer the committed transparent explosion sprite PNGs in public/.
    // If a fetch/decode fails, Cesium falls back to the runtime radial sprite
    // (passed as `image` only when the PNG is unavailable) so the blast never
    // disappears. Paths are BASE_URL-relative so they resolve on any deploy root.
    const base = (import.meta.env.BASE_URL || '/');
    const fireImg  = `${base}explosion-fireball.png`;
    const smokeImg = `${base}explosion-smoke.png`;
    const debrisImg = `${base}explosion-debris.png`;
    const fireFallback = radialSprite('rgba(255,244,190,1)', 'rgba(255,122,24,0.9)');
    const smokeFallback = radialSprite('rgba(90,90,90,0.9)', 'rgba(40,40,40,0.6)');
    const debrisFallback = radialSprite('rgba(60,40,24,1)', 'rgba(20,14,8,0.7)');
    const systems = [];

    // fireball — BIGGER + denser burst, brighter, lasts longer before settling
    systems.push(new C.ParticleSystem({
      image: fireImg, modelMatrix,
      startColor: C.Color.fromCssColorString('#fff6d0').withAlpha(1.0),
      endColor: C.Color.fromCssColorString('#ff3a12').withAlpha(0.0),
      startScale: 1.6, endScale: 9.0,                       // larger growth
      minimumParticleLife: 0.9, maximumParticleLife: 2.4,   // longer life
      minimumSpeed: 28, maximumSpeed: 95,                    // faster expansion
      imageSize: new C.Cartesian2(90, 90),                   // bigger sprites
      emissionRate: 0,
      bursts: [
        new C.ParticleBurst({ time: 0.0, minimum: 320, maximum: 460 }),  // denser
        new C.ParticleBurst({ time: 0.25, minimum: 120, maximum: 200 }),
      ],
      lifetime: 2.4,
      emitter: new C.SphereEmitter(10.0),
    }));
    // smoke — large, billowing, rising, long-lived plume
    systems.push(new C.ParticleSystem({
      image: smokeImg, modelMatrix,
      startColor: C.Color.fromCssColorString('#4a4a4d').withAlpha(0.9),
      endColor: C.Color.fromCssColorString('#161618').withAlpha(0.0),
      startScale: 3.0, endScale: 22.0,                       // huge plume
      minimumParticleLife: 2.6, maximumParticleLife: 5.0,    // lingers
      minimumSpeed: 6, maximumSpeed: 22,
      imageSize: new C.Cartesian2(120, 120),
      emissionRate: 140,                                     // much denser
      lifetime: 3.4,
      emitter: new C.CircleEmitter(12.0),
    }));
    // debris — many fast scattered embers on ballistic arcs
    systems.push(new C.ParticleSystem({
      image: debrisImg, modelMatrix,
      startColor: C.Color.fromCssColorString('#ff7a2a').withAlpha(1.0),
      endColor: C.Color.fromCssColorString('#140e08').withAlpha(0.0),
      startScale: 1.0, endScale: 0.3,
      minimumParticleLife: 1.0, maximumParticleLife: 2.6,
      minimumSpeed: 45, maximumSpeed: 130,                   // flung further
      imageSize: new C.Cartesian2(18, 18),
      emissionRate: 0,
      bursts: [ new C.ParticleBurst({ time: 0.0, minimum: 140, maximum: 220 }) ],
      lifetime: 2.4,
      emitter: new C.ConeEmitter(C.Math.toRadians(62)),
    }));

    // If the PNG textures didn't decode, swap in the runtime radial fallbacks so
    // the blast always renders (image can be reassigned before first render).
    const fallbacks = [fireFallback, smokeFallback, debrisFallback];
    systems.forEach((s, i) => {
      try { scene.primitives.add(s); } catch (_) {}
      // Cesium loads the image async; if it errors, fall back. Guarded.
      try {
        if (fallbacks[i]) {
          const img = new Image();
          img.onerror = () => { try { s.image = fallbacks[i]; } catch (_) {} };
          img.src = [fireImg, smokeImg, debrisImg][i];
        }
      } catch (_) {}
    });
    // auto-cleanup after the (longer) blast finishes
    setTimeout(() => {
      systems.forEach((s) => { try { if (!s.isDestroyed || !s.isDestroyed()) scene.primitives.remove(s); } catch (_) {} });
    }, 6500);
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
    this._applyDaylight();                        // lighting never flips to night
    try { this.viewer.resize(); } catch (_) {}    // refresh aspect / projection matrix

    // STATIC camera points fly to an EXPLICIT lookAt target + HeadingPitchRange
    // with a damped ease (no snapping). Dynamic follow/auto modes (chase,
    // topdown, orbit, thermal, cinema) stay on the per-frame damped driver.
    if (id === 'launch') {
      this._flyToFrame(TARGETS.launch(), 20, -32, 9000, 2.2);
    } else if (id === 'impact') {
      this._flyToFrame(TARGETS.impact(), 18, -42, 4200, 2.2);
    } else if (id === 'freefly') {
      // clean, well-framed overview of the whole corridor (Dubai-centred)
      this._flyToFrame(TARGETS.dubai(), -18, -55, 360000, 2.4);
    }
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
    if (cc.enableInputs === enabled) return;      // avoid per-frame churn (transition only)
    // FIX 1: the MOMENT the user regains control, drop any reference-frame lock
    // (lookAtTransform / viewBoundingSphere leaves the camera bound to an ENU
    // frame, which silently disables zoom-out). Resetting to IDENTITY here means
    // free orbit + zoom always work the instant a scripted move ends — across
    // all 8 modes — and the controller's min/max zoom distances apply globally.
    if (enabled && this.viewer) {
      try { this.viewer.camera.lookAtTransform(C.Matrix4.IDENTITY); } catch (_) {}
      cc.enableZoom = true; cc.enableRotate = true; cc.enableTranslate = true; cc.enableTilt = true;
    }
    cc.enableInputs = enabled;
  }

  // Damped, eased flyTo that frames an EXPLICIT lookAt target with a
  // HeadingPitchRange so the target is always centred and correctly framed.
  // Pitch is clamped to the sane band; on completion lookAtTransform is reset
  // to IDENTITY so free orbit/zoom keeps working from the new pose (no snap).
  // Used for every STATIC camera point (launch, impact, the 6 waypoints,
  // overview) and on the impact event — never an instant position jump.
  _flyToFrame(targetCartesian, headingDeg, pitchDeg, rangeM, duration = 2.0) {
    if (!this.viewer || !validCartesian(targetCartesian)) return;
    const cam = this.viewer.camera;
    const pitch = clampPitch(pitchDeg);                       // never edge-on / nadir
    const range = Math.max(120, num(rangeM, 5000));
    const hpr = new C.HeadingPitchRange(
      C.Math.toRadians(num(headingDeg, 0)),
      C.Math.toRadians(pitch),
      range,
    );
    // a small bounding sphere at the target → flyToBoundingSphere centres it
    const sphere = new C.BoundingSphere(targetCartesian, Math.max(1, range * 0.1));
    try { cam.cancelFlight(); } catch (_) {}
    this._flying = true;
    this._camSettled = true;            // the flyTo owns the move; driver stands down
    cam.flyToBoundingSphere(sphere, {
      offset: hpr,
      duration: num(duration, 2.0),
      easingFunction: C.EasingFunction.QUADRATIC_IN_OUT,   // damped ease in/out
      complete: () => {
        this._flying = false;
        // restore free orbit/zoom around the framed point, then drop the
        // reference frame so the global controller (pan/zoom/tilt) is free again.
        try { cam.lookAtTransform(C.Matrix4.IDENTITY); } catch (_) {}
        this._camFrame = this._currentCameraFrame() || this._camFrame;
      },
      cancel: () => { this._flying = false; },
    });
  }

  // Gentle per-frame pitch clamp for USER interaction. Only engages when the
  // user has driven the camera OUT of the sane band — then damps pitch back to
  // the nearest bound (so the camera can never end up edge-on, under the
  // terrain, or badly straight-down). Inside the band the user is left alone,
  // so free pan/zoom/rotate/tilt keep working.
  _clampUserPitch(dt) {
    if (this._flying || !this.viewer) return;
    const cam = this.viewer.camera;
    const pitchDeg = C.Math.toDegrees(cam.pitch);
    if (!Number.isFinite(pitchDeg)) return;
    if (pitchDeg >= PITCH_MIN && pitchDeg <= PITCH_MAX) return;   // in band → free
    const corrected = dampAngleDeg(pitchDeg, clampPitch(pitchDeg), 6.0, dt);
    const c = cam.positionCartographic;
    if (!c || !Number.isFinite(c.height)) return;
    cam.setView({
      destination: carto(C.Math.toDegrees(c.longitude), C.Math.toDegrees(c.latitude), c.height),
      orientation: { heading: cam.heading, pitch: C.Math.toRadians(corrected), roll: 0 },
    });
  }

  // Compute the TARGET camera frame for a mode at the current progress. Returns
  // {lon,lat,h,heading,pitch} (degrees) or null. All inputs NaN-guarded.
  _targetFrame(mode) {
    const frame = (lon, lat, h, headingDeg, pitchDeg) => {
      if (!Number.isFinite(lon) || !Number.isFinite(lat) || !Number.isFinite(h)) return null;
      // every follow-mode target pitch is clamped into the sane band too, so no
      // mode (incl. top-down) can ever go edge-on or degenerate at the nadir.
      return { lon, lat, h, heading: num(headingDeg, 0), pitch: clampPitch(pitchDeg) };
    };
    const p = this._posAt(this.progress);
    const lon = num(p.lon), lat = num(p.lat), h = num(p.height, IMPACT_SITE.height);
    const diving = this.progress >= (this.ballistic?.diveStart ?? 0.86);
    const divePitchDeg = diving ? num(C.Math.toDegrees(num(p.pitch))) : 0;
    const b0 = this._posAt(Math.max(0, this.progress - 0.01));
    const hdgDeg = num(bearing(num(b0.lon, lon), num(b0.lat, lat), lon, lat), this._camFrame?.heading || 0);
    // LOOK-AHEAD bearing: aim the chase camera at a point slightly AHEAD of the
    // drone along the path tangent (velocity direction), not straight at it, so
    // the shot leads the airframe and feels cinematic.
    const la = this._posAt(Math.min(1, this.progress + 0.02));
    const lookAheadHdg = num(bearing(lon, lat, num(la.lon, lon), num(la.lat, lat)), hdgDeg);

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
        // position BEHIND + ABOVE the drone (opposite the look-ahead heading),
        // and aim along the look-ahead tangent so the camera leads the airframe.
        const back = destPoint(lon, lat, (lookAheadHdg + 180) % 360, diving ? 900 : 1400);
        return frame(back[0], back[1], h + (diving ? 320 : 500), lookAheadHdg, -12 + (diving ? divePitchDeg * 0.7 : 0));
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

    // While an eased flyTo (static point / waypoint / impact) is in flight, the
    // driver stands down entirely so it never fights the tween.
    if (this._flying) { this._setUserControls(false); return; }

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
    if (!scripted) {
      this._clampUserPitch(dt);     // keep user-driven pitch inside the sane band
      return;                        // user owns the camera
    }

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
    this._applyDaylight();                        // keep daylight at every waypoint
    const w = wp[idx];

    // Frame each of the 6 waypoints with an EXPLICIT lookAt target (the real
    // waypoint Cartesian3) + a HeadingPitchRange, via a damped eased flyTo so
    // the stop is always centred and correctly framed (no edge-on, no snap).
    // Range scales with the waypoint's cruise altitude so the airframe + ground
    // both stay in frame; pitch is clamped into the sane band.
    this.camMode = 'waypoint';
    this._trackMode = 'waypoint';
    this._applyFrustum('waypoint');
    try { this.viewer.resize(); } catch (_) {}
    const targetH = num(this._altAt(t), w.alt || 0);
    const target = carto(num(w.lon), num(w.lat), targetH);
    const range = clamp(4200 + targetH * 1.2, 3200, 14000);
    this._flyToFrame(target, 18, -38, range, 1.8);
    return { idx, ...this.readout() };
  }

  setLayer(name, on) {
    if (name === 'corridor' && this.corridorEntity) this.corridorEntity.show = on;
    if (name === 'geofence' && this.geofenceEntity) this.geofenceEntity.show = on;
    if (name === 'waypoints') this.waypointEntities.forEach((e) => (e.show = on));
  }

  // Realism tuning for ANY Cesium3DTileset already configured in the scene
  // (Task B). Lower maximumScreenSpaceError for sharper detail, sensible
  // skipLevelOfDetail + preload flags, anisotropic texture filtering + mipmaps,
  // and dynamic environment lighting so tile faces are lit consistently with
  // the scene sun/atmosphere. Wrapped defensively so unsupported props in any
  // Cesium build are skipped without breaking the load.
  _tuneTileset(ts) {
    if (!ts) return ts;
    try {
      ts.maximumScreenSpaceError = 8;          // sharper detail (was 12) — range 8–12
      ts.maximumMemoryUsage = 1024;            // MB budget for higher LOD
      ts.skipLevelOfDetail = true;             // stream high LOD faster
      ts.baseScreenSpaceError = 1024;
      ts.skipScreenSpaceErrorFactor = 16;
      ts.skipLevels = 1;
      ts.immediatelyLoadDesiredLevelOfDetail = false;
      ts.loadSiblings = true;                  // fewer holes around the focus tile
      ts.preloadWhenHidden = true;             // keep tiles warm when occluded
      ts.preloadFlightDestinations = true;     // warm tiles at a flyTo destination
      ts.cullWithChildrenBounds = true;
      ts.dynamicScreenSpaceError = true;       // relax SSE in the distance (perf)
      ts.dynamicScreenSpaceErrorDensity = 0.00278;
      ts.dynamicScreenSpaceErrorFactor = 4.0;
      // light tiles with the scene's sun + image-based/ambient lighting
      if ('imageBasedLighting' in ts && this.viewer?.scene?.imageBasedLighting) {
        ts.imageBasedLighting = this.viewer.scene.imageBasedLighting;
      }
      if ('enableModelExperimental' in ts) ts.enableModelExperimental = true;
      // anisotropic texture filtering + mipmaps for crisp oblique ground tiles
      ts.maximumTextureSize = 4096;
    } catch (_) { /* unsupported prop in this build → ignore */ }
    return ts;
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
        this._tuneTileset(photoreal);                 // realism tuning (Task B)
        this.viewer.scene.primitives.add(photoreal);
        this._photoreal = photoreal;
        return { ok: true, msg: 'Google Photorealistic 3D Tiles + World Terrain active' };
      } catch (e) {
        try {
          const osm = await C.createOsmBuildingsAsync();
          this._tuneTileset(osm);
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
    try { if (this._impactHoldTimer) clearTimeout(this._impactHoldTimer); } catch (_) {}  // FIX 3: no dangling timer
    try { if (this._onResize) window.removeEventListener('resize', this._onResize); } catch (_) {}
    try { this._ro && this._ro.disconnect(); } catch (_) {}
    try { this.handler && this.handler.destroy(); } catch (_) {}
    try { this.viewer && this.viewer.destroy(); } catch (_) {}
  }
}
