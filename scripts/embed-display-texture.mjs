// Reproducible, dependency-free GLB color-only integration. Does not change
// mesh positions, triangles, normals, node transforms, scenario data or physics.
import fs from 'node:fs';
import path from 'node:path';

const modelPath = process.argv[2] || 'public/shahed136.glb';
const texturePath = process.argv[3] || 'public/textures/faded-paint-basecolor-256.jpg';
const input = fs.readFileSync(modelPath);
if (input.toString('ascii', 0, 4) !== 'glTF' || input.readUInt32LE(4) !== 2 || input.readUInt32LE(8) !== input.length) throw new Error('Expected valid binary glTF 2.0');
const jsonLength = input.readUInt32LE(12);
if (input.readUInt32LE(16) !== 0x4e4f534a) throw new Error('Missing glTF JSON chunk');
const document = JSON.parse(input.toString('utf8', 20, 20 + jsonLength));
const next = 20 + jsonLength;
if (input.readUInt32LE(next + 4) !== 0x004e4942) throw new Error('Missing glTF binary chunk');
const name = 'user-generated-faded-paint-basecolor';
if (document.images?.some((image) => image.name === name)) {
  console.log('Existing generated color texture already embedded; no change.');
  process.exit(0);
}
const image = fs.readFileSync(texturePath);
if (image[0] !== 0xff || image[1] !== 0xd8) throw new Error('Expected JPEG base-color input');
const binaryOriginal = input.subarray(next + 8, next + 8 + input.readUInt32LE(next));
const imageOffset = Math.ceil(binaryOriginal.length / 4) * 4;
const binary = Buffer.alloc(Math.ceil((imageOffset + image.length) / 4) * 4);
binaryOriginal.copy(binary); image.copy(binary, imageOffset);
const viewIndex = document.bufferViews.length;
document.bufferViews.push({ buffer: 0, byteOffset: imageOffset, byteLength: image.length });
const imageIndex = (document.images ||= []).length;
document.images.push({ name, bufferView: viewIndex, mimeType: 'image/jpeg', extras: { semantic: 'sRGB baseColor only', rights: 'user-supplied original generated input; not CC0 or a physical data map', sourceFile: path.basename(texturePath) } });
const samplerIndex = (document.samplers ||= []).length;
document.samplers.push({ magFilter: 9729, minFilter: 9987, wrapS: 33648, wrapT: 33648 });
const textureIndex = (document.textures ||= []).length;
document.textures.push({ sampler: samplerIndex, source: imageIndex, name });
const selected = ['matte-composite', 'painted-cover', 'wing-coating'];
for (const material of document.materials) {
  if (!selected.includes(material.name)) continue;
  material.pbrMetallicRoughness.baseColorTexture = { index: textureIndex, texCoord: 0 };
  // Preserve existing low-metalness and roughness factors; do not infer data
  // channels from the color image or call painted composite a metallic surface.
  material.pbrMetallicRoughness.baseColorFactor = [1, 1, 1, 1];
}
document.buffers[0].byteLength = binary.length;
const json = Buffer.from(JSON.stringify(document));
const padded = Buffer.alloc(Math.ceil(json.length / 4) * 4, 32); json.copy(padded);
const header = Buffer.alloc(12), jsonHeader = Buffer.alloc(8), binaryHeader = Buffer.alloc(8);
header.write('glTF'); header.writeUInt32LE(2, 4); header.writeUInt32LE(28 + padded.length + binary.length, 8);
jsonHeader.writeUInt32LE(padded.length); jsonHeader.writeUInt32LE(0x4e4f534a, 4);
binaryHeader.writeUInt32LE(binary.length); binaryHeader.writeUInt32LE(0x004e4942, 4);
fs.writeFileSync(modelPath, Buffer.concat([header, jsonHeader, padded, binaryHeader, binary]));
console.log(JSON.stringify({ model: modelPath, texture: texturePath, embeddedImageBytes: image.length, materials: selected, previousBytes: input.length, finalBytes: 28 + padded.length + binary.length, geometryChanged: false }));
