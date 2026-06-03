"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Sparkles,
  ChevronRight,
  Play,
  Check,
  Circle,
  Highlighter,
} from "lucide-react";
import type { Note } from "@/data/notes";
import { NOTES } from "@/data/notes";
import { CASES } from "@/data/cases";
import { useNoteProgress } from "@/hooks/useNoteProgress";
import { useAuth } from "@/lib/auth/AuthProvider";
import { useHighlights, type HighlightColor, type SectionKind } from "@/hooks/useHighlights";
import HighlightableText from "@/components/highlights/HighlightableText";
import HighlightToolbar, {
  type PendingSelection,
} from "@/components/highlights/HighlightToolbar";
import QuickQuiz from "@/components/notes/QuickQuiz";

const SESSION_COLORS: Record<1 | 2 | 3, string> = {
  1: "from-violet-500 to-purple-700",
  2: "from-rose-500 to-red-700",
  3: "from-amber-500 to-orange-700",
};

type AnchorParts = { kind: SectionKind; sectionIdx: number; bulletIdx: number | null };

function parseAnchor(a: string | null): AnchorParts | null {
  if (!a) return null;
  const [kind, s, b] = a.split(":");
  if (!kind) return null;
  const valid: SectionKind[] = ["section", "table", "pearls", "summary"];
  if (!valid.includes(kind as SectionKind)) return null;
  return {
    kind: kind as SectionKind,
    sectionIdx: parseInt(s ?? "0", 10) || 0,
    bulletIdx: b == null || b === "" ? null : parseInt(b, 10),
  };
}

