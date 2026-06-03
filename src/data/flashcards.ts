// =============================================================================
// Pre-built flashcards — built deliberately, not by stupid string-splitting.
//
// Three sources, in order of quality:
//   1. CASES  → vignette → diagnosis (+ next step + key teaching pts).  THE
//      highest-yield cards. ~250+ of them, all hand-written board stems.
//   2. PEARLS → only those with a clean arrow split ("X → Y"). Skip the rest.
//   3. TABLES → 2-col tables whose column headers map cleanly to a Q/A. We
//      detect "disease/presentation" patterns and flip the card direction so
//      the front is the presentation (the way the exam tests you).
//
// Every card has a stable `source_id` so SRS state survives content edits.
// =============================================================================

import type { Note, NoteTable } from "./notes";
import type { Case } from "./cases";
import { NOTES } from "./notes";
import { CASES } from "./cases";

export type FlashcardKind = "case" | "pearl" | "table";

export type Flashcard = {
  /** Stable id — survives edits so SRS state stays attached. */
  source_id: string;
  noteId?: string;
  caseId?: string;
  category: string;
  kind: FlashcardKind;
  front: string;
  back: string;
  tags: string[];
};

// --------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------

const ARROW = /[→⇒]/;
// Headers that mean "this column is the disease / diagnosis / answer".
const DISEASE_HEADERS =
  /disease|condition|diagnos|syndrome|disorder|cancer|tumor|infection|cause|etiology|organism|pathogen|name/i;
// Headers that mean "this column is the clinical findings / presentation".
const PRESENT_HEADERS =
  /present|sign|symptom|feature|finding|histor|labs?|imaging|exam|trigger|when|setting|scenario/i;
// Headers that mean "this column is the treatment / management".
const MGMT_HEADERS =
  /treat|manag|therap|drug|antibiot|step|next|workup|test|approach/i;

function clean(s: string): string {
  return s.replace(/\s+/g, " ").trim();
}

