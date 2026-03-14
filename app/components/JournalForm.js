"use client";

import { useState } from "react";
import { PenLine, Trees, Waves, MountainSnow, SendHorizontal, Sparkles, Loader2, Brain, Tag, AlignLeft } from "lucide-react";

export default function JournalForm({ userId, refresh }) {
  const [text, setText] = useState("");
  const [ambience, setAmbience] = useState("forest");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New workflow states
  const [documentId, setDocumentId] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  const ambiences = [
    { id: "forest", icon: Trees, label: "Forest" },
    { id: "ocean", icon: Waves, label: "Ocean" },
    { id: "mountain", icon: MountainSnow, label: "Mountain" },
  ];

  const submitJournal = async () => {
    if (!text.trim()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/journal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          ambience,
          text,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setDocumentId(data.data._id); // Assuming the API returns the created document in data.data
        setIsSaved(true);
        refresh(); // Refresh the list of entries
      } else {
        alert(data.message || "Failed to save entry");
      }
    } catch (error) {
      console.error("Save Error:", error);
      alert("Something went wrong while saving.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const analyzeJournal = async () => {
    if (!documentId) return;
    setIsAnalyzing(true);
    try {
      const res = await fetch("/api/journal/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          documentId,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setAnalysisResult(data.data || data);
        refresh(); // Refresh the list of entries to show the new analysis
      } else {
        alert(data.message || "Failed to analyze");
      }
    } catch (error) {
      console.error("Analysis Error:", error);
      alert("Failed to connect to the analysis service.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetForm = () => {
    setText("");
    setAmbience("forest");
    setDocumentId(null);
    setIsSaved(false);
    setAnalysisResult(null);
  };

  return (
    <div className="mb-8 overflow-hidden rounded-3xl border border-slate-200/80 bg-white/60 backdrop-blur-xl shadow-xl shadow-slate-200/40 transition-all dark:border-slate-800/80 dark:bg-slate-900/60 dark:shadow-none">
      <div className="border-b border-slate-100/50 bg-slate-50/30 px-4 py-3 sm:px-6 sm:py-5 dark:border-slate-800/50 dark:bg-slate-800/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PenLine className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500" />
            <h2 className="text-base sm:text-lg font-bold tracking-tight text-slate-800 dark:text-slate-200">
              {isSaved ? "Saved Entry" : "Write your Journal"}
            </h2>
          </div>
          {isSaved && (
            <button
              onClick={resetForm}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 uppercase tracking-wider"
            >
              Write New
            </button>
          )}
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className={`relative mb-6 overflow-hidden rounded-2xl border transition-all duration-500 ${isSaved
          ? "border-slate-100/50 bg-slate-50/30"
          : "border-slate-200/50 bg-transparent shadow-sm hover:border-slate-300/80 focus-within:border-emerald-500/50 focus-within:ring-4 focus-within:ring-emerald-500/10"
          }`}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isSaved}
            placeholder="How are you feeling right now?"
            className={`min-h-[140px] sm:min-h-[160px] w-full resize-none bg-transparent p-4 sm:p-6 text-sm sm:text-lg font-medium leading-relaxed text-slate-800 placeholder-slate-400 focus:outline-none dark:text-slate-300 ${isSaved ? "text-slate-500 cursor-not-allowed opacity-80" : ""
              }`}
          />
          {isSaved && (
            <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-700 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest animate-pulse">
              Locked
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className={`flex items-center gap-2 transition-opacity duration-300 ${isSaved ? "opacity-30 pointer-events-none" : ""}`}>
            {ambiences.map((amb) => {
              const Icon = amb.icon;
              const isActive = ambience === amb.id;
              return (
                <button
                  key={amb.id}
                  onClick={() => setAmbience(amb.id)}
                  disabled={isSaved}
                  className={`flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition-all ${isActive
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-900/30 dark:text-emerald-400 shadow-sm"
                    : "border-slate-100 bg-white text-slate-500 hover:border-slate-200 hover:cursor-pointer dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                    }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-emerald-500" : "text-slate-400"}`} />
                  <span className=" sm:inline">{amb.label}</span>
                </button>
              );
            })}
          </div>

          {!isSaved ? (
            <button
              onClick={submitJournal}
              disabled={!text.trim() || isSubmitting}
              className="group flex w-full sm:w-auto shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 sm:px-7 sm:py-3 text-sm sm:text-base font-semibold text-white shadow-lg shadow-emerald-200/50 transition-all hover:bg-emerald-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-none"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
              ) : (
                <SendHorizontal className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
              )}
              <span>{isSubmitting ? "Saving..." : "Save Entry"}</span>
            </button>
          ) : !analysisResult ? (
            <button
              onClick={analyzeJournal}
              disabled={isAnalyzing}
              className="group flex w-full sm:w-auto shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 sm:px-7 sm:py-3 text-sm sm:text-base font-semibold text-white shadow-lg shadow-slate-200 transition-all hover:bg-slate-800 active:scale-95 disabled:opacity-50 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:shadow-none"
            >
              {isAnalyzing ? (
                <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin text-emerald-400" />
              ) : (
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400 transition-transform group-hover:scale-110" />
              )}
              <span>{isAnalyzing ? "Analyzing..." : "Analyze Emotion"}</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
              <Sparkles className="h-5 w-5 active:scale-125 transition-transform" />
              Analysis Complete
            </div>
          )}
        </div>

        {/* Analysis Result Display */}
        {analysisResult && (
          <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-900/20 dark:text-emerald-400">
                  <Brain className="h-4 w-4" />
                  <span className="uppercase tracking-widest">Emotion: {analysisResult.emotion}</span>
                </div>

                {analysisResult.keywords?.map((keyword, i) => (
                  <div key={i} className="inline-flex items-center gap-2 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-400">
                    <Tag className="h-4 w-4 text-slate-400" />
                    <span>{keyword}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-3xl bg-slate-50/50 p-6 border border-slate-100 dark:bg-slate-800/30 dark:border-slate-800">
                <div className="flex items-center gap-2 mb-3 text-slate-400 dark:text-slate-500">
                  <AlignLeft className="h-4 w-4 text-emerald-500" />
                  <span className="text-xs font-bold uppercase tracking-widest">AI Summary</span>
                </div>
                <p className="text-slate-600 leading-relaxed dark:text-slate-300 font-medium">
                  {analysisResult.summary}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
