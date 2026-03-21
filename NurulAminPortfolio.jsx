import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════
   DESIGN TOKENS — single dark palette
   High contrast, WCAG AA+ throughout
═══════════════════════════════════ */
const D = {
  // surfaces
  bg0: "#02050E",   // deepest — hero
  bg1: "#060B18",   // sections
  bg2: "#091020",   // alt sections
  nav: "rgba(2,5,14,.92)",
  card: "rgba(255,255,255,.03)",
  cardHov: "rgba(255,255,255,.06)",
  panel: "rgba(255,255,255,.025)",
  chip:  "rgba(255,255,255,.05)",
  chipBorder: "rgba(255,255,255,.1)",

  // text — max readability hierarchy
  text:      "#F0F4FF",          // headings / labels  ~96% white
  textBody:  "#B8C4E0",          // body copy          ~72% blue-white
  textSub:   "#7A8CAD",          // secondary labels   ~48%
  textMuted: "#4A5878",          // very faint         ~30%

  // borders
  border:    "rgba(100,140,220,.1)",
  borderHov: "rgba(100,140,220,.24)",

  // accents
  cyan:   "#14D2FF",
  orange: "#FF6B40",
  violet: "#AB78FF",
  mint:   "#00DFA8",

  // misc
  gridDot: "rgba(14,210,255,.03)",
  scan:    "rgba(14,210,255,.09)",
};

/* ═══════════════════════════════════
   GLOBAL STYLES + KEYFRAMES
═══════════════════════════════════ */
const InjectGlobals = () => {
  useEffect(() => {
    if (document.getElementById("pf-gl")) return;

    // fonts — Inter for body/ui, Playfair Display for expressive headings
    const f = document.createElement("link");
    f.id = "pf-gl"; f.rel = "stylesheet";
    f.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=JetBrains+Mono:wght@300;400&display=swap";
    document.head.appendChild(f);

    const s = document.createElement("style");
    s.textContent = `
      *,*::before,*::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; font-size: 16px; }
      body { background: ${D.bg0}; overflow-x: hidden; cursor: none; }
      ::selection { background: rgba(20,210,255,.2); color: #fff; }

      /* ── typography scale ── */
      .f-display {
        font-family: 'Playfair Display', Georgia, serif;
        font-weight: 800;
        line-height: 1.0;
        letter-spacing: -.02em;
        color: ${D.text};
      }
      .f-display-it {
        font-family: 'Playfair Display', Georgia, serif;
        font-weight: 700;
        font-style: italic;
        line-height: 1.0;
        letter-spacing: -.01em;
      }
      .f-ui {
        font-family: 'Inter', sans-serif;
        font-weight: 400;
        color: ${D.textBody};
        line-height: 1.7;
        font-size: 1rem;
        -webkit-font-smoothing: antialiased;
      }
      .f-mono {
        font-family: 'JetBrains Mono', monospace;
        font-weight: 300;
        letter-spacing: .06em;
        color: ${D.textSub};
        -webkit-font-smoothing: antialiased;
      }

      /* ── name animation ── */
      @keyframes charDrop {
        0%   { opacity:0; transform:translateY(-50px) rotateX(-80deg) scale(.85); filter:blur(6px); }
        55%  { opacity:1; transform:translateY(5px) rotateX(6deg) scale(1.03); filter:blur(0); }
        75%  { transform:translateY(-2px) rotateX(-2deg) scale(1.005); }
        100% { opacity:1; transform:translateY(0) rotateX(0) scale(1); filter:blur(0); }
      }
      @keyframes charLand {
        0%   { text-shadow: none; }
        35%  { text-shadow: 0 0 24px rgba(20,210,255,.9), 0 0 60px rgba(20,210,255,.35); }
        100% { text-shadow: none; }
      }
      @keyframes nameUp {
        0%   { opacity:0; transform:translateY(70px) skewX(-3deg); }
        65%  { opacity:1; transform:translateY(-3px) skewX(.3deg); }
        100% { opacity:1; transform:none; }
      }
      @keyframes gradSwipe {
        0%   { background-position: 0% 50%; }
        50%  { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      /* ── shared ── */
      @keyframes scanY  { 0%{top:-3px} 100%{top:100%} }
      @keyframes pulse  { 0%,100%{opacity:.6} 50%{opacity:1} }
      @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
      @keyframes spin   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      @keyframes float  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
      @keyframes chipIn { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:none} }
      @keyframes expIn  { from{opacity:0;transform:translateX(-10px)} to{opacity:1;transform:none} }
      @keyframes blink  { 0%,100%{border-color:rgba(20,210,255,.12)} 50%{border-color:rgba(20,210,255,.5)} }
    `;
    document.head.appendChild(s);
  }, []);
  return null;
};

