"use client";

import { useState } from "react";

export default function FloatingInput({
  label,
  type = "text",
  value,
  onChange
}) {

  const [focus, setFocus] = useState(false);

  return (
    <div className="relative w-full mb-5">

      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className="w-full border-2 border-gray-300 rounded-lg px-3 pt-5 pb-2 outline-none focus:border-emerald-500 transition"
      />

      <label
        className={`absolute left-3 bg-white px-1 transition-all duration-300
        ${focus || value
            ? "top-[-10px] text-sm text-emerald-500"
            : "top-3 text-gray-500"
          }`}
      >
        {label}
      </label>

    </div>
  );
}