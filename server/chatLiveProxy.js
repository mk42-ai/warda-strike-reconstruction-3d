/**
 * Dev-server middleware for the Chat / OSINT tab. Same shape as
 * server/avmLiveProxy.js — a Vite `configureServer` middleware so `npm run dev`
 * exercises the SAME code path the Vercel serverless function
 * (api/chat/[action].js) uses in production, just without a redeploy per edit.
 *
 * Wraps the LIVE OnDemand public Chat & Agent Tools API, verified against the
 * live OpenAPI docs (GET /config/v1/public/docs/reference/api/{slug}) on
 * 2026-08-15:
 *   - createChatSession   POST /chat/v1/sessions                              (createchatsession)
 *   - submitQuery         POST /chat/v1/sessions/{sessionId}/query            (submitquery)
 *   - getChatSessions     GET  /chat/v1/sessions                              (getchatsessions)
 *   - getChatMessages     GET  /chat/v1/sessions/{sessionId}/messages         (getchatmessages)
 * Auth: header `apikey: <ON_DEMAND_API_KEY>` on every call (server-side only —
 * never sent to or read by the browser). Base host: https://api.on-demand.io.
 *
 * MODEL (live-verified 2026-08-15 against GET /config/v1/public/endpoints):
 *   endpoint_id  predefined-gemini-3.7-flash
 *   endpoint_name gemini-3.7-flash · model_id gemini-3.7-flash · status active
 *   (Google announced Gemini 3.7 Flash 2026-08-13 as its Flash-tier
 *   coding/agents workhorse; this is the corresponding live OnDemand
 *   predefined endpoint — superseded the prior Grok 4.6 wiring on this turn.)
 *   reasoning_efforts: ["low","medium","max"]   <- the THREE official reasoning
 *   modes for this endpoint (same 3-value set repeated on every reasoning-
 *   capable endpoint in the live registry — Sonnet 5, Fable 5, Kimi K3, GLM
 *   5.2, Gemini 3.6 Flash, etc.). Sent as top-level `reasoningEffort` on the
 *   submitQuery body.
 *   GAP (documented vs. live, flagged not invented): the public `submitquery`
 *   OpenAPI schema (fetched fresh this run) does NOT list `reasoningEffort`
 *   among its documented body properties (query, endpointId, responseMode,
 *   pluginIds, fulfillmentOnly, modelConfigs) — it is a live-accepted
 *   extension beyond the published schema, not a documented field. It is sent
 *   here because rejecting it would silently drop reasoning-mode control; if a
 *   future gateway version rejects it, the query still succeeds without it.
 *
 * Tools: agentIds[] (translated from src/chat/osintPlugins.js's plugin-XXXX
 * catalog at the wire boundary — see toAgentIds() below) carries ONLY existing
 * OnDemand plugin ids. No new plugin/tool is created anywhere in this file.
 *
 * STREAMING: submitQuery is called with responseMode:'stream', which returns a
 * raw upstream Server-Sent-Events body. This proxy PASSES THAT SSE BODY THROUGH
 * BYTE-FOR-BYTE to the browser (no re-framing) — the browser-side EventSource-
 * style reader in src/chat/ChatPanel.jsx parses the same raw eventType frames
 * documented/observed in the reference navnit28/ondemand-hq client
 * (src/ondemandDirect.js): planning_thinking/step_thinking carry
 * `.thinking.delta`, planning_output/step_output carry `.output.delta`,
 * fulfillment carries `.answer`, terminated by a literal `data: [DONE]` line.
 *
 * SCOPE GUARD: every session created here is scoped to defensive/preventive
 * OSINT research. The fulfillment prompt explicitly forbids attack planning,
 * targeting, sabotage, malware, or intrusion techniques, and every response
 * carries the same "not confirmed intelligence" caveat used elsewhere in this
 * app (see AVM_INSTRUCTION_PROMPT in server/avmLiveProxy.js for the sibling
 * pattern).
 */
import http from 'node:http';
import https from 'node:https';
import { URL } from 'node:url';
import { OSINT_ALL_PLUGIN_IDS } from '../src/chat/osintPlugins.js';

// Live-verified 2026-08-15: GET /config/v1/public/endpoints -> {endpoint_id:
// "predefined-gemini-3.7-flash", endpoint_name: "gemini-3.7-flash", model_id:
// "gemini-3.7-flash", status: "active", reasoning_efforts: ["low","medium","max"]}.
export const CHAT_ENDPOINT_ID = 'predefined-gemini-3.7-flash';
export const CHAT_MODEL_ID = 'gemini-3.7-flash';
export const CHAT_MODEL_LABEL = 'Gemini 3.7 Flash';

