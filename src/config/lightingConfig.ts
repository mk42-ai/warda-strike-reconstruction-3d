// ============================================================================
//  lightingConfig.ts — SINGLE SOURCE OF TRUTH for every lighting/brightness
//  tunable in the IMP-08 Cesium theatre.
//
//  Rule for this file: nothing numeric about lighting may be hardcoded at a
//  call site. Import the constant from here instead, so the whole look can be
//  re-graded from one place.
//
//  ── WHY THE SCENE READ MURKY BEFORE (measured against Cesium 1.122) ────────
//  Findings below come from reading the pinned engine bundle + its GLSL, not
//  from documentation. They drive the defaults chosen here:
//
//   1. ACES tonemapping was forced on. Cesium 1.122's own default is
//      PBR_NEUTRAL. Through the HDR gamma round-trip ACES maps white 1.00 ->
//      0.818 and mid-grey 0.50 -> 0.437, so the scene could never reach white.
//      => TONEMAPPER defaults to PBR_NEUTRAL.
//   2. `postProcessStages.exposure` was never set (it exists and defaults to
//      1.0). It is the most direct exposure control in the engine.
//      => EXPOSURE lifts it.
//   3. `scene.light.intensity` is a NO-OP FOR THE GLOBE. UniformState packs
//      colour*intensity into `czm_lightColor` and renormalises when any
//      component exceeds 1, so white x 3.0 collapses back to (1,1,1). Models
//      read the UNNORMALISED `czm_lightColorHdr`, so intensity DOES affect
//      glTF assets. Globe brightness therefore has to come from imagery
//      brightness/gamma + exposure + tonemapper, NOT from sun intensity.
//   4. `scene.imageBasedLighting` DOES NOT EXIST on Scene in 1.122 (only on
//      Model and Cesium3DTileset). `luminanceAtZenith` must be applied to an
//      ImageBasedLighting instance handed to each model — see IBL_* below.
//   5. `createBrightnessStage()` ships with brightness = 0.5, and its shader is
//      `mix(vec3(0.0), rgb, brightness)` — i.e. a MULTIPLY. Adding that stage
//      without overriding the uniform HALVES the scene. Any value < 1.0
//      darkens; > 1.0 brightens.
//      => BRIGHTNESS_STAGE_AMOUNT is deliberately > 1.0.
//   6. `globe.lightingFadeOutDistance/InDistance` had been set to 40 km / 20 km
//      — inverted relative to the engine defaults (out ~10^7 > in), which makes
//      the fade denominator negative. Restored to the correct ordering.
// ============================================================================

// ── Master switches ────────────────────────────────────────────────────────

/** HDR render targets. Required for tonemapping to run at all. */
export const ENABLE_HDR = true;

/**
 * Cesium `Tonemapper` enum NAME (resolved against the Cesium namespace at the
 * call site so this config stays import-free and side-effect-free).
 * PBR_NEUTRAL preserves midtones and highlights; ACES visibly crushes both.
 */
export const TONEMAPPER: 'PBR_NEUTRAL' | 'ACES' | 'FILMIC' | 'REINHARD' | 'MODIFIED_REINHARD' =
  'PBR_NEUTRAL';

/**
 * `scene.postProcessStages.exposure`. Engine default 1.0. Applied BEFORE the
 * tonemap curve, so it is the cleanest way to open the scene up.
 */
export const EXPOSURE = 1.55;

/**
 * `scene.gamma`. Engine default 2.2. Slightly lower => brighter midtones.
 */
export const SCENE_GAMMA = 2.05;

// ── Sun / directional light ────────────────────────────────────────────────
//
// Derived from the scene's own pinned clock (2025-06-21T09:30:00Z) at the
// Al Warqa impact site: solar ELEVATION 74.02 deg, AZIMUTH 267.38 deg measured
// clockwise from north. This matches the Blender sun that the GLB proxies were
// authored against, so model shading and globe shading agree.

/** Solar elevation above the horizon, degrees. */
export const SUN_ELEVATION_DEG = 74.02;

/** Solar azimuth, degrees clockwise from north. */
export const SUN_AZIMUTH_DEG = 267.38;

