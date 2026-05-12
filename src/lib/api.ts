import { AnalyzeRequest, Report } from "@/types/report";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export async function analyzeStock(request: AnalyzeRequest): Promise<Report> {
  const res = await fetch(`${API_URL}/api/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(
      (body as { error?: string }).error ?? `Request failed (${res.status})`
    );
  }

  return res.json() as Promise<Report>;
}
