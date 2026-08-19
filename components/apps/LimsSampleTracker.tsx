"use client";

import { useState } from "react";
import { FlaskConical, Plus, ArrowRight, CircleCheck } from "lucide-react";

type Status = "Received" | "In Testing" | "QC Review" | "Reported";

const STAGES: Status[] = ["Received", "In Testing", "QC Review", "Reported"];

const STAGE_STYLE: Record<Status, string> = {
  Received: "bg-bg-deep text-ink-faint",
  "In Testing": "bg-signal-soft text-signal",
  "QC Review": "bg-alert-amber/10 text-alert-amber",
  Reported: "bg-signal-soft text-signal",
};

interface Sample {
  id: string;
  testType: string;
  priority: "Routine" | "Urgent" | "STAT";
  status: Status;
  receivedAt: string;
}

const TEST_TYPES = ["CBC", "Basic Metabolic Panel", "Lipid Panel", "PCR — Respiratory Panel", "Histopathology"];
const PRIORITIES: Sample["priority"][] = ["Routine", "Urgent", "STAT"];

const INITIAL_SAMPLES: Sample[] = [
  { id: "LAB-20260807-001", testType: "CBC", priority: "Routine", status: "Reported", receivedAt: "08:12" },
  { id: "LAB-20260807-002", testType: "PCR — Respiratory Panel", priority: "Urgent", status: "QC Review", receivedAt: "09:04" },
  { id: "LAB-20260807-003", testType: "Basic Metabolic Panel", priority: "Routine", status: "In Testing", receivedAt: "09:41" },
  { id: "LAB-20260807-004", testType: "Histopathology", priority: "STAT", status: "Received", receivedAt: "10:18" },
];

function nextStatus(status: Status): Status {
  const i = STAGES.indexOf(status);
  return STAGES[Math.min(i + 1, STAGES.length - 1)];
}

export default function LimsSampleTracker() {
  const [samples, setSamples] = useState<Sample[]>(INITIAL_SAMPLES);
  const [filter, setFilter] = useState<Status | "All">("All");

  const advance = (id: string) => {
    setSamples((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: nextStatus(s.status) } : s))
    );
  };

  const addSample = () => {
    const n = samples.length + 1;
    const testType = TEST_TYPES[n % TEST_TYPES.length];
    const priority = PRIORITIES[n % PRIORITIES.length];
    const now = new Date();
    setSamples((prev) => [
      {
        id: `LAB-20260807-${String(n).padStart(3, "0")}`,
        testType,
        priority,
        status: "Received",
        receivedAt: `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`,
      },
      ...prev,
    ]);
  };

  const counts = STAGES.reduce<Record<Status, number>>((acc, s) => {
    acc[s] = samples.filter((x) => x.status === s).length;
    return acc;
  }, {} as Record<Status, number>);

  const visible = filter === "All" ? samples : samples.filter((s) => s.status === filter);

  return (
    <div className="rounded-panel border border-slate-line bg-bg-panel p-6 shadow-panel">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="eyebrow flex items-center gap-2">
          <FlaskConical className="h-3.5 w-3.5" /> Sample Queue
        </p>
        <button
          onClick={addSample}
          className="flex items-center gap-1.5 rounded-panel bg-signal px-3.5 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-signal-bright"
        >
          <Plus className="h-3.5 w-3.5" /> Log new sample
        </button>
      </div>

      {/* Stage summary strip -- doubles as the filter control */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {(["All", ...STAGES] as const).map((stage) => (
          <button
            key={stage}
            onClick={() => setFilter(stage)}
            className={`rounded-panel border px-4 py-3 text-left transition-colors ${
              filter === stage ? "border-signal/50 bg-signal-soft" : "border-slate-line hover:border-slate-line/80"
            }`}
          >
            <p className="text-[12px] text-ink-faint">{stage}</p>
            <p className="data-figure mt-1 text-[20px] text-ink">
              {stage === "All" ? samples.length : counts[stage as Status]}
            </p>
          </button>
        ))}
      </div>

      {/* Sample table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-[13.5px]">
          <thead>
            <tr className="border-b border-slate-line text-[11.5px] uppercase tracking-wide text-ink-faint">
              <th className="pb-3 pr-4 font-medium">Sample ID</th>
              <th className="pb-3 pr-4 font-medium">Test</th>
              <th className="pb-3 pr-4 font-medium">Priority</th>
              <th className="pb-3 pr-4 font-medium">Received</th>
              <th className="pb-3 pr-4 font-medium">Status</th>
              <th className="pb-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {visible.map((s) => (
              <tr key={s.id} className="border-b border-slate-line/60 last:border-0">
                <td className="py-3 pr-4 font-mono text-[12.5px] text-ink">{s.id}</td>
                <td className="py-3 pr-4 text-ink-dim">{s.testType}</td>
                <td className="py-3 pr-4">
                  <span
                    className={`rounded-pill px-2 py-0.5 font-mono text-[10.5px] ${
                      s.priority === "STAT"
                        ? "bg-alert-rose/10 text-alert-rose"
                        : s.priority === "Urgent"
                        ? "bg-alert-amber/10 text-alert-amber"
                        : "bg-bg-deep text-ink-faint"
                    }`}
                  >
                    {s.priority}
                  </span>
                </td>
                <td className="py-3 pr-4 font-mono text-[12px] text-ink-faint">{s.receivedAt}</td>
                <td className="py-3 pr-4">
                  <span className={`rounded-pill px-2.5 py-0.5 font-mono text-[10.5px] ${STAGE_STYLE[s.status]}`}>
                    {s.status}
                  </span>
                </td>
                <td className="py-3 text-right">
                  {s.status === "Reported" ? (
                    <span className="flex items-center justify-end gap-1 text-[12px] text-signal">
                      <CircleCheck className="h-3.5 w-3.5" /> Complete
                    </span>
                  ) : (
                    <button
                      onClick={() => advance(s.id)}
                      className="flex items-center gap-1 text-[12px] font-medium text-signal hover:text-signal-bright"
                    >
                      Advance <ArrowRight className="h-3 w-3" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-ink-faint">
                  No samples in this stage.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-5 text-[12.5px] leading-relaxed text-ink-faint">
        Synthetic sample IDs and test types — a production LIMS ties each
        record to a Specimen/ServiceRequest FHIR resource, enforces chain-of-
        custody logging on every status change, and restricts "Advance" to
        the role authorized for that stage (accessioning, bench tech, QC
        reviewer, pathologist).
      </p>
    </div>
  );
}
