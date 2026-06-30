"use client";

import { useEffect, useState } from "react";
import { splitCjk } from "@/lib/cjk";

/**
 * Typewriter-style reveal of the greeting on load: handwriting font,
 * letter-by-letter, no cursor. CJK runs are scaled up ~1.15x to match the
 * Latin cap height while staying on the shared baseline. Respects
 * prefers-reduced-motion by showing the full text immediately.
 */
export default function AnimatedName({ name }: { name: string }) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduce) {
      setShown(name.length);
      return;
    }

    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(i);
      if (i >= name.length) clearInterval(id);
    }, 70);

    return () => clearInterval(id);
  }, [name]);

  return (
    <h1 className="font-handwritten text-5xl text-heading md:text-6xl">
      {/* Full text in the a11y tree; the reveal itself is decorative. */}
      <span className="sr-only">{name}</span>
      <span aria-hidden="true">
        {splitCjk(name.slice(0, shown)).map((run, i) =>
          run.cjk ? (
            <span key={i} className="align-baseline text-[1.15em]">
              {run.text}
            </span>
          ) : (
            <span key={i}>{run.text}</span>
          ),
        )}
      </span>
    </h1>
  );
}
