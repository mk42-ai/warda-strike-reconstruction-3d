/**
 * markdownLite.jsx — tiny, dependency-free renderer for the subset of
 * markdown the live Gemini 3.7 Flash fulfillment answers actually use
 * (headings, **bold**, `code`, bullet lists, `---` rules, and
 * [label](url) links) — no new npm dependency added to a Chat-panel-only
 * change set. Also the injection point for Perplexity-style numbered
 * citation pills: every markdown link is matched against the message's
 * already-extracted `citations` array (see streamParsing.js
 * extractCitations) and rendered as a clickable numbered pill INSTEAD of a
 * plain hyperlink, which is what gives answers their "sectioned answer +
 * [1][2][3] citations" Perplexity-like chrome.
 *
 * Deliberately not a full CommonMark parser — tables/nested lists/code
 * fences are out of scope for a streaming chat answer. Tolerates a
 * half-streamed token (an unterminated ** or an in-flight link) by simply
 * leaving the unmatched marker as literal text; nothing throws.
 */
import React from 'react';
import { CitationPill } from './renderers.jsx';

const INLINE_RE = /\[([^\]]{1,140})\]\((https?:\/\/[^\s)]+)\)|\*\*([^*\n]+)\*\*|`([^`\n]+)`/g;

/** Parse one line/paragraph's worth of text into inline React nodes. */
function parseInline(text, citations, onCiteClick, keyPrefix) {
  const byUrl = new Map((citations || []).map((c) => [c.url, c]));
  const nodes = [];
  let last = 0;
  let m;
  let i = 0;
  INLINE_RE.lastIndex = 0;
  while ((m = INLINE_RE.exec(text))) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[1] !== undefined && m[2] !== undefined) {
      const url = m[2].replace(/[.,;)]+$/, '');
      const cite = byUrl.get(url);
      if (cite) {
        nodes.push(<CitationPill key={`${keyPrefix}-c${i}`} n={cite.n} onClick={onCiteClick} />);
      } else {
        nodes.push(
          <a key={`${keyPrefix}-a${i}`} href={url} target="_blank" rel="noopener noreferrer" className="osint-inline-link">
            {m[1]}
          </a>,
        );
      }
    } else if (m[3] !== undefined) {
      nodes.push(<strong key={`${keyPrefix}-b${i}`}>{m[3]}</strong>);
    } else if (m[4] !== undefined) {
      nodes.push(<code key={`${keyPrefix}-k${i}`} className="osint-inline-code">{m[4]}</code>);
    }
    last = INLINE_RE.lastIndex;
    i += 1;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

/**
 * Render a full answer's markdown into block-level React nodes.
 * @param {string} text raw answer text (may be a mid-stream partial string)
 * @param {Array} citations from extractCitations(text)
 * @param {(n:number)=>void} onCiteClick opens the Sources drawer at pill n
 */
export function renderAnswerMarkdown(text, citations, onCiteClick) {
  if (!text) return null;
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  let para = [];
  let list = [];

  const flushPara = () => {
    if (para.length) {
      blocks.push({ type: 'p', text: para.join(' ') });
      para = [];
    }
  };
  const flushList = () => {
    if (list.length) {
      blocks.push({ type: 'ul', items: list });
      list = [];
    }
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) { flushPara(); flushList(); continue; }
    if (/^-{3,}$/.test(line)) { flushPara(); flushList(); blocks.push({ type: 'hr' }); continue; }
    const heading = line.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      flushPara(); flushList();
      blocks.push({ type: 'h', level: heading[1].length, text: heading[2].replace(/\*\*/g, '') });
      continue;
    }
    const bullet = line.match(/^[-*]\s+(.+)$/) || line.match(/^\d+[.)]\s+(.+)$/);
    if (bullet) {
      flushPara();
      list.push(bullet[1]);
      continue;
    }
    flushList();
    para.push(line);
  }
  flushPara();
  flushList();

  return blocks.map((b, bi) => {
    const key = `blk-${bi}`;
    if (b.type === 'hr') return <hr key={key} className="osint-answer-hr" />;
    if (b.type === 'h') {
      const Tag = b.level <= 2 ? 'div' : 'div';
      return <Tag key={key} className="osint-answer-h">{parseInline(b.text, citations, onCiteClick, key)}</Tag>;
    }
    if (b.type === 'ul') {
      return (
        <ul key={key} className="osint-answer-ul">
          {b.items.map((it, ii) => <li key={`${key}-${ii}`}>{parseInline(it, citations, onCiteClick, `${key}-${ii}`)}</li>)}
        </ul>
      );
    }
    return <p key={key} className="osint-answer-p">{parseInline(b.text, citations, onCiteClick, key)}</p>;
  });
}
