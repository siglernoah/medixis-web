# Medixis website

Marketing site for medixisgroup.com. Built with Next.js 16 (static export), React 19, Tailwind CSS 4,
Framer Motion and GSAP. No backend, database, cookies or analytics.

## Run locally

Requires Node.js 20 or newer.

```bash
npm ci
npm run dev        # http://localhost:3000
```

## Build for hosting

```bash
npx next build
```

The finished site is written to `out/`. Upload the contents of `out/` to any static host
(the web root of medixisgroup.com, Netlify, Cloudflare Pages, Vercel, GitHub Pages, etc.).

To serve the site from a sub-folder instead of the domain root, build with `BASE_PATH`, e.g.
`BASE_PATH=/medixis-web npx next build` (this is what the GitHub Pages workflow in
`.github/workflows/pages.yml` does).

## Where things live

- `src/lib/site.ts`: company details, email, nav, team, regions and most page copy
- `src/content/privacy.ts`: privacy policy text
- `src/app/`: one folder per page (`about`, `contact`, `suppliers`, `privacy`, ...)
- `src/app/globals.css`: colours, fonts and spacing (design tokens)
- `public/`: images, the privacy policy PDF and the social share image

## Before replacing the live site

- The **Partner Portal** link points to `https://medixisgroup.com/partner-portal`, which is part of
  the current site. Move the portal (or give it its own address) before this site takes over the domain.
- Forms open the visitor's email app addressed to contact@medixisgroup.com
  (`src/components/MailtoForm.tsx`). Swap in a form service there if needed.
