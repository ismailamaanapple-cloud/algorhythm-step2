import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getUserFromAuthHeader } from "@/lib/supabase/server-auth";

/**
 * POST {} with Authorization: Bearer <supabase access_token>
 * Opens the Stripe Billing Portal for the signed-in customer so they can
 * cancel, update card, swap monthly↔yearly, etc.
 */
export async function POST(request: Request) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ error: "Payments not configured" }, { status: 503 });
  }

  const authed = await getUserFromAuthHeader(request);
  if (!authed) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }
  const { user, client: supabase } = authed;

  const { data: profile } = await supabase
    .from("profiles")
    .select("stripe_customer_id")
    .eq("id", user.id)
    .maybeSingle();
  const customerId = (profile as { stripe_customer_id?: string | null } | null)
    ?.stripe_customer_id;
  if (!customerId) {
    return NextResponse.json(
      { error: "No Stripe customer yet — subscribe first." },
      { status: 400 },
    );
  }

  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(request.url).origin;
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${origin}/account`,
  });
  return NextResponse.json({ url: session.url });
}
