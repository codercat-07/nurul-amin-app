"use client";

import { useState, useEffect, useRef } from "react";
import { useT, useTheme } from "@/lib/ThemeContext";

// ── Scramble config ─────────────────────────────────────────────
const LINE1 = "Md. Nurul";
const LINE2 = "Amin";
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#!%?";
const CHAR_GAP    = 70;
const SCRAMBLE_MS = 420;
const PAUSE_MS    = 6500;
const FADE_MS     = 800;

function useLoopingScramble(text: string, ready: boolean) {
  const chars = text.split("");
  const len = chars.length;
  const [display, setDisplay] = useState<string[]>(chars);
  const [settled, setSettled] = useState<boolean[]>(chars.map(() => false));
  const [phase, setPhase] = useState<"idle" | "scrambling" | "done">("idle");
  const cycleRef = useRef(0);

  useEffect(() => {
    if (!ready) return;
    let alive = true;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const intervals: ReturnType<typeof setInterval>[] = [];

    function runCycle() {
      if (!alive) return;
      cycleRef.current++;
      const cycle = cycleRef.current;
      setSettled(chars.map(() => false));
      setPhase("scrambling");

      chars.forEach((finalChar, i) => {
        const isSkip = finalChar === " " || finalChar === "." || finalChar === ",";
        const startAt = i * CHAR_GAP;
        if (isSkip) {
          const t = setTimeout(() => {
            if (!alive || cycleRef.current !== cycle) return;
            setDisplay(p => { const n = [...p]; n[i] = finalChar; return n; });
            setSettled(p => { const n = [...p]; n[i] = true; return n; });
          }, startAt);
          timeouts.push(t);
          return;
        }
        const t1 = setTimeout(() => {
          if (!alive || cycleRef.current !== cycle) return;
          const iv = setInterval(() => {
            if (!alive || cycleRef.current !== cycle) { clearInterval(iv); return; }
            setDisplay(p => { const n = [...p]; n[i] = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]; return n; });
          }, 40);
          intervals.push(iv);
          const t2 = setTimeout(() => {
            clearInterval(iv);
            if (!alive || cycleRef.current !== cycle) return;
            setDisplay(p => { const n = [...p]; n[i] = finalChar; return n; });
            setSettled(p => { const n = [...p]; n[i] = true; return n; });
          }, SCRAMBLE_MS);
          timeouts.push(t2);
        }, startAt);
        timeouts.push(t1);
      });

      const totalReveal = len * CHAR_GAP + SCRAMBLE_MS + 100;
      const tDone = setTimeout(() => { if (alive && cycleRef.current === cycle) setPhase("done"); }, totalReveal);
      timeouts.push(tDone);

      const tLoop = setTimeout(() => {
        if (!alive || cycleRef.current !== cycle) return;
        setPhase("idle");
        const tRe = setTimeout(() => { if (alive) runCycle(); }, FADE_MS);
        timeouts.push(tRe);
      }, totalReveal + PAUSE_MS);
      timeouts.push(tLoop);
    }

    const tInit = setTimeout(runCycle, 200);
    timeouts.push(tInit);
    return () => { alive = false; timeouts.forEach(clearTimeout); intervals.forEach(clearInterval); };
  }, [ready, text]);

  return { display, settled, phase };
}

// ── Name Reveal ─────────────────────────────────────────────────
function NameReveal({ ready }: { ready: boolean }) {
  const D = useT();
  const { mode } = useTheme();
  const l1 = useLoopingScramble(LINE1, ready);
  const l2 = useLoopingScramble(LINE2, ready);

  const baseStyle: React.CSSProperties = {
    fontFamily: "var(--font-dm-serif), Georgia, serif",
    fontWeight: 400,
    fontSize: "clamp(4rem, 9.5vw, 9rem)",
    lineHeight: 0.92,
    letterSpacing: "-.02em",
  };

  return (
    <div
      style={{
        marginBottom: 6,
        position: "relative",
        opacity: l1.phase === "idle" ? 0 : 1,
        transition: `opacity ${FADE_MS}ms cubic-bezier(.16,1,.3,1)`,
      }}
    >
      {/* Line 1: Md. Nurul */}
      <div style={{ ...baseStyle, display: "flex", flexWrap: "wrap" }}>
        {l1.display.map((ch, i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              whiteSpace: LINE1[i] === " " ? "pre" : "normal",
              color: l1.settled[i] ? D.text : D.teal,
              textShadow: l1.settled[i] ? "none" : `0 0 18px ${D.teal}, 0 0 40px ${D.teal}55`,
              transition: "color .4s, text-shadow .4s",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {LINE1[i] === " " ? "\u00A0" : ch}
          </span>
        ))}
      </div>

      {/* Line 2: Amin */}
      <div style={{ ...baseStyle, fontStyle: "italic", fontWeight: 700, display: "flex", flexWrap: "wrap" }}>
        {l2.display.map((ch, i) => {
          const done = l2.settled[i];
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                fontVariantNumeric: "tabular-nums",
                transition: "color .4s, text-shadow .4s",
                ...(done
                  ? mode === "color"
                    ? {
                        background: `linear-gradient(135deg, ${D.teal} 0%, ${D.lavender} 40%, ${D.rose} 70%, ${D.amber} 100%)`,
                        backgroundSize: "300% 300%",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        animation: "gradSwipe 6s ease infinite",
                      }
                    : { color: "#FFFFFF", textShadow: "none" }
                  : { color: D.teal, textShadow: `0 0 18px ${D.teal}, 0 0 40px ${D.teal}55` }),
              }}
            >
              {ch}
            </span>
          );
        })}
      </div>

      {/* Shimmer sweep */}
      {l1.phase === "done" && (
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: "35%",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)",
            pointerEvents: "none",
            animation: "shimmerLine 0.9s cubic-bezier(.4,0,.2,1) forwards",
            borderRadius: 4,
          }}
        />
      )}
    </div>
  );
}

