import ContactForm from "@/components/contact/ContactForm";
import CopyButton from "@/components/contact/CopyButton";
import PageHero from "@/components/ui/PageHero";
import { Icon, WhatsAppIcon } from "@/components/ui/Icons";
import { pageMeta, SITE, waLink } from "@/lib/site";

export const metadata = pageMeta({
  title: "Contact PulmoPlus Dubai: Call or WhatsApp 24/7",
  description: `Call or WhatsApp PulmoPlus on ${SITE.phone} for oxygen concentrator, CPAP, BiPAP and ventilator prices, rental and delivery in Dubai. Visit us in Port Saeed, Deira.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[["Contact us", "/contact"]]}
        eyebrow="Contact us"
        title="Talk to a real person, day or night"
        style={{ paddingBottom: 80 }}
      >
        <p>Call or WhatsApp for prices, rental, delivery or help with a machine. We reply 24/7.</p>
      </PageHero>

      <div className="wrap">
        <div className="cc-grid">
          <div className="cc">
            <i>
              <Icon name="phone" />
            </i>
            <b>Call us</b>
            <span className="val">{SITE.phone}</span>
            <div className="row">
              <a className="btn b-blue" href={SITE.phoneHref}>
                Call
              </a>
              <CopyButton value={SITE.phone} />
            </div>
          </div>
          <div className="cc">
            <i style={{ background: "#dff5e8", color: "var(--wa)" }}>
              <WhatsAppIcon size={22} />
            </i>
            <b>WhatsApp</b>
            <span className="val">{SITE.phone}</span>
            <div className="row">
              <a className="btn b-wa" href={waLink()}>
                Open chat
              </a>
            </div>
          </div>
          <div className="cc">
            <i>
              <Icon name="mail" />
            </i>
            <b>Email</b>
            <a className="val" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>
            <div className="row">
              <CopyButton value={SITE.email} label="Copy email" />
            </div>
          </div>
          <div className="cc">
            <i>
              <Icon name="pin" />
            </i>
            <b>Visit us</b>
            <span className="val">
              {SITE.address.street}, {SITE.address.city}
            </span>
            <div className="row">
              <a className="btn b-line" href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer">
                Open map
              </a>
            </div>
          </div>
        </div>
      </div>

      <section className="sec">
        <div className="wrap cform-wrap">
          <ContactForm />
          <div className="side-stack">
            <div className="mapcard">
              <div className="mapart">
                <span className="pin">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2a7 7 0 00-7 7c0 5.3 7 13 7 13s7-7.7 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z" />
                  </svg>
                </span>
              </div>
              <div className="mb">
                <b>PulmoPlus, {SITE.address.street}</b>
                <span className="muted" style={{ fontSize: ".9rem" }}>
                  {SITE.address.city}, {SITE.address.countryName}
                </span>
                <a
                  className="btn b-line"
                  style={{ justifySelf: "start" }}
                  href={SITE.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get directions
                </a>
              </div>
            </div>
            <div className="hours">
              <b style={{ display: "block", marginBottom: 6 }}>Opening hours</b>
              <div>
                <span>Phone and WhatsApp</span>
                <b>24/7</b>
              </div>
            </div>
            <div>
              <b style={{ display: "block", marginBottom: 10 }}>We deliver to</b>
              <div className="areas">
                {SITE.emirates.map((e) => (
                  <span key={e}>{e}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
