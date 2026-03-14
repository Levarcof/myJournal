"use client";

import { useState } from "react";

export default function AuthInput({
    label,
    type = "text",
    value,
    onChange,
    error,
    placeholder = " ",
    required = false,
    id
}) {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
        <div className="relative w-full mb-6 group">
            <input
                id={id}
                type={inputType}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                className={`
          peer w-full bg-slate-50 border-2 rounded-xl px-4 pt-6 pb-2 outline-none transition-all duration-200
          text-slate-900 font-medium
          ${error
                        ? "border-red-200 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                        : "border-slate-100 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 focus:bg-white"
                    }
        `}
            />

            <label
                htmlFor={id}
                className={`
          absolute left-4 transition-all duration-200 pointer-events-none
          peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400
          peer-focus:top-2 peer-focus:text-xs peer-focus:font-semibold
          ${value ? "top-2 text-xs font-semibold" : "top-4 text-base"}
          ${error ? "text-red-500 peer-focus:text-red-500" : "text-slate-500 peer-focus:text-emerald-600"}
        `}
            >
                {label}
            </label>

            {isPassword && (
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-[1.5rem] text-slate-400 hover:text-emerald-600 transition-colors"
                >
                    {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path><line x1="2" y1="2" x2="22" y2="22"></line></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    )}
                </button>
            )}

            {error && (
                <p className="mt-1.5 text-xs font-medium text-red-500 ml-1">
                    {error}
                </p>
            )}
        </div>
    );
}
