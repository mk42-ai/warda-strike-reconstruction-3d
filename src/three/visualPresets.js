// ============================================================================
//  visualPresets — cinematic look grades for the UAE defensive command-center
//  presentation surface. Protective / resilience framing only (no strike UI).
//  Each preset retargets sun clock, sky/fog grade, exposure, bloom, key/fill/rim
//  studio lights, and material multipliers so the Cesium theatre + Three.js
//  inspector share one coherent grade.
// ============================================================================

export const STORAGE_KEY = 'uae-defensive-cc-visual-v1';

/** Stakeholder-default visual state (Night Ops cyan-steel). */
export function defaultVisualState() {
  return {
    // --- time-of-day / grade ---
    preset: 'nightOps',
    quality: 'stakeholder', // 'stakeholder' | 'performance'

    // --- camera (Three inspector + Cesium frustum hint) ---
    fov: 42,
    targetHeight: 0,
    autoOrbit: true,
    orbitSpeed: 0.45,

    // --- exposure / tone ---
    exposure: 1.05,
    aces: true,

    // --- environment / HDRI ---
    envIntensity: 1.15,
    envRotation: 0.35, // radians
    envBackground: false, // reflections-only by default (HUD chrome keeps bg)

    // --- fog ---
    fogEnabled: true,
    fogDensity: 0.045,
    fogColor: '#0a1628',

    // --- key / fill / rim (Three studio formers) ---
    keyColor: '#c8e7ff',
    keyIntensity: 2.4,
    keyX: 4.2,
    keyY: 6.5,
    keyZ: 3.8,
    keyCastShadow: true,

    fillColor: '#1a3a55',
    fillIntensity: 0.85,

    rimColor: '#5eead4',
    rimIntensity: 1.55,
    rimX: -5.2,
    rimY: 1.4,
    rimZ: -4.6,

    // --- materials (global multipliers on MeshStandardMaterial) ---
    roughnessMul: 1.0,
    metalnessMul: 1.0,
    envMapIntensityMul: 1.0,
    emissiveMul: 1.15, // city / accent lights at night

    // --- shadows ---
    shadows: true,
    shadowMapSize: 2048,
    shadowBias: -0.00018,

    // --- post ---
    bloomEnabled: true,
    bloomIntensity: 1.05,
    bloomThreshold: 0.58,
    bloomRadius: 0.55, // mapped to luminanceSmoothing / kernel

    ssaoEnabled: true,
    ssaoIntensity: 3.0,
    ssaoRadius: 0.28,

    smaaEnabled: true,

    // --- Cesium globe grade (shared with theatre) ---
    cesiumClockIso: '2025-06-21T18:40:00Z', // Gulf evening → cool night ops
    cesiumFogDensity: 0.00016,
    cesiumFogColor: '#071018',
    cesiumSunIntensity: 1.35,
    cesiumAtmosphere: 12.0,
    cesiumBloomContrast: 128,
    cesiumBloomBrightness: -0.15,
    cesiumBloomSigma: 2.8,
    cesiumAoIntensity: 3.0,
    cesiumShadowDarkness: 0.42,
    cesiumShadowSize: 2048,
  };
}

/**
 * Named presentation grades. Each returns a partial state merged onto defaults.
 * Framing is protective: Night Ops, Golden Hour Resilience, Briefing Studio, Overcast.
 */
