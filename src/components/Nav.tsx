"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Brain, Activity } from "lucide-react";

export default function Nav() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-40 w-full"
    >
      <div className="mx-auto max-w-7xl px-6 py-5">
        <div className="glass-strong flex items-center justify-between rounded-2xl px-5 py-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 opacity-70 blur-sm group-hover:opacity-100 transition" />
              <div className="relative h-9 w-9 rounded-full bg-black flex items-center justify-center">
                <Brain className="h-5 w-5 text-white" strokeWidth={2.2} />
              </div>
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">Algorhythm</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/40">Step 2 CK</div>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-1 text-sm">
            <Link href="/" className="px-3 py-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition">Algorithms</Link>
            <Link href="/cases" className="px-3 py-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition">Cases</Link>
            <Link href="/notes" className="px-3 py-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition">Notes</Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/70">
              <Activity className="h-3.5 w-3.5 text-cyan-300" />
              v1.0
            </span>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
