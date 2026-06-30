import type { Metadata } from "next";
import BrickCard from "../components/BrickCard";
import Footer from "../components/Footer";
import TextLink from "../components/TextLink";
import { favourites } from "@/lib/favourites";

export const metadata: Metadata = {
  title: "Favourites — JC Ang",
  description: "A few things JC has loved over the years, in order.",
};

// Gentle alternating tilt for the hand-made, scattered look.
const tilts = [-2.5, 1.8, -1.4, 2.2, -2, 1.3, -1.8, 2.4];

export default function FavouritesPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20 sm:py-28">
      <nav className="mb-10 text-lg">
        <TextLink href="/">← Back</TextLink>
      </nav>

      <header>
        <h1 className="font-handwritten text-5xl text-heading sm:text-6xl">
          Favourites
        </h1>
        <p className="mt-3 text-lg leading-relaxed">
          A few things I&apos;ve loved over the years, in order.
        </p>
      </header>

      <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
        {favourites.map((fav, i) => (
          <li key={`${fav.year}-${fav.title}`}>
            <BrickCard
              year={fav.year}
              category={fav.category}
              title={fav.title}
              takeaway={fav.takeaway}
              tilt={tilts[i % tilts.length]}
            />
          </li>
        ))}
      </ul>

      <Footer />
    </main>
  );
}
