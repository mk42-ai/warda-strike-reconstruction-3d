/**
 * streamParsing.js — pure data-extraction helpers for the Chat / OSINT tab's
 * "smart renderer" system (Perplexity-style rich answer chrome).
 *
 * IMPORTANT ARCHITECTURAL NOTE (live-verified 2026-08-15, this turn):
 * The live OnDemand Chat & Agent Tools SSE stream does NOT expose structured
 * tool-RESULT JSON on the wire — only tool-CALL intent (`step_output` carries
 * `{"plugins":[{pluginId,name,api_request_parameters,...}]}`, i.e. what the
 * model decided to call and with what arguments) and the model's own prose
 * synthesis of the result (`fulfillment.answer`). This was confirmed by three
 * live smoke tests against the deployed /api/chat/query?stream=1 endpoint this
 * turn: an Instagram profile lookup, a Reddit subreddit fetch, and a map-view
 * call (which genuinely 500'd live, validating the fallback-card requirement
 * below). None of the raw field names named in the task brief
 * (profilePicUrlHd, followerCount, post_title, shortUrl, finalUrl, ...)
 * ever appear literally as JSON keys on the wire — they exist only inside the
 * plugin's OWN backend response, which the model paraphrases into markdown
 * prose such as "**Follower Count:** 6,000,822".
 *
 * Rather than inventing a fake structured-JSON contract that does not exist,
 * every extractor below is an HONEST best-effort parser over that markdown
 * prose (plus the reliable `api_request_parameters` call arguments, which ARE
 * structured and DO exist on the wire). Every extractor is defensive: if the
 * prose doesn't contain enough signal to populate a smart card confidently, it
 * returns null and the caller falls back to the generic source-card /
 * plain-text answer — the raw answer text is never hidden, only augmented.
 */

// ---------------------------------------------------------------------------
// Plugin -> renderer-kind mapping (src/chat/osintPlugins.js ids)
// ---------------------------------------------------------------------------
export const RENDERER_KIND = {
  INSTAGRAM_PROFILE: 'instagram_profile',
  INSTAGRAM_MEDIA: 'instagram_media',
  MAP_2D: 'map_2d',
  MAP_3D: 'map_3d',
  REDDIT: 'reddit',
  GENERIC: 'generic',
};

const PLUGIN_RENDERER_MAP = {
  'plugin-1716164040': RENDERER_KIND.INSTAGRAM_PROFILE, // Instagram User Info Extracter
  'plugin-1762980461': RENDERER_KIND.INSTAGRAM_MEDIA,   // Instagram Content Downloader Tool
  'plugin-1757906905': RENDERER_KIND.MAP_2D,             // Google Maps Street View Agent
  'plugin-1756022750': RENDERER_KIND.MAP_2D,             // Google Maps MCP
  'plugin-1772953290': RENDERER_KIND.MAP_3D,             // Planet Satellite Imagery (oblique/terrain)
  'plugin-1771757909': RENDERER_KIND.MAP_2D,             // Picarta Image Geolocator
  'plugin-1748003575': RENDERER_KIND.REDDIT,             // Reddit Posts
};

export function detectRendererKind(pluginId) {
  return PLUGIN_RENDERER_MAP[pluginId] || RENDERER_KIND.GENERIC;
}

// ---------------------------------------------------------------------------
// Plugin call parsing — extends the existing parsePluginNamesFromStepOutput
// pattern (ported from ondemand-hq's parseAgentic.js parsePluginCalls) to keep
// the full call object, including api_request_parameters, not just names.
// ---------------------------------------------------------------------------
const FENCE_RE = /```(?:json)?\s*([\s\S]*?)```/g;

function jsonBlocks(text) {
  if (!text) return [];
  const out = [];
  FENCE_RE.lastIndex = 0;
  let m;
  while ((m = FENCE_RE.exec(text))) {
    try { out.push(JSON.parse(m[1])); } catch { /* still streaming */ }
  }
  if (!out.length) {
    try { out.push(JSON.parse(text)); } catch { /* not ready / no fence */ }
  }
  return out;
}

/**
 * Full plugin-call objects called out of the streamed step_output JSON.
 * @returns {Array<{pluginId:string,name:string,params:object,identifier:string}>}
 */
