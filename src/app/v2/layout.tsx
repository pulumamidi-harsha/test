/** Passthrough — root layout owns V2 chrome now. /v2 redirects to /. */
export default function V2Layout({ children }: { children: React.ReactNode }) {
  return children;
}
