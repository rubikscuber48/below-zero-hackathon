import React, { useRef } from 'react';
import { m, useScroll, useTransform } from 'motion/react';
import { TRACKS } from '../data/tracks';
import { FourPointStar } from './Editorial';

const Row: React.FC<{ outlined?: boolean }> = ({ outlined }) => (
  <>
    {[...TRACKS, ...TRACKS].map((track, i) => (
      <React.Fragment key={i}>
        <span className={outlined ? 'marquee-outline' : ''}>{track.title}</span>
        <FourPointStar className="w-[0.3em] shrink-0" />
      </React.Fragment>
    ))}
  </>
);

/** A full-width pause between sections: the five tracks, sliding as the page scrolls. */
export const TrackMarquee: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const left = useTransform(scrollYProgress, [0, 1], ['0%', '-28%']);
  const right = useTransform(scrollYProgress, [0, 1], ['-28%', '0%']);
  const row = 'display flex items-center gap-[0.3em] w-max whitespace-nowrap text-[clamp(3.5rem,12vw,11rem)]';

  return (
    <div ref={ref} aria-hidden="true" className="bg-flare text-void overflow-hidden py-8 lg:py-12">
      <m.div style={{ x: left }} className={row}>
        <Row />
      </m.div>
      <m.div style={{ x: right }} className={`${row} mt-2 lg:mt-3`}>
        <Row outlined />
      </m.div>
    </div>
  );
};
