"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import type { Algorithm } from "@/data/algorithms";
import { CATEGORY_META } from "@/data/algorithms";

function layout(algo: Algorithm): { layers: string[][] } {
  const depthOf: Record<string, number> = {};
  const queue: { id: string; d: number }[] = [{ id: algo.start, d: 0 }];
  const seen = new Set<string>();

  while (queue.length) {
    const { id, d } = queue.shift()!;
    if (seen.has(id)) continue;
    seen.add(id);
    depthOf[id] = Math.max(depthOf[id] ?? 0, d);
    const node = algo.nodes[id];
    if (node?.kind === "decision") {
      node.options.forEach((o) => {
        if (o.isCorrect && o.next) {
          if (!seen.has(o.next)) queue.push({ id: o.next, d: d + 1 });
          else depthOf[o.next] = Math.max(depthOf[o.next] ?? 0, d + 1);
        }
      });
    }
  }

  const layers: string[][] = [];
  Object.entries(depthOf).forEach(([id, d]) => {
    if (!layers[d]) layers[d] = [];
    layers[d].push(id);
  });

  return { layers };
}

export default function FlowchartReview({
  algo,
  highlight,
  onClose,
}: {
  algo: Algorithm;
  highlight: string[];
  onClose: () => void;
}) {
  const { layers } = layout(algo);
  const meta = CATEGORY_META[algo.category];
  const highlightSet = new Set(highlight);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col"
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-white/45 flex items-center gap-2">
            <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-br ${meta.color}`} />
            {algo.category} · Full algorithm
          </div>
          <div className="text-base font-semibold tracking-tight">{algo.title}</div>
        </div>
        <button
          onClick={onClose}
          className="rounded-full border border-white/15 bg-white/[0.04] p-2 hover:bg-white/[0.08] transition"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 overflow-auto scrollbar-thin px-6 py-10">
        <div className="mx-auto max-w-5xl space-y-12">
          {layers.map((ids, depth) => (
            <motion.div
              key={depth}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: depth * 0.08 }}
              className="space-y-3"
            >
              <div className="text-[10px] uppercase tracking-[0.22em] text-white/35 mb-2">
                Level {depth + 1}
              </div>
              <div
                className="grid gap-3"
                style={{
                  gridTemplateColumns: `repeat(${Math.min(ids.length, 3)}, minmax(0, 1fr))`,
                }}
              >
                {ids.map((id) => {
                  const node = algo.nodes[id];
                  if (!node) return null;
                  const isHighlight = highlightSet.has(id);
                  return (
                    <div
                      key={id}
                      className={`relative rounded-2xl border p-4 transition ${
                        isHighlight
                          ? "border-cyan-300/40 bg-cyan-400/5 shadow-[0_0_30px_rgba(0,230,195,0.15)]"
                          : "border-white/10 bg-white/[0.03]"
                      }`}
                    >
                      {node.kind === "outcome" ? (
                        <>
                          <div className="text-[10px] uppercase tracking-[0.22em] text-amber-300/90 mb-1.5">
                            Outcome
                          </div>
                          <div className="text-sm font-semibold tracking-tight">{node.title}</div>
                          {node.detail && (
                            <div className="mt-1.5 text-xs text-white/55 leading-relaxed">{node.detail}</div>
                          )}
                        </>
                      ) : (
                        <>
                          <div className="text-[10px] uppercase tracking-[0.22em] text-white/45 mb-1.5">
                            Decision
                          </div>
                          <div className="text-sm font-medium leading-snug">{node.prompt}</div>
                          {node.options && node.options.length > 0 && (
                            <div className="mt-3 space-y-1.5">
                              {node.options.map((o) => (
                                <div
                                  key={o.label}
                                  className={`flex items-start gap-2 text-xs leading-relaxed ${
                                    o.isCorrect ? "text-emerald-300/90" : "text-rose-300/60 line-through"
                                  }`}
                                >
                                  <span>{o.isCorrect ? "→" : "✗"}</span>
                                  <span>{o.label}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
              {depth < layers.length - 1 && (
                <div className="flex justify-center pt-1">
                  <div className="h-6 w-px bg-gradient-to-b from-white/25 to-transparent" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
