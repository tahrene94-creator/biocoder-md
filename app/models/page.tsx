import { Dna, Microscope, ScanLine, FlaskConical } from "lucide-react";
import VariantClassifierSandbox from "@/components/sandbox/VariantClassifierSandbox";

const DOMAINS = [
  { icon: Dna, label: "Genomics", count: 62 },
  { icon: FlaskConical, label: "Precision Oncology", count: 41 },
  { icon: ScanLine, label: "Medical Imaging (DICOM)", count: 58 },
  { icon: Microscope, label: "Pathology", count: 53 },
];

export default function ModelsPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-5 py-12 md:px-8">
      <p className="eyebrow">ML Sandbox</p>
      <div className="title-rule" />
      <h1 className="mt-3 font-display text-[36px] font-semibold tracking-tight text-ink sm:text-[42px]">
        Run biomedical models against your own data.
      </h1>
      <p className="mt-3 max-w-[62ch] text-[17px] leading-relaxed text-ink-dim">
        Upload FASTA, VCF, CSV, or DICOM and get inference back as an interactive
        visualization — variant calls, survival curves, 3D structures, or segmentation
        overlays — in the same tab.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {DOMAINS.map((d) => {
          const Icon = d.icon;
          return (
            <button
              key={d.label}
              className="flex flex-col items-start gap-3 rounded-panel border border-slate-line bg-bg-panel p-5 text-left transition-colors hover:border-signal/40"
            >
              <Icon className="h-5 w-5 text-signal" strokeWidth={2} />
              <div>
                <p className="text-[15.5px] font-medium text-ink">{d.label}</p>
                <p className="font-mono text-[12px] text-ink-faint">{d.count} models</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-12">
        <div className="mb-5 flex items-baseline justify-between">
          <h2 className="font-display text-[22px] font-semibold text-ink">
            Genomic Variant Classifier
          </h2>
          <span className="font-mono text-[12px] text-ink-faint">genomics · ensemble · v2.3</span>
        </div>
        <VariantClassifierSandbox />
      </div>
    </div>
  );
}
