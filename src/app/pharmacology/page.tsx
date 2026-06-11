import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PharmacologyLibrary from "@/components/PharmacologyLibrary";

export const metadata: Metadata = {
  title: "Pharmacology — Step 2 CK drug classes",
  description:
    "High-yield drug classes for Step 2 CK: anticoagulants, diabetes meds, antibiotics, β-blockers, ACE-I/ARBs, diuretics, statins, psych meds, AEDs, inhalers, OB drugs, chemo toxicities.",
};

export default function PharmacologyPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <PharmacologyLibrary />
      </main>
      <Footer />
    </>
  );
}
