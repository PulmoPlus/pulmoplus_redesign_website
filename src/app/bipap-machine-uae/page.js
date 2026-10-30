import Image from "next/image";
import Link from "next/link";
import "./landing.css";
import BipapMatcher from "@/components/landing/BipapMatcher";
import BreathWave from "@/components/landing/BreathWave";
import LeadForm from "@/components/landing/LeadForm";
import Faq from "@/components/ui/Faq";
import { Icon, WhatsAppIcon } from "@/components/ui/Icons";
import JsonLd from "@/components/ui/JsonLd";
import { BIPAP_LANDING as L } from "@/data/landing/bipap";
import { getCategory, getProduct, getSpec, priceRange, productPath, shortSpec } from "@/lib/catalog";
import { breadcrumbSchema, productSchema } from "@/lib/schema";
import { SITE, formatAED, pageMeta, waLink } from "@/lib/site";

// Google Ads landing page for BiPAP. Built from the live catalogue so prices never drift from the shop.
const category = getCategory("bipap");
const lineup = L.lineup.map((item) => {
  const p = getProduct(item.slug);
  if (!p) throw new Error(`BiPAP landing: product "${item.slug}" is missing from products.js`);
  return {
    ...item,
    name: p.name,
    brand: p.brand,
    price: p.price,
    image: p.image,
    inStock: p.inStock,
    noise: shortSpec(getSpec(p, /noise|sound/i)),
    weight: shortSpec(getSpec(p, /weight/i)),
    warranty: getSpec(p, /warranty/i),
    product: p,
  };
});
const { min, max } = priceRange(lineup);
const cheapestAuto = lineup.filter((i) => i.fits.includes("auto")).sort((a, b) => a.price - b.price)[0];
const quietest = lineup.find((i) => i.slug === "bmc-g3-b25a-auto-bipap");
const crossSell = L.crossSell.map(getProduct).filter(Boolean);

const wa = (ref, text = "Hi PulmoPlus, I need help choosing a BiPAP machine.") => waLink(`${text} Ref ${ref}`);

export const metadata = pageMeta({
  title: `BiPAP Machine in UAE & Qatar from ${formatAED(min)} | PulmoPlus`,
  description: `Auto BiPAP and ST BiPAP machines from ResMed, Philips and BMC, ${formatAED(min)} to ${formatAED(max)}. Home setup by our technician and delivery across the UAE and Qatar.`,
  path: L.path,
  image: "/images/categories/bipap.jpg",
  absoluteTitle: true,
});

const faqs = [
  {
    q: "What is the difference between CPAP and BiPAP?",
    a: "A CPAP blows one fixed pressure the whole night. A BiPAP (bilevel) gives a higher pressure when you breathe in (IPAP) and a lower one when you breathe out (EPAP), so breathing out feels easier. Doctors prescribe BiPAP for COPD, weak breathing, and sleep apnea patients who can't tolerate high CPAP pressure.",
  },
  {
    q: "How much does a BiPAP machine cost in the UAE?",
    a: `Our BiPAP machines are ${formatAED(min)} to ${formatAED(max)}: ${lineup
      .slice()
      .sort((a, b) => a.price - b.price)
      .map((i) => `${i.name} ${formatAED(i.price)}`)
      .join(", ")}.${L.facts.vatNote ? ` ${L.facts.vatNote}` : ""}`,
  },
  {
    q: "Do I need a doctor's prescription for a BiPAP?",
    a: "The mode and pressures of a BiPAP must be set by your doctor. Send us the prescription or sleep study report on WhatsApp and we will tell you which of our machines supports it and set it up to those settings.",
  },
  {
    q: "What is the difference between Auto BiPAP and ST BiPAP?",
    a: "An Auto BiPAP (like the BMC G3 or ResMed AirCurve 10 VAuto) changes its pressures on its own through the night and is mostly used for sleep apnea. An ST BiPAP (like the Philips BiPAP S/T or ResMed Lumis 150) adds a timed backup breath if you don't breathe on your own, which doctors use for COPD and weak breathing.",
  },
  {
    q: "Do you deliver and set up the BiPAP at home?",
    a: `Yes. We deliver across all seven emirates and Qatar, and a technician sets the machine up as prescribed and shows you and your family how to use and clean it.${L.facts.deliveryTime ? ` ${L.facts.deliveryTime}` : ""}`,
  },
  {
    q: "Which mask do I need with a BiPAP?",
    a: "BiPAP machines use the same nasal, nasal pillow and full face masks as CPAP. Many COPD patients need a full face mask. Our team helps you choose the type and size so it fits without leaking.",
  },
  {
    q: "Is there a warranty?",
    a: `${lineup
      .filter((i) => i.warranty)
      .map((i) => i.name)
      .join(", ")} come with a ${lineup.find((i) => i.warranty)?.warranty.toLowerCase()} warranty. Ask us for the warranty on other models.`,
  },
  ...(L.facts.rental
    ? [
        {
          q: "Can I rent a BiPAP instead of buying?",
          a: "Yes. Message us on WhatsApp with the model and your area for the current rental rate and delivery time.",
        },
      ]
    : []),
];

