"use client";

import { useEffect, useState } from "react";
import JournalForm from "./components/JournalForm";
import JournalList from "./components/JournalList";
import InsightsCard from "./components/InsightsCard";
import Container from "./components/Container";
import TopNav from "./components/TopNav";
import { BarChart3 } from "lucide-react";

export default function Dashboard() {

  const [entries, setEntries] = useState([]);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [showMobileInsights, setShowMobileInsights] = useState(false);

  const fetchEntries = async () => {
    try {
      const res = await fetch(`/api/journal/${userId}`);
      if (!res.ok) return;
      const data = await res.json();
      setEntries(data);
    } catch (e) {
      console.error(e);
    }
  };
  const fetchInsights = async () => {
    try {
      const res = await fetch("/api/journal/insights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (!res.ok) return;

      const data = await res.json();
      setInsights(data);

    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me");

        if (!res.ok) return;

        const data = await res.json();

        setUserId(data.userId);

      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const refreshAll = async () => {
    await Promise.all([fetchEntries(), fetchInsights()]);
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await refreshAll();
      setLoading(false);
    };
    if (userId) {
      init();
    }
  }, [userId]);

  return (
    <>
      <TopNav />
      <Container>
        <div className="py-8 lg:py-12">
          {/* Header Section */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 md:mb-10">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-xl dark:text-white">
                My <span className="text-emerald-500">Journal</span>
              </h1>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                How are you feeling today? Let's take a moment to reflect.
              </p>
            </div>
            {/* Mobile Insights Toggle */}
            <button
              onClick={() => setShowMobileInsights(!showMobileInsights)}
              className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 sm:px-5 sm:py-3 text-xs sm:text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 active:scale-95 lg:hidden dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <BarChart3 className="h-4 w-4 text-emerald-500 transition-transform group-hover:scale-110" />
              <span>{showMobileInsights ? "Back to Journal" : "View Insights"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            {/* Left Column: Form and Feed */}
            <div className={`lg:col-span-8 space-y-8 ${showMobileInsights ? 'hidden lg:block' : 'block'}`}>
              <JournalForm userId={userId} refresh={refreshAll} />

              {loading ? (
                <div className="flex justify-center p-12">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
                </div>
              ) : (
                <JournalList entries={entries} />
              )}
            </div>

            {/* Right Column: Insights */}
            <div className={`lg:col-span-4 ${showMobileInsights ? 'block' : 'hidden lg:block'}`}>
              <InsightsCard insights={insights} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}