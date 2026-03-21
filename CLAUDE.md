@AGENTS.md

# Nurul Amin Portfolio — Project State

## Stack
- **Framework**: Next.js 16.2.0 (Turbopack) — App Router
- **Language**: TypeScript + TSX
- **Styling**: Vanilla CSS (`globals.css`) + inline styles using design tokens
- **Fonts**: Inter, Playfair Display, JetBrains Mono, Roboto (Google Fonts via `next/font`), **Bloom Velvet** (custom OTF, `@font-face` in globals.css)
- **Icons**: Material Icons Outlined (Google Fonts CDN, loaded in `layout.tsx <head>`)
- **Dev server**: `npm.cmd run dev` → `http://localhost:3000` (use `npm.cmd` due to PowerShell execution policy)

## Design System — Liquid Glass (Apple visionOS-inspired)
- **Theme**: Deep space black base `#070712` with animated mesh gradient orbs
- **Glass utilities** (in `globals.css`):
  - `.liquid-card` — `backdrop-filter: blur(40px)` + inner rim highlight + outer glow
  - `.liquid-panel` — heavier blur (60px) for large section containers
  - `.glass-pill` — pill-shaped nav element
  - `.glass-chip` — small badge/tag pill
  - `.mesh-bg` / `.mesh-orb` — animated floating color orb system
- **Keyframes**: `shimmerSweep`, `prismPulse`, `fadeUp`, `liquidFloat`, `glowPulse`, `liveRipple`, `meshFloat`, `gradSwipe`, `charDrop`, `nameUp`, `chipIn`, `expIn`, `blink`, `pulse`, `ticker`, `scrollFloat`, `shimmerLine`
- **Accent palette** (`lib/tokens.ts` — shared `DesignTokens` interface):
  - `teal: #00E5FF` — primary
  - `lavender: #C084FC` — secondary
  - `rose: #F472B6` — tertiary
  - `emerald: #34D399` — quaternary
  - `amber: #FBBF24` — quinary

## B/W Theme System
- **Toggle**: Color/B/W pill switch in the **Navbar** (right side, desktop only)
- **Architecture**: React Context (`lib/ThemeContext.tsx`) → `useT()` for tokens, `useTheme()` for mode/toggle
- **Token sets**: `lib/tokens.ts` (color) & `lib/bw-tokens.ts` (grayscale) — both implement `DesignTokens` interface
- **Data**: `lib/data.ts` uses `colKey` strings (e.g. `"teal"`) resolved at render time via active theme
- **Persistence**: `localStorage` key `"theme-mode"`, `data-theme` attribute on `<html>`
- **CSS overrides**: `[data-theme="bw"]` rules in `globals.css` for glass surfaces, selection, mesh orbs
- **Section headings**: Gradient text in color mode → solid white in B/W mode (conditional inline styles)
- **WhatsApp CTA**: Green in color mode → white/gray with subtle glow in B/W mode

## File Structure

```
e:\nurul-amin-app\
├── app/
│   ├── globals.css       ← design system (glass, mesh, keyframes, @font-face, B/W overrides)
│   ├── layout.tsx        ← fonts, metadata, Material Icons CDN link
│   └── page.tsx          ← root page, ThemeProvider wrapper, intersection observer
├── components/
│   ├── Cursor.tsx        ← custom dot + lagging ring cursor (theme-aware)
│   ├── Nav.tsx           ← floating glass pill nav, Bloom Velvet logo, icon theme toggle (palette/contrast)
│   ├── Hero.tsx          ← mesh hero, looping scramble name, portrait image, stat cards, marquee, scroll indicator
│   ├── Marquee.tsx       ← frosted scrolling tag strip (embedded in Hero bottom)
│   ├── Skills.tsx        ← 4 liquid glass skill cards, Material Icons
│   ├── Experience.tsx    ← glass accordion timeline, left-aligned bullet points
│   ├── Education.tsx     ← glass BBA/MBA cards, gradient heading
│   ├── Interests.tsx     ← 8-item expertise grid, Material Icons
│   ├── Contact.tsx       ← centered glass CTA panel, animated "Send an Email" button
│   ├── Footer.tsx        ← single centered copyright line, dynamic year
│   ├── NeuralCanvas.tsx  ← no-op placeholder
│   ├── Rev.tsx           ← scroll reveal wrapper
│   └── Mag.tsx           ← magnetic hover link wrapper
├── lib/
│   ├── tokens.ts         ← color design tokens (D.*) + DesignTokens interface
│   ├── bw-tokens.ts      ← B/W grayscale tokens (BW.*)
│   ├── ThemeContext.tsx   ← ThemeProvider, useT(), useTheme() hooks
│   └── data.ts           ← SKILLS and EXP data arrays (colKey-based)
└── public/
    ├── profile.png       ← profile photo (Nav logo)
    ├── hero-portrait.png ← hero right-side portrait (bottom-blended)
    └── Bloom Velvet.otf  ← custom display font for Nav logo
```

