/**
 * ChatPanel.jsx — Chat tab: an OSINT (open-source intelligence) research
 * assistant panel that fits the existing Palantir/Foundry chrome (same
 * `.panel` / `.panel-h` / `.kv` / `.wide-btn` classes as the Theatre tab's
 * left/right rails — see src/styles.css).
 *
 * DEFENSIVE / PREVENTIVE OSINT RESEARCH ONLY. No attack planning, targeting,
 * sabotage, malware, or intrusion techniques — enforced both by the
 * server-side fulfillment prompt (server/chatLiveProxy.js /
 * api/chat/[action].js) and by the on-screen scope banner below.
 *
 * Wired to the LIVE OnDemand public Chat & Agent Tools API via /api/chat/*
 * (dev: server/chatLiveProxy.js Vite middleware; prod: api/chat/[action].js
 * Vercel function) — session create -> submit query (agent tools attached via
 * pluginIds) -> render answer. Model: DeepSeek V4 Pro
 * (predefined-deepseek-v4-pro). Tool catalog: src/chat/osintPlugins.js
 * (existing OnDemand plugins only — no new plugin/tool created here).
 */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Search, Send, ShieldAlert, Loader2, ChevronDown, ChevronRight,
  Radio as RadioIcon, AlertTriangle, RotateCcw, Info,
} from 'lucide-react';
import { OSINT_PLUGIN_GROUPS, OSINT_DEFAULT_PLUGIN_IDS, OSINT_PLUGIN_BY_ID, MAX_PLUGIN_IDS } from './osintPlugins.js';

