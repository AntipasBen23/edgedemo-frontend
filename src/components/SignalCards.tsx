"use client";

import { Signal } from "@/types/report";

interface Props {
  signals: Signal[];
}

function sentimentBadge(sentiment: string) {
  if (sentiment === "BULLISH")
    return "bg-signal-bull text-bg-primary";
  if (sentiment === "BEARISH")
    return "bg-signal-bear text-text-primary";
  return "bg-signal-watch text-bg-primary";
}

export default function SignalCards({ signals }: Props) {
  return (
    <div className="rounded border border-bg-border bg-bg-secondary p-4">
      <div className="mb-4 font-mono text-xs tracking-widest text-text-muted">
        CROSS-SIGNAL CONFLUENCE
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {signals.map((signal, i) => (
          <div
            key={i}
            className="rounded border border-bg-border bg-bg-tertiary p-4 space-y-2"
          >
            <div
              className={`inline-block rounded px-2 py-0.5 font-mono text-xs font-bold ${sentimentBadge(signal.sentiment)}`}
            >
              {signal.sentiment}
            </div>
            <div className="font-mono text-xs font-bold text-text-primary">
              {signal.label}
            </div>
            <p className="font-mono text-xs text-text-secondary leading-relaxed">
              {signal.summary}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
