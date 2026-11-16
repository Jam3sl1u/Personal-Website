# James Liu: Portfolio

Personal portfolio site. React, Vite, TypeScript, Tailwind CSS v4, and Motion. Fully static, deployed to GitHub Pages by GitHub Actions.

## Local development

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check, then build to dist/
npm run preview    # serve the production build locally
```

Requires Node 20.19+ (CI uses Node 22).

## Updating content

All copy lives in `src/content/`. Components never hardcode portfolio text.

| File | What it holds |
| --- | --- |
| `site.ts` | Name, links, hero, About, Education, Leadership, What I'm looking for, Contact |
| `experience.ts` | Beall (metrics, focus tabs), other roles, earlier work |
| `projects.ts` | The four featured projects and the More on GitHub list |
| `skills.ts` | Skill groups (`core: true` renders large) |
| `caseStudies.ts` | Case-study pages at `/#/work/<slug>` |

### Things to add when you have them

- **Resume PDF.** Put a phone-free PDF in `public/` and set `resumePdf` in `site.ts` to its file name. Download buttons appear on the Contact section and the resume page. Until then, `/#/resume` is an online resume built from the same content, with a Print / Save as PDF button. It never includes a phone number or address.
- **Portrait.** Put a square image in `public/` and set `portrait` in `site.ts`.
- **Screenshots and video.** Case-study pages show labeled placeholders from the `assets` list in `caseStudies.ts`. Replace `<Placeholder>` in `src/pages/CaseStudy.tsx` with real `<img loading="lazy" alt="...">` or `<video>` elements. Project illustrations live in `src/components/projects/visuals.tsx`.
- **Disabled links.** Two links returned 404 on 2026-11-16 and are commented out in `projects.ts` and `caseStudies.ts`: the Chariot dashboard and the Fashion-MNIST repo. Uncomment them once they are live or public.
- **Social image.** `public/og.png` is a generated typographic card. Replace it with a 1200x630 image of your choice.

## Structure

```
src/
  content/        All portfolio data (edit here)
  components/
    layout/       Header, Footer, Cursor
    ui/           Button, Tag, Reveal, SectionHeading, Placeholder, CopyEmail, icons
    hero/         SystemGraph (interactive hero graphic)
    projects/     ProjectShowcase and the four project illustrations
  sections/       One file per home-page section
  pages/          Home, CaseStudy, Resume, NotFound
  lib/            Motion presets, theme, scroll, and section-tracking hooks
```

Routing uses `HashRouter`, so URLs look like `/#/work/chariot`. Every route is served from `index.html`, which means deep links and refreshes work on GitHub Pages with no redirect tricks. Home-page sections can be linked directly: `/#/?s=projects`.

## Deploying to GitHub Pages

Deployment is automatic: `.github/workflows/deploy.yml` builds and publishes on every push to `main`.

One-time setup in the GitHub repository:

1. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
2. Push to `main`. The workflow publishes `dist/`.

### User site or project site

The Vite `base` is relative (`./`), so the same build works in both places with no changes:

- **User site (recommended):** name the repository `Jam3sl1u.github.io`. The site is served at `https://jam3sl1u.github.io/`.
- **Project site:** keep any other repository name, for example `Personal-Website`. The site is served at `https://jam3sl1u.github.io/Personal-Website/`.

If you ever need an absolute base, set it at build time: `VITE_BASE=/Personal-Website/ npm run build`.

The canonical URL, Open Graph URLs, `robots.txt`, and `sitemap.xml` assume the user-site address. If you deploy as a project site or on a custom domain, update the URLs in `index.html`, `public/robots.txt`, and `public/sitemap.xml`.

### Custom domain

1. Add a file `public/CNAME` containing only your domain, for example `jamesliu.dev`.
2. In **Settings → Pages**, set the custom domain and enable **Enforce HTTPS**.
3. Point DNS at GitHub Pages (an `ALIAS`/`A` record for an apex domain, or a `CNAME` record to `jam3sl1u.github.io` for a subdomain).
4. Update the URLs in `index.html`, `public/robots.txt`, and `public/sitemap.xml`.

No code changes are needed, because the base path is relative.

## Content rules

The site follows the public-safety rules from the content kit: no phone number, street address, or GPA; no internal employer product or client names; Chariot is described as a club rides scheduler. Keep these in mind when editing `src/content/`.
