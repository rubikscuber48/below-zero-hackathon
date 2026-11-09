import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Reveal } from '../utils/motion';
import { Lines } from './Editorial';
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
  const imageY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <section id="manifesto" className="section bg-paper text-void">
      <div className="wrap grid grid-cols-12 gap-x-6 gap-y-12">
        <div className="col-span-12 lg:col-span-7">
          <div className="flex items-baseline gap-4 border-t border-void/30 pt-5">
            <span className="display text-[clamp(3.5rem,6.5vw,6.5rem)] text-flare" aria-hidden="true">
              −01
            </span>
            <p className="label">Manifesto</p>
          </div>

          <h2 className="display text-[clamp(4rem,10.5vw,11rem)] mt-8">
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

        <div className="col-span-12 lg:col-span-5">
          <div ref={ref} className="overflow-hidden bg-void aspect-[4/5] lg:aspect-auto lg:h-full">
            <motion.img
              style={{ y: imageY, filter: 'url(#void-duotone)' }}
              src={poster}
              srcSet={`${posterSmall} 480w, ${poster} 742w`}
              sizes="(min-width: 1024px) 40vw, 100vw"
              decoding="async"
              alt="Lost in Stars graffiti lettering on a field of stars"
              loading="lazy"
              className="w-full h-[110%] -mt-[5%] object-cover"
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
            <Reveal key={h.label} delay={i * 0.07} className="pt-5 pb-2 lg:border-r last:border-r-0 border-void/30 lg:pl-5 first:pl-0">
              <dd className="display text-[clamp(4.5rem,9vw,9rem)]">{h.value}</dd>
              <dt className="label mt-2">{h.label}</dt>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
};
