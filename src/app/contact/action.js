"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { SITE } from "@/lib/site";

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
const PLANS = { buy: "Buy", rent: "Rent", service: "Get service" };

const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

// Best-effort per-IP limit (per server instance). Add Turnstile or a shared store if spam appears.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const field = (formData, name, max) =>
  String(formData.get(name) ?? "")
    .trim()
    .slice(0, max);

export async function submitEnquiry(_prev, formData) {
  // Honeypot: real visitors never fill this hidden field.
  if (field(formData, "hp_ref", 100)) return { status: "success", name: "", at: Date.now() };
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (limited(ip)) return { status: "error", at: Date.now() };

  const data = {
    name: field(formData, "name", 100),
    phone: field(formData, "phone", 30),
    email: field(formData, "email", 120),
    need: field(formData, "need", 40),
    plan: field(formData, "plan", 10),
    message: field(formData, "message", 2000),
  };

  const errors = {};
  if (data.name.length < 2) errors.name = "Please add your name.";
  if (!/^\+?[\d\s()-]{7,20}$/.test(data.phone)) errors.phone = "Please add a valid mobile number.";
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Please check the email address.";
  if (!NEEDS.includes(data.need)) data.need = "Something else";
  if (!PLANS[data.plan]) data.plan = "buy";
  if (Object.keys(errors).length) return { status: "invalid", errors, values: data, at: Date.now() };

  if (!process.env.RESEND_API_KEY) {
    console.error(
      "Contact form: RESEND_API_KEY is missing in .env.local (or the hosting env), so the enquiry was not emailed.",
    );
    return { status: "error", values: data, at: Date.now() };
  }

  const rows = [
    ["Name", data.name],
    ["Mobile / WhatsApp", data.phone],
    ["Email", data.email || "-"],
    ["Interested in", data.need],
    ["Wants to", PLANS[data.plan]],
    ["Message", data.message || "-"],
  ];

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      // onboarding@resend.dev works without a verified domain, but only delivers to the email
      // the Resend account was created with, so create that account with pulmoplus11@gmail.com.
      // After verifying pulmoplus.com in Resend, set CONTACT_FROM to e.g. "PulmoPlus <website@pulmoplus.com>".
      from: process.env.CONTACT_FROM || "PulmoPlus Website <onboarding@resend.dev>",
      to: process.env.CONTACT_TO || SITE.email,
      replyTo: data.email || undefined,
      subject: `Website enquiry: ${data.need} (${PLANS[data.plan]}) from ${data.name}`,
      text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
      html: rows.map(([k, v]) => `<p><strong>${k}:</strong><br>${escapeHtml(v).replace(/\n/g, "<br>")}</p>`).join(""),
    });
    if (error) throw new Error(`${error.name}: ${error.message}`);
    return { status: "success", name: data.name, at: Date.now() };
  } catch (err) {
    console.error("Contact form: Resend could not send the enquiry.", err.message);
    return { status: "error", values: data, at: Date.now() };
  }
}