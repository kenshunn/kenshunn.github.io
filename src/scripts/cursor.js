// Custom cursor — a small dot that tracks the pointer 1:1 and a ring that
// lags behind with easing. Uses mix-blend-mode: difference for the invert
// look (see global.css). Init once; #cursor is transition:persist so it
// survives view-transition navigations.
function initCursor() {
  if (window.__cursorInit) return;
  // Skip on touch / coarse-pointer devices — no hover, no custom cursor.
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const root = document.getElementById('cursor');
  const dot = root && root.querySelector('.cursor-dot');
  const ring = root && root.querySelector('.cursor-ring');
  if (!root || !dot || !ring) return;
  window.__cursorInit = true;
  document.documentElement.classList.add('has-custom-cursor');

  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let rx = mx, ry = my;
  let visible = false;

  window.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch') return;
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px)`;
    if (!visible) { visible = true; root.classList.add('cursor-on'); }
  }, { passive: true });

  window.addEventListener('pointerdown', () => root.classList.add('cursor-press'));
  window.addEventListener('pointerup', () => root.classList.remove('cursor-press'));
  document.addEventListener('pointerleave', () => { visible = false; root.classList.remove('cursor-on'); });

  // Grow the ring over interactive elements.
  const interactive = 'a, button, [role="button"], input, textarea, .skill-tag, .project-open';
  document.addEventListener('pointerover', (e) => {
    if (e.target.closest && e.target.closest(interactive)) root.classList.add('cursor-hover');
  });
  document.addEventListener('pointerout', (e) => {
    if (e.target.closest && e.target.closest(interactive)) root.classList.remove('cursor-hover');
  });

  const loop = () => {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.transform = `translate(${rx}px, ${ry}px)`;
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}

initCursor();
document.addEventListener('astro:page-load', initCursor);
