// ============================================================================
//  DesertScene — UAE protective-simulation desert theatre (Three.js visual overhaul)
//
//  Root causes addressed (flat / dark / washed look):
//    • Missing or incorrect outputColorSpace (linear→sRGB)
//    • No ACES filmic tone mapping / wrong exposure
//    • No PMREM environment / IBL fill → PBR reads flat black in recesses
//    • Lights too dim or MeshBasicMaterial (unlit)
//    • No shadow maps / soft PCF shadows
//    • No post chain (bloom / AA / filmic grade)
//
//  Stack (three r169 + three-stdlib + pmndrs postprocessing):
//    WebGLRenderer: SRGBColorSpace, ACES (or ToneMappingEffect), PCFSoft shadows
//    PMREM from procedural desert sky cubemap (no HDR download dependency)
//    Harsh UAE sun: warm DirectionalLight ~0xffe6b3, low elevation, long shadows
//    Hemisphere + gradient sky dome, OrbitControls damping, heat-haze UV pass
//    EffectComposer: RenderPass + Bloom + SMAA + ACES ToneMapping (+ heat haze)
// ============================================================================
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import { RoomEnvironment } from 'three-stdlib';
import {
  EffectComposer,
  RenderPass,
  EffectPass,
  Effect,
  BloomEffect,
  SMAAEffect,
  ToneMappingEffect,
  ToneMappingMode,
  KernelSize,
} from 'postprocessing';
import { buildDesertTerrain } from './DesertTerrain.js';
import { buildShahed136 } from './Shahed136.js';

// ---------------------------------------------------------------------------
// Heat-haze fragment effect (lightweight UV distortion / noise)
// Implemented as a pmndrs Effect so it slots into EffectPass without a second
// full-screen composer. Subtle — keeps the scene clearly readable.
// ---------------------------------------------------------------------------
const heatHazeFragment = /* glsl */ `
uniform float time;
uniform float intensity;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  // Stronger near the top half (horizon heat) and weaker at the bottom
  float band = smoothstep(0.15, 0.85, uv.y);
  float n1 = sin(uv.y * 48.0 + time * 2.4) * cos(uv.x * 36.0 - time * 1.7);
  float n2 = sin(uv.x * 90.0 + time * 3.1 + uv.y * 20.0);
  vec2 offset = vec2(n1, n2 * 0.55) * intensity * band * 0.0045;
  vec4 c = texture2D(inputBuffer, uv + offset);
  // Tiny warm lift in the haze band (filmic desert air)
  c.rgb += vec3(0.012, 0.006, 0.0) * band * intensity;
  outputColor = c;
}
`;

class HeatHazeEffect extends Effect {
  constructor({ intensity = 1.0 } = {}) {
    super('HeatHazeEffect', heatHazeFragment, {
      uniforms: new Map([
        ['time', new THREE.Uniform(0)],
        ['intensity', new THREE.Uniform(intensity)],
      ]),
    });
  }
  get time() { return this.uniforms.get('time').value; }
  set time(v) { this.uniforms.get('time').value = v; }
  get intensity() { return this.uniforms.get('intensity').value; }
  set intensity(v) { this.uniforms.get('intensity').value = v; }
}

