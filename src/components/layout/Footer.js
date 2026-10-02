import Image from "next/image";
import Link from "next/link";
import categories from "@/data/categories";
import { SITE, waLink } from "@/lib/site";
import { WhatsAppIcon } from "@/components/ui/Icons";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <>
      <div className="wrap">
        <div className="cta-band">
          <div>
            <h2>Need help choosing a machine?</h2>
            <p>Our team replies on WhatsApp and phone, 24 hours a day.</p>
          </div>
          <div className="row">
            <a className="btn b-wa" href={waLink("Hi PulmoPlus, I need help choosing a machine. Ref WEB-FOOTER")}>
              WhatsApp us
            </a>
            <a className="btn b-white" href={SITE.phoneHref}>
              {SITE.phone}
            </a>
          </div>
        </div>
      </div>
      <footer>
        <div className="wrap">
          <div className="cols">
            <div>
              <Link className="logo" href="/" style={{ color: "#fff" }}>
                <Image src="/logo/pulmoplus-logo.png" alt="" width={40} height={40} />
                <span>
                  Pulmo<b style={{ color: "var(--aqua)" }}>Plus</b>
                </span>
              </Link>
              <p>Oxygen concentrators, CPAP, BiPAP, ventilators and masks, sold and rented across the UAE.</p>
              <p>
                {SITE.address.street}, {SITE.address.city}
                <br />
                <a href={SITE.phoneHref}>{SITE.phone}</a> · WhatsApp 24/7
                <br />
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </p>
            </div>
            <div>
              <h4>Products</h4>
              <ul>
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link href={c.path}>{c.name}</Link>
                  </li>
                ))}
                <li>
                  <Link href="/products">All products</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4>Services</h4>
              <ul>
                <li>
                  <Link href="/services#rent">Equipment rental</Link>
                </li>
                <li>
                  <Link href="/services">Delivery and home setup</Link>
                </li>
                <li>
                  <Link href="/services">CPAP mask fitting</Link>
                </li>
                <li>
                  <Link href="/services">Servicing</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4>Company</h4>
              <ul>
                <li>
                  <Link href="/about">About us</Link>
                </li>
                <li>
                  <Link href="/contact">Contact us</Link>
                </li>
                <li>
                  <Link href="/return-policy">Return policy</Link>
                </li>
                <li>
                  <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer">
                    Find us on Google Maps
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="legal">
            © {year} {SITE.legalName}. Prices in AED. Medical devices should be used as prescribed by your doctor.
          </div>
        </div>
      </footer>
      <a className="wa-float" href={waLink()} aria-label="WhatsApp PulmoPlus">
        <WhatsAppIcon size={30} color="#fff" />
      </a>
      <div className="mbar">
        <a className="btn b-line" href={SITE.phoneHref}>
          Call
        </a>
        <a className="btn b-wa" href={waLink()}>
          WhatsApp
        </a>
        <Link className="btn b-blue" href="/products">
          Prices
        </Link>
      </div>
    </>
  );
}
