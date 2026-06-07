"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Network, Gamepad2 } from "lucide-react";
import BackLink from "@/components/BackLink";
import type { Algorithm } from "@/data/algorithms";
import { CATEGORY_META } from "@/data/algorithms";
import GameEngine from "@/components/GameEngine";
import Flowchart from "@/components/Flowchart";

type Tab = "flowchart" | "play";

export default function AlgorithmView({ algo }: { algo: Algorithm }) {
  const [tab, setTab] = useState<Tab>("flowchart");
  const [playPath, setPlayPath] = useState<string[]>([algo.start]);
  const meta = CATEGORY_META[algo.category];

  return (
    <div className="min-h-[100dvh] flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-30 backdrop-blur-md bg-black/50 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center gap-4">
          <BackLink
            fallbackHref="/"
            className="inline-flex items-center gap-1.5 text-sm text-white/65 hover:text-white transition shrink-0"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Library</span>
          </BackLink>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-white/45">
              <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-br ${meta.color}`} />
              {algo.category}
              <span className="text-white/25">·</span>
              <span className="capitalize">{algo.difficulty}</span>
            </div>
            <div className="truncate text-sm font-semibold tracking-tight">{algo.title}</div>
          </div>

          {/* Tab toggle */}
          <div className="flex rounded-full bg-white/[0.04] border border-white/10 p-1 shrink-0">
            <TabButton
              active={tab === "flowchart"}
              onClick={() => setTab("flowchart")}
              icon={<Network className="h-3.5 w-3.5" />}
              label="Flowchart"
            />
            <TabButton
              active={tab === "play"}
              onClick={() => setTab("play")}
              icon={<Gamepad2 className="h-3.5 w-3.5" />}
              label="Play"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          {tab === "flowchart" ? (
            <motion.div
              key="flowchart"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex flex-col"
            >
              <div className="px-6 pt-5 pb-3 max-w-7xl mx-auto w-full">
                <p className="text-sm text-white/55 max-w-2xl">{algo.blurb}</p>
              </div>
              <div className="flex-1 mx-auto max-w-7xl w-full px-6 pb-6 min-h-0">
                <div className="h-[calc(100dvh-180px)] glass rounded-2xl relative overflow-hidden">
                  <Flowchart algo={algo} highlightPath={playPath.length > 1 ? playPath : []} />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="play"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 overflow-auto"
            >
              <GameEngine
                algo={algo}
                onSwitchToFlowchart={(path) => {
                  setPlayPath(path);
                  setTab("flowchart");
                }}
                onPathChange={(s) => setPlayPath(s.path)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition ${
        active ? "bg-white text-black shadow-sm" : "text-white/65 hover:text-white"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
