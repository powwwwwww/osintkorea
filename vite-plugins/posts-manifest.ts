import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';

// Posts live under public/posts/{yyyy-mm-dd}/{title}.html so they're copied
// verbatim (assets included) into the build output and work as plain static
// files - no server, no SPA rendering, GitHub Pages friendly. The article
// file's name isn't fixed (it's the post title), so each date folder is
// searched for its one .html file. Since public/ is invisible to
// import.meta.glob, this plugin scans it directly and writes
// public/posts-manifest.json, which the /news page fetches at runtime to
// build its listing. Re-runs on every dev-server file change and on every
// build, so adding a post folder never requires touching any code.

interface PostMeta {
  date: string;
  title: string;
  description: string;
  tags: string[];
  cover: string | null;
  url: string;
}

const DATE_DIR_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function extractPostMeta(html: string): Record<string, string> {
  const meta: Record<string, string> = {};
  const metaRegex = /<meta\s+name=["']post:(\w+)["']\s+content=["']([\s\S]*?)["']\s*\/?>/gi;
  let match: RegExpExecArray | null;
  while ((match = metaRegex.exec(html))) {
    meta[match[1]] = match[2];
  }
  return meta;
}

function firstMatch(regex: RegExp, html: string): string | undefined {
  return html.match(regex)?.[1];
}

// First img tag in a post is often a hotlinked cover from the authoring tool
// (e.g. Notion's page-cover CDN), not a local asset - skip those and use the
// first image that's actually part of the post folder.
function firstLocalImageSrc(html: string): string | undefined {
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
  let match: RegExpExecArray | null;
  while ((match = imgRegex.exec(html))) {
    const src = match[1];
    if (!/^(https?:)?\/\//i.test(src)) return src;
  }
  return undefined;
}

function stripTags(str: string): string {
  return str.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function scanPosts(postsDir: string): PostMeta[] {
  if (!fs.existsSync(postsDir)) return [];

  const posts: PostMeta[] = [];

  for (const entry of fs.readdirSync(postsDir, { withFileTypes: true })) {
    if (!entry.isDirectory() || !DATE_DIR_PATTERN.test(entry.name)) continue;

    const folder = path.join(postsDir, entry.name);
    const htmlFilename = fs.readdirSync(folder).find((f) => f.toLowerCase().endsWith('.html'));
    if (!htmlFilename) continue;

    const html = fs.readFileSync(path.join(folder, htmlFilename), 'utf-8');
    const meta = extractPostMeta(html);

    const rawTitle = meta.title ?? firstMatch(/<title>([\s\S]*?)<\/title>/i, html) ?? entry.name;
    const title = stripTags(rawTitle);

    let description = meta.description;
    if (!description) {
      const p = firstMatch(/<p[^>]*>([\s\S]*?)<\/p>/i, html);
      description = p ? stripTags(p).slice(0, 200) : '';
    }

    const tags = meta.tags
      ? meta.tags.split(',').map((t) => t.trim()).filter(Boolean)
      : [];

    const cover = meta.cover ?? firstLocalImageSrc(html);

    posts.push({
      date: entry.name,
      title,
      description,
      tags,
      cover: cover ? `/posts/${entry.name}/${cover}` : null,
      url: `/posts/${entry.name}/${encodeURIComponent(htmlFilename)}`,
    });
  }

  posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  return posts;
}

export function postsManifestPlugin(): Plugin {
  const postsDir = path.resolve(process.cwd(), 'public/posts');
  const manifestPath = path.resolve(process.cwd(), 'public/posts-manifest.json');

  const writeManifest = () => {
    const posts = scanPosts(postsDir);
    fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
    fs.writeFileSync(manifestPath, JSON.stringify(posts, null, 2));
    return posts;
  };

  return {
    name: 'posts-manifest',
    buildStart() {
      writeManifest();
    },
    configureServer(server) {
      writeManifest();
      server.watcher.add(postsDir);
      server.watcher.on('all', (_event, changedPath) => {
        if (changedPath.startsWith(postsDir) && changedPath !== manifestPath) {
          writeManifest();
          server.ws.send({ type: 'full-reload' });
        }
      });
    },
  };
}
