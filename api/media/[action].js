/**
 * Production serverless Media API. Mirrors server/mediaLiveProxy.js.
 *
 * Live-docs-verified 2026-08-16:
 *   GET    /media/v1/public/file                 fetchMedia
 *   POST   /media/v1/public/file                 createMediaURL
 *   DELETE /media/v1/public/file/{fileId}        deleteMedia
 * Auth: header `apikey`. Playable URL field is `data.url` (not fileUrl).
 */
import http from 'node:http';
import https from 'node:https';
import { URL } from 'node:url';

export const config = { api: { bodyParser: true } };

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
        timeout: 60000,
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

function resolveMediaUrl(item) {
  if (!item || typeof item !== 'object') return null;
  return item.url || item.sourceUrl || item.extractedTextUrl || null;
}

function send(res, status, obj) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, apikey');
  res.end(JSON.stringify(obj));
}

export default async function handler(req, res) {
  try {
    if (req.method === 'OPTIONS') {
      res.statusCode = 204;
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, apikey');
      res.end();
      return;
    }

    const action = String(req.query?.action || '')
      .replace(/^\//, '')
      .split('?')[0];

    if (req.method === 'GET' && action === 'proxy') {
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
          headers: { Accept: 'image/*,*/*', 'User-Agent': 'warda-sentinel-media-proxy' },
          timeout: 30000,
        },
        (resp) => {
          res.statusCode = resp.statusCode || 200;
          res.setHeader('Content-Type', resp.headers['content-type'] || 'application/octet-stream');
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

    if (req.method === 'GET' && (action === 'health' || action === '')) {
      if (action === 'health') {
        return send(res, 200, {
          ok: true,
          hasApiKey: Boolean(apiKey()),
          host: API_HOST,
          ops: ['fetch', 'create', 'delete'],
          runtime: 'vercel-serverless',
        });
      }
      const qs = new URLSearchParams();
      for (const k of ['sort', 'page', 'limit', 'plugins', 'externalUserId', 'source']) {
        const v = req.query?.[k];
        if (v) qs.set(k, String(v));
      }
      if (!qs.has('limit')) qs.set('limit', '20');
      const r = await odFetch('GET', `/media/v1/public/file?${qs.toString()}`);
      if (r.status >= 400) {
        const err = new Error(`media_fetch_http_${r.status}`);
        err.detail = r.json || r.text;
        throw err;
      }
      const items = Array.isArray(r.json?.data) ? r.json.data : [];
      return send(res, 200, {
        ok: true,
        items: items.map((it) => ({
          id: it.id,
          name: it.name,
          url: resolveMediaUrl(it),
          mimeType: it.mimeType,
          source: it.source,
          createdAt: it.createdAt,
        })),
        pagination: r.json?.pagination || null,
      });
    }

    if (req.method === 'POST' && (action === '' || action === 'create')) {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
      if (!body.url) return send(res, 400, { ok: false, error: 'url_required' });
      const r = await odFetch('POST', '/media/v1/public/file', {
        url: body.url,
        name: body.name || 'warda-media',
        createdBy: body.createdBy || 'warda-sentinel',
        updatedBy: body.updatedBy || 'warda-sentinel',
        externalUserId: body.externalUserId || 'uxe-warda-media',
        sessionId: body.sessionId,
        responseMode: body.responseMode || 'sync',
      });
      if (r.status >= 400) {
        const err = new Error(`media_create_http_${r.status}`);
        err.detail = r.json || r.text;
        throw err;
      }
      const data = r.json?.data || {};
      return send(res, 200, {
        ok: true,
        id: data.id,
        url: resolveMediaUrl(data),
        name: data.name,
      });
    }

    if (req.method === 'DELETE' && action && action !== 'health' && action !== 'create') {
      const r = await odFetch('DELETE', `/media/v1/public/file/${encodeURIComponent(action)}`);
      if (r.status >= 400) {
        const err = new Error(`media_delete_http_${r.status}`);
        err.detail = r.json || r.text;
        throw err;
      }
      return send(res, 200, { ok: true, id: action, message: r.json?.message || 'Media Deleted!' });
    }

    return send(res, 404, { ok: false, error: 'unknown_media_route', action });
  } catch (err) {
    console.error('[api/media]', err?.message || err, err?.detail || '');
    return send(res, 500, {
      ok: false,
      error: String(err?.message || err),
      detail: err?.detail || null,
    });
  }
}
