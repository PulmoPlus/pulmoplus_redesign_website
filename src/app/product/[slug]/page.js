import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";
import ProductTabs from "@/components/product/ProductTabs";
import { Icon, WhatsAppIcon } from "@/components/ui/Icons";
import JsonLd from "@/components/ui/JsonLd";
import {
  getCategory,
  getProduct,
  getSpec,
  products,
  productsIn,
  shortSpec,
  similarProducts,
  toIndexItem,
} from "@/lib/catalog";
import { breadcrumbSchema, productSchema } from "@/lib/schema";
import { formatAED, pageMeta, productWaLink, rentWaLink, SITE } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return pageMeta({
    title: `${p.name} Price in Dubai (${formatAED(p.price)})`,
    description: `${p.name} by ${p.brand} for ${formatAED(p.price)} in Dubai and the UAE. ${p.description}`.slice(
      0,
      158,
    ),
    path: `/product/${p.slug}`,
    image: p.image,
  });
}

const KEY_SPECS = [
  ["Weight", /weight/i],
  ["Noise", /noise|sound/i],
  ["Warranty", /warranty/i],
  ["Battery", /battery/i],
  ["Modes", /mode/i],
  ["Flow", /flow|output/i],
];

const val = (p, re) => shortSpec(getSpec(p, re));

