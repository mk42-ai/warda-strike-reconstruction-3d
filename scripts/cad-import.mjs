#!/usr/bin/env node
// ============================================================================
//  cad-import.mjs — OPTIONAL CAD/asset import pipeline for the Blender GLB
//  workflow (added in v2.1.0, CAD/asset-integration workstream).
//
//  What it does
//  ------------
//  Scans ./cad-inbox/ for CAD source files and brings them into the GLB asset
//  pipeline:
//
//    .step/.stp/.iges/.igs  -> tessellated to GLB via an external tool
//                              (Mayo-style converter, FreeCAD, or assimp)
//    .obj                   -> converted to GLB via assimp (or recorded as
//                              PENDING when no converter is installed)
//    .glb                   -> validated in place (no conversion needed)
//
//  Every produced/validated GLB is fingerprinted (SHA-256 + byte size + glTF
//  bounding box read from accessor min/max) and recorded in
//  public/models/imported/import-report.json — the same integrity metadata the
//  assetManifest carries, so imported assets can be merged 1:1.
//
//  DEFENSIVE BY CONTRACT
//  ---------------------
//  This script is a dev-time convenience ONLY. It is NOT wired into
//  `npm run build`. If no CAD tooling is installed, if the inbox is missing,
//  or if a single conversion fails, it logs and exits 0 (use --strict to
//  change that). The production build MUST succeed on a machine with zero CAD
//  tooling — visualisation assets degrade gracefully, never fatally.
//
//  Usage
//  -----
//    node scripts/cad-import.mjs                 # scan + convert + report
//    node scripts/cad-import.mjs --strict        # exit 1 if anything failed
//    node scripts/cad-import.mjs --merge \
//         --at <lon,lat[,height]>               # also append manifest entries
//
//  Tool overrides (env): CAD_TOOL, MAYO_BIN, FREECAD_CMD, ASSIMP_BIN
// ============================================================================

