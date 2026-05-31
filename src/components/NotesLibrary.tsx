"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronRight,
  BookMarked,
  Check,
  Circle,
  ChevronDown,
  Filter,
  RotateCcw,
} from "lucide-react";
import { NOTES, type NoteSession } from "@/data/notes";
import { useNoteProgress } from "@/hooks/useNoteProgress";

const SESSION_META: Record<NoteSession, { name: string; color: string }> = {
  1: { name: "Acute / ENT / Neuro / Psych", color: "from-violet-500 to-purple-700" },
  2: { name: "Thorax (Cardio / Pulm)", color: "from-rose-500 to-red-700" },
  3: { name: "Abdomen (GI)", color: "from-amber-500 to-orange-700" },
};

// Specialty color mapping for visual identity
const CATEGORY_COLOR: Record<string, string> = {
  Cardiology: "from-rose-500 to-red-700",
  Pulmonary: "from-sky-500 to-blue-700",
  Gastroenterology: "from-amber-500 to-orange-700",
  Endocrine: "from-emerald-500 to-teal-700",
  Renal: "from-yellow-500 to-amber-700",
  Hematology: "from-red-500 to-rose-800",
  Oncology: "from-fuchsia-600 to-purple-800",
  Neurology: "from-violet-500 to-purple-700",
  "OB/GYN": "from-pink-500 to-fuchsia-700",
  Breast: "from-pink-400 to-rose-600",
  Pediatrics: "from-cyan-400 to-blue-600",
  Emergency: "from-red-600 to-orange-700",
  "Infectious Disease": "from-lime-500 to-green-700",
  Trauma: "from-orange-600 to-red-800",
  Dermatology: "from-amber-400 to-yellow-600",
  Musculoskeletal: "from-slate-400 to-zinc-600",
  Immunology: "from-teal-400 to-cyan-700",
  Rheumatology: "from-indigo-500 to-violet-700",
  Geriatrics: "from-stone-400 to-zinc-600",
  "Preventive Medicine": "from-green-400 to-emerald-600",
  Biostatistics: "from-blue-400 to-indigo-600",
  "Ethics & Professionalism": "from-slate-500 to-gray-700",
  Surgery: "from-red-500 to-rose-700",
  Anesthesia: "from-purple-500 to-fuchsia-700",
  Ophthalmology: "from-cyan-500 to-teal-700",
  ENT: "from-blue-500 to-cyan-700",
  Psychiatry: "from-violet-400 to-purple-600",
  "Acute Stabilization": "from-red-500 to-orange-700",
};

const getColor = (cat: string) => CATEGORY_COLOR[cat] ?? "from-zinc-500 to-slate-700";

type GroupBy = "specialty" | "session";
type Status = "all" | "completed" | "in-progress" | "not-started";

