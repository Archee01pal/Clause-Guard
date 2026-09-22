"use client";
import React from "react";
import { ShieldCheck } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between pb-8 border-b border-white/5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center shadow-lg neon-glow-pink">
          <ShieldCheck className="w-6 h-6 text-white" />
        </div>
        <span className="font-syne text-xl font-extrabold tracking-tight text-white">
          ClauseGuard <span className="text-pink-500">//</span> AI
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          System Online
        </span>
      </div>
    </header>
  );
}