/* Floating glass stat card */
function StatCard({
  value,
  label,
  col,
  delay,
}: {
  value: string;
  label: string;
  col: string;
  delay: number;
}) {
  const D = useT();
  return (
    <div
      className="liquid-card"
      style={{
        padding: "20px 24px",
        minWidth: 130,
        animation: `liquidFloat ${5 + delay * 0.5}s ease-in-out ${delay * 0.3}s infinite`,
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-dm-serif), serif",
          fontWeight: 800,
          fontSize: "2rem",
          color: col,
          lineHeight: 1,
          marginBottom: 6,
          filter: `drop-shadow(0 0 12px ${col}66)`,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: ".52rem",
          letterSpacing: ".14em",
          color: D.textMuted,
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default function Hero() {
  const D = useT();
  const { mode } = useTheme();
  const [rdy, setRdy] = useState(false);

  useEffect(() => {
    setTimeout(() => setRdy(true), 200);
  }, []);

  const fd = (d: number): React.CSSProperties => ({
    opacity: rdy ? 1 : 0,
    transform: rdy ? "none" : "translateY(24px)",
    transition: `opacity .9s cubic-bezier(.16,1,.3,1) ${d}ms, transform .9s cubic-bezier(.16,1,.3,1) ${d}ms`,
  });

  return (
    <section
      id="hero"
      style={{
        height: "100vh",
        minHeight: 700,
        background: D.bg0,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "100px 40px 80px",
      }}
    >
      {/* Mesh gradient orbs */}
      <div className="mesh-bg" aria-hidden>
        <div
          className="mesh-orb"
          style={{
            width: 800,
            height: 800,
            background: `radial-gradient(circle, ${D.teal}55 0%, transparent 70%)`,
            top: "-20%",
            left: "-15%",
            "--dur": "22s",
            "--tx1": "60px", "--ty1": "40px",
            "--tx2": "-30px", "--ty2": "80px",
            "--tx3": "50px", "--ty3": "-30px",
          } as React.CSSProperties}
        />
        <div
          className="mesh-orb"
          style={{
            width: 700,
            height: 700,
            background: `radial-gradient(circle, ${D.lavender}40 0%, transparent 70%)`,
            top: "10%",
            right: "-10%",
            "--dur": "28s",
            "--tx1": "-50px", "--ty1": "30px",
            "--tx2": "40px", "--ty2": "-60px",
            "--tx3": "-20px", "--ty3": "40px",
          } as React.CSSProperties}
        />
        <div
          className="mesh-orb"
          style={{
            width: 500,
            height: 500,
            background: `radial-gradient(circle, ${D.rose}30 0%, transparent 70%)`,
            bottom: "5%",
            left: "30%",
            "--dur": "18s",
            "--tx1": "30px", "--ty1": "-40px",
            "--tx2": "-60px", "--ty2": "20px",
            "--tx3": "20px", "--ty3": "30px",
          } as React.CSSProperties}
        />
        <div
          className="mesh-orb"
          style={{
            width: 400,
            height: 400,
            background: `radial-gradient(circle, ${D.emerald}25 0%, transparent 70%)`,
            bottom: "20%",
            right: "20%",
            "--dur": "24s",
            "--tx1": "-30px", "--ty1": "50px",
            "--tx2": "40px", "--ty2": "-20px",
            "--tx3": "-10px", "--ty3": "30px",
          } as React.CSSProperties}
        />
      </div>

      {/* Subtle dot grid */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: `radial-gradient(${D.gridDot} 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: 1100, margin: "0 auto", width: "100%" }}>
        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 40,
            ...fd(100),
          }}
        >
          <div
            className="glass-chip"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "7px 16px",
              border: "1px solid rgba(37, 211, 102, 0.25)",
              background: "rgba(37, 211, 102, 0.08)",
            }}
          >
            {/* Outer glow ring */}
            <span
              style={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 14,
                height: 14,
                flexShrink: 0,
              }}
            >
              {/* Pulsing ripple ring */}
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background: "rgba(37, 211, 102, 0.3)",
                  animation: "liveRipple 1.8s ease-out infinite",
                }}
              />
              {/* Solid green dot */}
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#25D366",
                  boxShadow: "0 0 10px #25D366, 0 0 20px #25D36666",
                  display: "inline-block",
                  position: "relative",
                  zIndex: 1,
                }}
              />
            </span>
            <span
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: ".6rem",
                letterSpacing: ".2em",
                color: "#25D366",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Available
            </span>
          </div>
        </div>

        {/* Name */}
        <NameReveal ready={rdy} />

        {/* Tagline */}
        <div
          style={{
            marginTop: 28,
            marginBottom: 32,
            ...fd(560),
          }}
        >
          <div
            style={{
              display: "inline-flex",
              flexWrap: "wrap",
              gap: "0 0",
              alignItems: "center",
            }}
          >
            {["Tech Enthusiast", " × ", "Educator", " × ", "Creative Visualizer"].map((w, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontWeight: w === " × " ? 300 : 500,
                  fontSize: "clamp(.9rem, 2vw, 1.1rem)",
                  color: w === " × " ? D.textMuted : D.textSub,
                  letterSpacing: ".03em",
                  padding: "0 2px",
                }}
              >
                {w}
              </span>
            ))}
          </div>
        </div>

        {/* Summary */}
        <p
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "clamp(.95rem, 1.8vw, 1.05rem)",
            lineHeight: 1.85,
            color: D.textSub,
            maxWidth: 520,
            marginBottom: 48,
            ...fd(680),
          }}
        >
          A multidisciplinary problem-solver skilled in design, marketing, web
          development, education, finance, and product research, focused on
          turning ideas into impactful solutions.
        </p>

        {/* CTA buttons */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, ...fd(820) }}>
          <a
            href="#experience"
            className="liquid-card"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 32px",
              borderRadius: "100px",
              background: `linear-gradient(135deg, ${D.teal}22 0%, ${D.lavender}22 100%)`,
              borderColor: `${D.teal}44`,
              color: D.text,
              fontFamily: "var(--font-inter), sans-serif",
              fontWeight: 600,
              fontSize: ".82rem",
              letterSpacing: ".05em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "all .3s",
              cursor: "none",
            }}
          >
            View Experience <span style={{ fontSize: ".9rem" }}>↗</span>
          </a>
          <a
            href="https://wa.me/8801550156871"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 32px",
              borderRadius: "100px",
              background: mode === "color" ? "rgba(37,211,102,0.1)" : "rgba(255,255,255,0.05)",
              border: mode === "color" ? "1px solid rgba(37,211,102,0.28)" : "1px solid rgba(255,255,255,0.15)",
              color: mode === "color" ? "#25D366" : "#CCCCCC",
              fontFamily: "var(--font-inter), sans-serif",
              fontWeight: 500,
              fontSize: ".82rem",
              letterSpacing: ".05em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "all .3s",
              cursor: "none",
              boxShadow: mode === "color" ? "0 0 18px rgba(37,211,102,0.1)" : "0 0 18px rgba(255,255,255,0.06)",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill={mode === "color" ? "#25D366" : "#CCCCCC"}
              style={{ flexShrink: 0, filter: mode === "color" ? "drop-shadow(0 0 5px #25D36688)" : "drop-shadow(0 0 5px rgba(255,255,255,0.3))" }}
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
        </div>

        {/* Hero portrait — desktop only */}
        <div
          className="hidden md:block"
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            width: "clamp(380px, 36vw, 560px)",
            height: "90%",
            zIndex: 1,
            pointerEvents: "none",
            ...fd(800),
          }}
        >
          <img
            src="/hero-portrait.png"
            alt="Nurul Amin"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
              maskImage: "linear-gradient(to bottom, black 50%, transparent 95%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 95%)",
            }}
          />
        </div>

        {/* Floating stat cards — desktop only */}
        <div
          className="hidden md:flex"
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            flexDirection: "column",
            gap: 16,
            zIndex: 2,
            ...fd(1000),
          }}
        >
          <StatCard value="10+" label="Years in Design" col={D.teal} delay={0} />
          <StatCard value="40th" label="BCS Cadre" col={D.lavender} delay={1} />
          <StatCard value="4" label="Disciplines" col={D.rose} delay={2} />
        </div>
      </div>

      {/* Scroll indicator — centered floating */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 70,
          transform: "translateX(-50%)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          opacity: rdy ? 0.6 : 0,
          transition: "opacity 1.2s ease 1.4s",
          animation: rdy ? "scrollFloat 3s ease-in-out 1.6s infinite" : "none",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: ".5rem",
            letterSpacing: ".18em",
            textTransform: "uppercase",
            color: D.textMuted,
          }}
        >
          Scroll
        </span>
        {/* Chevron */}
        <svg
          width="16"
          height="10"
          viewBox="0 0 16 10"
          fill="none"
          style={{ opacity: 0.7 }}
        >
          <path
            d="M1 1L8 8L15 1"
            stroke={D.teal}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
