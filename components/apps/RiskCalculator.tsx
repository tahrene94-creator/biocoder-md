"use client";

import { useMemo, useState } from "react";
import { HeartPulse, AlertTriangle, ShieldCheck } from "lucide-react";

// ---------------------------------------------------------------------------
// qSOFA (quick Sequential Organ Failure Assessment) is a real, widely-used
// 3-criterion bedside score for spotting patients at risk of poor outcomes
// from suspected infection. The scoring logic below is the actual published
// criteria -- what's illustrative here is the UI wrapping it, not the
// medicine. This is an educational demo, not a diagnostic tool; see the
// disclaimer at the bottom.
// ---------------------------------------------------------------------------

export default function RiskCalculator() {
  const [respRate, setRespRate] = useState(18);
  const [systolicBP, setSystolicBP] = useState(118);
  const [alteredMentation, setAlteredMentation] = useState(false);

  const { score, criteria } = useMemo(() => {
    const c = [
      { label: "Respiratory rate ≥ 22/min", met: respRate >= 22 },
      { label: "Systolic BP ≤ 100 mmHg", met: systolicBP <= 100 },
      { label: "Altered mentation (GCS < 15)", met: alteredMentation },
    ];
    return { score: c.filter((x) => x.met).length, criteria: c };
  }, [respRate, systolicBP, alteredMentation]);

  const highRisk = score >= 2;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Input panel */}
      <div className="rounded-panel border border-slate-line bg-bg-panel p-6 shadow-panel">
        <p className="eyebrow flex items-center gap-2">
          <HeartPulse className="h-3.5 w-3.5" /> Patient Vitals · qSOFA
        </p>

        <div className="mt-5 flex flex-col gap-5">
          <label className="block">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[14px] font-medium text-ink">Respiratory rate</span>
              <span className="data-figure text-[14px] text-signal">{respRate} /min</span>
            </div>
            <input
              type="range"
              min={8}
              max={40}
              value={respRate}
              onChange={(e) => setRespRate(Number(e.target.value))}
              className="w-full accent-signal"
            />
          </label>

          <label className="block">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[14px] font-medium text-ink">Systolic blood pressure</span>
              <span className="data-figure text-[14px] text-signal">{systolicBP} mmHg</span>
            </div>
            <input
              type="range"
              min={60}
              max={180}
              value={systolicBP}
              onChange={(e) => setSystolicBP(Number(e.target.value))}
              className="w-full accent-signal"
            />
          </label>

          <label className="flex items-center justify-between rounded-panel border border-slate-line px-4 py-3">
            <span className="text-[14px] font-medium text-ink">Altered mentation present</span>
            <input
              type="checkbox"
              checked={alteredMentation}
              onChange={(e) => setAlteredMentation(e.target.checked)}
              className="h-4 w-4 accent-signal"
            />
          </label>
        </div>

        <p className="mt-5 text-[12.5px] leading-relaxed text-ink-faint">
          Synthetic values only — adjust the sliders to see how the score responds.
          Swap in a real vitals feed via the FHIR Observation resource in production.
        </p>
      </div>

      {/* Output panel */}
      <div className="rounded-panel border border-slate-line bg-bg-panel p-6 shadow-panel">
        <p className="eyebrow">Output · qSOFA Score</p>

        <div
          className={`mt-5 flex items-center justify-between rounded-panel p-5 ${
            highRisk ? "bg-alert-rose/10" : "bg-signal-soft"
          }`}
        >
          <div>
            <p className={`flex items-center gap-2 text-[15px] font-semibold ${highRisk ? "text-alert-rose" : "text-signal"}`}>
              {highRisk ? <AlertTriangle className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
              {highRisk ? "High risk by qSOFA" : "Low risk by qSOFA"}
            </p>
            <p className="mt-1 text-[13px] text-ink-dim">
              {highRisk
                ? "Score ≥ 2 — consider evaluation for sepsis per your institution's protocol."
                : "Score < 2 — continue routine monitoring."}
            </p>
          </div>
          <p className={`data-figure text-[32px] ${highRisk ? "text-alert-rose" : "text-signal"}`}>
            {score}/3
          </p>
        </div>

        <div className="mt-5 flex flex-col gap-2">
          {criteria.map((c) => (
            <div
              key={c.label}
              className="flex items-center justify-between rounded-panel border border-slate-line px-4 py-2.5"
            >
              <span className="text-[13.5px] text-ink-dim">{c.label}</span>
              <span
                className={`rounded-pill px-2.5 py-0.5 font-mono text-[11px] ${
                  c.met ? "bg-alert-rose/10 text-alert-rose" : "bg-bg-deep text-ink-faint"
                }`}
              >
                {c.met ? "MET" : "not met"}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-5 text-[12.5px] leading-relaxed text-ink-faint">
          Educational demo of a real published bedside score — not a diagnostic
          device. qSOFA is a screening aid, not a substitute for clinical judgment,
          and should never be used alone to rule sepsis in or out.
        </p>
      </div>
    </div>
  );
}
