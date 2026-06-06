"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  BookOpen,
  Stethoscope,
  GitBranch,
  Layers,
  Sparkles,
  Command,
} from "lucide-react";
import { NOTES } from "@/data/notes";
import { CASES } from "@/data/cases";
import { ALGORITHMS } from "@/data/algorithms";

// --------------------------------------------------------------------------
// Search index — flatten everything once at module load.
// --------------------------------------------------------------------------

type IndexedItem = {
  id: string;
  kind: "note" | "case" | "algorithm";
  title: string;
  subtitle: string;
  category: string;
  href: string;
  haystack: string;
};

const INDEX: IndexedItem[] = [
  ...NOTES.map((n): IndexedItem => ({
    id: n.id,
    kind: "note",
    title: n.title,
    subtitle: n.summary,
    category: n.category,
    href: `/notes/${n.id}`,
    haystack: [
      n.title,
      n.summary,
      n.category,
      ...(n.sections ?? []).flatMap((s) => [s.heading, ...s.bullets]),
      ...(n.pearls ?? []),
    ].join(" ").toLowerCase(),
  })),
  ...CASES.map((c): IndexedItem => ({
    id: c.id,
    kind: "case",
    title: c.diagnosis,
    subtitle: c.stem,
    category: c.topic,
    href: `/cases/${c.id}`,
    haystack: [c.diagnosis, c.topic, c.stem, c.question, ...c.keyPoints].join(" ").toLowerCase(),
  })),
  ...ALGORITHMS.map((a): IndexedItem => ({
    id: a.id,
    kind: "algorithm",
    title: a.title,
    subtitle: a.blurb,
    category: a.category,
    href: `/play/${a.id}`,
    haystack: [a.title, a.blurb, a.category].join(" ").toLowerCase(),
  })),
];

function rank(q: string): IndexedItem[] {
  const needle = q.trim().toLowerCase();
  if (!needle) return [];
  const tokens = needle.split(/\s+/).filter((t) => t.length > 0);

  const scored: { item: IndexedItem; score: number }[] = [];
  for (const item of INDEX) {
    let score = 0;
    const titleLower = item.title.toLowerCase();
    if (titleLower === needle) score += 100;
    else if (titleLower.startsWith(needle)) score += 60;
    else if (titleLower.includes(needle)) score += 40;

    let tokenHits = 0;
    for (const t of tokens) {
      if (titleLower.includes(t)) {
        tokenHits++;
        score += 8;
      }
      if (item.haystack.includes(t)) score += 2;
    }
    if (tokenHits < tokens.length) {
      // Each token must appear somewhere in the haystack; if not, drop hard.
      let missing = 0;
      for (const t of tokens) {
        if (!item.haystack.includes(t)) missing++;
      }
      if (missing > 0) score -= missing * 50;
    }
    if (score > 0) scored.push({ item, score });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 30).map((s) => s.item);
}

// --------------------------------------------------------------------------
// Context — let any component open the search
// --------------------------------------------------------------------------

type SearchContextValue = { open: () => void; close: () => void };
const SearchContext = createContext<SearchContextValue | null>(null);

export function useGlobalSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useGlobalSearch must be used inside <SearchProvider>");
  return ctx;
}

// --------------------------------------------------------------------------
// Modal UI
// --------------------------------------------------------------------------

