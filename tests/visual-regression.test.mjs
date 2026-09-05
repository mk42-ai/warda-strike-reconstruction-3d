// CPU/API regression checks. These do NOT claim a WebGL render or browser pass.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as C from 'cesium';
import * as THREE from 'three';
import { buildShahed136, surfaceMaps } from '../src/three/Shahed136.js';
import CesiumScene from '../src/cesium/CesiumScene.js';
import { QUALITY_PRESETS, qualityFor } from '../src/rendering/quality.js';
import { CORRIDOR, corridorCoords, TIMELINE, analyzeThermal, VIIRS_DETECTIONS, CAMERA_MODES } from '../src/data/scenario.js';
import { buildPath, simulateBallistic } from '../src/utils/geo.js';

function harness() {
  const scene = Object.create(CesiumScene.prototype);
  const primitives = [];
  const camera = {
    frustum: { near: 1, far: 30_000_000 }, heading: 0, pitch: -1,
    positionCartographic: C.Cartographic.fromDegrees(55.65, 25, 65000),
    cancelFlight() {}, lookAtTransform() {}, setView(pose) { this.pose = pose; },
    flyToBoundingSphere(sphere, options) { this.flight = { sphere, options }; options.complete?.(); },
  };
  const controls = { enableInputs: true, enableZoom: true };
  const renderer = {
    globe: {}, fog: {}, light: new C.SunLight(), sun: {}, moon: {}, skyAtmosphere: {},
    shadowMap: {}, msaaSupported: true, requestRenderMode: true,
    postProcessStages: { bloom: { enabled: false, uniforms: {} }, ambientOcclusion: { enabled: false, uniforms: {} }, fxaa: {} },
    primitives: { add(p) { primitives.push(p); return p; }, remove(p) { const i = primitives.indexOf(p); if (i >= 0) primitives.splice(i, 1); return i >= 0; }, get length() { return primitives.length; } },
    requestRender() { this.requests = (this.requests || 0) + 1; },
  };
  scene.viewer = {
    entities: new C.EntityCollection(), scene: renderer, camera, canvas: { width: 1440, height: 900 },
    clock: new C.Clock({ currentTime: C.JulianDate.fromIso8601(TIMELINE.dayIso), shouldAnimate: false, multiplier: 0 }),
    dataSourceDisplay: { defaultDataSource: { clustering: new C.EntityCluster() } },
    resize() {},
  };
  Object.assign(scene, {
    path: buildPath(corridorCoords(), 90), quality: 'balanced', _budget: qualityFor('balanced'),
    _activeEffects: new Set(), _effectTimers: new Set(), _effectIntervals: new Set(), _warnings: [],
    _layerState: { corridor: true, geofence: true, waypoints: true }, _userControls: controls,
    _destroyed: false, _playing: false, progress: 0, _orbitAngle: 0, _camSettled: true,
    _baseLayers: { satellite: { alpha: 1 }, dark: { alpha: 1, show: false } },
    _detailLayers: [{ alpha: 0.35, _displayAlpha: 0.35 }], imageryMode: 'satellite', thermal: false,
    thermalReport: analyzeThermal(VIIRS_DETECTIONS), _rafId: 1,
  });
  scene.ballistic = simulateBallistic(scene.path.total, { cruiseAltM: CORRIDOR.cruiseAltM, impactAngleDeg: 62, climbFrac: 0.10, diveFrac: 0.86 });
  return scene;
}

function withWindow(fn) {
  const previous = globalThis.window;
  globalThis.window = { devicePixelRatio: 4 };
  try { return fn(); } finally { if (previous === undefined) delete globalThis.window; else globalThis.window = previous; }
}

test('existing package strategy and exact rendering versions remain compatible', () => {
  const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url)));
  assert.equal(pkg.dependencies.three, '0.169.0'); assert.equal(pkg.dependencies.cesium, '1.122.0');
  assert.equal(THREE.REVISION, '169'); assert.equal(C.VERSION, '1.122');
  assert.equal(typeof C.Model.fromGltfAsync, 'function');
  assert.equal(typeof C.Transforms.headingPitchRollToFixedFrame, 'function');
  assert.ok(C.Tonemapper.PBR_NEUTRAL);
});

test('three quality budgets are bounded and bad input selects balanced', () => {
  assert.equal(qualityFor('invalid'), QUALITY_PRESETS.balanced);
  for (const quality of Object.values(QUALITY_PRESETS)) {
    assert.ok(quality.pixelRatio <= 1.75); assert.ok(quality.inspectorHz <= 60);
    assert.ok(quality.shadowSize <= 2048); assert.ok(quality.particles > 0 && quality.particles <= 1);
  }
});

