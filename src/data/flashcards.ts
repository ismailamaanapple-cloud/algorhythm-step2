// =============================================================================
// Pre-built flashcards — deterministically derived from NOTES at module load.
// Splits pearls and bullets on `→`, `:` or `=` into front/back pairs.
// Every card has a stable `source_id` so we can dedupe across sessions.
// =============================================================================

import type { Note } from "./notes";
import { NOTES } from "./notes";

export type Flashcard = {
  /** Stable id — `${noteId}:${type}:${idx}` so it survives content edits. */
  source_id: string;
  noteId: string;
  noteTitle: string;
  category: string;
  /** Where the card came from inside the note. */
  kind: "pearl" | "bullet" | "table";
  front: string;
  back: string;
  tags: string[];
};

// --- splitters --------------------------------------------------------------

const SPLITTERS = [" → ", " ⇒ ", " => ", ": ", " = "];

function trySplit(text: string): [string, string] | null {
  const t = text.trim().replace(/\s+/g, " ");
  for (const sep of SPLITTERS) {
    const idx = t.indexOf(sep);
    // Must have meaningful content on both sides, and not start the line with the separator.
    if (idx > 4 && idx < t.length - 4) {
      const left = t.slice(0, idx).trim();
      const right = t.slice(idx + sep.length).trim();
      if (left.length >= 3 && right.length >= 3 && left.length < 220) {
        return [left, right];
      }
    }
  }
  return null;
}

function cleanFront(s: string): string {
  // Trim trailing punctuation and turn into a prompt-shaped string.
  return s.replace(/[:.;,]+$/, "").trim();
}

function cleanBack(s: string): string {
  return s.replace(/\s+/g, " ").trim();
}

// --- generators -------------------------------------------------------------

function cardsForNote(note: Note): Flashcard[] {
  const cards: Flashcard[] = [];

  // 1. Pearls — each pearl becomes a card. Prefer split if natural.
  (note.pearls ?? []).forEach((pearl, i) => {
    const split = trySplit(pearl);
    if (split) {
      const [front, back] = split;
      cards.push({
        source_id: `${note.id}:pearl:${i}`,
        noteId: note.id,
        noteTitle: note.title,
        category: note.category,
        kind: "pearl",
        front: cleanFront(front) + "?",
        back: cleanBack(back),
        tags: [note.category, "pearl"],
      });
    } else {
      // Whole-pearl cloze — front is the note + "Pearl" + first 8 words.
      const words = pearl.trim().split(/\s+/);
      const teaser = words.slice(0, 6).join(" ");
      cards.push({
        source_id: `${note.id}:pearl:${i}`,
        noteId: note.id,
        noteTitle: note.title,
        category: note.category,
        kind: "pearl",
        front: `${note.title}: complete the pearl — "${teaser}…"`,
        back: cleanBack(pearl),
        tags: [note.category, "pearl"],
      });
    }
  });

  // 2. Bullets — only those with a natural split (arrow/colon). Caps at 6 per
  // section to keep the deck readable.
  (note.sections ?? []).forEach((section, si) => {
    let added = 0;
    section.bullets.forEach((bullet, bi) => {
      if (added >= 6) return;
      const split = trySplit(bullet);
      if (!split) return;
      const [front, back] = split;
      cards.push({
        source_id: `${note.id}:bullet:${si}:${bi}`,
        noteId: note.id,
        noteTitle: note.title,
        category: note.category,
        kind: "bullet",
        front: `${cleanFront(front)}?`,
        back: cleanBack(back),
        tags: [note.category, section.heading],
      });
      added++;
    });
  });

  // 3. Table rows — every row in a 2-column table becomes a card.
  (note.tables ?? []).forEach((table, ti) => {
    if (table.headers.length !== 2) return; // only clean 2-col tables
    const [hL, hR] = table.headers;
    table.rows.forEach((row, ri) => {
      if (row.length !== 2) return;
      const [l, r] = row;
      if (!l || !r || l.length < 2 || r.length < 2) return;
      cards.push({
        source_id: `${note.id}:table:${ti}:${ri}`,
        noteId: note.id,
        noteTitle: note.title,
        category: note.category,
        kind: "table",
        front: `${l} — ${hR.toLowerCase()}?`,
        back: cleanBack(r),
        tags: [note.category, table.caption ?? hL],
      });
    });
  });

  return cards;
}

export const PREBUILT_FLASHCARDS: Flashcard[] = NOTES.flatMap(cardsForNote);

export const PREBUILT_DECKS: { noteId: string; title: string; category: string; cards: Flashcard[] }[] =
  NOTES.map((n) => ({
    noteId: n.id,
    title: n.title,
    category: n.category,
    cards: PREBUILT_FLASHCARDS.filter((c) => c.noteId === n.id),
  })).filter((d) => d.cards.length > 0);

export function getDeckByNoteId(noteId: string) {
  return PREBUILT_DECKS.find((d) => d.noteId === noteId);
}

/** Group decks by category for the library view. */
export function decksByCategory() {
  const map = new Map<string, typeof PREBUILT_DECKS>();
  for (const deck of PREBUILT_DECKS) {
    const arr = map.get(deck.category) ?? [];
    arr.push(deck);
    map.set(deck.category, arr);
  }
  return [...map.entries()]
    .map(([category, decks]) => ({ category, decks }))
    .sort((a, b) => a.category.localeCompare(b.category));
}

export function totalCardCount(): number {
  return PREBUILT_FLASHCARDS.length;
}
