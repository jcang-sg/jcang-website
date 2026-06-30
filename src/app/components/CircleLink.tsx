import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Link wrapped in a hand-drawn circle that draws itself on hover/focus.
 * Internal hrefs use next/link; external hrefs open in a new tab.
 */
export default function CircleLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const external = /^https?:\/\//.test(href);

  const inner = (
    <span className="relative inline-block px-2 py-0.5">
      <span className="relative z-10">{children}</span>
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible text-accent"
        viewBox="0 0 120 46"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* Intentionally irregular for a hand-drawn feel. */}
        <path
          d="M61 5 C92 2 116 11 113 23 C111 36 80 43 55 42 C26 41 5 34 7 22 C9 9 35 7 64 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );

  const className =
    "circle-link inline-block rounded-sm font-medium transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

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
