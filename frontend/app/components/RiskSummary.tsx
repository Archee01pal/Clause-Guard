"use client";
import React from "react";
import { motion } from "framer-motion";
import { ShieldAlert, AlertTriangle, Zap } from "lucide-react";

interface RiskSummaryProps {
  score: number;
  contractType: string;
  summary: string;
  missingClauses: string[];
}

export default function RiskSummary({
  score,
  contractType,
  summary,
  missingClauses,
}: RiskSummaryProps) {
  const getScoreTheme = (score: number) => {
    if (score >= 7)
      return {
        badge: "bg-red-500/20 text-red-400 border-red-500/40",
        bar: "bg-gradient-to-r from-orange-500 to-red-500",
        label: "HIGH RISK 🚩",
      };
    if (score >= 4)
      return {
        badge: "bg-amber-500/20 text-amber-400 border-amber-500/40",
        bar: "bg-gradient-to-r from-yellow-500 to-amber-500",
        label: "MODERATE RISK ⚠️",
      };
    return {
      badge: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
      bar: "bg-gradient-to-r from-teal-500 to-emerald-500",
      label: "SAFE CONTRACT ✅",
    };
  };

  const theme = getScoreTheme(score);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-12 gap-4 my-8"
    >
      <div className="md:col-span-4 glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-pink-400" /> Threat Score
          </span>
          <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md border ${theme.badge}`}>
            {theme.label}
          </span>
        </div>

        <div className="my-6 text-center">
          <div className="font-syne text-6xl font-extrabold text-white tracking-tight">
            {score}
            <span className="text-2xl text-slate-500 font-normal">/10</span>
          </div>
          <div className="w-full h-2.5 bg-slate-800 rounded-full mt-4 overflow-hidden p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${theme.bar}`}
              style={{ width: `${(score / 10) * 100}%` }}
            />
          </div>
        </div>

        <div className="text-center font-mono text-xs text-slate-400">
          Contract Type: <span className="text-slate-200 font-bold">{contractType}</span>
        </div>
      </div>

      <div className="md:col-span-8 glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="font-mono text-xs text-slate-400 uppercase tracking-widest">
              AI Summary (TL;DR)
            </span>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed font-sans">
            {summary}
          </p>
        </div>

        {missingClauses.length > 0 && (
          <div className="mt-6 pt-4 border-t border-white/5">
            <div className="text-xs font-mono text-amber-400 flex items-center gap-1.5 mb-2.5">
              <AlertTriangle className="w-3.5 h-3.5" /> Missing Essential Protections:
            </div>
            <div className="flex flex-wrap gap-2">
              {missingClauses.map((clause, idx) => (
                <span
                  key={idx}
                  className="text-xs font-mono bg-amber-500/10 text-amber-300 border border-amber-500/20 px-3 py-1 rounded-lg"
                >
                  NO {clause.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}