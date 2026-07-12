# OSINT Korea

OSINT Korea is a community of researchers and analysts dedicated to advancing
open-source intelligence (OSINT) practice in Korea. We bring together
practitioners to share methodologies, tools, and findings that push the
field forward — through collaboration, education, and community-driven
research spanning cyber threat intelligence, digital investigations, and
related areas.

This repository contains the source code for [osintkorea.kr](https://osintkorea.kr),
the community's official website.

## About the site

The site is a single-page React application with the following sections:

- **Home** — animated landing page introducing OSINT Korea
- **OSINT Korea** (`/mission`) — the community's mission, in English and Korean
- **Member** (`/member`) — founder and member profiles
- **News** (`/news`) — community updates and articles
- **Contact** (`/contact`) — a way to reach the community

## Tech stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) for development and bundling
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) for styling and components
- [React Router](https://reactrouter.com/) for client-side navigation

## Getting started

```bash
npm install
npm run dev
```

The site runs locally at `http://localhost:5173`.

Other commands:

```bash
npm run build    # production build, output to dist/
npm run preview  # preview the production build locally
npm run lint     # run linting
```

## Adding a news post

News posts are plain static HTML files, one per article, and require no
code changes to appear on the site. To add one:

1. Create a folder in `public/posts/` named with the publish date, e.g.
   `public/posts/2026-03-01/`
2. Add an HTML file inside it (the article page) plus any images, video, or
   other assets it references, using relative paths
3. Optionally add `<meta name="post:title">`, `<meta name="post:description">`,
   `<meta name="post:tags">`, and `<meta name="post:cover">` tags to control
   how the post appears in the news listing — if omitted, these are inferred
   from the page's `<title>`, first paragraph, and first image

The `/news` page discovers posts automatically, newest first.
