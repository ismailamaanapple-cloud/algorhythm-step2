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
  // Use the SDK's bundled default API version; passing a stale one (we had
  // 2025-09-30.clover here previously) breaks the SDK at runtime and the
  // route ends up returning an empty 500.
  _stripe = new Stripe(key);
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
