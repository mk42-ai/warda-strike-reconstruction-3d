// ============================================================================
//  loadAssetsFromManifest.ts — declarative GLB loader for the Cesium theatre.
//
//  Reads src/assets/assetManifest.json (via the typed wrapper) and instantiates
//  each GLB as a Cesium.Model with a georeferenced model matrix:
//
//      Cartesian3.fromDegrees(lon, lat, height)
//        -> Transforms.headingPitchRollToFixedFrame(origin, hpr)
//        -> Matrix4.multiplyByUniformScale(matrix, scale)
//
//  Wired into the EXISTING CesiumScene bootstrap (see CesiumScene._initViewer);
//  this is a helper module, not a second entry point.
//
//  PROVENANCE: every asset currently in the manifest is PROXY geometry (the
//  Blender MCP bridge was unreachable when this branch was built). The loader
//  carries the confidence tier onto each primitive's `id` so picking/telemetry
//  can surface it, and never presents proxy geometry as measured fact.
// ============================================================================
import * as CesiumNS from 'cesium';
import {
  assetEntries, validateManifest, assetManifest, totalPayloadMB,
  type AssetEntry,
} from '../assets/assetManifest';
import { createSharedImageBasedLighting } from './applyLighting';
import { MODEL_LIGHT_COLOR, SHADOWS_ENABLED } from '../config/lightingConfig';

const C: any = CesiumNS;

// --- v2.1.0 refactor: build stamp + hardened loading -------------------------
// __APP_VERSION__ / __GIT_COMMIT__ are injected by vite.config.js `define`
// (see the build-script refactor); the typeof guards keep this module safe in
// dev/test contexts where the define is absent.
declare const __APP_VERSION__: string | undefined;
declare const __GIT_COMMIT__: string | undefined;

/** Human-readable build stamp for logs/telemetry (never throws). */
export function buildStamp(): string {
  const v = typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : 'dev';
  const c = typeof __GIT_COMMIT__ !== 'undefined' ? __GIT_COMMIT__ : 'unknown';
  return `v${v} @ ${c}`;
}

/** Bucket a load failure so operators can triage network vs decode at a glance. */
function classifyError(err: any): string {
  const msg = String(err?.message || err || 'unknown error');
  if (/fetch|network|404|status of|failed to load/i.test(msg)) return `network: ${msg}`;
  if (/parse|decode|glb|gltf|draco|buffer|json/i.test(msg)) return `decode: ${msg}`;
  return msg;
}

/**
 * One retry with a short backoff for transient network hiccups. Deliberately
 * conservative (single retry, 400 ms): a deterministically missing/corrupt GLB
 * must fail fast into `failed`, never stall the theatre boot.
 */
async function withRetry<T>(fn: () => Promise<T>, backoffMs = 400): Promise<T> {
  try {
    return await fn();
  } catch {
    await new Promise((resolve) => setTimeout(resolve, backoffMs));
    return fn();
  }
}

export interface LoadedAsset {
  id: string;
  entry: AssetEntry;
  model: any;
}

export interface LoadAssetsResult {
  loaded: LoadedAsset[];
  failed: Array<{ id: string; reason: string }>;
  totalPayloadMB: number;
  usedProxyGeometry: boolean;
}

/** Resolve a manifest-relative path against Vite's BASE_URL. */
function resolveUrl(file: string): string {
  const base = (import.meta as any)?.env?.BASE_URL || '/';
  const clean = String(file).replace(/^\/+/, '');
  return `${base}${clean}`;
}

/**
 * Build the ECEF model matrix for one manifest entry.
 * Exported so it can be unit-tested / reused when hot-swapping an asset.
 */
export function buildModelMatrix(entry: AssetEntry): any {
  const { lon, lat, height } = entry.position;
  const { heading, pitch, roll } = entry.orientationDeg;
  const origin = C.Cartesian3.fromDegrees(lon, lat, height ?? 0);
  const hpr = new C.HeadingPitchRoll(
    C.Math.toRadians(heading || 0),
    C.Math.toRadians(pitch || 0),
    C.Math.toRadians(roll || 0),
  );
  const matrix = C.Transforms.headingPitchRollToFixedFrame(origin, hpr);
  const scale = Number.isFinite(entry.scale) && entry.scale > 0 ? entry.scale : 1.0;
  if (scale !== 1.0) {
    // Applying scale on the matrix (rather than Model.scale) keeps the
    // real-world metres in the manifest authoritative.
    C.Matrix4.multiplyByUniformScale(matrix, scale, matrix);
  }
  return matrix;
}

