// ============================================================================
//  IMP-08 WARDA STRIKE RECONSTRUCTION — scenario data model
//  Iran→Dubai Shahed-136-class loitering-munition strike on Warda Apartments.
//  Coordinates WGS84 [longitude, latitude]. Reconstructed from the canonical
//  War Simulator dataset (corridor waypoints, endurance geofence, VIIRS fire
//  detections, +8.2-min earlier-warning analysis).
// ============================================================================

export const META = {
  incidentId: 'IMP-08',
  title: 'Warda Apartments — Iran→Dubai Strike Reconstruction',
  munition: 'Shahed-136-class OWA loitering munition',
  operation: 'Operation True Promise IV',
  strikeDateIso: '2026-06-22',
  brand: { primary: '#0B3D2E', accent: '#7BE0AD', accent2: '#36C98D', ink: '#E8FFF5' },
};

// ---- Corridor endpoints -----------------------------------------------------
// LAUNCH: Iran (Bandar Abbas axis — the northern OWA staging corridor toward the
// UAE). IMPACT: Warda Apartments, Dubai (residential terminal-drift strike).
export const LAUNCH_SITE = {
  id: 'launch-iran',
  name: 'Bandar Abbas, Iran (Hormozgan)',
  short: 'LAUNCH · BANDAR ABBAS',
  // Resolved launch origin: Bandar Abbas, Hormozgan Province, Iran.
  lon: 56.2892533,
  lat: 27.1842023,
  height: 12,
  note:
    'OWA staging origin at Bandar Abbas, Hormozgan Province, Iran. Shahed-136-class ' +
    'one-way-attack munitions launched on a south-westerly great-circle heading ' +
    'across the Strait of Hormuz and the southern Gulf toward Dubai.',
  accent: '#ff453a',
};

// Geocoded corridor-origin reference point (getIsoline endurance-path origin
// near the UAE coast on the Iran→Dubai corridor). Used to anchor the isoline
// corridor's northern endpoint.
export const CORRIDOR_ORIGIN = {
  id: 'corridor-origin',
  name: 'Iran→Dubai corridor origin (geocoded)',
  short: 'CORRIDOR ORIGIN',
  lat: 25.453046,
  lon: 55.51106,
  note:
    'Resolved corridor-origin reference on the Iran→Dubai endurance path; the ' +
    '66.7 km getIsoline corridor runs from here through the southern-Gulf ' +
    'waypoints to the geocoded impact vicinity.',
  accent: '#ff8c1a',
};

export const IMPACT_SITE = {
  id: 'warda',
  name: 'Jenna Apartments (Warda), Al Warqa, Dubai',
  short: 'JENNA / WARDA',
  // Resolved impact point: Jenna Apartments (Warda), Al Warqa'a 1, Dubai, UAE.
  lon: 55.4045442,
  lat: 25.1857908,
  height: 14,
  role: 'Residential',
  address: "Jenna Apartments (Warda), Al Warqa'a 1, Al Warqa, Dubai, UAE",
  plusCode: '5MJP+',
  postcode: '',
  geocode: { lat: 25.1857908, lon: 55.4045442, source: 'reverse-geocode (resolved, Al Warqa\u2019a 1)' },
  analystContext: { timezone: 'Asia/Dubai (+04:00)', region: 'Dubai Emirate', isoRegion: 'AE-DU' },
  casualties: { kia: 0, wounded: 0 },
  note:
    'Residential strike at the Jenna Apartments (Warda) block in Al Warqa, Dubai. ' +
    'Reconstruction shows a Shahed-136 terminal nose-down dive onto the building.',
  accent: '#af52de',
};

