"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import categories from "@/data/categories";
import { searchProducts } from "@/lib/search";
import { formatAED } from "@/lib/site";
import { Icon } from "@/components/ui/Icons";

const shortName = Object.fromEntries(categories.map((c) => [c.slug, c.short]));

export default function SearchBox({ index }) {
  const router = useRouter();
  const pathname = usePathname();
  const listId = useId();
  const formRef = useRef(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);

  const q = query.trim();
  const { results, categories: cats } = useMemo(
    () => (q.length < 2 ? { results: [], categories: [] } : searchProducts(q, index)),
    [q, index],
  );
  const items = results.slice(0, 5);
  const showList = open && q.length >= 2;

  // Close the list whenever the page changes.
  useEffect(() => {
    setOpen(false);
    setActive(-1);
  }, [pathname]);

  useEffect(() => {
    if (!showList) return;
    const onDown = (e) => {
      if (!formRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [showList]);

  const go = (href) => {
    setOpen(false);
    router.push(href);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (active >= 0 && items[active]) return go(`/product/${items[active].slug}`);
    if (q) go(`/search?q=${encodeURIComponent(q)}`);
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
      setActive(-1);
      return;
    }
    if (!showList || !items.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % items.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i <= 0 ? items.length - 1 : i - 1));
    }
  };

  return (
    <form className="search" role="search" autoComplete="off" onSubmit={onSubmit} ref={formRef}>
      <span className="ic">
        <Icon name="search" size={18} />
      </span>
      <input
        type="search"
        name="q"
        value={query}
        placeholder="Search oxygen concentrator, CPAP, ventilator, ResMed..."
        aria-label="Search products"
        role="combobox"
        aria-expanded={showList}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          setActive(-1);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
      />
      <button className="go" type="submit" aria-label="Search">
        <Icon name="arrowRight" size={18} width={2.4} />
      </button>
      <div className="suggest" hidden={!showList}>
        {showList && !items.length && !cats.length && (
          <div className="s-item" style={{ cursor: "default" }}>
            No match. Press Enter to search or ask us on WhatsApp.
          </div>
        )}
        {showList && cats.length > 0 && (
          <div className="s-cat">
            {cats.map((c) => (
              <Link key={c.slug} href={c.path} onClick={() => setOpen(false)}>
                {c.name}
              </Link>
            ))}
          </div>
        )}
        <div role="listbox" id={listId} aria-label="Suggested products">
          {showList &&
            items.map((p, i) => (
              <Link
                key={p.slug}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={i === active}
                className={i === active ? "s-item on" : "s-item"}
                href={`/product/${p.slug}`}
                onClick={() => setOpen(false)}
              >
                <Image src={p.image} alt="" width={44} height={44} />
                <div>
                  <div className="t">{p.name}</div>
                  <div className="p">
                    {shortName[p.category]} · {formatAED(p.price)}
                  </div>
                </div>
              </Link>
            ))}
        </div>
        {showList && (items.length > 0 || cats.length > 0) && (
          <Link className="s-item" href={`/search?q=${encodeURIComponent(q)}`} onClick={() => setOpen(false)}>
            <div className="t" style={{ color: "var(--blue)" }}>
              See all results for “{q}”
            </div>
          </Link>
        )}
      </div>
    </form>
  );
}
