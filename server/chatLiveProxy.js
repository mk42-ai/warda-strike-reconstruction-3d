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
 *   - getChatSession      GET  /chat/v1/sessions/{sessionId}                  (getchatsession)
 *   - getChatMessages     GET  /chat/v1/sessions/{sessionId}/messages         (getchatmessages)
 * Auth: header `apikey: <ON_DEMAND_API_KEY>` on every call (server-side only —
 * never sent to or read by the browser). Base host: https://api.on-demand.io.
 *
 * Model: DeepSeek V4 Pro — live endpoint_id `predefined-deepseek-v4-pro`
 * (GET /config/v1/public/endpoints -> model_id "deepseek-v4-pro", status
 * "active", verified 2026-08-15).
 *
 * Tools: pluginIds[] carries ONLY existing OnDemand plugin ids from
 * src/chat/osintPlugins.js (agent tool-attachment IS the pluginIds array per
 * the live submitquery spec — there is no separate flag). No new plugin/tool
 * is created anywhere in this file.
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

export const CHAT_ENDPOINT_ID = 'predefined-deepseek-v4-pro';
export const CHAT_MODEL_ID = 'deepseek-v4-pro';

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
 * Sends `agentIds` (agent- wire form) — see toAgentIds() note above for why. Same
 * bounded strip-and-retry resilience as createOsintSession: a plugin can be valid at
 * session-create time yet still be reported invalid at query time (observed live),
 * so this must independently tolerate the same 400 shape.
 */
export async function submitOsintQuery(sessionId, userText, pluginIds) {
  const query = String(userText || '').trim().slice(0, 4000);
  if (!query) throw new Error('empty_query');
  let ids = Array.isArray(pluginIds) && pluginIds.length ? [...pluginIds] : [...OSINT_ALL_PLUGIN_IDS];
  for (let attempt = 0; attempt < 2; attempt++) {
    const body = {
      query,
      endpointId: CHAT_ENDPOINT_ID,
      responseMode: 'sync',
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
              pluginCount: OSINT_ALL_PLUGIN_IDS.length,
              hasApiKey: Boolean(apiKey()),
            });
          }

          if (req.method === 'POST' && (url === '/api/chat/session' || url.startsWith('/api/chat/session?'))) {
            const body = await readBody(req);
            const { sessionId, pluginIds } = await createOsintSession(body.pluginIds);
            return send(res, 200, { ok: true, sessionId, pluginIds, endpointId: CHAT_ENDPOINT_ID, model: CHAT_MODEL_ID });
          }

          if (req.method === 'POST' && (url === '/api/chat/query' || url.startsWith('/api/chat/query?'))) {
            const body = await readBody(req);
            if (!body.sessionId) return send(res, 400, { ok: false, error: 'sessionId_required' });
            const turn = await submitOsintQuery(body.sessionId, body.text || body.query, body.pluginIds);
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
          return send(res, 500, {
            ok: false,
            error: String(err?.message || err),
            detail: err?.detail || null,
          });
        }
      });
    },
  };
}