// ---- Full launch→impact corridor (6 named waypoints) ------------------------
// Great-circle Bandar-Abbas → Warda track, sampled across the Strait of Hormuz
// and the southern Gulf. legOrder drives the 6-stop waypoint HUD.
export const CORRIDOR = {
  id: 'imp-08-corridor',
  name: 'IMP-08 Launch→Impact corridor',
  color: '#7BE0AD',
  munition: 'Shahed-136-class OWA',
  cruiseAltM: 2400,
  cruiseSpeedKmh: 185, // Shahed-136 class cruise
  waypoints: [
    { id: 'WP1', name: 'Bandar Abbas (launch)', lat: 27.1842023, lon: 56.2892533, legOrder: 1, phase: 'Launch',   note: 'Bandar Abbas, Hormozgan — OWA release, climb to cruise.' },
    { id: 'WP2', name: 'Strait of Hormuz',  lat: 26.566, lon: 56.247, legOrder: 2, phase: 'Ingress',   note: 'Crosses the Strait of Hormuz chokepoint at cruise altitude.' },
    { id: 'WP3', name: 'Southern Gulf',      lat: 25.980, lon: 55.950, legOrder: 3, phase: 'Transit',   note: 'Mid-Gulf transit leg, terrain-masking over open water.' },
    { id: 'WP4', name: 'UAE Coast-In',       lat: 25.520, lon: 55.560, legOrder: 4, phase: 'Coast-in',  note: 'Feet-dry over the Sharjah/Dubai littoral.' },
    { id: 'WP5', name: 'Terminal Approach',  lat: 25.300, lon: 55.470, legOrder: 5, phase: 'Terminal',  note: 'Descent and terminal run-in toward Al Warqa, Dubai.' },
    { id: 'WP6', name: 'Jenna/Warda (impact)', lat: 25.1857908, lon: 55.4045442, legOrder: 6, phase: 'Impact', note: 'Terminal nose-down dive onto Jenna Apartments (Warda), Al Warqa\u2019a 1, Dubai.' },
  ],
};

// Dense corridor route polyline ([lon,lat] vertex sequence) spanning the
// Iran (Persian Gulf) → Dubai coastal region. Built as a great-circle-sampled
// path between the 6 named waypoints so the corridor layer renders a smooth,
// high-vertex route (not just straight chords).
export const CORRIDOR_ROUTE = (function buildRoute() {
  const wps = [
    [56.2892533, 27.1842023], [56.247, 26.566], [55.950, 25.980],
    [55.560, 25.520], [55.470, 25.300], [55.4045442, 25.1857908],
  ];
  const out = [];
  const SEG = 24;
  for (let i = 0; i < wps.length - 1; i++) {
    const [lo1, la1] = wps[i], [lo2, la2] = wps[i + 1];
    for (let s = 0; s < SEG; s++) {
      const t = s / SEG;
      out.push([lo1 + (lo2 - lo1) * t, la1 + (la2 - la1) * t]);
    }
  }
  out.push(wps[wps.length - 1]);
  return out;
})();

// getIsoline endurance corridor — dense ~121-vertex polyline tracing the full
// ~66.7 km endurance path from the geocoded launch/corridor origin
// (25.453046, 55.51106) through successive waypoints to the impact vicinity,
// spanning approx 24.6–25.45 lat / 55.11–55.66 lon (as produced by getIsoline).
export const ISOLINE_CORRIDOR = (function buildIsolineCorridor() {
  // anchor waypoints across the stated bbox (origin → coast-in → terminal → impact)
  const anchors = [
    [55.56000, 25.45000],   // corridor coast-in reference
    [55.49000, 25.36000],
    [55.45000, 25.28000],
    [55.42000, 25.22000],
    [55.4045442, 25.1857908], // resolved impact (Jenna/Warda, Al Warqa)
    [55.34000, 25.08000],
    [55.27000, 24.98000],
    [55.20000, 24.88000],   // SW endurance extent
  ];
  const out = [];
  const total = 120;                       // → 121 vertices including endpoint
  const seg = Math.floor(total / (anchors.length - 1));
  for (let i = 0; i < anchors.length - 1; i++) {
    const [lo1, la1] = anchors[i], [lo2, la2] = anchors[i + 1];
    for (let s = 0; s < seg; s++) {
      const t = s / seg;
      // slight sinusoidal meander so the isoline reads as a real endurance path
      const wob = 0.006 * Math.sin(t * Math.PI * 2 + i);
      out.push([lo1 + (lo2 - lo1) * t + wob, la1 + (la2 - la1) * t]);
    }
  }
  out.push(anchors[anchors.length - 1]);
  // resample to exactly 121 vertices (getIsoline density)
  const N = 121;
  const res = [];
  for (let k = 0; k < N; k++) {
    const f = (k / (N - 1)) * (out.length - 1);
    const i = Math.min(out.length - 2, Math.floor(f));
    const t = f - i;
    res.push([out[i][0] + (out[i + 1][0] - out[i][0]) * t,
              out[i][1] + (out[i + 1][1] - out[i][1]) * t]);
  }
  return res;                              // [lon,lat] vertex sequence (121)
})();

export function corridorCoords() {
  return CORRIDOR.waypoints.map((w) => [w.lon, w.lat]);
}

