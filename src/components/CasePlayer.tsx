"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, XCircle, RotateCcw, ChevronRight, Trophy } from "lucide-react";
import type { Case, CaseOption } from "@/data/cases";
import { useAuth } from "@/lib/auth/AuthProvider";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

type Phase = "play" | "feedback" | "review";

export default function CasePlayer({
  cases,
  initialIndex = 0,
  mode = "single",
}: {
  cases: Case[];
  initialIndex?: number;
  mode?: "single" | "deck";
}) {
  const { user } = useAuth();
  const [index, setIndex] = useState(initialIndex);
  const [phase, setPhase] = useState<Phase>("play");
  const [picked, setPicked] = useState<CaseOption | null>(null);
  const [shuffledOptions, setShuffledOptions] = useState<CaseOption[]>([]);
  const [stats, setStats] = useState({ correct: 0, wrong: 0 });

  const current = cases[index];
  const lastIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!current) return;
    if (lastIdRef.current === current.id) return;
    lastIdRef.current = current.id;
    setShuffledOptions(shuffle(current.options));
    setPhase("play");
    setPicked(null);
  }, [current?.id]);

  if (!current) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center text-white/60">
        No cases available.
      </div>
    );
  }

  function pick(opt: CaseOption) {
    if (phase !== "play") return;
    setPicked(opt);
    setStats((s) => (opt.isCorrect ? { ...s, correct: s.correct + 1 } : { ...s, wrong: s.wrong + 1 }));
    setPhase("feedback");
    // Persist case result so the Performance Dashboard can aggregate it.
    if (user) {
      const supabase = getSupabaseBrowserClient();
      void supabase?.from("case_progress").upsert(
        {
          user_id: user.id,
          case_id: current.id,
          correct: opt.isCorrect,
        },
        { onConflict: "user_id,case_id" },
      );
    }
  }

  function next() {
    if (mode === "deck" && index < cases.length - 1) {
      setIndex(index + 1);
    } else if (mode === "deck") {
      setPhase("review");
    } else {
      // single mode — show key points
      setPhase("review");
    }
  }

  function reset() {
    setPhase("play");
    setPicked(null);
    setShuffledOptions(shuffle(current.options));
  }

  return (
    <div className="min-h-[100dvh] flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-30 backdrop-blur-md bg-black/50 border-b border-white/5">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center gap-4">
          <Link href={mode === "deck" ? "/cases" : `/cases`} className="inline-flex items-center gap-1.5 text-sm text-white/65 hover:text-white transition shrink-0">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Cases</span>
          </Link>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-white/45">
              <span>Session {current.session}</span>
              <span className="text-white/25">·</span>
              <span>{current.topic}</span>
              <span className="text-white/25">·</span>
              <span className="capitalize">{current.difficulty}</span>
            </div>
            <div className="truncate text-sm font-semibold tracking-tight">
              {mode === "deck" ? `Case ${index + 1} of ${cases.length}` : current.diagnosis}
            </div>
          </div>
          {mode === "deck" && (
            <div className="text-xs font-mono tabular-nums">
              <span className="text-emerald-300">{stats.correct}</span>
              <span className="text-white/30 mx-1">·</span>
              <span className="text-rose-300">{stats.wrong}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 mx-auto max-w-3xl w-full px-6 py-10">
        <>
          {phase === "play" && (
            <motion.div
              key={`play-${current.id}`}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              <div className="glass-strong rounded-3xl p-6 md:p-8">
                <div className="text-[10px] uppercase tracking-[0.22em] text-amber-300/80 mb-3">
                  Clinical vignette
                </div>
                <p className="text-base md:text-lg text-white/90 leading-relaxed">{current.stem}</p>
              </div>

              <div>
                <h2 className="text-lg md:text-xl font-semibold tracking-tight mb-4">{current.question}</h2>
                <div className="grid gap-3">
                  {shuffledOptions.map((opt, idx) => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => pick(opt)}
                      className="group text-left glass rounded-2xl px-5 py-4 flex items-center gap-4 transition hover:bg-white/[0.05] hover:border-white/25 active:scale-[0.985]"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-xs font-mono text-white/65 group-hover:border-amber-300/40 group-hover:text-amber-300 transition">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1 text-sm md:text-base text-white/90 leading-snug">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {phase === "feedback" && picked && (
            <motion.div
              key="feedback"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div
                className={`glass-strong rounded-3xl p-7 border-2 ${
                  picked.isCorrect ? "border-emerald-400/40" : "border-rose-400/40"
                }`}
              >
                <div className="flex items-start gap-4">
                  {picked.isCorrect ? (
                    <CheckCircle2 className="h-7 w-7 text-emerald-300 mt-0.5 shrink-0" />
                  ) : (
                    <XCircle className="h-7 w-7 text-rose-300 mt-0.5 shrink-0" />
                  )}
                  <div className="flex-1">
                    <div className="text-xs uppercase tracking-[0.22em] text-white/45 mb-1.5">
                      {picked.isCorrect ? "Correct" : "Not quite"}
                    </div>
                    <div className="text-lg font-semibold mb-2">{picked.label}</div>
                    <p className="text-sm text-white/75 leading-relaxed">{picked.rationale}</p>
                  </div>
                </div>
              </div>

              {/* Show correct answer if wrong */}
              {!picked.isCorrect && (
                <div className="glass rounded-2xl p-5 border border-emerald-400/30">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-emerald-300 mb-2">Correct answer</div>
                  <div className="text-sm font-semibold mb-1.5">
                    {current.options.find((o) => o.isCorrect)?.label}
                  </div>
                  <p className="text-xs text-white/65 leading-relaxed">
                    {current.options.find((o) => o.isCorrect)?.rationale}
                  </p>
                </div>
              )}

              {/* Key points */}
              <div className="glass-strong rounded-3xl p-6">
                <div className="text-[10px] uppercase tracking-[0.22em] text-amber-300/80 mb-3 flex items-center gap-2">
                  <Trophy className="h-3.5 w-3.5" />
                  {current.diagnosis} — High-yield pearls
                </div>
                <ul className="space-y-2">
                  {current.keyPoints.map((p) => (
                    <li key={p} className="text-sm text-white/80 flex gap-2 leading-relaxed">
                      <span className="text-amber-300 mt-0.5">◆</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Other distractors rationale */}
              <details className="glass rounded-2xl p-4 group">
                <summary className="cursor-pointer text-sm font-semibold text-white/80 list-none flex items-center justify-between">
                  <span>Why the other options are wrong</span>
                  <ChevronRight className="h-4 w-4 group-open:rotate-90 transition" />
                </summary>
                <div className="mt-3 space-y-2">
                  {current.options
                    .filter((o) => !o.isCorrect && o.label !== picked.label)
                    .map((o) => (
                      <div key={o.label} className="text-xs text-white/65">
                        <span className="text-rose-300/80 font-medium">{o.label}:</span> {o.rationale}
                      </div>
                    ))}
                </div>
              </details>

              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white/80 hover:bg-white/[0.08] transition"
                >
                  <RotateCcw className="h-4 w-4" /> Try again
                </button>
                <button
                  onClick={next}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black"
                >
                  {mode === "deck" && index < cases.length - 1 ? "Next case" : "Done"}
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {phase === "review" && mode === "deck" && (
            <motion.div
              key="review"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6 pt-10"
            >
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-orange-500 mb-2">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-amber-300 mb-2">Deck complete</div>
                <h1 className="text-3xl font-bold tracking-tight mb-3">
                  {stats.correct} / {cases.length} correct
                </h1>
                <p className="text-white/65">
                  {stats.correct === cases.length ? "Perfect!" : "Great work — review and run it again."}
                </p>
              </div>
              <div className="flex gap-3 justify-center">
                <Link href="/cases" className="rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white/85 hover:bg-white/[0.08] transition">
                  Back to library
                </Link>
                <button
                  onClick={() => { setIndex(0); setStats({ correct: 0, wrong: 0 }); reset(); }}
                  className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black"
                >
                  Play again
                </button>
              </div>
            </motion.div>
          )}

          {phase === "review" && mode === "single" && (
            <motion.div
              key="review-single"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6 pt-4 text-center"
            >
              <div className="text-xs uppercase tracking-[0.22em] text-amber-300">Case complete</div>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => { setIndex(0); reset(); }}
                  className="rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white/85 hover:bg-white/[0.08] transition"
                >
                  <RotateCcw className="h-4 w-4 inline mr-1" /> Play again
                </button>
                <Link href="/cases" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black">
                  More cases
                </Link>
              </div>
            </motion.div>
          )}
        </>
      </div>
    </div>
  );
}
