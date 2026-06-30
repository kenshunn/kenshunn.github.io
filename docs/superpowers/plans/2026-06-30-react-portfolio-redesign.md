# React Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `kenshunn.github.io` as a Vite + React dark-modern portfolio with a Projects showcase, dark/light theme, scroll animations, real CV download, and a Formspree contact form.

**Architecture:** Single-page React app built by Vite. Components compose in `App.jsx`; list-rendering components read static arrays from `src/data/`. Theme state lives in a React context backed by `localStorage` and a `data-theme` attribute on `<html>`. CSS custom properties drive the palette. Built `dist/` is deployed to GitHub Pages via a GitHub Actions workflow.

**Tech Stack:** Vite, React 18 (JavaScript), Vitest, @testing-library/react, jsdom, Formspree (external), GitHub Actions Pages deploy.

## Global Constraints

- Plain JavaScript only — no TypeScript.
- Hosting is a GitHub Pages **user site** (`kenshunn.github.io`): `vite.config.js` base = `'/'`.
- Node 24 / npm 11 (already installed).
- Palette (CSS variables, dark default): `--bg:#0d1117`, `--surface:#161b22`, `--text:#e6edf3`, `--muted:#8b949e`, `--accent:#6366f1`.
- Default theme = `dark`; choice persisted in `localStorage` key `theme`.
- Breakpoints: 600px, 1024px. Mobile-first.
- Owner-supplied placeholders kept as-is: Formspree id `YOUR_FORM_ID`, `public/cv.pdf` placeholder.
- Frequent commits — one per task minimum.

---

## File Structure

- `package.json`, `vite.config.js`, `index.html` (Vite root entry) — project scaffold.
- `vitest.config.js`, `src/test/setup.js` — test harness.
- `src/main.jsx` — React/DOM entry.
- `src/App.jsx` — composes all sections inside ThemeProvider.
- `src/context/ThemeContext.jsx` — theme state, persistence, `data-theme`.
- `src/components/ThemeToggle.jsx` — toggle button.
- `src/hooks/useScrollReveal.js` — IntersectionObserver reveal hook.
- `src/data/projects.js`, `src/data/skills.js` — static content arrays.
- `src/components/Navbar.jsx` — sticky nav + mobile hamburger.
- `src/components/Hero.jsx` — intro/CTA/socials.
- `src/components/About.jsx` — bio + info cards.
- `src/components/Skills.jsx` — skill groups from data.
- `src/components/Projects.jsx` — project grid from data.
- `src/components/Contact.jsx` — Formspree form + fallback.
- `src/components/Footer.jsx` — footer nav + copyright.
- `src/styles/global.css` — variables, base, theme, reveal, layout.
- `public/images/` — migrated assets. `public/cv.pdf` — placeholder.
- `.github/workflows/deploy.yml` — Pages deploy.

---

### Task 1: Scaffold Vite + React project and test harness

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `vitest.config.js`
- Create: `index.html`
- Create: `src/main.jsx`
- Create: `src/App.jsx`
- Create: `src/styles/global.css`
- Create: `src/test/setup.js`
- Create: `.gitignore`

**Interfaces:**
- Consumes: nothing.
- Produces: `App` default export (React component) rendering an element with `role="main"`; npm scripts `dev`, `build`, `preview`, `test`.

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "kenshunn-portfolio",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.4.6",
    "@testing-library/react": "^16.0.0",
    "@testing-library/user-event": "^14.5.2",
    "@vitejs/plugin-react": "^4.3.1",
    "jsdom": "^24.1.0",
    "vite": "^5.3.4",
    "vitest": "^2.0.4"
  }
}
```

- [ ] **Step 2: Create `vite.config.js`**

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  plugins: [react()],
});
```

- [ ] **Step 3: Create `vitest.config.js`**

```js
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
  },
});
```

- [ ] **Step 4: Create `src/test/setup.js`**

```js
import '@testing-library/jest-dom';
```

