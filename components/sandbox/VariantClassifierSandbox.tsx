"use client";

import { useState } from "react";
import { UploadCloud, Loader2, FileText, CircleAlert, CircleCheck, ShieldAlert } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import { variantInputSchema, validateUploadedFile } from "@/lib/validation";

type Verdict = "Pathogenic" | "Likely Pathogenic" | "VUS" | "Likely Benign" | "Benign";

interface ClassificationResult {
  gene: string;
  variant: string;
  verdict: Verdict;
  confidence: number;
  scores: { model: string; score: number }[];
}

const SAMPLE_VCF = `#CHROM  POS       ID   REF  ALT  GENE    HGVSp
17      43094692  .    G    A    BRCA1   p.Arg1699Trp
7       117559593 .    C    T    CFTR    p.Arg347His
3       41224610  .    A    G    CTNNB1  p.Ser33Cys`;

const VERDICT_STYLE: Record<Verdict, string> = {
  Pathogenic: "text-alert-rose",
  "Likely Pathogenic": "text-alert-amber",
  VUS: "text-ink-dim",
  "Likely Benign": "text-signal",
  Benign: "text-signal",
};

function classify(text: string): ClassificationResult {
  // Deterministic stand-in for a real inference call so the sandbox is fully
  // demonstrable client-side; wire to POST /api/models/variant-classify for
  // the production PyTorch/BioPython pipeline.
  const geneMatch = text.match(/BRCA1|CFTR|CTNNB1|TP53|EGFR/i);
  const gene = geneMatch ? geneMatch[0].toUpperCase() : "BRCA1";
  const hash = Array.from(text).reduce((a, c) => a + c.charCodeAt(0), 0);
  const verdicts: Verdict[] = ["Pathogenic", "Likely Pathogenic", "VUS", "Likely Benign", "Benign"];
  const verdict = verdicts[hash % verdicts.length];
  const confidence = 0.58 + ((hash % 40) / 100);

  return {
    gene,
    variant: "p.Arg1699Trp",
    verdict,
    confidence,
    scores: [
      { model: "REVEL", score: 0.4 + ((hash % 50) / 100) },
      { model: "AlphaMissense", score: 0.3 + ((hash % 60) / 100) },
      { model: "ESM-variant", score: 0.5 + ((hash % 45) / 100) },
      { model: "Ensemble (this model)", score: confidence },
    ],
  };
}

export default function VariantClassifierSandbox() {
  const [input, setInput] = useState(SAMPLE_VCF);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runClassifier = () => {
    // Client-side check is a UX convenience only -- the same schema must be
    // re-applied server-side once this posts to a real inference endpoint,
    // since anything the browser sends is untrusted by the time it arrives.
    const parsed = variantInputSchema.safeParse(input);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid input.");
      setResult(null);
      return;
    }
    setError(null);
    setLoading(true);
    setTimeout(() => {
      setResult(classify(parsed.data));
      setLoading(false);
    }, 1100);
  };

  const handleFile = (file: File) => {
    const check = validateUploadedFile(file);
    if (!check.ok) {
      setError(check.reason);
      return;
    }
    setError(null);
    file.text().then(setInput);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Input panel */}
      <div className="rounded-panel border border-slate-line bg-bg-panel p-6 shadow-panel">
        <div className="flex items-center justify-between">
          <p className="eyebrow">Input · VCF / HGVS</p>
          <label className="flex cursor-pointer items-center gap-1.5 text-[12px] text-ink-dim hover:text-signal">
            <UploadCloud className="h-3.5 w-3.5" />
            Upload .vcf
            <input
              type="file"
              accept=".vcf,.txt"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                handleFile(file);
              }}
            />
          </label>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          rows={9}
          className="mt-4 w-full resize-none rounded-panel border border-slate-line bg-bg-deep/60 p-4 font-mono text-[12.5px] leading-relaxed text-ink-dim outline-none focus:border-signal/50"
        />

        {error && (
          <p className="mt-3 flex items-center gap-1.5 text-[12px] text-alert-rose">
            <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
            {error}
          </p>
        )}

        <div className="mt-4 flex items-center justify-between">
          <p className="flex items-center gap-1.5 text-[11.5px] text-ink-faint">
            <FileText className="h-3.5 w-3.5" />
            Synthetic sample loaded — swap in your own variant call set
          </p>
          <button
            onClick={runClassifier}
            disabled={loading}
            className="flex items-center gap-2 rounded-panel bg-signal px-4 py-2.5 text-[13px] font-semibold text-bg-deep transition-colors hover:bg-signal-bright disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Classifying…
              </>
            ) : (
              "Run classifier"
            )}
          </button>
        </div>
      </div>

      {/* Output panel */}
      <div className="rounded-panel border border-slate-line bg-bg-panel p-6 shadow-panel">
        <p className="eyebrow">Output · Pathogenicity Call</p>

        {!result && !loading && (
          <div className="mt-16 flex flex-col items-center justify-center text-center text-ink-faint">
            <CircleAlert className="mb-3 h-6 w-6" />
            <p className="text-[13px]">Run the classifier to see a verdict and per-model scores.</p>
          </div>
        )}

        {loading && (
          <div className="mt-16 flex flex-col items-center justify-center text-center text-ink-faint">
            <Loader2 className="mb-3 h-6 w-6 animate-spin text-signal" />
            <p className="text-[13px]">Scoring against ensemble variant-effect models…</p>
          </div>
        )}

        {result && !loading && (
          <div className="mt-4">
            <div className="flex items-center justify-between rounded-panel bg-bg-deep/60 p-4">
              <div>
                <p className="font-display text-[17px] font-semibold text-ink">
                  {result.gene} <span className="font-mono text-[13px] font-normal text-ink-faint">{result.variant}</span>
                </p>
                <p className={`mt-1 flex items-center gap-1.5 text-[13px] font-medium ${VERDICT_STYLE[result.verdict]}`}>
                  <CircleCheck className="h-3.5 w-3.5" />
                  {result.verdict}
                </p>
              </div>
              <div className="text-right">
                <p className="data-figure text-[24px] text-signal">
                  {(result.confidence * 100).toFixed(1)}%
                </p>
                <p className="text-[10.5px] text-ink-faint">ensemble confidence</p>
              </div>
            </div>

            <p className="mt-5 mb-2 text-[11.5px] font-medium text-ink-dim">Per-model pathogenicity score</p>
            <div className="h-[180px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={result.scores} layout="vertical" margin={{ left: 0, right: 16 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#243247" horizontal={false} />
                  <XAxis type="number" domain={[0, 1]} tick={{ fill: "#5B6981", fontSize: 11 }} stroke="#243247" />
                  <YAxis
                    type="category"
                    dataKey="model"
                    width={140}
                    tick={{ fill: "#93A1B7", fontSize: 11.5 }}
                    stroke="#243247"
                  />
                  <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                    {result.scores.map((entry, i) => (
                      <Cell
                        key={entry.model}
                        fill={i === result.scores.length - 1 ? "#12B886" : "#3A4A63"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <p className="mt-4 text-[11px] leading-relaxed text-ink-faint">
              Educational sandbox output on synthetic input — not a clinical diagnostic. Route confirmed calls through your lab's validated pipeline.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