async function chatApi(path, body) {
  const res = await fetch(path, {
    method: body === undefined ? 'GET' : 'POST',
    headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  let json = null;
  try { json = await res.json(); } catch { json = null; }
  if (!res.ok || (json && json.ok === false)) {
    const msg = (json && (json.error || json.message)) || `HTTP ${res.status}`;
    const err = new Error(msg);
    err.status = res.status;
    err.detail = json;
    throw err;
  }
  return json;
}

const STARTER_PROMPTS = [
  'Summarize recent public sentiment about early-warning drone-defense systems in the Gulf.',
  'Pull public profile context for a named public account for verification purposes.',
  'What has been publicly reported about civilian air-defense readiness in the region?',
  'Cross-check a location description against public street-view imagery.',
];

/** Plugin multi-select — one collapsible group per catalog category. */
function PluginToolkit({ selected, onToggle, onReset, open, onToggleOpen }) {
  return (
    <div className="chat-tools">
      <button type="button" className="chat-tools__head" onClick={onToggleOpen} aria-expanded={open}>
        <span className="chat-tools__title">
          <RadioIcon size={12} strokeWidth={1.9} /> OSINT tools · {selected.length}/{MAX_PLUGIN_IDS} attached
        </span>
        {open ? <ChevronDown size={13} strokeWidth={1.9} /> : <ChevronRight size={13} strokeWidth={1.9} />}
      </button>
      {open && (
        <div className="chat-tools__body">
          {OSINT_PLUGIN_GROUPS.map((g) => (
            <div key={g.group} className="chat-tools__group">
              <div className="chat-tools__group-label">{g.group}</div>
              <div className="chat-tools__chips">
                {g.items.map((item) => {
                  const on = selected.includes(item.pluginId);
                  return (
                    <button
                      key={item.pluginId}
                      type="button"
                      className={`chat-tool-chip ${on ? 'on' : ''}`}
                      title={item.note}
                      onClick={() => onToggle(item.pluginId)}
                    >
                      {item.name}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          <button type="button" className="chat-tools__reset" onClick={onReset}>
            <RotateCcw size={11} strokeWidth={1.9} /> Reset to defaults
          </button>
        </div>
      )}
    </div>
  );
}

function SourceChips({ pluginIds }) {
  if (!pluginIds?.length) return null;
  return (
    <div className="chat-bubble__sources">
      {pluginIds.map((id) => (
        <span key={id} className="chat-source-chip" title={id}>
          {OSINT_PLUGIN_BY_ID[id]?.name || id}
        </span>
      ))}
    </div>
  );
}

function ChatBubble({ msg }) {
  const isUser = msg.role === 'user';
  return (
    <div className={`chat-bubble ${isUser ? 'user' : 'assistant'}`}>
      <div className="chat-bubble__role">{isUser ? 'ANALYST' : 'OSINT ASSISTANT'}</div>
      <div className="chat-bubble__text">
        {msg.pending ? (
          <span className="chat-bubble__pending"><Loader2 size={13} className="spin" /> Researching…</span>
        ) : msg.error ? (
          <span className="chat-bubble__error"><AlertTriangle size={12} strokeWidth={1.9} /> {msg.text}</span>
        ) : (
          msg.text
        )}
      </div>
      {!isUser && !msg.pending && !msg.error && <SourceChips pluginIds={msg.pluginIds} />}
      {!isUser && !msg.pending && !msg.error && (
        <div className="chat-bubble__caveat">Illustrative research aid — verify before treating as confirmed intelligence.</div>
      )}
    </div>
  );
}

export default function ChatPanel() {
  const [health, setHealth] = useState(null); // { ok, hasApiKey, endpointId, model, pluginCount } | 'error'
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [selectedIds, setSelectedIds] = useState(OSINT_DEFAULT_PLUGIN_IDS);
  const [toolsOpen, setToolsOpen] = useState(false);
  const streamRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const h = await chatApi('/api/chat/health');
        if (!cancelled) setHealth(h);
      } catch {
        if (!cancelled) setHealth({ ok: false, hasApiKey: false });
      }
    })();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (streamRef.current) streamRef.current.scrollTop = streamRef.current.scrollHeight;
  }, [messages]);

  const toggleTool = useCallback((pluginId) => {
    setSelectedIds((prev) => {
      if (prev.includes(pluginId)) return prev.filter((id) => id !== pluginId);
      if (prev.length >= MAX_PLUGIN_IDS) return prev; // documented pluginIds cap
      return [...prev, pluginId];
    });
  }, []);
  const resetTools = useCallback(() => setSelectedIds(OSINT_DEFAULT_PLUGIN_IDS), []);

  const ensureSession = useCallback(async () => {
    if (sessionId) return sessionId;
    const r = await chatApi('/api/chat/session', { pluginIds: selectedIds });
    setSessionId(r.sessionId);
    return r.sessionId;
  }, [sessionId, selectedIds]);

  const send = useCallback(async (raw) => {
    const query = (raw ?? text).trim();
    if (!query || busy) return;
    if (health && health.hasApiKey === false) {
      setMessages((m) => [...m, { id: `u-${Date.now()}`, role: 'user', text: query }, {
        id: `e-${Date.now()}`, role: 'assistant', error: true,
        text: 'OnDemand API key is not configured on this deployment (ON_DEMAND_API_KEY / VITE_ONDEMAND_API_KEY). Set it as an environment variable to enable live OSINT research.',
      }]);
      setText('');
      return;
    }
    setText('');
    const userMsg = { id: `u-${Date.now()}`, role: 'user', text: query };
    const pendingMsg = { id: `a-${Date.now()}`, role: 'assistant', pending: true, text: '' };
    setMessages((m) => [...m, userMsg, pendingMsg]);
    setBusy(true);
    try {
      const sid = await ensureSession();
      const turn = await chatApi('/api/chat/query', { sessionId: sid, text: query, pluginIds: selectedIds });
      setMessages((m) => m.map((x) => (x.id === pendingMsg.id
        ? { ...x, pending: false, text: turn.answer || '(no answer text returned)', pluginIds: selectedIds }
        : x)));
    } catch (err) {
      setMessages((m) => m.map((x) => (x.id === pendingMsg.id
        ? { ...x, pending: false, error: true, text: err?.message || 'Request failed.' }
        : x)));
    } finally {
      setBusy(false);
    }
  }, [text, busy, health, ensureSession, selectedIds]);

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const keyMissing = health && health.hasApiKey === false;
  const isEmpty = messages.length === 0;

  return (
    <div className="chat-pane">
      <div className="chat-scope-banner">
        <ShieldAlert size={13} strokeWidth={1.9} />
        <span>OSINT research only — defensive &amp; preventive. No attack planning, targeting, sabotage, malware, or intrusion guidance.</span>
      </div>

      {keyMissing && (
        <div className="chat-key-banner">
          <Info size={13} strokeWidth={1.9} />
          <span>
            Live research is disabled — the server has no <code>ON_DEMAND_API_KEY</code> configured.
            Set it as an environment variable (server-side, or <code>VITE_ONDEMAND_API_KEY</code> for a
            direct-browser deployment) to enable this tab.
          </span>
        </div>
      )}

      <div className="chat-stream" ref={streamRef}>
        {isEmpty ? (
          <div className="chat-empty">
            <div className="chat-empty__title"><Search size={16} strokeWidth={1.75} /> OSINT research assistant</div>
            <p>
              Ask about publicly available information — social-media context, open reporting, public
              geolocation references — for defensive awareness. Every answer is illustrative research
              support, not confirmed intelligence.
            </p>
            <div className="chat-starters">
              {STARTER_PROMPTS.map((p) => (
                <button key={p} type="button" className="chat-starter" onClick={() => send(p)} disabled={busy}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((m) => <ChatBubble key={m.id} msg={m} />)
        )}
      </div>

      <PluginToolkit
        selected={selectedIds}
        onToggle={toggleTool}
        onReset={resetTools}
        open={toolsOpen}
        onToggleOpen={() => setToolsOpen((o) => !o)}
      />

      <div className="chat-composer">
        <textarea
          rows={1}
          className="chat-composer__input"
          placeholder="Ask the OSINT assistant…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKeyDown}
          disabled={busy}
        />
        <button type="button" className="chat-composer__send" onClick={() => send()} disabled={busy || !text.trim()} title="Send">
          {busy ? <Loader2 size={15} className="spin" /> : <Send size={15} strokeWidth={1.9} />}
        </button>
      </div>
      <div className="chat-footnote">
        DeepSeek V4 Pro · {selectedIds.length} OnDemand tool{selectedIds.length === 1 ? '' : 's'} attached · illustrative research aid only
      </div>
    </div>
  );
}
