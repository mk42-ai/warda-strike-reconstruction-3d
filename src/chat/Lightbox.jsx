/**
 * Lightbox.jsx — full-screen image expand overlay + right-hand
 * "FIND INFORMATION" panel for the Chat / OSINT tab.
 *
 * Opened by clicking ANY in-thread image (composer thumbnail excluded — those
 * are pre-send, not yet "in-thread"). Dims the chat behind it; faint bubbles
 * and citation pills remain visible per the task brief. Defensive-OSINT
 * only — the PLACE section renders a location readout, never a targeting
 * reticle or coordinate lock-on graphic.
 *
 * UX-polish pass (2026-08-15, 5-subagent audit):
 *   - Rendered via createPortal(document.body) so this fixed-position overlay
 *     escapes the `.chat-tab-host` local stacking context (that host has an
 *     explicit `zIndex:50` in App.jsx, shared with `.left-rail`/`.right-rail`
 *     — intentionally BELOW the appbar/tabstrip/object-rail chrome at 65-70,
 *     which is correct for normal chat content but was silently capping this
 *     modal's own z-index:300 underneath that chrome too, since a CSS
 *     stacking context traps ALL descendants regardless of their own
 *     z-index). Portaling to <body> is the standard, lowest-risk fix — it
 *     does not touch any existing z-index value, so the Theatre/rail/tabstrip
 *     layering is completely unaffected.
 *   - Focus now moves into the dialog on open (close button) and is RESTORED
 *     to the element that opened it on close, per the WAI-ARIA dialog
 *     pattern. A lightweight Tab/Shift+Tab focus trap keeps keyboard focus
 *     inside the lightbox while it is open.
 */
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight, MapPin, Info, ExternalLink, Radio } from 'lucide-react';

function getFocusable(container) {
  if (!container) return [];
  return Array.from(
    container.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),
  ).filter((el) => !el.disabled && el.offsetParent !== null);
}

export default function ImageLightbox({ urls, index, findInfo, onClose, onNav }) {
  const dialogRef = useRef(null);
  const closeBtnRef = useRef(null);
  const previouslyFocusedRef = useRef(null);

  // Focus management: remember the trigger element, move focus into the
  // dialog on mount, restore focus to the trigger on unmount.
  useEffect(() => {
    previouslyFocusedRef.current = document.activeElement;
    closeBtnRef.current?.focus();
    return () => {
      if (previouslyFocusedRef.current && typeof previouslyFocusedRef.current.focus === 'function') {
        previouslyFocusedRef.current.focus();
      }
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'ArrowLeft') { onNav(-1); return; }
      if (e.key === 'ArrowRight') { onNav(1); return; }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = getFocusable(dialogRef.current);
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onNav]);

  if (!urls || !urls.length) return null;
  const url = urls[Math.max(0, Math.min(index, urls.length - 1))];
  const hasMultiple = urls.length > 1;

  return createPortal(
    <div className="osint-lightbox" role="dialog" aria-modal="true" aria-label="Image viewer" ref={dialogRef}>
      <div className="osint-lightbox__scrim" onClick={onClose} />
      <div className="osint-lightbox__layout">
        <div className="osint-lightbox__stage">
          <button type="button" className="osint-lightbox__close" onClick={onClose} aria-label="Close" ref={closeBtnRef}>
            <X size={16} strokeWidth={2} />
          </button>
          {hasMultiple && (
            <button type="button" className="osint-lightbox__nav prev" onClick={() => onNav(-1)} aria-label="Previous image">
              <ChevronLeft size={20} strokeWidth={2} />
            </button>
          )}
          <figure className="osint-lightbox__figure">
            <img src={url} alt="Expanded evidence — illustrative, not confirmed intelligence" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.alt = 'Image unavailable (expired or blocked)'; }} />
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
    </div>,
    document.body,
  );
}