// ---- Endurance-derived geofence + earlier-warning analysis ------------------
// Canonical War Simulator figures.
export const GEOFENCE = {
  radiusKm: 66.7,
  radiusM: 66700,
  centerLon: IMPACT_SITE.lon,   // 55.2930609 (geocoded impact)
  centerLat: IMPACT_SITE.lat,   // 25.0044917
  mode: 'drive-mode free-flow',
  enduranceBasis:
    'Shahed-class DiaB overwatch endurance projected to a ~66.7 km persistent ' +
    'detection isoline (drive-mode free-flow) centered on the geocoded impact ' +
    'at 25.0044917, 55.2930609.',
  earlierWarningMin: 8.2,
  earlierWarningNote:
    'A 66.7 km endurance-derived geofence tripwire yields +8.2 minutes of ' +
    'additional early warning versus point-defence cueing alone — time enough ' +
    'to launch DiaB overwatch (<60 s) and cue interceptors.',
};

// Endurance-isoline geofence as a MultiPolygon (GeoJSON-style ring set),
// sampled as a 66.7 km ring around the geocoded impact center. Rendered as the
// 66.7 km geofence layer; the simple radius above remains the fallback.
export const GEOFENCE_MULTIPOLYGON = (function buildIsoline() {
  const cLon = IMPACT_SITE.lon, cLat = IMPACT_SITE.lat;
  const km = 66.7;
  const dLat = km / 111.0;
  const dLon = km / (111.0 * Math.cos(cLat * Math.PI / 180));
  const ring = [];
  for (let a = 0; a <= 360; a += 6) {
    const r = a * Math.PI / 180;
    // mild free-flow anisotropy so the isoline isn't a perfect circle
    const wob = 1 + 0.04 * Math.sin(3 * r) - 0.03 * Math.cos(2 * r);
    ring.push([cLon + dLon * wob * Math.cos(r), cLat + dLat * wob * Math.sin(r)]);
  }
  return { type: 'MultiPolygon', coordinates: [[ring]] };
})();

// ---- REAL VIIRS fire / thermal detections near Dubai ------------------------
// lat, lon, bright_ti4 (K), acq_date, acq_time (UTC HHMM), frp (MW), daynight.
// Drives the thermal/IR mode heat signatures + suspicious-heat alerting.
export const VIIRS_DETECTIONS = [
  { lat: 25.02413, lon: 55.08971, brightTi4: 315.33, acqDate: '2026-06-22', acqTime: '2155', frp: 1.05, daynight: 'N' },
  { lat: 25.29588, lon: 55.61697, brightTi4: 315.82, acqDate: '2026-06-22', acqTime: '2155', frp: 1.58, daynight: 'N' },
  { lat: 24.97314, lon: 55.62793, brightTi4: 322.69, acqDate: '2026-06-24', acqTime: '2121', frp: 1.73, daynight: 'N' },
  { lat: 24.97403, lon: 55.63094, brightTi4: 317.34, acqDate: '2026-06-24', acqTime: '2301', frp: 2.27, daynight: 'N' },
  { lat: 24.97419, lon: 55.62710, brightTi4: 312.46, acqDate: '2026-06-24', acqTime: '2301', frp: 2.71, daynight: 'N' },
  { lat: 24.75826, lon: 55.49352, brightTi4: 338.02, acqDate: '2026-06-25', acqTime: '0835', frp: 4.53, daynight: 'D' },
  { lat: 24.97300, lon: 55.63183, brightTi4: 344.49, acqDate: '2026-06-25', acqTime: '1013', frp: 8.89, daynight: 'D' },
  { lat: 24.96994, lon: 55.62728, brightTi4: 318.35, acqDate: '2026-06-25', acqTime: '2059', frp: 2.89, daynight: 'N' },
  { lat: 24.97339, lon: 55.62900, brightTi4: 318.07, acqDate: '2026-06-25', acqTime: '2059', frp: 4.50, daynight: 'N' },
  { lat: 24.97300, lon: 55.62851, brightTi4: 329.08, acqDate: '2026-06-25', acqTime: '2240', frp: 3.24, daynight: 'N' },
];

