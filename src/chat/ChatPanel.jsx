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
 * Vercel function). Model: Grok 4.6 (predefined-xai-grok4.6). Tool catalog:
 * src/chat/osintPlugins.js (existing OnDemand plugins only — no new
 * plugin/tool created here).
 *
 * STREAMING UX — patterned after navnit28/ondemand-hq's Chat client
 * (src/ondemandDirect.js + src/components/playground/ThinkingProcess.jsx +
 * StatusLogBlock.jsx), NOT a pixel-clone of that repo's chrome:
 *   - submitQuery is called with responseMode:'stream'; the raw upstream SSE
 *     body is read incrementally via fetch()+ReadableStream (no EventSource,
 *     which can't POST or set the `apikey` header).
 *   - Five independent live channels per turn, matching the raw upstream
 *     eventTypes: `thinking` (planning_thinking/step_thinking .thinking.delta),
 *     `planningAnswer`/`pluginAnswer` (planning_output/step_output
 *     .output.delta — parsed for plugin-call names to drive the status
 *     chips), and `text` (fulfillment .answer — the final rendered answer).
 *   - A "Thinking" panel toggle shows/hides the live reasoning stream; it
 *     auto-collapses the instant the final answer starts (same UX rule as
 *     ondemand-hq's ThinkingProcess.jsx) but stays user-reopenable.
 *   - A reasoning-mode selector (Low / Medium / Max) sends the OnDemand
 *     `reasoningEffort` field with the query.
 *   - Any http(s) image URL detected in the streamed answer (a bare URL or a
 *     markdown ![alt](url)) renders inline as a thumbnail AND keeps a
 *     separate Download link — this is IN ADDITION TO plain markdown <img>
 *     rendering (already permitted by dissect()/Markdown below).
 */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Search, Send, ShieldAlert, Loader2, ChevronDown, ChevronRight,
  Radio as RadioIcon, AlertTriangle, RotateCcw, Info, Brain, Download,
} from 'lucide-react';
import { OSINT_PLUGIN_GROUPS, OSINT_DEFAULT_PLUGIN_IDS, OSINT_PLUGIN_BY_ID, MAX_PLUGIN_IDS } from './osintPlugins.js';

const REASONING_MODES = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'max', label: 'Max' },
];

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

