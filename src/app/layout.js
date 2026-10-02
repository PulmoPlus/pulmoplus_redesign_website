import { Manrope, Sora } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Analytics from "@/components/layout/Analytics";
import JsonLd from "@/components/ui/JsonLd";
import { products, toIndexItem } from "@/lib/catalog";
import { businessSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

const sora = Sora({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-sora", display: "swap" });
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Oxygen Concentrator, CPAP & BiPAP Machines in Dubai | PulmoPlus",
    template: "%s | PulmoPlus Dubai",
  },
  description:
    "Buy or rent oxygen concentrators, CPAP, BiPAP and ventilators in Dubai and across the UAE. Original ResMed, Philips and Inogen machines with clear AED prices, home setup and 24/7 WhatsApp support.",
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_AE",
    images: [{ url: "/images/og-pulmoplus.jpg", width: 1200, height: 630, alt: "PulmoPlus respiratory care in Dubai" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#0a2240",
};

// Slim product list for header search; the full catalogue stays on the server.
const searchIndex = products.map(toIndexItem);

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sora.variable} ${manrope.variable}`}>
      <body>
        <JsonLd data={businessSchema()} />
        <div className="announce">
          <div className="wrap">
            <span>
              <b>Delivery and home setup</b> across the UAE · Buy or rent · WhatsApp support 24/7
            </span>
          </div>
        </div>
        <Header index={searchIndex} />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
