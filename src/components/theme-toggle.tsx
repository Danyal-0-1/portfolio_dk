"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-full border border-neutral-200 dark:border-neutral-700 px-3 py-1 text-xs flex items-center gap-2 hover:border-accent/70 transition"
    >
      <span>{isDark ? "Light" : "Dark"} mode</span>
      <span className="text-lg">{isDark ? "☀️" : "🌙"}</span>
    </button>
  );
}