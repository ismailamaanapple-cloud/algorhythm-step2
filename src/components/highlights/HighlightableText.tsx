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
 *
 * Handles overlapping highlights without duplicating text: we sweep left-to-
 * right and clamp each highlight's start to the running cursor so the
 * overlap region is only painted once (with the leftmost highlight's color).
 */
export default function HighlightableText({
  text,
  highlights,
  dataAnchor,
}: {
  text: string;
  highlights: Highlight[];
  /** A stable data-anchor string we attach to the wrapper so the selection
   *  handler can identify which bullet/cell/heading was highlighted. */
  dataAnchor: string;
}) {
  const spans = useMemo<Span[]>(() => {
    if (highlights.length === 0) return [{ text }];
    const sorted = [...highlights].sort((a, b) => a.start_offset - b.start_offset);
    const result: Span[] = [];
    let cursor = 0;
    for (const h of sorted) {
      const hs = Math.max(0, Math.min(text.length, h.start_offset));
      const he = Math.max(hs, Math.min(text.length, h.end_offset));
      if (he <= cursor) continue; // fully consumed by an earlier highlight
      const s = Math.max(hs, cursor); // clamp: never paint the same region twice
      if (s > cursor) result.push({ text: text.slice(cursor, s) });
      if (he > s) {
        result.push({
          text: text.slice(s, he),
          color: h.color,
          highlightId: h.id,
        });
      }
      cursor = he;
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
