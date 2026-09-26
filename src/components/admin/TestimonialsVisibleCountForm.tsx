"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  MAX_TESTIMONIALS_VISIBLE,
  MIN_TESTIMONIALS_VISIBLE,
  SETTINGS_KEY_VISIBLE,
  clampVisibleCount,
} from "@/lib/settings/testimonials-limit";
import { getSupabaseEnv } from "@/lib/supabase/env";

export function TestimonialsVisibleCountForm({
  initialCount,
}: {
  initialCount: number;
}) {
  const router = useRouter();
  const [count, setCount] = useState(initialCount);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const configured = getSupabaseEnv().isConfigured;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setMessage(null);
    const next = clampVisibleCount(count);
    setCount(next);

    if (!configured) {
      setMessage(
        `Saved locally for this session preview only. Set NEXT_PUBLIC_TESTIMONIALS_VISIBLE_COUNT=${next} in .env.local (and connect Supabase to persist from admin).`,
      );
      return;
    }

    setSaving(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("site_settings").upsert({
        key: SETTINGS_KEY_VISIBLE,
        value: String(next),
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      setMessage(`Showing ${next} cards on the site.`);
      router.refresh();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Could not save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-border bg-surface p-5 shadow-[var(--shadow-card)]"
    >
      <h3 className="font-heading text-lg font-bold">Cards on homepage</h3>
      <p className="mt-1 text-sm text-muted">
        How many published testimonials appear in the Reviews deck. Admin value
        overrides{" "}
        <code className="rounded bg-bg px-1 text-xs">
          NEXT_PUBLIC_TESTIMONIALS_VISIBLE_COUNT
        </code>{" "}
        in env.
      </p>
      <div className="mt-4 flex flex-wrap items-end gap-3">
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium">Visible count</span>
          <input
            type="number"
            min={MIN_TESTIMONIALS_VISIBLE}
            max={MAX_TESTIMONIALS_VISIBLE}
            value={count}
            onChange={(e) => setCount(Number(e.target.value) || 0)}
            className="w-28 rounded-xl border border-border bg-bg px-3 py-2.5 outline-none focus:border-primary"
          />
        </label>
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save"}
        </button>
      </div>
      <p className="mt-2 text-xs text-muted">
        Allowed range: {MIN_TESTIMONIALS_VISIBLE}–{MAX_TESTIMONIALS_VISIBLE}
      </p>
      {message ? <p className="mt-3 text-sm text-primary">{message}</p> : null}
    </form>
  );
}
