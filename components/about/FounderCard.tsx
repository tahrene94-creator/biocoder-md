import Image from "next/image";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";

export interface TeamMember {
  name: string;
  role: string;
  photo: string;
  location: string;
  bio: string;
  credentials: string[];
  links: { github?: string; linkedin?: string; email?: string };
}

export default function FounderCard({ member }: { member: TeamMember }) {
  return (
    <div className="grid gap-8 rounded-panel border border-slate-line bg-bg-panel p-8 shadow-panel sm:grid-cols-[220px_1fr]">
      <div>
        <div className="relative aspect-square w-full overflow-hidden rounded-panel border border-slate-line">
          <Image
            src={member.photo}
            alt={member.name}
            fill
            sizes="220px"
            className="object-cover"
            priority
          />
        </div>
        <div className="mt-4 flex items-center gap-3">
          {member.links.github && (
            <a
              href={member.links.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${member.name} on GitHub`}
              className="flex h-8 w-8 items-center justify-center rounded-panel border border-slate-line text-ink-dim transition-colors hover:text-signal"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
          {member.links.linkedin && (
            <a
              href={member.links.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${member.name} on LinkedIn`}
              className="flex h-8 w-8 items-center justify-center rounded-panel border border-slate-line text-ink-dim transition-colors hover:text-signal"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          )}
          {member.links.email && (
            <a
              href={`mailto:${member.links.email}`}
              aria-label={`Email ${member.name}`}
              className="flex h-8 w-8 items-center justify-center rounded-panel border border-slate-line text-ink-dim transition-colors hover:text-signal"
            >
              <Mail className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      <div>
        <h3 className="font-display text-[24px] font-semibold text-ink">{member.name}</h3>
        <p className="mt-1 text-[16.5px] font-medium text-signal">{member.role}</p>
        <p className="mt-1 flex items-center gap-1.5 text-[14px] text-ink-faint">
          <MapPin className="h-3.5 w-3.5" />
          {member.location}
        </p>

        <p className="mt-4 text-[16px] leading-relaxed text-ink-dim">{member.bio}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {member.credentials.map((c) => (
            <span
              key={c}
              className="rounded-pill border border-slate-line bg-bg-deep px-3 py-1 font-mono text-[12px] text-ink-dim"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