const situations = [
  "I have a prescription and need a machine",
  "My doctor said CPAP is not enough",
  "COPD, the doctor wants a backup rate (ST)",
  "Not sure, please call me",
];

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "BiPAP machines in the UAE",
  itemListElement: lineup.map((i, n) => ({
    "@type": "ListItem",
    position: n + 1,
    item: productSchema(i.product, category),
  })),
};

export default function BipapLandingPage() {
  const proofs = [
    ["box", `${lineup.length} BiPAP models`, `${formatAED(min)} – ${formatAED(max)}, prices shown upfront`],
    ["wrench", "Home setup", "Our technician sets it to your prescription"],
    ["truck", "UAE + Qatar", "All seven emirates and all of Qatar"],
    ["clock", "WhatsApp 24/7", "Message us any time, day or night"],
  ];

  return (
    <div className="lp">
      <JsonLd
        data={breadcrumbSchema([
          ["Home", "/"],
          [category.name, category.path],
          ["BiPAP machines in the UAE", L.path],
        ])}
      />
      <JsonLd data={itemListSchema} />

      {/* 1. Hero */}
      <section className="lp-hero">
        <div className="wrap lp-hero-grid">
          <div className="lp-hero-copy">
            <nav className="lp-crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
              <Link href={category.path}>{category.name}</Link> <span aria-hidden="true">›</span>{" "}
              <span aria-current="page">BiPAP in the UAE</span>
            </nav>
            <p className="lp-kicker">
              <span className="lp-dot" aria-hidden="true" /> {lineup.length} models in stock · UAE &amp; Qatar
            </p>
            <h1>
              BiPAP machines in the UAE, <span>set up at your home.</span>
            </h1>
            <p className="lp-sub">
              ResMed, Philips and BMC BiPAP from <b>{formatAED(min)}</b>. Send us your prescription, we match the right
              machine and mode, and our technician sets it up in your home.
            </p>
            <div className="lp-ctas">
              <a className="btn b-wa lp-btn-xl" href={wa("WEB-LP-BIPAP-HERO")}>
                <WhatsAppIcon size={20} /> WhatsApp a BiPAP expert
              </a>
              <a className="btn b-glass lp-btn-xl" href={SITE.phoneHref}>
                <Icon name="phone" size={18} /> {SITE.phone}
              </a>
            </div>
            <ul className="lp-hero-ticks">
              <li>
                <Icon name="check" size={16} width={3} /> Clear AED prices
              </li>
              <li>
                <Icon name="check" size={16} width={3} /> Home setup &amp; training
              </li>
              <li>
                <Icon name="check" size={16} width={3} /> Dubai &amp; Doha offices
              </li>
            </ul>
          </div>

          <div className="lp-monitor">
            <div className="lp-monitor-top">
              <span>
                <i className="lp-live" aria-hidden="true" /> Bilevel therapy
              </span>
              <span className="lp-monitor-tag">IPAP / EPAP</span>
            </div>
            <BreathWave />
            <div className="lp-monitor-stats">
              <div>
                <small>Auto BiPAP from</small>
                <b className="num">{formatAED(cheapestAuto.price)}</b>
                <span>{cheapestAuto.name}</span>
              </div>
              <div>
                <small>Quietest</small>
                <b className="num">{quietest.noise.split(" at ")[0]}</b>
                <span>{quietest.name}</span>
              </div>
              <div>
                <small>Modes up to</small>
                <b className="num">{Math.max(...lineup.map((i) => i.modes.length))}</b>
                <span>incl. ST &amp; iVAPS</span>
              </div>
            </div>
            <div className="lp-monitor-shelf">
              {lineup.map((i) => (
                <a key={i.slug} href={`#bipap-${i.slug}`} className="lp-shelf-item" title={i.name}>
                  <Image src={i.image} alt="" width={96} height={96} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Proof strip */}
      <section className="lp-proof" aria-label="Why buy from PulmoPlus">
        <div className="wrap lp-proof-grid">
          {proofs.map(([icon, title, text]) => (
            <div key={title}>
              <i>
                <Icon name={icon} size={20} />
              </i>
              <span>
                <b>{title}</b>
                <small>{text}</small>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Doctor referral */}
      <section className="lp-rx">
        <div className="wrap lp-rx-card">
          <div className="lp-rx-copy">
            <div className="eyebrow">Referred by your doctor?</div>
            <h2>Send the prescription. We&apos;ll do the matching.</h2>
            <p>
              BiPAP settings come from your doctor or sleep study. Share them with us and we confirm which machine
              supports the mode, set it to those pressures, and stay on WhatsApp for any question after setup.
            </p>
            <a className="btn b-wa" href={wa("WEB-LP-BIPAP-RX", "Hi PulmoPlus, I have a BiPAP prescription to share.")}>
              <WhatsAppIcon size={18} /> Send prescription on WhatsApp
            </a>
          </div>
          <ol className="lp-steps">
            <li>
              <b>Share it</b>
              <span>Photo of the prescription or sleep study on WhatsApp.</span>
            </li>
            <li>
              <b>We match it</b>
              <span>Mode (S, ST, Auto, iVAPS), pressures and the right mask type.</span>
            </li>
            <li>
              <b>We set it up</b>
              <span>Delivered and set up at home, with training for the family.</span>
            </li>
          </ol>
        </div>
      </section>

      {/* 4. Matcher + lineup */}
      <section className="sec lp-lineup" id="machines">
        <div className="wrap">
          <div className="lp-head">
            <div className="eyebrow">Our BiPAP machines</div>
            <h2>Pick by what your doctor prescribed</h2>
            <p>All {lineup.length} are new, in stock and priced in AED. Tap a prescription type to see which machines fit.</p>
          </div>
          <BipapMatcher
            items={lineup.map(({ product, ...rest }) => ({ ...rest, id: `bipap-${rest.slug}` }))}
            needs={L.needs}
          />
        </div>
      </section>

      {/* 5. Compare table */}
      <section className="sec lp-compare-sec">
        <div className="wrap">
          <div className="lp-head">
            <div className="eyebrow">Side by side</div>
            <h2>Compare BiPAP machines</h2>
          </div>
          <div className="lp-table-scroll" tabIndex={0} role="region" aria-label="BiPAP comparison table">
            <table className="lp-table">
              <thead>
                <tr>
                  <th scope="col">
                    <span className="sr-only">Feature</span>
                  </th>
                  {lineup.map((i) => (
                    <th scope="col" key={i.slug}>
                      <Image src={i.image} alt="" width={64} height={64} />
                      <Link href={productPath(i)}>{i.name}</Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Price", (i) => <b className="num">{formatAED(i.price)}</b>],
                  ["Best for", (i) => i.bestFor],
                  ["Modes", (i) => i.modes.join(", ")],
                  ["Backup breath rate", (i) => <Mark text={i.backupRate} />],
                  ["Adjusts pressure on its own", (i) => <Mark text={i.autoAdjust} />],
                  ["Noise", (i) => i.noise || "Ask us"],
                  ["Weight", (i) => i.weight || "Ask us"],
                  ["Humidifier", (i) => i.humidifier],
                  ["Therapy data", (i) => i.data],
                  ["Warranty", (i) => i.warranty || "Ask us"],
                ].map(([label, cell]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    {lineup.map((i) => (
                      <td key={i.slug}>{cell(i)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="lp-table-note">
            Specs from the manufacturers. Your doctor&apos;s prescription decides the mode and pressures; we help you pick
            a machine that supports it.
          </p>
        </div>
      </section>

      {/* 6. Explainer */}
      <section className="sec lp-explain">
        <div className="wrap lp-explain-grid">
          <div className="lp-head">
            <div className="eyebrow">BiPAP in plain words</div>
            <h2>Why a BiPAP feels easier than a CPAP</h2>
            <p>
              A CPAP pushes one pressure all night, so you breathe out against it. A BiPAP drops the pressure as you
              breathe out. That is why doctors move patients to BiPAP when CPAP pressure gets too high, or when the
              lungs need help moving air, as in COPD.
            </p>
          </div>
          <div className="lp-vs">
            <figure className="lp-vs-card">
              <figcaption>
                <b>CPAP</b> one fixed pressure
              </figcaption>
              <BreathWave variant="cpap" labels={false} />
            </figure>
            <figure className="lp-vs-card is-bipap">
              <figcaption>
                <b>BiPAP</b> high in, low out
              </figcaption>
              <BreathWave labels={false} />
            </figure>
          </div>
          <dl className="lp-modes-glossary">
            {[
              ["S (spontaneous)", "Switches between IPAP and EPAP as you breathe on your own."],
              ["ST (spontaneous/timed)", "Like S, plus a backup breath if you pause too long."],
              ["Auto / VAuto", "Finds the pressures you need through the night by itself."],
              ["iVAPS", "Adjusts support to reach a breathing-volume target set by your doctor."],
            ].map(([t, d]) => (
              <div key={t}>
                <dt>{t}</dt>
                <dd>{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 7. Lead form */}
      <section className="lp-lead" id="call-back">
        <div className="wrap lp-lead-grid">
          <div className="lp-lead-copy">
            <div className="eyebrow">Not sure which one?</div>
            <h2>Talk to our team before you buy</h2>
            <p>
              Leave your number and we call you back, or message us now. We&apos;ll ask about the prescription, the
              patient and the room, then suggest one machine, not five.
            </p>
            <div className="lp-lead-direct">
              <a className="btn b-wa" href={wa("WEB-LP-BIPAP-MID")}>
                <WhatsAppIcon size={18} /> WhatsApp now
              </a>
              <a className="btn b-glass" href={SITE.phoneHref}>
                <Icon name="phone" size={16} /> Call {SITE.phone}
              </a>
            </div>
            <ul className="lp-lead-facts">
              {[L.facts.deliveryTime, L.facts.payment, L.facts.vatNote].filter(Boolean).map((f) => (
                <li key={f}>
                  <Icon name="check" size={14} width={3} /> {f}
                </li>
              ))}
            </ul>
          </div>
          <LeadForm need="BiPAP machine" refCode="WEB-LP-BIPAP-FORM" situations={situations} />
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="sec">
        <div className="wrap">
          <div className="lp-head">
            <div className="eyebrow">FAQ</div>
            <h2>BiPAP machines in the UAE: common questions</h2>
          </div>
          <Faq faqs={faqs} />
        </div>
      </section>

      {/* 9. Cross-sell */}
      {crossSell.length > 0 && (
        <section className="sec lp-cross">
          <div className="wrap">
            <div className="lp-head lp-head-row">
              <div>
                <div className="eyebrow">Also need oxygen at home?</div>
                <h2>Oxygen concentrators</h2>
              </div>
              <Link className="btn b-line" href="/oxygen-concentrators-dubai">
                See all <Icon name="arrowRight" size={16} />
              </Link>
            </div>
            <ul className="lp-cross-grid">
              {crossSell.map((p) => (
                <li key={p.slug}>
                  <Link href={productPath(p)}>
                    <Image src={p.image} alt={p.name} width={120} height={120} />
                    <span>
                      <small>{p.brand}</small>
                      <b>{p.name}</b>
                      <em className="num">{formatAED(p.price)}</em>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 10. Offices and compliance */}
      <section className="lp-trust">
        <div className="wrap lp-trust-grid">
          <div>
            <Icon name="pin" size={18} />
            <span>
              <b>Dubai</b> {SITE.address.street}, {SITE.address.city}
            </span>
          </div>
          <div>
            <Icon name="pin" size={18} />
            <span>
              <b>Doha</b> {SITE.qatarOffice.street}, {SITE.qatarOffice.city}
            </span>
          </div>
          {L.facts.tradeLicence && (
            <div>
              <Icon name="shield" size={18} />
              <span>{L.facts.tradeLicence}</span>
            </div>
          )}
          {L.facts.adPermit && (
            <div>
              <Icon name="shield" size={18} />
              <span>{L.facts.adPermit}</span>
            </div>
          )}
          {L.facts.reviewsUrl && (
            <a href={L.facts.reviewsUrl} target="_blank" rel="noopener noreferrer">
              <Icon name="arrowUpRight" size={18} />
              <span>Read our Google reviews</span>
            </a>
          )}
        </div>
        <p className="wrap lp-disclaimer">
          BiPAP machines are medical devices. Use them only as prescribed by your doctor.
        </p>
      </section>

      {/* Mobile action bar (replaces the site-wide one on this page) */}
      <div className="lp-mbar">
        <a className="btn b-line" href={SITE.phoneHref}>
          <Icon name="phone" size={16} /> Call
        </a>
        <a className="btn b-wa" href={wa("WEB-LP-BIPAP-BAR")}>
          <WhatsAppIcon size={18} /> WhatsApp
        </a>
        <a className="btn b-blue" href="#machines">
          Prices
        </a>
      </div>
    </div>
  );
}

function Mark({ text }) {
  const yes = /^yes/i.test(text);
  return (
    <span className={`lp-mark ${yes ? "is-yes" : "is-no"}`}>
      <Icon name={yes ? "check" : "close"} size={14} width={3} /> {text}
    </span>
  );
}
