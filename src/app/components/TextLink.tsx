import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Inline text link.
 * - Default: a resting gold underline so it reads as clickable; on hover/focus
 *   a gold highlight deepens in behind the text.
 * - highlightOnly: no resting underline, only the gold highlight on hover/focus
 *   (used for the favourites call-to-action and the back link).
 *
 * Internal hrefs use next/link; external hrefs open in a new tab. A
 * focus-visible ring is kept for keyboard users in both modes.
 */
export default function TextLink({
  href,
  children,
  highlightOnly = false,
}: {
  href: string;
  children: ReactNode;
  highlightOnly?: boolean;
}) {
  const external = /^https?:\/\//.test(href);

  const className = [
    "group relative inline-block rounded-sm font-medium",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link",
    highlightOnly
      ? ""
      : "underline decoration-link decoration-2 underline-offset-4",
  ]
    .filter(Boolean)
    .join(" ");

  const inner = (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[-0.12em] top-1/2 h-[1.05em] -translate-y-1/2 overflow-hidden"
      >
        <span className="block h-full w-full origin-left scale-x-0 bg-link/40 transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100" />
      </span>
      <span className="relative">{children}</span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {inner}
    </Link>
  );
}