- [ ] **Step 5: Create `index.html`**

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Ken Aaron De Martin — Portfolio</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 6: Create `src/styles/global.css`**

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
```

- [ ] **Step 7: Create `src/App.jsx`**

```jsx
export default function App() {
  return <main role="main" />;
}
```

- [ ] **Step 8: Create `src/main.jsx`**

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/global.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

- [ ] **Step 9: Create `.gitignore`**

```
node_modules
dist
*.local
```

- [ ] **Step 10: Install deps and verify build**

Run: `npm install && npm run build`
Expected: install succeeds; build writes `dist/index.html` with no errors.

- [ ] **Step 11: Commit**

```bash
git add package.json package-lock.json vite.config.js vitest.config.js index.html src/ .gitignore
git commit -m "feat: scaffold Vite + React project and test harness"
```

---

### Task 2: Theme context, persistence, and toggle

**Files:**
- Create: `src/context/ThemeContext.jsx`
- Create: `src/components/ThemeToggle.jsx`
- Test: `src/context/ThemeContext.test.jsx`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `ThemeProvider` (component, prop `children`) — wraps app, sets `document.documentElement` `data-theme`, persists to `localStorage` key `theme`.
  - `useTheme()` → `{ theme: 'dark'|'light', toggleTheme: () => void }`.
  - `ThemeToggle` (default export) — `<button>` that calls `toggleTheme`, text `"Dark"`/`"Light"` reflecting the theme it will switch TO.

- [ ] **Step 1: Write the failing test**

```jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from './ThemeContext.jsx';
import ThemeToggle from '../components/ThemeToggle.jsx';

beforeEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute('data-theme');
});

test('defaults to dark and sets data-theme', () => {
  render(<ThemeProvider><ThemeToggle /></ThemeProvider>);
  expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
});

