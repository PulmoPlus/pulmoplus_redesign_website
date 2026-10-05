import Image from "next/image";
import Link from "next/link";
import BestSellers from "@/components/home/BestSellers";
import HeroShowcase from "@/components/home/HeroShowcase";
import MachineFinder from "@/components/home/MachineFinder";
import Faq from "@/components/ui/Faq";
import { Icon, WhatsAppIcon } from "@/components/ui/Icons";
import {
  BEST_SELLERS,
  categories,
  getProduct,
  heroFacts,
  priceRange,
  products,
  productsIn,
  toIndexItem,
} from "@/lib/catalog";
import { formatAED, pageMeta, SITE, waLink } from "@/lib/site";

export const metadata = pageMeta({
  title: "Oxygen Concentrator, CPAP & BiPAP Machines in Dubai | PulmoPlus",
  description:
    "Buy or rent oxygen concentrators, CPAP, BiPAP and ventilators in Dubai, across the UAE and in Qatar. Original ResMed, Philips and Inogen machines with clear AED prices, home setup and 24/7 WhatsApp support.",
  path: "/",
  absoluteTitle: true,
});

const SHOWCASE = ["inogen-rove-6", "resmed-airsense-11", "resmed-astral-150", "simplygo-mini"];
const QUICK = [
  ["/portable-oxygen-concentrators-dubai", "Portable oxygen"],
  ["/cpap-machines-dubai", "CPAP machine"],
  ["/ventilators-dubai", "Ventilator"],
  ["/search?q=resmed", "ResMed"],
];

const TRUST = [
  ["shield", "100% original", "Brand warranty on every new unit"],
  ["truck", "Delivery and setup", "A technician sets it up at home"],
  ["cycle", "Buy or rent", "Daily, weekly or monthly"],
  ["clock", "24/7 support", "WhatsApp and phone, every day"],
];

const WHY = [
  [
    "shield",
    "Original brands",
    "ResMed, Philips, Inogen and more, with brand warranty. Refurbished units are always labelled.",
  ],
  ["list", "Clear AED prices", "Every machine shows its price online. No “call for price” guessing."],
  ["home", "Setup at home", "A technician sets flow or pressure as prescribed and trains the family."],
  ["cycle", "Rent or buy", "Short-term rental for recovery or visitors, or buy and keep with warranty."],
  ["wrench", "Service and supplies", "Masks, filters, tubing and servicing, so the machine keeps working."],
  ["pin", "UAE and Qatar", "Based in Deira, Dubai, delivering to all 7 emirates and all of Qatar."],
];

const SERVICES = [
  ["cycle", "Equipment rental", "Oxygen, CPAP, BiPAP and ventilators by the day, week or month.", "/services#rent"],
  ["truck", "Delivery and home setup", "Delivered, installed and explained at your home.", "/services"],
  ["mask", "CPAP mask fitting", "The right mask size and type, so therapy is comfortable.", "/services"],
  ["wrench", "Servicing", "Filter changes, checks and repairs for machines you already own.", "/services"],
];

const STEPS = [
  ["Message or call", "Tell us the need and share the prescription if you have one."],
  ["Get the right machine", "We suggest models with prices and rental options."],
  ["Home delivery and setup", "A technician sets the flow or pressure as prescribed and trains the family."],
  ["Support after", "Masks, filters, servicing and a WhatsApp line for questions."],
];

function homeFaqs() {
  const homeOxygen = productsIn("oxygen-and-nebuliser").filter((p) => /concentrator/i.test(p.name));
  const portable = priceRange(productsIn("portable-oxygen"));
  const cpap = priceRange(productsIn("cpap"));
  return [
    {
      q: "How much is an oxygen concentrator in Dubai?",
      a: `At PulmoPlus, home oxygen concentrators start from ${formatAED(priceRange(homeOxygen).min)}. Portable, battery powered models are ${formatAED(portable.min)} to ${formatAED(portable.max)}, depending on weight, battery life and flow. Rental is also available.`,
    },
    {
      q: "How much is a CPAP machine in Dubai?",
      a: `Our CPAP machines range from ${formatAED(cpap.min)} to ${formatAED(cpap.max)}, including ResMed AirSense 11, ResMed AirMini and Philips DreamStation. We help with mask fitting and setup.`,
    },
    {
      q: "What is the difference between CPAP and BiPAP?",
      a: "A CPAP gives one steady pressure that keeps the airway open during sleep and is the usual treatment for obstructive sleep apnea. A BiPAP gives a higher pressure when you breathe in and a lower one when you breathe out, and is used for COPD and more complex cases.",
    },
    {
      q: "Can I rent a machine instead of buying?",
      a: "Yes. Oxygen concentrators, CPAP, BiPAP and ventilators can be rented by the day, week or month. Message us on WhatsApp for the current rate.",
    },
    {
      q: "Do you deliver outside Dubai?",
      a: "Yes. We deliver to all 7 emirates of the UAE and across Qatar. Delivery time depends on the city and the model.",
    },
  ];
}

