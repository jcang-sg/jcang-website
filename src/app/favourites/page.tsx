import type { Metadata } from "next";
import Footer from "../components/Footer";
import Polaroid from "../components/Polaroid";
import TextLink from "../components/TextLink";
import WorldMapSvg from "../components/WorldMapSvg";
import { favourites } from "@/lib/favourites";

export const metadata: Metadata = {
  title: "Favourites — JC Ang",
  description: "Stories JC has loved across his seasons.",
};

// Gentle zigzag down the centre line: small left/right offsets and slight
// rotations between about -4 and +4 degrees, fourteen cards.
const tilts = [-3, 2.5, -2, 3, -3.5, 2, -2.5, 3.5, -2, 2.5, -3, 2, -1.5, 3];
const offsets = [-18, 16, -12, 20, -16, 14, -20, 12, -14, 18, -16, 14, -10, 16];

export default function FavouritesPage() {
  return (
    <>
      {/* Dark walnut board with a faint world-map watermark, fixed and
          full-bleed behind the polaroids (always this treatment regardless of
          site theme). */}
      <div aria-hidden="true" className="board fixed inset-0 -z-10">
        <div className="absolute inset-0 text-[#e3c4b8] opacity-[0.12]">
          <WorldMapSvg />
        </div>
      </div>

      <main className="relative mx-auto flex max-w-md flex-col gap-10 px-6 pt-20">
        <nav className="text-lg text-[#f3e8dc]">
          <TextLink href="/" reverseHighlight>
            ← Back
          </TextLink>
        </nav>

        <header>
          <h1 className="font-handwritten text-3xl text-[#7fb2bd] sm:text-5xl">
            Favourites
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-[#f3e8dc]">
            Stories I&apos;ve loved across my seasons.
          </p>
        </header>

        <ul className="flex flex-col items-center gap-12">
          {favourites.map((fav, i) => (
            <li key={`${fav.season}-${fav.title}-${i}`}>
              <Polaroid
                season={fav.season}
                title={fav.title}
                image={fav.image}
                imageScale={fav.imageScale}
                year={fav.year}
                category={fav.category}
                takeaway={fav.takeaway}
                origins={fav.origins}
                tilt={tilts[i % tilts.length]}
                offset={offsets[i % offsets.length]}
              />
            </li>
          ))}
        </ul>

      </main>

      {/* Footer at the wider bio-page width so the sign-off fits one line. */}
      <div className="relative mx-auto max-w-2xl px-6 pb-20">
        <Footer onDark />
      </div>
    </>
  );
}
