"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  Check,
  Circle,
  Pill,
  Syringe,
  Heart,
  Brain,
  Wind,
  Activity,
  Bug,
  Baby,
  ChevronRight,
} from "lucide-react";
import { NOTES } from "@/data/notes";
import { useNoteProgress } from "@/hooks/useNoteProgress";

const PHARM_GROUPS: Record<string, string> = {
  "pharm-anticoagulants":     "Cardiology & Heme",
  "pharm-beta-blockers":      "Cardiology & Heme",
  "pharm-ace-arb":            "Cardiology & Heme",
  "pharm-diuretics":          "Cardiology & Heme",
  "pharm-statins-lipids":     "Cardiology & Heme",
  "pharm-heart-failure":      "Cardiology & Heme",
  "pharm-antiarrhythmics":    "Cardiology & Heme",
  "pharm-autonomic":          "Autonomic & Pain",
  "pharm-opioids":            "Autonomic & Pain",
  "pharm-nsaids-analgesics":  "Autonomic & Pain",
  "pharm-antibiotics":        "Infectious Disease",
  "pharm-asthma-copd":        "Pulmonary",
  "pharm-diabetes":           "Endocrine",
  "pharm-steroids":           "Endocrine",
  "pharm-osteoporosis":       "Endocrine",
  "pharm-psych":              "Psych & Neuro",
  "pharm-aeds":               "Psych & Neuro",
  "pharm-parkinson":          "Psych & Neuro",
  "pharm-migraine":           "Psych & Neuro",
  "pharm-ob-drugs":           "OB / Women's Health",
  "pharm-chemo-classics":     "Oncology",
  "pharm-immunosuppressants": "Oncology",
};

const GROUP_ORDER = [
  "Cardiology & Heme",
  "Autonomic & Pain",
  "Infectious Disease",
  "Pulmonary",
  "Endocrine",
  "Psych & Neuro",
  "OB / Women's Health",
  "Oncology",
];

const GROUP_ICON: Record<string, React.ReactNode> = {
  "Cardiology & Heme":   <Heart className="h-4 w-4" />,
  "Autonomic & Pain":    <Pill className="h-4 w-4" />,
  "Infectious Disease":  <Bug className="h-4 w-4" />,
  "Pulmonary":           <Wind className="h-4 w-4" />,
  "Endocrine":           <Syringe className="h-4 w-4" />,
  "Psych & Neuro":       <Brain className="h-4 w-4" />,
  "OB / Women's Health": <Baby className="h-4 w-4" />,
  "Oncology":            <Activity className="h-4 w-4" />,
};

export default function PharmacologyLibrary() {
  const { completed, toggle, hydrated } = useNoteProgress();
  const [q, setQ] = useState("");

  const pharmNotes = useMemo(
    () => NOTES.filter((n) => n.category === "Pharmacology"),
    [],
  );

  const filtered = useMemo(() => {
    if (!q.trim()) return pharmNotes;
    const needle = q.toLowerCase();
    return pharmNotes.filter(
      (n) =>
        n.title.toLowerCase().includes(needle) ||
        n.summary.toLowerCase().includes(needle),
    );
  }, [pharmNotes, q]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof pharmNotes>();
    for (const n of filtered) {
      const g = PHARM_GROUPS[n.id] ?? "Other";
      const arr = map.get(g) ?? [];
      arr.push(n);
      map.set(g, arr);
    }
    return GROUP_ORDER.filter((g) => map.has(g)).map((g) => ({
      group: g,
      notes: map.get(g)!,
    }));
  }, [filtered]);

  const doneCount = pharmNotes.filter((n) => completed.has(n.id)).length;
  const pct = Math.round((doneCount / Math.max(1, pharmNotes.length)) * 100);

  return (
    <div className="mx-auto max-w-6xl px-6 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="pt-10 md:pt-16 mb-10"
      >
        <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-emerald-200 mb-4">
          <Pill className="h-3 w-3" />
          Pharmacology · drug classes
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-3">
          Drugs by{" "}
          <span className="bg-gradient-to-br from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
            class.
          </span>
        </h1>
        <p className="text-white/65 text-base md:text-lg max-w-3xl leading-relaxed">
          Mechanism, indications, side effects, contraindications. Organized
          to match how Step 2 tests it — by class, with the gotchas (HIT,
          serotonin syndrome, glucagon for β-blocker overdose) front and
          center.
        </p>

        {/* Progress strip */}
        {hydrated && (
          <div className="mt-7 max-w-md">
            <div className="flex items-center justify-between text-xs text-white/55 mb-2">
              <span>
                {doneCount} / {pharmNotes.length} pharm topics complete
              </span>
              <span>{pct}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400"
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
          placeholder="Search drug classes…"
          className="w-full rounded-full border border-white/10 bg-white/[0.04] pl-11 pr-4 py-3 text-sm placeholder:text-white/30 focus:outline-none focus:border-emerald-300/40 transition"
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
              <h2 className="text-sm uppercase tracking-[0.22em] text-emerald-300/80 inline-flex items-center gap-2">
                <span className="text-emerald-300">{GROUP_ICON[g.group]}</span>
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
                    className="group glass rounded-2xl p-5 transition border border-transparent hover:border-emerald-300/30 hover:bg-emerald-300/[0.04]"
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
                        <div
                          className={`text-sm font-semibold tracking-tight mb-1 ${
                            done ? "text-white/65" : "text-white"
                          }`}
                        >
                          {n.title}
                        </div>
                        <div className="text-xs text-white/55 leading-snug line-clamp-2">
                          {n.summary}
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-white/30 group-hover:text-emerald-300 group-hover:translate-x-0.5 transition mt-1 shrink-0" />
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
