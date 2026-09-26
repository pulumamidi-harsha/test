"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { getSupabaseEnv } from "@/lib/supabase/env";

type Step = "password" | "mfa" | "mfa-enroll";

export default function AdminLoginPage() {
  const router = useRouter();
  const search = useSearchParams();
  const nextPath = search.get("next") || "/admin";

  const [step, setStep] = useState<Step>("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [factorId, setFactorId] = useState<string | null>(null);
  const [qr, setQr] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const configured = getSupabaseEnv().isConfigured;

  useEffect(() => {
    if (!configured) return;
    (async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase.auth.getSession();
        if (data.session) router.replace(nextPath);
      } catch {
        /* ignore */
      }
    })();
  }, [configured, nextPath, router]);

  async function onPassword(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const supabase = createClient();
      const { error: signError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signError) throw signError;

      const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
      if (aal?.currentLevel === "aal2" || aal?.nextLevel !== "aal2") {
        router.replace(nextPath);
        router.refresh();
        return;
      }

      const { data: factors } = await supabase.auth.mfa.listFactors();
      const totp = factors?.totp?.[0];
      if (totp) {
        setFactorId(totp.id);
        setStep("mfa");
      } else {
        const { data: enroll, error: enrollError } =
          await supabase.auth.mfa.enroll({ factorType: "totp", friendlyName: "Nexora Admin" });
        if (enrollError) throw enrollError;
        setFactorId(enroll.id);
        setQr(enroll.totp.qr_code);
        setSecret(enroll.totp.secret);
        setStep("mfa-enroll");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  async function onMfa(e: FormEvent) {
    e.preventDefault();
    if (!factorId) return;
    setError(null);
    setLoading(true);
    try {
      const supabase = createClient();
      const { data: challenge, error: challengeError } =
        await supabase.auth.mfa.challenge({ factorId });
      if (challengeError) throw challengeError;

      const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId,
        challengeId: challenge.id,
        code: otp.trim(),
      });
      if (verifyError) throw verifyError;

      router.replace(nextPath);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "MFA verification failed");
    } finally {
      setLoading(false);
    }
  }

  if (!configured) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
        <h1 className="font-heading text-xl font-bold">Admin login</h1>
        <p className="mt-3 text-sm text-muted">
          Supabase is not configured yet. Add{" "}
          <code className="rounded bg-surface-muted px-1">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
          <code className="rounded bg-surface-muted px-1">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to{" "}
          <code className="rounded bg-surface-muted px-1">.env.local</code>, then run the SQL in{" "}
          <code className="rounded bg-surface-muted px-1">supabase/migrations/</code>.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <h1 className="font-heading text-xl font-bold">
        {step === "password" && "Admin login"}
        {step === "mfa" && "Two-factor authentication"}
        {step === "mfa-enroll" && "Set up authenticator"}
      </h1>
      <p className="mt-1 text-sm text-muted">
        {step === "password" && "Sign in to manage testimonials and view analytics."}
        {step === "mfa" && "Enter the 6-digit code from your authenticator app."}
        {step === "mfa-enroll" &&
          "Scan the QR with Google Authenticator / 1Password, then enter the code."}
      </p>

      {error ? (
        <p className="mt-4 rounded-lg border border-coral/30 bg-coral/10 px-3 py-2 text-sm text-coral">
          {error}
        </p>
      ) : null}

      {step === "password" ? (
        <form onSubmit={onPassword} className="mt-6 space-y-4">
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium">Email</span>
            <input
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-border bg-bg px-3 py-2.5 outline-none focus:border-primary"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium">Password</span>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-border bg-bg px-3 py-2.5 outline-none focus:border-primary"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Continue"}
          </button>
        </form>
      ) : (
        <form onSubmit={onMfa} className="mt-6 space-y-4">
          {step === "mfa-enroll" && qr ? (
            <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-bg p-4">
              {/* QR is an SVG data URL from Supabase */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qr} alt="MFA QR code" className="h-44 w-44" />
              {secret ? (
                <p className="break-all text-center text-xs text-muted">
                  Manual key: <span className="font-mono text-text">{secret}</span>
                </p>
              ) : null}
            </div>
          ) : null}
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium">Authentication code</span>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full rounded-xl border border-border bg-bg px-3 py-2.5 tracking-[0.3em] outline-none focus:border-primary"
              placeholder="••••••"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover disabled:opacity-60"
          >
            {loading ? "Verifying…" : "Verify"}
          </button>
        </form>
      )}
    </div>
  );
}
