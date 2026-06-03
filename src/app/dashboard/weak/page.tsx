import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WeakReview from "@/components/dashboard/WeakReview";

export const metadata: Metadata = {
  title: "Weak cards review — 250+",
  description: "Drill the flashcards you've been getting wrong.",
};

export default function WeakReviewPage() {
  return (
    <>
      <Nav />
      <WeakReview />
      <Footer />
    </>
  );
}