import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import {
  existsSync, mkdirSync, readFileSync, readdirSync, copyFileSync, writeFileSync,
} from 'node:fs';
import { basename, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const INBOX = join(root, 'cad-inbox');
const OUT_DIR = join(root, 'public', 'models', 'imported');
const REPORT_PATH = join(OUT_DIR, 'import-report.json');
const MANIFEST_PATH = join(root, 'src', 'assets', 'assetManifest.json');

const args = process.argv.slice(2);
const STRICT = args.includes('--strict');
const MERGE = args.includes('--merge');
const atIdx = args.indexOf('--at');
const AT = atIdx !== -1 ? String(args[atIdx + 1] || '') : null;

const CAD_EXTS = ['.step', '.stp', '.iges', '.igs'];
const MESH_EXTS = ['.obj'];
const GLB_EXTS = ['.glb'];

const report = {
  generatedAtUtc: new Date().toISOString(),
  tool: null,
  inbox: 'cad-inbox/',
  outDir: 'public/models/imported/',
  results: [],
  notes: [],
};

function sha256(buf) { return createHash('sha256').update(buf).digest('hex'); }

function which(bin) {
  try {
    execFileSync(process.platform === 'win32' ? 'where' : 'which', [bin], { stdio: ['ignore', 'pipe', 'ignore'] });
    return true;
  } catch { return false; }
}

/** Detect the first available STEP/IGES tessellation tool (Mayo-style first). */
function detectTool() {
  if (process.env.CAD_TOOL) return { kind: 'custom', bin: process.env.CAD_TOOL };
  const mayo = process.env.MAYO_BIN || 'mayo';
  if (which(mayo)) return { kind: 'mayo', bin: mayo };
  const fc = process.env.FREECAD_CMD || 'FreeCADCmd';
  if (which(fc)) return { kind: 'freecad', bin: fc };
  const assimp = process.env.ASSIMP_BIN || 'assimp';
  if (which(assimp)) return { kind: 'assimp', bin: assimp };
  return null;
}

/** Build the per-tool conversion command. Returns argv array. */
function convertCmd(tool, src, dst) {
  switch (tool.kind) {
    case 'mayo':
      // Mayo CLI: `mayo <input> --output <out.glb>` (glTF export plugin ships by default)
      return [tool.bin, [src, '--output', dst]];
    case 'assimp':
      // assimp CLI: `assimp export <in> <out.glb>`
      return [tool.bin, ['export', src, dst]];
    case 'freecad':
      // FreeCAD headless macro: import STEP/IGES, tessellate, export glTF.
      // Kept as a one-liner so no temp .py file is needed.
      return [tool.bin, ['-c',
        'import FreeCAD,Import,Mesh;'
        + `Import.open(${JSON.stringify(src)});`
        + 'doc=FreeCAD.ActiveDocument;'
        + `Mesh.export(doc.Objects,${JSON.stringify(dst)})`,
      ]];
    default:
      // Custom tool contract: `<bin> <input> <output.glb>`
      return [tool.bin, [src, dst]];
  }
}

/** Parse a GLB: magic/version/length + JSON chunk (generator, meshes, bbox). */
function inspectGlb(path) {
  const buf = readFileSync(path);
  if (buf.length < 20 || buf.toString('ascii', 0, 4) !== 'glTF') {
    throw new Error('not a GLB (bad magic)');
  }
  const version = buf.readUInt32LE(4);
  const declared = buf.readUInt32LE(8);
  if (declared !== buf.length) throw new Error(`GLB length mismatch (header ${declared} vs file ${buf.length})`);
  const chunkLen = buf.readUInt32LE(12);
  const chunkType = buf.toString('ascii', 16, 20);
  if (chunkType !== 'JSON') throw new Error('first GLB chunk is not JSON');
  const json = JSON.parse(buf.toString('utf8', 20, 20 + chunkLen));

  // Aggregate scene bbox from POSITION accessor min/max (no BIN read needed).
  let bbox = null;
  const mins = [Infinity, Infinity, Infinity];
  const maxs = [-Infinity, -Infinity, -Infinity];
  let found = 0;
  for (const mesh of json.meshes || []) {
    for (const prim of mesh.primitives || []) {
      const accIdx = prim.attributes?.POSITION;
      const acc = Number.isInteger(accIdx) ? json.accessors?.[accIdx] : null;
      if (acc?.min && acc?.max) {
        found++;
        for (let i = 0; i < 3; i++) {
          mins[i] = Math.min(mins[i], acc.min[i]);
          maxs[i] = Math.max(maxs[i], acc.max[i]);
        }
      }
    }
  }
  if (found) {
    bbox = {
      min: mins.map((v) => Math.round(v * 1000) / 1000),
      max: maxs.map((v) => Math.round(v * 1000) / 1000),
      dimensionsM: maxs.map((v, i) => Math.round((v - mins[i]) * 1000) / 1000),
    };
  }
  return {
    gltfVersion: version,
    generator: json.asset?.generator || 'unknown',
    meshes: (json.meshes || []).length,
    bbox,
    bytes: buf.length,
    sha256: sha256(buf),
  };
}

function record(file, status, extra = {}) {
  report.results.push({ file, status, ...extra });
  const line = `[cad-import] ${status.padEnd(9)} ${file}${extra.reason ? ` — ${extra.reason}` : ''}`;
  console.log(line);
}

function main() {
  console.log(`[cad-import] ${new Date().toISOString()} — scanning ${INBOX}`);

  if (!existsSync(INBOX)) {
    record('cad-inbox/', 'SKIPPED', { reason: 'inbox directory not present — nothing to import (this is fine)' });
    writeReport();
    return finish(0);
  }

  const files = readdirSync(INBOX).filter((f) => {
    const e = extname(f).toLowerCase();
    return [...CAD_EXTS, ...MESH_EXTS, ...GLB_EXTS].includes(e);
  });
  if (!files.length) {
    record('cad-inbox/', 'SKIPPED', { reason: 'no CAD/mesh files (.step/.stp/.iges/.igs/.obj/.glb) found' });
    writeReport();
    return finish(0);
  }

  mkdirSync(OUT_DIR, { recursive: true });

  const tool = detectTool();
  report.tool = tool ? `${tool.kind} (${tool.bin})` : null;
  if (!tool) {
    report.notes.push('No CAD conversion tool found (checked CAD_TOOL, mayo, FreeCADCmd, assimp). '
      + 'STEP/IGES/OBJ inputs are recorded as PENDING; install a tool and re-run. Build is unaffected.');
    console.warn('[cad-import] no conversion tool available — conversions will be marked PENDING');
  }

  let failures = 0;
  for (const f of files) {
    const src = join(INBOX, f);
    const ext = extname(f).toLowerCase();
    const name = basename(f, ext).replace(/[^a-z0-9-_]+/gi, '-').toLowerCase();
    const dst = join(OUT_DIR, `${name}.glb`);

    try {
      if (GLB_EXTS.includes(ext)) {
        copyFileSync(src, dst);
        const info = inspectGlb(dst);
        record(f, 'IMPORTED', { glb: `public/models/imported/${name}.glb`, ...info });
      } else if (!tool) {
        record(f, 'PENDING', { reason: 'no converter installed (mayo/FreeCAD/assimp)' });
      } else if (MESH_EXTS.includes(ext) && tool.kind !== 'assimp') {
        record(f, 'PENDING', { reason: `OBJ import needs assimp; detected tool is ${tool.kind}` });
      } else {
        const [bin, argv] = convertCmd(tool, src, dst);
        execFileSync(bin, argv, { stdio: ['ignore', 'pipe', 'pipe'] });
        const info = inspectGlb(dst);
        record(f, 'CONVERTED', { glb: `public/models/imported/${name}.glb`, via: tool.kind, ...info });
      }
    } catch (err) {
      failures++;
      record(f, 'FAILED', { reason: String(err?.message || err).slice(0, 300) });
    }
  }

  writeReport();

  if (MERGE) {
    try {
      mergeIntoManifest();
    } catch (err) {
      console.error(`[cad-import] --merge aborted: ${err?.message || err}`);
      return finish(1, true);
    }
  } else if (report.results.some((r) => r.status === 'IMPORTED' || r.status === 'CONVERTED')) {
    console.log('[cad-import] tip: re-run with --merge --at <lon,lat[,height]> to append these assets to src/assets/assetManifest.json');
  }

  const failed = report.results.filter((r) => r.status === 'FAILED').length;
  const pending = report.results.filter((r) => r.status === 'PENDING').length;
  console.log(`[cad-import] done: ${report.results.length - failed - pending} ok, ${pending} pending, ${failed} failed`);
  return finish(STRICT ? (failed || pending ? 1 : 0) : 0);
}

function writeReport() {
  try {
    mkdirSync(OUT_DIR, { recursive: true });
    writeFileSync(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`);
    console.log(`[cad-import] report -> ${REPORT_PATH}`);
  } catch (err) {
    console.warn('[cad-import] could not write report (non-fatal):', err?.message || err);
  }
}

/**
 * Append imported GLBs to the asset manifest. REQUIRES explicit georeferencing
 * via --at: we never invent coordinates for a defence-visualisation scene.
 */
function mergeIntoManifest() {
  if (!AT) throw new Error('--merge requires --at <lon,lat[,height]> (never fabricate georeferencing)');
  const parts = AT.split(',').map(Number);
  if (parts.length < 2 || parts.some((n) => !Number.isFinite(n))) {
    throw new Error(`invalid --at value "${AT}" — expected <lon,lat[,height]>`);
  }
  const [lon, lat, height = 0] = parts;
  if (lon < -180 || lon > 180 || lat < -90 || lat > 90) throw new Error('--at lon/lat out of range');

  const imported = report.results.filter((r) => ['IMPORTED', 'CONVERTED'].includes(r.status));
  if (!imported.length) throw new Error('no imported/converted GLBs to merge');

  const manifest = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'));
  const existing = new Set(manifest.assets.map((a) => a.id));
  const stamp = new Date().toISOString();
  let added = 0;
  for (const r of imported) {
    const id = `imported-${basename(r.glb, '.glb')}`;
    if (existing.has(id)) { console.log(`[cad-import] merge: ${id} already present, skipping`); continue; }
    manifest.assets.push({
      id,
      name: `CAD import: ${basename(r.glb, '.glb')}`,
      file: r.glb.replace(/^public\//, ''),
      bytes: r.bytes,
      sha256: r.sha256,
      dimensionsM: r.bbox
        ? { length: r.bbox.dimensionsM[0], width: r.bbox.dimensionsM[1], height: r.bbox.dimensionsM[2] }
        : { length: 0, width: 0, height: 0 },
      position: { lon, lat, height },
      orientationDeg: { heading: 0, pitch: 0, roll: 0 },
      scale: 1.0,
      minimumPixelSize: 0,
      provenance: {
        origin: `cad-import.mjs (${r.via || 'direct GLB'})`,
        generationMethod: `${r.via || 'copy'} -> glTF 2.0 binary (GLB); generator: ${r.generator}`,
        generatedAtUtc: stamp,
        confidence: 'unknown',
        isProxyGeometry: false,
        swapInstructions: 'Re-run scripts/cad-import.mjs with a refined CAD source, then update sha256/bytes/dimensionsM.',
        note: 'Imported via the optional CAD pipeline; placement supplied manually at import time.',
      },
    });
    added++;
  }
  manifest.generatedAtUtc = stamp;
  writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`[cad-import] merge: appended ${added} asset(s) to ${MANIFEST_PATH}`);
}

function finish(code) {
  process.exitCode = code;
}

main();
