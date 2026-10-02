import Link from "next/link";
import { categories } from "@/lib/catalog";
import { waLink } from "@/lib/site";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="empty">
          <div className="eyebrow">Error 404</div>
          <h1 style={{ fontSize: "clamp(1.6rem,4vw,2.4rem)", margin: "8px 0" }}>We couldn&apos;t find that page</h1>
          <p>The machine or page may have moved. Try one of these, or ask us on WhatsApp.</p>
          <div className="tabs" style={{ justifyContent: "center", margin: "18px 0" }}>
            {categories.map((c) => (
              <Link key={c.slug} className="tab" href={c.path}>
                {c.short}
              </Link>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <Link className="btn b-blue" href="/">
              Go to home page
            </Link>
            <a className="btn b-wa" href={waLink()}>
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
