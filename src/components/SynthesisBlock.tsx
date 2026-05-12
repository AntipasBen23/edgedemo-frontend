"use client";

interface Props {
  synthesis: string;
}

export default function SynthesisBlock({ synthesis }: Props) {
  const paragraphs = synthesis
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="rounded border border-bg-border bg-bg-secondary p-6">
      <div className="mb-4 font-mono text-xs tracking-widest text-text-muted">
        AI EDGE SYNTHESIS // SMART MONEY ANALYSIS
      </div>
      <div className="space-y-4">
        {paragraphs.length > 0 ? (
          paragraphs.map((p, i) => (
            <p key={i} className="font-mono text-sm text-text-secondary leading-relaxed">
              {p}
            </p>
          ))
        ) : (
          <p className="font-mono text-sm text-text-secondary leading-relaxed">
            {synthesis}
          </p>
        )}
      </div>
    </div>
  );
}
