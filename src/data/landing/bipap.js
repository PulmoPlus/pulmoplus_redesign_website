// Content for the BiPAP Google Ads landing page (/bipap-machine-uae).
// Prices, specs and stock come from src/data/products.js, so they stay in sync with the shop.
// Only facts confirmed by the client go on the page: anything left as null below is hidden.

export const BIPAP_LANDING = {
  path: "/bipap-machine-uae",

  // Fill these in when the client confirms them. null = the line is not shown.
  facts: {
    vatNote: null, // e.g. "Prices include 5% VAT."
    deliveryTime: null, // e.g. "Same or next day in Dubai, 1–2 days in other emirates and Qatar."
    payment: null, // e.g. "Pay by card, bank transfer or cash on delivery."
    tradeLicence: null, // e.g. "Dubai trade licence no. 123456"
    adPermit: null, // e.g. "MOHAP ad permit no. ..." (needed before ads go live)
    reviewsUrl: null, // Google Business Profile review link, e.g. "https://g.page/r/..."
    rental: false, // true once the client confirms BiPAP rental
  },

  // Order of the cards. Every slug must exist in products.js with category "bipap".
  lineup: [
    {
      slug: "bmc-g3-b25a-auto-bipap",
      fits: ["auto"],
      bestFor: "Sleep apnea patients who find CPAP pressure too hard to breathe out against.",
      highlight: "Our lowest-priced Auto BiPAP",
      modes: ["Auto S", "S", "CPAP"],
      backupRate: "No",
      autoAdjust: "Yes, Smart B (Auto S)",
      humidifier: "Built-in heated, 360 mL",
      data: "WiFi / cellular, BMCares app, SD card",
    },
    {
      slug: "resmed-aircurve-10-vauto",
      fits: ["auto"],
      bestFor: "Sleep apnea on high pressures, when you want ResMed comfort and AirView reports.",
      highlight: "ResMed VAuto",
      modes: ["VAuto", "CPAP"],
      backupRate: "No",
      autoAdjust: "Yes, VAuto",
      humidifier: "Integrated heated, 380 mL",
      data: "AirView wireless, SD card",
    },
    {
      slug: "philips-respironics-bipap-s-t",
      fits: ["st"],
      bestFor: "COPD or weak breathing where the doctor sets a backup breath rate.",
      highlight: "Timed backup rate",
      modes: ["S", "T", "ST"],
      backupRate: "Yes, T and ST modes",
      autoAdjust: "No, fixed settings",
      humidifier: "Optional heated humidifier",
      data: "SD card, optional modem",
    },
    {
      slug: "lumis-150",
      fits: ["st", "ivaps"],
      bestFor: "COPD and other chronic breathing conditions where the doctor sets ST or iVAPS.",
      highlight: "Most modes, incl. iVAPS",
      modes: ["CPAP", "S", "T", "ST", "iVAPS", "PAC"],
      backupRate: "Yes, T, ST and iVAPS",
      autoAdjust: "Yes, in iVAPS mode",
      humidifier: "Integrated heated, 380 mL",
      data: "AirView wireless, SD card",
    },
  ],

  // "What did your doctor prescribe?" filter on the page.
  needs: [
    { id: "all", label: "Not sure yet", hint: "Send your prescription on WhatsApp and we will match it for you." },
    { id: "auto", label: "Auto BiPAP / VAuto", hint: "Pressure adjusts on its own through the night. Usually for sleep apnea." },
    { id: "st", label: "ST with backup rate", hint: "Gives a breath if you don't. Usually for COPD and weak breathing." },
    { id: "ivaps", label: "iVAPS / volume target", hint: "Adjusts support to reach a target breathing volume." },
  ],

  // Oxygen cross-sell at the bottom of the page.
  crossSell: ["philips-oxygenate-5", "philips-everflo-oxygen-concentrator", "inogen-rove-6"],
};
