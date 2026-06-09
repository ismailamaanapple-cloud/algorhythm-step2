"use client";

/**
 * AlgorithmWalkthrough — guided, one-step-at-a-time clinical walkthrough.
 *
 * The user navigates the algorithm by tapping the correct next step on each
 * decision card. We track the visited path as a stack so Back / Restart are
 * trivial, and we render exactly one node at a time with a horizontal slide
 * transition (forward = slide left, back = slide right) so the motion
 * reinforces the direction of travel.
 *
 * Progress is shown as discrete dots for short algorithms (≤ 10 max-depth)
 * and as a filled bar for longer ones. The "total" is the longest remaining
 * path from the current node — an estimate, not a guarantee — so we render
 * it as "~N" to avoid implying a fixed length.
 *
 * Keyboard: ← / Backspace = back, 1–9 = pick that option, R = restart.
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  GitFork,
  Trophy,
} from "lucide-react";
import type {
  Algorithm,
  AlgoNode,
  DecisionNode,
  OutcomeNode,
  Option,
} from "@/data/algorithms";

type Step = {
  nodeId: string;
  /** The option label that brought us TO this node (undefined on the start node). */
  pickedLabel?: string;
};

export default function AlgorithmWalkthrough({ algo }: { algo: Algorithm }) {
  const [stack, setStack] = useState<Step[]>([{ nodeId: algo.start }]);
  const [direction, setDirection] = useState<1 | -1>(1);

  const currentStep = stack[stack.length - 1];
  const currentNode = algo.nodes[currentStep.nodeId];

  // Estimate remaining depth so we can render meaningful progress.
  const longestRemaining = useMemo(
    () => longestPathFrom(algo, currentStep.nodeId),
    [algo, currentStep.nodeId],
  );
  const totalEstimate = stack.length - 1 + longestRemaining;

  const advance = useCallback(
    (opt: Option) => {
      if (!opt.next) return;
      setDirection(1);
      setStack((prev) => [
        ...prev,
        { nodeId: opt.next as string, pickedLabel: opt.label },
      ]);
    },
    [],
  );

  const back = useCallback(() => {
    setStack((prev) => {
      if (prev.length <= 1) return prev;
      setDirection(-1);
      return prev.slice(0, -1);
    });
  }, []);

  const restart = useCallback(() => {
    setDirection(-1);
    setStack([{ nodeId: algo.start }]);
  }, [algo.start]);

  // Keyboard nav
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (e.key === "ArrowLeft" || e.key === "Backspace") {
        e.preventDefault();
        back();
        return;
      }
      if (e.key === "r" || e.key === "R") {
        restart();
        return;
      }
      // Number keys to pick an option.
      const n = parseInt(e.key, 10);
      if (
        !Number.isNaN(n) &&
        n >= 1 &&
        n <= 9 &&
        currentNode?.kind === "decision"
      ) {
        const opts = currentNode.options.filter((o) => o.isCorrect && o.next);
        const opt = opts[n - 1];
        if (opt) advance(opt);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance, back, restart, currentNode]);

  if (!currentNode) {
    return (
      <div className="text-sm text-rose-300/80">
        Algorithm node missing: {currentStep.nodeId}
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Progress header */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <Progress current={stack.length} total={Math.max(totalEstimate, 1)} />
        <div className="text-[10px] uppercase tracking-[0.22em] text-white/45 tabular-nums shrink-0">
          {currentNode.kind === "outcome" ? (
            <span className="inline-flex items-center gap-1.5 text-emerald-300/90">
              <Trophy className="h-3 w-3" />
              Done
            </span>
          ) : (
            <>
              Step {stack.length}
              {totalEstimate > stack.length ? ` of ~${totalEstimate}` : ""}
            </>
          )}
        </div>
      </div>

      {/* Card stage — popLayout so exiting card doesn't push layout. */}
      <div className="relative">
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.div
            key={`${currentStep.nodeId}-${stack.length}`}
            custom={direction}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            {currentNode.kind === "decision" ? (
              <DecisionCard node={currentNode} onPick={advance} />
            ) : (
              <OutcomeCard node={currentNode} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Path breadcrumb */}
      {stack.length > 1 && (
        <PathBreadcrumb stack={stack} algo={algo} />
      )}

      {/* Footer controls */}
      <div className="mt-5 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={back}
          disabled={stack.length <= 1}
          className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-sm text-white/75 hover:text-white hover:bg-white/[0.06] hover:border-white/20 transition disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="hidden sm:flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-white/30">
          <span>
            <kbd className="rounded bg-white/5 px-1.5 py-0.5 text-white/55">←</kbd>{" "}
            back
          </span>
          {currentNode.kind === "decision" && (
            <span>
              <kbd className="rounded bg-white/5 px-1.5 py-0.5 text-white/55">
                1–9
              </kbd>{" "}
              pick
            </span>
          )}
          <span>
            <kbd className="rounded bg-white/5 px-1.5 py-0.5 text-white/55">R</kbd>{" "}
            restart
          </span>
        </div>

        <button
          type="button"
          onClick={restart}
          className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-sm text-white/75 hover:text-white hover:bg-white/[0.06] hover:border-white/20 transition"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Restart
        </button>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// Cards
// --------------------------------------------------------------------------

function DecisionCard({
  node,
  onPick,
}: {
  node: DecisionNode;
  onPick: (opt: Option) => void;
}) {
  const opts = node.options.filter((o) => o.isCorrect);

  return (
    <div className="glass-strong rounded-3xl border border-cyan-300/15 px-5 sm:px-8 py-6 sm:py-8 shadow-[0_0_60px_-20px_rgba(103,232,249,0.18)]">
      <div className="text-[11px] uppercase tracking-[0.22em] text-cyan-300/90 mb-3 flex items-center gap-2">
        <GitFork className="h-3 w-3" />
        Decision
      </div>
      <h2 className="text-lg sm:text-2xl font-semibold leading-snug tracking-tight text-white">
        {node.prompt}
      </h2>
      {node.context && (
        <p className="mt-3 text-sm sm:text-[15px] text-white/65 leading-relaxed">
          {node.context}
        </p>
      )}

      <div className="mt-5 sm:mt-6 space-y-2.5">
        {opts.map((o, i) => {
          const disabled = !o.next;
          return (
            <button
              key={`${o.label}-${i}`}
              type="button"
              onClick={() => onPick(o)}
              disabled={disabled}
              className={`group w-full text-left rounded-2xl border px-4 sm:px-5 py-3.5 sm:py-4 flex items-center justify-between gap-3 transition ${
                disabled
                  ? "border-white/5 bg-white/[0.02] text-white/40 cursor-not-allowed"
                  : "border-white/10 bg-white/[0.035] hover:border-cyan-300/55 hover:bg-cyan-400/[0.07] active:scale-[0.99]"
              }`}
            >
              <span className="flex items-start gap-3 min-w-0">
                <span
                  className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[11px] font-semibold tabular-nums ${
                    disabled
                      ? "bg-white/5 text-white/30"
                      : "bg-cyan-400/15 text-cyan-200 group-hover:bg-cyan-400/25"
                  }`}
                >
                  {i + 1}
                </span>
                <span className="text-sm sm:text-[15px] font-medium leading-snug text-white/95">
                  {o.label}
                </span>
              </span>
              <ChevronRight
                className={`h-4 w-4 shrink-0 transition ${
                  disabled
                    ? "text-white/15"
                    : "text-cyan-300/60 group-hover:text-cyan-200 group-hover:translate-x-0.5"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function OutcomeCard({ node }: { node: OutcomeNode }) {
  return (
    <div className="rounded-3xl border border-emerald-400/35 bg-emerald-500/[0.08] px-5 sm:px-8 py-6 sm:py-8 shadow-[0_0_60px_-20px_rgba(52,211,153,0.25)]">
      <div className="text-[11px] uppercase tracking-[0.22em] text-emerald-300 mb-3 flex items-center gap-2">
        <CheckCircle2 className="h-3.5 w-3.5" />
        Outcome
      </div>
      <h2 className="text-lg sm:text-2xl font-semibold leading-snug tracking-tight text-white">
        {node.title}
      </h2>
      {node.detail && (
        <p className="mt-3 text-sm sm:text-[15px] text-white/80 leading-relaxed">
          {node.detail}
        </p>
      )}
      {node.pearls && node.pearls.length > 0 && (
        <ul className="mt-5 space-y-2.5 border-t border-white/[0.06] pt-4">
          {node.pearls.map((p) => (
            <li
              key={p}
              className="flex gap-2.5 text-sm sm:text-[15px] text-white/85 leading-relaxed"
            >
              <Sparkles className="h-3.5 w-3.5 text-emerald-300 shrink-0 mt-1" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// --------------------------------------------------------------------------
// Progress + breadcrumb
// --------------------------------------------------------------------------

function Progress({ current, total }: { current: number; total: number }) {
  // Dots for short paths, bar for longer ones — dots get unreadable past ~10.
  if (total <= 10) {
    return (
      <div className="flex items-center gap-1.5">
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i < current
                ? "w-5 bg-cyan-400"
                : "w-1.5 bg-white/15"
            }`}
          />
        ))}
      </div>
    );
  }
  const pct = Math.min(100, Math.round((current / total) * 100));
  return (
    <div className="h-1.5 flex-1 max-w-[220px] rounded-full bg-white/10 overflow-hidden">
      <motion.div
        className="h-full bg-cyan-400"
        initial={false}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

function PathBreadcrumb({
  stack,
}: {
  stack: Step[];
  algo: Algorithm;
}) {
  const items = stack.map((s, i) => (i === 0 ? "Start" : s.pickedLabel ?? ""));
  // Keep the tail visible — early choices truncate to a single ellipsis chip.
  const display =
    items.length > 4 ? ["…", ...items.slice(-3)] : items;

  return (
    <div className="mt-5 flex items-center gap-1.5 flex-wrap text-[11px] text-white/45">
      <span className="uppercase tracking-[0.2em] text-white/30 mr-1">
        Path
      </span>
      {display.map((item, i) => {
        const last = i === display.length - 1;
        return (
          <span key={i} className="inline-flex items-center gap-1.5 min-w-0">
            <span
              className={`truncate max-w-[180px] ${
                last ? "text-white/80 font-medium" : ""
              }`}
            >
              {item}
            </span>
            {!last && (
              <ChevronRight className="h-3 w-3 text-white/25 shrink-0" />
            )}
          </span>
        );
      })}
    </div>
  );
}

// --------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------

/** Longest path (in node count) from `startId` to any reachable outcome. */
function longestPathFrom(algo: Algorithm, startId: string): number {
  const cache = new Map<string, number>();

  function dfs(id: string, ancestors: Set<string>): number {
    const cached = cache.get(id);
    if (cached !== undefined) return cached;
    if (ancestors.has(id)) return 0; // cycle guard

    const node = algo.nodes[id];
    if (!node) return 1;
    if (node.kind === "outcome") {
      cache.set(id, 1);
      return 1;
    }

    const correct = node.options.filter((o) => o.isCorrect && o.next);
    if (correct.length === 0) {
      cache.set(id, 1);
      return 1;
    }

    const nextAncestors = new Set(ancestors);
    nextAncestors.add(id);
    let max = 0;
    for (const o of correct) {
      max = Math.max(max, dfs(o.next as string, nextAncestors));
    }
    const result = max + 1;
    cache.set(id, result);
    return result;
  }

  return dfs(startId, new Set());
}

const cardVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 60 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: -dir * 60 }),
};

// Compile-time fence — keeps AlgoNode imported so future variant types
// can't silently break this file.
type _NodeKinds = AlgoNode["kind"];
