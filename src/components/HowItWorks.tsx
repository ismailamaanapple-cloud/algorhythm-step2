"use client";

import { motion } from "framer-motion";
import { MousePointer2, Brain, Repeat, Trophy } from "lucide-react";

const STEPS = [
  {
    icon: MousePointer2,
    title: "Pick an algorithm",
    desc: "Browse 30+ clinical decision trees by specialty or difficulty.",
  },
  {
    icon: Brain,
    title: "Active recall play",
    desc: "Each node poses a clinical question. Choose the next correct step.",
  },
  {
    icon: Repeat,
    title: "Instant feedback",
    desc: "Wrong choices show why. Build streaks. Climb to the management.",
  },
  {
    icon: Trophy,
    title: "Review the flow",
    desc: "Finish the algorithm and reveal the entire decision tree visually.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-[0.22em] text-cyan-300/80 mb-3">How it works</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Four steps to mastery.</h2>
          <p className="mt-3 text-white/55">
            The game distills each UWorld-style algorithm into clickable decision points so you train recall, not recognition.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-6 relative overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 opacity-15 blur-2xl" />
              <div className="relative">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 mb-4">
                  <s.icon className="h-4.5 w-4.5 text-cyan-300" />
                </div>
                <div className="text-xs uppercase tracking-[0.2em] text-white/40 mb-1">Step {i + 1}</div>
                <div className="text-base font-semibold tracking-tight mb-2">{s.title}</div>
                <p className="text-sm text-white/55 leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
