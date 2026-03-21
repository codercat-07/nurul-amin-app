"use client";

import { useT } from "@/lib/ThemeContext";

const TAGS = [
  "BCS Education Cadre",
  "Accounting Lecturer",
  "Adobe Illustrator",
  "React.js",
  "Kindle Direct Publishing",
  "Canva",
  "Fiverr",
  "WordPress",
  "Merch by Amazon",
  "Video Editing",
  "Visual Branding",
];

export default function Marquee() {
  const D = useT();
  const doubled = [...TAGS, ...TAGS];

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        overflow: "hidden",
        padding: "16px 0",
        position: "relative",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* fade edges */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: "0 0 0 0",
          background: `linear-gradient(to right, ${D.bg0} 0%, transparent 8%, transparent 92%, ${D.bg0} 100%)`,
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          gap: 0,
          animation: "ticker 28s linear infinite",
          width: "max-content",
        }}
      >
        {doubled.map((tag, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 0,
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontWeight: 400,
                fontSize: ".78rem",
                color: D.textMuted,
                letterSpacing: ".03em",
                whiteSpace: "nowrap",
                padding: "0 28px",
              }}
            >
              {tag}
            </span>
            <span
              style={{
                color: i % 3 === 0 ? D.teal : i % 3 === 1 ? D.lavender : D.rose,
                fontSize: ".55rem",
                opacity: 0.5,
              }}
            >
              ✦
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
