// ============================================================================
//  Shahed136 — hyper-detailed delta-wing loitering-munition 3D model (Three.js)
//  Builds a parametric Shahed-136-class OWA airframe (fuselage, twin-delta wing,
//  inverted-V tail, pusher prop, warhead nose, EO sensor) with PBR materials,
//  HDR-ish lighting + bloom-friendly emissives, rendered in a self-contained
//  inset inspector canvas. No external assets — pure procedural geometry.
// ============================================================================
import * as THREE from 'three';
// DEFECT 1: image-based lighting for the inspector. RoomEnvironment + PMREM give
// a prefiltered environment map so the drone's PBR materials get realistic
// ambient reflections/fill (no flat or black faces). Imported from three's jsm
// examples; both are pure-JS and bundle fine with Vite.
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export function buildShahed136() {
  const group = new THREE.Group();
  group.name = 'Shahed136';

  // ---- materials ----
  const body = new THREE.MeshStandardMaterial({
    color: 0xb9c9bd, metalness: 0.35, roughness: 0.55,
  });
  const bodyDark = new THREE.MeshStandardMaterial({
    color: 0x8a9b8f, metalness: 0.4, roughness: 0.5,
  });
  const warhead = new THREE.MeshStandardMaterial({
    color: 0x6a2a22, metalness: 0.5, roughness: 0.4,
    emissive: 0x3a0d08, emissiveIntensity: 0.4,
  });
  const sensor = new THREE.MeshStandardMaterial({
    color: 0x0a0a0a, metalness: 0.9, roughness: 0.15,
    emissive: 0x113322, emissiveIntensity: 0.6,
  });
  const accent = new THREE.MeshStandardMaterial({
    color: 0x7be0ad, metalness: 0.3, roughness: 0.4,
    emissive: 0x1f7a55, emissiveIntensity: 0.8,
  });

  // ---- fuselage (tapered capsule body) ----
  const fuse = new THREE.Mesh(
    new THREE.CylinderGeometry(0.42, 0.5, 5.6, 24, 1, false),
    body
  );
  fuse.rotation.x = Math.PI / 2;
  group.add(fuse);

  // nose cone (warhead) — forward = -Z
  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.42, 1.5, 24), warhead);
  nose.rotation.x = -Math.PI / 2;
  nose.position.z = -3.5;
  group.add(nose);

  // EO/IR seeker ball under the nose
  const eo = new THREE.Mesh(new THREE.SphereGeometry(0.3, 20, 16), sensor);
  eo.position.set(0, -0.34, -2.7);
  group.add(eo);

  // tail cap
  const tailCap = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.36, 0.5, 20), bodyDark);
  tailCap.rotation.x = Math.PI / 2;
  tailCap.position.z = 3.0;
  group.add(tailCap);

  // ---- delta wing (extruded triangular planform, swept) ----
  const wingShape = new THREE.Shape();
  wingShape.moveTo(0, 0.4);
  wingShape.lineTo(0, -2.2);
  wingShape.lineTo(3.4, -1.6);
  wingShape.lineTo(0.2, 0.45);
  wingShape.closePath();
  const wingGeo = new THREE.ExtrudeGeometry(wingShape, { depth: 0.1, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.05, bevelSegments: 1 });

  const wingR = new THREE.Mesh(wingGeo, body);
  wingR.rotation.y = Math.PI / 2;
  wingR.position.set(0.0, 0.0, 0.2);
  group.add(wingR);
  const wingL = wingR.clone();
  wingL.scale.x = -1;
  group.add(wingL);

  // wingtip accent strips (brand light-green) — bloom-friendly emissive
  for (const s of [1, -1]) {
    const tip = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.12, 1.0), accent);
    tip.position.set(s * 3.3, 0.02, 0.6);
    tip.rotation.y = s * 0.18;
    group.add(tip);
  }

  // ---- inverted-V tail fins ----
  const finGeo = new THREE.BoxGeometry(0.07, 1.1, 0.9);
  for (const s of [1, -1]) {
    const fin = new THREE.Mesh(finGeo, bodyDark);
    fin.position.set(s * 0.45, 0.45, 2.7);
    fin.rotation.z = s * 0.6;
    group.add(fin);
  }

  // ---- pusher propeller (rear) ----
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.3, 12), bodyDark);
  hub.rotation.x = Math.PI / 2;
  hub.position.z = 3.35;
  const prop = new THREE.Group();
  prop.name = 'prop';
  for (let i = 0; i < 2; i++) {
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.7, 0.18), bodyDark);
    blade.rotation.z = i * Math.PI / 2;
    prop.add(blade);
  }
  prop.position.z = 3.5;
  group.add(hub);
  group.add(prop);

  // panel-line ring details
  for (let i = -2; i <= 2; i++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.012, 8, 28), bodyDark);
    ring.position.z = i * 1.0;
    group.add(ring);
  }

  group.userData.prop = prop;
  group.scale.setScalar(0.5);
  return group;
}