export default async function ProductPage({ params }) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const c = getCategory(p.category);
  const refurbished = p.condition === "Refurbished";
  const keys = KEY_SPECS.map(([label, re]) => [label, val(p, re)])
    .filter(([, v]) => v)
    .slice(0, 3);
  const warranty = getSpec(p, /warranty/i);
  const compare = [p, ...productsIn(p.category).filter((x) => x.slug !== p.slug)].slice(0, 4);
  const similar = similarProducts(p).map(toIndexItem);
  const crumbs = [
    ["Home", "/"],
    ["Products", "/products"],
    [c.name, c.path],
    [p.name, `/product/${p.slug}`],
  ];

  const faqs = [
    [
      `Is the ${p.name} available to rent in Dubai?`,
      "Yes, message us on WhatsApp for the daily, weekly or monthly rate and delivery time.",
    ],
    [
      "Do you set it up at home?",
      "Yes. A technician delivers it, sets it up as prescribed and shows you how to use and clean it.",
    ],
    ["What warranty does it have?", warranty || "Brand warranty; the exact term is confirmed at purchase."],
  ];

  const tabs = [
    {
      key: "specs",
      label: "Specifications",
      content: (
        <div className="tablewrap" style={{ border: 0 }}>
          <table className="spectable">
            <tbody>
              {p.specs.map(([k, v]) => (
                <tr key={k}>
                  <th scope="row">{k}</th>
                  <td>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
    },
    {
      key: "features",
      label: "Features",
      content: (
        <ul className="feats">
          {p.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      ),
    },
    {
      key: "overview",
      label: "Overview",
      content: (
        <div className="prose">
          <p style={{ marginTop: 0 }}>{p.description}</p>
          <h2>Buying the {p.name} from PulmoPlus</h2>
          <p>
            We deliver the {p.name} in Dubai and across the UAE. A technician sets it up as prescribed, shows the family
            how to use and clean it, and our team stays on WhatsApp for questions, supplies and servicing.
            {refurbished && " This unit is refurbished: inspected, cleaned and tested before delivery."}
          </p>
        </div>
      ),
    },
    {
      key: "faq",
      label: "FAQ",
      content: (
        <div className="faq">
          {faqs.map(([q, a], i) => (
            <details key={q} open={i === 0}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      ),
    },
  ];

  const row = (label, fn) => (
    <tr>
      <th scope="row">{label}</th>
      {compare.map((x, i) => (
        <td key={x.slug} className={i === 0 ? "cur" : undefined}>
          {fn(x) || "—"}
        </td>
      ))}
    </tr>
  );

  return (
    <div className="wrap">
      <JsonLd data={productSchema(p, c)} />
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <nav className="crumbs" aria-label="Breadcrumb">
        {crumbs.slice(0, -1).map(([label, path]) => (
          <span key={path} style={{ display: "contents" }}>
            <Link href={path}>{label}</Link>
            <span aria-hidden="true">›</span>
          </span>
        ))}
        <span aria-current="page">{p.name}</span>
      </nav>

      <div className="pd">
        <div className="gallery single">
          <div className="mainpic">
            <span className={refurbished ? "tag ref" : "tag"}>{refurbished ? "Refurbished" : "In stock"}</span>
            <Image
              src={p.image}
              alt={`${p.name} in Dubai`}
              width={560}
              height={560}
              sizes="(max-width: 900px) 90vw, 560px"
              priority
            />
          </div>
        </div>
        <div className="buybox">
          <div className="brandline">
            <span className="eyebrow">{p.brand}</span>
            {p.inStock && <span className="tag">In stock</span>}
            {refurbished && <span className="tag ref">Refurbished</span>}
          </div>
          <h1>{p.name}</h1>
          <p className="lead">{p.description}</p>
          {keys.length > 0 && (
            <div className="keyspecs">
              {keys.map(([k, v]) => (
                <div key={k}>
                  <small>{k}</small>
                  <b>{v}</b>
                </div>
              ))}
            </div>
          )}
          <div className="pricebox">
            <div className="row">
              <span className="big num">{formatAED(p.price)}</span>
              <span className="vat">Price in UAE dirhams</span>
            </div>
            <div className="ctas">
              <a className="btn b-wa full" href={productWaLink(p)}>
                <WhatsAppIcon /> Buy on WhatsApp
              </a>
              <a className="btn b-line" href={rentWaLink(`the ${p.name}`, `WEB-RENT-${p.slug}`)}>
                Ask rent price
              </a>
              <a className="btn b-line" href={SITE.phoneHref}>
                Call us
              </a>
            </div>
          </div>
          <div className="deliv">
            <div>
              <i>
                <Icon name="check" size={18} width={2.4} />
              </i>
              <span>
                <b>Delivery and setup at home</b> in Dubai, delivery across the UAE
              </span>
            </div>
            <div>
              <i>
                <Icon name="check" size={18} width={2.4} />
              </i>
              <span>
                <b>{shortSpec(warranty) || "Brand"} warranty</b> and our{" "}
                <Link href="/return-policy">return policy</Link>
              </span>
            </div>
            <div>
              <i>
                <Icon name="check" size={18} width={2.4} />
              </i>
              <span>
                <b>WhatsApp support 24/7</b> for setup, supplies and servicing
              </span>
            </div>
          </div>
        </div>
      </div>

      <ProductTabs tabs={tabs} />

      {compare.length > 1 && (
        <section style={{ paddingBlock: 24 }}>
          <div className="sec-head">
            <div>
              <div className="eyebrow">Compare</div>
              <h2>{p.name} vs similar models</h2>
            </div>
          </div>
          <div className="tablewrap">
            <table className="cmp">
              <thead>
                <tr>
                  <td />
                  {compare.map((x, i) => (
                    <th key={x.slug} scope="col" className={i === 0 ? "cur" : undefined}>
                      <Image src={x.image} alt="" width={60} height={60} />
                      {i === 0 ? x.name : <Link href={`/product/${x.slug}`}>{x.name}</Link>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {row("Price", (x) => formatAED(x.price))}
                {row("Brand", (x) => x.brand)}
                {row("Weight", (x) => val(x, /weight/i))}
                {row("Noise", (x) => val(x, /noise|sound/i))}
                {row("Battery", (x) => val(x, /battery/i))}
                {row("Warranty", (x) => val(x, /warranty/i))}
                {row("Condition", (x) => x.condition)}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section style={{ paddingBlock: "24px 72px" }}>
        <div className="sec-head">
          <div>
            <div className="eyebrow">You may also like</div>
            <h2>Similar products</h2>
          </div>
          <Link className="btn b-line" href={c.path}>
            All {c.short}
          </Link>
        </div>
        <div className="rail">
          {similar.map((x) => (
            <ProductCard key={x.slug} product={x} />
          ))}
        </div>
      </section>
    </div>
  );
}
