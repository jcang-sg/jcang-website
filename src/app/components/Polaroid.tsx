import type { CSSProperties } from "react";
import Image from "next/image";
import type { Season } from "@/lib/favourites";
import { splitCjk } from "@/lib/cjk";

// Per season: the duct-tape accent colour, and a season-tinted cream for the
// photo well of title-only cards.
const SEASON: Record<Season, { tape: string; well: string }> = {
  spring: { tape: "#e8a0bf", well: "#eddcd8" },
  summer: { tape: "#7ca82b", well: "#dadebe" },
  autumn: { tape: "#d2691e", well: "#ecd6c0" },
  winter: { tape: "#a8c8d8", well: "#e1e6e3" },
};

// Render text with CJK runs in the hero brush font, scaled up for an optical
// (visual-size) match with the Latin glyphs. Titles need a larger scale than
// takeaways so a title-only CJK card reads the same size as an English title.
function withBrush(text: string, scale = 1.2) {
  return splitCjk(text).map((run, i) =>
    run.cjk ? (
      <span
        key={i}
        className="align-baseline font-handwritten font-normal"
        style={{ fontSize: `${scale}em` }}
      >
        {run.text}
      </span>
    ) : (
      <span key={i}>{run.text}</span>
    ),
  );
}

/**
 * A favourites entry as a classic portrait polaroid pinned to the board:
 * thick off-white frame with a fatter bottom edge, a soft neutral photo well
 * holding the centred title, and a centred caption (year, category, takeaway)
 * below. A translucent matte-black duct-tape strip across the top carries the
 * season colour as an accent band. `tilt`/`offset` give the gentle stagger.
 */
export default function Polaroid({
  season,
  title,
  image,
  year,
  category,
  takeaway,
  tilt = 0,
  offset = 0,
}: {
  season: Season;
  title: string;
  image?: string;
  year?: number;
  category?: string;
  takeaway?: string;
  tilt?: number;
  offset?: number;
}) {
  const placeholder = year === undefined;

  return (
    <figure
      style={
        { transform: `translateX(${offset}px) rotate(${tilt}deg)` } as CSSProperties
      }
      className="relative w-56 rounded-[3px] bg-[#fbfaf5] p-3 pb-5 shadow-[0_2px_4px_rgb(0_0_0/0.3),0_18px_30px_-8px_rgb(0_0_0/0.5)]"
    >
      {/* Duct tape: translucent matte black with a season-colour accent band. */}
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-[-15px] z-10 h-7 w-24 -translate-x-1/2 -rotate-6 overflow-hidden bg-[rgb(22_22_22/0.82)] shadow-[0_3px_5px_rgb(0_0_0/0.4)]"
      >
        <span
          className="absolute inset-x-0 bottom-0 h-[6px]"
          style={{ backgroundColor: SEASON[season].tape }}
        />
      </span>

      {/* Photo well: an image if provided, otherwise the centred title on the
          season-tinted cream fill. */}
      <div
        className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[1px] px-3"
        style={{ backgroundColor: SEASON[season].well }}
      >
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="224px"
            loading="eager"
            className="object-cover"
          />
        ) : (
          <h3 className="text-center font-serif text-base font-bold leading-snug text-[#1f2a2e]">
            {withBrush(title, 1.55)}
          </h3>
        )}
      </div>

      {/* Caption in the bottom frame: centred and tight. */}
      <figcaption className="px-2 pt-3 text-center">
        {placeholder ? (
          <p className="font-handwritten text-base text-[#856325]">
            to be lived
          </p>
        ) : (
          <>
            <div className="font-mono text-[0.7rem] text-[#6e4f35]">{year}</div>
            <div className="text-[0.62rem] uppercase tracking-[0.15em] text-[#6e4f35]">
              {category}
            </div>
            {takeaway ? (
              <p className="mt-1 whitespace-pre-line font-handwritten text-sm leading-snug text-[#856325]">
                {withBrush(takeaway)}
              </p>
            ) : null}
          </>
        )}
      </figcaption>
    </figure>
  );
}
