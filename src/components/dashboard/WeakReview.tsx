"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Loader2,
  Flame,
  CheckCircle2,
  Eye,
  RotateCcw,
  TrendingUp,
} from "lucide-react";
import { useDashboard, type WeakCard } from "@/hooks/useDashboard";
import { useAuth } from "@/lib/auth/AuthProvider";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { reviewCard, newCardState, type Grade } from "@/lib/srs";

const GRADES: { grade: Grade; label: string; sub: string; color: string }[] = [
  { grade: "again", label: "Again", sub: "< 1d",   color: "from-rose-500 to-red-600" },
  { grade: "hard",  label: "Hard",  sub: "shorter",color: "from-amber-500 to-orange-600" },
  { grade: "good",  label: "Good",  sub: "on time",color: "from-emerald-500 to-teal-600" },
  { grade: "easy",  label: "Easy",  sub: "longer", color: "from-violet-500 to-cyan-500" },
];

export default function WeakReview() {
  const { user } = useAuth();
  const { weakCards, loading, isAuthed } = useDashboard();

  const [queue, setQueue] = useState<WeakCard[]>([]);
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [done, setDone] = useState(false);

  // Seed the queue once weak cards arrive.
  useEffect(() => {
    if (!loading && weakCards.length > 0 && queue.length === 0 && !done) {
      setQueue(weakCards);
    }
  }, [loading, weakCards, queue.length, done]);

  const card = queue[i];

  const grade = useCallback(
    async (g: Grade) => {
      if (!card || !user) return;
      const supabase = getSupabaseBrowserClient();
      if (!supabase) return;

      // Look up our db row id via source_id.
      const { data: row } = await supabase
        .from("flashcards")
        .select("id")
        .eq("user_id", user.id)
        .eq("source_id", card.source_id)
        .maybeSingle();
      const dbId = (row as { id: string } | null)?.id;
      if (!dbId) return;

      // Pull existing review state to derive next.
      const { data: prevRow } = await supabase
        .from("flashcard_reviews")
        .select("ease_factor, interval_days, repetitions, due_date, last_quality")
        .eq("user_id", user.id)
        .eq("card_id", dbId)
        .maybeSingle();
      const prev = prevRow
        ? {
            ease_factor: (prevRow as { ease_factor: number }).ease_factor,
            interval_days: (prevRow as { interval_days: number }).interval_days,
            repetitions: (prevRow as { repetitions: number }).repetitions,
            due_date: (prevRow as { due_date: string }).due_date,
          }
        : newCardState();
      const next = reviewCard(prev, g);

      await supabase.from("flashcard_reviews").upsert(
        {
          user_id: user.id,
          card_id: dbId,
          ease_factor: next.ease_factor,
          interval_days: next.interval_days,
          repetitions: next.repetitions,
          due_date: next.due_date,
          last_quality: next.last_quality,
          last_reviewed_at: new Date().toISOString(),
        },
        { onConflict: "user_id,card_id" },
      );

      setFlipped(false);
      if (i + 1 >= queue.length) setDone(true);
      else setI(i + 1);
    },
    [card, user, i, queue.length],
  );

  if (!isAuthed) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20 text-center text-white/65">
        Sign in to see your weak cards.
      </div>
    );
  }
  if (loading) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20 flex items-center justify-center gap-2 text-white/65">
        <Loader2 className="h-5 w-5 animate-spin text-cyan-300" /> Loading…
      </div>
    );
  }
  if (queue.length === 0 && !done) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <div className="inline-flex h-12 w-12 rounded-full bg-emerald-400/20 text-emerald-300 items-center justify-center mb-4">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h1 className="text-xl font-bold tracking-tight mb-2">
          No weak cards — clean slate.
        </h1>
        <p className="text-sm text-white/65 mb-6">
          Cards you grade as &quot;Again&quot; or &quot;Hard&quot; will show
          up here. Keep reviewing and check back.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-full bg-white text-black px-5 py-2.5 text-sm font-semibold hover:bg-white/90 transition"
        >
          <TrendingUp className="h-4 w-4" />
          Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10 md:py-14">
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Dashboard
        </Link>
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-[0.22em] text-rose-300/80 inline-flex items-center gap-1.5">
            <Flame className="h-3 w-3" />
            Weak-card drill
          </div>
          <div className="text-sm font-semibold tracking-tight">
            {done ? "Complete" : `${i + 1} of ${queue.length}`}
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="h-1 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-rose-400 to-amber-400"
            initial={{ width: 0 }}
            animate={{
              width: `${
                queue.length ? ((i + (done ? 1 : 0)) / queue.length) * 100 : 0
              }%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {done && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong rounded-3xl p-10 text-center"
        >
          <div className="mx-auto h-14 w-14 rounded-full bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center mb-4">
            <Flame className="h-7 w-7" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight mb-2">
            Nice — that&apos;s your weak set drilled.
          </h2>
          <p className="text-sm text-white/65 mb-6">
            You graded {queue.length} weak cards. Come back tomorrow to attack
            the next batch.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => {
                setI(0);
                setFlipped(false);
                setDone(false);
              }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold hover:bg-white/[0.08] transition"
            >
              <RotateCcw className="h-4 w-4" />
              Drill again
            </button>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-full bg-white text-black px-5 py-2.5 text-sm font-semibold hover:bg-white/90 transition"
            >
              <TrendingUp className="h-4 w-4" />
              See dashboard
            </Link>
          </div>
        </motion.div>
      )}

      {!done && card && (
        <>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${i}-${flipped ? "b" : "f"}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22 }}
              onClick={() => !flipped && setFlipped(true)}
              className={`glass-strong rounded-3xl p-8 md:p-12 min-h-[300px] flex flex-col ${
                !flipped ? "cursor-pointer hover:bg-white/[0.04]" : ""
              }`}
            >
              <div className="text-[10px] uppercase tracking-[0.22em] text-white/45 mb-4 flex items-center gap-2">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    flipped ? "bg-emerald-300" : "bg-rose-300"
                  }`}
                />
                {flipped ? "Answer" : card.kind === "case" ? "Vignette" : "Question"}
                <span className="text-white/30">·</span>
                <span className="text-white/55">{card.category}</span>
              </div>
              <div className="flex-1 flex items-center">
                <div
                  className={`leading-relaxed font-medium whitespace-pre-line ${
                    card.kind === "case"
                      ? "text-base md:text-lg text-white/90"
                      : "text-xl md:text-2xl"
                  }`}
                >
                  {flipped ? card.back : card.front}
                </div>
              </div>
              {!flipped && (
                <button
                  onClick={() => setFlipped(true)}
                  className="mt-6 inline-flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-semibold hover:bg-white/[0.08] transition"
                >
                  <Eye className="h-3.5 w-3.5" />
                  Show answer
                </button>
              )}
            </motion.div>
          </AnimatePresence>

          {flipped && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-2"
            >
              {GRADES.map((g) => (
                <button
                  key={g.grade}
                  onClick={() => grade(g.grade)}
                  className={`rounded-2xl p-4 text-left bg-gradient-to-br ${g.color} hover:opacity-90 transition`}
                >
                  <div className="text-sm font-bold tracking-tight">{g.label}</div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-white/80 mt-0.5">
                    {g.sub}
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}