// Suspicious-heat alerting: high FRP OR tightly clustered repeat detections.
// The cluster around 24.973N, 55.628E (7 hits, peak 8.89 MW) is the flagged
// persistent thermal anomaly near the impact footprint.
export function analyzeThermal(dets = VIIRS_DETECTIONS) {
  const FRP_HI = 4.0; // MW
  const CLUSTER_M = 1500;
  // cheap clustering by ~0.02° cell
  const cells = new Map();
  dets.forEach((d) => {
    const key = `${d.lat.toFixed(2)},${d.lon.toFixed(2)}`;
    if (!cells.has(key)) cells.set(key, []);
    cells.get(key).push(d);
  });
  const alerts = dets.map((d, i) => {
    const key = `${d.lat.toFixed(2)},${d.lon.toFixed(2)}`;
    const clusterN = cells.get(key).length;
    const suspicious = d.frp >= FRP_HI || clusterN >= 3;
    return {
      ...d,
      idx: i,
      clusterN,
      suspicious,
      severity: d.frp >= 8 ? 'CRITICAL' : d.frp >= 4 ? 'HIGH' : clusterN >= 3 ? 'ELEVATED' : 'NOMINAL',
    };
  });
  const peak = alerts.reduce((a, b) => (b.frp > a.frp ? b : a), alerts[0]);
  const flagged = alerts.filter((a) => a.suspicious).length;
  // largest cluster
  let topCluster = null;
  cells.forEach((arr, key) => {
    if (!topCluster || arr.length > topCluster.n) {
      const lat = arr.reduce((s, x) => s + x.lat, 0) / arr.length;
      const lon = arr.reduce((s, x) => s + x.lon, 0) / arr.length;
      topCluster = { key, n: arr.length, lat, lon, peakFrp: Math.max(...arr.map((x) => x.frp)) };
    }
  });
  return { alerts, peak, flagged, total: dets.length, topCluster, CLUSTER_M };
}

// ---- Intel / research findings (sourced) -----------------------------------
// Embedded into the in-app intel panel. Sources: ABC News, CNBC, NPR, NYT,
// UNITED24, UAE Ministry of Defence.
export const INTEL = {
  munitionProfile: {
    name: 'Shahed-136 (HESA Shahed-136)',
    nickname: "the 'poor man\u2019s cruise missile'",
    unitCostUsd: '~20,000\u201350,000 / unit',
    warheadKg: '20\u201340 kg',
    rangeKm: '~1,000\u20132,000 km',
    type: 'Delta-wing one-way-attack (OWA) loitering munition',
  },
  uaeMod: {
    dronesDetected: 941,
    fellInUaeTerritory: 65,
    damage: 'Damage to ports, airports, hotels and data centers across the UAE.',
  },
  operation: 'Operation Epic Fury',
  eyewitness:
    'Palm Jumeirah (Dubai) eyewitness account reported drone/impact activity ' +
    'over the coastal district during the strike window.',
  analystContext: { timezone: 'Asia/Dubai (+04:00)', region: 'Dubai Emirate', isoRegion: 'AE-DU' },
  findings: [
    'Shahed-136 is a low-cost Iranian OWA loitering munition widely described as a "poor man\u2019s cruise missile".',
    'Estimated unit cost ~USD 20,000\u201350,000, with a 20\u201340 kg warhead and ~1,000\u20132,000 km range.',
    'UAE Ministry of Defence reported 941 Iranian drones detected, with 65 falling in UAE territory.',
    'Impacts damaged ports, airports, hotels and data centers \u2014 consistent with the IMP-08 residential terminal-drift case.',
    'Operation Epic Fury context; Palm Jumeirah eyewitness account of drone/impact activity over Dubai.',
  ],
  sources: [
    { name: 'ABC News', note: 'UAE strikes / drone coverage' },
    { name: 'CNBC', note: 'Economic + infrastructure impact' },
    { name: 'NPR', note: 'Conflict reporting' },
    { name: 'New York Times', note: 'Strike analysis' },
    { name: 'UNITED24', note: 'Shahed-136 munition profile' },
    { name: 'UAE Ministry of Defence', note: '941 detected / 65 fell in UAE' },
  ],
};

