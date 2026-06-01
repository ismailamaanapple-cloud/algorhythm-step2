"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  Check,
  Circle,
  RotateCcw,
  ChevronRight,
  Sparkles,
  Compass,
  Brain,
  Bone,
  Activity,
  Workflow,
  Stethoscope,
  ClipboardList,
} from "lucide-react";
import { NOTES } from "@/data/notes";
import { useNoteProgress } from "@/hooks/useNoteProgress";

// OMM grouping: organize OMM notes into clinically meaningful regions
const OMM_GROUPS: Record<string, string> = {
  "omm-fundamentals": "Foundations",
  "omm-fryette": "Foundations",
  "omm-cervical": "Spinal Diagnosis",
  "omm-thoracic-ribs": "Spinal Diagnosis",
  "omm-lumbar": "Spinal Diagnosis",
  "omm-sacrum": "Pelvis & Sacrum",
  "omm-innominate": "Pelvis & Sacrum",
  "omm-cranial": "Cranial",
  "omm-counterstrain": "Treatment Techniques",
  "omm-muscle-energy": "Treatment Techniques",
  "omm-hvla-others": "Treatment Techniques",
  "omm-viscerosomatic": "Reflexes & Application",
  "omm-chapmans": "Reflexes & Application",
  "omm-special-situations": "Clinical Practice",
  "omm-indications": "Clinical Practice",
};

const GROUP_ORDER = [
  "Foundations",
  "Spinal Diagnosis",
  "Pelvis & Sacrum",
  "Cranial",
  "Treatment Techniques",
  "Reflexes & Application",
  "Clinical Practice",
];

const GROUP_META: Record<string, { icon: React.ReactNode; accent: string; description: string }> = {
  Foundations: {
    icon: <Compass className="h-4 w-4" />,
    accent: "from-violet-400 to-purple-600",
    description: "Core principles, TART, Fryette's laws",
  },
  "Spinal Diagnosis": {
    icon: <Bone className="h-4 w-4" />,
    accent: "from-rose-400 to-red-600",
    description: "Cervical, thoracic, ribs, lumbar dysfunctions",
  },
  "Pelvis & Sacrum": {
    icon: <Workflow className="h-4 w-4" />,
    accent: "from-amber-400 to-orange-600",
    description: "Sacral torsions, innominate dysfunctions",
  },
  Cranial: {
    icon: <Brain className="h-4 w-4" />,
    accent: "from-cyan-400 to-sky-600",
    description: "PRM, SBS strain patterns",
  },
  "Treatment Techniques": {
    icon: <Activity className="h-4 w-4" />,
    accent: "from-emerald-400 to-teal-600",
    description: "Counterstrain, ME, HVLA, MFR, BLT",
  },
  "Reflexes & Application": {
    icon: <Stethoscope className="h-4 w-4" />,
    accent: "from-pink-400 to-fuchsia-600",
    description: "Viscerosomatics, Chapman's points",
  },
  "Clinical Practice": {
    icon: <ClipboardList className="h-4 w-4" />,
    accent: "from-indigo-400 to-violet-600",
    description: "Special populations, contras, documentation",
  },
};

type Status = "all" | "completed" | "not-started";

