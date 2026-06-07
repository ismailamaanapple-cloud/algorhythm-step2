import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #0a0a0f 0%, #14101f 50%, #0a1a25 100%)",
          fontSize: 92,
          fontWeight: 900,
          letterSpacing: -4,
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <span style={{ color: "#ffffff" }}>250</span>
        <span
          style={{
            background:
              "linear-gradient(135deg, #67e8f9 0%, #e879f9 50%, #a78bfa 100%)",
            backgroundClip: "text",
            color: "transparent",
            marginLeft: 4,
          }}
        >
          +
        </span>
      </div>
    ),
    { ...size },
  );
}
