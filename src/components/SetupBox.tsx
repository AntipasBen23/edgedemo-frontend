"use client";

import { SuggestedSetup } from "@/types/report";

interface Props {
  setup: SuggestedSetup;
}

function Cell({
  label,
  value,
  valueClass,
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="rounded border border-bg-border bg-bg-tertiary p-4">
      <div className="font-mono text-xs text-text-muted mb-1">{label}</div>
      <div className={`font-mono text-base font-bold ${valueClass ?? "text-text-primary"}`}>
        {value}
      </div>
    </div>
  );
}

export default function SetupBox({ setup }: Props) {
  return (
    <div className="rounded border border-bg-border bg-bg-secondary p-6">
      <div className="mb-1 flex items-center justify-between">
        <span className="font-mono text-xs tracking-widest text-text-muted">
          SUGGESTED SETUP
        </span>
        <span className="font-mono text-xs text-signal-watch">
          FOR REVIEW // NOT FINANCIAL ADVICE
        </span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Cell label="ENTRY ZONE" value={setup.entry_zone} valueClass="text-accent-primary" />
        <Cell label="TARGET 1" value={setup.target_1} valueClass="text-signal-bull" />
        <Cell label="TARGET 2" value={setup.target_2} valueClass="text-signal-bull" />
        <Cell label="INVALIDATION" value={setup.invalidation} valueClass="text-signal-bear" />
      </div>
    </div>
  );
}
