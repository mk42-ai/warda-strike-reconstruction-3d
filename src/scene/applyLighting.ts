// ============================================================================
//  applyLighting.ts — applies every constant from src/config/lightingConfig.ts
//  to a live Cesium Scene.
//
//  Called from CesiumScene._initViewer() (the existing viewer bootstrap) — this
//  is NOT a parallel entry point, it is a helper the existing scene invokes.
//
//  Every individual knob is feature-detected and try/guarded: an unsupported
//  GPU/context must no-op that one knob, never abort scene construction. That
//  hardening pattern already existed in CesiumScene.js and is preserved here.
// ============================================================================
import * as CesiumNS from 'cesium';
import {
  ENABLE_HDR, TONEMAPPER, EXPOSURE, SCENE_GAMMA,
  SUN_DIRECTION_ENU, SUN_REFERENCE_LONLAT, SUN_INTENSITY, SUN_COLOR_CSS,
  GLOBE_ENABLE_LIGHTING, GLOBE_DYNAMIC_ATMOSPHERE_LIGHTING,
  GLOBE_DYNAMIC_ATMOSPHERE_LIGHTING_FROM_SUN, GLOBE_SHOW_GROUND_ATMOSPHERE,
  GLOBE_ATMOSPHERE_LIGHT_INTENSITY,
  GROUND_ATMOSPHERE_HUE_SHIFT, GROUND_ATMOSPHERE_SATURATION_SHIFT,
  GROUND_ATMOSPHERE_BRIGHTNESS_SHIFT,
  GLOBE_LIGHTING_FADE_OUT_DISTANCE, GLOBE_LIGHTING_FADE_IN_DISTANCE,
  GLOBE_NIGHT_FADE_OUT_DISTANCE, GLOBE_NIGHT_FADE_IN_DISTANCE,
  GLOBE_BASE_COLOR_CSS, GLOBE_MAX_SCREEN_SPACE_ERROR,
  SKY_ATMOSPHERE_SHOW, SKY_ATMOSPHERE_LIGHT_INTENSITY,
  SKY_ATMOSPHERE_HUE_SHIFT, SKY_ATMOSPHERE_SATURATION_SHIFT,
  SKY_ATMOSPHERE_BRIGHTNESS_SHIFT,
  FOG_ENABLED, FOG_DENSITY, FOG_MINIMUM_BRIGHTNESS, FOG_SCREEN_SPACE_ERROR_FACTOR,
  ENABLE_BRIGHTNESS_STAGE, BRIGHTNESS_STAGE_AMOUNT,
  AO_ENABLED, AO_INTENSITY, AO_BIAS, AO_LENGTH_CAP, AO_STEP_SIZE, AO_BLUR_STEP_SIZE,
  BLOOM_ENABLED, BLOOM_BRIGHTNESS, BLOOM_CONTRAST, BLOOM_DELTA, BLOOM_SIGMA, BLOOM_STEP_SIZE,
  SHADOWS_ENABLED, SHADOW_SOFT, SHADOW_MAP_SIZE, SHADOW_DARKNESS, SHADOW_MAXIMUM_DISTANCE,
  MSAA_SAMPLES, FXAA_ENABLED,
  IBL_LUMINANCE_AT_ZENITH, IBL_FACTOR,
} from '../config/lightingConfig';

const C: any = CesiumNS;

/** Result of an apply pass — surfaced for debugging/telemetry. */
export interface LightingApplyReport {
  applied: string[];
  skipped: string[];
}

/**
 * Convert the configured local East-North-Up sun vector into an ECEF direction
 * suitable for `DirectionalLight.direction`.
 *
 * `SUN_DIRECTION_ENU` points TOWARD the sun; a DirectionalLight wants the
 * direction the light TRAVELS, so the result is negated.
 */
export function buildSunDirectionEcef(): any {
  const [lon, lat] = SUN_REFERENCE_LONLAT;
  const origin = C.Cartesian3.fromDegrees(lon, lat, 0.0);
  const enuToFixed = C.Transforms.eastNorthUpToFixedFrame(origin);
  const rot = C.Matrix4.getMatrix3(enuToFixed, new C.Matrix3());
  const enu = new C.Cartesian3(
    SUN_DIRECTION_ENU[0], SUN_DIRECTION_ENU[1], SUN_DIRECTION_ENU[2],
  );
  const towardSun = C.Matrix3.multiplyByVector(rot, enu, new C.Cartesian3());
  C.Cartesian3.normalize(towardSun, towardSun);
  // light travels FROM the sun toward the scene
  return C.Cartesian3.negate(towardSun, new C.Cartesian3());
}

