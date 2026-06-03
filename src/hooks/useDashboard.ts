"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth/AuthProvider";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { CASES } from "@/data/cases";
import { NOTES } from "@/data/notes";
import { PREBUILT_FLASHCARDS, type Flashcard } from "@/data/flashcards";

export type CategoryStats = {
  category: string;
  // Cases
  casesAttempted: number;
  casesCorrect: number;
  casesTotal: number;
  // Flashcards
  cardsReviewed: number;
  cardsStruggling: number; // last quality < 3 = "again" or "hard"
  cardsTotal: number;
  // Notes
  notesCompleted: number;
  notesTotal: number;
  // Derived
  accuracy: number;     // 0..1, based on cases + recent card grades
  mastery: number;      // 0..1, weighted score
};

export type WeakCard = Flashcard & { lastQuality: number; dueDate: string };

type CaseProgressRow = {
  case_id: string;
  correct: boolean | null;
  completed_at: string;
};
type ReviewRow = {
  card_id: string;
  source_id: string | null;
  last_quality: number | null;
  due_date: string;
};

export function useDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<CategoryStats[]>([]);
  const [weakCards, setWeakCards] = useState<WeakCard[]>([]);
  const [totals, setTotals] = useState({
    totalAttempts: 0,
    totalCorrect: 0,
    cardsReviewed: 0,
    notesDone: 0,
  });

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setLoading(false);
      return;
    }
    let active = true;

    (async () => {
      setLoading(true);

      // ----------------- Pull all the rows we need ----------------------
      const [{ data: caseRows }, { data: noteRows }, { data: reviewRows }] =
        await Promise.all([
          supabase
            .from("case_progress")
            .select("case_id, correct, completed_at")
            .eq("user_id", user.id),
          supabase
            .from("note_progress")
            .select("note_id")
            .eq("user_id", user.id),
          supabase
            .from("flashcard_reviews")
            .select("card_id, last_quality, due_date, flashcards(source_id)")
            .eq("user_id", user.id),
        ]);

      const cases = (caseRows ?? []) as CaseProgressRow[];
      const notesDoneSet = new Set(
        ((noteRows ?? []) as { note_id: string }[]).map((r) => r.note_id),
      );
      const reviews = ((reviewRows ?? []) as unknown) as Array<
        Omit<ReviewRow, "source_id"> & { flashcards: { source_id: string } | null }
      >;

      // Build a sourceId → review map.
      const reviewBySource = new Map<string, { lastQuality: number; due: string }>();
      for (const r of reviews) {
        const sid = r.flashcards?.source_id;
        if (!sid) continue;
        reviewBySource.set(sid, {
          lastQuality: r.last_quality ?? 0,
          due: r.due_date,
        });
      }

      // ----------------- Aggregate by category --------------------------
      const allCategories = new Set<string>([
        ...CASES.map((c) => c.topic),
        ...NOTES.map((n) => n.category),
      ]);

      const out: CategoryStats[] = [...allCategories]
        .sort()
        .map((category) => {
          const catCases = CASES.filter((c) => c.topic === category);
          const catCaseIds = new Set(catCases.map((c) => c.id));
          const catNotes = NOTES.filter((n) => n.category === category);
          const catCards = PREBUILT_FLASHCARDS.filter((c) => c.category === category);

          const attempts = cases.filter((r) => catCaseIds.has(r.case_id));
          const correct = attempts.filter((r) => r.correct === true).length;

          const reviewedCards = catCards.filter((c) => reviewBySource.has(c.source_id));
          const struggling = reviewedCards.filter((c) => {
            const r = reviewBySource.get(c.source_id);
            return r && r.lastQuality < 3;
          }).length;

          const notesDone = catNotes.filter((n) => notesDoneSet.has(n.id)).length;

          // Accuracy: case correctness weighted with flashcard recent quality
          const caseAcc = attempts.length > 0 ? correct / attempts.length : 0;
          const cardAcc =
            reviewedCards.length > 0
              ? reviewedCards.filter((c) => (reviewBySource.get(c.source_id)?.lastQuality ?? 0) >= 3)
                  .length / reviewedCards.length
              : 0;
          const denom = (attempts.length > 0 ? 1 : 0) + (reviewedCards.length > 0 ? 1 : 0);
          const accuracy = denom === 0 ? 0 : (caseAcc + cardAcc) / denom;

          // Mastery: blends case exposure, card exposure, note coverage
          const caseCov = catCases.length === 0 ? 0 : attempts.length / catCases.length;
          const cardCov = catCards.length === 0 ? 0 : reviewedCards.length / catCards.length;
          const noteCov = catNotes.length === 0 ? 0 : notesDone / catNotes.length;
          const coverage = (caseCov + cardCov + noteCov) / 3;
          const mastery = accuracy * 0.6 + coverage * 0.4;

          return {
            category,
            casesAttempted: attempts.length,
            casesCorrect: correct,
            casesTotal: catCases.length,
            cardsReviewed: reviewedCards.length,
            cardsStruggling: struggling,
            cardsTotal: catCards.length,
            notesCompleted: notesDone,
            notesTotal: catNotes.length,
            accuracy,
            mastery,
          };
        })
        .filter((s) => s.casesTotal + s.cardsTotal + s.notesTotal > 0);

      // ----------------- Weak cards list --------------------------------
      const weak: WeakCard[] = PREBUILT_FLASHCARDS
        .map((c) => {
          const r = reviewBySource.get(c.source_id);
          if (!r) return null;
          if (r.lastQuality >= 3) return null;
          return { ...c, lastQuality: r.lastQuality, dueDate: r.due };
        })
        .filter((c): c is WeakCard => c !== null)
        .sort((a, b) => a.lastQuality - b.lastQuality)
        .slice(0, 30);

      if (!active) return;
      setStats(out);
      setWeakCards(weak);
      setTotals({
        totalAttempts: cases.length,
        totalCorrect: cases.filter((c) => c.correct === true).length,
        cardsReviewed: reviews.length,
        notesDone: notesDoneSet.size,
      });
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [user]);

  return { stats, weakCards, totals, loading, isAuthed: Boolean(user) };
}
