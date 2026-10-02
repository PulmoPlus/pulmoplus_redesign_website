import JsonLd from "@/components/ui/JsonLd";
import { faqSchema } from "@/lib/schema";

// FAQ list plus FAQPage schema, so answers can show in Google and AI answers.
export default function Faq({ faqs, schema = true }) {
  return (
    <>
      <div className="faq">
        {faqs.map((f, i) => (
          <details key={f.q} open={i === 0}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
      {schema && <JsonLd data={faqSchema(faqs)} />}
    </>
  );
}
