/**
 * SourcesDrawer.jsx — right-side panel listing every numbered citation in an
 * answer as a full source card (favicon, title, domain, snippet, plugin
 * chip, outbound link). Opened by clicking a numbered citation pill inline
 * in the answer, or a dedicated "Sources" control. Pills map 1:1 to cards
 * (reuses the same <SourceCard> the citation chip row and generic-source
 * fallback use, so "pill -> card" is a literal shared component, not just a
 * visual echo), and the requested card is scrolled into view + briefly
 * highlighted.
 *
 * UX-polish pass (2026-08-15, 5-subagent audit):
 *   - Rendered via createPortal(document.body) — same fix and same rationale
 *     as Lightbox.jsx: `.chat-tab-host`'s z-index:50 stacking context was
 *     trapping this drawer's fixed-position overlay UNDER the appbar (70) /
 *     tabstrip (65) / object-rail (68), which is the confirmed root cause of
 *     the screenshotted mobile top-clipping bug — the drawer's header and the
 *     top of its first card were rendering BEHIND the opaque status chrome.
 *     Portaling to <body> escapes that trap without touching any existing
 *     z-index value.
 *   - Added an Escape-key handler (parity with Lightbox, which already had
 *     one) and the same focus-move-in / focus-trap / focus-restore pattern.
 */
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, BookMarked } from 'lucide-react';
import { SourceCard } from './renderers.jsx';

function getFocusable(container) {
  if (!container) return [];
  return Array.from(
    container.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),
  ).filter((el) => !el.disabled && el.offsetParent !== null);
}

export default function SourcesDrawer({ citations, focusN, onClose, snippetLookup, pluginLookup }) {
  const refs = useRef({});
  const dialogRef = useRef(null);
  const closeBtnRef = useRef(null);
  const previouslyFocusedRef = useRef(null);

  useEffect(() => {
    if (focusN && refs.current[focusN]) {
      refs.current[focusN].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [focusN]);

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
  }, [onClose]);

  if (!citations || !citations.length) return null;

  return createPortal(
    <div className="osint-drawer-host" role="dialog" aria-modal="true" aria-label="Sources" ref={dialogRef}>
      <div className="osint-drawer-host__scrim" onClick={onClose} />
      <aside className="osint-drawer">
        <div className="osint-drawer__head">
          <span><BookMarked size={13} strokeWidth={1.9} /> Sources · {citations.length}</span>
          <button type="button" onClick={onClose} aria-label="Close sources" ref={closeBtnRef}>
            <X size={14} strokeWidth={2} />
          </button>
        </div>
        <div className="osint-drawer__body">
          {citations.map((c) => {
            const snippet = snippetLookup ? snippetLookup(c) : '';
            const pluginName = pluginLookup ? pluginLookup(c) : '';
            return (
              <SourceCard
                key={c.url}
                n={c.n}
                citation={c}
                snippet={snippet}
                pluginName={pluginName}
                focus={focusN === c.n}
                elRef={(el) => { refs.current[c.n] = el; }}
              />
            );
          })}
        </div>
      </aside>
    </div>,
    document.body,
  );
}
