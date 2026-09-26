import Link from "next/link";
import { Plus } from "lucide-react";
import { DeleteTestimonialButton } from "@/components/admin/DeleteTestimonialButton";
import { TestimonialsVisibleCountForm } from "@/components/admin/TestimonialsVisibleCountForm";
import { fallbackTestimonials } from "@/lib/testimonials/fallback";
import { getAllTestimonialsAdmin } from "@/lib/testimonials/queries";
import { getTestimonialsVisibleCount } from "@/lib/settings/testimonials-limit.server";
import { getSupabaseEnv } from "@/lib/supabase/env";

export default async function TestimonialsAdminPage() {
  const configured = getSupabaseEnv().isConfigured;
  const visibleCount = await getTestimonialsVisibleCount();
  let items = fallbackTestimonials;

  if (configured) {
    try {
      items = await getAllTestimonialsAdmin();
    } catch {
      items = fallbackTestimonials;
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold">Testimonials</h2>
          <p className="mt-1 text-sm text-muted">
            Add, edit, publish, and upload profile photos. Initials show when no photo.
          </p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover"
        >
          <Plus className="h-4 w-4" />
          Add testimonial
        </Link>
      </div>

      <TestimonialsVisibleCountForm initialCount={visibleCount} />

      {!configured ? (
        <p className="rounded-xl border border-accent/30 bg-accent-soft px-4 py-3 text-sm">
          Showing local fallback data until Supabase is connected.
        </p>
      ) : null}

      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-border bg-bg text-xs uppercase tracking-[0.12em] text-muted">
            <tr>
              <th className="px-4 py-3 font-semibold">Person</th>
              <th className="px-4 py-3 font-semibold">Company / product</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const initials = item.name
                .split(" ")
                .map((p) => p[0])
                .join("")
                .slice(0, 2);
              return (
                <tr key={item.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {item.avatarUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.avatarUrl}
                          alt=""
                          className="h-9 w-9 rounded-full object-cover"
                        />
                      ) : (
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                          {initials}
                        </span>
                      )}
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-xs text-muted">{item.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p>{item.company || "—"}</p>
                    <p className="text-xs text-muted">{item.product || "—"}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        item.isPublished
                          ? "rounded-full bg-primary-soft px-2 py-0.5 text-xs font-semibold text-primary"
                          : "rounded-full bg-surface-muted px-2 py-0.5 text-xs font-semibold text-muted"
                      }
                    >
                      {item.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/testimonials/${item.id}`}
                        className="rounded-full border border-border px-3 py-1 text-xs font-semibold hover:bg-primary-soft"
                      >
                        Edit
                      </Link>
                      {configured ? <DeleteTestimonialButton id={item.id} /> : null}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
