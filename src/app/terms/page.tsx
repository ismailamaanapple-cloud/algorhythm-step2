import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The rules for using 250+.",
};

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 mx-auto max-w-3xl w-full px-6 py-12 md:py-16">
        <div className="text-xs uppercase tracking-[0.22em] text-cyan-300/80 mb-3">
          Legal
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
          Terms of Use
        </h1>
        <p className="text-white/55 text-sm mb-10">Last updated: June 3, 2026</p>

        <div className="space-y-10 text-white/80 leading-relaxed">
          <Section title="What 250+ is — and isn't">
            <p>
              250+ is a study aid for medical students preparing for the USMLE
              Step 2 CK and COMLEX Level 2 exams. Everything on the site is
              for{" "}
              <strong className="text-white">
                educational use only
              </strong>{" "}
              and is{" "}
              <strong className="text-white">
                not a substitute for clinical judgment, medical advice, or
                patient care
              </strong>
              . Do not use 250+ to make decisions about a real patient.
            </p>
            <p>
              Clinical guidelines change. We try to keep content current with
              the most recent NBME, ACOG, AHA, and AAFP recommendations, but
              we make no guarantees. Always verify against the primary source
              when stakes are real.
            </p>
          </Section>

          <Section title="Your account">
            <List items={[
              "You must be at least 13 years old to create an account.",
              "Don’t share your account with anyone. You’re responsible for activity under your account.",
              "Use a real email address — we need it to send you sign-in links.",
            ]} />
          </Section>

          <Section title="Acceptable use">
            <p>
              You agree not to:
            </p>
            <List items={[
              "Scrape or bulk-download the content for redistribution or sale.",
              "Resell, sublicense, or commercially exploit any part of 250+ without written permission.",
              "Attempt to break, probe, or overload the service (security testing requires written invitation).",
              "Use the service for anything illegal, harassing, or harmful.",
              "Submit highlights, flashcards, or content that contains real patient identifiers (PHI).",
            ]} />
          </Section>

          <Section title="Content ownership">
            <p>
              The notes, cases, algorithms, and pre-built flashcards on 250+
              are © 250+ and made available to signed-in users for personal
              study. You may not republish or redistribute them.
            </p>
            <p>
              Highlights and flashcards you create remain yours. By saving
              them on 250+ you grant us the limited right to store and
              display them back to you so the app works.
            </p>
          </Section>

          <Section title="Service availability">
            <p>
              We do our best to keep the site up but make no uptime guarantee.
              We may add, change, or remove features at any time. If a change
              is materially worse for users we&apos;ll communicate it before
              shipping.
            </p>
          </Section>

          <Section title="Termination">
            <p>
              You can delete your account anytime by emailing{" "}
              <a
                href="mailto:contact@250plus.org"
                className="text-cyan-300 hover:text-cyan-200 underline underline-offset-4"
              >
                contact@250plus.org
              </a>
              . We can suspend or terminate accounts that violate these terms,
              with notice except in cases of abuse or legal compulsion.
            </p>
          </Section>

          <Section title="No warranty, no liability">
            <p>
              250+ is provided &quot;as is.&quot; To the maximum extent
              permitted by law, we disclaim all warranties (express or
              implied) including merchantability, fitness for a particular
              purpose, and non-infringement.
            </p>
            <p>
              In no event will 250+ or its operators be liable for any
              indirect, incidental, special, consequential, or punitive
              damages arising out of your use of the service. Our total
              liability for any claim is limited to the amount you paid us in
              the past 12 months — which, for free accounts, is $0.
            </p>
          </Section>

          <Section title="Governing law">
            <p>
              These terms are governed by the laws of the Commonwealth of
              Pennsylvania, United States, without regard to its conflict of
              laws rules. Disputes will be resolved in the state or federal
              courts located in Philadelphia County, PA.
            </p>
          </Section>

          <Section title="Changes to these terms">
            <p>
              We&apos;ll update the date at the top of this page when the
              terms change. Continued use of the service after a change
              constitutes acceptance.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Questions:{" "}
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
