// =============================================================================
// SM-2 spaced-repetition algorithm (SuperMemo 2). Identical to Anki's core.
// quality: 0 (forgot) | 1 (forgot, but recognised) | 3 (Hard) | 4 (Good) | 5 (Easy)
// =============================================================================

export type SrsState = {
  ease_factor: number;   // EF, min 1.3
  interval_days: number; // I, days until next review
  repetitions: number;   // n, count of consecutive successful recalls
  due_date: string;      // ISO YYYY-MM-DD
  last_quality?: number;
};

export type Grade = "again" | "hard" | "good" | "easy";

const GRADE_TO_QUALITY: Record<Grade, number> = {
  again: 1,
  hard: 3,
  good: 4,
  easy: 5,
};

export function newCardState(today = new Date()): SrsState {
  return {
    ease_factor: 2.5,
    interval_days: 0,
    repetitions: 0,
    due_date: isoDate(today),
  };
}

export function reviewCard(state: SrsState, grade: Grade, today = new Date()): SrsState {
  const q = GRADE_TO_QUALITY[grade];

  let { ease_factor, interval_days, repetitions } = state;

  if (q < 3) {
    // Lapse — restart but keep ease (with a small penalty).
    repetitions = 0;
    interval_days = 1;
  } else {
    if (repetitions === 0) interval_days = 1;
    else if (repetitions === 1) interval_days = 6;
    else interval_days = Math.round(interval_days * ease_factor);
    repetitions += 1;
  }

  // Update ease factor (clamped at 1.3).
  ease_factor = ease_factor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  if (ease_factor < 1.3) ease_factor = 1.3;

  // "Easy" gets a small interval bonus.
  if (grade === "easy") interval_days = Math.round(interval_days * 1.3);

  const due = new Date(today);
  due.setDate(due.getDate() + interval_days);

  return {
    ease_factor,
    interval_days,
    repetitions,
    due_date: isoDate(due),
    last_quality: q,
  };
}

export function isDue(state: SrsState, today = new Date()): boolean {
  return state.due_date <= isoDate(today);
}

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}