/* ═══════════════════════════════════
   CURSOR
═══════════════════════════════════ */
function Cursor() {
  const dot = useRef(null), ring = useRef(null), trails = useRef([]);
  const m = useRef({ x: 0, y: 0 }), r = useRef({ x: 0, y: 0 });
  const hist = useRef(Array(10).fill({ x: 0, y: 0 }));
  useEffect(() => {
    const mv = e => { m.current = { x: e.clientX, y: e.clientY }; };
    document.addEventListener("mousemove", mv);
    let id;
    const tick = () => {
      const { x: mx, y: my } = m.current;
      if (dot.current) dot.current.style.transform = `translate(${mx - 4}px,${my - 4}px)`;
      r.current.x += (mx - r.current.x) * .11;
      r.current.y += (my - r.current.y) * .11;
      if (ring.current) ring.current.style.transform = `translate(${r.current.x - 18}px,${r.current.y - 18}px)`;
      hist.current = [{ x: r.current.x, y: r.current.y }, ...hist.current.slice(0, 9)];
      trails.current.forEach((el, i) => {
        if (!el) return;
        const { x, y } = hist.current[i]; const sz = (1 - i / 10) * 7;
        el.style.transform = `translate(${x - sz / 2}px,${y - sz / 2}px)`;
        el.style.width = sz + "px"; el.style.height = sz + "px";
        el.style.opacity = (1 - i / 10) * .11;
      });
      id = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(id); document.removeEventListener("mousemove", mv); };
  }, []);
  const base = { position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 9999, borderRadius: "50%" };
  return <>
    <div ref={dot} style={{ ...base, width: 8, height: 8, background: D.cyan, mixBlendMode: "screen" }} />
    <div ref={ring} style={{ ...base, width: 36, height: 36, border: `1px solid ${D.cyan}70` }} />
    {Array(10).fill(0).map((_, i) => (
      <div key={i} ref={el => trails.current[i] = el} style={{ ...base, background: D.cyan }} />
    ))}
  </>;
}

/* ═══════════════════════════════════
   NEURAL CANVAS
═══════════════════════════════════ */
function NeuralCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current, ctx = cv.getContext("2d");
    let W, H, pts, id;
    const mouse = { x: -999, y: -999 };
    const resize = () => { W = cv.width = cv.offsetWidth; H = cv.height = cv.offsetHeight; };
    resize(); window.addEventListener("resize", resize);
    document.addEventListener("mousemove", e => { mouse.x = e.clientX; mouse.y = e.clientY; });
    pts = Array.from({ length: 90 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25,
      r: Math.random() * 1.2 + .4,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        const d = Math.hypot(mouse.x - p.x, mouse.y - p.y);
        if (d < 90) { p.x -= (mouse.x - p.x) * .012; p.y -= (mouse.y - p.y) * .012; }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(20,210,255,.5)"; ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.hypot(dx, dy);
        if (d < 110) {
          const md = Math.hypot(mouse.x - (pts[i].x + pts[j].x) / 2, mouse.y - (pts[i].y + pts[j].y) / 2);
          ctx.strokeStyle = `rgba(20,210,255,${.05 * (1 - d / 110) * (md < 150 ? 2.2 : 1)})`;
          ctx.lineWidth = .5; ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
        }
      }
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />;
}

/* ═══════════════════════════════════
   MAGNETIC LINK
═══════════════════════════════════ */
function Mag({ children, href, style = {} }) {
  const ref = useRef(null);
  return <a ref={ref} href={href}
    onMouseMove={e => { const b = ref.current.getBoundingClientRect(); ref.current.style.transform = `translate(${(e.clientX - b.left - b.width / 2) * .28}px,${(e.clientY - b.top - b.height / 2) * .28}px)`; }}
    onMouseLeave={() => ref.current.style.transform = ""}
    style={{ cursor: "none", display: "inline-flex", alignItems: "center", transition: "transform .44s cubic-bezier(.16,1,.3,1)", textDecoration: "none", ...style }}>
    {children}
  </a>;
}

/* ═══════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════ */
function Rev({ children, d = 0, y = 40 }) {
  const ref = useRef(null); const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold: .1 });
    if (ref.current) o.observe(ref.current); return () => o.disconnect();
  }, []);
  return <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "none" : `translateY(${y}px)`, transition: `opacity .85s cubic-bezier(.16,1,.3,1) ${d}ms, transform .85s cubic-bezier(.16,1,.3,1) ${d}ms` }}>{children}</div>;
}

