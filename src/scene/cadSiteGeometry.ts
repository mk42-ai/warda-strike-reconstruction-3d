// ============================================================================
//  cadSiteGeometry.ts — dimensioned, metric site/layout geometry for the
//  IMP-08 Al Warqa impact site.
//
//  SINGLE SOURCE OF TRUTH. The same numbers drive:
//    * the toggleable Cesium overlay      (src/scene/cadSiteLayer.ts)
//    * the drafted plan sheet             (docs/cad/warda-site-plan.dxf/.pdf/.png)
//
//  ⚠ CONFIDENCE / PROVENANCE — READ THIS BEFORE CITING ANY NUMBER ⚠
//  This is a MODELLED RECONSTRUCTION, NOT CONFIRMED INTELLIGENCE. Only the
//  impact coordinate itself is 'verified' (it is the geocoded address point
//  already committed in src/data/scenario.js). Every footprint, setback and
//  standoff distance below is an ANALYTIC ASSUMPTION or UNKNOWN, tagged as
//  such, and must be rendered/printed with its tier attached.
// ============================================================================

export type ConfidenceTier = 'verified' | 'assumption' | 'unknown';

/** Geocoded impact point — matches IMPACT_SITE in src/data/scenario.js. */
export const SITE_ORIGIN = {
  lon: 55.4045442,
  lat: 25.1857908,
  /** Ground elevation used for the plan datum, metres. */
  groundHeightM: 14,
  confidence: 'verified' as ConfidenceTier,
  note: 'Reverse-geocoded address point, Jenna Apartments (Warda), Al Warqa\u2019a 1, Dubai.',
};

/** True-north bearing of the building\u2019s long axis, degrees. */
export const SITE_GRID_BEARING_DEG = 18.0;

export interface DimensionedItem {
  id: string;
  label: string;
  /** Metric value in metres (radius for rings, length for runs). */
  valueM: number;
  confidence: ConfidenceTier;
  basis: string;
}

/**
 * Rectangular building footprint, expressed as half-extents about the origin
 * and rotated by SITE_GRID_BEARING_DEG.
 */
export const BUILDING_FOOTPRINT = {
  id: 'warda-block',
  label: 'Jenna Apartments (Warda) \u2014 G+4 residential block',
  lengthM: 38.3,
  widthM: 22.3,
  heightM: 16.5,
  bearingDeg: SITE_GRID_BEARING_DEG,
  confidence: 'assumption' as ConfidenceTier,
  basis:
    'Massing proxy consistent with a G+4 Al Warqa residential block; matches the '
    + 'warda-apartments.glb proxy bounding box. NOT survey-derived.',
};

/** Perimeter setbacks measured from the building face outward, metres. */
export const SETBACKS: DimensionedItem[] = [
  { id: 'setback-front', label: 'Front setback (street side)', valueM: 6.0,
    confidence: 'assumption',
    basis: 'Typical Dubai Municipality villa/apartment plot setback; not measured.' },
  { id: 'setback-side', label: 'Side setback', valueM: 3.0,
    confidence: 'assumption',
    basis: 'Typical side clearance for a mid-rise residential plot; not measured.' },
  { id: 'setback-rear', label: 'Rear setback', valueM: 4.5,
    confidence: 'assumption',
    basis: 'Typical rear clearance; not measured.' },
];

/**
 * Concentric standoff / effect rings centred on the impact point.
 * These are ANALYTIC PLANNING RINGS, not a blast-damage assessment.
 */
export const STANDOFF_RINGS: DimensionedItem[] = [
  { id: 'ring-crater', label: 'Crater / point of impact', valueM: 4.5,
    confidence: 'assumption',
    basis: 'Proxy crater radius for a ~50 kg-class OWA warhead on a concrete deck.' },
  { id: 'ring-debris', label: 'Primary ejecta radius', valueM: 26.0,
    confidence: 'unknown',
    basis: 'Illustrative ejecta scatter; no BDA imagery available for this site.' },
  { id: 'ring-cordon-inner', label: 'Inner cordon', valueM: 50.0,
    confidence: 'assumption',
    basis: 'Planning cordon for structural-collapse risk; doctrinal round figure.' },
  { id: 'ring-cordon-outer', label: 'Outer cordon / evacuation', valueM: 100.0,
    confidence: 'assumption',
    basis: 'Planning evacuation ring; doctrinal round figure, not incident-specific.' },
];

export interface AccessRoute {
  id: string;
  label: string;
  /** Local metric offsets from the origin, [east, north] metres. */
  points: Array<[number, number]>;
  widthM: number;
  confidence: ConfidenceTier;
  basis: string;
}

/** Notional emergency access routes, in local metres east/north of origin. */
export const ACCESS_ROUTES: AccessRoute[] = [
  {
    id: 'access-primary',
    label: 'Primary access \u2014 appliance route',
    points: [[-120, -40], [-60, -22], [-26, -10], [-8, 0]],
    widthM: 7.0,
    confidence: 'unknown',
    basis: 'Notional approach from the nearest arterial; road centreline NOT surveyed.',
  },
  {
    id: 'access-secondary',
    label: 'Secondary access \u2014 casualty egress',
    points: [[10, 6], [42, 26], [86, 48], [130, 62]],
    widthM: 5.5,
    confidence: 'unknown',
    basis: 'Notional egress corridor; alignment NOT surveyed.',
  },
];

