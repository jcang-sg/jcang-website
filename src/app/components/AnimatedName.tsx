import { splitCjk } from "@/lib/cjk";

/**
 * Static headline in the handwritten brush font, teal. No reveal animation —
 * it simply appears. CJK runs are scaled up ~1.15x to match the Latin cap
 * height on the shared baseline. Responsive sizing keeps it on a single line
 * around 375px and larger on desktop.
 */
export default function AnimatedName({ name }: { name: string }) {
  return (
    <h1 className="font-handwritten text-3xl text-heading sm:text-5xl lg:text-6xl">
      {splitCjk(name).map((run, i) =>
        run.cjk ? (
          <span key={i} className="align-baseline text-[1.15em]">
            {run.text}
          </span>
        ) : (
          <span key={i}>{run.text}</span>
        ),
      )}
    </h1>
  );
}
