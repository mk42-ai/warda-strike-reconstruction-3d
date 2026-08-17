import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Video, Crosshair, Eye, Map as MapIcon, Plane, Radar, Focus, Navigation,
  Flame, Radio, Shield, Layers, Mic, MicOff, Play, Pause, RotateCcw,
  Clock, Building2, FileText, BookOpen, Globe2, Target, Waypoints, Search,
} from 'lucide-react';
import CesiumScene from './cesium/CesiumScene.js';
import { mountShahedInspector } from './three/Shahed136.js';
import { SHAHED_SPECS } from './utils/geo.js';
import {
  META, IMPACT_SITE, CORRIDOR_ORIGIN, CORRIDOR, GEOFENCE, STATS, CAMERA_MODES,
  analyzeThermal, VIIRS_DETECTIONS, INTEL, IMAGERY,
} from './data/scenario.js';
import { HUD_FRAME } from './brand/assets.js';
import ChatPanel from './chat/ChatPanel.jsx';
import {
  loadVoiceConfig, saveVoiceConfig,
  loadTheatreCheckpoint, saveTheatreCheckpoint,
  unlockPlayback, proxiedAudioUrl, speakLocal, cancelLocalSpeech,
} from './utils/voiceConfig.js';

// Official On Demand lockup — prefer logo_header / logo_dark for dark chrome.
const OD_LOGO_SRC = `${import.meta.env.BASE_URL || '/'}brand/logo-header.png`;
const OD_LOGO_FALLBACK = `${import.meta.env.BASE_URL || '/'}brand/od-logo-black.png`;

const AirevWordmark = ({ className }) => (
  <span className={`airev-wordmark ${className || ''}`}>
    <span className="aw-airev">AIREV</span>
    <span className="aw-sep">|</span>
    <span className="aw-ond">OnDemand</span>
  </span>
);

const OdLogo = ({ className, height }) => (
  <img
    className={className || 'od-logo'}
    src={OD_LOGO_SRC}
    alt="On Demand"
    height={height || 22}
    draggable={false}
    onError={(e) => {
      if (e.currentTarget.src !== OD_LOGO_FALLBACK) e.currentTarget.src = OD_LOGO_FALLBACK;
    }}
  />
);

const TABS = [
  { id: 'theatre', label: 'Theatre', Icon: Globe2 },
  { id: 'timeline', label: 'Timeline', Icon: Clock },
  { id: 'entities', label: 'Entities', Icon: Target },
  { id: 'briefing', label: 'Briefing', Icon: FileText },
  { id: 'sources', label: 'Sources', Icon: BookOpen },
  // OSINT research assistant — defensive/preventive open-source research only.
  { id: 'chat', label: 'Chat', Icon: Search },
];

const Svg = ({ markup, className, style }) => (
  <span className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />
);

// Lucide icons for camera modes (crisp 14–16px strokes)
const CAM_LUCIDE = {
  overview: MapIcon,
  chase: Plane,
  orbital: Navigation,
  cockpit: Focus,
  impact: Crosshair,
  launch: Radar,
  free: Eye,
  tactical: Video,
};

// ---------------------------------------------------------------------------
// LIVE AVM conversation (PRIMARY voice path)
// Workflow: 6a7dc588fc1a4aa90e832ec4  ·  UXE Warda Strike AVM Narrator
// Static MP3 / one-shot TTS briefing is DEMOTED — not the OPEN THE NET path.
// Mic in (Web Speech API) → /api/avm/* proxy → agent turn → spoken reply out.
// ---------------------------------------------------------------------------
const AVM_WORKFLOW_ID = '6a7dc588fc1a4aa90e832ec4';
// Demoted optional clip only (never auto-played; not OPEN THE NET primary).

