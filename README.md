# irving-swift.com

My personal blog, rebuilt with [Astro](https://astro.build) after the old WordPress install was lost. Fully static: no database and no PHP.

## Commands

| Command           | What it does                              |
| ----------------- | ----------------------------------------- |
| `npm install`     | Install dependencies (Node 22.23+)        |
| `npm run dev`     | Dev server at `http://localhost:4321`     |
| `npm run build`   | Build the static site into `./dist/`      |
| `npm run preview` | Serve the built `./dist/` locally         |

## Writing a post

Add a Markdown file to `src/content/posts/`. The filename becomes the URL, so `my-new-post.md` is served at `/my-new-post/`.

```md
---
title: My new post
description: One-sentence summary used for SEO, social cards and RSS.
pubDate: 2026-10-26
categories: [Development]
cover: ../../assets/uploads/2026/10/cover.jpg   # optional
coverAlt: What the cover shows
coverCredit: '"Title" by Someone, CC BY 2.0'     # only for pictures found in open collections
draft: true                                      # optional; hidden from production builds
---

Post body in Markdown…

![Alt text](../../assets/uploads/2026/10/screenshot.png)
```

Put images in `src/assets/uploads/` and reference them with relative paths. Astro resizes them and converts them to WebP at build time.

A few HTML helpers work inside posts (leave a blank line after the opening tag and before the closing tag so the Markdown inside still renders):

- `<figure> … <figcaption>…</figcaption></figure>` for an image with a caption
- `<div class="image-row narrow"> … </div>` to put phone screenshots side by side
- `<div class="logo"> … </div>` for small brand logos
- `<div class="video"><iframe …></iframe></div>` for a 16:9 embed

Standalone pages (About, Privacy) live in `src/content/pages/` and are also served at `/<filename>/`.

## Design

The palette comes from the favicon: a charcoal ground, mint ink and the teal dot as the accent. Everything is set in TikTok Sans, served from this site. Pictures from open collections live in `src/assets/found/`, with their licences in `credits.json`; the home page footer prints those credits automatically.

## Structure

```
src/
  assets/uploads/     images migrated from wp-content/uploads
  assets/found/       openly licensed pictures, with credits.json
  components/         Header, Footer, NoteIndex, FormattedDate
  code-theme.mjs      syntax-highlighting colours drawn from the palette
  content/posts/      blog posts (Markdown)
  content/pages/      standalone pages (Markdown)
  layouts/Base.astro  HTML shell, meta tags, fonts
  pages/              routes: home, /[slug]/, /category/[category]/, /rss.xml, 404
  styles/global.css   theme tokens and prose styles
```

## Deploying

`npm run build` writes plain HTML, CSS and images to `dist/`. Upload that folder to any static host (Apache, Nginx, Netlify, Vercel, Cloudflare Pages, GitHub Pages…).

On the old Apache server, point the vhost's `DocumentRoot` at the uploaded `dist/` folder and add `ErrorDocument 404 /404.html`.

Old WordPress URLs (`/<post-slug>/`, `/about-james-irving-swift/`, `/privacy-policy/`) are kept as they were, `/feed/` redirects to `/rss.xml`, and a sitemap is generated at `/sitemap-index.xml`.
