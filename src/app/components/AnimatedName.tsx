// CJK ideographs (e.g. 俊, 成) are scaled up to read alongside the Latin caps.
// Everything else — Latin letters and CJK punctuation like 。— stays at the
// Latin size, all on the shared baseline.
const IDEOGRAPHS = /[㐀-鿿豈-﫿]/;
const SPLIT = /[㐀-鿿豈-﫿]+|[^㐀-鿿豈-﫿]+/g;

/**
 * Static headline in the handwritten brush font, teal. No reveal animation —
 * it simply appears. Ideographs are scaled ~1.3x; the 。and Latin stay at 1x.
 * Responsive sizing keeps it on a single line down to 360px and larger on
 * desktop.
 */
export default function AnimatedName({ name }: { name: string }) {
  return (
    <h1 className="font-handwritten text-3xl text-heading sm:text-5xl lg:text-6xl">
      {(name.match(SPLIT) ?? []).map((run, i) =>
        IDEOGRAPHS.test(run) ? (
          <span key={i} className="align-baseline text-[1.3em]">
            {run}
          </span>
        ) : (
          <span key={i}>{run}</span>
        ),
      )}
    </h1>
  );
}