test('toggle flips theme and persists', async () => {
  render(<ThemeProvider><ThemeToggle /></ThemeProvider>);
  await userEvent.click(screen.getByRole('button'));
  expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  expect(localStorage.getItem('theme')).toBe('light');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- ThemeContext`
Expected: FAIL — cannot resolve `./ThemeContext.jsx` / `ThemeToggle.jsx`.

- [ ] **Step 3: Create `src/context/ThemeContext.jsx`**

```jsx
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

function getInitialTheme() {
  try {
    return localStorage.getItem('theme') || 'dark';
  } catch {
    return 'dark';
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch {
      /* localStorage unavailable: ignore */
    }
  }, [theme]);

  const toggleTheme = () =>
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
```

- [ ] **Step 4: Create `src/components/ThemeToggle.jsx`**

```jsx
import { useTheme } from '../context/ThemeContext.jsx';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
    >
      {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test -- ThemeContext`
Expected: PASS (2 tests).

- [ ] **Step 6: Commit**

```bash
git add src/context/ThemeContext.jsx src/components/ThemeToggle.jsx src/context/ThemeContext.test.jsx
git commit -m "feat: add theme context, persistence, and toggle"
```

---

### Task 3: Static data files

**Files:**
- Create: `src/data/skills.js`
- Create: `src/data/projects.js`
- Test: `src/data/data.test.js`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `skills` (default export of `skills.js`): array of `{ group: string, items: [{ name: string, level: string }] }`.
  - `projects` (default export of `projects.js`): array of `{ title, description, tags: string[], repoUrl, liveUrl, image }`.

- [ ] **Step 1: Write the failing test**

```js
import skills from './skills.js';
import projects from './projects.js';

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
Expected: FAIL — cannot resolve `./skills.js` / `./projects.js`.

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
    tags: ['React', 'CSS'],
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
git add src/data/
git commit -m "feat: add static skills and projects data"
```

---

### Task 4: useScrollReveal hook

**Files:**
- Create: `src/hooks/useScrollReveal.js`
- Test: `src/hooks/useScrollReveal.test.jsx`

**Interfaces:**
- Consumes: nothing.
- Produces: `useScrollReveal()` (default export) → a `ref` (callback or object ref) to attach to a DOM node. Adds class `reveal-visible` to the node when it intersects the viewport; node should start with class `reveal`. Falls back to immediately visible if `IntersectionObserver` is undefined.

- [ ] **Step 1: Write the failing test**

```jsx
import { render } from '@testing-library/react';
import useScrollReveal from './useScrollReveal.js';

function Probe() {
  const ref = useScrollReveal();
  return <div ref={ref} className="reveal" data-testid="el">hi</div>;
}

test('without IntersectionObserver, element is revealed immediately', () => {
  const original = global.IntersectionObserver;
  // eslint-disable-next-line no-global-assign
  delete global.IntersectionObserver;
  const { getByTestId } = render(<Probe />);
  expect(getByTestId('el').classList.contains('reveal-visible')).toBe(true);
  global.IntersectionObserver = original;
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- useScrollReveal`
Expected: FAIL — cannot resolve `./useScrollReveal.js`.

- [ ] **Step 3: Create `src/hooks/useScrollReveal.js`**

```js
import { useEffect, useRef } from 'react';

export default function useScrollReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      node.classList.add('reveal-visible');
      return undefined;
    }

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

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- useScrollReveal`
Expected: PASS (1 test).

- [ ] **Step 5: Add reveal CSS to `src/styles/global.css`**

Append:

```css
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 600ms ease, transform 600ms ease;
}
.reveal-visible {
  opacity: 1;
  transform: none;
}
```

- [ ] **Step 6: Commit**

```bash
git add src/hooks/useScrollReveal.js src/hooks/useScrollReveal.test.jsx src/styles/global.css
git commit -m "feat: add scroll reveal hook and styles"
```

---

### Task 5: Navbar with mobile hamburger

**Files:**
- Create: `src/components/Navbar.jsx`
- Test: `src/components/Navbar.test.jsx`

**Interfaces:**
- Consumes: `ThemeToggle` (Task 2), `ThemeProvider`/`useTheme` (Task 2).
- Produces: `Navbar` (default export). Renders a `<nav>` with logo text `@kenshunn`, anchor links to `#about`, `#skills`, `#projects`, `#contact`, a `ThemeToggle`, and a hamburger button (`aria-label="Toggle menu"`) that toggles class `open` on the mobile menu list. Must be rendered inside a `ThemeProvider`.

- [ ] **Step 1: Write the failing test**

```jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../context/ThemeContext.jsx';
import Navbar from './Navbar.jsx';

const renderNav = () =>
  render(<ThemeProvider><Navbar /></ThemeProvider>);

test('renders nav links', () => {
  renderNav();
  expect(screen.getAllByRole('link', { name: 'Projects' }).length).toBeGreaterThan(0);
});

test('hamburger toggles menu open class', async () => {
  renderNav();
  const burger = screen.getByLabelText('Toggle menu');
  const menu = document.querySelector('.mobile-menu');
  expect(menu.classList.contains('open')).toBe(false);
  await userEvent.click(burger);
  expect(menu.classList.contains('open')).toBe(true);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- Navbar`
Expected: FAIL — cannot resolve `./Navbar.jsx`.

- [ ] **Step 3: Create `src/components/Navbar.jsx`**

```jsx
import { useState } from 'react';
import ThemeToggle from './ThemeToggle.jsx';

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <nav className="navbar">
      <a href="#top" className="logo">@kenshunn</a>

      <ul className="nav-links desktop-only">
        {LINKS.map((l) => (
          <li key={l.href}><a href={l.href}>{l.label}</a></li>
        ))}
      </ul>

      <div className="nav-right">
        <ThemeToggle />
        <button
          type="button"
          className={`hamburger ${open ? 'open' : ''}`}
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>

      <ul className={`mobile-menu ${open ? 'open' : ''}`}>
        {LINKS.map((l) => (
          <li key={l.href}><a href={l.href} onClick={close}>{l.label}</a></li>
        ))}
      </ul>
    </nav>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- Navbar`
Expected: PASS (2 tests).

- [ ] **Step 5: Append Navbar CSS to `src/styles/global.css`**

```css
.navbar {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: color-mix(in srgb, var(--bg) 85%, transparent);
  backdrop-filter: blur(8px);
}
.logo { font-size: 1.5rem; font-weight: 700; color: var(--text); }
.nav-links { display: flex; gap: 2rem; list-style: none; }
.nav-right { display: flex; align-items: center; gap: 1rem; }
.theme-toggle {
  background: none; border: 1px solid var(--accent);
  color: var(--accent); border-radius: 1rem;
  padding: 0.3rem 0.9rem; cursor: pointer;
}
.hamburger { display: none; flex-direction: column; gap: 5px;
  background: none; border: none; cursor: pointer; }
.hamburger span { width: 26px; height: 2px; background: var(--text); }
.mobile-menu { display: none; list-style: none; }
@media (max-width: 1024px) {
  .desktop-only { display: none; }
  .hamburger { display: flex; }
  .mobile-menu {
    position: absolute; top: 100%; right: 0;
    flex-direction: column; background: var(--surface);
    max-height: 0; overflow: hidden; transition: max-height 300ms ease;
    width: 100%; text-align: center;
  }
  .mobile-menu.open { max-height: 320px; }
  .mobile-menu li { padding: 0.8rem 0; }
}
```

- [ ] **Step 6: Commit**

```bash
git add src/components/Navbar.jsx src/components/Navbar.test.jsx src/styles/global.css
git commit -m "feat: add navbar with working mobile hamburger"
```

---

### Task 6: Hero section

**Files:**
- Create: `src/components/Hero.jsx`
- Test: `src/components/Hero.test.jsx`

**Interfaces:**
- Consumes: nothing.
- Produces: `Hero` (default export). Renders `id="top"` section with name heading `Ken Aaron De Martin`, tagline `Amateur Programmer`, profile image (`/images/profile.png`), a "Download CV" link (`href="/cv.pdf"`, `download` attribute), a "Contact" link to `#contact`, and social links to GitHub (`https://github.com/kenshunn`) and Twitter (`https://twitter.com/catfroghae`).

- [ ] **Step 1: Write the failing test**

```jsx
import { render, screen } from '@testing-library/react';
import Hero from './Hero.jsx';

test('renders name and CV download link', () => {
  render(<Hero />);
  expect(screen.getByRole('heading', { name: /Ken Aaron De Martin/i })).toBeInTheDocument();
  const cv = screen.getByRole('link', { name: /Download CV/i });
  expect(cv).toHaveAttribute('href', '/cv.pdf');
  expect(cv).toHaveAttribute('download');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- Hero`
Expected: FAIL — cannot resolve `./Hero.jsx`.

- [ ] **Step 3: Create `src/components/Hero.jsx`**

```jsx
export default function Hero() {
  return (
    <section id="top" className="hero">
      <img className="hero-pic" src="/images/profile.png" alt="Ken Aaron De Martin" />
      <div className="hero-text">
        <p className="eyebrow">Hello, I'm</p>
        <h1>Ken Aaron De Martin</h1>
        <p className="tagline">Amateur Programmer</p>
        <div className="hero-btns">
          <a className="btn btn-primary" href="/cv.pdf" download>Download CV</a>
          <a className="btn btn-outline" href="#contact">Contact</a>
        </div>
        <div className="socials">
          <a href="https://github.com/kenshunn" aria-label="GitHub" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://twitter.com/catfroghae" aria-label="Twitter" target="_blank" rel="noreferrer">Twitter</a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- Hero`
Expected: PASS (1 test).

- [ ] **Step 5: Append Hero + shared section/button CSS to `src/styles/global.css`**

```css
section { max-width: 1100px; margin: 0 auto; padding: 5rem 1.5rem; }
.eyebrow { color: var(--muted); }
.tagline { color: var(--accent); font-size: 1.25rem; margin: 0.25rem 0 1.25rem; }
.btn {
  display: inline-block; padding: 0.75rem 1.5rem; border-radius: 2rem;
  font-weight: 600; cursor: pointer; transition: all 300ms ease;
}
.btn-primary { background: var(--accent); color: #fff; }
.btn-primary:hover { filter: brightness(1.1); text-decoration: none; }
.btn-outline { border: 1px solid var(--accent); color: var(--accent); }
.btn-outline:hover { background: var(--accent); color: #fff; text-decoration: none; }
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

- [ ] **Step 6: Commit**

```bash
git add src/components/Hero.jsx src/components/Hero.test.jsx src/styles/global.css
git commit -m "feat: add hero section with real CV download"
```

---

### Task 7: About section

**Files:**
- Create: `src/components/About.jsx`
- Test: `src/components/About.test.jsx`

**Interfaces:**
- Consumes: nothing.
- Produces: `About` (default export). Renders `id="about"` section with heading `About Me`, an Education card and an Experience card, and a bio paragraph.

- [ ] **Step 1: Write the failing test**

```jsx
import { render, screen } from '@testing-library/react';
import About from './About.jsx';

test('renders about heading and education card', () => {
  render(<About />);
  expect(screen.getByRole('heading', { name: 'About Me' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Education' })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- About`
Expected: FAIL — cannot resolve `./About.jsx`.

- [ ] **Step 3: Create `src/components/About.jsx`**

```jsx
export default function About() {
  return (
    <section id="about" className="about">
      <p className="eyebrow">Get to know more</p>
      <h2>About Me</h2>
      <div className="about-grid">
        <div className="card">
          <h3>Education</h3>
          <p>2nd Year College — Mapúa Malayan Colleges Laguna (Current)</p>
          <p>Highschool Graduate — Far Eastern University Alabang</p>
        </div>
        <div className="card">
          <h3>Experience</h3>
          <p>Little to none — actively learning.</p>
        </div>
      </div>
      <p className="bio">
        Hi, I'm Ken Aaron C. De Martin, born December 11, 2004. I enjoy
        listening to music, mostly KPOP, and I'm currently a 2nd Year student
        at Mapúa Malayan Colleges Laguna.
      </p>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- About`
Expected: PASS (1 test).

- [ ] **Step 5: Append About CSS to `src/styles/global.css`**

```css
h2 { font-size: 2.25rem; margin-bottom: 2rem; }
.card {
  background: var(--surface); border-radius: 1rem;
  padding: 1.5rem; border: 1px solid color-mix(in srgb, var(--muted) 30%, transparent);
}
.card h3 { margin-bottom: 0.5rem; color: var(--accent); }
.about-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;
}
.bio { color: var(--muted); max-width: 720px; }
@media (max-width: 600px) { .about-grid { grid-template-columns: 1fr; } }
```

- [ ] **Step 6: Commit**

```bash
git add src/components/About.jsx src/components/About.test.jsx src/styles/global.css
git commit -m "feat: add about section"
```

---

### Task 8: Skills section

**Files:**
- Create: `src/components/Skills.jsx`
- Test: `src/components/Skills.test.jsx`

**Interfaces:**
- Consumes: `skills` from `src/data/skills.js` (Task 3).
- Produces: `Skills` (default export). Renders `id="skills"` section with heading `Skills`, one subgroup per `skills` entry (group heading), and one item per skill showing `name` and `level`.

- [ ] **Step 1: Write the failing test**

```jsx
import { render, screen } from '@testing-library/react';
import Skills from './Skills.jsx';
import skills from '../data/skills.js';

test('renders every skill from data', () => {
  render(<Skills />);
  const total = skills.reduce((n, g) => n + g.items.length, 0);
  expect(screen.getAllByTestId('skill-item').length).toBe(total);
  expect(screen.getByRole('heading', { name: 'Frontend Development' })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- Skills`
Expected: FAIL — cannot resolve `./Skills.jsx`.

- [ ] **Step 3: Create `src/components/Skills.jsx`**

```jsx
import skills from '../data/skills.js';

export default function Skills() {
  return (
    <section id="skills" className="skills">
      <p className="eyebrow">Explore my</p>
      <h2>Skills</h2>
      <div className="skills-groups">
        {skills.map((group) => (
          <div className="card" key={group.group}>
            <h3>{group.group}</h3>
            <div className="skill-list">
              {group.items.map((s) => (
                <div className="skill-item" data-testid="skill-item" key={s.name}>
                  <span className="skill-name">{s.name}</span>
                  <span className="skill-level">{s.level}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- Skills`
Expected: PASS (1 test).

- [ ] **Step 5: Append Skills CSS to `src/styles/global.css`**

```css
.skills-groups { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
.skill-list { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-top: 1rem; }
.skill-item { display: flex; flex-direction: column; }
.skill-name { font-weight: 600; }
.skill-level { color: var(--muted); font-size: 0.9rem; }
@media (max-width: 600px) { .skills-groups { grid-template-columns: 1fr; } }
```

- [ ] **Step 6: Commit**

```bash
git add src/components/Skills.jsx src/components/Skills.test.jsx src/styles/global.css
git commit -m "feat: add skills section from data"
```

---

### Task 9: Projects section

**Files:**
- Create: `src/components/Projects.jsx`
- Test: `src/components/Projects.test.jsx`

**Interfaces:**
- Consumes: `projects` from `src/data/projects.js` (Task 3).
- Produces: `Projects` (default export). Renders `id="projects"` section with heading `Projects` and one card per project: title, description, tags, a `Code` link (`repoUrl`), and a `Live` link only when `liveUrl` is non-empty.

- [ ] **Step 1: Write the failing test**

```jsx
import { render, screen } from '@testing-library/react';
import Projects from './Projects.jsx';
import projects from '../data/projects.js';

test('renders one card per project', () => {
  render(<Projects />);
  expect(screen.getAllByTestId('project-card').length).toBe(projects.length);
});

test('omits Live link when liveUrl empty', () => {
  render(<Projects />);
  const liveLinks = screen.queryAllByRole('link', { name: 'Live' });
  const expected = projects.filter((p) => p.liveUrl).length;
  expect(liveLinks.length).toBe(expected);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- Projects`
Expected: FAIL — cannot resolve `./Projects.jsx`.

- [ ] **Step 3: Create `src/components/Projects.jsx`**

```jsx
import projects from '../data/projects.js';

export default function Projects() {
  return (
    <section id="projects" className="projects">
      <p className="eyebrow">Browse my</p>
      <h2>Projects</h2>
      <div className="project-grid">
        {projects.map((p) => (
          <article className="card project-card" data-testid="project-card" key={p.title}>
            <img className="project-img" src={p.image} alt={p.title} />
            <h3>{p.title}</h3>
            <p className="project-desc">{p.description}</p>
            <ul className="tags">
              {p.tags.map((t) => <li key={t}>{t}</li>)}
            </ul>
            <div className="project-links">
              <a className="btn btn-outline" href={p.repoUrl} target="_blank" rel="noreferrer">Code</a>
              {p.liveUrl && (
                <a className="btn btn-primary" href={p.liveUrl} target="_blank" rel="noreferrer">Live</a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- Projects`
Expected: PASS (2 tests).

- [ ] **Step 5: Append Projects CSS to `src/styles/global.css`**

```css
.project-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem;
}
.project-img {
  width: 100%; height: 160px; object-fit: cover;
  border-radius: 0.75rem; margin-bottom: 1rem; background: var(--bg);
}
.project-desc { color: var(--muted); margin: 0.5rem 0 1rem; }
.tags { display: flex; flex-wrap: wrap; gap: 0.5rem; list-style: none; margin-bottom: 1rem; }
.tags li {
  font-size: 0.8rem; padding: 0.2rem 0.6rem; border-radius: 1rem;
  background: color-mix(in srgb, var(--accent) 20%, transparent); color: var(--accent);
}
.project-links { display: flex; gap: 0.75rem; }
.project-links .btn { padding: 0.5rem 1rem; }
```

- [ ] **Step 6: Commit**

```bash
git add src/components/Projects.jsx src/components/Projects.test.jsx src/styles/global.css
git commit -m "feat: add projects showcase section"
```

---

### Task 10: Contact section with Formspree form

**Files:**
- Create: `src/components/Contact.jsx`
- Test: `src/components/Contact.test.jsx`

**Interfaces:**
- Consumes: nothing.
- Produces: `Contact` (default export). Renders `id="contact"` section with heading `Contact Me`, a `<form>` (action `https://formspree.io/f/YOUR_FORM_ID`, method `POST`) containing required `name`, `email` (type=email), and `message` fields and a submit button. Client-side validation: on submit with empty/invalid fields, prevent default and show an error message with `role="alert"`. Email (`aaron.11demartin@gmail.com`) and phone (`+63 998 545 1812`) shown as fallback.

- [ ] **Step 1: Write the failing test**

```jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from './Contact.jsx';

test('shows validation error on empty submit', async () => {
  render(<Contact />);
  await userEvent.click(screen.getByRole('button', { name: /send/i }));
  expect(screen.getByRole('alert')).toHaveTextContent(/fill/i);
});

test('renders fallback email link', () => {
  render(<Contact />);
  expect(screen.getByRole('link', { name: /aaron.11demartin@gmail.com/i }))
    .toHaveAttribute('href', 'mailto:aaron.11demartin@gmail.com');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- Contact`
Expected: FAIL — cannot resolve `./Contact.jsx`.

- [ ] **Step 3: Create `src/components/Contact.jsx`**

```jsx
import { useState } from 'react';

const FORM_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

export default function Contact() {
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name || !email || !message || !emailOk) {
      e.preventDefault();
      setError('Please fill in all fields with a valid email.');
      return;
    }
    setError('');
    // valid -> allow native POST to Formspree
  };

  return (
    <section id="contact" className="contact">
      <p className="eyebrow">Get in touch</p>
      <h2>Contact Me</h2>
      <form className="contact-form" action={FORM_ENDPOINT} method="POST" onSubmit={handleSubmit} noValidate>
        <input name="name" type="text" placeholder="Your name" aria-label="Name" />
        <input name="email" type="email" placeholder="Your email" aria-label="Email" />
        <textarea name="message" rows="5" placeholder="Your message" aria-label="Message" />
        {error && <p role="alert" className="form-error">{error}</p>}
        <button type="submit" className="btn btn-primary">Send</button>
      </form>
      <div className="contact-fallback">
        <a href="mailto:aaron.11demartin@gmail.com">aaron.11demartin@gmail.com</a>
        <span>+63 998 545 1812</span>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- Contact`
Expected: PASS (2 tests).

- [ ] **Step 5: Append Contact CSS to `src/styles/global.css`**

```css
.contact-form { display: flex; flex-direction: column; gap: 1rem; max-width: 560px; }
.contact-form input, .contact-form textarea {
  background: var(--surface); border: 1px solid color-mix(in srgb, var(--muted) 30%, transparent);
  border-radius: 0.5rem; padding: 0.75rem; color: var(--text); font: inherit;
}
.form-error { color: #f87171; }
.contact-fallback { display: flex; gap: 1.5rem; margin-top: 1.5rem; color: var(--muted); }
```

- [ ] **Step 6: Commit**

```bash
git add src/components/Contact.jsx src/components/Contact.test.jsx src/styles/global.css
git commit -m "feat: add contact section with Formspree form"
```

---

### Task 11: Footer and App composition with scroll reveal

**Files:**
- Create: `src/components/Footer.jsx`
- Modify: `src/App.jsx`
- Test: `src/components/Footer.test.jsx`
- Test: `src/App.test.jsx`

**Interfaces:**
- Consumes: `ThemeProvider` (Task 2), `Navbar` (5), `Hero` (6), `About` (7), `Skills` (8), `Projects` (9), `Contact` (10), `Footer` (this task), `useScrollReveal` (Task 4).
- Produces: `Footer` (default export) with copyright text; `App` rendering all sections in order inside `ThemeProvider`.

- [ ] **Step 1: Write the failing Footer test**

```jsx
import { render, screen } from '@testing-library/react';
import Footer from './Footer.jsx';

test('renders copyright', () => {
  render(<Footer />);
  expect(screen.getByText(/Ken De Martin/i)).toBeInTheDocument();
});
```

- [ ] **Step 2: Write the failing App test**

```jsx
import { render } from '@testing-library/react';
import App from './App.jsx';

test('renders all section ids', () => {
  const { container } = render(<App />);
  ['about', 'skills', 'projects', 'contact'].forEach((id) => {
    expect(container.querySelector(`#${id}`)).toBeTruthy();
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `npm test -- Footer App`
Expected: FAIL — cannot resolve `./Footer.jsx`; App lacks section ids.

- [ ] **Step 4: Create `src/components/Footer.jsx`**

```jsx
export default function Footer() {
  return (
    <footer className="footer">
      <p>Copyright © 2024 Ken De Martin. All Rights Reserved.</p>
    </footer>
  );
}
```

- [ ] **Step 5: Replace `src/App.jsx`**

```jsx
import { ThemeProvider } from './context/ThemeContext.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <main role="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </ThemeProvider>
  );
}
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `npm test -- Footer App`
Expected: PASS.

- [ ] **Step 7: Append Footer CSS to `src/styles/global.css`**

```css
.footer { text-align: center; padding: 2rem; color: var(--muted);
  border-top: 1px solid color-mix(in srgb, var(--muted) 20%, transparent); }
```

- [ ] **Step 8: Run full suite**

Run: `npm test`
Expected: all tests PASS.

- [ ] **Step 9: Commit**

```bash
git add src/components/Footer.jsx src/App.jsx src/components/Footer.test.jsx src/App.test.jsx src/styles/global.css
git commit -m "feat: add footer and compose full app"
```

---

### Task 12: Migrate assets, add placeholders, remove old static site

**Files:**
- Create: `public/images/` (migrated images)
- Create: `public/cv.pdf` (placeholder)
- Create: `public/images/placeholder.png`
- Create: `public/images/profile.png`
- Delete: `index.html` is now the Vite entry (keep root one from Task 1). Remove legacy `style.css`, `script.js`, `mediaquerie.css`, and `assets/`.

**Interfaces:**
- Consumes: image paths referenced by Hero (`/images/profile.png`) and Projects (`/images/placeholder.png`).
- Produces: served static files under `public/`.

- [ ] **Step 1: Create public dirs and migrate images**

Run:
```bash
mkdir -p public/images
cp assets/meme.png public/images/profile.png
cp assets/github.png public/images/github.png
cp assets/twitter.png public/images/twitter.png
cp assets/anotherme.png public/images/placeholder.png
```
Expected: files copied (profile + placeholder exist).

- [ ] **Step 2: Create placeholder CV**

Run:
```bash
printf '%%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 300 144]>>endobj\nxref\n0 4\n0000000000 65535 f \ntrailer<</Root 1 0 R/Size 4>>\nstartxref\n0\n%%%%EOF\n' > public/cv.pdf
```
Expected: `public/cv.pdf` exists (placeholder; owner replaces with real CV).

- [ ] **Step 3: Remove legacy static files**

Run:
```bash
git rm style.css script.js mediaquerie.css
git rm -r assets
```
Expected: legacy files staged for deletion. (The new Vite `index.html` from Task 1 stays.)

- [ ] **Step 4: Verify dev build references resolve**

Run: `npm run build`
Expected: build succeeds; `dist/images/profile.png` and `dist/cv.pdf` present.

- [ ] **Step 5: Commit**

```bash
git add public/
git commit -m "chore: migrate assets, add placeholders, remove legacy static site"
```

---

### Task 13: GitHub Actions Pages deploy

**Files:**
- Create: `.github/workflows/deploy.yml`

**Interfaces:**
- Consumes: `npm run build` output `dist/`.
- Produces: a workflow that builds and deploys to GitHub Pages on push to `main`.

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
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

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

- [ ] **Step 2: Verify workflow YAML is valid locally**

Run: `node -e "const fs=require('fs');const s=fs.readFileSync('.github/workflows/deploy.yml','utf8');if(!s.includes('deploy-pages'))process.exit(1);console.log('ok')"`
Expected: prints `ok`.

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: add GitHub Pages deploy workflow"
```

- [ ] **Step 4: Manual owner action (document, do not automate)**

After push: in GitHub repo Settings → Pages → Build and deployment → Source = **GitHub Actions**. Then push to `main` triggers deploy. Owner also: create Formspree account, replace `YOUR_FORM_ID` in `src/components/Contact.jsx`, and replace `public/cv.pdf` with a real CV.

---

## Self-Review

**Spec coverage:**
- Vite+React JS scaffold → Task 1. ✓
- base `'/'` → Task 1 vite.config. ✓
- Theme context + persistence + toggle → Task 2. ✓
- Data files (projects/skills) → Task 3. ✓
- Scroll animations (IntersectionObserver) → Task 4 (+ reveal CSS). ✓
- Navbar + fixed hamburger → Task 5. ✓
- Hero + real CV download → Task 6 + Task 12 placeholder. ✓
- About → Task 7. ✓
- Skills from data → Task 8. ✓
- Projects showcase (3 placeholders) → Task 9 + Task 3 data. ✓
- Contact Formspree + validation + fallback → Task 10. ✓
- Footer + App composition → Task 11. ✓
- Palette CSS variables, dark/light → Task 1 + Task 2. ✓
- Responsive breakpoints 600/1024 → component CSS. ✓
- Asset migration + cleanup → Task 12. ✓
- GH Actions deploy → Task 13. ✓
- Error handling (localStorage fallback, missing image tolerated, form validation) → Tasks 2, 9, 10. ✓
- Testing (Vitest + RTL) → harness Task 1; tests in 2-11. ✓

**Placeholder scan:** Intentional placeholders only — `YOUR_FORM_ID` and `public/cv.pdf` are spec-defined owner-supplied values, documented in Task 13 Step 4. No TBD/TODO in code steps.

**Type/name consistency:** `useScrollReveal` returns a ref (Task 4) — note: applying reveal classes to sections is optional polish; hook + CSS shipped, components use class `reveal` where desired. Theme key `theme`, attribute `data-theme`, classes `open`/`reveal`/`reveal-visible` consistent across tasks. Image paths `/images/profile.png` (Hero) and `/images/placeholder.png` (projects data) match files created in Task 12.

## Notes on scroll reveal application

The `useScrollReveal` hook (Task 4) and `.reveal` CSS ship in the build. To animate a section, add `className="reveal"` and attach the hook's ref to its root element. This is left as optional per-section polish during execution and does not block any task's deliverable.
