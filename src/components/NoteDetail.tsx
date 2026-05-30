"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, ChevronRight, Play } from "lucide-react";
import type { Note } from "@/data/notes";
import { NOTES } from "@/data/notes";
import { CASES } from "@/data/cases";

const SESSION_COLORS: Record<1 | 2 | 3, string> = {
  1: "from-violet-500 to-purple-700",
  2: "from-rose-500 to-red-700",
  3: "from-amber-500 to-orange-700",
};

export default function NoteDetail({ note }: { note: Note }) {
  const relatedCases = (note.relatedCaseIds ?? [])
    .map((id) => CASES.find((c) => c.id === id))
    .filter((c): c is NonNullable<typeof c> => !!c);

  const moreInCategory = NOTES.filter(
    (n) => n.category === note.category && n.session === note.session && n.id !== note.id,
  ).slice(0, 5);

  return (
    <div className="min-h-[100dvh] flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-30 backdrop-blur-md bg-black/50 border-b border-white/5">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center gap-4">
          <Link href="/notes" className="inline-flex items-center gap-1.5 text-sm text-white/65 hover:text-white transition shrink-0">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Notes</span>
          </Link>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-white/45">
              <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-br ${SESSION_COLORS[note.session]}`} />
              Session {note.session} · {note.category}
            </div>
            <div className="truncate text-sm font-semibold tracking-tight">{note.title}</div>
          </div>
        </div>
      </div>

      <div className="flex-1 mx-auto max-w-5xl w-full px-6 py-8 md:py-12">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="text-xs uppercase tracking-[0.22em] text-cyan-300/80 mb-3">{note.category}</div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{note.title}</h1>
          <p className="text-white/65 text-base md:text-lg max-w-3xl leading-relaxed">{note.summary}</p>
        </motion.div>

        {/* Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
          <div className="space-y-6 min-w-0">
            {(note.sections ?? []).map((section, i) => (
              <motion.div
                key={section.heading}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="glass rounded-2xl p-6"
              >
                <h2 className="text-base font-semibold tracking-tight mb-3 flex items-center gap-2">
                  <span className="text-cyan-300">◆</span>
                  {section.heading}
                </h2>
                <ul className="space-y-2">
                  {section.bullets.map((b, j) => (
                    <li key={j} className="flex gap-2.5 text-sm text-white/80 leading-relaxed">
                      <span className="text-white/30 mt-1.5 shrink-0">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Tables */}
            {note.tables?.map((table, ti) => (
              <motion.div
                key={ti}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: ((note.sections?.length ?? 0) + ti) * 0.04 }}
                className="glass rounded-2xl p-6"
              >
                {table.caption && (
                  <h2 className="text-base font-semibold tracking-tight mb-3">{table.caption}</h2>
                )}
                <div className="overflow-x-auto -mx-2">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        {table.headers.map((h) => (
                          <th key={h} className="text-left py-2 px-2 text-[10px] uppercase tracking-[0.18em] text-white/55 font-medium">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {table.rows.map((row, ri) => (
                        <tr key={ri} className="border-b border-white/[0.06] last:border-0">
                          {row.map((cell, ci) => (
                            <td key={ci} className="py-3 px-2 text-white/80 align-top text-xs md:text-sm leading-relaxed">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            ))}

            {/* Pearls */}
            {note.pearls && note.pearls.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: ((note.sections?.length ?? 0) + (note.tables?.length ?? 0)) * 0.04 }}
                className="glass-strong rounded-2xl p-6 border-2 border-amber-400/30"
              >
                <h2 className="text-sm uppercase tracking-[0.22em] text-amber-300 mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  High-yield pearls
                </h2>
                <ul className="space-y-2">
                  {note.pearls.map((p, i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-white/85 leading-relaxed">
                      <span className="text-amber-300 mt-0.5 shrink-0">◆</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {relatedCases.length > 0 && (
              <div className="glass rounded-2xl p-5">
                <div className="text-[10px] uppercase tracking-[0.22em] text-amber-300/80 mb-3 flex items-center gap-2">
                  <Play className="h-3 w-3" /> Practice cases
                </div>
                <div className="space-y-2">
                  {relatedCases.map((c) => (
                    <Link
                      key={c.id}
                      href={`/cases/${c.id}`}
                      className="group flex items-start gap-2 rounded-lg px-3 py-2 -mx-1 hover:bg-white/[0.04] transition"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-300/60 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-white/85 leading-snug">{c.diagnosis}</div>
                      </div>
                      <ChevronRight className="h-3 w-3 text-white/30 group-hover:text-amber-300 group-hover:translate-x-0.5 transition mt-1" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {moreInCategory.length > 0 && (
              <div className="glass rounded-2xl p-5">
                <div className="text-[10px] uppercase tracking-[0.22em] text-cyan-300/80 mb-3">
                  More in {note.category}
                </div>
                <div className="space-y-2">
                  {moreInCategory.map((m) => (
                    <Link
                      key={m.id}
                      href={`/notes/${m.id}`}
                      className="group flex items-start gap-2 rounded-lg px-3 py-2 -mx-1 hover:bg-white/[0.04] transition"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-300/60 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-white/85 leading-snug">{m.title}</div>
                      </div>
                      <ChevronRight className="h-3 w-3 text-white/30 group-hover:text-cyan-300 group-hover:translate-x-0.5 transition mt-1" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
