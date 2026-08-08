// ============================================================================
//  cadSiteLayer.ts — dimensioned CAD site plan as an INDEPENDENTLY TOGGLEABLE
//  Cesium entity layer.
//
//  This OVERLAYS the reconstruction; it never replaces it. Everything is added
//  to a dedicated CustomDataSource so one show/hide flips the whole layer and
//  destroy() removes it cleanly.
//
//  Geometry + metric callouts come from cadSiteGeometry.ts (the same source
//  that drafts docs/cad/warda-site-plan.dxf / .pdf / .png), so the 3D overlay
//  and the printed sheet can never drift apart.
//
//  Every label carries its CONFIDENCE TIER. Nothing here is presented as
//  confirmed intelligence.
// ============================================================================
import * as CesiumNS from 'cesium';
import {
  SITE_ORIGIN, BUILDING_FOOTPRINT, SETBACKS, STANDOFF_RINGS, ACCESS_ROUTES,
  buildingFootprintLonLat, setbackEnvelopeLonLat, ringLonLat, routeLonLat,
  localToLonLat, CAD_DISCLAIMER,
  type ConfidenceTier,
} from './cadSiteGeometry';

const C: any = CesiumNS;

/** Colour per confidence tier — consistent with the printed sheet's legend. */
const TIER_COLOR: Record<ConfidenceTier, string> = {
  verified: '#36C98D',   // brand accent2 — solid
  assumption: '#FFC53F', // amber — estimated
  unknown: '#FF7A18',    // orange — notional
};

/** Short suffix appended to every on-globe label. */
function tierTag(tier: ConfidenceTier): string {
  return tier === 'verified' ? '[VERIFIED]'
    : tier === 'assumption' ? '[ASSUMED]' : '[UNKNOWN]';
}

export interface CadSiteLayer {
  dataSource: any;
  entityCount: number;
}

function flatDegrees(pts: Array<[number, number]>, height: number): any {
  const flat: number[] = [];
  pts.forEach(([lon, lat]) => { flat.push(lon, lat, height); });
  return C.Cartesian3.fromDegreesArrayHeights(flat);
}

function labelFor(text: string, tier: ConfidenceTier) {
  return {
    text,
    font: '600 11px "Segoe UI", sans-serif',
    fillColor: C.Color.fromCssColorString(TIER_COLOR[tier]),
    showBackground: true,
    backgroundColor: C.Color.BLACK.withAlpha(0.72),
    backgroundPadding: new C.Cartesian2(6, 3),
    pixelOffset: new C.Cartesian2(0, -12),
    disableDepthTestDistance: Number.POSITIVE_INFINITY,
    scaleByDistance: new C.NearFarScalar(400, 1.0, 6000, 0.0),
  };
}

/**
 * Build the CAD overlay. Returns the layer handle (or null if Cesium is
 * unavailable). The layer is added HIDDEN by default — the caller decides.
 */
