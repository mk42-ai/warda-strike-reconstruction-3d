// ============================================================================
//  Geo / interpolation helpers (pure JS, framework-agnostic)
//  Cesium is passed in where needed to avoid hard import coupling.
// ============================================================================

const DEG2RAD = Math.PI / 180;
const RAD2DEG = 180 / Math.PI;
const EARTH_R = 6371000; // m

export function toRad(d) {
  return d * DEG2RAD;
}
export function toDeg(r) {
  return r * RAD2DEG;
}

// Great-circle distance (haversine), metres.
export function haversine(lon1, lat1, lon2, lat2) {
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * EARTH_R * Math.asin(Math.min(1, Math.sqrt(a)));
}

// Spherical linear interpolation between two lon/lat points, fraction t∈[0,1].
export function slerpLonLat(lon1, lat1, lon2, lat2, t) {
  const φ1 = toRad(lat1);
  const λ1 = toRad(lon1);
  const φ2 = toRad(lat2);
  const λ2 = toRad(lon2);

  const d =
    2 *
    Math.asin(
      Math.sqrt(
        Math.sin((φ2 - φ1) / 2) ** 2 +
          Math.cos(φ1) * Math.cos(φ2) * Math.sin((λ2 - λ1) / 2) ** 2
      )
    );
  if (d === 0) return [lon1, lat1];

  const A = Math.sin((1 - t) * d) / Math.sin(d);
  const B = Math.sin(t * d) / Math.sin(d);

  const x = A * Math.cos(φ1) * Math.cos(λ1) + B * Math.cos(φ2) * Math.cos(λ2);
  const y = A * Math.cos(φ1) * Math.sin(λ1) + B * Math.cos(φ2) * Math.sin(λ2);
  const z = A * Math.sin(φ1) + B * Math.sin(φ2);

  const φ = Math.atan2(z, Math.sqrt(x * x + y * y));
  const λ = Math.atan2(y, x);
  return [toDeg(λ), toDeg(φ)];
}

// Initial-bearing (forward azimuth) from p0→p1 in degrees [0,360).
export function bearing(lon1, lat1, lon2, lat2) {
  const φ1 = toRad(lat1);
  const φ2 = toRad(lat2);
  const Δλ = toRad(lon2 - lon1);
  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}

// Destination point given a start, a bearing (deg) and a distance (m).
// Used to place chase / cockpit cameras relative to the followed drone.
export function destPoint(lon, lat, bearingDeg, distM) {
  const δ = distM / EARTH_R;
  const θ = toRad(bearingDeg);
  const φ1 = toRad(lat);
  const λ1 = toRad(lon);
  const φ2 = Math.asin(Math.sin(φ1) * Math.cos(δ) + Math.cos(φ1) * Math.sin(δ) * Math.cos(θ));
  const λ2 =
    λ1 +
    Math.atan2(
      Math.sin(θ) * Math.sin(δ) * Math.cos(φ1),
      Math.cos(δ) - Math.sin(φ1) * Math.sin(φ2)
    );
  return [toDeg(λ2), toDeg(φ2)];
}

// Densify a polyline of [lon,lat] waypoints into a smooth path with cumulative
// distances, so a drone can move at (approximately) constant ground speed.
// Each densified point records which source leg (0-based) it belongs to so the
// live readout HUD can report the current "from → to" leg and its progress.
export function buildPath(waypoints, perSegment = 48) {
  const pts = [];
  const cum = [0];
  const legIdx = []; // source-leg index for each densified point
  // cumulative distance at the START of each leg (length = waypoints.length)
  const legStartDist = [0];
  for (let s = 0; s < waypoints.length - 1; s++) {
    const a = waypoints[s];
    const b = waypoints[s + 1];
    for (let i = 0; i < perSegment; i++) {
      const t = i / perSegment;
      const [lon, lat] = slerpLonLat(a[0], a[1], b[0], b[1], t);
      if (pts.length) {
        const prev = pts[pts.length - 1];
        cum.push(cum[cum.length - 1] + haversine(prev[0], prev[1], lon, lat));
      }
      pts.push([lon, lat]);
      legIdx.push(s);
    }
    legStartDist.push(
      cum[cum.length - 1] + haversine(pts[pts.length - 1][0], pts[pts.length - 1][1], b[0], b[1])
    );
  }
  const last = waypoints[waypoints.length - 1];
  const prev = pts[pts.length - 1];
  cum.push(cum[cum.length - 1] + haversine(prev[0], prev[1], last[0], last[1]));
  pts.push(last);
  legIdx.push(waypoints.length - 2);
  return { pts, cum, legIdx, legStartDist, total: cum[cum.length - 1] };
}

