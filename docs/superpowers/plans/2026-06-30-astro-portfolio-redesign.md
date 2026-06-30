# Astro Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `kenshunn.github.io` as an Astro static site with a Projects showcase, dark/light theme (no-flash), scroll animations, real CV download, and a Formspree contact form — zero UI framework, vanilla JS for interactivity.

**Architecture:** One Astro page composes `.astro` section components inside a shared Layout. Static data arrays drive Skills/Projects at build time. Interactivity (theme toggle, hamburger, scroll reveal, form validation) lives in small vanilla `<script>` blocks. Built `dist/` deploys to GitHub Pages via GitHub Actions.

**Tech Stack:** Astro (latest), Vitest (for pure JS modules + build-output assertions), Formspree (external), GitHub Actions Pages deploy.

## Global Constraints

- Plain JavaScript and `.astro` only — no TypeScript, no React/Vue/Svelte.
- GitHub Pages **user site** (`kenshunn.github.io`): `astro.config.mjs` sets `site: 'https://kenshunn.github.io'`, `base: '/'`.
- Node 24 / npm 11 (installed).
- Palette CSS vars (dark default): `--bg:#0d1117`, `--surface:#161b22`, `--text:#e6edf3`, `--muted:#8b949e`, `--accent:#6366f1`. Light = inverted, same accent.
- Theme: `data-theme` attribute on `<html>`; default `dark`; persisted in `localStorage` key `theme`; no-flash inline head script.
- Breakpoints 600px, 1024px. Mobile-first.
- Section ids: `top` (hero), `about`, `skills`, `projects`, `contact`. Nav links target these.
- Owner-supplied placeholders kept: Formspree id `YOUR_FORM_ID`, `public/cv.pdf` placeholder, project images `/images/placeholder.png`, profile `/images/profile.png`.
- Each component task ends with a clean `npm run build` and an asserted marker in `dist/index.html`.
- Frequent commits — one per task minimum.

---

## File Structure

- `package.json`, `astro.config.mjs`, `vitest.config.js`, `.gitignore` — scaffold + test harness.
- `src/pages/index.astro` — composes sections (grows per component task).
- `src/layouts/Layout.astro` — HTML shell, no-flash theme script, global CSS, reveal script, `<slot/>`.
- `src/components/{Navbar,Hero,About,Skills,Projects,Contact,Footer}.astro` — sections.
- `src/data/{skills,projects}.js` — static content.
- `src/scripts/validate.js` — pure form-validation function (unit-tested).
- `src/scripts/reveal.js` — IntersectionObserver scroll reveal.
- `src/styles/global.css` — variables, base, theme, layout, reveal.
- `tests/` — Vitest specs for data + validate + build output.
- `public/images/`, `public/cv.pdf` — static assets.
- `.github/workflows/deploy.yml` — Pages deploy.

---

### Task 1: Scaffold Astro project + Vitest harness

**Files:**
- Create: `package.json`, `astro.config.mjs`, `vitest.config.js`, `.gitignore`
- Create: `src/pages/index.astro`
- Create: `src/styles/global.css`