export function buildCadSiteLayer(viewer: any): CadSiteLayer | null {
  if (!viewer) return null;

  const ds = new C.CustomDataSource('imp08-cad-site-plan');
  const base = SITE_ORIGIN.groundHeightM;
  let count = 0;

  // ── 1. Building footprint (plan polygon + extruded outline) ───────────────
  ds.entities.add({
    id: 'cad-building-footprint',
    name: BUILDING_FOOTPRINT.label,
    polygon: {
      hierarchy: new C.PolygonHierarchy(flatDegrees(buildingFootprintLonLat(), base)),
      material: C.Color.fromCssColorString(TIER_COLOR[BUILDING_FOOTPRINT.confidence]).withAlpha(0.18),
      outline: true,
      outlineColor: C.Color.fromCssColorString(TIER_COLOR[BUILDING_FOOTPRINT.confidence]),
      outlineWidth: 2,
      height: base,
      perPositionHeight: false,
    },
    _cad: { kind: 'footprint', confidence: BUILDING_FOOTPRINT.confidence },
  });
  count++;

  ds.entities.add({
    id: 'cad-building-label',
    position: C.Cartesian3.fromDegrees(SITE_ORIGIN.lon, SITE_ORIGIN.lat, base + 24),
    label: labelFor(
      `${BUILDING_FOOTPRINT.lengthM.toFixed(1)} m \u00d7 ${BUILDING_FOOTPRINT.widthM.toFixed(1)} m `
      + `\u00d7 H${BUILDING_FOOTPRINT.heightM.toFixed(1)} m ${tierTag(BUILDING_FOOTPRINT.confidence)}`,
      BUILDING_FOOTPRINT.confidence,
    ),
    _cad: { kind: 'dimension', confidence: BUILDING_FOOTPRINT.confidence },
  });
  count++;

  // ── 2. Setback envelope ───────────────────────────────────────────────────
  const setbackTier: ConfidenceTier = 'assumption';
  ds.entities.add({
    id: 'cad-setback-envelope',
    name: 'Setback envelope',
    polygon: {
      hierarchy: new C.PolygonHierarchy(flatDegrees(setbackEnvelopeLonLat(), base)),
      material: C.Color.TRANSPARENT,
      fill: false,
      outline: true,
      outlineColor: C.Color.fromCssColorString(TIER_COLOR[setbackTier]).withAlpha(0.9),
      outlineWidth: 1,
      height: base + 0.2,
    },
    _cad: { kind: 'setback', confidence: setbackTier },
  });
  count++;

  SETBACKS.forEach((s, i) => {
    const offsets: Array<[number, number]> = [[34, 0], [0, 22], [-30, 0]];
    const [e, n] = offsets[i % offsets.length];
    const [lon, lat] = localToLonLat(e, n);
    ds.entities.add({
      id: `cad-${s.id}-label`,
      position: C.Cartesian3.fromDegrees(lon, lat, base + 6),
      label: labelFor(`${s.label}: ${s.valueM.toFixed(1)} m ${tierTag(s.confidence)}`, s.confidence),
      _cad: { kind: 'dimension', confidence: s.confidence, basis: s.basis },
    });
    count++;
  });

  // ── 3. Standoff / cordon rings ────────────────────────────────────────────
  STANDOFF_RINGS.forEach((r) => {
    ds.entities.add({
      id: `cad-${r.id}`,
      name: r.label,
      polyline: {
        positions: flatDegrees(ringLonLat(r.valueM), base + 0.4),
        width: 2,
        material: new C.PolylineDashMaterialProperty({
          color: C.Color.fromCssColorString(TIER_COLOR[r.confidence]).withAlpha(0.95),
          dashLength: 14,
        }),
        clampToGround: false,
      },
      _cad: { kind: 'standoff', confidence: r.confidence, basis: r.basis },
    });
    count++;

    // radial dimension callout at the ring's north point
    const [lon, lat] = localToLonLat(0, r.valueM);
    ds.entities.add({
      id: `cad-${r.id}-label`,
      position: C.Cartesian3.fromDegrees(lon, lat, base + 3),
      label: labelFor(`R ${r.valueM.toFixed(1)} m \u2014 ${r.label} ${tierTag(r.confidence)}`, r.confidence),
      _cad: { kind: 'dimension', confidence: r.confidence, basis: r.basis },
    });
    count++;
  });

  // ── 4. Access routes ──────────────────────────────────────────────────────
  ACCESS_ROUTES.forEach((route) => {
    ds.entities.add({
      id: `cad-${route.id}`,
      name: route.label,
      polyline: {
        positions: flatDegrees(routeLonLat(route), base + 0.3),
        width: Math.max(3, route.widthM),
        material: new C.PolylineOutlineMaterialProperty({
          color: C.Color.fromCssColorString(TIER_COLOR[route.confidence]).withAlpha(0.55),
          outlineColor: C.Color.BLACK.withAlpha(0.6),
          outlineWidth: 1,
        }),
      },
      _cad: { kind: 'access', confidence: route.confidence, basis: route.basis },
    });
    count++;

    const mid = route.points[Math.floor(route.points.length / 2)];
    const [lon, lat] = localToLonLat(mid[0], mid[1]);
    ds.entities.add({
      id: `cad-${route.id}-label`,
      position: C.Cartesian3.fromDegrees(lon, lat, base + 5),
      label: labelFor(
        `${route.label} \u2014 W ${route.widthM.toFixed(1)} m ${tierTag(route.confidence)}`,
        route.confidence,
      ),
      _cad: { kind: 'dimension', confidence: route.confidence, basis: route.basis },
    });
    count++;
  });

  // ── 5. North arrow + provenance placard ───────────────────────────────────
  const [nLon, nLat] = localToLonLat(0, 130);
  ds.entities.add({
    id: 'cad-north-arrow',
    polyline: {
      positions: flatDegrees([localToLonLat(0, 105), [nLon, nLat]], base + 1),
      width: 3,
      material: C.Color.WHITE.withAlpha(0.9),
    },
    _cad: { kind: 'annotation', confidence: 'verified' as ConfidenceTier },
  });
  count++;
  ds.entities.add({
    id: 'cad-north-label',
    position: C.Cartesian3.fromDegrees(nLon, nLat, base + 4),
    label: labelFor('N \u2191 TRUE NORTH', 'verified'),
    _cad: { kind: 'annotation', confidence: 'verified' as ConfidenceTier },
  });
  count++;

  const [dLon, dLat] = localToLonLat(0, -128);
  ds.entities.add({
    id: 'cad-disclaimer',
    position: C.Cartesian3.fromDegrees(dLon, dLat, base + 4),
    label: {
      ...labelFor(CAD_DISCLAIMER, 'unknown'),
      font: '600 10px "Segoe UI", sans-serif',
      scaleByDistance: new C.NearFarScalar(600, 1.0, 9000, 0.0),
    },
    _cad: { kind: 'annotation', confidence: 'unknown' as ConfidenceTier },
  });
  count++;

  try { viewer.dataSources.add(ds); } catch (_) { return null; }
  return { dataSource: ds, entityCount: count };
}

/** Show/hide the whole CAD overlay in one call. */
export function setCadLayerVisible(layer: CadSiteLayer | null, visible: boolean): void {
  try { if (layer?.dataSource) layer.dataSource.show = visible; } catch (_) { /* removed */ }
}

/** Remove the overlay from the viewer and release its entities. */
export function destroyCadLayer(viewer: any, layer: CadSiteLayer | null): void {
  try { if (viewer && layer?.dataSource) viewer.dataSources.remove(layer.dataSource, true); }
  catch (_) { /* viewer already torn down */ }
}

export default buildCadSiteLayer;
