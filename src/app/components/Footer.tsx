/**
 * Site footer sign-off. `onDark` uses a fixed light tone for placement on a
 * dark background (the favourites walnut), independent of the site theme.
 */
export default function Footer({ onDark = false }: { onDark?: boolean }) {
  const tone = onDark
    ? "border-white/20 text-[#e6dcc8]"
    : "border-border text-muted dark:text-[#aab3b3]";

  return (
    <footer className={`mt-20 border-t pt-6 text-sm italic ${tone}`}>
      Made in 🇸🇬 with the mantra &apos;Practise you must, Fearless you must
      be.&apos;
    </footer>
  );
}
