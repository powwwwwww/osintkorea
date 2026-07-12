export interface Post {
  date: string;
  title: string;
  description: string;
  tags: string[];
  cover: string | null;
  url: string;
}

// Posts are plain static files under public/posts/{yyyy-mm-dd}/index.html
// (see vite-plugins/posts-manifest.ts), so this just fetches the manifest
// that plugin generates - no per-post code needed here.
export async function getAllPosts(): Promise<Post[]> {
  const res = await fetch('/posts-manifest.json');
  if (!res.ok) return [];
  return res.json();
}
