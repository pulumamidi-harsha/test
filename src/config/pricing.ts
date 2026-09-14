export const packages = [
  {
    id: "starter",
    name: "Starter",
    price: "₹14,999",
    note: "from",
    popular: false,
    bestFor: "Shops, small clinics, simple business sites",
    includes: [
      "Logo design (basic brand kit)",
      "5–7 page custom website",
      "Domain (1st year) + DNS setup",
      "Hosting setup + SSL",
      "WhatsApp & click-to-call CTA",
      "1 month care included",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    price: "₹29,999",
    note: "from",
    popular: true,
    bestFor: "Restaurants, hotels, hospitals — most popular",
    includes: [
      "Everything in Starter",
      "Custom UI with stronger visuals",
      "Enquiry / booking WhatsApp flows",
      "Local SEO basics + Google Business guidance",
      "Gallery / menu / services sections as needed",
      "3 months care included",
    ],
  },
  {
    id: "business",
    name: "Business",
    price: "₹49,999+",
    note: "from",
    popular: false,
    bestFor: "Ecommerce, multi-page, chatbot, advanced needs",
    includes: [
      "Everything in Growth",
      "Ecommerce module or advanced forms",
      "Optional AI chatbot setup",
      "Performance & analytics setup",
      "Priority support during build",
      "Ongoing maintenance plan options",
    ],
  },
] as const;

export const addOns = [
  { name: "AI Chatbot setup", price: "from ₹7,999" },
  { name: "Extra pages", price: "from ₹1,499 / page" },
  { name: "Ecommerce module", price: "from ₹19,999" },
  { name: "Multilingual (Kannada / English / Telugu)", price: "Custom quote" },
  { name: "Extra maintenance months", price: "from ₹1,999 / month" },
  { name: "Content writing support", price: "Custom quote" },
] as const;