// ---------------------------------------------------------------------------
// Procedural desert / sky env for PMREM (no external HDR dependency)
// ---------------------------------------------------------------------------
function buildDesertEnvScene() {
  const env = new THREE.Scene();

  // Gradient sky dome
  const skyGeo = new THREE.SphereGeometry(50, 32, 16);
  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {
      topColor: { value: new THREE.Color(0x6eb6ff) },     // UAE noon blue
      midColor: { value: new THREE.Color(0xc9dff5) },
      botColor: { value: new THREE.Color(0xf0d2a0) },     // warm horizon haze
    },
    vertexShader: /* glsl */ `
      varying vec3 vPos;
      void main() {
        vPos = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 topColor;
      uniform vec3 midColor;
      uniform vec3 botColor;
      varying vec3 vPos;
      void main() {
        float h = normalize(vPos).y;
        vec3 col = mix(botColor, midColor, smoothstep(-0.15, 0.25, h));
        col = mix(col, topColor, smoothstep(0.15, 0.85, h));
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  env.add(new THREE.Mesh(skyGeo, skyMat));

  // Ground bounce plate (sand albedo into the env)
  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(40, 32),
    new THREE.MeshBasicMaterial({ color: 0xc4a574, side: THREE.DoubleSide })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -1;
  env.add(ground);

  // Bright sun disc contribution into the env map
  const sun = new THREE.Mesh(
    new THREE.SphereGeometry(2.2, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xfff0c8 })
  );
  sun.position.set(-28, 14, -18);
  env.add(sun);

  return env;
}

/**
 * Mount the full UAE desert protective scene into a container element.
 * Canvas fills the container; OrbitControls; rAF loop.
 * @returns {{ dispose: Function, renderer: THREE.WebGLRenderer, scene: THREE.Scene }}
 */
export function mountDesertScene(container) {
  if (!container) throw new Error('mountDesertScene: container required');

  const w = Math.max(2, container.clientWidth || window.innerWidth);
  const h = Math.max(2, container.clientHeight || window.innerHeight);

  // ── Renderer: modern PBR pipeline ──────────────────────────────────────
  const renderer = new THREE.WebGLRenderer({
    antialias: false, // SMAA in composer
    alpha: false,
    powerPreference: 'high-performance',
    stencil: false,
    depth: true,
  });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  renderer.setSize(w, h, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  // When composer is active we set NoToneMapping to avoid double ACES;
  // fallback path keeps ACES on the renderer.
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  // physicallyCorrectLights was renamed / default-true in r155+; set if present
  if ('useLegacyLights' in renderer) renderer.useLegacyLights = false;
  if ('physicallyCorrectLights' in renderer) renderer.physicallyCorrectLights = true;

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  renderer.domElement.style.outline = 'none';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87b7e0);
  scene.fog = new THREE.FogExp2(0xd9c49a, 0.00135);

  // ── Camera + OrbitControls ─────────────────────────────────────────────
  const camera = new THREE.PerspectiveCamera(48, w / h, 0.25, 4000);
  camera.position.set(48, 22, 62);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.minDistance = 8;
  controls.maxDistance = 280;
  controls.maxPolarAngle = Math.PI * 0.48; // stay above ground
  controls.minPolarAngle = 0.12;
  controls.target.set(0, 4, 0);
  controls.update();

  // ── PMREM environment (procedural desert sky → fallback RoomEnvironment) ─
  let envRT = null;
  try {
    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileCubemapShader();
    let envSource;
    try {
      envSource = buildDesertEnvScene();
      envRT = pmrem.fromScene(envSource, 0.04);
    } catch (e1) {
      // RoomEnvironment fallback (three-stdlib)
      envSource = new RoomEnvironment();
      envRT = pmrem.fromScene(envSource, 0.04);
    }
    scene.environment = envRT.texture;
    pmrem.dispose();
    // dispose helper meshes if Scene
    if (envSource && envSource.traverse) {
      envSource.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) {
          if (Array.isArray(o.material)) o.material.forEach((m) => m.dispose());
          else o.material.dispose();
        }
      });
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('[DesertScene] PMREM unavailable — analytic lights only:', e);
  }

  // ── Sky shader (three/addons Sky) ──────────────────────────────────────
  let sky = null;
  try {
    sky = new Sky();
    sky.scale.setScalar(4500);
    scene.add(sky);
    const skyUniforms = sky.material.uniforms;
    skyUniforms.turbidity.value = 4.5;
    skyUniforms.rayleigh.value = 1.8;
    skyUniforms.mieCoefficient.value = 0.006;
    skyUniforms.mieDirectionalG.value = 0.75;
  } catch (e) {
    // Gradient dome fallback if Sky shader fails
    const dome = new THREE.Mesh(
      new THREE.SphereGeometry(2000, 24, 12),
      new THREE.MeshBasicMaterial({ color: 0x7eb6ef, side: THREE.BackSide, depthWrite: false })
    );
    scene.add(dome);
  }

  // ── Harsh UAE sun — warm, low elevation, long shadows ──────────────────
  // Elevation ~22° → long shadows across dunes; colour ~0xffe6b3
  const sunElevationDeg = 22;
  const sunAzimuthDeg = 215; // WSW — afternoon Gulf light
  const phi = THREE.MathUtils.degToRad(90 - sunElevationDeg);
  const theta = THREE.MathUtils.degToRad(sunAzimuthDeg);
  const sunDir = new THREE.Vector3().setFromSphericalCoords(1, phi, theta);

  if (sky) {
    sky.material.uniforms.sunPosition.value.copy(sunDir.clone().multiplyScalar(1000));
  }

  const sun = new THREE.DirectionalLight(0xffe6b3, 6.5);
  sun.position.copy(sunDir.clone().multiplyScalar(180));
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.bias = -0.00025;
  sun.shadow.normalBias = 0.035;
  sun.shadow.radius = 2.5; // PCF soft
  // Shadow camera sized to the terrain
  const sc = sun.shadow.camera;
  sc.near = 1;
  sc.far = 420;
  sc.left = -160;
  sc.right = 160;
  sc.top = 160;
  sc.bottom = -160;
  sc.updateProjectionMatrix();
  scene.add(sun);
  scene.add(sun.target);

  // Fill from opposite sky / sand bounce
  const hemi = new THREE.HemisphereLight(0xb8d4f0, 0xc4a574, 0.85);
  scene.add(hemi);

  // Soft ambient so recesses never crush to black (IBL still does the heavy lift)
  const amb = new THREE.AmbientLight(0xfff2dc, 0.18);
  scene.add(amb);

  // Rim / bounce from sand
  const bounce = new THREE.DirectionalLight(0xe8c896, 0.55);
  bounce.position.set(-40, 12, 30);
  scene.add(bounce);

  // ── Terrain ────────────────────────────────────────────────────────────
  const terrain = buildDesertTerrain({ size: 420, segments: 140 });
  scene.add(terrain.group);

  // ── Protective assets: sensor mast + observation shelter (PBR) ──────────
  const steel = new THREE.MeshStandardMaterial({
    color: 0x8a9399, metalness: 0.72, roughness: 0.38, envMapIntensity: 1.0,
  });
  const concrete = new THREE.MeshStandardMaterial({
    color: 0xb9b0a0, metalness: 0.05, roughness: 0.88, envMapIntensity: 0.45,
  });
  const paint = new THREE.MeshStandardMaterial({
    color: 0x5c6b52, metalness: 0.15, roughness: 0.65, envMapIntensity: 0.6,
  });
  const accent = new THREE.MeshStandardMaterial({
    color: 0x4ee39b, metalness: 0.35, roughness: 0.4,
    emissive: 0x1f7a55, emissiveIntensity: 0.55, envMapIntensity: 0.8,
  });

  // Observation bunker (simple massing — defensive visual only)
  const bunker = new THREE.Group();
  bunker.name = 'ObservationShelter';
  const base = new THREE.Mesh(new THREE.BoxGeometry(14, 3.2, 9), concrete);
  base.position.y = 1.6;
  base.castShadow = true;
  base.receiveShadow = true;
  bunker.add(base);
  const roof = new THREE.Mesh(new THREE.BoxGeometry(15.5, 0.55, 10.2), paint);
  roof.position.y = 3.45;
  roof.castShadow = true;
  roof.receiveShadow = true;
  bunker.add(roof);
  const ramp = new THREE.Mesh(new THREE.BoxGeometry(4, 0.4, 6), concrete);
  ramp.position.set(0, 0.35, 6.5);
  ramp.rotation.x = -0.12;
  ramp.receiveShadow = true;
  bunker.add(ramp);
  bunker.position.set(-18, 0, 12);
  // lift bunker to terrain height
  bunker.position.y = 2.5;
  scene.add(bunker);

  // Sensor / overwatch mast
  const mast = new THREE.Group();
  mast.name = 'SensorMast';
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.38, 18, 12), steel);
  pole.position.y = 9;
  pole.castShadow = true;
  mast.add(pole);
  const head = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.9, 1.2), steel);
  head.position.y = 18.2;
  head.castShadow = true;
  mast.add(head);
  const dish = new THREE.Mesh(new THREE.SphereGeometry(0.7, 16, 12, 0, Math.PI), steel);
  dish.position.set(0.9, 18.2, 0);
  dish.rotation.y = Math.PI / 2;
  dish.castShadow = true;
  mast.add(dish);
  const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 12), accent);
  beacon.position.y = 19.0;
  mast.add(beacon);
  mast.position.set(22, 3.5, -16);
  scene.add(mast);

  // Perimeter markers (low bollards)
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    const r = 38;
    const m = new THREE.Mesh(
      new THREE.CylinderGeometry(0.25, 0.3, 1.2, 8),
      i % 3 === 0 ? accent : paint
    );
    m.position.set(Math.cos(a) * r, 2.2, Math.sin(a) * r);
    m.castShadow = true;
    m.receiveShadow = true;
    scene.add(m);
  }

  // Shahed-136 inspector model as a static display stand (protective study)
  try {
    const drone = buildShahed136();
    drone.scale.setScalar(1.1);
    drone.position.set(6, 6.5, -4);
    drone.rotation.y = -0.6;
    drone.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
        // Ensure no MeshBasic slips through — upgrade if needed
        if (o.material && o.material.isMeshBasicMaterial) {
          o.material = new THREE.MeshStandardMaterial({
            color: o.material.color,
            roughness: 0.55,
            metalness: 0.3,
          });
        }
      }
    });
    scene.add(drone);
    // Simple display plinth
    const plinth = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.8, 1.2, 24), concrete);
    plinth.position.set(6, 2.8, -4);
    plinth.castShadow = true;
    plinth.receiveShadow = true;
    scene.add(plinth);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('[DesertScene] drone model skipped:', e);
  }

  // ── Post-processing composer ───────────────────────────────────────────
  let composer = null;
  let heatHaze = null;
  try {
    composer = new EffectComposer(renderer, {
      frameBufferType: THREE.HalfFloatType,
    });
    composer.addPass(new RenderPass(scene, camera));

    const bloom = new BloomEffect({
      intensity: 0.42,
      luminanceThreshold: 0.78,
      luminanceSmoothing: 0.28,
      kernelSize: KernelSize.MEDIUM,
      mipmapBlur: true,
    });
    const smaa = new SMAAEffect();
    const aces = new ToneMappingEffect({ mode: ToneMappingMode.ACES_FILMIC });
    heatHaze = new HeatHazeEffect({ intensity: 0.85 });

    composer.addPass(new EffectPass(camera, smaa, bloom, heatHaze, aces));
    // Avoid double tone-mapping
    renderer.toneMapping = THREE.NoToneMapping;
  } catch (e) {
    composer = null;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    // eslint-disable-next-line no-console
    console.warn('[DesertScene] composer unavailable, plain ACES render:', e);
  }

  // ── Animate ────────────────────────────────────────────────────────────
  const clock = new THREE.Clock();
  let raf = 0;
  let disposed = false;

  const animate = () => {
    if (disposed) return;
    raf = requestAnimationFrame(animate);
    const dt = clock.getDelta();
    const t = clock.elapsedTime;
    controls.update();
    if (heatHaze) heatHaze.time = t;
    // Gentle sun drift (very slow) keeps shadow contact lively without flicker
    const sway = Math.sin(t * 0.03) * 0.015;
    sun.position.x = sunDir.x * 180 + sway * 40;
    if (composer) {
      try { composer.render(dt); }
      catch (_) { renderer.render(scene, camera); }
    } else {
      renderer.render(scene, camera);
    }
  };
  animate();

  const onResize = () => {
    const nw = Math.max(2, container.clientWidth || window.innerWidth);
    const nh = Math.max(2, container.clientHeight || window.innerHeight);
    camera.aspect = nw / nh;
    camera.updateProjectionMatrix();
    renderer.setSize(nw, nh, false);
    if (composer) {
      try { composer.setSize(nw, nh); } catch (_) {}
    }
  };
  window.addEventListener('resize', onResize);
  // Observe container size changes (HUD layout)
  let ro = null;
  if (typeof ResizeObserver !== 'undefined') {
    ro = new ResizeObserver(onResize);
    ro.observe(container);
  }

  return {
    renderer,
    scene,
    camera,
    controls,
    dispose() {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      if (ro) try { ro.disconnect(); } catch (_) {}
      try { controls.dispose(); } catch (_) {}
      if (composer) try { composer.dispose(); } catch (_) {}
      if (envRT) try { envRT.dispose(); } catch (_) {}
      try { terrain.dispose(); } catch (_) {}
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) {
          if (Array.isArray(o.material)) o.material.forEach((m) => m.dispose());
          else o.material.dispose();
        }
      });
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    },
  };
}

export default { mountDesertScene };
