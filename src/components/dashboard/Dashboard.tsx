"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Target,
  Layers,
  AlertTriangle,
  ChevronRight,
  Loader2,
  Trophy,
  Flame,
  Stethoscope,
  BookOpen,
} from "lucide-react";
import { useDashboard } from "@/hooks/useDashboard";
import { useAuth } from "@/lib/auth/AuthProvider";

export default function Dashboard() {
  const { stats, weakCards, totals, loading, isAuthed } = useDashboard();
  const { openLogin } = useAuth();

  const ranked = useMemo(() => {
    return [...stats].sort((a, b) => a.mastery - b.mastery);
  }, [stats]);

  if (!isAuthed) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <div className="inline-flex h-14 w-14 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 items-center justify-center mb-5">
          <TrendingUp className="h-7 w-7" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          Sign in to see your dashboard
        </h1>
        <p className="text-white/65 mb-7 max-w-md mx-auto leading-relaxed">
          The dashboard turns your case attempts and flashcard reviews into a
          weakness heatmap so you know exactly what to study next.
        </p>
        <button
          onClick={openLogin}
          className="inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3 text-sm font-semibold hover:bg-white/90 transition"
        >
          Sign in
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-20 flex items-center justify-center gap-2 text-white/65">
        <Loader2 className="h-5 w-5 animate-spin text-cyan-300" /> Loading your
        stats…
      </div>
    );
  }

  const hasAnyData =
    totals.totalAttempts > 0 || totals.cardsReviewed > 0 || totals.notesDone > 0;

  if (!hasAnyData) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <div className="inline-flex h-14 w-14 rounded-full bg-amber-400/20 text-amber-300 items-center justify-center mb-5">
          <Trophy className="h-7 w-7" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          Run a few cases to populate this
        </h1>
        <p className="text-white/65 mb-7 max-w-md mx-auto leading-relaxed">
          Your dashboard will show per-specialty accuracy and your weakest
          flashcards as soon as you start answering cases and reviewing decks.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/cases"
            className="inline-flex items-center gap-2 rounded-full bg-white text-black px-5 py-2.5 text-sm font-semibold hover:bg-white/90 transition"
          >
            <Stethoscope className="h-4 w-4" />
            Try a case
          </Link>
          <Link
            href="/flashcards"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold hover:bg-white/[0.08] transition"
          >
            <Layers className="h-4 w-4" />
            Open flashcards
          </Link>
        </div>
      </div>
    );
  }

  const overallAcc =
    totals.totalAttempts > 0
      ? Math.round((totals.totalCorrect / totals.totalAttempts) * 100)
      : 0;

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 md:py-14">
      {/* Hero strip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <div className="text-xs uppercase tracking-[0.22em] text-cyan-300/80 mb-3">
          Your performance
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
          Study smarter, not longer.
        </h1>
        <p className="text-white/65 text-base md:text-lg max-w-2xl leading-relaxed">
          Specialty-by-specialty breakdown of where you&apos;re strong and
          where you&apos;re bleeding points.
        </p>
      </motion.div>

      {/* Top-line metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        <MetricCard
          icon={<Target className="h-4 w-4" />}
          accent="emerald"
          label="Case accuracy"
          value={`${overallAcc}%`}
          sub={`${totals.totalCorrect} / ${totals.totalAttempts}`}
        />
        <MetricCard
          icon={<Layers className="h-4 w-4" />}
          accent="cyan"
          label="Cards reviewed"
          value={`${totals.cardsReviewed}`}
          sub="all time"
        />
        <MetricCard
          icon={<BookOpen className="h-4 w-4" />}
          accent="violet"
          label="Notes completed"
          value={`${totals.notesDone}`}
          sub="all time"
        />
        <MetricCard
          icon={<Flame className="h-4 w-4" />}
          accent="amber"
          label="Weak cards"
          value={`${weakCards.length}`}
          sub="needing reps"
        />
      </div>

      {/* Weak-30 CTA */}
      {weakCards.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-strong rounded-3xl p-6 md:p-8 mb-10 border border-rose-400/20 bg-gradient-to-br from-rose-500/5 to-amber-500/5"
        >
          <div className="flex flex-wrap items-center gap-5 justify-between">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-rose-400/30 bg-rose-400/10 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-rose-200 mb-3">
                <AlertTriangle className="h-3 w-3" />
                Targeted review
              </div>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-2">
                Review your weakest {weakCards.length} cards
              </h2>
              <p className="text-sm text-white/65 leading-relaxed">
                Cards you&apos;ve graded &quot;Again&quot; or &quot;Hard&quot;
                most recently. These are the ones moving your score the most.
              </p>
            </div>
            <Link
              href="/dashboard/weak"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-rose-500 to-amber-500 px-6 py-3 text-sm font-bold hover:opacity-90 transition shadow-[0_0_40px_rgba(244,63,94,0.25)]"
            >
              <Flame className="h-4 w-4" />
              Drill them now
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      )}

      {/* Specialty breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-sm uppercase tracking-[0.22em] text-cyan-300/80">
            By specialty
          </h2>
          <span className="text-xs text-white/40">
            sorted by weakness
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {ranked.map((s, i) => (
            <motion.div
              key={s.category}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="glass rounded-2xl p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="font-semibold tracking-tight">{s.category}</div>
                <span
                  className={`text-xs font-bold tabular-nums ${
                    s.mastery > 0.7
                      ? "text-emerald-300"
                      : s.mastery > 0.4
                      ? "text-amber-300"
                      : "text-rose-300"
                  }`}
                >
                  {Math.round(s.mastery * 100)}%
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-white/5 overflow-hidden mb-3">
                <motion.div
                  className={`h-full ${
                    s.mastery > 0.7
                      ? "bg-gradient-to-r from-emerald-400 to-teal-400"
                      : s.mastery > 0.4
                      ? "bg-gradient-to-r from-amber-400 to-orange-400"
                      : "bg-gradient-to-r from-rose-400 to-red-500"
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${s.mastery * 100}%` }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.02 }}
                />
              </div>
              <div className="grid grid-cols-3 gap-2 text-[11px]">
                <SubStat
                  label="Cases"
                  value={`${s.casesCorrect}/${s.casesAttempted || s.casesTotal}`}
                  hint={s.casesAttempted > 0 ? "answered" : "untouched"}
                />
                <SubStat
                  label="Cards"
                  value={`${s.cardsReviewed}/${s.cardsTotal}`}
                  hint={`${s.cardsStruggling} weak`}
                />
                <SubStat
                  label="Notes"
                  value={`${s.notesCompleted}/${s.notesTotal}`}
                  hint="read"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

const ACCENT: Record<string, { text: string; bg: string }> = {
  emerald: { text: "text-emerald-300", bg: "bg-emerald-400/15" },
  cyan: { text: "text-cyan-300", bg: "bg-cyan-400/15" },
  violet: { text: "text-violet-300", bg: "bg-violet-400/15" },
  amber: { text: "text-amber-300", bg: "bg-amber-400/15" },
};

function MetricCard({
  icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  accent: string;
}) {
  const a = ACCENT[accent] ?? ACCENT.cyan;
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="glass rounded-2xl p-5"
    >
      <div className={`inline-flex items-center gap-1.5 ${a.text} mb-3`}>
        <span className={`p-1 rounded ${a.bg}`}>{icon}</span>
      </div>
      <div className="text-2xl font-bold tracking-tight">{value}</div>
      <div className="text-[10px] uppercase tracking-[0.18em] text-white/40 mt-1">
        {label}
      </div>
      <div className="text-[11px] text-white/55 mt-0.5">{sub}</div>
    </motion.div>
  );
}

function SubStat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-lg bg-white/[0.03] p-2 text-center">
      <div className="text-[9px] uppercase tracking-[0.18em] text-white/40 mb-0.5">
        {label}
      </div>
      <div className="text-xs font-bold text-white/90 tabular-nums">{value}</div>
      <div className="text-[10px] text-white/50 mt-0.5">{hint}</div>
    </div>
  );
}
