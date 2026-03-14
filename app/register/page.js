"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";
import AuthCard from "../components/auth/AuthCard";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!name || !userId || !password) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          userId,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed. Please try again.");
        setLoading(false);
        return;
      }

      setSuccess("Account created successfully! Redirecting...");

      setTimeout(() => {
        router.replace("/");
        router.refresh();
      }, 1500);

    } catch (err) {
      setError("Something went wrong. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create account"
      subtitle="Join Journel today and start capturing your story."
      visualContent={{
        title: "Your story starts here.",
        description: "Experience the most intuitive and beautiful way to document your life's journey."
      }}
    >
      <form onSubmit={handleRegister}>
        <AuthCard>
          <div className="space-y-1">
            <AuthInput
              id="name"
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

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
            <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium mb-6">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-emerald-50 border border-emerald-100 text-emerald-600 px-4 py-3 rounded-xl text-sm font-medium mb-6">
              {success}
            </div>
          )}

          <AuthButton type="submit" loading={loading}>
            Create Account
          </AuthButton>

          <p className="text-center text-slate-500 text-sm mt-8">
            Already have an account?{" "}
            <Link href="/login" className="text-emerald-600 font-bold hover:underline transition-all">
              Sign in instead
            </Link>
          </p>
        </AuthCard>
      </form>
    </AuthLayout>
  );
}
