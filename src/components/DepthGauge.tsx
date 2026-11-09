import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { playSfx } from '../utils/audio';

const STOPS = [
  { id: 'hero', depth: '0', name: 'Top' },
  { id: 'manifesto', depth: '−01', name: 'Event brief' },
  { id: 'challenge', depth: '−02', name: 'The challenge' },
  { id: 'tracks', depth: '−03', name: 'Tracks' },
  { id: 'how', depth: '−04', name: 'How it works' },
  { id: 'process', depth: '−05', name: 'Event timeline' },
  { id: 'judging', depth: '−06', name: 'Judging criteria' },
  { id: 'prizes', depth: '−07', name: 'Prizes' },
  { id: 'sponsors', depth: '−08', name: 'Sponsors and partners' },
  { id: 'team', depth: '−09', name: 'Team' },
  { id: 'faq', depth: '−10', name: 'FAQ' },
  { id: 'register', depth: '−11', name: 'Registration' },
];

const LIGHT = new Set(['manifesto', 'challenge', 'how', 'process', 'judging', 'prizes', 'team', 'faq']);

/** The section at the middle of the screen. */
const useActiveStop = () => {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-48% 0px -50% 0px' },
    );
    STOPS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return active;
};

/** Depth marker down the page edge: shows how far below zero you are. */
export const DepthGauge: React.FC = () => {
  const active = useActiveStop();

  return (
    <nav
      aria-label="Page sections"
      className={`hidden xl:flex fixed right-2 top-1/2 -translate-y-1/2 z-40 flex-col items-end transition-colors ${
        LIGHT.has(active) ? 'text-void' : 'text-paper'
      }`}
    >
      {STOPS.map((s) => {
        const isActive = s.id === active;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-label={s.name}
            aria-current={isActive ? 'location' : undefined}
            className="flex items-center justify-end gap-1.5 h-6 w-16 group/tick"
          >
            {isActive && <span className="text-[11px] font-bold tabular-nums">{s.depth}</span>}
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

/** Phone-only registration bar. Stays out of the way on the hero and final sections, which have their own buttons. */
export const MobileRegisterBar: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const active = useActiveStop();
  const show = active !== 'hero' && active !== 'register';

  return (
    <AnimatePresence>
      {show && (
        <motion.div
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
              className="display text-[1.375rem] leading-none bg-sun text-void h-12 px-5 w-full cursor-pointer"
            >
              Register now
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
