"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  Heart,
  Flame,
  RotateCcw,
  Trophy,
  Sparkles,
  Network,
} from "lucide-react";
import type { Algorithm, Option, DecisionNode } from "@/data/algorithms";
import { CATEGORY_META } from "@/data/algorithms";

type Phase = "playing" | "feedback" | "won" | "lost";

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export default function GameEngine({
  algo,
  onSwitchToFlowchart,
  onPathChange,
}: {
  algo: Algorithm;
  onSwitchToFlowchart?: (path: string[]) => void;
  onPathChange?: (state: { path: string[]; hp: number; score: number; streak: number }) => void;
}) {
  const meta = CATEGORY_META[algo.category];

  const [currentId, setCurrentId] = useState<string>(algo.start);
  const [path, setPath] = useState<string[]>([algo.start]);
  const [hp, setHp] = useState(3);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [phase, setPhase] = useState<Phase>("playing");
  const [feedback, setFeedback] = useState<{ correct: boolean; option: Option } | null>(null);
  const [tried, setTried] = useState<Set<string>>(new Set());

  const node = algo.nodes[currentId];
  const isOutcome = node.kind === "outcome";

  const [shuffledOptions, setShuffledOptions] = useState<Option[]>([]);
  useEffect(() => {
    const n = algo.nodes[currentId];
    if (n?.kind !== "decision") {
      setShuffledOptions([]);
      return;
    }
    setShuffledOptions(shuffle(n.options));
    setTried(new Set());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentId]);

  useEffect(() => {
    if (isOutcome && phase !== "won") setPhase("won");
  }, [currentId, isOutcome, phase]);

  useEffect(() => {
    if (hp <= 0) setPhase("lost");
  }, [hp]);

  useEffect(() => {
    onPathChange?.({ path, hp, score, streak });
  }, [path, hp, score, streak, onPathChange]);

  function handleOption(opt: Option) {
    if (phase !== "playing") return;
    if (opt.isCorrect) {
      setScore((s) => s + 10 + streak * 2);
      setStreak((s) => {
        const ns = s + 1;
        setBestStreak((b) => Math.max(b, ns));
        return ns;
      });
    } else {
      setHp((h) => h - 1);
      setStreak(0);
      setTried((t) => new Set(t).add(opt.label));
    }
    setFeedback({ correct: opt.isCorrect, option: opt });
    setPhase("feedback");
  }

  function continueAfterFeedback() {
    if (!feedback) return;
    if (feedback.correct && feedback.option.next) {
      setPath((p) => [...p, feedback.option.next!]);
      setCurrentId(feedback.option.next!);
    }
    setFeedback(null);
    setPhase("playing");
  }

  function reset() {
    setCurrentId(algo.start);
    setPath([algo.start]);
    setHp(3);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setPhase("playing");
    setFeedback(null);
    setTried(new Set());
  }

  const totalDecisions = Object.values(algo.nodes).filter((n) => n.kind === "decision").length;
  const progress = Math.min(1, (path.length - 1) / Math.max(1, totalDecisions));

  return (
    <div className="relative flex flex-col min-h-full">
      {/* Sub-bar with HUD and progress */}
      <div className="border-b border-white/5 bg-black/30 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl px-6 py-3 flex items-center justify-between gap-4">
          <div className="text-[10px] uppercase tracking-[0.22em] text-white/45">
            Step {path.length} of ~{totalDecisions}
          </div>
          <HUD hp={hp} score={score} streak={streak} />
        </div>
        <div className="h-1 bg-white/5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.5 }}
            className={`h-full bg-gradient-to-r ${meta.color}`}
          />
        </div>
      </div>

      <div className="flex-1 mx-auto max-w-3xl w-full px-6 py-10 md:py-16">
        <AnimatePresence mode="wait" initial={false}>
          {phase === "playing" && node.kind === "decision" && (
            <motion.div
              key={`play-${node.id}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              <PlayBody
                node={node}
                options={shuffledOptions}
                tried={tried}
                step={path.length}
                onPick={handleOption}
              />
            </motion.div>
          )}

          {phase === "feedback" && feedback && (
            <motion.div
              key="feedback"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <FeedbackCard feedback={feedback} streak={streak} />
              <div className="flex justify-center">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={continueAfterFeedback}
                  className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-black"
                >
                  {feedback.correct ? "Continue →" : "Try again"}
                </motion.button>
              </div>
            </motion.div>
          )}

          {phase === "won" && node.kind === "outcome" && (
            <motion.div
              key={`won-${node.id}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <WinCard node={node} meta={meta} />
              <div className="grid grid-cols-3 gap-3 max-w-xl mx-auto">
                <Tile label="Score" value={score.toString()} />
                <Tile label="Best streak" value={`×${bestStreak}`} />
                <Tile label="HP left" value={`${hp}/3`} />
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                {onSwitchToFlowchart && (
                  <button
                    onClick={() => onSwitchToFlowchart(path)}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black"
                  >
                    <Network className="h-4 w-4" /> Review on flowchart
                  </button>
                )}
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white/85 hover:bg-white/[0.08] transition"
                >
                  <RotateCcw className="h-4 w-4" /> Play again
                </button>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white/85 hover:bg-white/[0.08] transition"
                >
                  Library
                </Link>
              </div>
            </motion.div>
          )}

          {phase === "lost" && (
            <motion.div
              key="lost"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8 text-center"
            >
              <div className="glass-strong rounded-3xl p-10 border-2 border-rose-400/30">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-rose-500/15 mb-5">
                  <Heart className="h-8 w-8 text-rose-300" />
                </div>
                <div className="text-xs uppercase tracking-[0.22em] text-rose-300 mb-2">Out of lives</div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
                  That&apos;s how recall builds.
                </h1>
                <p className="text-sm text-white/65 max-w-md mx-auto">
                  Review the full flowchart and run it again.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                {onSwitchToFlowchart && (
                  <button
                    onClick={() => onSwitchToFlowchart(path)}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black"
                  >
                    <Network className="h-4 w-4" /> See the flowchart
                  </button>
                )}
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white/85 hover:bg-white/[0.08] transition"
                >
                  <RotateCcw className="h-4 w-4" /> Try again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function PlayBody({
  node,
  options,
  tried,
  step,
  onPick,
}: {
  node: DecisionNode;
  options: Option[];
  tried: Set<string>;
  step: number;
  onPick: (o: Option) => void;
}) {
  return (
    <>
      <div className="text-center">
        <div className="text-[10px] uppercase tracking-[0.22em] text-cyan-300/80 mb-3">
          Step {step} · Active Recall
        </div>
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight leading-tight max-w-2xl mx-auto">
          {node.prompt}
        </h1>
        {node.context && (
          <p className="mt-4 text-sm text-white/55 leading-relaxed max-w-xl mx-auto">{node.context}</p>
        )}
      </div>
      <div className="grid gap-3">
        {options.map((opt, idx) => {
          const wasTried = tried.has(opt.label);
          return (
            <motion.button
              key={opt.label}
              onClick={() => !wasTried && onPick(opt)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: wasTried ? 0.4 : 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.25 }}
              whileHover={!wasTried ? { y: -2 } : undefined}
              whileTap={!wasTried ? { scale: 0.985 } : undefined}
              disabled={wasTried}
              className={`group text-left glass rounded-2xl px-5 py-4 flex items-center gap-4 transition ${
                wasTried
                  ? "border-rose-500/30 cursor-not-allowed"
                  : "hover:bg-white/[0.05] hover:border-white/25"
              }`}
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xs font-mono transition ${
                  wasTried
                    ? "border-rose-400/40 bg-rose-500/10 text-rose-300/70"
                    : "border-white/15 bg-white/[0.04] text-white/65 group-hover:border-cyan-300/40 group-hover:text-cyan-300"
                }`}
              >
                {wasTried ? "✗" : String.fromCharCode(65 + idx)}
              </span>
              <span className="flex-1 text-sm md:text-base text-white/90 leading-snug">{opt.label}</span>
            </motion.button>
          );
        })}
      </div>
    </>
  );
}

function FeedbackCard({
  feedback,
  streak,
}: {
  feedback: { correct: boolean; option: Option };
  streak: number;
}) {
  return (
    <div
      className={`glass-strong rounded-3xl p-8 text-center border-2 ${
        feedback.correct ? "border-emerald-400/40" : "border-rose-400/40"
      }`}
    >
      <div className="flex justify-center mb-4">
        {feedback.correct ? (
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 220 }}
            className="rounded-full bg-emerald-400/15 p-4"
          >
            <CheckCircle2 className="h-10 w-10 text-emerald-300" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, x: [0, -6, 6, -6, 6, 0] }}
            className="rounded-full bg-rose-400/15 p-4"
          >
            <XCircle className="h-10 w-10 text-rose-300" />
          </motion.div>
        )}
      </div>
      <div className="text-xs uppercase tracking-[0.22em] text-white/45 mb-2">
        {feedback.correct ? "Correct" : "Not quite"}
      </div>
      <div className="text-xl md:text-2xl font-semibold tracking-tight mb-3">{feedback.option.label}</div>
      {feedback.option.rationale && (
        <p className="text-sm text-white/65 max-w-md mx-auto leading-relaxed">{feedback.option.rationale}</p>
      )}
      {feedback.correct && streak > 0 && (
        <div className="mt-4 inline-flex items-center gap-2 text-xs text-cyan-300">
          <Sparkles className="h-3.5 w-3.5" />
          +{10 + (streak - 1) * 2} points · streak ×{streak}
        </div>
      )}
    </div>
  );
}

function WinCard({
  node,
  meta,
}: {
  node: { title: string; detail?: string; pearls?: string[] };
  meta: { color: string };
}) {
  return (
    <div className="glass-strong rounded-3xl p-10 text-center border-2 border-emerald-400/30 relative overflow-hidden">
      <div
        className={`absolute -top-32 -left-32 h-72 w-72 rounded-full bg-gradient-to-br ${meta.color} opacity-30 blur-3xl`}
      />
      <div className="relative">
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-orange-500 mb-5 shadow-[0_0_40px_rgba(251,146,60,0.5)]"
        >
          <Trophy className="h-8 w-8 text-white" />
        </motion.div>
        <div className="text-xs uppercase tracking-[0.22em] text-emerald-300 mb-2">Algorithm complete</div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">{node.title}</h1>
        {node.detail && (
          <p className="text-sm md:text-base text-white/70 max-w-xl mx-auto leading-relaxed">{node.detail}</p>
        )}
        {node.pearls && node.pearls.length > 0 && (
          <div className="mt-6 max-w-md mx-auto text-left">
            <div className="text-[10px] uppercase tracking-[0.22em] text-cyan-300 mb-2">High-yield pearls</div>
            <ul className="space-y-1.5">
              {node.pearls.map((p) => (
                <li key={p} className="text-sm text-white/75 flex gap-2">
                  <span className="text-cyan-300 mt-0.5">◆</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function Tile({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-2xl px-3 py-4 text-center">
      <div className="text-xl font-semibold tabular-nums">{value}</div>
      <div className="text-[10px] uppercase tracking-[0.2em] text-white/45 mt-1">{label}</div>
    </div>
  );
}

function HUD({ hp, score, streak }: { hp: number; score: number; streak: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="hidden sm:flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div key={i} animate={{ scale: hp > i ? 1 : 0.7, opacity: hp > i ? 1 : 0.25 }}>
            <Heart
              className={`h-4 w-4 ${hp > i ? "text-rose-400 fill-rose-400" : "text-white/30"}`}
              strokeWidth={2}
            />
          </motion.div>
        ))}
      </div>
      <div className="flex items-center gap-1 text-xs font-mono">
        <Flame className={`h-3.5 w-3.5 ${streak > 0 ? "text-amber-300" : "text-white/30"}`} />
        <span className={streak > 0 ? "text-amber-300" : "text-white/50"}>×{streak}</span>
      </div>
      <div className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-mono tabular-nums">
        {score.toString().padStart(4, "0")}
      </div>
    </div>
  );
}
