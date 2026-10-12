// scroll reveals for the hand-written sections. adds `.in` once an element scrolls into view.
// the css turns this off under prefers-reduced-motion.
export function observeReveals(onReveal?: (el: Element) => void) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      onReveal?.(e.target);
      io.unobserve(e.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
  return io;
}
