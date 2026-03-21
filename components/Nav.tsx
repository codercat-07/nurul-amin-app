"use client";

import { useState, useEffect } from "react";
import { useT, useTheme } from "@/lib/ThemeContext";

interface NavProps {
  sec: string;
}

export default function Nav({ sec }: NavProps) {
  const D = useT();
  const { mode, toggle } = useTheme();
  const [sc, setSc] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setSc(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 400,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "14px 40px",
          background: sc ? D.nav : "transparent",
          backdropFilter: sc ? "blur(40px) saturate(200%)" : "none",
          WebkitBackdropFilter: sc ? "blur(40px) saturate(200%)" : "none",
          borderBottom: sc ? `1px solid ${D.navBorder}` : "1px solid transparent",
          transition: "all 0.5s cubic-bezier(.16,1,.3,1)",
        }}
      >
        {/* ── inner content wrapper — matches hero's maxWidth + padding ── */}
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 0,
          }}
        >

        {/* Logo */}
        <a
          href="#hero"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            lineHeight: 0,
          }}
        >
          <img
            src="/profile.png"
            alt="Nurul Amin"
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              objectFit: "cover",
              border: mode === "color" ? `1.5px solid ${D.teal}88` : "1.5px solid rgba(255,255,255,0.4)",
              boxShadow: mode === "color" ? `0 0 18px ${D.teal}44, 0 0 6px ${D.lavender}33` : "0 0 18px rgba(255,255,255,0.2), 0 0 6px rgba(255,255,255,0.1)",
              flexShrink: 0,
              display: "block",
              animation: "glowPulse 3s ease infinite",
            }}
          />
          <span
            style={{
              fontFamily: "'Bloom Velvet', serif",
              fontWeight: 400,
              fontSize: "1.9rem",
              color: D.text,
              letterSpacing: ".02em",
              lineHeight: 1,
            }}
          >
            Nurulamin
          </span>
        </a>

        {/* Desktop pill nav */}
        <div
          className="hidden md:flex glass-pill"
          style={{
            gap: 4,
            padding: "6px 8px",
            borderRadius: "100px",
          }}
        >
          {links.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: ".78rem",
                fontWeight: 500,
                letterSpacing: ".02em",
                color: sec === id ? D.text : D.textSub,
                textDecoration: "none",
                padding: "7px 18px",
                borderRadius: "100px",
                background: sec === id ? "rgba(255,255,255,0.1)" : "transparent",
                transition: "all .3s",
                border: sec === id ? "1px solid rgba(255,255,255,0.15)" : "1px solid transparent",
                boxShadow: sec === id ? "0 1px 0 rgba(255,255,255,0.1) inset" : "none",
                whiteSpace: "nowrap",
              }}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Theme Toggle */}
          <button
            onClick={toggle}
            className="flex"
            title={mode === "color" ? "Switch to B/W" : "Switch to Color"}
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.10)",
              cursor: "pointer",
              transition: "all .3s",
              padding: 0,
            }}
          >
            <span
              className="material-icons-outlined"
              style={{
                fontSize: "1rem",
                color: mode === "color" ? D.teal : "#FFFFFF",
                transition: "color .3s",
                lineHeight: 1,
              }}
            >
              {mode === "color" ? "palette" : "contrast"}
            </span>
          </button>

          {/* Mobile hamburger */}
          <button
            className="flex md:hidden flex-col justify-center items-center gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 6 }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: 22,
                  height: 1.5,
                  background: menuOpen && i === 1 ? "transparent" : D.textSub,
                  borderRadius: 2,
                  transition: "all .3s",
                  transform:
                    menuOpen && i === 0
                      ? "translateY(5px) rotate(45deg)"
                      : menuOpen && i === 2
                      ? "translateY(-5px) rotate(-45deg)"
                      : "none",
                }}
              />
            ))}
          </button>
        </div>
        {/* ── end inner content wrapper ── */}
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        style={{
          position: "fixed",
          top: 64,
          left: 12,
          right: 12,
          zIndex: 399,
          background: mode === "color" ? "rgba(7,7,18,0.92)" : "rgba(0,0,0,0.95)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "1.25rem",
          padding: "12px 8px",
          display: "flex",
          flexDirection: "column",
          gap: 4,
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "all" : "none",
          transform: menuOpen ? "none" : "translateY(-10px) scale(0.98)",
          transition: "all .35s cubic-bezier(.16,1,.3,1)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.08) inset",
        }}
      >
        {links.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: ".9rem",
              fontWeight: 500,
              color: sec === id ? D.text : D.textSub,
              textDecoration: "none",
              padding: "12px 20px",
              borderRadius: "0.875rem",
              background: sec === id ? "rgba(255,255,255,0.08)" : "transparent",
              transition: "all .2s",
            }}
          >
            {label}
          </a>
        ))}
      </div>
    </>
  );
}
