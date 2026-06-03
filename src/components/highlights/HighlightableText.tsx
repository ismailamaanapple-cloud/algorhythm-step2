"use client";

import { useMemo } from "react";
import type { Highlight, HighlightColor } from "@/hooks/useHighlights";

const COLOR_BG: Record<HighlightColor, string> = {
  yellow: "bg-yellow-300/30 hover:bg-yellow-300/45",
  green:  "bg-emerald-300/30 hover:bg-emerald-300/45",
  pink:   "bg-pink-300/30 hover:bg-pink-300/45",
  blue:   "bg-cyan-300/30 hover:bg-cyan-300/45",
};

type Span = { text: string; color?: HighlightColor; highlightId?: string };

/**
 * Renders a text block with any matching highlights overlaid as colored spans.
 * Highlights are matched by (section_kind, section_idx, bullet_idx) + offset.
 */
export default function HighlightableText({
  text,
  highlights,
  dataAnchor,
}: {
  text: string;
  highlights: Highlight[];
  /** A stable data-anchor string we attach to the wrapper so the selection
   *  handler can identify which bullet was highlighted. */
  dataAnchor: string;
}) {
  const spans = useMemo<Span[]>(() => {
    if (highlights.length === 0) return [{ text }];
    // Sort by start offset and merge non-overlapping highlights.
    const sorted = [...highlights].sort((a, b) => a.start_offset - b.start_offset);
    const result: Span[] = [];
    let cursor = 0;
    for (const h of sorted) {
      const s = Math.max(0, Math.min(text.length, h.start_offset));
      const e = Math.max(s, Math.min(text.length, h.end_offset));
      if (s > cursor) result.push({ text: text.slice(cursor, s) });
      result.push({
        text: text.slice(s, e),
        color: h.color,
        highlightId: h.id,
      });
      cursor = e;
    }
    if (cursor < text.length) result.push({ text: text.slice(cursor) });
    return result;
  }, [text, highlights]);

  return (
    <span data-anchor={dataAnchor}>
      {spans.map((sp, i) =>
        sp.color ? (
          <mark
            key={i}
            data-hl-id={sp.highlightId}
            className={`rounded-sm px-0.5 transition cursor-pointer ${COLOR_BG[sp.color]} text-white`}
          >
            {sp.text}
          </mark>
        ) : (
          <span key={i}>{sp.text}</span>
        ),
      )}
    </span>
  );
}
