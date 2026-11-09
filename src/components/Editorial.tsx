import React from 'react';
import { motion } from 'motion/react';
import { easeCinematic } from '../utils/motion';

/** Headline whose lines rise out of a mask one after another. */
export const Lines: React.FC<{ lines: string[]; className?: string; delay?: number }> = ({
  lines,
  className = '',
  delay = 0,
}) => (
  <motion.span
    className={`block ${className}`}
    initial="hidden"
    whileInView="shown"
    viewport={{ once: true, margin: '-40px' }}
    transition={{ staggerChildren: 0.09, delayChildren: delay }}
  >
    {lines.map((line) => (
      <span key={line} className="block overflow-hidden py-[0.06em] -my-[0.06em]">
        <motion.span
          className="block"
          variants={{ hidden: { y: '105%' }, shown: { y: 0 } }}
          transition={{ duration: 0.8, ease: easeCinematic }}
        >
          {line}
        </motion.span>
      </span>
    ))}
  </motion.span>
);

/** Sections count downward from the zero line in the hero. */
export const SectionHead: React.FC<{
  depth: string;
  label: string;
  title: string[];
  intro?: React.ReactNode;
  accent?: string;
  rule?: string;
}> = ({ depth, label, title, intro, accent = 'text-flare', rule = 'border-current/30' }) => (
  <header className={`grid grid-cols-12 gap-x-6 gap-y-8 border-t pt-5 mb-12 lg:mb-20 ${rule}`}>
    <div className="col-span-12 lg:col-span-2 flex items-baseline gap-4 lg:block">
      <div className={`display text-[clamp(3.5rem,6.5vw,6.5rem)] ${accent}`} aria-hidden="true">
        −{depth}
      </div>
      <p className="label lg:mt-3">{label}</p>
    </div>
    <h2 className="display col-span-12 lg:col-span-7 text-[clamp(3.75rem,9.5vw,9rem)]">
      <Lines lines={title} />
    </h2>
    {intro && <div className="col-span-12 lg:col-span-3 lg:self-end body-copy">{intro}</div>}
  </header>
);

/** The four-point star from the Lost in Stars logo. */
export const FourPointStar: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M12 0c1 7 4 10 12 12-8 2-11 5-12 12-1-7-4-10-12-12 8-2 11-5 12-12z" />
  </svg>
);
