# IMP-08 Warda Strike Reconstruction — Iran→Dubai Shahed-136 3D Theatre

A high-fidelity, web-based 3D reconstruction of the **IMP-08** Iran→Dubai
Shahed-136-class loitering-munition strike on **Warda Apartments, Dubai**
(Operation True Promise IV). Built with **React + Vite + CesiumJS** (real
satellite imagery + 3D terrain) and **Three.js** (hyper-detailed drone model).

This is a clear visual/functional upgrade of the earlier
`uae-strike-drone-overwatch-sim` build — focused on the single canonical
launch→impact corridor with real-imagery, real VIIRS thermal data, and the
OnDemand Vision-Drone overwatch brand system.

**Current version: v2.1.0** — build-script refactor with versioning support,
an optional guarded CAD/asset import pipeline, and a docs/CHANGELOG overhaul.
See [CHANGELOG.md](CHANGELOG.md).

## Real satellite imagery (no key required)

The globe is draped with **real high-resolution satellite imagery**:

- **ESRI World Imagery** (token-free) — true-colour satellite/aerial base tiles.
- **ESRI World Elevation 3D** (token-free) — real terrain mesh.

This covers the **full Iran→Dubai corridor**, both endpoints (the Iran launch
site on the Bandar Abbas axis and the Warda Apartments impact site) and the
Strait-of-Hormuz / southern-Gulf transit between them.

