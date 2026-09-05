// Shared, version-compatible display budgets. They do not alter scenario data,
// geography, telemetry, trajectory or any operational capability.
export const QUALITY_PRESETS = Object.freeze({
  performance: Object.freeze({ label: 'Performance', pixelRatio: 1, shadowSize: 512, shadows: false, msaa: 1, globeSSE: 4, tileCache: 256, ao: false, bloom: false, particles: 0.35, inspectorHz: 30, hdrEnvironment: false, textureSize: 256, anisotropy: 2, microdetail: false }),
  balanced: Object.freeze({ label: 'Balanced', pixelRatio: 1.5, shadowSize: 1024, shadows: true, msaa: 2, globeSSE: 2.5, tileCache: 512, ao: false, bloom: true, particles: 0.65, inspectorHz: 45, hdrEnvironment: true, textureSize: 512, anisotropy: 4, microdetail: true }),
  high: Object.freeze({ label: 'High detail', pixelRatio: 1.75, shadowSize: 2048, shadows: true, msaa: 4, globeSSE: 1.5, tileCache: 768, ao: true, bloom: true, particles: 1, inspectorHz: 60, hdrEnvironment: true, textureSize: 512, anisotropy: 8, microdetail: true }),
});

export function qualityFor(id) {
  return QUALITY_PRESETS[id] || QUALITY_PRESETS.balanced;
}

export function deviceDefaultQuality({ width = 1280 } = {}) {
  // Desktop-first maximum quality is intentional; an explicit selector is the
  // escape hatch on a slower desktop. Mobile starts at the reduced-cost tier.
  return width <= 720 ? 'performance' : 'high';
}

function deviceProfile() {
  return deviceDefaultQuality({
    width: typeof window === 'undefined' ? 1280 : window.innerWidth,
    memory: typeof navigator === 'undefined' ? undefined : navigator.deviceMemory,
  });
}

export function initialQuality() {
  const fallback = deviceProfile();
  try {
    // Separate preferences prevent a desktop high-detail choice from silently
    // increasing the cost on mobile. A user's choice on each device wins.
    const stored = localStorage.getItem(`warda-display-quality-${fallback === 'performance' ? 'mobile' : 'desktop'}`);
    if (QUALITY_PRESETS[stored]) return stored;
  } catch (_) { /* private storage does not prevent the device default */ }
  return fallback;
}

export function rememberQuality(id) {
  try {
    const profile = deviceProfile() === 'performance' ? 'mobile' : 'desktop';
    localStorage.setItem(`warda-display-quality-${profile}`, QUALITY_PRESETS[id] ? id : deviceProfile());
  } catch (_) { /* no storage required */ }
}
