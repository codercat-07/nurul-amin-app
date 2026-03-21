// B/W DESIGN TOKENS — Nike-inspired grayscale
// High contrast, editorial, no color
// ═══════════════════════════════════

import { DesignTokens } from "./tokens";

export const BW: DesignTokens = {
  // base backgrounds — pure black
  bg0: "#000000",
  bg1: "#0A0A0A",
  bg2: "#111111",

  // glass surfaces — same concept, no color tint
  glass:      "rgba(255,255,255,0.04)",
  glassMid:   "rgba(255,255,255,0.07)",
  glassHigh:  "rgba(255,255,255,0.10)",
  glassBorder: "rgba(255,255,255,0.08)",
  glassBorderHov: "rgba(255,255,255,0.18)",

  // nav
  nav: "rgba(0,0,0,0.85)",
  navBorder: "rgba(255,255,255,0.06)",

  // text — high contrast
  text:     "#FFFFFF",
  textBody: "#E0E0E0",
  textSub:  "#888888",
  textMuted:"#555555",

  // accents — all grayscale, no color
  teal:     "#FFFFFF",    // primary → pure white
  lavender: "#CCCCCC",    // secondary → light gray
  rose:     "#999999",    // tertiary → mid gray
  emerald:  "#BBBBBB",    // quaternary → soft gray
  amber:    "#DDDDDD",    // quinary → near white

  // gradient text (hero name)
  nameGrad: "linear-gradient(135deg, #FFFFFF 0%, #888888 40%, #CCCCCC 70%, #FFFFFF 100%)",

  // chip
  chip:       "rgba(255,255,255,0.05)",
  chipBorder: "rgba(255,255,255,0.08)",

  // misc
  gridDot: "rgba(255,255,255,0.02)",
};
