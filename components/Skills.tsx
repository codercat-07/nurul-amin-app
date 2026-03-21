"use client";

import { useState } from "react";
import { useT, useTheme } from "@/lib/ThemeContext";
import { SKILLS } from "@/lib/data";
import Rev from "./Rev";

export default function Skills() {
  const D = useT();
  const { mode } = useTheme();
  return (
    <section
      id="skills"
      style={{
        background: D.bg1,
        padding: "100px 40px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background orbs */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${D.lavender}18 0%, transparent 70%)`,
            top: "-100px",
            right: "10%",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${D.teal}15 0%, transparent 70%)`,
            bottom: "0",
            left: "5%",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        {/* Section header */}
        <Rev>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 18, height: 1, background: D.teal }} />
            <span
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: ".6rem",
                letterSpacing: ".2em",
                color: D.teal,
                opacity: 0.8,
                textTransform: "uppercase",
              }}
            >
              01 — Competencies
            </span>
            <div style={{ width: 18, height: 1, background: D.teal }} />
          </div>
        </Rev>
        <Rev d={60}>
          <h2
            className="f-display"
            style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", marginBottom: 56 }}
          >
            Core{" "}
            <span
              style={{
                fontStyle: "italic",
                ...(mode === "color"
                  ? {
                      background: `linear-gradient(135deg, ${D.lavender}, ${D.rose})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }
                  : { color: "#FFFFFF" }),
              }}
            >
              Skills
            </span>
          </h2>
        </Rev>

        {/* 4 glass skill cards grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          style={{ gap: 20 }}
        >
          {SKILLS.map((skill, i) => (
            <SkillCard key={i} skill={skill} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({
  skill,
  delay,
}: {
  skill: (typeof SKILLS)[number];
  delay: number;
}) {
  const D = useT();
  const [hov, setHov] = useState(false);
  const col = D[skill.colKey];

  return (
    <Rev d={delay}>
      <div
        className="liquid-card"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          padding: "28px 24px",
          cursor: "default",
          transition: "all .4s cubic-bezier(.16,1,.3,1)",
          transform: hov ? "translateY(-6px)" : "none",
          border: hov ? `1px solid ${col}44` : "1px solid rgba(255,255,255,0.08)",
          boxShadow: hov
            ? `0 24px 60px rgba(0,0,0,0.4), 0 0 0 1px ${col}22, 0 1px 0 rgba(255,255,255,0.1) inset`
            : "0 20px 60px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.08) inset",
          height: "100%",
        }}
      >
        {/* Shimmer on hover */}
        {hov && (
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "inherit",
              overflow: "hidden",
              pointerEvents: "none",
              zIndex: 10,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-50%",
                left: "-30%",
                width: "40%",
                height: "200%",
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
                animation: "shimmerSweep 0.8s ease forwards",
              }}
            />
          </div>
        )}

        {/* Accent top line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 24,
            right: 24,
            height: 2,
            borderRadius: "0 0 2px 2px",
            background: `linear-gradient(to right, ${col}, transparent)`,
            opacity: hov ? 1 : 0.4,
            transition: "opacity .3s",
          }}
        />

        {/* Icon */}
        <span
          className="material-icons-outlined"
          style={{
            fontSize: "1.6rem",
            color: col,
            marginBottom: 14,
            filter: `drop-shadow(0 0 8px ${col}88)`,
            display: "block",
          }}
        >
          {skill.icon}
        </span>

        {/* Category */}
        <h3
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontWeight: 600,
            fontSize: ".9rem",
            color: D.text,
            marginBottom: 20,
            lineHeight: 1.3,
          }}
        >
          {skill.cat}
        </h3>

        {/* Skills list */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {skill.items.map((item, j) => (
            <span
              key={item}
              className="glass-chip"
              style={{
                padding: "5px 12px",
                fontSize: ".75rem",
                fontFamily: "var(--font-inter), sans-serif",
                fontWeight: 400,
                color: D.textSub,
                animation: `chipIn .35s cubic-bezier(.16,1,.3,1) ${j * 40}ms both`,
                lineHeight: 1,
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </Rev>
  );
}
