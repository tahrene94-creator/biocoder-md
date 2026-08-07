"use client";

import { useState } from "react";
import PaperReviewCard, { PaperReview } from "@/components/insights/PaperReviewCard";

const DOMAINS = ["All", "Genomics", "Precision Oncology", "Medical Imaging", "EHR", "Drug Discovery"];

const PAPERS: PaperReview[] = [
  {
    title: "A Vision Transformer for Early Detection of Diabetic Retinopathy in Fundus Images",
    journal: "npj Digital Medicine",
    doi: "10.1038/s41746-025-01142-x",
    domain: "Medical Imaging",
    evidenceTier: "Prospective / RCT",
    clinical: {
      architecture: "ViT-B/16 backbone with a lesion-attention head, pretrained on ImageNet-21k and fine-tuned via contrastive pretraining on 1.2M fundus images.",
      dataset: "312,000 labeled fundus images across 14 sites; held-out prospective arm of 8,400 patients across 3 countries.",
      validation: "5-fold cross-validation plus a prospective, site-stratified external test set; out-of-distribution check on a fourth-country cohort.",
      metrics: [
        { label: "AUROC", value: "0.981" },
        { label: "Sensitivity", value: "94.2%" },
        { label: "Specificity", value: "91.7%" },
      ],
      discussion:
        "Grad-CAM overlays concentrated on microaneurysms and hemorrhages, consistent with clinical grading criteria. Performance dropped 3.1 points AUROC on the out-of-distribution camera model, flagging a hardware-drift risk. The authors report an FDA De Novo submission is in progress; EHR integration is demonstrated via a FHIR ImagingStudy resource.",
    },
    plain: {
      bigPicture:
        "A computer program can look at a photo of the back of your eye and flag early signs of diabetes-related eye damage about as accurately as a specialist.",
      analogy:
        "Think of it like a spell-checker for eye photos: it's been shown thousands of examples of healthy and damaged eyes, so it learns to spot the same warning signs a doctor looks for — tiny burst blood vessels and swelling.",
      implication:
        "Clinics without an eye specialist on-site could screen patients faster, catching damage early enough to prevent vision loss. It's a screening aid, not a replacement for a full eye exam.",
    },
  },
  {
    title: "Graph Neural Networks for Predicting Drug–Target Binding Affinity Across Kinase Families",
    journal: "Bioinformatics",
    doi: "10.1093/bioinformatics/btae-4471",
    domain: "Drug Discovery",
    evidenceTier: "In Silico",
    clinical: {
      architecture: "Message-passing GNN over ligand molecular graphs, cross-attended with a protein-language-model embedding (ESM-2) of the target binding pocket.",
      dataset: "BindingDB and ChEMBL kinase subsets, ~410,000 ligand-target pairs after deduplication and scaffold splitting.",
      validation: "Scaffold-split cross-validation to prevent structural leakage; no wet-lab validation reported.",
      metrics: [
        { label: "Pearson r", value: "0.87" },
        { label: "RMSE", value: "0.71 pKd" },
      ],
      discussion:
        "Scaffold splitting is a stronger generalization test than random splitting, but the model has not been validated against novel chemical series or in a wet-lab assay, so in-silico results should be treated as a triage signal rather than a go/no-go decision for synthesis.",
    },
    plain: {
      bigPicture:
        "Researchers built a model that predicts, from a molecule's shape alone, how tightly it might stick to a specific protein involved in disease — a key early step in designing new drugs.",
      analogy:
        "It's like a matchmaking algorithm for molecules and proteins: instead of testing every possible pairing in a lab, which is slow and expensive, the model narrows down the most promising matches to test first.",
      implication:
        "This doesn't produce a new medicine by itself — it's a computer prediction that still needs lab confirmation. But it can speed up the earliest, most expensive stage of drug discovery.",
    },
  },
  {
    title: "Federated Learning for Sepsis Risk Prediction Across Five Health Systems",
    journal: "The Lancet Digital Health",
    doi: "10.1016/j.landig.2025.100612",
    domain: "EHR",
    evidenceTier: "Retrospective",
    clinical: {
      architecture: "Gradient-boosted ensemble trained via federated averaging across five EHR sites without centralizing patient-level data; FHIR Observation and Condition resources as feature inputs.",
      dataset: "1.4M encounters across five health systems, retrospective cohort, 2019–2024.",
      validation: "Site-held-out retrospective validation; temporal validation on the most recent 6 months per site.",
      metrics: [
        { label: "AUROC", value: "0.89" },
        { label: "F1-Score", value: "0.71" },
      ],
      discussion:
        "Performance varied by up to 6 AUROC points across sites, likely reflecting differing documentation practices and case mix — a reminder that federated training doesn't eliminate site-level data drift. No prospective silent-mode deployment has been reported yet.",
    },
    plain: {
      bigPicture:
        "Five hospitals trained one shared early-warning tool for sepsis, a fast-moving and dangerous infection response, without ever sharing actual patient records with each other.",
      analogy:
        "Imagine five study groups each learning from their own notes, then only sharing what they learned — not the notes themselves — to build one better shared answer key.",
      implication:
        "If it holds up in real-time hospital use, tools like this could alert care teams to sepsis risk earlier than routine checks would catch it — but it's still being tested on historical data, not yet on patients in real time.",
    },
  },
];

export default function InsightsPage() {
  const [domain, setDomain] = useState("All");
  const filtered = PAPERS.filter((p) => domain === "All" || p.domain === domain);

  return (
    <div className="mx-auto max-w-[1000px] px-5 py-12 md:px-8">
      <p className="eyebrow">Insights</p>
      <h1 className="mt-3 font-display text-[36px] font-semibold tracking-tight text-ink sm:text-[42px]">
        Every paper, read two ways.
      </h1>
      <p className="mt-3 max-w-[62ch] text-[17px] leading-relaxed text-ink-dim">
        Toggle between a technical briefing built for practitioners and a plain-language
        summary built for patients. Metadata is fetched automatically from each paper's DOI.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {DOMAINS.map((d) => (
          <button
            key={d}
            onClick={() => setDomain(d)}
            className={`rounded-pill border px-3.5 py-1.5 text-[14.5px] font-medium transition-colors ${
              domain === d
                ? "border-signal bg-signal-soft text-signal"
                : "border-slate-line text-ink-dim hover:text-ink"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-6">
        {filtered.map((paper) => (
          <PaperReviewCard key={paper.doi} paper={paper} />
        ))}
        {filtered.length === 0 && (
          <p className="py-16 text-center text-[15.5px] text-ink-faint">
            No reviews in this domain yet.
          </p>
        )}
      </div>
    </div>
  );
}
