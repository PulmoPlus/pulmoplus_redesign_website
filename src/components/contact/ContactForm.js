"use client";

import { useActionState } from "react";
import { submitEnquiry } from "@/app/contact/action";
import { waLink } from "@/lib/site";

const NEEDS = [
  "Oxygen concentrator",
  "Portable oxygen",
  "CPAP machine",
  "BiPAP machine",
  "Ventilator",
  "Masks and supplies",
  "Servicing",
  "Something else",
];

export default function ContactForm() {
  const [state, action, pending] = useActionState(submitEnquiry, { status: "idle" });
  const v = state.values || {};
  const err = state.errors || {};

  if (state.status === "success") {
    return (
      <div className="cform">
        <div className="okmsg" role="status">
          Thanks{state.name ? ` ${state.name}` : ""}, your message is received. Our team will call or WhatsApp you
          shortly.
        </div>
      </div>
    );
  }

  return (
    <form key={state.at || 0} className="cform" action={action} noValidate>
      <div>
        <div className="eyebrow">Send a message</div>
        <h2 style={{ fontSize: "1.6rem", marginTop: 6 }}>Tell us what you need</h2>
        <p className="muted" style={{ margin: "6px 0 0" }}>
          We reply on WhatsApp or by phone.
        </p>
      </div>
      <div className="two">
        <div className="fld">
          <label htmlFor="cf-name">Full name</label>
          <input
            id="cf-name"
            name="name"
            required
            autoComplete="name"
            placeholder="Your name"
            defaultValue={v.name}
            aria-invalid={!!err.name}
            aria-describedby={err.name ? "cf-name-err" : undefined}
          />
          {err.name && (
            <span className="err" id="cf-name-err">
              {err.name}
            </span>
          )}
        </div>
        <div className="fld">
          <label htmlFor="cf-phone">Mobile / WhatsApp</label>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="+971 5X XXX XXXX"
            defaultValue={v.phone}
            aria-invalid={!!err.phone}
            aria-describedby={err.phone ? "cf-phone-err" : undefined}
          />
          {err.phone && (
            <span className="err" id="cf-phone-err">
              {err.phone}
            </span>
          )}
        </div>
      </div>
      <div className="two">
        <div className="fld">
          <label htmlFor="cf-email">Email (optional)</label>
          <input
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            defaultValue={v.email}
            aria-invalid={!!err.email}
            aria-describedby={err.email ? "cf-email-err" : undefined}
          />
          {err.email && (
            <span className="err" id="cf-email-err">
              {err.email}
            </span>
          )}
        </div>
        <div className="fld">
          <label htmlFor="cf-need">Interested in</label>
          <select id="cf-need" name="need" defaultValue={v.need || NEEDS[0]}>
            {NEEDS.map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </div>
      </div>
      <fieldset className="fld" style={{ border: 0, padding: 0, margin: 0 }}>
        <legend style={{ fontWeight: 700, fontSize: ".88rem", marginBottom: 6 }}>I want to</legend>
        <div className="seg">
          {[
            ["buy", "Buy"],
            ["rent", "Rent"],
            ["service", "Get service"],
          ].map(([value, label]) => (
            <label key={value}>
              <input type="radio" name="plan" value={value} defaultChecked={(v.plan || "buy") === value} /> {label}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="fld">
        <label htmlFor="cf-msg">Message</label>
        <textarea
          id="cf-msg"
          name="message"
          rows={4}
          maxLength={2000}
          defaultValue={v.message}
          placeholder="Prescription details, area in the UAE or Qatar, when you need it"
        />
      </div>
      <div hidden>
        <label>
          Leave this empty <input type="text" name="hp_ref" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div aria-live="polite">
        {state.status === "error" && (
          <div className="okmsg warn">
            Sorry, the message could not be sent. Please{" "}
            <a href={waLink()} style={{ textDecoration: "underline" }}>
              message us on WhatsApp
            </a>{" "}
            instead.
          </div>
        )}
      </div>
      <button className="btn b-blue" type="submit" style={{ justifySelf: "start" }} disabled={pending}>
        {pending ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
