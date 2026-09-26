import { Suspense } from "react";
import AdminLoginPage from "./AdminLoginClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-sm text-muted">Loading…</div>}>
      <AdminLoginPage />
    </Suspense>
  );
}
