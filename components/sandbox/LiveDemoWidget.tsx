"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";

const SAMPLE_LIGANDS = [
  { name: "Imatinib-analog A7", target: "ABL1 kinase domain", smilesShort: "Cc1ccc(cc1)..." },
  { name: "Compound BX-204", target: "EGFR (T790M)", smilesShort: "COc1cc2ncnc..." },
  { name: "Fragment MW-19", target: "BRAF (V600E)", smilesShort: "Clc1ccc(cc1)..." },
];

export default function LiveDemoWidget() {
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<number | null>(0.81);

  const runPrediction = () => {
    setLoading(true);
    setResult(null);
    // Deterministic pseudo-inference so the demo is stable and inspectable,
    // not a real model call from this static preview.
    const seed = (selected + 1) * 37;
    const pKd = 0.62 + ((seed % 29) / 100);
    setTimeout(() => {
      setResult(Math.min(0.97, pKd));
      setLoading(false);
    }, 900);
  };

  return (
    <div className="relative rounded-panel border border-slate-line bg-bg-panel p-5 shadow-panel">
      <div className="flex items-center justify-between border-b border-slate-line pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-signal" />
          <span className="font-mono text-[11px] tracking-wide text-ink-dim">
            LIVE DEMO — Drug–Target Affinity
          </span>
        </div>
        <span className="rounded-pill bg-signal-soft px-2 py-0.5 font-mono text-[10px] text-signal">
          GNN v2.3
        </span>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {SAMPLE_LIGANDS.map((l, i) => (
          <button
            key={l.name}
            onClick={() => {
              setSelected(i);
              setResult(null);
            }}
            className={`flex items-center justify-between rounded-panel border px-3 py-2.5 text-left transition-colors ${
              selected === i
                ? "border-signal/50 bg-signal-soft"
                : "border-slate-line hover:border-slate-line/80 hover:bg-white/[0.02]"
            }`}
          >
            <div>
              <p className="text-[13px] font-medium text-ink">{l.name}</p>
              <p className="font-mono text-[11px] text-ink-faint">{l.target}</p>
            </div>
            <span className="font-mono text-[10.5px] text-ink-faint">{l.smilesShort}</span>
          </button>
        ))}
      </div>

      <button
        onClick={runPrediction}
        disabled={loading}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-panel bg-signal py-2.5 text-[13px] font-semibold text-bg-deep transition-colors hover:bg-signal-bright disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Scoring binding pose…
          </>
        ) : (
          "Predict binding affinity"
        )}
      </button>

      <div className="mt-4 flex items-center justify-between rounded-panel bg-bg-deep/60 px-4 py-3">
        <span className="text-[11.5px] text-ink-faint">Predicted pKd</span>
        <span className="data-figure text-[20px] text-signal">
          {result === null ? "—" : result.toFixed(2)}
        </span>
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-ink-faint">
        Illustrative output on a static ligand library. Full sandbox supports custom SMILES and target FASTA upload.
      </p>
    </div>
  );
}
