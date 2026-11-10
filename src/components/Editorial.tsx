import React from 'react';
import { m } from 'motion/react';
import { easeCinematic } from '../utils/motion';
import { sectionInfo, type SectionId } from '../data/sections';

/** Headline whose lines rise out of a mask one after another. */
export const Lines: React.FC<{ lines: string[]; className?: string; delay?: number }> = ({
  lines,
  className = '',
  delay = 0,
}) => (
  <m.span
    className={`block ${className}`}
    initial="hidden"
    whileInView="shown"
    viewport={{ once: true, margin: '-40px' }}
    transition={{ staggerChildren: 0.09, delayChildren: delay }}
  >
    {lines.map((line) => (
      <span key={line} className="block overflow-hidden py-[0.06em] -my-[0.06em]">
        <m.span
          className="block"
          variants={{ hidden: { y: '105%' }, shown: { y: 0 } }}
          transition={{ duration: 0.8, ease: easeCinematic }}
        >
          {line}
        </m.span>
      </span>
    ))}
  </m.span>
);

interface SectionHeadProps {
  id: SectionId;
  title: string[];
  intro?: React.ReactNode;
  accent?: string;
  rule?: string;
  /** "split" runs number, title, and intro across columns. "stacked" gives the title the full width. */
  layout?: 'split' | 'stacked';
}

/** Section number, name, and title. Numbers and names come from data/sections.ts. */
export const SectionHead: React.FC<SectionHeadProps> = ({
  id,
  title,
  intro,
  accent = 'text-flare',
  rule = 'border-current/30',
  layout = 'split',
}) => {
  const { number, name } = sectionInfo(id);
  const mark = (
    <div className={`display text-d4 ${accent}`} aria-hidden="true">
      {number}
    </div>
  );

  if (layout === 'stacked') {
    return (
      <header className={`border-t pt-5 mb-12 lg:mb-20 ${rule}`}>
        <div className="grid grid-cols-12 gap-x-6 gap-y-5 items-end">
          <div className="col-span-12 lg:col-span-8 flex items-baseline gap-4">
            {mark}
            <p className="label">{name}</p>
          </div>
          {intro && <div className="col-span-12 lg:col-span-4 body-copy">{intro}</div>}
        </div>
        <h2 className="display text-d6 mt-8 lg:mt-10">
          <Lines lines={title} />
        </h2>
      </header>
    );
  }

  return (
    <header className={`grid grid-cols-12 gap-x-6 gap-y-8 border-t pt-5 mb-12 lg:mb-20 ${rule}`}>
      <div className="col-span-12 lg:col-span-2 flex items-baseline gap-4 lg:block">
        {mark}
        <p className="label lg:mt-3">{name}</p>
      </div>
      <h2 className="display col-span-12 lg:col-span-7 text-d5">
        <Lines lines={title} />
      </h2>
      {intro && <div className="col-span-12 lg:col-span-3 lg:self-end body-copy">{intro}</div>}
    </header>
  );
};

/** The four-point star from the Lost in Stars logo. */
export const FourPointStar: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M12 0c1 7 4 10 12 12-8 2-11 5-12 12-1-7-4-10-12-12 8-2 11-5 12-12z" />
  </svg>
);

/** Compact heading for sections that keep their title beside the content. */
export const SideHead: React.FC<{
  id: SectionId;
  title: string[];
  intro?: React.ReactNode;
}> = ({ id, title, intro }) => {
  const { number, name } = sectionInfo(id);
  return (
    <header className="lg:sticky lg:top-24">
      <div className="flex items-baseline gap-4 border-t border-current/30 pt-5">
        <span className="display text-d3 text-flare" aria-hidden="true">
          {number}
        </span>
        <p className="label">{name}</p>
      </div>
      <h2 className="display text-d4 mt-6">
        <Lines lines={title} />
      </h2>
      {intro && <div className="body-copy mt-5">{intro}</div>}
    </header>
  );
};
