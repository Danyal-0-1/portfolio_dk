"use client";

import Particles from "@tsparticles/react";
import type { Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useMemo, useState } from "react";

const prefersDarkSchemeQuery = "(prefers-color-scheme: dark)";
const prefersReducedMotionQuery = "(prefers-reduced-motion: reduce)";

export function ParticleBackground() {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [fallbackIsDark, setFallbackIsDark] = useState<boolean | null>(null);
  const [reduceMotion, setReduceMotion] = useState(true);

  useEffect(() => {
    setIsMounted(true);

    const updateThemeFromDom = () => {
      const root = document.documentElement;
      if (root.classList.contains("dark")) {
        setFallbackIsDark(true);
        return;
      }
      if (root.classList.contains("light")) {
        setFallbackIsDark(false);
        return;
      }
      setFallbackIsDark(window.matchMedia(prefersDarkSchemeQuery).matches);
    };

    const darkMedia = window.matchMedia(prefersDarkSchemeQuery);
    const motionMedia = window.matchMedia(prefersReducedMotionQuery);

    const handleThemeChange = () => updateThemeFromDom();
    const handleMotionChange = () => setReduceMotion(motionMedia.matches);

    updateThemeFromDom();
    setReduceMotion(motionMedia.matches);

    if (darkMedia.addEventListener) {
      darkMedia.addEventListener("change", handleThemeChange);
      motionMedia.addEventListener("change", handleMotionChange);
    } else {
      darkMedia.addListener(handleThemeChange);
      motionMedia.addListener(handleMotionChange);
    }

    const observer = new MutationObserver(updateThemeFromDom);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      observer.disconnect();
      if (darkMedia.removeEventListener) {
        darkMedia.removeEventListener("change", handleThemeChange);
        motionMedia.removeEventListener("change", handleMotionChange);
      } else {
        darkMedia.removeListener(handleThemeChange);
        motionMedia.removeListener(handleMotionChange);
      }
    };
  }, []);

  const isDark =
    resolvedTheme === "dark"
      ? true
      : resolvedTheme === "light"
      ? false
      : fallbackIsDark;

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const options = useMemo(() => {
    const color = isDark ? "#ffffff" : "#000000";

    return {
      fullScreen: { enable: false },
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        color: { value: color },
        number: {
          value: 60,
          density: { enable: true, area: 1200 },
        },
        opacity: { value: 0.22 },
        size: { value: { min: 1, max: 2 } },
        move: {
          enable: true,
          speed: 0.35,
          direction: "none",
          outModes: { default: "out" },
        },
        links: { enable: false },
      },
      interactivity: {
        events: {
          onHover: { enable: false },
          onClick: { enable: false },
          resize: true,
        },
      },
    };
  }, [isDark]);

  if (!isMounted || reduceMotion || isDark === null) {
    return null;
  }

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Particles className="h-full w-full" init={particlesInit} options={options} />
    </div>
  );
}
