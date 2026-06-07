// =============================================================================
// Flashcard generator v2 — built for quality, not just quantity.
//
// Sources (in order of yield):
//   1. CASES → vignette → diagnosis + concise management. ~280 cards.
//      Backs are now tight: 1 line of diagnosis + 1 line of next step.
//   2. PEARLS → every pearl becomes a card. Arrow-split → direct Q/A,
//      otherwise cloze-style ("In [note title], what's the rule about
//      [first 8 words]?" → full pearl).
//   3. NOTE TABLES → every 2-col row becomes a card. Column headers drive
//      direction (presentation→diagnosis is flipped so the front is the
//      finding and the back is the disease).
//   4. SECTION BULLETS with explicit fact pattern ("X: Y" or "X → Y").
//      Skips fluff bullets. ~thousands of these.
//
// Decks:
//   * Per-CATEGORY mega-decks (the new primary browse surface): all cards in
//     Cardiology, Pharmacology, OB/GYN, etc. — bigger, more useful study
//     sessions.
//   * Per-CASE-topic decks: just the vignette cards for that specialty.
//   * Per-NOTE decks: cards from a single note (kept for the "open deck for
//     this note" sidebar link).
// =============================================================================

import type { Note, NoteTable, NoteSection } from "./notes";
import type { Case } from "./cases";
import { NOTES } from "./notes";
import { CASES } from "./cases";

export type FlashcardKind = "case" | "pearl" | "table" | "bullet";

