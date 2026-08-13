// ============================================================================
//  DesertTerrain — lightweight procedural UAE dune field for Three.js
//  Low-poly displaced PlaneGeometry with slight albedo variation, shadow
//  receiving, and PBR sand materials. No external DEM / HDR downloads.
// ============================================================================
import * as THREE from 'three';

/** Hash noise in [0,1] — deterministic, no textures required. */
function hash2(x, y) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

function smoothNoise(x, y) {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const fx = x - x0;
  const fy = y - y0;
  const u = fx * fx * (3 - 2 * fx);
  const v = fy * fy * (3 - 2 * fy);
  const a = hash2(x0, y0);
  const b = hash2(x0 + 1, y0);
  const c = hash2(x0, y0 + 1);
  const d = hash2(x0 + 1, y0 + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

/** Multi-octave dune height field (metres-ish, scaled later). */
function duneHeight(x, z) {
  // Long ridges (primary dunes) + secondary ripples + low rock outcrops
  let h = 0;
  h += smoothNoise(x * 0.018, z * 0.018) * 14.0;
  h += smoothNoise(x * 0.045 + 20, z * 0.04) * 6.5;
  h += smoothNoise(x * 0.12, z * 0.11) * 2.2;
  h += Math.sin(x * 0.035 + z * 0.012) * 3.5;
  h += Math.cos(z * 0.028 - x * 0.01) * 2.0;
  // Occasional rocky bumps
  const rock = smoothNoise(x * 0.08 + 90, z * 0.08 - 40);
  if (rock > 0.72) h += (rock - 0.72) * 18.0;
  return h;
}

/**
 * Build a low-poly desert dune mesh.
 * @param {object} [opts]
 * @param {number} [opts.size=420] world extent
 * @param {number} [opts.segments=128] plane subdivisions
 * @returns {{ group: THREE.Group, ground: THREE.Mesh, dispose: Function }}
 */
export function buildDesertTerrain(opts = {}) {
  const size = opts.size ?? 420;
  const segments = opts.segments ?? 128;

  const group = new THREE.Group();
  group.name = 'DesertTerrain';

  const geo = new THREE.PlaneGeometry(size, size, segments, segments);
  geo.rotateX(-Math.PI / 2);

  const pos = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);

  // UAE sand / wadi / rock albedo ranges (sRGB-ish linear approximations)
  const sandA = new THREE.Color(0xc4a574); // warm dune
  const sandB = new THREE.Color(0xd8b88a); // lighter crest
  const sandC = new THREE.Color(0xa8885c); // darker trough
  const rockC = new THREE.Color(0x6e5a48); // rocky outcrop
  const wadiC = new THREE.Color(0x8f7a55); // dry wadi channel

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const h = duneHeight(x, z);
    pos.setY(i, h);

    // slope proxy from neighbour samples
    const hx = duneHeight(x + 1.5, z) - duneHeight(x - 1.5, z);
    const hz = duneHeight(x, z + 1.5) - duneHeight(x, z - 1.5);
    const slope = Math.min(1, Math.sqrt(hx * hx + hz * hz) * 0.12);

    const crest = THREE.MathUtils.smoothstep(h, 8, 18);
    const trough = 1 - THREE.MathUtils.smoothstep(h, 2, 9);
    const n = smoothNoise(x * 0.05, z * 0.05);

    const c = sandA.clone();
    c.lerp(sandB, crest * 0.65 + n * 0.15);
    c.lerp(sandC, trough * 0.55);
    c.lerp(rockC, slope * 0.7);
    // subtle wadi channels along noise valleys
    if (n < 0.28 && h < 6) c.lerp(wadiC, 0.45);

    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }

  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.computeVertexNormals();

  const mat = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.92,
    metalness: 0.02,
    envMapIntensity: 0.55,
    flatShading: false,
  });

  const ground = new THREE.Mesh(geo, mat);
  ground.name = 'DesertGround';
  ground.receiveShadow = true;
  ground.castShadow = false;
  group.add(ground);

  // Sparse rock clusters (simple low-poly) for silhouette interest
  const rockMat = new THREE.MeshStandardMaterial({
    color: 0x6a5644,
    roughness: 0.95,
    metalness: 0.05,
    envMapIntensity: 0.4,
  });
  const rockGeo = new THREE.DodecahedronGeometry(1, 0);
  for (let i = 0; i < 28; i++) {
    const rx = (hash2(i, 1) - 0.5) * size * 0.85;
    const rz = (hash2(i, 2) - 0.5) * size * 0.85;
    const ry = duneHeight(rx, rz);
    const rock = new THREE.Mesh(rockGeo, rockMat);
    const s = 1.2 + hash2(i, 3) * 3.5;
    rock.scale.set(s, s * (0.5 + hash2(i, 4) * 0.9), s * (0.7 + hash2(i, 5) * 0.6));
    rock.position.set(rx, ry + s * 0.25, rz);
    rock.rotation.set(hash2(i, 6) * 2, hash2(i, 7) * 6, hash2(i, 8) * 2);
    rock.castShadow = true;
    rock.receiveShadow = true;
    group.add(rock);
  }

  // Distant low ridge ring (horizon fill)
  const ridgeGeo = new THREE.RingGeometry(size * 0.48, size * 0.62, 64);
  ridgeGeo.rotateX(-Math.PI / 2);
  const ridgeMat = new THREE.MeshStandardMaterial({
    color: 0xb89a6e,
    roughness: 0.98,
    metalness: 0.0,
    side: THREE.DoubleSide,
    envMapIntensity: 0.35,
  });
  const ridge = new THREE.Mesh(ridgeGeo, ridgeMat);
  ridge.position.y = 1.5;
  ridge.receiveShadow = true;
  group.add(ridge);

  const dispose = () => {
    geo.dispose();
    mat.dispose();
    rockGeo.dispose();
    rockMat.dispose();
    ridgeGeo.dispose();
    ridgeMat.dispose();
  };

  return { group, ground, dispose };
}

export default { buildDesertTerrain };
