import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import EkgLibrary from "@/components/EkgLibrary";

export const metadata: Metadata = {
  title: "EKG — Step 2 CK pattern recognition | 250+",
  description:
    "High-yield EKG patterns for Step 2 CK: STEMI localization, arrhythmias, blocks, electrolytes, channelopathies, and ACLS.",
};

export default function EkgPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <EkgLibrary />
      </main>
      <Footer />
    </>
  );
}
