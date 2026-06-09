"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronRight, Layers, ListTree, Sparkles } from "lucide-react";
import { ALGORITHMS, CATEGORIES, CATEGORY_META, type Category, type Difficulty } from "@/data/algorithms";

const DIFFICULTY_META: Record<Difficulty, { label: string; dot: string }> = {
  easy: { label: "Easy", dot: "bg-emerald-400" },
  medium: { label: "Medium", dot: "bg-amber-400" },
  hard: { label: "Hard", dot: "bg-rose-400" },
};

export default function AlgorithmLibrary() {
  const [active, setActive] = useState<Category | "All">("All");
  const [query, setQuery] = useState("");
  const [diffFilter, setDiffFilter] = useState<Difficulty | "All">("All");

  const visible = useMemo(() => {
    return ALGORITHMS.filter((a) => {
      if (active !== "All" && a.category !== active) return false;
      if (diffFilter !== "All" && a.difficulty !== diffFilter) return false;
      if (query.trim() && !`${a.title} ${a.blurb} ${a.category}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [active, query, diffFilter]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: ALGORITHMS.length };
    for (const a of ALGORITHMS) c[a.category] = (c[a.category] ?? 0) + 1;
    return c;
  }, []);

  const visibleCategories = CATEGORIES.filter((cat) => counts[cat]);

  return (
    <section id="library" className="relative pb-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-8">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-cyan-300/80 mb-2 flex items-center gap-2">
              <Layers className="h-3 w-3" /> Algorithm Library
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Pick your battle.
            </h2>
            <p className="mt-2 text-white/55 max-w-xl">
              {ALGORITHMS.length} interactive clinical decision trees, organized by specialty. Tap one to read the full flowchart with pearls.
            </p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search algorithms…"
              className="w-full rounded-full glass pl-11 pr-4 py-3 text-sm placeholder:text-white/35 focus:outline-none focus:border-white/25"
            />
          </div>
        </div>

        {/* Category chips */}
        <div id="categories" className="flex gap-2 overflow-x-auto pb-3 scrollbar-thin -mx-1 px-1 mb-3">
          <Chip
            active={active === "All"}
            onClick={() => setActive("All")}
            label="All"
            count={counts.All}
          />
          {visibleCategories.map((cat) => (
            <Chip
              key={cat}
              active={active === cat}
              onClick={() => setActive(cat)}
              label={cat}
              count={counts[cat]}
              gradient={CATEGORY_META[cat].color}
            />
          ))}
        </div>

        {/* Difficulty toggle */}
        <div className="flex gap-2 mb-8 text-xs">
          {(["All", "easy", "medium", "hard"] as const).map((d) => (
            <button
              key={d}
              onClick={() => setDiffFilter(d)}
              className={`rounded-full px-3 py-1.5 border transition ${
                diffFilter === d
                  ? "border-white/30 bg-white/10 text-white"
                  : "border-white/8 bg-white/[0.02] text-white/55 hover:bg-white/[0.05]"
              }`}
            >
              {d === "All" ? "All difficulty" : d.charAt(0).toUpperCase() + d.slice(1)}
            </button>
          ))}
        </div>

        <div className="text-xs text-white/40 mb-4">
          Showing {visible.length} of {ALGORITHMS.length}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((algo, idx) => {
              const meta = CATEGORY_META[algo.category];
              const decisionCount = Object.values(algo.nodes).filter((n) => n.kind === "decision").length;
              return (
                <motion.div
                  key={algo.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: Math.min(idx * 0.02, 0.4), duration: 0.4 }}
                >
                  <Link
                    href={`/play/${algo.id}`}
                    className="group relative block h-full overflow-hidden rounded-2xl glass p-5 transition hover:border-white/20 hover:-translate-y-0.5"
                  >
                    {/* Gradient corner */}
                    <div
                      className={`pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br ${meta.color} opacity-25 blur-2xl transition group-hover:opacity-60`}
                    />
                    <div className="relative h-full flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/55 flex items-center gap-1.5">
                          <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-br ${meta.color}`} />
                          {algo.category}
                        </span>
                        <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-white/55">
                          <span className={`h-1.5 w-1.5 rounded-full ${DIFFICULTY_META[algo.difficulty].dot}`} />
                          {DIFFICULTY_META[algo.difficulty].label}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold leading-snug tracking-tight">
                        {algo.title}
                      </h3>
                      <p className="mt-2 text-sm text-white/55 leading-relaxed line-clamp-2 flex-1">
                        {algo.blurb}
                      </p>
                      <div className="mt-5 flex items-center justify-between pt-3 border-t border-white/[0.06]">
                        <span className="flex items-center gap-1.5 text-xs text-white/40">
                          <ListTree className="h-3.5 w-3.5" />
                          {decisionCount} decision{decisionCount !== 1 ? "s" : ""}
                        </span>
                        <span className="flex items-center gap-1 text-xs font-semibold text-white/80 transition group-hover:text-cyan-300">
                          Open
                          <ChevronRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {visible.length === 0 && (
          <div className="mt-12 text-center text-white/55 flex flex-col items-center gap-2">
            <Sparkles className="h-5 w-5 text-white/30" />
            <span>No algorithms match your filter.</span>
          </div>
        )}
      </div>
    </section>
  );
}

function Chip({
  active,
  onClick,
  label,
  count,
  gradient,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count?: number;
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
      {gradient && !active && (
        <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-br ${gradient}`} />
      )}
      <span>{label}</span>
      {count !== undefined && (
        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${active ? "bg-black/10 text-black/70" : "bg-white/10 text-white/55"}`}>
          {count}
        </span>
      )}
    </button>
  );
}