const KIND_META: Record<IndexedItem["kind"], { icon: React.ReactNode; label: string; color: string }> = {
  note: { icon: <BookOpen className="h-3.5 w-3.5" />, label: "Note", color: "text-cyan-300" },
  case: { icon: <Stethoscope className="h-3.5 w-3.5" />, label: "Case", color: "text-amber-300" },
  algorithm: { icon: <GitBranch className="h-3.5 w-3.5" />, label: "Algo", color: "text-violet-300" },
};

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [q, setQ] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => rank(q), [q]);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    setIsOpen(false);
    setQ("");
    setActiveIdx(0);
  }, []);

  // Cmd+K / Ctrl+K to open globally; Esc closes.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((v) => !v);
        return;
      }
      if (e.key === "Escape" && isOpen) {
        close();
        return;
      }
      if (!isOpen) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIdx((i) => Math.min(results.length - 1, i + 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIdx((i) => Math.max(0, i - 1));
      } else if (e.key === "Enter") {
        const sel = results[activeIdx];
        if (sel) {
          window.location.href = sel.href;
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, results, activeIdx, close]);

  useEffect(() => {
    if (isOpen) {
      setActiveIdx(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [isOpen, q]);

  return (
    <SearchContext.Provider value={{ open, close }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] flex items-start justify-center p-4 sm:p-8 pt-[12vh] bg-black/70 backdrop-blur-sm"
            onClick={close}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ type: "spring", duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl glass-strong rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
            >
              {/* Input row */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
                <Search className="h-4 w-4 text-white/55 shrink-0" />
                <input
                  ref={inputRef}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search notes, cases, algorithms…"
                  className="flex-1 bg-transparent outline-none text-sm placeholder:text-white/35"
                />
                <button
                  onClick={close}
                  className="p-1 rounded text-white/40 hover:text-white/80 transition"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto">
                {q.trim() === "" && (
                  <div className="px-5 py-6 text-center">
                    <div className="text-[10px] uppercase tracking-[0.22em] text-cyan-300/80 mb-2 inline-flex items-center gap-1.5">
                      <Sparkles className="h-3 w-3" />
                      Search the whole library
                    </div>
                    <p className="text-sm text-white/55 max-w-sm mx-auto leading-relaxed">
                      Type a diagnosis, drug, lab pattern, or symptom. Press
                      <kbd className="mx-1 px-1.5 py-0.5 rounded border border-white/15 text-[10px] text-white/75">⏎</kbd>
                      to jump.
                    </p>
                  </div>
                )}

                {q.trim() !== "" && results.length === 0 && (
                  <div className="px-5 py-8 text-center text-sm text-white/50">
                    No matches for &quot;{q}&quot;.
                  </div>
                )}

                {results.length > 0 && (
                  <div className="py-2">
                    {results.map((r, i) => {
                      const meta = KIND_META[r.kind];
                      return (
                        <Link
                          key={`${r.kind}-${r.id}`}
                          href={r.href}
                          onMouseEnter={() => setActiveIdx(i)}
                          onClick={close}
                          className={`flex items-start gap-3 px-5 py-3 transition ${
                            i === activeIdx
                              ? "bg-white/[0.06]"
                              : "hover:bg-white/[0.03]"
                          }`}
                        >
                          <span
                            className={`mt-0.5 inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] ${meta.color}`}
                          >
                            {meta.icon}
                            {meta.label}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-white truncate">
                              {r.title}
                            </div>
                            <div className="text-xs text-white/55 line-clamp-2 mt-0.5">
                              {r.subtitle}
                            </div>
                            <div className="text-[10px] uppercase tracking-[0.18em] text-white/35 mt-1">
                              {r.category}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-white/5 px-5 py-2.5 text-[10px] text-white/40">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1">
                    <kbd className="px-1 py-0.5 rounded border border-white/15 text-white/65">↑↓</kbd>
                    navigate
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <kbd className="px-1 py-0.5 rounded border border-white/15 text-white/65">⏎</kbd>
                    select
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <kbd className="px-1 py-0.5 rounded border border-white/15 text-white/65">esc</kbd>
                    close
                  </span>
                </div>
                <span>{INDEX.length.toLocaleString()} items indexed</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SearchContext.Provider>
  );
}

// --------------------------------------------------------------------------
// Trigger button — drop in the Nav
// --------------------------------------------------------------------------

export function SearchTrigger() {
  const { open } = useGlobalSearch();
  return (
    <button
      onClick={open}
      className="hidden md:inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-xs text-white/60 hover:text-white hover:bg-white/[0.06] transition"
      aria-label="Search (Cmd+K)"
    >
      <Search className="h-3.5 w-3.5" />
      <span>Search</span>
      <span className="inline-flex items-center gap-0.5 text-[10px] text-white/40 border border-white/10 rounded px-1 ml-1">
        <Command className="h-2.5 w-2.5" />K
      </span>
    </button>
  );
}
