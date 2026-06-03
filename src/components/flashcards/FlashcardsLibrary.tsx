"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  Layers,
  Sparkles,
  ChevronRight,
  BookOpen,
  Stethoscope,
} from "lucide-react";
import {
  decksByCategory,
  totalCardCount,
  totalCaseCardCount,
} from "@/data/flashcards";
import { useAuth } from "@/lib/auth/AuthProvider";

export default function FlashcardsLibrary() {
  const [q, setQ] = useState("");
  const { user, openLogin } = useAuth();
  const groups = useMemo(() => decksByCategory(), []);
  const total = totalCardCount();
  const cases = totalCaseCardCount();

  const filteredGroups = useMemo(() => {
    if (!q.trim()) return groups;
    const needle = q.toLowerCase();
    return groups
      .map((g) => ({
        ...g,
        decks: g.decks.filter(
          (d) =>
            d.title.toLowerCase().includes(needle) ||
            g.category.toLowerCase().includes(needle),
        ),
      }))
      .filter((g) => g.decks.length > 0);
  }, [q, groups]);

  return (
    <div className="mx-auto max-w-6xl px-6 pb-16">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="pt-10 md:pt-16 mb-10"
      >
        <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-cyan-200 mb-4">
          <Sparkles className="h-3 w-3" />
          {total.toLocaleString()} cards · {cases} from board-style vignettes
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-3">
          Flashcards
        </h1>
        <p className="text-white/65 text-base md:text-lg max-w-3xl leading-relaxed">
          Vignette-first cards: read the stem, name the diagnosis, see the next
          step. Plus high-yield rules and presentation-to-diagnosis tables —
          spaced-repetition keeps the right ones in front of you.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/flashcards/review"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition shadow-[0_0_40px_rgba(168,85,247,0.3)]"
          >
            <Layers className="h-4 w-4" />
            Review due cards
            <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
          {!user && (
            <button
              onClick={openLogin}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white/85 hover:bg-white/[0.08] transition"
            >
              Sign in to sync progress
            </button>
          )}
        </div>
      </motion.div>

      {/* Search */}
      <div className="relative mb-8 max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search decks…"
          className="w-full rounded-full border border-white/10 bg-white/[0.04] pl-11 pr-4 py-3 text-sm placeholder:text-white/30 focus:outline-none focus:border-cyan-300/40 transition"
        />
      </div>

      {/* Decks grouped by category */}
      <div className="space-y-10">
        {filteredGroups.map((group, gi) => (
          <motion.section
            key={group.category}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: Math.min(gi * 0.04, 0.4), duration: 0.5 }}
          >
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="text-sm uppercase tracking-[0.22em] text-cyan-300/80">
                {group.category}
              </h2>
              <span className="text-xs text-white/40">
                {group.decks.length} deck{group.decks.length === 1 ? "" : "s"} ·{" "}
                {group.decks.reduce((s, d) => s + d.cards.length, 0)} cards
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {group.decks.map((d) => {
                const isCase = d.source === "case";
                return (
                  <Link
                    key={d.id}
                    href={`/flashcards/${d.id}`}
                    className={`group glass rounded-2xl p-5 transition border ${
                      isCase
                        ? "border-amber-300/20 hover:border-amber-300/40 hover:bg-amber-300/[0.04]"
                        : "border-transparent hover:border-cyan-300/30 hover:bg-white/[0.05]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          {isCase ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/15 text-amber-200 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.18em]">
                              <Stethoscope className="h-2.5 w-2.5" />
                              Cases
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-cyan-400/15 text-cyan-200 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.18em]">
                              <BookOpen className="h-2.5 w-2.5" />
                              Notes
                            </span>
                          )}
                        </div>
                        <div className="text-sm font-semibold tracking-tight mb-1 line-clamp-2">
                          {d.title}
                        </div>
                        <div className="text-xs text-white/45 inline-flex items-center gap-1.5">
                          {d.cards.length} card{d.cards.length === 1 ? "" : "s"}
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-white/30 group-hover:text-cyan-300 group-hover:translate-x-0.5 transition mt-1 shrink-0" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
}
