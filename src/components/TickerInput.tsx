"use client";

import { useState, FormEvent } from "react";

interface Props {
  onSubmit: (ticker: string, companyName: string) => void;
  loading: boolean;
}

const RECENT_TICKERS = [
  { ticker: "NVDA", name: "NVIDIA" },
  { ticker: "AAPL", name: "Apple" },
  { ticker: "TSLA", name: "Tesla" },
  { ticker: "MSFT", name: "Microsoft" },
];

export default function TickerInput({ onSubmit, loading }: Props) {
  const [ticker, setTicker] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const clean = ticker.trim().toUpperCase().replace(/[^A-Z]/g, "");
    if (clean.length === 0 || clean.length > 6) return;
    onSubmit(clean, "");
  }

  function handleRecent(t: (typeof RECENT_TICKERS)[0]) {
    setTicker(t.ticker);
    onSubmit(t.ticker, t.name);
  }

  return (
    <div className="flex flex-col items-center gap-8 py-16 text-center">
      <div className="space-y-3">
        <div className="font-mono text-xs tracking-widest text-accent-primary">
          SMART MONEY INTELLIGENCE
        </div>
        <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
          TRACK THE SMART MONEY
        </h1>
        <p className="font-mono text-sm text-text-secondary">
          Politician trades. Insider filings. AI synthesis. One click.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-lg items-center gap-3"
      >
        <input
          type="text"
          value={ticker}
          onChange={(e) =>
            setTicker(e.target.value.toUpperCase().replace(/[^A-Z]/g, ""))
          }
          placeholder="Enter ticker... e.g. NVDA"
          maxLength={6}
          disabled={loading}
          className="flex-1 rounded border border-bg-border bg-bg-secondary px-4 py-3 font-mono text-sm text-text-primary placeholder:text-text-muted focus:border-accent-primary focus:outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading || ticker.length === 0}
          className="rounded border border-accent-primary bg-accent-primary px-6 py-3 font-mono text-sm font-bold text-bg-primary transition-all hover:bg-accent-dim disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? "RUNNING..." : "RUN"}
        </button>
      </form>

      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-text-muted">RECENT:</span>
        {RECENT_TICKERS.map((t) => (
          <button
            key={t.ticker}
            onClick={() => handleRecent(t)}
            disabled={loading}
            className="font-mono text-xs text-text-secondary underline-offset-2 hover:text-accent-primary disabled:opacity-40"
          >
            {t.ticker}
          </button>
        ))}
      </div>
    </div>
  );
}
