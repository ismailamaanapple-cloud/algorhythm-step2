"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  Layers,
  Stethoscope,
  ChevronDown,
} from "lucide-react";
import { ALGORITHMS } from "@/data/algorithms";
import { CASES } from "@/data/cases";
import { NOTES } from "@/data/notes";

// Smooth eased number tween hook — counts up to `to` over `duration` ms.
function useCountUp(to: number, duration = 1400) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setN(Math.round(ease(t) * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  return n;
}

export default function Hero() {
  const algCount = ALGORITHMS.length;
  const caseCount = CASES.length;
  const noteCount = NOTES.length;

  const target = useCountUp(250, 1600);

  return (
    <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden">
      {/* radial glow behind the big number */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-32 -translate-x-1/2 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-violet-500/30 via-fuchsia-500/20 to-cyan-400/30 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center"
        >
          {/* Eyebrow pill */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] text-white/75 backdrop-blur"
          >
            <Sparkles className="h-3 w-3 text-cyan-300" />
            <span>Score 250+ on Step 2 CK · built for med students</span>
          </motion.div>

          {/* Massive 250+ hero number */}
          <div className="relative mb-3">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, filter: "blur(20px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(7rem,18vw,13rem)] font-black tracking-[-0.06em] leading-[0.85] select-none"
            >
              <span className="bg-gradient-to-br from-white via-cyan-100 to-white bg-clip-text text-transparent">
                {target}
              </span>
              <motion.span
                initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 1.6, type: "spring", stiffness: 200, damping: 12 }}
                className="inline-block bg-gradient-to-br from-cyan-300 via-fuchsia-400 to-violet-300 bg-clip-text text-transparent ml-1"
              >
                +
              </motion.span>
            </motion.div>
          </div>

          {/* Tagline */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="max-w-3xl text-2xl md:text-4xl font-bold tracking-tight leading-[1.15]"
          >
            <span className="text-white">Get you to a </span>
            <span className="bg-gradient-to-br from-cyan-300 to-fuchsia-300 bg-clip-text text-transparent">
              250 or plus
            </span>
            <span className="text-white"> on Step 2.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="mt-5 max-w-xl text-base md:text-lg text-white/65 leading-relaxed"
          >
            Active-recall flashcards, vignette-driven case quizzes, and
            high-yield notes — built around how the exam actually tests you.
          </motion.p>

          {/* Primary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-9 flex flex-wrap gap-3 justify-center"
          >
            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              href="/flashcards"
              className="group relative inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black shadow-[0_0_60px_rgba(255,255,255,0.15)] hover:shadow-[0_0_80px_rgba(168,85,247,0.4)] transition"
            >
              <Layers className="h-4 w-4" />
              Start flashcards
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </motion.a>
            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              href="/cases"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-white/90 hover:bg-white/[0.08] transition"
            >
              <Stethoscope className="h-4 w-4 text-amber-300" />
              Case quiz
            </motion.a>
            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              href="/notes"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-white/90 hover:bg-white/[0.08] transition"
            >
              <BookOpen className="h-4 w-4 text-cyan-300" />
              Study notes
            </motion.a>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl w-full"
          >
            <Stat value={`${noteCount}+`} label="Study notes" accent="cyan" />
            <Stat value={`${caseCount}+`} label="Case vignettes" accent="amber" />
            <Stat value={`${algCount}+`} label="Algorithms" accent="violet" />
            <Stat value="SM-2" label="Spaced repetition" accent="fuchsia" />
          </motion.div>

          {/* Scroll cue */}
          <motion.a
            href="#how"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="mt-16 inline-flex flex-col items-center gap-1 text-[10px] uppercase tracking-[0.22em] text-white/40 hover:text-white/70 transition"
          >
            How it works
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="h-3.5 w-3.5" />
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

const ACCENT: Record<string, string> = {
  cyan: "text-cyan-300",
  amber: "text-amber-300",
  violet: "text-violet-300",
  fuchsia: "text-fuchsia-300",
};

function Stat({
  value,
  label,
  accent,
}: {
  value: string;
  label: string;
  accent: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 280, damping: 20 }}
      className="glass rounded-2xl px-4 py-5 text-center"
    >
      <div className={`text-2xl md:text-3xl font-bold tracking-tight ${ACCENT[accent]}`}>
        {value}
      </div>
      <div className="text-[10px] uppercase tracking-[0.2em] text-white/45 mt-1.5">
        {label}
      </div>
    </motion.div>
  );
}
