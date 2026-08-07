"use client";

import Link from "next/link";
import { useState } from "react";
import { Activity, Moon, Sun, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/models", label: "Models" },
  { href: "/apps", label: "Clinical Apps" },
  { href: "/academy", label: "Academy" },
  { href: "/insights", label: "Insights" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(false);

  const toggleTheme = () => {
    setLight((v) => !v);
    document.body.classList.toggle("light-mode");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-line/60 bg-bg-deep/85 backdrop-blur supports-[backdrop-filter]:bg-bg-deep/70">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:px-8">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-panel bg-signal-soft">
            <Activity className="h-4 w-4 text-signal" strokeWidth={2.25} />
            <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-signal animate-blink" />
          </span>
          <span className="font-display text-[17px] font-semibold tracking-tight text-ink">
            BioCoder<span className="text-signal">MD</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-[13.5px] font-medium text-ink-dim transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={toggleTheme}
            aria-label="Toggle color mode"
            className="flex h-9 w-9 items-center justify-center rounded-panel border border-slate-line text-ink-dim transition-colors hover:text-signal"
          >
            {light ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
          <Link
            href="/academy"
            className="rounded-panel border border-slate-line px-4 py-2 text-[13px] font-medium text-ink-dim transition-colors hover:text-ink"
          >
            Sign in
          </Link>
          <Link
            href="/models"
            className="rounded-panel bg-signal px-4 py-2 text-[13px] font-semibold text-bg-deep transition-colors hover:bg-signal-bright"
          >
            Launch Sandbox
          </Link>
        </div>

        <button
          className="flex h-9 w-9 items-center justify-center text-ink md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-line px-5 pb-5 pt-2 md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-panel px-2 py-2.5 text-sm font-medium text-ink-dim hover:bg-bg-panel hover:text-ink"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
