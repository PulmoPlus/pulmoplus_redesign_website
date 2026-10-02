"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatAED, waLink } from "@/lib/site";

const QUESTIONS = [
  {
    key: "need",
    label: "1. What is it for?",
    options: [
      ["oxygen", "Low oxygen"],
      ["sleep", "Sleep apnea or snoring"],
      ["copd", "COPD or weak breathing"],
      ["vent", "Life support"],
    ],
  },
  {
    key: "where",
    label: "2. Where will it be used?",
    options: [
      ["home", "At home"],
      ["travel", "Home and travel"],
    ],
  },
  {
    key: "plan",
    label: "3. Buy or rent?",
    options: [
      ["buy", "Buy"],
      ["rent", "Rent"],
    ],
  },
];

// need -> where -> suggested product slug
const PICKS = {
  oxygen: { home: "philips-everflo-oxygen-concentrator", travel: "inogen-rove-6" },
  sleep: { home: "resmed-airsense-11", travel: "resmed-airmini" },
  copd: { home: "resmed-aircurve-10-vauto", travel: "philips-respironics-bipap-s-t" },
  vent: { home: "resmed-astral-150", travel: "resmed-astral-150" },
};

export default function MachineFinder({ products }) {
  const [ans, setAns] = useState({});
  const done = ans.need && ans.where && ans.plan;
  const p = done ? products.find((x) => x.slug === PICKS[ans.need][ans.where]) : null;
  const msg = p
    ? `Hi PulmoPlus, I want to ${ans.plan} a machine like the ${p.name} for ${
        ans.where === "home" ? "home use" : "home and travel"
      }. Ref FINDER`
    : "";

  return (
    <div className="finder">
      <div>
        <div className="eyebrow">Machine finder</div>
        <h2>Not sure which machine you need?</h2>
        <p className="muted">
          Answer three questions. We suggest a machine and write the WhatsApp message for you. Your doctor&apos;s
          prescription decides the final setting.
        </p>
      </div>
      <div>
        {QUESTIONS.map((q) => (
          <div className="q" key={q.key}>
            <div className="lbl" id={`finder-${q.key}`}>
              {q.label}
            </div>
            <div className="opts" role="group" aria-labelledby={`finder-${q.key}`}>
              {q.options.map(([v, label]) => (
                <button
                  key={v}
                  type="button"
                  aria-pressed={ans[q.key] === v}
                  onClick={() => setAns((a) => ({ ...a, [q.key]: v }))}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        ))}
        <div className="fres" aria-live="polite">
          {p ? (
            <>
              <Image src={p.image} alt="" width={70} height={70} />
              <div style={{ minWidth: 0 }}>
                <b>Suggested: {p.name}</b>
                <div className="msg">
                  {ans.plan === "rent" ? "Available to rent. " : `${formatAED(p.price)}. `}WhatsApp message: “{msg}”
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                  <a className="btn b-wa" style={{ padding: "8px 14px", fontSize: ".85rem" }} href={waLink(msg)}>
                    Send on WhatsApp
                  </a>
                  <Link
                    className="btn b-line"
                    style={{ padding: "8px 14px", fontSize: ".85rem" }}
                    href={`/product/${p.slug}`}
                  >
                    View machine
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div>
              <b>Pick your answers</b>
              <div className="msg">Your suggestion appears here.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
