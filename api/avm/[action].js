/**
 * Production serverless AVM live conversation API.
 * Mirrors server/avmLiveProxy.js for Vercel (static Vite build has no Vite middleware).
 * Workflow: 6a7dc588fc1a4aa90e832ec4 · DeepSeek V4 Flash · advancedVoiceMode persona.
 * TTS reply audio is only the spoken-out channel for agent text — not a static MP3 primary path.
 */
import http from 'node:http';
import https from 'node:https';
import { URL } from 'node:url';

export const config = { api: { bodyParser: true } };

const AVM_WORKFLOW_ID = '6a7dc588fc1a4aa90e832ec4';
const AVM_WORKFLOW_NAME = 'UXE Warda Strike AVM Narrator';
const AVM_ENDPOINT_ID = 'predefined-deepseek-v4-flash';
const AVM_MODEL_ID = 'predefined-deepseek-v4-flash';
const AVM_REASONING_MODE = 'predefined-deepseek-v4-flash';

const AVM_INSTRUCTION_PROMPT =
  'You are the UXE Security Solutions defensive Warda Strike conversational narrator ' +
  'for co-founder Youssef (yy@airev.ae). Answer spoken questions about the briefing, ' +
  'the early-warning ring, the protected site, and the corridor. Unclassified and ' +
  'preventive only. No offensive guidance. No targeting, no weapons employment, no attack planning. ' +
  'Keep spoken answers concise (2–4 sentences) for a live CIC voice channel.';

const AVM_CONVERSATION_STARTER =
  'This is a live two-way voice briefing channel with UXE Security Solutions. ' +
  'Ask me about the defensive Warda Strike reconstruction, the early-warning ring, ' +
  'the protected site, or the corridor — and I will answer in conversation.';

const API_HOST = process.env.ON_DEMAND_API_HOST || 'https://api.on-demand.io';
// Live-docs-verified 2026-08-16: converttexttoaudio / convertaudiototext
// servers[0].url = https://api.on-demand.io/services/v1/public/service
const SERVICES_HOST = process.env.ON_DEMAND_SERVICES_HOST
  || `${API_HOST}/services/v1/public/service`;

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

async function ttsSpeak(text) {
  const input = String(text || '').trim().slice(0, 900);
  if (!input) return { audioUrl: null };
  const r = await odFetch('POST', `${SERVICES_HOST}/execute/text_to_speech`, {
    model: 'tts-1',
    input,
    voice: 'nova',
  });
  if (r.status >= 400) {
    const err = new Error(`tts_http_${r.status}`);
    err.detail = r.json || r.text;
    throw err;
  }
  return { audioUrl: r.json?.data?.audioUrl || null, http: r.status };
}

async function createSession() {
  const r = await odFetch('POST', '/chat/v1/sessions', {
    externalUserId: `uxe-warda-avm-glass-${Date.now()}`,
    pluginIds: [],
  });
  if (r.status >= 400) {
    const err = new Error(`session_http_${r.status}`);
    err.detail = r.json || r.text;
    throw err;
  }
  const sessionId = r.json?.data?.id;
  if (!sessionId) {
    const err = new Error('session_missing_id');
    err.detail = r.json;
    throw err;
  }
  return { sessionId, http: r.status };
}

async function agentTurn(sessionId, userText) {
  const query = String(userText || '').trim().slice(0, 2000);
  if (!query) throw new Error('empty_query');
  const r = await odFetch('POST', `/chat/v1/sessions/${encodeURIComponent(sessionId)}/query`, {
    query,
    endpointId: AVM_ENDPOINT_ID,
    responseMode: 'sync',
    fulfillmentOnly: true,
    pluginIds: [],
    modelConfigs: {
      fulfillmentPrompt: AVM_INSTRUCTION_PROMPT,
      temperature: 0.4,
    },
  });
  if (r.status >= 400) {
    const err = new Error(`query_http_${r.status}`);
    err.detail = r.json || r.text;
    throw err;
  }
  const data = r.json?.data || {};
  const answer =
    data.answer || data.message || data.output || (typeof data === 'string' ? data : '') || '';
  return { answer: String(answer).trim(), messageId: data.messageId || null, http: r.status };
}

function send(res, status, obj) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, apikey');
  res.end(JSON.stringify(obj));
}

