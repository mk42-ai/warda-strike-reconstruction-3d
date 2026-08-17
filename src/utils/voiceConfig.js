/**
 * Persist OPEN-THE-NET / AVM voice-config and Theatre/SENTINEL checkpoint
 * across sandbox / Vercel preview hosts and tab hide/show.
 *
 * Session ids and last-known health are stored in localStorage so a copied
 * preview URL does not silently drop a working voice channel. Theatre chrome
 * (tab, basemap, layers) is restored so imagery + voice state survive
 * entering / leaving this preview.
 *
 * Never stores API keys. Defensive reconstruction only.
 */
export const VOICE_CONFIG_KEY = 'warda-sentinel-voice-config-v1';
export const THEATRE_CHECKPOINT_KEY = 'warda-sentinel-theatre-checkpoint-v1';

const DEFAULT = {
  lastSessionId: null,
  lastWorkflowId: null,
  lastEndpointId: null,
  lastOpenedAt: null,
  preferredLang: 'en-US',
};

const DEFAULT_THEATRE = {
  activeTab: 'theatre',
  imageryMode: 'satellite',
  layers: { corridor: true, geofence: true, waypoints: true },
  scenarioId: 'baseline_monitor',
  camMode: 'launch',
  thermal: false,
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

export function loadTheatreCheckpoint() {
  try {
    const raw = sessionStorage.getItem(THEATRE_CHECKPOINT_KEY)
      || localStorage.getItem(THEATRE_CHECKPOINT_KEY);
    if (!raw) return { ...DEFAULT_THEATRE };
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_THEATRE,
      ...parsed,
      layers: { ...DEFAULT_THEATRE.layers, ...(parsed.layers || {}) },
    };
  } catch {
    return { ...DEFAULT_THEATRE };
  }
}

export function saveTheatreCheckpoint(partial) {
  try {
    const next = { ...loadTheatreCheckpoint(), ...partial, savedAt: Date.now() };
    const json = JSON.stringify(next);
    sessionStorage.setItem(THEATRE_CHECKPOINT_KEY, json);
    localStorage.setItem(THEATRE_CHECKPOINT_KEY, json);
    return next;
  } catch {
    return loadTheatreCheckpoint();
  }
}

/** Rewrite remote (signed / CORS) TTS URLs through the same-origin AVM proxy. */
export function proxiedAudioUrl(url) {
  if (!url) return url;
  try {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://local';
    const u = new URL(url, origin);
    if (typeof window !== 'undefined' && u.origin === window.location.origin) return url;
    if (/blob\.core\.windows\.net|on-demand\.io|openai\.com|airevprod/i.test(u.hostname)) {
      return `/api/avm/audio?url=${encodeURIComponent(url)}`;
    }
    return url;
  } catch {
    return url;
  }
}

/**
 * Unlock autoplay + AudioContext on a real user gesture (OPEN THE NET).
 * Browsers mute remote audio after a preview hide/restore until resume().
 */
export function unlockPlayback(audioEl) {
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (AC) {
      if (!window.__wardaAC) window.__wardaAC = new AC();
      if (window.__wardaAC.state === 'suspended') {
        window.__wardaAC.resume().catch(() => {});
      }
    }
  } catch {
    /* no AudioContext */
  }
  if (!audioEl) return;
  try {
    audioEl.setAttribute('playsinline', 'true');
    audioEl.crossOrigin = 'anonymous';
    const prev = audioEl.muted;
    audioEl.muted = true;
    const p = audioEl.play();
    if (p && typeof p.then === 'function') {
      p.then(() => {
        audioEl.pause();
        audioEl.muted = prev;
      }).catch(() => {
        audioEl.muted = prev;
      });
    } else {
      audioEl.muted = prev;
    }
  } catch {
    try { audioEl.muted = false; } catch { /* ignore */ }
  }
}

/** Web Speech TTS fallback when remote AVM audio is blocked, expired, or CORS-dead. */
export function speakLocal(text, lang) {
  return new Promise((resolve) => {
    const spoken = String(text || '').trim();
    if (!spoken) {
      resolve(false);
      return;
    }
    const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    if (!synth || typeof window.SpeechSynthesisUtterance !== 'function') {
      resolve(false);
      return;
    }
    try { synth.cancel(); } catch { /* ignore */ }
    try {
      const u = new SpeechSynthesisUtterance(spoken.slice(0, 900));
      u.lang = lang || loadVoiceConfig().preferredLang || 'en-US';
      u.rate = 1.02;
      u.onend = () => resolve(true);
      u.onerror = () => resolve(false);
      synth.speak(u);
    } catch {
      resolve(false);
    }
  });
}

export function cancelLocalSpeech() {
  try {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  } catch {
    /* ignore */
  }
}
