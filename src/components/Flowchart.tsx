"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Sparkles,
} from "lucide-react";
import type { Algorithm, AlgoNode, DecisionNode } from "@/data/algorithms";

const NODE_W = 296;
const NODE_MIN_H = 96;
const H_GAP = 36;
const V_GAP = 96;

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
// Layout — left-aligned vertical tree, breadth-balanced by subtree size.
// --------------------------------------------------------------------------

function estimateHeight(node: AlgoNode): number {
  if (node.kind === "outcome") {
    const titleLines = Math.ceil(node.title.length / 28);
    const detailLines = node.detail ? Math.ceil(node.detail.length / 36) : 0;
    return 56 + titleLines * 22 + detailLines * 16;
  }
  const promptLines = Math.ceil(node.prompt.length / 28);
  const optionsLines = node.options.reduce(
    (sum, o) => sum + Math.max(1, Math.ceil(o.label.length / 30)) * 18,
    0,
  );
  return 56 + promptLines * 20 + optionsLines + node.options.length * 6;
}

function computeLayout(algo: Algorithm) {
  const layouts = new Map<string, Layout>();
  const edges: EdgeInfo[] = [];
  const visited = new Set<string>();

  const heights = new Map<string, number>();
  for (const id of Object.keys(algo.nodes)) {
    heights.set(id, Math.max(NODE_MIN_H, estimateHeight(algo.nodes[id])));
  }

  // Width of each subtree (so siblings don't overlap).
  const widthCache = new Map<string, number>();
  function subtreeWidth(id: string, seen: Set<string> = new Set()): number {
    if (widthCache.has(id)) return widthCache.get(id)!;
    if (seen.has(id)) return NODE_W;
    seen.add(id);
    const node = algo.nodes[id];
    if (node.kind === "outcome") {
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

  // Vertical level = longest-path-from-root, so a node always sits below
  // every ancestor (handles diamond joins gracefully).
  const levels = new Map<string, number>();
  function computeLevel(id: string, lv: number, seen: Set<string>): void {
    if (seen.has(id)) return;
    const cur = levels.get(id) ?? -1;
    if (lv <= cur) return;
    levels.set(id, lv);
    const node = algo.nodes[id];
    if (node.kind === "decision") {
      for (const o of node.options) {
        if (o.isCorrect && o.next) {
          computeLevel(o.next, lv + 1, new Set([...seen, id]));
        }
      }
    }
  }
  computeLevel(algo.start, 0, new Set());

  // Each level gets a Y coord based on the tallest node it contains.
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
    const w = subtreeWidth(id);
    const h = heights.get(id) ?? NODE_MIN_H;
    const lv = levels.get(id) ?? 0;
    const nodeY = levelY.get(lv) ?? 0;
    const nodeX = x + (w - NODE_W) / 2;

    layouts.set(id, { id, x: nodeX, y: nodeY, width: NODE_W, height: h, node });

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
// Flowchart
// --------------------------------------------------------------------------

export default function Flowchart({ algo }: { algo: Algorithm }) {
  const { layouts, edges, width, height } = useMemo(
    () => computeLayout(algo),
    [algo],
  );
  const [zoom, setZoom] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Smart fit: pick the larger of "fit-to-width" and "fit-to-height" so the
  // root is always visible without scroll on first paint.
  useEffect(() => {
    if (!containerRef.current) return;
    const cw = containerRef.current.clientWidth - 48;
    const ch = containerRef.current.clientHeight - 48;
    const fitW = cw / (width + 40);
    const fitH = ch / (height + 40);
    const z = Math.max(0.45, Math.min(1, Math.min(fitW, fitH) * 0.95));
    setZoom(z);
  }, [width, height]);

  const selected = selectedId ? algo.nodes[selectedId] : null;

  const refit = () => {
    if (!containerRef.current) return;
    const cw = containerRef.current.clientWidth - 48;
    const ch = containerRef.current.clientHeight - 48;
    const fitW = cw / (width + 40);
    const fitH = ch / (height + 40);
    const z = Math.max(0.45, Math.min(1, Math.min(fitW, fitH) * 0.95));
    setZoom(z);
    containerRef.current.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <div className="relative h-full w-full">
      {/* Controls */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5">
        <IconButton onClick={() => setZoom((z) => Math.min(2, z + 0.15))} title="Zoom in">
          <ZoomIn className="h-4 w-4" />
        </IconButton>
        <IconButton onClick={() => setZoom((z) => Math.max(0.3, z - 0.15))} title="Zoom out">
          <ZoomOut className="h-4 w-4" />
        </IconButton>
        <IconButton onClick={refit} title="Fit to screen">
          <Maximize2 className="h-4 w-4" />
        </IconButton>
      </div>

      {/* Legend + zoom level */}
      <div className="absolute top-4 left-4 z-20 glass-strong rounded-xl px-3 py-2 flex items-center gap-4 text-[10px] uppercase tracking-[0.18em] text-white/60">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-sm border border-cyan-300/60 bg-cyan-400/10" />
          Decision
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Outcome
        </span>
        <span className="text-white/35">·</span>
        <span className="text-white/45 normal-case tracking-normal text-[11px] tabular-nums">
          {Math.round(zoom * 100)}%
        </span>
      </div>

      {/* Scroll/pan container */}
      <div
        ref={containerRef}
        className="h-full w-full overflow-auto scrollbar-thin"
        style={{ touchAction: "pan-x pan-y pinch-zoom" }}
      >
        <div
          className="relative origin-top-left transition-transform"
          style={{
            width: width + 80,
            height: height + 80,
            transform: `scale(${zoom})`,
            transformOrigin: "20px 20px",
          }}
        >
          <div
            style={{
              paddingLeft: 20,
              paddingTop: 20,
              width,
              height,
              position: "relative",
            }}
          >
            {/* Edges */}
            <svg
              className="pointer-events-none absolute inset-0"
              width={width}
              height={height}
              style={{ overflow: "visible" }}
            >
              <defs>
                <marker
                  id="arrow"
                  viewBox="0 0 10 10"
                  refX="9"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,255,255,0.4)" />
                </marker>
              </defs>
              {edges.map((edge, i) => {
                const from = layouts.get(edge.fromId);
                const to = layouts.get(edge.toId);
                if (!from || !to) return null;
                const x1 = from.x + from.width / 2;
                const y1 = from.y + from.height;
                const x2 = to.x + to.width / 2;
                const y2 = to.y;
                const midY = (y1 + y2) / 2;
                const path = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;
                return (
                  <path
                    key={`${edge.fromId}-${edge.toId}-${i}`}
                    d={path}
                    fill="none"
                    stroke="rgba(255,255,255,0.28)"
                    strokeWidth="1.6"
                    markerEnd="url(#arrow)"
                  />
                );
              })}
            </svg>

            {/* Nodes */}
            {Array.from(layouts.values()).map((l) => (
              <NodeCard
                key={l.id}
                layout={l}
                selected={selectedId === l.id}
                onClick={() =>
                  setSelectedId((id) => (id === l.id ? null : l.id))
                }
              />
            ))}
          </div>
        </div>
      </div>

      {/* Detail panel — fixed bottom-center for both decision + outcome nodes */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 glass-strong rounded-2xl px-5 py-4 max-w-2xl w-[calc(100%-2rem)]"
          >
            <div className="flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <div className="text-[10px] uppercase tracking-[0.22em] mb-1.5 flex items-center gap-1.5">
                  {selected.kind === "outcome" ? (
                    <span className="text-emerald-300">Outcome</span>
                  ) : (
                    <span className="text-cyan-300">Decision</span>
                  )}
                </div>
                <div className="text-sm md:text-base font-semibold leading-snug">
                  {selected.kind === "outcome"
                    ? selected.title
                    : selected.prompt}
                </div>
                {selected.kind === "outcome" && selected.detail && (
                  <p className="mt-2 text-xs md:text-sm text-white/70 leading-relaxed">
                    {selected.detail}
                  </p>
                )}
                {selected.kind === "outcome" &&
                  selected.pearls &&
                  selected.pearls.length > 0 && (
                    <ul className="mt-3 space-y-1.5">
                      {selected.pearls.map((p) => (
                        <li
                          key={p}
                          className="text-xs md:text-sm text-white/75 flex gap-2 leading-relaxed"
                        >
                          <Sparkles className="h-3 w-3 text-cyan-300 shrink-0 mt-0.5" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                {selected.kind === "decision" && selected.context && (
                  <p className="mt-2 text-xs md:text-sm text-white/65 leading-relaxed">
                    {selected.context}
                  </p>
                )}
                {selected.kind === "decision" && (
                  <div className="mt-3 space-y-1.5 border-t border-white/5 pt-3">
                    {selected.options
                      .filter((o) => o.isCorrect)
                      .map((o) => (
                        <div
                          key={o.label}
                          className="text-xs leading-snug flex gap-2 text-white/85"
                        >
                          <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                          <span className="flex-1 font-medium">{o.label}</span>
                        </div>
                      ))}
                  </div>
                )}
              </div>
              <button
                onClick={() => setSelectedId(null)}
                className="rounded-full p-1.5 hover:bg-white/10 transition shrink-0"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pan hint for wide algorithms */}
      {width > 1100 && !selectedId && (
        <div className="absolute bottom-4 right-4 z-10 text-[10px] uppercase tracking-[0.18em] text-white/30 hidden md:block">
          Scroll to pan · pinch to zoom
        </div>
      )}
    </div>
  );
}

// --------------------------------------------------------------------------
// Node card
// --------------------------------------------------------------------------

function NodeCard({
  layout,
  selected,
  onClick,
}: {
  layout: Layout;
  selected: boolean;
  onClick: () => void;
}) {
  const { node } = layout;
  const isOutcome = node.kind === "outcome";
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: Math.min((layout.y / 1000) * 0.3, 0.4) }}
      className={`absolute text-left rounded-2xl backdrop-blur-md transition cursor-pointer overflow-hidden ${
        isOutcome
          ? "border border-emerald-400/35 bg-emerald-500/[0.07] hover:border-emerald-300/60 hover:bg-emerald-400/[0.10]"
          : "border border-white/15 bg-white/[0.04] hover:border-cyan-300/45 hover:bg-cyan-400/[0.04]"
      } ${selected ? "ring-2 ring-cyan-300/55 shadow-[0_0_30px_rgba(103,232,249,0.18)]" : ""}`}
      style={{
        left: layout.x,
        top: layout.y,
        width: layout.width,
        minHeight: layout.height,
        padding: "14px 16px",
      }}
    >
      {isOutcome ? <OutcomeCard node={node} /> : <DecisionCard node={node} />}
    </motion.button>
  );
}

function DecisionCard({ node }: { node: DecisionNode }) {
  // Only show the correct paths — wrong distractor options were a relic of
  // the old game-mode UI and just made the cards look like multiple-choice
  // questions instead of a clinical algorithm.
  const correctOptions = node.options.filter((o) => o.isCorrect);
  return (
    <>
      <div className="text-[10px] uppercase tracking-[0.18em] text-cyan-300/85 mb-1.5 flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-sm bg-cyan-400" />
        Decision
      </div>
      <div className="text-[13px] font-semibold leading-snug mb-2.5 text-white">
        {node.prompt}
      </div>
      <ul className="space-y-1.5 mt-2">
        {correctOptions.map((opt) => (
          <li
            key={opt.label}
            className="flex items-start gap-1.5 text-[11px] leading-snug text-white/85"
          >
            <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400/80" />
            <span>{opt.label}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

function OutcomeCard({ node }: { node: Exclude<AlgoNode, DecisionNode> }) {
  return (
    <>
      <div className="text-[10px] uppercase tracking-[0.18em] text-emerald-300/90 mb-1.5 flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        Outcome
      </div>
      <div className="text-[13px] font-semibold leading-snug text-white">{node.title}</div>
      {node.detail && (
        <p className="mt-1.5 text-[11px] text-white/65 leading-snug line-clamp-3">
          {node.detail}
        </p>
      )}
      {node.pearls && node.pearls.length > 0 && (
        <div className="mt-2 text-[10px] uppercase tracking-[0.18em] text-emerald-300/65 flex items-center gap-1.5">
          <Sparkles className="h-2.5 w-2.5" />
          {node.pearls.length} pearl{node.pearls.length === 1 ? "" : "s"}
        </div>
      )}
    </>
  );
}

// --------------------------------------------------------------------------
// Small util
// --------------------------------------------------------------------------

function IconButton({
  children,
  onClick,
  title,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      aria-label={title}
      className="glass-strong rounded-full p-2 hover:bg-white/10 transition"
    >
      {children}
    </button>
  );
}
