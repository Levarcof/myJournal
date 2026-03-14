"use client";

import { BarChart3, BookOpen, Brain, Hash, Target } from "lucide-react";

export default function InsightsCard({ insights }) {
  if (!insights) {
    return (
      <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex animate-pulse flex-col items-center justify-center py-10">
          <BarChart3 className="mb-4 h-8 w-8 text-slate-200 dark:text-slate-700" />
          <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-700"></div>
          <div className="mt-2 h-3 w-48 rounded bg-slate-100 dark:bg-slate-800"></div>
        </div>
      </div>
    );
  }

  const statItems = [
    {
      label: "Total Entries",
      value: insights.totalEntries,
      icon: BookOpen,
      color: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      label: "Top Emotion",
      value: insights.topEmotion || "N/A",
      icon: Brain,
      color: "text-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
    },
    {
      label: "Top Ambience",
      value: insights.mostUsedAmbience ? insights.mostUsedAmbience.charAt(0).toUpperCase() + insights.mostUsedAmbience.slice(1) : "N/A",
      icon: Target,
      color: "text-amber-500",
      bg: "bg-amber-50 dark:bg-amber-900/20",
    },
  ];

  return (
    <div className="sticky top-24 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="border-b border-slate-100 bg-slate-50/50 px-4 py-3 sm:px-6 sm:py-4 dark:border-slate-800 dark:bg-slate-800/50">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-500" />
          <h2 className="text-base sm:text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Your Insights
          </h2>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="space-y-3 sm:space-y-4">
          {statItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-center gap-3 sm:gap-4 rounded-xl border border-slate-100 p-2.5 sm:p-3 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50">
                <div className={`flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg ${item.bg}`}>
                  <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${item.color}`} />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs font-medium text-slate-500 dark:text-slate-400">{item.label}</p>
                  <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">{item.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        {insights.recentKeywords && insights.recentKeywords.length > 0 && (
          <div className="mt-8">
            <div className="mb-3 flex items-center gap-2">
              <Hash className="h-4 w-4 text-slate-400" />
              <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Recent Keywords
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {insights.recentKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="inline-flex rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}