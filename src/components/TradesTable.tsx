"use client";

import { PoliticianTrade, InsiderTrade } from "@/types/report";

interface Props {
  politicianTrades: PoliticianTrade[];
  insiderTrades: InsiderTrade[];
}

function actionColor(action: string) {
  const up = action.toUpperCase();
  if (up.includes("SELL")) return "text-signal-bear";
  if (up.includes("BUY") || up.includes("CALL") || up.includes("PURCHASE"))
    return "text-signal-bull";
  return "text-text-secondary";
}

function partyColor(party: string) {
  if (party === "D") return "text-blue-400";
  if (party === "R") return "text-red-400";
  return "text-text-muted";
}

function TableRow({ cols }: { cols: React.ReactNode[] }) {
  return (
    <tr className="border-t border-bg-border transition-colors hover:bg-bg-tertiary hover:border-l-2 hover:border-l-accent-primary">
      {cols.map((col, i) => (
        <td key={i} className="px-3 py-2.5 font-mono text-xs">
          {col}
        </td>
      ))}
    </tr>
  );
}

function EmptyRow({ message }: { message: string }) {
  return (
    <tr>
      <td
        colSpan={6}
        className="px-3 py-4 font-mono text-xs text-text-muted text-center"
      >
        {message}
      </td>
    </tr>
  );
}

export default function TradesTable({ politicianTrades, insiderTrades }: Props) {
  return (
    <div className="space-y-6">
      {/* Politician Trades */}
      <div className="rounded border border-bg-border bg-bg-secondary overflow-hidden">
        <div className="px-4 py-3 border-b border-bg-border">
          <span className="font-mono text-xs tracking-widest text-text-muted">
            TIER 1 SIGNAL // POLITICAL ACTIVITY
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-bg-tertiary">
                {["FILER", "ROLE", "PARTY", "ACTION", "AMOUNT", "DATE"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-3 py-2 text-left font-mono text-xs text-text-muted"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {politicianTrades.length === 0 ? (
                <EmptyRow message="No disclosed congressional trades found in last 30 days." />
              ) : (
                politicianTrades.map((t, i) => (
                  <TableRow
                    key={i}
                    cols={[
                      <span className="text-text-primary">{t.name}</span>,
                      <span className="text-text-secondary">{t.role}</span>,
                      <span className={partyColor(t.party)}>{t.party}</span>,
                      <span className={actionColor(t.action)}>{t.action}</span>,
                      <span className="text-text-primary">{t.amount}</span>,
                      <span className="text-text-muted">{t.filed_date}</span>,
                    ]}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insider Trades */}
      <div className="rounded border border-bg-border bg-bg-secondary overflow-hidden">
        <div className="px-4 py-3 border-b border-bg-border">
          <span className="font-mono text-xs tracking-widest text-text-muted">
            TIER 2 SIGNAL // INSIDER ACTIVITY (SEC FORM 4)
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-bg-tertiary">
                {["FILER", "ROLE", "ACTION", "NOTE", "AMOUNT", "DATE"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-3 py-2 text-left font-mono text-xs text-text-muted"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {insiderTrades.length === 0 ? (
                <EmptyRow message="No Form 4 filings found in last 30 days." />
              ) : (
                insiderTrades.map((t, i) => (
                  <TableRow
                    key={i}
                    cols={[
                      <span className="text-text-primary">{t.name}</span>,
                      <span className="text-text-secondary">{t.role}</span>,
                      <span className={actionColor(t.action)}>{t.action}</span>,
                      <span className="text-text-muted">{t.note ?? "—"}</span>,
                      <span className="text-text-primary">{t.amount}</span>,
                      <span className="text-text-muted">{t.filed_date}</span>,
                    ]}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
