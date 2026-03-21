// ═══════════════════════════════════
// DESIGN TOKENS — Liquid Glass Palette
// Apple visionOS-inspired iridescent dark
// ═══════════════════════════════════

export interface DesignTokens {
  bg0: string;
  bg1: string;
  bg2: string;
  glass: string;
  glassMid: string;
  glassHigh: string;
  glassBorder: string;
  glassBorderHov: string;
  nav: string;
  navBorder: string;
  text: string;
  textBody: string;
  textSub: string;
  textMuted: string;
  teal: string;
  lavender: string;
  rose: string;
  emerald: string;
  amber: string;
  nameGrad: string;
  chip: string;
  chipBorder: string;
  gridDot: string;
}

export const D: DesignTokens = {
  // base backgrounds
  bg0: "#070712",
  bg1: "#08081A",
  bg2: "#0A0A1E",

  // glass surfaces
  glass:      "rgba(255,255,255,0.05)",
  glassMid:   "rgba(255,255,255,0.08)",
  glassHigh:  "rgba(255,255,255,0.12)",
  glassBorder: "rgba(255,255,255,0.10)",
  glassBorderHov: "rgba(255,255,255,0.20)",

  // nav
  nav: "rgba(7,7,18,0.80)",
  navBorder: "rgba(255,255,255,0.06)",

  // text
  text:     "#FFFFFF",
  textBody: "#E2E8F0",
  textSub:  "#94A3B8",
  textMuted:"#475569",

  // accents — iridescent set
  teal:     "#00E5FF",   // primary
  lavender: "#C084FC",   // secondary
  rose:     "#F472B6",   // tertiary
  emerald:  "#34D399",   // quaternary
  amber:    "#FBBF24",   // quinary

  // gradient text (hero name)
  nameGrad: "linear-gradient(135deg, #00E5FF 0%, #C084FC 40%, #F472B6 70%, #FBBF24 100%)",

  // chip
  chip:       "rgba(255,255,255,0.07)",
  chipBorder: "rgba(255,255,255,0.10)",

  // misc
  gridDot: "rgba(255,255,255,0.025)",
};
