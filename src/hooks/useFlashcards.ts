"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/lib/auth/AuthProvider";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { PREBUILT_FLASHCARDS, type Flashcard } from "@/data/flashcards";
import { newCardState, reviewCard, type Grade, type SrsState } from "@/lib/srs";

export type ReviewRow = SrsState & { card_id: string };

/**
 * Builds the list of cards in a given deck (or all) merged with the user's
 * SRS state from Supabase. Cards without a review row use a fresh state.
 */
export function useDeck(noteId?: string) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Map<string, ReviewRow>>(new Map());
  const [loading, setLoading] = useState(true);

  const cards: Flashcard[] = noteId
    ? PREBUILT_FLASHCARDS.filter((c) => c.noteId === noteId)
    : PREBUILT_FLASHCARDS;

  useEffect(() => {
    if (!user) {
      setReviews(new Map());
      setLoading(false);
      return;
    }
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    let active = true;

    (async () => {
      setLoading(true);
      // 1. Ensure prebuilt cards exist in DB as user-owned rows. We use a
      //    deterministic source_id so re-runs are idempotent (UNIQUE on
      //    user_id+source_id would be nicer but a SELECT-then-insert works).
      const sourceIds = cards.map((c) => c.source_id);
      const { data: existing } = await supabase
        .from("flashcards")
        .select("id, source_id")
        .eq("user_id", user.id)
        .in("source_id", sourceIds);
      const existingRows = (existing ?? []) as { id: string; source_id: string }[];
      const have = new Set(existingRows.map((r) => r.source_id));
      const toInsert = cards
        .filter((c) => !have.has(c.source_id))
        .map((c) => ({
          user_id: user.id,
          source_type: "prebuilt" as const,
          source_id: c.source_id,
          note_id: c.noteId,
          front: c.front,
          back: c.back,
          tags: c.tags,
        }));
      if (toInsert.length > 0) {
        await supabase.from("flashcards").insert(toInsert);
      }

      // 2. Now read back the canonical id↔source_id mapping.
      const { data: allRows } = await supabase
        .from("flashcards")
        .select("id, source_id")
        .eq("user_id", user.id)
        .in("source_id", sourceIds);
      const allRowsTyped = (allRows ?? []) as { id: string; source_id: string }[];
      const sourceToId = new Map<string, string>(
        allRowsTyped.map((r): [string, string] => [r.source_id, r.id]),
      );

      // 3. Pull review rows for all known card ids.
      const ids = [...sourceToId.values()];
      const { data: revRows } = await supabase
        .from("flashcard_reviews")
        .select("card_id, ease_factor, interval_days, repetitions, due_date, last_quality")
        .eq("user_id", user.id)
        .in("card_id", ids);
      const map = new Map<string, ReviewRow>();
      for (const r of revRows ?? []) {
        map.set(r.card_id, {
          card_id: r.card_id as string,
          ease_factor: r.ease_factor as number,
          interval_days: r.interval_days as number,
          repetitions: r.repetitions as number,
          due_date: r.due_date as string,
          last_quality: r.last_quality as number | undefined,
        });
      }
      // Attach the dbId onto each card via the returned map so the consumer can
      // grade them. We piggyback by storing it under source_id key.
      const annotated = new Map<string, ReviewRow>(map);
      for (const [sid, dbId] of sourceToId) {
        if (!annotated.has(dbId)) {
          annotated.set(dbId, {
            card_id: dbId,
            ...newCardState(),
          });
        }
        // Reverse-lookup convenience entry:
        annotated.set(`__src:${sid}`, { card_id: dbId, ...newCardState() });
      }
      if (!active) return;
      setReviews(annotated);
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [user, noteId, cards.length]); // re-run on user/deck change

  const getDbId = useCallback(
    (sourceId: string) => reviews.get(`__src:${sourceId}`)?.card_id,
    [reviews],
  );

  const gradeCard = useCallback(
    async (sourceId: string, grade: Grade) => {
      if (!user) return;
      const supabase = getSupabaseBrowserClient();
      if (!supabase) return;
      const dbId = getDbId(sourceId);
      if (!dbId) return;
      const prev = reviews.get(dbId) ?? { card_id: dbId, ...newCardState() };
      const next = reviewCard(prev, grade);
      await supabase.from("flashcard_reviews").upsert(
        {
          user_id: user.id,
          card_id: dbId,
          ease_factor: next.ease_factor,
          interval_days: next.interval_days,
          repetitions: next.repetitions,
          due_date: next.due_date,
          last_quality: next.last_quality,
          last_reviewed_at: new Date().toISOString(),
        },
        { onConflict: "user_id,card_id" },
      );
      setReviews((prevMap) => {
        const m = new Map(prevMap);
        m.set(dbId, { card_id: dbId, ...next });
        return m;
      });
    },
    [user, reviews, getDbId],
  );

  /** Cards due today (or earlier). For unauthed users, all cards are "new". */
  const today = new Date().toISOString().slice(0, 10);
  const dueCards: Flashcard[] = cards.filter((c) => {
    if (!user) return true;
    const dbId = getDbId(c.source_id);
    const r = dbId ? reviews.get(dbId) : null;
    return !r || r.due_date <= today;
  });

  return {
    cards,
    dueCards,
    reviews,
    loading,
    gradeCard,
    isAuthed: Boolean(user),
  };
}
