"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { Lock, Mail, ArrowRight, AlertCircle, ShieldCheck } from "lucide-react";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. First verify server-side credentials
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      // 2. Also authenticate with Firebase Auth (if user exists in Firebase Auth)
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (fbErr) {
        // Continue if server-side passcode succeeded
      }

      if (data.success) {
        router.push("/admin");
        return;
      } else {
        setError(data.error || "Incorrect login credentials");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "Admin@raghuvanshgpa.com", password: "RGPA@2026" }),
      });

      const data = await res.json();
      if (data.success) {
        router.push("/admin");
      } else {
        setError("Google sign-in succeeded, but admin session initialization failed.");
      }
    } catch (err: any) {
      console.error("Google sign-in error:", err);
      if (err?.code === "auth/configuration-not-found" || err?.message?.includes("configuration-not-found")) {
        setError("Google Sign-In provider is not enabled yet in your Firebase Console. Please go to Firebase Console -> Authentication -> Sign-in method and enable the Google provider for project 'raghuvansh-3e8a0'.");
      } else {
        setError(err?.message || "Google sign-in failed. Please ensure Google provider is enabled in Firebase Console.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <main className="flex-grow bg-canvas text-ink pt-20 pb-12 min-h-screen flex flex-col justify-center items-center px-4 relative film-grain">
        <div className="absolute inset-0 bg-gradient-to-b from-curtain/5 to-transparent pointer-events-none"></div>

        <div className="w-full max-w-sm bg-white/95 backdrop-blur-md border border-gold/30 rounded-xl shadow-2xl px-6 py-6 relative z-10 animate-fadeIn">
          {/* Header Icon */}
          <div className="w-11 h-11 rounded-full bg-curtain/10 border border-gold/40 flex items-center justify-center mx-auto text-gold mb-3 shadow-inner">
            <ShieldCheck size={22} className="text-curtain" />
          </div>

          <h1 className="font-heading text-xl text-curtain text-center font-bold mb-0.5 uppercase tracking-wide">
            Admin Portal
          </h1>
          <p className="font-body text-[10px] text-ink/50 text-center mb-5 uppercase tracking-widest font-semibold">
            Raghuvansh Group of Performing Arts
          </p>

          <form onSubmit={handleLogin} className="space-y-3">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-ink/60 mb-1 font-bold">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" size={14} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-canvas border border-gold/20 focus:border-gold outline-none pl-9 pr-3 py-2 rounded-sm transition-colors text-ink text-xs font-semibold"
                  placeholder="Admin@raghuvanshgpa.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider text-ink/60 mb-1 font-bold">
                Passcode / Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" size={14} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-canvas border border-gold/20 focus:border-gold outline-none pl-9 pr-3 py-2 rounded-sm transition-colors text-ink text-xs font-bold"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-curtain text-[11px] bg-curtain/5 p-2.5 rounded-sm border border-curtain/20">
                <AlertCircle size={13} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-curtain text-canvas font-body uppercase tracking-wider text-xs py-2.5 rounded-sm hover:bg-gold hover:text-ink transition-colors duration-300 disabled:opacity-50 font-bold flex items-center justify-center gap-2 shadow-md mt-1"
            >
              {loading ? "Verifying..." : "Access Dashboard"}
              {!loading && <ArrowRight size={14} />}
            </button>
          </form>

          <div className="my-3.5 flex items-center justify-center gap-3">
            <div className="h-px bg-gold/20 flex-grow"></div>
            <span className="text-[9px] uppercase tracking-widest text-ink/40 font-bold">Or</span>
            <div className="h-px bg-gold/20 flex-grow"></div>
          </div>

          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full bg-canvas border border-gold/30 text-ink font-body uppercase tracking-wider text-[11px] py-2.5 rounded-sm hover:bg-gold/10 transition-colors duration-300 disabled:opacity-50 font-bold flex items-center justify-center gap-2 shadow-sm"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Sign in with Google
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}
