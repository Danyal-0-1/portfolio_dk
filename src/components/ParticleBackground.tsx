"use client";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container, ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useMemo, useState } from "react";

const prefersDarkSchemeQuery = "(prefers-color-scheme: dark)";
const prefersReducedMotionQuery = "(prefers-reduced-motion: reduce)";

export function ParticleBackground() {
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [ready, setReady] = useState(false);
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

  const mode = useMemo(() => {
    if (!pathname) return "dots";
    if (pathname.startsWith("/projects")) return "neural";
    if (pathname.startsWith("/publications")) return "orbit";
    if (pathname.startsWith("/teaching")) return "dots";
    if (pathname.startsWith("/about")) return "dots";
    return "dots";
  }, [pathname]);

  const isProjects = pathname?.startsWith("/projects") ?? false;

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  const particlesLoaded = useCallback(async (_container?: Container) => {}, []);

  const options: ISourceOptions = useMemo(() => {
    const color = isDark ? "#ffffff" : "#000000";

    const base = {
      fullScreen: { enable: false },
      fpsLimit: 60,
      detectRetina: true,
      interactivity: {
        events: {
          onHover: { enable: false },
          onClick: { enable: false },
          resize: { enable: true },
        },
      },
    };

    if (mode === "neural") {
      return {
        ...base,
        particles: {
          color: { value: color },
          number: {
            value: 90,
            density: { enable: true, area: 1300 },
          },
          opacity: { value: 0.4 },
          size: { value: { min: 1.4, max: 2.2 } },
          move: {
            enable: true,
            speed: 0.6,
            direction: "none",
            outModes: { default: "out" },
          },
          links: {
            enable: true,
            distance: 150,
            opacity: 0.2,
            width: 1,
            color,
          },
        },
        interactivity: {
          events: {
            onHover: isProjects ? { enable: true, mode: "repulse" } : { enable: false },
            onClick: { enable: false },
            resize: { enable: true },
          },
          modes: {
            repulse: {
              distance: 90,
              duration: 0.2,
            },
          },
        },
      };
    }

    if (mode === "orbit") {
      return {
        ...base,
        particles: {
          color: { value: color },
          number: {
            value: 55,
            density: { enable: true, area: 1400 },
          },
          opacity: { value: 0.5 },
          size: { value: { min: 2.2, max: 3.2 } },
          move: {
            enable: true,
            speed: 0.2,
            direction: "none",
            outModes: { default: "out" },
          },
          links: { enable: false },
        },
      };
    }

    return {
      ...base,
      particles: {
        color: { value: color },
        number: {
          value: 95,
          density: { enable: true, area: 1200 },
        },
        opacity: { value: 0.45 },
        size: { value: { min: 1.6, max: 2.6 } },
        move: {
          enable: true,
          speed: 0.35,
          direction: "none",
          outModes: { default: "out" },
        },
        links: { enable: false },
      },
    };
  }, [isDark, isProjects, mode]);

  if (!isMounted || reduceMotion || isDark === null || !ready) {
    return null;
  }

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Particles
        id="tsparticles-bg"
        className="h-full w-full"
        options={options}
        particlesLoaded={particlesLoaded}
        key={`${mode}-${isDark ? "dark" : "light"}`}
      />
    </div>
  );
}
