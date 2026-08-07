export default function SignalDivider({ label }: { label?: string }) {
  return (
    <div className="relative flex items-center py-10">
      <div className="hairline flex-1" />
      <svg
        className="signal-divider mx-4 h-6 w-40 shrink-0 text-signal/70"
        viewBox="0 0 320 40"
        fill="none"
      >
        <path
          d="M0 20 H110 L122 6 L134 34 L146 20 H320"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-trace"
        />
      </svg>
      {label && <span className="eyebrow shrink-0">{label}</span>}
      <div className="hairline flex-1" />
    </div>
  );
}
