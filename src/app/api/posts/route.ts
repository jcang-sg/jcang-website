import { getLatestPosts } from "@/lib/posts";

// The client talks to this route, never to Substack directly.
export async function GET() {
  const posts = await getLatestPosts(3);
  return Response.json({ posts });
}
