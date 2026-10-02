"use client";

import { useState } from "react";
import ProductCard from "@/components/product/ProductCard";

const TABS = [
  ["all", "All"],
  ["portable-oxygen", "Portable oxygen"],
  ["cpap", "CPAP"],
  ["bipap", "BiPAP"],
  ["ventilator", "Ventilators"],
];

export default function BestSellers({ best, all }) {
  const [tab, setTab] = useState("all");
  const list = (tab === "all" ? best : all.filter((p) => p.category === tab)).slice(0, 8);
  return (
    <>
      <div className="sec-head">
        <div>
          <div className="eyebrow">Best sellers in Dubai</div>
          <h2>Machines with clear AED prices</h2>
          <p>Every price is shown. Tap WhatsApp for delivery time or the rental rate.</p>
        </div>
        <div className="tabs" role="group" aria-label="Filter best sellers">
          {TABS.map(([key, label]) => (
            <button key={key} type="button" aria-pressed={tab === key} onClick={() => setTab(key)}>
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="pgrid">
        {list.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </>
  );
}
