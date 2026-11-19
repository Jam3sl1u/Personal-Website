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
| `projects.ts` | The three featured projects and the More projects list |
| `skills.ts` | Skill groups (`core: true` renders large) |
| `caseStudies.ts` | Case-study pages at `/#/work/<slug>`: glance, constraints, contributions, diagrams, decisions and trade-offs, results, limitations, optional `media` |

### Things to add when you have them

- **Resume PDF.** The Download Resume buttons (hero, header, mobile menu, Contact, resume page) are already wired up. Until a PDF exists they open the online resume at `/#/resume`. To switch them to a direct download:
  1. Export your approved resume with **no phone number or street address**.
  2. Save it as `public/James-Liu-Resume.pdf`.
  3. In `src/content/site.ts`, set `resumePdf: 'James-Liu-Resume.pdf'`.
  4. Commit and push. The buttons now download the PDF (the saved file name comes from `resumeDownloadName`). On iOS Safari the file opens in a new tab instead, which is expected.
- **Case-study screenshots and video.** Case-study pages show diagrams (labeled "Diagram") and render nothing for media until you add real files. To add a screenshot:
  1. Put the file in `public/work/<slug>/` (for example `public/work/chariot/weekly-assignment.webp`). Use WebP or PNG, at most 1600 px wide.
  2. Add an entry to that case study's `media` array in `src/content/caseStudies.ts`: `{ kind: 'image', src: 'work/chariot/weekly-assignment.webp', alt: '...', caption: '...', width: 1600, height: 900 }`. Width and height are required so the page does not shift while loading. Use `kind: 'video'` (and an optional `poster`) for a recording.
  3. Make sure there is no personal data, token, or client information on screen.
  Suggested shots: Chariot (a Discord registration or weekly assignment), Graceful (dashboard, weekly schedule, setlist), AI Calendar (input and the structured event it produced).
- **Portrait.** Put a square image in `public/` and set `portrait` in `site.ts`. Until then, About shows an "At a glance" card.
- **Disabled links.** Two links returned 404 on 2026-11-16 and are not shown: the Chariot dashboard (commented out in `projects.ts` and `caseStudies.ts`) and the Fashion-MNIST repo (add `href` in `moreProjects` once it is public).
- **Social image.** `public/og.png` is a generated typographic card. Replace it with a 1200x630 image of your choice.

## Structure

```
src/
  content/        All portfolio data (edit here)
  components/
    layout/       Header, Footer, Cursor
    ui/           Button, ResumeButton, Tag, Reveal, SectionHeading, CopyEmail, icons
    caseStudies/  figures.tsx: the diagrams used on case-study pages
    hero/         SystemGraph (interactive hero graphic)
    projects/     ProjectShowcase and the three project illustrations
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

### Where it is deployed

The live site is a GitHub Pages **project site** at `https://jam3sl1u.github.io/portfolio/` (repository `Jam3sl1u/portfolio`). The Vite `base` is relative (`./`), so the same build also works at a user-site root or a custom domain with no code changes. If you ever need an absolute base, set it at build time: `VITE_BASE=/portfolio/ npm run build`.

The canonical URL, Open Graph and Twitter image URLs, JSON-LD, `robots.txt`, and `sitemap.xml` all use `https://jam3sl1u.github.io/portfolio/`. If you move to a custom domain, update `index.html`, `public/robots.txt`, `public/sitemap.xml`, and `site.url` in `src/content/site.ts`.

SEO notes: the site uses hash routes (`/#/work/chariot`), which crawlers treat as one page, so the sitemap lists only the root. Search engines read `robots.txt` only at a host's root, so on a project site it is advisory; submit the sitemap in Google Search Console instead. A custom domain at the root would fix both.

### Custom domain

1. Add a file `public/CNAME` containing only your domain, for example `jamesliu.dev`.
2. In **Settings → Pages**, set the custom domain and enable **Enforce HTTPS**.
3. Point DNS at GitHub Pages (an `ALIAS`/`A` record for an apex domain, or a `CNAME` record to `jam3sl1u.github.io` for a subdomain).
4. Update the URLs in `index.html`, `public/robots.txt`, `public/sitemap.xml`, and `site.url`.

No code changes are needed, because the base path is relative.

## Content rules

The site follows the public-safety rules from the content kit: no phone number, street address, or GPA; no internal employer product or client names; Chariot is described as a club rides scheduler. Keep these in mind when editing `src/content/`.
