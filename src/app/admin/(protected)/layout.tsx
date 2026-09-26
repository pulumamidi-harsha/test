import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { getSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isConfigured } = getSupabaseEnv();
  let email: string | null = null;

  if (isConfigured) {
    try {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) redirect("/admin/login");
      email = user.email ?? null;

      const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
      if (aal?.nextLevel === "aal2" && aal.currentLevel !== "aal2") {
        redirect("/admin/login?next=/admin");
      }
    } catch {
      redirect("/admin/login");
    }
  }

  return <AdminShell email={email}>{children}</AdminShell>;
}
