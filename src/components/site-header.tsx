"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import { ThemeToggle } from "./theme-toggle";

const navItems = [
  { href: "/research", label: "Research Systems" },
  { href: "/installations", label: "Installations & Media" },
  { href: "/experiments", label: "Experiments" },
  { href: "/writing", label: "Writing & Talks" },
  { href: "/teaching", label: "Teaching" },
  { href: "/about", label: "About" },
  { href: "/cv", label: "CV & Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-800/60 dark:bg-slate-950/80">
      {/* Top row */}
      <div className="container-page flex items-center justify-between py-3 gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/"
            className="font-semibold tracking-tight text-sm sm:text-base whitespace-nowrap"
          >
            Danyal Khorami
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-3 text-xs">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "px-2 py-1 rounded-full border border-transparent",
                  "hover:border-accent/50 hover:text-accent transition",
                  isActive(item.href) &&
                    "border-accent/80 text-accent bg-accent/5"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Theme toggle always visible */}
          <ThemeToggle />

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-sky-200/70 bg-sky-50/70 text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200"
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="text-lg">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {/* Mobile nav panel */}
      {open && (
        <div className="md:hidden border-t border-sky-100/60 bg-sky-50/95 dark:border-slate-800/60 dark:bg-slate-950/95">
          <div className="container-page py-3 flex flex-col gap-1 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "py-1 flex items-center justify-between",
                  isActive(item.href)
                    ? "text-accent font-medium"
                    : "text-slate-700 dark:text-slate-200"
                )}
                onClick={() => setOpen(false)}
              >
                <span>{item.label}</span>
                {isActive(item.href) && (
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
