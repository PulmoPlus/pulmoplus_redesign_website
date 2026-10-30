"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Icon, WhatsAppIcon } from "@/components/ui/Icons";
import { formatAED, waLink } from "@/lib/site";

// "What did your doctor prescribe?" chips that highlight the matching BiPAP cards.
// Cards that don't match stay visible but dimmed, so prices are always comparable.
export default function BipapMatcher({ items, needs }) {
  const [need, setNeed] = useState("all");
  const active = needs.find((n) => n.id === need);
  const matches = (item) => need === "all" || item.fits.includes(need);
  const count = items.filter(matches).length;

  return (
    <div className="lp-matcher" data-filtered={need !== "all"}>
      <div className="lp-need" role="group" aria-label="What did your doctor prescribe?">
        <span className="lp-need-q">My doctor prescribed</span>
        <div className="lp-need-chips">
          {needs.map((n) => (
            <button key={n.id} type="button" aria-pressed={need === n.id} onClick={() => setNeed(n.id)}>
              {n.label}
            </button>
          ))}
        </div>
        <p className="lp-need-hint" aria-live="polite">
          <b>
            {need === "all" ? `${items.length} machines` : `${count} ${count === 1 ? "match" : "matches"}`}
          </b>{" "}
          · {active.hint}
        </p>
      </div>

      <ul className="lp-cards">
        {items.map((p) => {
          const on = matches(p);
          return (
            <li key={p.slug} id={p.id} className="lp-card" data-match={on}>
              <div className="lp-card-media">
                <span className="lp-card-flag">{p.highlight}</span>
                <Image src={p.image} alt={p.name} width={320} height={320} sizes="(max-width: 600px) 70vw, 260px" />
              </div>
              <div className="lp-card-body">
                <small className="lp-card-brand">{p.brand}</small>
                <h3>
                  <Link href={`/product/${p.slug}`}>{p.name}</Link>
                </h3>
                <p className="lp-card-for">{p.bestFor}</p>
                <ul className="lp-modes" aria-label="Modes">
                  {p.modes.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
                <dl className="lp-card-specs">
                  <div>
                    <dt>Noise</dt>
                    <dd>{p.noise || "Ask us"}</dd>
                  </div>
                  <div>
                    <dt>Weight</dt>
                    <dd>{p.weight || "Ask us"}</dd>
                  </div>
                </dl>
                <div className="lp-card-foot">
                  <div className="lp-price">
                    <small>Price</small>
                    <b className="num">{formatAED(p.price)}</b>
                  </div>
                  <span className="lp-stock">
                    <Icon name="check" size={14} width={3} /> {p.inStock ? "In stock" : "On order"}
                  </span>
                </div>
                <div className="lp-card-act">
                  <a
                    className="btn b-wa"
                    href={waLink(
                      `Hi PulmoPlus, I'm interested in the ${p.name} (${formatAED(p.price)}). Ref WEB-LP-BIPAP-${p.slug}`,
                    )}
                  >
                    <WhatsAppIcon size={16} /> Ask on WhatsApp
                  </a>
                  <Link className="btn b-line" href={`/product/${p.slug}`}>
                    Full specs
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
