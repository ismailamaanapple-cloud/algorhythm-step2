"use client";

/**
 * Programmatically rendered EKG rhythm strips.
 *
 * Each strip is a smooth SVG polyline drawing the canonical waveform for a
 * given rhythm. No external image assets, no copyright issues, no
 * loading-state flicker. The user gets actual pattern recognition practice
 * directly in the note.
 */

const W = 720;
const H = 140;
const BASE = 80; // baseline y-coord

type Pt = [number, number];

// --------------------------------------------------------------------------
// Beat primitives — return an array of (x, y) points for a single beat.
// --------------------------------------------------------------------------

function normalBeat(x: number, opts?: { stOffset?: number; tInv?: boolean; qDeep?: boolean }): Pt[] {
  const stY = BASE - (opts?.stOffset ?? 0);
  const tDir = opts?.tInv ? 12 : -16;
  const qDepth = opts?.qDeep ? 24 : 0;
  return [
    [x, BASE],
    [x + 6, BASE - 3], // P wave up
    [x + 10, BASE - 8],
    [x + 14, BASE - 3],
    [x + 18, BASE], // P down
    [x + 24, BASE],
    [x + 28, BASE + qDepth], // Q (deep if pathologic)
    [x + 30, BASE - 60], // R peak
    [x + 32, BASE + 16], // S
    [x + 34, stY], // J point / ST
    [x + 42, stY],
    [x + 50, BASE + tDir], // T peak (up by default)
    [x + 58, BASE],
    [x + 76, BASE],
  ];
}

function noBeat(x: number): Pt[] {
  return [[x, BASE]];
}

// --------------------------------------------------------------------------
// Strip generators — each returns the full set of points for the strip.
// --------------------------------------------------------------------------

function genNormalSinus(): Pt[] {
  const pts: Pt[] = [];
  for (let x = 0; x < W; x += 80) pts.push(...normalBeat(x));
  return pts;
}

function genAFib(): Pt[] {
  const pts: Pt[] = [];
  // Irregularly irregular, no P waves, baseline fibrillation noise.
  let x = 0;
  const gaps = [55, 80, 95, 65, 110, 70, 85, 100, 60, 90];
  let i = 0;
  while (x < W - 50) {
    // Tiny baseline wobble where P should be.
    for (let k = 0; k < 5; k++) {
      const wx = x + k * 4;
      pts.push([wx, BASE + (Math.sin(wx * 0.6) * 3)]);
    }
    const beatX = x + 22;
    pts.push(
      [beatX, BASE],
      [beatX + 4, BASE + 10],
      [beatX + 6, BASE - 55],
      [beatX + 8, BASE + 14],
      [beatX + 10, BASE - 14],
      [beatX + 20, BASE],
    );
    x += gaps[i % gaps.length];
    i++;
  }
  pts.push([W, BASE]);
  return pts;
}

function genAFlutter(): Pt[] {
  const pts: Pt[] = [];
  // Sawtooth F waves at ~300 bpm with 2:1 block (every other one becomes QRS).
  let cycle = 0;
  for (let x = 0; x < W; x += 20) {
    if (cycle % 4 === 3) {
      // QRS at every 4th sawtooth
      pts.push(
        [x, BASE - 24],
        [x + 2, BASE - 55],
        [x + 4, BASE + 10],
        [x + 8, BASE],
      );
    } else {
      // sawtooth
      pts.push([x, BASE], [x + 8, BASE - 18], [x + 12, BASE + 4]);
    }
    cycle++;
  }
  pts.push([W, BASE]);
  return pts;
}

function genVT(): Pt[] {
  const pts: Pt[] = [];
  // Monomorphic wide-complex tachycardia ~ 160 bpm, no P waves.
  for (let x = 0; x < W; x += 56) {
    pts.push(
      [x, BASE],
      [x + 6, BASE - 50],
      [x + 14, BASE - 35],
      [x + 22, BASE + 35],
      [x + 28, BASE + 12],
      [x + 36, BASE],
    );
  }
  return pts;
}

function genVFib(): Pt[] {
  const pts: Pt[] = [];
  for (let x = 0; x < W; x += 3) {
    const amp = 30 + Math.random() * 20;
    const y = BASE + Math.sin(x * 0.6 + Math.random()) * amp;
    pts.push([x, y]);
  }
  return pts;
}

function genTorsades(): Pt[] {
  const pts: Pt[] = [];
  // Sinusoidal waxing-waning amplitude (twisting around baseline).
  for (let x = 0; x < W; x += 4) {
    const envelope = 35 + 22 * Math.sin(x * 0.022);
    const beat = Math.sin(x * 0.45) * envelope;
    pts.push([x, BASE + beat]);
  }
  return pts;
}

