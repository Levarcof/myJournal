"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TopNav() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
            router.push("/login");
            router.refresh(); // Ensure state updates after redirect
        } catch (error) {
            console.error("Failed to logout", error);
        }
    };
    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-900/80">
            <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                <div className="flex flex-1 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-xl bg-emerald-500 flex items-center justify-center shadow-sm shadow-emerald-500/20">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-leaf text-white w-5 h-5"><path d="M11 20A7 7 0 0 1 14 6h7v7a7 7 0 0 1-7 7H7a7 7 0 0 1-7-7V6h7a7 7 0 0 1 7 7v7Z" /><path d="M11 20V9" /></svg>
                        </div>
                        <span className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
                            Journal
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleLogout}
                            className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-slate-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400"
                            title="Logout"
                        >
                            <span className="sr-only">Logout</span>
                            <LogOut className="h-5 w-5" />
                        </button>
                        {/* <div className="h-9 w-9 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-slate-800 shadow-sm overflow-hidden flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 dark:text-slate-500"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                        </div> */}
                    </div>
                </div>
            </div>
        </header>
    );
}
