import Image from "next/image";
import Link from "next/link";
import categories from "@/data/categories";
import { formatAED, productWaLink } from "@/lib/site";
import { WhatsAppIcon } from "@/components/ui/Icons";

const shortName = Object.fromEntries(categories.map((c) => [c.slug, c.short]));

// Works in server and client trees: takes a slim index item (see toIndexItem).
export default function ProductCard({ product: p, priority = false }) {
  const href = `/product/${p.slug}`;
  const refurbished = p.condition === "Refurbished";
  return (
    <article className="pcard">
      <Link className="pic" href={href} tabIndex={-1} aria-hidden="true">
        <span className={refurbished ? "tag ref" : "tag"}>{refurbished ? "Refurbished" : "In stock"}</span>
        <Image
          src={p.image}
          alt={p.name}
          width={320}
          height={320}
          sizes="(max-width: 600px) 45vw, (max-width: 1060px) 30vw, 280px"
          priority={priority}
        />
      </Link>
      <div className="body">
        <div className="brand">
          {p.brand} · {shortName[p.category]}
        </div>
        <h3>
          <Link href={href}>{p.name}</Link>
        </h3>
        {p.facts?.length > 0 && (
          <div className="chips">
            {p.facts.map((f) => (
              <span key={f}>{f}</span>
            ))}
          </div>
        )}
        <div className="price">
          <b className="num">{formatAED(p.price)}</b>
          <small>Rent available</small>
        </div>
        <div className="act">
          <Link className="btn b-blue" href={href} aria-label={`View details of ${p.name}`}>
            View details
          </Link>
          <a className="btn b-wa icon-btn" href={productWaLink(p)} aria-label={`WhatsApp about ${p.name}`}>
            <WhatsAppIcon />
          </a>
        </div>
      </div>
    </article>
  );
}
