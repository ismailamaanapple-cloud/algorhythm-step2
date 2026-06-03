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
      const { data } = await supabase
        .from("highlights")
        .select("*")
        .eq("user_id", user.id)
        .eq("note_id", noteId)
        .order("created_at", { ascending: true });
      if (!active) return;
      setItems((data ?? []) as Highlight[]);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [user, noteId]);

  const create = useCallback(
    async (input: Omit<Highlight, "id">): Promise<Highlight | null> => {
      if (!user) return null;
      const supabase = getSupabaseBrowserClient();
      if (!supabase) return null;
      const { data, error } = await supabase
        .from("highlights")
        .insert({ ...input, user_id: user.id })
        .select("*")
        .single();
      if (error || !data) return null;
      const row = data as Highlight;
      setItems((prev) => [...prev, row]);
      return row;
    },
    [user],
  );

  const remove = useCallback(
    async (id: string) => {
      if (!user) return;
      const supabase = getSupabaseBrowserClient();
      if (!supabase) return;
      await supabase.from("highlights").delete().eq("id", id).eq("user_id", user.id);
      setItems((prev) => prev.filter((h) => h.id !== id));
    },
    [user],
  );

  const makeFlashcard = useCallback(
    async (h: Highlight, front: string, back: string): Promise<boolean> => {
      if (!user) return false;
      const supabase = getSupabaseBrowserClient();
      if (!supabase) return false;
      const { error } = await supabase.from("flashcards").insert({
        user_id: user.id,
        source_type: "user",
        note_id: h.note_id,
        highlight_id: h.id,
        front,
        back,
        tags: ["user", "highlight"],
      });
      return !error;
    },
    [user],
  );

  return { items, loading, create, remove, makeFlashcard, isAuthed: Boolean(user) };
}
