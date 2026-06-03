import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FlashcardsLibrary from "@/components/flashcards/FlashcardsLibrary";

export const metadata: Metadata = {
  title: "Flashcards — 250+",
  description:
    "Spaced-repetition flashcards covering every Step 2 CK & OMM topic. Sign in to sync progress and create your own cards from highlights.",
};

export default function FlashcardsPage() {
  return (
    <>
      <Nav />
      <FlashcardsLibrary />
      <Footer />
    </>
  );
}
