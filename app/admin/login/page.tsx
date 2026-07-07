"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { Lock, ArrowRight, AlertCircle } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (data.success) {
        router.push("/admin");
      } else {
        setError(data.error || "Incorrect passcode");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <main className="flex-grow bg-canvas text-ink pt-28 min-h-screen flex flex-col justify-center items-center px-4 relative film-grain">
        <div className="absolute inset-0 bg-gradient-to-b from-curtain/5 to-transparent pointer-events-none"></div>

        <div className="w-full max-w-md bg-white border border-gold/25 rounded-lg shadow-2xl p-8 relative z-10 animate-fadeIn">
          {/* Logo or Icon */}
          <div className="w-16 h-16 rounded-full bg-curtain/10 border border-gold/40 flex items-center justify-center mx-auto text-gold mb-6">
            <Lock size={28} />
          </div>

          <h1 className="font-heading text-2xl md:text-3xl text-curtain text-center font-bold mb-2 uppercase tracking-wide">
            Admin Portal
          </h1>
          <p className="font-body text-xs text-ink/60 text-center mb-8 uppercase tracking-widest font-semibold">
            Raghuvansh Theatre Group
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-ink/60 mb-2 font-semibold">
                Enter Passcode
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-canvas border border-gold/20 focus:border-gold outline-none p-4 rounded-sm transition-colors text-ink text-center tracking-widest text-lg font-bold"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-curtain text-xs bg-curtain/5 p-3 rounded-sm border border-curtain/20">
                <AlertCircle size={14} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-curtain text-canvas font-body uppercase tracking-widest text-sm p-4 rounded-sm hover:bg-gold hover:text-ink transition-colors duration-300 disabled:opacity-50 font-bold flex items-center justify-center gap-2 shadow-lg"
            >
              {loading ? "Verifying..." : "Access Dashboard"}
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
