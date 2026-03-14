"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";
import AuthCard from "../components/auth/AuthCard";

export default function LoginPage() {
  const router = useRouter();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!userId || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          userId,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid credentials. Please try again.");
        setLoading(false);
        return;
      }

      setSuccess("Welcome back! Redirecting...");

      setTimeout(() => {
        router.replace("/");
        router.refresh();
      }, 800);

    } catch (err) {
      setError("Something went wrong. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Enter your credentials to access your personal journal."
      visualContent={{
        title: "Your thoughts, organized and secure.",
        description: "Journel provides a premium space for your daily reflections with state-of-the-art security."
      }}
    >
      <form onSubmit={handleLogin}>
        <AuthCard>
          <div className="space-y-1">
            <AuthInput
              id="userId"
              label="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            
              required
            />

            <AuthInput
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
             
              required
            />
          </div>


          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium mb-6 animate-shake">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-emerald-50 border border-emerald-100 text-emerald-600 px-4 py-3 rounded-xl text-sm font-medium mb-6">
              {success}
            </div>
          )}

          <AuthButton type="submit" loading={loading}>
            Sign In
          </AuthButton>

          <p className="text-center text-slate-500 text-sm mt-8">
            Don't have an account?{" "}
            <Link href="/register" className="text-emerald-600 font-bold hover:underline transition-all">
              Create an account
            </Link>
          </p>
        </AuthCard>
      </form>
    </AuthLayout>
  );
}
