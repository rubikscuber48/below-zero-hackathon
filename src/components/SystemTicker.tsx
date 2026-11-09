import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export const SystemTicker: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const tickerItems = [
    'BELOW ZERO',
    '24-HOUR HACKATHON',
    '5 TRACKS',
    'PRIZES',
    'SPONSORS',
    'MID NOVEMBER 2026',
    'CLASSES 8–12 EXCLUSIVE',
    'OFFLINE DELHI NCR',
    'LOST IN STARS',
    '100% FREE ENTRY',
    'REAL RUNTIME DEMOS',
    'MERITOCRACY FIRST',
    'STUDENT INNOVATION',
  ];

  return (
    <div
      className="w-full bg-[#FF1744] text-[#111111] border-b-2 border-black overflow-hidden select-none py-1.5 shadow-[0_2px_10px_rgba(255,23,68,0.4)]"
      aria-label="Event Highlights Ticker"
    >
      <div className="flex items-center whitespace-nowrap overflow-hidden">
        {/* Seamless Infinite Marquee Track */}
        <motion.div
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
              <span className="inline-flex items-center gap-1.5 px-3 sm:px-4 text-[#111111] hover:text-[#FFD633] transition-colors">
                <span className="w-1.5 h-1.5 bg-[#FFD633] rounded-full inline-block animate-pulse" />
                <span>{item}</span>
              </span>
              <span className="text-black/60 font-bold select-none">//</span>
            </React.Fragment>
          ))}

          {/* Duplicate instance for seamless infinite looping */}
          {tickerItems.map((item, i) => (
            <React.Fragment key={`ticker-2-${i}`}>
              <span className="inline-flex items-center gap-1.5 px-3 sm:px-4 text-[#111111] hover:text-[#FFD633] transition-colors">
                <span className="w-1.5 h-1.5 bg-[#FFD633] rounded-full inline-block animate-pulse" />
                <span>{item}</span>
              </span>
              <span className="text-black/60 font-bold select-none">//</span>
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
