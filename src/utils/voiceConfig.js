/**
 * Persist OPEN-THE-NET / AVM voice-config across sandbox / Vercel preview
 * hosts. Session ids and last-known health are stored in localStorage so a
 * copied preview URL does not silently drop a working voice channel.
 *
 * Never stores API keys. Defensive reconstruction only.
 */
export const VOICE_CONFIG_KEY = 'warda-sentinel-voice-config-v1';

const DEFAULT = {
  lastSessionId: null,
  lastWorkflowId: null,
  lastEndpointId: null,
  lastOpenedAt: null,
  preferredLang: 'en-US',
};

export function loadVoiceConfig() {
  try {
    const raw = localStorage.getItem(VOICE_CONFIG_KEY);
    if (!raw) return { ...DEFAULT };
    const parsed = JSON.parse(raw);
    return { ...DEFAULT, ...parsed };
  } catch {
    return { ...DEFAULT };
  }
}

export function saveVoiceConfig(partial) {
  try {
    const next = { ...loadVoiceConfig(), ...partial, lastOpenedAt: Date.now() };
    localStorage.setItem(VOICE_CONFIG_KEY, JSON.stringify(next));
    return next;
  } catch {
    return loadVoiceConfig();
  }
}

export function clearVoiceConfig() {
  try {
    localStorage.removeItem(VOICE_CONFIG_KEY);
  } catch {
    /* private mode */
  }
}