export const PRESETS = {
  nightOps: {
    label: 'Night Ops (cyan-steel)',
    description: 'Cool cyan/steel night operations grade — resilience overwatch.',
    values: {
      preset: 'nightOps',
      exposure: 1.05,
      envIntensity: 1.2,
      envRotation: 0.4,
      fogEnabled: true,
      fogDensity: 0.048,
      fogColor: '#0a1628',
      keyColor: '#c8e7ff',
      keyIntensity: 2.35,
      fillColor: '#12263a',
      fillIntensity: 0.9,
      rimColor: '#5eead4',
      rimIntensity: 1.7,
      emissiveMul: 1.35,
      bloomIntensity: 1.15,
      bloomThreshold: 0.55,
      ssaoIntensity: 3.1,
      cesiumClockIso: '2025-06-21T18:45:00Z',
      cesiumFogDensity: 0.00018,
      cesiumFogColor: '#071018',
      cesiumSunIntensity: 1.25,
      cesiumAtmosphere: 10.5,
      cesiumBloomContrast: 140,
      cesiumBloomBrightness: -0.12,
      cesiumAoIntensity: 3.2,
      cesiumShadowDarkness: 0.48,
    },
  },
  goldenHour: {
    label: 'Golden Hour Resilience',
    description: 'Warm amber desert resilience — long cinematic shadows.',
    values: {
      preset: 'goldenHour',
      exposure: 1.2,
      envIntensity: 1.35,
      envRotation: -0.55,
      fogEnabled: true,
      fogDensity: 0.028,
      fogColor: '#2a1c10',
      keyColor: '#ffd09a',
      keyIntensity: 3.1,
      keyX: 6.5,
      keyY: 3.2,
      keyZ: -2.0,
      fillColor: '#4a3420',
      fillIntensity: 0.7,
      rimColor: '#ffb04a',
      rimIntensity: 1.25,
      emissiveMul: 0.55,
      bloomIntensity: 0.85,
      bloomThreshold: 0.68,
      ssaoIntensity: 2.6,
      cesiumClockIso: '2025-06-21T13:15:00Z', // ~17:15 GST golden hour
      cesiumFogDensity: 0.00010,
      cesiumFogColor: '#2a180c',
      cesiumSunIntensity: 3.4,
      cesiumAtmosphere: 22.0,
      cesiumBloomContrast: 110,
      cesiumBloomBrightness: -0.22,
      cesiumAoIntensity: 2.6,
      cesiumShadowDarkness: 0.38,
    },
  },
  briefingStudio: {
    label: 'Briefing Studio',
    description: 'Controlled studio formers — stakeholder presentation grade.',
    values: {
      preset: 'briefingStudio',
      exposure: 1.12,
      envIntensity: 1.0,
      envRotation: 0.1,
      fogEnabled: true,
      fogDensity: 0.022,
      fogColor: '#101820',
      keyColor: '#fff4e8',
      keyIntensity: 2.7,
      keyX: 3.5,
      keyY: 7.0,
      keyZ: 4.0,
      fillColor: '#2a4050',
      fillIntensity: 1.05,
      rimColor: '#d4af37',
      rimIntensity: 1.35,
      emissiveMul: 0.9,
      bloomIntensity: 0.75,
      bloomThreshold: 0.7,
      ssaoIntensity: 2.9,
      cesiumClockIso: '2025-06-21T08:00:00Z',
      cesiumFogDensity: 0.00009,
      cesiumFogColor: '#0c141c',
      cesiumSunIntensity: 2.8,
      cesiumAtmosphere: 16.0,
      cesiumBloomContrast: 100,
      cesiumBloomBrightness: -0.25,
      cesiumAoIntensity: 2.8,
      cesiumShadowDarkness: 0.32,
    },
  },
  overcast: {
    label: 'Overcast',
    description: 'Soft overcast fill — even read for residual-risk review.',
    values: {
      preset: 'overcast',
      exposure: 1.0,
      envIntensity: 0.95,
      envRotation: 0.0,
      fogEnabled: true,
      fogDensity: 0.055,
      fogColor: '#1a222c',
      keyColor: '#d0d8e0',
      keyIntensity: 1.55,
      keyY: 8.0,
      fillColor: '#3a4550',
      fillIntensity: 1.35,
      rimColor: '#8aa0b0',
      rimIntensity: 0.65,
      emissiveMul: 0.7,
      bloomIntensity: 0.45,
      bloomThreshold: 0.78,
      ssaoIntensity: 2.2,
      cesiumClockIso: '2025-01-15T07:30:00Z',
      cesiumFogDensity: 0.00022,
      cesiumFogColor: '#1a222c',
      cesiumSunIntensity: 1.6,
      cesiumAtmosphere: 8.0,
      cesiumBloomContrast: 90,
      cesiumBloomBrightness: -0.3,
      cesiumAoIntensity: 2.1,
      cesiumShadowDarkness: 0.28,
    },
  },
};

export function applyPreset(state, presetId) {
  const p = PRESETS[presetId];
  if (!p) return state;
  return { ...state, ...p.values, preset: presetId };
}

export function loadPersistedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultVisualState();
    const parsed = JSON.parse(raw);
    return { ...defaultVisualState(), ...parsed };
  } catch (_) {
    return defaultVisualState();
  }
}

export function persistState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (_) { /* quota / private mode */ }
}

/** Quality preset toggles (stakeholder = full cinematic, performance = lean). */
export function qualityOverrides(quality) {
  if (quality === 'performance') {
    return {
      quality: 'performance',
      shadowMapSize: 1024,
      ssaoEnabled: false,
      smaaEnabled: true,
      bloomIntensity: 0.7,
      cesiumShadowSize: 1024,
      envBackground: false,
    };
  }
  return {
    quality: 'stakeholder',
    shadowMapSize: 2048,
    ssaoEnabled: true,
    smaaEnabled: true,
    cesiumShadowSize: 2048,
  };
}