### Optional photoreal upgrade — Cesium ion + Google Photorealistic 3D Tiles
Paste a free [Cesium ion token](https://ion.cesium.com/tokens) into the
right-rail field (or set `VITE_CESIUM_ION_TOKEN`) to auto-drape **Google
Photorealistic 3D Tiles** + **Cesium World Terrain** over the same scene.

## Features

| # | Capability |
|---|-----------|
| 1 | Hyper-detailed **Shahed-136-class** loitering-munition 3D model (Three.js PBR, live inspector) |
| 2 | Full **launch→impact trajectory** animated along the real corridor coordinates |
| 3 | **8 camera modes**: Launch Site, Orbit, Chase, Top-Down, Free-Fly, Thermal/IR, Impact, Cinematic |
| 4 | **6-stop waypoint navigation** along the corridor |
| 5 | **Real thermal/IR mode** driven by 10 confirmed **VIIRS** fire detections, with suspicious-heat alerting (high-FRP / clustered) |
| 6 | **Endurance-derived geofence** (66.7 km) with **+8.2 min earlier-warning** overlay and corridor tripwire |
| 7 | **OnDemand brand system**: logo, HUD frame, generated SVG icon set (deep green #0B3D2E + light-green accents) |

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/ (also writes dist/build-info.json)
npm run preview  # serve the built dist/
npm test         # release smoke test — run AFTER npm run build
```

Optional CAD/asset import (dev-time only, never required for the build):

```bash
mkdir -p cad-inbox && cp /path/to/model.step cad-inbox/   # or .iges/.obj/.glb
npm run cad:import          # convert/validate → public/models/imported/ + report
npm run cad:import:merge -- --at 55.4045442,25.1857908,0   # also append to the asset manifest
```

## Data provenance

- **Corridor / endpoints / geofence / warning**: canonical War Simulator IMP-08 dataset.
- **VIIRS detections**: 10 confirmed fire/thermal detections near Dubai (2026-06-22 → 2026-06-25), fields `lat,lon,bright_ti4,acq_date,acq_time,frp,daynight`.
- **Trajectory math** (`src/utils/geo.js`): great-circle slerp + densified constant-speed path, reused from the prior build.

## Structure

```
src/
  App.jsx                 React HUD (camera bar, waypoints, telemetry, thermal, geofence, ion)
  main.jsx                React entry
  styles.css              OnDemand-branded HUD styling
  cesium/CesiumScene.js   Cesium engine: imagery/terrain, trajectory, cameras, geofence, VIIRS layer
  three/Shahed136.js      Procedural Shahed-136 model + inset inspector
  data/scenario.js        Corridor, endpoints, geofence, VIIRS data + thermal analysis
  utils/geo.js            Great-circle / path / interpolation helpers
  brand/assets.js         OnDemand SVG asset set (logo, frame, icons, markers)
  assets/assetManifest.json   Declarative GLB manifest (ids, georeferencing, sha256, provenance tiers)
  assets/assetManifest.ts     Typed wrapper + runtime validator for the manifest
  config/lightingConfig.ts    HDR lighting/post-processing configuration
  scene/loadAssetsFromManifest.ts  Manifest GLB loader (retry + error classification + extraAssets hook)
  scene/applyLighting.ts      Shared image-based lighting
  scene/cadSiteGeometry.ts    Parsed CAD site-plan geometry
  scene/cadSiteLayer.ts       Cesium overlay for the CAD site plan (off by default)
scripts/
  cad-import.mjs          OPTIONAL CAD/asset import (STEP/IGES/OBJ→GLB hooks, guarded, dev-time only)
  smoke-test.mjs          Release smoke test — the `npm test` gate
docs/cad/
  warda-site-plan.dxf     Dimensioned site plan (DXF R2010, metres)
  warda-site-plan.pdf/.png  Rendered derivatives
public/models/            GLB assets referenced by the manifest (see provenance notes)
public/brand/             Static favicon
dist/build-info.json      Emitted by every production build: version, commit, build time
```

## Versioning & build metadata (v2.1.0)

`package.json` is the single source of truth for the app version. At build time
`vite.config.js` injects it into the bundle via `define`:

- `__APP_VERSION__` — e.g. `2.1.0` (consumed by `buildStamp()` in
  `src/scene/loadAssetsFromManifest.ts`; the asset loader logs it at boot)
- `__BUILD_TIME__` — ISO-8601 UTC build timestamp
- `__GIT_COMMIT__` — short commit hash, degrading to `unknown` for archive builds

Every `npm run build` also emits **`dist/build-info.json`**:

```json
{ "name": "warda-strike-reconstruction-3d", "version": "2.1.0",
  "buildTimeUtc": "…", "gitCommit": "…", "bundler": "vite@5.4.10" }
```

Builds from a plain ZIP (no `.git`) and builds with no CAD tooling installed
both succeed — all metadata and CAD steps degrade gracefully, never fatally.

## CAD / asset import pipeline (optional)

`scripts/cad-import.mjs` brings external CAD/mesh content into the Blender GLB
asset pipeline **defensively** — it is a dev-time convenience and is *not*
wired into `npm run build`:

| Input (drop into `cad-inbox/`) | Handling |
|---|---|
| `.step` / `.stp` / `.iges` / `.igs` | Tessellated to GLB by the first available tool: **Mayo-style converter** (`mayo`, `MAYO_BIN`), **FreeCAD** (`FreeCADCmd`), or **assimp** |
| `.obj` | Converted to GLB via assimp |
| `.glb` | Validated in place (magic, JSON chunk, accessor bounding box) |

Each output is fingerprinted (SHA-256, bytes, glTF bbox) into
`public/models/imported/import-report.json`, matching the manifest's integrity
metadata. With no CAD tool installed the script logs the gap and exits 0 —
the build is never blocked. `npm run cad:import:merge -- --at <lon,lat[,h]>`
additionally appends validated entries to `src/assets/assetManifest.json`;
georeferencing is always supplied explicitly by the operator (never invented).
At runtime, `loadAssetsFromManifest(scene, { extraAssets })` can inject such
entries without touching the manifest JSON.

## Testing

The repo intentionally keeps a zero-dependency test gate:

```bash
npm run build   # produce dist/ first
npm test        # scripts/smoke-test.mjs
```

The smoke test asserts: version shape, `dist/build-info.json` consistency,
hashed JS/CSS bundle presence, the injected `__APP_VERSION__` define reaching
the bundle, full `assetManifest.json` validation (mirroring the TS validator),
per-GLB existence + size + SHA-256 + magic, and a DXF sanity check on
`docs/cad/warda-site-plan.dxf`. It exits non-zero on any failure.

## 3D terrain & photorealistic tiles (token-free default + optional upgrade)

By default this build renders a **token-free** photorealistic-quality backdrop:
**ESRI World Imagery** (real high-resolution satellite tiles) draped over **ESRI
World Elevation 3D** terrain relief across the full Bandar Abbas → Dubai
corridor. No credential is required and the build is never blocked.

For full photorealistic **city 3D tiles**, supply ONE of:

- **Cesium ion** — set `CESIUM_ION_ACCESS_TOKEN` (token scope `assets:read`, from
  https://ion.cesium.com/tokens). Enables Cesium World Terrain + Google
  Photorealistic 3D Tiles via `createGooglePhotorealistic3DTileset()`.
- **Google Maps Platform** — set `GOOGLE_MAPS_API_KEY` with the **Map Tiles API**
  enabled (https://console.cloud.google.com). Serves Google Photorealistic 3D
  Tiles directly.

Paste a Cesium ion token into the right-rail field at runtime, or inject either
key as a `VITE_*` build-time variable. Either single credential is sufficient.

## Real Shahed-136 statistics (sourced, shown in HUD)

Cruise ~180 km/h (~50 m/s; sources cite ~120–180 km/h) · range ~1,000–2,000 km ·
altitude typical ~60–2,400 m (ceiling up to ~4,000 m) · warhead ~40–50 kg (est.
20–50 kg) · length ~3.5 m · wingspan ~2.5 m · delta-wing, rear pusher piston
engine · terminal dive ~-60° to -65°. Sources: CSIS Missile Threat, IISS
Military Balance, UK MoD / open-source intelligence reporting. All HUD telemetry
reads from the live cannon-es physics state.

## Flight path (resolved coordinates)

Launch: **Bandar Abbas, Iran** (27.1842023, 56.2892533, Hormozgan). Impact:
**Jenna Apartments (Warda), Al Warqa, Dubai** (25.1857908, 55.4045442). The
trajectory is a great-circle corridor with climb → ~2,400 m cruise → ~-62°
terminal dive converging on the impact coordinate.
