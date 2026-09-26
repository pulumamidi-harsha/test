import { redirect } from "next/navigation";

/** V2 is now the main site at `/` */
export default function V2RedirectPage() {
  redirect("/");
}
