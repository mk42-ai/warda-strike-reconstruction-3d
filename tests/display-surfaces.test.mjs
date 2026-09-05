import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { buildShahed136 } from '../src/three/Shahed136.js';
import { deviceDefaultQuality, initialQuality, rememberQuality, qualityFor } from '../src/rendering/quality.js';
import { configureSurfaceTexture, surfaceTextureUrl } from '../src/rendering/surfaceTextures.js';
import { validateDisplayAssets } from '../scripts/validate-display-assets.mjs';

test('desktop defaults maximum quality and mobile defaults reduced without cross-device preference leakage', () => {
  assert.equal(deviceDefaultQuality({ width: 1280, memory: 2 }), 'high');
  assert.equal(deviceDefaultQuality({ width: 390, memory: 8 }), 'performance');
  const oldWindow = globalThis.window, oldStorage = globalThis.localStorage;
  const storage = new Map();
  globalThis.localStorage = { getItem: (key) => storage.get(key), setItem: (key, value) => storage.set(key, value) };
  try {
    globalThis.window = { innerWidth: 1280 };
    assert.equal(initialQuality(), 'high'); rememberQuality('balanced'); assert.equal(initialQuality(), 'balanced');
    globalThis.window.innerWidth = 390;
    assert.equal(initialQuality(), 'performance'); rememberQuality('performance');
    globalThis.window.innerWidth = 1280;
    assert.equal(initialQuality(), 'balanced');
  } finally {
    if (oldWindow === undefined) delete globalThis.window; else globalThis.window = oldWindow;
    if (oldStorage === undefined) delete globalThis.localStorage; else globalThis.localStorage = oldStorage;
  }
});

test('generated input textures remain color-only with bounded resolution and sampler policy', () => {
  const t = configureSurfaceTexture(new THREE.Texture(), 'paint', 100);
  assert.equal(t.colorSpace, THREE.SRGBColorSpace);
  assert.equal(t.wrapS, THREE.MirroredRepeatWrapping);
  assert.equal(t.minFilter, THREE.LinearMipmapLinearFilter);
  assert.equal(t.generateMipmaps, true); assert.equal(t.anisotropy, 8);
  assert.equal(surfaceTextureUrl('paint', 256), '/textures/faded-paint-basecolor-256.jpg');
  assert.equal(surfaceTextureUrl('concrete', 2048), '/textures/dusty-concrete-basecolor-512.jpg');
  assert.throws(() => surfaceTextureUrl('invented'), /Unknown display surface/);
  assert.equal(qualityFor('performance').textureSize, 256);
});

test('all quality variants keep recognition parts while reducing mobile geometry', () => {
  const triangles = (root) => { let count = 0; root.traverse((o) => { if (o.geometry) count += (o.geometry.index?.count || o.geometry.attributes.position.count) / 3 * (o.isInstancedMesh ? o.count : 1); }); return count; };
  const high = buildShahed136({ quality: 'high' });
  const low = buildShahed136({ quality: 'performance' });
  assert.ok(triangles(low) < triangles(high));
  for (const model of [high, low]) for (const name of ['fuse', 'nose', 'eo', 'tailCap', 'wingR', 'wingL', 'tip[-1]', 'tip[1]', 'fin[-1]', 'fin[1]', 'hub', 'prop', 'blade[0]', 'blade[1]', 'ring[-2]', 'ring[-1]', 'ring[0]', 'ring[1]', 'ring[2]', 'panel-fasteners']) assert.ok(model.getObjectByName(name), name);
});

test('native LOD drops only decorative instances at distant zoom', () => {
  const root = buildShahed136({ quality: 'high' });
  const lod = root.getObjectByName('recognition-detail-lod');
  assert.ok(lod.isLOD); assert.equal(lod.levels.length, 2);
  root.updateMatrixWorld(true);
  const camera = new THREE.PerspectiveCamera(); camera.position.set(0, 0, 4); camera.updateMatrixWorld(true); lod.update(camera);
  assert.equal(root.getObjectByName('panel-fasteners').visible, true);
  camera.position.z = 12; camera.updateMatrixWorld(true); lod.update(camera);
  assert.equal(root.getObjectByName('panel-fasteners').visible, false);
  assert.equal(root.getObjectByName('fuse').visible, true);
});

test('actual GLB surfaces, embedded JPEG, source hashes and all 14 model parts validate', () => {
  const result = validateDisplayAssets();
  assert.equal(result.meshCount, 14); assert.equal(result.nodes, 15); assert.equal(result.triangles, 848);
  assert.equal(result.generatedVariants, 4); assert.ok(result.generatedTextureBytes < 100000);
  assert.equal(result.gpuVerified, false);
});
