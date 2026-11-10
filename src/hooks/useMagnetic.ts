import { useEffect } from 'react';

const REACH = 90;
const MAX_PULL = 8;

/** Elements marked data-magnetic lean a few pixels toward a nearby mouse pointer. */
export const useMagnetic = (enabled: boolean) => {
  useEffect(() => {
    if (!enabled || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const offsets = new WeakMap<HTMLElement, { x: number; y: number }>();
    let frame = 0;
    let px = 0;
    let py = 0;

    const apply = () => {
      frame = 0;
      document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
        const was = offsets.get(el) ?? { x: 0, y: 0 };
        const r = el.getBoundingClientRect();
        if (!r.width) return;
        // Measure from where the element rests, not where it has been pulled to.
        const dx = px - (r.left + r.width / 2 - was.x);
        const dy = py - (r.top + r.height / 2 - was.y);
        const gap = Math.max(Math.abs(dx) - r.width / 2, Math.abs(dy) - r.height / 2, 0);
        const pull = gap < REACH ? 1 - gap / REACH : 0;
        const x = Math.max(-MAX_PULL, Math.min(MAX_PULL, dx * 0.18)) * pull;
        const y = Math.max(-MAX_PULL, Math.min(MAX_PULL, dy * 0.3)) * pull;
        offsets.set(el, { x, y });
        el.style.translate = pull ? `${x.toFixed(1)}px ${y.toFixed(1)}px` : '';
      });
    };

    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
    };
  }, [enabled]);
};
