"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronRight, BookOpen, Sparkles } from "lucide-react";
import { CASES, type Session, type CaseDifficulty } from "@/data/cases";

const DIFF_META: Record<CaseDifficulty, { label: string; dot: string }> = {
  easy: { label: "Easy", dot: "bg-emerald-400" },
  medium: { label: "Medium", dot: "bg-amber-400" },
  hard: { label: "Hard", dot: "bg-rose-400" },
};

const SESSION_META: Record<Session, { name: string; color: string }> = {
  1: { name: "Session 1 · Acute / ENT / Neuro / Psych", color: "from-violet-500 to-purple-700" },
  2: { name: "Session 2 · Thorax (Cardio / Pulm)", color: "from-rose-500 to-red-700" },
  3: { name: "Session 3 · Abdomen (GI)", color: "from-amber-500 to-orange-700" },
};

export default function CasesLibrary() {
  const [sessionFilter, setSessionFilter] = useState<Session | "All">("All");
  const [topicFilter, setTopicFilter] = useState<string | "All">("All");
  const [query, setQuery] = useState("");
  const [diff, setDiff] = useState<CaseDifficulty | "All">("All");

  const topics = useMemo(() => {
    const set = new Set<string>();
    CASES.forEach((c) => {
      if (sessionFilter === "All" || c.session === sessionFilter) set.add(c.topic);
    });
    return Array.from(set).sort();
  }, [sessionFilter]);

  const visible = useMemo(() => {
    return CASES.filter((c) => {
      if (sessionFilter !== "All" && c.session !== sessionFilter) return false;
      if (topicFilter !== "All" && c.topic !== topicFilter) return false;
      if (diff !== "All" && c.difficulty !== diff) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        if (!`${c.stem} ${c.diagnosis} ${c.topic}`.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [sessionFilter, topicFilter, query, diff]);

  return (
    <section id="cases" className="relative pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-8">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-amber-300/80 mb-2 flex items-center gap-2">
              <BookOpen className="h-3 w-3" /> Board Review Cases
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{CASES.length} clinical vignettes.</h2>
            <p className="mt-2 text-white/55 max-w-xl">
              Multiple-choice cases from the 8-hour board review course. Pick an answer, get rationale, review high-yield pearls.
            </p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search cases…"
              className="w-full rounded-full glass pl-11 pr-4 py-3 text-sm placeholder:text-white/35 focus:outline-none focus:border-white/25"
            />
          </div>
        </div>

        {/* Sequential play card */}
        <Link
          href="/cases/play"
          className="group flex items-center gap-4 glass rounded-2xl px-5 py-4 mb-8 hover:border-white/25 transition"
        >
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold">Quiz mode — random cases</div>
            <div className="text-xs text-white/55">Play through cases sequentially in shuffled order.</div>
          </div>
          <ChevronRight className="h-4 w-4 text-white/55 group-hover:translate-x-1 transition" />
        </Link>

        {/* Session chips */}
        <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-thin -mx-1 px-1 mb-3">
          <Chip active={sessionFilter === "All"} onClick={() => { setSessionFilter("All"); setTopicFilter("All"); }} label="All sessions" />
          {([1, 2, 3] as const).map((s) => (
            <Chip
              key={s}
              active={sessionFilter === s}
              onClick={() => { setSessionFilter(s); setTopicFilter("All"); }}
              label={`Session ${s}`}
              gradient={SESSION_META[s].color}
            />
          ))}
        </div>

        {/* Topic chips */}
        {topics.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-thin -mx-1 px-1 mb-3">
            <Chip active={topicFilter === "All"} onClick={() => setTopicFilter("All")} label="All topics" />
            {topics.map((t) => (
              <Chip key={t} active={topicFilter === t} onClick={() => setTopicFilter(t)} label={t} />
            ))}
          </div>
        )}

        {/* Difficulty toggle */}
        <div className="flex gap-2 mb-6 text-xs">
          {(["All", "easy", "medium", "hard"] as const).map((d) => (
            <button
              key={d}
              onClick={() => setDiff(d)}
              className={`rounded-full px-3 py-1.5 border transition ${
                diff === d
                  ? "border-white/30 bg-white/10 text-white"
                  : "border-white/8 bg-white/[0.02] text-white/55 hover:bg-white/[0.05]"
              }`}
            >
              {d === "All" ? "All difficulty" : d.charAt(0).toUpperCase() + d.slice(1)}
            </button>
          ))}
        </div>

        <div className="text-xs text-white/40 mb-4">
          Showing {visible.length} of {CASES.length}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {visible.map((c, idx) => (
              <motion.div
                key={c.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: Math.min(idx * 0.02, 0.4), duration: 0.35 }}
              >
                <Link
                  href={`/cases/${c.id}`}
                  className="group relative block h-full overflow-hidden rounded-2xl glass p-5 transition hover:border-white/20 hover:-translate-y-0.5"
                >
                  <div
                    className={`pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br ${SESSION_META[c.session].color} opacity-25 blur-2xl transition group-hover:opacity-60`}
                  />
                  <div className="relative h-full flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-white/55 flex items-center gap-1.5">
                        <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-br ${SESSION_META[c.session].color}`} />
                        S{c.session} · {c.topic}
                      </span>
                      <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-white/55">
                        <span className={`h-1.5 w-1.5 rounded-full ${DIFF_META[c.difficulty].dot}`} />
                        {DIFF_META[c.difficulty].label}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold leading-snug tracking-tight">{c.diagnosis}</h3>
                    <p className="mt-2 text-sm text-white/55 leading-relaxed line-clamp-3 flex-1">
                      {c.stem}
                    </p>
                    <div className="mt-4 flex items-center justify-end pt-3 border-t border-white/[0.06]">
                      <span className="flex items-center gap-1 text-xs font-semibold text-white/80 transition group-hover:text-amber-300">
                        Play
                        <ChevronRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {visible.length === 0 && (
          <div className="mt-12 text-center text-white/55">No cases match your filter.</div>
        )}
      </div>
    </section>
  );
}

function Chip({
  active,
  onClick,
  label,
  gradient,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  gradient?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative shrink-0 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium tracking-wide transition ${
        active
          ? "border-white/30 bg-white text-black"
          : "border-white/10 bg-white/[0.04] text-white/75 hover:bg-white/[0.08] hover:border-white/20"
      }`}
    >
      {gradient && !active && <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-br ${gradient}`} />}
      <span>{label}</span>
    </button>
  );
}
