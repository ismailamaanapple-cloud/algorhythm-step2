import { BrandWordmark } from "./Brand";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-10 py-10">
      <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-white/40">
        <div className="flex items-center gap-3">
          <BrandWordmark />
          <span>·</span>
          <span>Educational use only · not a substitute for clinical judgment</span>
        </div>
        <div className="flex gap-3">
          <span>Active recall over passive review</span>
        </div>
      </div>
    </footer>
  );
}