export function parsePluginCallsFull(raw) {
  const calls = [];
  const seen = new Set();
  for (const block of jsonBlocks(raw)) {
    if (!block || !Array.isArray(block.plugins)) continue;
    for (const p of block.plugins) {
      if (!p || typeof p !== 'object') continue;
      const pluginId = p.pluginId || '';
      const params = p.api_request_parameters || p.parameters || {};
      const key = `${pluginId}|${JSON.stringify(params)}`;
      if (seen.has(key)) continue;
      seen.add(key);
      calls.push({ pluginId, name: p.name || p.identifier || pluginId, params, identifier: p.identifier || '' });
    }
  }
  return calls;
}

// ---------------------------------------------------------------------------
// Generic prose helpers
// ---------------------------------------------------------------------------

/** Find the first "**Label:**  value-until-end-of-line" match across label variants. */
function matchLabel(text, labels) {
  if (!text) return null;
  for (const label of labels) {
    const esc = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`\\*\\*\\s*${esc}\\s*:?\\s*\\*\\*:?\\s*([^\\n]+)`, 'i');
    const m = text.match(re);
    if (m && m[1].trim()) return m[1].trim();
  }
  return null;
}

function firstUrl(raw) {
  if (!raw) return null;
  const m = raw.match(/https?:\/\/[^\s)\]"']+/);
  return m ? m[0].replace(/[.,;)]+$/, '') : null;
}

function parseVerified(raw) {
  if (!raw) return null;
  const s = raw.toLowerCase();
  if (/\btrue\b/.test(s)) return true;
  if (/\bfalse\b/.test(s)) return false;
  if (/not verified|unverified/.test(s)) return false;
  if (/verified|\byes\b/.test(s)) return true;
  return null;
}

function splitUsernameLine(raw) {
  if (!raw) return { username: null, fullName: null };
  const fn = raw.match(/Full Name:\s*([^)]+)\)/i);
  const username = raw.replace(/\(.*$/, '').trim();
  return { username: username || null, fullName: fn ? fn[1].trim() : null };
}