// Self-contained inset inspector: returns {dispose}.
export function mountShahedInspector(container) {
  const w = container.clientWidth || 280;
  const h = container.clientHeight || 180;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  renderer.setSize(w, h);
  // DEFECT 1: balanced tone mapping + correct color space (sRGB output) so the
  // PBR materials read with accurate colour and exposure (guarded for older
  // three builds where the property name differs).
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  try {
    // three r152+ (this project uses 0.169) uses outputColorSpace + SRGBColorSpace.
    if ('outputColorSpace' in renderer && THREE.SRGBColorSpace) {
      renderer.outputColorSpace = THREE.SRGBColorSpace;
    }
  } catch (_) {}
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  // DEFECT 1: image-based lighting via PMREM-prefiltered RoomEnvironment so the
  // drone is lit from all directions (no black/flat faces) even if a directional
  // light misses a face. Fully guarded: if PMREM/HDRI setup throws on a weak GPU
  // we fall back silently to the directional + hemisphere lights added below.
  try {
    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEnvironmentMap && pmrem.compileEnvironmentMap();
    const envScene = new RoomEnvironment();
    const envRT = pmrem.fromScene(envScene, 0.04);
    scene.environment = envRT.texture;   // IBL applied to all PBR materials
    pmrem.dispose();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('[Shahed inspector] IBL/PMREM unavailable, using analytic lights only:', e);
  }
  const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100);
  camera.position.set(3.2, 2.0, 4.4);
  camera.lookAt(0, 0, 0);

  // lighting (key + rim + fill) — emulates HDR studio
  const key = new THREE.DirectionalLight(0xffffff, 2.6);
  key.position.set(4, 6, 4);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x7be0ad, 1.6);
  rim.position.set(-5, 1, -4);
  scene.add(rim);
  const fill = new THREE.HemisphereLight(0xbfe9d5, 0x0b3d2e, 0.9);
  scene.add(fill);

  const model = buildShahed136();
  scene.add(model);

  // ground glow disc
  const disc = new THREE.Mesh(
    new THREE.CircleGeometry(3.2, 48),
    new THREE.MeshBasicMaterial({ color: 0x0b3d2e, transparent: true, opacity: 0.35 })
  );
  disc.rotation.x = -Math.PI / 2;
  disc.position.y = -1.2;
  scene.add(disc);

  let raf = 0;
  let t = 0;
  const animate = () => {
    t += 0.016;
    model.rotation.y = t * 0.5;
    if (model.userData.prop) model.userData.prop.rotation.z += 0.9;
    renderer.render(scene, camera);
    raf = requestAnimationFrame(animate);
  };
  animate();

  const onResize = () => {
    const nw = container.clientWidth || w;
    const nh = container.clientHeight || h;
    renderer.setSize(nw, nh);
    camera.aspect = nw / nh;
    camera.updateProjectionMatrix();
  };
  window.addEventListener('resize', onResize);

  return {
    dispose() {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    },
  };
}

export default { buildShahed136, mountShahedInspector };
