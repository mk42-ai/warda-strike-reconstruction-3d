/**
 * renderers.jsx — Perplexity-style "smart renderer" cards for the Chat / OSINT
 * tab, keyed to the plugin that produced them (see streamParsing.js for the
 * detection + extraction logic and its live-verified data-shape notes).
 *
 * Every card here is DEFENSIVE-OSINT presentational only: no targeting
 * reticles, no lock-on graphics, no crosshairs — geolocation cards show a
 * plain pin + scale bar, nothing more. Dark Foundry palette only (see
 * src/styles.css :root tokens) — no new colors, no logos/watermarks beyond
 * the existing ON DEMAND chrome.
 */
import React, { useState } from 'react';
import {
  BadgeCheck, MapPin, AtSign, ExternalLink, Layers,
  WifiOff, Hash, MessageCircle, CornerDownRight, Play, BookMarked,
} from 'lucide-react';
import { faviconUrl, domainFromUrl } from './streamParsing.js';

/** Compact number formatting for follower/following/media counts (12737 -> 12,737). */
function fmtCount(v) {
  if (v == null) return null;
  const n = typeof v === 'string' ? Number(v.replace(/,/g, '')) : v;
  if (!Number.isFinite(n)) return String(v);
  return n.toLocaleString('en-US');
}

