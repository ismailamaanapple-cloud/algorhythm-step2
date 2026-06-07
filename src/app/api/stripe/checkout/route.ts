import { NextResponse } from "next/server";
import { getStripe, STRIPE_CONFIG } from "@/lib/stripe";
import { getUserFromAuthHeader } from "@/lib/supabase/server-auth";

/**
 * POST { plan: 'monthly' | 'yearly' }
 *   Headers: Authorization: Bearer <supabase access_token>
 *
 * Creates a Stripe Checkout session for the signed-in user and returns its
 * URL. We verify the user via Bearer token (not cookies) because our
 * browser client uses implicit flow with localStorage session storage.
 */
export async function POST(request: Request) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "Payments are not configured yet." },
      { status: 503 },
    );
  }

  const authed = await getUserFromAuthHeader(request);
  if (!authed) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }
  const { user, client: supabase } = authed;

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

  // Reuse the stripe customer id on the user's profile if we have one.
  const { data: profile } = await supabase
    .from("profiles")
    .select("stripe_customer_id")
    .eq("id", user.id)
    .maybeSingle();
  const customerId = (profile as { stripe_customer_id?: string | null } | null)
    ?.stripe_customer_id;

  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ?? new URL(request.url).origin;

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
