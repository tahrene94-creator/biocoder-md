"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Dna,
  HeartPulse,
  GraduationCap,
  Newspaper,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const SECTIONS = [
  {
    label: "ML Sandbox",
    href: "/models",
    icon: Dna,
    children: ["Genomics", "Precision Oncology", "Medical Imaging", "Pathology"],
  },
  {
    label: "Clinical Apps",
    href: "/apps",
    icon: HeartPulse,
    children: ["Smart Triage", "FHIR Records Viewer", "Risk Calculators"],
  },
  {
    label: "Academy",
    href: "/academy",
    icon: GraduationCap,
    children: ["Python for MedTech", "Building FHIR Apps", "Genomic AI"],
  },
  {
    label: "Insights",
    href: "/insights",
    icon: Newspaper,
    children: ["Genomics", "Oncology", "EHR", "Drug Discovery"],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  // Sidebar is a wayfinding aid for the app-like sections; keep it off the
  // marketing landing page so the hero can breathe full-width.
  if (pathname === "/") return null;

  return (
    <aside
      className={`sticky top-16 hidden h-[calc(100vh-4rem)] shrink-0 border-r border-slate-line bg-bg-deep/60 py-6 transition-[width] duration-200 lg:block ${
        collapsed ? "w-[64px]" : "w-[248px]"
      }`}
    >
      <div className="flex items-center justify-between px-4 pb-4">
        {!collapsed && (
          <span className="eyebrow">Navigate</span>
        )}
        <button
          onClick={() => setCollapsed((v) => !v)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="ml-auto flex h-7 w-7 items-center justify-center rounded-panel text-ink-faint hover:text-signal"
        >
          {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
        </button>
      </div>

      <nav className="flex flex-col gap-1 px-2">
        {SECTIONS.map((section) => {
          const active = pathname.startsWith(section.href);
          const Icon = section.icon;
          return (
            <div key={section.href}>
              <Link
                href={section.href}
                className={`flex items-center gap-3 rounded-panel px-3 py-2.5 text-[15.5px] font-medium transition-colors ${
                  active
                    ? "bg-signal-soft text-signal"
                    : "text-ink-dim hover:bg-bg-panel hover:text-ink"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" strokeWidth={2} />
                {!collapsed && <span>{section.label}</span>}
              </Link>
              {!collapsed && active && (
                <div className="ml-[26px] mt-1 flex flex-col gap-0.5 border-l border-slate-line pl-4">
                  {section.children.map((child) => (
                    <span
                      key={child}
                      className="cursor-pointer py-1 text-[14.5px] text-ink-faint hover:text-ink-dim"
                    >
                      {child}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