// ---------------------------------------------------------------------------
// Instagram profile card
// ---------------------------------------------------------------------------
export function InstagramProfileCard({ data }) {
  if (!data) return null;
  const { username, fullName, followerCount, followingCount, mediaCount, biography, isVerified, avatarUrl } = data;
  return (
    <div className="osint-card osint-ig-profile">
      <div className="osint-ig-profile__head">
        <div className="osint-ig-profile__avatar">
          {avatarUrl ? <img src={avatarUrl} alt={`@${username} avatar`} loading="lazy" /> : <AtSign size={18} strokeWidth={1.6} />}
        </div>
        <div className="osint-ig-profile__id">
          <div className="osint-ig-profile__username">
            @{username}
            {isVerified && <BadgeCheck size={12} strokeWidth={2} className="osint-verified" aria-label="verified" />}
          </div>
          {fullName && <div className="osint-ig-profile__fullname">{fullName}</div>}
        </div>
      </div>
      <div className="osint-ig-profile__stats">
        {followerCount != null && (
          <div className="osint-stat"><b>{fmtCount(followerCount)}</b><span>Followers</span></div>
        )}
        {followingCount != null && (
          <div className="osint-stat"><b>{fmtCount(followingCount)}</b><span>Following</span></div>
        )}
        {mediaCount != null && (
          <div className="osint-stat"><b>{fmtCount(mediaCount)}</b><span>Posts</span></div>
        )}
      </div>
      {biography && <div className="osint-ig-profile__bio">{biography}</div>}
      <div className="osint-card__chip">Instagram</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Instagram media carousel — thumbnail tiles + dots
// ---------------------------------------------------------------------------
export function InstagramCarousel({ items, onOpen }) {
  const [idx, setIdx] = useState(0);
  if (!items || !items.length) return null;
  const active = items[Math.min(idx, items.length - 1)];
  return (
    <div className="osint-card osint-ig-carousel">
      <button
        type="button"
        className="osint-ig-carousel__stage"
        onClick={() => onOpen && onOpen(items.map((i) => i.url), idx)}
        title={active.kind === 'video' ? 'Open video link' : 'Expand image'}
      >
        {active.kind === 'video' ? (
          <div className="osint-ig-carousel__video-badge"><Play size={20} strokeWidth={1.8} /> Video</div>
        ) : (
          <img src={active.url} alt="Instagram media" loading="lazy" />
        )}
      </button>
      {items.length > 1 && (
        <div className="osint-ig-carousel__dots">
          {items.map((it, i) => (
            <button
              key={it.url}
              type="button"
              className={`osint-ig-carousel__dot ${i === idx ? 'on' : ''}`}
              aria-label={`media ${i + 1}`}
              onClick={() => setIdx(i)}
            />
          ))}
        </div>
      )}
      <div className="osint-card__chip">Instagram</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Map cards — 2D (top-down basemap) and 3D (low-oblique terrain). Same
// fallback pattern on a live plugin 500 (verified real on this deployment).
// ---------------------------------------------------------------------------
function MapFallback({ place, mode }) {
  return (
    <div className="osint-card osint-map osint-map--fallback">
      <div className="osint-map__fallback-body">
        <WifiOff size={16} strokeWidth={1.7} />
        <div>
          <div className="osint-map__fallback-place">{place || 'Unknown place'}</div>
          <div className="osint-map__fallback-note">{mode === '3d' ? '3D terrain view' : '2D map view'} unavailable — plugin returned an error</div>
        </div>
      </div>
      <div className="osint-card__chip">{mode === '3d' ? 'Satellite Imagery' : 'Maps'}</div>
    </div>
  );
}

function MapTile({ place, lat, lon, mode }) {
  const coordLabel = lat != null && lon != null
    ? `${Math.abs(lat).toFixed(4)}°${lat >= 0 ? 'N' : 'S'}, ${Math.abs(lon).toFixed(4)}°${lon >= 0 ? 'E' : 'W'}`
    : null;
  return (
    <div className="osint-card osint-map">
      <div className={`osint-map__tile ${mode === '3d' ? 'osint-map__tile--3d' : ''}`}>
        <div className="osint-map__grid" aria-hidden />
        <MapPin size={16} strokeWidth={1.8} className="osint-map__pin" />
        <div className="osint-map__scale"><span /> 2 km</div>
        {mode === '3d' && <Layers size={12} strokeWidth={1.7} className="osint-map__layers-badge" aria-label="oblique terrain" />}
      </div>
      <div className="osint-map__caption">
        <span className="osint-map__place">{place || 'Location reference'}</span>
        {coordLabel && <span className="osint-map__coords">{coordLabel}</span>}
      </div>
      <div className="osint-card__chip">{mode === '3d' ? 'Satellite Imagery' : 'Maps'}</div>
    </div>
  );
}

export function Map2DCard({ data }) {
  if (!data) return null;
  if (data.failed) return <MapFallback place={data.place} mode="2d" />;
  return <MapTile place={data.place} lat={data.lat} lon={data.lon} mode="2d" />;
}

export function Map3DCard({ data }) {
  if (!data) return null;
  if (data.failed) return <MapFallback place={data.place} mode="3d" />;
  return <MapTile place={data.place} lat={data.lat} lon={data.lon} mode="3d" />;
}

// ---------------------------------------------------------------------------
// Reddit thread + nested comments stack
// ---------------------------------------------------------------------------
export function RedditThreadStack({ data }) {
  if (!data || !data.posts?.length) return null;
  return (
    <div className="osint-card osint-reddit">
      <div className="osint-reddit__sub"><Hash size={11} strokeWidth={2} /> r/{data.subreddit}</div>
      {data.posts.map((post, i) => (
        <div key={`${post.title}-${i}`} className="osint-reddit__post">
          <div className="osint-reddit__title"><MessageCircle size={11} strokeWidth={1.8} /> {post.title}</div>
          {post.comments.length > 0 && (
            <div className="osint-reddit__comments">
              {post.comments.map((c, ci) => (
                <div key={ci} className="osint-reddit__comment">
                  <CornerDownRight size={10} strokeWidth={1.8} className="osint-reddit__comment-icon" />
                  <span>{c}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <div className="osint-card__chip">Reddit</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Generic OSINT source card — favicon, bold title, domain, 2-line snippet,
// plugin-name chip, outbound link. Used both as the fuller card inside the
// Sources drawer (numbered, `n` supplied) and as the plain fallback renderer
// for citations with no dedicated smart-card platform match.
// ---------------------------------------------------------------------------
export function SourceCard({ n, citation, snippet, pluginName, focus, elRef }) {
  const domain = domainFromUrl(citation.url);
  return (
    <a
      ref={elRef}
      className={`osint-source-card ${focus ? 'focus' : ''}`}
      href={citation.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {n != null && <div className="osint-source-card__num">{n}</div>}
      <img className="osint-source-card__favicon" src={faviconUrl(citation.url)} alt="" loading="lazy" />
      <div className="osint-source-card__body">
        <div className="osint-source-card__title">{citation.label}</div>
        <div className="osint-source-card__domain">{domain}</div>
        {snippet && <div className="osint-source-card__snippet">{snippet}</div>}
        {pluginName && <span className="osint-source-card__plugin">{pluginName}</span>}
      </div>
      <ExternalLink size={11} strokeWidth={1.8} className="osint-source-card__ext" />
    </a>
  );
}

/**
 * Compact horizontal citation chip row shown directly under the answer text
 * (favicon + short title + domain). Includes the "Sources" control the task
 * brief calls out as an alternate entry point into the drawer (in addition to
 * clicking an individual numbered pill inline in the answer).
 */
export function CitationChipRow({ citations, onOpenDrawer }) {
  if (!citations?.length) return null;
  return (
    <div className="osint-citerow">
      <button type="button" className="osint-citerow__all" onClick={() => onOpenDrawer(null)}>
        <BookMarked size={11} strokeWidth={1.9} /> Sources · {citations.length}
      </button>
      {citations.slice(0, 6).map((c) => (
        <button key={c.url} type="button" className="osint-citechip" onClick={() => onOpenDrawer(c.n)} title={c.url}>
          <img src={faviconUrl(c.url)} alt="" loading="lazy" />
          <span className="osint-citechip__title">{c.label.length > 28 ? `${c.label.slice(0, 27)}…` : c.label}</span>
          <span className="osint-citechip__domain">{domainFromUrl(c.url)}</span>
        </button>
      ))}
    </div>
  );
}

/** Numbered circular pill — [1] [2] [3] — inline after a citation reference. */
export function CitationPill({ n, onClick }) {
  return (
    <button type="button" className="osint-pill" onClick={() => onClick(n)} aria-label={`Source ${n}`}>
      {n}
    </button>
  );
}

/** Optional mid-thread 2xN inline image grid when several visuals exist. */
export function ImageGrid({ urls, onOpen }) {
  if (!urls || urls.length < 3) return null; // small counts already covered by InlineImages
  return (
    <div className="osint-imggrid">
      {urls.map((url, i) => (
        <button key={url} type="button" className="osint-imggrid__cell" onClick={() => onOpen(urls, i)}>
          <img src={url} alt="" loading="lazy" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        </button>
      ))}
    </div>
  );
}

export function FollowUpChips({ chips, onPick, disabled }) {
  if (!chips?.length) return null;
  return (
    <div className="osint-followups">
      {chips.map((c) => (
        <button key={c} type="button" className="osint-followup-chip" onClick={() => onPick(c)} disabled={disabled}>
          {c}
        </button>
      ))}
    </div>
  );
}
