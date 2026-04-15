"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${location.origin}/inbox` },
    });

    setLoading(false);
    if (authError) {
      setError(authError.message);
    } else {
      setSent(true);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg-base)] flex items-center justify-center px-4">
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[var(--accent)] opacity-[0.03] blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm relative"
      >
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="font-display text-2xl font-semibold text-[var(--text-primary)] mb-1">
            Content OS
          </p>
          <p className="text-xs text-[var(--text-tertiary)] tracking-widest uppercase">
            Smiley Solution · Internal
          </p>
        </div>

        {/* Card */}
        <div className="card p-8">
          <AnimatePresence mode="wait">
            {!sent ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs text-[var(--text-secondary)] mb-2 tracking-wide"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@smiley.studio"
                    required
                    className="w-full bg-[var(--bg-overlay)] border border-[var(--border-default)] rounded-md px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] outline-none focus:border-[var(--accent)] transition-colors"
                  />
                </div>

                {error && (
                  <p className="text-xs text-red-400">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[var(--accent)] text-black font-semibold text-sm py-3 rounded-md transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {loading ? "Sending…" : "Send magic link"}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="sent"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-4 space-y-3"
              >
                <div className="text-2xl">✉️</div>
                <p className="text-sm text-[var(--text-primary)] font-medium">
                  Check your inbox
                </p>
                <p className="text-xs text-[var(--text-secondary)]">
                  We sent a magic link to{" "}
                  <span className="text-[var(--accent)]">{email}</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
