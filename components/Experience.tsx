"use client";

import { useState } from "react";
import { useT, useTheme } from "@/lib/ThemeContext";
import { EXP } from "@/lib/data";
import Rev from "./Rev";

export default function Experience() {
  const D = useT();
  const { mode } = useTheme();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="experience"
      style={{
        background: D.bg2,
        padding: "100px 40px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background orb */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${D.teal}12 0%, transparent 70%)`,
            top: "50%",
            left: "-10%",
            transform: "translateY(-50%)",
            filter: "blur(100px)",
          }}
        />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        {/* Section label */}
        <Rev>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 18, height: 1, background: D.lavender }} />
            <span
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: ".6rem",
                letterSpacing: ".2em",
                color: D.lavender,
                opacity: 0.8,
                textTransform: "uppercase",
              }}
            >
              02 — Career
            </span>
            <div style={{ width: 18, height: 1, background: D.lavender }} />
          </div>
        </Rev>
        <Rev d={60}>
          <h2 className="f-display" style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", marginBottom: 56 }}>
            Work{" "}
            <span
              style={{
                fontStyle: "italic",
                ...(mode === "color"
                  ? {
                      background: `linear-gradient(135deg, ${D.teal}, ${D.lavender})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }
                  : { color: "#FFFFFF" }),
              }}
            >
              Experience
            </span>
          </h2>
        </Rev>

        {/* Timeline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {EXP.map((item, i) => (
            <TimelineCard
              key={i}
              item={item}
              open={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
              delay={i * 80}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineCard({
  item,
  open,
  onToggle,
  delay,
}: {
  item: (typeof EXP)[number];
  open: boolean;
  onToggle: () => void;
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
          border: open
            ? `1px solid ${col}44`
            : hov
            ? "1px solid rgba(255,255,255,0.15)"
            : "1px solid rgba(255,255,255,0.08)",
          transition: "all .4s cubic-bezier(.16,1,.3,1)",
          boxShadow: open
            ? `0 24px 60px rgba(0,0,0,0.4), 0 0 0 1px ${col}22`
            : "0 16px 40px rgba(0,0,0,0.3)",
          cursor: "pointer",
        }}
        onClick={onToggle}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 20,
            padding: "24px 28px",
          }}
        >
          {/* Accent dot + vertical line */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 4, flexShrink: 0 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: col,
                boxShadow: `0 0 16px ${col}88`,
                transition: "box-shadow .3s",
                flexShrink: 0,
              }}
            />
            {open && (
              <div
                style={{
                  width: 1,
                  flex: 1,
                  minHeight: 16,
                  marginTop: 8,
                  background: `linear-gradient(to bottom, ${col}60, transparent)`,
                }}
              />
            )}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Period */}
            <div
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: ".58rem",
                letterSpacing: ".14em",
                color: col,
                opacity: 0.9,
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              {item.period}
            </div>

            {/* Role */}
            <h3
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontWeight: 700,
                fontSize: "clamp(1rem, 2vw, 1.2rem)",
                color: D.text,
                marginBottom: 4,
                lineHeight: 1.3,
              }}
            >
              {item.role}
            </h3>

            {/* Dept + Org */}
            <div
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: ".82rem",
                color: D.textSub,
                marginBottom: 2,
              }}
            >
              {item.dept}
            </div>
            <div
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: ".78rem",
                color: D.textMuted,
              }}
            >
              {item.org}
            </div>
          </div>

          {/* Expand toggle */}
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "all .3s",
              transform: open ? "rotate(45deg)" : "none",
              color: D.textSub,
              fontSize: ".9rem",
            }}
          >
            +
          </div>
        </div>

        {/* Expanded bullet points */}
        {open && (
          <div
            style={{
              paddingLeft: 60,
              paddingRight: 28,
              paddingBottom: 24,
              display: "flex",
              flexDirection: "column",
              gap: 10,
              textAlign: "left",
            }}
          >
            {item.pts.map((pt, j) => (
              <div
                key={j}
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "flex-start",
                  animation: `expIn .4s cubic-bezier(.16,1,.3,1) ${j * 60}ms both`,
                }}
              >
                <div
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: col,
                    marginTop: 8,
                    flexShrink: 0,
                    boxShadow: `0 0 6px ${col}88`,
                  }}
                />
                <p
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: ".85rem",
                    lineHeight: 1.7,
                    color: D.textSub,
                  }}
                >
                  {pt}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Rev>
  );
}