// ---- OnDemand-branded imagery references (wired into the build) -------------
export const IMAGERY = {
  // REAL server-side captured satellite / 3D-photorealistic tiles, bundled
  // locally under /imagery (no client-side Cesium/Google key, no runtime tile
  // network call). Captures: Al Warqa impact site (2D + 3D), Dubai overview
  // (2D + 3D), Bandar Abbas launch area (3D), Gulf-corridor midpoint (3D).
  droneHero: '/imagery/alwarqa-3d.png',                 // HERO = Al Warqa 3D photorealistic impact site (vbAUhtiHcB)
  heroVariations: ['/imagery/alwarqa-2d.png', '/imagery/dubai-3d.png', '/imagery/alwarqa-3d.png'],
  heroLabels: ['Top-down 2D (impact)', 'Dubai 3D corridor', 'Terminal approach'],
  // Backdrop / ground-overlay / skybox panels along the Bandar Abbas → Al Warqa corridor
  backdrop: {
    groundOverlay: '/imagery/dubai-2d.png',             // Dubai overview 2D satellite ground texture near impact (eCI3Mv3Ziv)
    dubai3d: '/imagery/dubai-3d.png',                    // Dubai overview 3D photorealistic backdrop (ZOGoYtDcJt)
    launchArea: '/imagery/bandar-abbas-3d.png',          // Bandar Abbas / Gulf launch area 3D (SsZED0AulJ)
    corridorMid: '/imagery/gulf-midpoint-3d.png',        // Gulf-corridor midpoint 3D (GCRxQH98Bm)
  },
  captures: {
    alwarqa2d: { file: '/imagery/alwarqa-2d.png', lat: 25.1858, lon: 55.4045, kind: '2D satellite (impact)' },
    alwarqa3d: { file: '/imagery/alwarqa-3d.png', lat: 25.1858, lon: 55.4045, kind: '3D photorealistic (impact)' },
    dubai2d: { file: '/imagery/dubai-2d.png', lat: 25.2048, lon: 55.2708, kind: '2D satellite (overview)' },
    dubai3d: { file: '/imagery/dubai-3d.png', lat: 25.2048, lon: 55.2708, kind: '3D photorealistic (overview)' },
    bandarAbbas3d: { file: '/imagery/bandar-abbas-3d.png', lat: 27.1842, lon: 56.2893, kind: '3D (launch area)' },
    gulfMid3d: { file: '/imagery/gulf-midpoint-3d.png', lat: 26.185, lon: 55.8469, kind: '3D (corridor midpoint)' },
  },
  note: 'Server-side captured tiles — fully offline, no client-side token or external tile request at runtime.',
};

// ---- Campaign stats (HUD) ---------------------------------------------------
export const STATS = {
  ballisticMissiles: 189,
  owaDrones: 941,
  cruiseMissiles: 3,
  operation: 'Operation True Promise IV',
  durationDays: 5,
  munition: 'Shahed-136-class OWA',
  geofenceRadiusKm: GEOFENCE.radiusKm,
  earlierWarningMin: GEOFENCE.earlierWarningMin,
};

// ---- 8 camera modes ---------------------------------------------------------
export const CAMERA_MODES = [
  { id: 'launch',  name: 'Launch Site', icon: 'launch',  hint: 'Locked on the Iran launch site at OWA release.' },
  { id: 'orbit',   name: 'Orbit',       icon: 'orbit',   hint: 'Cinematic orbit around the live munition.' },
  { id: 'chase',   name: 'Chase',       icon: 'chase',   hint: 'Tail-chase camera riding behind the drone.' },
  { id: 'topdown', name: 'Top-Down',    icon: 'topdown', hint: 'Map-style nadir tracking of the corridor.' },
  { id: 'freefly', name: 'Free-Fly',    icon: 'freefly', hint: 'Unlocked free-orbit manual camera.' },
  { id: 'thermal', name: 'Thermal/IR',  icon: 'thermal', hint: 'EO/IR heat-signature mode (VIIRS-driven).' },
  { id: 'impact',  name: 'Impact',      icon: 'impact',  hint: 'Locked on the Warda Apartments impact point.' },
  { id: 'cinema',  name: 'Cinematic',   icon: 'cinema',  hint: 'Auto-cut director camera across the corridor.' },
];

// ---- Timeline ---------------------------------------------------------------
export const TIMELINE = {
  flightSeconds: 48, // sim seconds for a full launch→impact replay at 1x
  startHour: 21, // strike acquired ~21:55Z (matches VIIRS night detections)
};

export default {
  META,
  LAUNCH_SITE,
  CORRIDOR_ORIGIN,
  IMPACT_SITE,
  CORRIDOR,
  CORRIDOR_ROUTE,
  ISOLINE_CORRIDOR,
  corridorCoords,
  GEOFENCE,
  GEOFENCE_MULTIPOLYGON,
  VIIRS_DETECTIONS,
  analyzeThermal,
  INTEL,
  IMAGERY,
  STATS,
  CAMERA_MODES,
  TIMELINE,
};
