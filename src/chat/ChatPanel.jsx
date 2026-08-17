/**
 * ChatPanel.jsx — Chat tab: a rich, Perplexity-style OSINT (open-source
 * intelligence) research assistant panel that fits the existing
 * Palantir/Foundry chrome (same `.panel` / `.panel-h` / `.kv` / `.wide-btn`
 * classes as the Theatre tab's left/right rails — see src/styles.css).
 *
 * DEFENSIVE / PREVENTIVE OSINT RESEARCH ONLY. No attack planning, targeting,
 * sabotage, malware, or intrusion techniques — enforced both by the
 * server-side fulfillment prompt (server/chatLiveProxy.js /
 * api/chat/[action].js) and by the on-screen scope banner below.
 *
 * Wired to the LIVE OnDemand public Chat & Agent Tools API via /api/chat/*
 * (dev: server/chatLiveProxy.js Vite middleware; prod: api/chat/[action].js
 * Vercel function). Model: Gemini 3.7 Flash (predefined-gemini-3.7-flash) —
 * UNTOUCHED on this turn; every session/query/reasoning/streaming call below
 * is byte-identical to the prior turn's wiring. Tool catalog:
 * src/chat/osintPlugins.js (existing OnDemand plugins only — no new
 * plugin/tool created here).
 *
 * STREAMING UX — patterned after navnit28/ondemand-hq's Chat client
 * (src/ondemandDirect.js + src/components/playground/ThinkingProcess.jsx +
 * StatusLogBlock.jsx + parseAgentic.js), NOT a pixel-clone of that repo's
 * chrome:
 *   - submitQuery is called with responseMode:'stream'; the raw upstream SSE
 *     body is read incrementally via fetch()+ReadableStream (no EventSource,
 *     which can't POST or set the `apikey` header).
 *   - Five independent live channels per turn, matching the raw upstream
 *     eventTypes: `thinking` (planning_thinking/step_thinking .thinking.delta),
 *     `planningAnswer`/`pluginAnswer` (planning_output/step_output
 *     .output.delta — parsed for plugin-call names+params to drive the status
 *     chips AND the smart-renderer cards below), and `text` (fulfillment
 *     .answer — the final rendered answer).
 *   - A "Thinking" panel toggle shows/hides the live reasoning stream; it
 *     auto-collapses the instant the final answer starts (same UX rule as
 *     ondemand-hq's ThinkingProcess.jsx) but stays user-reopenable.
 *   - A reasoning-mode selector (Low / Medium / Max) sends the OnDemand
 *     `reasoningEffort` field with the query.
 *
 * RICH ANSWER CHROME (this turn's addition — src/chat/streamParsing.js,
 * renderers.jsx, markdownLite.jsx, Lightbox.jsx, SourcesDrawer.jsx):
 *   - LIVE-VERIFIED WIRE FACT (three smoke tests run against this exact
 *     deployment on 2026-08-15 before writing any of this): the OnDemand SSE
 *     stream never exposes structured tool-RESULT JSON — only tool-CALL
 *     intent (`step_output`: pluginId/name/api_request_parameters) and the
 *     model's own prose synthesis (`fulfillment.answer`). One of those three
 *     probes (a live getMapView call) genuinely 500'd, which is what the
 *     Map2D/Map3D fallback cards below actually handle — not a hypothetical.
 *     Every "smart card" extractor in streamParsing.js is therefore an
 *     honest best-effort parser over that prose + the real call parameters,
 *     never a fabricated structured-JSON contract; it returns null (falls
 *     back to the plain answer text) whenever the prose doesn't contain
 *     enough signal to populate a card confidently.
 *   - Any http(s) image URL detected in the streamed answer (bare or
 *     markdown ![alt](url)) renders inline as a rounded dark-framed
 *     thumbnail; 3+ images collapse into a 2xN grid. Every in-thread image
 *     (assistant OR user-attached) opens a full lightbox + right-hand "Find
 *     Information" panel on click.
 *   - Markdown [label](url) links in the answer that match a citation are
 *     rendered as numbered circular pills — clicking one (or the "Sources"
 *     control) opens a right-side Sources drawer with a full card per pill.
 *   - Composer supports image attachments: thumbnail-before-send with an
 *     x-remove chip + filename. These render inline in the user's own bubble
 *     immediately. NOTE (grounded in the live `submitquery` OpenAPI schema,
 *     re-fetched this turn — query/endpointId/responseMode/pluginIds/
 *     fulfillmentOnly/modelConfigs only): the documented API has no
 *     image/attachment field, so attached files are NOT transmitted as pixel
 *     data to the model — only their filenames are appended to the outbound
 *     query text as context. This is disclosed, not silently faked.
 */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Search, Send, ShieldAlert, Loader2, ChevronDown, ChevronRight,
  Radio as RadioIcon, AlertTriangle, RotateCcw, Info, Brain, Download,
  Paperclip, X as XIcon,
} from 'lucide-react';
import { OSINT_PLUGIN_GROUPS, OSINT_DEFAULT_PLUGIN_IDS, OSINT_PLUGIN_BY_ID, MAX_PLUGIN_IDS } from './osintPlugins.js';
import {
  extractImageUrls, fileNameFromUrl, parsePluginCallsFull, buildSmartCards,
  extractAllForMessage, extractCitations, extractCitationSnippet, citationPluginName,
  buildFindInformation, buildFollowUps, RENDERER_KIND,
} from './streamParsing.js';
import {
  InstagramProfileCard, InstagramCarousel, Map2DCard, Map3DCard, RedditThreadStack,
  CitationChipRow, ImageGrid, FollowUpChips,
} from './renderers.jsx';
import { renderAnswerMarkdown } from './markdownLite.jsx';
import ImageLightbox from './Lightbox.jsx';
import SourcesDrawer from './SourcesDrawer.jsx';

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
  const ct = (res.headers.get('content-type') || '').toLowerCase();
  let json = null;
  if (ct.includes('application/json')) {
    try { json = await res.json(); } catch { json = null; }
  } else {
    const err = new Error(
      res.ok
        ? 'Chat API returned HTML instead of JSON — /api/chat is not mounted on this host.'
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

/**
 * Inline image renderer for the answer body — rounded dark frame, object-cover
 * thumbnail, click-to-expand into the full lightbox, download affordance
 * revealed on hover (CSS). 3+ images are handled by <ImageGrid> instead
 * (denser Perplexity-style layout); this component covers 1-2.
 */
function InlineImages({ urls, onOpen }) {
  if (!urls.length) return null;
  return (
    <div className="chat-bubble__images">
      {urls.map((url, i) => (
        <figure key={url} className="chat-img-card">
          <button type="button" className="chat-img-card__btn" onClick={() => onOpen(urls, i)} title="Expand image">
            <img src={url} alt="Assistant-provided — illustrative, not confirmed intelligence" loading="lazy" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          </button>
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

/** User-attached image thumbnails rendered inline in the user's own bubble. */
function UserAttachedImages({ images, onOpen }) {
  if (!images?.length) return null;
  return (
    <div className="chat-bubble__images chat-bubble__images--user">
      {images.map((img, i) => (
        <figure key={img.url} className="chat-img-card">
          <button type="button" className="chat-img-card__btn" onClick={() => onOpen(images.map((x) => x.url), i)} title="Expand image">
            <img src={img.url} alt={img.name || 'Uploaded'} loading="lazy" />
          </button>
          <figcaption><span className="chat-img-card__name">{img.name}</span></figcaption>
        </figure>
      ))}
    </div>
  );
}

/** Attached-tools chips (session-scoped, distinct from in-answer citations below). */
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

/** Dispatch a plugin call list to its smart-renderer cards (Instagram/Map/Reddit). */
function SmartCards({ cards, onOpenLightbox }) {
  if (!cards.length) return null;
  return (
    <div className="chat-bubble__cards">
      {cards.map(({ kind, data }) => {
        if (kind === RENDERER_KIND.INSTAGRAM_PROFILE) return <InstagramProfileCard key={kind} data={data} />;
        if (kind === RENDERER_KIND.INSTAGRAM_MEDIA) {
          // Videos have no still frame to show in an image lightbox — only
          // image-kind items are ever passed through; if the clicked item was
          // itself a video, land on the nearest image (index 0 of the filtered
          // set) rather than mis-mapping to an unrelated index.
          const imageItems = data.filter((it) => it.kind !== 'video');
          const imageUrls = imageItems.map((it) => it.url);
          return (
            <InstagramCarousel
              key={kind}
              items={data}
              onOpen={(urls, i) => {
                if (!imageUrls.length) return;
                const clicked = data[i];
                const mapped = clicked && clicked.kind !== 'video' ? imageItems.findIndex((it) => it.url === clicked.url) : 0;
                onOpenLightbox(imageUrls, mapped >= 0 ? mapped : 0);
              }}
            />
          );
        }
        if (kind === RENDERER_KIND.MAP_2D) return <Map2DCard key={kind} data={data} />;
        if (kind === RENDERER_KIND.MAP_3D) return <Map3DCard key={kind} data={data} />;
        if (kind === RENDERER_KIND.REDDIT) return <RedditThreadStack key={kind} data={data} />;
        return null;
      })}
    </div>
  );
}

function ChatBubble({ msg, isLast, busy, onOpenLightbox, onOpenDrawer, onFollowUp }) {
  const isUser = msg.role === 'user';
  const imageUrls = useMemo(() => (isUser ? [] : extractImageUrls(msg.text)), [isUser, msg.text]);
  const activeNames = msg.activePlugins || [];
  const doneNames = msg.donePlugins || [];

  const calls = useMemo(() => parsePluginCallsFull(msg.toolRaw), [msg.toolRaw]);
  const smartCards = useMemo(() => (isUser ? [] : buildSmartCards(calls, msg.text)), [isUser, calls, msg.text]);
  const citations = useMemo(() => (isUser ? [] : extractCitations(msg.text)), [isUser, msg.text]);
  const extractedAll = useMemo(() => (isUser ? {} : extractAllForMessage(calls, msg.text)), [isUser, calls, msg.text]);
  const followUps = useMemo(
    () => (isLast && !isUser && !msg.pending && !msg.error ? buildFollowUps(extractedAll) : []),
    [isLast, isUser, msg.pending, msg.error, extractedAll],
  );

  const handleOpenLightbox = useCallback((urls, index) => {
    onOpenLightbox(urls, index, msg, extractedAll);
  }, [onOpenLightbox, msg, extractedAll]);

  const handleCiteClick = useCallback((n) => {
    onOpenDrawer(msg, n);
  }, [onOpenDrawer, msg]);

  const useGrid = imageUrls.length >= 3;

  return (
    <div className={`chat-bubble ${isUser ? 'user' : 'assistant'}`}>
      <div className="chat-bubble__role">{isUser ? 'ANALYST' : 'OSINT ASSISTANT'}</div>

      {isUser && <UserAttachedImages images={msg.images} onOpen={(urls, i) => onOpenLightbox(urls, i, msg, {})} />}
      {!isUser && <ThinkingPanel thinking={msg.thinking} live={msg.pending} answerStarted={Boolean(msg.text?.trim())} />}
      {!isUser && <PluginStatusChips activeNames={activeNames} doneNames={doneNames} />}
      {!isUser && !msg.pending && !msg.error && <SmartCards cards={smartCards} onOpenLightbox={handleOpenLightbox} />}

      <div
        className="chat-bubble__text"
        role={isUser ? undefined : 'status'}
        aria-live={isUser ? undefined : 'polite'}
      >
        {msg.pending && !msg.text?.trim() && !msg.thinking?.trim() && !activeNames.length && !doneNames.length ? (
          <span className="chat-bubble__pending"><Loader2 size={13} className="spin" /> Researching…</span>
        ) : msg.error ? (
          <span className="chat-bubble__error"><AlertTriangle size={12} strokeWidth={1.9} /> {msg.text}</span>
        ) : isUser ? (
          msg.text
        ) : (
          <>
            {renderAnswerMarkdown(msg.text, citations, handleCiteClick)}
            {msg.pending && msg.text?.trim() && <span className="chat-bubble__cursor" aria-hidden />}
          </>
        )}
      </div>

      {!isUser && !msg.error && (useGrid
        ? <ImageGrid urls={imageUrls} onOpen={handleOpenLightbox} />
        : <InlineImages urls={imageUrls} onOpen={handleOpenLightbox} />)}
      {!isUser && !msg.pending && !msg.error && <CitationChipRow citations={citations} onOpenDrawer={handleCiteClick} />}
      {!isUser && !msg.pending && !msg.error && <SourceChips pluginIds={msg.pluginIds} />}
      {!isUser && !msg.pending && !msg.error && (
        <div className="chat-bubble__caveat">Illustrative research aid — verify before treating as confirmed intelligence.</div>
      )}
      {!isUser && followUps.length > 0 && <FollowUpChips chips={followUps} onPick={onFollowUp} disabled={busy} />}
    </div>
  );
}

let attachmentSeq = 0;

export default function ChatPanel() {
  const [health, setHealth] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [selectedIds, setSelectedIds] = useState(OSINT_DEFAULT_PLUGIN_IDS);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [reasoningEffort, setReasoningEffort] = useState('medium');
  const [attachments, setAttachments] = useState([]); // [{id, url, name}] — composer thumbnails-before-send
  const [lightbox, setLightbox] = useState(null); // {urls, index, findInfo}
  const [drawer, setDrawer] = useState(null); // {citations, focusN, snippetLookup, pluginLookup}
  const streamRef = useRef(null);
  const abortRef = useRef(null);
  const fileInputRef = useRef(null);

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

  // ---- composer image attachments (thumbnail-before-send + x-remove chip) ----
  const onAttachFiles = useCallback((fileList) => {
    const files = Array.from(fileList || []).filter((f) => f.type.startsWith('image/'));
    if (!files.length) return;
    const next = files.map((f) => ({ id: `att-${Date.now()}-${attachmentSeq += 1}`, url: URL.createObjectURL(f), name: f.name }));
    setAttachments((prev) => [...prev, ...next].slice(0, 6));
  }, []);
  const removeAttachment = useCallback((id) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  }, []);

  // ---- lightbox / find-information ----
  const openLightbox = useCallback((urls, index, msg, extractedAll) => {
    const findInfo = buildFindInformation(urls[index], msg, extractedAll);
    setLightbox({ urls, index, msg, extractedAll, findInfo });
  }, []);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const navLightbox = useCallback((delta) => {
    setLightbox((prev) => {
      if (!prev) return prev;
      const nextIndex = (prev.index + delta + prev.urls.length) % prev.urls.length;
      return { ...prev, index: nextIndex, findInfo: buildFindInformation(prev.urls[nextIndex], prev.msg, prev.extractedAll) };
    });
  }, []);

  // ---- sources drawer ----
  const openDrawer = useCallback((msg, focusN) => {
    const citations = extractCitations(msg.text);
    if (!citations.length) return;
    setDrawer({
      citations,
      focusN: focusN || null,
      snippetLookup: (c) => extractCitationSnippet(msg.text, c.url),
      pluginLookup: () => citationPluginName(msg.donePlugins),
    });
  }, []);
  const closeDrawer = useCallback(() => setDrawer(null), []);

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
   * a literal `data: [DONE]` line. UNCHANGED from the prior turn.
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
    const pendingAttachments = attachments;
    if ((!query && !pendingAttachments.length) || busy) return;
    if (health && health.hasApiKey === false) {
      setMessages((m) => [...m, { id: `u-${Date.now()}`, role: 'user', text: query }, {
        id: `e-${Date.now()}`, role: 'assistant', error: true,
        text: 'OnDemand API key is not configured on this deployment (ON_DEMAND_API_KEY / VITE_ONDEMAND_API_KEY). Set it as an environment variable to enable live OSINT research.',
      }]);
      setText('');
      return;
    }
    setText('');
    setAttachments([]);

    // Attached filenames are appended as textual context — the documented
    // submitquery schema (query/endpointId/responseMode/pluginIds/
    // fulfillmentOnly/modelConfigs) has no image/attachment field, so the
    // model receives the filenames, not the pixel data. Images still render
    // inline in the user's own bubble immediately (see UserAttachedImages).
    const outboundQuery = pendingAttachments.length
      ? `${query}\n\n[User attached ${pendingAttachments.length} image file(s) for context: ${pendingAttachments.map((a) => a.name).join(', ')}]`
      : query;

    const userMsg = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: query || '(image attached)',
      images: pendingAttachments.length ? pendingAttachments.map((a) => ({ url: a.url, name: a.name })) : undefined,
    };
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
      await streamQuery(sid, outboundQuery, selectedIds, reasoningEffort, (type, evt) => {
        if (type === 'planning_thinking' || type === 'step_thinking') {
          const delta = evt?.thinking?.delta;
          if (typeof delta === 'string' && delta) patch((x) => ({ ...x, thinking: (x.thinking || '') + delta }));
        } else if (type === 'step_output') {
          const delta = evt?.output?.delta || '';
          patch((x) => {
            const toolRaw = (x.toolRaw || '') + delta;
            const names = parsePluginCallsFull(toolRaw).map((c) => c.name);
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
  }, [text, attachments, busy, health, ensureSession, selectedIds, reasoningEffort, streamQuery]);

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const keyMissing = health && health.hasApiKey === false;
  const isEmpty = messages.length === 0;
  const modelLabel = health?.modelLabel || 'Gemini 3.7 Flash';
  const lastAssistantId = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i -= 1) {
      if (messages[i].role === 'assistant') return messages[i].id;
    }
    return null;
  }, [messages]);

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
          messages.map((m) => (
            <ChatBubble
              key={m.id}
              msg={m}
              isLast={m.id === lastAssistantId}
              busy={busy}
              onOpenLightbox={openLightbox}
              onOpenDrawer={openDrawer}
              onFollowUp={(chip) => send(chip)}
            />
          ))
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

      {attachments.length > 0 && (
        <div className="chat-attachments">
          {attachments.map((a) => (
            <div key={a.id} className="chat-attachment-chip">
              <img src={a.url} alt={a.name} />
              <span className="chat-attachment-chip__name">{a.name}</span>
              <button type="button" onClick={() => removeAttachment(a.id)} aria-label={`Remove ${a.name}`}>
                <XIcon size={11} strokeWidth={2.2} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="chat-composer">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="chat-composer__file-input"
          onChange={(e) => { onAttachFiles(e.target.files); e.target.value = ''; }}
        />
        <button
          type="button"
          className="chat-composer__attach"
          onClick={() => fileInputRef.current?.click()}
          disabled={busy}
          title="Attach image"
          aria-label="Attach image"
        >
          <Paperclip size={14} strokeWidth={1.9} />
        </button>
        <textarea
          rows={1}
          className="chat-composer__input"
          placeholder="Ask the OSINT assistant…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKeyDown}
          disabled={busy}
        />
        <button
          type="button"
          className="chat-composer__send"
          onClick={() => send()}
          disabled={busy || (!text.trim() && !attachments.length)}
          title="Send"
          aria-label="Send"
        >
          {busy ? <Loader2 size={15} className="spin" /> : <Send size={15} strokeWidth={1.9} />}
        </button>
      </div>
      <div className="chat-footnote">
        {modelLabel} · {REASONING_MODES.find((m) => m.value === reasoningEffort)?.label || reasoningEffort} reasoning ·{' '}
        {selectedIds.length} OnDemand tool{selectedIds.length === 1 ? '' : 's'} attached · illustrative research aid only
      </div>

      {lightbox && (
        <ImageLightbox
          urls={lightbox.urls}
          index={lightbox.index}
          findInfo={lightbox.findInfo}
          onClose={closeLightbox}
          onNav={navLightbox}
        />
      )}
      {drawer && (
        <SourcesDrawer
          citations={drawer.citations}
          focusN={drawer.focusN}
          onClose={closeDrawer}
          snippetLookup={drawer.snippetLookup}
          pluginLookup={drawer.pluginLookup}
        />
      )}
    </div>
  );
}