export default function NotesLibrary() {
  const { completed, toggle, reset, hydrated } = useNoteProgress();
  const [query, setQuery] = useState("");
  const [groupBy, setGroupBy] = useState<GroupBy>("specialty");
  const [status, setStatus] = useState<Status>("all");
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string | "All">("All");

  const allCategories = useMemo(
    () => Array.from(new Set(NOTES.map((n) => n.category))).sort(),
    [],
  );

  const filteredNotes = useMemo(() => {
    return NOTES.filter((n) => {
      if (activeCategory !== "All" && n.category !== activeCategory) return false;
      if (status === "completed" && !completed.has(n.id)) return false;
      if (status === "not-started" && completed.has(n.id)) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        const haystack = [
          n.title,
          n.summary,
          n.category,
          ...(n.sections ?? []).flatMap((s) => [s.heading, ...s.bullets]),
          ...(n.pearls ?? []),
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [activeCategory, status, query, completed]);

  const groups = useMemo(() => {
    const map = new Map<string, typeof NOTES>();
    for (const n of filteredNotes) {
      const key = groupBy === "specialty" ? n.category : `Session ${n.session}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(n);
    }
    // Sort groups: specialties alphabetical, sessions by number
    const sorted = Array.from(map.entries()).sort((a, b) => {
      if (groupBy === "session") return a[0].localeCompare(b[0]);
      return a[0].localeCompare(b[0]);
    });
    return sorted;
  }, [filteredNotes, groupBy]);

  const totalCompleted = completed.size;
  const totalNotes = NOTES.length;
  const percent = totalNotes > 0 ? Math.round((totalCompleted / totalNotes) * 100) : 0;

  const toggleGroup = (key: string) => {
    setCollapsedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <section id="notes" className="relative pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8">
          <div className="text-xs uppercase tracking-[0.22em] text-cyan-300/80 mb-2 flex items-center gap-2">
            <BookMarked className="h-3 w-3" /> Study Notes
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{totalNotes} topic deep-dives.</h2>
          <p className="mt-2 text-white/55 max-w-2xl">
            Organized by specialty. Mark each note complete as you go — your progress is saved on this device.
          </p>
        </div>

        {/* Progress bar */}
        <div className="glass-strong rounded-2xl p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-white/45 mb-1">Your progress</div>
              <div className="text-2xl font-bold tabular-nums">
                {hydrated ? totalCompleted : "—"}
                <span className="text-white/40 text-base font-normal"> / {totalNotes}</span>
                <span className="text-cyan-300 text-base font-medium ml-3">{hydrated ? percent : 0}%</span>
              </div>
            </div>
            {hydrated && totalCompleted > 0 && (
              <button
                onClick={() => {
                  if (confirm("Reset all progress? This cannot be undone.")) reset();
                }}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs text-white/70 hover:text-white hover:border-white/25 transition"
              >
                <RotateCcw className="h-3 w-3" />
                Reset
              </button>
            )}
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${hydrated ? percent : 0}%` }}
              transition={{ duration: 0.6 }}
              className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400"
            />
          </div>
        </div>

        {/* Controls row */}
        <div className="flex flex-wrap gap-3 items-center mb-6">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search notes…"
              className="w-full rounded-full glass pl-11 pr-4 py-2.5 text-sm placeholder:text-white/35 focus:outline-none focus:border-white/25"
            />
          </div>

          {/* Group by toggle */}
          <div className="flex rounded-full bg-white/[0.04] border border-white/10 p-1 text-xs">
            <button
              onClick={() => setGroupBy("specialty")}
              className={`rounded-full px-3 py-1.5 font-medium transition ${
                groupBy === "specialty" ? "bg-white text-black" : "text-white/65 hover:text-white"
              }`}
            >
              By specialty
            </button>
            <button
              onClick={() => setGroupBy("session")}
              className={`rounded-full px-3 py-1.5 font-medium transition ${
                groupBy === "session" ? "bg-white text-black" : "text-white/65 hover:text-white"
              }`}
            >
              By session
            </button>
          </div>

          {/* Status filter */}
          <div className="flex rounded-full bg-white/[0.04] border border-white/10 p-1 text-xs">
            {(["all", "not-started", "completed"] as Status[]).map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`rounded-full px-3 py-1.5 font-medium transition capitalize ${
                  status === s ? "bg-white text-black" : "text-white/65 hover:text-white"
                }`}
              >
                {s === "not-started" ? "To do" : s === "completed" ? "Done" : "All"}
              </button>
            ))}
          </div>
        </div>

        {/* Category chips (specialty filter — only visible when grouping by specialty or not) */}
        <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-thin -mx-1 px-1 mb-6">
          <CategoryChip
            active={activeCategory === "All"}
            onClick={() => setActiveCategory("All")}
            label="All specialties"
            count={NOTES.length}
            completed={NOTES.filter((n) => completed.has(n.id)).length}
            hydrated={hydrated}
          />
          {allCategories.map((c) => {
            const inCat = NOTES.filter((n) => n.category === c);
            const done = inCat.filter((n) => completed.has(n.id)).length;
            return (
              <CategoryChip
                key={c}
                active={activeCategory === c}
                onClick={() => setActiveCategory(c)}
                label={c}
                count={inCat.length}
                completed={done}
                hydrated={hydrated}
                gradient={getColor(c)}
              />
            );
          })}
        </div>

        <div className="text-xs text-white/40 mb-4 flex items-center gap-2">
          <Filter className="h-3 w-3" />
          Showing {filteredNotes.length} of {totalNotes}
        </div>

        {/* Grouped sections */}
        <div className="space-y-6">
          {groups.map(([groupKey, items]) => {
            const groupDone = items.filter((n) => completed.has(n.id)).length;
            const groupTotal = items.length;
            const groupPercent = groupTotal > 0 ? Math.round((groupDone / groupTotal) * 100) : 0;
            const isCollapsed = collapsedGroups.has(groupKey);
            const groupColor = groupBy === "specialty"
              ? getColor(groupKey)
              : SESSION_META[parseInt(groupKey.replace("Session ", "")) as NoteSession]?.color ?? "from-zinc-500 to-slate-700";

            return (
              <motion.div
                key={groupKey}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="glass rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => toggleGroup(groupKey)}
                  className="w-full flex items-center gap-4 px-5 py-4 hover:bg-white/[0.03] transition text-left"
                >
                  <span className={`h-2 w-2 rounded-full bg-gradient-to-br ${groupColor}`} />
                  <h3 className="text-base font-semibold tracking-tight flex-1 truncate">{groupKey}</h3>
                  <div className="text-xs text-white/55 tabular-nums shrink-0">
                    {hydrated ? `${groupDone}/${groupTotal}` : `${groupTotal} notes`}
                    {hydrated && groupDone === groupTotal && groupTotal > 0 && (
                      <span className="ml-2 text-emerald-300">✓</span>
                    )}
                  </div>
                  <div className="w-20 h-1.5 bg-white/5 rounded-full overflow-hidden shrink-0">
                    <div
                      className={`h-full bg-gradient-to-r ${groupColor}`}
                      style={{ width: `${hydrated ? groupPercent : 0}%` }}
                    />
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 text-white/55 shrink-0 transition ${isCollapsed ? "" : "rotate-180"}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {!isCollapsed && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 px-5 pb-5">
                        {items.map((n) => {
                          const isDone = completed.has(n.id);
                          return (
                            <div
                              key={n.id}
                              className={`group relative rounded-xl border transition ${
                                isDone
                                  ? "border-emerald-400/30 bg-emerald-500/[0.04]"
                                  : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                              }`}
                            >
                              <Link
                                href={`/notes/${n.id}`}
                                className="block px-4 py-3.5 pl-12"
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <div className="text-[10px] uppercase tracking-[0.18em] text-white/45">
                                    {groupBy === "specialty" ? `S${n.session}` : n.category}
                                  </div>
                                </div>
                                <div className={`text-sm font-semibold leading-snug tracking-tight ${isDone ? "text-white/85" : ""}`}>
                                  {n.title}
                                </div>
                                <div className="mt-1 text-xs text-white/50 line-clamp-2 leading-relaxed">
                                  {n.summary}
                                </div>
                              </Link>
                              {/* Checkbox */}
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  toggle(n.id);
                                }}
                                aria-label={isDone ? "Mark as not done" : "Mark as done"}
                                className={`absolute left-3 top-3.5 h-6 w-6 rounded-md border flex items-center justify-center transition ${
                                  isDone
                                    ? "border-emerald-300/60 bg-emerald-400/20 text-emerald-300 hover:bg-emerald-400/30"
                                    : "border-white/20 bg-white/[0.02] text-transparent hover:border-white/40 hover:bg-white/[0.06]"
                                }`}
                              >
                                {isDone ? <Check className="h-4 w-4" strokeWidth={3} /> : <Circle className="h-3 w-3 text-white/20" />}
                              </button>
                              {/* Arrow on hover */}
                              <ChevronRight className={`absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 transition opacity-0 group-hover:opacity-100 ${isDone ? "text-emerald-300" : "text-cyan-300"}`} />
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {filteredNotes.length === 0 && (
          <div className="mt-12 text-center text-white/55">No notes match your filter.</div>
        )}
      </div>
    </section>
  );
}

function CategoryChip({
  active,
  onClick,
  label,
  count,
  completed,
  hydrated,
  gradient,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
  completed: number;
  hydrated: boolean;
  gradient?: string;
}) {
  const allDone = hydrated && completed === count && count > 0;
  return (
    <button
      onClick={onClick}
      className={`relative shrink-0 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
        active
          ? "border-white/30 bg-white text-black"
          : "border-white/10 bg-white/[0.04] text-white/75 hover:bg-white/[0.08] hover:border-white/20"
      }`}
    >
      {gradient && !active && (
        <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-br ${gradient}`} />
      )}
      <span>{label}</span>
      <span
        className={`text-[10px] px-1.5 py-0.5 rounded-full tabular-nums ${
          active
            ? "bg-black/10 text-black/70"
            : allDone
            ? "bg-emerald-400/20 text-emerald-300"
            : "bg-white/10 text-white/55"
        }`}
      >
        {hydrated ? `${completed}/${count}` : count}
      </span>
    </button>
  );
}
