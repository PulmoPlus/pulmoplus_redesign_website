import { notFound } from "next/navigation";
import ProductBrowser from "@/components/product/ProductBrowser";
import Faq from "@/components/ui/Faq";
import PageHero from "@/components/ui/PageHero";
import { categories, getCategoryByPath, priceRange, productsIn, toIndexItem } from "@/lib/catalog";
import { formatAED, pageMeta } from "@/lib/site";

// Keyword URLs such as /cpap-machines-dubai. Anything else at this level is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.path.slice(1) }));
}

export async function generateMetadata({ params }) {
  const c = getCategoryByPath((await params).category);
  if (!c) return {};
  return pageMeta({ title: c.title, description: c.description, path: c.path, image: c.image, absoluteTitle: true });
}

function categoryFaqs(c, list) {
  const { min, max } = priceRange(list);
  const noun = c.plural;
  return [
    {
      q: `How much do ${noun} cost in Dubai?`,
      a:
        min === max
          ? `Our ${noun} are ${formatAED(min)}. Rental is also available, message us on WhatsApp for the rate.`
          : `Our ${noun} range from ${formatAED(min)} to ${formatAED(max)}, depending on the model. Rental is also available, message us on WhatsApp for the rate.`,
    },
    {
      q: `Can I rent ${noun} in Dubai?`,
      a: "Yes, by the day, week or month. Message us on WhatsApp with the model and your area for the current rate and delivery time.",
    },
    {
      q: "Do you deliver and set it up at home?",
      a: "Yes. We deliver across the UAE and Qatar, and a technician sets the machine up as prescribed and shows the family how to use and clean it.",
    },
  ];
}

export default async function CategoryPage({ params }) {
  const c = getCategoryByPath((await params).category);
  if (!c) notFound();
  const list = productsIn(c.slug);

  return (
    <>
      <PageHero
        crumbs={[
          ["Products", "/products"],
          [c.name, c.path],
        ]}
        eyebrow={`${list.length} models in stock`}
        title={c.h1}
      >
        <p>{c.intro}</p>
      </PageHero>
      <div className="wrap" style={{ paddingBlock: "28px 32px" }}>
        <ProductBrowser index={list.map(toIndexItem)} category={c.slug} />
      </div>
      <section className="sec" style={{ paddingTop: 32 }}>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="eyebrow">FAQ</div>
              <h2>{c.name} in Dubai: common questions</h2>
            </div>
          </div>
          <Faq faqs={categoryFaqs(c, list)} />
        </div>
      </section>
    </>
  );
}
