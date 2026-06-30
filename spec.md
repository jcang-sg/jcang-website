# spec.md — jcang.org

Build spec for JC's personal site, modelled on the structure and feel of petergyang.com. Reconstructed and inferred, not copied from the author's source. This file matches the built site and is the contract for any future rebuild.

## 0. Build guardrail (read first)
Implement every component as original code from the descriptions below. Do not copy petergyang's repo source. The reference site has no licence, so any copied code carries permanent attribution debt. Build the behaviour fresh.

## 1. Purpose
A single-screen personal hub that routes visitors to JC's real outputs (newsletter, channel, favourites) rather than hosting long-form content. The site is a front door, not a destination. Success is consistency and quality of output, not traffic.

## 2. Principles
1. Show, do not tell. Link real work instead of describing it.
2. One screen for the home page. If a section does not earn its place, cut it.
3. Self-maintaining. Recent posts pull automatically so the page never goes stale.
4. Personality through craft, not copy. Small hand-made details signal taste.
5. Accessible by default. Motion is optional and degrades gracefully.

## 3. Tech stack
- Framework: Next.js (App Router), TypeScript, React
- Styling: Tailwind CSS, utility classes
- Hosting: Vercel, auto-deploy on push to main
- Content source: Substack public feed via RSS, no API key

## 4. Pages and routes
| Route | Purpose |
|---|---|
| `/` | Home. Hero (headline, headshot, bio prose), follow line, favourites link, footer |
| `/favourites` | Brick-card gallery of films, games and other picks, chronological (British spelling) |
| `/api/posts` | Server route, latest Substack posts (see section 8) |

No other routes. No blog, no auth, no admin.

## 5. Home page layout (top to bottom)
1. Theme toggle, top right.
2. Animated headline: "Hi, I'm JC | 俊成。"
3. Headshot, directly below the headline.
4. Bio prose, the paragraphs in section 11.
5. Favourites link: "Some of my favourites".
6. Footer: the sign-off line in section 11.

