// GSAP staggered-block page transition, driven through Astro's view-transition
// loader so the DOM swap waits until the cover fully closes.
//
//   click -> cover slides in (direction = nav order) -> label shows once fully
//   covered -> hold a beat -> Astro swaps the page underneath (hidden) -> cover
//   slides out the same direction, revealing the new page.
import gsap from 'gsap';

const LABELS = {
  '/': 'Home',
  '/about': 'About Me',
  '/experience': 'Experience',
  '/skills': 'Skills',
  '/projects': 'Projects',
  '/garden': 'Garden',
  '/contact': 'Contact',
};
// Nav order — moving to a later page sweeps left->right, earlier page right->left.
const ORDER = { '/': 0, '/about': 1, '/experience': 2, '/skills': 3, '/projects': 4, '/garden': 5, '/contact': 6 };
const norm = (p) => (p || '/').replace(/\/$/, '') || '/';

if (!window.__gsapTransitions) {
  window.__gsapTransitions = true;
  const rows = () => gsap.utils.toArray('#page-blocks .pb-row');
  const label = () => document.querySelector('#page-blocks .pb-label');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const DUR = 0.9, STAG = 0.12, HOLD = 2.5; // seconds
  let dir = 1;       // +1 forward (L->R), -1 backward (R->L)
  let covered = false;
  const wait = (ms) => new Promise((res) => setTimeout(res, ms));

  // Slide rows in to cover, then fade the destination label in.
  const coverIn = (toPath) => new Promise((resolve) => {
    const r = rows();
    if (!r.length) { resolve(); return; }
    gsap.killTweensOf(r);
    gsap.set(r, { xPercent: -101 * dir });
    const lb = label();
    if (lb) { lb.textContent = LABELS[toPath] || ''; gsap.set(lb, { autoAlpha: 0, y: 12 }); }
    const tl = gsap.timeline({ onComplete: resolve });
    tl.to(r, { xPercent: 0, duration: DUR, ease: 'power4.inOut', stagger: STAG });
    if (lb) tl.to(lb, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' }); // only after fully covered
  });

  // Slide rows out the same direction, revealing the swapped page.
  const revealOut = () => {
    const r = rows();
    if (!r.length) return;
    const lb = label();
    if (lb) gsap.to(lb, { autoAlpha: 0, duration: 0.3, ease: 'power1.out' });
    gsap.killTweensOf(r);
    gsap.to(r, { xPercent: 101 * dir, duration: DUR, ease: 'power4.inOut', stagger: STAG });
  };

  if (!reduce) {
    document.addEventListener('astro:before-preparation', (event) => {
      const toPath = norm(event.to ? event.to.pathname : location.pathname);
      const fromPath = norm(event.from ? event.from.pathname : location.pathname);
      const ti = ORDER[toPath] ?? 0, fi = ORDER[fromPath] ?? 0;
      dir = ti >= fi ? 1 : -1;

      const original = event.loader;
      if (typeof original === 'function') {
        event.loader = async () => {
          await coverIn(toPath);   // fully cover + show label
          covered = true;
          await wait(HOLD * 1000); // hold while covered
          await original();        // load + swap the page underneath (hidden)
        };
      }
    });

    document.addEventListener('astro:page-load', () => {
      if (covered) { covered = false; revealOut(); }
      else gsap.set(rows(), { xPercent: -101 }); // direct/first load: park off-screen, no sweep
    });
  }
}
