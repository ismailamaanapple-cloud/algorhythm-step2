"use client";

/**
 * AlgorithmDiagram — full-bleed clinical flowchart, AMBOSS-style.
 *
 * Iteration 2: the previous version had bezier curves with floating pill
 * labels that overlapped the curves and got truncated. This version:
 *   - Routes edges orthogonally (down → across → down) so the flow is
 *     unambiguous and lines never cross weirdly.
 *   - Drops each option label into its own dedicated slot ON the vertical
 *     drop between the junction bar and the child. Multi-line, larger
 *     font, no truncation.
 *   - Color-codes edges by option index within their parent decision
 *     (first option cyan, second fuchsia, third amber, …) so you can
 *     visually distinguish branches at a glance.
 *   - Lets you click any node to highlight the path from start → that
 *     node. Off-path nodes and edges dim so a single pathway pops.
 *     Click empty space (or the node again) to reset.
 *
 * Layout strategy is unchanged: top-down tree, breadth-balanced by
 * subtree width, transform-scaled to fit the viewport width.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, GitFork, Sparkles, MousePointerClick } from "lucide-react";
import type {
  Algorithm,
  AlgoNode,
  DecisionNode,
  OutcomeNode,
} from "@/data/algorithms";

const NODE_W = 280;
const NODE_MIN_H = 92;
const H_GAP = 64;
const V_GAP = 190;       // bigger so the label slot has breathing room
const JUNCTION_OFFSET = 36; // distance from parent bottom to the junction bar
const ARROW_INSET = 14;     // distance from arrowhead to the child's top edge
const MIN_SCALE = 0.7;   // floor so text stays readable on phones; wider
                         // diagrams overflow horizontally instead.
const LABEL_W = 188;     // width of edge-label cards
const LABEL_MIN_H = 28;  // approx height for collision math

// Edge accent palette — first option in a decision uses palette[0], etc.
// All values are Tailwind-compatible color stops + hex for the SVG strokes.
const BRANCH_PALETTE = [
  { name: "cyan",    stroke: "#22d3ee", soft: "rgba(34,211,238,0.18)" },
  { name: "fuchsia", stroke: "#e879f9", soft: "rgba(232,121,249,0.18)" },
  { name: "amber",   stroke: "#fbbf24", soft: "rgba(251,191,36,0.20)" },
  { name: "violet",  stroke: "#a78bfa", soft: "rgba(167,139,250,0.20)" },
  { name: "rose",    stroke: "#fb7185", soft: "rgba(251,113,133,0.20)" },
  { name: "teal",    stroke: "#2dd4bf", soft: "rgba(45,212,191,0.18)" },
] as const;

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
  /** Option index within the parent's correct-option list. Used for color. */
  branchIndex: number;
};

// --------------------------------------------------------------------------
// Layout
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

    layouts.set(id, { id, x: nodeX, y: nodeY, width: NODE_W, height: h, node });

    if (node.kind === "decision") {
      const correctOpts = node.options.filter((o) => o.isCorrect && o.next);
      let childX = x;
      correctOpts.forEach((o, idx) => {
        const childId = o.next!;
        const childW = subtreeWidth(childId);
        if (!visited.has(childId)) position(childId, childX);
        edges.push({
          fromId: id,
          toId: childId,
          label: o.label,
          branchIndex: idx,
        });
        childX += childW + H_GAP;
      });
    }
    return x + w;
  }
  position(algo.start, 0);

  // Parent-pointer map (first-discovered parent) for path highlight.
  const parentOf = new Map<string, string>();
  for (const e of edges) {
    if (!parentOf.has(e.toId)) parentOf.set(e.toId, e.fromId);
  }

  let maxX = 0;
  let maxY = 0;
  for (const l of layouts.values()) {
    maxX = Math.max(maxX, l.x + l.width);
    maxY = Math.max(maxY, l.y + l.height);
  }
  return { layouts, edges, width: maxX, height: maxY, parentOf };
}

// --------------------------------------------------------------------------
// Diagram
// --------------------------------------------------------------------------

