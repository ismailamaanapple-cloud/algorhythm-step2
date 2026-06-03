import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Dashboard from "@/components/dashboard/Dashboard";

export const metadata: Metadata = {
  title: "Dashboard — 250+",
  description: "Your weak topics, strong topics, and what to study next.",
};

export default function DashboardPage() {
  return (
    <>
      <Nav />
      <Dashboard />
      <Footer />
    </>
  );
}
