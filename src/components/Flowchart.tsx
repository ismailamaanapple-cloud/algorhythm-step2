"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import type { Algorithm, AlgoNode, DecisionNode } from "@/data/algorithms";
import { CATEGORY_META } from "@/data/algorithms";

const NODE_W = 280;
const NODE_MIN_H = 110;
const H_GAP = 32;
const V_GAP = 100;

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
  isHighlight: boolean;
};

function estimateHeight(node: AlgoNode): number {
  if (node.kind === "outcome") {
    const titleLen = node.title.length;
    const detailLen = node.detail?.length ?? 0;
    return 80 + Math.ceil(titleLen / 30) * 22 + Math.ceil(detailLen / 40) * 18;
  }
  const promptLen = node.prompt.length;
  const opts = node.options;
  const optionsHeight = opts.reduce((sum, o) => sum + 28 + Math.ceil(o.label.length / 36) * 18, 0);
  return 60 + Math.ceil(promptLen / 28) * 22 + optionsHeight;
}

function computeLayout(algo: Algorithm): {
  layouts: Map<string, Layout>;
  edges: EdgeInfo[];
  width: number;
  height: number;
} {
  const layouts = new Map<string, Layout>();
  const edges: EdgeInfo[] = [];
  const visited = new Set<string>();
  const heights = new Map<string, number>();

  // Pre-compute heights for each node
  for (const id of Object.keys(algo.nodes)) {
    heights.set(id, Math.max(NODE_MIN_H, estimateHeight(algo.nodes[id])));
  }

  // Compute subtree width recursively
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
    const correctChildren = node.options
      .filter((o) => o.isCorrect && o.next)
      .map((o) => o.next!);
    if (correctChildren.length === 0) {
      widthCache.set(id, NODE_W);
      return NODE_W;
    }
    let total = 0;
    for (const c of correctChildren) {
      total += subtreeWidth(c, new Set(seen));
    }
    total += (correctChildren.length - 1) * H_GAP;
    const w = Math.max(NODE_W, total);
    widthCache.set(id, w);
    return w;
  }

  // Compute level (longest path from root) for vertical layout
  const levels = new Map<string, number>();
  function computeLevel(id: string, level: number, seen: Set<string>): void {
    if (seen.has(id)) return;
    const current = levels.get(id) ?? -1;
    if (level <= current) return;
    levels.set(id, level);
    const node = algo.nodes[id];
    if (node.kind === "decision") {
      for (const o of node.options) {
        if (o.isCorrect && o.next) {
          computeLevel(o.next, level + 1, new Set([...seen, id]));
        }
      }
    }
  }
  computeLevel(algo.start, 0, new Set());

  // Compute Y for each level based on max height in that level
  const levelHeights = new Map<number, number>();
  for (const [id, lv] of levels) {
    const h = heights.get(id) ?? NODE_MIN_H;
    levelHeights.set(lv, Math.max(levelHeights.get(lv) ?? 0, h));
  }
  const levelY = new Map<number, number>();
  let y = 0;
  const maxLevel = Math.max(...levels.values());
  for (let lv = 0; lv <= maxLevel; lv++) {
    levelY.set(lv, y);
    y += (levelHeights.get(lv) ?? NODE_MIN_H) + V_GAP;
  }

  // Position recursively
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
    const myY = levelY.get(lv) ?? 0;
    const myX = x + (w - NODE_W) / 2;

    layouts.set(id, { id, x: myX, y: myY, width: NODE_W, height: h, node });

    if (node.kind === "decision") {
      const correctOpts = node.options.filter((o) => o.isCorrect && o.next);
      let childX = x;
      for (const o of correctOpts) {
        const childId = o.next!;
        const childW = subtreeWidth(childId);
        if (!visited.has(childId)) {
          position(childId, childX);
        }
        edges.push({
          fromId: id,
          toId: childId,
          label: o.label,
          isHighlight: false,
        });
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

export default function Flowchart({
  algo,
  highlightPath = [],
}: {
  algo: Algorithm;
  highlightPath?: string[];
}) {
  const meta = CATEGORY_META[algo.category];
  const { layouts, edges, width, height } = useMemo(() => computeLayout(algo), [algo]);
  const highlightSet = useMemo(() => new Set(highlightPath), [highlightPath]);
  const [zoom, setZoom] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-fit zoom on mount (small algorithms zoom in slightly)
  useEffect(() => {
    if (!containerRef.current) return;
    const cw = containerRef.current.clientWidth - 40;
    const targetZoom = Math.min(1, cw / width);
    setZoom(Math.max(0.5, targetZoom));
  }, [width]);

  const selectedNode = selectedId ? algo.nodes[selectedId] : null;

  return (
    <div className="relative h-full w-full">
      {/* Zoom controls */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5">
        <button
          onClick={() => setZoom((z) => Math.min(2, z + 0.1))}
          className="glass-strong rounded-full p-2 hover:bg-white/10 transition"
          title="Zoom in"
        >
          <ZoomIn className="h-4 w-4" />
        </button>
        <button
          onClick={() => setZoom((z) => Math.max(0.3, z - 0.1))}
          className="glass-strong rounded-full p-2 hover:bg-white/10 transition"
          title="Zoom out"
        >
          <ZoomOut className="h-4 w-4" />
        </button>
        <button
          onClick={() => {
            if (!containerRef.current) return;
            const cw = containerRef.current.clientWidth - 40;
            setZoom(Math.min(1, cw / width));
          }}
          className="glass-strong rounded-full p-2 hover:bg-white/10 transition"
          title="Fit"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>

      {/* Legend */}
      <div className="absolute top-4 left-4 z-20 glass-strong rounded-xl px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-white/60 flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-sm border border-cyan-300/60 bg-cyan-400/10" />
          Decision
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Outcome
        </div>
        {highlightPath.length > 0 && (
          <div className="flex items-center gap-1.5">
            <span className="h-0.5 w-3 bg-cyan-400" />
            Your path
          </div>
        )}
      </div>

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
          <div style={{ paddingLeft: 20, paddingTop: 20, width, height, position: "relative" }}>
            {/* SVG edges layer */}
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
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,255,255,0.35)" />
                </marker>
                <marker
                  id="arrow-active"
                  viewBox="0 0 10 10"
                  refX="9"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="rgb(103,232,249)" />
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
                const isActive = highlightSet.has(edge.fromId) && highlightSet.has(edge.toId);
                const stroke = isActive ? "rgb(103,232,249)" : "rgba(255,255,255,0.25)";
                const strokeWidth = isActive ? 2 : 1.4;
                // S-curve path
                const path = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;
                return (
                  <g key={`${edge.fromId}-${edge.toId}-${i}`}>
                    <path
                      d={path}
                      fill="none"
                      stroke={stroke}
                      strokeWidth={strokeWidth}
                      markerEnd={`url(#${isActive ? "arrow-active" : "arrow"})`}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Nodes */}
            {Array.from(layouts.values()).map((l) => {
              const isHighlight = highlightSet.has(l.id);
              const isSelected = selectedId === l.id;
              const node = l.node;
              return (
                <motion.button
                  key={l.id}
                  onClick={() => setSelectedId(isSelected ? null : l.id)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: (l.y / height) * 0.4 }}
                  className={`absolute text-left rounded-2xl backdrop-blur-md transition cursor-pointer ${
                    node.kind === "outcome"
                      ? isHighlight
                        ? "border-2 border-emerald-300/60 bg-emerald-400/8 shadow-[0_0_30px_rgba(16,185,129,0.25)]"
                        : "border border-emerald-400/30 bg-emerald-500/[0.06]"
                      : isHighlight
                      ? "border-2 border-cyan-300/60 bg-cyan-400/[0.06] shadow-[0_0_30px_rgba(0,230,195,0.25)]"
                      : "border border-white/15 bg-white/[0.04]"
                  } ${isSelected ? "ring-2 ring-white/40" : ""} hover:border-white/30`}
                  style={{
                    left: l.x,
                    top: l.y,
                    width: l.width,
                    minHeight: l.height,
                    padding: "12px 14px",
                  }}
                >
                  {node.kind === "outcome" ? (
                    <OutcomeCard node={node} />
                  ) : (
                    <DecisionCard node={node} />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detail panel */}
      {selectedNode && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 glass-strong rounded-2xl px-5 py-4 max-w-xl w-[calc(100%-2rem)]"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase tracking-[0.22em] text-white/45 mb-1">
                {selectedNode.kind === "outcome" ? "Outcome" : "Decision"}
              </div>
              <div className="text-sm font-semibold leading-snug">
                {selectedNode.kind === "outcome" ? selectedNode.title : selectedNode.prompt}
              </div>
              {selectedNode.kind === "outcome" && selectedNode.detail && (
                <p className="mt-2 text-xs text-white/65 leading-relaxed">{selectedNode.detail}</p>
              )}
              {selectedNode.kind === "outcome" && selectedNode.pearls && (
                <ul className="mt-2 space-y-1">
                  {selectedNode.pearls.map((p) => (
                    <li key={p} className="text-xs text-white/65 flex gap-1.5">
                      <span className="text-cyan-300 mt-0.5">◆</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              onClick={() => setSelectedId(null)}
              className="rounded-full p-1.5 hover:bg-white/10 transition"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Hint to scroll if large */}
      {width > 1200 && !selectedId && (
        <div className="absolute bottom-4 right-4 z-10 text-[10px] uppercase tracking-[0.18em] text-white/35 hidden md:block">
          Drag to pan · scroll to navigate
        </div>
      )}

      <span className="sr-only">
        <ChevronUp className="h-4 w-4" />
      </span>
    </div>
  );
}

function DecisionCard({ node }: { node: DecisionNode }) {
  return (
    <>
      <div className="text-[10px] uppercase tracking-[0.18em] text-cyan-300/70 mb-1.5">
        Decision
      </div>
      <div className="text-sm font-semibold leading-snug mb-2">{node.prompt}</div>
      <div className="space-y-1 mt-2">
        {node.options.map((opt) => (
          <div
            key={opt.label}
            className={`flex items-start gap-1.5 text-[11px] leading-snug ${
              opt.isCorrect ? "text-white/85" : "text-rose-300/60"
            }`}
          >
            <span
              className={`mt-0.5 inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full text-[9px] font-bold ${
                opt.isCorrect
                  ? "bg-emerald-400/20 text-emerald-300"
                  : "bg-rose-400/15 text-rose-300/70"
              }`}
            >
              {opt.isCorrect ? "✓" : "✗"}
            </span>
            <span className={opt.isCorrect ? "" : "line-through"}>{opt.label}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function OutcomeCard({
  node,
}: {
  node: Exclude<AlgoNode, DecisionNode>;
}) {
  return (
    <>
      <div className="text-[10px] uppercase tracking-[0.18em] text-emerald-300/80 mb-1.5">
        Outcome
      </div>
      <div className="text-sm font-semibold leading-snug">{node.title}</div>
      {node.detail && (
        <div className="mt-1.5 text-[11px] text-white/55 leading-snug line-clamp-3">
          {node.detail}
        </div>
      )}
    </>
  );
}
