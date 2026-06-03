"use client";

import { motion } from "framer-motion";

/**
 * 250+ wordmark. Used in Nav, Footer, LoginModal so the brand is consistent.
 * The "+" has a gradient accent that subtly pulses on hover.
 */
export function BrandMark({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dims =
    size === "sm" ? "h-7 w-7 text-[11px]" : size === "lg" ? "h-12 w-12 text-base" : "h-9 w-9 text-xs";
  return (
    <div className="relative shrink-0">
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 opacity-50 blur-md transition group-hover:opacity-80" />
      <div
        className={`relative ${dims} rounded-2xl bg-black ring-1 ring-white/10 flex items-center justify-center font-black tracking-tight overflow-hidden`}
      >
        <span className="bg-gradient-to-br from-white via-cyan-100 to-white bg-clip-text text-transparent">
          250
        </span>
        <motion.span
          aria-hidden
          initial={{ opacity: 0.7 }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="ml-0.5 bg-gradient-to-br from-cyan-300 via-fuchsia-300 to-violet-300 bg-clip-text text-transparent"
        >
          +
        </motion.span>
      </div>
    </div>
  );
}

export function BrandWordmark({ withTagline = false }: { withTagline?: boolean }) {
  return (
    <div className="leading-tight">
      <div className="text-sm font-bold tracking-tight">
        <span className="text-white">250</span>
        <span className="bg-gradient-to-br from-cyan-300 to-fuchsia-400 bg-clip-text text-transparent">
          +
        </span>
      </div>
      {withTagline ? (
        <div className="text-[10px] uppercase tracking-[0.18em] text-white/40">
          Step 2 CK & OMM
        </div>
      ) : null}
    </div>
  );
}
