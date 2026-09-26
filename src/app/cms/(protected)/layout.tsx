import { CmsAuthGate } from "@/components/cms/CmsAuthGate";

export default function CmsProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CmsAuthGate>{children}</CmsAuthGate>;
}
