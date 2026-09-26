import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f3eee4] text-text">
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-10">
        <Link href="/" className="mb-8 flex justify-center">
          <BrandLogo linked={false} />
        </Link>
        {children}
      </div>
    </div>
  );
}