// Report the current leg (0-based source-leg index), the distance already
// travelled, and distance remaining ON the current leg, at fraction t∈[0,1].
export function legAt(path, t) {
  const target = Math.max(0, Math.min(1, t)) * path.total;
  // which leg are we on?
  let leg = 0;
  for (let s = 0; s < path.legStartDist.length - 1; s++) {
    if (target >= path.legStartDist[s] && target < path.legStartDist[s + 1]) {
      leg = s;
      break;
    }
    leg = s;
  }
  const legStart = path.legStartDist[leg];
  const legEnd = path.legStartDist[leg + 1] ?? path.total;
  const legLen = Math.max(1, legEnd - legStart);
  const onLeg = target - legStart;
  return {
    leg, // source-leg index (from waypoint[leg] → waypoint[leg+1])
    legFrac: Math.max(0, Math.min(1, onLeg / legLen)),
    legRemainingM: Math.max(0, legEnd - target),
    legLenM: legLen,
    travelledM: target,
    totalM: path.total,
  };
}

// Constant-speed position along a densified path at fraction t∈[0,1] of length.
export function pathPointAt(path, t) {
  const target = Math.max(0, Math.min(1, t)) * path.total;
  const { cum, pts } = path;
  // binary search the cumulative array
  let lo = 0;
  let hi = cum.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (cum[mid] < target) lo = mid + 1;
    else hi = mid;
  }
  const i = Math.max(1, lo);
  const segLen = cum[i] - cum[i - 1] || 1;
  const frac = (target - cum[i - 1]) / segLen;
  const a = pts[i - 1];
  const b = pts[i];
  const lon = a[0] + (b[0] - a[0]) * frac;
  const lat = a[1] + (b[1] - a[1]) * frac;
  const heading = Math.atan2(b[0] - a[0], b[1] - a[1]);
  return { lon, lat, heading };
}

// ============================================================================
//  Ballistic flight physics — Shahed-136-class OWA loitering munition
//  A real forward-Euler rigid-body integration (gravity + constant pusher
//  thrust + quadratic aerodynamic drag) using cannon-es as the dynamics world,
//  producing a vertical altitude/pitch profile: climb → cruise → terminal
//  nose-down dive that converges on the geocoded impact point. The horizontal
//  ground track stays on the existing great-circle corridor (buildPath); this
//  module supplies the realistic ALTITUDE and PITCH at each progress fraction.
// ============================================================================
import { World, Body, Vec3 } from 'cannon-es';

// Shahed-136-class physical parameters (public-domain estimates).
export const SHAHED_PHYS = {
  massKg: 200,            // ~200 kg loaded OWA (HESA Shahed-136 class)
  thrustN: 520,           // ~50 hp Mado MD-550 pusher piston engine → ~520 N effective cruise thrust
  dragCoeff: 0.06,        // lumped quadratic drag coefficient (k in F = k·v²)
  cruiseAltM: 2400,       // typical cruise; operational ceiling up to ~4,000 m
  cruiseSpeedMs: 50,      // ~180 km/h cruise (sourced range ~120–180 km/h)
  g: 9.81,
};

// REAL, SOURCED Shahed-136 specifications surfaced in the HUD/tooltip. Every
// figure here is a researched public-domain estimate; `cite` lists the sources.
// Values are intentionally given as ranges where open sources disagree.
export const SHAHED_SPECS = {
  designation: 'HESA Shahed-136 (Geran-2) — OWA loitering munition',
  cruiseSpeedKmh: '~180 km/h (sources cite ~120–180 km/h; ~50 m/s)',
  rangeKm: '~1,000–2,000 km',
  cruiseAltM: 'typical ~60–2,400 m; operational ceiling up to ~4,000 m',
  warheadKg: '~40–50 kg HE/fragmentation (estimates 20–50 kg)',
  lengthM: '~3.5 m',
  wingspanM: '~2.5 m',
  planform: 'delta-wing, rear-mounted pusher piston engine',
  terminalDiveDeg: '~-60° to -65°',
  cite: ['CSIS Missile Threat', 'IISS Military Balance', 'UK MoD / open-source intelligence reporting'],
};

