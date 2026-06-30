function revealAll() {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('reveal-visible'));
}

if (typeof IntersectionObserver === 'undefined') {
  revealAll();
} else {
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
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}
