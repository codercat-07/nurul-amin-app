"use client";

import { useState } from "react";
import { useT, useTheme } from "@/lib/ThemeContext";
import { ColorKey } from "@/lib/data";
import Rev from "./Rev";

const degrees = [
  {
    degree: "Master of Business Administration",
    short: "MBA",
    dept: "Department of Accounting",
    uni: "University of Dhaka",
    colKey: "lavender" as ColorKey,
    icon: "school",
  },
  {
    degree: "Bachelor of Business Administration",
    short: "BBA",
    dept: "Department of Accounting",
    uni: "University of Dhaka",
    colKey: "teal" as ColorKey,
    icon: "menu_book",
  },
];

export default function Education() {
  const D = useT();
  const { mode } = useTheme();
  return (
    <section
      id="education"
      style={{
        background: D.bg1,
        padding: "100px 40px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* BG orbs */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${D.rose}15 0%, transparent 70%)`,
            top: 0,
            right: "15%",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        {/* Label */}
        <Rev>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 18, height: 1, background: D.rose }} />
            <span
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: ".6rem",
                letterSpacing: ".2em",
                color: D.rose,
                opacity: 0.8,
                textTransform: "uppercase",
              }}
            >
              03 — Academic Background
            </span>
            <div style={{ width: 18, height: 1, background: D.rose }} />
          </div>
        </Rev>
        <Rev d={60}>
          <h2 className="f-display" style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", marginBottom: 56 }}>
            <span
              style={{
                fontStyle: "italic",
                ...(mode === "color"
                  ? {
                      background: `linear-gradient(135deg, ${D.lavender}, ${D.teal})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }
                  : { color: "#FFFFFF" }),
              }}
            >
              Education
            </span>
          </h2>
        </Rev>

        {/* Cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: 24, maxWidth: 800, margin: "0 auto" }}
        >
          {degrees.map((d, i) => (
            <EducationCard key={i} item={d} delay={i * 100} />
          ))}
        </div>

      </div>
    </section>
  );
}

function EducationCard({
  item,
  delay,
}: {
  item: (typeof degrees)[number];
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
          padding: "32px 28px",
          border: hov ? `1px solid ${col}44` : "1px solid rgba(255,255,255,0.08)",
          transition: "all .4s cubic-bezier(.16,1,.3,1)",
          transform: hov ? "translateY(-6px)" : "none",
          boxShadow: hov
            ? `0 24px 60px rgba(0,0,0,0.4), 0 0 40px ${col}14`
            : "0 16px 40px rgba(0,0,0,0.3)",
          cursor: "default",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 28,
            right: 28,
            height: 2,
            background: `linear-gradient(to right, ${col}, transparent)`,
            borderRadius: "0 0 2px 2px",
            opacity: hov ? 1 : 0.5,
            transition: "opacity .3s",
          }}
        />

        {/* Short degree badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 56,
            height: 56,
            borderRadius: "1rem",
            background: `${col}18`,
            border: `1px solid ${col}33`,
            marginBottom: 20,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-dm-serif), serif",
              fontWeight: 800,
              fontSize: "1.1rem",
              color: col,
              filter: `drop-shadow(0 0 8px ${col}88)`,
            }}
          >
            {item.short}
          </span>
        </div>

        <h3
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontWeight: 600,
            fontSize: "1rem",
            color: D.text,
            marginBottom: 8,
            lineHeight: 1.4,
          }}
        >
          {item.degree}
        </h3>

        <div
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: ".82rem",
            color: D.textSub,
            marginBottom: 4,
          }}
        >
          {item.dept}
        </div>
        <div
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: ".78rem",
            color: col,
            opacity: 0.8,
          }}
        >
          {item.uni}
        </div>
      </div>
    </Rev>
  );
}