function genSTEMIInferior(): Pt[] {
  const pts: Pt[] = [];
  for (let x = 0; x < W; x += 80) {
    pts.push(...normalBeat(x, { stOffset: 20 })); // elevated ST
  }
  return pts;
}

function genAVBlockMobitzI(): Pt[] {
  // PR progressively lengthens then drops a QRS.
  const pts: Pt[] = [];
  let x = 0;
  const prSequence = [16, 22, 28, 36, null]; // dropped beat at end
  let i = 0;
  while (x < W) {
    const pr = prSequence[i % prSequence.length];
    // P wave always present
    pts.push(
      [x, BASE],
      [x + 6, BASE - 8],
      [x + 12, BASE],
    );
    if (pr !== null) {
      const qx = x + 16 + pr;
      pts.push(
        [qx, BASE],
        [qx + 4, BASE - 55],
        [qx + 8, BASE + 14],
        [qx + 14, BASE - 16],
        [qx + 22, BASE],
      );
      x = qx + 50;
    } else {
      // dropped QRS; longer pause then next P
      x += 80;
    }
    i++;
  }
  return pts;
}

function genCompleteBlock(): Pt[] {
  // P waves and QRS independent. We draw P waves at one rate, QRS at another.
  const pts: Pt[] = [];
  // Step 1: baseline + P waves at ~70/min spacing
  for (let x = 0; x < W; x += 50) {
    pts.push([x, BASE], [x + 6, BASE - 8], [x + 12, BASE - 0]);
  }
  // Step 2: overlay QRS at ~40/min (every 110 px)
  const qrsXs: number[] = [];
  for (let x = 30; x < W; x += 110) qrsXs.push(x);
  // Merge: walk through pts and inject QRS where appropriate. Simpler: just
  // generate a flat baseline + P waves + QRS by re-walking.
  const merged: Pt[] = [];
  let cursor = 0;
  for (let x = 0; x < W; x += 2) {
    let y = BASE;
    // P wave bumps
    const pRel = x % 50;
    if (pRel >= 4 && pRel <= 14) {
      y -= 8 * Math.sin(((pRel - 4) / 10) * Math.PI);
    }
    // QRS
    for (const qx of qrsXs) {
      const dx = x - qx;
      if (dx >= 0 && dx <= 18) {
        if (dx < 4) y = BASE - 55 * (dx / 4);
        else if (dx < 8) y = BASE - 55 + ((dx - 4) / 4) * 70;
        else if (dx < 12) y = BASE + 15 - ((dx - 8) / 4) * 30;
        else y = BASE - 15 + ((dx - 12) / 6) * 15;
      }
    }
    merged.push([x, y]);
    cursor = x;
  }
  return merged;
}

function genHyperkalemia(): Pt[] {
  const pts: Pt[] = [];
  // Peaked T waves, possibly absent P, wide QRS.
  for (let x = 0; x < W; x += 90) {
    pts.push(
      [x, BASE],
      [x + 14, BASE + 16], // Q
      [x + 18, BASE - 55], // wide R
      [x + 26, BASE + 16],
      [x + 34, BASE],
      [x + 42, BASE - 5],
      [x + 50, BASE - 35], // peaked T
      [x + 58, BASE - 5],
      [x + 66, BASE],
    );
  }
  return pts;
}

function genWPW(): Pt[] {
  const pts: Pt[] = [];
  // Short PR, delta wave (slurred upstroke), wide QRS.
  for (let x = 0; x < W; x += 90) {
    pts.push(
      [x, BASE],
      [x + 6, BASE - 6], // P
      [x + 12, BASE],
      [x + 18, BASE - 12], // delta upstroke begins
      [x + 24, BASE - 30],
      [x + 30, BASE - 55], // R peak
      [x + 36, BASE + 14],
      [x + 42, BASE - 16],
      [x + 56, BASE],
    );
  }
  return pts;
}

function genPericarditis(): Pt[] {
  // Diffuse concave ST elevation + PR depression.
  const pts: Pt[] = [];
  for (let x = 0; x < W; x += 80) {
    pts.push(
      [x, BASE],
      [x + 6, BASE - 6], // P up
      [x + 14, BASE + 6], // PR depression
      [x + 20, BASE + 6],
      [x + 26, BASE - 55], // R
      [x + 30, BASE + 16],
      [x + 34, BASE - 12], // concave ST elevation
      [x + 42, BASE - 14],
      [x + 50, BASE - 18], // T into peak
      [x + 58, BASE - 8],
      [x + 70, BASE],
    );
  }
  return pts;
}

