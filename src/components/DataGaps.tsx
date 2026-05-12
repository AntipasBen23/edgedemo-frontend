"use client";

interface Props {
  gaps: string[];
}

export default function DataGaps({ gaps }: Props) {
  if (gaps.length === 0) return null;

  return (
    <div className="rounded border border-signal-watch/30 bg-bg-secondary p-6">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-signal-watch">⚠</span>
        <span className="font-mono text-xs tracking-widest text-signal-watch">
          FLAGGED DATA GAPS
        </span>
      </div>
      <ul className="space-y-1.5">
        {gaps.map((gap, i) => (
          <li key={i} className="flex items-start gap-2 font-mono text-xs text-text-secondary">
            <span className="mt-0.5 text-text-muted">—</span>
            <span>{gap}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