## Nav Layout
The `<nav>` outer element is full-width with `padding: 14px 40px`. All children live inside an **inner wrapper div** with `maxWidth: 1100, margin: 0 auto`:
- **Logo** (profile.png circle + "Nurulamin" in Bloom Velvet font at 1.9rem) left-aligns
- **Pill nav** (Skills / Experience / Education / Contact) is centered
- **Right side**: Icon theme toggle (`palette`/`contrast` Material Icons, visible on all sizes) + mobile hamburger

## Hero Section (100vh)
- **Name animation**: Looping scramble reveal — cycles every ~8s (scramble-in → display 6.5s → fade-out → repeat)
- **"Amin"**: Gradient text in color mode, solid white in B/W mode
- **Portrait image**: `hero-portrait.png` on right side (clamp 380–560px), bottom-blended via CSS `mask-image`, desktop only
- **Stat cards**: Floating glass cards (10+, 40th, 4) layered above portrait (`zIndex: 2`)
- **CTAs**: "View Experience" + WhatsApp button (theme-aware green/white)
- **Marquee**: Pinned to bottom of viewport within Hero
- **Scroll indicator**: "SCROLL" text + chevron, positioned above marquee
- **Intersection observer**: `rootMargin: "-20% 0px -60% 0px"`, maps `interests` → `education` for nav highlighting

## Contact CTA
"Send an Email" button with:
- Mail envelope SVG icon + arrow indicator
- `shimmerSweep` animation across button surface
- `blink` animation on border for pulsing glow
- `mailto:nurul.amin.link@gmail.com`

## Content
**Person**: Md. Nurul Amin — A Creative Designer, Digital Ninja and an Educator

**Skills**: Design & Creative · Web & Technology · Digital Tools · Business & Publishing

**Career**:
1. Civil Service Officer — Lecturer, 40th BCS Cadre, Ministry of Education (2022–Present)
2. Assistant Manager — Teletalk Bangladesh (2021–2022)
3. Creative Designer & Copywriter — Horin Branding, Dhaka (2017–2018)
4. Freelancer — Fiverr (2014–2019)

**Education**: BBA + MBA, Accounting, University of Dhaka

## Key Conventions
- All colors via `useT()` hook → `D.*` tokens — never hardcode color values
- All icons use `material-icons-outlined` class with Google Material Icons names
- B/W mode: section heading gradients → solid white; WhatsApp → gray/white; logo glow → white; mobile drawer → pure black
- Animations via CSS keyframes in `globals.css`, applied inline with `animation:` prop
- Section IDs: `hero`, `skills`, `experience`, `education`, `interests`, `contact`
- `Rev` component wraps elements for scroll-based fade-up reveal animation
- Custom cursor: `cursor: none` on body; `cursor: "none"` on interactive elements
- Footer year: `new Date().getFullYear()` — never hardcode
- Dev server: use `npm.cmd run dev` (not `npm run dev`) due to PowerShell execution policy
- Section headers use `textAlign: "center"` with centered eyebrow rows and mirrored accent lines
- Experience bullet points use `textAlign: "left"` to override section center alignment