## 6. Components
1. AnimatedName — typewriter-style reveal of the headline on load. Handwritten brush font, teal #2C5560. Chinese glyphs "俊成。" scaled about 1.15x to match Latin cap height, same baseline.
2. CircleLink / inline link — gold #C49A4A underline at rest, gold highlight on hover, focus-visible for keyboard.
3. ThemeToggle — light and dark, persists across visits.
4. PostList — renders latest posts from /api/posts.
5. BrickCard — favourites card, warm brick face (brown family near #6E4F35), rounded rectangle, soft mortar edge. No LEGO studs or tubes. Title leads, then footer block.
6. WorldMapBackground — see section 10b.
7. PaperTexture — subtle paper-grain overlay site-wide.

## 7. Headshot
- File: `public/jcang-headshot-watercolours.png`, transparent background.
- Ink-and-watercolour portrait, knorii palette washes (teal, brown, oatmeal, gold accents).
- Rendered full, floating on the background, no circular frame, about 220px wide, crisp on retina. Alt text "JC".
- Dark mode: no white halo at the watercolour edge.

## 8. Data contract — latest posts (machine-readable)
- Route: GET /api/posts
- Source: https://knorii.substack.com/feed (RSS)
- Caching: revalidate hourly
- Limit: newest 3 by published date, descending
- Response shape: { "posts": [ { "title": "string", "url": "string", "publishedAt": "ISO 8601" } ] }
- Failure: if unreachable or empty, return empty posts array and render nothing. Rest of page still loads.

## 9. Favourites (machine-readable, human-facing brick cards)
Chronological. Card text format, three lines: title (heading), then footer block of category, year, takeaway. Takeaways pending, written by JC. Two 2025 cards order: 邓紫棋 I Am Gloria first, then The Daily Dad.

```json
{
  "favourites": [
    { "year": 1993, "category": "Film Series", "title": "Jurassic Park", "takeaway": "" },
    { "year": 1997, "category": "Anime", "title": "Pokémon", "takeaway": "" },
    { "year": 1998, "category": "Comic-novel", "title": "神雕侠侣", "takeaway": "" },
    { "year": 2001, "category": "Computer game", "title": "Championship Manager 3", "takeaway": "" },
    { "year": 2008, "category": "Film Series", "title": "叶问", "takeaway": "" },
    { "year": 2020, "category": "Documentary", "title": "The Last Dance", "takeaway": "" },
    { "year": 2022, "category": "Book", "title": "Letter to Grandson Jun: I found myself, hiking!", "takeaway": "" },
    { "year": 2024, "category": "TV Series", "title": "Avatar: The Last Airbender", "takeaway": "" },
    { "year": 2025, "category": "Live concert", "title": "邓紫棋 I Am Gloria", "takeaway": "" },
    { "year": 2025, "category": "Book", "title": "The Daily Dad", "takeaway": "" }
  ]
}
```
Chinese titles render in the hero brush font. Text-only for now, no external images (copyright). JC may add own photos or original art later.

## 10a. Design system (human-facing)
- Light mode: background oatmeal #F3F2E7, headline and brush teal #2C5560, body ink #1F2A2E, links gold #C49A4A.
- Dark mode: equivalent tokens, light linework and text on dark ground, footer text at WCAG AA.
- Fonts: Fraunces (serif headings and card titles), Instrument Sans (body and prose), JetBrains Mono (mono accents), plus a handwritten brush font for the hero and the favourites page headline.
- Body and prose sized about 10 to 15 percent down from the scaffold default for balance against the headshot.
- Spacing: generous whitespace, single column, comfortable line length.
- Motion: typewriter headline only. Nothing blocks reading.

## 10b. World-map background (machine-readable + human-facing)
- Data: Natural Earth countries-110m (public domain) via world-atlas TopoJSON. Original, no external map image.
- Projection: d3-geo geoNaturalEarth1, rotated to centre on Asia (rotate longitude by -105).
- Render: thin country-border mesh plus a faint 15-degree graticule. Generated once as a static SVG at build time, no map library shipped to client.
- Placement: fixed, full bleed, behind all content. Decorative, aria-hidden, no motion.
- Opacity: light mode teal-grey near #2C5560, about 5 percent on home, about 9 percent on favourites. Dark mode light linework, same split.
- Layer order back to front: map, PaperTexture grain, content. Brick cards stay fully opaque, map shows only through the oatmeal margins.
- Never reduce text contrast. WCAG AA both themes. If muddy, drop land fill, keep outlines plus graticule.

## 11. Content
### Bio (prose)
I'm a dad of three kids and a dog named Chestnut. For over a decade, I held commercial roles at Keppel and ESR, connecting the hard infrastructure behind the internet, from data centres to subsea cables. Then I joined HIDDEN, a location-based entertainment studio, connecting the stories behind people, places and brand IPs.

My third little one is a wake-up call to be present and document these fleeting years, while maintaining the Airbender Aang look. After months of parenting-in-the-trenches, I now write a newsletter featuring practical AI workflows for busy parents.

You can follow my builder journey on Instagram, LinkedIn and GitHub.

### Inline links
- Keppel: https://www.keppel.com/
- ESR: https://www.esr.com/
- HIDDEN: https://hiddenxp.com/
- document: https://www.youtube.com/@BotakBricks
- look: https://www.instagram.com/p/DPs0i72kicz/
- newsletter: https://knorii.substack.com/

### Follow links
- Instagram: https://www.instagram.com/skyvaulter19/
- LinkedIn: https://www.linkedin.com/in/junchengang/
- GitHub: https://github.com/jcang-sg

### Footer
Made in 🇸🇬 with the mantra 'Practise you must, Fearless you must be.'

## 12. Accessibility
1. Honour prefers-reduced-motion: disable the typewriter when set.
2. Semantic HTML: real headings, lists, nav, links.
3. Keyboard: every interactive element reachable, visible on focus.
4. Images: meaningful alt text, decorative overlays marked aria-hidden.
5. Contrast: both themes meet WCAG AA for text.

## 13. Deployment and workflow
- Repo on GitHub (jcang-sg), Vercel connected, deploy every push to main.
- Commit spec.md and the .claude folder so the build method is part of the public proof.

## 14. Constraints
1. No kids' names or faces anywhere on the public site. Kids referenced only as "three kids". One nationality cue, the flag in the footer.
2. No client-side calls to Substack. All feed access via /api/posts.
3. No external images for favourites. Text-only, or JC's own photos / original art.
4. Static and fast. No analytics, no tracking, no cookies beyond the theme preference.
5. No page-peel corner effect. Removed deliberately to avoid mirroring the reference site. Do not reintroduce.
