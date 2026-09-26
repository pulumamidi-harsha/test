import Link from "next/link";
import { Eye, MessageSquareQuote, Users } from "lucide-react";
import { TestimonialsVisibleCountForm } from "@/components/admin/TestimonialsVisibleCountForm";
import { getSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import { getTestimonialsVisibleCount } from "@/lib/settings/testimonials-limit.server";

async function getAnalytics() {
  const { isConfigured } = getSupabaseEnv();
  if (!isConfigured) {
    return { today: 0, week: 0, testimonials: 0, published: 0 };
  }

  try {
    const supabase = await createClient();
    const today = new Date().toISOString().slice(0, 10);
    const weekAgo = new Date(Date.now() - 6 * 86400000).toISOString().slice(0, 10);

    const [{ data: todayRow }, { data: weekRows }, { count: total }, { count: published }] =
      await Promise.all([
        supabase.from("page_views_daily").select("views").eq("day", today).maybeSingle(),
        supabase
          .from("page_views_daily")
          .select("views")
          .gte("day", weekAgo)
          .lte("day", today),
        supabase.from("testimonials").select("*", { count: "exact", head: true }),
        supabase
          .from("testimonials")
          .select("*", { count: "exact", head: true })
          .eq("is_published", true),
      ]);

    const week = (weekRows ?? []).reduce((sum, row) => sum + (row.views ?? 0), 0);

    return {
      today: todayRow?.views ?? 0,
      week,
      testimonials: total ?? 0,
      published: published ?? 0,
    };
  } catch {
    return { today: 0, week: 0, testimonials: 0, published: 0 };
  }
}

export default async function AdminDashboardPage() {
  const stats = await getAnalytics();
  const configured = getSupabaseEnv().isConfigured;
  const visibleCount = await getTestimonialsVisibleCount();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold">Dashboard</h2>
          <p className="mt-1 text-sm text-muted">
            Site traffic overview and content shortcuts.
          </p>
        </div>
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold transition hover:bg-primary-soft"
        >
          <Eye className="h-4 w-4" />
          View live site
        </Link>
      </div>

      {!configured ? (
        <div className="rounded-2xl border border-accent/30 bg-accent-soft p-5 text-sm">
          <p className="font-semibold text-accent-foreground">Connect Supabase</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-muted">
            <li>
              Create a project at supabase.com and paste URL + anon key into{" "}
              <code className="rounded bg-surface px-1">.env.local</code>
            </li>
            <li>
              Run SQL in{" "}
              <code className="rounded bg-surface px-1">supabase/migrations/</code>{" "}
              (001 then 002)
            </li>
            <li>Create an Auth user (email/password) for yourself</li>
            <li>Optional: enable MFA in Auth settings</li>
          </ol>
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Views today",
            value: stats.today,
            icon: Users,
            hint: "Page views recorded today",
          },
          {
            label: "Views (7 days)",
            value: stats.week,
            icon: Users,
            hint: "Rolling week total",
          },
          {
            label: "Testimonials",
            value: stats.testimonials,
            icon: MessageSquareQuote,
            hint: "All rows in database",
          },
          {
            label: "Published",
            value: stats.published,
            icon: Eye,
            hint: "Visible on the website",
          },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="rounded-2xl border border-border bg-surface p-5 shadow-[var(--shadow-card)]"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  {card.label}
                </p>
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <p className="mt-3 font-heading text-3xl font-bold">{card.value}</p>
              <p className="mt-1 text-xs text-muted">{card.hint}</p>
            </div>
          );
        })}
      </div>

      <TestimonialsVisibleCountForm initialCount={visibleCount} />

      <div className="rounded-2xl border border-border bg-surface p-5">
        <h3 className="font-heading text-lg font-bold">Quick actions</h3>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/admin/testimonials"
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover"
          >
            Manage testimonials
          </Link>
          <Link
            href="/admin/testimonials/new"
            className="rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-primary-soft"
          >
            Add testimonial
          </Link>
        </div>
      </div>
    </div>
  );
}
