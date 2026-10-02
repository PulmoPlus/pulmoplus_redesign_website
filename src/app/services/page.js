import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import { Icon } from "@/components/ui/Icons";
import { categories } from "@/lib/catalog";
import { pageMeta, rentWaLink, waLink } from "@/lib/site";

export const metadata = pageMeta({
  title: "Oxygen, CPAP & Ventilator Rental and Home Setup in Dubai",
  description:
    "Rent oxygen concentrators, CPAP, BiPAP and ventilators in Dubai by the day, week or month. Delivery, home setup, CPAP mask fitting and servicing across the UAE.",
  path: "/services",
});

const SERVICES = [
  [
    "box",
    "New equipment",
    "Original oxygen concentrators, CPAP, BiPAP and ventilators with brand warranty.",
    "I want to buy a new machine.",
  ],
  [
    "shield",
    "Refurbished equipment",
    "Inspected, cleaned and tested units at a lower price, always labelled as refurbished.",
    "I'm interested in refurbished equipment.",
  ],
  [
    "cycle",
    "Equipment rental",
    "Daily, weekly or monthly rental. Rent first, then decide if you want to buy.",
    "I want to rent a machine.",
  ],
  [
    "truck",
    "Delivery and home setup",
    "Delivered to your door and set up as prescribed, with training for the family.",
    "I need delivery and setup.",
  ],
  [
    "mask",
    "CPAP mask fitting",
    "Help choosing the mask type and size that fits and does not leak.",
    "I need help with a CPAP mask.",
  ],
  [
    "wrench",
    "Servicing and maintenance",
    "Filter changes, checks and repairs to keep your machine working.",
    "My machine needs service.",
  ],
  [
    "plane",
    "Travel oxygen support",
    "Portable concentrators and advice for flying from Dubai.",
    "I need oxygen for travel.",
  ],
  [
    "list",
    "Masks and supplies",
    "Masks, filters and tubing for the machines we sell. Ask us for current stock.",
    "I need masks or supplies.",
  ],
];

const STEPS = [
  ["Message us", "Tell us the machine, the need and your area."],
  ["Get a clear quote", "Price or rental rate and a delivery time, in writing."],
  ["Technician visit", "Delivery, setup, training, or service at your home."],
  ["Follow-up", "We check in and stay on WhatsApp for questions."],
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[["Services", "/services"]]}
        eyebrow="Services"
        title="Everything you need after choosing the machine"
      >
        <p>Rental, delivery, setup, mask fitting and servicing, handled by one team in Dubai.</p>
      </PageHero>

      <section className="sec">
        <div className="wrap">
          <div className="svc-grid">
            {SERVICES.map(([icon, title, text, ask]) => (
              <div className="svc" key={title}>
                <i>
                  <Icon name={icon} />
                </i>
                <h2 style={{ fontSize: "1.17rem" }}>{title}</h2>
                <p>{text}</p>
                <a href={waLink(`Hi PulmoPlus, ${ask} Ref WEB-SVC`)}>Ask on WhatsApp →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" id="rent" style={{ background: "var(--mist)", scrollMarginTop: 140 }}>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="eyebrow">Rental</div>
              <h2>Rent by the day, week or month</h2>
              <p>
                Rates depend on the model and how long you need it. Message us and we confirm the rate and delivery
                time.
              </p>
            </div>
          </div>
          <div className="svc-grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))" }}>
            {categories.map((c) => (
              <div className="svc rent-card" key={c.slug}>
                <Image src={c.image} alt="" width={400} height={240} sizes="(max-width: 600px) 90vw, 240px" />
                <h3>{c.name}</h3>
                <p>{c.line}</p>
                <a href={rentWaLink(c.plural, `WEB-RENT-${c.slug}`)}>Ask rental rate →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="eyebrow">How a service visit works</div>
              <h2>Simple from the first message</h2>
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
    </>
  );
}
