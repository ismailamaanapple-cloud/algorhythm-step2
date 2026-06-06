"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/lib/auth/AuthProvider";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export type SubscriptionState = {
  isPremium: boolean;
  status: "free" | "active" | "trialing" | "past_due" | "canceled" | "incomplete" | "loading";
  plan: "monthly" | "yearly" | null;
  periodEnd: string | null;
};

const FREE_NOTE_LIMIT = 3;
const FREE_CASE_LIMIT = 3;

/**
 * Reads the signed-in user's subscription status from profiles. Treats
 * 'active' and 'trialing' as premium. Returns a safe default while loading
 * so guarding components can render the right state without flashing.
 */
export function usePremium(): SubscriptionState & {
  refresh: () => Promise<void>;
  freeLimits: { notes: number; cases: number };
} {
  const { user } = useAuth();
  const [state, setState] = useState<SubscriptionState>({
    isPremium: false,
    status: "loading",
    plan: null,
    periodEnd: null,
  });

  const refresh = useCallback(async () => {
    if (!user) {
      setState({ isPremium: false, status: "free", plan: null, periodEnd: null });
      return;
    }
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setState({ isPremium: false, status: "free", plan: null, periodEnd: null });
      return;
    }
    const { data } = await supabase
      .from("profiles")
      .select("subscription_status, subscription_plan, current_period_end")
      .eq("id", user.id)
      .maybeSingle();
    const row = data as
      | {
          subscription_status: string;
          subscription_plan: "monthly" | "yearly" | null;
          current_period_end: string | null;
        }
      | null;
    const status = (row?.subscription_status ?? "free") as SubscriptionState["status"];
    const isPremium = status === "active" || status === "trialing";
    setState({
      isPremium,
      status,
      plan: row?.subscription_plan ?? null,
      periodEnd: row?.current_period_end ?? null,
    });
  }, [user]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    ...state,
    refresh,
    freeLimits: { notes: FREE_NOTE_LIMIT, cases: FREE_CASE_LIMIT },
  };
}
