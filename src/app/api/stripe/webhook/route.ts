import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe, STRIPE_CONFIG } from "@/lib/stripe";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs"; // Stripe SDK + raw body need Node runtime

/**
 * Stripe webhook. Update the user's subscription state in profiles based on
 * Stripe events. Stripe signs every event with STRIPE_WEBHOOK_SECRET; we
 * verify before doing anything.
 */
export async function POST(request: Request) {
  const stripe = getStripe();
  if (!stripe) return NextResponse.json({ error: "no stripe" }, { status: 503 });
  const secret = STRIPE_CONFIG.webhookSecret;
  if (!secret)
    return NextResponse.json({ error: "no webhook secret" }, { status: 503 });

  const signature = request.headers.get("stripe-signature");
  if (!signature) return new NextResponse("no signature", { status: 400 });

  const rawBody = await request.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, secret);
  } catch (e) {
    console.error("[stripe webhook] signature verify failed:", e);
    return new NextResponse("bad signature", { status: 400 });
  }

  const admin = getSupabaseAdminClient();
  if (!admin)
    return NextResponse.json({ error: "no admin client" }, { status: 503 });

  // ----------------- Helpers ---------------------------------------------
  async function setProfile(
    userId: string,
    patch: Record<string, unknown>,
  ) {
    const { error } = await admin!
      .from("profiles")
      .update(patch)
      .eq("id", userId);
    if (error)
      console.error(
        "[stripe webhook] profile update failed:",
        error,
        patch,
      );
  }

  async function findUserIdFromCustomer(
    customerId: string,
  ): Promise<string | null> {
    const { data } = await admin!
      .from("profiles")
      .select("id")
      .eq("stripe_customer_id", customerId)
      .maybeSingle();
    return (data as { id: string } | null)?.id ?? null;
  }

  // ----------------- Event dispatch --------------------------------------
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId =
          (session.client_reference_id as string | null) ||
          ((session.metadata?.supabase_user_id as string | undefined) ?? null);
        const customerId =
          typeof session.customer === "string"
            ? session.customer
            : session.customer?.id;
        const plan =
          (session.metadata?.plan as "monthly" | "yearly" | undefined) ??
          "monthly";
        if (userId) {
          await setProfile(userId, {
            stripe_customer_id: customerId,
            subscription_status: "active",
            subscription_plan: plan,
          });
        }
        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.created": {
        const sub = event.data.object as Stripe.Subscription;
        const customerId =
          typeof sub.customer === "string" ? sub.customer : sub.customer.id;
        const userId = await findUserIdFromCustomer(customerId);
        if (userId) {
          const periodEnd = (sub as unknown as { current_period_end?: number })
            .current_period_end;
          await setProfile(userId, {
            subscription_status: mapStripeStatus(sub.status),
            current_period_end: periodEnd
              ? new Date(periodEnd * 1000).toISOString()
              : null,
          });
        }
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        const customerId =
          typeof sub.customer === "string" ? sub.customer : sub.customer.id;
        const userId = await findUserIdFromCustomer(customerId);
        if (userId) {
          await setProfile(userId, {
            subscription_status: "canceled",
          });
        }
        break;
      }

      default:
        // Ignore unrelated events.
        break;
    }
  } catch (err) {
    console.error("[stripe webhook] handler threw:", err);
    return new NextResponse("handler error", { status: 500 });
  }

  return NextResponse.json({ received: true });
}

function mapStripeStatus(s: Stripe.Subscription.Status): string {
  switch (s) {
    case "active":
    case "trialing":
      return s;
    case "past_due":
    case "unpaid":
      return "past_due";
    case "canceled":
      return "canceled";
    case "incomplete":
    case "incomplete_expired":
      return "incomplete";
    default:
      return "free";
  }
}
