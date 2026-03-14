"use client";

import Link from "next/link";

export default function AuthLayout({ children, title, subtitle, visualContent }) {
    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-[#f8fafc]">
            {/* Left Side: Visual/Branding (Hidden on mobile) */}
            <div className="hidden md:flex md:w-1/2 bg-emerald-600 relative overflow-hidden items-center justify-center p-12">
                {/* Decorative Elements */}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500 rounded-full blur-3xl opacity-50 animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-400 rounded-full blur-3xl opacity-30"></div>

                <div className="relative z-10 text-white max-w-md">
                    <div className="mb-8">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm mb-6">
                            <span className="text-2xl">🌱</span>
                        </div>
                        <h1 className="text-4xl font-bold mb-4 tracking-tight">
                            {visualContent?.title || "Capture your thoughts, beautifully."}
                        </h1>
                        <p className="text-emerald-50/80 text-sm leading-relaxed">
                            {visualContent?.description || "Join thousands of users who trust our platform for их daily journaling and reflection."}
                        </p>
                    </div>

                    {/* Optional Testimonial or Feature */}
                    {/* <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                        <p className="text-emerald-50 italic mb-4">
                            "The most elegant journaling app I've ever used. It actually makes me want to write every day."
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-400/30 flex items-center justify-center text-sm font-semibold">
                                JD
                            </div>
                            <div>
                                <p className="text-sm font-medium">Jane Doe</p>
                                <p className="text-xs text-emerald-100/60">Creative Writer</p>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>

            {/* Right Side: Auth Form */}
            <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 relative">
                {/* Mobile Header (Visible only on mobile) */}
                <div className="md:hidden absolute top-8 left-8 flex items-center gap-2">
                    <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white text-xs">
                        🌱
                    </div>
                    <span className="font-bold text-slate-900 tracking-tight">Journel</span>
                </div>

                <div className="w-full max-w-md">
                    <div className="text-center md:text-left mb-10">
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
                            {title}
                        </h2>
                        <p className="text-slate-500 text-sm">
                            {subtitle}
                        </p>
                    </div>

                    <div className="bg-white md:bg-transparent rounded-3xl md:rounded-none p-8 md:p-0 shadow-xl shadow-slate-200/50 md:shadow-none border border-slate-100 md:border-none">
                        {children}
                    </div>

                    <p className="mt-8 text-center text-sm text-slate-500">
                        &copy; {new Date().getFullYear()} Journel Inc. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}