test('every procedural recognition component remains with normals and UVs', () => {
  const root = buildShahed136();
  for (const name of ['fuse', 'nose', 'eo', 'tailCap', 'wingR', 'wingL', 'tip[-1]', 'tip[1]', 'fin[-1]', 'fin[1]', 'hub', 'prop', 'blade[0]', 'blade[1]', 'ring[-2]', 'ring[-1]', 'ring[0]', 'ring[1]', 'ring[2]']) assert.ok(root.getObjectByName(name), name);
  root.traverse((object) => {
    if (!object.geometry) return;
    for (const name of ['position', 'normal', 'uv']) {
      const attribute = object.geometry.getAttribute(name); assert.ok(attribute, `${object.name} ${name}`);
      assert.ok([...attribute.array].every(Number.isFinite));
    }
    assert.ok(object.material.roughness >= 0 && object.material.roughness <= 1);
    assert.ok(object.material.metalness >= 0 && object.material.metalness <= 1);
  });
  assert.equal(root.getObjectByName('wingR').geometry, root.getObjectByName('wingL').geometry);
  assert.equal(root.getObjectByName('fin[-1]').geometry, root.getObjectByName('fin[1]').geometry);
  assert.equal(root.getObjectByName('ring[-2]').geometry, root.getObjectByName('ring[2]').geometry);
  assert.ok(root.getObjectByName('panel-fasteners').isInstancedMesh);
  assert.equal(root.getObjectByName('panel-fasteners').count, 20);
});

test('procedural maps are deterministic non-color data with repeat and mipmaps', () => {
  const a = surfaceMaps(), b = surfaceMaps();
  assert.deepEqual(a.roughness.image.data, b.roughness.image.data);
  assert.deepEqual(a.normal.image.data, b.normal.image.data);
  for (const t of Object.values(a)) {
    assert.equal(t.colorSpace, THREE.NoColorSpace); assert.equal(t.wrapS, THREE.RepeatWrapping);
    assert.equal(t.minFilter, THREE.LinearMipmapLinearFilter); assert.equal(t.generateMipmaps, true);
  }
});

test('all static and thermal entity classes are instantiated with complete toggles', () => {
  const h = harness(); h._buildStatic(); h._buildThermalLayer();
  assert.equal(h.viewer.entities.values.length, 31); // 13 static + 18 thermal; airframe/trail separate
  assert.equal(h.waypointEntities.length, 6); assert.equal(h.thermalEntities.length, 18);
  assert.equal(h.viewer.dataSourceDisplay.defaultDataSource.clustering.enabled, true);
  for (const key of ['corridor', 'geofence', 'waypoints']) h.setLayer(key, false);
  for (const e of [h.corridorEntity, h.groundTrackEntity, h.geofenceEntity, h.warningRingEntity, h.crossingEntity, ...h.waypointEntities]) assert.equal(e.show, false);
  h.setThermal(true); assert.ok(h.thermalEntities.every((e) => e.show));
  assert.equal(h.viewer.scene.postProcessStages.bloom.enabled, false);
  assert.equal(h.viewer.scene.globe.atmosphereLightIntensity, 4);
  assert.equal(h._detailLayers[0].alpha, 0.35 * 0.32);
  h.setThermal(false); assert.ok(h.thermalEntities.every((e) => !e.show)); assert.equal(h._detailLayers[0].alpha, 0.35);
});

test('all eight camera modes and six waypoint controls retain finite projections', () => {
  const h = harness(); h._syncDroneModel = () => {}; h._buildStatic();
  assert.equal(CAMERA_MODES.length, 8);
  for (const mode of CAMERA_MODES) {
    h.setCamMode(mode.id); const pose = h._targetFrame(mode.id);
    assert.ok(pose); assert.ok(Object.values(pose).every(Number.isFinite), mode.id);
    assert.ok(pose.pitch >= -85 && pose.pitch <= -10, mode.id);
    assert.equal(h.viewer.camera.frustum.far, 30_000_000);
  }
  h._fireImpact = () => {}; // effects have a separate test
  for (let i = 0; i < 6; i++) { const state = h.gotoWaypoint(i); assert.equal(state.idx, i); assert.equal(h.camMode, 'waypoint'); assert.ok(Number.isFinite(state.altM)); }
});

test('pause releases orbit/cinema and quality switching applies shared budgets', () => withWindow(() => {
  const h = harness();
  for (const mode of ['orbit', 'cinema']) {
    h.setCamMode(mode); h.setPlaying(false); h._flying = false; h._driveCamera(0.016);
    assert.equal(h._userControls.enableInputs, true, mode);
  }
  for (const id of Object.keys(QUALITY_PRESETS)) {
    h.setQuality(id); const q = qualityFor(id);
    assert.equal(h.viewer.resolutionScale, q.pixelRatio); assert.equal(h.viewer.scene.shadowMap.size, q.shadowSize);
    assert.equal(h.viewer.scene.globe.maximumScreenSpaceError, q.globeSSE);
  }
}));

