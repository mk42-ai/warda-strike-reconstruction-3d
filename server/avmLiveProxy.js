/**
 * Dev-server middleware: browser live conversation against the existing
 * UXE Warda Strike AVM Narrator agent persona (workflow 6a7dc588fc1a4aa90e832ec4).
 *
 * Platform AVM execute is phone/delivery oriented (no public browser WebRTC
 * session URL). This proxy keeps the SAME agent instructionPrompt /
 * conversationStarter / reasoningMode as the active AVM node and drives a
 * two-way loop: speech text in → agent turn → spoken audio out.
 *
 * Static MP3 one-shot is NOT the primary path.
 */
import http from 'node:http';
import https from 'node:https';
import { URL } from 'node:url';

export const AVM_WORKFLOW_ID = '6a7dc588fc1a4aa90e832ec4';
export const AVM_WORKFLOW_NAME = 'UXE Warda Strike AVM Narrator';

// Copied from the live GET of workflow 6a7dc588fc1a4aa90e832ec4 advancedVoiceMode node
export const AVM_INSTRUCTION_PROMPT =
  'You are the UXE Security Solutions defensive Warda Strike conversational narrator ' +
  'for co-founder Youssef (yy@airev.ae). Answer spoken questions about the briefing, ' +
  'the early-warning ring, the protected site, and the corridor. Unclassified and ' +
  'preventive only. No offensive guidance. No targeting, no weapons employment, no attack planning. ' +
  'Keep spoken answers concise (2–4 sentences) for a live CIC voice channel.';

export const AVM_CONVERSATION_STARTER =
  'This is a live two-way voice briefing channel with UXE Security Solutions. ' +
  'Ask me about the defensive Warda Strike reconstruction, the early-warning ring, ' +
  'the protected site, or the corridor — and I will answer in conversation.';

// Live catalog (GET /config/v1/public/endpoints): endpoint_id predefined-deepseek-v4-flash
// model_id deepseek-v4-flash · status active. Workflow AVM node reasoningMode matches.
export const AVM_ENDPOINT_ID = 'predefined-deepseek-v4-flash';
export const AVM_MODEL_ID = 'predefined-deepseek-v4-flash';
export const AVM_REASONING_MODE = 'predefined-deepseek-v4-flash';

// Live-docs-verified 2026-08-16 (GET /config/v1/public/docs/reference/api/{slug}):
//   Chat / Media host: https://api.on-demand.io  (apikey header)
//   Services TTS/STT:  https://api.on-demand.io/services/v1/public/service
//     POST /execute/text_to_speech  {model, input, voice} → data.audioUrl
//     POST /execute/speech_to_text  {audioUrl}            → data.text
const API_HOST = process.env.ON_DEMAND_API_HOST || 'https://api.on-demand.io';
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

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8');
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch (e) {
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
  if (!key) {
    return Promise.reject(new Error('ON_DEMAND_API_KEY missing on server'));
  }
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
    req.on('timeout', () => {
      req.destroy(new Error('upstream_timeout'));
    });
    if (payload) req.write(payload);
    req.end();
  });
}

async function ttsSpeak(text) {
  const input = String(text || '').trim().slice(0, 900);
  if (!input) return { audioUrl: null };
  // Live OpenAPI (converttexttoaudio, 2026-08-16): servers[0].url =
  //   https://api.on-demand.io/services/v1/public/service
  //   POST /execute/text_to_speech  {model, input, voice} → data.audioUrl
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
  const audioUrl = r.json?.data?.audioUrl || null;
  return { audioUrl, http: r.status };
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
  if (!query) {
    const err = new Error('empty_query');
    throw err;
  }
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
    data.answer ||
    data.message ||
    data.output ||
    (typeof data === 'string' ? data : null) ||
    '';
  return {
    answer: String(answer || '').trim(),
    messageId: data.messageId || null,
    http: r.status,
  };
}

export function avmLiveProxyPlugin() {
  return {
    name: 'avm-live-proxy',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        try {
          const url = req.url || '';
          if (!url.startsWith('/api/avm')) return next();

          // CORS preflight (same-origin usually, but harmless)
          if (req.method === 'OPTIONS') {
            res.statusCode = 204;
            res.end();
            return;
          }

          if (req.method === 'GET' && (url === '/api/avm/health' || url.startsWith('/api/avm/health?'))) {
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
            });
          }

          if (req.method === 'POST' && (url === '/api/avm/session' || url.startsWith('/api/avm/session?'))) {
            const { sessionId, http: sh } = await createSession();
            let starterAudioUrl = null;
            let ttsHttp = null;
            try {
              const t = await ttsSpeak(AVM_CONVERSATION_STARTER);
              starterAudioUrl = t.audioUrl;
              ttsHttp = t.http;
            } catch (e) {
              // Session still valid; client can show starter as text
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
              note:
                'Live two-way AVM path (DeepSeek V4 Flash). Static MP3/TTS/STS are not primary.',
            });
          }

          if (req.method === 'POST' && (url === '/api/avm/turn' || url.startsWith('/api/avm/turn?'))) {
            const body = await readBody(req);
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
              http: { query: turn.http, replyTts: ttsHttp },
            });
          }

          if (req.method === 'POST' && (url === '/api/avm/speak' || url.startsWith('/api/avm/speak?'))) {
            const body = await readBody(req);
            const t = await ttsSpeak(body.text || '');
            return send(res, 200, { ok: true, audioUrl: t.audioUrl, http: t.http });
          }

          // Live-docs STT: POST /execute/speech_to_text { audioUrl } → data.text
          if (req.method === 'POST' && (url === '/api/avm/transcribe' || url.startsWith('/api/avm/transcribe?'))) {
            const body = await readBody(req);
            const audioUrl = body.audioUrl || body.url;
            if (!audioUrl) return send(res, 400, { ok: false, error: 'audioUrl_required' });
            const r = await odFetch('POST', `${SERVICES_HOST}/execute/speech_to_text`, { audioUrl });
            if (r.status >= 400) {
              const err = new Error(`stt_http_${r.status}`);
              err.detail = r.json || r.text;
              throw err;
            }
            return send(res, 200, {
              ok: true,
              text: r.json?.data?.text || '',
              http: r.status,
            });
          }

          return send(res, 404, { ok: false, error: 'unknown_avm_route' });
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('[avm-live-proxy]', err?.message || err, err?.detail || '');
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
