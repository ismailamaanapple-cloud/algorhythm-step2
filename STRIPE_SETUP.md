# Stripe paywall setup

Step-by-step. ~30 minutes end to end.

## 1. Run the SQL migration

In Supabase → SQL Editor → New query → paste & run the contents of
[`supabase/migration-paywall.sql`](./supabase/migration-paywall.sql).

This adds `subscription_status`, `subscription_plan`, `stripe_customer_id`,
`current_period_end` columns to `profiles`, plus a new `viewed_items` table
that tracks each free user's unlocked notes/cases.

## 2. Create a Stripe account

1. Go to <https://dashboard.stripe.com/register> and sign up.
2. Stay in **Test mode** while you wire everything up (toggle in upper-right
   of the dashboard). You'll switch to live mode at the end.

## 3. Create two products + two prices

In Stripe Dashboard → **Products** → **Add product** twice:

**Product 1: 250+ Monthly**
- Name: `250+ Monthly`
- Description (optional): `Unlimited access to 250+ for one month.`
- Pricing model: **Recurring** · `$9.99` · `Monthly`
- Click **Save product** → copy the **price ID** (looks like `price_1AbCdEf…`)

**Product 2: 250+ Yearly**
- Name: `250+ Yearly`
- Pricing model: **Recurring** · `$79.00` · `Yearly`
- Save → copy the **price ID**

## 4. Get the API keys

Stripe Dashboard → **Developers** → **API keys**:

- **Publishable key** (`pk_test_…`) — safe in client bundles
- **Secret key** (`sk_test_…`) — server only, NEVER commit

## 5. Get the Supabase service-role key

The webhook uses the service-role key to update subscription state on behalf
of users (since the request comes from Stripe, not a user session).

Supabase Dashboard → Project Settings → API → **Service role** key (under
"Project API keys"). Treat it like a database password.

## 6. Add the env vars to Vercel

Vercel Dashboard → Project → Settings → Environment Variables. Add **all
five** for **Production** (and `Development` if you want to test locally):

| Name | Value |
|---|---|
| `STRIPE_SECRET_KEY` | `sk_test_…` (or `sk_live_…` later) |
| `STRIPE_PRICE_MONTHLY` | the monthly price id |
| `STRIPE_PRICE_YEARLY` | the yearly price id |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_test_…` |
| `SUPABASE_SERVICE_ROLE_KEY` | service role key from step 5 |

The webhook secret comes in the next step.

## 7. Set up the webhook

In Stripe Dashboard → **Developers** → **Webhooks** → **Add endpoint**.

- **Endpoint URL**: `https://250plus.org/api/stripe/webhook`
- **Events to send** — click "Select events" and pick:
  - `checkout.session.completed`
  - `customer.subscription.created`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`

Save the endpoint. Stripe will show you a **signing secret** (`whsec_…`).
Copy it.

Back in Vercel Settings → Environment Variables, add the 6th:

| Name | Value |
|---|---|
| `STRIPE_WEBHOOK_SECRET` | `whsec_…` |

## 8. Redeploy

Vercel → Deployments → ⋯ → **Redeploy** the latest deployment so the env
vars take effect. (Or push any small commit.)

## 9. Smoke test

1. Visit `https://250plus.org/pricing`
2. Sign in (any email)
3. Click **Subscribe yearly** (or monthly)
4. Use Stripe's test card: `4242 4242 4242 4242`, any future expiry, any CVC,
   any zip
5. Complete checkout → you should bounce back to `/account?upgraded=1`
6. Open `/pricing` again — your "Current plan" banner should appear at the
   top
7. Open any 4th note (after using your 3 free) — it should now load
   without the paywall
8. In Supabase → Table Editor → `profiles`, the test user's
   `subscription_status` should be `active`, `subscription_plan` should be
   `yearly`, `stripe_customer_id` should be populated.

If the webhook didn't fire, check **Stripe Dashboard → Developers →
Webhooks → [your endpoint]** → "Recent deliveries" — it'll show response
codes and any error messages.

## 10. Grant yourself premium (so your own account is unlocked)

In Supabase → SQL Editor:

```sql
update public.profiles
   set subscription_status = 'active', subscription_plan = 'yearly'
 where email = 'your-email@example.com';
```

## 11. Go live

When you're ready for real money:

1. Switch the Stripe dashboard from **Test mode** to **Live mode**
2. Re-create the two products + prices in live mode (test products are
   separate from live)
3. Copy the **live** secret key + publishable key + webhook secret
4. Update Vercel env vars to the live values
5. Update the webhook endpoint in live mode to point at the same URL
6. Redeploy

---

## How the gate works

- Anyone signed in can open up to **3 notes** + **3 cases** of their
  choosing. The `viewed_items` table records which they've opened so they
  can return to those same items unlimited times.
- A **4th unique** note or case shows the paywall card instead of the
  content.
- Premium users (`subscription_status = 'active'` or `'trialing'`) bypass
  the gate entirely.
- Algorithms are NOT gated — they remain unlimited for everyone.
- Highlights, flashcards, dashboard, weak-30 drill — also currently NOT
  hard-gated; users would just hit the per-note paywall before they could
  meaningfully use them. Optional future work: make these hard premium-only.

## Common gotchas

- **`Payments are not configured yet`** when clicking Subscribe → the env
  vars aren't set or the deployment hasn't picked them up. Check Vercel env
  vars and redeploy.
- **Webhook responds 400 `bad signature`** → `STRIPE_WEBHOOK_SECRET` is
  wrong or missing.
- **Webhook responds 503 `no admin client`** → `SUPABASE_SERVICE_ROLE_KEY`
  isn't set.
- **Subscribed but still seeing paywall** → the webhook didn't update the
  profile yet. Refresh in 30s, or check the webhook delivery log.