/** Metres per degree at the site latitude (local flat-earth plan approximation). */
export function metresPerDegree(latDeg: number): { east: number; north: number } {
  const latRad = (latDeg * Math.PI) / 180;
  // WGS84 local scale factors
  const north = 111132.92 - 559.82 * Math.cos(2 * latRad) + 1.175 * Math.cos(4 * latRad);
  const east = 111412.84 * Math.cos(latRad) - 93.5 * Math.cos(3 * latRad);
  return { east, north };
}

/** Convert a local [east, north] metre offset to [lon, lat] degrees. */
export function localToLonLat(eastM: number, northM: number): [number, number] {
  const { east, north } = metresPerDegree(SITE_ORIGIN.lat);
  return [SITE_ORIGIN.lon + eastM / east, SITE_ORIGIN.lat + northM / north];
}

/** Rotate a local offset by the site grid bearing (clockwise from north). */
export function rotateByBearing(
  eastM: number, northM: number, bearingDeg: number = SITE_GRID_BEARING_DEG,
): [number, number] {
  const b = (bearingDeg * Math.PI) / 180;
  return [
    eastM * Math.cos(b) + northM * Math.sin(b),
    -eastM * Math.sin(b) + northM * Math.cos(b),
  ];
}

/** Building footprint corners as [lon, lat] pairs (closed ring). */
export function buildingFootprintLonLat(): Array<[number, number]> {
  const hl = BUILDING_FOOTPRINT.lengthM / 2;
  const hw = BUILDING_FOOTPRINT.widthM / 2;
  const corners: Array<[number, number]> = [
    [-hl, -hw], [hl, -hw], [hl, hw], [-hl, hw], [-hl, -hw],
  ];
  return corners.map(([e, n]) => {
    const [re, rn] = rotateByBearing(e, n);
    return localToLonLat(re, rn);
  });
}

/** Setback envelope (footprint grown by the max setback) as [lon, lat]. */
export function setbackEnvelopeLonLat(): Array<[number, number]> {
  const front = SETBACKS.find((s) => s.id === 'setback-front')?.valueM ?? 0;
  const side = SETBACKS.find((s) => s.id === 'setback-side')?.valueM ?? 0;
  const rear = SETBACKS.find((s) => s.id === 'setback-rear')?.valueM ?? 0;
  const hl = BUILDING_FOOTPRINT.lengthM / 2;
  const hw = BUILDING_FOOTPRINT.widthM / 2;
  const corners: Array<[number, number]> = [
    [-hl - rear, -hw - side], [hl + front, -hw - side],
    [hl + front, hw + side], [-hl - rear, hw + side], [-hl - rear, -hw - side],
  ];
  return corners.map(([e, n]) => {
    const [re, rn] = rotateByBearing(e, n);
    return localToLonLat(re, rn);
  });
}

/** A standoff ring sampled into a closed [lon, lat] polygon. */
export function ringLonLat(radiusM: number, segments = 96): Array<[number, number]> {
  const pts: Array<[number, number]> = [];
  for (let i = 0; i <= segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    pts.push(localToLonLat(Math.cos(a) * radiusM, Math.sin(a) * radiusM));
  }
  return pts;
}

/** An access route polyline as [lon, lat] pairs. */
export function routeLonLat(route: AccessRoute): Array<[number, number]> {
  return route.points.map(([e, n]) => localToLonLat(e, n));
}

/** Everything dimensioned, flattened for legend/table rendering. */
export function allDimensions(): DimensionedItem[] {
  return [
    { id: 'bldg-length', label: 'Building length', valueM: BUILDING_FOOTPRINT.lengthM,
      confidence: BUILDING_FOOTPRINT.confidence, basis: BUILDING_FOOTPRINT.basis },
    { id: 'bldg-width', label: 'Building width', valueM: BUILDING_FOOTPRINT.widthM,
      confidence: BUILDING_FOOTPRINT.confidence, basis: BUILDING_FOOTPRINT.basis },
    { id: 'bldg-height', label: 'Building height', valueM: BUILDING_FOOTPRINT.heightM,
      confidence: BUILDING_FOOTPRINT.confidence, basis: BUILDING_FOOTPRINT.basis },
    ...SETBACKS,
    ...STANDOFF_RINGS,
    ...ACCESS_ROUTES.map((r) => ({
      id: r.id, label: `${r.label} (width)`, valueM: r.widthM,
      confidence: r.confidence, basis: r.basis,
    })),
  ];
}

export const CAD_DISCLAIMER =
  'MODELLED RECONSTRUCTION \u2014 NOT CONFIRMED INTELLIGENCE. Dimensions tagged '
  + '"assumption" or "unknown" are analytic estimates, not measurements.';

export default {
  SITE_ORIGIN, BUILDING_FOOTPRINT, SETBACKS, STANDOFF_RINGS, ACCESS_ROUTES,
  CAD_DISCLAIMER,
};
