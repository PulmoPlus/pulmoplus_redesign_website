import Link from "next/link";
import JsonLd from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

// Dark inner-page hero with breadcrumbs (and BreadcrumbList schema).
// `crumbs` is [[label, path], ...] ending with the current page.
export default function PageHero({ crumbs, eyebrow, title, children, style }) {
  const trail = [["Home", "/"], ...crumbs];
  return (
    <div className="phero">
      <div className="wrap" style={style}>
        <nav className="crumbs" aria-label="Breadcrumb">
          {trail.map(([label, path], i) =>
            i < trail.length - 1 ? (
              <span key={path} style={{ display: "contents" }}>
                <Link href={path}>{label}</Link>
                <span aria-hidden="true">›</span>
              </span>
            ) : (
              <span key={path} aria-current="page">
                {label}
              </span>
            ),
          )}
        </nav>
        {eyebrow && (
          <div className="eyebrow" style={{ color: "var(--aqua)" }}>
            {eyebrow}
          </div>
        )}
        <h1>{title}</h1>
        {children}
      </div>
      <JsonLd data={breadcrumbSchema(trail)} />
    </div>
  );
}