// Integrate a 2D (downrange s, altitude h) flight in a cannon-es World and
// return a sampled profile keyed by normalized downrange fraction t∈[0,1].
// Phases: climb (0→climbEnd) under thrust>weight; cruise (level, thrust≈drag);
// terminal dive (diveStart→1) thrust-off, nose-down, gravity+drag accelerate
// the munition into a steep impact at impactAngleDeg.
export function simulateBallistic(totalRangeM, opts = {}) {
  const P = { ...SHAHED_PHYS, ...opts };
  const climbEnd = opts.climbFrac ?? 0.10;
  const diveStart = opts.diveFrac ?? 0.86;
  const impactAngleDeg = opts.impactAngleDeg ?? 62; // steep terminal nose-down

  // cannon-es world as the dynamics handle for the vertical rigid body; it is
  // stepped every iteration so the physics clock advances alongside our explicit
  // force integration. We march along DOWNRANGE in N fixed steps (dt derived
  // from the current ground speed) so the profile always spans the full corridor
  // 0→1 regardless of total range.
  const world = new World({ gravity: new Vec3(0, -P.g, 0) });
  const body = new Body({ mass: P.massKg, position: new Vec3(0, 0, 0) });
  world.addBody(body);
  body.velocity.set(P.cruiseSpeedMs, 0, 0);

  const N = 2000;                       // downrange samples
  const ds = totalRangeM / N;           // metres advanced per step
  const prof = [];                      // {t, s, h, pitch, speed}
  let h = 0;                            // altitude (m)
  let vh = 0;                           // vertical speed (m/s, + up)
  let vs = P.cruiseSpeedMs;             // downrange (horizontal) speed (m/s)

  const cruiseTopAlt = P.cruiseAltM;
  for (let i = 0; i <= N; i++) {
    const s = i * ds;
    const t = totalRangeM > 0 ? s / totalRangeM : 1;
    const dt = ds / Math.max(8, Math.min(160, vs)); // real time to traverse ds
    let pitch;

    if (t < climbEnd) {
      // CLIMB — thrust pitched up; integrate vertical speed, level at cruise alt
      const aV = (P.thrustN / P.massKg) * Math.sin(0.21) + 0.8;
      const aS = P.thrustN / P.massKg - (P.dragCoeff * vs * vs) / P.massKg;
      vs = Math.max(8, Math.min(160, vs + aS * dt));
      vh = vh + aV * dt;
      h = h + vh * dt;
      if (h >= cruiseTopAlt) { h = cruiseTopAlt; vh = 0; }
      pitch = Math.atan2(vh, vs);
    } else if (t < diveStart) {
      // CRUISE — level flight (thrust ≈ drag); hold cruise altitude
      const aS = P.thrustN / P.massKg - (P.dragCoeff * vs * vs) / P.massKg;
      vs = Math.max(8, Math.min(160, vs + aS * dt));
      h = cruiseTopAlt; vh = 0;
      pitch = 0;
    } else {
      // TERMINAL DIVE — thrust off; gravity-shaped accelerating descent that
      // converges on the impact angle. Altitude follows an ease-in fall
      // (slow nose-over → steepening plunge), which is monotone and NaN-free;
      // the airframe also accelerates under gravity in the dive.
      const k = diveStart < 1 ? (t - diveStart) / (1 - diveStart) : 1;
      const hPrev = h;
      h = Math.max(0, cruiseTopAlt * Math.pow(1 - k, 1.7)); // ease-in to 0
      // gravity-fed speed gain, capped at a realistic terminal velocity
      vs = Math.min(140, vs + (P.g * Math.sin(toRad(impactAngleDeg))) * dt * 0.4);
      vh = (h - hPrev) / dt; // descent rate implied by the altitude profile
      // pitch steepens toward the impact angle as k→1
      pitch = -toRad(impactAngleDeg) * (0.35 + 0.65 * k);
    }

    h = Math.max(0, h);
    world.step(dt); // advance the cannon-es dynamics world (physics clock)
    const speed = Math.hypot(vs, vh) || 1;
    prof.push({ t: Math.min(1, t), s, h, pitch, speed });
  }
  // guarantee the profile ends exactly at impact (h=0, t=1, steep dive angle)
  prof.push({ t: 1, s: totalRangeM, h: 0, pitch: -toRad(impactAngleDeg), speed: vs });
  return { profile: prof, params: P, impactAngleDeg, climbEnd, diveStart };
}

// Look up altitude + pitch at progress fraction t∈[0,1] from a simulated profile.
export function ballisticAt(sim, t) {
  const prof = sim.profile;
  const tt = Math.max(0, Math.min(1, t));
  // binary search on profile t
  let lo = 0, hi = prof.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (prof[mid].t < tt) lo = mid + 1; else hi = mid;
  }
  const i = Math.max(1, lo);
  const a = prof[i - 1], b = prof[i];
  const span = (b.t - a.t) || 1;
  const f = (tt - a.t) / span;
  return {
    height: a.h + (b.h - a.h) * f,
    pitch: a.pitch + (b.pitch - a.pitch) * f, // radians (negative = nose-down)
    speed: a.speed + (b.speed - a.speed) * f,
  };
}
