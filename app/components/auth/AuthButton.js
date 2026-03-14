"use client";

export default function AuthButton({
    children,
    onClick,
    loading = false,
    disabled = false,
    type = "button",
    variant = "primary"
}) {
    const baseStyles = "w-full py-3.5 px-4 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98]";

    const variants = {
        primary: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200/50 hover:shadow-emerald-200 disabled:bg-emerald-300",
        secondary: "bg-white text-slate-700 border-2 border-slate-100 hover:border-slate-200 hover:bg-slate-50",
        outline: "bg-transparent text-emerald-600 border-2 border-emerald-600 hover:bg-emerald-50"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={loading || disabled}
            className={`${baseStyles} ${variants[variant]}`}
        >
            {loading ? (
                <>
                    <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Processing...</span>
                </>
            ) : (
                children
            )}
        </button>
    );
}
