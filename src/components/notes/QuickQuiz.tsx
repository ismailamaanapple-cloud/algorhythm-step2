"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  Sparkles,
  RotateCcw,
  ChevronRight,
  Trophy,
} from "lucide-react";
import type { Note } from "@/data/notes";
import { PREBUILT_FLASHCARDS } from "@/data/flashcards";

type QuizQuestion = {
  question: string;
  correct: string;
  options: string[]; // 4 options, shuffled, correct included
};

// Deterministic shuffle seeded by note.id so the quiz is stable across reloads.
function seededShuffle<T>(arr: T[], seedStr: string): T[] {
  let seed = 0;
  for (let i = 0; i < seedStr.length; i++) seed = (seed * 31 + seedStr.charCodeAt(i)) >>> 0;
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const j = seed % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Truncate long backs so the options fit visually.
function trim(s: string, max = 140): string {
  const clean = s.split("\n")[0].trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, max - 1).trim() + "…";
}

function buildQuiz(note: Note): QuizQuestion[] {
  // Use all cards from this note, but skip case-cards (their backs are huge
  // and won't fit as a multiple-choice option).
  const noteCards = PREBUILT_FLASHCARDS.filter(
    (c) => c.noteId === note.id && c.kind !== "case",
  );
  if (noteCards.length < 4) return [];

  const shuffled = seededShuffle(noteCards, note.id);
  const picks = shuffled.slice(0, Math.min(5, shuffled.length));

  return picks
    .map((card, i): QuizQuestion | null => {
      const correctRaw = trim(card.back);
      // Pull 3 distractors from OTHER cards in the same note.
      const pool = noteCards.filter((c) => c.source_id !== card.source_id);
      const distractors = seededShuffle(pool, note.id + ":" + i)
        .slice(0, 3)
        .map((c) => trim(c.back));

      // De-dupe distractors so the same wrong answer doesn't appear twice.
      const seen = new Set([correctRaw]);
      const unique: string[] = [];
      for (const d of distractors) {
        if (!seen.has(d)) {
          seen.add(d);
          unique.push(d);
        }
      }
      if (unique.length < 3) return null; // not enough distinct options

      return {
        question: card.front,
        correct: correctRaw,
        options: seededShuffle(
          [correctRaw, ...unique.slice(0, 3)],
          note.id + ":opt:" + i,
        ),
      };
    })
    .filter((q): q is QuizQuestion => q !== null);
}

