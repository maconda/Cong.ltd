const menuButton = document.querySelector('.menu-btn');
const mobileLinks = document.querySelectorAll('.mobile-menu a');
const setMenu = (open) => {
  document.body.classList.toggle('menu-open', open);
  if (menuButton) menuButton.setAttribute('aria-expanded', String(open));
};

menuButton?.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
mobileLinks.forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.getElementById('year').textContent = new Date().getFullYear();

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal');
if (prefersReduced || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('visible'));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
    io.observe(item);
  });
}