// ---------------------------------------------------------------------------
// Image / media URL extraction (bare or markdown-linked)
// ---------------------------------------------------------------------------
const IMG_URL_RE = /(?:!\[[^\]]*\]\()?(https?:\/\/[^\s)"']+\.(?:png|jpe?g|gif|webp|svg)(?:\?[^\s)"']*)?)\)?/gi;

export function extractImageUrls(text) {
  if (!text) return [];
  const out = new Set();
  let m;
  IMG_URL_RE.lastIndex = 0;
  while ((m = IMG_URL_RE.exec(text))) out.add(m[1]);
  return [...out];
}

export function fileNameFromUrl(url) {
  try {
    return decodeURIComponent(new URL(url).pathname.split('/').filter(Boolean).pop() || 'image');
  } catch {
    return 'image';
  }
}

const VIDEO_LIKE_RE = /\.(mp4|mov|m3u8)(?:\?[^\s)"']*)?(?:$|[\s)"'])/i;

/** Broader media-item extraction for the Instagram carousel (images + video-like links). */
export function extractMediaItems(text) {
  if (!text) return [];
  const urls = new Set();
  const re = /(https?:\/\/[^\s)"'>\]]+)/g;
  let m;
  while ((m = re.exec(text))) urls.add(m[1].replace(/[.,;)]+$/, ''));
  const items = [];
  for (const u of urls) {
    const isVideo = VIDEO_LIKE_RE.test(u) || /\/reel\/|\/video\//i.test(u);
    const isImg = /\.(png|jpe?g|gif|webp)(?:\?|$)/i.test(u) || /cdninstagram|fbcdn|scontent/i.test(u);
    if (isVideo) items.push({ url: u, kind: 'video' });
    else if (isImg) items.push({ url: u, kind: 'image' });
  }
  return items;
}

// ---------------------------------------------------------------------------
// Instagram profile card extraction
// ---------------------------------------------------------------------------
export function extractInstagramProfile(text, params = {}) {
  if (!text) return null;
  const usernameLine = matchLabel(text, ['Username']);
  const { username: parsedUsername, fullName: inlineFullName } = splitUsernameLine(usernameLine);
  const fullNameLine = matchLabel(text, ['Full Name']);
  const followerRaw = matchLabel(text, ['Follower Count', 'Followers Count', 'Followers']);
  const followingRaw = matchLabel(text, ['Following Count', 'Following']);
  const mediaRaw = matchLabel(text, ['Media Count (Posts)', 'Media Count', 'Post Count', 'Posts Count', 'Posts']);
  const bioRaw = matchLabel(text, ['Biography', 'Bio']);
  const verifiedRaw = matchLabel(text, ['Verified Status', 'Is Verified', 'Verified']);
  const avatarRaw = matchLabel(text, ['Profile Picture URL', 'Profile Picture', 'Avatar URL']);

  const username = parsedUsername || params.username || null;
  if (!username || (!followerRaw && !mediaRaw && !bioRaw)) return null; // not enough signal to render confidently

  const numeric = (raw) => {
    if (!raw) return null;
    const cleaned = raw.replace(/[^\d,]/g, '').trim();
    return cleaned || raw.trim();
  };

  return {
    username,
    fullName: (fullNameLine || inlineFullName || '').trim() || null,
    followerCount: numeric(followerRaw),
    followingCount: numeric(followingRaw),
    mediaCount: numeric(mediaRaw),
    biography: bioRaw ? bioRaw.replace(/[`*]/g, '').trim() : null,
    isVerified: parseVerified(verifiedRaw),
    avatarUrl: firstUrl(avatarRaw),
  };
}

// ---------------------------------------------------------------------------
// Map card extraction (2D / 3D share the same coordinate/place/failure logic)
// ---------------------------------------------------------------------------
const MAP_FAILURE_RE = /status code:?\s*5\d{2}|error fetching map|encountered an (?:api )?failure|could not be retrieved|tool outage|map (?:data )?unavailable|failed to (?:fetch|retrieve|download)/i;

export function extractMapInfo(text, params = {}) {
  const failed = MAP_FAILURE_RE.test(text || '');
  const place = params.place || params.location || params.query || matchLabel(text, ['Location']) || null;
  const latRaw = text && text.match(/Latitude[:*\s`]*(-?\d{1,3}(?:\.\d+)?)\s*°?\s*(N|S)?/i);
  const lonRaw = text && text.match(/Longitude[:*\s`]*(-?\d{1,3}(?:\.\d+)?)\s*°?\s*(E|W)?/i);
  let lat = null;
  let lon = null;
  if (latRaw) {
    lat = parseFloat(latRaw[1]);
    if (latRaw[2] && latRaw[2].toUpperCase() === 'S') lat = -Math.abs(lat);
  }
  if (lonRaw) {
    lon = parseFloat(lonRaw[1]);
    if (lonRaw[2] && lonRaw[2].toUpperCase() === 'W') lon = -Math.abs(lon);
  }
  return {
    place: place ? String(place).trim() : null,
    lat: Number.isFinite(lat) ? lat : null,
    lon: Number.isFinite(lon) ? lon : null,
    failed,
  };
}

// ---------------------------------------------------------------------------
// Reddit thread + nested comments extraction
// ---------------------------------------------------------------------------
// Live-verified 2026-08-15: when the plugin's actual Reddit result does not
// match what the user asked for, Gemini 3.7 Flash falls back to a
// general-knowledge answer that reuses the SAME "### Heading" + "* bullet"
// shape as a real post/comment breakdown (verified with a live r/OSINT query
// whose fallback text parsed, before this guard, as five fake "comments").
// This phrase set is how the model honestly discloses that fallback — when
// present, treat the prose as NOT a real thread rather than mis-rendering
// general knowledge as sourced Reddit content.
const REDDIT_NO_MATCH_RE = /does not include (?:a|the) thread|specific thread data was not returned|no (?:matching |relevant )?(?:post|thread) (?:was |is )?found|could not find (?:a|the) (?:post|thread)|general knowledge rather than (?:the )?(?:specific )?reddit/i;

export function extractRedditThread(text, params = {}) {
  if (!text) return null;
  if (REDDIT_NO_MATCH_RE.test(text)) return null; // model fell back to general knowledge — not a real thread
  const subreddit = params.subreddit || (text.match(/\br\/([A-Za-z0-9_]+)/) || [])[1] || null;
  if (!subreddit) return null;

  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  const posts = [];
  let current = null;
  for (const line of lines) {
    const isRemoved = /^\[removed\]$|^\[deleted\]$/i.test(line.replace(/^[-*•\d.)\s]+/, ''));
    if (isRemoved) continue;

    const heading = line.match(/^#{1,4}\s*(.+)$/) || line.match(/^\d+[.)]\s*\*\*(.+?)\*\*\s*$/) || line.match(/^\*\*(.+?)\*\*\s*$/);
    if (heading) {
      current = { title: heading[1].replace(/[`*]/g, '').trim(), comments: [] };
      posts.push(current);
      continue;
    }
    const bullet = line.match(/^[-*•]\s+(.+)$/) || line.match(/^\d+[.)]\s+(.+)$/);
    if (bullet && current) {
      const c = bullet[1].trim().replace(/^\*\*|\*\*$/g, '');
      if (c && !/\[removed\]|\[deleted\]/i.test(c)) current.comments.push(c);
    }
  }
  const clean = posts.filter((p) => p.title && p.title.length > 3).slice(0, 6);
  if (!clean.length) return null;
  return { subreddit, posts: clean.map((p) => ({ ...p, comments: p.comments.slice(0, 4) })) };
}

