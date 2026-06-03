import Link from "next/link";
import { BrandWordmark } from "./Brand";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-10 py-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/45">
          <div className="flex items-center gap-3">
            <BrandWordmark />
            <span className="hidden sm:inline text-white/20">·</span>
            <span>Educational use only · not a substitute for clinical judgment</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link href="/privacy" className="hover:text-white/80 transition">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white/80 transition">
              Terms
            </Link>
            <a
              href="mailto:contact@250plus.org"
              className="hover:text-white/80 transition"
            >
              Contact
            </a>
          </div>
        </div>
        <div className="mt-4 text-[10px] text-white/30">
          © {new Date().getFullYear()} 250+. Active recall over passive review.
        </div>
      </div>
    </footer>
  );
}
