/** Scrolls to a section, without the animation for people who have turned motion off. */
export const scrollToSection = (selector: string) => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelector(selector)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
};
