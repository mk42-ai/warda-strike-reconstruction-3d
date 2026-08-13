// ============================================================================
//  VisualControlPanel — premium dark-glass lil-gui for the UAE defensive
//  command-center briefing surface.
//
//  Live-customizable: time-of-day presets, key/fill/rim, HDRI, exposure/ACES,
//  bloom/SSAO/SMAA, fog, shadows, camera, material multipliers.
//  Persists to localStorage. Reset-to-stakeholder-default included.
//
//  Framing: protective resilience / detection / recovery / residual risk.
// ============================================================================
import GUI from 'lil-gui';
import {
  defaultVisualState,
  PRESETS,
  applyPreset,
  loadPersistedState,
  persistState,
  qualityOverrides,
  STORAGE_KEY,
} from './visualPresets.js';

const PANEL_TITLE = 'VISUAL GRADE · RESILIENCE';

/**
 * @param {object} opts
 * @param {(state: object, meta?: object) => void} opts.onChange
 *   Called whenever any control changes. Receives full state.
 * @param {HTMLElement} [opts.container]  optional mount parent (default body)
 * @returns {{ gui: GUI, getState: Function, setState: Function, destroy: Function, reset: Function }}
 */
export function mountVisualControlPanel({ onChange, container } = {}) {
  let state = loadPersistedState();

  const gui = new GUI({
    title: PANEL_TITLE,
    width: 320,
    container: container || undefined,
  });
  // Premium dark-glass chrome (teal/gold accents via CSS class)
  try {
    gui.domElement.classList.add('cc-visual-gui');
  } catch (_) {}

  const emit = (meta = {}) => {
    persistState(state);
    if (typeof onChange === 'function') onChange({ ...state }, meta);
  };

  // ---- helpers to rebuild folders cleanly on preset swap ----
  const controllers = [];
  const track = (c) => { controllers.push(c); return c; };

  // ---- PRESET / QUALITY ----
  const fPreset = gui.addFolder('Time of Day / Preset');
  const presetOptions = {};
  Object.keys(PRESETS).forEach((k) => { presetOptions[PRESETS[k].label] = k; });
  track(fPreset.add(state, 'preset', presetOptions).name('Grade').onChange((id) => {
    state = applyPreset(state, id);
    // push new values into all controllers
    refreshControllers();
    emit({ reason: 'preset', preset: id, rebuildComposer: true });
  }));
  track(fPreset.add(state, 'quality', {
    'Stakeholder (cinematic)': 'stakeholder',
    'Performance': 'performance',
  }).name('Quality').onChange((q) => {
    Object.assign(state, qualityOverrides(q));
    refreshControllers();
    emit({ reason: 'quality', rebuildComposer: true });
  }));
  fPreset.open();

  // ---- CAMERA ----
  const fCam = gui.addFolder('Camera');
  track(fCam.add(state, 'fov', 24, 75, 0.5).name('FOV').onChange(() => emit({ reason: 'camera' })));
  track(fCam.add(state, 'targetHeight', -1.5, 2.5, 0.05).name('Target height').onChange(() => emit({ reason: 'camera' })));
  track(fCam.add(state, 'autoOrbit').name('Auto-orbit').onChange(() => emit({ reason: 'camera' })));
  track(fCam.add(state, 'orbitSpeed', 0.05, 1.5, 0.01).name('Orbit speed').onChange(() => emit({ reason: 'camera' })));

  // ---- EXPOSURE / TONE ----
  const fTone = gui.addFolder('Exposure / Tone');
  track(fTone.add(state, 'exposure', 0.3, 2.5, 0.01).name('Exposure').onChange(() => emit({ reason: 'tone' })));
  track(fTone.add(state, 'aces').name('ACES filmic').onChange(() => emit({ reason: 'tone', rebuildComposer: true })));
  fTone.open();

  // ---- ENVIRONMENT ----
  const fEnv = gui.addFolder('HDRI / Environment');
  track(fEnv.add(state, 'envIntensity', 0, 3, 0.01).name('Intensity').onChange(() => emit({ reason: 'env' })));
  track(fEnv.add(state, 'envRotation', -Math.PI, Math.PI, 0.01).name('Rotation').onChange(() => emit({ reason: 'env' })));
  track(fEnv.add(state, 'envBackground').name('BG (vs refl-only)').onChange(() => emit({ reason: 'env' })));

  // ---- KEY / FILL / RIM ----
  const fKey = gui.addFolder('Key Light');
  track(fKey.addColor(state, 'keyColor').name('Color').onChange(() => emit({ reason: 'lights' })));
  track(fKey.add(state, 'keyIntensity', 0, 6, 0.01).name('Intensity').onChange(() => emit({ reason: 'lights' })));
  track(fKey.add(state, 'keyX', -12, 12, 0.1).name('X').onChange(() => emit({ reason: 'lights' })));
  track(fKey.add(state, 'keyY', 0, 14, 0.1).name('Y').onChange(() => emit({ reason: 'lights' })));
  track(fKey.add(state, 'keyZ', -12, 12, 0.1).name('Z').onChange(() => emit({ reason: 'lights' })));
  track(fKey.add(state, 'keyCastShadow').name('Cast shadow').onChange(() => emit({ reason: 'lights' })));
  fKey.open();

  const fFill = gui.addFolder('Fill (Hemisphere)');
  track(fFill.addColor(state, 'fillColor').name('Sky color').onChange(() => emit({ reason: 'lights' })));
  track(fFill.add(state, 'fillIntensity', 0, 3, 0.01).name('Intensity').onChange(() => emit({ reason: 'lights' })));

  const fRim = gui.addFolder('Rim Light');
  track(fRim.addColor(state, 'rimColor').name('Color').onChange(() => emit({ reason: 'lights' })));
  track(fRim.add(state, 'rimIntensity', 0, 5, 0.01).name('Intensity').onChange(() => emit({ reason: 'lights' })));
  track(fRim.add(state, 'rimX', -12, 12, 0.1).name('X').onChange(() => emit({ reason: 'lights' })));
  track(fRim.add(state, 'rimY', -2, 10, 0.1).name('Y').onChange(() => emit({ reason: 'lights' })));
  track(fRim.add(state, 'rimZ', -12, 12, 0.1).name('Z').onChange(() => emit({ reason: 'lights' })));

  // ---- FOG ----
  const fFog = gui.addFolder('Fog');
  track(fFog.add(state, 'fogEnabled').name('Enabled').onChange(() => emit({ reason: 'fog' })));
  track(fFog.add(state, 'fogDensity', 0, 0.15, 0.001).name('Density').onChange(() => emit({ reason: 'fog' })));
  track(fFog.addColor(state, 'fogColor').name('Color').onChange(() => emit({ reason: 'fog' })));

  // ---- SHADOWS ----
  const fShadow = gui.addFolder('Shadows');
  track(fShadow.add(state, 'shadows').name('Enabled').onChange(() => emit({ reason: 'shadows' })));
  track(fShadow.add(state, 'shadowMapSize', { '1K': 1024, '2K': 2048, '4K': 4096 }).name('Map size').onChange(() => emit({ reason: 'shadows' })));
  track(fShadow.add(state, 'shadowBias', -0.002, 0.002, 0.00001).name('Bias').onChange(() => emit({ reason: 'shadows' })));
  track(fShadow.add(state, 'cesiumShadowDarkness', 0, 1, 0.01).name('Globe darkness').onChange(() => emit({ reason: 'cesium' })));

  // ---- POST ----
  const fPost = gui.addFolder('Post-Processing');
  track(fPost.add(state, 'bloomEnabled').name('Bloom').onChange(() => emit({ reason: 'post' })));
  track(fPost.add(state, 'bloomIntensity', 0, 3, 0.01).name('Bloom strength').onChange(() => emit({ reason: 'post' })));
  track(fPost.add(state, 'bloomThreshold', 0, 1, 0.01).name('Bloom threshold').onChange(() => emit({ reason: 'post' })));
  track(fPost.add(state, 'bloomRadius', 0, 1.5, 0.01).name('Bloom radius').onChange(() => emit({ reason: 'post' })));
  track(fPost.add(state, 'smaaEnabled').name('SMAA').onChange(() => emit({ reason: 'post', rebuildComposer: true })));
  track(fPost.add(state, 'ssaoEnabled').name('SSAO').onChange(() => emit({ reason: 'post', rebuildComposer: true })));
  track(fPost.add(state, 'ssaoIntensity', 0, 8, 0.05).name('SSAO intensity').onChange(() => emit({ reason: 'post' })));
  track(fPost.add(state, 'ssaoRadius', 0.02, 1.0, 0.01).name('SSAO radius').onChange(() => emit({ reason: 'post' })));
  fPost.open();

  // ---- MATERIALS ----
  const fMat = gui.addFolder('Materials (global mul)');
  track(fMat.add(state, 'roughnessMul', 0.2, 2.5, 0.01).name('Roughness ×').onChange(() => emit({ reason: 'materials' })));
  track(fMat.add(state, 'metalnessMul', 0, 2.5, 0.01).name('Metalness ×').onChange(() => emit({ reason: 'materials' })));
  track(fMat.add(state, 'envMapIntensityMul', 0, 3, 0.01).name('EnvMap ×').onChange(() => emit({ reason: 'materials' })));
  track(fMat.add(state, 'emissiveMul', 0, 3, 0.01).name('Emissive ×').onChange(() => emit({ reason: 'materials' })));

  // ---- CESIUM THEATRE GRADE (linked) ----
  const fGlobe = gui.addFolder('Globe Theatre Grade');
  track(fGlobe.add(state, 'cesiumFogDensity', 0, 0.0008, 0.00001).name('Fog density').onChange(() => emit({ reason: 'cesium' })));
  track(fGlobe.addColor(state, 'cesiumFogColor').name('Fog color').onChange(() => emit({ reason: 'cesium' })));
  track(fGlobe.add(state, 'cesiumSunIntensity', 0.2, 6, 0.05).name('Sun intensity').onChange(() => emit({ reason: 'cesium' })));
  track(fGlobe.add(state, 'cesiumAtmosphere', 2, 40, 0.5).name('Atmosphere').onChange(() => emit({ reason: 'cesium' })));
  track(fGlobe.add(state, 'cesiumBloomContrast', 40, 220, 1).name('Bloom contrast').onChange(() => emit({ reason: 'cesium' })));
  track(fGlobe.add(state, 'cesiumAoIntensity', 0, 8, 0.1).name('AO intensity').onChange(() => emit({ reason: 'cesium' })));

  // ---- ACTIONS ----
  const actions = {
    resetStakeholder() {
      try { localStorage.removeItem(STORAGE_KEY); } catch (_) {}
      state = defaultVisualState();
      refreshControllers();
      emit({ reason: 'reset', rebuildComposer: true });
    },
    applyNightOps() {
      state = applyPreset(state, 'nightOps');
      refreshControllers();
      emit({ reason: 'preset', preset: 'nightOps', rebuildComposer: true });
    },
    applyGoldenHour() {
      state = applyPreset(state, 'goldenHour');
      refreshControllers();
      emit({ reason: 'preset', preset: 'goldenHour', rebuildComposer: true });
    },
  };
  gui.add(actions, 'applyNightOps').name('⚡ Night Ops');
  gui.add(actions, 'applyGoldenHour').name('☀ Golden Hour');
  gui.add(actions, 'resetStakeholder').name('↺ Reset stakeholder default');

  function refreshControllers() {
    // lil-gui controllers hold references to the original object; re-assign props
    // onto the same object so controllers stay live.
    const fresh = { ...state };
    // mutate in place
    Object.keys(fresh).forEach((k) => { state[k] = fresh[k]; });
    controllers.forEach((c) => {
      try { c.updateDisplay(); } catch (_) {}
    });
  }

  // initial emit so consumers sync
  emit({ reason: 'init', rebuildComposer: false });

  return {
    gui,
    getState: () => ({ ...state }),
    setState(next, meta = {}) {
      Object.assign(state, next);
      refreshControllers();
      emit({ reason: 'external', ...meta });
    },
    reset: () => actions.resetStakeholder(),
    destroy() {
      try { gui.destroy(); } catch (_) {}
    },
  };
}

export default { mountVisualControlPanel };
