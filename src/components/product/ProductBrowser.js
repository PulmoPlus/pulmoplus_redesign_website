"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import categories from "@/data/categories";
import { searchProducts } from "@/lib/search";
import { waLink } from "@/lib/site";
import ProductCard from "./ProductCard";

const byPrice = {
  low: (a, b) => a.price - b.price,
  high: (a, b) => b.price - a.price,
};

function toggle(list, value, on) {
  return on ? [...list, value] : list.filter((v) => v !== value);
}

// Product grid with filters and sort, used by /products, the category pages and /search.
// It is server rendered with the full list, so every product is in the HTML for Google.
export default function ProductBrowser({ index, query = "", category = null, heading, isSearch = false }) {
  const [cats, setCats] = useState([]);
  const [brands, setBrands] = useState([]);
  const [sort, setSort] = useState("rel");
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Filters start open on desktop and closed on phones, where they would push products down.
  useEffect(() => {
    if (window.matchMedia("(min-width: 901px)").matches) setFiltersOpen(true);
  }, []);

  const { results: base, categories: matched } = useMemo(() => {
    if (query) return searchProducts(query, index);
    return { results: category ? index.filter((p) => p.category === category) : index, categories: [] };
  }, [index, query, category]);

  const results = useMemo(() => {
    const list = base.filter(
      (p) => (!cats.length || cats.includes(p.category)) && (!brands.length || brands.includes(p.brand)),
    );
    return sort === "rel" ? list : [...list].sort(byPrice[sort]);
  }, [base, cats, brands, sort]);

  const catsIn = categories.filter((c) => base.some((p) => p.category === c.slug));
  const brandsIn = [...new Set(base.map((p) => p.brand))].sort();
  const suggestion = query && matched[0];

  return (
    <div className="sgrid">
      <details className="filters" open={filtersOpen} onToggle={(e) => setFiltersOpen(e.currentTarget.open)}>
        <summary style={{ fontWeight: 800, cursor: "pointer" }}>Filters and sort</summary>
        {catsIn.length > 1 && (
          <fieldset style={{ border: 0, padding: 0, margin: "16px 0 0" }}>
            <h4>Category</h4>
            {catsIn.map((c) => (
              <label key={c.slug}>
                <input
                  type="checkbox"
                  checked={cats.includes(c.slug)}
                  onChange={(e) => setCats((l) => toggle(l, c.slug, e.target.checked))}
                />
                {c.name} <span className="muted">({base.filter((p) => p.category === c.slug).length})</span>
              </label>
            ))}
          </fieldset>
        )}
        {brandsIn.length > 0 && (
          <fieldset style={{ border: 0, padding: 0, margin: "16px 0 0" }}>
            <h4>Brand</h4>
            {brandsIn.map((b) => (
              <label key={b}>
                <input
                  type="checkbox"
                  checked={brands.includes(b)}
                  onChange={(e) => setBrands((l) => toggle(l, b, e.target.checked))}
                />
                {b}
              </label>
            ))}
          </fieldset>
        )}
        <div>
          <h4>
            <label htmlFor="sort" style={{ display: "inline", padding: 0 }}>
              Sort by
            </label>
          </h4>
          <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="rel">{query ? "Best match" : "Featured"}</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
        </div>
      </details>

      <div style={{ minWidth: 0 }}>
        <div className="sbar">
          {heading ? <h1 style={{ fontSize: "1.6rem" }}>{heading}</h1> : <span />}
          <span className="muted num" aria-live="polite">
            {results.length} product{results.length === 1 ? "" : "s"}
          </span>
        </div>

        {!query && (
          <nav className="tabs" style={{ marginBottom: 18 }} aria-label="Categories">
            <Link className="tab" href="/products" aria-current={!category && !isSearch ? "page" : undefined}>
              All
            </Link>
            {categories.map((c) => (
              <Link key={c.slug} className="tab" href={c.path} aria-current={category === c.slug ? "page" : undefined}>
                {c.short}
              </Link>
            ))}
          </nav>
        )}

        {suggestion && (
          <div className="didyou">
            <span>
              Looking for <b>{suggestion.name}</b>? See the full category with prices and FAQ.
            </span>
            <Link href={suggestion.path}>Open {suggestion.short} page</Link>
          </div>
        )}

        {results.length ? (
          <div className="pgrid" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))" }}>
            {results.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <b>{query ? `No exact match for “${query}”.` : "No products match these filters."}</b>
            <p>Try “oxygen”, “CPAP” or a brand like “ResMed”, or ask us on WhatsApp and we will find it.</p>
            <a
              className="btn b-wa"
              href={waLink(`Hi PulmoPlus, I'm looking for: ${query || "a machine"}. Ref WEB-SEARCH`)}
            >
              Ask on WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
