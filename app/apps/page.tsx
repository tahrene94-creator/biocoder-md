import { Stethoscope, FolderKanban, HeartPulse, ShieldCheck, Code2, FlaskConical } from "lucide-react";
import RiskCalculator from "@/components/apps/RiskCalculator";
import LimsSampleTracker from "@/components/apps/LimsSampleTracker";
import SignalDivider from "@/components/ui/SignalDivider";

const APPS = [
  {
    icon: Stethoscope,
    name: "Smart Triage System",
    description:
      "Routes incoming patients to the right level of care using presenting symptoms and vitals, with an audit trail on every recommendation.",
    status: "In development",
  },
  {
    icon: FolderKanban,
    name: "FHIR Patient Records Visualizer",
    description:
      "Renders a FHIR Bundle (Patient, Observation, Condition, MedicationRequest) as a readable timeline instead of raw JSON.",
    status: "In development",
  },
  {
    icon: HeartPulse,
    name: "Clinical Risk Calculator — qSOFA",
    description:
      "A bedside sepsis-risk screening score, live below. Built to the published 3-criterion qSOFA standard.",
    status: "Live demo",
  },
  {
    icon: FlaskConical,
    name: "Laboratory Information Management System",
    description:
      "Tracks specimens from accessioning through testing, QC review, and reporting. Live sample queue below.",
    status: "Live demo",
  },
];

export default function ClinicalAppsPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-5 py-12 md:px-8">
      <p className="eyebrow">Clinical Apps</p>
      <div className="title-rule" />
      <h1 className="font-display text-[36px] font-semibold tracking-tight text-ink sm:text-[42px]">
        Hospital software you can try before you integrate it.
      </h1>
      <p className="mt-4 max-w-[65ch] text-[18px] leading-relaxed text-ink-dim">
        A catalog of clinical tools — triage, records visualization, risk
        calculators — built against synthetic patient data so you can evaluate
        the workflow before connecting it to a real EHR/EMR.
      </p>

      {/* App catalog */}
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {APPS.map((app) => {
          const Icon = app.icon;
          return (
            <div
              key={app.name}
              className="flex flex-col justify-between rounded-panel border border-slate-line bg-bg-panel p-6 shadow-panel"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-panel bg-signal-soft">
                    <Icon className="h-5 w-5 text-signal" strokeWidth={2} />
                  </span>
                  <span
                    className={`rounded-pill px-2.5 py-0.5 font-mono text-[11px] ${
                      app.status === "Live demo"
                        ? "bg-signal-soft text-signal"
                        : "bg-bg-deep text-ink-faint"
                    }`}
                  >
                    {app.status}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-[19px] font-semibold leading-snug text-ink">
                  {app.name}
                </h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-dim">
                  {app.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <SignalDivider label="Live Demos" />

      <div>
        <div className="mb-5 flex items-baseline justify-between">
          <h2 className="font-display text-[22px] font-semibold text-ink">
            qSOFA Bedside Risk Calculator
          </h2>
          <span className="font-mono text-[12px] text-ink-faint">clinical apps · sepsis screening</span>
        </div>
        <RiskCalculator />
      </div>

      <div className="mt-14">
        <div className="mb-5 flex items-baseline justify-between">
          <h2 className="font-display text-[22px] font-semibold text-ink">
            Laboratory Information Management System
          </h2>
          <span className="font-mono text-[12px] text-ink-faint">clinical apps · sample tracking</span>
        </div>
        <LimsSampleTracker />
      </div>

      <SignalDivider label="Developer Sandbox" />

      {/* Developer sandbox / integration docs */}
      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="flex items-center gap-2 text-[16.5px] font-semibold text-ink">
            <Code2 className="h-4.5 w-4.5 text-signal" />
            Integrating with your EHR/EMR
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-dim">
            Every app on this page reads and writes standard FHIR resources, so
            connecting one to a real hospital system is a matter of pointing it
            at your FHIR server — not rewriting it. Authentication goes through
            SMART on FHIR (OAuth 2.0 + PKCE) with scopes limited to exactly the
            resource types each app needs.
          </p>
          <ul className="mt-4 flex flex-col gap-2 text-[14px] text-ink-dim">
            <li>• Never request blanket <code className="font-mono text-[13px] text-signal">patient/*.read</code> — scope to what the app actually uses.</li>
            <li>• All demo data on this page is synthetic; swap in a sandboxed FHIR server (e.g. an open test server) before touching production data.</li>
            <li>• Every read/write of real patient data must hit the audit log — see the compliance note below.</li>
          </ul>
        </div>

        <div className="overflow-x-auto rounded-panel border border-slate-line bg-bg-panel shadow-panel">
          <div className="flex items-center justify-between border-b border-slate-line px-5 py-3">
            <span className="font-mono text-[12px] text-ink-faint">example: fetch-observations.ts</span>
            <span className="rounded-pill bg-signal-soft px-2 py-0.5 font-mono text-[10.5px] text-signal">
              illustrative
            </span>
          </div>
          <pre className="p-5 text-[13px] leading-relaxed text-ink-dim">
<code>{`async function fetchVitals(patientId: string) {
  const res = await fetch(
    \`\${process.env.FHIR_BASE_URL}/Observation\` +
    \`?patient=\${patientId}&category=vital-signs\`,
    {
      headers: {
        Authorization: \`Bearer \${await getSmartAccessToken()}\`,
      },
    }
  );

  if (!res.ok) throw new Error("FHIR request failed");
  return res.json(); // FHIR Bundle of Observation resources
}`}</code>
          </pre>
        </div>
      </div>

      {/* Compliance callout */}
      <div className="mt-14 flex flex-col gap-4 rounded-panel border border-signal/25 bg-signal-soft p-7 sm:flex-row sm:items-start">
        <ShieldCheck className="h-6 w-6 shrink-0 text-signal" />
        <div>
          <p className="text-[16px] font-semibold text-ink">
            Privacy-preserving mock data is the standard here, not the exception.
          </p>
          <p className="mt-2 max-w-[75ch] text-[14.5px] leading-relaxed text-ink-dim">
            Every app and demo on this page runs on synthetic patient data —
            no real PHI is processed by this site. Before any clinical app
            touches real patient records, it needs a signed Business
            Associate Agreement with the hosting provider, encryption at
            rest and in transit, tamper-evident audit logging, and
            role-based access scoped to the minimum necessary — full detail
            in the project README's Security section.
          </p>
        </div>
      </div>
    </div>
  );
}
