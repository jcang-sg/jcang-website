export type Post = {
  title: string;
  url: string;
  publishedAt: string; // ISO 8601
};

const FEED_URL = "https://knorii.substack.com/feed";

function decodeXml(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .trim();
}

function pick(block: string, tag: string): string {
  const match = block.match(
    new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, "i"),
  );
  return match ? decodeXml(match[1]) : "";
}

function parseFeed(xml: string): Post[] {
  const items = xml.match(/<item[\s\S]*?<\/item>/gi) ?? [];

  const posts: Post[] = items
    .map((block) => {
      const rawDate = pick(block, "pubDate");
      const parsed = Date.parse(rawDate);
      return {
        title: pick(block, "title"),
        url: pick(block, "link"),
        publishedAt: Number.isNaN(parsed)
          ? rawDate
          : new Date(parsed).toISOString(),
      };
    })
    .filter((post) => post.title && post.url);

  posts.sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
  return posts;
}

/**
 * Fetches the newest posts from the Substack RSS feed.
 * Revalidates hourly so the page stays current without rebuilds.
 * Returns an empty array if the feed is unreachable or empty.
 */
export async function getLatestPosts(limit = 3): Promise<Post[]> {
  try {
    const res = await fetch(FEED_URL, {
      next: { revalidate: 3600 },
      headers: { "User-Agent": "jcang.org" },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    return parseFeed(xml).slice(0, limit);
  } catch {
    return [];
  }
}
