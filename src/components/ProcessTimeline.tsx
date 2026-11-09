import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Reveal } from '../utils/motion';
import { PHASES } from '../data/event';
import { SectionHead } from './Editorial';

export const ProcessTimeline: React.FC = () => {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 65%', 'end 65%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });

  return (
    <section id="process" className="section bg-sun text-void">
      <div className="wrap">
        <SectionHead
          depth="30"
          label="Timeline"
          accent="text-void"
          title={['From first', 'thought to', 'live demo.']}
          intro={<p>Four phases across 24 hours. The hour-by-hour schedule will be published once it is final.</p>}
        />

        <ol ref={ref} className="relative">
          <div className="absolute top-0 bottom-0 left-[0.6rem] lg:left-1/2 w-[3px] -translate-x-1/2 bg-void/20" aria-hidden="true" />
          <motion.div
            style={{ scaleY }}
            className="absolute top-0 bottom-0 left-[0.6rem] lg:left-1/2 w-[3px] -translate-x-1/2 bg-flare origin-top"
            aria-hidden="true"
          />

          {PHASES.map((p, i) => {
            const flip = i % 2 === 1;
            return (
              <li key={p.num} className="relative grid lg:grid-cols-2 pl-10 lg:pl-0 pb-16 last:pb-0 lg:pb-24">
                <span
                  className="absolute left-[0.6rem] lg:left-1/2 top-3 w-5 h-5 -translate-x-1/2 bg-void rotate-45"
                  aria-hidden="true"
                />
                <Reveal
                  direction={flip ? 'right' : 'left'}
                  className={`lg:px-12 ${flip ? 'lg:order-2' : 'lg:text-right'}`}
                >
                  <p className="display text-[clamp(3rem,5vw,5rem)]" aria-hidden="true">
                    {p.num}
                  </p>
                  <h3 className="display text-[clamp(5rem,12.2vw,13rem)]">{p.word}</h3>
                  <p className="label mt-3">{p.tagline}</p>
                  {p.confirmedWindow && <p className="label mt-1">{p.confirmedWindow}</p>}
                </Reveal>
                <Reveal
                  direction={flip ? 'left' : 'right'}
                  delay={0.08}
                  className={`mt-6 lg:mt-0 lg:px-12 lg:pt-4 ${flip ? 'lg:order-1' : ''}`}
                >
                  <p className="body-copy font-medium">{p.description}</p>
                  <div className="mt-6 border-t-2 border-void pt-3 max-w-[62ch]">
                    <p className="label">Key activity</p>
                    <p className="display text-[clamp(1.875rem,3vw,2.75rem)] leading-[0.95] mt-1.5">{p.activity}</p>
                  </div>
                  <div className="mt-5 max-w-[62ch]">
                    <p className="label">You finish with</p>
                    <ul className="mt-1.5 font-medium text-[1.0625rem] leading-relaxed">
                      {p.deliverables.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};
