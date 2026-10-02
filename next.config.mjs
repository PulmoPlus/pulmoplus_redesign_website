// Old /products?category=<slug> links (nav, footer, ads, Google) move to the keyword URLs.
const CATEGORY_PATHS = {
  "portable-oxygen": "/portable-oxygen-concentrators-dubai",
  "oxygen-and-nebuliser": "/oxygen-concentrators-dubai",
  cpap: "/cpap-machines-dubai",
  bipap: "/bipap-machines-dubai",
  ventilator: "/ventilators-dubai",
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  poweredByHeader: false,
  async redirects() {
    return [
      // The old site shared product links as /products/<slug>.
      { source: "/products/:slug", destination: "/product/:slug", permanent: true },
      ...Object.entries(CATEGORY_PATHS).map(([slug, destination]) => ({
        source: "/products",
        has: [{ type: "query", key: "category", value: slug }],
        destination,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
