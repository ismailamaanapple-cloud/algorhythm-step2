"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Check, Layers } from "lucide-react";
import type { Highlight, HighlightColor, SectionKind } from "@/hooks/useHighlights";

const COLORS: { c: HighlightColor; cls: string; ring: string }[] = [
  { c: "yellow", cls: "bg-yellow-300", ring: "ring-yellow-300" },
  { c: "green",  cls: "bg-emerald-300", ring: "ring-emerald-300" },
  { c: "pink",   cls: "bg-pink-300",    ring: "ring-pink-300" },
  { c: "blue",   cls: "bg-cyan-300",    ring: "ring-cyan-300" },
];

export type PendingSelection = {
  text: string;
  sectionKind: SectionKind;
  sectionIdx: number;
  bulletIdx: number | null;
  startOffset: number;
  endOffset: number;
  // Viewport coords for placing the popover.
  x: number;
  y: number;
};

export default function HighlightToolbar({
  pending,
  onClear,
  onHighlight,
  onMakeFlashcard,
  isAuthed,
  onSignInPrompt,
}: {
  pending: PendingSelection | null;
  onClear: () => void;
  onHighlight: (color: HighlightColor) => Promise<Highlight | null>;
  onMakeFlashcard: (front: string, back: string) => Promise<boolean>;
  isAuthed: boolean;
  onSignInPrompt: () => void;
}) {
  const [stage, setStage] = useState<"pick" | "card" | "saved">("pick");
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pending) {
      setStage("pick");
      setBack(pending.text);
      setFront("");
    }
  }, [pending]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!pending) return;
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClear();
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [pending, onClear]);

  if (!pending) return null;

  // Clamp to viewport.
  const W = 320;
  const left = Math.max(8, Math.min(window.innerWidth - W - 8, pending.x - W / 2));
  const top = Math.max(8, pending.y - 8);

  async function handleColor(c: HighlightColor) {
    if (!isAuthed) {
      onSignInPrompt();
      return;
    }
    await onHighlight(c);
    onClear();
  }

  async function handleCreateCard() {
    if (!isAuthed) {
      onSignInPrompt();
      return;
    }
    if (!front.trim() || !back.trim()) return;
    const ok = await onMakeFlashcard(front.trim(), back.trim());
    if (ok) setStage("saved");
  }

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 8, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 4, scale: 0.95 }}
        transition={{ duration: 0.15 }}
        style={{ position: "fixed", left, top, width: W, zIndex: 80 }}
        className="glass-strong rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {stage === "pick" && (
          <div className="p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[10px] uppercase tracking-[0.22em] text-white/45">
                Highlight
              </div>
              <button
                onClick={onClear}
                className="p-1 rounded text-white/40 hover:text-white/80 hover:bg-white/5 transition"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
            <div className="flex items-center gap-2 mb-3">
              {COLORS.map((c) => (
                <button
                  key={c.c}
                  onClick={() => handleColor(c.c)}
                  title={`Highlight ${c.c}`}
                  className={`h-7 w-7 rounded-full ${c.cls} ring-2 ring-transparent hover:${c.ring} hover:ring-2 transition`}
                />
              ))}
            </div>
            <button
              onClick={() => {
                if (!isAuthed) {
                  onSignInPrompt();
                  return;
                }
                setStage("card");
              }}
              className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 px-3 py-2 text-xs font-semibold hover:opacity-90 transition"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Make flashcard
            </button>
            {!isAuthed && (
              <div className="mt-2 text-[11px] text-white/50 leading-snug">
                Sign in to save highlights and create cards.
              </div>
            )}
          </div>
        )}

        {stage === "card" && (
          <div className="p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[10px] uppercase tracking-[0.22em] text-white/45 flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-cyan-300" /> New flashcard
              </div>
              <button
                onClick={() => setStage("pick")}
                className="p-1 rounded text-white/40 hover:text-white/80 hover:bg-white/5 transition"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
            <input
              autoFocus
              value={front}
              onChange={(e) => setFront(e.target.value)}
              placeholder="Front (question/prompt)…"
              className="w-full mb-2 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-2 text-xs placeholder:text-white/30 focus:outline-none focus:border-cyan-300/40 transition"
            />
            <textarea
              value={back}
              onChange={(e) => setBack(e.target.value)}
              rows={3}
              className="w-full mb-3 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-2 text-xs placeholder:text-white/30 focus:outline-none focus:border-cyan-300/40 transition resize-none"
            />
            <button
              onClick={handleCreateCard}
              className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-white text-black px-3 py-2 text-xs font-semibold hover:bg-white/90 transition"
            >
              <Check className="h-3.5 w-3.5" strokeWidth={3} /> Save card
            </button>
          </div>
        )}

        {stage === "saved" && (
          <div className="p-4 text-center">
            <div className="mx-auto h-8 w-8 rounded-full bg-emerald-400/20 flex items-center justify-center text-emerald-300 mb-2">
              <Check className="h-4 w-4" strokeWidth={3} />
            </div>
            <div className="text-sm font-semibold mb-1">Saved to your deck</div>
            <button
              onClick={onClear}
              className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-cyan-300 hover:text-cyan-200"
            >
              <Layers className="h-3 w-3" />
              Close
            </button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
