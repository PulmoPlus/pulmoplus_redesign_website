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
  // Mobile only: flyout menu, products list inside it, and the search panel shown after scrolling.
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const headerRef = useRef(null);
  const closeRef = useRef(null);
  const burgerRef = useRef(null);

  useEffect(() => {
    setMegaOpen(false);
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

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

  // On phones the search bar sits under the header and scrolls away; once it is gone,
  // a search icon appears in the header so search is still one tap away.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!scrolled) setSearchOpen(false);
  }, [scrolled]);

  // Lock page scroll while the flyout menu is open, close it with Escape, and return focus to the burger.
  useEffect(() => {
    if (!menuOpen) return;
    const burger = burgerRef.current;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      burger?.focus();
    };
  }, [menuOpen]);

  const navLink = (key, href, label, extra = "") => (
    <Link className={`nl ${extra}`.trim()} href={href} aria-current={current === key ? "page" : undefined}>
      {label}
    </Link>
  );

  const closeMenu = () => setMenuOpen(false);
  const mLink = (key, href, label, extra = "") => (
    <Link
      className={`mn-link ${extra}`.trim()}
      href={href}
      aria-current={current === key ? "page" : undefined}
      onClick={closeMenu}
    >
      {label}
    </Link>
  );

  return (
    <>
      <header className={`site${scrolled ? " scrolled" : ""}`} ref={headerRef}>
        <div className="wrap hrow">
          <Link className="logo" href="/" aria-label="PulmoPlus home">
            <Image src="/logo/pulmoplus-logo.png" alt="" width={40} height={40} priority />
            <span>
              Pulmo<b>Plus</b>
            </span>
          </Link>
          <div className="dsearch">
            <SearchBox index={index} />
          </div>
          <div className="hact">
            <a className="btn b-line" href={SITE.phoneHref}>
              {SITE.phone}
            </a>
            <button
              type="button"
              className="hbtn hsearch"
              aria-label={searchOpen ? "Close search" : "Search products"}
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen((o) => !o)}
            >
              <Icon name={searchOpen ? "close" : "search"} size={20} />
            </button>
            <a className="btn b-wa" href={waLink()} aria-label="WhatsApp PulmoPlus">
              <WhatsAppIcon />
              <span>WhatsApp</span>
            </a>
            <button
              type="button"
              className="hbtn burger"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mnav"
              ref={burgerRef}
              onClick={() => setMenuOpen(true)}
            >
              <Icon name="menu" size={22} />
            </button>
          </div>
        </div>
        {searchOpen && (
          <div className="wrap hsearch-panel">
            <SearchBox index={index} />
          </div>
        )}
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

      {/* Phones: search bar under the header that scrolls away with the page. */}
      <div className="msearch">
        <div className="wrap">
          <SearchBox index={index} />
        </div>
      </div>

      {/* Phones: flyout menu. Kept outside the header so position:fixed is relative to the screen. */}
      <div className="mn-backdrop" data-open={menuOpen} onClick={closeMenu} aria-hidden="true" />
      <aside
        id="mnav"
        className="mnav"
        data-open={menuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!menuOpen}
      >
        <div className="mn-head">
          <Link className="logo" href="/" aria-label="PulmoPlus home" onClick={closeMenu}>
            <Image src="/logo/pulmoplus-logo.png" alt="" width={36} height={36} />
            <span>
              Pulmo<b>Plus</b>
            </span>
          </Link>
          <button type="button" className="hbtn" aria-label="Close menu" ref={closeRef} onClick={closeMenu}>
            <Icon name="close" size={22} />
          </button>
        </div>
        <nav className="mn-body" aria-label="Mobile">
          {mLink("home", "/", "Home")}
          {mLink("about", "/about", "About us")}
          <button
            type="button"
            className="mn-link"
            aria-expanded={productsOpen}
            aria-controls="mn-products"
            aria-current={current === "products" ? "page" : undefined}
            onClick={() => setProductsOpen((o) => !o)}
          >
            Products <Icon name="chevronDown" size={18} width={2.4} />
          </button>
          <div className="mn-sub" id="mn-products" hidden={!productsOpen}>
            {categories.map((c) => (
              <Link key={c.slug} href={c.path} onClick={closeMenu}>
                <Image src={c.image} alt="" width={40} height={40} />
                <span>
                  <b>{c.name}</b>
                  <small>{index.filter((p) => p.category === c.slug).length} models</small>
                </span>
              </Link>
            ))}
            <Link href="/products" onClick={closeMenu}>
              <span className="mn-all">All products ({index.length})</span>
            </Link>
          </div>
          {mLink("services", "/services", "Services")}
          <Link className="mn-link hot" href="/services#rent" onClick={closeMenu}>
            Rentals
          </Link>
          {mLink("contact", "/contact", "Contact us")}
        </nav>
        <div className="mn-foot">
          <a className="btn b-wa" href={waLink("Hi PulmoPlus, I need help choosing a machine. Ref WEB-MENU")}>
            <WhatsAppIcon /> WhatsApp us
          </a>
          <a className="btn b-line" href={SITE.phoneHref}>
            <Icon name="phone" size={18} /> {SITE.phone}
          </a>
          <p>
            <b>●</b> {SITE.hours} · {SITE.address.street}, {SITE.address.city}
          </p>
        </div>
      </aside>
    </>
  );
}
