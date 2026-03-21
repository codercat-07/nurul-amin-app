"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { D } from "./tokens";
import { BW } from "./bw-tokens";

type ThemeMode = "color" | "bw";

interface ThemeCtx {
  mode: ThemeMode;
  toggle: () => void;
  tokens: typeof D;
}

const ThemeContext = createContext<ThemeCtx>({
  mode: "color",
  toggle: () => {},
  tokens: D,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("color");

  // Hydrate from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("theme-mode") as ThemeMode | null;
    if (stored === "bw") {
      setMode("bw");
      document.documentElement.setAttribute("data-theme", "bw");
    }
  }, []);

  const toggle = useCallback(() => {
    setMode((prev) => {
      const next = prev === "color" ? "bw" : "color";
      localStorage.setItem("theme-mode", next);
      if (next === "bw") {
        document.documentElement.setAttribute("data-theme", "bw");
      } else {
        document.documentElement.removeAttribute("data-theme");
      }
      return next;
    });
  }, []);

  const tokens = mode === "bw" ? BW : D;

  return (
    <ThemeContext.Provider value={{ mode, toggle, tokens }}>
      {children}
    </ThemeContext.Provider>
  );
}

/** Returns current theme tokens (color or B/W) */
export function useT() {
  return useContext(ThemeContext).tokens;
}

/** Returns full theme context: mode, toggle, tokens */
export function useTheme() {
  return useContext(ThemeContext);
}
