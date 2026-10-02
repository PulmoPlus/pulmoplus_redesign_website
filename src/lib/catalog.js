import products from "@/data/products";
import categories from "@/data/categories";

// Related categories used to fill "similar products" when a category is small.
const RELATED = {
  "portable-oxygen": ["oxygen-and-nebuliser"],
  "oxygen-and-nebuliser": ["portable-oxygen"],
  cpap: ["bipap"],
  bipap: ["cpap", "ventilator"],
  ventilator: ["bipap"],
};

export const BEST_SELLERS = [
  "inogen-rove-6",
  "resmed-airsense-11",
  "philips-respironics-bipap-s-t",
  "resmed-airmini",
  "simplygo-mini",
  "lumis-150",
  "resmed-astral-150",
  "philips-everflo-oxygen-concentrator",
];

export const getProduct = (slug) => products.find((p) => p.slug === slug);
export const getCategory = (slug) => categories.find((c) => c.slug === slug);
export const getCategoryByPath = (path) => categories.find((c) => c.path === `/${path}`);
export const productsIn = (slug) => products.filter((p) => p.category === slug);
export const productPath = (p) => `/product/${p.slug}`;

export function getSpec(product, pattern) {
  const row = product.specs.find(([label]) => pattern.test(label));
  return row ? row[1] : null;
}

// First clause of a spec value, e.g. "2.2 kg (4.8 lbs) with single battery; ..." -> "2.2 kg".
export function shortSpec(value) {
  if (!value) return null;
  return value.split(/[;(]/)[0].trim().slice(0, 28);
}

export function keyFacts(product) {
  const facts = [];
  const weight = shortSpec(getSpec(product, /weight/i));
  if (weight) facts.push(weight);
  const noise = shortSpec(getSpec(product, /noise|sound/i));
  if (noise) facts.push(noise);
  const battery = getSpec(product, /battery/i);
  const hours = battery && battery.match(/(\d+(?:\.\d+)?)\s*hours?/i);
  if (hours) facts.push(`up to ${hours[1]} h battery`);
  if (/yes/i.test(getSpec(product, /faa/i) || "")) facts.push("FAA approved");
  return facts.slice(0, 3);
}

export function similarProducts(product, limit = 6) {
  const same = products.filter((p) => p.category === product.category && p.slug !== product.slug);
  const related = products.filter((p) => (RELATED[product.category] || []).includes(p.category));
  return [...same, ...related].slice(0, limit);
}

// Slim fields shipped to the browser for header search and client-side filtering.
export function toIndexItem(p) {
  const { slug, name, brand, category, price, image, condition, description } = p;
  return { slug, name, brand, category, price, image, condition, description, facts: keyFacts(p) };
}

export { products, categories };

// Lowest and highest price in a list, for FAQ answers that must stay in sync with the catalogue.
export function priceRange(list) {
  const prices = list.map((p) => p.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

// Three labelled facts for the hero showcase.
export function heroFacts(p) {
  const category = getCategory(p.category);
  return [
    ["Weight", shortSpec(getSpec(p, /weight/i)) || "Ask us"],
    ["Noise", shortSpec(getSpec(p, /noise|sound/i)) || "Ask us"],
    [category.short, p.condition === "Refurbished" ? "Refurbished" : "In stock"],
  ];
}
