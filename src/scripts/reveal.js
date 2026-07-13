function initReveal() {
  const els = document.querySelectorAll('.reveal:not(.reveal-visible)');
  if (typeof IntersectionObserver === 'undefined') {
    els.forEach((el) => el.classList.add('reveal-visible'));
    return;
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
  els.forEach((el) => observer.observe(el));
}

initReveal();
// Re-run after each view-transition navigation (DOM is swapped).
document.addEventListener('astro:page-load', initReveal);
