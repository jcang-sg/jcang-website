"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

/**
 * Decorative world-map watermark, fixed and full-bleed behind all content.
 * Light mode: desaturated teal-grey near #2C5560; dark mode: faint light
 * linework. Lower opacity on home (~5%), slightly stronger on favourites
 * (~9%). aria-hidden and motionless so it never affects text contrast.
 *
 * The SVG itself is a server component passed in as children, keeping the
 * (large) static path data out of the client JS bundle.
 */
export default function WorldMapBackground({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  // The favourites page has its own brick-wall background, no world map.
  if (pathname?.startsWith("/favourites")) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 text-[#2c5560] opacity-[0.11] dark:text-[#9fb6bd]"
    >
      {children}
    </div>
  );
}
