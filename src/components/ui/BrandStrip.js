import Image from "next/image";
import { SITE } from "@/lib/site";

// Logo files in /public/images/brands (width × height in px). Brands without a file
// show their name as a wordmark until a logo is added here.
const LOGOS = {
  Philips: ["philips.png", 654, 120],
  BMC: ["bmc.png", 166, 120],
  DeVilbiss: ["devilbiss.png", 547, 120],
  Heyer: ["heyer.png", 426, 120],
  "O2 Concepts": ["o2-concepts.png", 556, 120],
};

export default function BrandStrip() {
  return (
    <ul className="brands" aria-label="Brands we sell">
      {SITE.brands.map((b) => {
        const logo = LOGOS[b];
        return (
          <li key={b} className="brand">
            {logo ? (
              <Image src={`/images/brands/${logo[0]}`} alt={b} width={logo[1]} height={logo[2]} />
            ) : (
              <span>{b}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