function genAsystole(): Pt[] {
  return [[0, BASE], [W, BASE]];
}

// --------------------------------------------------------------------------
// Strip catalog
// --------------------------------------------------------------------------

const STRIPS: Record<string, { label: string; subtitle: string; gen: () => Pt[] }> = {
  "normal-sinus": {
    label: "Normal sinus rhythm",
    subtitle: "P before every QRS, rate 60–100, regular",
    gen: genNormalSinus,
  },
  "afib": {
    label: "Atrial fibrillation",
    subtitle: "Irregularly irregular, NO discrete P waves",
    gen: genAFib,
  },
  "aflutter": {
    label: "Atrial flutter (sawtooth)",
    subtitle: "Sawtooth F waves, often 2:1 block at 150",
    gen: genAFlutter,
  },
  "vt": {
    label: "Monomorphic VT",
    subtitle: "Wide, regular, no visible P",
    gen: genVT,
  },
  "vfib": {
    label: "Ventricular fibrillation",
    subtitle: "Chaotic, no organized QRS — shock",
    gen: genVFib,
  },
  "torsades": {
    label: "Torsades de Pointes",
    subtitle: "Polymorphic VT twisting around baseline",
    gen: genTorsades,
  },
  "stemi-inferior": {
    label: "Inferior STEMI",
    subtitle: "ST elevation in II / III / aVF",
    gen: genSTEMIInferior,
  },
  "mobitz-1": {
    label: "Mobitz I (Wenckebach)",
    subtitle: "PR progressively lengthens, then drops a QRS",
    gen: genAVBlockMobitzI,
  },
  "complete-block": {
    label: "Complete (3°) AV block",
    subtitle: "P and QRS dissociated, independent rates",
    gen: genCompleteBlock,
  },
  "hyperkalemia": {
    label: "Hyperkalemia — peaked T waves",
    subtitle: "Peaked T → wide QRS → sine wave with rising K",
    gen: genHyperkalemia,
  },
  "wpw": {
    label: "WPW pattern",
    subtitle: "Short PR + delta wave + wide QRS",
    gen: genWPW,
  },
  "pericarditis": {
    label: "Acute pericarditis",
    subtitle: "Diffuse concave ST elevation + PR depression",
    gen: genPericarditis,
  },
  "asystole": {
    label: "Asystole",
    subtitle: "Flat line — confirm in 2 leads",
    gen: genAsystole,
  },
};

export type EkgKind = keyof typeof STRIPS;

function pointsToPath(pts: Pt[]): string {
  if (pts.length === 0) return "";
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    d += ` L ${pts[i][0]} ${pts[i][1]}`;
  }
  return d;
}

export default function EkgStrip({ kind, caption }: { kind: EkgKind; caption?: string }) {
  const strip = STRIPS[kind];
  if (!strip) return null;
  const path = pointsToPath(strip.gen());

  return (
    <figure className="my-2 rounded-2xl overflow-hidden border border-rose-300/15 bg-gradient-to-br from-rose-950/40 to-amber-950/30">
      <div className="px-5 pt-4 pb-2">
        <div className="text-[10px] uppercase tracking-[0.22em] text-rose-300/80 mb-1">
          Rhythm strip
        </div>
        <div className="text-sm font-semibold tracking-tight text-white">
          {strip.label}
        </div>
        <div className="text-xs text-white/55 mt-0.5">
          {caption ?? strip.subtitle}
        </div>
      </div>
      <div className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label={`EKG strip — ${strip.label}`}
        >
          {/* grid */}
          <defs>
            <pattern id={`grid-${kind}`} width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(244, 114, 182, 0.12)" strokeWidth="0.5" />
            </pattern>
            <pattern id={`bigGrid-${kind}`} width="100" height="100" patternUnits="userSpaceOnUse">
              <rect width="100" height="100" fill={`url(#grid-${kind})`} />
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(244, 114, 182, 0.25)" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width={W} height={H} fill={`url(#bigGrid-${kind})`} />
          <path
            d={path}
            fill="none"
            stroke="rgb(254, 205, 211)"
            strokeWidth="1.6"
            strokeLinejoin="round"
            strokeLinecap="round"
            style={{ filter: "drop-shadow(0 0 6px rgba(254,205,211,0.5))" }}
          />
        </svg>
      </div>
    </figure>
  );
}
