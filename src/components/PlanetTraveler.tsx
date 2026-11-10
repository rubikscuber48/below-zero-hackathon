import React, { useEffect, useRef } from 'react';

const clamp = (v: number, lo = 0, hi = 1) => Math.min(Math.max(v, lo), hi);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

const FLARE = 'rgb(255, 23, 68)';
const VOID = 'rgb(0, 0, 0)';

/**
 * The hero's planet, carried through the page. It sets below the zero line, rides down
 * the page margin as you scroll, and lands as the planet in the final section.
 */
export const PlanetTraveler: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const hero = document.getElementById('hero');
    const stage = document.querySelector('.hero-stage');
    const heroPlanet = document.querySelector('[data-planet="hero"]');
    const finalPlanet = document.querySelector('[data-planet="final"]');
    const wrap = document.querySelector('#hero .wrap');
    if (!el || !hero || !stage || !heroPlanet || !finalPlanet || !wrap) return;

    const blocks = [...document.querySelectorAll<HTMLElement>('main > *, footer')];
    const backgrounds = new WeakMap<HTMLElement, string>();
    let pad = 0;
    let frame = 0;

    const measure = () => {
      pad = parseFloat(getComputedStyle(wrap).paddingLeft);
      request();
    };

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const maxScroll = document.documentElement.scrollHeight - vh;
      const progress = maxScroll > 0 ? clamp(window.scrollY / maxScroll) : 0;

      const dockSize = clamp(pad * 0.4, 12, 26);
      const dockX = wrap.getBoundingClientRect().left + pad / 2;
      const dockY = vh * (0.2 + 0.58 * progress);

      // Leaving the hero: rise out of the zero line, where the hero planet set.
      const heroRect = hero.getBoundingClientRect();
      const leaving = clamp((-heroRect.top / heroRect.height - 0.25) / 0.55);
      const planetRect = heroPlanet.getBoundingClientRect();
      const t = ease(leaving);
      let x = lerp(planetRect.left + planetRect.width / 2, dockX, t);
      let y = lerp(stage.getBoundingClientRect().bottom, dockY, t);
      let size = lerp(dockSize * 0.2, dockSize, t);
      let opacity = clamp(leaving / 0.08);

      // Arriving at the final section: fly to the waiting ring and grow into its planet.
      const target = finalPlanet.getBoundingClientRect();
      const arriving = clamp((vh - target.top) / (vh - (0.55 * vh - target.height / 2)));
      if (arriving > 0) {
        const a = ease(arriving);
        x = lerp(x, target.left + target.width / 2, a);
        y = lerp(y, target.top + target.height / 2, a);
        size = lerp(size, target.width, a ** 3);
        opacity *= 1 - clamp((arriving - 0.88) / 0.12);
      }
      finalPlanet.classList.toggle('awaiting', arriving < 0.88);

      // Stay visible on every background, using only the site's four colours.
      const under = blocks.find((b) => {
        const r = b.getBoundingClientRect();
        return r.top <= y && y < r.bottom;
      });
      let bg = '';
      if (under) {
        bg = backgrounds.get(under) ?? getComputedStyle(under).backgroundColor;
        backgrounds.set(under, bg);
      }
      el.style.setProperty('--traveler-fill', bg === FLARE ? 'var(--color-void)' : 'var(--color-flare)');
      el.style.setProperty('--traveler-ring', bg === VOID ? 'var(--color-paper)' : 'var(--color-void)');
      el.style.opacity = String(opacity);
      el.style.transform = `translate3d(${x - 50}px, ${y - 50}px, 0) scale(${size / 100})`;
    };

    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    measure();
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', measure);
    const resizeObserver = new ResizeObserver(request);
    resizeObserver.observe(document.body);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', measure);
      resizeObserver.disconnect();
      finalPlanet.classList.remove('awaiting');
    };
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="planet-traveler">
      <span className="planet-traveler-disk" />
      <svg viewBox="0 0 1000 400" fill="none" className="planet-traveler-ring">
        <ellipse cx="500" cy="200" rx="490" ry="130" transform="rotate(-14 500 200)" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
};
