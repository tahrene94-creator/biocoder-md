# BioCoder MD - Phase 1 Scaffold

Where machine learning meets precision healthcare. This is the foundational
codebase for the four pillars: the ML sandbox, the clinical apps hub, the
Academy, and the `/insights` dual-perspective review hub.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS, design tokens in `tailwind.config.ts`
- `lucide-react` icons, `recharts` for clinical/data charts, `framer-motion` available for future motion work
- Fonts: **Space Grotesk** (display), **IBM Plex Sans** (body), **IBM Plex Mono** (data/metrics used for anything numeric: AUROC, pKd, DOIs, code)

## Getting started

```bash
npm install
npm run dev
```

## Design system

The palette is built around a clinical monitor: a deep navy/slate field
(`bg-deep #0A0F1A`, `bg-panel #111A2B`), one emerald "signal" accent
(`#12B886`) used the way a vitals monitor uses green for anything live,
normal, or actionable and crisp white/ink text for clarity. Amber and rose
are reserved for warnings and elevated-risk states only.

The **signal trace** (`components/ui/SignalDivider.tsx`) is the page's
signature element: a continuous EKG-like waveform that runs through section
seams, standing in for the throughline connecting research → bedside →
classroom → publication.

## Structure

```
app/
  layout.tsx          Root layout: Navbar + Sidebar + Footer shell
  page.tsx             Landing page (hero, live demo, 4-pillar grid)
  globals.css
  models/page.tsx       /models ML Hub with domain catalog + sandbox
  academy/page.tsx       /academy course dashboard
  insights/page.tsx      /insights dual-perspective paper reviews
components/
  layout/               Navbar, Sidebar, Footer
  sandbox/               LiveDemoWidget, VariantClassifierSandbox
  insights/               PaperReviewCard (clinical/plain toggle)
  ui/                     SignalDivider
```

## What's stubbed vs. real

- All model inference (`classify()` in `VariantClassifierSandbox.tsx`,
  `runPrediction()` in `LiveDemoWidget.tsx`) is a deterministic client-side
  stand-in. Wire these to real endpoints, e.g. `POST /api/models/variant-classify`,
  backed by the FastAPI/PyTorch runtime described in the platform brief.
- `/apps` (Clinical & Hospital Applications Hub) is linked from nav/sidebar
  but not yet built next milestone alongside the FHIR/HL7 demo and mock
  patient data SOPs.
- DOI metadata fetching for `/insights` is hardcoded sample data; hook up to
  Crossref/PubMed for automated fetch on submission.
- Auth (Clerk/NextAuth) and Stripe billing are not wired up course
  progress and certificates in `academy/page.tsx` use local sample state.

## Compliance note

No real patient data is used anywhere in this scaffold. Any clinical demo
must run against synthetic data per the HIPAA-aligned SOPs referenced in the
product brief before real data is ever introduced.

## Security

What's implemented in this scaffold:

- **`middleware.ts`** a per-request nonce-based Content Security Policy
  plus `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`,
  `Permissions-Policy`, `Cross-Origin-Opener-Policy`,
  `Cross-Origin-Resource-Policy`, and HSTS (production only). This is the
  main defense against XSS, clickjacking, and MIME-sniffing attacks, and it
  runs at the edge on every route via an explicit matcher.
- **`lib/validation.ts`** Zod schemas at every point untrusted input enters
  the app (pasted VCF text, uploaded files, DOI submissions, SMILES
  strings), with size caps and pattern checks against script/SQL injection
  markers. `VariantClassifierSandbox` enforces these client-side today; the
  same schemas must be re-applied server-side once real API routes exist —
  client validation is a UX convenience, never a security boundary.
- **`next.config.js`** `poweredByHeader: false` to stop advertising the
  framework version, and CI-enforced linting.
- **Next.js pinned to `^14.2.30`**, which is patched against
  [CVE-2025-29927](https://nextjs.org/blog/cve-2025-29927), a critical
  (CVSS 9.1) middleware-authorization-bypass vulnerability affecting
  14.0.0–14.2.24. Keep this pin current re-check before every deploy.
- **`.env.example`** documents every secret the app needs without
  committing real values; `.env.local` is git-ignored by default.

What's required before this touches real PHI (not yet implemented flagged
so it isn't mistaken for done):

- **Authentication & authorization**: MFA for all accounts touching clinical
  data, RBAC/ABAC scoped per HIPAA's minimum-necessary standard, and
  short-lived, rotated session tokens (`SameSite=Strict` cookies).
- **Encryption**: TLS 1.2+ (prefer 1.3) in transit enforced by the HSTS
  header above once behind real HTTPS and AES-256 at rest for any
  database or object storage holding ePHI.
- **Audit logging**: every read/write of ePHI logged with who/what/when/
  outcome, written to an append-only, tamper-evident sink (see
  `AUDIT_LOG_ENDPOINT` in `.env.example`), retained per your BAA - HIPAA
  guidance points to at least six years.
- **FHIR/EHR integration**: SMART on FHIR (OAuth 2.0 + PKCE) with scoped
  access (`patient/Observation.read`, not blanket access), never raw
  unauthenticated FHIR endpoints.
- **Business Associate Agreements** with every vendor in the data path
  (hosting, database, email, error monitoring) before any real patient data
  is introduced.
- **Rate limiting & abuse protection** on all inference and auth endpoints,
  and CSRF verification (`Origin` vs `Host`) on any state-changing API
  route that isn't a Next.js Server Action.
- **Dependency and secret scanning** in CI (`npm audit` / Dependabot,
  gitleaks or equivalent) on every PR.

None of this is optional if PHI is ever involved it's the operational
floor under HIPAA's Security Rule (45 CFR §164.312), not a nice-to-have.