// The three official reasoning modes for this endpoint (live-verified — see
// header comment). Exposed so the UI and the API share one source of truth.
export const REASONING_EFFORTS = ['low', 'medium', 'max'];
export const DEFAULT_REASONING_EFFORT = 'medium';

export const OSINT_SYSTEM_PROMPT =
  'You are the UXE Security Solutions OSINT Research Assistant embedded in the ' +
  'IMP-08 Warda Strike command-center chrome. Purpose: DEFENSIVE and PREVENTIVE ' +
  'open-source research only — early-warning awareness, public social-media and ' +
  'geolocation context, verification of publicly available information. ' +
  'You MUST refuse and redirect if asked for: attack planning, targeting, weapons ' +
  'employment, sabotage, malware, intrusion/hacking techniques, or any operational ' +
  'guidance that could cause harm. Always distinguish between (a) facts an attached ' +
  'tool actually returned and (b) your own inference — never present a simulated, ' +
  'inferred, or illustrative figure as confirmed intelligence. Cite the plugin/tool ' +
  'that sourced each factual claim when tools were used. Keep answers concise and ' +
  'analyst-usable.';

const API_HOST = process.env.ON_DEMAND_API_HOST || 'https://api.on-demand.io';

function apiKey() {
  return (
    process.env.ON_DEMAND_API_KEY ||
    process.env.ONDEMAND_API_KEY ||
    process.env.VITE_ONDEMAND_API_KEY ||
    ''
  );
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8');
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch {
        reject(new Error('invalid_json'));
      }
    });
    req.on('error', reject);
  });
}

function send(res, status, obj) {
  const body = JSON.stringify(obj);
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(body);
}

function odFetch(method, path, body) {
  const key = apiKey();
  if (!key) return Promise.reject(new Error('ON_DEMAND_API_KEY missing on server'));
  const url = new URL(path.startsWith('http') ? path : `${API_HOST}${path}`);
  const payload = body == null ? null : JSON.stringify(body);
  const lib = url.protocol === 'http:' ? http : https;
  return new Promise((resolve, reject) => {
    const req = lib.request(
      {
        protocol: url.protocol,
        hostname: url.hostname,
        port: url.port || (url.protocol === 'http:' ? 80 : 443),
        path: url.pathname + url.search,
        method,
        headers: {
          apikey: key,
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {}),
        },
        timeout: 90000,
      },
      (resp) => {
        const chunks = [];
        resp.on('data', (c) => chunks.push(c));
        resp.on('end', () => {
          const text = Buffer.concat(chunks).toString('utf8');
          let json = null;
          try {
            json = text ? JSON.parse(text) : null;
          } catch {
            json = { raw: text };
          }
          resolve({ status: resp.statusCode || 0, json, text });
        });
      },
    );
    req.on('error', reject);
    req.on('timeout', () => req.destroy(new Error('upstream_timeout')));
    if (payload) req.write(payload);
    req.end();
  });
}

/**
 * Raw streaming fetch — used only by submitOsintQueryStream(). Pipes the
 * upstream response's raw bytes (an SSE body when responseMode:'stream') to a
 * caller-supplied Node response object AS THEY ARRIVE — no buffering, no
 * re-framing — so the browser sees the same incremental frames OnDemand sent.
 * Resolves once the upstream stream ends; rejects on a pre-stream HTTP error
 * (checked before any piping starts) or a transport failure.
 */
function odFetchStream(path, body, res) {
  const key = apiKey();
  if (!key) return Promise.reject(new Error('ON_DEMAND_API_KEY missing on server'));
  const url = new URL(path.startsWith('http') ? path : `${API_HOST}${path}`);
  const payload = JSON.stringify(body);
  const lib = url.protocol === 'http:' ? http : https;
  return new Promise((resolve, reject) => {
    const req = lib.request(
      {
        protocol: url.protocol,
        hostname: url.hostname,
        port: url.port || (url.protocol === 'http:' ? 80 : 443),
        path: url.pathname + url.search,
        method: 'POST',
        headers: {
          apikey: key,
          'Content-Type': 'application/json',
          Accept: 'text/event-stream',
          'Content-Length': Buffer.byteLength(payload),
        },
        timeout: 0, // a research turn can legitimately run long; no client-side cutoff here
      },
      (upstream) => {
        if ((upstream.statusCode || 0) >= 400) {
          const chunks = [];
          upstream.on('data', (c) => chunks.push(c));
          upstream.on('end', () => {
            const text = Buffer.concat(chunks).toString('utf8');
            let json = null;
            try { json = JSON.parse(text); } catch { /* not JSON */ }
            const err = new Error(`stream_http_${upstream.statusCode}`);
            err.status = upstream.statusCode;
            err.detail = json || text;
            reject(err);
          });
          return;
        }
        // Forward SSE headers + pipe raw bytes straight through.
        res.writeHead(200, {
          'Content-Type': 'text/event-stream; charset=utf-8',
          'Cache-Control': 'no-cache, no-transform',
          Connection: 'keep-alive',
          'X-Accel-Buffering': 'no',
        });
        upstream.on('data', (chunk) => res.write(chunk));
        upstream.on('end', () => { res.end(); resolve(); });
        upstream.on('error', (e) => { try { res.end(); } catch { /* already closed */ } reject(e); });
      },
    );
    req.on('error', reject);
    req.on('timeout', () => req.destroy(new Error('upstream_timeout')));
    req.write(payload);
    req.end();
  });
}

