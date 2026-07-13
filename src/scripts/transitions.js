// GSAP staggered-block page transition. We intercept internal link clicks,
// play the cover, then call Astro's navigate() ourselves — reliable control of
// the sequence without hooking the view-transition loader:
//
//   click -> cover slides in (direction = nav order) -> label shows once fully
//   covered -> short hold -> navigate() swaps the page (hidden behind cover) ->
//   cover slides out, revealing the new page.
import gsap from 'gsap';
import { navigate } from 'astro:transitions/client';

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

  const DUR = 0.6, STAG = 0.09, HOLD = 0.7; // seconds
  let dir = 1, busy = false;
  const waitMs = (ms) => new Promise((res) => setTimeout(res, ms));

  const coverIn = () => new Promise((resolve) => {
    const r = rows();
    if (!r.length) { resolve(); return; }
    const lb = label();
    if (lb) gsap.set(lb, { autoAlpha: 0, y: 12 }); // keep label hidden while covering
    gsap.killTweensOf(r);
    gsap.set(r, { xPercent: -101 * dir });
    gsap.to(r, { xPercent: 0, duration: DUR, ease: 'power3.inOut', stagger: STAG, onComplete: resolve });
  });

  const showLabel = (toPath) => {
    const lb = label();
    if (!lb) return;
    lb.textContent = LABELS[toPath] || '';
    gsap.fromTo(lb, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.3, ease: 'power2.out' });
  };
  const hideLabel = () => { const lb = label(); if (lb) gsap.to(lb, { autoAlpha: 0, duration: 0.2, ease: 'power1.out' }); };

  const revealOut = () => new Promise((resolve) => {
    const r = rows();
    if (!r.length) { resolve(); return; }
    gsap.killTweensOf(r);
    gsap.to(r, { xPercent: 101 * dir, duration: DUR, ease: 'power3.inOut', stagger: STAG, onComplete: resolve });
  });

  // Phase 1 (on click): cover the screen, show the label, then trigger the swap.
  async function go(pathname) {
    if (busy) return;
    busy = true;
    const toPath = norm(pathname), fromPath = norm(location.pathname);
    dir = (ORDER[toPath] ?? 0) >= (ORDER[fromPath] ?? 0) ? 1 : -1;
    await coverIn();          // blocks slide in to fully cover
    showLabel(toPath);        // label appears only now (fully covered)
    navigate(pathname).catch(() => { location.href = pathname; }); // swap under cover
  }

  // Phase 2 (after the swap lands): hold covered, then uncover + fade the label.
  async function onLoaded() {
    if (!busy) { gsap.set(rows(), { xPercent: -101 }); return; } // direct/first load: park off-screen
    await waitMs(HOLD * 1000); // hold — covered, label visible, new page ready underneath
    hideLabel();              // fade label out...
    await revealOut();        // ...as the cover slides off together
    busy = false;
  }

  if (!reduce) {
    document.addEventListener('click', (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest && e.target.closest('a[href]');
      if (!a) return;
      const url = new URL(a.getAttribute('href'), location.href);
      if (url.origin !== location.origin) return;                 // external
      if (a.target === '_blank' || a.hasAttribute('download')) return;
      if (url.pathname === location.pathname) return;             // same page / hash
      e.preventDefault();
      go(url.pathname + url.search);
    }, true);

    document.addEventListener('astro:page-load', onLoaded);
  }
}
