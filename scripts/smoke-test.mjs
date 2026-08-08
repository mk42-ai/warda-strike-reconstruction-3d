#!/usr/bin/env node
// ============================================================================
//  smoke-test.mjs — zero-dependency release smoke test (added in v2.1.0).
//
//  The repo has no unit-test framework; this script is the `npm test` gate.
//  It asserts the things a broken refactor would most plausibly regress:
//
//    1. package.json version is present and semver-shaped
//    2. dist/build-info.json exists (post-build) and its version matches
//    3. dist/ contains index.html + a hashed JS bundle + a CSS bundle
//    4. the JS bundle carries the injected __APP_VERSION__ define
//    5. assetManifest.json validates (shape, ranges, tiers, unique ids)
//       AND every referenced GLB exists, matches bytes + SHA-256, has glTF magic
//    6. docs/cad/warda-site-plan.dxf exists and looks like a DXF (SECTION/EOF)
//
//  Exit 0 = all checks pass; exit 1 = at least one failure. Run AFTER
//  `npm run build` (checks 2–4 need dist/).
// ============================================================================

import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));

let pass = 0;
let fail = 0;
const failures = [];

function check(name, ok, detail = '') {
  if (ok) { pass++; console.log(`  PASS  ${name}`); }
  else { fail++; failures.push(name); console.log(`  FAIL  ${name}${detail ? ` — ${detail}` : ''}`); }
}

console.log(`smoke-test: ${pkg.name} v${pkg.version}\n`);

// 1 — version shape ----------------------------------------------------------------
check('package.json version is semver-shaped', /^\d+\.\d+\.\d+$/.test(pkg.version || ''), pkg.version);

// 2 — build-info.json --------------------------------------------------------------
const buildInfoPath = join(root, 'dist', 'build-info.json');
let buildInfo = null;
try { buildInfo = JSON.parse(readFileSync(buildInfoPath, 'utf8')); } catch { /* missing/invalid */ }
check('dist/build-info.json exists and parses', !!buildInfo, 'run npm run build first');
check('build-info version matches package.json', buildInfo?.version === pkg.version,
  buildInfo ? `dist=${buildInfo.version} vs pkg=${pkg.version}` : 'no build-info');

// 3 — dist artifacts ---------------------------------------------------------------
const distAssets = existsSync(join(root, 'dist', 'assets'))
  ? readdirSync(join(root, 'dist', 'assets')) : [];
const jsBundles = distAssets.filter((f) => /^index-.*\.js$/.test(f));
const cssBundles = distAssets.filter((f) => /^index-.*\.css$/.test(f));
check('dist/index.html exists', existsSync(join(root, 'dist', 'index.html')));
check('dist/assets has a hashed JS bundle', jsBundles.length >= 1, jsBundles.join(',') || 'none');
check('dist/assets has a CSS bundle', cssBundles.length >= 1, cssBundles.join(',') || 'none');

// 4 — version define made it into the bundle ---------------------------------------
let bundleHasVersion = false;
for (const f of jsBundles) {
  if (readFileSync(join(root, 'dist', 'assets', f), 'utf8').includes(pkg.version)) {
    bundleHasVersion = true; break;
  }
}
check('JS bundle contains the injected app version (define __APP_VERSION__)', bundleHasVersion);

// 5 — asset manifest integrity -------------------------------------------------------
const manifest = JSON.parse(readFileSync(join(root, 'src', 'assets', 'assetManifest.json'), 'utf8'));
const VALID_TIERS = ['verified', 'assumption', 'unknown'];
const seen = new Set();
let manifestProblems = [];
if (!Array.isArray(manifest.assets)) {
  manifestProblems.push('assets is not an array');
} else {
  manifest.assets.forEach((a, i) => {
    const at = `assets[${i}]${a?.id ? ` (${a.id})` : ''}`;
    if (!a.id) manifestProblems.push(`${at}: missing id`);
    else if (seen.has(a.id)) manifestProblems.push(`${at}: duplicate id`);
    else seen.add(a.id);
    if (!a.file?.toLowerCase().endsWith('.glb')) manifestProblems.push(`${at}: file must end .glb`);
    if (!Number.isFinite(a.position?.lon) || a.position.lon < -180 || a.position.lon > 180) manifestProblems.push(`${at}: lon out of range`);
    if (!Number.isFinite(a.position?.lat) || a.position.lat < -90 || a.position.lat > 90) manifestProblems.push(`${at}: lat out of range`);
    if (!Number.isFinite(a.scale) || a.scale <= 0) manifestProblems.push(`${at}: scale must be > 0`);
    if (!Number.isInteger(a.bytes) || a.bytes < 0) manifestProblems.push(`${at}: bytes must be a non-negative integer`);
    if (typeof a.sha256 !== 'string' || !/^[0-9a-f]{64}$/i.test(a.sha256)) manifestProblems.push(`${at}: sha256 must be 64 hex`);
    if (!VALID_TIERS.includes(a.provenance?.confidence)) manifestProblems.push(`${at}: bad confidence tier`);
  });
}
check('assetManifest.json validates (mirrors src/assets/assetManifest.ts)', manifestProblems.length === 0,
  manifestProblems.slice(0, 3).join(' | '));

let glbProblems = [];
for (const a of manifest.assets || []) {
  const p = join(root, 'public', a.file);
  if (!existsSync(p)) { glbProblems.push(`${a.id}: missing public/${a.file}`); continue; }
  const buf = readFileSync(p);
  if (buf.toString('ascii', 0, 4) !== 'glTF') glbProblems.push(`${a.id}: bad GLB magic`);
  if (buf.length !== a.bytes) glbProblems.push(`${a.id}: size ${buf.length} != manifest ${a.bytes}`);
  const hash = createHash('sha256').update(buf).digest('hex');
  if (hash !== a.sha256) glbProblems.push(`${a.id}: sha256 mismatch`);
}
check('every manifest GLB exists with matching size + sha256 + magic', glbProblems.length === 0,
  glbProblems.slice(0, 3).join(' | '));

// 6 — CAD site plan sanity -----------------------------------------------------------
const dxfPath = join(root, 'docs', 'cad', 'warda-site-plan.dxf');
let dxfOk = false;
if (existsSync(dxfPath)) {
  const head = readFileSync(dxfPath, 'utf8');
  dxfOk = head.includes('SECTION') && head.includes('EOF');
}
check('docs/cad/warda-site-plan.dxf exists and looks like DXF (SECTION..EOF)', dxfOk);

console.log(`\nsmoke-test: ${pass} passed, ${fail} failed`);
if (fail) {
  console.log(`failing checks: ${failures.join(' | ')}`);
  process.exit(1);
}
