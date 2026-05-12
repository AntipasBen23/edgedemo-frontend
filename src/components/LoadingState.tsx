"use client";

import { useEffect, useState } from "react";

const STEPS = [
  "Pulling congressional disclosures...",
  "Scanning SEC Form 4 filings...",
  "Synthesizing with AI analyst...",
  "Building investment thesis...",
];

interface Props {
  ticker: string;
}

export default function LoadingState({ ticker }: Props) {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(5);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
    }, 1800);

    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 92) return p;
        return p + Math.random() * 6;
      });
    }, 400);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, []);

  const pct = Math.round(Math.min(progress, 92));

  return (
    <div className="flex flex-col items-center gap-8 py-20">
      <div className="w-full max-w-lg space-y-6 rounded border border-bg-border bg-bg-secondary p-8">
        <div className="space-y-2">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="text-accent-primary">
              FETCHING INTELLIGENCE // {ticker}
            </span>
            <span className="text-text-secondary">{pct}%</span>
          </div>

          <div className="h-1.5 w-full overflow-hidden rounded-full bg-bg-tertiary">
            <div
              className="h-full rounded-full bg-accent-primary transition-all duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <div className="space-y-3">
          {STEPS.map((step, i) => {
            const done = i < stepIndex;
            const active = i === stepIndex;
            return (
              <div
                key={step}
                className="flex items-center gap-3 font-mono text-xs"
              >
                <span
                  className={
                    done
                      ? "text-accent-primary"
                      : active
                        ? "text-text-secondary animate-pulse"
                        : "text-text-muted"
                  }
                >
                  {done ? "✓" : active ? "◌" : "○"}
                </span>
                <span
                  className={
                    done
                      ? "text-text-secondary"
                      : active
                        ? "text-text-primary"
                        : "text-text-muted"
                  }
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <p className="font-mono text-xs text-text-muted">
        Analyzing smart-money signals — this usually takes 8-15 seconds
      </p>
    </div>
  );
}
