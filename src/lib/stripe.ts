import Stripe from "stripe";

/**
 * Server-side Stripe client.
 * Returns null at build time if STRIPE_SECRET_KEY isn't configured so the
 * site keeps building without payments wired up.
 */
let _stripe: Stripe | null = null;
export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  if (_stripe) return _stripe;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _stripe = new Stripe(key, { apiVersion: "2025-09-30.clover" as any });
  return _stripe;
}

export const STRIPE_CONFIG = {
  priceMonthly: process.env.STRIPE_PRICE_MONTHLY ?? "",
  priceYearly: process.env.STRIPE_PRICE_YEARLY ?? "",
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "",
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET ?? "",
};

export function isStripeConfigured(): boolean {
  return Boolean(
    process.env.STRIPE_SECRET_KEY &&
      process.env.STRIPE_PRICE_MONTHLY &&
      process.env.STRIPE_PRICE_YEARLY,
  );
}