export function slugifyTopic(s: string): string {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// --------------------------------------------------------------------------
// Source 1 — Cases (the gold standard)
// --------------------------------------------------------------------------

function cardForCase(c: Case): Flashcard {
  const correct = c.options.find((o) => o.isCorrect);
  const mgmt = correct
    ? `\n\nNext step → ${correct.label}\n${correct.rationale}`
    : "";
  const points = c.keyPoints.length
    ? "\n\n" + c.keyPoints.map((k) => `• ${k}`).join("\n")
    : "";
  return {
    source_id: `case:${c.id}`,
    caseId: c.id,
    category: c.topic,
    kind: "case",
    front: c.stem,
    back: `${c.diagnosis}${mgmt}${points}`,
    tags: [c.topic, "case", c.difficulty],
  };
}

// --------------------------------------------------------------------------
// Source 2 — Pearls (only if naturally split)
// --------------------------------------------------------------------------

function cardForPearl(note: Note, pearl: string, idx: number): Flashcard | null {
  const text = clean(pearl);
  if (text.length < 24 || text.length > 360) return null;

  // Arrow split: "Setting / trigger → action / answer"
  const m = text.match(ARROW);
  if (m && m.index !== undefined) {
    const i = m.index;
    const front = text.slice(0, i).replace(/[\s:;,]+$/, "").trim();
    const back = text.slice(i + 1).replace(/^[\s:;,]+/, "").trim();
    if (front.length >= 10 && back.length >= 6 && front.length < 200) {
      return {
        source_id: `${note.id}:pearl:${idx}`,
        noteId: note.id,
        category: note.category,
        kind: "pearl",
        front: front.endsWith("?") ? front : `${front}?`,
        back,
        tags: [note.category, "pearl", note.title],
      };
    }
  }

  return null; // Don't ship pearls without a clean Q/A split.
}

// --------------------------------------------------------------------------
// Source 3 — Tables (column-aware, flipped to vignette-first when sensible)
// --------------------------------------------------------------------------

function cardForTableRow(
  note: Note,
  table: NoteTable,
  ti: number,
  row: string[],
  ri: number,
): Flashcard | null {
  if (table.headers.length !== 2 || row.length !== 2) return null;
  const [hL, hR] = table.headers.map((h) => clean(h));
  const [cL, cR] = row.map((c) => clean(c));
  if (!cL || !cR || cL.length < 3 || cR.length < 3 || cL.length > 280 || cR.length > 320) {
    return null;
  }

  const leftDisease = DISEASE_HEADERS.test(hL);
  const rightDisease = DISEASE_HEADERS.test(hR);
  const leftPresent = PRESENT_HEADERS.test(hL);
  const rightPresent = PRESENT_HEADERS.test(hR);
  const leftMgmt = MGMT_HEADERS.test(hL);
  const rightMgmt = MGMT_HEADERS.test(hR);

  let front: string;
  let back: string;

  if (leftDisease && rightPresent) {
    // Flip — exam tests "presentation → name the dx"
    front = cR;
    back = cL;
  } else if (leftPresent && rightDisease) {
    front = cL;
    back = cR;
  } else if (leftDisease && rightMgmt) {
    front = `${hR} for ${cL}?`;
    back = cR;
  } else if (leftMgmt && rightDisease) {
    front = `${hL} for ${cR}?`;
    back = cL;
  } else {
    // Default: use the right column as the "answer" — most tables read L→R.
    front = `${cL} — ${hR.toLowerCase()}?`;
    back = cR;
  }

  return {
    source_id: `${note.id}:table:${ti}:${ri}`,
    noteId: note.id,
    category: note.category,
    kind: "table",
    front,
    back,
    tags: [note.category, "table", table.caption ?? hL],
  };
}

// --------------------------------------------------------------------------
// Build cards
// --------------------------------------------------------------------------

const CASE_CARDS: Flashcard[] = CASES.map(cardForCase);

const NOTE_CARDS: Flashcard[] = NOTES.flatMap((note) => {
  const cards: Flashcard[] = [];
  (note.pearls ?? []).forEach((p, i) => {
    const c = cardForPearl(note, p, i);
    if (c) cards.push(c);
  });
  (note.tables ?? []).forEach((t, ti) => {
    t.rows.forEach((row, ri) => {
      const c = cardForTableRow(note, t, ti, row, ri);
      if (c) cards.push(c);
    });
  });
  return cards;
});

export const PREBUILT_FLASHCARDS: Flashcard[] = [...CASE_CARDS, ...NOTE_CARDS];

// --------------------------------------------------------------------------
// Decks
// --------------------------------------------------------------------------

export type Deck = {
  id: string;            // 'case-neurology' | noteId
  title: string;
  category: string;
  source: "case" | "note";
  cards: Flashcard[];
};

const noteDecks: Deck[] = NOTES.map((n) => {
  const cards = NOTE_CARDS.filter((c) => c.noteId === n.id);
  return {
    id: n.id,
    title: n.title,
    category: n.category,
    source: "note" as const,
    cards,
  };
}).filter((d) => d.cards.length > 0);

const caseTopics = Array.from(new Set(CASES.map((c) => c.topic))).sort();
const caseDecks: Deck[] = caseTopics.map((topic) => {
  const cards = CASE_CARDS.filter((c) => c.category === topic);
  return {
    id: `case-${slugifyTopic(topic)}`,
    title: `${topic} — case vignettes`,
    category: topic,
    source: "case" as const,
    cards,
  };
});

export const PREBUILT_DECKS: Deck[] = [...caseDecks, ...noteDecks];

export function getDeck(id: string): Deck | undefined {
  return PREBUILT_DECKS.find((d) => d.id === id);
}

export function decksByCategory(): { category: string; decks: Deck[] }[] {
  const m = new Map<string, Deck[]>();
  for (const d of PREBUILT_DECKS) {
    const arr = m.get(d.category) ?? [];
    arr.push(d);
    m.set(d.category, arr);
  }
  // Cases-decks first within each category, then by title.
  for (const [, arr] of m) {
    arr.sort((a, b) => {
      if (a.source !== b.source) return a.source === "case" ? -1 : 1;
      return a.title.localeCompare(b.title);
    });
  }
  return [...m.entries()]
    .map(([category, decks]) => ({ category, decks }))
    .sort((a, b) => a.category.localeCompare(b.category));
}

export function totalCardCount(): number {
  return PREBUILT_FLASHCARDS.length;
}

export function totalCaseCardCount(): number {
  return CASE_CARDS.length;
}