/** agent-XXXX -> plugin-XXXX (the shape the live 400 error reports unsubscribed/invalid ids in). */
const toPluginId = (id) => (typeof id === 'string' && id.startsWith('agent-') ? id.replace(/^agent-/, 'plugin-') : id);

/**
 * plugin-XXXX -> agent-XXXX — the wire form the live gateway actually requires.
 * LIVE-VERIFIED 2026-08-15: the documented submitquery/createchatsession OpenAPI
 * schema names the field `pluginIds` carrying `plugin-XXXX` values, but a live probe
 * against THIS gateway returned HTTP 400 "One or more agents are invalid: agent-XXXX"
 * when `pluginIds` (plugin- form) was sent on the QUERY call — the gateway had already
 * translated them to agent- form internally to check validity, then rejected that
 * translated form. Sending `agentIds` (pre-translated agent- form) directly on BOTH
 * session create and query is the form that actually works end-to-end. All internal
 * state in this app (catalog, UI, session cache) stays in plugin- form; only this one
 * wire-boundary translation happens, right before each outbound OnDemand call.
 */
const toAgentIds = (ids = []) => ids.map((id) => (typeof id === 'string' && id.startsWith('plugin-') ? id.replace(/^plugin-/, 'agent-') : id));

const validEffort = (e) => (REASONING_EFFORTS.includes(e) ? e : DEFAULT_REASONING_EFFORT);

/**
 * POST /chat/v1/sessions — createChatSession.
 * RESILIENT: an OnDemand account's plugin subscriptions can change independently of
 * this catalog (verified live: one bonus plugin 400'd with "not subscribed" while the
 * rest of the OSINT set worked). One bad/unsubscribed plugin must never take the whole
 * Chat tab down — on a 400 naming unsubscribed/invalid agent ids, strip exactly those
 * ids and retry once (bounded — never loops).
 */
export async function createOsintSession(pluginIds) {
  let ids = Array.isArray(pluginIds) && pluginIds.length ? [...pluginIds] : [...OSINT_ALL_PLUGIN_IDS];
  for (let attempt = 0; attempt < 2; attempt++) {
    const r = await odFetch('POST', '/chat/v1/sessions', {
      externalUserId: `uxe-warda-osint-${Date.now()}`,
      agentIds: toAgentIds(ids),
    });
    if (r.status < 400) {
      const sessionId = r.json?.data?.id;
      if (!sessionId) {
        const err = new Error('session_missing_id');
        err.detail = r.json;
        throw err;
      }
      return { sessionId, pluginIds: ids, http: r.status };
    }
    const badAgentIds = r.json?.details?.unsubscribedAgentIds || r.json?.details?.invalidAgentIds;
    if (attempt === 0 && Array.isArray(badAgentIds) && badAgentIds.length) {
      const bad = new Set(badAgentIds.map(toPluginId));
      const next = ids.filter((id) => !bad.has(id));
      if (next.length && next.length < ids.length) {
        ids = next; // one bounded retry with the bad plugin(s) stripped
        continue;
      }
    }
    const err = new Error(`session_http_${r.status}`);
    err.detail = r.json || r.text;
    throw err;
  }
  throw new Error('session_create_exhausted');
}

/**
 * POST /chat/v1/sessions/{sessionId}/query — submitQuery, responseMode: sync.
 * Kept for the "get a whole answer, no streaming" callers (e.g. a future batch
 * flow); the Chat tab UI itself now uses submitOsintQueryStream below.
 */
