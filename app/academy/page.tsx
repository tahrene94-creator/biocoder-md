"use client";

import { useState } from "react";
import { PlayCircle, Award, Clock, CircleCheck } from "lucide-react";

const LEVELS = ["All", "Beginner", "Intermediate", "Advanced"] as const;
const DOMAINS = ["All domains", "Python for MedTech", "Building FHIR Apps", "Genomic AI"];

const COURSES = [
  {
    title: "Python for MedTech: Foundations",
    domain: "Python for MedTech",
    level: "Beginner",
    hours: 6,
    progress: 100,
    modules: 8,
  },
  {
    title: "Handling Clinical Data Safely",
    domain: "Python for MedTech",
    level: "Beginner",
    hours: 4,
    progress: 62,
    modules: 6,
  },
  {
    title: "Building FHIR Apps: Patient Records",
    domain: "Building FHIR Apps",
    level: "Intermediate",
    hours: 9,
    progress: 30,
    modules: 10,
  },
  {
    title: "HL7 Interoperability in Practice",
    domain: "Building FHIR Apps",
    level: "Intermediate",
    hours: 7,
    progress: 0,
    modules: 7,
  },
  {
    title: "Genomic AI: Variant Effect Models",
    domain: "Genomic AI",
    level: "Advanced",
    hours: 12,
    progress: 0,
    modules: 11,
  },
  {
    title: "Explainability for Clinical Models (SHAP, Grad-CAM)",
    domain: "Genomic AI",
    level: "Advanced",
    hours: 5,
    progress: 0,
    modules: 5,
  },
];

export default function AcademyPage() {
  const [level, setLevel] = useState<(typeof LEVELS)[number]>("All");
  const [domain, setDomain] = useState(DOMAINS[0]);

  const filtered = COURSES.filter(
    (c) => (level === "All" || c.level === level) && (domain === "All domains" || c.domain === domain)
  );

  const completed = COURSES.filter((c) => c.progress === 100).length;
  const inProgress = COURSES.filter((c) => c.progress > 0 && c.progress < 100).length;

  return (
    <div className="mx-auto max-w-[1200px] px-5 py-12 md:px-8">
      <p className="eyebrow">Academy</p>
      <div className="title-rule" />
      <h1 className="mt-3 font-display text-[36px] font-semibold tracking-tight text-ink sm:text-[42px]">
        Your training dashboard.
      </h1>
      <p className="mt-3 max-w-[62ch] text-[17px] leading-relaxed text-ink-dim">
        Self-paced modules with a real code workspace and one-click Colab launches.
        Certificates unlock automatically once every module in a course is complete.
      </p>

      {/* Progress summary */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-panel border border-slate-line bg-bg-panel p-5">
          <p className="flex items-center gap-2 text-[12.5px] text-ink-faint">
            <CircleCheck className="h-3.5 w-3.5 text-signal" /> Completed
          </p>
          <p className="data-figure mt-2 text-[28px] text-ink">{completed}</p>
        </div>
        <div className="rounded-panel border border-slate-line bg-bg-panel p-5">
          <p className="flex items-center gap-2 text-[12.5px] text-ink-faint">
            <Clock className="h-3.5 w-3.5 text-signal" /> In progress
          </p>
          <p className="data-figure mt-2 text-[28px] text-ink">{inProgress}</p>
        </div>
        <div className="rounded-panel border border-slate-line bg-bg-panel p-5">
          <p className="flex items-center gap-2 text-[12.5px] text-ink-faint">
            <Award className="h-3.5 w-3.5 text-signal" /> Certificates earned
          </p>
          <p className="data-figure mt-2 text-[28px] text-ink">{completed}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-10 flex flex-wrap items-center gap-3">
        <div className="flex gap-1.5 rounded-panel border border-slate-line p-1">
          {LEVELS.map((l) => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={`rounded-panel px-3 py-1.5 text-[14.5px] font-medium transition-colors ${
                level === l ? "bg-signal text-bg-deep" : "text-ink-dim hover:text-ink"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
        <select
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="rounded-panel border border-slate-line bg-bg-panel px-3 py-2 text-[14.5px] text-ink-dim outline-none focus:border-signal/50"
        >
          {DOMAINS.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* Course grid */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((course) => (
          <div
            key={course.title}
            className="flex flex-col justify-between rounded-panel border border-slate-line bg-bg-panel p-6 shadow-panel"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-pill bg-signal-soft px-2.5 py-0.5 font-mono text-[11px] text-signal">
                  {course.level}
                </span>
                <span className="flex items-center gap-1 font-mono text-[11.5px] text-ink-faint">
                  <Clock className="h-3 w-3" /> {course.hours}h
                </span>
              </div>
              <h3 className="mt-4 font-display text-[18px] font-semibold leading-snug text-ink">
                {course.title}
              </h3>
              <p className="mt-1.5 text-[14px] text-ink-faint">{course.modules} modules · {course.domain}</p>
            </div>

            <div className="mt-6">
              <div className="h-1.5 w-full overflow-hidden rounded-pill bg-bg-deep">
                <div
                  className="h-full rounded-pill bg-signal transition-all"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[12px] text-ink-faint">{course.progress}% complete</span>
                <button className="flex items-center gap-1.5 text-[14.5px] font-medium text-signal hover:text-signal-bright">
                  <PlayCircle className="h-4 w-4" />
                  {course.progress === 0 ? "Start" : course.progress === 100 ? "Review" : "Resume"}
                </button>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="col-span-full py-16 text-center text-[15.5px] text-ink-faint">
            No courses match those filters yet — try a different level or domain.
          </p>
        )}
      </div>
    </div>
  );
}
