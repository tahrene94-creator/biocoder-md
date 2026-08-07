import Link from "next/link";
import { Activity } from "lucide-react";

const COLUMNS = [
  {
    heading: "Platform",
    links: ["Model Catalog", "Clinical Apps", "Developer Sandbox", "API Reference"],
  },
  {
    heading: "Academy",
    links: ["Course Catalog", "Code Workspace", "Certificates", "For Institutions"],
  },
  {
    heading: "Insights",
    links: ["Latest Reviews", "Submit a Paper", "Evidence Tiers", "Editorial Standards"],
  },
  {
    heading: "Trust",
    links: ["HIPAA & Privacy SOPs", "Mock Data Standards", "Security", "Terms"],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-line bg-bg-deep">
      <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <Activity className="h-4 w-4 text-signal" strokeWidth={2.25} />
              <span className="font-display text-[15px] font-semibold text-ink">
                BioCoder<span className="text-signal">MD</span>
              </span>
            </div>
            <p className="mt-3 max-w-[26ch] text-[13px] leading-relaxed text-ink-faint">
              Machine learning meets precision healthcare — for builders, clinicians, students, and patients.
            </p>
            <div className="mt-5 flex items-center gap-2 text-[11.5px] text-ink-faint">
              <span className="h-1.5 w-1.5 rounded-full bg-signal animate-blink" />
              <span className="font-mono">All systems normal</span>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <p className="eyebrow mb-3">{col.heading}</p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-[13px] text-ink-dim transition-colors hover:text-ink"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="hairline my-10" />

        <div className="flex flex-col gap-3 text-[12px] text-ink-faint md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} BioCoder MD. All model outputs are for research and education —
            not a substitute for clinical judgment.
          </p>
          <p className="font-mono">Demo data is synthetic. No PHI is processed on this site.</p>
        </div>
      </div>
    </footer>
  );
}