export async function submitOsintQuery(sessionId, userText, pluginIds, reasoningEffort) {
  const query = String(userText || '').trim().slice(0, 4000);
  if (!query) throw new Error('empty_query');
  let ids = Array.isArray(pluginIds) && pluginIds.length ? [...pluginIds] : [...OSINT_ALL_PLUGIN_IDS];
  for (let attempt = 0; attempt < 2; attempt++) {
    const body = {
      query,
      endpointId: CHAT_ENDPOINT_ID,
      responseMode: 'sync',
      reasoningEffort: validEffort(reasoningEffort),
      agentIds: toAgentIds(ids),
      modelConfigs: { fulfillmentPrompt: OSINT_SYSTEM_PROMPT, temperature: 0.4 },
    };
    const r = await odFetch('POST', `/chat/v1/sessions/${encodeURIComponent(sessionId)}/query`, body);
    if (r.status < 400) {
      const data = r.json?.data || {};
      return {
        answer: String(data.answer || '').trim(),
        messageId: data.messageId || null,
        status: data.status || null,
        pluginIds: ids,
        http: r.status,
      };
    }
    const badAgentIds = r.json?.details?.invalidAgentIds || r.json?.details?.unsubscribedAgentIds;
    if (attempt === 0 && Array.isArray(badAgentIds) && badAgentIds.length) {
      const bad = new Set(badAgentIds.map(toPluginId));
      const next = ids.filter((id) => !bad.has(id));
      if (next.length < ids.length) {
        ids = next; // bounded retry with the bad agent(s) stripped — never loops
        continue;
      }
    }
    const err = new Error(`query_http_${r.status}`);
    err.detail = r.json || r.text;
    throw err;
  }
  throw new Error('query_exhausted');
}

/**
 * POST /chat/v1/sessions/{sessionId}/query — submitQuery, responseMode: stream.
 * STREAMS the raw upstream SSE body straight to `res`. Same agentIds wire-form
 * translation and bounded strip-and-retry resilience as submitOsintQuery, but the
 * retry can only happen BEFORE any bytes have been written to `res` (a stream that
 * has already started can't be silently restarted without duplicating output).
 */
export async function submitOsintQueryStream(sessionId, userText, pluginIds, reasoningEffort, res) {
  const query = String(userText || '').trim().slice(0, 4000);
  if (!query) throw new Error('empty_query');
  let ids = Array.isArray(pluginIds) && pluginIds.length ? [...pluginIds] : [...OSINT_ALL_PLUGIN_IDS];
  for (let attempt = 0; attempt < 2; attempt++) {
    const body = {
      query,
      endpointId: CHAT_ENDPOINT_ID,
      responseMode: 'stream',
      reasoningEffort: validEffort(reasoningEffort),
      agentIds: toAgentIds(ids),
      modelConfigs: { fulfillmentPrompt: OSINT_SYSTEM_PROMPT, temperature: 0.4 },
    };
    try {
      await odFetchStream(`/chat/v1/sessions/${encodeURIComponent(sessionId)}/query`, body, res);
      return; // stream completed and piped through successfully
    } catch (err) {
      const badAgentIds = err.detail?.details?.invalidAgentIds || err.detail?.details?.unsubscribedAgentIds;
      if (attempt === 0 && !res.headersSent && Array.isArray(badAgentIds) && badAgentIds.length) {
        const bad = new Set(badAgentIds.map(toPluginId));
        const next = ids.filter((id) => !bad.has(id));
        if (next.length < ids.length) {
          ids = next; // safe to retry — nothing streamed to the browser yet
          continue;
        }
      }
      throw err;
    }
  }
  throw new Error('query_stream_exhausted');
}

/** GET /chat/v1/sessions — getChatSessions (documented query: externalUserId, sort, cursor, limit). */
export async function listOsintSessions({ limit = 10, cursor, sort = 'desc' } = {}) {
  const qs = new URLSearchParams({ sort, limit: String(limit) });
  if (cursor) qs.set('cursor', cursor);
  const r = await odFetch('GET', `/chat/v1/sessions?${qs.toString()}`);
  if (r.status >= 400) {
    const err = new Error(`sessions_list_http_${r.status}`);
    err.detail = r.json || r.text;
    throw err;
  }
  return { sessions: r.json?.data || [], pagination: r.json?.pagination || null, http: r.status };
}

/** GET /chat/v1/sessions/{sessionId}/messages — getChatMessages. */
export async function listOsintMessages(sessionId, { limit = 50, cursor, sort = 'asc' } = {}) {
  const qs = new URLSearchParams({ sort, limit: String(limit) });
  if (cursor) qs.set('cursor', cursor);
  const r = await odFetch('GET', `/chat/v1/sessions/${encodeURIComponent(sessionId)}/messages?${qs.toString()}`);
  if (r.status >= 400) {
    const err = new Error(`messages_list_http_${r.status}`);
    err.detail = r.json || r.text;
    throw err;
  }
  return { messages: r.json?.data || [], pagination: r.json?.pagination || null, http: r.status };
}