export default function OmmLibrary() {
  const { completed, toggle, reset, hydrated } = useNoteProgress();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<Status>("all");

  const ommNotes = useMemo(() => NOTES.filter((n) => n.category === "OMM"), []);

  const filtered = useMemo(() => {
    return ommNotes.filter((n) => {
      if (status === "completed" && !completed.has(n.id)) return false;
      if (status === "not-started" && completed.has(n.id)) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        const haystack = [
          n.title,
          n.summary,
          ...(n.sections ?? []).flatMap((s) => [s.heading, ...s.bullets]),
          ...(n.pearls ?? []),
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [ommNotes, status, query, completed]);

  const groups = useMemo(() => {
    const map = new Map<string, typeof NOTES>();
    for (const n of filtered) {
      const group = OMM_GROUPS[n.id] ?? "Other";
      if (!map.has(group)) map.set(group, []);
      map.get(group)!.push(n);
    }
    // Order by GROUP_ORDER
    return GROUP_ORDER.filter((g) => map.has(g)).map((g) => [g, map.get(g)!] as const);
  }, [filtered]);

  const totalCompleted = ommNotes.filter((n) => completed.has(n.id)).length;
  const totalCount = ommNotes.length;
  const percent = totalCount > 0 ? Math.round((totalCompleted / totalCount) * 100) : 0;

  return (
    <div className="mx-auto max-w-5xl px-6 pt-12 pb-24">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <div className="text-xs uppercase tracking-[0.24em] text-amber-300/80 mb-3 flex items-center gap-2">
          <Sparkles className="h-3 w-3" /> COMLEX Level 2 · OMM
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.05] mb-4">
          Osteopathic Manipulative Medicine.
        </h1>
        <p className="text-white/55 text-lg max-w-2xl leading-relaxed">
          Every dysfunction, technique, and clinical application you need for COMLEX Level 2 — organized
          by region. Mark each topic complete as you study; progress saves to this device.
        </p>
      </motion.div>

      {/* Progress + controls */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 mb-10"
      >
        <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-white/45 mb-1">Your progress</div>
            <div className="text-3xl font-bold tabular-nums">
              {hydrated ? totalCompleted : 0}
              <span className="text-white/40 text-lg font-normal"> / {totalCount}</span>
              <span className="text-amber-300 text-lg font-medium ml-3">{hydrated ? percent : 0}%</span>
            </div>
          </div>
          {hydrated && totalCompleted > 0 && (
            <button
              onClick={() => {
                if (confirm("Reset all OMM progress? This cannot be undone.")) {
                  ommNotes.forEach((n) => {
                    if (completed.has(n.id)) toggle(n.id);
                  });
                }
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs text-white/70 hover:text-white hover:border-white/25 transition"
            >
              <RotateCcw className="h-3 w-3" />
              Reset OMM
            </button>
          )}
        </div>
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${hydrated ? percent : 0}%` }}
            transition={{ duration: 0.6 }}
            className="h-full bg-gradient-to-r from-amber-400 to-orange-500"
          />
        </div>
      </motion.div>

      {/* Filter row */}
      <div className="flex gap-3 items-center mb-10 flex-wrap">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search OMM topics…"
            className="w-full rounded-full border border-white/10 bg-white/[0.02] pl-11 pr-4 py-2.5 text-sm placeholder:text-white/35 focus:outline-none focus:border-white/30 transition"
          />
        </div>
        <div className="flex rounded-full bg-white/[0.04] border border-white/10 p-1 text-xs">
          {(["all", "not-started", "completed"] as Status[]).map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`rounded-full px-3.5 py-1.5 font-medium transition ${
                status === s ? "bg-white text-black" : "text-white/65 hover:text-white"
              }`}
            >
              {s === "not-started" ? "To do" : s === "completed" ? "Done" : "All"}
            </button>
          ))}
        </div>
      </div>

      {/* Grouped sections */}
      <div className="space-y-14">
        {groups.map(([groupName, items], gi) => {
          const meta = GROUP_META[groupName] ?? GROUP_META.Foundations;
          const done = items.filter((n) => completed.has(n.id)).length;
          return (
            <motion.section
              key={groupName}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: gi * 0.05 + 0.2 }}
            >
              {/* Section header */}
              <div className="flex items-end justify-between gap-4 mb-5 flex-wrap">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-9 w-9 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${meta.accent}`}
                  >
                    {meta.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold tracking-tight">{groupName}</h2>
                    <p className="text-xs text-white/45">{meta.description}</p>
                  </div>
                </div>
                <div className="text-xs text-white/55 tabular-nums flex items-center gap-2">
                  <span>
                    {hydrated ? done : 0}/{items.length}
                  </span>
                  {hydrated && done === items.length && items.length > 0 && (
                    <span className="text-emerald-300">✓ complete</span>
                  )}
                </div>
              </div>

              {/* Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {items.map((n, i) => {
                  const isDone = completed.has(n.id);
                  return (
                    <motion.div
                      key={n.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: gi * 0.05 + i * 0.03 + 0.25 }}
                    >
                      <div
                        className={`group relative rounded-2xl border transition ${
                          isDone
                            ? "border-emerald-400/30 bg-emerald-500/[0.04]"
                            : "border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04]"
                        }`}
                      >
                        <Link href={`/notes/${n.id}`} className="block px-5 py-4 pr-12 pl-14">
                          <h3
                            className={`text-base font-semibold leading-snug mb-1.5 ${
                              isDone ? "text-white/85" : ""
                            }`}
                          >
                            {n.title}
                          </h3>
                          <p className="text-sm text-white/50 leading-relaxed line-clamp-2">
                            {n.summary}
                          </p>
                        </Link>
                        {/* Checkbox */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggle(n.id);
                          }}
                          aria-label={isDone ? "Mark as not done" : "Mark as done"}
                          className={`absolute left-4 top-4 h-6 w-6 rounded-md border flex items-center justify-center transition ${
                            isDone
                              ? "border-emerald-300/60 bg-emerald-400/20 text-emerald-300 hover:bg-emerald-400/30"
                              : "border-white/20 bg-white/[0.02] text-transparent hover:border-white/40 hover:bg-white/[0.06]"
                          }`}
                        >
                          {isDone ? (
                            <Check className="h-4 w-4" strokeWidth={3} />
                          ) : (
                            <Circle className="h-3 w-3 text-white/15" />
                          )}
                        </button>
                        <ChevronRight
                          className={`absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 transition opacity-0 group-hover:opacity-100 ${
                            isDone ? "text-emerald-300" : "text-amber-300"
                          }`}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="mt-12 text-center text-white/55">No OMM topics match your filter.</div>
      )}
    </div>
  );
}
