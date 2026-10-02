import ProductBrowser from "@/components/product/ProductBrowser";
import { products, toIndexItem } from "@/lib/catalog";

export const metadata = {
  title: "Search products",
  robots: { index: false, follow: true },
};

export default async function SearchPage({ searchParams }) {
  const raw = (await searchParams).q;
  const q = (Array.isArray(raw) ? raw[0] : raw || "").trim().slice(0, 80);
  return (
    <div className="wrap" style={{ paddingBlock: "28px 64px" }}>
      <ProductBrowser
        key={q}
        index={products.map(toIndexItem)}
        query={q}
        isSearch
        heading={q ? `Results for “${q}”` : "All products"}
      />
    </div>
  );
}
