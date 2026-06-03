"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Layers, Sparkles, ChevronRight, BookOpen } from "lucide-react";
import { decksByCategory, totalCardCount } from "@/data/flashcards";
import { useAuth } from "@/lib/auth/AuthProvider";

export default function FlashcardsLibrary() {
  const [q, setQ] = useState("");
  const { user, openLogin } = useAuth();
  const groups = useMemo(() => decksByCategory(), []);
  const total = totalCardCount();

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
        className="pt-10 md:pt-16 mb-10"
      >
        <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-cyan-200 mb-4">
          <Sparkles className="h-3 w-3" />
          New — {total.toLocaleString()} pre-built cards
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
          Flashcards
        </h1>
        <p className="text-white/65 text-base md:text-lg max-w-3xl leading-relaxed">
          Every note in the library has been turned into a spaced-repetition
          deck. Review the cards you owe today, or browse decks by topic.
          Cards you make from highlights show up here too.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/flashcards/review"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition"
          >
            <Layers className="h-4 w-4" />
            Review due cards
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
        {filteredGroups.map((group) => (
          <section key={group.category}>
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="text-sm uppercase tracking-[0.22em] text-cyan-300/80">
                {group.category}
              </h2>
              <span className="text-xs text-white/40">
                {group.decks.length} deck{group.decks.length === 1 ? "" : "s"}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {group.decks.map((d) => (
                <Link
                  key={d.noteId}
                  href={`/flashcards/${d.noteId}`}
                  className="group glass rounded-2xl p-5 hover:bg-white/[0.05] transition border border-transparent hover:border-cyan-300/20"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-sm font-semibold tracking-tight mb-1 line-clamp-2">
                        {d.title}
                      </div>
                      <div className="text-xs text-white/45 inline-flex items-center gap-1.5">
                        <BookOpen className="h-3 w-3" />
                        {d.cards.length} cards
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-white/30 group-hover:text-cyan-300 group-hover:translate-x-0.5 transition mt-1 shrink-0" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
