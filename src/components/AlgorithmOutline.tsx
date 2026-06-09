"use client";

/**
 * AlgorithmOutline — linear, indented, top-to-bottom rendering of an Algorithm.
 *
 * The previous pan/zoom flowchart was painful on mobile (sub-container scroll
 * trap) and required users to hunt around for nodes. This view flattens the
 * tree into a single column that the page can scroll naturally: each decision
 * shows its correct branches as bullets, and each bullet recursively renders
 * its child node directly underneath with a vertical guide line.
 *
 * Diamond joins (a node reached by multiple parents) are intentionally
 * duplicated per path — keeps every branch readable end-to-end without the
 * reader having to mentally backtrack. Cycles are guarded with an ancestor
 * Set so a malformed graph can't blow the stack.
 */

import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, GitFork } from "lucide-react";
import type {
  Algorithm,
  AlgoNode,
  DecisionNode,
  OutcomeNode,
} from "@/data/algorithms";

export default function AlgorithmOutline({ algo }: { algo: Algorithm }) {
  return (
    <div className="space-y-2">
      <NodeBlock
        id={algo.start}
        algo={algo}
        depth={0}
        seen={new Set()}
        isStart
      />
    </div>
  );
}

function NodeBlock({
  id,
  algo,
  depth,
  seen,
  isStart = false,
}: {
  id: string;
  algo: Algorithm;
  depth: number;
  seen: Set<string>;
  isStart?: boolean;
}) {
  if (seen.has(id)) {
    // Ancestor cycle — should never happen with well-formed data, but bail
    // out with a tiny placeholder so the page still renders.
    return (
      <div className="text-[11px] uppercase tracking-[0.18em] text-white/30">
        ↻ cycle to {id}
      </div>
    );
  }
  const node = algo.nodes[id];
  if (!node) {
    return (
      <div className="text-[11px] uppercase tracking-[0.18em] text-rose-300/60">
        Missing node · {id}
      </div>
    );
  }
  const nextSeen = new Set(seen);
  nextSeen.add(id);

  if (node.kind === "outcome") {
    return <OutcomeBlock node={node} />;
  }
  return (
    <DecisionBlock
      node={node}
      algo={algo}
      depth={depth}
      seen={nextSeen}
      isStart={isStart}
    />
  );
}

function DecisionBlock({
  node,
  algo,
  depth,
  seen,
  isStart,
}: {
  node: DecisionNode;
  algo: Algorithm;
  depth: number;
  seen: Set<string>;
  isStart: boolean;
}) {
  // Only the correct branches are part of the algorithm — wrong distractors
  // were a relic of the old game mode.
  const correctOptions = node.options.filter((o) => o.isCorrect);

  return (
    <motion.section
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: Math.min(depth * 0.04, 0.2) }}
      className="relative"
    >
      {/* Decision card */}
      <div className="rounded-2xl border border-cyan-300/20 bg-cyan-400/[0.04] px-4 sm:px-5 py-3.5">
        <div className="text-[10px] uppercase tracking-[0.22em] text-cyan-300/85 mb-1.5 flex items-center gap-1.5">
          <GitFork className="h-3 w-3" />
          {isStart ? "Start · Decision" : "Decision"}
        </div>
        <div className="text-[15px] sm:text-base font-semibold leading-snug text-white">
          {node.prompt}
        </div>
        {node.context && (
          <p className="mt-1.5 text-[12px] sm:text-[13px] text-white/65 leading-relaxed">
            {node.context}
          </p>
        )}
      </div>

      {/* Branches */}
      <ul className="mt-3 space-y-4 sm:space-y-5">
        {correctOptions.map((opt, i) => (
          <li
            key={`${opt.label}-${i}`}
            className="relative pl-5 sm:pl-6 border-l-2 border-cyan-400/25"
          >
            {/* Connector tick */}
            <span
              aria-hidden
              className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-cyan-400 ring-4 ring-cyan-400/15"
            />

            <div className="text-[13px] sm:text-[14px] font-medium text-white/90 leading-snug">
              {opt.label}
            </div>

            {opt.next ? (
              <div className="mt-3">
                <NodeBlock
                  id={opt.next}
                  algo={algo}
                  depth={depth + 1}
                  seen={seen}
                />
              </div>
            ) : (
              <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-white/30">
                · end of branch
              </div>
            )}
          </li>
        ))}
      </ul>
    </motion.section>
  );
}

function OutcomeBlock({ node }: { node: OutcomeNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="rounded-2xl border border-emerald-400/35 bg-emerald-500/[0.07] px-4 sm:px-5 py-3.5"
    >
      <div className="text-[10px] uppercase tracking-[0.22em] text-emerald-300/90 mb-1.5 flex items-center gap-1.5">
        <CheckCircle2 className="h-3 w-3" />
        Outcome
      </div>
      <div className="text-[15px] sm:text-base font-semibold leading-snug text-white">
        {node.title}
      </div>
      {node.detail && (
        <p className="mt-1.5 text-[12px] sm:text-[13px] text-white/75 leading-relaxed">
          {node.detail}
        </p>
      )}
      {node.pearls && node.pearls.length > 0 && (
        <ul className="mt-3 space-y-1.5 border-t border-white/5 pt-3">
          {node.pearls.map((p) => (
            <li
              key={p}
              className="flex gap-2 text-[12px] sm:text-[13px] text-white/80 leading-relaxed"
            >
              <Sparkles className="h-3 w-3 text-emerald-300 shrink-0 mt-1" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

// Tiny compile-time check — keeps AlgoNode imported so future variant types
// can't silently break this file.
type _NodeKinds = AlgoNode["kind"];
