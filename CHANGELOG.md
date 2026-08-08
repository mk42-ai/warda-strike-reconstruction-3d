# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses
[Semantic Versioning](https://semver.org/).

## [2.1.0] — 2026-08-08

Finalized "improved Blender build" release, delivered as three coordinated
workstreams on top of the v2.0.0 graphics upgrade (Blender GLB asset pipeline,
Cesium HDR lighting, CAD site layer).

### Added — build-script / code refactor

- **Versioning support**: `vite.config.js` now reads the version from
  `package.json` and injects `__APP_VERSION__`, `__BUILD_TIME__` and
  `__GIT_COMMIT__` via `define`; every production build emits
  `dist/build-info.json` (`name`, `version`, `buildTimeUtc`, `gitCommit`,
  `bundler`). Archive builds without `.git` degrade to `unknown` instead of
  failing.
- **Hardened asset loader** (`src/scene/loadAssetsFromManifest.ts`): single
  retry with 400 ms backoff around `Cesium.Model.fromGltfAsync` for transient
  network errors; load failures are classified (`network:` / `decode:`) for
  faster triage; `buildStamp()` stamps the app version into boot logs.
- **Stronger manifest validator** (`src/assets/assetManifest.ts`): `bytes`
  must be a non-negative integer and `sha256` must be 64 hex characters, so a
  hand-edited manifest fails loudly at boot.
- `npm test` now runs `scripts/smoke-test.mjs`, a zero-dependency release gate
  (build-info consistency, bundle/version-define presence, manifest + GLB
  integrity incl. SHA-256, DXF sanity). Exits non-zero on failure.

### Added — CAD / asset integration

- **Optional CAD import pipeline** (`scripts/cad-import.mjs`, wired to
  `npm run cad:import`): scans `cad-inbox/` for `.step/.stp/.iges/.igs`
  (tessellated via Mayo-style converter, FreeCAD, or assimp), `.obj` (assimp)
  and `.glb` (validated in place). Outputs land in
  `public/models/imported/` with SHA-256/bytes/glTF-bbox fingerprints in
  `import-report.json`. Fully guarded: with no CAD tooling present it logs and
  exits 0 — the build never depends on it.
- `--merge --at <lon,lat[,height]>` mode appends validated imports to
  `src/assets/assetManifest.json`; georeferencing is always explicit, never
  fabricated.
- **Runtime injection hook**: `loadAssetsFromManifest(scene, { extraAssets })`
  accepts additional validated entries without editing the manifest JSON.

### Changed — docs

- README updated in place: v2.1.0 banner, extended quick-start
  (test + CAD import commands), refreshed Structure tree (previously missing
  `assets/`, `scene/`, `config/`, `docs/cad/`, `scripts/`), and new
  "Versioning & build metadata", "CAD / asset import pipeline" and "Testing"
  sections.
- This CHANGELOG added.

### Compatibility

No breaking changes. All v2.0.0 behavior (scene bootstrap, camera modes,
thermal/geofence layers, asset placement) is preserved; every new capability
is additive and degrades gracefully when its optional dependency is absent.

## [2.0.0] — 2026-08-08

Graphics upgrade: Blender GLB asset pipeline (declarative manifest + loader,
currently proxy geometry pending real Blender exports), Cesium HDR lighting
(ACES, bloom, SSAO), CAD site layer (`docs/cad/warda-site-plan.dxf`), eight
camera modes, VIIRS-driven thermal overwatch, token-free ESRI imagery/terrain.

[2.1.0]: https://github.com/mk42-ai/warda-strike-reconstruction-3d/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/mk42-ai/warda-strike-reconstruction-3d/releases/tag/v2.0.0