async function avmApi(path, body) {
  const res = await fetch(path, {
    method: body === undefined ? 'GET' : 'POST',
    headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const ct = (res.headers.get('content-type') || '').toLowerCase();
  let json = null;
  if (ct.includes('application/json')) {
    try { json = await res.json(); } catch (_) { json = null; }
  } else {
    // SPA rewrite / missing middleware served HTML — treat as a missing route,
    // never as a successful health payload (that would skip the API-key check).
    const err = new Error(
      res.ok
        ? 'Voice API returned HTML instead of JSON — /api/avm is not mounted on this host.'
        : `HTTP ${res.status}`,
    );
    err.status = res.status;
    throw err;
  }
  if (!res.ok || (json && json.ok === false)) {
    const msg = (json && (json.error || json.message)) || `HTTP ${res.status}`;
    const err = new Error(msg);
    err.status = res.status;
    err.detail = json;
    throw err;
  }
  return json;
}

function playRemoteAudio(url, audioEl) {
  return new Promise((resolve, reject) => {
    if (!url || !audioEl) {
      resolve(false);
      return;
    }
    const src = proxiedAudioUrl(url);
    const onEnd = () => { cleanup(); resolve(true); };
    const onErr = (e) => { cleanup(); reject(e); };
    const cleanup = () => {
      audioEl.removeEventListener('ended', onEnd);
      audioEl.removeEventListener('error', onErr);
    };
    audioEl.addEventListener('ended', onEnd);
    audioEl.addEventListener('error', onErr);
    try { audioEl.crossOrigin = 'anonymous'; audioEl.setAttribute('playsinline', 'true'); } catch (_) {}
    audioEl.src = src;
    audioEl.load();
    const p = audioEl.play();
    if (p && typeof p.then === 'function') {
      p.catch((e) => { cleanup(); reject(e); });
    }
  });
}

export default function App() {
  const cesiumRef = useRef(null);
  const sceneRef = useRef(null);
  const inspectorRef = useRef(null);
  const audioRef = useRef(null);
  const recognitionRef = useRef(null);
  const sessionIdRef = useRef(null);
  const netOpenRef = useRef(false);
  const listeningRef = useRef(false);
  const processingRef = useRef(false);

  const _ckpt = (() => { try { return loadTheatreCheckpoint(); } catch { return {}; } })();
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [camMode, setCamMode] = useState(_ckpt.camMode || 'launch');
  const [thermal, setThermal] = useState(!!_ckpt.thermal);
  const [activeWp, setActiveWp] = useState(0);
  const [readout, setReadout] = useState(null);
  const [picked, setPicked] = useState(null);
  const [imageryMode, setImageryMode] = useState(_ckpt.imageryMode || 'satellite');   // 'satellite' (ESRI) | 'dark' (Carto)
  const [clock, setClock] = useState('');                        // live UTC clock for the classification banner
  const [layers, setLayers] = useState(_ckpt.layers || { corridor: true, geofence: true, waypoints: true });
  const [scenarioId, setScenarioId] = useState(_ckpt.scenarioId || 'baseline_monitor');
  const [activeTab, setActiveTab] = useState(_ckpt.activeTab || 'theatre');
  // Live AVM net state (primary). voicePlaying kept as alias of net open for CSS.
  const [netOpen, setNetOpen] = useState(false);
  const [voicePhase, setVoicePhase] = useState('idle'); // idle|connecting|speaking|listening|thinking|error
  const [voiceError, setVoiceError] = useState('');
  const [voiceCaption, setVoiceCaption] = useState('');
  const [lastHeard, setLastHeard] = useState('');

  // Illustrative resilience scenario chips (NOT confirmed intelligence)
  const SCENARIOS = [
    { id: 'baseline_monitor', name: 'Baseline monitor', det: 9.9, resp: 23.7, disr: 0.25, rec: 4.5, risk: 0.10 },
    { id: 'sensor_degrade', name: 'Sensor degrade', det: 9.6, resp: 31.6, disr: 0.53, rec: 4.6, risk: 0.28 },
    { id: 'staff_surge', name: 'Staff surge', det: 10.9, resp: 23.0, disr: 0.18, rec: 3.7, risk: 0.13 },
    { id: 'multi_node_lag', name: 'Multi-node lag', det: 16.8, resp: 57.9, disr: 0.83, rec: 8.9, risk: 0.49 },
  ];
  const scenario = SCENARIOS.find((s) => s.id === scenarioId) || SCENARIOS[0];

  const thermalReport = analyzeThermal(VIIRS_DETECTIONS);

  // -- init Cesium + Three inspector ----------------------------------------
  useEffect(() => {
    if (!cesiumRef.current) return;
    let scene = null;
    let insp = null;
    // HARDENING (fix): wrap construction so that even if any single init step
    // throws, sceneRef is still assigned (Play stays functional via the rAF
    // progress driver) and the boot overlay is always cleared — the previous
    // build could throw in the CesiumScene constructor, leaving sceneRef null
    // (Play's optional-chained call no-opped) and the boot screen stuck on.
    try {
      scene = new CesiumScene(cesiumRef.current);
      sceneRef.current = scene;
      scene.onReady(() => setReady(true));
      scene.onPick((p) => setPicked(p));
      // SINGLE source of truth: the scene's authoritative driver loop pushes
      // telemetry + playback state here every frame. React owns NO rAF loop.
      scene.onTick((r, st) => {
        setReadout(r);
        setProgress(r.progress);
        setPlaying((prev) => (prev !== st.playing ? st.playing : prev));
      });
      try {
        const ck = loadTheatreCheckpoint();
        if (ck.imageryMode) scene.setImageryMode(ck.imageryMode);
        if (ck.layers) {
          Object.keys(ck.layers).forEach((name) => scene.setLayer(name, !!ck.layers[name]));
        }
        if (ck.camMode) scene.setCamMode(ck.camMode);
        if (ck.thermal) scene.setThermal(true);
      } catch (_) { /* checkpoint optional */ }
      const r = scene.setProgress(0);
      if (r) setReadout(r);
      setReady(true);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('[App] CesiumScene init failed:', e);
      setReady(true);   // never leave the UI stuck behind the boot overlay
    }

    // hide boot screen immediately after mount (always, even on init error).
    // A long delay left crawlers / first-paint screenshots stuck on
    // "initializing theatre…" even though the globe was already live.
    const boot = document.getElementById('boot-screen');
    if (boot) {
      requestAnimationFrame(() => boot.classList.add('hidden'));
      setTimeout(() => boot.classList.add('hidden'), 280);
    }

    try { if (inspectorRef.current) insp = mountShahedInspector(inspectorRef.current); } catch (_) {}
    return () => {
      try { insp && insp.dispose(); } catch (_) {}
      try { scene && scene.destroy(); } catch (_) {}
    };
  }, []);

  // OPEN THE NET — wide defensive awareness/sensor envelope (illustrative,
  // detection-only — no targeting/weapon semantics). Purely additive: mirrors
  // the EXISTING `netOpen` boolean (already flipped by toggleVoiceBriefing /
  // closeTheNet for the AVM live-voice feature) onto a Cesium visual via
  // setNetEnvelope(), without touching a single line of the voice/AVM logic
  // itself. This is what makes the fifth bottom-bar control ("Open the net")
  // ALSO drive a corridor-envelope visualization, per the task brief.
  useEffect(() => {
    sceneRef.current?.setNetEnvelope(netOpen);
  }, [netOpen]);

  // Persist Theatre/SENTINEL chrome so imagery + voice survive preview hide/restore.
  useEffect(() => {
    saveTheatreCheckpoint({
      activeTab, imageryMode, layers, scenarioId, camMode, thermal,
    });
  }, [activeTab, imageryMode, layers, scenarioId, camMode, thermal]);

  // After tab hide / preview restore: resume AudioContext and Cesium resize
  // so textures and voice are not left muted/blank.
  useEffect(() => {
    const onVis = () => {
      if (document.hidden) return;
      unlockPlayback(audioRef.current);
      try { sceneRef.current?.viewer?.resize(); } catch (_) {}
      try { sceneRef.current?.setImageryMode(imageryMode); } catch (_) {}
    };
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('pageshow', onVis);
    window.addEventListener('focus', onVis);
    return () => {
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('pageshow', onVis);
      window.removeEventListener('focus', onVis);
    };
  }, [imageryMode]);

  // NOTE: There is intentionally NO requestAnimationFrame loop in App. The
  // CesiumScene driver loop is the SINGLE authoritative animation/camera loop;
  // it advances playback, drives the camera, and reports back via onTick().
  // React only flips intent (play/pause), which the driver reads. This removes
  // the prior stacked loops that fought over the camera during the strike.
  const togglePlay = useCallback(() => {
    const on = sceneRef.current?.setPlaying(!playing);
    setPlaying(!!on);
  }, [playing]);

  // ---- Live AVM conversation helpers ------------------------------------
  const stopRecognition = useCallback(() => {
    try {
      const rec = recognitionRef.current;
      if (rec) {
        rec.onresult = null;
        rec.onerror = null;
        rec.onend = null;
        try { rec.stop(); } catch (_) {}
        try { rec.abort(); } catch (_) {}
      }
    } catch (_) {}
    recognitionRef.current = null;
    listeningRef.current = false;
  }, []);

  const stopNetAudio = useCallback(() => {
    try {
      const el = audioRef.current;
      if (el) {
        el.pause();
        el.removeAttribute('src');
        el.load();
      }
    } catch (_) {}
    cancelLocalSpeech();
  }, []);

  const closeTheNet = useCallback(() => {
    netOpenRef.current = false;
    processingRef.current = false;
    stopRecognition();
    stopNetAudio();
    setNetOpen(false);
    setVoicePhase('idle');
    setVoiceError('');
    // keep last captions for after-action review
  }, [stopRecognition, stopNetAudio]);

  const handleUserUtterance = useCallback(async (text) => {
    const sessionId = sessionIdRef.current;
    if (!netOpenRef.current || !sessionId || processingRef.current) return;
    const cleaned = String(text || '').trim();
    if (!cleaned) return;
    processingRef.current = true;
    listeningRef.current = false;
    stopRecognition();
    setLastHeard(cleaned);
    setVoiceCaption(`YOU: ${cleaned}`);
    setVoicePhase('thinking');
    setVoiceError('');
    try {
      const turn = await avmApi('/api/avm/turn', { sessionId, text: cleaned });
      if (!netOpenRef.current) return;
      const answer = (turn && turn.answer) || '';
      setVoiceCaption(answer ? `NET: ${answer}` : 'NET: (no spoken reply)');
      if (netOpenRef.current && answer) {
        setVoicePhase('speaking');
        let played = false;
        if (turn && turn.audioUrl && audioRef.current) {
          try {
            played = await playRemoteAudio(turn.audioUrl, audioRef.current);
          } catch (e) {
            // eslint-disable-next-line no-console
            console.warn('[App] reply audio play failed', e);
          }
        }
        if (!played) {
          await speakLocal(answer);
        }
      }
      if (netOpenRef.current) {
        // resume listening for the next turn
        // startListening is defined below; call via ref pattern after both exist
        processingRef.current = false;
        setVoicePhase('listening');
        // deferred start to avoid race with audio end
        setTimeout(() => {
          if (netOpenRef.current && !processingRef.current) {
            // eslint-disable-next-line no-use-before-define
            startListeningRef.current && startListeningRef.current();
          }
        }, 250);
      }
    } catch (err) {
      processingRef.current = false;
      if (!netOpenRef.current) return;
      setVoicePhase('error');
      setVoiceError(err?.message || 'Agent turn failed');
      // try to resume listening so the net stays open
      setTimeout(() => {
        if (netOpenRef.current) {
          setVoicePhase('listening');
          // eslint-disable-next-line no-use-before-define
          startListeningRef.current && startListeningRef.current();
        }
      }, 800);
    }
  }, [stopRecognition]);

  const startListeningRef = useRef(null);

  const startListening = useCallback(() => {
    if (!netOpenRef.current || processingRef.current) return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setVoiceError('Browser has no SpeechRecognition — type is not available; use Chrome/Edge for mic.');
      setVoicePhase('error');
      return;
    }
    stopRecognition();
    let rec;
    try {
      rec = new SR();
    } catch (e) {
      setVoiceError('Mic recognition unavailable in this browser.');
      setVoicePhase('error');
      return;
    }
    rec.lang = loadVoiceConfig().preferredLang || 'en-US';
    rec.continuous = false;
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onresult = (ev) => {
      try {
        const t = ev?.results?.[0]?.[0]?.transcript || '';
        if (t) handleUserUtterance(t);
      } catch (_) {}
    };
    rec.onerror = (ev) => {
      const code = ev?.error || 'mic_error';
      if (!netOpenRef.current) return;
      if (code === 'no-speech' || code === 'aborted') {
        // quietly restart while net is open
        if (!processingRef.current) {
          setTimeout(() => {
            if (netOpenRef.current && !processingRef.current) startListeningRef.current && startListeningRef.current();
          }, 300);
        }
        return;
      }
      if (code === 'not-allowed' || code === 'service-not-allowed') {
        setVoiceError('Microphone permission denied — allow mic, then OPEN THE NET again.');
        setVoicePhase('error');
        return;
      }
      setVoiceError(`Mic: ${code}`);
      setTimeout(() => {
        if (netOpenRef.current && !processingRef.current) startListeningRef.current && startListeningRef.current();
      }, 600);
    };
    rec.onend = () => {
      listeningRef.current = false;
      // auto-restart while net open and not processing a turn
      if (netOpenRef.current && !processingRef.current) {
        setTimeout(() => {
          if (netOpenRef.current && !processingRef.current) startListeningRef.current && startListeningRef.current();
        }, 220);
      }
    };
    recognitionRef.current = rec;
    try {
      rec.start();
      listeningRef.current = true;
      setVoicePhase('listening');
    } catch (e) {
      // start() throws if already started — ignore
    }
  }, [handleUserUtterance, stopRecognition]);

  startListeningRef.current = startListening;

  // OPEN THE NET — start live two-way AVM conversation (NOT static MP3).
  const toggleVoiceBriefing = useCallback(async () => {
    setVoiceError('');
    if (netOpenRef.current) {
      closeTheNet();
      return;
    }
    // open the net — unlock autoplay / AudioContext on this user gesture first
    unlockPlayback(audioRef.current);
    netOpenRef.current = true;
    setNetOpen(true);
    setVoicePhase('connecting');
    setVoiceCaption('Opening live net with AVM narrator…');
    setLastHeard('');
    try {
      // health first (surfaces missing API key clearly)
      try {
        const h = await avmApi('/api/avm/health');
        if (h && h.hasApiKey === false) {
          throw new Error('Server missing ON_DEMAND_API_KEY — cannot open live net.');
        }
      } catch (e) {
        if (e?.message?.includes('ON_DEMAND_API_KEY') || e?.message?.includes('/api/avm')) throw e;
        // health optional if route is still cold-starting
      }
      const sess = await avmApi('/api/avm/session', {});
      if (!netOpenRef.current) return;
      sessionIdRef.current = sess.sessionId;
      saveVoiceConfig({
        lastSessionId: sess.sessionId,
        lastWorkflowId: sess.workflowId || AVM_WORKFLOW_ID,
        lastEndpointId: sess.endpointId || null,
        preferredLang: loadVoiceConfig().preferredLang || 'en-US',
      });
      const starter = sess.conversationStarter || 'Live net open. Speak your question.';
      setVoiceCaption(`NET: ${starter}`);
      setVoicePhase('speaking');
      let starterPlayed = false;
      if (sess.starterAudioUrl && audioRef.current) {
        try {
          starterPlayed = await playRemoteAudio(sess.starterAudioUrl, audioRef.current);
        } catch (e) {
          // eslint-disable-next-line no-console
          console.warn('[App] starter audio play failed', e);
        }
      }
      if (!starterPlayed) {
        await speakLocal(starter);
      }
      if (!netOpenRef.current) return;
      setVoicePhase('listening');
      startListening();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('[App] open net failed', err);
      netOpenRef.current = false;
      setNetOpen(false);
      setVoicePhase('error');
      setVoiceError(err?.message || 'Failed to open live AVM net');
      stopRecognition();
      stopNetAudio();
    }
  }, [closeTheNet, startListening, stopRecognition, stopNetAudio]);

  // cleanup on unmount
  useEffect(() => () => {
    netOpenRef.current = false;
    stopRecognition();
    stopNetAudio();
  }, [stopRecognition, stopNetAudio]);

  const onReset = useCallback(() => {
    sceneRef.current?.setPlaying(false);
    setPlaying(false);
    const r = sceneRef.current?.setProgress(0);
    setProgress(0);
    if (r) setReadout(r);
    closeTheNet();
  }, [closeTheNet]);

  const pickScenario = useCallback((id) => {
    setScenarioId(id);
    // keep visual language; restart playhead for the new illustrative path
    sceneRef.current?.setPlaying(false);
    setPlaying(false);
    const r = sceneRef.current?.setProgress(0);
    setProgress(0);
    if (r) setReadout(r);
  }, []);

  const onScrub = useCallback((e) => {
    const v = parseFloat(e.target.value);
    if (!Number.isFinite(v)) return;          // guard slider NaN
    setProgress(v);
    const r = sceneRef.current?.setProgress(v);
    if (r) setReadout(r);
  }, []);

  const pickCam = useCallback((id) => {
    setCamMode(id);
    sceneRef.current?.setCamMode(id);
    if (id === 'thermal' && !thermal) { setThermal(true); sceneRef.current?.setThermal(true); }
  }, [thermal]);

  const toggleThermal = useCallback(() => {
    const on = !thermal; setThermal(on);
    sceneRef.current?.setThermal(on);
    if (on) setCamMode('thermal');
  }, [thermal]);

  const goWp = useCallback((i) => {
    setActiveWp(i);
    const r = sceneRef.current?.gotoWaypoint(i);
    if (r) { setReadout(r); setProgress(r.progress); }
  }, []);

  // Live base-imagery switch (LIVE ESRI World Imagery ↔ Carto Dark Matter) —
  // replaces the removed Cesium-ion token path. No credentials required.
  const pickImagery = useCallback((mode) => {
    setImageryMode(mode);
    sceneRef.current?.setImageryMode(mode);
  }, []);

  // Live UTC clock for the classification banner (Zulu time, MoD convention).
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const p = (n) => String(n).padStart(2, '0');
      setClock(`${p(d.getUTCHours())}:${p(d.getUTCMinutes())}:${p(d.getUTCSeconds())}Z`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const toggleLayer = (name) => {
    const on = !layers[name];
    setLayers((s) => ({ ...s, [name]: on }));
    sceneRef.current?.setLayer(name, on);
  };

  const wp = CORRIDOR.waypoints;
  const fmt = (n, d = 1) => (n == null ? '—' : Number(n).toFixed(d));

  const theatreActive = activeTab === 'theatre';

  return (
    <div className="app">
      {/* 40–48px Foundry application bar */}
      <header className="appbar" role="banner">
        <div className="brand-lockup">
          <OdLogo height={22} />
          <span className="airev-micro">AIREV</span>
        </div>
        <div className="title-block">
          <div className="t1">IMP-08 · SENTINEL</div>
          <div className="t2">UAE DEFENSIVE COMMAND CENTER · ILLUSTRATIVE · NOT CONFIRMED INTEL</div>
        </div>
        <div className="appbar-right">
          <span className="cls-tag">UNCLASSIFIED // DEFENSIVE</span>
          <span className="cls-live"><span className="cls-dot" />{ready ? 'LIVE' : 'INIT'}</span>
          <span className="cls-clock">{clock}</span>
        </div>
      </header>

      {/* Tab strip — Theatre default; others chrome-only placeholders */}
      <nav className="tabstrip" role="tablist" aria-label="Workstation views">
        {TABS.map((t) => {
          const Icon = t.Icon;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={activeTab === t.id}
              className={`tab-btn ${activeTab === t.id ? 'on' : ''}`}
              onClick={() => setActiveTab(t.id)}
            >
              <span className="tab-ico"><Icon size={12} strokeWidth={1.75} /></span>
              {t.label}
            </button>
          );
        })}
      </nav>

      {/* 48px monochrome left object rail — maps existing handlers */}
      <aside className="object-rail" aria-label="Object rail">
        <div className="or-group">
          {CAMERA_MODES.slice(0, 4).map((m) => {
            const Icon = CAM_LUCIDE[m.icon] || CAM_LUCIDE[m.id] || Eye;
            return (
              <button
                key={m.id}
                type="button"
                className={`or-btn ${camMode === m.id ? 'on' : ''}`}
                onClick={() => pickCam(m.id)}
                title={m.hint || m.name}
              >
                <Icon size={16} strokeWidth={1.6} />
                <span className="or-tip">{m.name}</span>
              </button>
            );
          })}
        </div>
        <div className="or-sep" />
        <div className="or-group">
          <button type="button" className={`or-btn ${camMode === 'impact' ? 'on' : ''}`} onClick={() => pickCam('impact')} title="Protected site">
            <Building2 size={16} strokeWidth={1.6} />
            <span className="or-tip">Protected site</span>
          </button>
          <button type="button" className={`or-btn ${thermal ? 'on' : ''}`} onClick={toggleThermal} title="Thermal / IR">
            <Flame size={16} strokeWidth={1.6} />
            <span className="or-tip">Thermal / IR</span>
          </button>
          <button type="button" className={`or-btn ${layers.corridor ? 'on' : ''}`} onClick={() => toggleLayer('corridor')} title="Corridor layer">
            <Waypoints size={16} strokeWidth={1.6} />
            <span className="or-tip">Corridor</span>
          </button>
          <button type="button" className={`or-btn ${layers.geofence ? 'on' : ''}`} onClick={() => toggleLayer('geofence')} title="Geofence ring">
            <Radar size={16} strokeWidth={1.6} />
            <span className="or-tip">Geofence</span>
          </button>
          <button type="button" className={`or-btn ${layers.waypoints ? 'on' : ''}`} onClick={() => toggleLayer('waypoints')} title="Waypoints">
            <Navigation size={16} strokeWidth={1.6} />
            <span className="or-tip">Waypoints</span>
          </button>
        </div>
        <div className="or-sep" />
        <div className="or-group">
          <button type="button" className={`or-btn ${imageryMode === 'dark' ? 'on' : ''}`} onClick={() => pickImagery(imageryMode === 'dark' ? 'satellite' : 'dark')} title="Basemap">
            <Layers size={16} strokeWidth={1.6} />
            <span className="or-tip">Basemap</span>
          </button>
          <button type="button" className={`or-btn ${netOpen ? 'on' : ''}`} onClick={toggleVoiceBriefing} title="Open the net">
            {netOpen ? <MicOff size={16} strokeWidth={1.6} /> : <Mic size={16} strokeWidth={1.6} />}
            <span className="or-tip">{netOpen ? 'Close net' : 'Open the net'}</span>
          </button>
        </div>
      </aside>

      {/* quiet frame overlay */}
      <Svg markup={HUD_FRAME} className="hud-frame" />

      {/* Cesium globe — always mounted so scene state is preserved across tabs.
          THE LIVE INTERACTIVE 3D/WebGL SURFACE — the ONLY Theatre visual, per
          explicit instruction. A prior turn added a static <img> backdrop
          ("theatre-plate-host") sitting at z-index:10 in front of this host
          (which had no explicit z-index, i.e. stacking order 0) — that
          silently covered AND intercepted all pointer input to the Cesium
          canvas, which is why Run awareness / drag-to-rotate appeared dead
          even though every control was (and still is) correctly wired to a
          real CesiumScene method (setPlaying/setProgress/setLayer). Removed
          entirely; z-index is now set explicitly on .cesium-host in
          styles.css so this can never regress silently again. Real imagery:
          ESRI World Imagery / Carto Dark Matter (both live, key-free) — see
          CesiumScene.js _addBaseImagery(); MSAA is kept OFF
          (scene.msaaSamples = 1, from the earlier glBlitFramebuffer fix). */}
      <div ref={cesiumRef} className="cesium-host" style={{ visibility: theatreActive ? 'visible' : 'hidden' }} />
      {thermal && theatreActive && <div className="thermal-overlay" />}

      {/* Chat tab — OSINT research assistant. Own full-bleed pane (not the narrow
          left-rail placeholder pattern below) so the message stream + composer
          have room to breathe. Defensive/preventive OSINT research only. */}
      {activeTab === 'chat' && (
        <div
          className="chat-tab-host"
          style={{
            position: 'absolute',
            top: 'calc(var(--appbar-h) + var(--tab-h) + var(--chrome-gap))',
            left: 'calc(var(--obj-rail-w) + var(--chrome-gap))',
            right: 'var(--chrome-gap)',
            bottom: 52,
            zIndex: 50,
          }}
        >
          <ChatPanel />
        </div>
      )}

      {/* Non-theatre chrome panes (placeholders; no logic change) */}
      {!theatreActive && activeTab !== 'chat' && (
        <aside className="left-rail" style={{ left: 'calc(var(--obj-rail-w) + var(--chrome-gap))', right: 'var(--chrome-gap)', width: 'auto' }}>
          <div className="tab-pane panel">
            {activeTab === 'timeline' && (
              <>
                <h3>Timeline · illustrative</h3>
                <p>Playback transport remains on the bottom bar. Use Run awareness / scrub to walk launch → impact. Figures are reconstructed planning sketches.</p>
                <div className="kv"><span>Progress</span><b>{Math.round(progress * 100)}%</b></div>
                <div className="kv"><span>Phase</span><b>{readout?.phase || 'Launch'}</b></div>
                <div className="kv"><span>ETA</span><b>{fmt(readout?.etaMin)} min</b></div>
              </>
            )}
            {activeTab === 'entities' && (
              <>
                <h3>Entities · airframe &amp; site</h3>
                <p>Live entities remain on the globe. This pane surfaces the protected site and airframe designation only.</p>
                <div className="kv"><span>Site</span><b>{IMPACT_SITE.short || IMPACT_SITE.name || 'Al Warqa'}</b></div>
                <div className="kv"><span>Airframe</span><b>{SHAHED_SPECS.designation}</b></div>
                <div className="kv"><span>Corridor origin</span><b>{CORRIDOR_ORIGIN.lat.toFixed(4)}, {CORRIDOR_ORIGIN.lon.toFixed(4)}</b></div>
              </>
            )}
            {activeTab === 'briefing' && (
              <>
                <h3>Briefing · defensive resilience</h3>
                <p>UXE Security Solutions IMP-08 theatre. Early-warning, infrastructure dependency, recovery readiness. Southern Gulf side card removed — brief from globe + command chrome only. Open the net for live AVM narration.</p>
                <div className="kv"><span>Scenario</span><b>{scenario.name}</b></div>
                <div className="kv"><span>Classification</span><b>UNCLASSIFIED // DEFENSIVE</b></div>
              </>
            )}
            {activeTab === 'sources' && (
              <>
                <h3>Sources · open / illustrative</h3>
                <p>Imagery: ESRI World Imagery + World Terrain (key-free). Thermal: VIIRS FRP clusters. Specs cite open literature. KPI chips are planning sketches — not confirmed intelligence.</p>
                <div className="kv"><span>Basemap</span><b>{imageryMode === 'dark' ? 'Carto Dark' : 'ESRI World Imagery'}</b></div>
                <div className="kv"><span>Ion token</span><b className="ok-chip">NOT REQUIRED</b></div>
                <div className="muted small src-line">Sources: {(SHAHED_SPECS.cite || []).join(', ') || 'open literature'}.</div>
              </>
            )}
          </div>
        </aside>
      )}

      {/* left: camera modes + waypoints — Theatre tab only */}
      {theatreActive && (
      <aside className="left-rail">
        <div className="panel">
          <div className="panel-h"><Video size={14} className="ph-ico" strokeWidth={1.75} /> Camera modes</div>
          <div className="cam-grid">
            {CAMERA_MODES.map((m) => {
              const Icon = CAM_LUCIDE[m.icon] || CAM_LUCIDE[m.id] || Eye;
              return (
                <button key={m.id} className={`cam-btn ${camMode === m.id ? 'on' : ''}`} title={m.hint} onClick={() => pickCam(m.id)}>
                  <span className="cam-ico"><Icon size={14} strokeWidth={1.75} /></span>
                  <span>{m.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="panel">
          <div className="panel-h"><Navigation size={14} className="ph-ico" strokeWidth={1.75} /> Corridor nav</div>
          <div className="wp-list">
            {wp.map((w, i) => (
              <button key={w.id} className={`wp-row ${activeWp === i ? 'on' : ''}`} onClick={() => goWp(i)}>
                <span className="wp-pin"><span className="wp-num">{w.legOrder}</span></span>
                <div className="wp-meta">
                  <div className="wp-name">{w.name}</div>
                  <div className="wp-phase">{w.phase} · {w.lat.toFixed(3)}, {w.lon.toFixed(3)}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-h"><Shield size={14} className="ph-ico" strokeWidth={1.75} /> Scenarios · illustrative</div>
          <div className="scenario-chips">
            {SCENARIOS.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`scenario-chip ${scenarioId === s.id ? 'on' : ''}`}
                onClick={() => pickScenario(s.id)}
              >
                {s.name}
              </button>
            ))}
          </div>
          <div className="muted small">
            Active: <b className="accent-text">{scenario.name}</b>. Numbers are planning sketches only — not confirmed intelligence.
          </div>
          <div className="mission-pillars">
            <div className="pillar"><span>DETECTION</span><b>Early-warning ring + thermal cueing</b></div>
            <div className="pillar"><span>RESPONSE</span><b>Staffed containment readiness</b></div>
            <div className="pillar"><span>RECOVERY</span><b>Site continuity drills</b></div>
            <div className="pillar"><span>RESIDUAL RISK</span><b>Endurance geofence · +{GEOFENCE.earlierWarningMin} min</b></div>
          </div>
        </div>
      </aside>
      )}

      {/* right: impact + telemetry + geofence + thermal + intel + imagery — Theatre only */}
      {theatreActive && (
      <aside className="right-rail">
        <div className="panel">
          <div className="panel-h"><Crosshair size={14} className="ph-ico" strokeWidth={1.75} /> Protected site · Al Warqa</div>
          <img
            className="hero-img"
            src={IMAGERY.droneHero}
            alt="Al Warqa infrastructure context — 3D satellite capture"
            data-panel="al-warqa-hero"
            onError={(e) => {
              const el = e.currentTarget;
              const next = el.dataset.fallbackStep === '1'
                ? IMAGERY.droneHeroRecovered
                : IMAGERY.droneHeroFallback;
              el.dataset.fallbackStep = el.dataset.fallbackStep === '1' ? '2' : '1';
              if (el.dataset.fallbackStep === '2') el.onerror = null;
              el.src = next;
            }}
          />
          <div className="context-headline">Al Warqa, Dubai — infrastructure context</div>
          <div className="hero-strip">
            {IMAGERY.heroVariations.map((src, i) => (
              <figure key={i} className="hero-thumb">
                <img
                  src={src}
                  alt={`${IMAGERY.heroLabels[i]} — illustrative reconstruction capture`}
                  loading="lazy"
                  data-panel={`al-warqa-thumb-${i}`}
                  onError={(e) => {
                    const el = e.currentTarget;
                    el.onerror = null;
                    el.src = IMAGERY.heroVariationFallbacks[i] || IMAGERY.droneHeroRecovered;
                  }}
                />
                <figcaption>{IMAGERY.heroLabels[i]}</figcaption>
              </figure>
            ))}
          </div>
          <div className="addr-label addr-highlight">{IMPACT_SITE.address}</div>
          <div className="kv"><span>Site</span><b>{IMPACT_SITE.lat.toFixed(7)}, {IMPACT_SITE.lon.toFixed(7)}</b></div>
          <div className="kv"><span>Plus code</span><b>{IMPACT_SITE.plusCode}</b></div>
          <div className="kv"><span>Corridor origin</span><b>{CORRIDOR_ORIGIN.lat.toFixed(6)}, {CORRIDOR_ORIGIN.lon.toFixed(5)}</b></div>
          <div className="kv"><span>Region</span><b>{IMPACT_SITE.analystContext.region} ({IMPACT_SITE.analystContext.isoRegion})</b></div>
          <div className="kv"><span>Timezone</span><b>{IMPACT_SITE.analystContext.timezone}</b></div>
          <div className="muted small">Verified site facts only. Watch-node roles and all KPI numbers are ILLUSTRATIVE ONLY — not confirmed intelligence.</div>
        </div>

        <div className="panel">
          <div className="panel-h"><Radio size={14} className="ph-ico" strokeWidth={1.75} /> Telemetry</div>
          <div className="kv"><span>Phase</span><b>{readout?.phase || 'Launch'}</b></div>
          <div className="kv"><span>Leg</span><b>{readout?.legFrom} → {readout?.legTo}</b></div>
          <div className="kv"><span>Altitude</span><b>{fmt((readout?.altM || 0) / 1000, 2)} km</b></div>
          <div className="kv"><span>Travelled</span><b>{fmt(readout?.travelledKm)} / {fmt(readout?.totalKm)} km</b></div>
          <div className="kv"><span>To site</span><b>{fmt(readout?.distToImpactKm)} km</b></div>
          <div className="kv"><span>Speed</span><b>{fmt(readout?.speedKmh, 0)} km/h</b></div>
          <div className="kv"><span>Dive angle</span><b className={readout?.divePitchDeg > 5 ? 'alert' : ''}>{fmt(readout?.divePitchDeg, 1)}°</b></div>
          <div className="kv"><span>ETA</span><b>{fmt(readout?.etaMin)} min</b></div>
          <div className="inspector" ref={inspectorRef}>
            <div className="insp-cap">Airframe inspector</div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-h"><Shield size={14} className="ph-ico" strokeWidth={1.75} /> Endurance geofence</div>
          <div className="geo-row">
            <span className="geo-ring"><Radar size={28} strokeWidth={1.5} /></span>
            <div>
              <div className="big">{GEOFENCE.radiusKm} km</div>
              <div className="sub">endurance-derived detection ring</div>
            </div>
          </div>
          <div className="warn-chip">+{GEOFENCE.earlierWarningMin} min earlier warning</div>
          <div className="muted small">{GEOFENCE.earlierWarningNote}</div>
        </div>

        <div className="panel">
          <div className="panel-h"><Flame size={14} className="ph-ico" strokeWidth={1.75} /> Thermal / IR · VIIRS</div>
          <button className={`wide-btn ${thermal ? 'on' : ''}`} onClick={toggleThermal}>
            <span className="ta-ico"><Flame size={14} strokeWidth={1.75} /></span>
            {thermal ? 'Thermal mode: on' : 'Enable thermal mode'}
          </button>
          <div className="kv"><span>Detections</span><b>{thermalReport.total}</b></div>
          <div className="kv"><span>Flagged</span><b className="alert">{thermalReport.flagged} suspicious</b></div>
          <div className="kv"><span>Peak FRP</span><b className="alert">{fmt(thermalReport.peak.frp, 2)} MW</b></div>
          <div className="kv"><span>Cluster</span><b>{thermalReport.topCluster.n} hits @ {thermalReport.topCluster.lat.toFixed(3)},{thermalReport.topCluster.lon.toFixed(3)}</b></div>
          <div className="muted small">High-FRP / clustered detections near the impact footprint are auto-flagged as suspicious heat.</div>
        </div>

        <div className="panel">
          <div className="panel-h"><Plane size={14} className="ph-ico" strokeWidth={1.75} /> Shahed-136 · specs</div>
          <div className="kv"><span>Designation</span><b>{SHAHED_SPECS.designation}</b></div>
          <div className="kv"><span>Cruise speed</span><b>{SHAHED_SPECS.cruiseSpeedKmh}</b></div>
          <div className="kv"><span>Range</span><b>{SHAHED_SPECS.rangeKm}</b></div>
          <div className="kv"><span>Altitude</span><b>{SHAHED_SPECS.cruiseAltM}</b></div>
          <div className="kv"><span>Warhead</span><b>{SHAHED_SPECS.warheadKg}</b></div>
          <div className="kv"><span>Length</span><b>{SHAHED_SPECS.lengthM}</b></div>
          <div className="kv"><span>Wingspan</span><b>{SHAHED_SPECS.wingspanM}</b></div>
          <div className="kv"><span>Planform</span><b>{SHAHED_SPECS.planform}</b></div>
          <div className="kv"><span>Terminal dive</span><b>{SHAHED_SPECS.terminalDiveDeg}</b></div>
          <div className="kv"><span>UAE MoD</span><b>{INTEL.uaeMod.dronesDetected} detected · {INTEL.uaeMod.fellInUaeTerritory} fell in UAE</b></div>
          <div className="muted small src-line">Sources: {SHAHED_SPECS.cite.join(', ')}. All telemetry above reads from the live cannon-es physics state.</div>
        </div>

        <div className="panel">
          <div className="panel-h"><MapIcon size={14} className="ph-ico" strokeWidth={1.75} /> Terminal approach</div>
          <img className="overlay-img" src={IMAGERY.backdrop.dubai3d} alt="Dubai 3D photorealistic corridor capture — illustrative" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = IMAGERY.backdrop.groundOverlay; }} />
          <div className="muted small">Real 3D photorealistic capture over the Dubai corridor. Physics-modelled ballistic terminal dive (~-62°) converges on Jenna Apartments (Warda), Al Warqa (25.1858, 55.4045).</div>
        </div>

        <div className="panel">
          <div className="panel-h"><Layers size={14} className="ph-ico" strokeWidth={1.75} /> Map layers</div>
          <div className="seg">
            <button className={`seg-btn ${imageryMode === 'satellite' ? 'on' : ''}`} onClick={() => pickImagery('satellite')}>
              SATELLITE
            </button>
            <button className={`seg-btn ${imageryMode === 'dark' ? 'on' : ''}`} onClick={() => pickImagery('dark')}>
              TACTICAL DARK
            </button>
          </div>
          <div className="kv"><span>Base imagery</span><b>{imageryMode === 'dark' ? 'Carto Dark Matter' : 'ESRI World Imagery'}</b></div>
          <div className="kv"><span>Terrain</span><b>ESRI World Terrain 3D</b></div>
          <div className="kv"><span>Ion token</span><b className="ok-chip">NOT REQUIRED</b></div>
          <div className="muted small">Live, key-free satellite &amp; terrain streamed at the venue. Toggle a tactical dark basemap for low-light briefing. No Cesium ion / Google credentials.</div>
        </div>
      </aside>
      )}

      {/* Live AVM reply playback element — src set dynamically; NOT the static MP3 */}
      <audio ref={audioRef} preload="none" playsInline crossOrigin="anonymous" />

      {/* bottom transport */}
      <footer className="transport">
        <div className="layers">
          {['corridor', 'geofence', 'waypoints'].map((l) => (
            <button key={l} className={`chip ${layers[l] ? 'on' : ''}`} onClick={() => toggleLayer(l)}>{l}</button>
          ))}
        </div>
        <button
          className={`voice-brief ${netOpen ? 'on' : ''} phase-${voicePhase}`}
          type="button"
          onClick={toggleVoiceBriefing}
          title={`Live two-way AVM · workflow ${AVM_WORKFLOW_ID} · DeepSeek V4 Flash (mic in / spoken replies). Not TTS/STS/MP3 primary.`}
        >
          {netOpen
            ? <><MicOff size={13} strokeWidth={1.75} /> {voicePhase === 'listening' ? 'CLOSE · LISTENING' : voicePhase === 'thinking' ? 'CLOSE · THINKING' : voicePhase === 'speaking' ? 'CLOSE · SPEAKING' : voicePhase === 'connecting' ? 'CLOSE · CONNECTING' : 'CLOSE THE NET'}</>
            : <><Mic size={13} strokeWidth={1.75} /> OPEN THE NET</>}
        </button>
        <button className="play" onClick={togglePlay}>{playing ? <><Pause size={13} strokeWidth={1.75} /> Pause</> : <><Play size={13} strokeWidth={1.75} /> Run awareness</>}</button>
        <button className="reset-btn" type="button" onClick={onReset}><RotateCcw size={12} strokeWidth={1.75} /> Reset</button>
        <input className="scrub" type="range" min="0" max="1" step="0.001" value={progress} onChange={onScrub} />
        <div className="prog">{Math.round(progress * 100)}%</div>
        <div className="scenario-tag">{scenario.name}</div>
        {voiceCaption && (
          <div className={`voice-caption phase-${voicePhase}`} role="status" title={voiceCaption}>
            {voiceCaption}
          </div>
        )}
        {lastHeard && netOpen && (
          <div className="voice-heard" title={lastHeard}>heard: {lastHeard}</div>
        )}
        {voiceError && <div className="voice-err" role="status">{voiceError}</div>}
        <div className="stats">
          <span>{STATS.owaDrones} OWA</span><span>{STATS.ballisticMissiles} BM</span><span>{STATS.durationDays}-day</span>
        </div>
      </footer>

      {/* pick popover */}
      {picked && (
        <div className="popover" onClick={() => setPicked(null)}>
          <div className="po-card" onClick={(e) => e.stopPropagation()}>
            <div className="po-h">
              {picked.type === 'site' && (picked.data.short || picked.data.name)}
              {picked.type === 'waypoint' && `WP ${picked.data.legOrder} · ${picked.data.name}`}
              {picked.type === 'thermal' && `VIIRS · ${picked.data.severity}`}
              <button className="po-x" onClick={() => setPicked(null)}>×</button>
            </div>
            <div className="po-b">
              {picked.type === 'site' && (picked.data.note || picked.data.incident)}
              {picked.type === 'waypoint' && `${picked.data.phase} · ${picked.data.note}`}
              {picked.type === 'thermal' && (
                <>
                  FRP {picked.data.frp} MW · BT {picked.data.brightTi4} K · {picked.data.acqDate} {picked.data.acqTime}Z ({picked.data.daynight === 'D' ? 'day' : 'night'}) · cluster {picked.data.clusterN}.
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="footer-brand">
        <OdLogo className="fb-logo" height={14} />
        <span className="fb-sub">Defensive resilience · sentinel · ILLUSTRATIVE · not confirmed intelligence</span>
      </div>
    </div>
  );
}
