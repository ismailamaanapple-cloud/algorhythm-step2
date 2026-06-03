import Nav from "@/components/Nav";
import OmmLibrary from "@/components/OmmLibrary";
import Footer from "@/components/Footer";

export const metadata = {
  title: "OMM — COMLEX Level 2 | 250+",
  description: "Comprehensive osteopathic manipulative medicine review for COMLEX Level 2.",
};

export default function OmmPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <OmmLibrary />
      </main>
      <Footer />
    </>
  );
}
