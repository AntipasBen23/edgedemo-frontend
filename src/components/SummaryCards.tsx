"use client";

import { ReportSummary } from "@/types/report";

interface Props {
  summary: ReportSummary;
}

function biasColor(bias: string) {
  if (bias === "BULLISH") return "text-signal-bull";
  if (bias === "BEARISH") return "text-signal-bear";
  return "text-signal-watch";
}

function convictionColor(c: string) {
  if (c === "HIGH") return "text-signal-bull";
  if (c === "MEDIUM") return "text-signal-watch";
  return "text-signal-bear";
}

function Card({
  label,
  value,
  sub,
  valueClass,
}: {
  label: string;
  value: string;
  sub?: string;
  valueClass?: string;
}) {
  return (
    <div className="flex-1 rounded border border-bg-border bg-bg-tertiary p-4 min-w-0">
      <div className="font-mono text-xs text-text-muted mb-2">{label}</div>
      <div className={`font-mono text-lg font-bold ${valueClass ?? "text-text-primary"}`}>
        {value}
      </div>
      {sub && (
        <div className="font-mono text-xs text-text-secondary mt-1">{sub}</div>
      )}
    </div>
  );
}

export default function SummaryCards({ summary }: Props) {
  return (
    <div>
      <div className="mb-3 font-mono text-xs tracking-widest text-text-muted">
        SMART MONEY SYNTHESIS REPORT
      </div>
      <div className="flex flex-wrap gap-3">
        <Card
          label="DIRECTIONAL BIAS"
          value={summary.directional_bias}
          sub={summary.time_horizon}
          valueClass={biasColor(summary.directional_bias)}
        />
        <Card
          label="CONVICTION"
          value={summary.conviction}
          valueClass={convictionColor(summary.conviction)}
        />
        <Card
          label="SIGNAL STRENGTH"
          value={`${summary.signal_strength.toFixed(1)}/10`}
          valueClass="text-text-primary"
        />
        <Card
          label="DATA QUALITY"
          value={summary.data_quality}
          valueClass="text-text-primary"
        />
      </div>
    </div>
  );
}
