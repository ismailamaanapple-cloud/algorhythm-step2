import { ImageResponse } from "next/og";

export const alt = "250+ — Score a 250 or plus on Step 2 CK";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Open Graph image rendered at request time via Satori. Shared anywhere the
 * site URL is unfurled (iMessage, Slack, Discord, Twitter/X, Facebook, etc.).
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(circle at 25% 30%, rgba(139, 92, 246, 0.32), transparent 55%), radial-gradient(circle at 80% 70%, rgba(6, 182, 212, 0.28), transparent 55%), linear-gradient(135deg, #08080d 0%, #11111a 100%)",
          padding: 72,
          color: "#fff",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        {/* Top — brand wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background:
                "linear-gradient(135deg, #0a0a0f 0%, #14101f 50%, #0a1a25 100%)",
              border: "2px solid rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 38,
              fontWeight: 900,
              letterSpacing: -2,
            }}
          >
            <span style={{ color: "#fff" }}>250</span>
            <span
              style={{
                background:
                  "linear-gradient(135deg, #67e8f9 0%, #e879f9 100%)",
                backgroundClip: "text",
                color: "transparent",
                marginLeft: 2,
              }}
            >
              +
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              lineHeight: 1.1,
            }}
          >
            <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.5 }}>
              250+
            </div>
            <div
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.5)",
                letterSpacing: 3,
                textTransform: "uppercase",
                marginTop: 4,
              }}
            >
              Step 2 CK · OMM · EKG · Pharm
            </div>
          </div>
        </div>

        {/* Middle — headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            marginTop: 24,
          }}
        >
          <div
            style={{
              fontSize: 96,
              fontWeight: 900,
              letterSpacing: -4,
              lineHeight: 0.98,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <span style={{ color: "#fff", marginRight: 22 }}>
              Score a
            </span>
            <span
              style={{
                background:
                  "linear-gradient(135deg, #67e8f9 0%, #e879f9 100%)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              250 or plus.
            </span>
          </div>
          <div
            style={{
              fontSize: 30,
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.35,
              maxWidth: 920,
            }}
          >
            Spaced-repetition flashcards, board-style case vignettes, and
            high-yield notes — built around how the exam actually tests you.
          </div>
        </div>

        {/* Bottom — stats + domain */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: "rgba(255,255,255,0.55)",
          }}
        >
          <div style={{ display: "flex", gap: 24, fontSize: 20 }}>
            <Pill label="170+ notes" color="#67e8f9" />
            <Pill label="280+ cases" color="#fbbf24" />
            <Pill label="90+ algorithms" color="#c4b5fd" />
            <Pill label="Spaced repetition" color="#f0abfc" />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 22, fontWeight: 600, color: "#fff" }}>
            250plus.org
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

function Pill({ label, color }: { label: string; color: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 16px",
        borderRadius: 999,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        color: "rgba(255,255,255,0.85)",
        fontSize: 18,
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: 999,
          background: color,
        }}
      />
      {label}
    </div>
  );
}
