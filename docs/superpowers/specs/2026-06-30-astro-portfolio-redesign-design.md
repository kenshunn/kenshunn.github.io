# Astro Portfolio Redesign — Design

**Date:** 2026-06-30
**Author:** Ken Aaron De Martin (@kenshunn)
**Status:** Approved
**Supersedes:** `2026-06-30-react-portfolio-redesign-design.md` (framework pivot React → Astro)

## Goal

Rebuild the existing single-page static portfolio (`kenshunn.github.io`) as an Astro site with a Projects showcase, dark/light theme, scroll animations, real CV download, and a Formspree contact form. Apply a clean dark-modern visual design with a single accent color.

## Why Astro (pivot from React)

The site is overwhelmingly static content. Astro ships zero JavaScript by default, producing a faster, leaner page than a React SPA whose runtime would exist only to render mostly-static markup. The few interactive pieces (theme toggle, mobile menu, scroll reveal, form validation) are implemented with small vanilla `<script>` blocks — no UI framework, no hydration runtime. This is the idiomatic Astro approach and keeps the dependency surface minimal.

## Decisions

| Topic | Decision |
|-------|----------|
| Scope | Full redesign + bug fixes + new Projects section |
| Framework | Astro (latest), no UI framework integration |
| Interactivity | Vanilla JS in Astro `<script>` blocks (theme, hamburger, reveal, form) |
| Projects content | Placeholder cards now; owner fills real data later |
| Visual style | Dark modern, dark background, single accent color |
| Features | Scroll animations, dark/light toggle, real downloadable CV, contact form |

## Architecture

- **Framework:** Astro (latest). Static output (`output: 'static'`, the default).
- **Hosting:** GitHub Pages **user site** (`kenshunn.github.io`), served from root. `astro.config.mjs` sets `site: 'https://kenshunn.github.io'` and `base: '/'`.
- **Deploy:** GitHub Actions using the official `withastro/action` + Pages deploy actions. Repository Settings → Pages → Source = "GitHub Actions" (owner sets once).
- **Rendering:** One page (`src/pages/index.astro`) composing section components inside a shared layout. Components are `.astro` (compile to static HTML). Interactivity lives in scoped `<script>` blocks that run in the browser.
- **Migration:** Legacy `index.html`, `style.css`, `script.js`, `mediaquerie.css` removed. Images in `assets/` move to `public/images/`.

### Directory structure

```
src/
  layouts/
    Layout.astro          # <html>, <head>, global CSS import, no-flash theme script, <slot/>
  pages/
    index.astro           # composes all sections
  components/
    Navbar.astro          # nav + theme toggle + hamburger (+ script)
    Hero.astro
    About.astro
    Skills.astro          # maps over skills data
    Projects.astro        # maps over projects data
    Contact.astro         # Formspree form + validation script + fallback
    Footer.astro
  data/
    projects.js           # array of project objects
    skills.js             # frontend/backend skill groups
  scripts/
    reveal.js             # IntersectionObserver scroll-reveal (imported by Layout)
  styles/
    global.css            # CSS variables, base, theme vars, layout, reveal
public/
  cv.pdf                  # placeholder, owner replaces
  images/                 # migrated assets
astro.config.mjs
package.json
.github/workflows/
  deploy.yml
```

## Components

- **Layout** — root HTML shell. `<head>` includes an **inline, render-blocking theme script** that reads `localStorage.theme` (default `dark`) and sets `data-theme` on `<html>` before paint to avoid a flash of wrong theme. Imports `global.css`. Imports `reveal.js` as a client script. Renders `<slot/>`.
- **Navbar** — sticky top. Logo `@kenshunn`, links (About/Skills/Projects/Contact), theme toggle button, mobile hamburger. A scoped `<script>` wires the hamburger (`open` class on `.mobile-menu`) and the theme toggle (flip `data-theme`, persist to `localStorage`).
- **Hero** — name, tagline "Amateur Programmer", profile image, CTA buttons (Download CV → `/cv.pdf` with `download`; Contact → `#contact`), social links (GitHub, Twitter).
- **About** — bio + Education/Experience cards.
- **Skills** — Frontend/Backend groups; each skill name + level. Maps over `skills.js`.
- **Projects (new)** — responsive grid of cards from `projects.js`: title, description, tags, Code link (repo), Live link (only if `liveUrl` set), image. Three placeholder cards.
- **Contact** — Formspree form (name/email/message) + a scoped validation `<script>`; email/phone fallback shown.
- **Footer** — links + copyright.

## Data Flow

- Static data in `src/data/projects.js` and `src/data/skills.js` (arrays of plain objects). Components import and `map` at build time → static HTML. Adding a project = editing one array entry. No backend.

### Project object shape
```js
{ title, description, tags: string[], repoUrl, liveUrl, image }
```
### Skill data shape
```js
[{ group: string, items: [{ name, level }] }]
```

## Theming

- Theme state = `data-theme` attribute on `<html>` (`dark` default | `light`), persisted in `localStorage` key `theme`.
- No-flash: inline head script in Layout applies the stored/default theme before first paint.
- Toggle button (in Navbar script) flips the attribute and persists.
- CSS custom properties swap on `[data-theme='...']`.

## Styling

CSS custom properties drive the palette (in `global.css`).

**Dark (default):** `--bg:#0d1117`, `--surface:#161b22`, `--text:#e6edf3`, `--muted:#8b949e`, `--accent:#6366f1`.
**Light:** inverted (light bg/surface, dark text, same accent).

- Mobile-first; breakpoints 600px, 1024px.
- Scroll animations: `reveal.js` uses `IntersectionObserver` to add `reveal-visible` to `.reveal` elements; CSS transitions handle fade/slide-in. Falls back to visible if `IntersectionObserver` is unavailable.

## Contact Form

- Posts to Formspree (free tier). Placeholder endpoint `https://formspree.io/f/YOUR_FORM_ID`; owner creates account, swaps the ID. Scoped script validates required fields + email format before submit; shows an error with `role="alert"`. Email (`aaron.11demartin@gmail.com`) and phone (`+63 998 545 1812`) shown as fallback.

## CV

- No real CV yet. Seed placeholder `public/cv.pdf`; Download CV button serves it. Owner replaces later.

## Error Handling

- Theme script: `try/catch` around `localStorage`; fall back to `dark` if unavailable.
- Form: client-side validation before submit; success/error message surfaced.
- Missing/placeholder project image must not break card layout.

## Testing

Astro components are not unit-tested with RTL the way React is. Testing strategy:

- **Vitest** for the pure data modules (`skills.js`, `projects.js`) — shape/contract tests (reused from prior work).
- **Vitest** for extractable vanilla logic: factor form validation into a pure function (`src/scripts/validate.js`) and unit-test it; factor the reveal "apply class" decision similarly if practical.
- **Build verification:** `npm run build` must succeed and `astro check` (if added) must pass; assert built HTML contains key markers (section ids, project card count) via a small post-build check or a Vitest test that reads `dist/index.html`.
- **Manual:** `npm run dev` — verify sections, theme toggle (no flash), hamburger, scroll reveal, CV download.

## Out of Scope (YAGNI)

- UI framework integration (React/Vue/Svelte islands).
- TypeScript (plain JS/`.astro`).
- Backend / database, blog/CMS, multi-page routing, i18n.

## Reuse from React branch

The abandoned `feature/react-portfolio` branch contains directly reusable assets: `src/data/skills.js`, `src/data/projects.js`, the palette + much of `global.css`, and all section copy. These are ported, not rewritten.
