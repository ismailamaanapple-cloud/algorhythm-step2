"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/lib/auth/AuthProvider";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export type HighlightColor = "yellow" | "green" | "pink" | "blue";
export type SectionKind = "section" | "table" | "pearls" | "summary";

export type Highlight = {
  id: string;
  note_id: string;
  section_kind: SectionKind;
  section_idx: number;
  bullet_idx: number | null;
  start_offset: number;
  end_offset: number;
  text_content: string;
  color: HighlightColor;
  note: string | null;
};

export function useHighlights(noteId: string) {
  const { user } = useAuth();
  const [items, setItems] = useState<Highlight[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastError, setLastError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setItems([]);
      setLoading(false);
      return;
    }
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    let active = true;
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("highlights")
        .select("*")
        .eq("user_id", user.id)
        .eq("note_id", noteId)
        .order("created_at", { ascending: true });
      if (!active) return;
      if (error) {
        console.error("[useHighlights] load failed:", error);
        setLastError(error.message);
      }
      setItems((data ?? []) as Highlight[]);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [user, noteId]);

  // Optimistic insert: render a temp row immediately, swap with the real
  // server row once it lands. If the insert fails we surface the error and
  // roll the temp row back so the user can SEE that something went wrong
  // instead of silently nothing happening.
  const create = useCallback(
    async (input: Omit<Highlight, "id">): Promise<Highlight | null> => {
      if (!user) return null;
      const supabase = getSupabaseBrowserClient();
      if (!supabase) return null;

      const tempId = `tmp_${Math.random().toString(36).slice(2)}`;
      const optimistic: Highlight = { ...input, id: tempId };
      setItems((prev) => [...prev, optimistic]);

      const { data, error } = await supabase
        .from("highlights")
        .insert({ ...input, user_id: user.id })
        .select("*")
        .single();

      if (error || !data) {
        console.error("[useHighlights] insert failed:", error);
        setLastError(error?.message ?? "insert failed");
        // Roll back the optimistic row.
        setItems((prev) => prev.filter((h) => h.id !== tempId));
        return null;
      }
      const row = data as Highlight;
      // Replace temp with server row (keeps the order).
      setItems((prev) => prev.map((h) => (h.id === tempId ? row : h)));
      return row;
    },
    [user],
  );

  const remove = useCallback(
    async (id: string) => {
      if (!user) return;
      const supabase = getSupabaseBrowserClient();
      if (!supabase) return;
      // Optimistic remove
      const snapshot = items;
      setItems((prev) => prev.filter((h) => h.id !== id));
      const { error } = await supabase
        .from("highlights")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id);
      if (error) {
        console.error("[useHighlights] delete failed:", error);
        setLastError(error.message);
        setItems(snapshot);
      }
    },
    [user, items],
  );

  const makeFlashcard = useCallback(
    async (h: Highlight, front: string, back: string): Promise<boolean> => {
      if (!user) return false;
      const supabase = getSupabaseBrowserClient();
      if (!supabase) return false;
      // Don't link to temp ids — they don't exist server-side yet.
      const linkId = h.id.startsWith("tmp_") ? null : h.id;
      const { error } = await supabase.from("flashcards").insert({
        user_id: user.id,
        source_type: "user",
        note_id: h.note_id,
        highlight_id: linkId,
        front,
        back,
        tags: ["user", "highlight"],
      });
      if (error) {
        console.error("[useHighlights] flashcard insert failed:", error);
        setLastError(error.message);
        return false;
      }
      return true;
    },
    [user],
  );

  return {
    items,
    loading,
    lastError,
    create,
    remove,
    makeFlashcard,
    isAuthed: Boolean(user),
  };
}
