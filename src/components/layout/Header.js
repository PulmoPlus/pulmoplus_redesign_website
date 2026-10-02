"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import categories from "@/data/categories";
import { SITE, waLink } from "@/lib/site";
import { Icon, WhatsAppIcon } from "@/components/ui/Icons";
import SearchBox from "./SearchBox";

const CATEGORY_PATHS = categories.map((c) => c.path);

function section(pathname) {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/about")) return "about";
  if (pathname.startsWith("/services")) return "services";
  if (pathname.startsWith("/contact")) return "contact";
  if (pathname.startsWith("/product") || pathname.startsWith("/search") || CATEGORY_PATHS.includes(pathname))
    return "products";
  return null;
}

export default function Header({ index }) {
  const pathname = usePathname();
  const current = section(pathname);
  const [megaOpen, setMegaOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => setMegaOpen(false), [pathname]);

  useEffect(() => {
    if (!megaOpen) return;
    const onDown = (e) => {
      if (!headerRef.current?.contains(e.target)) setMegaOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setMegaOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [megaOpen]);

  const navLink = (key, href, label, extra = "") => (
    <Link className={`nl ${extra}`.trim()} href={href} aria-current={current === key ? "page" : undefined}>
      {label}
    </Link>
  );

  return (
    <header className="site" ref={headerRef}>
      <div className="wrap hrow">
        <Link className="logo" href="/" aria-label="PulmoPlus home">
          <Image src="/logo/pulmoplus-logo.png" alt="" width={40} height={40} priority />
          <span>
            Pulmo<b>Plus</b>
          </span>
        </Link>
        <SearchBox index={index} />
        <div className="hact">
          <a className="btn b-line" href={SITE.phoneHref}>
            {SITE.phone}
          </a>
          <a className="btn b-wa" href={waLink()} aria-label="WhatsApp PulmoPlus">
            <WhatsAppIcon />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
      <nav className="mainnav" aria-label="Main">
        <div className="wrap">
          {navLink("home", "/", "Home")}
          {navLink("about", "/about", "About us")}
          <button
            type="button"
            className="nl"
            aria-expanded={megaOpen}
            aria-controls="mega"
            aria-current={current === "products" ? "page" : undefined}
            onClick={() => setMegaOpen((o) => !o)}
          >
            Products <Icon name="chevronDown" size={14} width={2.6} />
          </button>
          {navLink("services", "/services", "Services")}
          <Link className="nl hot" href="/services#rent">
            Rentals
          </Link>
          {navLink("contact", "/contact", "Contact us")}
          <span className="navspacer" />
          <span className="navinfo">
            <b>●</b> {SITE.hours} · {SITE.address.street}
          </span>
        </div>
      </nav>
      <div className="mega" id="mega" hidden={!megaOpen}>
        <div className="wrap">
          {categories.map((c) => (
            <Link key={c.slug} className="mega-item" href={c.path} onClick={() => setMegaOpen(false)}>
              <Image src={c.image} alt="" width={56} height={56} />
              <div>
                <b>{c.name}</b>
                <small>
                  {index.filter((p) => p.category === c.slug).length} models · {c.line}
                </small>
              </div>
            </Link>
          ))}
          <Link className="mega-item" href="/products" onClick={() => setMegaOpen(false)}>
            <Image
              src="/images/products/resmed-airsense-11.jpg"
              alt=""
              width={56}
              height={56}
              style={{ objectFit: "contain", background: "#fff", border: "1px solid var(--line)" }}
            />
            <div>
              <b>All products</b>
              <small>{index.length} machines with prices</small>
            </div>
          </Link>
          <div className="mega-side">
            <div className="eyebrow" style={{ color: "var(--aqua)" }}>
              Not sure?
            </div>
            <b style={{ fontSize: "1.1rem" }}>Send us the prescription</b>
            <p>We suggest the right machine and price on WhatsApp.</p>
            <a className="btn b-wa" href={waLink("Hi PulmoPlus, I need help choosing a machine. Ref WEB-MENU")}>
              WhatsApp us
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