**Interfaces:**
- Consumes: nothing.
- Produces: npm scripts `dev`, `build`, `preview`, `test`; a buildable Astro site; `global.css` with palette variables.

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "kenshunn-portfolio",
  "type": "module",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro",
    "test": "vitest run"
  },
  "dependencies": {
    "astro": "^4.15.0"
  },
  "devDependencies": {
    "vitest": "^2.0.4"
  }
}
```

- [ ] **Step 2: Create `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://kenshunn.github.io',
  base: '/',
});
```

- [ ] **Step 3: Create `vitest.config.js`**

```js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.test.js'],
  },
});
```

- [ ] **Step 4: Create `.gitignore`**

```
node_modules
dist
.astro
*.local
```

- [ ] **Step 5: Create `src/styles/global.css`**

```css
:root,
[data-theme='dark'] {
  --bg: #0d1117;
  --surface: #161b22;
  --text: #e6edf3;
  --muted: #8b949e;
  --accent: #6366f1;
}
[data-theme='light'] {
  --bg: #ffffff;
  --surface: #f3f4f6;
  --text: #161b22;
  --muted: #5b6471;
  --accent: #6366f1;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
}
a { color: var(--accent); text-decoration: none; }
a:hover { text-decoration: underline; }
section { max-width: 1100px; margin: 0 auto; padding: 5rem 1.5rem; }
h2 { font-size: 2.25rem; margin-bottom: 2rem; }
.eyebrow { color: var(--muted); }
.btn {
  display: inline-block; padding: 0.75rem 1.5rem; border-radius: 2rem;
  font-weight: 600; cursor: pointer; transition: all 300ms ease;
}
.btn-primary { background: var(--accent); color: #fff; }
.btn-primary:hover { filter: brightness(1.1); text-decoration: none; }
.btn-outline { border: 1px solid var(--accent); color: var(--accent); }
.btn-outline:hover { background: var(--accent); color: #fff; text-decoration: none; }
.card {
  background: var(--surface); border-radius: 1rem; padding: 1.5rem;
  border: 1px solid color-mix(in srgb, var(--muted) 30%, transparent);
}
.card h3 { margin-bottom: 0.5rem; color: var(--accent); }
```

- [ ] **Step 6: Create `src/pages/index.astro`**

```astro
---
import '../styles/global.css';
---

<!DOCTYPE html>
<html lang="en" data-theme="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Ken Aaron De Martin — Portfolio</title>
  </head>
  <body>
    <main id="top">Scaffold OK</main>
  </body>
</html>
```

- [ ] **Step 7: Install and build**

Run: `npm install && npm run build`
Expected: install succeeds; build writes `dist/index.html` containing `Scaffold OK`, no errors.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json astro.config.mjs vitest.config.js .gitignore src/
git commit -m "feat: scaffold Astro project and Vitest harness"
```

---

### Task 2: Static data files

**Files:**
- Create: `src/data/skills.js`, `src/data/projects.js`
- Test: `tests/data.test.js`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `skills` (default export): array of `{ group, items: [{ name, level }] }`; includes groups "Frontend Development" and "Backend Development".
  - `projects` (default export): array (≥3) of `{ title, description, tags: string[], repoUrl, liveUrl, image }`.

- [ ] **Step 1: Write the failing test** — `tests/data.test.js`

```js
import { test, expect } from 'vitest';
import skills from '../src/data/skills.js';
import projects from '../src/data/projects.js';

test('skills has frontend and backend groups with items', () => {
  const groups = skills.map((g) => g.group);
  expect(groups).toContain('Frontend Development');
  expect(groups).toContain('Backend Development');
  skills.forEach((g) => {
    expect(Array.isArray(g.items)).toBe(true);
    g.items.forEach((s) => {
      expect(typeof s.name).toBe('string');
      expect(typeof s.level).toBe('string');
    });
  });
});

test('projects are well-formed cards', () => {
  expect(projects.length).toBeGreaterThanOrEqual(3);
  projects.forEach((p) => {
    expect(typeof p.title).toBe('string');
    expect(typeof p.description).toBe('string');
    expect(Array.isArray(p.tags)).toBe(true);
    expect(typeof p.repoUrl).toBe('string');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- data`
Expected: FAIL — cannot resolve `../src/data/skills.js`.

- [ ] **Step 3: Create `src/data/skills.js`**

```js
const skills = [
  {
    group: 'Frontend Development',
    items: [
      { name: 'HTML', level: 'Newbie' },
      { name: 'CSS', level: 'Basic' },
      { name: 'JavaScript', level: 'Newbie' },
      { name: 'C++', level: 'Basic' },
      { name: 'C#', level: 'Basic' },
      { name: 'Python', level: 'Basic' },
    ],
  },
  {
    group: 'Backend Development',
    items: [
      { name: 'Git', level: 'Newbie' },
      { name: 'Node JS', level: 'Newbie' },
      { name: 'SQL', level: 'Newbie' },
    ],
  },
];

export default skills;
```

- [ ] **Step 4: Create `src/data/projects.js`**

```js
const projects = [
  {
    title: 'Project One',
    description: 'Placeholder description. Replace with a real project.',
    tags: ['Astro', 'CSS'],
    repoUrl: 'https://github.com/kenshunn',
    liveUrl: '',
    image: '/images/placeholder.png',
  },
  {
    title: 'Project Two',
    description: 'Placeholder description. Replace with a real project.',
    tags: ['JavaScript'],
    repoUrl: 'https://github.com/kenshunn',
    liveUrl: '',
    image: '/images/placeholder.png',
  },
  {
    title: 'Project Three',
    description: 'Placeholder description. Replace with a real project.',
    tags: ['Python'],
    repoUrl: 'https://github.com/kenshunn',
    liveUrl: '',
    image: '/images/placeholder.png',
  },
];

export default projects;
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test -- data`
Expected: PASS (2 tests).

- [ ] **Step 6: Commit**

```bash
git add src/data/ tests/data.test.js
git commit -m "feat: add static skills and projects data"
```

---

### Task 3: Layout with no-flash theme script

**Files:**
- Create: `src/layouts/Layout.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `global.css`.
- Produces: `Layout` Astro component with one prop `title` (string). Renders the full HTML document, imports `global.css`, runs an inline render-blocking script in `<head>` that sets `data-theme` on `<html>` from `localStorage.theme` (default `dark`), and renders page content via `<slot/>`.

- [ ] **Step 1: Create `src/layouts/Layout.astro`**

```astro
---
import '../styles/global.css';
const { title = 'Ken Aaron De Martin — Portfolio' } = Astro.props;
---

<!DOCTYPE html>
<html lang="en" data-theme="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <script is:inline>
      (function () {
        try {
          var t = localStorage.getItem('theme') || 'dark';
          document.documentElement.setAttribute('data-theme', t);
        } catch (e) {
          document.documentElement.setAttribute('data-theme', 'dark');
        }
      })();
    </script>
  </head>
  <body>
    <slot />
  </body>
</html>
```

- [ ] **Step 2: Replace `src/pages/index.astro` to use the Layout**

```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout>
  <main id="top">Scaffold OK</main>
</Layout>
```

- [ ] **Step 3: Build and assert no-flash script present**

Run:
```bash
npm run build && node -e "const h=require('fs').readFileSync('dist/index.html','utf8'); if(!h.includes('data-theme')||!h.includes(\"localStorage.getItem('theme')\")){process.exit(1)}; console.log('ok')"
```
Expected: prints `ok` (built HTML contains the inline theme script).

- [ ] **Step 4: Commit**

```bash
git add src/layouts/Layout.astro src/pages/index.astro
git commit -m "feat: add layout with no-flash theme script"
```

---

### Task 4: Navbar with theme toggle and hamburger

**Files:**
- Create: `src/components/Navbar.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/styles/global.css` (APPEND)

**Interfaces:**
- Consumes: Layout (page context).
- Produces: `Navbar` component. Sticky `<nav>` with logo `@kenshunn`, links to `#about/#skills/#projects/#contact`, a theme-toggle button (`id="theme-toggle"`, `aria-label="Toggle color theme"`), and a hamburger button (`class="hamburger"`, `aria-label="Toggle menu"`) plus a `.mobile-menu` list. A scoped `<script>` toggles `.mobile-menu`'s `open` class and flips/persists the theme.

- [ ] **Step 1: Create `src/components/Navbar.astro`**

```astro
---
const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];
---

<nav class="navbar">
  <a href="#top" class="logo">@kenshunn</a>

  <ul class="nav-links desktop-only">
    {links.map((l) => <li><a href={l.href}>{l.label}</a></li>)}
  </ul>

  <div class="nav-right">
    <button type="button" id="theme-toggle" class="theme-toggle" aria-label="Toggle color theme">Theme</button>
    <button type="button" class="hamburger" aria-label="Toggle menu">
      <span></span><span></span><span></span>
    </button>
  </div>

  <ul class="mobile-menu">
    {links.map((l) => <li><a href={l.href}>{l.label}</a></li>)}
  </ul>
</nav>

<script>
  const burger = document.querySelector('.hamburger');
  const menu = document.querySelector('.mobile-menu');
  burger?.addEventListener('click', () => menu?.classList.toggle('open'));
  menu?.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => menu.classList.remove('open'))
  );

  const toggle = document.getElementById('theme-toggle');
  toggle?.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', cur);
    try { localStorage.setItem('theme', cur); } catch (e) { /* ignore */ }
  });
</script>
```

- [ ] **Step 2: Add Navbar to `src/pages/index.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
import Navbar from '../components/Navbar.astro';
---

<Layout>
  <Navbar />
  <main id="top">Scaffold OK</main>
</Layout>
```

- [ ] **Step 3: Append Navbar CSS to `src/styles/global.css`**

```css
.navbar {
  position: sticky; top: 0; z-index: 10;
  display: flex; align-items: center; justify-content: space-between;
  padding: 1rem 2rem;
  background: color-mix(in srgb, var(--bg) 85%, transparent);
  backdrop-filter: blur(8px);
}
.logo { font-size: 1.5rem; font-weight: 700; color: var(--text); }
.nav-links { display: flex; gap: 2rem; list-style: none; }
.nav-right { display: flex; align-items: center; gap: 1rem; }
.theme-toggle {
  background: none; border: 1px solid var(--accent); color: var(--accent);
  border-radius: 1rem; padding: 0.3rem 0.9rem; cursor: pointer;
}
.hamburger { display: none; flex-direction: column; gap: 5px;
  background: none; border: none; cursor: pointer; }
.hamburger span { width: 26px; height: 2px; background: var(--text); }
.mobile-menu { display: none; list-style: none; }
@media (max-width: 1024px) {
  .desktop-only { display: none; }
  .hamburger { display: flex; }
  .mobile-menu {
    position: absolute; top: 100%; right: 0; flex-direction: column;
    background: var(--surface); max-height: 0; overflow: hidden;
    transition: max-height 300ms ease; width: 100%; text-align: center;
  }
  .mobile-menu.open { max-height: 320px; }
  .mobile-menu li { padding: 0.8rem 0; }
}
```

- [ ] **Step 4: Build and assert**

Run:
```bash
npm run build && node -e "const h=require('fs').readFileSync('dist/index.html','utf8'); if(!h.includes('@kenshunn')||!h.includes('Toggle menu')){process.exit(1)}; console.log('ok')"
```
Expected: prints `ok`.

- [ ] **Step 5: Commit**

```bash
git add src/components/Navbar.astro src/pages/index.astro src/styles/global.css
git commit -m "feat: add navbar with theme toggle and hamburger"
```

---

### Task 5: Hero section

**Files:**
- Create: `src/components/Hero.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/styles/global.css` (APPEND)

**Interfaces:**
- Produces: `Hero` component rendering `id="top"` section with heading "Ken Aaron De Martin", tagline "Amateur Programmer", profile image `/images/profile.png`, a "Download CV" link (`href="/cv.pdf"`, `download`), a "Contact" link to `#contact`, and GitHub (`https://github.com/kenshunn`) + Twitter (`https://twitter.com/catfroghae`) links.

- [ ] **Step 1: Create `src/components/Hero.astro`**

```astro
---
---
<section id="top" class="hero reveal">
  <img class="hero-pic" src="/images/profile.png" alt="Ken Aaron De Martin" />
  <div class="hero-text">
    <p class="eyebrow">Hello, I'm</p>
    <h1>Ken Aaron De Martin</h1>
    <p class="tagline">Amateur Programmer</p>
    <div class="hero-btns">
      <a class="btn btn-primary" href="/cv.pdf" download>Download CV</a>
      <a class="btn btn-outline" href="#contact">Contact</a>
    </div>
    <div class="socials">
      <a href="https://github.com/kenshunn" target="_blank" rel="noreferrer">GitHub</a>
      <a href="https://twitter.com/catfroghae" target="_blank" rel="noreferrer">Twitter</a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add Hero to `src/pages/index.astro`** (replace the placeholder `<main>`)

```astro
---
import Layout from '../layouts/Layout.astro';
import Navbar from '../components/Navbar.astro';
import Hero from '../components/Hero.astro';
---

<Layout>
  <Navbar />
  <main>
    <Hero />
  </main>
</Layout>
```

- [ ] **Step 3: Append Hero CSS to `src/styles/global.css`**

```css
.tagline { color: var(--accent); font-size: 1.25rem; margin: 0.25rem 0 1.25rem; }
.hero { display: flex; align-items: center; gap: 3rem; min-height: 80vh; }
.hero-pic { width: 320px; height: 320px; object-fit: cover; border-radius: 50%; }
.hero-text { text-align: left; }
.hero-btns { display: flex; gap: 1rem; margin-bottom: 1rem; }
.socials { display: flex; gap: 1.5rem; }
@media (max-width: 1024px) {
  .hero { flex-direction: column; text-align: center; }
  .hero-text { text-align: center; }
  .hero-btns, .socials { justify-content: center; }
  .hero-pic { width: 220px; height: 220px; }
}
```

- [ ] **Step 4: Build and assert**

Run:
```bash
npm run build && node -e "const h=require('fs').readFileSync('dist/index.html','utf8'); if(!h.includes('Ken Aaron De Martin')||!h.includes('/cv.pdf')||!h.includes('download')){process.exit(1)}; console.log('ok')"
```
Expected: prints `ok`.

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.astro src/pages/index.astro src/styles/global.css
git commit -m "feat: add hero section with CV download"
```

---

### Task 6: About section

**Files:**
- Create: `src/components/About.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/styles/global.css` (APPEND)

**Interfaces:**
- Produces: `About` component rendering `id="about"` section with heading "About Me", an Education card and an Experience card, and a bio paragraph.

- [ ] **Step 1: Create `src/components/About.astro`**

```astro
---
---
<section id="about" class="about reveal">
  <p class="eyebrow">Get to know more</p>
  <h2>About Me</h2>
  <div class="about-grid">
    <div class="card">
      <h3>Education</h3>
      <p>2nd Year College — Mapúa Malayan Colleges Laguna (Current)</p>
      <p>Highschool Graduate — Far Eastern University Alabang</p>
    </div>
    <div class="card">
      <h3>Experience</h3>
      <p>Little to none — actively learning.</p>
    </div>
  </div>
  <p class="bio">
    Hi, I'm Ken Aaron C. De Martin, born December 11, 2004. I enjoy listening to
    music, mostly KPOP, and I'm currently a 2nd Year student at Mapúa Malayan
    Colleges Laguna.
  </p>
</section>
```

- [ ] **Step 2: Add About to `src/pages/index.astro`** (import + place after `<Hero />`)

Add `import About from '../components/About.astro';` to the frontmatter and `<About />` after `<Hero />` inside `<main>`.

- [ ] **Step 3: Append About CSS to `src/styles/global.css`**

```css
.about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem; }
.bio { color: var(--muted); max-width: 720px; }
@media (max-width: 600px) { .about-grid { grid-template-columns: 1fr; } }
```

- [ ] **Step 4: Build and assert**

Run:
```bash
npm run build && node -e "const h=require('fs').readFileSync('dist/index.html','utf8'); if(!h.includes('About Me')||!h.includes('Education')){process.exit(1)}; console.log('ok')"
```
Expected: prints `ok`.

- [ ] **Step 5: Commit**

```bash
git add src/components/About.astro src/pages/index.astro src/styles/global.css
git commit -m "feat: add about section"
```

---

### Task 7: Skills section

**Files:**
- Create: `src/components/Skills.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/styles/global.css` (APPEND)

**Interfaces:**
- Consumes: `skills` from `src/data/skills.js`.
- Produces: `Skills` component rendering `id="skills"` section, heading "Skills", one group block per `skills` entry (group heading), and one item per skill with `name` + `level`.

- [ ] **Step 1: Create `src/components/Skills.astro`**

```astro
---
import skills from '../data/skills.js';
---
<section id="skills" class="skills reveal">
  <p class="eyebrow">Explore my</p>
  <h2>Skills</h2>
  <div class="skills-groups">
    {skills.map((group) => (
      <div class="card">
        <h3>{group.group}</h3>
        <div class="skill-list">
          {group.items.map((s) => (
            <div class="skill-item">
              <span class="skill-name">{s.name}</span>
              <span class="skill-level">{s.level}</span>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
</section>
```

- [ ] **Step 2: Add Skills to `src/pages/index.astro`** (import + place after `<About />`)

- [ ] **Step 3: Append Skills CSS to `src/styles/global.css`**

```css
.skills-groups { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
.skill-list { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-top: 1rem; }
.skill-item { display: flex; flex-direction: column; }
.skill-name { font-weight: 600; }
.skill-level { color: var(--muted); font-size: 0.9rem; }
@media (max-width: 600px) { .skills-groups { grid-template-columns: 1fr; } }
```

- [ ] **Step 4: Build and assert** (asserts every skill name rendered)

Run:
```bash
npm run build && node -e "const h=require('fs').readFileSync('dist/index.html','utf8'); const s=require('./src/data/skills.js'); /* ESM */"
```
Use this instead (ESM-safe):
```bash
npm run build && node --input-type=module -e "import fs from 'fs'; import skills from './src/data/skills.js'; const h=fs.readFileSync('dist/index.html','utf8'); const names=skills.flatMap(g=>g.items.map(i=>i.name)); const miss=names.filter(n=>!h.includes(n)); if(!h.includes('Frontend Development')||miss.length){console.error('missing',miss);process.exit(1)}; console.log('ok')"
```
Expected: prints `ok`.

- [ ] **Step 5: Commit**

```bash
git add src/components/Skills.astro src/pages/index.astro src/styles/global.css
git commit -m "feat: add skills section from data"
```

---

### Task 8: Projects section

**Files:**
- Create: `src/components/Projects.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/styles/global.css` (APPEND)

**Interfaces:**
- Consumes: `projects` from `src/data/projects.js`.
- Produces: `Projects` component rendering `id="projects"` section, heading "Projects", one card per project (title, description, tags, a "Code" link to `repoUrl`, a "Live" link only when `liveUrl` is non-empty, image).

- [ ] **Step 1: Create `src/components/Projects.astro`**

```astro
---
import projects from '../data/projects.js';
---
<section id="projects" class="projects reveal">
  <p class="eyebrow">Browse my</p>
  <h2>Projects</h2>
  <div class="project-grid">
    {projects.map((p) => (
      <article class="card project-card">
        <img class="project-img" src={p.image} alt={p.title} />
        <h3>{p.title}</h3>
        <p class="project-desc">{p.description}</p>
        <ul class="tags">
          {p.tags.map((t) => <li>{t}</li>)}
        </ul>
        <div class="project-links">
          <a class="btn btn-outline" href={p.repoUrl} target="_blank" rel="noreferrer">Code</a>
          {p.liveUrl && (
            <a class="btn btn-primary" href={p.liveUrl} target="_blank" rel="noreferrer">Live</a>
          )}
        </div>
      </article>
    ))}
  </div>
</section>
```

- [ ] **Step 2: Add Projects to `src/pages/index.astro`** (import + place after `<Skills />`)

- [ ] **Step 3: Append Projects CSS to `src/styles/global.css`**

```css
.project-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem; }
.project-img { width: 100%; height: 160px; object-fit: cover; border-radius: 0.75rem; margin-bottom: 1rem; background: var(--bg); }
.project-desc { color: var(--muted); margin: 0.5rem 0 1rem; }
.tags { display: flex; flex-wrap: wrap; gap: 0.5rem; list-style: none; margin-bottom: 1rem; }
.tags li { font-size: 0.8rem; padding: 0.2rem 0.6rem; border-radius: 1rem;
  background: color-mix(in srgb, var(--accent) 20%, transparent); color: var(--accent); }
.project-links { display: flex; gap: 0.75rem; }
.project-links .btn { padding: 0.5rem 1rem; }
```

- [ ] **Step 4: Build and assert** (one card per project, no Live link when liveUrl empty)

Run:
```bash
npm run build && node --input-type=module -e "import fs from 'fs'; import projects from './src/data/projects.js'; const h=fs.readFileSync('dist/index.html','utf8'); const cards=(h.match(/project-card/g)||[]).length; const lives=(h.match(/>Live</g)||[]).length; const expLive=projects.filter(p=>p.liveUrl).length; if(cards!==projects.length||lives!==expLive){console.error('cards',cards,'lives',lives);process.exit(1)}; console.log('ok')"
```
Expected: prints `ok`.

- [ ] **Step 5: Commit**

```bash
git add src/components/Projects.astro src/pages/index.astro src/styles/global.css
git commit -m "feat: add projects showcase section"
```

---

### Task 9: Contact section with validated Formspree form

**Files:**
- Create: `src/scripts/validate.js`
- Create: `src/components/Contact.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/styles/global.css` (APPEND)
- Test: `tests/validate.test.js`

**Interfaces:**
- Consumes: nothing (validate.js is standalone).
- Produces:
  - `validateContact({ name, email, message })` (default export of `validate.js`) → `{ valid: boolean, error: string }`. Invalid when any field is empty/whitespace or email fails `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`; `error` is `''` when valid, else a human message.
  - `Contact` component: `id="contact"` section, heading "Contact Me", a `<form>` (action `https://formspree.io/f/YOUR_FORM_ID`, method POST) with `name`, `email`, `message` fields + submit, an empty `[role="alert"]` container, email (`aaron.11demartin@gmail.com`) + phone (`+63 998 545 1812`) fallback. A scoped `<script>` imports `validateContact` and blocks submit on invalid input, writing the message into the alert.

- [ ] **Step 1: Write the failing test** — `tests/validate.test.js`

```js
import { test, expect } from 'vitest';
import validateContact from '../src/scripts/validate.js';

test('valid input passes', () => {
  expect(validateContact({ name: 'Ken', email: 'a@b.com', message: 'hi' }))
    .toEqual({ valid: true, error: '' });
});

test('empty field fails', () => {
  const r = validateContact({ name: '', email: 'a@b.com', message: 'hi' });
  expect(r.valid).toBe(false);
  expect(r.error).toMatch(/fill/i);
});

test('bad email fails', () => {
  const r = validateContact({ name: 'Ken', email: 'nope', message: 'hi' });
  expect(r.valid).toBe(false);
  expect(r.error).toMatch(/email/i);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- validate`
Expected: FAIL — cannot resolve `../src/scripts/validate.js`.

- [ ] **Step 3: Create `src/scripts/validate.js`**

```js
export default function validateContact({ name, email, message }) {
  const n = (name || '').trim();
  const e = (email || '').trim();
  const m = (message || '').trim();
  if (!n || !e || !m) {
    return { valid: false, error: 'Please fill in all fields.' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) {
    return { valid: false, error: 'Please enter a valid email.' };
  }
  return { valid: true, error: '' };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- validate`
Expected: PASS (3 tests).

- [ ] **Step 5: Create `src/components/Contact.astro`**

```astro
---
---
<section id="contact" class="contact reveal">
  <p class="eyebrow">Get in touch</p>
  <h2>Contact Me</h2>
  <form class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST" novalidate>
    <input name="name" type="text" placeholder="Your name" aria-label="Name" />
    <input name="email" type="email" placeholder="Your email" aria-label="Email" />
    <textarea name="message" rows="5" placeholder="Your message" aria-label="Message"></textarea>
    <p class="form-error" role="alert"></p>
    <button type="submit" class="btn btn-primary">Send</button>
  </form>
  <div class="contact-fallback">
    <a href="mailto:aaron.11demartin@gmail.com">aaron.11demartin@gmail.com</a>
    <span>+63 998 545 1812</span>
  </div>
</section>

<script>
  import validateContact from '../scripts/validate.js';
  const form = document.querySelector('.contact-form');
  const alert = document.querySelector('.contact-form .form-error');
  form?.addEventListener('submit', (e) => {
    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };
    const { valid, error } = validateContact(data);
    if (!valid) {
      e.preventDefault();
      if (alert) alert.textContent = error;
    }
  });
</script>
```

- [ ] **Step 6: Add Contact to `src/pages/index.astro`** (import + place after `<Projects />`)

- [ ] **Step 7: Append Contact CSS to `src/styles/global.css`**

```css
.contact-form { display: flex; flex-direction: column; gap: 1rem; max-width: 560px; }
.contact-form input, .contact-form textarea {
  background: var(--surface); border: 1px solid color-mix(in srgb, var(--muted) 30%, transparent);
  border-radius: 0.5rem; padding: 0.75rem; color: var(--text); font: inherit;
}
.form-error { color: #f87171; min-height: 1.2em; }
.contact-fallback { display: flex; gap: 1.5rem; margin-top: 1.5rem; color: var(--muted); }
```

- [ ] **Step 8: Build and assert + full test suite**

Run:
```bash
npm run build && node -e "const h=require('fs').readFileSync('dist/index.html','utf8'); if(!h.includes('Contact Me')||!h.includes('formspree.io/f/YOUR_FORM_ID')||!h.includes('mailto:aaron.11demartin@gmail.com')){process.exit(1)}; console.log('ok')" && npm test
```
Expected: prints `ok`; full Vitest suite passes (data + validate).

- [ ] **Step 9: Commit**

```bash
git add src/scripts/validate.js src/components/Contact.astro src/pages/index.astro src/styles/global.css tests/validate.test.js
git commit -m "feat: add contact section with validated Formspree form"
```

---

### Task 10: Footer and final page composition

**Files:**
- Create: `src/components/Footer.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/styles/global.css` (APPEND)

**Interfaces:**
- Produces: `Footer` component with copyright text "Copyright © 2024 Ken De Martin. All Rights Reserved." and footer nav links; final `index.astro` composes Navbar, Hero, About, Skills, Projects, Contact, Footer in order.

- [ ] **Step 1: Create `src/components/Footer.astro`**

```astro
---
const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];
---
<footer class="footer">
  <ul class="footer-links">
    {links.map((l) => <li><a href={l.href}>{l.label}</a></li>)}
  </ul>
  <p>Copyright © 2024 Ken De Martin. All Rights Reserved.</p>
</footer>
```

- [ ] **Step 2: Finalize `src/pages/index.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
import Navbar from '../components/Navbar.astro';
import Hero from '../components/Hero.astro';
import About from '../components/About.astro';
import Skills from '../components/Skills.astro';
import Projects from '../components/Projects.astro';
import Contact from '../components/Contact.astro';
import Footer from '../components/Footer.astro';
---

<Layout>
  <Navbar />
  <main>
    <Hero />
    <About />
    <Skills />
    <Projects />
    <Contact />
  </main>
  <Footer />
</Layout>
```

- [ ] **Step 3: Append Footer CSS to `src/styles/global.css`**

```css
.footer { text-align: center; padding: 2rem; color: var(--muted);
  border-top: 1px solid color-mix(in srgb, var(--muted) 20%, transparent); }
.footer-links { display: flex; gap: 1.5rem; list-style: none; justify-content: center; margin-bottom: 1rem; }
```

- [ ] **Step 4: Build and assert all sections present**

Run:
```bash
npm run build && node -e "const h=require('fs').readFileSync('dist/index.html','utf8'); const ids=['id=\"top\"','id=\"about\"','id=\"skills\"','id=\"projects\"','id=\"contact\"']; const miss=ids.filter(i=>!h.includes(i)); if(miss.length||!h.includes('All Rights Reserved')){console.error(miss);process.exit(1)}; console.log('ok')"
```
Expected: prints `ok`.

- [ ] **Step 5: Commit**

```bash
git add src/components/Footer.astro src/pages/index.astro src/styles/global.css
git commit -m "feat: add footer and finalize page composition"
```

---

### Task 11: Scroll-reveal script

**Files:**
- Create: `src/scripts/reveal.js`
- Modify: `src/layouts/Layout.astro`
- Modify: `src/styles/global.css` (APPEND)

**Interfaces:**
- Consumes: `.reveal` elements (already on each section).
- Produces: `reveal.js` — on DOM ready, if `IntersectionObserver` exists, observes every `.reveal` and adds `reveal-visible` when it intersects (then unobserves); otherwise adds `reveal-visible` to all immediately. Imported by Layout via a module `<script>`.

- [ ] **Step 1: Create `src/scripts/reveal.js`**

```js
function revealAll() {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('reveal-visible'));
}

if (typeof IntersectionObserver === 'undefined') {
  revealAll();
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}
```

- [ ] **Step 2: Import reveal.js in `src/layouts/Layout.astro`**

Add a module script before `</body>` (after `<slot />`):

```astro
    <slot />
    <script>
      import '../scripts/reveal.js';
    </script>
  </body>
```

- [ ] **Step 3: Append reveal CSS to `src/styles/global.css`**

```css
.reveal { opacity: 0; transform: translateY(24px); transition: opacity 600ms ease, transform 600ms ease; }
.reveal-visible { opacity: 1; transform: none; }
```

- [ ] **Step 4: Build and assert reveal styles shipped**

Run:
```bash
npm run build && node -e "const fs=require('fs'); const css=fs.readdirSync('dist/_astro').find(f=>f.endsWith('.css')); const c=fs.readFileSync('dist/_astro/'+css,'utf8'); if(!c.includes('reveal-visible')){process.exit(1)}; console.log('ok')"
```
Expected: prints `ok`. (If the CSS filename lookup fails because styles inline, fall back to: assert `dist/index.html` contains `reveal-visible` OR `.reveal`.)

- [ ] **Step 5: Commit**

```bash
git add src/scripts/reveal.js src/layouts/Layout.astro src/styles/global.css
git commit -m "feat: add scroll-reveal animation"
```

---

### Task 12: Migrate assets, add placeholders, remove legacy site

**Files:**
- Create: `public/images/profile.png`, `public/images/placeholder.png`, `public/images/github.png`, `public/images/twitter.png`
- Create: `public/cv.pdf`
- Delete: legacy `index.html` (root, old static — NOT `src/pages/index.astro`), `style.css`, `script.js`, `mediaquerie.css`, `assets/`

**Interfaces:**
- Consumes: image paths referenced by Hero (`/images/profile.png`) and projects data (`/images/placeholder.png`).
- Produces: served static files under `public/`; legacy static site removed.

- [ ] **Step 1: Create public dirs and migrate images**

Run:
```bash
mkdir -p public/images
cp assets/meme.png public/images/profile.png
cp assets/github.png public/images/github.png
cp assets/twitter.png public/images/twitter.png
cp assets/anotherme.png public/images/placeholder.png
```
Expected: files copied.

- [ ] **Step 2: Create placeholder CV**

Run:
```bash
printf '%%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 300 144]>>endobj\nxref\n0 4\n0000000000 65535 f \ntrailer<</Root 1 0 R/Size 4>>\nstartxref\n0\n%%%%EOF\n' > public/cv.pdf
```
Expected: `public/cv.pdf` exists.

- [ ] **Step 3: Remove legacy static files**

Run:
```bash
git rm index.html style.css script.js mediaquerie.css
git rm -r assets
```
Note: this `index.html` is the OLD root static file. The Astro entry is `src/pages/index.astro` — do NOT remove that.
Expected: legacy files staged for deletion.

- [ ] **Step 4: Build and assert assets resolve**

Run:
```bash
npm run build && node -e "const fs=require('fs'); if(!fs.existsSync('dist/images/profile.png')||!fs.existsSync('dist/cv.pdf')){process.exit(1)}; console.log('ok')"
```
Expected: prints `ok`.

- [ ] **Step 5: Commit**

```bash
git add public/ index.html style.css script.js mediaquerie.css assets
git commit -m "chore: migrate assets, add placeholders, remove legacy static site"
```

---

### Task 13: GitHub Actions Pages deploy

**Files:**
- Create: `.github/workflows/deploy.yml`

**Interfaces:**
- Consumes: `npm run build` output `dist/`.
- Produces: a workflow that builds the Astro site and deploys to GitHub Pages on push to `main`.

- [ ] **Step 1: Create `.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: withastro/action@v3
        with:
          node-version: 20

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Validate workflow contents**

Run: `node -e "const s=require('fs').readFileSync('.github/workflows/deploy.yml','utf8'); if(!s.includes('withastro/action')||!s.includes('deploy-pages')){process.exit(1)}; console.log('ok')"`
Expected: prints `ok`.

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: add GitHub Pages deploy workflow for Astro"
```

- [ ] **Step 4: Manual owner action (document, do not automate)**

After merge to `main`: GitHub repo Settings → Pages → Build and deployment → Source = **GitHub Actions**. Owner also: create a Formspree account and replace `YOUR_FORM_ID` in `src/components/Contact.astro`; replace `public/cv.pdf` with a real CV; optionally replace placeholder project data and images.

---

## Self-Review

**Spec coverage:**
- Astro scaffold, base `'/'`, site set → Task 1. ✓
- Vitest harness → Task 1; data tests Task 2; validate tests Task 9. ✓
- Data files (skills/projects) → Task 2. ✓
- Layout + no-flash theme script → Task 3. ✓
- Navbar + theme toggle + hamburger (vanilla) → Task 4. ✓
- Hero + CV download → Task 5 (+ asset Task 12). ✓
- About → Task 6. ✓
- Skills from data → Task 7. ✓
- Projects showcase (3 placeholders, conditional Live link) → Task 8. ✓
- Contact: Formspree form + validation (pure, tested) + fallback → Task 9. ✓
- Footer + composition → Task 10. ✓
- Scroll reveal (IntersectionObserver + fallback) → Task 11. ✓
- Palette + dark/light vars → Task 1; theme applied Tasks 3/4. ✓
- Responsive 600/1024 → component CSS. ✓
- Asset migration + legacy cleanup → Task 12. ✓
- GH Actions deploy (withastro/action) → Task 13. ✓
- Error handling (theme try/catch, form validation, image tolerance) → Tasks 3/4, 9, 8. ✓

**Placeholder scan:** Intentional only — `YOUR_FORM_ID`, `public/cv.pdf`, placeholder project data/images — all owner-supplied, documented in Task 13 Step 4. No TBD/TODO in code steps.

**Type/name consistency:** `validateContact` returns `{ valid, error }` — same shape in Task 9 test, implementation, and Contact script. `data-theme`, `localStorage` key `theme`, classes `open`/`reveal`/`reveal-visible`, ids `top/about/skills/projects/contact` consistent across Layout, Navbar, sections, reveal.js. Image paths `/images/profile.png` (Hero) and `/images/placeholder.png` (projects data) match files created in Task 12.

**Astro testing note:** `.astro` components are verified via `npm run build` + grep of `dist/index.html` for required markers (each component task, Step "Build and assert"). Pure JS (`validate.js`, data) gets real Vitest TDD. This is the deliberate, pragmatic testing boundary for a static Astro site without a component-render test runner.
