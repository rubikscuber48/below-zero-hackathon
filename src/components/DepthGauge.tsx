import React, { useEffect, useState } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { playSfx } from '../utils/audio';
import { SECTIONS, sectionInfo } from '../data/sections';
import { useActiveSection } from '../hooks/useActiveSection';

/** Section marker down the page edge. */
export const DepthGauge: React.FC = () => {
  const active = useActiveSection();

  return (
    <nav
      aria-label="Page sections"
      className={`hidden xl:flex fixed right-2 top-1/2 -translate-y-1/2 z-40 flex-col items-end transition-colors ${
        sectionInfo(active).onLight ? 'text-void' : 'text-paper'
      }`}
    >
      {SECTIONS.map((s) => {
        const isActive = s.id === active;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-label={`${s.number} ${s.name}`}
            aria-current={isActive ? 'location' : undefined}
            className="flex items-center justify-end gap-1.5 h-6 w-16 group/tick"
          >
            {isActive && <span className="text-label font-bold tabular-nums">{s.number}</span>}
            <span
              className={`block h-[2px] bg-current transition-all duration-300 ${
                isActive ? 'w-4' : 'w-2 opacity-60 group-hover/tick:w-4 group-hover/tick:opacity-100'
              }`}
            />
          </a>
        );
      })}
    </nav>
  );
};

/** True when no Register button on the page is in view (the bar's own height doesn't count as in view). */
const useNoRegisterInView = () => {
  const [none, setNone] = useState(false);

  useEffect(() => {
    const inView = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? inView.add(e.target) : inView.delete(e.target)));
        setNone(inView.size === 0);
      },
      { rootMargin: '0px 0px -80px 0px' },
    );
    document.querySelectorAll('[data-register-cta]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return none;
};

/** Phone-only registration bar. Appears whenever the hero and final Register buttons are off screen. */
export const MobileRegisterBar: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const show = useNoRegisterInView();

  return (
    <AnimatePresence>
      {show && (
        <m.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="md:hidden fixed inset-x-0 bottom-0 z-40 bg-void border-t-2 border-flare"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <div className="px-5 py-2.5">
            <button
              type="button"
              onClick={() => {
                playSfx('click');
                onClick();
              }}
              className="display text-ui bg-sun text-void h-12 px-5 w-full cursor-pointer"
            >
              Register now
            </button>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
};
