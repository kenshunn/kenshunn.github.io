// Per-section entrance: type the eyebrow(s), heading(s) and lead paragraph,
// then pop the section's cards/boxes in one by one. Runs on scroll-in, once per
// section, re-inits after view-transition nav. Click anywhere to skip.
const TYPED = '.eyebrow, h2, .coursework-title, .bio';
const POP = [
  '.edu-card', '.cert-card', '.gc-summary', '.skill-group', '.exp-card',
  '.featured-row', '.project-card', '.course-card', '.timeline-item',
  '.projects-grid-toggle',
].join(',');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let skip = false;

const speedFor = (el) =>
  el.classList.contains('bio') ? 12 : el.tagName === 'H2' ? 42 : 30; // ms/char

function prep(scope) {
  scope.querySelectorAll(TYPED).forEach((h) => {
    if (h.dataset.type === undefined) {
      if (h.classList.contains('bio')) h.style.minHeight = h.offsetHeight + 'px'; // reserve space, no shift
      h.dataset.type = h.textContent.trim();
      h.textContent = '';
    }
  });
  scope.querySelectorAll(POP).forEach((p) => p.classList.add('pop'));
}

function typeEl(el) {
  return new Promise((resolve) => {
    const full = el.dataset.type || '';
    const speed = speedFor(el);
    let i = 0;
    el.classList.add('typing');
    const done = () => { el.classList.remove('typing'); el.textContent = full; resolve(); };
    const tick = () => {
      if (skip || !document.body.contains(el)) { done(); return; }
      el.textContent = full.slice(0, i);
      if (i++ <= full.length) setTimeout(tick, speed);
      else done();
    };
    tick();
  });
}

async function runSection(sec) {
  if (sec.dataset.trDone) return;
  sec.dataset.trDone = '1';
  const heads = [...sec.querySelectorAll(TYPED)];
  const pops = [...sec.querySelectorAll(POP)];
  if (reduce || skip) {
    heads.forEach((h) => { h.textContent = h.dataset.type || h.textContent; h.classList.remove('typing'); });
    pops.forEach((p) => p.classList.add('pop-in'));
    return;
  }
  for (const h of heads) await typeEl(h);       // type each in order
  pops.forEach((p, i) => setTimeout(() => p.classList.add('pop-in'), i * 120)); // then pop 1 by 1
}

// Click anywhere fast-forwards everything to its final state.
function finishAll() {
  skip = true;
  document.querySelectorAll('main [data-type]').forEach((h) => { h.classList.remove('typing'); h.textContent = h.dataset.type; });
  document.querySelectorAll('main .pop').forEach((p) => p.classList.add('pop-in'));
  document.querySelectorAll('main section').forEach((s) => { s.dataset.trDone = '1'; });
}

function init() {
  skip = false;
  const secs = [...document.querySelectorAll('main section')];
  if (!secs.length) return;
  secs.forEach(prep); // hide heads/cards up front so nothing flashes
  if (!('IntersectionObserver' in window)) { secs.forEach(runSection); return; }
  const io = new IntersectionObserver((ents) => {
    ents.forEach((e) => { if (e.isIntersecting) { io.unobserve(e.target); runSection(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  secs.forEach((s) => io.observe(s));
}

document.addEventListener('click', finishAll);
init();
document.addEventListener('astro:page-load', init);
