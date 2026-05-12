"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Header from "@/components/Header";
import TickerInput from "@/components/TickerInput";
import LoadingState from "@/components/LoadingState";
import ReportHeader from "@/components/ReportHeader";
import SummaryCards from "@/components/SummaryCards";
import TradesTable from "@/components/TradesTable";
import SignalCards from "@/components/SignalCards";
import SynthesisBlock from "@/components/SynthesisBlock";
import ConvictionBar from "@/components/ConvictionBar";
import SetupBox from "@/components/SetupBox";
import DataGaps from "@/components/DataGaps";

import { analyzeStock } from "@/lib/api";
import { Report } from "@/types/report";

const fadeIn = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.4, ease: "easeOut" },
  }),
};

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [activeTicker, setActiveTicker] = useState("");
  const [report, setReport] = useState<Report | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleAnalyze(ticker: string, companyName: string) {
    setLoading(true);
    setError(null);
    setReport(null);
    setActiveTicker(ticker);

    try {
      const result = await analyzeStock({ ticker, company_name: companyName });
      setReport(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const reportSections = report
    ? [
        <ReportHeader key="header" report={report} />,
        <SummaryCards key="summary" summary={report.summary} />,
        <TradesTable
          key="trades"
          politicianTrades={report.politician_trades}
          insiderTrades={report.insider_trades}
        />,
        <SignalCards key="signals" signals={report.signals} />,
        <SynthesisBlock key="synthesis" synthesis={report.synthesis} />,
        <ConvictionBar key="conviction" score={report.conviction_score} />,
        <SetupBox key="setup" setup={report.suggested_setup} />,
        ...(report.data_gaps.length > 0
          ? [<DataGaps key="gaps" gaps={report.data_gaps} />]
          : []),
      ]
    : [];

  return (
    <div className="flex min-h-screen flex-col bg-bg-primary">
      <Header />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        <AnimatePresence mode="wait">
          {!loading && !report && (
            <motion.div
              key="input"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <TickerInput onSubmit={handleAnalyze} loading={loading} />
            </motion.div>
          )}

          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingState ticker={activeTicker} />
            </motion.div>
          )}

          {error && !loading && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-6 py-16 text-center"
            >
              <div className="rounded border border-signal-bear/40 bg-bg-secondary px-6 py-4 font-mono text-sm text-signal-bear">
                {error}
              </div>
              <button
                onClick={() => setError(null)}
                className="font-mono text-xs text-text-secondary underline hover:text-accent-primary"
              >
                Try again
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {report && !loading && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  setReport(null);
                  setError(null);
                }}
                className="font-mono text-xs text-text-muted hover:text-accent-primary"
              >
                ← NEW ANALYSIS
              </button>
            </div>

            {reportSections.map((section, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeIn}
                initial="hidden"
                animate="visible"
              >
                {section}
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-bg-border px-6 py-4">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <span className="font-mono text-xs text-text-muted">
            AI EDGE // SMART MONEY TRACKER v1.0
          </span>
          <span className="font-mono text-xs text-text-muted">
            NOT FINANCIAL ADVICE
          </span>
        </div>
      </footer>
    </div>
  );
}
