"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth/AuthProvider";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { usePremium } from "@/hooks/usePremium";

type AccessState =
  | { status: "loading" }
  | { status: "granted" }
  | { status: "blocked"; viewedCount: number; limit: number };

/**
 * For a given (itemType, itemId), decides whether the current user can view
 * this item. Premium users always pass. Free users get up to N unique items
 * per type; this item is unlocked if it's been opened before, or counts
 * against the limit if it's new.
 *
 * Auto-tracks the view on first grant so the user's "free slots" deplete
 * across the app.
 */
export function useAccessCheck(itemType: "note" | "case", itemId: string): AccessState {
  const { user } = useAuth();
  const premium = usePremium();
  const [state, setState] = useState<AccessState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    async function run() {
      // Guests (not logged in) can still view; we let useAuth handle login UX.
      if (!user) {
        if (!cancelled) setState({ status: "granted" });
        return;
      }
      if (premium.status === "loading") return;
      if (premium.isPremium) {
        if (!cancelled) setState({ status: "granted" });
        return;
      }

      const supabase = getSupabaseBrowserClient();
      if (!supabase) {
        if (!cancelled) setState({ status: "granted" });
        return;
      }

      // Has the user already viewed this item?
      const { data: existing } = await supabase
        .from("viewed_items")
        .select("item_id")
        .eq("user_id", user.id)
        .eq("item_type", itemType);
      const viewedRows = (existing ?? []) as { item_id: string }[];
      const alreadyViewed = viewedRows.some((r) => r.item_id === itemId);
      const limit = itemType === "note" ? premium.freeLimits.notes : premium.freeLimits.cases;

      if (alreadyViewed) {
        if (!cancelled) setState({ status: "granted" });
        return;
      }

      if (viewedRows.length >= limit) {
        if (!cancelled)
          setState({ status: "blocked", viewedCount: viewedRows.length, limit });
        return;
      }

      // Record this view and grant access.
      await supabase
        .from("viewed_items")
        .insert({ user_id: user.id, item_type: itemType, item_id: itemId });
      if (!cancelled) setState({ status: "granted" });
    }
    void run();
    return () => {
      cancelled = true;
    };
  }, [user, itemType, itemId, premium.status, premium.isPremium, premium.freeLimits.notes, premium.freeLimits.cases]);

  return state;
}
