// GSAP staggered-block page transition, wired into Astro's view-transition
// lifecycle. On navigate the rows sweep in (scaleX 0->1) from the left to cover
// the screen and the destination page name fades in; once the new page is ready
// the rows sweep out (scaleX 1->0) to the right — the reverse direction.
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

  const DUR = 1.15, STAG = 0.16;
  const COVER_MS = DUR * 1000 + STAG * 1000 * 4; // duration + full stagger
  let coverStart = 0;
  let dir = 1; // +1 forward (left->right), -1 backward (right->left)

  // Forward: enter from left (-101 -> 0), exit to right (0 -> 101).
  // Backward: enter from right (101 -> 0), exit to left (0 -> -101).
  const cover = (e) => {
    const r = rows();
    if (!r.length) return;
    coverStart = performance.now();
    const toPath = norm(e && e.to ? e.to.pathname : location.pathname);
    const fromPath = norm(e && e.from ? e.from.pathname : location.pathname);
    const ti = ORDER[toPath] ?? 0, fi = ORDER[fromPath] ?? 0;
    dir = ti >= fi ? 1 : -1;
    const lb = label();
    if (lb) {
      lb.textContent = LABELS[toPath] || '';
      gsap.set(lb, { autoAlpha: 0, y: 12 });
      gsap.to(lb, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.5 });
    }
    gsap.killTweensOf(r);
    gsap.set(r, { xPercent: -101 * dir });
    gsap.to(r, { xPercent: 0, duration: DUR, ease: 'power4.inOut', stagger: STAG });
  };

  const runReveal = (didCover) => {
    const r = rows();
    if (!r.length) return;
    const lb = label();
    if (lb) gsap.to(lb, { autoAlpha: 0, duration: 0.35, ease: 'power1.out' });
    gsap.killTweensOf(r);
    if (didCover) {
      // exit the cover off-screen in the sweep direction
      gsap.to(r, { xPercent: 101 * dir, duration: DUR, ease: 'power4.inOut', stagger: STAG, delay: 0.1 });
    } else {
      // direct / first load: no cover happened — keep rows parked off-screen, no sweep
      gsap.set(r, { xPercent: -101 });
    }
    const main = document.querySelector('body > main');
    if (main) gsap.from(main, { autoAlpha: 0, y: 24, duration: 0.7, ease: 'power3.out', clearProps: 'opacity,visibility,transform' });
  };

  const reveal = () => {
    const didCover = coverStart > 0;
    // wait for the cover sweep to finish before uncovering (hides the swap)
    const wait = didCover ? Math.max(0, COVER_MS - (performance.now() - coverStart)) : 0;
    coverStart = 0;
    setTimeout(() => runReveal(didCover), wait);
  };

  if (!reduce) {
    document.addEventListener('astro:before-preparation', cover);
    document.addEventListener('astro:page-load', reveal);
  }
}
