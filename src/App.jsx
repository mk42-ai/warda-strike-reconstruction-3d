import React, { useEffect, useRef, useState, useCallback } from 'react';
import CesiumScene from './cesium/CesiumScene.js';
import { mountShahedInspector } from './three/Shahed136.js';
import { SHAHED_SPECS } from './utils/geo.js';
import {
  META, IMPACT_SITE, CORRIDOR_ORIGIN, CORRIDOR, GEOFENCE, STATS, CAMERA_MODES, TIMELINE,
  analyzeThermal, VIIRS_DETECTIONS, INTEL, IMAGERY,
} from './data/scenario.js';
import {
  LOGO, HUD_FRAME, CAM_ICONS, GEOFENCE_RING, THERMAL_ALERT, waypointMarker,
} from './brand/assets.js';

const Svg = ({ markup, className, style }) => (
  <span className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />
);

export default function App() {
  const cesiumRef = useRef(null);
  const sceneRef = useRef(null);
  const inspectorRef = useRef(null);
  const rafRef = useRef(0);

  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [camMode, setCamMode] = useState('launch');
  const [thermal, setThermal] = useState(false);
  const [activeWp, setActiveWp] = useState(0);
  const [readout, setReadout] = useState(null);
  const [picked, setPicked] = useState(null);
  const [ionToken, setIonToken] = useState('');
  const [ionMsg, setIonMsg] = useState('');
  const [layers, setLayers] = useState({ corridor: true, geofence: true, waypoints: true });

  const thermalReport = analyzeThermal(VIIRS_DETECTIONS);

  // -- init Cesium + Three inspector ----------------------------------------
  useEffect(() => {
    if (!cesiumRef.current) return;
    const scene = new CesiumScene(cesiumRef.current);
    sceneRef.current = scene;
    scene.onReady(() => setReady(true));
    scene.onPick((p) => setPicked(p));
    const r = scene.setProgress(0);
    setReadout(r);

    // hide boot screen
    const boot = document.getElementById('boot-screen');
    if (boot) setTimeout(() => boot.classList.add('hidden'), 900);

    if (inspectorRef.current) {
      const insp = mountShahedInspector(inspectorRef.current);
      return () => { insp.dispose(); scene.destroy(); };
    }
    return () => scene.destroy();
  }, []);

  // -- playback loop ---------------------------------------------------------
  useEffect(() => {
    if (!playing) { cancelAnimationFrame(rafRef.current); return; }
    let last = performance.now();
    const tick = (now) => {
      const dt = (now - last) / 1000; last = now;
      setProgress((p) => {
        let np = p + dt / TIMELINE.flightSeconds;
        if (np >= 1) { np = 1; setPlaying(false); }
        const r = sceneRef.current?.setProgress(np);
        if (r) setReadout(r);
        return np;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing]);

  // continuous camera refresh for orbit/cinema even when paused
  useEffect(() => {
    if (camMode !== 'orbit' && camMode !== 'cinema') return;
    let id = 0;
    const loop = () => { sceneRef.current?._applyCamera(); id = requestAnimationFrame(loop); };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, [camMode]);

  const onScrub = useCallback((e) => {
    const v = parseFloat(e.target.value);
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

  const applyIon = useCallback(async () => {
    if (!ionToken.trim()) return;
    setIonMsg('Activating Cesium ion / Google Photorealistic 3D Tiles…');
    const res = await sceneRef.current?.setIonToken(ionToken.trim());
    setIonMsg(res?.msg || (res?.ok ? 'Active' : 'Failed'));
  }, [ionToken]);

  const toggleLayer = (name) => {
    const on = !layers[name];
    setLayers((s) => ({ ...s, [name]: on }));
    sceneRef.current?.setLayer(name, on);
  };

  const wp = CORRIDOR.waypoints;
  const fmt = (n, d = 1) => (n == null ? '—' : Number(n).toFixed(d));

  return (
    <div className="app">
      {/* full-screen brand HUD frame */}
      <Svg markup={HUD_FRAME} className="hud-frame" />

      {/* Cesium globe */}
      <div ref={cesiumRef} className="cesium-host" />
      {thermal && <div className="thermal-overlay" />}

      {/* top brand bar */}
      <header className="topbar">
        <Svg markup={LOGO} className="logo" />
        <div className="title-block">
          <div className="t1">IMP-08 · WARDA APARTMENTS STRIKE RECONSTRUCTION</div>
          <div className="t2">{META.munition} · Iran→Dubai corridor · {META.operation} · real-satellite 3D theatre</div>
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
          <div className="panel-h">WAYPOINT NAVIGATION · 6 STOPS</div>
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
      </aside>

      {/* right: impact + telemetry + geofence + thermal + intel + imagery + ion */}
      <aside className="right-rail">
        <div className="panel">
          <div className="panel-h">IMP-08 IMPACT SITE</div>
          <img className="hero-img" src={IMAGERY.droneHero} alt="Al Warqa impact site — 3D photorealistic satellite capture" />
          <div className="hero-cap">Al Warqa, Dubai — 3D satellite capture</div>
          <div className="hero-strip">
            {IMAGERY.heroVariations.map((src, i) => (
              <figure key={i} className="hero-thumb">
                <img src={src} alt={`Shahed-136 ${IMAGERY.heroLabels[i]}`} loading="lazy" />
                <figcaption>{IMAGERY.heroLabels[i]}</figcaption>
              </figure>
            ))}
          </div>
          <div className="addr-label">{IMPACT_SITE.address}</div>
          <div className="kv"><span>Impact</span><b>{IMPACT_SITE.lat.toFixed(7)}, {IMPACT_SITE.lon.toFixed(7)}</b></div>
          <div className="kv"><span>Plus code</span><b>{IMPACT_SITE.plusCode}</b></div>
          <div className="kv"><span>Launch origin</span><b>{CORRIDOR_ORIGIN.lat.toFixed(6)}, {CORRIDOR_ORIGIN.lon.toFixed(5)}</b></div>
          <div className="kv"><span>Region</span><b>{IMPACT_SITE.analystContext.region} ({IMPACT_SITE.analystContext.isoRegion})</b></div>
          <div className="kv"><span>Timezone</span><b>{IMPACT_SITE.analystContext.timezone}</b></div>
        </div>

        <div className="panel">
          <div className="panel-h">LIVE TELEMETRY</div>
          <div className="kv"><span>Phase</span><b>{readout?.phase || 'Launch'}</b></div>
          <div className="kv"><span>Leg</span><b>{readout?.legFrom} → {readout?.legTo}</b></div>
          <div className="kv"><span>Altitude</span><b>{fmt((readout?.altM || 0) / 1000, 2)} km</b></div>
          <div className="kv"><span>Travelled</span><b>{fmt(readout?.travelledKm)} / {fmt(readout?.totalKm)} km</b></div>
          <div className="kv"><span>To impact</span><b>{fmt(readout?.distToImpactKm)} km</b></div>
          <div className="kv"><span>Speed</span><b>{fmt(readout?.speedKmh, 0)} km/h</b></div>
          <div className="kv"><span>Dive angle</span><b className={readout?.divePitchDeg > 5 ? 'alert' : ''}>{fmt(readout?.divePitchDeg, 1)}°</b></div>
          <div className="kv"><span>ETA</span><b>{fmt(readout?.etaMin)} min</b></div>
          <div className="inspector" ref={inspectorRef}>
            <div className="insp-cap">SHAHED-136 · OWA LOITERING MUNITION</div>
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
          <div className="panel-h">PHOTOREAL UPGRADE (OPTIONAL)</div>
          <div className="muted small">Running on real ESRI World Imagery satellite tiles (no key). Paste a Cesium ion token to drape Google Photorealistic 3D Tiles.</div>
          <div className="ion-row">
            <input className="ion-in" type="password" placeholder="Cesium ion token…" value={ionToken} onChange={(e) => setIonToken(e.target.value)} />
            <button className="ion-go" onClick={applyIon}>Apply</button>
          </div>
          {ionMsg && <div className="muted small ion-msg">{ionMsg}</div>}
        </div>
      </aside>

      {/* bottom transport */}
      <footer className="transport">
        <div className="layers">
          {['corridor', 'geofence', 'waypoints'].map((l) => (
            <button key={l} className={`chip ${layers[l] ? 'on' : ''}`} onClick={() => toggleLayer(l)}>{l}</button>
          ))}
        </div>
        <button className="play" onClick={() => setPlaying((p) => !p)}>{playing ? '❚❚ PAUSE' : '▶ PLAY STRIKE'}</button>
        <input className="scrub" type="range" min="0" max="1" step="0.001" value={progress} onChange={onScrub} />
        <div className="prog">{Math.round(progress * 100)}%</div>
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

      <div className="footer-brand">OnDemand Vision-Drone Overwatch · Sentinel</div>
    </div>
  );
}
