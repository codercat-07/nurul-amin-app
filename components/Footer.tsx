"use client";

import { useT } from "@/lib/ThemeContext";

export default function Footer() {
  const D = useT();

  return (
    <footer
      style={{
        background: D.bg0,
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "28px 40px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        position: "relative",
      }}
    >
      {/* Subtle top gradient gloss */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "60%",
          height: 1,
          background: `linear-gradient(to right, transparent, ${D.teal}44, ${D.lavender}44, transparent)`,
        }}
      />

      <div
        style={{
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: ".55rem",
          letterSpacing: ".12em",
          color: D.textMuted,
          textTransform: "uppercase",
        }}
      >
        © {new Date().getFullYear()} · All Rights Reserved
      </div>
    </footer>
  );
}
