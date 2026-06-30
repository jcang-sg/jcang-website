import type { CSSProperties } from "react";
import Image from "next/image";
import type { Season } from "@/lib/favourites";
import { splitCjk } from "@/lib/cjk";

// Season colour carried as the duct-tape accent band.
const TAPE: Record<Season, string> = {
  spring: "#e8a0bf",
  summer: "#7ca82b",
  autumn: "#d2691e",
  winter: "#a8c8d8",
};

// Render text with CJK runs in the hero brush font, scaled ~1.2x for an
// optical (visual-size) match with the Latin glyphs.
function withBrush(text: string) {
  return splitCjk(text).map((run, i) =>
    run.cjk ? (
      <span
        key={i}
        className="align-baseline text-[1.2em] font-handwritten font-normal"
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
          style={{ backgroundColor: TAPE[season] }}
        />
      </span>

      {/* Photo well: a poster image if provided, otherwise the centred title. */}
      <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[1px] bg-[#eee9dd] px-3">
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
            {withBrush(title)}
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
