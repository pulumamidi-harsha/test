"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ExternalLink,
  LayoutDashboard,
  LogOut,
  MessageSquareQuote,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
];

export function AdminShell({
  children,
  email,
}: {
  children: React.ReactNode;
  email?: string | null;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function signOut() {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      /* ignore */
    }
    router.replace("/admin/login");
    router.refresh();
  }

  const Sidebar = (
    <aside className="flex h-full w-64 flex-col border-r border-border bg-[#0c3536] text-[#f6f1e8]">
      <div className="border-b border-white/10 px-4 py-4">
        <BrandLogo linked={false} className="brightness-0 invert" />
        <p className="mt-2 text-xs text-white/55">Admin</p>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {nav.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                active
                  ? "bg-accent text-accent-foreground"
                  : "text-white/80 hover:bg-white/10 hover:text-white",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/10 p-3">
        {email ? (
          <p className="mb-2 truncate px-1 text-xs text-white/50">{email}</p>
        ) : null}
        <button
          type="button"
          onClick={signOut}
          className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-white/80 transition hover:bg-white/10"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-[#f3eee4] text-text">
      <div className="flex min-h-screen">
        <div className="hidden lg:block">{Sidebar}</div>

        {open ? (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 bg-dark/40"
              onClick={() => setOpen(false)}
            />
            <div className="relative z-10 h-full">{Sidebar}</div>
          </div>
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-[#fffcf7]/90 px-4 py-3 backdrop-blur sm:px-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="rounded-lg border border-border p-2 lg:hidden"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
              >
                {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  Dashboard
                </p>
                <h1 className="font-heading text-lg font-bold leading-tight">
                  Nexora Sites Admin
                </h1>
              </div>
            </div>
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition hover:border-primary/30 hover:bg-primary-soft"
            >
              View page
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </header>
          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