/**
 * Instantiate every manifest asset into `scene.primitives`.
 *
 * Resilient by design: a single bad entry is recorded in `failed` and the rest
 * still load — a missing GLB must never blank the theatre.
 */
export async function loadAssetsFromManifest(
  scene: any,
  options: { verbose?: boolean; extraAssets?: AssetEntry[] } = {},
): Promise<LoadAssetsResult> {
  const result: LoadAssetsResult = {
    loaded: [], failed: [], totalPayloadMB: totalPayloadMB(),
    usedProxyGeometry: false,
  };
  if (!scene) {
    result.failed.push({ id: '*', reason: 'no scene' });
    return result;
  }

  // v2.1.0 CAD/asset integration hook: callers may inject additional entries
  // (e.g. CAD-imported GLBs from scripts/cad-import.mjs) without editing the
  // manifest JSON. They are validated with the same rules before load.
  const extras = Array.isArray(options.extraAssets) ? options.extraAssets : [];
  const entries = [...assetEntries, ...extras];
  const problems = validateManifest({ ...assetManifest, assets: entries });
  if (problems.length && options.verbose !== false) {
    // eslint-disable-next-line no-console
    console.warn('[assetManifest] validation problems:', problems);
  }

  const ibl = createSharedImageBasedLighting();
  const lightColor = new C.Cartesian3(
    MODEL_LIGHT_COLOR[0], MODEL_LIGHT_COLOR[1], MODEL_LIGHT_COLOR[2],
  );

  for (const entry of entries) {
    // skip entries the validator rejected outright
    if (problems.some((p) => p.includes(`(${entry.id})`))) {
      result.failed.push({ id: entry.id, reason: 'failed manifest validation' });
      continue;
    }
    try {
      const model = await withRetry(() => C.Model.fromGltfAsync({
        url: resolveUrl(entry.file),
        modelMatrix: buildModelMatrix(entry),
        // scale already folded into the matrix above
        minimumPixelSize: entry.minimumPixelSize || 0,
        // carry provenance onto the primitive so a pick can report the tier
        id: {
          kind: 'manifest-asset',
          assetId: entry.id,
          name: entry.name,
          confidence: entry.provenance?.confidence,
          isProxyGeometry: entry.provenance?.isProxyGeometry === true,
          dimensionsM: entry.dimensionsM,
        },
        shadows: SHADOWS_ENABLED ? C.ShadowMode.ENABLED : C.ShadowMode.DISABLED,
        // lightColor overrides czm_lightColorHdr -> brightens the GLB without
        // touching globe shading (globe uses the renormalised czm_lightColor)
        lightColor,
        imageBasedLighting: ibl,
        incrementallyLoadTextures: true,
      }));

      scene.primitives.add(model);
      result.loaded.push({ id: entry.id, entry, model });
      if (entry.provenance?.isProxyGeometry) result.usedProxyGeometry = true;
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.warn(`[assetManifest] failed to load "${entry.id}":`, err?.message || err);
      result.failed.push({ id: entry.id, reason: classifyError(err) });
    }
  }

  if (options.verbose !== false) {
    // eslint-disable-next-line no-console
    console.info(
      `[assetManifest] ${buildStamp()} — loaded ${result.loaded.length}/${entries.length} assets ` +
      `(${result.totalPayloadMB} MB)` +
      (result.usedProxyGeometry ? ' — CONTAINS PROXY GEOMETRY, not confirmed intelligence' : ''),
    );
  }
  return result;
}

/** Show/hide every manifest-loaded model (drives the "assets" layer toggle). */
export function setManifestAssetsVisible(loaded: LoadedAsset[], visible: boolean): void {
  loaded.forEach(({ model }) => {
    try { model.show = visible; } catch (_) { /* model already destroyed */ }
  });
}

/** Remove and destroy every loaded model (called from CesiumScene.destroy). */
export function unloadManifestAssets(scene: any, loaded: LoadedAsset[]): void {
  loaded.forEach(({ model }) => {
    try { scene?.primitives?.remove(model); } catch (_) { /* already removed */ }
  });
}

export default loadAssetsFromManifest;
