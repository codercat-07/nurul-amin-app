"use client";

import { useT, useTheme } from "@/lib/ThemeContext";
import Rev from "./Rev";

export default function Contact() {
  const D = useT();
  const { mode } = useTheme();
  return (
    <section
      id="contact"
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
            width: 700,
            height: 700,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${D.teal}18 0%, transparent 60%)`,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            filter: "blur(100px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${D.lavender}18 0%, transparent 70%)`,
            bottom: "-100px",
            right: "-50px",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <Rev>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 20,
            }}
          >
            <div style={{ width: 18, height: 1, background: D.amber }} />
            <span
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: ".6rem",
                letterSpacing: ".2em",
                color: D.amber,
                opacity: 0.8,
                textTransform: "uppercase",
              }}
            >
              05 — Get In Touch
            </span>
            <div style={{ width: 18, height: 1, background: D.amber }} />
          </div>
        </Rev>

        <Rev d={60}>
          <h2 className="f-display" style={{ fontSize: "clamp(2.2rem, 6vw, 5rem)", marginBottom: 20, lineHeight: 1 }}>
            Let's{" "}
            <span
              style={{
                fontStyle: "italic",
                ...(mode === "color"
                  ? {
                      background: `linear-gradient(135deg, ${D.teal} 0%, ${D.lavender} 50%, ${D.rose} 100%)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }
                  : { color: "#FFFFFF" }),
              }}
            >
              Connect
            </span>
          </h2>
        </Rev>

        <Rev d={120}>
          <p
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "1rem",
              lineHeight: 1.8,
              color: D.textSub,
              maxWidth: 480,
              margin: "0 auto 48px",
            }}
          >
            Whether it's a creative project, educational collaboration,
            or digital venture — I'd love to hear from you.
          </p>
        </Rev>

        <Rev d={180}>
          {/* Main glass CTA card */}
          <div
            className="liquid-panel"
            style={{ padding: "48px 40px", textAlign: "center" }}
          >
            <div
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: ".6rem",
                letterSpacing: ".18em",
                color: D.textMuted,
                textTransform: "uppercase",
                marginBottom: 24,
              }}
            >
              Email
            </div>

            <a
              href="mailto:nurul.amin.link@gmail.com"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 14,
                padding: "20px 48px",
                borderRadius: "100px",
                background: `linear-gradient(135deg, ${D.teal}33 0%, ${D.lavender}33 100%)`,
                border: `1.5px solid ${D.teal}66`,
                color: D.text,
                fontFamily: "var(--font-inter), sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                letterSpacing: ".05em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "all .4s cubic-bezier(.16,1,.3,1)",
                boxShadow: `0 0 50px ${D.teal}22, 0 0 100px ${D.teal}11`,
                marginBottom: 32,
                position: "relative",
                overflow: "hidden",
                animation: "blink 3s ease infinite",
              }}
            >
              {/* Shimmer sweep */}
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)",
                  animation: "shimmerSweep 3s ease-in-out infinite",
                  pointerEvents: "none",
                }}
              />
              {/* Mail icon */}
              <svg width="20" height="16" viewBox="0 0 20 16" fill="none" style={{ flexShrink: 0, position: "relative", zIndex: 1 }}>
                <rect x="1" y="1" width="18" height="14" rx="3" stroke={D.teal} strokeWidth="1.5" />
                <path d="M1 3L10 9L19 3" stroke={D.teal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ position: "relative", zIndex: 1 }}>Send an Email</span>
              <span style={{ fontSize: "1.1rem", position: "relative", zIndex: 1, transition: "transform .3s", display: "inline-block" }}>→</span>
            </a>

            {/* Social / other links */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              {["Dhaka, Bangladesh", "Open to Collaboration"].map((t) => (
                <span
                  key={t}
                  className="glass-chip"
                  style={{
                    padding: "8px 16px",
                    fontSize: ".72rem",
                    fontFamily: "var(--font-inter), sans-serif",
                    color: D.textSub,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Rev>
      </div>
    </section>
  );
}
