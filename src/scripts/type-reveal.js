// Per-section entrance: type the eyebrow(s) + heading(s), then pop the section's
// cards/boxes in one by one. Runs on scroll-in, once per section, and re-inits
// after view-transition navigations.
const HEADS = '.eyebrow, h2, .coursework-title';
const POP = [
  '.edu-card', '.cert-card', '.gc-summary', '.skill-group', '.exp-card',
  '.featured-row', '.project-card', '.course-card', '.timeline-item',
].join(',');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function prep(scope) {
  scope.querySelectorAll(HEADS).forEach((h) => {
    if (h.dataset.type === undefined) { h.dataset.type = h.textContent.trim(); h.textContent = ''; }
  });
  scope.querySelectorAll(POP).forEach((p) => p.classList.add('pop'));
}

function typeEl(el) {
  return new Promise((resolve) => {
    const full = el.dataset.type || '';
    const speed = el.tagName === 'H2' ? 30 : 18; // headings a touch slower than kickers
    let i = 0;
    el.classList.add('typing');
    const tick = () => {
      if (!document.body.contains(el)) { resolve(); return; }
      el.textContent = full.slice(0, i);
      if (i++ <= full.length) setTimeout(tick, speed);
      else { el.classList.remove('typing'); el.textContent = full; resolve(); }
    };
    tick();
  });
}

async function runSection(sec) {
  if (sec.dataset.trDone) return;
  sec.dataset.trDone = '1';
  const heads = [...sec.querySelectorAll(HEADS)];
  const pops = [...sec.querySelectorAll(POP)];
  if (reduce) {
    heads.forEach((h) => { h.textContent = h.dataset.type || h.textContent; });
    pops.forEach((p) => p.classList.add('pop-in'));
    return;
  }
  for (const h of heads) await typeEl(h);      // type each in order
  pops.forEach((p, i) => setTimeout(() => p.classList.add('pop-in'), i * 90)); // then pop 1 by 1
}

function init() {
  const secs = [...document.querySelectorAll('main section')];
  if (!secs.length) return;
  secs.forEach(prep); // hide heads/cards up front so nothing flashes before it animates
  if (!('IntersectionObserver' in window)) { secs.forEach(runSection); return; }
  const io = new IntersectionObserver((ents) => {
    ents.forEach((e) => { if (e.isIntersecting) { io.unobserve(e.target); runSection(e.target); } });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
  secs.forEach((s) => io.observe(s));
}

init();
document.addEventListener('astro:page-load', init);
