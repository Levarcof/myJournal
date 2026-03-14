"use client";

import { useState } from "react";
import { Loader2, Sparkles, Brain, Tag, AlignLeft } from "lucide-react";

export default function AnalyzeButton({ text, entryId, initialResult }) {
  const [result, setResult] = useState(initialResult);
  const [isLoading, setIsLoading] = useState(false);

  const analyze = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/journal/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, entryId }),
      });

      const data = await res.json();
      if (res.ok) {
        setResult(data);
      } else {
        alert(data.message || "Failed to analyze");
      }
    } catch (error) {
      console.error("Failed to analyze", error);
      alert("Something went wrong. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-4 flex flex-col items-start gap-4">
      {!result ? (
        <button
          onClick={analyze}
          disabled={isLoading}
          className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-emerald-400"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin text-emerald-500" />
          ) : (
            <Sparkles className="h-4 w-4 text-emerald-500 transition-transform group-hover:scale-110" />
          )}
          <span>{isLoading ? "Analyzing..." : "Analyze Emotion"}</span>
        </button>
      ) : (
        <div className="w-full space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-900/20 dark:text-emerald-400">
              <Brain className="h-3.5 w-3.5" />
              <span className="uppercase tracking-wider">Emotion: {result.emotion}</span>
            </div>

            {result.keywords?.map((keyword, i) => (
              <div key={i} className="inline-flex items-center gap-1.5 rounded-xl border border-slate-100 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-400">
                <Tag className="h-3 w-3" />
                <span>{keyword}</span>
              </div>
            ))}
          </div>

          {result.summary && (
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 dark:bg-slate-800/50 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-2 text-slate-500 dark:text-slate-400">
                <AlignLeft className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">AI Summary</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed dark:text-slate-300">
                {result.summary}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
