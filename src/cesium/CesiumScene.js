// ============================================================================
//  CesiumScene — IMP-08 Warda strike 3D theatre + overwatch engine (pure Cesium)
//  React drives it imperatively:
//    setProgress(t01), setCamMode(id), gotoWaypoint(i), setThermal(on),
//    setLayer(name,on), setImageryMode(mode), setPlaying(b), onReady(cb), onPick(cb)
//
//  ── VISUAL-REALISM UPGRADE (NO CESIUM ION TOKEN) ──────────────────────────
//  Imagery  : LIVE, key-free ESRI World Imagery (real global satellite base) via
//             ArcGisMapServerImageryProvider.fromUrl — with a token-free Carto
//             "Dark Matter" alternate base (UrlTemplateImageryProvider) and a
//             high-detail local Al-Warqa impact patch draped on top.
//  Terrain  : LIVE, key-free ESRI World Terrain (ArcGISTiledElevationTerrain-
//             Provider.fromUrl) with a graceful EllipsoidTerrainProvider fallback
//             if the network/provider is unavailable at the venue.
//  Cinematic: HDR + ACES tone mapping, bloom, screen-space ambient occlusion,
//             FXAA + MSAAx4, sky/ground atmosphere, distance fog, sun-driven
//             globe lighting and soft dynamic shadows.
//  Perf     : capped resolutionScale, larger globe tileCacheSize, tuned
//             maximumScreenSpaceError + maximumRenderTimeChange for smooth play.
//  NO Cesium ion token, NO Google key, NO AI-generated image assets anywhere.
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
    this.ionMode = 'free';          // retained for API compatibility; always 'free' (no Ion)
    this.imageryMode = 'satellite'; // 'satellite' (ESRI World Imagery) | 'dark' (Carto Dark Matter)
    this._baseLayers = {};          // { satellite, dark } live ImageryLayer handles
    this._detailLayers = [];        // high-detail local overlays draped on top
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
    // VISUAL-REALISM UPGRADE (NO CESIUM ION TOKEN): the globe now streams LIVE,
    // key-free imagery + terrain at the venue (internet available). The base
    // layer is real ESRI World Imagery (global satellite); a token-free Carto
    // "Dark Matter" base is available as an alternate; and a high-detail local
    // Al-Warqa impact patch is draped on top for the terminal-dive close-up.
    // Terrain is live ESRI World Terrain with an ellipsoid fallback. NOTHING
    // here needs a Cesium ion / Google key.
    this.viewer = new C.Viewer(this.container, {
      baseLayer: false,            // base layers are added explicitly in _addBaseImagery()
      baseLayerPicker: false, geocoder: false, homeButton: false,
      sceneModePicker: false, navigationHelpButton: false, animation: false,
      timeline: false, fullscreenButton: false, infoBox: false,
      selectionIndicator: false, shadows: true,
      terrainShadows: C.ShadowMode.ENABLED, requestRenderMode: false,
      contextOptions: { webgl: { alpha: false, antialias: true, powerPreference: 'high-performance' } },
    });
    this.viewer._cesiumWidget._creditContainer.style.display = 'none';
    this._addBaseImagery();          // LIVE ESRI World Imagery + Carto Dark + local detail patch
    this._loadTerrain();             // LIVE ESRI World Terrain → ellipsoid fallback (no Ion)

    const scene = this.viewer.scene;

    // -- PERFORMANCE: smooth playback tuning (no Ion) --------------------------
    // Cap the render resolution to the device pixel ratio (≤2×) so high-DPI
    // panels stay sharp without paying a 3-4× fill-rate cost during the strike.
    try { this.viewer.resolutionScale = Math.min(window.devicePixelRatio || 1, 2.0); } catch (_) {}
    // Bigger globe tile cache → far fewer imagery/terrain reloads while the
    // camera sweeps the whole Iran→Dubai corridor (default is 100).
    try { scene.globe.tileCacheSize = 1000; } catch (_) {}
    // requestRenderMode: this scene owns a continuous rAF driver loop (playback +
    // camera smoothing), so CONTINUOUS rendering is the correct mode for glitch-
    // free animation — but we still tune maximumRenderTimeChange so that while
    // idle (paused, no camera motion) Cesium coalesces frames instead of busy-
    // spinning the GPU. During Play, setPlaying() forces requestRenderMode=false
    // + maximumRenderTimeChange=Infinity so nothing throttles the strike.
    try {
      scene.requestRenderMode = false;              // continuous during the animated theatre
      scene.maximumRenderTimeChange = 1.0;          // idle-frame coalescing budget (s)
    } catch (_) {}

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
          if (pp) {
            if (pp.bloom) pp.bloom.enabled = false;
            if (pp.fxaa) pp.fxaa.enabled = false;
            if (pp.ambientOcclusion) pp.ambientOcclusion.enabled = false;   // AO off on recovery
            pp.removeAll && pp.removeAll();
          }
        } catch (_) {}
        try { if (scene.shadowMap) scene.shadowMap.softShadows = false; } catch (_) {}
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
    // MSAA: DEFECT 3 FIX — BLANK GLOBE ROOT CAUSE. `scene.msaaSupported` reports
    // `true` on several real-world WebGL backends (SwiftShader/software-GL,
    // some ANGLE/D3D11 and mobile GPU drivers) whose actual MSAA *resolve* still
    // fails at runtime with `GL_INVALID_OPERATION: glBlitFramebuffer: Read and
    // write depth stencil attachments cannot be the same image` — reproduced
    // and confirmed live via headless Chromium DevTools Protocol console
    // capture against this exact scene (shadows:true + terrainShadows enabled
    // + msaaSamples=4 together trigger a packed depth-stencil blit Cesium's
    // multisample-resolve path cannot satisfy on that backend). Because this is
    // a raw WebGL error surfaced only via gl.getError() — NOT a thrown JS
    // exception — scene.renderError (the recovery listener above) never fires,
    // so the opaque globe/terrain draw call silently no-ops on EVERY frame
    // while the separate billboard/label draw path (marker + "WARDA · STRIKE
    // IMPACT" text, which disables depth-testing via
    // disableDepthTestDistance and never touches the MSAA-resolved target)
    // keeps rendering fine — exactly the "marker floats over a black void"
    // symptom. `msaaSupported` is a capability-string check, not a live
    // resolve-path probe, so it cannot detect this. Default OFF (native AA):
    // eliminates the failing blit entirely (verified: 0 GL errors over an 8s
    // render-loop capture, vs. one error per frame at msaaSamples=4) while
    // FXAA (already enabled below) keeps edges reasonably smooth.
    try { scene.msaaSamples = 1; } catch (_) {}
    // FXAA: cheap, broadly supported, but still guarded.
    try {
      if (scene.postProcessStages && scene.postProcessStages.fxaa) {
        scene.postProcessStages.fxaa.enabled = true;
      }
    } catch (_) { /* FXAA unavailable → MSAA/native AA still apply */ }
    // physically based sun + globe lighting (daytime reconstruction — not night)
    scene.globe.enableLighting = true;
    scene.globe.dynamicAtmosphereLighting = true;
    scene.globe.dynamicAtmosphereLightingFromSun = true;
    scene.globe.showGroundAtmosphere = true;
    scene.globe.atmosphereLightIntensity = 28.0;   // bright midday key light
    // image-based / ambient lighting so shadowed faces read with realistic fill
    try {
      scene.globe.lightingFadeOutDistance = 40_000.0;
      scene.globe.lightingFadeInDistance = 20_000.0;
      scene.globe.nightFadeOutDistance = 40_000.0;
      scene.globe.atmosphereScatteringIntensity = 2.2;
      if (scene.light) scene.light.intensity = 5.0;             // midday sun intensity
      if ('imageBasedLighting' in scene && scene.imageBasedLighting) {
        scene.imageBasedLighting.imageBasedLightingFactor = new C.Cartesian2(1.0, 1.0);
        scene.imageBasedLighting.luminanceAtZenith = 0.65;      // brighter ambient IBL fill
      }
      if ('sphericalHarmonicCoefficients' in scene) { /* default env IBL kept */ }
    } catch (_) {}
    scene.globe.depthTestAgainstTerrain = true;    // tiles/markers sit on terrain
    scene.globe.baseColor = C.Color.fromCssColorString('#1a2a3a'); // lighter base (day)
    scene.globe.maximumScreenSpaceError = 1.5;     // sharper terrain/imagery detail
    scene.globe.preloadSiblings = true;            // fewer holes while moving
    // tuned distance fog → depth cue without washing labels/corridor out
    scene.fog.enabled = true;
    scene.fog.density = 0.00002; // near-clear midday haze
    scene.fog.screenSpaceErrorFactor = 4.0;
    scene.skyAtmosphere.show = true;
    scene.skyAtmosphere.atmosphereLightIntensity = 28.0;
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
        // OFF for label clarity — glow was smearing Cesium callouts (Southern Gulf / WARDA IMPACT)
        bloom.enabled = false;
        bloom.uniforms.glowOnly = false;
        bloom.uniforms.contrast = 80;
        bloom.uniforms.brightness = -0.55;   // v2: deeper off-state, no neon wash
        bloom.uniforms.delta = 0.6;
        bloom.uniforms.sigma = 1.0;
        bloom.uniforms.stepSize = 0.6;
      }
    } catch (_) { /* bloom unavailable on this GPU → skip glow */ }

    // -- SCREEN-SPACE AMBIENT OCCLUSION (SSAO) --------------------------------
    // Cesium ships an ambient-occlusion post-process stage that darkens creases
    // and where geometry meets the ground — it grounds the buildings/drone and
    // adds cinematic contact shadowing. It needs a depth texture, so it is
    // FEATURE-DETECTED + guarded (no-ops on GPUs/contexts without depth support,
    // exactly like the bloom/silhouette stages) and is disabled on renderError.
    // v2: keep AO mild so it does not darken HUD-adjacent globe labels.
    try {
      const ao = scene.postProcessStages && scene.postProcessStages.ambientOcclusion;
      if (ao) {
        ao.enabled = true;
        if (ao.uniforms) {
          ao.uniforms.intensity = 1.8;         // softer darkening (was 3.2)
          ao.uniforms.bias = 0.12;             // avoid self-occlusion acne
          ao.uniforms.lengthCap = 0.22;        // max world-space sample radius
          ao.uniforms.stepSize = 1.6;
          ao.uniforms.blurStepSize = 0.7;      // softer AO term
        }
      }
    } catch (_) { /* AO unsupported on this GPU → skip contact shadowing */ }

    // -- DYNAMIC SOFT SHADOWS --------------------------------------------------
    // The viewer was created with shadows:true; here we tune the shadow map for
    // presentation-grade SOFT shadows (PCF), a larger map for crisp edges, and a
    // sun-driven light source so the drone + buildings cast real shadows across
    // the corridor. All guarded so a weak GPU simply keeps hard/again-safe shadows.
    try {
      const sm = scene.shadowMap;
      if (sm) {
        sm.enabled = true;
        sm.softShadows = true;                 // PCF soft-shadow filtering
        sm.size = 2048;                        // sharper shadow edges (was default 2048/1024)
        sm.darkness = 0.34;                    // how dark the shadowed areas read
        sm.maximumDistance = 8000.0;           // shadow range around the focus
        if ('normalOffset' in sm) sm.normalOffset = true;
        if ('fadingEnabled' in sm) sm.fadingEnabled = true;
      }
    } catch (_) { /* shadow map tuning unsupported → viewer default shadows */ }

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
      // Fixed MIDDAY daylight from TIMELINE (daytime framing, not night clock).
      // Stored so EVERY camera mode / play / thermal toggle re-asserts it via
      // _applyDaylight() and lighting can never flip to a night clock time.
      this._dayIso = (TIMELINE && TIMELINE.dayIso) || '2025-06-21T08:00:00Z';
      this._applyDaylight();
      // Make the sun the lighting source and ensure globe lighting is on so the
      // daylight actually reaches terrain/imagery in every mode.
      if (scene.sun) scene.sun.show = true;
      if (scene.moon) scene.moon.show = false;
      scene.globe.enableLighting = true;
      try {
        scene.globe.dynamicAtmosphereLighting = true;
        scene.globe.dynamicAtmosphereLightingFromSun = true;
        scene.globe.showGroundAtmosphere = true;
      } catch (_) {}
      // brighten the lit side so captured imagery never reads muddy/black
      scene.globe.atmosphereLightIntensity = 32.0;
      try {
        scene.light = new C.SunLight();        // explicit physically based sun
        scene.light.intensity = 5.0;
      } catch (_) {}
    } catch (_) { /* keep default clock/lighting if anything is unavailable */ }

    // Terrain: LIVE, key-free ESRI World Terrain is loaded asynchronously in
    // _loadTerrain() (called from _initViewer) with an EllipsoidTerrainProvider
    // fallback if the network/provider is unavailable at the venue. No Cesium
    // ion token is used anywhere.
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
      // Prefer TIMELINE.dayIso every call so a stale night ISO cannot stick.
      const dayIso = (TIMELINE && TIMELINE.dayIso) || this._dayIso || '2025-06-21T08:00:00Z';
      this._dayIso = dayIso;
      try {
        this.viewer.clock.currentTime = C.JulianDate.fromIso8601(dayIso);
        // Lock the presentation clock — do not animate into night/dusk.
        if (TIMELINE && TIMELINE.lockClock !== false) {
          this.viewer.clock.shouldAnimate = false;
          this.viewer.clock.multiplier = 0;
          if (this.viewer.clock.clockRange != null && C.ClockRange) {
            this.viewer.clock.clockRange = C.ClockRange.UNBOUNDED;
          }
        }
      } catch (_) {}
      scene.globe.enableLighting = true;                 // sun lighting in EVERY mode
      try {
        scene.globe.dynamicAtmosphereLighting = true;
        scene.globe.dynamicAtmosphereLightingFromSun = true;
      } catch (_) {}
      if (scene.sun) scene.sun.show = true;
      if (scene.moon) scene.moon.show = false;
      if (scene.skyAtmosphere) {
        scene.skyAtmosphere.show = true;
        try { scene.skyAtmosphere.atmosphereLightIntensity = 32.0; } catch (_) {}
      }
      // Daytime: near-clear haze only — keep horizon + labels readable
      if (scene.fog) {
        scene.fog.enabled = true;
        scene.fog.density = 0.00002;
      }
      scene.globe.showGroundAtmosphere = true;
      try { scene.globe.atmosphereLightIntensity = 32.0; } catch (_) {}
      // Physically based midday sun (not a fixed flashlight at the camera)
      try {
        if (!(scene.light instanceof C.SunLight)) scene.light = new C.SunLight();
        scene.light.intensity = 5.0;
      } catch (_) {}
      // Keep bloom OFF so globe labels stay sharp (no neon wash / motion smear)
      try {
        const bloom = scene.postProcessStages && scene.postProcessStages.bloom;
        if (bloom) {
          bloom.enabled = false;
          if (bloom.uniforms) {
            bloom.uniforms.brightness = -0.5;
            bloom.uniforms.glowOnly = false;
          }
        }
      } catch (_) {}
      // Soften AO so it does not darken label plates / horizon
      try {
        const ao = scene.postProcessStages && scene.postProcessStages.ambientOcclusion;
        if (ao && ao.uniforms) {
          ao.uniforms.intensity = Math.min(ao.uniforms.intensity || 2.0, 2.0);
          ao.uniforms.blurStepSize = 0.7;
        }
      } catch (_) {}
    } catch (_) { /* never let a lighting refresh break a mode switch */ }
  }

  // Shared imagery-layer polish: crisp linear filtering + a touch of contrast /
  // saturation so both the live satellite base and the local detail patch read
  // sharp and cinematic. Guarded so an unsupported prop never breaks the load.
  _tuneImageryLayer(layer, opts = {}) {
    try {
      layer.magnificationFilter = C.TextureMagnificationFilter.LINEAR;
      layer.minificationFilter = C.TextureMinificationFilter.LINEAR;
      if (opts.contrast != null) layer.contrast = opts.contrast;
      if (opts.saturation != null) layer.saturation = opts.saturation;
      if (opts.gamma != null) layer.gamma = opts.gamma;
      if (opts.brightness != null) layer.brightness = opts.brightness;
    } catch (_) {}
    return layer;
  }

  // ── LIVE base imagery (NO CESIUM ION TOKEN) ───────────────────────────────
  // Real ESRI World Imagery global satellite base (key-free public MapServer) +
  // a token-free Carto "Dark Matter" alternate base + a high-detail local
  // Al-Warqa impact patch draped on top for the terminal-dive close-up. React
  // switches the active base via setImageryMode('satellite' | 'dark').
  _addBaseImagery() {
    const layers = this.viewer.imageryLayers;

    // (1) ESRI World Imagery — real global satellite, NO KEY. This is exactly the
    //     public REST MapServer endpoint requested for the scene. fromProviderAsync
    //     returns the layer synchronously and resolves the provider in the
    //     background, so init never blocks or throws on a slow network.
    try {
      const esri = C.ImageryLayer.fromProviderAsync(
        C.ArcGisMapServerImageryProvider.fromUrl(
          'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
          { enablePickFeatures: false }
        ),
        {}
      );
      this._tuneImageryLayer(esri, { contrast: 1.06, saturation: 1.10, gamma: 1.02, brightness: 1.02 });
      layers.add(esri);
      this._baseLayers.satellite = esri;
    } catch (_) { /* Carto + detail patch below still give a usable base */ }

    // (2) Carto "Dark Matter" — token-free tactical dark basemap (alternate).
    //     Added hidden; setImageryMode('dark') reveals it and hides satellite.
    try {
      const carto = new C.ImageryLayer(
        new C.UrlTemplateImageryProvider({
          url: 'https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
          subdomains: ['a', 'b', 'c', 'd'],
          maximumLevel: 20,
          credit: '© OpenStreetMap contributors © CARTO',
        })
      );
      carto.show = false;
      this._tuneImageryLayer(carto, { contrast: 1.12, saturation: 0.92, gamma: 1.0, brightness: 1.02 });
      layers.add(carto);
      this._baseLayers.dark = carto;
    } catch (_) { /* satellite base still active */ }

    // (3) High-detail LOCAL Al-Warqa impact patch draped on top of the live base
    //     for the terminal-dive close-up (a real committed satellite capture —
    //     NOT AI-generated). SingleTileImageryProvider.fromUrl (the constructor
    //     is deprecated in Cesium 1.122) → wrapped in fromProviderAsync.
    this._addDetailPatch(IMAGERY.captures.alwarqa2d.file, 55.4045, 25.1858, 0.06, 1.0);
  }

  // Drape one high-detail local capture as a georeferenced imagery layer on top
  // of the live base (used for the impact-site close-up). Fully guarded.
  _addDetailPatch(file, lonC, latC, halfDeg, alpha) {
    try {
      const rect = C.Rectangle.fromDegrees(lonC - halfDeg, latC - halfDeg, lonC + halfDeg, latC + halfDeg);
      const layer = C.ImageryLayer.fromProviderAsync(
        C.SingleTileImageryProvider.fromUrl(file, { rectangle: rect, tileWidth: 256, tileHeight: 256 }),
        {}
      );
      if (alpha != null) layer.alpha = alpha;
      this._tuneImageryLayer(layer, { contrast: 1.06, saturation: 1.08, gamma: 1.02, brightness: 1.02 });
      this.viewer.imageryLayers.add(layer);
      this._detailLayers.push(layer);
      return layer;
    } catch (_) { return null; }
  }

  // ── LIVE terrain (NO CESIUM ION TOKEN) ────────────────────────────────────
  // Real ESRI World Terrain (key-free WorldElevation3D/Terrain3D ImageServer)
  // with a graceful EllipsoidTerrainProvider fallback if the provider/network is
  // unavailable at the venue. Async so init never blocks on the network; the
  // scene runs immediately on the ellipsoid and swaps to 3D terrain when ready.
  async _loadTerrain() {
    try {
      const terrain = await C.ArcGISTiledElevationTerrainProvider.fromUrl(
        'https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer'
      );
      if (this._destroyed || !this.viewer) return;
      this.viewer.terrainProvider = terrain;
      this.terrainMode = 'esri-world-terrain';
      try { this.viewer.scene.requestRender(); } catch (_) {}
    } catch (_) {
      // key-free venue fallback: smooth ellipsoid (no network) — scene still runs
      try { if (this.viewer) this.viewer.terrainProvider = new C.EllipsoidTerrainProvider(); } catch (__) {}
      this.terrainMode = 'ellipsoid-fallback';
    }
  }

  // Switch the active LIVE base imagery: 'satellite' (ESRI World Imagery) or
  // 'dark' (Carto Dark Matter). The local Al-Warqa detail patch stays on top in
  // both modes. Replaces the old Cesium-ion upgrade path (no token anywhere).
  setImageryMode(mode) {
    const m = mode === 'dark' ? 'dark' : 'satellite';
    this.imageryMode = m;
    try {
      if (this._baseLayers.satellite) this._baseLayers.satellite.show = (m === 'satellite');
      if (this._baseLayers.dark) this._baseLayers.dark.show = (m === 'dark');
      this.viewer.scene.requestRender();
    } catch (_) {}
    return { ok: true, mode: m };
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
        material: C.Color.fromCssColorString('#9FE8C8').withAlpha(0.95), // solid — no glow smear under labels
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

    // v3 Cesium label best-practices for the Southern Gulf corridor timeline.
    // FILL_AND_OUTLINE, real large font (not scaled-up tiny type), opaque navy
    // backplate, scaleByDistance + translucencyByDistance + distanceDisplayCondition,
    // eyeOffset separation, disableDepthTestDistance. No bloom/glow/blur.
    // WCAG: white/near-white text on near-black plates ≥ 4.5:1; bold large ≥ 3:1.
    const NAVY_BG = new C.Color(0.07, 0.08, 0.10, 0.94); // graphite plate
    const clearLabel = (text, fillCss, opts = {}) => {
      const bg = opts.bgColor
        || (opts.bgCss ? C.Color.fromCssColorString(opts.bgCss).withAlpha(opts.bgAlpha != null ? opts.bgAlpha : 0.96) : NAVY_BG);
      const near = opts.near != null ? opts.near : 1_000;
      const far = opts.far != null ? opts.far : 1_200_000;
      const ddcFar = opts.ddcFar != null ? opts.ddcFar : 1_000_000;
      return {
        text,
        // Quiet Foundry-scale labels (not neon title stack)
        font: opts.font || '600 13px "IBM Plex Sans", Segoe UI, Arial, sans-serif',
        fillColor: C.Color.fromCssColorString(fillCss || '#D8DDE3'),
        outlineColor: C.Color.fromCssColorString('#0B0D10'),
        outlineWidth: opts.outlineWidth != null ? opts.outlineWidth : 2,
        style: C.LabelStyle.FILL_AND_OUTLINE,
        showBackground: true,
        backgroundColor: bg,
        backgroundPadding: opts.backgroundPadding || new C.Cartesian2(8, 5),
        pixelOffset: opts.pixelOffset || new C.Cartesian2(0, -28),
        eyeOffset: opts.eyeOffset || new C.Cartesian3(0.0, 0.0, -50.0),
        disableDepthTestDistance: opts.disableDepthTestDistance != null
          ? opts.disableDepthTestDistance
          : Number.POSITIVE_INFINITY,
        // Keep labels readable from corridor overview down to building scale
        scaleByDistance: opts.scaleByDistance
          || new C.NearFarScalar(near, 1.15, far, 0.85),
        // Fade secondary labels at extreme range; primary strike keeps higher far scale
        translucencyByDistance: opts.translucencyByDistance
          || new C.NearFarScalar(near, 1.0, ddcFar, opts.primary ? 1.0 : 0.35),
        distanceDisplayCondition: opts.distanceDisplayCondition
          || new C.DistanceDisplayCondition(0.0, ddcFar),
        horizontalOrigin: opts.horizontalOrigin || C.HorizontalOrigin.CENTER,
        verticalOrigin: opts.verticalOrigin || C.VerticalOrigin.BOTTOM,
      };
    };

    // Entity clustering so waypoint/site labels do not stack on top of each other
    try {
      if (v.entities && v.entities.cluster) {
        v.entities.cluster.enabled = true;
        v.entities.cluster.pixelRange = 48;
        v.entities.cluster.minimumClusterSize = 3;
        v.entities.cluster.clusterLabels = true;
        v.entities.cluster.clusterBillboards = false;
        v.entities.cluster.clusterPoints = false;
      }
    } catch (_) { /* clustering optional */ }

    // Alternating pixel offsets so adjacent waypoint labels don't overlap
    const WP_OFFSETS = [
      new C.Cartesian2(0, -40),
      new C.Cartesian2(18, -52),
      new C.Cartesian2(-18, -40),
      new C.Cartesian2(22, -56),
      new C.Cartesian2(-22, -44),
      new C.Cartesian2(0, -60),
    ];

    // TERTIARY waypoint chips (numbered corridor-timeline nodes) — indices
    // 1..N-2 ONLY (Strait of Hormuz / Southern Gulf / UAE Coast-In / Terminal
    // Approach). Index 0 (Bandar Abbas) and the LAST index (Jenna/Warda) are
    // deliberately given NO point+label here: dedicated launch-site /
    // impact-site billboard+label entities are added below at those EXACT
    // SAME coordinates — rendering both was the confirmed root cause of the
    // reported "ghosted '6 JennaWarda (impact)' behind WARDA · STRIKE IMPACT"
    // collision (two independent label entities occupying the same screen
    // position, with nothing to resolve the overlap). This is a de-dup fix,
    // not a data-model change — CORRIDOR.waypoints itself is untouched, and
    // gotoWaypoint(i)/gotoWaypoint(CORRIDOR.waypoints.length-1) still frame
    // the camera on the SAME 6 named legs as before.
    this.waypointEntities = CORRIDOR.waypoints.map((w, i) => {
      const isLaunch = i === 0;
      const isImpact = i === CORRIDOR.waypoints.length - 1;
      return v.entities.add({
        id: `wp-${i}`,
        position: carto(w.lon, w.lat, this._altAt(i / (CORRIDOR.waypoints.length - 1)) + 200),
        point: (isLaunch || isImpact) ? undefined : {
          pixelSize: 14,
          color: C.Color.fromCssColorString(BRAND.accent),
          outlineColor: C.Color.WHITE,
          outlineWidth: 3,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
          // Markers stay visible farther than secondary labels
          scaleByDistance: new C.NearFarScalar(1_000, 1.2, 1_500_000, 0.7),
        },
        label: (isLaunch || isImpact) ? undefined : clearLabel(
          `${w.legOrder}  ${w.name}`,
          '#D8DDE3',
          {
            font: '600 13px "IBM Plex Sans", Segoe UI, Arial, sans-serif',
            outlineWidth: 2,
            pixelOffset: WP_OFFSETS[i % WP_OFFSETS.length],
            eyeOffset: new C.Cartesian3(0, 0, -40 - i * 8),
            ddcFar: 650_000,
            primary: false,
            backgroundPadding: new C.Cartesian2(8, 5),
            bgCss: '#12151A',
            bgAlpha: 0.92,
          },
        ),
        _wp: w,
        _labelPriority: 3, // TERTIARY — see _installLabelCollisionAvoidance()
      });
    });

    // launch site billboard + pad ring — FEATURED node (larger marker + label,
    // see MARKER_URIS.launch which is already sized 42x50 vs the tertiary
    // waypoints' plain 14px point). _labelPriority 1 = highest, after impact.
    this._launchSiteEntity = v.entities.add({
      id: 'launch-site',
      position: carto(LAUNCH_SITE.lon, LAUNCH_SITE.lat, LAUNCH_SITE.height),
      billboard: {
        image: MARKER_URIS.launch,
        width: 42,
        height: 50,
        verticalOrigin: C.VerticalOrigin.BOTTOM,
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
        pixelOffset: new C.Cartesian2(-8, 0),
      },
      label: clearLabel(
        'ORIGIN · BANDAR ABBAS',
        '#D8DDE3',
        {
          font: '600 13px "IBM Plex Sans", Segoe UI, Arial, sans-serif',
          outlineWidth: 2,
          pixelOffset: new C.Cartesian2(0, 22),
          eyeOffset: new C.Cartesian3(0, 0, -60),
          ddcFar: 900_000,
          primary: false,
          bgCss: '#12151A',
          bgAlpha: 0.92,
          backgroundPadding: new C.Cartesian2(8, 5),
        },
      ),
      _site: LAUNCH_SITE,
      _labelPriority: 1,
    });

    // impact site — PRIMARY event card. Full, untruncated text (label text
    // itself was already complete in source — any truncation seen live was a
    // COLLISION with the duplicate waypoint-6 label at the same position,
    // fixed above by removing that duplicate — not a text-length bug here).
    // _labelPriority 0 = absolute highest; the collision-avoidance pass below
    // NEVER hides this label, only ever hides things that would collide WITH it.
    const impactCaption = (TIMELINE && TIMELINE.impactCaption) || 'STRIKE IMPACT — DAYLIGHT';
    this._impactSiteEntity = v.entities.add({
      id: 'impact-site',
      position: carto(IMPACT_SITE.lon, IMPACT_SITE.lat, IMPACT_SITE.height),
      billboard: {
        image: MARKER_URIS.impact,
        width: 36,
        height: 42,
        verticalOrigin: C.VerticalOrigin.BOTTOM,
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
        pixelOffset: new C.Cartesian2(8, 0),
      },
      label: clearLabel(
        `WARDA · ${impactCaption}`,
        '#D8DDE3',
        {
          font: '600 14px "IBM Plex Sans", Segoe UI, Arial, sans-serif',
          outlineWidth: 2,
          pixelOffset: new C.Cartesian2(0, 22),
          eyeOffset: new C.Cartesian3(0, 0, -80),
          ddcFar: 1_200_000,
          primary: true,
          bgCss: '#12151A',
          bgAlpha: 0.94,
          backgroundPadding: new C.Cartesian2(10, 6),
          scaleByDistance: new C.NearFarScalar(1_000, 1.05, 1_200_000, 0.75),
        },
      ),
      _site: IMPACT_SITE,
      _labelPriority: 0,
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
    // geofence crossing point (where corridor trips the ring) — SECONDARY
    // compact chip. Shortened + moved to a consistent type scale (was 18px
    // Inter/700 — visibly larger + a different font family than every other
    // label in the scene, which is why it read as an oversized stacked title
    // instead of a chip) and given a LARGER pixelOffset (-56 vs the previous
    // -36) so it starts farther from the impact cluster before the collision
    // pass below even has to intervene.
    this._geofenceCross = this._findGeofenceCrossing();
    if (this._geofenceCross) {
      this._earlyWarningEntity = v.entities.add({
        position: carto(this._geofenceCross.lon, this._geofenceCross.lat, this._altAt(this._geofenceCross.t) + 200),
        point: { pixelSize: 10, color: C.Color.fromCssColorString(BRAND.warn), outlineColor: C.Color.BLACK, outlineWidth: 2, disableDepthTestDistance: Number.POSITIVE_INFINITY },
        label: clearLabel(
          'EARLY-WARNING · +8.2 MIN',
          '#FFFCE8',
          {
            font: '600 13px "IBM Plex Sans", Segoe UI, Arial, sans-serif',
            outlineWidth: 2,
            pixelOffset: new C.Cartesian2(0, -56),
            eyeOffset: new C.Cartesian3(0, 0, -30),
            ddcFar: 900_000,
            primary: false,
            bgCss: '#1A1400',
            bgAlpha: 0.96,
            backgroundPadding: new C.Cartesian2(8, 5),
          },
        ),
        _labelPriority: 2,
      });
    }

    // "OPEN THE NET" defensive awareness envelope — a wider, illustrative
    // dashed ring (1.4x the geofence radius) representing an EXPANDED
    // sensor/detection net, distinct from the tighter endurance geofence
    // above. DEFENSIVE/PREVENTIVE ONLY: a passive detection-radius
    // visualization, no targeting/weapon semantics. Hidden by default
    // (this.netEnvelopeEntity.show = false); toggled by setNetEnvelope(on),
    // which App.jsx calls whenever the existing "Open the net" AVM voice
    // toggle opens/closes (netOpen state) — purely additive, the AVM voice
    // logic itself is untouched.
    this.netEnvelopeEntity = v.entities.add({
      position: carto(GEOFENCE.centerLon, GEOFENCE.centerLat, 0),
      ellipse: {
        semiMajorAxis: GEOFENCE.radiusM * 1.4, semiMinorAxis: GEOFENCE.radiusM * 1.4,
        material: new C.StripeMaterialProperty({
          evenColor: C.Color.fromCssColorString(BRAND.accent).withAlpha(0.05),
          oddColor: C.Color.TRANSPARENT,
          repeat: 48,
        }),
        outline: true,
        outlineColor: C.Color.fromCssColorString(BRAND.accent).withAlpha(0.65),
        outlineWidth: 1.5,
        height: 400,
      },
      show: false,
    });
    this.netEnvelopeLabel = v.entities.add({
      position: carto(GEOFENCE.centerLon, GEOFENCE.centerLat + (GEOFENCE.radiusM * 1.4) / 111_000, 400),
      label: clearLabel(
        'AWARENESS NET · EXPANDED SENSOR ENVELOPE',
        '#D8DDE3',
        {
          font: '600 12px "IBM Plex Sans", Segoe UI, Arial, sans-serif',
          outlineWidth: 2,
          ddcFar: 1_500_000,
          primary: false,
          bgCss: '#0F1A17',
          bgAlpha: 0.9,
        },
      ),
      show: false,
      _labelPriority: 2,
    });

    // Collision-aware label layout: a real per-frame screen-space pass (not
    // just distance-based fading) that hides lower-priority labels when their
    // rendered rect would overlap a higher-priority one already claimed this
    // frame. See _installLabelCollisionAvoidance() for the algorithm.
    this._labelEntities = [
      this._impactSiteEntity,   // priority 0 — PRIMARY, never culled
      this._launchSiteEntity,   // priority 1 — featured
      this._earlyWarningEntity, // priority 2 — secondary chip
      this.netEnvelopeLabel,    // priority 2 — secondary chip (only shown when net open)
      ...this.waypointEntities, // priority 3 — tertiary (launch/impact indices have no label, skipped)
    ].filter(Boolean);
    this._installLabelCollisionAvoidance();
  }

  // ==========================================================================
  //  COLLISION-AWARE LABEL LAYOUT (fix for overlapping/ghosted Theatre labels)
  // ==========================================================================
  //  Cesium's own scaleByDistance/translucencyByDistance/DistanceDisplayCondition
  //  only fade labels by CAMERA DISTANCE — they have no concept of screen-space
  //  overlap, so two labels at similar distance (e.g. the impact billboard and
  //  the tertiary waypoint that used to sit at the identical coordinate) simply
  //  paint on top of each other every frame. This installs a real per-frame
  //  screen-space pass via scene.postRender:
  //    1. Project every managed label's world position to a window coordinate
  //       via Cesium.SceneTransforms.worldToWindowCoordinates.
  //    2. Estimate each visible label's on-screen rect from its actual text
  //       length + font size + backgroundPadding + pixelOffset (a close,
  //       cheap approximation — Cesium does not expose the GPU-rasterized
  //       glyph-run bounds directly, and re-deriving them via a hidden 2D
  //       canvas context per label per frame would be needlessly expensive
  //       for a HUD of ~7 labels).
  //    3. Walk labels in PRIORITY order (0 = primary impact card, never culled;
  //       1 = featured launch; 2 = secondary chips; 3 = tertiary waypoints).
  //       A label whose rect overlaps ANY already-claimed higher-or-equal-
  //       priority rect this frame has label.show/point.show forced to false;
  //       otherwise its rect is added to the claimed set and it stays shown
  //       (subject to Cesium's own distance/depth rules, which still apply).
  //    4. Re-runs every frame (cheap: ~7 labels × 1 projection + 1 AABB test),
  //       so as the camera moves and labels naturally separate again, hidden
  //       ones reappear — this is priority CULLING for the current frame, not
  //       a one-time decision baked at scene-build time.
  //  A `window.__sentinelLabelDebug()` hook is exposed for automated / manual
  //  verification: it returns the current screen rects + show state for every
  //  managed label without needing to read raster pixels.
  _installLabelCollisionAvoidance() {
    const scene = this.viewer.scene;
    const estimateLabelSize = (text, fontPx, padX, padY) => {
      // Roughly 0.56em average glyph advance for this UI's condensed sans/mono
      // stacks — calibrated against the actual rendered "WARDA · STRIKE
      // IMPACT — DAYLIGHT" card width, not a generic monospace guess.
      const w = Math.ceil(text.length * fontPx * 0.56) + padX * 2;
      const h = Math.ceil(fontPx * 1.35) + padY * 2;
      return { w, h };
    };
    const parseFontPx = (fontCss) => {
      const m = /\b(\d+)px\b/.exec(fontCss || '');
      return m ? parseInt(m[1], 10) : 13;
    };
    const rectsOverlap = (a, b) => !(a.right < b.left || b.right < a.left || a.bottom < b.top || b.bottom < a.top);

    this._lastLabelDebug = [];
    this._labelCollisionListener = scene.postRender.addEventListener(() => {
      if (this._destroyed || !this.viewer) return;
      const canvas = this.viewer.canvas;
      const claimed = [];
      const debugOut = [];
      // Stable priority-then-insertion-order sort so ties are deterministic.
      const sorted = this._labelEntities
        .map((e, idx) => ({ e, idx, pri: e._labelPriority != null ? e._labelPriority : 9 }))
        .sort((a, b) => (a.pri - b.pri) || (a.idx - b.idx));

      for (const { e, pri } of sorted) {
        const label = e.label;
        if (!label) continue;
        // Respect any OTHER reason the label might already be hidden (e.g.
        // netEnvelopeLabel's own show:false when the net is closed) — never
        // force a hidden-by-design label visible.
        const baseShow = e.show !== false && label.show !== false
          && (e.show?.getValue ? e.show.getValue(this.viewer.clock.currentTime) !== false : true);
        if (!baseShow) { debugOut.push({ id: e.id, priority: pri, show: false, reason: 'hidden-by-design' }); continue; }

        let winPos;
        try {
          const worldPos = e.position.getValue(this.viewer.clock.currentTime);
          if (!worldPos) { continue; }
          winPos = C.SceneTransforms.worldToWindowCoordinates(scene, worldPos);
        } catch (_) { winPos = null; }
        if (!winPos || !Number.isFinite(winPos.x) || !Number.isFinite(winPos.y)) {
          debugOut.push({ id: e.id, priority: pri, show: false, reason: 'off-screen' });
          if (label.show !== false) label.show = false;
          continue;
        }
        // off-canvas (behind camera / outside viewport) → hide, don't claim a rect
        if (winPos.x < -50 || winPos.y < -50 || winPos.x > canvas.clientWidth + 50 || winPos.y > canvas.clientHeight + 50) {
          debugOut.push({ id: e.id, priority: pri, show: false, reason: 'off-canvas' });
          if (label.show !== false) label.show = false;
          continue;
        }

        const textVal = label.text?.getValue ? label.text.getValue(this.viewer.clock.currentTime) : label.text;
        const fontVal = label.font?.getValue ? label.font.getValue(this.viewer.clock.currentTime) : label.font;
        const padVal = label.backgroundPadding?.getValue
          ? label.backgroundPadding.getValue(this.viewer.clock.currentTime)
          : label.backgroundPadding;
        const offVal = label.pixelOffset?.getValue
          ? label.pixelOffset.getValue(this.viewer.clock.currentTime)
          : label.pixelOffset;
        const fontPx = parseFontPx(fontVal);
        const padX = padVal?.x ?? 8;
        const padY = padVal?.y ?? 5;
        const { w, h } = estimateLabelSize(String(textVal || ''), fontPx, padX, padY);
        const offX = offVal?.x ?? 0;
        const offY = offVal?.y ?? -28;
        // verticalOrigin BOTTOM (used throughout this scene) anchors the rect
        // ABOVE (winPos.y + offY), horizontalOrigin CENTER centers it on x.
        const cx = winPos.x + offX;
        const cy = winPos.y + offY;
        const rect = { left: cx - w / 2, right: cx + w / 2, top: cy - h, bottom: cy };

        const collides = pri > 0 && claimed.some((c) => rectsOverlap(rect, c));
        if (collides) {
          if (label.show !== false) label.show = false;
          debugOut.push({ id: e.id, priority: pri, show: false, reason: 'collision', rect });
        } else {
          if (label.show !== true) label.show = true;
          claimed.push(rect);
          debugOut.push({ id: e.id, priority: pri, show: true, reason: 'visible', rect });
        }
      }
      this._lastLabelDebug = debugOut;
    });

    // Verification-only hook — reads current label collision-avoidance state
    // without needing pixel-level screenshot inspection (canvas-rendered
    // Cesium labels are opaque to DOM/accessibility tooling). Does NOT alter
    // rendering; the actual runtime uses the postRender listener above.
    try {
      if (typeof window !== 'undefined') {
        window.__sentinelLabelDebug = () => this._lastLabelDebug;
      }
    } catch (_) {}
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
        text: 'AIRFRAME TRACK · DAYLIGHT',
        font: '700 18px Inter, Segoe UI, Arial, sans-serif',
        fillColor: C.Color.fromCssColorString('#FFFFFF'),
        outlineColor: C.Color.BLACK,
        outlineWidth: 3,
        style: C.LabelStyle.FILL_AND_OUTLINE,
        showBackground: true,
        backgroundColor: new C.Color(0.015, 0.025, 0.06, 0.96),
        backgroundPadding: new C.Cartesian2(12, 8),
        pixelOffset: new C.Cartesian2(0, 28),
        eyeOffset: new C.Cartesian3(0, 0, -40),
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
        scaleByDistance: new C.NearFarScalar(1_000, 1.15, 800_000, 0.85),
        translucencyByDistance: new C.NearFarScalar(1_000, 1.0, 800_000, 0.4),
        distanceDisplayCondition: new C.DistanceDisplayCondition(0.0, 800_000),
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
        material: C.Color.fromCssColorString('#ff9a4a').withAlpha(0.92), // solid trail for clarity
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
    scene.globe.baseColor = on ? C.Color.fromCssColorString('#0a0a0a') : C.Color.fromCssColorString('#1a2a3a');
    // guarded bloom (may be unavailable on this GPU after renderError recovery)
    // v2: keep bloom OFF outside thermal so labels stay sharp
    try {
      const bloom = scene.postProcessStages && scene.postProcessStages.bloom;
      if (bloom) {
        bloom.enabled = !!on;
        if (bloom.uniforms) bloom.uniforms.brightness = on ? 0.15 : -0.55;
      }
    } catch (_) {}
    // restore the DAYLIGHT intensity when leaving thermal
    scene.globe.atmosphereLightIntensity = on ? 3.0 : 32.0;
    this.imageryAlpha(on ? 0.32 : 1.0);
    if (!on) this._applyDaylight();              // re-assert daylight leaving thermal
    if (on) this.setCamMode('thermal');
  }

  imageryAlpha(a) {
    // Dim the ACTIVE live base (satellite or dark) + the local detail patch so
    // thermal mode reads as an IR overlay regardless of which base is showing.
    try {
      const active = this._baseLayers[this.imageryMode] || this._baseLayers.satellite;
      if (active) active.alpha = a;
      this._detailLayers.forEach((l) => { try { l.alpha = a; } catch (_) {} });
    } catch (_) {
      const layers = this.viewer.imageryLayers;   // defensive fallback
      if (layers.length) layers.get(0).alpha = a;
    }
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
    // the play sequence from advancing. The progress driver is our own rAF loop.
    // v2: when TIMELINE.lockClock is set, do NOT animate the Cesium clock into
    // night — keep continuous rendering via requestRenderMode=false instead.
    try {
      if (this.viewer) {
        const scene = this.viewer.scene;
        const lockClock = !(TIMELINE && TIMELINE.lockClock === false);
        if (this._playing) {
          // Progress is rAF-driven; keep presentation clock pinned to daytime.
          this.viewer.clock.shouldAnimate = lockClock ? false : true;
          if (lockClock) this.viewer.clock.multiplier = 0;
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

  // "OPEN THE NET" — toggles the wider defensive awareness/sensor envelope
  // (see _buildStatic()). Called from App.jsx whenever the existing AVM voice
  // "Open the net" control opens/closes; purely additive visual, no effect on
  // the voice/AVM logic itself. Fully guarded so a pre-ready call (e.g. during
  // React's initial mount before the constructor finishes) never throws.
  setNetEnvelope(on) {
    try {
      if (this.netEnvelopeEntity) this.netEnvelopeEntity.show = !!on;
      if (this.netEnvelopeLabel) this.netEnvelopeLabel.show = !!on;
      this.viewer?.scene?.requestRender();
    } catch (_) {}
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

  // -- (removed) Cesium ion token upgrade ------------------------------------
  // The optional Cesium-ion path (World Terrain + Google Photorealistic 3D
  // Tiles) has been REMOVED per the no-Ion-token requirement. Live, key-free
  // ESRI World Imagery + ESRI World Terrain are now loaded by default in
  // _addBaseImagery()/_loadTerrain(), and base-map switching is handled by
  // setImageryMode('satellite' | 'dark'). No Cesium.Ion API is referenced
  // anywhere in this module.

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
    try { if (this._labelCollisionListener) this._labelCollisionListener(); } catch (_) {}  // stop label collision pass
    try { if (typeof window !== 'undefined' && window.__sentinelLabelDebug) delete window.__sentinelLabelDebug; } catch (_) {}
    try { this.handler && this.handler.destroy(); } catch (_) {}
    try { this.viewer && this.viewer.destroy(); } catch (_) {}
  }
}
