import type { CSSProperties } from "react";
import { splitCjk } from "@/lib/cjk";

/**
 * Warm brick-faced card for the favourites page. Text-only: a clay/brown
 * brick face with a soft mortar-like inner shadow. The title leads (large,
 * bold) and the year is a small mono accent so it reads after the title.
 * Any Chinese characters in the title render in the hero's handwritten brush
 * font, for consistency with the home page.
 */
export default function BrickCard({
  year,
  category,
  title,
  takeaway = "",
  tilt = 0,
}: {
  year: number;
  category: string;
  title: string;
  takeaway?: string;
  tilt?: number;
}) {
  return (
    <figure
      style={{ "--tilt": `${tilt}deg` } as CSSProperties}
      className="flex aspect-[4/5] rotate-[var(--tilt)] flex-col justify-between rounded-2xl bg-brick p-5 text-[#f4ecde] ring-1 ring-black/15 shadow-[inset_0_1px_0_rgb(255_255_255/0.12),inset_0_-12px_22px_rgb(0_0_0/0.28),0_10px_22px_rgb(0_0_0/0.16)] transition-transform duration-300 hover:rotate-0 hover:scale-[1.02]"
    >
      <h3 className="font-serif text-2xl font-bold leading-tight sm:text-[1.7rem]">
        {splitCjk(title).map((run, i) =>
          run.cjk ? (
            <span key={i} className="font-handwritten">
              {run.text}
            </span>
          ) : (
            <span key={i}>{run.text}</span>
          ),
        )}
      </h3>
      <figcaption className="mt-4">
        <div className="text-[0.7rem] uppercase tracking-[0.18em] text-[#f4ecde]/70">
          {category}
        </div>
        <div className="font-mono text-sm text-[#f4ecde]/75">{year}</div>
        {takeaway ? (
          <p className="mt-2 text-sm leading-snug text-[#f4ecde]/85">
            {takeaway}
          </p>
        ) : null}
      </figcaption>
    </figure>
  );
}