// ---------------------------------------------------------------------------
// Citations (numbered source pills) — real markdown [label](url) links only,
// never invented. Numbered in first-seen order within the answer text.
// ---------------------------------------------------------------------------
export function extractCitations(text) {
  if (!text) return [];
  const re = /\[([^\]]{1,140})\]\((https?:\/\/[^\s)]+)\)/g;
  const seen = new Map();
  let m;
  while ((m = re.exec(text))) {
    const label = m[1].trim();
    const url = m[2].replace(/[.,;)]+$/, '');
    if (!seen.has(url)) seen.set(url, { n: seen.size + 1, label, url });
  }
  return [...seen.values()];
}

export function domainFromUrl(url) {
  try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return ''; }
}

/**
 * A real (never invented) 2-line-ish snippet for a citation, pulled from the
 * text immediately preceding its markdown link in the answer — the closest
 * thing to a "snippet" the wire actually gives us, since OnDemand's answer
 * stream carries prose, not a separate search-result-snippet field.
 */
export function extractCitationSnippet(text, url) {
  if (!text || !url) return '';
  const idx = text.indexOf(url);
  if (idx < 0) return '';
  const start = Math.max(0, idx - 170);
  const end = Math.min(text.length, idx + 20);
  let windowText = text.slice(start, end);
  windowText = windowText
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\*\*/g, '')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!windowText) return '';
  return windowText.length > 150 ? `…${windowText.slice(-150)}` : windowText;
}

/** Best-effort plugin-name label for a citation card, from the turn's own done-plugin list. */
export function citationPluginName(donePlugins) {
  if (!donePlugins || !donePlugins.length) return 'Web Search';
  if (donePlugins.length === 1) return donePlugins[0];
  const preferred = donePlugins.find((n) => /perplexity|internet|search|news|gpt/i.test(n));
  return preferred || donePlugins[0];
}

/** Public favicon lookup for a URL's domain — small icon only, no watermark/branding of our own. */
export function faviconUrl(url) {
  const domain = domainFromUrl(url);
  return domain ? `https://www.google.com/s2/favicons?sz=64&domain=${encodeURIComponent(domain)}` : '';
}

// ---------------------------------------------------------------------------
// FIND INFORMATION panel data (lightbox right-hand overlay)
// ---------------------------------------------------------------------------
export function buildFindInformation(imageUrl, msg, extracted) {
  const domain = domainFromUrl(imageUrl);
  const firstDoneName = (msg.donePlugins && msg.donePlugins[0]) || null;
  const firstPluginName = firstDoneName
    || (msg.pluginIds && msg.pluginIds.length ? msg.pluginIds[0] : null);
  const source = {
    pluginName: firstPluginName || 'Local upload',
    domain: domain || null,
    timestamp: msg.ts || null,
    verified: extracted?.instagram?.isVerified === true,
  };
  let place = null;
  if (extracted?.map && (extracted.map.place || (extracted.map.lat != null && extracted.map.lon != null))) {
    place = { label: extracted.map.place, lat: extracted.map.lat, lon: extracted.map.lon };
  }
  const facts = [];
  if (extracted?.instagram) {
    const ig = extracted.instagram;
    if (ig.followerCount) facts.push(`${ig.followerCount} followers`);
    if (ig.followingCount) facts.push(`${ig.followingCount} following`);
    if (ig.mediaCount) facts.push(`${ig.mediaCount} posts`);
    if (ig.biography) facts.push(ig.biography.slice(0, 120));
  }
  if (extracted?.reddit) {
    facts.push(`Subreddit r/${extracted.reddit.subreddit}`);
    if (extracted.reddit.posts[0]) facts.push(extracted.reddit.posts[0].title.slice(0, 120));
  }
  if (!facts.length) {
    facts.push('No additional structured metadata was extracted for this image — see the full answer text.');
  }
  return { source, place, facts: facts.slice(0, 4), originalUrl: imageUrl };
}

