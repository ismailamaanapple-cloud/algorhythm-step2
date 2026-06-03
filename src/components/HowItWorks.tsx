"use client";

import { motion } from "framer-motion";
import { Layers, BookOpen, Stethoscope, Highlighter } from "lucide-react";

const STEPS = [
  {
    icon: Layers,
    title: "Spaced-repetition flashcards",
    desc: "Thousands of pre-built cards drawn straight from the cases & high-yield pearls. SM-2 schedules them so you only see what you owe today.",
    accent: "from-violet-500 to-fuchsia-500",
  },
  {
    icon: Stethoscope,
    title: "Case-based vignettes",
    desc: "Every topic has a UWorld-style stem with rationale on every answer choice. Train the pattern recognition the exam rewards.",
    accent: "from-amber-500 to-orange-500",
  },
  {
    icon: BookOpen,
    title: "High-yield notes",
    desc: "Specialty-organized notes with tables, pearls, and cross-links to the cases that test them. Mark progress, sync across devices.",
    accent: "from-cyan-500 to-sky-500",
  },
  {
    icon: Highlighter,
    title: "Highlight → flashcard",
    desc: "See something dense you keep forgetting? Select the text, one click turns it into a personal flashcard that joins your review queue.",
    accent: "from-emerald-500 to-teal-500",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-[0.22em] text-cyan-300/80 mb-3">
            How 250+ works
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Built around active recall.
          </h2>
          <p className="mt-4 text-white/60 text-base md:text-lg">
            Passive review is the slow path. Every feature here exists because
            something on the exam tests it the same way.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-6 relative overflow-hidden group"
            >
              <div
                className={`absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br ${s.accent} opacity-15 blur-2xl group-hover:opacity-30 transition`}
              />
              <div className="relative">
                <div
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${s.accent} mb-4`}
                >
                  <s.icon className="h-4.5 w-4.5 text-white" strokeWidth={2.2} />
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">
                  Tool {i + 1}
                </div>
                <div className="text-base font-semibold tracking-tight mb-2">
                  {s.title}
                </div>
                <p className="text-sm text-white/60 leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
