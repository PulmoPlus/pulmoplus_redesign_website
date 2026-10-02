"use client";

import { useId, useState } from "react";

// Tabs for the product page. Every pane is rendered (hidden ones use `hidden`),
// so specs, features and FAQ are all in the HTML that Google and AI crawlers read.
export default function ProductTabs({ tabs }) {
  const [active, setActive] = useState(tabs[0].key);
  const id = useId();

  const onKeyDown = (e) => {
    const i = tabs.findIndex((t) => t.key === active);
    const next = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : null;
    if (next === null) return;
    e.preventDefault();
    const t = tabs[(next + tabs.length) % tabs.length];
    setActive(t.key);
    document.getElementById(`${id}-tab-${t.key}`)?.focus();
  };

  return (
    <>
      <div className="ptabs" role="tablist" aria-label="Product information" onKeyDown={onKeyDown}>
        {tabs.map((t) => (
          <button
            key={t.key}
            id={`${id}-tab-${t.key}`}
            type="button"
            role="tab"
            aria-selected={active === t.key}
            aria-controls={`${id}-pane-${t.key}`}
            tabIndex={active === t.key ? 0 : -1}
            onClick={() => setActive(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t) => (
        <div
          key={t.key}
          id={`${id}-pane-${t.key}`}
          className="tabpane"
          role="tabpanel"
          aria-labelledby={`${id}-tab-${t.key}`}
          hidden={active !== t.key}
        >
          {t.content}
        </div>
      ))}
    </>
  );
}
