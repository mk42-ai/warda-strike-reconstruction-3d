// Original user-supplied/generated inputs, explicitly base-color only.
// No height/normal/roughness/metallic/AO information is inferred from these images.
import * as THREE from 'three';

export const SURFACE_INPUTS = Object.freeze({
  concrete: 'dusty-concrete-basecolor',
  paint: 'faded-paint-basecolor',
});

export function surfaceTextureUrl(kind, size = 512, base = '/') {
  if (!SURFACE_INPUTS[kind]) throw new Error(`Unknown display surface: ${kind}`);
  const resolution = size <= 256 ? 256 : 512;
  return `${base}textures/${SURFACE_INPUTS[kind]}-${resolution}.jpg`;
}

export function configureSurfaceTexture(texture, kind, anisotropy = 1) {
  texture.name = `${kind}-generated-basecolor`;
  texture.colorSpace = THREE.SRGBColorSpace;
  // Numerical edge tests found small but nonzero discontinuities. Mirrored repeat
  // avoids a hard texture edge without pretending the input was proven seamless.
  texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
  texture.repeat.set(kind === 'concrete' ? 3 : 2, kind === 'concrete' ? 3 : 2);
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.generateMipmaps = true;
  texture.anisotropy = Math.max(1, Math.min(8, anisotropy));
  texture.userData.ownedByDisplayTextureCache = true;
  texture.needsUpdate = true;
  return texture;
}

export function createSurfaceTextureCache(renderer, onWarning = () => {}) {
  const promises = new Map();
  const textures = new Set();
  let disposed = false;
  return {
    load(kind, budget) {
      const size = budget.textureSize <= 256 ? 256 : 512;
      const key = `${kind}-${size}`;
      if (!promises.has(key)) {
        const url = surfaceTextureUrl(kind, size, import.meta.env?.BASE_URL || '/');
        promises.set(key, new THREE.TextureLoader().loadAsync(url).then((texture) => {
          if (disposed) { texture.dispose(); return null; }
          configureSurfaceTexture(texture, kind, Math.min(budget.anisotropy, renderer.capabilities.getMaxAnisotropy()));
          textures.add(texture);
          return texture;
        }).catch((error) => { onWarning(`Base-color ${kind} unavailable; coherent constant PBR fallback retained`, error); return null; }));
      }
      return promises.get(key).then((texture) => {
        if (texture && !disposed) {
          texture.anisotropy = Math.max(1, Math.min(budget.anisotropy, renderer.capabilities.getMaxAnisotropy(), 8));
          texture.needsUpdate = true;
        }
        return disposed ? null : texture;
      });
    },
    get count() { return textures.size; },
    dispose() { disposed = true; textures.forEach((texture) => texture.dispose()); textures.clear(); promises.clear(); },
  };
}