/**
 * Unit vector pointing FROM the scene TOWARD the sun, in local East-North-Up
 * at the impact site. Cesium's DirectionalLight wants the direction the light
 * TRAVELS, i.e. the negation of this — `buildSunDirectionEcef()` in
 * applyLighting handles that conversion into ECEF.
 */
export const SUN_DIRECTION_ENU: readonly [number, number, number] = [
  -0.275024, -0.012592, 0.961355,
];

/** Anchor used to convert the ENU sun vector into world/ECEF coordinates. */
export const SUN_REFERENCE_LONLAT: readonly [number, number] = [55.4045442, 25.1857908];

/**
 * `DirectionalLight.intensity`. NOTE (finding 3 above): this scales glTF model
 * lighting via czm_lightColorHdr but is renormalised away for the globe.
 */
export const SUN_INTENSITY = 3.2;

/** `DirectionalLight.color` as CSS. Very slightly warm midday key. */
export const SUN_COLOR_CSS = '#fff6e8';

// ── Globe lighting ─────────────────────────────────────────────────────────

export const GLOBE_ENABLE_LIGHTING = true;
export const GLOBE_DYNAMIC_ATMOSPHERE_LIGHTING = true;
export const GLOBE_DYNAMIC_ATMOSPHERE_LIGHTING_FROM_SUN = true;
export const GLOBE_SHOW_GROUND_ATMOSPHERE = true;

/** `globe.atmosphereLightIntensity`. Engine default 10. */
export const GLOBE_ATMOSPHERE_LIGHT_INTENSITY = 22.0;

/** Ground-atmosphere colour grade. Positive brightness shift lifts terrain. */
export const GROUND_ATMOSPHERE_HUE_SHIFT = 0.0;
export const GROUND_ATMOSPHERE_SATURATION_SHIFT = 0.08;
export const GROUND_ATMOSPHERE_BRIGHTNESS_SHIFT = 0.25;

/**
 * Fade distances MUST satisfy out < in (engine defaults are ~6.5e6 / 9.0e6).
 * The previous 40 km / 20 km pair was inverted and produced a negative fade
 * denominator, unlit far terrain and over-shaded near terrain.
 */
export const GLOBE_LIGHTING_FADE_OUT_DISTANCE = 6_500_000.0;
export const GLOBE_LIGHTING_FADE_IN_DISTANCE = 9_000_000.0;
export const GLOBE_NIGHT_FADE_OUT_DISTANCE = 10_000_000.0;
export const GLOBE_NIGHT_FADE_IN_DISTANCE = 40_000_000.0;

/**
 * Colour shown where imagery tiles have not streamed in yet. The old value
 * (#0b1424) is near-black and was a major contributor to the "murky" read.
 */
export const GLOBE_BASE_COLOR_CSS = '#5a6472';

/** Thermal/IR mode swaps to a deliberately dark globe. */
export const GLOBE_BASE_COLOR_THERMAL_CSS = '#0a0a0a';

/** `globe.maximumScreenSpaceError`. Engine default 2. */
export const GLOBE_MAX_SCREEN_SPACE_ERROR = 2.0;

// ── Image-based lighting (applies to MODELS, not Scene — see finding 4) ────

/**
 * `ImageBasedLighting.luminanceAtZenith`. Engine default 0.2, which leaves
 * unlit model faces very dark. Raised so shadowed geometry still reads.
 */
export const IBL_LUMINANCE_AT_ZENITH = 0.55;

/** `ImageBasedLighting.imageBasedLightingFactor` (diffuse, specular). */
export const IBL_FACTOR: readonly [number, number] = [1.0, 1.0];

/**
 * Per-model `lightColor` (czm_lightColorHdr override). > 1 brightens the GLB
 * assets without touching the globe.
 */
export const MODEL_LIGHT_COLOR: readonly [number, number, number] = [2.1, 2.1, 2.1];

// ── Atmosphere + fog ───────────────────────────────────────────────────────

export const SKY_ATMOSPHERE_SHOW = true;

/** `skyAtmosphere.atmosphereLightIntensity`. Engine default 50. */
export const SKY_ATMOSPHERE_LIGHT_INTENSITY = 42.0;

export const SKY_ATMOSPHERE_HUE_SHIFT = 0.0;
export const SKY_ATMOSPHERE_SATURATION_SHIFT = 0.05;
export const SKY_ATMOSPHERE_BRIGHTNESS_SHIFT = 0.18;

