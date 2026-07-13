// GSAP staggered-block page transition, driven purely by Astro's native
// view-transition lifecycle (no nav hijacking — links navigate normally):
//
//   before-preparation : start the cover sweep (direction = nav order)
//   before-swap        : snap fully covered + show the destination label,
//                        so the DOM swap underneath is always hidden
//   page-load          : hold covered, fade the label, uncover
import gsap from 'gsap';

const LABELS = {
  '/': 'Home', '/about': 'About Me', '/experience': 'Experience', '/skills': 'Skills',
  '/projects': 'Projects', '/garden': 'Garden', '/contact': 'Contact',
};
// Nav order — a later page sweeps left->right, an earlier page right->left.
const ORDER = { '/': 0, '/about': 1, '/experience': 2, '/skills': 3, '/projects': 4, '/garden': 5, '/contact': 6 };
const norm = (p) => (p || '/').replace(/\/$/, '') || '/';

if (!window.__gsapTransitions) {
  window.__gsapTransitions = true;
  const rows = () => gsap.utils.toArray('#page-blocks .pb-row');
  const label = () => document.querySelector('#page-blocks .pb-label');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const DUR = 0.55, STAG = 0.08, HOLD = 0.7; // seconds
  let dir = 1, busy = false, toPath = '/';
  const waitMs = (ms) => new Promise((res) => setTimeout(res, ms));

  const showLabel = (path) => {
    const lb = label();
    if (!lb) return;
    lb.textContent = LABELS[path] || '';
    gsap.fromTo(lb, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.3, ease: 'power2.out' });
  };
  const hideLabel = () => { const lb = label(); if (lb) gsap.to(lb, { autoAlpha: 0, duration: 0.2, ease: 'power1.out' }); };

  const revealOut = () => new Promise((resolve) => {
    const r = rows();
    if (!r.length) { resolve(); return; }
    gsap.killTweensOf(r);
    gsap.to(r, { xPercent: 101 * dir, duration: DUR, ease: 'power3.inOut', stagger: STAG, onComplete: resolve });
  });

  if (!reduce) {
    document.addEventListener('astro:before-preparation', (e) => {
      const from = norm(e.from ? e.from.pathname : location.pathname);
      toPath = norm(e.to ? e.to.pathname : location.pathname);
      dir = (ORDER[toPath] ?? 0) >= (ORDER[from] ?? 0) ? 1 : -1;
      busy = true;
      const r = rows();
      gsap.killTweensOf(r);
      gsap.set(r, { xPercent: -101 * dir });
      gsap.to(r, { xPercent: 0, duration: DUR, ease: 'power3.inOut', stagger: STAG });
    });

    // Guarantee full cover right before the DOM is swapped, then show the label.
    document.addEventListener('astro:before-swap', () => {
      if (!busy) return;
      gsap.killTweensOf(rows());
      gsap.set(rows(), { xPercent: 0 });
      showLabel(toPath);
    });

    document.addEventListener('astro:page-load', async () => {
      if (!busy) { gsap.set(rows(), { xPercent: -101 }); return; } // direct/first load: park off-screen
      await waitMs(HOLD * 1000); // hold — covered, label visible
      hideLabel();
      await revealOut();
      busy = false;
    });
  }
}
