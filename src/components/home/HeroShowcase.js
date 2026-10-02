"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { formatAED } from "@/lib/site";

// Rotating featured machine in the hero. The first slide is server rendered, so the hero is complete without JS.
export default function HeroShowcase({ slides }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [stopped, setStopped] = useState(false);

  useEffect(() => {
    if (paused || stopped || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, [paused, stopped, slides.length]);

  const p = slides[i];
  return (
    <div
      className="stage"
      role="group"
      aria-roledescription="carousel"
      aria-label="Featured machines"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="ring" />
      <div className="ring r2" />
      <div className="plate">
        <Image
          src={p.image}
          alt={p.name}
          width={360}
          height={360}
          sizes="(max-width: 900px) 60vw, 360px"
          priority={i === 0}
        />
      </div>
      {p.facts.map(([label, value], k) => (
        <div key={k} className={`float f${k + 1}`}>
          {label}
          <b>{value}</b>
        </div>
      ))}
      <div className="show-name">
        <b>
          {p.name} · {formatAED(p.price)}
        </b>
        <Link href={`/product/${p.slug}`}>View details</Link>
      </div>
      <div className="dots">
        <button
          type="button"
          className="pause"
          aria-label={stopped ? "Play slideshow" : "Pause slideshow"}
          aria-pressed={stopped}
          onClick={() => setStopped((s) => !s)}
        >
          {stopped ? "▶" : "❚❚"}
        </button>
        {slides.map((s, k) => (
          <button
            key={s.slug}
            type="button"
            aria-label={`Show ${s.name}`}
            aria-pressed={k === i}
            onClick={() => setI(k)}
          />
        ))}
      </div>
    </div>
  );
}
