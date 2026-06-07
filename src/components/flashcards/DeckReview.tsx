"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Layers,
  Eye,
  Loader2,
} from "lucide-react";
import { useDeck } from "@/hooks/useFlashcards";
import { useAuth } from "@/lib/auth/AuthProvider";
import type { Grade } from "@/lib/srs";
import BackLink from "@/components/BackLink";

const GRADES: { grade: Grade; label: string; sub: string; color: string }[] = [
  { grade: "again", label: "Again", sub: "< 1d",   color: "from-rose-500 to-red-600" },
  { grade: "hard",  label: "Hard",  sub: "shorter",color: "from-amber-500 to-orange-600" },
  { grade: "good",  label: "Good",  sub: "on time",color: "from-emerald-500 to-teal-600" },
  { grade: "easy",  label: "Easy",  sub: "longer", color: "from-violet-500 to-cyan-500" },
];

export default function DeckReview({
  deckId,
  title,
  category,
}: {
  deckId?: string;
  title: string;
  category: string;
}) {
  const { user, openLogin } = useAuth();
  const { cards, dueCards, gradeCard, loading } = useDeck(deckId);

  // Shuffle once per session.
  const queue = useMemo(() => shuffle(dueCards), [dueCards.length]);

  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [done, setDone] = useState(false);
  const card = queue[i];

  async function handleGrade(g: Grade) {
    if (!card) return;
    await gradeCard(card.source_id, g);
    setFlipped(false);
    if (i + 1 >= queue.length) setDone(true);
    else setI(i + 1);
  }

  function restart() {
    setI(0);
    setFlipped(false);
    setDone(false);
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10 md:py-14">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <BackLink
          fallbackHref="/flashcards"
          className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition"
        >
          <ArrowLeft className="h-4 w-4" />
          All decks
        </BackLink>
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-[0.22em] text-cyan-300/80">
            {category}
          </div>
          <div className="text-sm font-semibold tracking-tight truncate max-w-[60vw]">
            {title}
          </div>
        </div>
      </div>

      {/* Progress strip */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-white/55 mb-1.5">
          <span>
            {Math.min(i + (flipped || done ? 1 : 0), queue.length)} / {queue.length}{" "}
            due
          </span>
          <span>{cards.length} total in deck</span>
        </div>
        <div className="h-1 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-violet-400 to-cyan-400"
            initial={{ width: 0 }}
            animate={{ width: `${queue.length ? ((i + (done ? 1 : 0)) / queue.length) * 100 : 0}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-20 text-white/55 gap-2">
          <Loader2 className="h-5 w-5 animate-spin" /> Loading your cards…
        </div>
      )}

      {!loading && queue.length === 0 && !done && (
        <div className="glass rounded-3xl p-10 text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-emerald-400/20 flex items-center justify-center text-emerald-300 mb-4">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Nothing due — nice.</h2>
          <p className="text-sm text-white/65 mb-6">
            Every card in this deck is scheduled for the future. Come back
            later, or browse another deck.
          </p>
          <Link
            href="/flashcards"
            className="inline-flex items-center gap-2 rounded-full bg-white text-black px-5 py-2.5 text-sm font-semibold hover:bg-white/90 transition"
          >
            <Layers className="h-4 w-4" /> Browse decks
          </Link>
        </div>
      )}

      {!loading && done && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-10 text-center"
        >
          <div className="mx-auto h-14 w-14 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center mb-4">
            <Sparkles className="h-7 w-7" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight mb-2">
            Session complete
          </h2>
          <p className="text-sm text-white/65 mb-6">
            You reviewed {queue.length} card{queue.length === 1 ? "" : "s"}.
            {user ? " Your progress synced to your account." : " Sign in to save your progress next time."}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={restart}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold hover:bg-white/[0.08] transition"
            >
              <RotateCcw className="h-4 w-4" />
              Review again
            </button>
            <Link
              href="/flashcards"
              className="inline-flex items-center gap-2 rounded-full bg-white text-black px-5 py-2.5 text-sm font-semibold hover:bg-white/90 transition"
            >
              <Layers className="h-4 w-4" />
              All decks
            </Link>
          </div>
        </motion.div>
      )}

      {!loading && !done && card && (
        <>
          {/* Card */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${i}-${flipped ? "b" : "f"}`}
                initial={{ opacity: 0, rotateY: -8, y: 12 }}
                animate={{ opacity: 1, rotateY: 0, y: 0 }}
                exit={{ opacity: 0, rotateY: 8, y: -12 }}
                transition={{ duration: 0.25 }}
                onClick={() => !flipped && setFlipped(true)}
                className={`glass-strong rounded-3xl p-8 md:p-12 min-h-[340px] flex flex-col ${
                  !flipped ? "cursor-pointer hover:bg-white/[0.04]" : ""
                }`}
              >
                <div className="text-[10px] uppercase tracking-[0.22em] text-white/45 mb-4 flex items-center gap-2">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      flipped ? "bg-emerald-300" : "bg-cyan-300"
                    }`}
                  />
                  {flipped ? "Answer" : (card.kind === "case" ? "Vignette" : "Question")}
                  <span className="text-white/30">·</span>
                  <span className="text-white/55 capitalize">{card.kind}</span>
                </div>
                <div className="flex-1 flex items-center">
                  {flipped ? (
                    <CardBack text={card.back} />
                  ) : (
                    <div
                      className={`leading-relaxed font-medium ${
                        card.kind === "case"
                          ? "text-base md:text-lg text-white/90"
                          : "text-xl md:text-2xl"
                      }`}
                    >
                      {card.front}
                    </div>
                  )}
                </div>
                {!flipped && (
                  <button
                    onClick={() => setFlipped(true)}
                    className="mt-6 inline-flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-semibold hover:bg-white/[0.08] transition"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    Show answer (Space)
                  </button>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Grade buttons */}
          {flipped && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15 }}
              className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-2"
            >
              {GRADES.map((g) => (
                <button
                  key={g.grade}
                  onClick={() => handleGrade(g.grade)}
                  className={`rounded-2xl p-4 text-left bg-gradient-to-br ${g.color} hover:opacity-90 transition`}
                >
                  <div className="text-sm font-bold tracking-tight">{g.label}</div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-white/80 mt-0.5">
                    {g.sub}
                  </div>
                </button>
              ))}
            </motion.div>
          )}

          {!user && (
            <div className="mt-6 text-center text-xs text-white/55">
              <button
                onClick={openLogin}
                className="underline underline-offset-4 hover:text-white transition"
              >
                Sign in
              </button>{" "}
              to save your review progress across sessions.
            </div>
          )}
        </>
      )}
    </div>
  );
}

/**
 * Renders the back-of-card text. Case backs use a structured format like:
 *   <diagnosis>
 *
 *   Next step → <action>
 *   <rationale>
 *
 *   • key pt 1
 *   • key pt 2
 *
 * Split on double-newlines and style each block.
 */
function CardBack({ text }: { text: string }) {
  const blocks = text.split(/\n\n+/);
  const [first, ...rest] = blocks;
  return (
    <div className="w-full space-y-4">
      <div className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-br from-emerald-200 to-cyan-200 bg-clip-text text-transparent">
        {first}
      </div>
      {rest.map((b, i) => {
        const isNext = b.startsWith("Next step");
        const isBullets = b.trim().startsWith("•");
        if (isNext) {
          const lines = b.split("\n");
          return (
            <div
              key={i}
              className="rounded-xl border border-amber-300/30 bg-amber-400/[0.06] px-4 py-3"
            >
              <div className="text-xs uppercase tracking-[0.22em] text-amber-200 mb-1.5">
                {lines[0]}
              </div>
              {lines[1] && (
                <div className="text-sm text-white/80 leading-relaxed">
                  {lines.slice(1).join(" ")}
                </div>
              )}
            </div>
          );
        }
        if (isBullets) {
          return (
            <ul key={i} className="space-y-1.5 text-sm text-white/80 leading-relaxed">
              {b.split("\n").map((l, li) => (
                <li key={li} className="flex gap-2">
                  <span className="text-cyan-300 shrink-0 mt-0.5">◆</span>
                  <span>{l.replace(/^•\s*/, "")}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <div key={i} className="text-sm text-white/75 leading-relaxed whitespace-pre-line">
            {b}
          </div>
        );
      })}
    </div>
  );
}

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let k = a.length - 1; k > 0; k--) {
    const j = Math.floor(Math.random() * (k + 1));
    [a[k], a[j]] = [a[j], a[k]];
  }
  return a;
}