export type Flashcard = {
  /** Stable id so SRS state survives content edits. */
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
// Text utilities
// --------------------------------------------------------------------------

const ARROW = /[→⇒]/;
const SPLIT_FORWARD = / [→⇒] | => | -> /;
const SPLIT_COLON = /:\s+/;

const DISEASE_HEADERS =
  /disease|condition|diagnos|syndrome|disorder|cancer|tumor|infection|cause|etiology|organism|pathogen|name|finding/i;
const PRESENT_HEADERS =
  /present|sign|symptom|feature|histor|labs?|imaging|exam|trigger|when|setting|scenario|pattern/i;
const MGMT_HEADERS =
  /treat|manag|therap|drug|antibiot|step|next|workup|test|approach|action|antidote|reversal/i;

function clean(s: string): string {
  return s.replace(/\s+/g, " ").trim();
}

function trimTrailingPunct(s: string): string {
  return s.replace(/[\s.;:,]+$/, "");
}

export function slugifyTopic(s: string): string {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Common fluff bullets that don't make useful flashcards.
function isFluff(text: string): boolean {
  const t = text.toLowerCase().trim();
  if (t.length < 20) return true;
  if (t.length > 320) return true;
  if (/^\s*(also|note|note that|note:|see also|see below|see above|other|miscellaneous)/i.test(t))
    return true;
  return false;
}

// --------------------------------------------------------------------------
// Source 1 — Cases. Compact, exam-style flashcards.
// --------------------------------------------------------------------------

function cardForCase(c: Case): Flashcard {
  const correct = c.options.find((o) => o.isCorrect);
  // Compact back: diagnosis on one line, then ONE line for the next step.
  // No bullets, no exploded rationale — those live in the case detail page.
  const back = correct
    ? `${c.diagnosis}\n\nNext step → ${correct.label}`
    : c.diagnosis;
  return {
    source_id: `case:${c.id}`,
    caseId: c.id,
    category: c.topic,
    kind: "case",
    front: c.stem,
    back,
    tags: [c.topic, "case", c.difficulty],
  };
}

// --------------------------------------------------------------------------
// Source 2 — Pearls (every pearl gets a card now)
// --------------------------------------------------------------------------

function cardForPearl(note: Note, pearl: string, idx: number): Flashcard | null {
  const text = clean(pearl);
  if (text.length < 16 || text.length > 380) return null;

  // 1) Try a natural arrow split — produces the cleanest Q/A.
  const arrowParts = text.split(SPLIT_FORWARD);
  if (arrowParts.length === 2) {
    const front = trimTrailingPunct(arrowParts[0]);
    const back = trimTrailingPunct(arrowParts[1]);
    if (front.length >= 8 && back.length >= 4 && front.length < 220) {
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

  // 2) Cloze style — front asks for the pearl, back IS the pearl.
  //    Front is keyed off the note title so it's unique per pearl.
  return {
    source_id: `${note.id}:pearl:${idx}`,
    noteId: note.id,
    category: note.category,
    kind: "pearl",
    front: `${note.title} — high-yield rule (pearl #${idx + 1})?`,
    back: text,
    tags: [note.category, "pearl", note.title],
  };
}

// --------------------------------------------------------------------------
// Source 3 — Table rows
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
  if (!cL || !cR || cL.length < 3 || cR.length < 3) return null;
  if (cL.length > 300 || cR.length > 320) return null;

  const leftDisease = DISEASE_HEADERS.test(hL);
  const rightDisease = DISEASE_HEADERS.test(hR);
  const leftPresent = PRESENT_HEADERS.test(hL);
  const rightPresent = PRESENT_HEADERS.test(hR);
  const leftMgmt = MGMT_HEADERS.test(hL);
  const rightMgmt = MGMT_HEADERS.test(hR);

  let front: string;
  let back: string;

  if (leftDisease && rightPresent) {
    // The exam tests presentation→dx, so flip.
    front = cR;
    back = cL;
  } else if (leftPresent && rightDisease) {
    front = cL;
    back = cR;
  } else if (leftDisease && rightMgmt) {
    front = `${cL} — ${hR.toLowerCase()}?`;
    back = cR;
  } else if (leftMgmt && rightDisease) {
    front = `${hL} for ${cR}?`;
    back = cL;
  } else {
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
// Source 4 — Bullets (NEW — pulls high-yield bullets across all notes)
// --------------------------------------------------------------------------

function cardsForSection(
  note: Note,
  section: NoteSection,
  si: number,
): Flashcard[] {
  const out: Flashcard[] = [];
  for (let bi = 0; bi < section.bullets.length; bi++) {
    const raw = section.bullets[bi];
    if (isFluff(raw)) continue;
    const text = clean(raw);

    // Pattern A: "X → Y" — direct Q/A.
    if (ARROW.test(text)) {
      const parts = text.split(SPLIT_FORWARD);
      if (parts.length === 2) {
        const front = trimTrailingPunct(parts[0]);
        const back = trimTrailingPunct(parts[1]);
        if (front.length >= 8 && back.length >= 4 && front.length < 220 && back.length < 300) {
          out.push({
            source_id: `${note.id}:bullet:${si}:${bi}`,
            noteId: note.id,
            category: note.category,
            kind: "bullet",
            front: front.endsWith("?") ? front : `${front}?`,
            back,
            tags: [note.category, "bullet", section.heading],
          });
          continue;
        }
      }
    }

    // Pattern B: "X: Y" — colon-defined fact (e.g., "Cushing triad: hypertension, bradycardia, irregular respirations")
    if (SPLIT_COLON.test(text)) {
      const idx = text.indexOf(": ");
      if (idx > 4 && idx < text.length - 4) {
        const front = trimTrailingPunct(text.slice(0, idx));
        const back = trimTrailingPunct(text.slice(idx + 2));
        if (front.length >= 6 && back.length >= 6 && front.length < 200 && back.length < 320) {
          out.push({
            source_id: `${note.id}:bullet:${si}:${bi}`,
            noteId: note.id,
            category: note.category,
            kind: "bullet",
            front: `${front}?`,
            back,
            tags: [note.category, "bullet", section.heading],
          });
          continue;
        }
      }
    }

    // Pattern C: "X — Y" em-dash defined fact
    const dashIdx = text.indexOf(" — ");
    if (dashIdx > 6 && dashIdx < text.length - 6) {
      const front = trimTrailingPunct(text.slice(0, dashIdx));
      const back = trimTrailingPunct(text.slice(dashIdx + 3));
      if (front.length >= 6 && back.length >= 6 && front.length < 200 && back.length < 320) {
        out.push({
          source_id: `${note.id}:bullet:${si}:${bi}`,
          noteId: note.id,
          category: note.category,
          kind: "bullet",
          front: `${front}?`,
          back,
          tags: [note.category, "bullet", section.heading],
        });
        continue;
      }
    }

    // Otherwise skip — we don't want fluff cards
  }
  return out;
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
  (note.sections ?? []).forEach((s, si) => {
    cards.push(...cardsForSection(note, s, si));
  });
  return cards;
});

// De-dupe by source_id (paranoia).
const seenIds = new Set<string>();
const ALL_RAW = [...CASE_CARDS, ...NOTE_CARDS];
export const PREBUILT_FLASHCARDS: Flashcard[] = ALL_RAW.filter((c) => {
  if (seenIds.has(c.source_id)) return false;
  seenIds.add(c.source_id);
  return true;
});

// --------------------------------------------------------------------------
// Decks
// --------------------------------------------------------------------------

export type Deck = {
  id: string;
  title: string;
  category: string;
  source: "case" | "note" | "category-mega" | "case-mega";
  cards: Flashcard[];
};

// 1. Per-note decks (note pearls + tables + bullets).
const NOTE_DECKS: Deck[] = NOTES.map((n) => {
  const cards = PREBUILT_FLASHCARDS.filter((c) => c.noteId === n.id);
  return {
    id: n.id,
    title: n.title,
    category: n.category,
    source: "note" as const,
    cards,
  };
}).filter((d) => d.cards.length > 0);

// 2. Per-case-topic decks (vignettes only).
const CASE_TOPICS = Array.from(new Set(CASES.map((c) => c.topic))).sort();
const CASE_DECKS: Deck[] = CASE_TOPICS.map((topic) => {
  const cards = CASE_CARDS.filter((c) => c.category === topic);
  return {
    id: `case-${slugifyTopic(topic)}`,
    title: `${topic} — case vignettes`,
    category: topic,
    source: "case" as const,
    cards,
  };
}).filter((d) => d.cards.length > 0);

// 3. Per-category mega-decks (NEW — everything in a specialty, mixed).
const ALL_CATEGORIES = Array.from(
  new Set(PREBUILT_FLASHCARDS.map((c) => c.category)),
).sort();
const MEGA_DECKS: Deck[] = ALL_CATEGORIES.map((cat) => {
  const cards = PREBUILT_FLASHCARDS.filter((c) => c.category === cat);
  return {
    id: `mega-${slugifyTopic(cat)}`,
    title: `${cat} — all flashcards`,
    category: cat,
    source: "category-mega" as const,
    cards,
  };
}).filter((d) => d.cards.length >= 5);

export const PREBUILT_DECKS: Deck[] = [...MEGA_DECKS, ...CASE_DECKS, ...NOTE_DECKS];

export function getDeck(id: string): Deck | undefined {
  return PREBUILT_DECKS.find((d) => d.id === id);
}

/** Group decks by category for the library view. */
export function decksByCategory(): { category: string; decks: Deck[] }[] {
  const m = new Map<string, Deck[]>();
  for (const d of PREBUILT_DECKS) {
    const arr = m.get(d.category) ?? [];
    arr.push(d);
    m.set(d.category, arr);
  }
  // Within each category: mega → cases → individual notes.
  for (const [, arr] of m) {
    arr.sort((a, b) => {
      const order = { "category-mega": 0, case: 1, note: 2, "case-mega": 3 };
      if (a.source !== b.source) return (order[a.source] ?? 9) - (order[b.source] ?? 9);
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
