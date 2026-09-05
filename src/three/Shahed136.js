// Recognition / preventive-briefing artwork, not an engineering or flight model.
// Geometry, surface detail and lighting only; scenario/trajectory data is untouched.
import * as THREE from 'three';
import { RoomEnvironment } from 'three-stdlib';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer, RenderPass, EffectPass, BloomEffect, SMAAEffect, ToneMappingEffect, ToneMappingMode, KernelSize } from 'postprocessing';
import { qualityFor } from '../rendering/quality.js';
import { createSurfaceTextureCache } from '../rendering/surfaceTextures.js';

// Seeded original surface detail. Linear data maps, repeat/mipmaps, no texture
// downloads, no proprietary content, no shader-source injection.
export function surfaceMaps(size = 128) {
  const rough = new Uint8Array(size * size * 4);
  const normal = new Uint8Array(size * size * 4);
  let seed = 136;
  const noise = () => { seed = (1664525 * seed + 1013904223) >>> 0; return seed / 4294967296; };
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const i = (y * size + x) * 4;
    const n = noise();
    const seam = x % 64 === 0 || y % 64 === 0;
    const r = Math.round(205 + n * 28 + (seam ? 16 : 0));
    rough.set([255, r, 255, 255], i);
    normal.set([Math.round(128 + (n - 0.5) * 6), Math.round(128 + Math.sin(x * Math.PI / 8) * 2), 255, 255], i);
  }
  const make = (bytes, name) => {
    const texture = new THREE.DataTexture(bytes, size, size, THREE.RGBAFormat);
    texture.name = name;
    texture.colorSpace = THREE.NoColorSpace;
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.generateMipmaps = true;
    texture.needsUpdate = true;
    return texture;
  };
  return { roughness: make(rough, 'original-fine-coating-roughness'), normal: make(normal, 'original-fine-coating-normal') };
}

