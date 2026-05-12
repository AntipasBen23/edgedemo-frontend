"use client";

import { Report } from "@/types/report";

interface Props {
  report: Report;
}

export default function ReportHeader({ report }: Props) {
  const runTime = report.run_time_seconds.toFixed(1);
  const generated = new Date(report.generated_at).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="rounded border border-bg-border bg-bg-secondary p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="font-mono text-xs text-text-muted">
            [AE] SMART MONEY TRACKER
          </div>
          <h2 className="mt-1 font-mono text-2xl font-bold text-text-primary">
            {report.ticker}{" "}
            <span className="text-text-secondary">
              // {report.company_name.toUpperCase()}
            </span>
          </h2>
          <div className="mt-1 font-mono text-xs text-accent-primary">
            SYNTHESIS COMPLETE
          </div>
        </div>

        <div className="text-right font-mono text-xs text-text-muted space-y-1">
          <div>
            REPORT:{" "}
            <span className="text-text-secondary">{report.report_id}</span>
          </div>
          <div>
            RUN TIME:{" "}
            <span className="text-text-secondary">{runTime}S</span>
          </div>
          <div>
            GENERATED:{" "}
            <span className="text-text-secondary">{generated}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
