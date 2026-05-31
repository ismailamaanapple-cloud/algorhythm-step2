"use client";

import { useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "algorhythm:completedNotes";

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
    // Broadcast a same-tab event so other hooks can sync
    window.dispatchEvent(new CustomEvent("algorhythm:progress-change"));
  } catch {
    // ignore
  }
}

export function useNoteProgress() {
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

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

  const toggle = useCallback((id: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      saveToStorage(next);
      return next;
    });
  }, []);

  const markComplete = useCallback((id: string) => {
    setCompleted((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      saveToStorage(next);
      return next;
    });
  }, []);

  const markIncomplete = useCallback((id: string) => {
    setCompleted((prev) => {
      if (!prev.has(id)) return prev;
      const next = new Set(prev);
      next.delete(id);
      saveToStorage(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setCompleted(new Set());
    saveToStorage(new Set());
  }, []);

  return { completed, toggle, markComplete, markIncomplete, reset, hydrated };
}
