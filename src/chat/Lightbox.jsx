/**
 * Lightbox.jsx — full-screen image expand overlay + right-hand
 * "FIND INFORMATION" panel for the Chat / OSINT tab.
 *
 * Opened by clicking ANY in-thread image (composer thumbnail excluded — those
 * are pre-send, not yet "in-thread"). Dims the chat behind it; faint bubbles
 * and citation pills remain visible per the task brief. Defensive-OSINT
 * only — the PLACE section renders a location readout, never a targeting
 * reticle or coordinate lock-on graphic.
 */
import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Info, ExternalLink, Radio } from 'lucide-react';

export default function ImageLightbox({ urls, index, findInfo, onClose, onNav }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') onNav(-1);
      else if (e.key === 'ArrowRight') onNav(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onNav]);

  if (!urls || !urls.length) return null;
  const url = urls[Math.max(0, Math.min(index, urls.length - 1))];
  const hasMultiple = urls.length > 1;

  return (
    <div className="osint-lightbox" role="dialog" aria-modal="true" aria-label="Image viewer">
      <div className="osint-lightbox__scrim" onClick={onClose} />
      <div className="osint-lightbox__layout">
        <div className="osint-lightbox__stage">
          <button type="button" className="osint-lightbox__close" onClick={onClose} aria-label="Close">
            <X size={16} strokeWidth={2} />
          </button>
          {hasMultiple && (
            <button type="button" className="osint-lightbox__nav prev" onClick={() => onNav(-1)} aria-label="Previous image">
              <ChevronLeft size={20} strokeWidth={2} />
            </button>
          )}
          <figure className="osint-lightbox__figure">
            <img src={url} alt="Expanded evidence" />
            <figcaption>{index + 1} / {urls.length} · illustrative research aid — verify before treating as confirmed</figcaption>
          </figure>
          {hasMultiple && (
            <button type="button" className="osint-lightbox__nav next" onClick={() => onNav(1)} aria-label="Next image">
              <ChevronRight size={20} strokeWidth={2} />
            </button>
          )}
        </div>

        <aside className="osint-findinfo" aria-label="Find information">
          <div className="osint-findinfo__head"><Info size={12} strokeWidth={1.9} /> Find Information</div>

          <div className="osint-findinfo__section">
            <div className="osint-findinfo__label"><Radio size={10} strokeWidth={2} /> Source</div>
            <div className="osint-findinfo__row">{findInfo?.source?.pluginName || 'Unknown source'}</div>
            {findInfo?.source?.domain && <div className="osint-findinfo__row muted">{findInfo.source.domain}</div>}
            <div className="osint-findinfo__row muted">
              {findInfo?.source?.verified ? 'Verified account' : 'Unverified — treat as unconfirmed'}
            </div>
          </div>

          <div className="osint-findinfo__section">
            <div className="osint-findinfo__label"><MapPin size={10} strokeWidth={2} /> Place</div>
            {findInfo?.place ? (
              <>
                <div className="osint-findinfo__row">{findInfo.place.label || 'Referenced location'}</div>
                {findInfo.place.lat != null && findInfo.place.lon != null && (
                  <div className="osint-findinfo__row muted">
                    {Math.abs(findInfo.place.lat).toFixed(4)}°{findInfo.place.lat >= 0 ? 'N' : 'S'},{' '}
                    {Math.abs(findInfo.place.lon).toFixed(4)}°{findInfo.place.lon >= 0 ? 'E' : 'W'}
                  </div>
                )}
              </>
            ) : (
              <div className="osint-findinfo__row muted">No location context extracted</div>
            )}
          </div>

          <div className="osint-findinfo__section">
            <div className="osint-findinfo__label">Related facts</div>
            <ul className="osint-findinfo__facts">
              {(findInfo?.facts || []).map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          </div>

          <a
            className="osint-findinfo__open"
            href={findInfo?.originalUrl || url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink size={11} strokeWidth={2} /> Open original
          </a>
        </aside>
      </div>
    </div>
  );
}
