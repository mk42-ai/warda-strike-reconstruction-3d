import React, { useEffect, useRef, useState, useCallback } from 'react';
import CesiumScene from './cesium/CesiumScene.js';
import { mountShahedInspector } from './three/Shahed136.js';
import { SHAHED_SPECS } from './utils/geo.js';
import {
  META, IMPACT_SITE, CORRIDOR_ORIGIN, CORRIDOR, GEOFENCE, STATS, CAMERA_MODES,
  TIMELINE,
  analyzeThermal, VIIRS_DETECTIONS, INTEL, IMAGERY,
} from './data/scenario.js';
import {
  LOGO, HUD_FRAME, CAM_ICONS, GEOFENCE_RING, THERMAL_ALERT, waypointMarker,
} from './brand/assets.js';

// AIREV | OnDemand wordmark — rendered PURELY as styled text/CSS (no image
// asset, no AI-generated graphic). Used in the classification banner + footer.
const AirevWordmark = ({ className }) => (
  <span className={`airev-wordmark ${className || ''}`}>
    <span className="aw-airev">AIREV</span>
    <span className="aw-sep">|</span>
    <span className="aw-ond">OnDemand</span>
  </span>
);

const Svg = ({ markup, className, style }) => (
  <span className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />
);

export default function App() {
  const cesiumRef = useRef(null);
  const sceneRef = useRef(null);
  const inspectorRef = useRef(null);

  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [camMode, setCamMode] = useState('launch');
  const [thermal, setThermal] = useState(false);
  const [activeWp, setActiveWp] = useState(0);
  const [readout, setReadout] = useState(null);
  const [picked, setPicked] = useState(null);
  const [imageryMode, setImageryMode] = useState('satellite');   // 'satellite' (ESRI) | 'dark' (Carto)
  const [clock, setClock] = useState('');                        // live UTC clock for the classification banner
  const [layers, setLayers] = useState({ corridor: true, geofence: true, waypoints: true });
  const [scenarioId, setScenarioId] = useState('baseline_monitor');
  const [hoverNode, setHoverNode] = useState(null);

  // Illustrative resilience scenario chips (NOT confirmed intelligence)
  const SCENARIOS = [
    { id: 'baseline_monitor', name: 'Baseline monitor', det: 9.9, resp: 23.7, disr: 0.25, rec: 4.5, risk: 0.10 },
    { id: 'sensor_degrade', name: 'Sensor degrade', det: 9.6, resp: 31.6, disr: 0.53, rec: 4.6, risk: 0.28 },
    { id: 'staff_surge', name: 'Staff surge', det: 10.9, resp: 23.0, disr: 0.18, rec: 3.7, risk: 0.13 },
    { id: 'multi_node_lag', name: 'Multi-node lag', det: 16.8, resp: 57.9, disr: 0.83, rec: 8.9, risk: 0.49 },
  ];
  const scenario = SCENARIOS.find((s) => s.id === scenarioId) || SCENARIOS[0];
  // Blend illustrative KPIs with live progress so tiles update while the sim runs
  const ease = progress * progress * (3 - 2 * progress);
  const kpis = {
    det: +(5.5 + (scenario.det - 5.5) * ease).toFixed(1),
    resp: +(12 + (scenario.resp - 12) * ease).toFixed(1),
    disr: +(0.05 + (scenario.disr - 0.05) * ease).toFixed(2),
    rec: +(2.0 + (scenario.rec - 2.0) * ease).toFixed(1),
    risk: +(0.04 + (scenario.risk - 0.04) * ease).toFixed(2),
  };
  const riskChip = kpis.risk >= 0.35 ? 'CONTAIN' : kpis.risk >= 0.15 ? 'MONITOR' : 'RESTORE';

  const WATCH_NODES = [
    { id: 'ORIGIN', label: 'ORIGIN', y: 12, tip: `Corridor origin ${CORRIDOR_ORIGIN.lat}, ${CORRIDOR_ORIGIN.lon}` },
    { id: 'MWR-APT', label: 'MWR-APT', y: 38, tip: 'Municipal watch node (assumed role) — ILLUSTRATIVE' },
    { id: 'SWM', label: 'SWM', y: 64, tip: 'Sector warning link (assumed) — ILLUSTRATIVE' },
    { id: 'SITE', label: 'SITE', y: 90, tip: `${IMPACT_SITE.address} · ${IMPACT_SITE.lat}, ${IMPACT_SITE.lon}` },
  ];

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
      const r = scene.setProgress(0);
      if (r) setReadout(r);
      setReady(true);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('[App] CesiumScene init failed:', e);
      setReady(true);   // never leave the UI stuck behind the boot overlay
    }

    // hide boot screen (always, even on init error)
    const boot = document.getElementById('boot-screen');
    if (boot) setTimeout(() => boot.classList.add('hidden'), 900);

    try { if (inspectorRef.current) insp = mountShahedInspector(inspectorRef.current); } catch (_) {}
    return () => {
      try { insp && insp.dispose(); } catch (_) {}
      try { scene && scene.destroy(); } catch (_) {}
    };
  }, []);

  // NOTE: There is intentionally NO requestAnimationFrame loop in App. The
  // CesiumScene driver loop is the SINGLE authoritative animation/camera loop;
  // it advances playback, drives the camera, and reports back via onTick().
  // React only flips intent (play/pause), which the driver reads. This removes
  // the prior stacked loops that fought over the camera during the strike.
  const togglePlay = useCallback(() => {
    const on = sceneRef.current?.setPlaying(!playing);
    setPlaying(!!on);
  }, [playing]);

  const onReset = useCallback(() => {
    sceneRef.current?.setPlaying(false);
    setPlaying(false);
    const r = sceneRef.current?.setProgress(0);
    setProgress(0);
    if (r) setReadout(r);
  }, []);

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

  return (
    <div className="app">
      {/* classification-style top banner (MoD presentation grade) */}
      <div className="classbar" role="banner">
        <span className="cls-tag">UNCLASSIFIED // DEFENSIVE BRIEFING · PREVENTIVE</span>
        <span className="cls-mid">
          <AirevWordmark /> <span className="cls-sys">SENTINEL RESILIENCE · IMP-08</span>
        </span>
        <span className="cls-tag cls-right">
          <span className="cls-live"><span className="cls-dot" />{ready ? 'LIVE' : 'INIT'}</span>
          <span className="cls-clock">{clock}</span>
        </span>
      </div>

      {/* full-screen brand HUD frame */}
      <Svg markup={HUD_FRAME} className="hud-frame" />

      {/* Cesium globe */}
      <div ref={cesiumRef} className="cesium-host" />
      {thermal && <div className="thermal-overlay" />}

      {/* Dark-theme corridor watch diagram — high-clarity Southern Gulf timeline */}
      <div className="corridor-overlay" aria-label="Al Warqa corridor watch nodes">
        <div className="co-header">
          <span className="co-header-main">3 · SOUTHERN GULF → UAE COAST · TACTICAL CORRIDOR</span>
          <span className="co-header-sub">TANKER / UAE COAST · WATCH NODES · ILLUSTRATIVE</span>
          <span className="co-header-day">{TIMELINE?.framingLabel || 'DAYTIME · JUNE'} · DEFENSIVE BRIEFING</span>
        </div>
        <div className="co-body">
          <div className="co-route" />
          <div className="co-scan" />
          <div className="co-playhead" style={{ top: `${8 + progress * 78}%` }} />
          {WATCH_NODES.map((n) => (
            <button
              key={n.id}
              type="button"
              className={`co-node ${hoverNode === n.id ? 'on' : ''}`}
              style={{ top: `${n.y}%` }}
              title={n.tip}
              onMouseEnter={() => setHoverNode(n.id)}
              onMouseLeave={() => setHoverNode(null)}
              onClick={() => setHoverNode(n.id)}
            >
              <span className="co-dot" />
              <span className={`co-plate ${n.id === 'MWR-APT' ? 'slate' : n.id === 'SWM' || n.id === 'SITE' ? 'mint' : ''}`}>
                {n.id === 'MWR-APT' ? 'MWR-APT NODE' : n.id === 'SWM' ? 'SWM LINK' : n.id === 'SITE' ? 'WARDA / JENNA · SITE' : 'ORIGIN'}
              </span>
            </button>
          ))}
          {/* Magenta strike-impact caption under the corridor axis (daytime framing, not clock time) */}
          <div className="co-strike-caption" role="note">
            {TIMELINE?.impactCaption || 'STRIKE IMPACT · DAYTIME'}
          </div>
        </div>
        {hoverNode && (
          <div className="co-tip">{WATCH_NODES.find((n) => n.id === hoverNode)?.tip}</div>
        )}
      </div>

      {/* Illustrative KPI plates — update while sim runs */}
      <div className="kpi-strip" role="region" aria-label="Illustrative resilience metrics">
        {[
          { t: 'DETECTION TIME', v: kpis.det, u: 'min' },
          { t: 'RESPONSE TIME', v: kpis.resp, u: 'min' },
          { t: 'DISRUPTION', v: kpis.disr, u: '' },
          { t: 'RECOVERY', v: kpis.rec, u: 'h' },
          { t: 'RESIDUAL RISK', v: kpis.risk, u: '' },
        ].map((m) => (
          <div key={m.t} className="kpi-card">
            <div className="kpi-t">{m.t}</div>
            <div className="kpi-v">{m.v}<span className="kpi-u">{m.u}</span></div>
          </div>
        ))}
        <div className={`kpi-chip st-${riskChip.toLowerCase()}`}>{riskChip}</div>
      </div>

      {/* top brand bar */}
      <header className="topbar">
        <Svg markup={LOGO} className="logo" />
        <div className="title-block">
          <div className="t1">IMP-08 · UAE DEFENSIVE COMMAND CENTER · RESILIENCE THEATRE</div>
          <div className="t2">Early-warning · infrastructure dependency · recovery readiness · ILLUSTRATIVE corridor awareness</div>
        </div>
        <div className="badge">
          <span className="dot" /> {ready ? 'LIVE' : 'INIT'}
        </div>
      </header>

      {/* left: camera modes + waypoints */}
      <aside className="left-rail">
        <div className="panel">
          <div className="panel-h">CAMERA MODES</div>
          <div className="cam-grid">
            {CAMERA_MODES.map((m) => (
              <button key={m.id} className={`cam-btn ${camMode === m.id ? 'on' : ''}`} title={m.hint} onClick={() => pickCam(m.id)}>
                <Svg markup={CAM_ICONS[m.icon]} className="cam-ico" />
                <span>{m.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-h">CORRIDOR NAV · WATCH STOPS</div>
          <div className="wp-list">
            {wp.map((w, i) => (
              <button key={w.id} className={`wp-row ${activeWp === i ? 'on' : ''}`} onClick={() => goWp(i)}>
                <Svg markup={waypointMarker(w.legOrder, activeWp === i)} className="wp-pin" />
                <div className="wp-meta">
                  <div className="wp-name">{w.name}</div>
                  <div className="wp-phase">{w.phase} · {w.lat.toFixed(3)}, {w.lon.toFixed(3)}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-h">RESILIENCE SCENARIOS · ILLUSTRATIVE</div>
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

      {/* right: impact + telemetry + geofence + thermal + intel + imagery + ion */}
      <aside className="right-rail">
        <div className="panel">
          <div className="panel-h">PROTECTED SITE · AL WARQA</div>
          <img className="hero-img" src={IMAGERY.droneHero} alt="Al Warqa infrastructure context — 3D satellite capture" />
          <div className="context-headline">AL WARQA, DUBAI — INFRASTRUCTURE CONTEXT (3D SATELLITE)</div>
          <div className="hero-strip">
            {IMAGERY.heroVariations.map((src, i) => (
              <figure key={i} className="hero-thumb">
                <img src={src} alt={`Shahed-136 ${IMAGERY.heroLabels[i]}`} loading="lazy" />
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
          <div className="panel-h">LIVE TELEMETRY · AWARENESS</div>
          <div className="kv"><span>Phase</span><b>{readout?.phase || 'Launch'}</b></div>
          <div className="kv"><span>Leg</span><b>{readout?.legFrom} → {readout?.legTo}</b></div>
          <div className="kv"><span>Altitude</span><b>{fmt((readout?.altM || 0) / 1000, 2)} km</b></div>
          <div className="kv"><span>Travelled</span><b>{fmt(readout?.travelledKm)} / {fmt(readout?.totalKm)} km</b></div>
          <div className="kv"><span>To site</span><b>{fmt(readout?.distToImpactKm)} km</b></div>
          <div className="kv"><span>Speed</span><b>{fmt(readout?.speedKmh, 0)} km/h</b></div>
          <div className="kv"><span>Dive angle</span><b className={readout?.divePitchDeg > 5 ? 'alert' : ''}>{fmt(readout?.divePitchDeg, 1)}°</b></div>
          <div className="kv"><span>ETA</span><b>{fmt(readout?.etaMin)} min</b></div>
          <div className="inspector" ref={inspectorRef}>
            <div className="insp-cap">AIRFRAME INSPECTOR · AWARENESS TRACK</div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-h">ENDURANCE GEOFENCE</div>
          <div className="geo-row">
            <Svg markup={GEOFENCE_RING} className="geo-ring" />
            <div>
              <div className="big">{GEOFENCE.radiusKm} km</div>
              <div className="sub">endurance-derived detection ring</div>
            </div>
          </div>
          <div className="warn-chip">+{GEOFENCE.earlierWarningMin} min earlier warning</div>
          <div className="muted small">{GEOFENCE.earlierWarningNote}</div>
        </div>

        <div className="panel">
          <div className="panel-h">THERMAL / IR · VIIRS</div>
          <button className={`wide-btn ${thermal ? 'on' : ''}`} onClick={toggleThermal}>
            <Svg markup={THERMAL_ALERT} className="ta-ico" />
            {thermal ? 'THERMAL MODE: ON' : 'ENABLE THERMAL MODE'}
          </button>
          <div className="kv"><span>Detections</span><b>{thermalReport.total}</b></div>
          <div className="kv"><span>Flagged</span><b className="alert">{thermalReport.flagged} suspicious</b></div>
          <div className="kv"><span>Peak FRP</span><b className="alert">{fmt(thermalReport.peak.frp, 2)} MW</b></div>
          <div className="kv"><span>Cluster</span><b>{thermalReport.topCluster.n} hits @ {thermalReport.topCluster.lat.toFixed(3)},{thermalReport.topCluster.lon.toFixed(3)}</b></div>
          <div className="muted small">High-FRP / clustered detections near the impact footprint are auto-flagged as suspicious heat.</div>
        </div>

        <div className="panel">
          <div className="panel-h">SHAHED-136 · REAL SPECS (SOURCED)</div>
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
          <div className="panel-h">TERMINAL APPROACH · AL WARQA</div>
          <img className="overlay-img" src={IMAGERY.backdrop.dubai3d} alt="Dubai 3D photorealistic corridor capture" />
          <div className="muted small">Real 3D photorealistic capture over the Dubai corridor. Physics-modelled ballistic terminal dive (~-62°) converges on Jenna Apartments (Warda), Al Warqa (25.1858, 55.4045).</div>
        </div>

        <div className="panel">
          <div className="panel-h">MAP LAYERS · LIVE / NO-KEY</div>
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

      {/* bottom transport */}
      <footer className="transport">
        <div className="layers">
          {['corridor', 'geofence', 'waypoints'].map((l) => (
            <button key={l} className={`chip ${layers[l] ? 'on' : ''}`} onClick={() => toggleLayer(l)}>{l}</button>
          ))}
        </div>
        <button className="play" onClick={togglePlay}>{playing ? '❚❚ PAUSE' : '▶ RUN AWARENESS'}</button>
        <button className="reset-btn" type="button" onClick={onReset}>↺ RESET</button>
        <input className="scrub" type="range" min="0" max="1" step="0.001" value={progress} onChange={onScrub} />
        <div className="prog">{Math.round(progress * 100)}%</div>
        <div className="scenario-tag">{scenario.name}</div>
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
        <AirevWordmark /> <span className="fb-sub">Defensive Resilience · Sentinel Command Center · ILLUSTRATIVE KPIs</span>
      </div>
    </div>
  );
}
