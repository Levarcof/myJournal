"use client";

import { Clock, Trees, Waves, MountainSnow, Calendar, Brain, Tag, AlignLeft } from "lucide-react";

export default function JournalList({ entries }) {
  const getAmbienceIcon = (ambience) => {
    switch (ambience) {
      case "forest":
        return <Trees className="h-4 w-4" />;
      case "ocean":
        return <Waves className="h-4 w-4" />;
      case "mountain":
        return <MountainSnow className="h-4 w-4" />;
      default:
        return <Trees className="h-4 w-4" />;
    }
  };

  if (!entries?.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 sm:p-12 text-center dark:border-slate-700 dark:bg-slate-800/50">
        <Clock className="mb-4 h-6 w-6 sm:h-8 sm:w-8 text-slate-400" />
        <h3 className="mb-1 text-base sm:text-lg font-medium text-slate-900 dark:text-slate-100">No entries yet</h3>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">Start your journaling journey today.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 px-2">
        <Calendar className="h-5 w-5 text-slate-400" />
        <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
          Previous Entries
        </h2>
      </div>

      <div className="space-y-4">
        {entries.map((entry) => (
          <div
            key={entry._id}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="mb-3 sm:mb-4 flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-100 bg-slate-50 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-medium text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
                {getAmbienceIcon(entry.ambience)}
                <span className="capitalize">{entry.ambience}</span>
              </div>
              <time className="text-[10px] sm:text-xs text-slate-400">
                {new Date(entry.createdAt || Date.now()).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </div>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed dark:text-slate-300">
              {entry.text}
            </p>

            {/* Conditionally Render Analysis directly if it exists */}
            {entry.emotion && (
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <div className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-900/20 dark:text-emerald-400">
                      <Brain className="h-3.5 w-3.5" />
                      <span className="uppercase tracking-wider">Emotion: {entry.emotion}</span>
                    </div>

                    {entry.keywords?.map((keyword, i) => (
                      <div key={i} className="inline-flex items-center gap-1 rounded-xl border border-slate-100 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-400">
                        <Tag className="h-3 w-3 text-slate-400" />
                        <span>{keyword}</span>
                      </div>
                    ))}
                  </div>

                  {entry.summary && (
                    <div className="rounded-2xl bg-slate-50/80 p-4 border border-slate-100/50 dark:bg-slate-800/30 dark:border-slate-800/50">
                      <div className="flex items-center gap-1.5 mb-2 text-slate-400 dark:text-slate-500">
                        <AlignLeft className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">AI Summary</span>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed dark:text-slate-300 font-medium">
                        {entry.summary}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