export function buildShahed136(options = {}) {
  const quality = options.quality || 'high';
  const reduced = quality === 'performance';
  const radial = reduced ? 24 : 40;
  const bevelSegments = reduced ? 1 : 2;
  const root = new THREE.Group();
  root.name = 'Shahed136';
  const maps = surfaceMaps();
  const body = new THREE.MeshStandardMaterial({ color: 0xb6b8a5, metalness: 0.02, roughness: 0.64, roughnessMap: maps.roughness, normalMap: maps.normal, normalScale: new THREE.Vector2(0.14, 0.14) });
  body.name = 'matte-painted-composite';
  const trim = new THREE.MeshStandardMaterial({ color: 0x343b37, metalness: 0.16, roughness: 0.67, roughnessMap: maps.roughness });
  trim.name = 'dark-composite-trim';
  const noseMaterial = new THREE.MeshStandardMaterial({ color: 0x838779, metalness: 0.01, roughness: 0.57, roughnessMap: maps.roughness, normalMap: maps.normal, normalScale: new THREE.Vector2(0.10, 0.10) });
  noseMaterial.name = 'painted-nose-cover';
  const lens = new THREE.MeshPhysicalMaterial({ color: 0x101e22, metalness: 0, roughness: 0.09, clearcoat: 1, clearcoatRoughness: 0.07, ior: 1.46 });
  lens.name = 'dark-optical-cover';
  const accent = new THREE.MeshStandardMaterial({ color: 0xc1b784, metalness: 0.03, roughness: 0.55, roughnessMap: maps.roughness });
  accent.name = 'non-emissive-identification-paint';
  const metal = new THREE.MeshStandardMaterial({ color: 0x737b7e, metalness: 0.82, roughness: 0.43, roughnessMap: maps.roughness });
  metal.name = 'satin-metal-fittings';
  const add = (name, geometry, material, position = [0, 0, 0], rotation = [0, 0, 0], parent = root) => {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    mesh.position.fromArray(position);
    mesh.rotation.set(...rotation);
    mesh.castShadow = mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  };

  // Lathed profiles create smooth silhouettes and explicit UVs; dimensions are
  // illustrative recognition proportions, not certified equipment measurements.
  const fuseProfile = [[0.30, -2.75], [0.36, -2.6], [0.39, -2.1], [0.41, -0.8], [0.43, 1.5], [0.4, 2.65], [0.34, 2.8]].map(([r, y]) => new THREE.Vector2(r, y));
  add('fuse', new THREE.LatheGeometry(fuseProfile, radial), body, [0, 0, 0], [Math.PI / 2, 0, 0]);
  const noseProfile = [[0, -1.35], [0.08, -1.18], [0.20, -0.70], [0.30, -0.18], [0.30, 0]].map(([r, y]) => new THREE.Vector2(r, y));
  add('nose', new THREE.LatheGeometry(noseProfile, radial), noseMaterial, [0, 0, -2.75], [Math.PI / 2, 0, 0]);
  add('eo', new THREE.SphereGeometry(0.23, reduced ? 16 : 28, reduced ? 12 : 18), lens, [0, -0.33, -2.38]);
  add('tailCap', new THREE.CylinderGeometry(0.34, 0.28, 0.44, radial), metal, [0, 0, 2.95], [Math.PI / 2, 0, 0]);

  const shape = new THREE.Shape();
  shape.moveTo(0, 1.4); shape.lineTo(2.65, -1.65); shape.lineTo(0.16, -1.20); shape.lineTo(0, 1.4);
  const wingGeometry = new THREE.ExtrudeGeometry(shape, { steps: 1, depth: 0.065, bevelEnabled: true, bevelThickness: 0.015, bevelSize: 0.025, bevelSegments, curveSegments: 1 });
  const right = add('wingR', wingGeometry, body, [0, 0.02, 0.3], [-Math.PI / 2, 0, 0]);
  const left = right.clone(); left.name = 'wingL'; left.scale.x = -1; root.add(left);
  const tipGeometry = new RoundedBoxGeometry(0.08, 0.075, 0.64, bevelSegments, 0.025);
  const finGeometry = new RoundedBoxGeometry(0.055, 0.72, 0.72, bevelSegments, 0.022);
  for (const sign of [-1, 1]) {
    add(`tip[${sign}]`, tipGeometry, accent, [sign * 2.54, 0.03, 1.6], [0, sign * 0.12, 0]);
    add(`fin[${sign}]`, finGeometry, trim, [sign * 0.34, 0.29, 2.57], [0, 0, sign * 0.55]);
  }
  add('hub', new THREE.CylinderGeometry(0.1, 0.1, 0.25, 16), metal, [0, 0, 3.25], [Math.PI / 2, 0, 0]);
  const prop = new THREE.Group(); prop.name = 'prop'; prop.position.z = 3.4; root.add(prop);
  const bladeGeometry = new RoundedBoxGeometry(0.07, 1.45, 0.10, bevelSegments, 0.025);
  for (let i = 0; i < 2; i++) add(`blade[${i}]`, bladeGeometry, trim, [0, 0, 0], [0, 0, i * Math.PI / 2], prop);

  // Retain all five evidenced panel-ring objects, but reuse one low-cost profile.
  const ringGeometry = new THREE.TorusGeometry(0.412, 0.0035, 4, reduced ? 20 : 32);
  for (let i = -2; i <= 2; i++) add(`ring[${i}]`, ringGeometry, trim, [0, 0, i * 0.9]);
  // Tiny original decorative fasteners are one instanced draw, not twenty meshes.
  const rivets = new THREE.InstancedMesh(new THREE.SphereGeometry(0.012, 6, 4), metal, 20);
  rivets.name = 'panel-fasteners';
  const matrix = new THREE.Matrix4();
  for (let i = 0; i < 20; i++) {
    const a = (i % 4) * Math.PI / 2;
    matrix.makeTranslation(Math.cos(a) * 0.415, Math.sin(a) * 0.415, (Math.floor(i / 4) - 2) * 0.9);
    rivets.setMatrixAt(i, matrix);
  }
  rivets.instanceMatrix.needsUpdate = true;
  rivets.computeBoundingSphere();
  // Native r169 LOD removes subpixel decorative fasteners at distant inspector
  // zoom, while the silhouette and every recognition component remain present.
  const detailLOD = new THREE.LOD(); detailLOD.name = 'recognition-detail-lod';
  detailLOD.addLevel(rivets, 0);
  const distant = new THREE.Group(); distant.name = 'distant-detail-omitted';
  detailLOD.addLevel(distant, 8, 0.08);
  root.add(detailLOD);
  root.scale.setScalar(0.5);
  root.userData.prop = prop;
  root.userData.detailMeshes = [detailLOD];
  root.userData.quality = quality;
  root.userData.paintMaterials = [body, noseMaterial];
  root.userData.surfaceMaps = maps;
  return root;
}

function disposeObject(root) {
  const geometries = new Set(), materials = new Set(), textures = new Set();
  root.traverse((object) => {
    if (object.isInstancedMesh) object.dispose(); // release per-instance buffers on quality changes
    if (object.geometry) geometries.add(object.geometry);
    const list = object.material ? (Array.isArray(object.material) ? object.material : [object.material]) : [];
    list.forEach((material) => { materials.add(material); Object.values(material).forEach((value) => { if (value?.isTexture && !value.userData.ownedByDisplayTextureCache) textures.add(value); }); });
  });
  textures.forEach((t) => t.dispose()); materials.forEach((m) => m.dispose()); geometries.forEach((g) => g.dispose());
}

