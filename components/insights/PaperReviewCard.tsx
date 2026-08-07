"use client";

import { useState } from "react";
import { FlaskConical, HeartHandshake, ExternalLink } from "lucide-react";

export interface PaperReview {
  title: string;
  journal: string;
  doi: string;
  domain: string;
  evidenceTier: "In Silico" | "Retrospective" | "Prospective / RCT";
  clinical: {
    architecture: string;
    dataset: string;
    validation: string;
    metrics: { label: string; value: string }[];
    discussion: string;
  };
  plain: {
    bigPicture: string;
    analogy: string;
    implication: string;
  };
}

const TIER_STYLE: Record<PaperReview["evidenceTier"], string> = {
  "In Silico": "text-ink-dim",
  Retrospective: "text-alert-amber",
  "Prospective / RCT": "text-signal",
};

export default function PaperReviewCard({ paper }: { paper: PaperReview }) {
  const [mode, setMode] = useState<"clinical" | "plain">("clinical");

  return (
    <article className="rounded-panel border border-slate-line bg-bg-panel shadow-panel">
      <div className="flex flex-col gap-3 border-b border-slate-line p-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-pill bg-signal-soft px-2.5 py-0.5 font-mono text-[11px] text-signal">
              {paper.domain}
            </span>
            <span className={`font-mono text-[11px] ${TIER_STYLE[paper.evidenceTier]}`}>
              {paper.evidenceTier}
            </span>
          </div>
          <h3 className="mt-2.5 font-display text-[20px] font-semibold leading-snug text-ink">
            {paper.title}
          </h3>
          <p className="mt-1 text-[14px] text-ink-faint">
            {paper.journal} · <span className="font-mono">{paper.doi}</span>
          </p>
        </div>
        <a
          href={`https://doi.org/${paper.doi}`}
          className="flex shrink-0 items-center gap-1.5 text-[14px] font-medium text-ink-dim hover:text-signal"
        >
          View source <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      {/* Reading mode toggle */}
      <div className="flex items-center gap-1.5 px-6 pt-5">
        <div className="inline-flex rounded-panel border border-slate-line p-1">
          <button
            onClick={() => setMode("clinical")}
            className={`flex items-center gap-1.5 rounded-panel px-3 py-1.5 text-[14px] font-medium transition-colors ${
              mode === "clinical" ? "bg-signal text-bg-deep" : "text-ink-dim hover:text-ink"
            }`}
          >
            <FlaskConical className="h-3.5 w-3.5" />
            Clinical &amp; Technical
          </button>
          <button
            onClick={() => setMode("plain")}
            className={`flex items-center gap-1.5 rounded-panel px-3 py-1.5 text-[14px] font-medium transition-colors ${
              mode === "plain" ? "bg-signal text-bg-deep" : "text-ink-dim hover:text-ink"
            }`}
          >
            <HeartHandshake className="h-3.5 w-3.5" />
            General Public
          </button>
        </div>
        <span className="ml-auto hidden font-mono text-[11.5px] text-ink-faint sm:inline">
          {mode === "clinical" ? "for doctors · researchers · engineers" : "for patients · general public"}
        </span>
      </div>

      <div className="p-6">
        {mode === "clinical" ? (
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <p className="text-[12.5px] font-medium text-ink-dim">Architecture</p>
              <p className="mt-1 text-[15px] leading-relaxed text-ink">{paper.clinical.architecture}</p>
            </div>
            <div>
              <p className="text-[12.5px] font-medium text-ink-dim">Dataset</p>
              <p className="mt-1 text-[15px] leading-relaxed text-ink">{paper.clinical.dataset}</p>
            </div>
            <div>
              <p className="text-[12.5px] font-medium text-ink-dim">Validation</p>
              <p className="mt-1 text-[15px] leading-relaxed text-ink">{paper.clinical.validation}</p>
            </div>
            <div>
              <p className="text-[12.5px] font-medium text-ink-dim">Performance</p>
              <div className="mt-1.5 flex flex-wrap gap-2">
                {paper.clinical.metrics.map((m) => (
                  <span
                    key={m.label}
                    className="rounded-panel bg-bg-deep/60 px-2.5 py-1 font-mono text-[12px] text-signal"
                  >
                    {m.label} {m.value}
                  </span>
                ))}
              </div>
            </div>
            <div className="sm:col-span-2">
              <p className="text-[12.5px] font-medium text-ink-dim">
                Bias, drift &amp; regulatory notes
              </p>
              <p className="mt-1 text-[15px] leading-relaxed text-ink-dim">{paper.clinical.discussion}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-panel bg-signal-soft p-4">
              <p className="text-[12.5px] font-medium text-signal">The big picture</p>
              <p className="mt-1 text-[16.5px] leading-relaxed text-ink">{paper.plain.bigPicture}</p>
            </div>
            <div>
              <p className="text-[12.5px] font-medium text-ink-dim">In everyday terms</p>
              <p className="mt-1 text-[15.5px] leading-relaxed text-ink-dim">{paper.plain.analogy}</p>
            </div>
            <div>
              <p className="text-[12.5px] font-medium text-ink-dim">What this could mean for care</p>
              <p className="mt-1 text-[15.5px] leading-relaxed text-ink-dim">{paper.plain.implication}</p>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
