// Narrow offline validation of this application's actual display assets.
// This is not a substitute for Khronos certification or GPU/browser rendering.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';

export function validateDisplayAssets(root = process.cwd()) {
  const file = path.join(root, 'public/shahed136.glb');
  const bytes = fs.readFileSync(file);
  assert.equal(bytes.toString('ascii', 0, 4), 'glTF');
  assert.equal(bytes.readUInt32LE(4), 2);
  assert.equal(bytes.readUInt32LE(8), bytes.length);
  const jsonLength = bytes.readUInt32LE(12);
  assert.equal(bytes.readUInt32LE(16), 0x4e4f534a);
  const document = JSON.parse(bytes.toString('utf8', 20, 20 + jsonLength));
  const offset = 20 + jsonLength;
  assert.equal(bytes.readUInt32LE(offset + 4), 0x004e4942);
  const buffer = bytes.subarray(offset + 8, offset + 8 + bytes.readUInt32LE(offset));
  const components = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4 };
  const types = { 5121: [1, 'readUInt8'], 5123: [2, 'readUInt16LE'], 5125: [4, 'readUInt32LE'], 5126: [4, 'readFloatLE'] };
  const read = (index) => {
    const a = document.accessors[index], view = document.bufferViews[a.bufferView];
    const [width, method] = types[a.componentType], count = components[a.type];
    const start = (view.byteOffset || 0) + (a.byteOffset || 0), stride = view.byteStride || width * count;
    const end = start + (a.count - 1) * stride + width * count;
    assert.ok(end <= buffer.length && end <= (view.byteOffset || 0) + view.byteLength, `accessor ${index} bounds`);
    return Array.from({ length: a.count }, (_, i) => Array.from({ length: count }, (_, k) => buffer[method](start + i * stride + k * width)));
  };
  const meshes = [];
  for (let i = 0; i < document.meshes.length; i++) {
    for (const primitive of document.meshes[i].primitives) {
      assert.equal(primitive.mode ?? 4, 4);
      const position = read(primitive.attributes.POSITION);
      const normal = read(primitive.attributes.NORMAL);
      const uv = read(primitive.attributes.TEXCOORD_0);
      assert.equal(position.length, normal.length); assert.equal(position.length, uv.length);
      assert.ok([...position, ...normal, ...uv].flat().every(Number.isFinite));
      assert.ok(normal.every((n) => Math.abs(Math.hypot(...n) - 1) < 1e-4));
      const indices = primitive.indices == null ? position.map((_, k) => k) : read(primitive.indices).flat();
      assert.equal(indices.length % 3, 0);
      assert.ok(indices.every((n) => n >= 0 && n < position.length));
      assert.ok(document.materials[primitive.material]);
      meshes.push({ index: i, name: document.meshes[i].name, vertices: position.length, triangles: indices.length / 3, material: primitive.material, normals: true, uv: true });
    }
  }
  const image = document.images.find((entry) => entry.name === 'user-generated-faded-paint-basecolor');
  assert.equal(image.mimeType, 'image/jpeg');
  const view = document.bufferViews[image.bufferView];
  const embedded = buffer.subarray(view.byteOffset, view.byteOffset + view.byteLength);
  const source = fs.readFileSync(path.join(root, 'public/textures/faded-paint-basecolor-256.jpg'));
  assert.ok(embedded.equals(source), 'embedded image matches licensed generated variant');
  for (const material of document.materials) {
    const pbr = material.pbrMetallicRoughness;
    assert.ok(pbr.metallicFactor >= 0 && pbr.metallicFactor <= 1);
    assert.ok(pbr.roughnessFactor >= 0 && pbr.roughnessFactor <= 1);
    if (pbr.baseColorTexture) {
      const texture = document.textures[pbr.baseColorTexture.index];
      assert.ok(document.images[texture.source]);
    }
  }
  assert.equal(document.nodes.length, 15);
  assert.equal(meshes.length, 14);
  assert.equal(meshes.reduce((sum, mesh) => sum + mesh.triangles, 0), 848);
  assert.deepEqual(document.extensionsRequired || [], []);
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'public/licenses/realism-assets.json')));
  const variants = manifest.generated_inputs.flatMap((input) => input.files_produced);
  for (const variant of variants) {
    const data = fs.readFileSync(path.join(root, variant.file));
    assert.equal(crypto.createHash('sha256').update(data).digest('hex'), variant.sha256);
    assert.equal(variant.semantic, 'baseColor / color detail only');
    assert.ok(variant.not_derived.includes('normal') && variant.not_derived.includes('roughness'));
    assert.ok(variant.width <= 512 && variant.height <= 512);
  }
  return { validatedUtc: new Date().toISOString(), model: 'public/shahed136.glb', bytes: bytes.length, meshCount: meshes.length, triangles: 848, nodes: 15, meshes, embeddedColorImageBytes: embedded.length, generatedVariants: variants.length, generatedTextureBytes: variants.reduce((sum, entry) => sum + entry.bytes, 0), compression: 'none (JPEG image coding only; no Draco/Meshopt/KTX2/Basis path claimed)', gpuVerified: false };
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname)) {
  console.log(JSON.stringify(validateDisplayAssets(), null, 2));
}
