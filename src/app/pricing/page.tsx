import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PricingClient from "@/components/paywall/PricingClient";

export const metadata: Metadata = {
  title: "Pricing — 250+",
  description: "Subscribe to 250+ — your one tool for hitting a 250 on Step 2 CK.",
};

export default function PricingPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <PricingClient />
      </main>
      <Footer />
    </>
  );
}
