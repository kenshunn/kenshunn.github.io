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

if (!window.__gsapTransitions) {
  window.__gsapTransitions = true;
  const rows = () => gsap.utils.toArray('#page-blocks .pb-row');
  const label = () => document.querySelector('#page-blocks .pb-label');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const DUR = 0.85, STAG = 0.12;
  const COVER_MS = DUR * 1000 + STAG * 1000 * 4; // duration + full stagger
  let coverStart = 0;

  const cover = (e) => {
    const r = rows();
    if (!r.length) return;
    coverStart = performance.now();
    const lb = label();
    if (lb) {
      const path = e && e.to ? (e.to.pathname.replace(/\/$/, '') || '/') : location.pathname;
      lb.textContent = LABELS[path] || '';
      gsap.set(lb, { autoAlpha: 0, y: 12 });
      gsap.to(lb, { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power2.out', delay: 0.45 });
    }
    gsap.killTweensOf(r);
    gsap.set(r, { transformOrigin: 'left center' });
    gsap.to(r, { scaleX: 1, duration: DUR, ease: 'power4.inOut', stagger: STAG });
  };

  const runReveal = () => {
    const r = rows();
    if (!r.length) return;
    const lb = label();
    if (lb) gsap.to(lb, { autoAlpha: 0, duration: 0.3, ease: 'power1.out' });
    gsap.killTweensOf(r);
    gsap.set(r, { transformOrigin: 'right center' });
    gsap.to(r, { scaleX: 0, duration: DUR, ease: 'power4.inOut', stagger: STAG, delay: 0.1 });
    const main = document.querySelector('body > main');
    if (main) gsap.from(main, { autoAlpha: 0, y: 24, duration: 0.7, ease: 'power3.out', delay: 0.3, clearProps: 'opacity,visibility,transform' });
  };

  const reveal = () => {
    // wait for the cover sweep to finish before uncovering (hides the swap)
    const wait = coverStart ? Math.max(0, COVER_MS - (performance.now() - coverStart)) : 0;
    coverStart = 0;
    setTimeout(runReveal, wait);
  };

  if (!reduce) {
    document.addEventListener('astro:before-preparation', cover);
    document.addEventListener('astro:page-load', reveal);
  }
}
