/**
 * SourcesDrawer.jsx — right-side panel listing every numbered citation in an
 * answer as a full source card (favicon, title, domain, snippet, plugin
 * chip, outbound link). Opened by clicking a numbered citation pill inline
 * in the answer, or a dedicated "Sources" control. Pills map 1:1 to cards by
 * citation number (reuses the same <SourceCard> the citation chip row and
 * generic-source fallback use, so "pill -> card" is a literal shared
 * component, not just a visual echo), and the requested card is scrolled
 * into view + briefly highlighted.
 */
import React, { useEffect, useRef } from 'react';
import { X, BookMarked } from 'lucide-react';
import { SourceCard } from './renderers.jsx';

export default function SourcesDrawer({ citations, focusN, onClose, snippetLookup, pluginLookup }) {
  const refs = useRef({});

  useEffect(() => {
    if (focusN && refs.current[focusN]) {
      refs.current[focusN].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [focusN]);

  if (!citations || !citations.length) return null;

  return (
    <div className="osint-drawer-host" role="dialog" aria-modal="true" aria-label="Sources">
      <div className="osint-drawer-host__scrim" onClick={onClose} />
      <aside className="osint-drawer">
        <div className="osint-drawer__head">
          <span><BookMarked size={13} strokeWidth={1.9} /> Sources · {citations.length}</span>
          <button type="button" onClick={onClose} aria-label="Close sources"><X size={14} strokeWidth={2} /></button>
        </div>
        <div className="osint-drawer__body">
          {citations.map((c) => (
            <SourceCard
              key={c.url}
              n={c.n}
              citation={c}
              snippet={snippetLookup ? snippetLookup(c) : ''}
              pluginName={pluginLookup ? pluginLookup(c) : ''}
              focus={focusN === c.n}
              elRef={(el) => { refs.current[c.n] = el; }}
            />
          ))}
        </div>
      </aside>
    </div>
  );
}
