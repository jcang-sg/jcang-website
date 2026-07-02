# spec.md, jcang.org

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
| `/favourites` | Taped-polaroid gallery of films, games and other picks, one chronological column colour-coded by life-season tape (British spelling) |
| `/api/posts` | Server route, latest Substack posts (see section 8) |

No other routes. No blog, no auth, no admin.

## 5. Home page layout (top to bottom)
1. Theme toggle, top right.
2. Static headline: "Hi, I'm JC | 俊成。" (no reveal animation; it simply appears).
3. Headshot, directly below the headline.
4. Bio prose, the paragraphs in section 11.
5. Favourites link: "Some of my favourites".
6. Footer: the sign-off line in section 11.

## 6. Components
1. AnimatedName: the hero headline, rendered static (no typewriter or reveal; it simply appears). Handwritten brush stack, teal (--heading, #2C5560 light / #7FB2BD dark). CJK ideographs (俊成) scaled 1.3x for an optical match with the Latin caps; the 。and Latin stay at 1x, all on the shared baseline. Responsive: one line down to 360px, larger on desktop. (Name is historical; there is no longer any animation.)
2. TextLink: inline link, gold (#C49A4A) underline treatment, gold highlight on hover, focus-visible for keyboard. `reverseHighlight` variant for dark surfaces (the favourites "← Back"). CircleLink still exists in the repo but the pages use TextLink.
3. ThemeToggle: light and dark, persists across visits.
4. PostList: renders latest posts from /api/posts.
5. Polaroid: favourites card (replaces the earlier BrickCard). A classic portrait polaroid: thick off-white frame (#FBFAF5) with a fatter bottom edge, a 4:5 photo well that shows the poster image if provided or the centred title on a season-tinted cream fill, and a centred caption below (year, category, handwritten takeaway). A translucent matte-black duct-tape strip across the top carries the season accent colour. Each card gets a gentle tilt (about -4 to +4 degrees) and horizontal offset for a staggered, pinned-to-the-board look. Future-season placeholders show "to be lived". See section 9.
6. WorldMapBackground / WorldMapSvg: see section 10b.
7. PaperTexture: subtle paper-grain overlay site-wide.
8. Footer: sign-off line (section 11); `onDark` variant for the favourites board.

## 7. Headshot
- File: `public/jcang-headshot-watercolours.png`, transparent background.
- Ink-and-watercolour portrait, knorii palette washes (teal, brown, oatmeal, gold accents).
- Rendered full, floating on the background, no circular frame, about 220px wide, crisp on retina. Alt text "JC".
- Dark mode: no white halo at the watercolour edge.

## 7b. Link-preview image (Open Graph + Twitter)
The card shown when the site is shared (WhatsApp, Facebook, LinkedIn, iMessage, Slack, X).
- Subject: the sea-lion logo, not the headshot. Sourced from `public/sealion-logo.png` (1254x1254, a dark-brown silhouette on cream). The silhouette is masked off its cream background and composited onto exact oatmeal.
- Format: square, exactly 1200x1200, oatmeal #F3F2E7 filling the whole canvas. Square is deliberate — it pairs with the Twitter `summary` card (section 7c) for a small side-thumbnail preview rather than a wide banner.
- Placement: sealion centred with generous oatmeal margin on all sides, fully visible, never cropped. Its longest edge is about 60% of the canvas (target band 55 to 65%). Only ever downscaled from the 1254px source (never above 100%), so edges stay crisp. Corners exactly #F3F2E7, no letterboxing, no halo.
- This is a static asset only, separate from the site hero headshot (section 7), which is unchanged.
- Verify on opengraph.xyz after any change that the image is crisp and the card renders as the small thumbnail.

## 7c. Social metadata (machine-readable, in `app/layout.tsx`)
- `metadataBase`: https://jcang.org
- `title`: "JC Ang | 洪俊成"  ·  `siteName`: "JC Ang"  ·  `description`: "Present dad and product builder."
- Open Graph: `type` website, `url` https://jcang.org, image `/og-image.png` at width 1200, height 1200, alt "JC Ang".
- Twitter: `card` "summary" (small side-thumbnail card on X and LinkedIn, smaller card on WhatsApp), paired with the square 1200x1200 image. To go back to a wide banner, switch to "summary_large_image" with a wide 1200x630 image.
- Cache note: WhatsApp and Facebook cache the card hard. After any redeploy that changes the image, re-scrape via the Facebook Sharing Debugger to refresh both.
- Favicon / app icons: a JC monogram at `src/app/icon.png` and `src/app/apple-icon.png` (Next.js file-based metadata icons, no `<link>` tags needed).

## 8. Data contract, latest posts (machine-readable)
- Route: GET /api/posts
- Source: https://knorii.substack.com/feed (RSS)
- Caching: revalidate hourly
- Limit: newest 3 by published date, descending
- Response shape: { "posts": [ { "title": "string", "url": "string", "publishedAt": "ISO 8601" } ] }
- Failure: if unreachable or empty, return empty posts array and render nothing. Rest of page still loads.

## 9. Favourites (machine-readable data + taped-polaroid cards)
Redesigned from the earlier brick cards into taped polaroids pinned to a dark-walnut board.
- Board: fixed, full-bleed dark walnut (#3A2719) with a faint world-map watermark (#E3C4B8 at about 12% opacity). Always this treatment regardless of the site light/dark theme.
- Layout: single centred column (max-w-md). Heading "Favourites" in the brush font (teal), intro line "Stories I've loved across my seasons.", then the polaroid stack, then the footer (`onDark`). A "← Back" TextLink returns home.
- Season assignment rule: a card's season is set by JC's age at the year shown (JC born 1986), not the work's release year. Spring 0-20 (years 1986 to 2006), summer 21-40 (2007 to 2026), autumn 41-60, winter 61+. This ties the page to knorii's life-stages framing; the list currently runs spring then summer, with autumn and winter still unlived.
- Ordering: one chronological column colour-coded by tape, not headed season sub-groups. Each season's matte-black duct-tape strip carries a season accent colour, and each has a season-tinted cream photo well:
  - spring: tape accent #E8A0BF, well #EDDCD8
  - summer: tape accent #7CA82B, well #DADEBE
  - autumn: tape accent #D2691E, well #ECD6C0
  - winter: tape accent #A8C8D8, well #E1E6E3
- A card shows a poster image in the well if `image` is provided (JC's own photos / original art only, per section 14.3); otherwise the centred title. Caption below: year (mono), category (uppercase, tracked), then the handwritten takeaway. CJK runs render in the brush font, scaled up for an optical match with the Latin glyphs: about 1.55x in titles (so a CJK title-only card reads the same size as an English title) and about 1.2x in takeaways. Takeaway line breaks follow a rule: the text after a comma goes on the next line, so every comma starts a new line (a `\n` after the comma, rendered whitespace-pre-line). The JSON above keeps takeaways on one line for readability; apply the comma rule when rendering. Chinese takeaways follow the same rule at their ，/、 marks. Autumn and Winter are future-season placeholders with no year, their caption reads "to be lived".
- Flag pin: a small cream rounded badge tucked at the card's top-right corner shows the work's country of origin as flag emoji, derived from `origins` (ISO 3166-1 alpha-2 codes). More than one code renders side by side when a work has mixed origins (神雕侠侣 is HK author + SG illustrator). Placeholders have no pin. Note: flag emoji do not render on Windows (they fall back to the two-letter code) — acceptable trade-off for keeping it asset-free.

```json
{
  "favourites": [
    { "season": "spring", "year": 1993, "category": "Film series", "title": "Jurassic Park", "takeaway": "Mosquitoes unlock imagination", "origins": ["US"] },
    { "season": "spring", "year": 1996, "category": "Novel comic", "title": "神雕侠侣", "image": "/condor-heroes-book.jpg", "takeaway": "行侠仗义、爱恨情仇", "origins": ["HK", "SG"] },
    { "season": "spring", "year": 1997, "category": "Anime", "title": "Pokémon", "takeaway": "Stay cute or Evolve?", "origins": ["JP"] },
    { "season": "spring", "year": 1998, "category": "Drama trilogy", "title": "还珠格格", "takeaway": "活得潇潇洒洒、把握青春年华", "origins": ["CN"] },
    { "season": "spring", "year": 1999, "category": "PC Game series", "title": "Championship Manager 3", "takeaway": "Play to win, endless 4-1-3-2", "origins": ["GB"] },
    { "season": "spring", "year": 2002, "category": "Film trilogy", "title": "无间道", "takeaway": "出来混，迟早要还的。", "origins": ["HK"] },
    { "season": "summer", "year": 2008, "category": "Film trilogy", "title": "叶问", "takeaway": "没有怕老婆的男人，只有尊重老婆的男人", "origins": ["HK"] },
    { "season": "summer", "year": 2009, "category": "Film", "title": "3 Idiots", "takeaway": "All izz well", "origins": ["IN"] },
    { "season": "summer", "year": 2011, "category": "Drama series", "title": "Suits", "takeaway": "A buddy makes bitter bittersweet", "origins": ["US"] },
    { "season": "summer", "year": 2019, "category": "Drama series", "title": "SKY Castle", "takeaway": "I know what mother likes, not what I like", "origins": ["KR"] },
    { "season": "summer", "year": 2020, "category": "Documentary", "title": "The Last Dance", "takeaway": "Collective pain to champions", "origins": ["US"] },
    { "season": "summer", "year": 2021, "category": "Drama series", "title": "Itaewon Class", "takeaway": "Non-linear paths, one shared hunger", "origins": ["KR"] },
    { "season": "summer", "year": 2022, "category": "Book", "title": "Letter to Grandson Jun: I found myself, hiking!", "image": "/letter-grandson-jun.jpg", "takeaway": "Two things can be true at once", "origins": ["SG"] },
    { "season": "summer", "year": 2025, "category": "Live Concert", "title": "邓紫棋 I Am Gloria", "image": "/gem-i-am-gloria.png", "takeaway": "人生就是无数个美好、奇妙的时刻组成的", "origins": ["HK"] },
    { "season": "summer", "year": 2025, "category": "Book", "title": "The Daily Dad", "image": "/the-daily-dad.jpg", "takeaway": "Teach by example", "origins": ["US"] },
    { "season": "autumn", "title": "Autumn" },
    { "season": "winter", "title": "Winter" }
  ]
}
```
Two 2025 summer cards order: 邓紫棋 I Am Gloria first, then The Daily Dad. Poster images are JC's own photos / original art only, no sourced or copyright posters.

## 10a. Design system (human-facing)
- Light mode: background oatmeal #F3F2E7, headline and brush teal #2C5560, body ink #1F2A2E, links gold #C49A4A.
- Dark mode: equivalent tokens, light linework and text on dark ground, footer text at WCAG AA.
- Fonts: Fraunces (serif headings and card titles), Instrument Sans (body and prose), JetBrains Mono (mono accents), plus a handwritten brush stack (Kaushan Script for Latin, Zhi Mang Xing for CJK, exposed as `--font-handwritten`) for the hero headline, the favourites heading, and card titles/takeaways.
- Body and prose sized about 10 to 15 percent down from the scaffold default for balance against the headshot.
- Spacing: generous whitespace, single column, comfortable line length.
- Motion: none. The hero headline is static (the earlier typewriter reveal was removed). Nothing animates or blocks reading.

## 10b. World-map background (machine-readable + human-facing)
- Data: Natural Earth countries-110m (public domain) via world-atlas TopoJSON. Original, no external map image.
- Projection: d3-geo geoNaturalEarth1, rotated to centre on Asia (rotate longitude by -105).
- Render: thin country-border mesh plus a faint 15-degree graticule. Generated once as a static SVG at build time, no map library shipped to client.
- Placement: fixed, full bleed, behind all content. Decorative, aria-hidden, no motion.
- Home page: the shared WorldMapSvg renders via WorldMapBackground at low opacity (teal-grey near #2C5560, about 5 percent light mode; light linework in dark mode) behind the content.
- Favourites page: does not use the home WorldMapBackground. It has its own copy of WorldMapSvg as a watermark (#E3C4B8 at about 12% opacity) on the dark-walnut board (see section 9).
- Layer order back to front: map, PaperTexture grain, content. On home the map shows only through the oatmeal margins; on favourites the polaroids sit fully opaque over the walnut board.
- Never reduce text contrast. WCAG AA both themes. If muddy, drop land fill, keep outlines plus graticule.

## 11. Content
### Bio (prose)
I'm a dad of three kids and a furkid named Chestnut. For over a decade, I held commercial roles at Keppel and ESR, connecting the hard infrastructure behind the internet, from data centres to subsea cables.

Then I joined HIDDEN, a location-based entertainment studio, connecting the stories behind people, places and brand IPs.

My third little one is a wake-up call to be present and document these fleeting years, while maintaining the Airbender Aang look.

After months of parenting-in-the-trenches, I now co-write Sealion Scan. Each week I share 1 wild story, 1 practical AI workflow, and 3 world currents, so we can know our kids, and the world, a little better.

You can follow my builder journey on Instagram, LinkedIn and GitHub.

### Inline links
- Keppel: https://www.keppel.com/
- ESR: https://www.esr.com/
- HIDDEN: https://hiddenxp.com/
- document: https://www.youtube.com/@BotakBricks
- look: https://www.instagram.com/p/DPs0i72kicz/
- Sealion Scan (newsletter): https://knorii.substack.com/

### Follow links
- Instagram: https://www.instagram.com/skyvaulter19/
- LinkedIn: https://www.linkedin.com/in/jcang-sg/
- GitHub: https://github.com/jcang-sg

### Footer
Made in 🇸🇬 with the mantra 'Practise you must, Fearless you must be.'

## 12. Accessibility
1. Motion-free by design: the hero is static, so there is nothing to disable for prefers-reduced-motion.
2. Semantic HTML: real headings, lists, nav, links.
3. Keyboard: every interactive element reachable, visible on focus.
4. Images: meaningful alt text, decorative overlays marked aria-hidden.
5. Contrast: both themes meet WCAG AA for text.

## 13. Deployment and workflow
- Repo on GitHub (jcang-sg), Vercel connected, auto-deploy on every push to main.
- Live at jcang.org via Cloudflare DNS-only (grey cloud on every record, proxy off): A record `@` to Vercel apex IP 76.76.21.21; CNAME `www` to cname.vercel-dns.com. Grey cloud is required so Vercel owns SSL; the orange-cloud proxy causes certificate and redirect-loop errors.
- Canonical: apex jcang.org serves the site; www.jcang.org 308-redirects to apex.
- Git identity: JC Ang, GitHub noreply email (297779023+jcang-sg@users.noreply.github.com), private-email push block on. Set at repo level so Claude Code commits attribute to JC.
- Registration note: jcang.org sits under the juncheng.ang@gmail.com Cloudflare login, separate from the botakbricks identity that owns GitHub and Vercel.
- Commit spec.md and the .claude folder so the build method is part of the public proof.

## 14. Constraints
1. No kids' names or faces anywhere on the public site. Kids referenced only as "three kids". One nationality cue, the flag in the footer.
2. No client-side calls to Substack. All feed access via /api/posts.
3. No external images for favourites. Text-only, or JC's own photos / original art.
4. Static and fast. No analytics, no tracking, no cookies beyond the theme preference.
5. No page-peel corner effect in the render, to avoid mirroring the reference site. A `PagePeel.tsx` component remains in the repo but is not imported or rendered on any page; do not wire it back in.
