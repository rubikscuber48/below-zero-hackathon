import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { playSfx } from '../utils/audio';
import { EVENT } from '../data/event';
import { Lines } from './Editorial';
import logo from '../assets/lost_in_stars_logo.webp';

interface FinalCTAProps {
  onRegisterClick: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onRegisterClick }) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const planetY = useTransform(scrollYProgress, [0, 1], ['35%', '0%']);
  const logoRotate = useTransform(scrollYProgress, [0, 1], [-18, 0]);

  return (
    <section ref={ref} id="register" className="grid lg:grid-cols-12 lg:min-h-[42rem]">
      <div className="lg:col-span-7 bg-sun text-void flex flex-col justify-center py-16 lg:py-24 pl-[clamp(1.25rem,4.5vw,4.5rem)] pr-[clamp(1.25rem,4vw,4rem)]">
        <h2 className="display text-[clamp(4.25rem,9vw,9.5rem)]">
          <Lines lines={['Ready', 'to build?']} />
        </h2>
        <p className="body-copy font-medium mt-6">
          24 hours, in person in Delhi NCR. For students in Classes 8–12.{' '}
          <span className="whitespace-nowrap">{EVENT.dateLabel}.</span> Free to enter.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-x-8 gap-y-4">
          <button
            type="button"
            className="btn btn-solid-void"
            onClick={() => {
              playSfx('click');
              onRegisterClick();
            }}
          >
            Register your interest
          </button>
          <a
            href={`mailto:${EVENT.email}?subject=BELOW%20ZERO%20INQUIRY`}
            onClick={() => playSfx('click')}
            className="label min-h-12 inline-flex items-center underline underline-offset-4"
          >
            Contact the organizers
          </a>
        </div>
      </div>

      {/* The planet from the hero, back above the line */}
      <div className="lg:col-span-5 relative overflow-hidden bg-void starfield min-h-72" aria-hidden="true">
        <motion.div
          style={{ y: planetY }}
          className="absolute left-1/2 -bottom-[38%] lg:-bottom-[22%] w-[min(120%,44rem)] aspect-square -translate-x-1/2 rounded-full bg-flare"
        />
        <motion.img
          style={{ rotate: logoRotate }}
          src={logo}
          alt=""
          loading="lazy"
          width={288}
          height={288}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-44 sm:w-52 lg:w-72 rounded-full"
        />
      </div>
    </section>
  );
};