export default function HomePage() {
  const index = products.map(toIndexItem);
  const best = BEST_SELLERS.map((s) => index.find((p) => p.slug === s)).filter(Boolean);
  const slides = SHOWCASE.map(getProduct).map((p) => ({
    slug: p.slug,
    name: p.name,
    price: p.price,
    image: p.image,
    facts: heroFacts(p),
  }));

  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div className="hero-copy">
            <div className="eyebrow" style={{ color: "var(--aqua)" }}>
              Dubai&apos;s respiratory and sleep care store
            </div>
            <h1>
              Breathe easier at home. <span>Oxygen, CPAP and BiPAP</span> delivered in Dubai.
            </h1>
            <p className="sub">
              Original ResMed, Philips and Inogen machines with prices shown up front, home setup by a technician, and a
              real person on WhatsApp day and night.
            </p>
            <div className="ctas">
              <Link className="btn b-blue" href="#best">
                Shop machines
              </Link>
              <a className="btn b-glass" href={waLink("Hi PulmoPlus, I would like expert advice. Ref WEB-HERO")}>
                Talk to an expert
              </a>
            </div>
            <div className="qchips">
              <span>Popular:</span>
              {QUICK.map(([href, label]) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
            </div>
            <div className="hstats">
              <div>
                <b className="num">{products.length}</b>
                <small>machines in stock</small>
              </div>
              <div>
                <b>{SITE.countries.length}</b>
                <small>countries: UAE and Qatar</small>
              </div>
              <div>
                <b>24/7</b>
                <small>WhatsApp support</small>
              </div>
            </div>
          </div>
          <HeroShowcase slides={slides} />
        </div>
      </section>

      <div className="trust">
        <div className="wrap">
          {TRUST.map(([icon, title, text]) => (
            <div key={title}>
              <i>
                <Icon name={icon} />
              </i>
              <span>
                <b>{title}</b>
                <small>{text}</small>
              </span>
            </div>
          ))}
        </div>
      </div>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="eyebrow">Shop by need</div>
              <h2>What are you looking for?</h2>
            </div>
          </div>
          <div className="cats">
            {categories.map((c, i) => (
              <Link key={c.slug} className={i === 0 ? "cat big" : "cat"} href={c.path}>
                <Image src={c.image} alt="" fill sizes="(max-width: 900px) 50vw, 33vw" />
                <span className="arrow">
                  <Icon name="arrowUpRight" size={18} width={2.4} />
                </span>
                <div>
                  <h3>{c.name}</h3>
                  <small>
                    {c.line} · {productsIn(c.slug).length} models
                  </small>
                </div>
              </Link>
            ))}
            <a className="cat plain" href={waLink("Hi PulmoPlus, I'm looking for a CPAP or BiPAP mask. Ref WEB-MASKS")}>
              <span className="arrow">
                <Icon name="arrowUpRight" size={18} width={2.4} />
              </span>
              <div>
                <h3>Masks and supplies</h3>
                <small>Nasal, pillow and full face masks · ask on WhatsApp for stock</small>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className="sec" id="best" style={{ background: "var(--mist)" }}>
        <div className="wrap">
          <BestSellers best={best} all={index} />
        </div>
      </section>

      <section className="sec">
        <div className="wrap why">
          <div className="why-card">
            <div className="eyebrow" style={{ color: "var(--aqua)" }}>
              Why PulmoPlus
            </div>
            <h2 style={{ color: "#fff" }}>One team for the machine, the setup and everything after</h2>
            <p>
              Most shops sell the box and stop answering. We deliver, set it up as prescribed, and stay on WhatsApp for
              as long as you use it.
            </p>
            <div>
              <span className="big">24/7</span>
              <p>WhatsApp and phone support, every day</p>
            </div>
            <a className="btn b-wa" href={waLink()} style={{ justifySelf: "start" }}>
              <WhatsAppIcon /> Chat with us
            </a>
          </div>
          <div className="why-grid">
            {WHY.map(([icon, title, text]) => (
              <div className="why-item" key={title}>
                <i>
                  <Icon name={icon} size={20} />
                </i>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap split">
          <div className="panel buy">
            <div className="eyebrow" style={{ color: "var(--aqua)" }}>
              Buy
            </div>
            <h2>Own it, with warranty and service</h2>
            <ul>
              <li>Brand warranty on new machines</li>
              <li>Setup and training at home</li>
              <li>Masks, filters and servicing afterwards</li>
            </ul>
            <Link className="btn b-blue" href="/products">
              See prices
            </Link>
          </div>
          <div className="panel rent">
            <div className="eyebrow">Rent</div>
            <h2>Need it for a few weeks?</h2>
            <ul>
              <li>Oxygen concentrators, CPAP, BiPAP and ventilators</li>
              <li>Daily, weekly or monthly plans</li>
              <li>Rent first, then decide if you want to buy</li>
            </ul>
            <a className="btn b-wa" href={waLink("Hi PulmoPlus, I want to rent a machine. Ref WEB-RENT")}>
              Ask the rental rate
            </a>
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <MachineFinder products={index} />
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="eyebrow">Our services</div>
              <h2>More than a shop</h2>
            </div>
            <Link className="btn b-line" href="/services">
              All services
            </Link>
          </div>
          <div className="svc-grid">
            {SERVICES.map(([icon, title, text, href]) => (
              <div className="svc" key={title}>
                <i>
                  <Icon name={icon} />
                </i>
                <h3>{title}</h3>
                <p>{text}</p>
                <Link href={href}>Learn more →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="wrap">
        <div className="brands">
          {SITE.brands.map((b) => (
            <span key={b}>{b}</span>
          ))}
        </div>
      </div>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="eyebrow">How it works</div>
              <h2>From first message to first good night</h2>
            </div>
          </div>
          <ol className="steps" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {STEPS.map(([title, text], i) => (
              <li className="step" key={title}>
                <div className="n" aria-hidden="true">
                  {i + 1}
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="edu">
            <div>
              <div className="eyebrow" style={{ color: "var(--aqua)" }}>
                Sleep apnea in Dubai
              </div>
              <h2>Loud snoring can be a sign of sleep apnea</h2>
              <p>
                Sleep apnea is diagnosed with a sleep test. If a doctor confirms it, a CPAP machine is the standard
                treatment. We help you with the machine, the mask fitting and the setup.
              </p>
              <Link className="btn b-blue" href="/cpap-machines-dubai">
                See CPAP machines
              </Link>
            </div>
            <ul className="signs" style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li>Loud snoring most nights</li>
              <li>Stopping breathing or gasping in sleep</li>
              <li>Tired or sleepy during the day</li>
              <li>Morning headaches</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="sec" style={{ background: "var(--mist)" }}>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="eyebrow">Reviews</div>
              <h2>What customers say about us</h2>
              <p>Read real reviews from families across the UAE and Qatar on our Google Business Profile.</p>
            </div>
          </div>
          <div className="rv-head">
            <span className="rv-score" aria-hidden="true">
              G
            </span>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div className="stars" aria-hidden="true">
                ★★★★★
              </div>
              <small className="muted">Reviews on Google Maps for PulmoPlus, Port Saeed, Deira</small>
            </div>
            <a className="btn b-line" href={SITE.reviewsUrl} target="_blank" rel="noopener noreferrer">
              Read reviews on Google
            </a>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="eyebrow">FAQ</div>
              <h2>Questions people ask us</h2>
            </div>
          </div>
          <Faq faqs={homeFaqs()} />
          <h3 style={{ margin: "36px 0 14px" }}>Areas we deliver to</h3>
          <div className="areas">
            {SITE.deliveryAreas.map((e) => (
              <span key={e}>{e}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