export default async function handler(req, res) {
  try {
    if (req.method === 'OPTIONS') {
      res.statusCode = 204;
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, apikey');
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
        primaryPath: 'live-avm-conversation',
        workflowId: AVM_WORKFLOW_ID,
        workflowName: AVM_WORKFLOW_NAME,
        endpointId: AVM_ENDPOINT_ID,
        model: AVM_MODEL_ID,
        reasoningMode: AVM_REASONING_MODE,
        nodeType: 'advancedVoiceMode',
        staticMp3Primary: false,
        ttsPrimary: false,
        stsPrimary: false,
        hasApiKey: Boolean(apiKey()),
        servicesHost: SERVICES_HOST,
        runtime: 'vercel-serverless',
      });
    }

    if (req.method === 'POST' && action === 'session') {
      const { sessionId, http: sh } = await createSession();
      let starterAudioUrl = null;
      let ttsHttp = null;
      try {
        const t = await ttsSpeak(AVM_CONVERSATION_STARTER);
        starterAudioUrl = t.audioUrl;
        ttsHttp = t.http;
      } catch {
        starterAudioUrl = null;
      }
      return send(res, 200, {
        ok: true,
        workflowId: AVM_WORKFLOW_ID,
        workflowName: AVM_WORKFLOW_NAME,
        sessionId,
        endpointId: AVM_ENDPOINT_ID,
        model: AVM_MODEL_ID,
        reasoningMode: AVM_REASONING_MODE,
        nodeType: 'advancedVoiceMode',
        conversationStarter: AVM_CONVERSATION_STARTER,
        starterAudioUrl,
        http: { session: sh, starterTts: ttsHttp },
        note: 'Live two-way AVM path (DeepSeek V4 Flash). Static MP3/TTS/STS are not primary.',
      });
    }

    if (req.method === 'POST' && action === 'turn') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
      const sessionId = body.sessionId;
      const text = body.text || body.query || '';
      if (!sessionId) return send(res, 400, { ok: false, error: 'sessionId_required' });
      const turn = await agentTurn(sessionId, text);
      let audioUrl = null;
      let ttsHttp = null;
      if (turn.answer) {
        try {
          const t = await ttsSpeak(turn.answer);
          audioUrl = t.audioUrl;
          ttsHttp = t.http;
        } catch {
          audioUrl = null;
        }
      }
      return send(res, 200, {
        ok: true,
        workflowId: AVM_WORKFLOW_ID,
        sessionId,
        userText: String(text).trim(),
        answer: turn.answer,
        audioUrl,
        messageId: turn.messageId,
        endpointId: AVM_ENDPOINT_ID,
        model: AVM_MODEL_ID,
        reasoningMode: AVM_REASONING_MODE,
        http: { query: turn.http, replyTts: ttsHttp },
      });
    }

    if (req.method === 'GET' && action === 'audio') {
      const target = String(req.query?.url || '');
      if (!target) return send(res, 400, { ok: false, error: 'url_required' });
      let parsed;
      try { parsed = new URL(target); } catch { return send(res, 400, { ok: false, error: 'bad_url' }); }
      if (!/^https?:$/i.test(parsed.protocol)) return send(res, 400, { ok: false, error: 'bad_protocol' });
      const lib = parsed.protocol === 'http:' ? http : https;
      const up = lib.request(
        {
          protocol: parsed.protocol,
          hostname: parsed.hostname,
          port: parsed.port || (parsed.protocol === 'http:' ? 80 : 443),
          path: parsed.pathname + parsed.search,
          method: 'GET',
          headers: { Accept: 'audio/*,*/*', 'User-Agent': 'warda-sentinel-avm-audio' },
          timeout: 30000,
        },
        (resp) => {
          res.statusCode = resp.statusCode || 200;
          res.setHeader('Content-Type', resp.headers['content-type'] || 'audio/mpeg');
          res.setHeader('Cache-Control', 'no-store');
          res.setHeader('Access-Control-Allow-Origin', '*');
          resp.pipe(res);
        },
      );
      up.on('error', (err) => {
        if (!res.headersSent) send(res, 502, { ok: false, error: String(err?.message || err) });
      });
      up.on('timeout', () => up.destroy(new Error('upstream_timeout')));
      up.end();
      return;
    }

    if (req.method === 'POST' && action === 'speak') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
      const t = await ttsSpeak(body.text || '');
      return send(res, 200, { ok: true, audioUrl: t.audioUrl, http: t.http });
    }

    if (req.method === 'POST' && action === 'transcribe') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
      const audioUrl = body.audioUrl || body.url;
      if (!audioUrl) return send(res, 400, { ok: false, error: 'audioUrl_required' });
      const r = await odFetch('POST', `${SERVICES_HOST}/execute/speech_to_text`, { audioUrl });
      if (r.status >= 400) {
        const err = new Error(`stt_http_${r.status}`);
        err.detail = r.json || r.text;
        throw err;
      }
      return send(res, 200, { ok: true, text: r.json?.data?.text || '', http: r.status });
    }

    return send(res, 404, { ok: false, error: 'unknown_avm_route', action });
  } catch (err) {
    console.error('[api/avm]', err?.message || err, err?.detail || '');
    return send(res, 500, {
      ok: false,
      error: String(err?.message || err),
      detail: err?.detail || null,
    });
  }
}
