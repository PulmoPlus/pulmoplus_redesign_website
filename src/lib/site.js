// Business facts used across the site. Change them here, not in components.
export const SITE = {
  name: "PulmoPlus",
  legalName: "PulmoPlus Dubai",
  url: "https://www.pulmoplus.com",
  phone: "+971 54 447 9123",
  phoneHref: "tel:+971544479123",
  whatsapp: "971544479123",
  email: "pulmoplus11@gmail.com",
  address: {
    street: "Port Saeed, Deira",
    city: "Dubai",
    country: "AE",
    countryName: "United Arab Emirates",
  },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Port+Saeed+Deira+Dubai",
  reviewsUrl: "https://www.google.com/maps/search/PulmoPlus+Dubai",
  hours: "Open 24/7",
  emirates: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Fujairah", "Umm Al Quwain"],
  brands: ["ResMed", "Philips", "Inogen", "Löwenstein", "BMC", "Longfian", "Aerogen"],
};

export function waLink(message) {
  const base = `https://wa.me/${SITE.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

const aed = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
export const formatAED = (n) => `AED ${aed.format(n)}`;

// Pre-written WhatsApp messages carry a short ref so the team can see which page a lead came from.
export const productWaLink = (p) =>
  waLink(`Hi PulmoPlus, I'm interested in the ${p.name} (${formatAED(p.price)}). Ref WEB-${p.slug}`);
export const rentWaLink = (what, ref = "WEB-RENT") =>
  waLink(`Hi PulmoPlus, what is the rental rate for ${what}? Ref ${ref}`);

const OG_IMAGE = {
  url: "/images/og-pulmoplus.jpg",
  width: 1200,
  height: 630,
  alt: "PulmoPlus respiratory care in Dubai",
};

// Per-page metadata with canonical URL and a complete Open Graph block
// (Next.js replaces, not merges, the layout's openGraph object).
export function pageMeta({ title, description, path, image, absoluteTitle = false }) {
  const images = image ? [{ url: image, alt: typeof title === "string" ? title : SITE.name }] : [OG_IMAGE];
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: SITE.name, locale: "en_AE", url: path, title, description, images },
  };
}