/* ═══════════════════════════════════
   SECTION LABEL + HEADING
═══════════════════════════════════ */
function Label({ num, txt, col }) {
  return (
    <Rev>
      <div className="f-mono" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, fontSize: ".65rem", color: col, opacity: .8 }}>
        <span style={{ width: 20, height: 1, background: col, display: "inline-block" }} />
        {num} — {txt}
      </div>
    </Rev>
  );
}

/* heading — Playfair Display, large, readable */
function Heading({ children, accent, mb = 72 }) {
  return (
    <Rev d={70}>
      <h2 className="f-display" style={{ fontSize: "clamp(2.8rem,5.5vw,5rem)", marginBottom: mb, color: D.text }}>
        {children}
        {accent && <span style={{ color: accent, fontStyle: "italic" }}> {accent}</span>}
      </h2>
    </Rev>
  );
}

/* ═══════════════════════════════════
   NAME REVEAL
   Line 1: char-by-char 3D drop
   Line 2: full-word slide + gradient
═══════════════════════════════════ */
function NameReveal({ ready }) {
  const LINE1 = "MD. NURUL";
  const BASE = 280, STEP = 52;
  return (
    <div style={{ perspective: "900px", perspectiveOrigin: "50% 65%", marginBottom: 4 }}>
      {/* Line 1 — Playfair Display, enormous, each char drops */}
      <div style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontWeight: 800,
        fontSize: "clamp(5.5rem,11vw,9.5rem)",
        lineHeight: .9,
        letterSpacing: "-.02em",
        color: D.text,
        display: "flex", flexWrap: "wrap",
        marginBottom: 0,
      }}>
        {LINE1.split("").map((ch, i) => (
          <span key={i} style={{
            display: "inline-block",
            whiteSpace: ch === " " ? "pre" : "normal",
            animation: ready
              ? `charDrop .72s cubic-bezier(.22,1,.36,1) ${BASE + i * STEP}ms both, charLand .85s ease-out ${BASE + i * STEP + 180}ms both`
              : "none",
            opacity: ready ? undefined : 0,
          }}>
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </div>

      {/* Line 2 — gradient sweep slide-up */}
      <div style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontStyle: "italic",
        fontWeight: 700,
        fontSize: "clamp(5.5rem,11vw,9.5rem)",
        lineHeight: .9,
        letterSpacing: "-.01em",
        background: `linear-gradient(110deg, ${D.cyan}, ${D.violet}, ${D.mint}, ${D.cyan})`,
        backgroundSize: "300% 300%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        animation: ready
          ? `nameUp .88s cubic-bezier(.16,1,.3,1) ${BASE + LINE1.length * STEP + 60}ms both, gradSwipe 5s ease infinite`
          : "none",
        opacity: ready ? undefined : 0,
      }}>
        Amin
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   DATA
═══════════════════════════════════ */
const SKILLS = [
  { cat: "Design & Creative",     col: D.orange, g: "✦",    items: ["Adobe Illustrator", "Adobe Photoshop", "Canva", "Visual Branding", "T-Shirt Design", "Creative Direction"] },
  { cat: "Web & Technology",      col: D.cyan,   g: "⟨/⟩",  items: ["HTML5", "CSS3", "JavaScript", "React.js", "WordPress", "Responsive Design"] },
  { cat: "Digital Tools",         col: D.violet, g: "◈",    items: ["PowerPoint", "Excel", "Adobe Premiere Pro", "CapCut", "Video Editing", "Content Creation"] },
  { cat: "Business & Publishing", col: D.mint,   g: "⬡",    items: ["Amazon Affiliate", "Kindle Direct Publishing", "Print-on-Demand", "Merch by Amazon", "Blogging", "Digital Marketing"] },
];
const EXP = [
  { period: "2022 — Present", role: "Civil Service Officer",         dept: "Lecturer in Accounting",    org: "Ministry of Education · 40th BCS Cadre", col: D.cyan,
    pts: ["Teaching accounting at higher education level to undergraduate students.", "Developing course materials and delivering impactful lectures.", "Integrating digital tools to enhance modern learning outcomes."] },
  { period: "2021 — 2022",   role: "Assistant Manager",              dept: "Marketing & Value Added Services", org: "Teletalk Bangladesh Limited",      col: D.orange,
    pts: ["Drove marketing initiatives and telecom VAS campaigns.", "Supported digital service promotion strategies.", "Coordinated with technical teams to improve engagement."] },
  { period: "2017 — 2018",   role: "Creative Designer & Copywriter", dept: "Brand Identity & Marketing", org: "Horin Branding — Dhaka",               col: D.violet,
    pts: ["Partnered with SME entrepreneurs on brand identity.", "Designed logos, social visuals, and promotional materials.", "Created engaging brand copy for diverse client campaigns."] },
  { period: "2014 — 2019",   role: "Freelance Visualizer",           dept: "T-Shirt Design · Graphic Arts", org: "Fiverr — Remote, Global Clients",   col: D.mint,
    pts: ["Designed creative graphics and custom T-shirt artwork globally.", "Developed brand visuals, merchandise, and marketing graphics.", "Delivered high-quality solutions with strong client satisfaction."] },
];

/* ═══════════════════════════════════
   NAV
═══════════════════════════════════ */
function Nav({ sec }) {
  const [sc, setSc] = useState(false);
  useEffect(() => { const h = () => setSc(window.scrollY > 50); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 400,
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "18px 64px",
      background: sc ? D.nav : "transparent",
      backdropFilter: sc ? "blur(24px)" : "none",
      borderBottom: sc ? `1px solid ${D.border}` : "none",
      transition: "all .5s",
    }}>
      {/* Logo — Inter 600, clean */}
      <div style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: "1rem", letterSpacing: ".08em", color: D.cyan, textTransform: "uppercase", textShadow: `0 0 28px ${D.cyan}55` }}>
        MD. Nurul Amin
      </div>

      <div style={{ display: "flex", gap: 40 }}>
        {["skills", "experience", "education", "interests"].map(s => (
          <a key={s} href={`#${s}`} className="f-mono" style={{
            fontSize: ".65rem", letterSpacing: ".14em", textTransform: "uppercase",
            color: sec === s ? D.cyan : D.textSub,
            textDecoration: "none", cursor: "none", transition: "color .3s",
            borderBottom: sec === s ? `1px solid ${D.cyan}` : "1px solid transparent", paddingBottom: 2,
          }}>{s}</a>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }} className="f-mono">
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: D.mint, boxShadow: `0 0 8px ${D.mint}`, display: "inline-block", animation: "pulse 2s ease infinite" }} />
        <span style={{ fontSize: ".6rem", letterSpacing: ".12em", color: `${D.mint}99` }}>DHAKA, BD</span>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════
   HERO
