import { NextResponse } from "next/server";
import { getStripe, STRIPE_CONFIG } from "@/lib/stripe";
import { getSupabaseServerClient } from "@/lib/supabase/server";

/**
 * POST { plan: 'monthly' | 'yearly' }
 * Creates a Stripe Checkout session for the signed-in user and returns its URL.
 */
export async function POST(request: Request) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "Payments are not configured yet." },
      { status: 503 },
    );
  }
  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Auth not configured" }, { status: 503 });
  }
  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user;
  if (!user) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as { plan?: string };
  const plan = body.plan === "yearly" ? "yearly" : "monthly";
  const priceId =
    plan === "yearly" ? STRIPE_CONFIG.priceYearly : STRIPE_CONFIG.priceMonthly;
  if (!priceId) {
    return NextResponse.json(
      { error: "Price ID is not configured for that plan." },
      { status: 503 },
    );
  }

  // Look up profile to reuse Stripe customer id if we already have one.
  const { data: profile } = await supabase
    .from("profiles")
    .select("stripe_customer_id, email")
    .eq("id", user.id)
    .maybeSingle();

  const customerId = (profile as { stripe_customer_id?: string | null } | null)
    ?.stripe_customer_id;

  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ??
    new URL(request.url).origin;

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId ?? undefined,
    customer_email: customerId ? undefined : user.email ?? undefined,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/account?upgraded=1`,
    cancel_url: `${origin}/pricing?canceled=1`,
    client_reference_id: user.id,
    metadata: { supabase_user_id: user.id, plan },
    subscription_data: {
      metadata: { supabase_user_id: user.id, plan },
    },
    allow_promotion_codes: true,
  });

  return NextResponse.json({ url: session.url });
}
