"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  score: number;
}

function scoreColor(score: number) {
  if (score >= 70) return "bg-signal-bull";
  if (score >= 40) return "bg-signal-watch";
  return "bg-signal-bear";
}

function scoreLabel(score: number) {
  if (score >= 70) return "text-signal-bull";
  if (score >= 40) return "text-signal-watch";
  return "text-signal-bear";
}

export default function ConvictionBar({ score }: Props) {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setDisplayed(score), 200);
    return () => clearTimeout(timer);
  }, [score]);

  return (
    <div className="rounded border border-bg-border bg-bg-secondary p-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-xs tracking-widest text-text-muted">
          CONVICTION SCORE
        </span>
        <span className={`font-mono text-2xl font-bold ${scoreLabel(score)}`}>
          {score}
          <span className="text-sm text-text-muted">/100</span>
        </span>
      </div>

      <div className="h-3 w-full overflow-hidden rounded-full bg-bg-tertiary">
        <motion.div
          className={`h-full rounded-full ${scoreColor(score)}`}
          initial={{ width: 0 }}
          animate={{ width: `${displayed}%` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </div>

      <div className="mt-2 flex justify-between font-mono text-xs text-text-muted">
        <span>LOW</span>
        <span>MEDIUM</span>
        <span>HIGH</span>
      </div>
    </div>
  );
}
