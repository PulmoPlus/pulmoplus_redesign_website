import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { products } from "@/lib/catalog";
import { pageMeta, SITE } from "@/lib/site";

export const metadata = pageMeta({
  title: "About PulmoPlus: Respiratory Care Store in Deira, Dubai",
  description:
    "PulmoPlus supplies oxygen concentrators, CPAP, BiPAP and ventilators to homes across the UAE and Qatar from Port Saeed, Deira, with home setup and 24/7 WhatsApp support.",
  path: "/about",
});

const VALUES = [
  ["Genuine only", "Original brands with warranty. Refurbished units are clearly labelled."],
  ["Honest advice", "We suggest what the prescription needs, not the most expensive model."],
  ["Care at home", "Setup, training and follow-up where the patient actually lives."],
  ["Always reachable", "WhatsApp and phone, every day, every hour."],
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[["About us", "/about"]]}
        eyebrow="About PulmoPlus"
        title="Respiratory care you can trust, from Deira to every emirate"
      >
        <p>
          PulmoPlus supplies oxygen concentrators, CPAP, BiPAP and ventilators to homes across the UAE and Qatar, with setup by
          our own technicians and support that does not stop after the sale.
        </p>
      </PageHero>

      <section className="sec">
        <div className="wrap story">
          <div>
            <div className="eyebrow">Who we are</div>
            <h2>A Dubai team focused on one thing: helping people breathe and sleep better</h2>
            <p>
              We are based in Port Saeed, Deira. Families come to us when a doctor prescribes oxygen, a CPAP for sleep
              apnea, or home ventilation, and they need the right machine quickly and explained clearly.
            </p>
            <p>
              We stock original machines from ResMed, Philips, Inogen, Löwenstein and others, sell and rent them,
              deliver them, and set them up at home. After that we stay available on WhatsApp for masks, filters,
              servicing and questions.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 18 }}>
              <Link className="btn b-blue" href="/products">
                Browse products
              </Link>
              <Link className="btn b-line" href="/contact">
                Contact us
              </Link>
            </div>
          </div>
          <Image
            src="/images/about/about-1.jpg"
            alt="PulmoPlus respiratory care in Dubai"
            width={1200}
            height={818}
            sizes="(max-width: 900px) 100vw, 600px"
          />
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap nums">
          <div>
            <b>{products.length}</b>
            <small>Machines in stock</small>
          </div>
          <div>
            <b>{SITE.brands.length}</b>
            <small>Trusted brands</small>
          </div>
          <div>
            <b>{SITE.countries.length}</b>
            <small>Countries served: UAE and Qatar</small>
          </div>
          <div>
            <b>24/7</b>
            <small>Support on WhatsApp</small>
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap mv">
          <div className="m1">
            <div className="eyebrow" style={{ color: "var(--aqua)" }}>
              Our mission
            </div>
            <h3 style={{ fontSize: "1.4rem", marginTop: 8 }}>Make respiratory care simple and reachable</h3>
            <p>Original equipment at clear prices, set up properly at home, with someone to call day or night.</p>
          </div>
          <div className="m2">
            <div className="eyebrow">Our vision</div>
            <h3 style={{ fontSize: "1.4rem", marginTop: 8 }}>The most trusted respiratory care name in the UAE</h3>
            <p>Known for honest advice, fast help and machines that keep working.</p>
          </div>
        </div>
      </section>

      <section className="sec" style={{ background: "var(--mist)" }}>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="eyebrow">What we stand for</div>
              <h2>Our values</h2>
            </div>
          </div>
          <div className="why-grid values">
            {VALUES.map(([title, text]) => (
              <div className="why-item" key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="eyebrow">Inside PulmoPlus</div>
              <h2>Equipment we deliver and set up</h2>
            </div>
          </div>
          <div className="gal" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <Image
              src="/images/about/about-2.jpg"
              alt="Oxygen equipment at PulmoPlus"
              width={1200}
              height={800}
              sizes="(max-width: 900px) 50vw, 600px"
            />
            <Image
              src="/images/about/about-3.jpg"
              alt="Respiratory care at home with PulmoPlus"
              width={800}
              height={1200}
              sizes="(max-width: 900px) 50vw, 600px"
            />
          </div>
        </div>
      </section>

      <div className="wrap" style={{ marginBottom: 56 }}>
        <div className="brands">
          {SITE.brands.map((b) => (
            <span key={b}>{b}</span>
          ))}
        </div>
      </div>
    </>
  );
}
