import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth/AuthProvider";
import LoginModal from "@/components/auth/LoginModal";
import AuthErrorBanner from "@/components/auth/AuthErrorBanner";
import { SearchProvider } from "@/components/search/GlobalSearch";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://250plus.org",
  ),
  title: {
    default: "250+ — Score a 250 on Step 2 CK",
    template: "%s · 250+",
  },
  description:
    "Spaced-repetition flashcards, case vignettes, and high-yield notes built to get you to a 250 or plus on Step 2 CK.",
  applicationName: "250+",
  keywords: [
    "Step 2 CK",
    "USMLE",
    "COMLEX Level 2",
    "medical school",
    "spaced repetition",
    "flashcards",
    "clinical algorithms",
    "EKG",
    "pharmacology",
    "OMM",
  ],
  authors: [{ name: "250+" }],
  // Open Graph (Facebook, Slack, iMessage, LinkedIn, etc.)
  openGraph: {
    type: "website",
    siteName: "250+",
    title: "250+ — Score a 250 on Step 2 CK",
    description:
      "Spaced-repetition flashcards, case vignettes, and high-yield notes built to get you to a 250 or plus on Step 2 CK.",
    url: "/",
  },
  // Twitter / X card
  twitter: {
    card: "summary_large_image",
    title: "250+ — Score a 250 on Step 2 CK",
    description:
      "Spaced-repetition flashcards, case vignettes, and high-yield notes — built to get you to a 250 or plus.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative">
        <div className="aurora" />
        <div className="grid-overlay" />
        <div className="noise" />
        <AuthProvider>
          <SearchProvider>
            {children}
            <LoginModal />
            <AuthErrorBanner />
          </SearchProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