// ---------------------------------------------------------------------------
// Follow-up suggestion chips — deterministic, template-based on what THIS turn
// actually extracted (never fabricated content, no extra model call).
// ---------------------------------------------------------------------------
export function buildFollowUps(extracted) {
  const chips = [];
  if (extracted?.instagram?.username) {
    chips.push(`Summarize recent public posting themes for @${extracted.instagram.username}`);
  }
  if (extracted?.map?.place) {
    chips.push(`What else has been publicly reported near ${extracted.map.place}?`);
  }
  if (extracted?.reddit?.subreddit) {
    chips.push(`What else is being discussed in r/${extracted.reddit.subreddit}?`);
  }
  chips.push('Cross-check this with another public source');
  chips.push('Summarize this in three bullet points');
  return [...new Set(chips)].slice(0, 4);
}

/**
 * Run every extractor once per message (memoize at the call site). Returns an
 * object keyed by domain so downstream code can check `extracted.instagram`,
 * `extracted.map`, `extracted.reddit` etc without re-parsing. Used by the
 * FIND INFORMATION lightbox panel, which only needs "the" dominant context
 * for whichever image is currently open.
 */
export function extractAllForMessage(calls, text) {
  const extracted = {};
  for (const call of calls) {
    const kind = detectRendererKind(call.pluginId);
    if (kind === RENDERER_KIND.INSTAGRAM_PROFILE && !extracted.instagram) {
      extracted.instagram = extractInstagramProfile(text, call.params);
    } else if ((kind === RENDERER_KIND.MAP_2D || kind === RENDERER_KIND.MAP_3D) && !extracted.map) {
      extracted.map = extractMapInfo(text, call.params);
    } else if (kind === RENDERER_KIND.REDDIT && !extracted.reddit) {
      extracted.reddit = extractRedditThread(text, call.params);
    }
  }
  return extracted;
}

/**
 * Build the ordered list of smart-renderer cards for a message's full set of
 * plugin calls (see parsePluginCallsFull) — one card per DISTINCT renderer
 * kind actually invoked this turn, first-call-of-that-kind wins, in
 * first-seen order. A turn can legitimately invoke more than one kind (e.g.
 * Instagram profile + Reddit + a 2D map in one research question), so this
 * (unlike extractAllForMessage) does not collapse map_2d/map_3d together —
 * each renders independently if its own plugin was actually called.
 * @returns {Array<{kind:string, data:object}>}
 */
export function buildSmartCards(calls, text) {
  const cards = [];
  const seenKinds = new Set();
  for (const call of calls) {
    const kind = detectRendererKind(call.pluginId);
    if (kind === RENDERER_KIND.GENERIC || seenKinds.has(kind)) continue;
    let data = null;
    if (kind === RENDERER_KIND.INSTAGRAM_PROFILE) data = extractInstagramProfile(text, call.params);
    else if (kind === RENDERER_KIND.INSTAGRAM_MEDIA) data = extractMediaItems(text);
    else if (kind === RENDERER_KIND.MAP_2D || kind === RENDERER_KIND.MAP_3D) data = extractMapInfo(text, call.params);
    else if (kind === RENDERER_KIND.REDDIT) data = extractRedditThread(text, call.params);
    const hasData = kind === RENDERER_KIND.INSTAGRAM_MEDIA ? Array.isArray(data) && data.length : Boolean(data);
    if (!hasData) continue;
    seenKinds.add(kind);
    cards.push({ kind, data });
  }
  return cards;
}
