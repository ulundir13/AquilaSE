"use client";

import { useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_AQUILASE_API_KEY || "";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

type AnalysisRow = {
  text: string;
  ambiguous_terms: string[];
  classification: string;
  risk_score: number;
  risk_level: "low" | "medium" | "high";
};

type RTMLink = { to: string; score: number };
type RTMRow = { requirement: string; links: RTMLink[] };

function riskColor(level: "low" | "medium" | "high") {
  if (level === "high") return "bg-red-600";
  if (level === "medium") return "bg-yellow-500";
  return "bg-green-600";
}

function riskBorder(level: "low" | "medium" | "high") {
  if (level === "high") return "ring-red-400";
  if (level === "medium") return "ring-yellow-300";
  return "ring-green-400";
}

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisRow[]>([]);
  const [rtm, setRtm] = useState<RTMRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const lowCount = analysis.filter((a) => a.risk_level === "low").length;
  const medCount = analysis.filter((a) => a.risk_level === "medium").length;
  const highCount = analysis.filter((a) => a.risk_level === "high").length;

  async function runAnalysis() {
    if (!file) return;

    setLoading(true);
    setError("");
    setAnalysis([]);
    setRtm([]);

    try {
      // 1) Requirements analysis
      const form1 = new FormData();
      form1.append("file", file);

     const res1 = await fetch(`${API_BASE_URL}/requirements/upload`, {
      method: "POST",
      headers: { "X-API-Key": API_KEY },
      body: form1,
     });

      const data1 = await res1.json();
      if (!res1.ok || data1.error) throw new Error(data1.error || "Upload failed");

      setAnalysis(data1.analysis_preview || []);

      // 2) RTM generation
      const form2 = new FormData();
      form2.append("file", file);

     const res2 = await fetch(
     `${API_BASE_URL}/traceability/rtm?top_k=3&min_similarity=0.05`,
     {
      method: "POST",
      headers: { "X-API-Key": API_KEY },
      body: form2,
     }
    );

      const data2 = await res2.json();
      if (!res2.ok || data2.error) throw new Error(data2.error || "RTM failed");

      setRtm(data2.rtm || []);
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-8 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">AquilaSE Dashboard</h1>
        <p className="text-zinc-600">
          Upload requirements to analyze ambiguity, classification, risk, and traceability.
        </p>
      </header>

      <section className="space-y-3">
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />

        <button
          onClick={runAnalysis}
          disabled={!file || loading}
          className="px-4 py-2 rounded bg-black text-white disabled:opacity-50"
        >
          {loading ? "Running..." : "Run Analysis"}
        </button>

        {error && <p className="text-red-600">{error}</p>}
      </section>

      {analysis.length > 0 && (
  <section className="space-y-3">
    <h2 className="text-2xl font-semibold">Risk Heatmap</h2>

    {/* Summary */}
    <div className="flex flex-wrap gap-3 text-sm">
      <div className="px-3 py-1 rounded border">
        Low: <span className="font-semibold">{lowCount}</span>
      </div>
      <div className="px-3 py-1 rounded border">
        Medium: <span className="font-semibold">{medCount}</span>
      </div>
      <div className="px-3 py-1 rounded border">
        High: <span className="font-semibold">{highCount}</span>
      </div>
    </div>

    {/* Heatmap grid */}
    <div className="border rounded p-4">
      <div className="grid grid-cols-8 sm:grid-cols-12 md:grid-cols-16 gap-2">
        {analysis.map((row, i) => (
          <div
            key={i}
            title={`${row.risk_level.toUpperCase()} (${row.risk_score}) - ${row.text}`}
            className={[
              "h-6 w-6 rounded",
              "ring-2 ring-inset",
              riskColor(row.risk_level),
              riskBorder(row.risk_level),
            ].join(" ")}
          />
        ))}
      </div>

      <div className="mt-4 flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded bg-green-600 inline-block" />
          Low
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded bg-yellow-500 inline-block" />
          Medium
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded bg-red-600 inline-block" />
          High
        </div>
        <div className="text-zinc-500">
          Hover squares to view requirement + score
        </div>
      </div>
    </div>
  </section>
)}

      {analysis.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Requirements Analysis</h2>

          <div className="overflow-auto border rounded">
            <table className="min-w-full text-sm">
              <thead className="bg-zinc-100">
                <tr>
                  <th className="text-left p-2">Requirement</th>
                  <th className="text-left p-2">Ambiguous Terms</th>
                  <th className="text-left p-2">Classification</th>
                  <th className="text-left p-2">Risk</th>
                </tr>
              </thead>
              <tbody>
                {analysis.map((row, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="p-2">{row.text}</td>
                    <td className="p-2">
                      {row.ambiguous_terms?.length ? row.ambiguous_terms.join(", ") : "-"}
                    </td>
                    <td className="p-2">{row.classification}</td>
                    <td className="p-2">
                      {row.risk_level} ({row.risk_score})
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {rtm.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Traceability Matrix (RTM)</h2>

          <div className="space-y-4">
            {rtm.map((row, idx) => (
              <div key={idx} className="border rounded p-4">
                <div className="font-semibold">{row.requirement}</div>

                {row.links.length === 0 ? (
                  <div className="text-sm text-zinc-600 mt-2">No links found.</div>
                ) : (
                  <ul className="mt-2 text-sm list-disc pl-5">
                    {row.links.map((l, j) => (
                      <li key={j}>
                        {l.to} — score: {l.score}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}