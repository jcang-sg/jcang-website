"use client";

import { useEffect, useState } from "react";

type Post = {
  title: string;
  url: string;
  publishedAt: string;
};

function formatDate(iso: string): string {
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return "";
  return new Date(t).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Fetches the latest posts from the /api/posts route and renders them.
 * Renders nothing while loading or when the feed is empty/unreachable,
 * so the rest of the page is never blocked.
 */
export default function PostList() {
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/posts")
      .then((res) => (res.ok ? res.json() : { posts: [] }))
      .then((data) => {
        if (active) setPosts(data.posts ?? []);
      })
      .catch(() => {
        if (active) setPosts([]);
      });
    return () => {
      active = false;
    };
  }, []);

  if (!posts || posts.length === 0) return null;

  return (
    <section className="mt-14">
      <h2 className="font-serif text-sm uppercase tracking-[0.2em] text-muted">
        Latest posts
      </h2>
      <ul className="mt-4 space-y-3">
        {posts.map((post) => (
          <li key={post.url}>
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
            >
              <span className="text-lg leading-snug transition-colors group-hover:text-accent">
                {post.title}
              </span>
              {formatDate(post.publishedAt) && (
                <span className="shrink-0 text-sm tabular-nums text-muted">
                  {formatDate(post.publishedAt)}
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
