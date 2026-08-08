// ============================================================================
//  assetManifest.ts — typed wrapper around assetManifest.json
//
//  The JSON file is the single source of truth for WHAT gets loaded into the
//  Cesium scene and WHERE. This module adds compile-time types plus a small
//  runtime validator so a malformed/hand-edited manifest fails loudly at boot
//  instead of silently dropping a model.
//
//  PROVENANCE NOTICE — read before trusting any number in here.
//  Every asset currently referenced is PROXY GEOMETRY, generated procedurally
//  because the Blender MCP bridge was unreachable when this branch was built.
//  Dimensions are dimensionally plausible and correctly georeferenced so the
//  pipeline is fully wired and 1:1 swappable, but they are NOT survey data.
//  Confidence tiers are carried through to the UI and must not be stripped.
// ============================================================================
import raw from './assetManifest.json';

/** How much the stated dimensions/placement can be relied on. */
export type ConfidenceTier = 'verified' | 'assumption' | 'unknown';

export interface AssetDimensionsM {
  /** Bounding-box X extent in metres, measured from the exported binary. */
  length: number;
  /** Bounding-box Y extent in metres, measured from the exported binary. */
  width: number;
  /** Bounding-box Z extent in metres, measured from the exported binary. */
  height: number;
}

export interface AssetPosition {
  /** WGS84 longitude, degrees. */
  lon: number;
  /** WGS84 latitude, degrees. */
  lat: number;
  /** Metres above the ellipsoid/terrain. */
  height: number;
}

export interface AssetOrientationDeg {
  /** Rotation about local up, degrees clockwise from north. */
  heading: number;
  /** Nose up/down, degrees. */
  pitch: number;
  /** Bank, degrees. */
  roll: number;
}

export interface AssetProvenance {
  origin: string;
  generationMethod: string;
  generatedAtUtc: string;
  confidence: ConfidenceTier;
  isProxyGeometry: boolean;
  swapInstructions: string;
  note: string;
}

export interface AssetEntry {
  id: string;
  name: string;
  /** Path relative to the site root (Vite `public/`), e.g. `models/x.glb`. */
  file: string;
  bytes: number;
  sha256: string;
  dimensionsM: AssetDimensionsM;
  position: AssetPosition;
  orientationDeg: AssetOrientationDeg;
  scale: number;
  minimumPixelSize: number;
  provenance: AssetProvenance;
}

export interface AssetManifest {
  manifestVersion: string;
  generatedAtUtc: string;
  coordinateSystem: string;
  units: string;
  disclaimer: string;
  assets: AssetEntry[];
}

const VALID_TIERS: readonly ConfidenceTier[] = ['verified', 'assumption', 'unknown'];

/**
 * Runtime shape check. Returns the list of problems (empty === valid).
 * Deliberately non-throwing: a bad entry should degrade to "skip that model",
 * never to "the whole scene fails to boot".
 */
export function validateManifest(m: AssetManifest): string[] {
  const errors: string[] = [];
  if (!m || !Array.isArray(m.assets)) return ['manifest.assets is not an array'];

  const seen = new Set<string>();
  m.assets.forEach((a, i) => {
    const at = `assets[${i}]${a?.id ? ` (${a.id})` : ''}`;
    if (!a.id) errors.push(`${at}: missing id`);
    else if (seen.has(a.id)) errors.push(`${at}: duplicate id`);
    else seen.add(a.id);

    if (!a.file || !a.file.toLowerCase().endsWith('.glb')) {
      errors.push(`${at}: file must be a .glb path`);
    }
    const p = a.position;
    if (!p || !Number.isFinite(p.lon) || p.lon < -180 || p.lon > 180) {
      errors.push(`${at}: position.lon out of range`);
    }
    if (!p || !Number.isFinite(p.lat) || p.lat < -90 || p.lat > 90) {
      errors.push(`${at}: position.lat out of range`);
    }
    if (!Number.isFinite(a.scale) || a.scale <= 0) errors.push(`${at}: scale must be > 0`);

    // v2.1.0 refactor: integrity metadata must be well-formed when present, so
    // a hand-edited manifest fails loudly instead of passing a bad hash downstream.
    if (!Number.isInteger(a.bytes) || (a.bytes as number) < 0) {
      errors.push(`${at}: bytes must be a non-negative integer`);
    }
    if (typeof a.sha256 !== 'string' || !/^[0-9a-f]{64}$/i.test(a.sha256)) {
      errors.push(`${at}: sha256 must be 64 hex characters`);
    }

    const tier = a.provenance?.confidence;
    if (!tier || !VALID_TIERS.includes(tier)) {
      errors.push(`${at}: provenance.confidence must be one of ${VALID_TIERS.join(' | ')}`);
    }
  });
  return errors;
}

export const assetManifest = raw as unknown as AssetManifest;

/** All entries, in manifest order. */
export const assetEntries: AssetEntry[] = assetManifest.assets ?? [];

/** Look one asset up by its stable id. */
export function getAsset(id: string): AssetEntry | undefined {
  return assetEntries.find((a) => a.id === id);
}

/** Filter by how trustworthy the placement/dimensions are. */
export function assetsByConfidence(tier: ConfidenceTier): AssetEntry[] {
  return assetEntries.filter((a) => a.provenance?.confidence === tier);
}

/** Total on-disk payload of every referenced GLB, in MB (bundle budgeting). */
export function totalPayloadMB(): number {
  const bytes = assetEntries.reduce((sum, a) => sum + (a.bytes || 0), 0);
  return Math.round((bytes / 1048576) * 1000) / 1000;
}

/** True when ANY referenced asset is still proxy geometry (drives the UI badge). */
export function hasProxyGeometry(): boolean {
  return assetEntries.some((a) => a.provenance?.isProxyGeometry === true);
}

export default assetManifest;