═══════════════════════════════════ */
function Hero() {
  const [rdy, setRdy] = useState(false);
  const [mp, setMp] = useState({ x: 0, y: 0 });
  const hr = useRef(null);
  useEffect(() => { setTimeout(() => setRdy(true), 250); }, []);
  useEffect(() => {
    const h = e => { if (!hr.current) return; const r = hr.current.getBoundingClientRect(); setMp({ x: (e.clientX - r.width / 2) / r.width, y: (e.clientY - r.height / 2) / r.height }); };
    window.addEventListener("mousemove", h); return () => window.removeEventListener("mousemove", h);
  }, []);
  const fd = d => ({ opacity: rdy ? 1 : 0, transform: rdy ? "none" : "translateY(30px)", transition: `opacity .85s cubic-bezier(.16,1,.3,1) ${d}ms, transform .85s cubic-bezier(.16,1,.3,1) ${d}ms` });

  return (
    <section id="hero" ref={hr} style={{ minHeight: "100vh", background: D.bg0, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 64px 80px" }}>
      <NeuralCanvas />
      {/* dot grid */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `radial-gradient(${D.gridDot} 1.2px, transparent 1.2px)`, backgroundSize: "40px 40px" }} />
      {/* scanline */}
      <div style={{ position: "absolute", left: 0, right: 0, height: 2, background: `linear-gradient(transparent, ${D.scan}, transparent)`, animation: "scanY 8s linear infinite", zIndex: 2, pointerEvents: "none" }} />
      {/* parallax orbs */}
      <div style={{ position: "absolute", width: 660, height: 660, borderRadius: "50%", background: `radial-gradient(circle, rgba(20,210,255,.07) 0%, transparent 70%)`, top: "50%", left: "50%", transform: `translate(calc(-50% + ${mp.x * 55}px), calc(-50% + ${mp.y * 50}px))`, transition: "transform .85s cubic-bezier(.16,1,.3,1)", pointerEvents: "none", zIndex: 1 }} />
      <div style={{ position: "absolute", width: 340, height: 340, borderRadius: "50%", background: `radial-gradient(circle, rgba(255,107,64,.05) 0%, transparent 70%)`, bottom: 20, right: "20%", transform: `translate(${mp.x * -32}px, ${mp.y * -32}px)`, transition: "transform 1s cubic-bezier(.16,1,.3,1)", pointerEvents: "none", zIndex: 1 }} />
      {/* spinning rings */}
      <div style={{ position: "absolute", right: 80, top: "50%", marginTop: -200, width: 400, height: 400, pointerEvents: "none", zIndex: 1 }}>
        {[400, 300, 210, 130].map((s, i) => (
          <div key={i} style={{ position: "absolute", borderRadius: "50%", width: s, height: s, top: (400 - s) / 2, left: (400 - s) / 2, border: `1px solid rgba(20,210,255,${.04 + i * .025})`, animation: `spin ${22 + i * 9}s linear infinite ${i % 2 ? "reverse" : ""}` }}>
            {i === 0 && <div style={{ position: "absolute", top: -5, left: "50%", marginLeft: -5, width: 10, height: 10, borderRadius: "50%", background: D.cyan, boxShadow: `0 0 20px ${D.cyan}` }} />}
          </div>
        ))}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="f-mono" style={{ fontSize: ".72rem", color: `${D.cyan}22`, textAlign: "center" }}>40TH<br />BCS</div>
        </div>
      </div>

      <div style={{ position: "relative", zIndex: 3 }}>
        {/* eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 40, ...fd(80) }}>
          <div style={{ width: 40, height: 1, background: `linear-gradient(to right, ${D.cyan}, transparent)` }} />
          <span className="f-mono" style={{ fontSize: ".65rem", color: `${D.cyan}88`, letterSpacing: ".22em" }}>PORTFOLIO · 2025</span>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: D.cyan, display: "inline-block", animation: "pulse 2s ease infinite" }} />
        </div>

        {/* ── NAME ── */}
        <NameReveal ready={rdy} />

        {/* role strip — Inter 400, well-spaced */}
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", margin: "32px 0 48px", ...fd(520) }}>
          {["Educator", "·", "Designer", "·", "Technologist"].map((w, i) => (
            <span key={i} className={w === "·" ? "" : "f-ui"} style={{
              fontSize: w === "·" ? "1.2rem" : "1rem",
              fontWeight: w === "·" ? 300 : 400,
              color: w === "·" ? `${D.orange}70` : D.textSub,
              letterSpacing: w === "·" ? 0 : ".06em",
              padding: w === "·" ? "0 18px" : "0",
            }}>{w}</span>
          ))}
        </div>

        {/* summary — Inter 400, 17px, generous line-height */}
        <p className="f-ui" style={{
          fontSize: "1.06rem", lineHeight: 1.85, color: D.textBody,
          maxWidth: 520, marginBottom: 52, fontWeight: 400, ...fd(640)
        }}>
          Dynamic educator and creative professional bridging accounting, digital design,
          and technology-driven learning — building impactful solutions at the intersection
          of creativity and education.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", ...fd(760) }}>
          <Mag href="#experience" style={{
            fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: ".82rem",
            letterSpacing: ".06em", textTransform: "uppercase",
            padding: "14px 34px", background: D.cyan, color: D.bg0,
            boxShadow: `0 0 44px ${D.cyan}44`, gap: 10,
          }}>
            View Experience <span style={{ fontSize: ".9rem" }}>↗</span>
          </Mag>
          <Mag href="#skills" style={{
            fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: ".82rem",
            letterSpacing: ".06em", textTransform: "uppercase",
            padding: "14px 34px", background: "transparent",
            color: D.textSub, border: `1px solid ${D.border}`,
            animation: "blink 3.5s ease infinite", gap: 10,
          }}>
            Explore Skills
          </Mag>
        </div>
      </div>

      {/* stats */}
      <div style={{ position: "absolute", left: 64, bottom: 52, display: "flex", gap: 52, zIndex: 3, ...fd(900) }}>
        {[{ n: "10+", l: "Years in Design" }, { n: "40th", l: "BCS Cadre" }, { n: "4", l: "Disciplines" }].map((s, i) => (
          <div key={i}>
            <div className="f-display" style={{ fontSize: "2.4rem", letterSpacing: ".02em" }}>{s.n}</div>
            <div className="f-mono" style={{ fontSize: ".6rem", color: D.textMuted, letterSpacing: ".16em", textTransform: "uppercase", marginTop: 5 }}>{s.l}</div>
          </div>
        ))}
      </div>
      {/* scroll hint */}
      <div style={{ position: "absolute", right: 48, bottom: 44, zIndex: 3, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, opacity: rdy ? .35 : 0, transition: "opacity 1.2s 1.3s" }}>
        <span className="f-mono" style={{ fontSize: ".5rem", letterSpacing: ".18em", textTransform: "uppercase", writingMode: "vertical-rl", color: D.textMuted }}>SCROLL</span>
        <div style={{ width: 1, height: 50, background: `linear-gradient(to bottom, ${D.cyan}80, transparent)`, animation: "pulse 2s ease infinite" }} />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════
   MARQUEE
═══════════════════════════════════ */
function Marquee() {
  const items = ["Educator", "Creative Designer", "Web Developer", "Digital Marketer", "40th BCS Cadre", "Visual Branding", "React Developer", "EdTech Enthusiast", "Illustrator", "KDP Author"];
  return (
    <div style={{ overflow: "hidden", background: D.cyan, padding: "11px 0" }}>
      <div style={{ display: "flex", animation: "ticker 34s linear infinite", whiteSpace: "nowrap" }}>
        {[...items, ...items].map((t, i) => (
          <span key={i} style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: ".78rem", letterSpacing: ".22em", textTransform: "uppercase", color: D.bg0, padding: "0 36px", display: "flex", alignItems: "center", gap: 20 }}>
            {t}<span style={{ color: "rgba(2,5,14,.25)", fontSize: ".5rem" }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   SKILLS
═══════════════════════════════════ */
function Skills() {
  const [active, setActive] = useState(0);
  const panelRef = useRef(null);
  const switchTab = i => {
    if (!panelRef.current) return;
    panelRef.current.style.opacity = "0"; panelRef.current.style.transform = "translateY(8px)";
    setTimeout(() => { setActive(i); if (panelRef.current) { panelRef.current.style.opacity = "1"; panelRef.current.style.transform = "none"; } }, 200);
  };
  return (
    <section id="skills" style={{ background: D.bg1, padding: "120px 64px", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `radial-gradient(${D.gridDot} 1px, transparent 1px)`, backgroundSize: "34px 34px" }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Label num="01" txt="COMPETENCIES" col={D.cyan} />
        <Rev d={70}><h2 className="f-display" style={{ fontSize: "clamp(2.8rem,5.5vw,5rem)", marginBottom: 64 }}>Core <span style={{ color: D.cyan, fontStyle: "italic" }}>Skills</span></h2></Rev>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 2, marginBottom: 2 }}>
          {SKILLS.map((s, i) => {
            const [hov, setHov] = useState(false); const on = active === i;
            return <Rev key={i} d={i * 60}>
              <div onClick={() => switchTab(i)} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                style={{ padding: "24px 26px", border: `1px solid ${on ? s.col : hov ? D.borderHov : D.border}`, background: on ? `${s.col}12` : D.card, cursor: "none", transition: "all .4s cubic-bezier(.16,1,.3,1)", transform: hov && !on ? "translateY(-3px)" : "none", position: "relative" }}>
                {on && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(to right, ${s.col}, transparent)` }} />}
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "1rem", color: s.col, marginBottom: 12 }}>{s.g}</div>
                {/* Inter 500 for tab labels — crisp */}
                <div style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: ".88rem", color: on ? D.text : D.textSub, transition: "color .3s", lineHeight: 1.3 }}>{s.cat}</div>
              </div>
            </Rev>;
          })}
        </div>
        <div ref={panelRef} style={{ border: `1px solid ${D.border}`, borderTop: "none", padding: "46px 48px", background: D.panel, transition: "opacity .2s, transform .2s" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "1.2rem", color: SKILLS[active].col }}>{SKILLS[active].g}</span>
            {/* Playfair Display for panel title */}
            <span className="f-display" style={{ fontSize: "1.7rem", letterSpacing: ".02em", lineHeight: 1 }}>{SKILLS[active].cat}</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {SKILLS[active].items.map((item, i) => (
              <div key={item} style={{
                fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: ".9rem",
                padding: "10px 20px", border: `1px solid ${D.chipBorder}`,
                color: D.textBody, background: D.chip,
                animation: `chipIn .4s cubic-bezier(.16,1,.3,1) ${i * 46}ms both`,
                cursor: "none", lineHeight: 1,
              }}>
                <span style={{ color: SKILLS[active].col, marginRight: 9, fontSize: ".65rem" }}>▸</span>{item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════
   EXPERIENCE
═══════════════════════════════════ */
function Experience() {
  const [open, setOpen] = useState(0);
  return (
    <section id="experience" style={{ background: D.bg2, padding: "120px 64px" }}>
      <Label num="02" txt="RECORD" col={D.orange} />
      <Rev d={70}><h2 className="f-display" style={{ fontSize: "clamp(2.8rem,5.5vw,5rem)", marginBottom: 72 }}>Career <span style={{ color: D.orange, fontStyle: "italic" }}>Timeline</span></h2></Rev>
      {EXP.map((e, i) => {
        const on = open === i;
        return <Rev key={i} d={i * 60}>
          <div style={{ borderTop: `1px solid ${D.border}`, background: on ? `linear-gradient(90deg, ${e.col}08, transparent)` : "transparent", transition: "background .5s" }}>
            <div onClick={() => setOpen(on ? -1 : i)} style={{ display: "grid", gridTemplateColumns: "190px 1fr 52px", gap: 28, padding: "32px 0", alignItems: "center", cursor: "none" }}>
              <div>
                <div className="f-mono" style={{ fontSize: ".65rem", color: e.col, letterSpacing: ".1em", marginBottom: 7 }}>{e.period}</div>
                {/* Inter 400 org text — readable */}
                <div style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: ".8rem", color: D.textSub, lineHeight: 1.55 }}>{e.org}</div>
              </div>
              <div>
                {/* Playfair Display for role names — elegant */}
                <div className="f-display" style={{ fontSize: "clamp(1.3rem,2vw,1.8rem)", color: on ? D.text : D.textBody, transition: "color .3s", letterSpacing: "-.01em" }}>{e.role}</div>
                <div style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: ".8rem", fontStyle: "italic", color: D.textSub, marginTop: 5 }}>{e.dept}</div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", border: `1px solid ${on ? e.col : D.border}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "all .4s cubic-bezier(.16,1,.3,1)", transform: on ? "rotate(45deg)" : "none", background: on ? `${e.col}18` : "transparent" }}>
                  <span className="f-mono" style={{ fontSize: "1rem", color: on ? e.col : D.textMuted, lineHeight: 1 }}>+</span>
                </div>
              </div>
            </div>
            <div style={{ overflow: "hidden", maxHeight: on ? 280 : 0, transition: "max-height .6s cubic-bezier(.16,1,.3,1)" }}>
              <div style={{ paddingBottom: 36, paddingLeft: 218 }}>
                {e.pts.map((p, j) => (
                  <div key={j} style={{ display: "flex", gap: 14, marginBottom: 14, animation: on ? `expIn .5s cubic-bezier(.16,1,.3,1) ${j * 80}ms both` : "none" }}>
                    <span style={{ color: e.col, flexShrink: 0, marginTop: 3, fontSize: ".9rem" }}>—</span>
                    {/* Inter 400, 15px, solid readability */}
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: ".95rem", color: D.textBody, lineHeight: 1.75 }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Rev>;
      })}
      <div style={{ borderTop: `1px solid ${D.border}` }} />
    </section>
  );
}

/* ═══════════════════════════════════
   EDUCATION
═══════════════════════════════════ */
function Education() {
  const cards = [
    { deg: "MBA", field: "Accounting", uni: "University of Dhaka", col: D.violet },
    { deg: "BBA", field: "Accounting", uni: "University of Dhaka", col: D.mint },
  ];
  return (
    <section id="education" style={{ background: D.bg1, padding: "120px 64px" }}>
      <Label num="03" txt="ACADEMIC" col={D.violet} />
      <Rev d={70}><h2 className="f-display" style={{ fontSize: "clamp(2.8rem,5.5vw,5rem)", marginBottom: 72 }}>Higher <span style={{ color: D.violet, fontStyle: "italic" }}>Education</span></h2></Rev>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
        {cards.map((c, i) => {
          const [hov, setHov] = useState(false);
          return <Rev key={i} d={i * 110}>
            <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
              style={{ background: hov ? D.cardHov : D.card, border: `1px solid ${hov ? c.col + "55" : D.border}`, padding: "72px 60px", position: "relative", overflow: "hidden", transition: "all .5s cubic-bezier(.16,1,.3,1)", cursor: "none" }}>
              {hov && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(to right, ${c.col}, transparent)` }} />}
              {[310, 210, 130].map((s, j) => (
                <div key={j} style={{ position: "absolute", bottom: -s * .28, right: -s * .28, width: s, height: s, borderRadius: "50%", border: `1px solid ${c.col}${hov ? "22" : "0D"}`, transition: "border-color .5s", animation: hov ? `spin ${38 + j * 12}s linear infinite` : "none" }} />
              ))}
              {/* Degree — Playfair Display huge */}
              <div className="f-display" style={{ fontSize: "6rem", color: c.col, lineHeight: 1, marginBottom: 16, textShadow: hov ? `0 0 70px ${c.col}50` : "none", transition: "text-shadow .5s" }}>{c.deg}</div>
              {/* Field — Inter 500 */}
              <div style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: "1.2rem", color: D.text, marginBottom: 16, letterSpacing: "-.01em" }}>{c.field}</div>
              <div className="f-mono" style={{ fontSize: ".65rem", color: D.textMuted, letterSpacing: ".16em", textTransform: "uppercase" }}>{c.uni}</div>
            </div>
          </Rev>;
        })}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════
   INTERESTS
═══════════════════════════════════ */
function Interests() {
  const items = [
    { label: "Educational Technology", icon: "🎓", col: D.cyan },
    { label: "Creative Branding", icon: "✦", col: D.orange },
    { label: "Digital Entrepreneurship", icon: "📈", col: D.mint },
    { label: "AI & Automation", icon: "⚙", col: D.violet },
    { label: "Web Development", icon: "🌐", col: D.cyan },
  ];
  return (
    <section id="interests" style={{ background: D.bg2, padding: "120px 64px" }}>
      <Label num="04" txt="BEYOND" col={D.mint} />
      <Rev d={70}><h2 className="f-display" style={{ fontSize: "clamp(2.8rem,5.5vw,5rem)", marginBottom: 72 }}>Areas of <span style={{ color: D.mint, fontStyle: "italic" }}>Interest</span></h2></Rev>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 3 }}>
        {items.map((item, i) => {
          const [hov, setHov] = useState(false);
          return <Rev key={i} d={i * 70}>
            <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
              style={{ padding: "48px 22px 40px", border: `1px solid ${hov ? item.col + "55" : D.border}`, background: hov ? D.cardHov : D.card, textAlign: "center", cursor: "none", transform: hov ? "translateY(-6px)" : "none", transition: "all .45s cubic-bezier(.16,1,.3,1)", position: "relative" }}>
              {hov && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(to right, transparent, ${item.col}, transparent)` }} />}
              <div style={{ fontSize: "1.5rem", marginBottom: 16, opacity: hov ? 1 : .45, filter: hov ? `drop-shadow(0 0 10px ${item.col}80)` : "none", animation: hov ? "float 3s ease-in-out infinite" : "none", transition: "filter .4s, opacity .4s" }}>{item.icon}</div>
              {/* Inter 400 — clear label */}
              <div style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: ".88rem", color: hov ? D.text : D.textSub, lineHeight: 1.5, transition: "color .3s" }}>{item.label}</div>
            </div>
          </Rev>;
        })}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════
   CONTACT
═══════════════════════════════════ */
function Contact() {
  return (
    <section id="contact" style={{ background: D.bg1, padding: "110px 64px", position: "relative", overflow: "hidden", borderTop: `1px solid ${D.border}` }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 560px 360px at 50% 50%, rgba(20,210,255,.04), transparent)`, pointerEvents: "none" }} />
      <Rev>
        <div className="f-mono" style={{ fontSize: ".65rem", color: `${D.cyan}80`, letterSpacing: ".24em", marginBottom: 20 }}>── OPEN FOR COLLABORATION</div>
        {/* Playfair Display for call-to-action headline */}
        <div className="f-display" style={{ fontSize: "clamp(2.8rem,6vw,5rem)", lineHeight: 1.05, marginBottom: 20 }}>
          Let's build
        </div>
        <div className="f-display-it" style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(2.8rem,6vw,5rem)", lineHeight: 1.05, marginBottom: 52,
          background: `linear-gradient(100deg, ${D.cyan}, ${D.violet}, ${D.cyan})`,
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          animation: "gradSwipe 4s ease infinite",
        }}>
          something great.
        </div>
        <Mag href="mailto:" style={{
          fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: ".82rem",
          letterSpacing: ".06em", textTransform: "uppercase",
          padding: "15px 42px", background: D.cyan, color: D.bg0,
          boxShadow: `0 0 52px ${D.cyan}33`, gap: 12,
        }}>
          Get in Touch <span style={{ fontSize: ".9rem" }}>↗</span>
        </Mag>
      </Rev>
    </section>
  );
}

/* ═══════════════════════════════════
   FOOTER
═══════════════════════════════════ */
function Footer() {
  return (
    <footer style={{ background: D.bg0, padding: "26px 64px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, borderTop: `1px solid ${D.border}` }}>
      <div style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: ".9rem", letterSpacing: ".04em", color: D.textSub }}>
        MD. Nurul <span style={{ color: D.cyan }}>Amin</span>
      </div>
      <div className="f-mono" style={{ fontSize: ".58rem", color: D.textMuted, letterSpacing: ".1em" }}>
        © 2025 · DHAKA, BANGLADESH
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════
   ROOT
═══════════════════════════════════ */
export default function App() {
  const [sec, setSec] = useState("hero");
  useEffect(() => {
    const ids = ["hero", "skills", "experience", "education", "interests", "contact"];
    const obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) setSec(e.target.id); }), { threshold: .3 });
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return (
    <div style={{ background: D.bg0, minHeight: "100vh" }}>
      <InjectGlobals />
      <Cursor />
      <Nav sec={sec} />
      <Hero />
      <Marquee />
      <Skills />
      <Experience />
      <Education />
      <Interests />
      <Contact />
      <Footer />
    </div>
  );
}
