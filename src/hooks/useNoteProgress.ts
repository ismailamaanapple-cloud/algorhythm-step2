"use client";

import { useEffect, useState, useCallback } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth/AuthProvider";

const STORAGE_KEY = "algorhythm:completedNotes";
const MIGRATED_KEY = "algorhythm:noteProgressMigrated";

/**
 * Module-level singletons. The hook is called from many places (NoteDetail,
 * NotesLibrary, EkgLibrary, PharmLibrary, OmmLibrary, Dashboard, the nav…).
 * Without these, every component mount would re-fetch from Supabase and race
 * against pending writes — causing "mark complete, navigate back, it's
 * unchecked again" because the stale cloud read stomps the fresh local state.
 *
 * With the singletons, we sync the cloud ONCE per user-id and trust the
 * local Set + the cross-tab/same-tab event bus for everything after that.
 */
let cloudSyncedFor: string | null = null;
let cloudSyncInFlight: Promise<void> | null = null;

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
    // Same-tab notification so every other useNoteProgress consumer re-reads.
    window.dispatchEvent(new CustomEvent("algorhythm:progress-change"));
  } catch {
    // ignore
  }
}

export function useNoteProgress() {
  const { user } = useAuth();
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  // 1. Hydrate from localStorage on mount + subscribe to the event bus so we
  //    re-read whenever ANY other component (or tab) updates progress.
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

  // 2. Cloud sync — runs at most ONCE per user-id across the whole app, even
  //    if many components mount the hook. Merges cloud and local (union), so
  //    a write that happened just before navigation can't be erased by a
  //    racing cloud read.
  useEffect(() => {
    if (!user) {
      cloudSyncedFor = null;
      cloudSyncInFlight = null;
      return;
    }
    if (cloudSyncedFor === user.id) return; // already synced this session

    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    let cancelled = false;

    // Reuse an in-flight sync if another mount kicked one off at the same time.
    if (!cloudSyncInFlight) {
      cloudSyncInFlight = (async () => {
        const { data: rows } = await supabase
          .from("note_progress")
          .select("note_id")
          .eq("user_id", user.id);
        const cloudRows = (rows ?? []) as { note_id: string }[];
        const cloud = new Set<string>(cloudRows.map((r) => r.note_id));

        // First-time migration: push local-only ids up.
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
        if (!alreadyMigrated) {
          localStorage.setItem(migratedKey, "1");
        }

        // Merge local ∪ cloud — DO NOT replace local outright. A user who
        // marked something complete in the last 100ms and is mid-navigation
        // must not have it stomped by a cloud read that hasn't seen the write yet.
        const liveLocal = loadFromStorage();
        const merged = new Set<string>([...liveLocal, ...cloud]);
        saveToStorage(merged);
        cloudSyncedFor = user.id;
      })();
    }

    cloudSyncInFlight.finally(() => {
      cloudSyncInFlight = null;
      if (!cancelled) setCompleted(loadFromStorage());
    });

    return () => {
      cancelled = true;
    };
  }, [user]);

  // 3. Write helpers — local first (instant), cloud fire-and-forget.
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
