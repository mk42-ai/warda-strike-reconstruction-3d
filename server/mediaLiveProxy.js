/**
 * Dev-server middleware for OnDemand Media API (fetch / create / delete).
 *
 * Live-docs-verified 2026-08-16 against
 * GET /config/v1/public/docs/reference/api/{fetchmedia,createmediaurl,deletemedia}:
 *   host     https://api.on-demand.io
 *   auth     header `apikey: <ON_DEMAND_API_KEY>`
 *   GET    /media/v1/public/file                 fetchMedia
 *   POST   /media/v1/public/file                 createMediaURL  {url, name, …}
 *   DELETE /media/v1/public/file/{fileId}        deleteMedia
 *
 * The Media item's playable URL is `data[].url` (not fileUrl / mediaUrl).
 * This proxy never leaks the apikey to the browser.
 */
import http from 'node:http';
import https from 'node:https';
import { URL } from 'node:url';

const API_HOST = process.env.ON_DEMAND_API_HOST || 'https://api.on-demand.io';

function apiKey() {
  // Server-only. Never read VITE_* — that prefix ships in the browser bundle.
  return process.env.ON_DEMAND_API_KEY || process.env.ONDEMAND_API_KEY || '';
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
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(obj));
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

/** Live-docs field: playable URL is `url` (fallback sourceUrl). */
function resolveMediaUrl(item) {
  if (!item || typeof item !== 'object') return null;
  return item.url || item.sourceUrl || item.extractedTextUrl || null;
}

export function mediaLiveProxyPlugin() {
  return {
    name: 'media-live-proxy',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        try {
          const raw = req.url || '';
          if (!raw.startsWith('/api/media')) return next();
          const u = new URL(raw, 'http://internal');

          if (req.method === 'OPTIONS') {
            res.statusCode = 204;
            res.end();
            return;
          }

          if (req.method === 'GET' && (u.pathname === '/api/media/proxy' || u.pathname === '/api/media/proxy/')) {
            const target = u.searchParams.get('url');
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
                const ct = resp.headers['content-type'] || 'application/octet-stream';
                res.setHeader('Content-Type', ct);
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

          // Al Warqa panel plates — pick named infrastructure stills from
          // documented GET /media/v1/public/file?source=image (header apikey).
          // Returns same-origin /api/media/proxy?url=… so the browser never
          // sees the apikey or a raw SAS URL it would have to CORS-fetch.
          if (req.method === 'GET' && (u.pathname === '/api/media/al-warqa' || u.pathname === '/api/media/al-warqa/')) {
            const collected = [];
            for (let page = 1; page <= 8 && collected.length < 400; page += 1) {
              const qs = new URLSearchParams({ source: 'image', limit: '50', page: String(page), sort: '-createdAt' });
              const r = await odFetch('GET', `/media/v1/public/file?${qs.toString()}`);
              if (r.status >= 400) {
                const err = new Error(`media_fetch_http_${r.status}`);
                err.detail = r.json || r.text;
                throw err;
              }
              const batch = Array.isArray(r.json?.data) ? r.json.data : [];
              if (!batch.length) break;
              collected.push(...batch);
              if (batch.length < 50) break;
            }
            const pick = (needles) => {
              const nset = needles.map((s) => s.toLowerCase());
              const hit = collected.find((it) => {
                const n = String(it.name || '').toLowerCase();
                if (/canvas-screenshot|cristiano|screenshot 20/.test(n)) return false;
                return nset.every((k) => n.includes(k));
              });
              if (!hit) return null;
              const remote = resolveMediaUrl(hit);
              if (!remote) return null;
              return {
                id: hit.id,
                name: hit.name,
                src: `/api/media/proxy?url=${encodeURIComponent(remote)}`,
              };
            };
            const hero = pick(['alwarqa', '3d']) || pick(['al-warqa', '3d']) || pick(['warqa', '3d']);
            const thumbs = [
              pick(['alwarqa', '2d']) || pick(['al-warqa', '2d']) || pick(['warqa', '2d']),
              pick(['dubai', '3d']),
              pick(['dubai', '2d']) || pick(['alwarqa', '3d']),
            ];
            const available = Boolean(hero && thumbs.every(Boolean));
            return send(res, 200, {
              ok: true,
              available,
              source: 'ondemand-media',
              illustrative: true,
              hero: hero || null,
              thumbs: available ? thumbs : [],
              note: available
                ? 'OnDemand Media API plates — illustrative infrastructure context, not confirmed intelligence.'
                : 'No matching Al Warqa / Dubai infrastructure media on this account.',
            });
          }

          if (req.method === 'GET' && (u.pathname === '/api/media/health' || u.pathname === '/api/media/health/')) {
            return send(res, 200, {
              ok: true,
              hasApiKey: Boolean(apiKey()),
              host: API_HOST,
              ops: ['fetch', 'create', 'delete'],
            });
          }

          if (req.method === 'GET' && (u.pathname === '/api/media' || u.pathname === '/api/media/')) {
            const qs = new URLSearchParams();
            for (const k of ['sort', 'page', 'limit', 'plugins', 'externalUserId', 'source']) {
              const v = u.searchParams.get(k);
              if (v) qs.set(k, v);
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

          if (req.method === 'POST' && (u.pathname === '/api/media' || u.pathname === '/api/media/')) {
            const body = await readBody(req);
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

          const del = u.pathname.match(/^\/api\/media\/([^/?#]+)$/);
          if (req.method === 'DELETE' && del) {
            const fileId = decodeURIComponent(del[1]);
            const r = await odFetch('DELETE', `/media/v1/public/file/${encodeURIComponent(fileId)}`);
            if (r.status >= 400) {
              const err = new Error(`media_delete_http_${r.status}`);
              err.detail = r.json || r.text;
              throw err;
            }
            return send(res, 200, { ok: true, id: fileId, message: r.json?.message || 'Media Deleted!' });
          }

          return send(res, 404, { ok: false, error: 'unknown_media_route' });
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('[media-live-proxy]', err?.message || err, err?.detail || '');
          if (!res.headersSent) {
            return send(res, 500, {
              ok: false,
              error: String(err?.message || err),
              detail: err?.detail || null,
            });
          }
        }
      });
    },
  };
}
