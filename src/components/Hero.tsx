"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Trophy, Zap } from "lucide-react";
import { ALGORITHMS, CATEGORIES } from "@/data/algorithms";

export default function Hero() {
  const count = ALGORITHMS.length;
  const specialtyCount = new Set(ALGORITHMS.map((a) => a.category)).size;
  const _used = CATEGORIES.length; // referenced for tree-shake safety
  void _used;

  return (
    <section className="relative pt-10 pb-24 md:pt-16 md:pb-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center text-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-white/70 backdrop-blur"
          >
            <Sparkles className="h-3 w-3 text-cyan-300" />
            <span>{count} clinical algorithms · gamified</span>
          </motion.div>

          <h1 className="max-w-4xl text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
            <span className="text-shimmer">Play</span>{" "}
            <span className="text-white/95">your way through</span>{" "}
            <br className="hidden sm:block" />
            <span className="text-white/95">Step 2 CK</span>{" "}
            <span className="text-shimmer">algorithms.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-base md:text-lg text-white/65 leading-relaxed">
            Step into the clinical decision. Pick the next move. Climb the diagnostic tree.
            Reinforce high-yield management with active recall — not passive review.
          </p>

          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              href="#library"
              className="group relative inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black shadow-[0_0_40px_rgba(255,255,255,0.18)] hover:shadow-[0_0_60px_rgba(124,92,255,0.3)] transition"
            >
              Choose an algorithm
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </motion.a>
            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              href="#how"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-white/85 hover:bg-white/[0.06] hover:border-white/25 transition"
            >
              How it works
            </motion.a>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl w-full">
            <Stat icon={<Trophy className="h-4 w-4" />} value={`${count}`} label="Algorithms" />
            <Stat icon={<Zap className="h-4 w-4" />} value={`${specialtyCount}`} label="Specialties" />
            <Stat icon={<Sparkles className="h-4 w-4" />} value="Active" label="Recall mode" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="glass rounded-2xl px-4 py-5 text-center"
    >
      <div className="flex items-center justify-center text-cyan-300 mb-1.5">{icon}</div>
      <div className="text-2xl font-semibold tracking-tight">{value}</div>
      <div className="text-[10px] uppercase tracking-[0.2em] text-white/45 mt-1">{label}</div>
    </motion.div>
  );
}
