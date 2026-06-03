"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth/AuthProvider";

const STORAGE_KEY = "algorhythm:completedNotes";
const MIGRATED_KEY = "algorhythm:noteProgressMigrated";

function loadFromStorage(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    if (Array.isArray(arr)) return new Set(arr.filter((x) => typeof x === "string"));
    return new Set();
  } catch {
    return new Set();
  }
}

function saveToStorage(ids: Set<string>) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
    window.dispatchEvent(new CustomEvent("algorhythm:progress-change"));
  } catch {
    // ignore
  }
}

/**
 * Tracks note completion. When logged in, reads/writes Supabase as the source
 * of truth and mirrors to localStorage for instant reads. On first login,
 * migrates existing localStorage progress up to the cloud.
 */
export function useNoteProgress() {
  const { user } = useAuth();
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);
  const migrationDone = useRef(false);

  // Initial hydrate from localStorage.
  useEffect(() => {
    setCompleted(loadFromStorage());
    setHydrated(true);

    const sync = () => setCompleted(loadFromStorage());
    window.addEventListener("storage", sync);
    window.addEventListener("algorhythm:progress-change", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("algorhythm:progress-change", sync);
    };
  }, []);

  // When user logs in, pull cloud rows + push any local-only rows up.
  useEffect(() => {
    if (!user) {
      migrationDone.current = false;
      return;
    }
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    let active = true;

    (async () => {
      // 1. Pull existing rows.
      const { data: rows } = await supabase
        .from("note_progress")
        .select("note_id")
        .eq("user_id", user.id);
      const cloudRows = (rows ?? []) as { note_id: string }[];
      const cloud = new Set<string>(cloudRows.map((r) => r.note_id));

      // 2. First-time migration: union local + cloud, push diff up.
      const migratedKey = `${MIGRATED_KEY}:${user.id}`;
      const alreadyMigrated = localStorage.getItem(migratedKey) === "1";
      const local = loadFromStorage();
      const toUpload = [...local].filter((id) => !cloud.has(id));
      if (!alreadyMigrated && toUpload.length > 0) {
        await supabase.from("note_progress").upsert(
          toUpload.map((note_id) => ({ user_id: user.id, note_id })),
          { onConflict: "user_id,note_id" },
        );
        toUpload.forEach((id) => cloud.add(id));
      }
      localStorage.setItem(migratedKey, "1");
      migrationDone.current = true;

      // 3. Sync UI + localStorage to cloud.
      if (!active) return;
      setCompleted(cloud);
      saveToStorage(cloud);
    })();

    return () => {
      active = false;
    };
  }, [user]);

  const writeCloud = useCallback(
    async (id: string, add: boolean) => {
      if (!user) return;
      const supabase = getSupabaseBrowserClient();
      if (!supabase) return;
      if (add) {
        await supabase
          .from("note_progress")
          .upsert({ user_id: user.id, note_id: id }, { onConflict: "user_id,note_id" });
      } else {
        await supabase
          .from("note_progress")
          .delete()
          .eq("user_id", user.id)
          .eq("note_id", id);
      }
    },
    [user],
  );

  const toggle = useCallback(
    (id: string) => {
      setCompleted((prev) => {
        const next = new Set(prev);
        const willAdd = !next.has(id);
        if (willAdd) next.add(id);
        else next.delete(id);
        saveToStorage(next);
        void writeCloud(id, willAdd);
        return next;
      });
    },
    [writeCloud],
  );

  const markComplete = useCallback(
    (id: string) => {
      setCompleted((prev) => {
        if (prev.has(id)) return prev;
        const next = new Set(prev);
        next.add(id);
        saveToStorage(next);
        void writeCloud(id, true);
        return next;
      });
    },
    [writeCloud],
  );

  const markIncomplete = useCallback(
    (id: string) => {
      setCompleted((prev) => {
        if (!prev.has(id)) return prev;
        const next = new Set(prev);
        next.delete(id);
        saveToStorage(next);
        void writeCloud(id, false);
        return next;
      });
    },
    [writeCloud],
  );

  const reset = useCallback(() => {
    setCompleted(new Set());
    saveToStorage(new Set());
    if (user) {
      const supabase = getSupabaseBrowserClient();
      void supabase?.from("note_progress").delete().eq("user_id", user.id);
    }
  }, [user]);

  return { completed, toggle, markComplete, markIncomplete, reset, hydrated };
}
