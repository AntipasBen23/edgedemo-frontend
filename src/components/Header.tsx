"use client";

export default function Header() {
  return (
    <header className="w-full border-b border-bg-border bg-bg-secondary px-6 py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded border border-accent-primary bg-bg-tertiary">
            <span className="font-mono text-xs font-bold text-accent-primary">
              AE
            </span>
          </div>
          <div>
            <span className="font-mono text-sm font-bold tracking-widest text-accent-primary">
              AI EDGE
            </span>
            <span className="ml-2 font-mono text-xs text-text-muted">
              // SMART MONEY TRACKER
            </span>
          </div>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-primary" />
            <span className="font-mono text-xs text-text-secondary">LIVE</span>
          </div>
        </div>
      </div>
    </header>
  );
}
