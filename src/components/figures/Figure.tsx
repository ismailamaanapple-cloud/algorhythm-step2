"use client";

/**
 * High-yield medical concept visualizations rendered entirely as SVG.
 * No external image assets, no copyright, no loading flicker — just exam-
 * style diagrams that scale and stay sharp on any device.
 *
 * Add a new variant by:
 *   1. Writing a renderer function that returns SVG content
 *   2. Adding it to the FIGURES catalog
 *   3. Attaching it to a note via `figures: [{ kind, variant }]`
 */

import React from "react";

// --------------------------------------------------------------------------
// Shared chart helpers
// --------------------------------------------------------------------------

const W = 720;
const H = 360;
const PAD = { l: 60, r: 30, t: 30, b: 50 };

function mapX(x: number, xMin: number, xMax: number): number {
  return PAD.l + ((x - xMin) / (xMax - xMin)) * (W - PAD.l - PAD.r);
}
function mapY(y: number, yMin: number, yMax: number): number {
  return H - PAD.b - ((y - yMin) / (yMax - yMin)) * (H - PAD.t - PAD.b);
}
function pointsToPath(pts: [number, number][]): string {
  if (pts.length === 0) return "";
  return pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`).join(" ");
}

// --------------------------------------------------------------------------
// FIGURE 1 — Oxygen-Hemoglobin dissociation curve (with shifts)
// --------------------------------------------------------------------------

function O2Dissociation(): React.ReactNode {
  const xMin = 0, xMax = 100, yMin = 0, yMax = 100;

  // Sigmoid: 1 / (1 + exp(-(x - p50) / k))
  const curve = (p50: number, k: number) => {
    const pts: [number, number][] = [];
    for (let x = xMin; x <= xMax; x += 1) {
      const sat = 1 / (1 + Math.exp(-(x - p50) / k));
      pts.push([mapX(x, xMin, xMax), mapY(sat * 100, yMin, yMax)]);
    }
    return pts;
  };

  const normal = pointsToPath(curve(27, 6));
  const rightShift = pointsToPath(curve(35, 6));
  const leftShift = pointsToPath(curve(20, 6));

  const tickXs = [0, 20, 40, 60, 80, 100];
  const tickYs = [0, 25, 50, 75, 100];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Oxygen dissociation curve">
      {/* Background */}
      <rect width={W} height={H} fill="rgba(8, 9, 18, 0)" />

      {/* Axes + grid */}
      {tickYs.map((y) => (
        <g key={`gy-${y}`}>
          <line x1={PAD.l} x2={W - PAD.r} y1={mapY(y, yMin, yMax)} y2={mapY(y, yMin, yMax)} stroke="rgba(255,255,255,0.06)" />
          <text x={PAD.l - 8} y={mapY(y, yMin, yMax) + 4} fill="rgba(255,255,255,0.45)" fontSize="11" textAnchor="end">
            {y}
          </text>
        </g>
      ))}
      {tickXs.map((x) => (
        <g key={`gx-${x}`}>
          <line x1={mapX(x, xMin, xMax)} x2={mapX(x, xMin, xMax)} y1={PAD.t} y2={H - PAD.b} stroke="rgba(255,255,255,0.06)" />
          <text x={mapX(x, xMin, xMax)} y={H - PAD.b + 18} fill="rgba(255,255,255,0.45)" fontSize="11" textAnchor="middle">
            {x}
          </text>
        </g>
      ))}

      <text x={W / 2} y={H - 8} fill="rgba(255,255,255,0.6)" fontSize="12" textAnchor="middle">
        PaO₂ (mmHg)
      </text>
      <text x={14} y={H / 2} fill="rgba(255,255,255,0.6)" fontSize="12" transform={`rotate(-90 14 ${H / 2})`} textAnchor="middle">
        O₂ Sat (%)
      </text>

      {/* Curves */}
      <path d={leftShift} fill="none" stroke="rgb(125, 211, 252)" strokeWidth="2" strokeDasharray="4 4" />
      <path d={normal} fill="none" stroke="rgb(167, 243, 208)" strokeWidth="3" />
      <path d={rightShift} fill="none" stroke="rgb(252, 165, 165)" strokeWidth="2" strokeDasharray="4 4" />

      {/* P50 markers — vertical line at 27 mmHg for normal */}
      <line x1={mapX(27, xMin, xMax)} x2={mapX(27, xMin, xMax)} y1={mapY(0, yMin, yMax)} y2={mapY(50, yMin, yMax)} stroke="rgba(167,243,208,0.5)" strokeWidth="1" strokeDasharray="3 3" />
      <line x1={PAD.l} x2={mapX(27, xMin, xMax)} y1={mapY(50, yMin, yMax)} y2={mapY(50, yMin, yMax)} stroke="rgba(167,243,208,0.5)" strokeWidth="1" strokeDasharray="3 3" />
      <text x={mapX(27, xMin, xMax) + 6} y={mapY(50, yMin, yMax) - 6} fill="rgba(167,243,208,0.85)" fontSize="11">
        P50 = 27 mmHg
      </text>

      {/* Legend */}
      <g transform={`translate(${W - PAD.r - 200}, ${PAD.t + 10})`}>
        <rect x="0" y="0" width="200" height="76" fill="rgba(15,17,26,0.6)" rx="8" stroke="rgba(255,255,255,0.08)" />
        <line x1={10} x2={36} y1={20} y2={20} stroke="rgb(125,211,252)" strokeWidth="2" strokeDasharray="4 4" />
        <text x={42} y={24} fill="rgba(255,255,255,0.85)" fontSize="11">Left shift (↓P50)</text>
        <line x1={10} x2={36} y1={40} y2={40} stroke="rgb(167,243,208)" strokeWidth="3" />
        <text x={42} y={44} fill="rgba(255,255,255,0.85)" fontSize="11">Normal</text>
        <line x1={10} x2={36} y1={60} y2={60} stroke="rgb(252,165,165)" strokeWidth="2" strokeDasharray="4 4" />
        <text x={42} y={64} fill="rgba(255,255,255,0.85)" fontSize="11">Right shift (↑P50)</text>
      </g>
    </svg>
  );
}

// --------------------------------------------------------------------------
// FIGURE 2 — Frank-Starling curve (normal vs failing heart, contractility)
// --------------------------------------------------------------------------

function FrankStarling(): React.ReactNode {
  const xMin = 0, xMax = 30, yMin = 0, yMax = 100;

  // Hyperbolic curve: y = ymax * x / (x + k), shifted up/down for contractility
  const curve = (gain: number, k: number) => {
    const pts: [number, number][] = [];
    for (let x = 0; x <= xMax; x += 0.5) {
      const y = (gain * x) / (x + k);
      pts.push([mapX(x, xMin, xMax), mapY(Math.min(y, yMax), yMin, yMax)]);
    }
    return pts;
  };

  const increased = pointsToPath(curve(120, 6));
  const normal = pointsToPath(curve(95, 7));
  const failing = pointsToPath(curve(55, 8));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Frank-Starling curve">
      {/* Axes */}
      {[0, 25, 50, 75, 100].map((y) => (
        <g key={y}>
          <line x1={PAD.l} x2={W - PAD.r} y1={mapY(y, yMin, yMax)} y2={mapY(y, yMin, yMax)} stroke="rgba(255,255,255,0.06)" />
          <text x={PAD.l - 8} y={mapY(y, yMin, yMax) + 4} fill="rgba(255,255,255,0.45)" fontSize="11" textAnchor="end">{y}</text>
        </g>
      ))}
      {[0, 6, 12, 18, 24, 30].map((x) => (
        <g key={x}>
          <line x1={mapX(x, xMin, xMax)} x2={mapX(x, xMin, xMax)} y1={PAD.t} y2={H - PAD.b} stroke="rgba(255,255,255,0.06)" />
          <text x={mapX(x, xMin, xMax)} y={H - PAD.b + 18} fill="rgba(255,255,255,0.45)" fontSize="11" textAnchor="middle">{x}</text>
        </g>
      ))}

      <text x={W / 2} y={H - 8} fill="rgba(255,255,255,0.6)" fontSize="12" textAnchor="middle">LV end-diastolic pressure (mmHg) — preload</text>
      <text x={14} y={H / 2} fill="rgba(255,255,255,0.6)" fontSize="12" transform={`rotate(-90 14 ${H / 2})`} textAnchor="middle">Stroke volume / cardiac output</text>

      {/* Curves */}
      <path d={increased} fill="none" stroke="rgb(167,243,208)" strokeWidth="3" />
      <path d={normal} fill="none" stroke="rgb(125,211,252)" strokeWidth="3" />
      <path d={failing} fill="none" stroke="rgb(252,165,165)" strokeWidth="3" />

      {/* Labels next to curves */}
      <text x={mapX(20, xMin, xMax)} y={mapY(86, yMin, yMax) - 4} fill="rgba(167,243,208,0.95)" fontSize="11">↑ contractility</text>
      <text x={mapX(20, xMin, xMax)} y={mapY(70, yMin, yMax) - 4} fill="rgba(125,211,252,0.95)" fontSize="11">Normal</text>
      <text x={mapX(20, xMin, xMax)} y={mapY(40, yMin, yMax) - 4} fill="rgba(252,165,165,0.95)" fontSize="11">Failing heart (HFrEF)</text>
    </svg>
  );
}

// --------------------------------------------------------------------------
// FIGURE 3 — Lung volumes spirogram
// --------------------------------------------------------------------------

function LungVolumes(): React.ReactNode {
  // Stack of horizontal bands representing TV, IRV, ERV, RV.
  const bands = [
    { label: "IRV — Inspiratory Reserve Volume (~3000 mL)", color: "rgb(167,243,208)", h: 130 },
    { label: "TV — Tidal Volume (~500 mL)", color: "rgb(125,211,252)", h: 30 },
    { label: "ERV — Expiratory Reserve Volume (~1100 mL)", color: "rgb(252,211,77)", h: 60 },
    { label: "RV — Residual Volume (~1200 mL, cannot be exhaled)", color: "rgb(252,165,165)", h: 65 },
  ];
  const totalH = bands.reduce((s, b) => s + b.h, 0);
  const barLeft = 90;
  const barW = 100;
  const barTop = 40;

  let y = barTop;
  const bandRects: React.ReactNode[] = [];
  const bandLabels: React.ReactNode[] = [];
  const bandYs: number[] = [];
  bands.forEach((b, i) => {
    bandRects.push(
      <rect key={`r-${i}`} x={barLeft} y={y} width={barW} height={b.h} fill={b.color} fillOpacity="0.55" stroke="rgba(255,255,255,0.2)" />,
    );
    bandLabels.push(
      <text key={`t-${i}`} x={barLeft + barW + 20} y={y + b.h / 2 + 4} fill="rgba(255,255,255,0.85)" fontSize="12">
        {b.label}
      </text>,
    );
    bandYs.push(y);
    y += b.h;
  });
  const barBottom = barTop + totalH;

  // Brackets on the LEFT showing composite volumes (IC, FRC, VC, TLC)
  function bracket(yTop: number, yBot: number, x: number, label: string, color: string) {
    return (
      <g key={label}>
        <line x1={x} x2={x} y1={yTop} y2={yBot} stroke={color} strokeWidth="2" />
        <line x1={x} x2={x + 8} y1={yTop} y2={yTop} stroke={color} strokeWidth="2" />
        <line x1={x} x2={x + 8} y1={yBot} y2={yBot} stroke={color} strokeWidth="2" />
        <text x={x - 6} y={(yTop + yBot) / 2 + 4} fill={color} fontSize="11" textAnchor="end">{label}</text>
      </g>
    );
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Lung volumes spirogram">
      <text x={W / 2} y={H - 8} fill="rgba(255,255,255,0.6)" fontSize="12" textAnchor="middle">Lung volumes &amp; capacities</text>

      {/* Stacked bands */}
      {bandRects}
      {bandLabels}

      {/* Composite brackets */}
      {bracket(bandYs[0], bandYs[1] + bands[1].h, 80, "IC", "rgba(125,211,252,0.9)")}
      {bracket(bandYs[2], barBottom, 60, "FRC", "rgba(252,211,77,0.9)")}
      {bracket(bandYs[0], bandYs[2] + bands[2].h, 40, "VC", "rgba(167,243,208,0.95)")}
      {bracket(bandYs[0], barBottom, 20, "TLC", "rgba(255,255,255,0.85)")}

      {/* Sidebar legend */}
      <g transform={`translate(${W - 250}, 250)`}>
        <text x="0" y="0" fill="rgba(255,255,255,0.65)" fontSize="11">IC = TV + IRV (Inspiratory Capacity)</text>
        <text x="0" y="18" fill="rgba(255,255,255,0.65)" fontSize="11">FRC = ERV + RV (Functional Residual)</text>
        <text x="0" y="36" fill="rgba(255,255,255,0.65)" fontSize="11">VC = TV + IRV + ERV (Vital Capacity)</text>
        <text x="0" y="54" fill="rgba(255,255,255,0.65)" fontSize="11">TLC = VC + RV (Total Lung Capacity)</text>
      </g>
    </svg>
  );
}

// --------------------------------------------------------------------------
// FIGURE 4 — Heart auscultation positions
// --------------------------------------------------------------------------

function HeartAuscultation(): React.ReactNode {
  // Simplified anterior chest with 4 listening areas.
  const cx = W / 2;
  const cy = H / 2 + 10;

  // Chest outline (simplified rounded torso)
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Heart auscultation positions">
      <text x={W / 2} y={26} fill="rgba(255,255,255,0.8)" fontSize="13" fontWeight="bold" textAnchor="middle">Heart auscultation — where to listen for each valve</text>

      {/* Torso */}
      <path
        d={`M ${cx - 180} ${cy - 130} Q ${cx - 220} ${cy} ${cx - 180} ${cy + 130}
           L ${cx + 180} ${cy + 130} Q ${cx + 220} ${cy} ${cx + 180} ${cy - 130} Z`}
        fill="rgba(255,255,255,0.025)"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="2"
      />

      {/* Sternum & rib indicators */}
      <line x1={cx} x2={cx} y1={cy - 130} y2={cy + 130} stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 3" />
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1={cx - 140} x2={cx + 140} y1={cy - 100 + i * 40} y2={cy - 100 + i * 40} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      ))}

      {/* 4 listening positions */}
      {[
        { label: "Aortic", desc: "2nd ICS, R sternal border", x: cx + 50, y: cy - 90, color: "rgb(252,165,165)" },
        { label: "Pulmonic", desc: "2nd ICS, L sternal border", x: cx - 50, y: cy - 90, color: "rgb(125,211,252)" },
        { label: "Tricuspid", desc: "4th ICS, L sternal border", x: cx - 35, y: cy + 0, color: "rgb(167,243,208)" },
        { label: "Mitral (Apex)", desc: "5th ICS, midclavicular L", x: cx - 80, y: cy + 55, color: "rgb(232,121,249)" },
      ].map((p) => (
        <g key={p.label}>
          <circle cx={p.x} cy={p.y} r={20} fill={p.color} fillOpacity="0.18" stroke={p.color} strokeWidth="2" />
          <circle cx={p.x} cy={p.y} r={4} fill={p.color} />
          <text x={p.x + 30} y={p.y + 4} fill={p.color} fontSize="13" fontWeight="600">{p.label}</text>
          <text x={p.x + 30} y={p.y + 19} fill="rgba(255,255,255,0.6)" fontSize="10">{p.desc}</text>
        </g>
      ))}

      <text x={20} y={H - 14} fill="rgba(255,255,255,0.5)" fontSize="11">
        Mnemonic: <tspan fill="rgba(255,255,255,0.85)">APT-M</tspan> from R upper → L upper → L mid → L lower
      </text>
    </svg>
  );
}

// --------------------------------------------------------------------------
// FIGURE 5 — Coronary territory map
// --------------------------------------------------------------------------

function CoronaryTerritory(): React.ReactNode {
  const cx = W / 2 - 80;
  const cy = H / 2 + 10;

  // Stylized heart: oval-ish with the 3 coronary territories colored.
  // Anterior (LAD), Lateral (LCx), Inferior (RCA)
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Coronary territory map">
      <text x={W / 2} y={26} fill="rgba(255,255,255,0.8)" fontSize="13" fontWeight="bold" textAnchor="middle">Coronary territories — which artery supplies which wall</text>

      {/* Heart silhouette */}
      <path
        d={`M ${cx} ${cy - 140}
           C ${cx - 110} ${cy - 140}, ${cx - 140} ${cy - 30}, ${cx - 80} ${cy + 80}
           Q ${cx - 30} ${cy + 150}, ${cx + 40} ${cy + 130}
           C ${cx + 130} ${cy + 70}, ${cx + 130} ${cy - 70}, ${cx + 80} ${cy - 120}
           Q ${cx + 40} ${cy - 150}, ${cx} ${cy - 140} Z`}
        fill="rgba(255,255,255,0.03)"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="2"
      />

      {/* Anterior wall (LAD) — front face */}
      <path
        d={`M ${cx} ${cy - 140}
           C ${cx - 50} ${cy - 130}, ${cx - 70} ${cy - 70}, ${cx - 60} ${cy}
           L ${cx - 30} ${cy + 60}
           L ${cx + 40} ${cy + 60}
           L ${cx + 60} ${cy}
           C ${cx + 70} ${cy - 70}, ${cx + 50} ${cy - 130}, ${cx} ${cy - 140} Z`}
        fill="rgba(252,165,165,0.22)"
        stroke="rgba(252,165,165,0.55)"
        strokeWidth="2"
      />

      {/* Inferior wall (RCA) — bottom */}
      <path
        d={`M ${cx - 30} ${cy + 60} L ${cx + 40} ${cy + 60} Q ${cx + 30} ${cy + 140}, ${cx} ${cy + 145} Q ${cx - 30} ${cy + 140}, ${cx - 30} ${cy + 60} Z`}
        fill="rgba(167,243,208,0.22)"
        stroke="rgba(167,243,208,0.55)"
        strokeWidth="2"
      />

      {/* Lateral wall (LCx) — right side of silhouette */}
      <path
        d={`M ${cx + 60} ${cy} L ${cx + 40} ${cy + 60} Q ${cx + 90} ${cy + 50}, ${cx + 95} ${cy} Q ${cx + 90} ${cy - 50}, ${cx + 60} ${cy} Z`}
        fill="rgba(125,211,252,0.22)"
        stroke="rgba(125,211,252,0.55)"
        strokeWidth="2"
      />

      {/* Labels */}
      <text x={cx} y={cy - 50} fill="rgba(252,165,165,0.95)" fontSize="13" textAnchor="middle" fontWeight="600">LAD</text>
      <text x={cx} y={cy - 32} fill="rgba(252,165,165,0.85)" fontSize="10" textAnchor="middle">Anterior wall</text>
      <text x={cx} y={cy - 20} fill="rgba(252,165,165,0.75)" fontSize="9" textAnchor="middle">(V1–V4)</text>

      <text x={cx + 75} y={cy - 4} fill="rgba(125,211,252,0.95)" fontSize="13" textAnchor="middle" fontWeight="600">LCx</text>
      <text x={cx + 75} y={cy + 12} fill="rgba(125,211,252,0.85)" fontSize="10" textAnchor="middle">Lateral</text>
      <text x={cx + 75} y={cy + 24} fill="rgba(125,211,252,0.75)" fontSize="9" textAnchor="middle">(I, aVL, V5-V6)</text>

      <text x={cx + 5} y={cy + 100} fill="rgba(167,243,208,0.95)" fontSize="13" textAnchor="middle" fontWeight="600">RCA</text>
      <text x={cx + 5} y={cy + 115} fill="rgba(167,243,208,0.85)" fontSize="10" textAnchor="middle">Inferior</text>
      <text x={cx + 5} y={cy + 128} fill="rgba(167,243,208,0.75)" fontSize="9" textAnchor="middle">(II, III, aVF)</text>

      {/* Legend on the right */}
      <g transform={`translate(${W - 230}, ${PAD.t + 30})`}>
        <rect x="0" y="0" width="220" height="140" fill="rgba(15,17,26,0.6)" rx="8" stroke="rgba(255,255,255,0.08)" />
        <text x="14" y="22" fill="rgba(255,255,255,0.85)" fontSize="11" fontWeight="600">EKG ↔ artery</text>
        <text x="14" y="46" fill="rgba(252,165,165,0.95)" fontSize="11">V1–V4: LAD (anterior)</text>
        <text x="14" y="66" fill="rgba(125,211,252,0.95)" fontSize="11">I, aVL, V5–V6: LCx (lateral)</text>
        <text x="14" y="86" fill="rgba(167,243,208,0.95)" fontSize="11">II, III, aVF: RCA (inferior)</text>
        <text x="14" y="106" fill="rgba(255,255,255,0.65)" fontSize="11">V1–V3 ST↓ + tall R: posterior</text>
        <text x="14" y="126" fill="rgba(255,255,255,0.65)" fontSize="11">V4R ST↑: RV (proximal RCA)</text>
      </g>
    </svg>
  );
}

// --------------------------------------------------------------------------
// FIGURE 6 — Stroke territory map (cortical)
// --------------------------------------------------------------------------

function StrokeTerritory(): React.ReactNode {
  const cx = W / 2 - 80;
  const cy = H / 2 + 10;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Stroke territory map">
      <text x={W / 2} y={26} fill="rgba(255,255,255,0.8)" fontSize="13" fontWeight="bold" textAnchor="middle">Stroke territories — which artery supplies which symptoms</text>

      {/* Brain silhouette — coronal slice */}
      <path
        d={`M ${cx - 160} ${cy - 30}
           Q ${cx - 170} ${cy - 130}, ${cx} ${cy - 140}
           Q ${cx + 170} ${cy - 130}, ${cx + 160} ${cy - 30}
           Q ${cx + 160} ${cy + 90}, ${cx + 100} ${cy + 110}
           Q ${cx} ${cy + 130}, ${cx - 100} ${cy + 110}
           Q ${cx - 160} ${cy + 90}, ${cx - 160} ${cy - 30} Z`}
        fill="rgba(255,255,255,0.03)"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="2"
      />

      {/* MCA territory — lateral surface (large) */}
      <path d={`M ${cx - 160} ${cy - 30} Q ${cx - 160} ${cy + 90}, ${cx - 60} ${cy + 110} L ${cx - 30} ${cy + 30} L ${cx - 50} ${cy - 30} Q ${cx - 130} ${cy - 60}, ${cx - 160} ${cy - 30} Z`}
        fill="rgba(252,165,165,0.22)" stroke="rgba(252,165,165,0.55)" strokeWidth="2" />
      <path d={`M ${cx + 160} ${cy - 30} Q ${cx + 160} ${cy + 90}, ${cx + 60} ${cy + 110} L ${cx + 30} ${cy + 30} L ${cx + 50} ${cy - 30} Q ${cx + 130} ${cy - 60}, ${cx + 160} ${cy - 30} Z`}
        fill="rgba(252,165,165,0.22)" stroke="rgba(252,165,165,0.55)" strokeWidth="2" />

      {/* ACA territory — medial (top) */}
      <path d={`M ${cx - 50} ${cy - 30} L ${cx - 30} ${cy - 110} Q ${cx} ${cy - 130}, ${cx + 30} ${cy - 110} L ${cx + 50} ${cy - 30} L ${cx + 30} ${cy + 30} L ${cx - 30} ${cy + 30} Z`}
        fill="rgba(125,211,252,0.22)" stroke="rgba(125,211,252,0.55)" strokeWidth="2" />

      {/* PCA territory — posterior (bottom) */}
      <path d={`M ${cx - 60} ${cy + 110} Q ${cx} ${cy + 130}, ${cx + 60} ${cy + 110} L ${cx + 30} ${cy + 30} L ${cx - 30} ${cy + 30} Z`}
        fill="rgba(167,243,208,0.22)" stroke="rgba(167,243,208,0.55)" strokeWidth="2" />

      {/* Labels */}
      <text x={cx - 95} y={cy + 50} fill="rgba(252,165,165,0.95)" fontSize="14" fontWeight="700">MCA</text>
      <text x={cx + 75} y={cy + 50} fill="rgba(252,165,165,0.95)" fontSize="14" fontWeight="700">MCA</text>
      <text x={cx} y={cy - 60} fill="rgba(125,211,252,0.95)" fontSize="14" fontWeight="700" textAnchor="middle">ACA</text>
      <text x={cx} y={cy + 105} fill="rgba(167,243,208,0.95)" fontSize="14" fontWeight="700" textAnchor="middle">PCA</text>

      {/* Legend */}
      <g transform={`translate(${W - 250}, ${PAD.t + 30})`}>
        <rect x="0" y="0" width="240" height="200" fill="rgba(15,17,26,0.6)" rx="8" stroke="rgba(255,255,255,0.08)" />
        <text x="14" y="22" fill="rgba(255,255,255,0.85)" fontSize="11" fontWeight="600">Artery → deficit pattern</text>

        <text x="14" y="48" fill="rgba(252,165,165,0.95)" fontSize="11" fontWeight="600">MCA</text>
        <text x="14" y="62" fill="rgba(255,255,255,0.7)" fontSize="10.5">{"Contralateral face + arm > leg weak"}</text>
        <text x="14" y="76" fill="rgba(255,255,255,0.7)" fontSize="10.5">Aphasia (dominant), neglect (R)</text>

        <text x="14" y="98" fill="rgba(125,211,252,0.95)" fontSize="11" fontWeight="600">ACA</text>
        <text x="14" y="112" fill="rgba(255,255,255,0.7)" fontSize="10.5">{"Contralateral leg > arm weakness"}</text>
        <text x="14" y="126" fill="rgba(255,255,255,0.7)" fontSize="10.5">Abulia, urinary incontinence</text>

        <text x="14" y="148" fill="rgba(167,243,208,0.95)" fontSize="11" fontWeight="600">PCA</text>
        <text x="14" y="162" fill="rgba(255,255,255,0.7)" fontSize="10.5">Contralateral homonymous hemianopia</text>
        <text x="14" y="176" fill="rgba(255,255,255,0.7)" fontSize="10.5">Memory (hippocampus), alexia</text>
        <text x="14" y="190" fill="rgba(255,255,255,0.7)" fontSize="10.5">Macular sparing</text>
      </g>
    </svg>
  );
}

// --------------------------------------------------------------------------
// Catalog + dispatcher
// --------------------------------------------------------------------------

const FIGURES: Record<string, { label: string; subtitle: string; render: () => React.ReactNode }> = {
  "o2-dissociation": {
    label: "Oxygen-Hemoglobin dissociation curve",
    subtitle: "Right shift (↑P50) ↑ unloading; left shift (↓P50) ↓ unloading",
    render: O2Dissociation,
  },
  "frank-starling": {
    label: "Frank-Starling curve",
    subtitle: "Failing heart has flattened response; ↑ contractility shifts up-and-left",
    render: FrankStarling,
  },
  "lung-volumes": {
    label: "Lung volumes & capacities",
    subtitle: "TLC = VC + RV ; FRC = ERV + RV ; IC = TV + IRV",
    render: LungVolumes,
  },
  "heart-auscultation": {
    label: "Heart auscultation positions",
    subtitle: "APT-M from R upper → L upper → L mid → L lower (apex)",
    render: HeartAuscultation,
  },
  "coronary-territory": {
    label: "Coronary artery territory map",
    subtitle: "LAD = anterior (V1–V4), LCx = lateral (I, aVL, V5–V6), RCA = inferior (II, III, aVF)",
    render: CoronaryTerritory,
  },
  "stroke-territory": {
    label: "Stroke territory map (cortical)",
    subtitle: "MCA, ACA, PCA — and which deficits each produces",
    render: StrokeTerritory,
  },
};

export type FigureVariant = keyof typeof FIGURES;

export default function Figure({ variant, caption }: { variant: FigureVariant; caption?: string }) {
  const f = FIGURES[variant];
  if (!f) return null;
  return (
    <figure className="my-2 rounded-2xl overflow-hidden border border-cyan-300/15 bg-gradient-to-br from-slate-950/60 to-cyan-950/30">
      <div className="px-5 pt-4 pb-2">
        <div className="text-[10px] uppercase tracking-[0.22em] text-cyan-300/80 mb-1">Figure</div>
        <div className="text-sm font-semibold tracking-tight text-white">{f.label}</div>
        <div className="text-xs text-white/55 mt-0.5">{caption ?? f.subtitle}</div>
      </div>
      <div className="px-3 pb-3">{f.render()}</div>
    </figure>
  );
}
