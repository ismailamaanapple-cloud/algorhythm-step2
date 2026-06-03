# Supabase setup — Algorhythm

The app falls back to a guest-only / localStorage mode if Supabase env vars
are missing, so the build will still succeed without these — but login,
cloud-synced progress, highlights, and SRS state all require Supabase.

## 1. Create the project

1. Go to <https://app.supabase.com> → **New project**.
2. Pick a region close to your users. Note the project URL + anon key from
   **Project Settings → API**.

## 2. Run the schema

1. In the Supabase dashboard, open **SQL Editor → New query**.
2. Paste the entire contents of [`supabase/schema.sql`](./supabase/schema.sql)
   and run it. The file is idempotent — safe to re-run.

That creates: `profiles`, `note_progress`, `case_progress`, `highlights`,
`flashcards`, `flashcard_reviews` — all with row-level security enforcing
"users can only read/write their own rows" + a trigger that auto-creates a
profile row when a new auth user signs up.

## 3. Enable auth providers

In **Authentication → Providers**:

- **Email** — keep enabled (used for magic links).
- **Google** — toggle on. Add a Google OAuth client (Cloud Console →
  Credentials → Web app). Use these redirect URIs:
  - `https://YOUR-PROJECT-REF.supabase.co/auth/v1/callback`

In **Authentication → URL Configuration**:

- **Site URL**: `https://algorhythm-step2.vercel.app` (or your prod URL)
- **Redirect URLs**: add
  `https://algorhythm-step2.vercel.app/auth/callback` and
  `http://localhost:3000/auth/callback`.

## 4. Wire env vars

Locally — copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

On **Vercel** — go to the project → Settings → Environment Variables →
add the same three keys for Production + Preview.

## 5. What gets stored

| Table                 | Purpose                                                                |
| --------------------- | ---------------------------------------------------------------------- |
| `profiles`            | One row per user (email, display name, avatar). Auto-created on signup |
| `note_progress`       | Completed notes — replaces the old `localStorage` key                  |
| `case_progress`       | Completed cases + whether the user got them right                      |
| `highlights`          | Text selections in notes (color, optional sticky note attached)        |
| `flashcards`          | Both pre-built deck copies (per-user) and user-created cards           |
| `flashcard_reviews`   | SM-2 SRS state (ease, interval, due date) — one row per card per user  |

Every table has **row-level security** enabled — the policies only ever
match rows where `auth.uid() = user_id`, so users physically cannot read
or write anyone else's data.

## 6. First-login migration

The app keeps the existing `localStorage` key
(`algorhythm:completedNotes`) working for guests. On a user's first login,
`useNoteProgress` reads the local key and pushes every completed-note id
into `note_progress` (idempotent via primary key conflict). After that,
the database is the source of truth and localStorage is just a mirror for
instant reads.

## 7. Pre-built flashcards

The `PREBUILT_FLASHCARDS` array in `src/data/flashcards.ts` is generated
deterministically from `NOTES`. The first time a logged-in user visits a
deck, the app inserts a personal copy of every card in that deck (matched
by stable `source_id`) so that SRS reviews can attach to it. Updating the
notes regenerates `source_id`s for any moved bullets — old reviews for
deleted bullets simply stop appearing, no destructive operation runs.

## 8. Common gotchas

- **OAuth redirect loop after login** — almost always missing redirect
  URLs in Supabase Authentication → URL Configuration.
- **"Email not confirmed" error** — in **Authentication → Providers →
  Email**, turn off "Confirm email" for dev, or use the magic-link flow
  which we already do by default.
- **"Auth session missing" in server logs** — expected on routes that
  don't require auth; the proxy refreshes the session on every request,
  but if no cookie is present the user is simply treated as a guest.
