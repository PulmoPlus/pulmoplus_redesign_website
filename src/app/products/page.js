import ProductBrowser from "@/components/product/ProductBrowser";
import PageHero from "@/components/ui/PageHero";
import { products, toIndexItem } from "@/lib/catalog";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta({
  title: "All Respiratory Products in Dubai: Oxygen, CPAP, BiPAP, Ventilators",
  description:
    "Every oxygen concentrator, CPAP, BiPAP and ventilator we sell in Dubai, with AED prices, key specs, rental options and delivery across the UAE.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <PageHero crumbs={[["Products", "/products"]]} eyebrow="Shop" title="All respiratory and sleep machines">
        <p>
          {products.length} machines with clear AED prices. Delivery and home setup across the UAE, and rental
          available.
        </p>
      </PageHero>
      <div className="wrap" style={{ paddingBlock: "28px 64px" }}>
        <ProductBrowser index={products.map(toIndexItem)} />
      </div>
    </>
  );
}
