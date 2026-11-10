import React, { useRef } from 'react';
import { m, useScroll, useTransform } from 'motion/react';
import { Reveal } from '../utils/motion';
import { Lines } from './Editorial';
import { sectionInfo } from '../data/sections';
import poster from '../assets/lost_in_stars_poster.webp';
import posterSmall from '../assets/lost_in_stars_poster-480.webp';

const HIGHLIGHTS = [
  { value: '24', label: 'Hours, in person' },
  { value: '5', label: 'Tracks to choose from' },
  { value: '8–12', label: 'School classes eligible' },
  { value: '₹0', label: 'Entry fee' },
];

export const Manifesto: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%']);

  return (
    <section id="manifesto" className="section bg-paper text-void">
      <div className="wrap grid grid-cols-12 gap-x-6 gap-y-12">
        <div className="col-span-12 lg:col-span-7">
          <div className="flex items-baseline gap-4 border-t border-void/30 pt-5">
            <span className="display text-d4 text-flare" aria-hidden="true">
              {sectionInfo('manifesto').number}
            </span>
            <p className="label">{sectionInfo('manifesto').name}</p>
          </div>

          <h2 className="display text-d6 mt-8">
            <Lines lines={["Don't just", 'prompt the', 'future.', 'Build it.']} />
          </h2>

          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5 mt-12">
            <p className="body-copy">
              Most tech events treat school students as spectators, asking them to wait until university before
              building anything consequential. We reject that premise.
            </p>
            <p className="body-copy">
              BELOW ZERO is a pure 24-hour engineering sprint. No pitch decks and no buzzwords, only passionate
              builders, senior mentors, and live code judged on merit.
            </p>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5 lg:self-center">
          {/* Keeps the poster's own shape, so the lettering is never cut off */}
          <div ref={ref} className="overflow-hidden bg-void aspect-[742/1024] max-w-xl mx-auto lg:max-w-none">
            <m.img
              style={{ y: imageY, filter: 'url(#void-duotone)' }}
              src={poster}
              srcSet={`${posterSmall} 480w, ${poster} 742w`}
              sizes="(min-width: 1024px) 40vw, 100vw"
              decoding="async"
              alt="Lost in Stars graffiti lettering on a field of stars"
              loading="lazy"
              width={742}
              height={1024}
              className="w-full h-full object-cover scale-[1.1]"
            />
          </div>
          {/* Maps the poster's night sky into the BELOW ZERO black, leaving its red and white alone */}
          <svg width="0" height="0" className="absolute" aria-hidden="true">
            <filter id="void-duotone" colorInterpolationFilters="sRGB">
              <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 1 0 0 0  0 0 0 1 0" />
            </filter>
          </svg>
        </div>

        <dl className="col-span-12 grid grid-cols-2 lg:grid-cols-4 border-t border-void/30">
          {HIGHLIGHTS.map((h, i) => (
            <Reveal key={h.label} delay={i * 0.07} className="flex flex-col-reverse justify-end pt-5 pb-2 lg:border-r last:border-r-0 border-void/30 lg:pl-5 first:pl-0">
              <dt className="label mt-2">{h.label}</dt>
              <dd className="display text-d5">{h.value}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
};
