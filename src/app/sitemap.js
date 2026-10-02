import { categories, products } from "@/lib/catalog";
import { SITE } from "@/lib/site";

export default function sitemap() {
  const url = (path) => `${SITE.url}${path}`;
  const lastModified = new Date();
  return [
    { url: url("/"), lastModified, changeFrequency: "weekly", priority: 1 },
    ...categories.map((c) => ({ url: url(c.path), lastModified, changeFrequency: "weekly", priority: 0.9 })),
    { url: url("/products"), lastModified, changeFrequency: "weekly", priority: 0.8 },
    ...products.map((p) => ({
      url: url(`/product/${p.slug}`),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    })),
    ...["/services", "/about", "/contact"].map((p) => ({
      url: url(p),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    })),
    { url: url("/return-policy"), lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
