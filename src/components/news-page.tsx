import { useEffect, useState } from 'react';
import { ImageOff } from 'lucide-react';
import { SiteHeader } from '@/components/ui/site-header';
import { getAllPosts, type Post } from '@/lib/posts';
import './news-page.css';

function formatDate(iso: string): string {
  const parsed = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return iso;
  return parsed.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export const NewsPage = () => {
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    getAllPosts().then((data) => {
      if (!cancelled) setPosts(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="news-page">
      <SiteHeader active="news" invertLogo />

      <main className="news-page__grid">
        {posts?.map((post) => (
          <a className="news-page__card" href={post.url} key={post.date}>
            <div className="news-page__thumb">
              {post.cover ? (
                <img src={post.cover} alt={post.title} />
              ) : (
                <ImageOff strokeWidth={1.2} />
              )}
            </div>
            <h2 className="news-page__title">{post.title}</h2>
            <p className="news-page__date">{formatDate(post.date)}</p>
          </a>
        ))}

        {posts?.length === 0 && (
          <p className="news-page__empty">No posts yet.</p>
        )}
      </main>

      <footer className="news-page__footer">
        &copy; OSINT KOREA. ALL RIGHTS RESERVED. ALL OF OSINT KOREA'S CONTENT IS COPYRIGHTED.
      </footer>
    </div>
  );
};
