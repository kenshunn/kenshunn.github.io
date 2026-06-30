# React Portfolio Redesign — Design

**Date:** 2026-06-30
**Author:** Ken Aaron De Martin (@kenshunn)
**Status:** Approved

## Goal

Rebuild the existing single-page static portfolio (`kenshunn.github.io`) as a modern React + Vite application. Fix existing bugs, introduce a Projects showcase (the core missing piece of a portfolio), and apply a clean dark-modern visual design with a single accent color.

## Background

The current site is a tutorial-derived static page (HTML/CSS/JS) with several issues:

- No Projects section — the central feature of any portfolio.
- "Download CV" button links to a rickroll instead of a real CV.
- `script.js` has a selector bug: `.hamburger.icon` should be `.hamburger-icon`, so the mobile menu toggle is broken.
- Owner-acknowledged weak color palette and excessive whitespace.
- Only partial responsiveness.

## Decisions (from brainstorming)

| Topic | Decision |
|-------|----------|
| Scope | Full redesign + bug fixes + new Projects section |
| Stack | React + Vite (JavaScript, not TypeScript — matches owner's skill level) |
| Projects content | Placeholder cards now; owner fills real data later |
| Visual style | Dark modern, dark background, single accent color |
| Features | Scroll animations, dark/light toggle, real downloadable CV, contact form |

## Architecture

- **Framework:** Vite + React, plain JavaScript. Single-page app with smooth section scrolling.
- **Hosting:** GitHub Pages user site (`kenshunn.github.io`), served from repository root domain. `vite.config.js` uses base `'/'`.
- **Deploy:** GitHub Actions workflow. On push to `main`: install deps → `vite build` → deploy `dist/` to Pages via the official Pages actions. Repository Settings → Pages → Source must be set to "GitHub Actions" once, manually, by the owner.
- **Migration:** Existing `index.html`, `style.css`, `script.js`, `mediaquerie.css` are removed (git history retains them). Images in `assets/` move to `public/`.

### Directory structure

```
src/
  main.jsx               # React entry
  App.jsx                # composes sections
  components/
    Navbar.jsx
    Hero.jsx
    About.jsx
    Skills.jsx
    Projects.jsx
    Contact.jsx
    Footer.jsx
    ThemeToggle.jsx
  data/
    projects.js          # array of project objects
    skills.js            # frontend/backend skill groups
  context/
    ThemeContext.jsx     # dark/light state
  hooks/
    useScrollReveal.js   # IntersectionObserver fade-in
  styles/
    global.css           # CSS variables, base, theme vars
    (component CSS modules or scoped sections)
public/
  cv.pdf                 # placeholder, owner replaces
  images/                # migrated assets
.github/workflows/
  deploy.yml
vite.config.js
package.json
```

## Components

- **Navbar** — sticky top. Logo `@kenshunn`, nav links (About / Skills / Projects / Contact), theme toggle. Responsive hamburger menu on mobile (correctly wired, fixing the old JS bug).
- **Hero** — name, tagline ("Amateur Programmer"), profile picture, CTA buttons (Download CV → real `cv.pdf`; Contact → scroll to contact), social icons (GitHub, Twitter).
- **About** — picture, bio text, Education and Experience info cards.
- **Skills** — Frontend and Backend groups; each skill shows name + level. Sourced from `skills.js`.
- **Projects (new)** — responsive grid of cards built from `projects.js`. Each card: title, description, tag list, repo link, live link, image. Three placeholder cards seeded.
- **Contact** — Formspree-backed form (name, email, message) plus email/phone shown as fallback.
- **Footer** — nav links + copyright.

Each component lives in its own file. Components that render lists read from `data/`.

## Data Flow

- Static data lives in `data/projects.js` and `data/skills.js` as arrays of plain objects.
- Components `map` over the arrays to render. Adding a project = editing one array entry. No backend, no fetch.

### Project object shape

```js
{
  title: "Project Name",
  description: "Short description.",
  tags: ["React", "CSS"],
  repoUrl: "https://github.com/kenshunn/...",
  liveUrl: "https://...",        // optional
  image: "/images/project1.png"  // placeholder
}
```

### Skill object shape

```js
{ name: "HTML", level: "Newbie" }   // grouped under "Frontend" / "Backend"
```

## Theming

- `ThemeContext` holds the current theme (`dark` | `light`), default `dark`.
- Toggling sets a `data-theme` attribute on `<html>`; CSS variables swap accordingly.
- Choice persisted in `localStorage` and restored on load.

## Styling

CSS custom properties drive the palette.

**Dark (default):**
- `--bg: #0d1117`
- `--surface: #161b22`
- `--text: #e6edf3`
- `--muted: #8b949e`
- `--accent: #6366f1`

**Light:** inverted equivalents (light bg/surface, dark text, same accent).

- Mobile-first layout with flexbox/grid; breakpoints at 600px and 1024px.
- Scroll animations via a `useScrollReveal` hook using `IntersectionObserver` to add a reveal class; CSS transitions handle fade/slide-in.

## Contact Form

- Posts to Formspree (free tier). Spec uses placeholder `YOUR_FORM_ID`; owner creates a Formspree account, obtains the form ID, and swaps it in.
- Email and phone displayed below the form as a no-JS fallback.

## CV

- No real CV file exists yet. Seed a placeholder `public/cv.pdf`. The Download CV button serves it. Owner replaces the file with a real CV later.

## Error Handling

- Contact form: client-side validation (required fields, valid email) before submit; show success/error message from Formspree response.
- Missing project image: cards tolerate a missing/placeholder image without breaking layout.
- Theme: if `localStorage` unavailable, fall back to default dark, no crash.

## Testing

- **Vitest + React Testing Library.**
  - Projects/Skills render one card/row per data entry.
  - Theme toggle flips `data-theme` and persists to `localStorage`.
  - Contact form validation rejects empty/invalid input.
- **Manual:** `npm run dev`, verify all sections, mobile menu, theme toggle, scroll animations, CV download.

## Out of Scope (YAGNI)

- TypeScript.
- Backend / database.
- Blog / CMS.
- Multi-page routing.
- i18n.
