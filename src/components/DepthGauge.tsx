import React, { useEffect, useRef, useState } from 'react';
import { animate, AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { playSfx } from '../utils/audio';

const STOPS = [
  { id: 'hero', temp: 0, name: 'Top' },
  { id: 'manifesto', temp: -10, name: 'Manifesto' },
  { id: 'tracks', temp: -20, name: 'Tracks' },
  { id: 'process', temp: -30, name: 'Timeline' },
  { id: 'judging', temp: -40, name: 'Judging' },
  { id: 'experience', temp: -50, name: 'Experience' },
  { id: 'prizes', temp: -60, name: 'Prizes' },
  { id: 'sponsors', temp: -70, name: 'Sponsors' },
  { id: 'team', temp: -80, name: 'Team' },
  { id: 'faq', temp: -90, name: 'FAQ' },
  { id: 'register', temp: -273, name: 'Register' },
];

const LIGHT = new Set(['manifesto', 'process', 'judging', 'prizes', 'team', 'register']);

const formatTemp = (t: number) => `${t < 0 ? '−' : ''}${Math.abs(Math.round(t))}°`;

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

/** Thermometer down the page edge: each section is colder than the last. */
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
            {isActive && <span className="text-[11px] font-bold tabular-nums">{formatTemp(s.temp)}</span>}
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

/** The temperature rolls to its new value as you move between sections. */
const Readout: React.FC<{ temp: number }> = ({ temp }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const previous = useRef(temp);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const paint = (v: number) => {
      if (ref.current) ref.current.textContent = formatTemp(v);
    };
    if (reduceMotion) {
      paint(temp);
      previous.current = temp;
      return;
    }
    const controls = animate(previous.current, temp, {
      duration: 0.5,
      ease: 'easeOut',
      onUpdate: (v) => {
        previous.current = v;
        paint(v);
      },
    });
    return () => controls.stop();
  }, [temp, reduceMotion]);

  return (
    <span ref={ref} aria-hidden="true" className="display text-[2.25rem] leading-none text-flare tabular-nums">
      {formatTemp(temp)}
    </span>
  );
};

/** Phone-only registration bar. Stays out of the way on the hero and final sections, which have their own buttons. */
export const MobileRegisterBar: React.FC<{ isRegistered: boolean; onClick: () => void }> = ({
  isRegistered,
  onClick,
}) => {
  const active = useActiveStop();
  const show = active !== 'hero' && active !== 'register';
  const temp = STOPS.find((s) => s.id === active)?.temp ?? 0;

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
          <div className="flex items-center justify-between gap-4 px-5 py-2.5">
            <Readout temp={temp} />
            <button
              type="button"
              onClick={() => {
                playSfx('click');
                onClick();
              }}
              className="display text-[1.375rem] leading-none bg-sun text-void h-12 px-5 flex-1 max-w-[16rem] cursor-pointer"
            >
              {isRegistered ? 'View your pass' : 'Register your interest'}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
