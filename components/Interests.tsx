"use client";

import { useState } from "react";
import { useT, useTheme } from "@/lib/ThemeContext";
import { ColorKey } from "@/lib/data";
import Rev from "./Rev";

const items: { label: string; icon: string; colKey: ColorKey }[] = [
  { label: "Education & Teaching", icon: "school", colKey: "teal" },
  { label: "Graphic Design", icon: "palette", colKey: "rose" },
  { label: "Web Development", icon: "code", colKey: "lavender" },
  { label: "Digital Publishing", icon: "auto_stories", colKey: "amber" },
  { label: "Video Editing", icon: "movie", colKey: "emerald" },
  { label: "Brand Strategy", icon: "lightbulb", colKey: "teal" },
  { label: "E-Commerce", icon: "shopping_cart", colKey: "lavender" },
  { label: "Content Creation", icon: "edit", colKey: "rose" },
];

export default function Interests() {
  const D = useT();
  const { mode } = useTheme();
  return (
    <section
      id="interests"
      style={{
        background: D.bg2,
        padding: "100px 40px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Bg orbs */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${D.emerald}15 0%, transparent 70%)`,
            bottom: "0",
            right: "0",
            filter: "blur(100px)",
          }}
        />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <Rev>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 18, height: 1, background: D.emerald }} />
            <span
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: ".6rem",
                letterSpacing: ".2em",
                color: D.emerald,
                opacity: 0.8,
                textTransform: "uppercase",
              }}
            >
              04 — Domains
            </span>
            <div style={{ width: 18, height: 1, background: D.emerald }} />
          </div>
        </Rev>

        <Rev d={60}>
          <h2 className="f-display" style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", marginBottom: 56 }}>
            Areas of{" "}
            <span
              style={{
                fontStyle: "italic",
                ...(mode === "color"
                  ? {
                      background: `linear-gradient(135deg, ${D.emerald}, ${D.teal})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }
                  : { color: "#FFFFFF" }),
              }}
            >
              Expertise
            </span>
          </h2>
        </Rev>

        <div
          className="grid grid-cols-2 md:grid-cols-4"
          style={{ gap: 16 }}
        >
          {items.map((item, i) => (
            <InterestCard key={i} item={item} delay={i * 60} />
          ))}
        </div>
      </div>
    </section>
  );
}

function InterestCard({
  item,
  delay,
}: {
  item: (typeof items)[number];
  delay: number;
}) {
  const D = useT();
  const [hov, setHov] = useState(false);
  const col = D[item.colKey];

  return (
    <Rev d={delay}>
      <div
        className="liquid-card"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          padding: "24px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          cursor: "default",
          border: hov ? `1px solid ${col}44` : "1px solid rgba(255,255,255,0.08)",
          transition: "all .35s cubic-bezier(.16,1,.3,1)",
          transform: hov ? "translateY(-5px) scale(1.01)" : "none",
          boxShadow: hov
            ? `0 20px 50px rgba(0,0,0,0.4), 0 0 30px ${col}12`
            : "0 12px 30px rgba(0,0,0,0.3)",
        }}
      >
        <span
          className="material-icons-outlined"
          style={{
            fontSize: "1.5rem",
            lineHeight: 1,
            color: col,
            filter: hov ? `drop-shadow(0 0 8px ${col}88)` : "none",
            transition: "filter .3s",
          }}
        >
          {item.icon}
        </span>
        <div
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontWeight: 500,
            fontSize: ".82rem",
            color: hov ? D.text : D.textSub,
            lineHeight: 1.35,
            transition: "color .3s",
          }}
        >
          {item.label}
        </div>
      </div>
    </Rev>
  );
}
