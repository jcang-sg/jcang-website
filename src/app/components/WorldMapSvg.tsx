import {
  MAP_VIEWBOX,
  GRATICULE_PATH,
  BORDERS_PATH,
} from "@/lib/world-map-data";

/**
 * Static, precomputed world map (Natural Earth 110m, geoNaturalEarth1 centred
 * on Asia). The path strings are generated at build time by
 * scripts/generate-world-map.mjs, so no map library or geo data ships to the
 * client. Colour is inherited via `currentColor`; opacity/positioning is set
 * by the wrapper. Outlines + graticule only, no land fill, to stay legible.
 */
export default function WorldMapSvg() {
  return (
    <svg
      className="h-full w-full"
      viewBox={MAP_VIEWBOX}
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      stroke="currentColor"
    >
      <path
        d={GRATICULE_PATH}
        strokeWidth={0.6}
        opacity={0.6}
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={BORDERS_PATH}
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