export default function AlgorithmDiagram({ algo }: { algo: Algorithm }) {
  const { layouts, edges, width, height, parentOf } = useMemo(
    () => computeLayout(algo),
    [algo],
  );
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [pathHead, setPathHead] = useState<string | null>(null);

  // Path from start → pathHead, derived from parent map. Empty Set when null.
  const { activeNodes, activeEdges } = useMemo(() => {
    const ns = new Set<string>();
    const es = new Set<string>();
    if (!pathHead) return { activeNodes: ns, activeEdges: es };
    let cur: string | undefined = pathHead;
    const seen = new Set<string>();
    while (cur && !seen.has(cur)) {
      seen.add(cur);
      ns.add(cur);
      const p = parentOf.get(cur);
      if (p) {
        es.add(`${p}->${cur}`);
        cur = p;
      } else {
        break;
      }
    }
    return { activeNodes: ns, activeEdges: es };
  }, [pathHead, parentOf]);

  // Compute label placements once per layout — riders on horizontal segments
  // when they exist, otherwise on the vertical drop. Then collide-test in a
  // simple grid so diamond-join labels (two arrows into the same child) and
  // long horizontal segments stagger vertically instead of stacking on top
  // of each other.
  const labelPlacements = useMemo(
    () => computeLabelPlacements(edges, layouts),
    [edges, layouts],
  );

  // Fit-to-width
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    function update() {
      if (!wrapper) return;
      const target = Math.max(1, wrapper.clientWidth - 32);
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

  const dim = pathHead !== null;

  return (
    <div ref={wrapperRef} className="relative">
      {/* Hint chip — vanishes once user clicks something */}
      <div className="mb-3 flex items-center justify-between gap-2 flex-wrap">
        <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-white/40">
          <MousePointerClick className="h-3 w-3" />
          {pathHead ? "Path highlighted" : "Tap a node to spotlight its path"}
        </div>
        {pathHead && (
          <button
            type="button"
            onClick={() => setPathHead(null)}
            className="text-[11px] uppercase tracking-[0.2em] text-cyan-300/85 hover:text-cyan-200 transition"
          >
            Clear ×
          </button>
        )}
      </div>

      <div
        className="relative overflow-x-auto scrollbar-thin"
        onClick={(e) => {
          // Click on empty space clears highlight.
          if (e.target === e.currentTarget) setPathHead(null);
        }}
      >
        <div
          className="relative mx-auto"
          style={{ width: scaledWidth + 32, height: scaledHeight + 32 }}
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
            {/* SVG: trunks + arrows */}
            <svg
              className="absolute inset-0 pointer-events-none"
              width={width + 32}
              height={height + 32}
              style={{ overflow: "visible" }}
            >
              <defs>
                {BRANCH_PALETTE.map((p) => (
                  <marker
                    key={p.name}
                    id={`arr-${p.name}`}
                    viewBox="0 0 10 10"
                    refX="9"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 0 L 10 5 L 0 10 z" fill={p.stroke} />
                  </marker>
                ))}
              </defs>

              {edges.map((edge, i) => {
                const from = layouts.get(edge.fromId);
                const to = layouts.get(edge.toId);
                if (!from || !to) return null;

                const parentCX = from.x + from.width / 2 + 16;
                const parentBY = from.y + from.height + 16;
                const childCX = to.x + to.width / 2 + 16;
                const childTY = to.y + 16;
                const junctionY = parentBY + JUNCTION_OFFSET;

                // Orthogonal route — down, across, down.
                const path =
                  parentCX === childCX
                    ? `M ${parentCX} ${parentBY} L ${childCX} ${childTY - ARROW_INSET}`
                    : `M ${parentCX} ${parentBY} L ${parentCX} ${junctionY} L ${childCX} ${junctionY} L ${childCX} ${childTY - ARROW_INSET}`;

                const palette =
                  BRANCH_PALETTE[edge.branchIndex % BRANCH_PALETTE.length];
                const isActive = activeEdges.has(`${edge.fromId}->${edge.toId}`);
                const dimmed = dim && !isActive;

                return (
                  <motion.path
                    key={`${edge.fromId}-${edge.toId}-${i}`}
                    d={path}
                    fill="none"
                    stroke={palette.stroke}
                    strokeWidth={isActive ? 3 : 2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    markerEnd={`url(#arr-${palette.name})`}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: 1,
                      opacity: dimmed ? 0.18 : 1,
                    }}
                    transition={{
                      pathLength: {
                        duration: 0.55,
                        delay: 0.05 + (from.y / 1200) * 0.25,
                        ease: [0.22, 1, 0.36, 1],
                      },
                      opacity: { duration: 0.25 },
                    }}
                    style={{
                      filter: isActive
                        ? `drop-shadow(0 0 6px ${palette.stroke}aa)`
                        : undefined,
                    }}
                  />
                );
              })}
            </svg>

            {/* Edge labels — placed smartly per edge, with collision stagger.
                See computeLabelPlacements for the full strategy. */}
            {labelPlacements.map((placement, i) => {
              const { edge, x, y, staggerLevel } = placement;
              const from = layouts.get(edge.fromId);
              if (!from) return null;

              const palette =
                BRANCH_PALETTE[edge.branchIndex % BRANCH_PALETTE.length];
              const isActive = activeEdges.has(`${edge.fromId}->${edge.toId}`);
              const dimmed = dim && !isActive;

              return (
                <motion.div
                  key={`label-${edge.fromId}-${edge.toId}-${i}`}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: dimmed ? 0.25 : 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.3 + (from.y / 1200) * 0.25,
                  }}
                  className="absolute rounded-lg px-2.5 py-1.5 text-[12px] leading-tight font-medium text-center pointer-events-none"
                  style={{
                    left: x,
                    top: y,
                    transform: "translate(-50%, -50%)",
                    width: LABEL_W,
                    maxWidth: LABEL_W,
                    zIndex: 5 + staggerLevel,
                    borderTop: `1px solid ${palette.soft}`,
                    borderBottom: `1px solid ${palette.soft}`,
                    borderLeft: `2px solid ${palette.stroke}`,
                    borderRight: `1px solid ${palette.soft}`,
                    color: "rgba(255,255,255,0.94)",
                    background: "rgba(11,11,24,0.92)",
                    backdropFilter: "blur(4px)",
                    WebkitBackdropFilter: "blur(4px)",
                    boxShadow: isActive
                      ? `0 0 24px -4px ${palette.stroke}aa`
                      : `0 8px 24px -12px rgba(0,0,0,0.6)`,
                  }}
                >
                  <span
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                    title={edge.label}
                  >
                    {edge.label}
                  </span>
                </motion.div>
              );
            })}

            {/* Nodes */}
            {Array.from(layouts.values()).map((l) => {
              const isActive = activeNodes.has(l.id);
              const dimmed = dim && !isActive;
              return (
                <NodeCard
                  key={l.id}
                  layout={l}
                  dimmed={dimmed}
                  highlighted={isActive}
                  onClick={() =>
                    setPathHead((cur) => (cur === l.id ? null : l.id))
                  }
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// Node cards
// --------------------------------------------------------------------------

function NodeCard({
  layout,
  dimmed,
  highlighted,
  onClick,
}: {
  layout: Layout;
  dimmed: boolean;
  highlighted: boolean;
  onClick: () => void;
}) {
  const { node } = layout;
  const isOutcome = node.kind === "outcome";

  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{
        opacity: dimmed ? 0.3 : 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.45,
        delay: Math.min(0.05 + (layout.y / 1200) * 0.35, 0.6),
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
      className="absolute text-left cursor-pointer focus:outline-none"
      style={{
        left: layout.x + 16,
        top: layout.y + 16,
        width: layout.width,
        minHeight: layout.height,
      }}
    >
      <div
        className={`relative rounded-2xl p-[1.5px] bg-gradient-to-br transition-shadow ${
          isOutcome
            ? "from-emerald-300/60 via-teal-400/30 to-emerald-500/50"
            : "from-cyan-300/60 via-violet-400/30 to-cyan-500/50"
        } ${
          highlighted
            ? isOutcome
              ? "shadow-[0_0_40px_-4px_rgba(52,211,153,0.6)]"
              : "shadow-[0_0_40px_-4px_rgba(103,232,249,0.6)]"
            : "shadow-[0_12px_50px_-12px_rgba(124,92,255,0.35)]"
        }`}
      >
        <div
          aria-hidden
          className={`absolute -inset-3 rounded-3xl blur-2xl opacity-50 pointer-events-none -z-10 ${
            isOutcome ? "bg-emerald-400/15" : "bg-cyan-400/15"
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
    </motion.button>
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
// Label placement
// --------------------------------------------------------------------------

type LabelPlacement = {
  edge: EdgeInfo;
  x: number;
  y: number;
  /** Vertical bump in label-heights to avoid collisions. 0 = no bump. */
  staggerLevel: number;
};

/**
 * Decide where each edge's option-label sits. Strategy:
 *   - If the edge has a horizontal segment (parent X ≠ child X), label rides
 *     the midpoint of that segment at junctionY. This naturally separates
 *     sibling branches and diamond-join labels.
 *   - Otherwise (parent directly above child), label sits centered on the
 *     vertical drop between the junction bar and the arrowhead.
 *   - After initial placement, sweep through and stagger any labels whose
 *     bounding boxes overlap, pushing the later one downward by a label-
 *     height step. This rescues the rare case where two labels naturally
 *     land near the same point.
 */
function computeLabelPlacements(
  edges: EdgeInfo[],
  layouts: Map<string, Layout>,
): LabelPlacement[] {
  const placements: LabelPlacement[] = [];

  for (const edge of edges) {
    const from = layouts.get(edge.fromId);
    const to = layouts.get(edge.toId);
    if (!from || !to) continue;

    const parentCX = from.x + from.width / 2 + 16;
    const parentBY = from.y + from.height + 16;
    const childCX = to.x + to.width / 2 + 16;
    const childTY = to.y + 16;
    const junctionY = parentBY + JUNCTION_OFFSET;

    const horizontalDist = Math.abs(parentCX - childCX);

    let x: number;
    let y: number;
    if (horizontalDist > 8) {
      // Ride the horizontal segment at the junction bar.
      x = (parentCX + childCX) / 2;
      y = junctionY;
    } else {
      // No horizontal segment — center on the vertical drop.
      x = childCX;
      y = junctionY + (childTY - ARROW_INSET - junctionY) / 2;
    }

    placements.push({ edge, x, y, staggerLevel: 0 });
  }

  // Collision resolution — O(n²) but n is tiny per algorithm (< ~50 edges).
  const halfW = LABEL_W / 2;
  const halfH = LABEL_MIN_H / 2 + 4; // small fudge for breathing room

  function overlaps(a: LabelPlacement, b: LabelPlacement): boolean {
    const ax = a.x;
    const ay = a.y + a.staggerLevel * (LABEL_MIN_H + 6);
    const bx = b.x;
    const by = b.y + b.staggerLevel * (LABEL_MIN_H + 6);
    return (
      Math.abs(ax - bx) < halfW * 2 - 12 && Math.abs(ay - by) < halfH * 2
    );
  }

  // Walk forward; for each label, bump it down until it no longer collides
  // with any earlier-placed label.
  for (let i = 1; i < placements.length; i++) {
    let bumped = true;
    let guard = 0;
    while (bumped && guard < 6) {
      bumped = false;
      guard++;
      for (let j = 0; j < i; j++) {
        if (overlaps(placements[i], placements[j])) {
          placements[i].staggerLevel += 1;
          bumped = true;
          break;
        }
      }
    }
  }

  // Apply the stagger offset to the final Y.
  for (const p of placements) {
    p.y = p.y + p.staggerLevel * (LABEL_MIN_H + 6);
  }

  return placements;
}

// Compile-time fence.
type _NodeKinds = AlgoNode["kind"];