export const FOG_ENABLED = true;

/** `fog.density`. Engine default 2e-4. Lower => less haze over the corridor. */
export const FOG_DENSITY = 0.00010;

/**
 * `fog.minimumBrightness`. Engine default 0.03 — that floor is what lets
 * distant terrain crush to near-black. Raised substantially.
 */
export const FOG_MINIMUM_BRIGHTNESS = 0.14;

export const FOG_SCREEN_SPACE_ERROR_FACTOR = 4.0;

// ── Base imagery layer grade ───────────────────────────────────────────────
// ImageryLayer defaults are all 1.0. Gamma < 1 brightens (it is applied as a
// power curve), brightness/contrast/saturation are straight multipliers.

export const IMAGERY_BRIGHTNESS = 1.22;
export const IMAGERY_GAMMA = 0.88;
export const IMAGERY_CONTRAST = 1.08;
export const IMAGERY_SATURATION = 1.12;

/** The tactical dark basemap is meant to stay dark — graded separately. */
export const IMAGERY_DARK_BRIGHTNESS = 1.06;
export const IMAGERY_DARK_GAMMA = 1.0;
export const IMAGERY_DARK_CONTRAST = 1.12;
export const IMAGERY_DARK_SATURATION = 0.92;

// ── Post-process brightness stage ──────────────────────────────────────────

export const ENABLE_BRIGHTNESS_STAGE = true;

/**
 * Uniform for `PostProcessStageLibrary.createBrightnessStage()`.
 * Shader is `mix(vec3(0.0), rgb, brightness)` => a pure multiply.
 * The factory default is 0.5 (HALVES the scene). Keep this ABOVE 1.0.
 */
export const BRIGHTNESS_STAGE_AMOUNT = 1.18;

// ── Ambient occlusion / bloom / shadows (kept, but re-balanced) ────────────

export const AO_ENABLED = true;
/** AO composite is `ao * color`, so intensity is a global darkener. */
export const AO_INTENSITY = 2.3;
export const AO_BIAS = 0.1;
export const AO_LENGTH_CAP = 0.26;
export const AO_STEP_SIZE = 1.95;
export const AO_BLUR_STEP_SIZE = 0.86;

export const BLOOM_ENABLED = true;
export const BLOOM_BRIGHTNESS = -0.05;
export const BLOOM_CONTRAST = 128;
export const BLOOM_DELTA = 1.0;
export const BLOOM_SIGMA = 2.6;
export const BLOOM_STEP_SIZE = 1.0;
/** Impact-flash spike, restored afterwards. */
export const BLOOM_BRIGHTNESS_IMPACT = 0.9;
export const BLOOM_BRIGHTNESS_THERMAL = 0.25;

export const SHADOWS_ENABLED = true;
export const SHADOW_SOFT = true;
export const SHADOW_MAP_SIZE = 2048;
/**
 * `shadowMap.darkness` is a LIGHT FLOOR in the GLSL
 * (`visibility = max(visibility, darkness)`), not a darkener. Higher = the
 * shadowed side stays brighter. Engine default 0.3.
 */
export const SHADOW_DARKNESS = 0.42;
export const SHADOW_MAXIMUM_DISTANCE = 8000.0;

// ── Anti-aliasing ──────────────────────────────────────────────────────────

export const MSAA_SAMPLES = 4;
export const FXAA_ENABLED = true;

/** Grouped export for convenience/debugging. */
export const lightingConfig = {
  ENABLE_HDR,
  TONEMAPPER,
  EXPOSURE,
  SCENE_GAMMA,
  SUN_ELEVATION_DEG,
  SUN_AZIMUTH_DEG,
  SUN_DIRECTION_ENU,
  SUN_REFERENCE_LONLAT,
  SUN_INTENSITY,
  SUN_COLOR_CSS,
  GLOBE_ATMOSPHERE_LIGHT_INTENSITY,
  GLOBE_BASE_COLOR_CSS,
  IBL_LUMINANCE_AT_ZENITH,
  MODEL_LIGHT_COLOR,
  FOG_MINIMUM_BRIGHTNESS,
  IMAGERY_BRIGHTNESS,
  IMAGERY_GAMMA,
  BRIGHTNESS_STAGE_AMOUNT,
} as const;

export default lightingConfig;
