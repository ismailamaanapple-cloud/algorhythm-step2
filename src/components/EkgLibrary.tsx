"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  Check,
  Circle,
  Activity,
  Heart,
  Zap,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { NOTES } from "@/data/notes";
import { useNoteProgress } from "@/hooks/useNoteProgress";

// Manual grouping for the EKG section so related topics cluster together.
const EKG_GROUPS: Record<string, string> = {
  "ekg-stemi-localization":     "Ischemia & ACS",
  "ekg-acs-non-stemi":          "Ischemia & ACS",
  "ekg-stable-cad-stress":      "Ischemia & ACS",
  "ekg-arrhythmias-narrow":     "Arrhythmias",
  "ekg-arrhythmias-wide":       "Arrhythmias",
  "ekg-av-blocks":              "Conduction",
  "ekg-bradycardia-conduction": "Conduction",
  "ekg-axis-hypertrophy":       "Anatomy on the EKG",
  "ekg-paced-rhythms":          "Anatomy on the EKG",
  "ekg-electrolytes":           "Electrolytes & SCD",
  "ekg-wpw-long-qt-brugada":    "Electrolytes & SCD",
  "ekg-pe-rv-strain":           "PE & RV Strain",
  "ekg-pericarditis-pe-mimics": "PE & RV Strain",
  "ekg-cardiac-arrest-acls":    "Emergencies",
  "ekg-syncope-workup":         "Emergencies",
};

const GROUP_ORDER = [
  "Ischemia & ACS",
  "Arrhythmias",
  "Conduction",
  "Anatomy on the EKG",
  "Electrolytes & SCD",
  "PE & RV Strain",
  "Emergencies",
];

const GROUP_ICON: Record<string, React.ReactNode> = {
  "Ischemia & ACS":      <Heart className="h-4 w-4" />,
  "Arrhythmias":         <Activity className="h-4 w-4" />,
  "Conduction":          <Zap className="h-4 w-4" />,
  "Anatomy on the EKG":  <Sparkles className="h-4 w-4" />,
  "Electrolytes & SCD":  <Zap className="h-4 w-4" />,
  "PE & RV Strain":      <Heart className="h-4 w-4" />,
  "Emergencies":         <Activity className="h-4 w-4" />,
};

export default function EkgLibrary() {
  const { completed, toggle, hydrated } = useNoteProgress();
  const [q, setQ] = useState("");

  const ekgNotes = useMemo(() => NOTES.filter((n) => n.category === "EKG"), []);

  const filtered = useMemo(() => {
    if (!q.trim()) return ekgNotes;
    const needle = q.toLowerCase();
    return ekgNotes.filter(
      (n) =>
        n.title.toLowerCase().includes(needle) ||
        n.summary.toLowerCase().includes(needle),
    );
  }, [ekgNotes, q]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof ekgNotes>();
    for (const n of filtered) {
      const g = EKG_GROUPS[n.id] ?? "Other";
      const arr = map.get(g) ?? [];
      arr.push(n);
      map.set(g, arr);
    }
    return GROUP_ORDER.filter((g) => map.has(g)).map((g) => ({
      group: g,
      notes: map.get(g)!,
    }));
  }, [filtered]);

  const doneCount = ekgNotes.filter((n) => completed.has(n.id)).length;
  const pct = Math.round((doneCount / Math.max(1, ekgNotes.length)) * 100);

  return (
    <div className="mx-auto max-w-6xl px-6 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="pt-10 md:pt-16 mb-10"
      >
        <div className="inline-flex items-center gap-1.5 rounded-full border border-rose-400/30 bg-rose-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-rose-200 mb-4">
          <Activity className="h-3 w-3" />
          EKG · pattern recognition
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-3">
          Read every <span className="bg-gradient-to-br from-rose-300 to-amber-300 bg-clip-text text-transparent">strip.</span>
        </h1>
        <p className="text-white/65 text-base md:text-lg max-w-3xl leading-relaxed">
          STEMI localization, AV blocks, channelopathies, hyperkalemia,
          torsades — the EKG patterns Step 2 will throw at you and exactly
          what to do next.
        </p>

        {/* Progress strip */}
        {hydrated && (
          <div className="mt-7 max-w-md">
            <div className="flex items-center justify-between text-xs text-white/55 mb-2">
              <span>
                {doneCount} / {ekgNotes.length} EKG topics complete
              </span>
              <span>{pct}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="h-full bg-gradient-to-r from-rose-400 to-amber-400"
              />
            </div>
          </div>
        )}
      </motion.div>

      {/* Search */}
      <div className="relative mb-8 max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search EKG topics…"
          className="w-full rounded-full border border-white/10 bg-white/[0.04] pl-11 pr-4 py-3 text-sm placeholder:text-white/30 focus:outline-none focus:border-rose-300/40 transition"
        />
      </div>

      {/* Groups */}
      <div className="space-y-10">
        {grouped.map((g, gi) => (
          <motion.section
            key={g.group}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: gi * 0.04, duration: 0.5 }}
          >
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="text-sm uppercase tracking-[0.22em] text-rose-300/80 inline-flex items-center gap-2">
                <span className="text-rose-300">{GROUP_ICON[g.group]}</span>
                {g.group}
              </h2>
              <span className="text-xs text-white/40">
                {g.notes.length} topic{g.notes.length === 1 ? "" : "s"}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {g.notes.map((n) => {
                const done = completed.has(n.id);
                return (
                  <Link
                    key={n.id}
                    href={`/notes/${n.id}`}
                    className="group glass rounded-2xl p-5 transition border border-transparent hover:border-rose-300/30 hover:bg-rose-300/[0.04]"
                  >
                    <div className="flex items-start gap-3">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          if (hydrated) toggle(n.id);
                        }}
                        className={`mt-1 h-4 w-4 rounded border flex items-center justify-center shrink-0 ${
                          done
                            ? "border-emerald-300/60 bg-emerald-400/20 text-emerald-300"
                            : "border-white/15 bg-white/[0.02] hover:border-white/30"
                        }`}
                        aria-label={done ? "Mark not done" : "Mark complete"}
                      >
                        {done ? (
                          <Check className="h-2.5 w-2.5" strokeWidth={3} />
                        ) : (
                          <Circle className="h-2.5 w-2.5 opacity-0" />
                        )}
                      </button>
                      <div className="flex-1 min-w-0">
                        <div className={`text-sm font-semibold tracking-tight mb-1 ${done ? "text-white/65" : "text-white"}`}>
                          {n.title}
                        </div>
                        <div className="text-xs text-white/55 leading-snug line-clamp-2">
                          {n.summary}
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-white/30 group-hover:text-rose-300 group-hover:translate-x-0.5 transition mt-1 shrink-0" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
}
