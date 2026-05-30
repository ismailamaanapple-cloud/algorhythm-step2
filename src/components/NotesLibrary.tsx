"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronRight, BookMarked, FileText } from "lucide-react";
import { NOTES, type NoteSession } from "@/data/notes";

const SESSION_META: Record<NoteSession, { name: string; color: string }> = {
  1: { name: "Session 1 · Acute / ENT / Neuro / Psych", color: "from-violet-500 to-purple-700" },
  2: { name: "Session 2 · Thorax (Cardio / Pulm)", color: "from-rose-500 to-red-700" },
  3: { name: "Session 3 · Abdomen (GI)", color: "from-amber-500 to-orange-700" },
};

export default function NotesLibrary() {
  const [sessionFilter, setSessionFilter] = useState<NoteSession | "All">("All");
  const [categoryFilter, setCategoryFilter] = useState<string | "All">("All");
  const [query, setQuery] = useState("");

  const categories = useMemo(() => {
    const set = new Set<string>();
    NOTES.forEach((n) => {
      if (sessionFilter === "All" || n.session === sessionFilter) set.add(n.category);
    });
    return Array.from(set).sort();
  }, [sessionFilter]);

  const visible = useMemo(() => {
    return NOTES.filter((n) => {
      if (sessionFilter !== "All" && n.session !== sessionFilter) return false;
      if (categoryFilter !== "All" && n.category !== categoryFilter) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        const haystack = [
          n.title,
          n.summary,
          n.category,
          ...(n.sections ?? []).flatMap((s) => [s.heading, ...s.bullets]),
          ...(n.pearls ?? []),
        ].join(" ").toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [sessionFilter, categoryFilter, query]);

  return (
    <section id="notes" className="relative pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-8">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-cyan-300/80 mb-2 flex items-center gap-2">
              <BookMarked className="h-3 w-3" /> Study Notes
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              {NOTES.length} topic deep-dives.
            </h2>
            <p className="mt-2 text-white/55 max-w-xl">
              Comprehensive study notes from all three review sessions — pathophysiology, presentation, diagnosis, and management for every topic.
            </p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search notes…"
              className="w-full rounded-full glass pl-11 pr-4 py-3 text-sm placeholder:text-white/35 focus:outline-none focus:border-white/25"
            />
          </div>
        </div>

        {/* Session chips */}
        <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-thin -mx-1 px-1 mb-3">
          <Chip active={sessionFilter === "All"} onClick={() => { setSessionFilter("All"); setCategoryFilter("All"); }} label="All sessions" />
          {([1, 2, 3] as const).map((s) => (
            <Chip
              key={s}
              active={sessionFilter === s}
              onClick={() => { setSessionFilter(s); setCategoryFilter("All"); }}
              label={`Session ${s}`}
              gradient={SESSION_META[s].color}
            />
          ))}
        </div>

        {/* Category chips */}
        {categories.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-thin -mx-1 px-1 mb-6">
            <Chip active={categoryFilter === "All"} onClick={() => setCategoryFilter("All")} label="All categories" />
            {categories.map((c) => (
              <Chip key={c} active={categoryFilter === c} onClick={() => setCategoryFilter(c)} label={c} />
            ))}
          </div>
        )}

        <div className="text-xs text-white/40 mb-4">
          Showing {visible.length} of {NOTES.length}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {visible.map((n, idx) => {
              const sections = n.sections ?? [];
      const bulletCount = sections.reduce((sum, s) => sum + s.bullets.length, 0);
              return (
                <motion.div
                  key={n.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: Math.min(idx * 0.02, 0.3), duration: 0.35 }}
                >
                  <Link
                    href={`/notes/${n.id}`}
                    className="group relative block h-full overflow-hidden rounded-2xl glass p-5 transition hover:border-white/20 hover:-translate-y-0.5"
                  >
                    <div
                      className={`pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br ${SESSION_META[n.session].color} opacity-25 blur-2xl transition group-hover:opacity-60`}
                    />
                    <div className="relative h-full flex flex-col">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/55 flex items-center gap-1.5">
                          <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-br ${SESSION_META[n.session].color}`} />
                          S{n.session} · {n.category}
                        </span>
                      </div>
                      <h3 className="text-base font-semibold leading-snug tracking-tight">{n.title}</h3>
                      <p className="mt-2 text-sm text-white/55 leading-relaxed line-clamp-3 flex-1">
                        {n.summary}
                      </p>
                      <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/[0.06]">
                        <span className="flex items-center gap-1.5 text-xs text-white/40">
                          <FileText className="h-3.5 w-3.5" />
                          {sections.length} section{sections.length !== 1 ? "s" : ""} · {bulletCount} bullets
                        </span>
                        <span className="flex items-center gap-1 text-xs font-semibold text-white/80 transition group-hover:text-cyan-300">
                          Read
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
          <div className="mt-12 text-center text-white/55">No notes match your filter.</div>
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
