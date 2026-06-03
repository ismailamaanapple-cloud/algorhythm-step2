import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — 250+",
  description: "How 250+ handles your data.",
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 mx-auto max-w-3xl w-full px-6 py-12 md:py-16">
        <div className="text-xs uppercase tracking-[0.22em] text-cyan-300/80 mb-3">
          Legal
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
          Privacy Policy
        </h1>
        <p className="text-white/55 text-sm mb-10">Last updated: June 3, 2026</p>

        <div className="space-y-10 text-white/80 leading-relaxed">
          <Section title="The short version">
            <p>
              250+ exists to help you study for Step 2 CK and COMLEX Level 2.
              We store the minimum data needed to sync your progress across
              devices. We don&apos;t sell your data, we don&apos;t run ads, and
              we don&apos;t use third-party tracking analytics. If you delete
              your account, your data is gone.
            </p>
          </Section>

          <Section title="What we collect">
            <List items={[
              "Account info: your email address, optionally your display name and avatar (if you sign in with Google).",
              "Study progress: which notes/cases you marked complete, your flashcard review history (ease factor, interval, due date, last grade).",
              "Highlights you create: the highlighted text, color, and the section of the note it belongs to.",
              "User-created flashcards: front, back, tags, and the highlight (if any) the card was made from.",
              "Technical info: standard server logs (IP address, browser type, timestamp) kept by our hosting provider for security and reliability.",
            ]} />
            <p className="mt-3">
              We do not collect: physical address, phone number, payment info,
              health information, exam scores, or location beyond rough region
              inferred from your IP.
            </p>
          </Section>

          <Section title="How we use it">
            <List items={[
              "Sync your study progress and flashcards across devices.",
              "Show you the cards that are due for review today, based on the SM-2 spaced-repetition algorithm.",
              "Send you the magic-link email you requested when signing in. We do not send marketing email.",
              "Keep the site secure (rate limit, prevent abuse).",
            ]} />
          </Section>

          <Section title="Where it lives">
            <List items={[
              "Authentication and database: Supabase (US region). Their privacy policy: supabase.com/privacy.",
              "Hosting + CDN: Vercel. Their privacy policy: vercel.com/legal/privacy-policy.",
              "Email delivery (magic links): Supabase’s built-in email service.",
              "If you sign in with Google: Google handles the OAuth handshake — we receive only your email, name, and avatar URL.",
            ]} />
            <p className="mt-3">
              These vendors are bound by their own privacy commitments and only
              process the data we send them in service of operating the app.
            </p>
          </Section>

          <Section title="Cookies">
            <p>
              We use one kind of cookie: the authentication session cookie set
              by Supabase when you log in. It exists only to keep you signed
              in. No advertising, analytics, or cross-site tracking cookies are
              used.
            </p>
          </Section>

          <Section title="Your rights">
            <List items={[
              "View your data: signed-in users can see all their progress on the dashboard.",
              "Export your data: email contact@250plus.org and we’ll send you a JSON dump within 14 days.",
              "Delete your data: email contact@250plus.org with the address you signed up with and we’ll wipe your account within 7 days. (A self-serve “Delete account” button is coming soon.)",
              "Correct your data: profile fields can be edited inside the app.",
            ]} />
          </Section>

          <Section title="Children">
            <p>
              250+ is intended for medical students and is not directed at
              children under 13. If we learn that we&apos;ve collected data
              from a child under 13, we&apos;ll delete it.
            </p>
          </Section>

          <Section title="Changes">
            <p>
              We&apos;ll update the date at the top of this page when the
              policy changes. Material changes (anything that changes what
              data we collect or who we share it with) will trigger an
              in-app notice.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Questions about your data or this policy:{" "}
              <a
                href="mailto:contact@250plus.org"
                className="text-cyan-300 hover:text-cyan-200 underline underline-offset-4"
              >
                contact@250plus.org
              </a>
              .
            </p>
          </Section>

          <div className="pt-6 border-t border-white/5 text-sm">
            <Link href="/" className="text-cyan-300 hover:text-cyan-200">
              ← Back to home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-xl font-semibold tracking-tight mb-3 text-white">
        {title}
      </h2>
      <div className="text-sm md:text-base text-white/70 space-y-3">
        {children}
      </div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((it, i) => (
        <li key={i} className="flex gap-2.5">
          <span className="text-cyan-300/70 mt-1.5 shrink-0">•</span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}
