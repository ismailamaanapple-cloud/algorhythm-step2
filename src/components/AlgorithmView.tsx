"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowLeft, ListTree, Layers } from "lucide-react";
import BackLink from "@/components/BackLink";
import type { Algorithm } from "@/data/algorithms";
import { CATEGORY_META } from "@/data/algorithms";

// Lazy-load the diagram so the algorithm route's initial JS stays light;
// it pulls in framer-motion + the layout engine which we don't need until
// after the header has painted.
const AlgorithmDiagram = dynamic(
  () => import("@/components/AlgorithmDiagram"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[60vh] flex items-center justify-center">
        <div className="h-2 w-32 rounded-full bg-white/5 overflow-hidden">
          <div className="h-full w-1/3 bg-cyan-400/50 animate-pulse" />
        </div>
      </div>
    ),
  },
);

export default function AlgorithmView({ algo }: { algo: Algorithm }) {
  const meta = CATEGORY_META[algo.category];

  // Count nodes for the header metadata.
  const nodes = Object.values(algo.nodes);
  const decisionCount = nodes.filter((n) => n.kind === "decision").length;
  const outcomeCount = nodes.filter((n) => n.kind === "outcome").length;

  return (
    <div className="min-h-[100dvh] flex flex-col">
      {/* Sticky compact header */}
      <div className="sticky top-0 z-30 backdrop-blur-md bg-black/55 border-b border-white/5">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-3.5 flex items-center gap-4">
          <BackLink
            fallbackHref="/"
            className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition shrink-0"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Library</span>
          </BackLink>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-white/45">
              <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-br ${meta.color}`} />
              <span className="truncate">{algo.category}</span>
              <span className="text-white/25">·</span>
              <span className="capitalize">{algo.difficulty}</span>
            </div>
            <div className="truncate text-sm font-semibold tracking-tight">{algo.title}</div>
          </div>
          <div className="hidden md:flex items-center gap-3 shrink-0 text-[10px] uppercase tracking-[0.22em] text-white/50">
            <span className="inline-flex items-center gap-1.5">
              <ListTree className="h-3 w-3" />
              {decisionCount} decision{decisionCount === 1 ? "" : "s"}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Layers className="h-3 w-3" />
              {outcomeCount} outcome{outcomeCount === 1 ? "" : "s"}
            </span>
          </div>
        </div>
      </div>

      {/* Blurb */}
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-3xl w-full px-4 sm:px-6 pt-5 pb-3"
      >
        <p className="text-sm text-white/65 leading-relaxed">{algo.blurb}</p>
        {algo.source && (
          <p className="mt-1.5 text-[10px] uppercase tracking-[0.22em] text-white/35">
            Source · {algo.source}
          </p>
        )}
      </motion.div>

      {/* Full diagram — fits width, page scrolls naturally if tall */}
      <div className="mx-auto max-w-6xl w-full px-2 sm:px-4 md:px-6 pb-16">
        <AlgorithmDiagram algo={algo} />
      </div>
    </div>
  );
}