export default function NoteDetail({ note }: { note: Note }) {
  const { completed, toggle, hydrated } = useNoteProgress();
  const { openLogin } = useAuth();
  const isDone = completed.has(note.id);

  const relatedCases = (note.relatedCaseIds ?? [])
    .map((id) => CASES.find((c) => c.id === id))
    .filter((c): c is NonNullable<typeof c> => !!c);

  const moreInCategory = NOTES.filter(
    (n) => n.category === note.category && n.id !== note.id,
  ).slice(0, 6);

  // Highlights state + persistence.
  const { items: highlights, create, makeFlashcard, isAuthed } = useHighlights(note.id);
  const [pending, setPending] = useState<PendingSelection | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const groupedHighlights = useCallback(
    (kind: SectionKind, sectionIdx: number, bulletIdx: number | null) =>
      highlights.filter(
        (h) =>
          h.section_kind === kind &&
          h.section_idx === sectionIdx &&
          (h.bullet_idx ?? null) === bulletIdx,
      ),
    [highlights],
  );

  // Selection handler — collapses a window selection inside the content area
  // into a stable (anchor, offset, text) tuple for the toolbar.
  useEffect(() => {
    function handleUp() {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed) return;
      const range = sel.getRangeAt(0);
      const anchor = (range.commonAncestorContainer.parentElement?.closest(
        "[data-anchor]",
      ) ?? null) as HTMLElement | null;
      if (!anchor) return;
      const inside = contentRef.current?.contains(anchor);
      if (!inside) return;
      const parts = parseAnchor(anchor.getAttribute("data-anchor"));
      if (!parts) return;
      const text = sel.toString().trim();
      if (text.length < 3) return;
      // Calculate offset relative to the anchor's text content.
      const fullText = anchor.textContent ?? "";
      const startOffset = fullText.indexOf(text);
      if (startOffset < 0) return;
      const rect = range.getBoundingClientRect();
      setPending({
        text,
        sectionKind: parts.kind,
        sectionIdx: parts.sectionIdx,
        bulletIdx: parts.bulletIdx,
        startOffset,
        endOffset: startOffset + text.length,
        x: rect.left + rect.width / 2,
        y: rect.top,
      });
    }
    document.addEventListener("mouseup", handleUp);
    document.addEventListener("touchend", handleUp);
    return () => {
      document.removeEventListener("mouseup", handleUp);
      document.removeEventListener("touchend", handleUp);
    };
  }, []);

  const handleHighlight = useCallback(
    async (color: HighlightColor) => {
      if (!pending) return null;
      return create({
        note_id: note.id,
        section_kind: pending.sectionKind,
        section_idx: pending.sectionIdx,
        bullet_idx: pending.bulletIdx,
        start_offset: pending.startOffset,
        end_offset: pending.endOffset,
        text_content: pending.text,
        color,
        note: null,
      });
    },
    [pending, create, note.id],
  );

  const handleMakeFlashcard = useCallback(
    async (front: string, back: string) => {
      if (!pending) return false;
      const h = await create({
        note_id: note.id,
        section_kind: pending.sectionKind,
        section_idx: pending.sectionIdx,
        bullet_idx: pending.bulletIdx,
        start_offset: pending.startOffset,
        end_offset: pending.endOffset,
        text_content: pending.text,
        color: "yellow",
        note: null,
      });
      if (!h) return false;
      return makeFlashcard(h, front, back);
    },
    [pending, create, makeFlashcard, note.id],
  );

  return (
    <div className="min-h-[100dvh] flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-30 backdrop-blur-md bg-black/50 border-b border-white/5">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center gap-4">
          <Link
            href={note.category === "OMM" ? "/omm" : "/notes"}
            className="inline-flex items-center gap-1.5 text-sm text-white/65 hover:text-white transition shrink-0"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">{note.category === "OMM" ? "OMM" : "Notes"}</span>
          </Link>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-white/45">
              <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-br ${SESSION_COLORS[note.session]}`} />
              <span className="truncate">{note.category}</span>
            </div>
            <div className="truncate text-sm font-semibold tracking-tight">{note.title}</div>
          </div>
          <button
            onClick={() => toggle(note.id)}
            disabled={!hydrated}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition shrink-0 ${
              isDone
                ? "bg-emerald-400/20 border border-emerald-400/40 text-emerald-200 hover:bg-emerald-400/30"
                : "bg-white text-black hover:bg-white/90"
            }`}
          >
            {isDone ? (
              <>
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
                <span className="hidden sm:inline">Completed</span>
              </>
            ) : (
              <>
                <Circle className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Mark complete</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 mx-auto max-w-5xl w-full px-6 py-8 md:py-12" ref={contentRef}>
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="text-xs uppercase tracking-[0.22em] text-cyan-300/80 mb-3">{note.category}</div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{note.title}</h1>
          <p className="text-white/65 text-base md:text-lg max-w-3xl leading-relaxed">
            <HighlightableText
              text={note.summary}
              highlights={groupedHighlights("summary", 0, null)}
              dataAnchor="summary:0"
            />
          </p>
          <div className="mt-4 text-[11px] text-white/45 inline-flex items-center gap-1.5">
            <Highlighter className="h-3 w-3" />
            Select any text to highlight it or make a flashcard.
          </div>
        </motion.div>

        {/* Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
          <div className="space-y-6 min-w-0">
            {(note.sections ?? []).map((section, i) => (
              <motion.div
                key={section.heading}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="glass rounded-2xl p-6"
              >
                <h2 className="text-base font-semibold tracking-tight mb-3 flex items-center gap-2">
                  <span className="text-cyan-300">◆</span>
                  {section.heading}
                </h2>
                <ul className="space-y-2">
                  {section.bullets.map((b, j) => (
                    <li key={j} className="flex gap-2.5 text-sm text-white/80 leading-relaxed">
                      <span className="text-white/30 mt-1.5 shrink-0">•</span>
                      <span>
                        <HighlightableText
                          text={b}
                          highlights={groupedHighlights("section", i, j)}
                          dataAnchor={`section:${i}:${j}`}
                        />
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Tables */}
            {note.tables?.map((table, ti) => (
              <motion.div
                key={ti}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: ((note.sections?.length ?? 0) + ti) * 0.04 }}
                className="glass rounded-2xl p-6"
              >
                {table.caption && (
                  <h2 className="text-base font-semibold tracking-tight mb-3">{table.caption}</h2>
                )}
                <div className="overflow-x-auto -mx-2">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        {table.headers.map((h) => (
                          <th key={h} className="text-left py-2 px-2 text-[10px] uppercase tracking-[0.18em] text-white/55 font-medium">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {table.rows.map((row, ri) => (
                        <tr key={ri} className="border-b border-white/[0.06] last:border-0">
                          {row.map((cell, ci) => (
                            <td key={ci} className="py-3 px-2 text-white/80 align-top text-xs md:text-sm leading-relaxed">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            ))}

            {/* Pearls */}
            {note.pearls && note.pearls.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: ((note.sections?.length ?? 0) + (note.tables?.length ?? 0)) * 0.04 }}
                className="glass-strong rounded-2xl p-6 border-2 border-amber-400/30"
              >
                <h2 className="text-sm uppercase tracking-[0.22em] text-amber-300 mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  High-yield pearls
                </h2>
                <ul className="space-y-2">
                  {note.pearls.map((p, i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-white/85 leading-relaxed">
                      <span className="text-amber-300 mt-0.5 shrink-0">◆</span>
                      <span>
                        <HighlightableText
                          text={p}
                          highlights={groupedHighlights("pearls", 0, i)}
                          dataAnchor={`pearls:0:${i}`}
                        />
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Quick quiz on this note's material */}
            <QuickQuiz note={note} />

            {/* Mark complete / next CTA */}
            <div className="glass rounded-2xl p-5 flex flex-wrap gap-3 items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-white/45 mb-0.5">
                  Done reading?
                </div>
                <div className="text-sm font-medium text-white/85">
                  {isDone ? "Marked complete — nice work." : "Track your progress by marking this complete."}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggle(note.id)}
                  disabled={!hydrated}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                    isDone
                      ? "bg-emerald-400/15 border border-emerald-400/40 text-emerald-200 hover:bg-emerald-400/25"
                      : "bg-white text-black hover:bg-white/90"
                  }`}
                >
                  {isDone ? (
                    <>
                      <Check className="h-4 w-4" strokeWidth={3} />
                      Completed
                    </>
                  ) : (
                    <>
                      <Circle className="h-4 w-4" />
                      Mark complete
                    </>
                  )}
                </button>
                {moreInCategory.length > 0 && (
                  <Link
                    href={`/notes/${moreInCategory[0].id}`}
                    onClick={() => { if (!isDone && hydrated) toggle(note.id); }}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white/85 hover:bg-white/[0.08] transition"
                  >
                    Next in {note.category}
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="glass rounded-2xl p-5">
              <div className="text-[10px] uppercase tracking-[0.22em] text-cyan-300/80 mb-3 flex items-center gap-2">
                <Sparkles className="h-3 w-3" /> Flashcards for this note
              </div>
              <Link
                href={`/flashcards/${note.id}`}
                className="block rounded-lg bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-cyan-300/20 px-3 py-3 hover:from-violet-500/30 hover:to-cyan-500/30 transition"
              >
                <div className="text-xs font-semibold text-white/90">
                  Open pre-built deck
                </div>
                <div className="text-[11px] text-white/55 mt-0.5">
                  Auto-generated from pearls & key bullets
                </div>
              </Link>
            </div>

            {relatedCases.length > 0 && (
              <div className="glass rounded-2xl p-5">
                <div className="text-[10px] uppercase tracking-[0.22em] text-amber-300/80 mb-3 flex items-center gap-2">
                  <Play className="h-3 w-3" /> Practice cases
                </div>
                <div className="space-y-2">
                  {relatedCases.map((c) => (
                    <Link
                      key={c.id}
                      href={`/cases/${c.id}`}
                      className="group flex items-start gap-2 rounded-lg px-3 py-2 -mx-1 hover:bg-white/[0.04] transition"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-300/60 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-white/85 leading-snug">{c.diagnosis}</div>
                      </div>
                      <ChevronRight className="h-3 w-3 text-white/30 group-hover:text-amber-300 group-hover:translate-x-0.5 transition mt-1" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {moreInCategory.length > 0 && (
              <div className="glass rounded-2xl p-5">
                <div className="text-[10px] uppercase tracking-[0.22em] text-cyan-300/80 mb-3">
                  More in {note.category}
                </div>
                <div className="space-y-1">
                  {moreInCategory.map((m) => {
                    const mDone = completed.has(m.id);
                    return (
                      <Link
                        key={m.id}
                        href={`/notes/${m.id}`}
                        className="group flex items-start gap-2 rounded-lg px-3 py-2 -mx-1 hover:bg-white/[0.04] transition"
                      >
                        <span
                          className={`mt-1 h-3.5 w-3.5 rounded-sm border flex items-center justify-center shrink-0 ${
                            mDone
                              ? "border-emerald-300/60 bg-emerald-400/20 text-emerald-300"
                              : "border-white/15 bg-white/[0.02]"
                          }`}
                        >
                          {mDone && <Check className="h-2.5 w-2.5" strokeWidth={3} />}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className={`text-xs font-medium leading-snug ${mDone ? "text-white/65" : "text-white/85"}`}>{m.title}</div>
                        </div>
                        <ChevronRight className="h-3 w-3 text-white/30 group-hover:text-cyan-300 group-hover:translate-x-0.5 transition mt-1" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>

      <HighlightToolbar
        pending={pending}
        onClear={() => setPending(null)}
        onHighlight={handleHighlight}
        onMakeFlashcard={handleMakeFlashcard}
        isAuthed={isAuthed}
        onSignInPrompt={() => {
          setPending(null);
          openLogin();
        }}
      />
    </div>
  );
}