/**
 * Build the shared ImageBasedLighting instance used by every GLB model.
 *
 * IMPORTANT (verified against the pinned Cesium 1.122 bundle): `Scene` has NO
 * `imageBasedLighting` property — only `Model` and `Cesium3DTileset` do. The
 * previous code guarded on `'imageBasedLighting' in scene`, which is always
 * false, so `luminanceAtZenith` was silently never applied. Handing this object
 * to each model is what actually makes ambient fill work.
 */
export function createSharedImageBasedLighting(): any {
  try {
    const ibl = new C.ImageBasedLighting();
    ibl.imageBasedLightingFactor = new C.Cartesian2(IBL_FACTOR[0], IBL_FACTOR[1]);
    if ('luminanceAtZenith' in ibl) ibl.luminanceAtZenith = IBL_LUMINANCE_AT_ZENITH;
    return ibl;
  } catch (_) {
    return undefined;
  }
}

/**
 * Apply the full lighting/brightness grade to a live scene.
 * Safe to call more than once (mode switches re-assert it).
 */
export function applyLighting(scene: any, viewer?: any): LightingApplyReport {
  const applied: string[] = [];
  const skipped: string[] = [];
  const step = (name: string, fn: () => void) => {
    try { fn(); applied.push(name); } catch (_) { skipped.push(name); }
  };

  if (!scene) return { applied, skipped: ['scene-missing'] };

  // ── HDR + AA ─────────────────────────────────────────────────────────────
  step('highDynamicRange', () => {
    if (scene.highDynamicRangeSupported !== false) scene.highDynamicRange = ENABLE_HDR;
  });
  step('msaa', () => {
    scene.msaaSamples = scene.msaaSupported !== false ? MSAA_SAMPLES : 1;
  });
  step('fxaa', () => {
    if (scene.postProcessStages?.fxaa) scene.postProcessStages.fxaa.enabled = FXAA_ENABLED;
  });

  // ── Tonemapper + exposure + gamma (the three biggest brightness levers) ──
  step('tonemapper', () => {
    const enumRef = C.Tonemapper;
    const pps = scene.postProcessStages;
    if (enumRef && pps && 'tonemapper' in pps && enumRef[TONEMAPPER] !== undefined) {
      pps.tonemapper = enumRef[TONEMAPPER];
    }
  });
  step('exposure', () => {
    const pps = scene.postProcessStages;
    if (pps && 'exposure' in pps) pps.exposure = EXPOSURE;
  });
  step('gamma', () => { scene.gamma = SCENE_GAMMA; });

  // ── Directional sun ──────────────────────────────────────────────────────
  step('directionalLight', () => {
    scene.light = new C.DirectionalLight({
      direction: buildSunDirectionEcef(),
      color: C.Color.fromCssColorString(SUN_COLOR_CSS),
      intensity: SUN_INTENSITY,
    });
  });
  step('sunMoon', () => {
    if (scene.sun) scene.sun.show = true;
    if (scene.moon) scene.moon.show = false;
  });

  // ── Globe ────────────────────────────────────────────────────────────────
  const globe = scene.globe;
  if (globe) {
    step('globe.enableLighting', () => { globe.enableLighting = GLOBE_ENABLE_LIGHTING; });
    step('globe.dynamicAtmosphereLighting', () => {
      globe.dynamicAtmosphereLighting = GLOBE_DYNAMIC_ATMOSPHERE_LIGHTING;
      globe.dynamicAtmosphereLightingFromSun = GLOBE_DYNAMIC_ATMOSPHERE_LIGHTING_FROM_SUN;
    });
    step('globe.groundAtmosphere', () => {
      globe.showGroundAtmosphere = GLOBE_SHOW_GROUND_ATMOSPHERE;
      globe.atmosphereLightIntensity = GLOBE_ATMOSPHERE_LIGHT_INTENSITY;
      globe.atmosphereHueShift = GROUND_ATMOSPHERE_HUE_SHIFT;
      globe.atmosphereSaturationShift = GROUND_ATMOSPHERE_SATURATION_SHIFT;
      globe.atmosphereBrightnessShift = GROUND_ATMOSPHERE_BRIGHTNESS_SHIFT;
    });
    step('globe.fadeDistances', () => {
      // out < in is REQUIRED; the inverted pair used previously produced a
      // negative fade denominator (unlit far terrain, over-shaded near terrain)
      globe.lightingFadeOutDistance = GLOBE_LIGHTING_FADE_OUT_DISTANCE;
      globe.lightingFadeInDistance = GLOBE_LIGHTING_FADE_IN_DISTANCE;
      globe.nightFadeOutDistance = GLOBE_NIGHT_FADE_OUT_DISTANCE;
      globe.nightFadeInDistance = GLOBE_NIGHT_FADE_IN_DISTANCE;
    });
    step('globe.baseColor', () => {
      globe.baseColor = C.Color.fromCssColorString(GLOBE_BASE_COLOR_CSS);
    });
    step('globe.sse', () => {
      globe.maximumScreenSpaceError = GLOBE_MAX_SCREEN_SPACE_ERROR;
    });
  }

  // ── Sky atmosphere ───────────────────────────────────────────────────────
  step('skyAtmosphere', () => {
    const sky = scene.skyAtmosphere;
    if (!sky) return;
    sky.show = SKY_ATMOSPHERE_SHOW;
    sky.atmosphereLightIntensity = SKY_ATMOSPHERE_LIGHT_INTENSITY;
    sky.hueShift = SKY_ATMOSPHERE_HUE_SHIFT;
    sky.saturationShift = SKY_ATMOSPHERE_SATURATION_SHIFT;
    sky.brightnessShift = SKY_ATMOSPHERE_BRIGHTNESS_SHIFT;
  });

  // ── Fog (minimumBrightness is the anti-crush floor) ──────────────────────
  step('fog', () => {
    const fog = scene.fog;
    if (!fog) return;
    fog.enabled = FOG_ENABLED;
    fog.density = FOG_DENSITY;
    fog.screenSpaceErrorFactor = FOG_SCREEN_SPACE_ERROR_FACTOR;
    if ('minimumBrightness' in fog) fog.minimumBrightness = FOG_MINIMUM_BRIGHTNESS;
  });

  // ── Post-process brightness stage ────────────────────────────────────────
  // createBrightnessStage()'s shader is mix(vec3(0.0), rgb, brightness) — a
  // MULTIPLY whose factory default is 0.5. Adding it without overriding the
  // uniform would HALVE the scene, so the uniform is always written here.
  step('brightnessStage', () => {
    if (!ENABLE_BRIGHTNESS_STAGE) return;
    const pps = scene.postProcessStages;
    const lib = C.PostProcessStageLibrary;
    if (!pps || !lib?.createBrightnessStage) return;
    if ((scene as any).__brightnessStage) {
      (scene as any).__brightnessStage.uniforms.brightness = BRIGHTNESS_STAGE_AMOUNT;
      return;
    }
    const stage = lib.createBrightnessStage();
    stage.uniforms.brightness = BRIGHTNESS_STAGE_AMOUNT;
    stage.enabled = true;
    pps.add(stage);
    (scene as any).__brightnessStage = stage;
  });

  // ── Ambient occlusion ────────────────────────────────────────────────────
  step('ambientOcclusion', () => {
    const ao = scene.postProcessStages?.ambientOcclusion;
    if (!ao) return;
    ao.enabled = AO_ENABLED;
    if (ao.uniforms) {
      ao.uniforms.intensity = AO_INTENSITY;
      ao.uniforms.bias = AO_BIAS;
      ao.uniforms.lengthCap = AO_LENGTH_CAP;
      ao.uniforms.stepSize = AO_STEP_SIZE;
      ao.uniforms.blurStepSize = AO_BLUR_STEP_SIZE;
    }
  });

  // ── Bloom ────────────────────────────────────────────────────────────────
  step('bloom', () => {
    const bloom = scene.postProcessStages?.bloom;
    if (!bloom) return;
    bloom.enabled = BLOOM_ENABLED;
    bloom.uniforms.glowOnly = false;
    bloom.uniforms.brightness = BLOOM_BRIGHTNESS;
    bloom.uniforms.contrast = BLOOM_CONTRAST;
    bloom.uniforms.delta = BLOOM_DELTA;
    bloom.uniforms.sigma = BLOOM_SIGMA;
    bloom.uniforms.stepSize = BLOOM_STEP_SIZE;
  });

  // ── Shadows (darkness is a LIGHT FLOOR, higher = brighter shadow side) ───
  step('shadowMap', () => {
    const sm = scene.shadowMap;
    if (!sm) return;
    sm.enabled = SHADOWS_ENABLED;
    sm.softShadows = SHADOW_SOFT;
    sm.size = SHADOW_MAP_SIZE;
    sm.darkness = SHADOW_DARKNESS;
    sm.maximumDistance = SHADOW_MAXIMUM_DISTANCE;
    if ('normalOffset' in sm) sm.normalOffset = true;
    if ('fadingEnabled' in sm) sm.fadingEnabled = true;
  });

  try { scene.requestRender?.(); } catch (_) { /* continuous mode: not needed */ }
  return { applied, skipped };
}

export default applyLighting;
