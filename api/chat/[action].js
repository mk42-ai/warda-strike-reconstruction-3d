/**
 * Production serverless Chat / OSINT API. Mirrors server/chatLiveProxy.js for
 * Vercel (static Vite build has no Vite dev middleware) — same routes, same
 * upstream calls, same DeepSeek V4 Pro model, same OSINT-only plugin catalog.
 *
 * OnDemand public Chat & Agent Tools API (live-docs-verified 2026-08-15):
 *   POST /chat/v1/sessions                     createChatSession
 *   POST /chat/v1/sessions/{sessionId}/query   submitQuery (agent-tool attachment via pluginIds)
 *   GET  /chat/v1/sessions                     getChatSessions
 *   GET  /chat/v1/sessions/{sessionId}/messages getChatMessages
 * Header: apikey: <ON_DEMAND_API_KEY> (server-side only). Host: https://api.on-demand.io.
 *
 * Model: predefined-deepseek-v4-pro (model_id deepseek-v4-pro, status active —
 * GET /config/v1/public/endpoints, verified 2026-08-15).
 *
 * Tools: pluginIds[] from src/chat/osintPlugins.js — existing OnDemand plugins
 * only, no new plugin/tool is created by this file.
 *
 * Scope: defensive/preventive OSINT research only — see OSINT_SYSTEM_PROMPT.
 */
import http from 'node:http';
import https from 'node:https';
import { URL } from 'node:url';
import { OSINT_ALL_PLUGIN_IDS } from '../../src/chat/osintPlugins.js';

export const config = { api: { bodyParser: true } };

const CHAT_ENDPOINT_ID = 'predefined-deepseek-v4-pro';
const CHAT_MODEL_ID = 'deepseek-v4-pro';

const OSINT_SYSTEM_PROMPT =
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

// agent-XXXX -> plugin-XXXX (the shape a live 400 reports unsubscribed/invalid ids in).
const toPluginId = (id) => (typeof id === 'string' && id.startsWith('agent-') ? id.replace(/^agent-/, 'plugin-') : id);

// plugin-XXXX -> agent-XXXX — the wire form the live gateway actually requires.
// LIVE-VERIFIED 2026-08-15: the documented submitquery/createchatsession schema names
// the field `pluginIds` (plugin- form), but a live probe against THIS gateway 400'd
// "One or more agents are invalid: agent-XXXX" when `pluginIds` was sent on the QUERY
// call. Sending `agentIds` (pre-translated) on BOTH session create and query is the
// form that works end-to-end. Internal state stays plugin- form; only the outbound
// wire call is translated.
const toAgentIds = (ids = []) => ids.map((id) => (typeof id === 'string' && id.startsWith('plugin-') ? id.replace(/^plugin-/, 'agent-') : id));

// RESILIENT session create: an account's plugin subscriptions can change independently
// of this catalog (verified live: one bonus plugin 400'd "not subscribed" while the rest
// worked). Strip exactly the bad id(s) named in the error and retry once — bounded,
// never loops — so one unsubscribed plugin never takes the whole Chat tab down.
async function createOsintSession(pluginIds) {
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
        ids = next;
        continue;
      }
    }
    const err = new Error(`session_http_${r.status}`);
    err.detail = r.json || r.text;
    throw err;
  }
  throw new Error('session_create_exhausted');
}

// Same bounded strip-and-retry resilience as createOsintSession — a plugin can be
// valid at session-create time yet still reported invalid at query time (observed
// live), so this independently tolerates the same 400 shape. Uses agentIds (see note above).
async function submitOsintQuery(sessionId, userText, pluginIds) {
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
        ids = next;
        continue;
      }
    }
    const err = new Error(`query_http_${r.status}`);
    err.detail = r.json || r.text;
    throw err;
  }
  throw new Error('query_exhausted');
}

async function listOsintSessions({ limit = 10, cursor, sort = 'desc' } = {}) {
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

async function listOsintMessages(sessionId, { limit = 50, cursor, sort = 'asc' } = {}) {
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

function send(res, status, obj) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.end(JSON.stringify(obj));
}

export default async function handler(req, res) {
  try {
    if (req.method === 'OPTIONS') {
      res.statusCode = 204;
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      res.end();
      return;
    }

    const action = String(req.query?.action || '')
      .replace(/^\//, '')
      .split('?')[0]
      .toLowerCase();

    if (req.method === 'GET' && action === 'health') {
      return send(res, 200, {
        ok: true,
        endpointId: CHAT_ENDPOINT_ID,
        model: CHAT_MODEL_ID,
        pluginCount: OSINT_ALL_PLUGIN_IDS.length,
        hasApiKey: Boolean(apiKey()),
        runtime: 'vercel-serverless',
      });
    }

    if (req.method === 'POST' && action === 'session') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
      const { sessionId, pluginIds } = await createOsintSession(body.pluginIds);
      return send(res, 200, { ok: true, sessionId, pluginIds, endpointId: CHAT_ENDPOINT_ID, model: CHAT_MODEL_ID });
    }

    if (req.method === 'POST' && action === 'query') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
      if (!body.sessionId) return send(res, 400, { ok: false, error: 'sessionId_required' });
      const turn = await submitOsintQuery(body.sessionId, body.text || body.query, body.pluginIds);
      return send(res, 200, { ok: true, sessionId: body.sessionId, ...turn });
    }

    if (req.method === 'GET' && action === 'sessions') {
      const out = await listOsintSessions({
        limit: Number(req.query?.limit || 10),
        cursor: req.query?.cursor || undefined,
        sort: req.query?.sort || 'desc',
      });
      return send(res, 200, { ok: true, ...out });
    }

    if (req.method === 'GET' && action === 'messages') {
      const sessionId = req.query?.sessionId;
      if (!sessionId) return send(res, 400, { ok: false, error: 'sessionId_required' });
      const out = await listOsintMessages(sessionId, {
        limit: Number(req.query?.limit || 50),
        cursor: req.query?.cursor || undefined,
        sort: req.query?.sort || 'asc',
      });
      return send(res, 200, { ok: true, ...out });
    }

    return send(res, 404, { ok: false, error: 'unknown_chat_route', action });
  } catch (err) {
    console.error('[api/chat]', err?.message || err, err?.detail || '');
    return send(res, 500, {
      ok: false,
      error: String(err?.message || err),
      detail: err?.detail || null,
    });
  }
}
