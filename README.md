# IMP-08 Warda Strike Reconstruction — Iran→Dubai Shahed-136 3D Theatre

A high-fidelity, web-based 3D reconstruction of the **IMP-08** Iran→Dubai
Shahed-136-class loitering-munition strike on **Warda Apartments, Dubai**
(Operation True Promise IV). Built with **React + Vite + CesiumJS** (real
satellite imagery + 3D terrain) and **Three.js** (hyper-detailed drone model).

This is a clear visual/functional upgrade of the earlier
`uae-strike-drone-overwatch-sim` build — focused on the single canonical
launch→impact corridor with real-imagery, real VIIRS thermal data, and the
OnDemand Vision-Drone overwatch brand system.

## Real satellite imagery (no key required)

The globe is draped with **real high-resolution satellite imagery**:

- **ESRI World Imagery** (token-free) — true-colour satellite/aerial base tiles.
- **ESRI World Elevation 3D** (token-free) — real terrain mesh.

This covers the **full Iran→Dubai corridor**, both endpoints (the Iran launch
site on the Bandar Abbas axis and the Warda Apartments impact site) and the
Strait-of-Hormuz / southern-Gulf transit between them.

### Renderer compatibility
The retained stack is CesiumJS 1.122.0 / Three.js r169 / React 18.3.1 / Vite 5.4.10.
This implementation does not add Cesium ion / Google credentials or new packages.
Use the native **Display quality** selector (Performance, Balanced, High detail).
The studio inspector lazily loads a verified CC0 1K HDR environment; its attribution
and source hashes are in `public/licenses/realism-assets.json`.

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
npm run build    # production build → dist/
npm run preview  # serve the built dist/
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
public/brand/             Static favicon
```

## Terrain and imagery scope
The default globe uses ESRI World Imagery and ESRI terrain, with an ellipsoid
fallback if terrain cannot load. The HUD reports the actual provider state.
CARTO is an alternate basemap. Provider attribution is visible. Local satellite
cards are raster images, **not** a live building mesh or photorealistic 3D tileset.
No credentials or licensed third-party city model are silently added.

## Real Shahed-136 statistics (sourced, shown in HUD)

Cruise ~180 km/h (~50 m/s; sources cite ~120–180 km/h) · range ~1,000–2,000 km ·
altitude typical ~60–2,400 m (ceiling up to ~4,000 m) · warhead ~40–50 kg (est.
20–50 kg) · length ~3.5 m · wingspan ~2.5 m · delta-wing, rear pusher piston
engine · terminal dive ~-60° to -65°. Sources: CSIS Missile Threat, IISS
Military Balance, UK MoD / open-source intelligence reporting. HUD telemetry follows the precomputed illustrative profile in `geo.js`;
it is not an operational or validated flight model.

## Flight path (resolved coordinates)

Launch: **Bandar Abbas, Iran** (27.1842023, 56.2892533, Hormozgan). Impact:
**Jenna Apartments (Warda), Al Warqa, Dubai** (25.1857908, 55.4045442). The
trajectory is a great-circle corridor with climb → ~2,400 m cruise → ~-62°
terminal dive converging on the impact coordinate.


## Display-only realism implementation
- The existing procedural recognition model keeps all original component families,
  with lathed silhouettes, bevelled small parts, UVs/normals, reusable geometry,
  instanced decorative fasteners and restrained non-emissive PBR surfaces.
- The existing GLB keeps its scene/node hierarchy and silhouettes. Normals, UVs,
  flat face normals on hard solids and corrected PBR factors are embedded.
- The inspector uses sRGB output, ACES once, optional low bloom, PMREM reflections,
  soft studio shadows, drag/zoom controls, and offscreen pause/resource disposal.
- Cesium uses version-supported PBR-neutral tone mapping, bounded resolution,
  quality-dependent MSAA/AO/shadows, complete symbolic-layer toggles, actual Model
  ready/error events, and a short display clock for transient VFX only.
- All scenario coordinates, chronology, flight calculations and intelligence
  data remain unchanged. No attack-planning, targeting, route selection, or
  operational capability is added. Geometry is illustrative recognition artwork.

## Checks and reproducibility
```bash
npm ci --ignore-scripts --no-audit --no-fund
npm test
npm run build
npm run preview
# development, alternatively:
npm run dev
```
`npm test` uses Node's built-in test runner with existing dependencies. It checks
object classes, quality budgets, all eight camera modes, six waypoints, layers,
thermal toggles, model fallback and display effects using a CPU/API harness.
It is **not** a browser or GPU rendering certificate. No formatter, linter or
TypeScript script existed in the inspected baseline.

`dist/` was already tracked. The build is refreshed to match the new source;
source archives and the pre-change worktree are retained in implementation evidence.
Optional `?inspect=1` exposes `window.__wardaDiagnostics()` with read-only renderer
counters and scene metadata; it does not expose credentials or operational controls.

## Licensing limitations
The new studio environment is Poly Haven Studio Small 09 by Sergej Majboroda,
CC0 1.0. The provider's original 1K file is unmodified. Coating maps are seeded
original procedural artwork. Existing satellite imagery, logo assets and the GLB
came with the user-provided repository; this change does not assert CC0 or new
redistribution rights over them. Consult `public/licenses/ATTRIBUTION.md`.


## Resumed feature: desktop detail and generated base-color surfaces
The existing implementation is continued on a non-production feature branch.
Desktop now defaults to **High detail**; narrow mobile viewports default to
**Performance**. Explicit choices are saved separately for mobile and desktop.
All existing quality tiers and controls remain available.

- Every original object family is recorded in `docs/object-inventory.md` and
  `docs/object-inventory.json`, including every imported GLB part.
- Two user-supplied original generated **color-only** inputs are integrated:
  dusty concrete on the existing inspector contact surface and faded paint on
  recognition-model coatings. They are not height, normal, metallic, roughness,
  AO, opacity, or physically measured data maps. Variants are 256/512px JPEG with
  mipmaps and bounded anisotropy; their total on-disk budget is under 100 KB.
- Asphalt, architectural-glass and soot inputs were downloaded/decoded but not
  placed on invented surfaces or substituted for geographic imagery.
- A 256px paint JPEG is embedded using core glTF 2.0 `baseColorTexture` into the
  existing model; all 14 parts, positions, normals, UVs and triangles remain.
- Desktop geometry uses richer radial/bevel detail. Mobile retains all semantic
  parts at lower subdivisions. Native Three.js LOD suppresses only instanced
  fasteners at distant inspector zoom. No Draco/Meshopt/KTX2/Basis path is claimed.
- The original flat inspector disc has a shallow chamfer-sided contact profile
  and dielectric concrete shading. It is not added to the geospatial globe.

Useful commands (no new dependencies):
```bash
npm test
npm run validate:assets
npm run build
npm run preview
# Idempotent asset-processing step, already applied:
node scripts/embed-display-texture.mjs
```
The added model validator checks actual GLB chunks/accessors/normals/indices,
embedded image bytes, asset-manifest hashes and component counts. It does not
certify GPU rendering. Official/provider access and browser evidence are reported
separately; CPU tests must not be mistaken for screenshots or frame-rate proof.
