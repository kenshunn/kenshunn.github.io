// GSAP staggered-block page transition, driven through Astro's view-transition
// loader so the DOM swap waits until the cover fully closes.
//
//   click -> cover slides in (direction = nav order) -> label shows once fully
//   covered -> short hold -> Astro swaps the page underneath (hidden) -> cover
//   slides out the same direction, revealing the new page.
//
// While a transition runs the block layer captures pointer events, so rapid
// repeat-clicks can't queue up overlapping navigations (which stranded tweens).
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
  const blocks = () => document.getElementById('page-blocks');
  const rows = () => gsap.utils.toArray('#page-blocks .pb-row');
  const label = () => document.querySelector('#page-blocks .pb-label');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const DUR = 0.7, STAG = 0.1, HOLD = 0.9; // seconds
  let dir = 1;       // +1 forward (L->R), -1 backward (R->L)
  let busy = false, failsafe = 0;
  const gate = (on) => { const b = blocks(); if (b) b.style.pointerEvents = on ? 'auto' : 'none'; };
  const release = () => { busy = false; gate(false); clearTimeout(failsafe); };
  const waitMs = (ms) => new Promise((res) => setTimeout(res, ms));

  const coverIn = (toPath) => new Promise((resolve) => {
    const r = rows();
    if (!r.length) { resolve(); return; }
    gsap.killTweensOf(r);
    gsap.set(r, { xPercent: -101 * dir });
    const lb = label();
    if (lb) { lb.textContent = LABELS[toPath] || ''; gsap.set(lb, { autoAlpha: 0, y: 12 }); }
    const tl = gsap.timeline({ onComplete: resolve });
    tl.to(r, { xPercent: 0, duration: DUR, ease: 'power4.inOut', stagger: STAG });
    if (lb) tl.to(lb, { autoAlpha: 1, y: 0, duration: 0.35, ease: 'power2.out' }); // only after fully covered
  });

  const revealOut = () => {
    const r = rows();
    if (!r.length) { release(); return; }
    const lb = label();
    if (lb) gsap.to(lb, { autoAlpha: 0, duration: 0.25, ease: 'power1.out' });
    gsap.killTweensOf(r);
    gsap.to(r, {
      xPercent: 101 * dir, duration: DUR, ease: 'power4.inOut', stagger: STAG,
      onComplete: release,
    });
  };

  if (!reduce) {
    document.addEventListener('astro:before-preparation', (event) => {
      const toPath = norm(event.to ? event.to.pathname : location.pathname);
      const fromPath = norm(event.from ? event.from.pathname : location.pathname);
      const ti = ORDER[toPath] ?? 0, fi = ORDER[fromPath] ?? 0;
      dir = ti >= fi ? 1 : -1;
      busy = true;
      gate(true); // block further clicks immediately
      clearTimeout(failsafe);
      failsafe = setTimeout(release, 7000); // never leave the click-gate stuck

      const original = event.loader;
      if (typeof original === 'function') {
        event.loader = async () => {
          await coverIn(toPath);   // fully cover + show label
          await waitMs(HOLD * 1000);
          await original();        // load + swap the page underneath (hidden)
        };
      }
    });

    document.addEventListener('astro:page-load', () => {
      if (busy) revealOut();
      else gsap.set(rows(), { xPercent: -101 }); // direct/first load: park off-screen
    });
  }
}
