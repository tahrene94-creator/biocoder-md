import { Dna, HeartPulse, GraduationCap, Newspaper } from "lucide-react";
import FounderCard, { TeamMember } from "@/components/about/FounderCard";
import SignalDivider from "@/components/ui/SignalDivider";

const TEAM: TeamMember[] = [
  {
    name: "Tah Rene Mih",
    role: "Founder & Director",
    photo: "/team/tah-rene-mih.jpg",
    location: "Bamenda, Cameroon",
    bio: "Tah Rene Mih is a licensed Medical Doctor and AI researcher building the bridge between clinical medicine and biomedical machine learning. He is completing an M.Eng. in AI for One Health at Université Grenoble-Alpes and currently works as a Research Intern in Computational Chemistry at the University of Buea Center for Drug Discovery (UB-CeDD), applying machine learning and omics analysis to drug discovery and molecular characterization. Before moving into AI, he practiced clinical medicine at Nkambe Hospital, treating over 3,000 patients a year, and led data quality assurance for a 5,000+ point nutrition study with IRESCO/WFP. He founded BioCoder MD to give researchers, clinicians, students, and patients one place to meet in the middle.",
    credentials: [
      "M.D., University of Bamenda",
      "M.Eng. AI for One Health, UGA (in progress)",
      "DTM&H, Bernhard Nocht Institute",
      "M.Sc. Clinical Biology, University of Dschang",
      "Licensed MD, Cameroon Medical Council",
    ],
    links: {
      github: "https://github.com/tahrene94-creator",
      linkedin: "https://linkedin.com/in/tahrenemih",
      email: "rene-mih.tah@etu.univ-grenoble-alpes.fr",
    },
  },
];

const PILLARS = [
  { icon: Dna, label: "Precision Medicine & Biomedical ML" },
  { icon: HeartPulse, label: "Hospital & Clinical Applications" },
  { icon: GraduationCap, label: "BioCoder MD Academy" },
  { icon: Newspaper, label: "Article Review & Translation Hub" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1000px] px-5 py-12 md:px-8">
      <p className="eyebrow">About Us</p>
      <div className="title-rule" />
      <h1 className="font-display text-[36px] font-semibold tracking-tight text-ink sm:text-[42px]">
        Built at the seam between medicine and machine learning.
      </h1>
      <p className="mt-4 max-w-[65ch] text-[18px] leading-relaxed text-ink-dim">
        BioCoder MD exists because the people who build biomedical models, the clinicians
        who'd use them, the students learning the field, and the patients affected by it
        rarely share a single platform. We think that gap is a large part of why good
        research takes so long to reach a bedside — so we built one hub that carries a
        model from a research sandbox, into a clinical tool, into a classroom, and into
        language a patient can actually use.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {PILLARS.map((p) => {
          const Icon = p.icon;
          return (
            <div key={p.label} className="rounded-panel border border-slate-line bg-bg-panel p-5">
              <Icon className="h-5 w-5 text-signal" strokeWidth={2} />
              <p className="mt-3 text-[14px] font-medium leading-snug text-ink">{p.label}</p>
            </div>
          );
        })}
      </div>

      <SignalDivider label="Our Team" />

      <div className="flex flex-col gap-6">
        {TEAM.map((member) => (
          <FounderCard key={member.name} member={member} />
        ))}
      </div>

      <p className="mt-10 text-center text-[14px] text-ink-faint">
        BioCoder MD is growing — reach out on{" "}
        <a
          href={TEAM[0].links.github}
          target="_blank"
          rel="noreferrer noopener"
          className="font-medium text-signal hover:underline"
        >
          GitHub
        </a>{" "}
        if you'd like to contribute or collaborate.
      </p>
    </div>
  );
}
