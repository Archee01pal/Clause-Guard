"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Copy, Check, ShieldCheck, Download, Sparkles } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Clause {
  clause_title: string;
  original_text: string;
  risk_level: "High" | "Medium" | "Low";
  explanation: string;
  recommended_fix: string;
}

interface ClauseListProps {
  clauses: Clause[];
  contractType?: string;
  score?: number;
  summary?: string;
}

export default function ClauseList({
  clauses,
  contractType = "Contract",
  score = 0,
  summary = "",
}: ClauseListProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const downloadFixedPdf = () => {
    const doc = new jsPDF();

    // Header Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(236, 72, 153);
    doc.text("ClauseGuard AI - Amended & Fixed Contract Report", 14, 20);

    // Subtitle
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text(`Document Type: ${contractType} | Safety Score: ${score}/10`, 14, 28);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 34);

    doc.setLineWidth(0.5);
    doc.setDrawColor(200, 200, 200);
    doc.line(14, 38, 196, 38);

    // Summary section
    if (summary) {
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text("Audit Overview:", 14, 46);

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(60, 60, 60);
      const splitSummary = doc.splitTextToSize(summary, 180);
      doc.text(splitSummary, 14, 52);
    }

    // Table mapping original problematic text vs AI Fixed Version
    const tableStartY = summary ? 68 : 46;
    const tableData = clauses.map((c, i) => [
      `#${i + 1}\n${c.clause_title}\n[${c.risk_level.toUpperCase()} RISK]`,
      c.original_text,
      c.recommended_fix,
    ]);

    autoTable(doc, {
      startY: tableStartY,
      head: [["Clause & Threat Level", "Original Problematic Clause", "AI Revised & Fixed Counter-Clause"]],
      body: tableData,
      headStyles: { fillColor: [24, 24, 37], textColor: [255, 255, 255], fontStyle: "bold" },
      columnStyles: {
        0: { cellWidth: 42, fontStyle: "bold" },
        1: { cellWidth: 68 },
        2: { cellWidth: 70, textColor: [16, 128, 67], fontStyle: "bold" },
      },
      styles: { fontSize: 8, cellPadding: 3, overflow: "linebreak" },
    });

    doc.save(`${contractType.replace(/\s+/g, "_")}_FIXED_Report.pdf`);
  };

  return (
    <div className="space-y-6 my-8">
      <div className="flex items-center justify-between">
        <h2 className="font-syne text-2xl font-bold text-white flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-pink-500" /> Flagged Risks & Counter-Edits
        </h2>
        <span className="font-mono text-xs text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
          {clauses.length} Issues Detected
        </span>
      </div>

      <div className="space-y-4">
        {clauses.map((clause, index) => {
          const isHigh = clause.risk_level === "High";
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 relative border-l-4 border-l-pink-500 space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="font-syne font-bold text-lg text-white">
                  {clause.clause_title}
                </span>
                <span
                  className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md border ${
                    isHigh
                      ? "bg-red-500/20 text-red-400 border-red-500/40"
                      : "bg-amber-500/20 text-amber-400 border-amber-500/40"
                  }`}
                >
                  {clause.risk_level.toUpperCase()} RISK
                </span>
              </div>

              <div className="bg-black/30 rounded-xl p-3 border border-white/5 text-xs font-mono text-slate-400">
                <span className="text-pink-400 font-bold block mb-1">ORIGINAL CLAUSE:</span>
                "{clause.original_text}"
              </div>

              <p className="text-sm text-slate-300 font-sans leading-relaxed">
                <strong className="text-slate-100">Why it's risky: </strong>
                {clause.explanation}
              </p>

              {/* Recommended Fix Box */}
              <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-4 relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> RECOMMENDED AI FIX:
                  </span>
                  <button
                    onClick={() => handleCopy(clause.recommended_fix, index)}
                    className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-xs font-mono text-emerald-300 transition"
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy Fix
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs font-mono text-emerald-200/90 leading-relaxed">
                  {clause.recommended_fix}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Download Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-2xl p-6 text-center space-y-3 mt-10 border border-purple-500/30 bg-gradient-to-r from-purple-900/20 via-pink-900/10 to-cyan-900/20"
      >
        <div className="inline-flex items-center gap-2 text-xs font-mono text-purple-300 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
          <Sparkles className="w-3.5 h-3.5" /> Done reviewing all fixes?
        </div>
        <h3 className="font-syne text-xl font-bold text-white">
          Export your complete contract audit & counter-proposals
        </h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Get a clean, professional PDF containing all flagged threats side-by-side with your AI-revised contract clauses.
        </p>
        <div className="pt-2">
          <button
            onClick={downloadFixedPdf}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 hover:opacity-90 text-white font-mono text-sm font-bold transition flex items-center justify-center gap-2 mx-auto shadow-lg shadow-pink-500/20"
          >
            <Download className="w-4 h-4" /> Download Fixed PDF Report
          </button>
        </div>
      </motion.div>
    </div>
  );
}