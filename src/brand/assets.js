// ============================================================================
//  AIREV | OnDemand brand SVG asset set — self-contained vector assets (no
//  external API, no AI-generated images). Ministry-of-Defence tactical theme:
//  deep charcoal surfaces, tactical-green accent #4EE39B + tactical amber
//  #FFB02E. All icons are SVG strings + data-URIs for Cesium billboards.
// ============================================================================

export const BRAND = {
  primary: '#0e1a16',      // dark tactical green-charcoal (panels/labels)
  primaryDeep: '#070d0a',
  accent: '#4EE39B',       // tactical green (corridor, waypoints, trail)
  accent2: '#2FAE7A',      // deeper green
  amber: '#FFB02E',        // tactical amber (secondary accent)
  ink: '#E6F2EC',
  warn: '#ffcf3f',
  alert: '#ff5a4d',
};

export const svgToDataUri = (svg) =>
  'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg.trim());

// ---- AIREV | OnDemand logo (wordmark + reticle glyph) ------------------------
// Rendered purely as SVG vector + text (NO image asset, NO AI-generated graphic).
export const LOGO = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 48" role="img" aria-label="AIREV | OnDemand">
  <defs>
    <linearGradient id="og" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#4EE39B"/><stop offset="1" stop-color="#2FAE7A"/>
    </linearGradient>
  </defs>
  <g>
    <circle cx="24" cy="24" r="18" fill="#0e1a16" stroke="url(#og)" stroke-width="2.5"/>
    <circle cx="24" cy="24" r="9" fill="none" stroke="#4EE39B" stroke-width="2.5"/>
    <circle cx="24" cy="24" r="2.6" fill="#FFB02E"/>
    <path d="M24 6 v6 M24 36 v6 M6 24 h6 M36 24 h6" stroke="#4EE39B" stroke-width="2.2" stroke-linecap="round"/>
  </g>
  <text x="52" y="31" font-family="ui-monospace,'SF Mono','Roboto Mono',Consolas,monospace" font-size="20" font-weight="800" letter-spacing="1.5" fill="#4EE39B">AIREV</text>
  <text x="128" y="31" font-family="ui-monospace,'SF Mono','Roboto Mono',Consolas,monospace" font-size="20" font-weight="400" fill="#9fb2ab">|</text>
  <text x="142" y="31" font-family="'Segoe UI',Arial,sans-serif" font-size="20" font-weight="700" fill="#E6F2EC">OnDemand</text>
</svg>`;

// Compact square icon (favicon / boot)
export const ICON = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#0B3D2E"/>
  <circle cx="32" cy="32" r="20" fill="none" stroke="#7BE0AD" stroke-width="3"/>
  <circle cx="32" cy="32" r="10" fill="none" stroke="#36C98D" stroke-width="3"/>
  <circle cx="32" cy="32" r="3" fill="#7BE0AD"/>
  <path d="M32 8 v8 M32 48 v8 M8 32 h8 M48 32 h8" stroke="#7BE0AD" stroke-width="3" stroke-linecap="round"/>
</svg>`;

// ---- Full-screen HUD frame (tactical outline / corner brackets + reticle) ----
export const HUD_FRAME = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="none">
  <defs>
    <linearGradient id="edge" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#4EE39B" stop-opacity="0.5"/>
      <stop offset="0.5" stop-color="#2FAE7A" stop-opacity="0.08"/>
      <stop offset="1" stop-color="#FFB02E" stop-opacity="0.42"/>
    </linearGradient>
  </defs>
  <rect x="10" y="10" width="1580" height="880" rx="12" fill="none" stroke="url(#edge)" stroke-width="1.5"/>
  <g stroke="#4EE39B" stroke-width="2.5" fill="none" stroke-linecap="round">
    <path d="M22 70 V30 H62"/><path d="M1538 30 H1578 V70"/>
    <path d="M1578 830 V870 H1538"/><path d="M62 870 H22 V830"/>
  </g>
  <g stroke="#FFB02E" stroke-width="1.5" fill="none" opacity="0.55">
    <path d="M30 46 h22"/><path d="M1548 46 h22"/><path d="M30 854 h22"/><path d="M1548 854 h22"/>
  </g>
  <g fill="#4EE39B" opacity="0.55" font-family="monospace" font-size="13" font-weight="700" letter-spacing="1.5">
    <text x="34" y="26">AIREV | ONDEMAND · SENTINEL</text>
  </g>
  <g fill="#FFB02E" opacity="0.5" font-family="monospace" font-size="13" font-weight="700" letter-spacing="1.5">
    <text x="1418" y="26">IMP-08 // WARDA</text>
  </g>
  <line x1="800" y1="30" x2="800" y2="58" stroke="#4EE39B" stroke-width="1.5" opacity="0.4"/>
  <text x="792" y="76" fill="#4EE39B" opacity="0.5" font-family="monospace" font-size="12" font-weight="700">N</text>
