import Link from "next/link";
import {
  Dna,
  HeartPulse,
  GraduationCap,
  Newspaper,
  ArrowUpRight,
  FlaskConical,
} from "lucide-react";
import SignalDivider from "@/components/ui/SignalDivider";
import LiveDemoWidget from "@/components/sandbox/LiveDemoWidget";

const PILLARS = [
  {
    icon: Dna,
    title: "Precision Medicine & Biomedical ML",
    copy:
      "Run genomics, transcriptomics, molecular dynamics, and diagnostic imaging models. Get variant calls, survival curves, 3D structures, and segmentations back in your browser.",
    href: "/models",
    tag: "Sandbox",
  },
  {
    icon: HeartPulse,
    title: "Hospital & Clinical Applications",
    copy:
      "Deploy triage systems, FHIR/HL7 record viewers, and risk calculators against synthetic patient data, built to documented HIPAA-aligned SOPs.",
    href: "/apps",
    tag: "Apps",
  },
  {
    icon: GraduationCap,
    title: "BioCoder MD Academy",
    copy:
      "Self-paced modules and code labs in bio-AI, clinical software, and digital health engineering, with Colab launches and certificates.",
    href: "/academy",
    tag: "Academy",
  },
  {
    icon: Newspaper,
    title: "Article Review & Translation Hub",
    copy:
      "Every paper we cover renders two ways: a technical briefing for practitioners, and a plain-language summary for patients.",
    href: "/insights",
    tag: "Insights",
  },
];

export default function LandingPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 md:px-8">
      {/* ---------------------------------------------------------------- */}
      {/* Hero: the "diagnostic readout" -- headline reads like a monitor  */}
      {/* label, live trace runs behind it, demo panel sits like a second */}
      {/* screen on a bedside monitor.                                    */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative grid gap-10 pt-14 pb-4 lg:grid-cols-[1.1fr_0.9fr] lg:pt-20">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-pill border border-slate-line px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-signal animate-blink" />
            <span className="font-mono text-[12px] tracking-wide text-ink-dim">
              LIVE — 214 models · 38 clinical apps · 11,204 learners
            </span>
          </div>

          <h1 className="font-display text-[44px] font-semibold leading-[1.08] tracking-tight text-ink sm:text-[56px] lg:text-[62px]">
            Where machine learning
            <br />
            meets <span className="text-signal">precision healthcare.</span>
          </h1>

          <p className="mt-6 max-w-[52ch] text-[18px] leading-relaxed text-ink-dim">
            BioCoder MD is one hub for the whole path: run a biomedical model,
            ship it as a clinical tool, teach it in a course, and explain it to a
            patient in plain language — without changing platforms.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/models"
              className="inline-flex items-center gap-2 rounded-panel bg-signal px-5 py-3 text-[16.5px] font-semibold text-bg-deep transition-colors hover:bg-signal-bright"
            >
              <FlaskConical className="h-4 w-4" />
              Open the ML sandbox
            </Link>
            <Link
              href="/insights"
              className="inline-flex items-center gap-1.5 text-[16.5px] font-medium text-ink-dim hover:text-ink"
            >
              Read a dual-perspective review
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-slate-line pt-6">
            {[
              ["0.94", "median AUROC, oncology models"],
              ["48hr", "median course-to-certificate"],
              ["4", "evidence tiers tracked per paper"],
            ].map(([value, desc]) => (
              <div key={desc}>
                <dt className="data-figure text-[24px] text-ink">{value}</dt>
                <dd className="mt-1 text-[12.5px] leading-snug text-ink-faint">{desc}</dd>
              </div>
            ))}
          </dl>
        </div>

        <LiveDemoWidget />
      </section>

      <SignalDivider label="Four pillars, one throughline" />

      {/* ---------------------------------------------------------------- */}
      {/* Pillar grid                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="grid gap-5 pb-6 sm:grid-cols-2">
        {PILLARS.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <Link
              key={pillar.title}
              href={pillar.href}
              className="group relative overflow-hidden rounded-panel border border-slate-line bg-bg-panel p-7 shadow-panel transition-colors hover:border-signal/40"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-panel bg-signal-soft">
                  <Icon className="h-5 w-5 text-signal" strokeWidth={2} />
                </span>
                <span className="font-mono text-[11.5px] tracking-[0.14em] text-ink-faint">
                  {pillar.tag}
                </span>
              </div>
              <h3 className="mt-5 font-display text-[21px] font-semibold leading-snug text-ink">
                {pillar.title}
              </h3>
              <p className="mt-2.5 text-[15.5px] leading-relaxed text-ink-dim">
                {pillar.copy}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[14.5px] font-medium text-signal opacity-0 transition-opacity group-hover:opacity-100">
                Explore <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          );
        })}
      </section>

      <SignalDivider label="Built for the whole team" />

      {/* ---------------------------------------------------------------- */}
      {/* Audience strip                                                  */}
      {/* ---------------------------------------------------------------- */}
      <section className="grid gap-5 pb-20 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Researchers", "Upload FASTA, VCF, or DICOM. Compare architectures without standing up infra."],
          ["Clinicians", "Trial risk calculators and triage tools against synthetic patient panels."],
          ["Students", "Work through labs in a real code workspace, not slides about code."],
          ["Patients", "Read what a study actually means for care, in language built for you."],
        ].map(([who, copy]) => (
          <div key={who} className="rounded-panel border border-slate-line p-6">
            <p className="font-display text-[17px] font-semibold text-ink">{who}</p>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-faint">{copy}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
