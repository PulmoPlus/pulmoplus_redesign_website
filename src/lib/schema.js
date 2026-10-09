import { SITE } from "@/lib/site";

const abs = (path) => new URL(path, SITE.url).toString();

export const businessSchema = () => ({
  "@context": "https://schema.org",
  "@type": ["MedicalBusiness", "Store"],
  "@id": `${SITE.url}/#business`,
  name: SITE.legalName,
  url: SITE.url,
  logo: abs("/logo/pulmoplus-logo.png"),
  image: abs("/images/og-pulmoplus.jpg"),
  telephone: SITE.phone,
  email: SITE.email,
  priceRange: "AED",
  currenciesAccepted: "AED",
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressCountry: SITE.address.country,
  },
  areaServed: SITE.countries.map(({ name }) => ({ "@type": "Country", name })),
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
  hasMap: SITE.mapsUrl,
  department: {
    "@type": "MedicalBusiness",
    name: `${SITE.name} Qatar`,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.qatarOffice.street,
      addressLocality: SITE.qatarOffice.city,
      addressCountry: SITE.qatarOffice.country,
    },
    hasMap: SITE.qatarOffice.mapsUrl,
  },
});

export const productSchema = (p, category) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: p.name,
  sku: p.slug,
  image: abs(p.image),
  description: p.description,
  brand: { "@type": "Brand", name: p.brand },
  category: category.name,
  additionalProperty: p.specs.map(([name, value]) => ({ "@type": "PropertyValue", name, value })),
  offers: {
    "@type": "Offer",
    url: abs(`/product/${p.slug}`),
    price: p.price,
    priceCurrency: "AED",
    availability: p.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    itemCondition:
      p.condition === "Refurbished" ? "https://schema.org/RefurbishedCondition" : "https://schema.org/NewCondition",
    seller: { "@id": `${SITE.url}/#business` },
    areaServed: SITE.countries.map(({ name }) => ({ "@type": "Country", name })),
  },
});

export const breadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({
    "@type": "ListItem",
    position: i + 1,
    name,
    item: abs(path),
  })),
});

export const faqSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
});
