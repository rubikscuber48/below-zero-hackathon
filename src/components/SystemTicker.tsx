import React from 'react';
import { m, useReducedMotion } from 'motion/react';
import { EVENT } from '../data/event';

export const SystemTicker: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const tickerItems = [
    'BELOW ZERO',
    '24-HOUR HACKATHON',
    '5 TRACKS',
    'PRIZES',
    'SPONSORS',
    EVENT.dateLong,
    'CLASSES 8–12 EXCLUSIVE',
    `OFFLINE ${EVENT.location}`,
    'LOST IN STARS',
    '100% FREE ENTRY',
    'REAL RUNTIME DEMOS',
    'MERITOCRACY FIRST',
    'STUDENT INNOVATION',
  ];

  return (
    <div
      className="w-full bg-flare text-void border-b-2 border-void overflow-hidden select-none py-1.5 shadow-[0_2px_10px_color-mix(in_srgb,var(--color-flare)_40%,transparent)]"
      aria-label="Event Highlights Ticker"
    >
      <div className="flex items-center whitespace-nowrap overflow-hidden">
        {/* Seamless Infinite Marquee Track */}
        <m.div
          animate={shouldReduceMotion ? { x: 0 } : { x: ['0%', '-50%'] }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 25,
                  ease: 'linear',
                }
          }
          className="flex items-center shrink-0 will-change-transform font-mono-tech text-xs font-black tracking-widest uppercase motion-reduce:transform-none motion-reduce:animate-none"
        >
          {/* First loop instance */}
          {tickerItems.map((item, i) => (
            <React.Fragment key={`ticker-1-${i}`}>
              <span className="inline-flex items-center gap-1.5 px-3 sm:px-4 text-void hover:text-sun transition-colors">
                <span className="w-1.5 h-1.5 bg-sun rounded-full inline-block animate-pulse" />
                <span>{item}</span>
              </span>
              <span className="text-black/60 font-bold select-none">//</span>
            </React.Fragment>
          ))}

          {/* Duplicate instance for seamless infinite looping */}
          {tickerItems.map((item, i) => (
            <React.Fragment key={`ticker-2-${i}`}>
              <span className="inline-flex items-center gap-1.5 px-3 sm:px-4 text-void hover:text-sun transition-colors">
                <span className="w-1.5 h-1.5 bg-sun rounded-full inline-block animate-pulse" />
                <span>{item}</span>
              </span>
              <span className="text-black/60 font-bold select-none">//</span>
            </React.Fragment>
          ))}
        </m.div>
      </div>
    </div>
  );
};
