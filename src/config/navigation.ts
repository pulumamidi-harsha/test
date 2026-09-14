export const mainNav = [
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/#work", label: "Work" },
  { href: "/#why-us", label: "Why us" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/#faq", label: "FAQ" },
] as const;

export const footerNav = {
  services: [
    { href: "/services/website-design-development", label: "New website" },
    { href: "/services/website-design-development", label: "Website revamp" },
    { href: "/services/ecommerce", label: "E-commerce" },
    { href: "/services/maintenance", label: "Maintenance" },
    { href: "/services/logo-branding", label: "Logo & branding" },
    { href: "/services/ai-chatbot", label: "AI chatbot" },
  ],
  industries: [
    { href: "/industries/restaurants", label: "Restaurants" },
    { href: "/industries/hotels-resorts", label: "Hotels & Resorts" },
    { href: "/industries/hospitals-clinics", label: "Hospitals & Clinics" },
    { href: "/industries/shops-ecommerce", label: "E-commerce" },
    { href: "/industries/education", label: "Education" },
    { href: "/industries/real-estate", label: "Real estate" },
    { href: "/industries/beauty", label: "Beauty" },
    { href: "/industries/finance", label: "Finance" },
  ],
  company: [
    { href: "/about", label: "About" },
    { href: "/work", label: "Work" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ],
} as const;
