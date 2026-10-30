"use client";

import { useActionState, useEffect } from "react";
import { submitEnquiry } from "@/app/contact/action";
import { waLink } from "@/lib/site";

// Short enquiry form for landing pages. It sends through the same server action as the
// contact page, and reports a GA4 generate_lead event so Google Ads can count form leads.
export default function LeadForm({ need, refCode, situations }) {
  const [state, action, pending] = useActionState(submitEnquiry, { status: "idle" });
  const v = state.values || {};
  const err = state.errors || {};

  useEffect(() => {
    if (state.status !== "success") return;
    const params = { form: refCode, page_path: window.location.pathname };
    if (typeof window.gtag === "function") window.gtag("event", "generate_lead", params);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "generate_lead", ...params });
  }, [state.status, state.at, refCode]);

  if (state.status === "success") {
    return (
      <div className="lp-form lp-form-done" role="status">
        <b>Thanks{state.name ? ` ${state.name}` : ""}, we have your request.</b>
        <p>Our team will call or WhatsApp you shortly. Keep your prescription or sleep study handy.</p>
      </div>
    );
  }

  const fallback = [
    "Hi PulmoPlus, I need help choosing a BiPAP machine.",
    v.name && `Name: ${v.name}`,
    v.phone && `Mobile: ${v.phone}`,
    v.message && `Situation: ${v.message}`,
    `Ref ${refCode}`,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <form key={state.at || 0} className="lp-form" action={action} noValidate>
      <input type="hidden" name="need" value={need} />
      <input type="hidden" name="plan" value="buy" />
      <div className="fld">
        <label htmlFor="lf-name">Your name</label>
        <input
          id="lf-name"
          name="name"
          required
          autoComplete="name"
          defaultValue={v.name}
          aria-invalid={!!err.name}
          aria-describedby={err.name ? "lf-name-err" : undefined}
        />
        {err.name && (
          <span className="err" id="lf-name-err">
            {err.name}
          </span>
        )}
      </div>
      <div className="fld">
        <label htmlFor="lf-phone">Mobile / WhatsApp</label>
        <input
          id="lf-phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="+971 5X XXX XXXX"
          defaultValue={v.phone}
          aria-invalid={!!err.phone}
          aria-describedby={err.phone ? "lf-phone-err" : undefined}
        />
        {err.phone && (
          <span className="err" id="lf-phone-err">
            {err.phone}
          </span>
        )}
      </div>
      <div className="fld">
        <label htmlFor="lf-msg">What fits best?</label>
        <select id="lf-msg" name="message" defaultValue={v.message || situations[0]}>
          {situations.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <div hidden>
        <label>
          Leave this empty <input type="text" name="hp_ref" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div aria-live="polite">
        {state.status === "error" && (
          <div className="okmsg warn">
            Sorry, that didn&apos;t go through.{" "}
            <a href={waLink(fallback)} style={{ textDecoration: "underline" }}>
              Send it on WhatsApp
            </a>{" "}
            instead, your details are filled in.
          </div>
        )}
      </div>
      <button className="btn b-blue" type="submit" disabled={pending}>
        {pending ? "Sending..." : "Call me back"}
      </button>
    </form>
  );
}
