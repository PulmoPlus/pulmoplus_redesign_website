// Client-safe search: works on the slim product index, never imports the full catalogue.
import categories from "@/data/categories";

// What people type -> which categories they mean.
const SYNONYMS = [
  [/ventilat|life ?support|breathing support|respirator/, ["ventilator"]],
  [/bipap|bi-pap|bilevel|copd|aircurve|lumis/, ["bipap"]],
  [/cpap|c-pap|sleep|snor|apnea|apnoea|airsense|dreamstation|airmini|breathing machine/, ["cpap"]],
  [/portable|travel|battery|mini oxygen|compact|inogen|simplygo|flight|fly/, ["portable-oxygen"]],
  [/oxygen|oxygenator|concentrator|\bo2\b/, ["portable-oxygen", "oxygen-and-nebuliser"]],
  [/nebul/, ["oxygen-and-nebuliser"]],
];

export function searchProducts(query, index) {
  const q = query.toLowerCase().trim();
  if (!q) return { results: index, categories: [] };

  const matched = new Set();
  for (const [re, cats] of SYNONYMS) if (re.test(q)) cats.forEach((c) => matched.add(c));
  const words = q.split(/\s+/).filter((w) => w.length > 1);

  const results = index
    .map((p) => {
      const name = p.name.toLowerCase();
      const brand = p.brand.toLowerCase();
      const hay = `${name} ${brand} ${p.description}`.toLowerCase();
      let score = name.includes(q) ? 10 : 0;
      for (const w of words) {
        if (name.includes(w)) score += 4;
        if (brand.includes(w)) score += 4;
        if (hay.includes(w)) score += 1;
      }
      if (matched.has(p.category)) score += 6;
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.p);

  return { results, categories: categories.filter((c) => matched.has(c.slug)) };
}