export default function QuickQuiz({ note }: { note: Note }) {
  const quiz = useMemo(() => buildQuiz(note), [note]);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);

  if (quiz.length === 0) return null;
  const q = quiz[i];

  function pick(opt: string) {
    if (picked) return;
    setPicked(opt);
    if (opt === q.correct) setScore((s) => s + 1);
  }

  function next() {
    if (i + 1 >= quiz.length) {
      setDone(true);
    } else {
      setI(i + 1);
      setPicked(null);
    }
  }

  function reset() {
    setI(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  }

  if (!started) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        className="glass-strong rounded-2xl p-6 border border-fuchsia-400/20 bg-gradient-to-br from-fuchsia-500/5 to-violet-500/5"
      >
        <div className="flex flex-wrap items-center gap-4 justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-fuchsia-300/30 bg-fuchsia-400/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-fuchsia-200 mb-2">
              <Sparkles className="h-3 w-3" />
              Quick check
            </div>
            <h3 className="text-lg font-bold tracking-tight mb-1">
              {quiz.length}-question quiz on this note
            </h3>
            <p className="text-sm text-white/65">
              Test yourself before moving on. ~1 min.
            </p>
          </div>
          <button
            onClick={() => setStarted(true)}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-500 px-5 py-2.5 text-sm font-bold hover:opacity-90 transition shadow-[0_0_30px_rgba(217,70,239,0.25)]"
          >
            Start quiz
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    );
  }

  if (done) {
    const passed = score >= Math.ceil(quiz.length * 0.6);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-strong rounded-2xl p-7 text-center border border-fuchsia-400/20"
      >
        <div
          className={`mx-auto h-12 w-12 rounded-full flex items-center justify-center mb-3 ${
            passed
              ? "bg-gradient-to-br from-emerald-400 to-teal-500"
              : "bg-gradient-to-br from-amber-400 to-rose-500"
          }`}
        >
          <Trophy className="h-6 w-6" />
        </div>
        <div className="text-[10px] uppercase tracking-[0.22em] text-fuchsia-200 mb-1">
          Quick check
        </div>
        <h3 className="text-2xl font-bold tracking-tight mb-2">
          {score} / {quiz.length} correct
        </h3>
        <p className="text-sm text-white/65 mb-5">
          {passed
            ? "Solid. Move on to the next topic — or replay to lock it in."
            : "Re-read the section then try again — repetition is the trick."}
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold hover:bg-white/[0.08] transition"
          >
            <RotateCcw className="h-4 w-4" />
            Retake
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="glass-strong rounded-2xl p-6 border border-fuchsia-400/20 bg-gradient-to-br from-fuchsia-500/5 to-violet-500/5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="text-[10px] uppercase tracking-[0.22em] text-fuchsia-200 inline-flex items-center gap-1.5">
          <Sparkles className="h-3 w-3" />
          Quick check · {i + 1} of {quiz.length}
        </div>
        <div className="text-xs text-white/55 tabular-nums">
          Score: <span className="text-emerald-300 font-semibold">{score}</span>
        </div>
      </div>

      {/* Progress */}
      <div className="h-1 rounded-full bg-white/5 overflow-hidden mb-5">
        <motion.div
          className="h-full bg-gradient-to-r from-fuchsia-400 to-violet-400"
          animate={{ width: `${((i + (picked ? 1 : 0)) / quiz.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
        >
          <div className="text-base md:text-lg font-medium text-white/95 mb-5 leading-relaxed">
            {q.question}
          </div>

          <div className="grid gap-2 mb-4">
            {q.options.map((opt, idx) => {
              const isCorrect = opt === q.correct;
              const isPicked = opt === picked;
              const showState = picked !== null;
              const stateClass = !showState
                ? "border-white/10 bg-white/[0.04] hover:bg-white/[0.06] hover:border-white/20"
                : isCorrect
                ? "border-emerald-400/50 bg-emerald-400/10"
                : isPicked
                ? "border-rose-400/50 bg-rose-400/10"
                : "border-white/5 bg-white/[0.02] opacity-50";
              return (
                <button
                  key={idx}
                  type="button"
                  disabled={showState}
                  onClick={() => pick(opt)}
                  className={`flex items-start gap-3 text-left rounded-xl border px-4 py-3 transition ${stateClass}`}
                >
                  <span
                    className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px] font-mono font-bold ${
                      showState && isCorrect
                        ? "border-emerald-300/60 bg-emerald-400/20 text-emerald-200"
                        : showState && isPicked
                        ? "border-rose-300/60 bg-rose-400/20 text-rose-200"
                        : "border-white/15 text-white/55"
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1 text-sm text-white/85 leading-snug">
                    {opt}
                  </span>
                  {showState && isCorrect && (
                    <CheckCircle2 className="h-4 w-4 text-emerald-300 shrink-0 mt-0.5" />
                  )}
                  {showState && isPicked && !isCorrect && (
                    <XCircle className="h-4 w-4 text-rose-300 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {picked && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between gap-3 pt-3 border-t border-white/5"
            >
              <div className="text-xs text-white/65">
                {picked === q.correct ? (
                  <span className="text-emerald-300 font-semibold">
                    ✓ Correct
                  </span>
                ) : (
                  <span className="text-rose-300 font-semibold">
                    ✗ Correct answer highlighted above
                  </span>
                )}
              </div>
              <button
                onClick={next}
                className="inline-flex items-center gap-1.5 rounded-full bg-white text-black px-4 py-2 text-xs font-bold hover:bg-white/90 transition"
              >
                {i + 1 >= quiz.length ? "See score" : "Next"}
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
