# Dean van Niekerk's portfolio

Personal portfolio for senior full-stack engineering roles, featuring JedidiahOps, Edge and K53 Study Guide.

**Live site:** https://vanniekerk.online

## Development

```sh
npm install
npm run dev
```

React, TypeScript and Vite, with native CSS and locally bundled Geist fonts. No API keys or external data requests are needed to render the portfolio.

```sh
npm run lint
npm run build
npm run preview
```

## Content

- `src/data/projects.ts`: project facts, case-study copy, screenshots and external links.
- `src/components/Home.tsx`: introduction, selected work, experience and contact.
- `src/components/ProjectPage.tsx`: case-study layout.
- `src/components/Gallery.tsx`: screenshot navigation and native accessible image dialog.
- `public/Dean-van-Niekerk-Resume.pdf`: downloadable resume. Update this when the resume changes.

Case studies use hash URLs, such as `/#work/jedidiahops`, so shared links and reloads work on the existing static hosting without rewrite rules. They share the homepage social preview; project-specific server-rendered previews would require a different routing/build setup.

The resume is maintained in `output/pdf/Dean-van-Niekerk-Resume.md`. Run `python3 scripts/build-resume.py` with ReportLab installed to generate the two-page PDF, then copy it to `public/Dean-van-Niekerk-Resume.pdf`. The script uses bundled Liberation Sans fonts; set `RESUME_FONT_DIR` if using another local installation. Render and inspect both pages after edits, and keep dates and claims aligned with the site. K53's Android download milestone is owner-supplied; confirm the store statistics before changing it.

## Design

The redesign retains the original green accent and dark theme, brings actual product screenshots forward, and prioritises case studies over self-rated skills or contribution counts. Design variance 6, motion intensity 3, visual density 4: restrained native CSS, clear type hierarchy and functional transitions. Reduced-motion preferences disable animation.

## Deployment

The existing FTP deployment script is retained:

```sh
npm run deploy:profile
```

It builds and uploads `dist/`, using the FTP configuration in the ignored `.dev.env`. Run only when publishing is intended. Never commit credentials.
