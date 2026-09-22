"use client";
import React, { useState, useRef } from "react";
import axios from "axios";
import confetti from "canvas-confetti";
import Header from "./components/Header";
import FileUpload from "./components/FileUpload";
import RiskSummary from "./components/RiskSummary";
import ClauseList from "./components/ClauseList";
import { Flame } from "lucide-react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const resultsRef = useRef<HTMLDivElement>(null);

  const handleFileUpload = async (file: File) => {
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/analyze`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setData(response.data);

      if (response.data.overall_risk_score < 4) {
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });
      }

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Backend connection failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative pb-20">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-tr from-pink-600/20 via-purple-600/20 to-cyan-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-6 pt-10">
        <Header />

        <section className="text-center my-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
            <Flame className="w-4 h-4 text-pink-500" /> Stop Signing Bad Contracts
          </div>
          <h1 className="font-syne text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-none">
            Don't get screwed by the{" "}
            <span className="bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              fine print.
            </span>
          </h1>
          <p className="text-slate-400 font-sans max-w-xl mx-auto text-base sm:text-lg">
            Upload your agreement PDF. AI instantly flags high-risk clauses, hidden traps, and generates your counter-edits.
          </p>
        </section>

        <FileUpload onFileUpload={handleFileUpload} isLoading={loading} />

        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-sm max-w-2xl mx-auto text-center my-4">
            {error}
          </div>
        )}

        {data && (
          <section ref={resultsRef} className="mt-12 pt-4">
            <RiskSummary
              score={data.overall_risk_score}
              contractType={data.contract_type}
              summary={data.summary}
              missingClauses={data.missing_critical_clauses}
            />
            <ClauseList
              clauses={data.flagged_clauses}
              contractType={data.contract_type}
              score={data.overall_risk_score}
              summary={data.summary}
            />
          </section>
        )}
      </div>
    </main>
  );
}