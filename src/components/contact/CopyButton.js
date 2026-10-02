"use client";

import { useState } from "react";

export default function CopyButton({ value, label = "Copy" }) {
  const [text, setText] = useState(label);
  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setText("Copied");
    } catch {
      setText(value);
    }
    setTimeout(() => setText(label), 2000);
  };
  return (
    <button className="btn b-line" type="button" onClick={onClick} aria-live="polite">
      {text}
    </button>
  );
}