/** Bare/markdown image URLs found anywhere in `text` -> unique array of URLs. */
const IMG_URL_RE = /(?:!\[[^\]]*\]\()?(https?:\/\/[^\s)"']+\.(?:png|jpe?g|gif|webp|svg)(?:\?[^\s)"']*)?)\)?/gi;
function extractImageUrls(text) {
  if (!text) return [];
  const out = new Set();
  let m;
  IMG_URL_RE.lastIndex = 0;
  // eslint-disable-next-line no-cond-assign
  while ((m = IMG_URL_RE.exec(text))) out.add(m[1]);
  return [...out];
}
function fileNameFromUrl(url) {
  try {
    return decodeURIComponent(new URL(url).pathname.split('/').filter(Boolean).pop() || 'image');
  } catch {
    return 'image';
  }
}

const STARTER_PROMPTS = [
  'Summarize recent public sentiment about early-warning drone-defense systems in the Gulf.',
  'Pull public profile context for a named public account for verification purposes.',
  'What has been publicly reported about civilian air-defense readiness in the region?',
  'Cross-check a location description against public street-view imagery.',
];

/** Reasoning-mode selector — sends OnDemand's `reasoningEffort` field on submit. */
function ReasoningModeSelector({ value, onChange, disabled }) {
  return (
    <div className="chat-reasoning" role="radiogroup" aria-label="Reasoning mode">
      <span className="chat-reasoning__label"><Brain size={11} strokeWidth={1.9} /> Reasoning</span>
      <div className="chat-reasoning__seg">
        {REASONING_MODES.map((m) => (
          <button
            key={m.value}
            type="button"
            role="radio"
            aria-checked={value === m.value}
            className={`chat-reasoning__btn ${value === m.value ? 'on' : ''}`}
            onClick={() => onChange(m.value)}
            disabled={disabled}
          >
            {m.label}
          </button>
        ))}
      </div>
    </div>
  );
}

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

/** Live "Thinking" panel — streamed reasoning tokens, collapsible, auto-collapses on first answer token. */
function ThinkingPanel({ thinking, live, answerStarted }) {
  const [open, setOpen] = useState(true);
  const [latched, setLatched] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (!latched && answerStarted) { setOpen(false); setLatched(true); }
  }, [answerStarted, latched]);

  useEffect(() => {
    if (open && bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [thinking, open]);

  if (!thinking?.trim()) return null;
  return (
    <div className="chat-thinking">
      <button type="button" className="chat-thinking__head" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span className="chat-thinking__label">
          <Brain size={12} strokeWidth={1.9} /> Thinking{live && !answerStarted ? '…' : ''}
        </span>
        <ChevronDown size={13} strokeWidth={1.9} className={`chat-thinking__chev ${open ? 'open' : ''}`} />
      </button>
      {open && (
        <div className="chat-thinking__body" ref={bodyRef}>
          {thinking}
        </div>
      )}
    </div>
  );
}

/** Live plugin/tool-call status chips — one per attached plugin actually invoked this turn. */
function PluginStatusChips({ activeNames, doneNames }) {
  if (!activeNames.length && !doneNames.length) return null;
  return (
    <div className="chat-plugin-status">
      {doneNames.map((n) => (
        <span key={`d-${n}`} className="chat-plugin-chip done">{n}</span>
      ))}
      {activeNames.map((n) => (
        <span key={`a-${n}`} className="chat-plugin-chip active">
          <Loader2 size={10} className="spin" /> {n}
        </span>
      ))}
    </div>
  );
}

/** Inline image renderer + persistent download link, for any image URL detected in the answer. */
function InlineImages({ urls }) {
  if (!urls.length) return null;
  return (
    <div className="chat-bubble__images">
      {urls.map((url) => (
        <figure key={url} className="chat-img-card">
          <img src={url} alt="Assistant-provided" loading="lazy" />
          <figcaption>
            <a href={url} target="_blank" rel="noopener noreferrer" download>
              <Download size={11} strokeWidth={1.9} /> {fileNameFromUrl(url)}
            </a>
          </figcaption>
        </figure>
      ))}
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
  const imageUrls = useMemo(() => (isUser ? [] : extractImageUrls(msg.text)), [isUser, msg.text]);
  const activeNames = msg.activePlugins || [];
  const doneNames = msg.donePlugins || [];

  return (
    <div className={`chat-bubble ${isUser ? 'user' : 'assistant'}`}>
      <div className="chat-bubble__role">{isUser ? 'ANALYST' : 'OSINT ASSISTANT'}</div>

      {!isUser && <ThinkingPanel thinking={msg.thinking} live={msg.pending} answerStarted={Boolean(msg.text?.trim())} />}
      {!isUser && <PluginStatusChips activeNames={activeNames} doneNames={doneNames} />}

      <div className="chat-bubble__text">
        {msg.pending && !msg.text?.trim() && !msg.thinking?.trim() && !activeNames.length && !doneNames.length ? (
          <span className="chat-bubble__pending"><Loader2 size={13} className="spin" /> Researching…</span>
        ) : msg.error ? (
          <span className="chat-bubble__error"><AlertTriangle size={12} strokeWidth={1.9} /> {msg.text}</span>
        ) : (
          <>
            {msg.text}
            {msg.pending && msg.text?.trim() && <span className="chat-bubble__cursor" aria-hidden />}
          </>
        )}
      </div>

      {!isUser && !msg.error && <InlineImages urls={imageUrls} />}
      {!isUser && !msg.pending && !msg.error && <SourceChips pluginIds={msg.pluginIds} />}
      {!isUser && !msg.pending && !msg.error && (
        <div className="chat-bubble__caveat">Illustrative research aid — verify before treating as confirmed intelligence.</div>
      )}
    </div>
  );
}

/**
 * Parse plugin/tool names opportunistically out of the streamed step_output
 * JSON (same fenced/bare-JSON shape documented in ondemand-hq's
 * parseAgentic.js: {"plugins":[{"pluginId":"...","name":"..."}]}). Tolerates a
 * half-written payload — returns [] until the JSON closes.
 */
function parsePluginNamesFromStepOutput(raw) {
  if (!raw) return [];
  const fenceMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidate = fenceMatch ? fenceMatch[1] : raw;
  try {
    const parsed = JSON.parse(candidate);
    if (Array.isArray(parsed?.plugins)) {
      return parsed.plugins.map((p) => p.name || p.identifier || p.pluginId).filter(Boolean);
    }
  } catch { /* still streaming */ }
  return [];
}

export default function ChatPanel() {
  const [health, setHealth] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [selectedIds, setSelectedIds] = useState(OSINT_DEFAULT_PLUGIN_IDS);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [reasoningEffort, setReasoningEffort] = useState('medium');
  const streamRef = useRef(null);
  const abortRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const h = await chatApi('/api/chat/health');
        if (!cancelled) {
          setHealth(h);
          if (h?.defaultReasoningEffort) setReasoningEffort(h.defaultReasoningEffort);
        }
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

  /**
   * Reads the raw SSE body from POST /api/chat/query?stream=1 and dispatches
   * each frame to `onEvent(eventType, evt)` — a byte-for-byte pass-through of
   * whatever OnDemand itself sent (see server/chatLiveProxy.js). Terminates on
   * a literal `data: [DONE]` line.
   */
  const streamQuery = useCallback(async (sid, query, pluginIds, effort, onEvent, signal) => {
    const res = await fetch('/api/chat/query?stream=1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId: sid, text: query, pluginIds, reasoningEffort: effort }),
      signal,
    });
    if (!res.ok || !res.body) {
      let detail = null;
      try { detail = await res.json(); } catch { /* not JSON */ }
      throw new Error(detail?.error || `HTTP ${res.status}`);
    }
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buf = '';
    const processLine = (rawLine) => {
      const line = rawLine.replace(/\r$/, '');
      if (!line.startsWith('data:')) return; // ignore blank lines / `event:` / SSE comments
      const payload = line.slice(5).trim();
      if (payload === '[DONE]') { onEvent('stream_end', {}); return; }
      let evt;
      try { evt = JSON.parse(payload); } catch { return; }
      const et = evt.eventType || evt.type;
      if (!et) return; // heartbeat {sessionId,messageId,time} — no UI action
      onEvent(et, evt);
    };
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        buf += decoder.decode();
        if (buf.trim()) processLine(buf);
        break;
      }
      buf += decoder.decode(value, { stream: true });
      let idx;
      while ((idx = buf.indexOf('\n')) >= 0) {
        processLine(buf.slice(0, idx));
        buf = buf.slice(idx + 1);
      }
    }
  }, []);

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
    const liveId = `a-${Date.now()}`;
    const liveMsg = {
      id: liveId, role: 'assistant', pending: true, text: '', thinking: '',
      toolRaw: '', activePlugins: [], donePlugins: [],
    };
    setMessages((m) => [...m, userMsg, liveMsg]);
    setBusy(true);
    const ac = new AbortController();
    abortRef.current = ac;

    const patch = (fn) => setMessages((m) => m.map((x) => (x.id === liveId ? fn(x) : x)));

    try {
      const sid = await ensureSession();
      await streamQuery(sid, query, selectedIds, reasoningEffort, (type, evt) => {
        if (type === 'planning_thinking' || type === 'step_thinking') {
          const delta = evt?.thinking?.delta;
          if (typeof delta === 'string' && delta) patch((x) => ({ ...x, thinking: (x.thinking || '') + delta }));
        } else if (type === 'step_output') {
          const delta = evt?.output?.delta || '';
          patch((x) => {
            const toolRaw = (x.toolRaw || '') + delta;
            const names = parsePluginNamesFromStepOutput(toolRaw);
            return names.length ? { ...x, toolRaw, activePlugins: names } : { ...x, toolRaw };
          });
        } else if (type === 'planning_output') {
          // Planning-phase JSON — consumed for future step-query display; no direct UI field yet.
        } else if (type === 'fulfillment') {
          if (typeof evt.answer === 'string' && evt.answer) {
            patch((x) => ({
              ...x,
              text: (x.text || '') + evt.answer,
              donePlugins: x.activePlugins.length ? x.activePlugins : x.donePlugins,
              activePlugins: [],
            }));
          }
        } else if (type === 'error') {
          const msg = evt.message || evt.userMessage || 'Upstream error';
          patch((x) => ({ ...x, error: true, text: msg, pending: false }));
        }
        // 'statusLog' / 'metricsLog' / 'stream_end' / heartbeats: no dedicated UI channel here.
      }, ac.signal);

      patch((x) => ({
        ...x,
        pending: false,
        pluginIds: selectedIds,
        donePlugins: x.activePlugins.length ? x.activePlugins : x.donePlugins,
        activePlugins: [],
        text: x.text || (x.error ? x.text : '(no answer text returned)'),
      }));
    } catch (err) {
      if (err.name === 'AbortError') {
        patch((x) => ({ ...x, pending: false }));
      } else {
        patch((x) => ({ ...x, pending: false, error: true, text: err?.message || 'Request failed.' }));
      }
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  }, [text, busy, health, ensureSession, selectedIds, reasoningEffort, streamQuery]);

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const keyMissing = health && health.hasApiKey === false;
  const isEmpty = messages.length === 0;
  const modelLabel = health?.modelLabel || 'Grok 4.6';

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

      <ReasoningModeSelector value={reasoningEffort} onChange={setReasoningEffort} disabled={busy} />

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
        {modelLabel} · {REASONING_MODES.find((m) => m.value === reasoningEffort)?.label || reasoningEffort} reasoning ·{' '}
        {selectedIds.length} OnDemand tool{selectedIds.length === 1 ? '' : 's'} attached · illustrative research aid only
      </div>
    </div>
  );
}