test('real Model API ready/error path controls original entity fallback', async () => {
  const original = C.Model.fromGltfAsync;
  let requested;
  const mock = { imageBasedLighting: {}, readyEvent: new C.Event(), errorEvent: new C.Event(), ready: false, destroy() {} };
  C.Model.fromGltfAsync = async (options) => { requested = options; return mock; };
  try {
    const h = harness(); h._buildDrone(); await Promise.resolve(); await Promise.resolve();
    assert.equal(requested.url, '/shahed136.glb'); assert.equal(requested.scale, 1);
    assert.equal(h.viewer.entities.values.length, 2); assert.equal(h._droneModel, mock);
    mock.errorEvent.raiseEvent(new Error('deliberate unit-test decode failure'));
    assert.equal(h._modelFailed, true);
    assert.equal(h.droneEntity.billboard.show.getValue(h.viewer.clock.currentTime), true);
    assert.equal(mock.show, false);
  } finally { C.Model.fromGltfAsync = original; }
});

test('particle classes are bounded, nonlooping, and advance only a display clock', () => {
  const originalTimeout = globalThis.setTimeout, originalImage = globalThis.Image;
  const callbacks = [];
  globalThis.setTimeout = (callback) => { callbacks.push(callback); return callbacks.length; };
  globalThis.Image = class { set src(_) {} };
  try {
    const h = harness(); h._spawnImpactParticles();
    assert.equal(h._activeEffects.size, 3);
    const effects = [...h._activeEffects];
    assert.ok(effects[0].emitter instanceof C.SphereEmitter);
    assert.ok(effects[1].emitter instanceof C.CircleEmitter);
    assert.ok(effects[2].emitter instanceof C.ConeEmitter);
    assert.ok(effects.every((p) => p.loop === false));
    assert.equal(h.viewer.clock.shouldAnimate, true); assert.equal(h.viewer.clock.multiplier, 1);
    callbacks.forEach((fn) => fn());
    assert.equal(h._activeEffects.size, 0); assert.equal(h.viewer.clock.shouldAnimate, false);
  } finally { globalThis.setTimeout = originalTimeout; if (originalImage === undefined) delete globalThis.Image; else globalThis.Image = originalImage; }
});

test('all existing UI interaction families remain; quality has an accessible native control', () => {
  const app = fs.readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8');
  for (const token of ['pickCam(m.id)', 'goWp(i)', 'togglePlay', 'onReset', 'onScrub', 'toggleThermal', 'pickImagery', 'toggleLayer', 'pickScenario', 'setPicked', 'Render quality', 'Asset credits']) assert.ok(app.includes(token), token);
  const css = fs.readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  assert.ok(css.includes('@media (max-width: 720px)')); assert.ok(css.includes('.quality-dock'));
});


test('transient flash, ground cue and shockwave classes clean up without lingering entities', () => {
  const oldTimeout = globalThis.setTimeout, oldInterval = globalThis.setInterval;
  const oldClearInterval = globalThis.clearInterval, oldDocument = globalThis.document;
  const intervals = [], timers = [];
  globalThis.setTimeout = (fn) => { timers.push(fn); return timers.length; };
  globalThis.setInterval = (fn) => { intervals.push(fn); return intervals.length; };
  globalThis.clearInterval = () => {};
  globalThis.document = { createElement: () => ({ width: 0, height: 0, getContext: () => ({ createRadialGradient: () => ({ addColorStop() {} }), beginPath() {}, arc() {}, fill() {} }), toDataURL: () => 'data:image/png;base64,test' }) };
  try {
    const h = harness(); h._spawnImpactParticles = () => {};
    h._fireImpact();
    assert.equal(h.viewer.entities.values.length, 3);
    assert.ok(h.viewer.entities.values.some((e) => e.billboard));
    assert.equal(h.viewer.entities.values.filter((e) => e.ellipse).length, 2);
    for (let i = 0; i < 22; i++) intervals.forEach((fn) => fn());
    timers.forEach((fn) => fn());
    assert.equal(h.viewer.entities.values.length, 0);
    assert.equal(h._effectIntervals.size, 0);
    assert.equal(h.viewer.scene.postProcessStages.bloom.enabled, false);
  } finally {
    globalThis.setTimeout = oldTimeout; globalThis.setInterval = oldInterval;
    globalThis.clearInterval = oldClearInterval;
    if (oldDocument === undefined) delete globalThis.document; else globalThis.document = oldDocument;
  }
});
