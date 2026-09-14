import { WorkClient } from "./WorkClient";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Work",
  description:
    "Portfolio of website directions for restaurants, hotels, clinics, shops, cloud kitchens, and homestays.",
  path: "/work",
});

export default function WorkPage() {
  return <WorkClient />;
}
