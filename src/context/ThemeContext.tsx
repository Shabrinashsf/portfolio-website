"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  transitioning: boolean;
  transitionTarget: Theme | null;
  finishTransition: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [transitionTarget, setTransitionTarget] = useState<Theme | null>(null);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored) {
      setTheme(stored);
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(stored);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
    document.documentElement.style.backgroundColor =
      theme === "dark" ? "#131317" : "#FDF8F2";
  }, [theme, mounted]);

  const toggleTheme = useCallback(() => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTransitionTarget(nextTheme);
    setTransitioning(true);
  }, [theme]);

  const finishTransition = useCallback(() => {
    if (transitionTarget) {
      setTheme(transitionTarget);
    }
    setTransitioning(false);
    setTransitionTarget(null);
  }, [transitionTarget]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, transitioning, transitionTarget, finishTransition }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}