import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Reveal } from '../utils/motion';
import { PHASES } from '../data/event';
import { Lines } from './Editorial';

export const ProcessTimeline: React.FC = () => {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 65%', 'end 65%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });

  return (
    <section id="process" className="section bg-sun text-void">
      <div className="wrap">
        <header className="border-t border-void/40 pt-5 mb-14 lg:mb-20 lg:text-center">
          <div className="flex items-baseline gap-4 lg:justify-center">
            <span className="display text-[clamp(3.5rem,6.5vw,6.5rem)]" aria-hidden="true">
              −05
            </span>
            <p className="label">Event timeline</p>
          </div>
          <h2 className="display text-[clamp(3.75rem,9.5vw,9rem)] mt-5">
            <Lines lines={['Think. Build.', 'Test. Present.']} />
          </h2>
          <p className="body-copy font-medium mt-5 lg:mx-auto">
            Four phases across 24 hours. The hour-by-hour schedule will be published once it is final.
          </p>
        </header>

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
              <li key={p.num} className="relative grid lg:grid-cols-2 lg:items-center pl-10 lg:pl-0 pb-14 last:pb-0 lg:pb-20">
                <span className="absolute left-[0.6rem] lg:left-1/2 top-3 w-5 h-5 -translate-x-1/2 bg-void rotate-45" aria-hidden="true" />
                <Reveal direction={flip ? 'right' : 'left'} className={`lg:px-12 ${flip ? 'lg:order-2' : 'lg:text-right'}`}>
                  <p className="label">Phase {p.num}</p>
                  <h3 className="display text-[clamp(4.75rem,11.5vw,12rem)] mt-2">{p.word}</h3>
                  {p.confirmedWindow && <p className="label mt-2">{p.confirmedWindow}</p>}
                </Reveal>
                <Reveal direction={flip ? 'left' : 'right'} delay={0.08} className={`mt-4 lg:mt-0 lg:px-12 ${flip ? 'lg:order-1 lg:text-right' : ''}`}>
                  <p className="body-copy font-medium lg:inline-block">{p.description}</p>
                  <p className="label mt-5">Key activity</p>
                  <p className="display text-[clamp(1.75rem,2.6vw,2.5rem)] mt-1.5">{p.activity}</p>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};
