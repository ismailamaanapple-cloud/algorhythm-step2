export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-10 py-10">
      <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-white/40">
        <div>
          Algorhythm · Educational use only. Not a substitute for clinical judgment.
        </div>
        <div className="flex gap-3">
          <span>Built for Step 2 CK study</span>
          <span>·</span>
          <span>Active recall over passive review</span>
        </div>
      </div>
    </footer>
  );
}
