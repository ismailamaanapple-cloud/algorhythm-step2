"use client";

/**
 * AlgorithmDiagram — full-bleed, AMBOSS-style clinical flowchart.
 *
 * Design goals (this is the THIRD attempt, after a pan/zoom box, a text
 * outline, and a card walkthrough — each rejected for hiding the big
 * picture, looking too plain, or feeling like a quiz):
 *   - Whole algorithm is visible at once. No card-by-card, no panning
 *     inside a fixed container.
 *   - Looks like a real diagram: gradient-bordered glass boxes, colored
 *     by node type (cyan = decision, emerald = outcome), bezier edges,
 *     and the option label rides ON the arrow as a small pill (the
 *     AMBOSS pattern).
 *   - Premium feel: gradient strokes, drop-glow on hover, staggered
 *     entrance animation.
 *   - Scales to fit the page width — never traps scroll inside a sub-
 *     container. If the natural diagram is wider than the viewport
 *     after a sensible minimum scale, only THIS section overflows-x,
 *     not the whole page.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, GitFork, Sparkles } from "lucide-react";
import type {
  Algorithm,
  AlgoNode,
  DecisionNode,
  OutcomeNode,
} from "@/data/algorithms";

const NODE_W = 280;
const NODE_MIN_H = 92;
const H_GAP = 56;
const V_GAP = 130;
const MIN_SCALE = 0.55;

type Layout = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  node: AlgoNode;
};

type EdgeInfo = {
  fromId: string;
  toId: string;
  label: string;
};

// --------------------------------------------------------------------------
// Layout — top-down tree, breadth-balanced by subtree width.
// --------------------------------------------------------------------------

function estimateHeight(node: AlgoNode): number {
  if (node.kind === "outcome") {
    const titleLines = Math.ceil(node.title.length / 26);
    const detailLines = node.detail ? Math.ceil(node.detail.length / 32) : 0;
    const pearlsLines = node.pearls?.length ?? 0;
    return 64 + titleLines * 22 + detailLines * 16 + pearlsLines * 10;
  }
  const promptLines = Math.ceil(node.prompt.length / 24);
  const contextLines = node.context
    ? Math.ceil(node.context.length / 32)
    : 0;
  return 64 + promptLines * 22 + contextLines * 16;
}

function computeLayout(algo: Algorithm) {
  const layouts = new Map<string, Layout>();
  const edges: EdgeInfo[] = [];
  const visited = new Set<string>();

  const heights = new Map<string, number>();
  for (const id of Object.keys(algo.nodes)) {
    heights.set(id, Math.max(NODE_MIN_H, estimateHeight(algo.nodes[id])));
  }

  // Subtree width (children of a decision are placed side-by-side).
  const widthCache = new Map<string, number>();
  function subtreeWidth(id: string, seen: Set<string> = new Set()): number {
    if (widthCache.has(id)) return widthCache.get(id)!;
    if (seen.has(id)) return NODE_W;
    seen.add(id);
    const node = algo.nodes[id];
    if (!node || node.kind === "outcome") {
      widthCache.set(id, NODE_W);
      return NODE_W;
    }
    const children = node.options
      .filter((o) => o.isCorrect && o.next)
      .map((o) => o.next!);
    if (children.length === 0) {
      widthCache.set(id, NODE_W);
      return NODE_W;
    }
    let total = 0;
    for (const c of children) total += subtreeWidth(c, new Set(seen));
    total += (children.length - 1) * H_GAP;
    const w = Math.max(NODE_W, total);
    widthCache.set(id, w);
    return w;
  }

  // Longest-path-from-root level — a node always sits below every ancestor.
  const levels = new Map<string, number>();
  function computeLevel(id: string, lv: number, seen: Set<string>): void {
    if (seen.has(id)) return;
    const cur = levels.get(id) ?? -1;
    if (lv <= cur) return;
    levels.set(id, lv);
    const node = algo.nodes[id];
    if (node?.kind === "decision") {
      for (const o of node.options) {
        if (o.isCorrect && o.next) {
          computeLevel(o.next, lv + 1, new Set([...seen, id]));
        }
      }
    }
  }
  computeLevel(algo.start, 0, new Set());

  const levelHeights = new Map<number, number>();
  for (const [id, lv] of levels) {
    const h = heights.get(id) ?? NODE_MIN_H;
    levelHeights.set(lv, Math.max(levelHeights.get(lv) ?? 0, h));
  }
  const maxLevel = Math.max(0, ...Array.from(levels.values()));
  const levelY = new Map<number, number>();
  let y = 0;
  for (let lv = 0; lv <= maxLevel; lv++) {
    levelY.set(lv, y);
    y += (levelHeights.get(lv) ?? NODE_MIN_H) + V_GAP;
  }

  function position(id: string, x: number): number {
    if (visited.has(id)) {
      const existing = layouts.get(id);
      return existing ? existing.x + existing.width : x;
    }
    visited.add(id);
    const node = algo.nodes[id];
    if (!node) return x + NODE_W;
    const w = subtreeWidth(id);
    const h = heights.get(id) ?? NODE_MIN_H;
    const lv = levels.get(id) ?? 0;
    const nodeY = levelY.get(lv) ?? 0;
    const nodeX = x + (w - NODE_W) / 2;

    layouts.set(id, {
      id,
      x: nodeX,
      y: nodeY,
      width: NODE_W,
      height: h,
      node,
    });

    if (node.kind === "decision") {
      const correctOpts = node.options.filter((o) => o.isCorrect && o.next);
      let childX = x;
      for (const o of correctOpts) {
        const childId = o.next!;
        const childW = subtreeWidth(childId);
        if (!visited.has(childId)) position(childId, childX);
        edges.push({ fromId: id, toId: childId, label: o.label });
        childX += childW + H_GAP;
      }
    }
    return x + w;
  }
  position(algo.start, 0);

  let maxX = 0;
  let maxY = 0;
  for (const l of layouts.values()) {
    maxX = Math.max(maxX, l.x + l.width);
    maxY = Math.max(maxY, l.y + l.height);
  }
  return { layouts, edges, width: maxX, height: maxY };
}

// --------------------------------------------------------------------------
// Diagram
// --------------------------------------------------------------------------

export default function AlgorithmDiagram({ algo }: { algo: Algorithm }) {
  const { layouts, edges, width, height } = useMemo(
    () => computeLayout(algo),
    [algo],
  );
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Fit-to-width on mount + resize. Capped at 1.0 (never enlarge), floored
  // at MIN_SCALE so text stays readable on mobile; below that we let the
  // section scroll horizontally.
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    function update() {
      if (!wrapper) return;
      const w = wrapper.clientWidth;
      // 32px of internal padding on each side.
      const target = Math.max(1, w - 32);
      const s = Math.min(1, target / width);
      setScale(Math.max(MIN_SCALE, s));
    }
    update();
    const ro = new ResizeObserver(update);
    ro.observe(wrapper);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [width]);

  const scaledWidth = width * scale;
  const scaledHeight = height * scale;
  // If our minimum scale still overflows, allow this section to scroll
  // horizontally (NOT a pan-zoom container — just normal x overflow).
  const needsXScroll =
    wrapperRef.current && scaledWidth > wrapperRef.current.clientWidth - 32;

  return (
    <div
      ref={wrapperRef}
      className={`relative ${needsXScroll ? "overflow-x-auto scrollbar-thin" : ""}`}
    >
      <div
        className="relative mx-auto"
        style={{
          width: scaledWidth + 32,
          height: scaledHeight + 32,
        }}
      >
        <div
          className="relative origin-top-left"
          style={{
            width,
            height,
            transform: `scale(${scale})`,
            padding: 16,
          }}
        >
          <DiagramSvgDefs />

          {/* Edges */}
          <svg
            className="pointer-events-none absolute inset-0"
            width={width + 32}
            height={height + 32}
            style={{ overflow: "visible" }}
          >
            <defs>
              <linearGradient id="edgeStroke" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(103,232,249,0.55)" />
                <stop offset="100%" stopColor="rgba(167,139,250,0.45)" />
              </linearGradient>
              <marker
                id="edgeArrow"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(167,139,250,0.75)" />
              </marker>
            </defs>
            {edges.map((edge, i) => {
              const from = layouts.get(edge.fromId);
              const to = layouts.get(edge.toId);
              if (!from || !to) return null;
              const x1 = from.x + from.width / 2 + 16;
              const y1 = from.y + from.height + 16;
              const x2 = to.x + to.width / 2 + 16;
              const y2 = to.y + 16;
              const midY = (y1 + y2) / 2;
              const path = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;
              return (
                <motion.path
                  key={`${edge.fromId}-${edge.toId}-${i}`}
                  d={path}
                  fill="none"
                  stroke="url(#edgeStroke)"
                  strokeWidth="2"
                  markerEnd="url(#edgeArrow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1 + (from.y / 1000) * 0.25,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              );
            })}
          </svg>

          {/* Edge labels — option text rides on the arrow as a glass pill */}
          {edges.map((edge, i) => {
            const from = layouts.get(edge.fromId);
            const to = layouts.get(edge.toId);
            if (!from || !to) return null;
            const x1 = from.x + from.width / 2 + 16;
            const y1 = from.y + from.height + 16;
            const x2 = to.x + to.width / 2 + 16;
            const y2 = to.y + 16;
            const midX = (x1 + x2) / 2;
            const midY = (y1 + y2) / 2;
            return (
              <motion.div
                key={`label-${edge.fromId}-${edge.toId}-${i}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: 0.35 + (from.y / 1000) * 0.25,
                }}
                className="absolute glass-strong rounded-full border border-cyan-300/25 px-3 py-1 text-[11px] font-medium text-cyan-100/95 shadow-[0_8px_30px_-10px_rgba(103,232,249,0.4)] whitespace-nowrap max-w-[240px] truncate"
                style={{
                  left: midX,
                  top: midY,
                  transform: "translate(-50%, -50%)",
                }}
                title={edge.label}
              >
                {edge.label}
              </motion.div>
            );
          })}

          {/* Nodes */}
          {Array.from(layouts.values()).map((l) => (
            <NodeCard key={l.id} layout={l} />
          ))}
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// Node cards
// --------------------------------------------------------------------------

function NodeCard({ layout }: { layout: Layout }) {
  const { node } = layout;
  const isOutcome = node.kind === "outcome";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.45,
        delay: Math.min(0.05 + (layout.y / 1000) * 0.35, 0.6),
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
      className="absolute"
      style={{
        left: layout.x + 16,
        top: layout.y + 16,
        width: layout.width,
        minHeight: layout.height,
      }}
    >
      {/* Gradient border via padded backdrop */}
      <div
        className={`relative rounded-2xl p-[1.5px] bg-gradient-to-br ${
          isOutcome
            ? "from-emerald-300/60 via-teal-400/30 to-emerald-500/50"
            : "from-cyan-300/60 via-violet-400/30 to-cyan-500/50"
        } shadow-[0_12px_50px_-12px_rgba(124,92,255,0.35)]`}
      >
        {/* Soft glow halo */}
        <div
          aria-hidden
          className={`absolute -inset-3 rounded-3xl blur-2xl opacity-50 pointer-events-none -z-10 ${
            isOutcome
              ? "bg-emerald-400/15"
              : "bg-cyan-400/15"
          }`}
        />

        <div className="relative rounded-2xl bg-[#0b0b18]/85 backdrop-blur-xl px-4 py-3.5 h-full">
          {isOutcome ? (
            <OutcomeBody node={node} />
          ) : (
            <DecisionBody node={node} />
          )}
        </div>
      </div>
    </motion.div>
  );
}

function DecisionBody({ node }: { node: DecisionNode }) {
  return (
    <>
      <div className="text-[10px] uppercase tracking-[0.22em] text-cyan-300/85 mb-2 flex items-center gap-1.5">
        <GitFork className="h-3 w-3" />
        Decision
      </div>
      <div className="text-[13px] font-semibold leading-snug text-white">
        {node.prompt}
      </div>
      {node.context && (
        <p className="mt-2 text-[11px] text-white/60 leading-relaxed line-clamp-3">
          {node.context}
        </p>
      )}
    </>
  );
}

function OutcomeBody({ node }: { node: OutcomeNode }) {
  return (
    <>
      <div className="text-[10px] uppercase tracking-[0.22em] text-emerald-300/90 mb-2 flex items-center gap-1.5">
        <CheckCircle2 className="h-3 w-3" />
        Outcome
      </div>
      <div className="text-[13px] font-semibold leading-snug text-white">
        {node.title}
      </div>
      {node.detail && (
        <p className="mt-1.5 text-[11px] text-white/65 leading-snug line-clamp-3">
          {node.detail}
        </p>
      )}
      {node.pearls && node.pearls.length > 0 && (
        <div className="mt-2 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-emerald-300/65">
          <Sparkles className="h-2.5 w-2.5" />
          {node.pearls.length} pearl{node.pearls.length === 1 ? "" : "s"}
        </div>
      )}
    </>
  );
}

// --------------------------------------------------------------------------
// Reserved for future SVG-only effects (filters / patterns) — empty for now.
// --------------------------------------------------------------------------
function DiagramSvgDefs() {
  return null;
}

// Compile-time fence so node-type variants must update this file.
type _NodeKinds = AlgoNode["kind"];
