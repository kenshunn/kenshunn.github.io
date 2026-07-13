// GSAP-driven page transitions, wired into Astro's view-transition lifecycle.
// The #page-veil blur cover fades in before the swap; after the new page is
// ready, the veil fades out and the incoming <main> animates up into place.
import gsap from 'gsap';

if (!window.__gsapTransitions) {
  window.__gsapTransitions = true;
  const veil = () => document.getElementById('page-veil');
  const motionOff = () => document.documentElement.getAttribute('data-motion') === 'off';

  document.addEventListener('astro:before-preparation', () => {
    if (motionOff()) return;
    const v = veil();
    if (v) {
      v.classList.add('veil-on'); // CSS drives the backdrop blur
      gsap.to(v, { autoAlpha: 1, duration: 0.26, ease: 'power2.out' });
    }
  });

  document.addEventListener('astro:page-load', () => {
    if (motionOff()) { const v = veil(); if (v) { gsap.set(v, { autoAlpha: 0 }); v.classList.remove('veil-on'); } return; }
    const v = veil();
    if (v) {
      gsap.to(v, {
        autoAlpha: 0,
        duration: 0.34,
        ease: 'power2.inOut',
        onComplete: () => v.classList.remove('veil-on'),
      });
    }
    const main = document.querySelector('body > main');
    if (main) {
      gsap.from(main, {
        autoAlpha: 0,
        y: 26,
        duration: 0.55,
        ease: 'power3.out',
        clearProps: 'opacity,visibility,transform',
      });
    }
  });
}