export function mountShahedInspector(container, options = {}) {
  let quality = options.quality || 'high';
  let budget = qualityFor(quality);
  let disposed = false, visible = true, raf = 0, last = 0, accumulator = 0, autoRotate = true;
  let composer = null, bloom = null, environmentTarget = null, environmentPromise = null;
  const warnings = [];
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance', depth: true, stencil: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, budget.pixelRatio));
  renderer.setSize(container.clientWidth || 280, container.clientHeight || 180);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.info.autoReset = false; // aggregate complete composer/shadow submissions per rendered frame
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.shadowMap.enabled = budget.shadows;
  renderer.domElement.setAttribute('aria-label', 'Illustrative airframe recognition model; drag to inspect');
  container.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  scene.name = 'awareness-inspector';
  const camera = new THREE.PerspectiveCamera(42, (container.clientWidth || 280) / (container.clientHeight || 180), 0.1, 100);
  camera.position.set(3.2, 2, 4.4); camera.lookAt(0, 0, 0);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = false; controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 3.5; controls.maxDistance = 10; controls.maxPolarAngle = Math.PI * 0.49;
  controls.addEventListener('start', () => { autoRotate = false; });
  controls.addEventListener('end', () => { autoRotate = true; });
  const key = new THREE.DirectionalLight(0xfff2e2, 2.2); key.name = 'key'; key.position.set(4, 6, 4);
  key.castShadow = true; key.shadow.bias = -0.0001; key.shadow.normalBias = 0.012;
  Object.assign(key.shadow.camera, { left: -3, right: 3, top: 3, bottom: -3, near: 0.5, far: 18 });
  key.shadow.mapSize.set(budget.shadowSize, budget.shadowSize); scene.add(key);
  const rim = new THREE.DirectionalLight(0xd9e8ff, 0.85); rim.name = 'rim'; rim.position.set(-5, 2, -4); scene.add(rim);
  const fill = new THREE.HemisphereLight(0xdde6ef, 0x3d3930, 0.5); fill.name = 'fill'; scene.add(fill);
  let model = buildShahed136({ quality }); scene.add(model);
  // The original inspector ground disc becomes a thin, chamfer-sided contact
  // plinth. This is not inserted into or substituted for real geospatial terrain.
  const disc = new THREE.Mesh(new THREE.CylinderGeometry(3.2, 3.24, 0.08, 64, 1), new THREE.MeshStandardMaterial({ color: 0x827e70, roughness: 0.94, metalness: 0 }));
  disc.name = 'studio-contact-disc'; disc.position.y = -0.64; disc.receiveShadow = true; scene.add(disc);
  const surfaceCache = createSurfaceTextureCache(renderer, (message, error) => {
    warnings.push(message); console.warn('[Inspector]', message, error);
  });
  let surfaceEpoch = 0;
  const loadSurfaces = () => {
    const epoch = ++surfaceEpoch;
    const current = model;
    Promise.all([surfaceCache.load('concrete', budget), surfaceCache.load('paint', budget)]).then(([ground, paint]) => {
      if (disposed || epoch !== surfaceEpoch || current !== model) return;
      if (ground) { disc.material.map = ground; disc.material.color.set(0xffffff); disc.material.needsUpdate = true; }
      if (paint) current.userData.paintMaterials.forEach((material) => {
        material.map = paint; material.color.set(0xffffff); material.needsUpdate = true;
      });
    });
  };
  let pmrem = null;
  try {
    pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    environmentTarget = pmrem.fromScene(room, 0.04);
    scene.environment = environmentTarget.texture;
    disposeObject(room);
  } catch (error) { warnings.push('Room environment unavailable'); console.warn('[Inspector] analytic-light fallback:', error); }
  // CC0 license/source recorded in public/licenses/realism-assets.json. One 1K
  // RGBE file, lazy loaded only while the inspector is visible and quality allows.
  const loadEnvironment = () => {
    if (disposed || !pmrem || !budget.hdrEnvironment || environmentPromise) return;
    environmentPromise = new RGBELoader().loadAsync(`${import.meta.env?.BASE_URL || '/'}environments/studio-small-09-1k.hdr`)
      .then((hdr) => {
        if (disposed) { hdr.dispose(); return; }
        const target = pmrem.fromEquirectangular(hdr);
        hdr.dispose(); environmentTarget?.dispose(); environmentTarget = target;
        scene.environment = target.texture;
      }).catch((error) => { warnings.push('HDR unavailable; generated room environment retained'); console.warn('[Inspector] HDR fallback:', error); });
  };
  try {
    composer = new EffectComposer(renderer, { frameBufferType: THREE.HalfFloatType, multisampling: 0 });
    composer.addPass(new RenderPass(scene, camera));
    bloom = new BloomEffect({ intensity: 0.14, luminanceThreshold: 1.2, luminanceSmoothing: 0.2, kernelSize: KernelSize.MEDIUM, mipmapBlur: true });
    composer.addPass(new EffectPass(camera, new SMAAEffect(), bloom, new ToneMappingEffect({ mode: ToneMappingMode.ACES_FILMIC })));
    renderer.toneMapping = THREE.NoToneMapping;
  } catch (error) {
    composer?.dispose(); composer = null; renderer.toneMapping = THREE.ACESFilmicToneMapping;
    warnings.push('Composer unavailable; native antialias/ACES fallback'); console.warn('[Inspector] postprocess fallback:', error);
  }
  const resize = () => {
    if (disposed) return;
    const w = container.clientWidth || 280, h = container.clientHeight || 180;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, budget.pixelRatio)); renderer.setSize(w, h);
    composer?.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix();
  };
  const applyQuality = (id) => {
    quality = ['performance', 'balanced', 'high'].includes(id) ? id : 'high';
    budget = qualityFor(quality); renderer.shadowMap.enabled = budget.shadows;
    if (model.userData.quality !== quality) {
      const rotation = model.rotation.clone(), propRotation = model.userData.prop.rotation.z;
      const previous = model;
      model = buildShahed136({ quality }); model.rotation.copy(rotation); model.userData.prop.rotation.z = propRotation;
      scene.remove(previous); scene.add(model); disposeObject(previous);
    }
    key.shadow.mapSize.set(budget.shadowSize, budget.shadowSize);
    if (key.shadow.map) { key.shadow.map.dispose(); key.shadow.map = null; }
    model.userData.detailMeshes.forEach((mesh) => { mesh.visible = budget.microdetail; });
    if (bloom) bloom.intensity = budget.bloom ? 0.14 : 0;
    resize(); if (visible) { loadEnvironment(); loadSurfaces(); }
  };
  let intersection = null, resizeObserver = null;
  if (typeof IntersectionObserver !== 'undefined') {
    visible = false;
    intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) { loadEnvironment(); loadSurfaces(); } }, { root: null, threshold: 0.01 });
    intersection.observe(container);
  } else { loadEnvironment(); loadSurfaces(); }
  if (typeof ResizeObserver !== 'undefined') { resizeObserver = new ResizeObserver(resize); resizeObserver.observe(container); }
  window.addEventListener('resize', resize);
  const animate = (timestamp) => {
    if (disposed) return;
    const dt = Math.min(0.05, Math.max(0, (timestamp - (last || timestamp)) / 1000)); last = timestamp;
    accumulator += dt;
    const rect = container.getBoundingClientRect();
    if (!visible || document.hidden || rect.width <= 0 || rect.height <= 0) accumulator = 0;
    if (visible && !document.hidden && rect.width > 0 && rect.height > 0 && accumulator >= 1 / budget.inspectorHz) {
      const step = Math.min(accumulator, 0.1); accumulator = 0;
      if (autoRotate) model.rotation.y += step * 0.32;
      model.userData.prop.rotation.z = (model.userData.prop.rotation.z + step * 28) % (Math.PI * 2);
      controls.update(); renderer.info.reset();
      try { if (composer) composer.render(step); else renderer.render(scene, camera); }
      catch (error) {
        warnings.push('Composer render failed; disabled for subsequent frames'); console.warn('[Inspector] renderer fallback:', error);
        composer?.dispose(); composer = null; renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.render(scene, camera);
      }
    }
    raf = requestAnimationFrame(animate);
  };
  const snapshot = () => ({ version: THREE.REVISION, quality, visible, environment: environmentTarget ? 'PMREM' : 'analytic-only', surfaceTextureCount: surfaceCache.count, textureBudget: budget.textureSize, warnings: [...warnings], draw: { ...renderer.info.render }, memory: { ...renderer.info.memory }, programCount: renderer.info.programs?.length ?? null, pixelRatio: renderer.getPixelRatio(), canvas: { width: renderer.domElement.width, height: renderer.domElement.height }, camera: { position: camera.position.toArray(), quaternion: camera.quaternion.toArray(), fov: camera.fov }, objectNames: [] });
  const api = {
    setQuality: applyQuality,
    getDiagnostics: () => { const data = snapshot(); scene.traverse((object) => data.objectNames.push({ name: object.name, type: object.type })); return data; },
    dispose() {
      if (disposed) return;
      disposed = true; cancelAnimationFrame(raf); window.removeEventListener('resize', resize);
      intersection?.disconnect(); resizeObserver?.disconnect(); controls.dispose(); composer?.dispose();
      surfaceEpoch++; disposeObject(scene); surfaceCache.dispose(); environmentTarget?.dispose(); pmrem?.dispose(); renderer.dispose();
      renderer.domElement.remove();
    },
  };
  applyQuality(quality); raf = requestAnimationFrame(animate);
  return api;
}

export default { buildShahed136, mountShahedInspector };