</svg>`;

// ---- Camera-mode icons (stroke-based, inherit currentColor) -----------------
const ic = (inner) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;

export const CAM_ICONS = {
  launch: ic('<path d="M12 2c3 2.5 4 6 4 9l-4 4-4-4c0-3 1-6.5 4-9z"/><circle cx="12" cy="9" r="1.6"/><path d="M9 16l-2 5 5-2 5 2-2-5"/>'),
  orbit: ic('<circle cx="12" cy="12" r="3"/><ellipse cx="12" cy="12" rx="10" ry="4.5"/><circle cx="22" cy="12" r="1.2" fill="currentColor"/>'),
  chase: ic('<path d="M3 17l6-2 4-7 5 2-3 6 5 1"/><circle cx="9" cy="15" r="1.4"/>'),
  topdown: ic('<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M12 4v16M4 12h16"/><circle cx="12" cy="12" r="2"/>'),
  freefly: ic('<path d="M12 3v4M12 17v4M3 12h4M17 12h4"/><circle cx="12" cy="12" r="4"/><path d="M12 8l0 0"/>'),
  thermal: ic('<path d="M14 14.5V6a2 2 0 1 0-4 0v8.5a4 4 0 1 0 4 0z"/><path d="M12 8v6"/>'),
  impact: ic('<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="8"/><path d="M12 1v3M12 20v3M1 12h3M20 12h3"/>'),
  cinema: ic('<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18M8 6v12M16 6v12"/>'),
};

// ---- Shahed-136 glyph (delta-wing OWA loitering munition, top view) ----------
export const SHAHED_GLYPH = `
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="sh" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#cfeede"/><stop offset="1" stop-color="#5a8f78"/>
    </linearGradient>
  </defs>
  <g transform="translate(32,32)">
    <!-- fuselage -->
    <rect x="-2.4" y="-26" width="4.8" height="48" rx="2.4" fill="url(#sh)" stroke="#0B3D2E" stroke-width="1"/>
    <!-- delta wing -->
    <path d="M0 -6 L26 16 L0 8 L-26 16 Z" fill="url(#sh)" stroke="#0B3D2E" stroke-width="1"/>
    <!-- tail fins -->
    <path d="M0 18 L8 26 L0 22 L-8 26 Z" fill="#7BE0AD" stroke="#0B3D2E" stroke-width="0.8"/>
    <!-- warhead nose -->
    <circle cx="0" cy="-24" r="3.2" fill="#ff453a" stroke="#0B3D2E" stroke-width="1"/>
    <!-- prop -->
    <line x1="-6" y1="24" x2="6" y2="24" stroke="#0B3D2E" stroke-width="1.4"/>
  </g>
</svg>`;

// ---- Numbered waypoint markers (1..6) ---------------------------------------
export function waypointMarker(n, active = false) {
  const fill = active ? '#7BE0AD' : '#0B3D2E';
  const ink = active ? '#072A20' : '#7BE0AD';
  const ring = active ? '#E8FFF5' : '#36C98D';
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="48" height="56" viewBox="0 0 48 56">
  <path d="M24 54 C8 36 4 28 4 20 a20 20 0 0 1 40 0 c0 8-4 16-20 34z" fill="${fill}" stroke="${ring}" stroke-width="2.5"/>
  <circle cx="24" cy="20" r="12" fill="#072A20" stroke="${ring}" stroke-width="1.5"/>
  <text x="24" y="25.5" text-anchor="middle" font-family="'Segoe UI',Arial,sans-serif" font-size="15" font-weight="800" fill="${ink}">${n}</text>
</svg>`;
}

// ---- Thermal alert icon (suspicious heat) -----------------------------------
export const THERMAL_ALERT = `
<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
  <path d="M24 4 L44 40 H4 Z" fill="#1a0d00" stroke="#ff7a18" stroke-width="2.5"/>
  <path d="M24 14 c4 4 5 7 5 10 a5 5 0 1 1-10 0 c0-3 1-6 5-10z" fill="#ff453a"/>
  <rect x="22.5" y="22" width="3" height="9" rx="1.5" fill="#ffcf3f"/>
  <circle cx="24" cy="35" r="1.9" fill="#ffcf3f"/>
</svg>`;

// ---- Geofence ring overlay (legend chip) ------------------------------------
export const GEOFENCE_RING = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <circle cx="32" cy="32" r="26" fill="none" stroke="#7BE0AD" stroke-width="2" stroke-dasharray="5 5"/>
  <circle cx="32" cy="32" r="17" fill="none" stroke="#36C98D" stroke-width="1.4" stroke-dasharray="3 4" opacity="0.7"/>
  <circle cx="32" cy="32" r="3" fill="#ff453a"/>
  <path d="M32 6 v8" stroke="#7BE0AD" stroke-width="2" stroke-linecap="round"/>
</svg>`;

// Marker billboards as data-URIs for Cesium
export const MARKER_URIS = {
  launch: svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" width="48" height="56" viewBox="0 0 48 56"><path d="M24 54 C8 36 4 28 4 20 a20 20 0 0 1 40 0 c0 8-4 16-20 34z" fill="#ff453a" stroke="#fff" stroke-width="2.5"/><circle cx="24" cy="20" r="11" fill="#1a0d00" stroke="#fff" stroke-width="1.5"/><path d="M24 13c3 2.4 4 5 4 7l-4 3-4-3c0-2 1-4.6 4-7z" fill="#ffcf3f"/></svg>`),
  impact: svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" width="48" height="56" viewBox="0 0 48 56"><path d="M24 54 C8 36 4 28 4 20 a20 20 0 0 1 40 0 c0 8-4 16-20 34z" fill="#af52de" stroke="#fff" stroke-width="2.5"/><circle cx="24" cy="20" r="11" fill="#1a0a1f" stroke="#fff" stroke-width="1.5"/><circle cx="24" cy="20" r="6" fill="none" stroke="#ff7a18" stroke-width="2"/><circle cx="24" cy="20" r="1.6" fill="#ff453a"/></svg>`),
  shahed: svgToDataUri(SHAHED_GLYPH),
  thermalAlert: svgToDataUri(THERMAL_ALERT),
};

export default {
  BRAND, LOGO, ICON, HUD_FRAME, CAM_ICONS, SHAHED_GLYPH,
  waypointMarker, THERMAL_ALERT, GEOFENCE_RING, MARKER_URIS, svgToDataUri,
};
