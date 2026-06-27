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