export function chatLiveProxyPlugin() {
  return {
    name: 'chat-osint-live-proxy',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        try {
          const url = req.url || '';
          if (!url.startsWith('/api/chat')) return next();

          if (req.method === 'OPTIONS') {
            res.statusCode = 204;
            res.end();
            return;
          }

          if (req.method === 'GET' && (url === '/api/chat/health' || url.startsWith('/api/chat/health?'))) {
            return send(res, 200, {
              ok: true,
              endpointId: CHAT_ENDPOINT_ID,
              model: CHAT_MODEL_ID,
              modelLabel: CHAT_MODEL_LABEL,
              reasoningEfforts: REASONING_EFFORTS,
              defaultReasoningEffort: DEFAULT_REASONING_EFFORT,
              pluginCount: OSINT_ALL_PLUGIN_IDS.length,
              hasApiKey: Boolean(apiKey()),
            });
          }

          if (req.method === 'POST' && (url === '/api/chat/session' || url.startsWith('/api/chat/session?'))) {
            const body = await readBody(req);
            const { sessionId, pluginIds } = await createOsintSession(body.pluginIds);
            return send(res, 200, {
              ok: true, sessionId, pluginIds,
              endpointId: CHAT_ENDPOINT_ID, model: CHAT_MODEL_ID, modelLabel: CHAT_MODEL_LABEL,
            });
          }

          // Query route — POST /api/chat/query[?stream=1]. The `?stream=1` flag
          // (not a second path segment) is the shared contract with the Vercel
          // production handler (api/chat/[action].js), whose [action].js dynamic
          // route can only capture ONE path segment — so both backends branch on
          // the same query-string flag rather than a differing URL shape.
          if (req.method === 'POST' && (url.startsWith('/api/chat/query?') || url === '/api/chat/query')) {
            const u = new URL(url, 'http://internal');
            const isStream = u.searchParams.get('stream') === '1' || u.searchParams.get('stream') === 'true';
            const body = await readBody(req);
            if (!body.sessionId) return send(res, 400, { ok: false, error: 'sessionId_required' });

            if (isStream) {
              try {
                await submitOsintQueryStream(body.sessionId, body.text || body.query, body.pluginIds, body.reasoningEffort, res);
              } catch (err) {
                if (!res.headersSent) {
                  return send(res, err.status && err.status < 500 ? err.status : 500, {
                    ok: false, error: String(err?.message || err), detail: err?.detail || null,
                  });
                }
                // Bytes already streamed — emit a terminal SSE error frame instead of a fresh HTTP response.
                try {
                  res.write(`data: ${JSON.stringify({ type: 'error', message: String(err?.message || err) })}\n\n`);
                  res.end();
                } catch { /* connection already gone */ }
              }
              return;
            }

            const turn = await submitOsintQuery(body.sessionId, body.text || body.query, body.pluginIds, body.reasoningEffort);
            return send(res, 200, { ok: true, sessionId: body.sessionId, ...turn });
          }

          if (req.method === 'GET' && (url === '/api/chat/sessions' || url.startsWith('/api/chat/sessions?'))) {
            const u = new URL(url, 'http://internal');
            const out = await listOsintSessions({
              limit: Number(u.searchParams.get('limit') || 10),
              cursor: u.searchParams.get('cursor') || undefined,
              sort: u.searchParams.get('sort') || 'desc',
            });
            return send(res, 200, { ok: true, ...out });
          }

          if (req.method === 'GET' && (url === '/api/chat/messages' || url.startsWith('/api/chat/messages?'))) {
            const u = new URL(url, 'http://internal');
            const sessionId = u.searchParams.get('sessionId');
            if (!sessionId) return send(res, 400, { ok: false, error: 'sessionId_required' });
            const out = await listOsintMessages(sessionId, {
              limit: Number(u.searchParams.get('limit') || 50),
              cursor: u.searchParams.get('cursor') || undefined,
              sort: u.searchParams.get('sort') || 'asc',
            });
            return send(res, 200, { ok: true, ...out });
          }

          return send(res, 404, { ok: false, error: 'unknown_chat_route' });
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('[chat-osint-live-proxy]', err?.message || err, err?.detail || '');
          if (!res.headersSent) {
            return send(res, 500, {
              ok: false,
              error: String(err?.message || err),
              detail: err?.detail || null,
            });
          }
          try { res.end(); } catch { /* already closed */ }
        }
      });
    },
  };
}
