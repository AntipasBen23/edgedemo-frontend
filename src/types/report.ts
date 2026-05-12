export interface PoliticianTrade {
  name: string;
  role: string;
  party: "D" | "R" | "I" | string;
  action: string;
  amount: string;
  filed_date: string;
}

export interface InsiderTrade {
  name: string;
  role: string;
  action: string;
  note?: string;
  amount: string;
  filed_date: string;
}

export interface Signal {
  label: string;
  sentiment: "BULLISH" | "BEARISH" | "WATCH";
  summary: string;
}

export interface SuggestedSetup {
  entry_zone: string;
  target_1: string;
  target_2: string;
  invalidation: string;
}

export interface ReportSummary {
  directional_bias: "BULLISH" | "BEARISH" | "NEUTRAL";
  time_horizon: string;
  conviction: "HIGH" | "MEDIUM" | "LOW";
  signal_strength: number;
  data_quality: string;
}

export interface Report {
  ticker: string;
  company_name: string;
  generated_at: string;
  run_time_seconds: number;
  report_id: string;
  summary: ReportSummary;
  politician_trades: PoliticianTrade[];
  insider_trades: InsiderTrade[];
  signals: Signal[];
  synthesis: string;
  conviction_score: number;
  suggested_setup: SuggestedSetup;
  data_gaps: string[];
}

export interface AnalyzeRequest {
  ticker: string;
  company_name: string;
}
