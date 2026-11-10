import React, { useRef } from 'react';
import { m, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { playSfx } from '../utils/audio';
import { EVENT } from '../data/event';
import { FourPointStar, Lines } from './Editorial';
import { RingHalf } from './Orbit';
import logo from '../assets/lost_in_stars_logo.webp';

interface FinalCTAProps {
  onRegisterClick: () => void;
}

const ORBIT_SECONDS = 9;

export const FinalCTA: React.FC<FinalCTAProps> = ({ onRegisterClick }) => {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const planetScale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const logoRotate = useTransform(scrollYProgress, [0, 1], [-18, 0]);

  return (
    <section ref={ref} id="register" className="grid lg:grid-cols-2">
      <div className="final-copy bg-sun text-void flex flex-col justify-center py-16 lg:py-20">
        <p className="label mb-5">Registration</p>
        <h2 className="display text-d5">
          <Lines lines={['Ready', 'to build?']} />
        </h2>
        <p className="body-copy font-medium mt-6">
          24 hours, in person in {EVENT.location}. For students in Classes 8–12.{' '}
          <span className="whitespace-nowrap">{EVENT.dateLabel}.</span> Free to enter.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-x-8 gap-y-4">
          <button
            type="button"
            data-register-cta
            className="btn btn-solid-void"
            onClick={() => {
              playSfx('click');
              onRegisterClick();
            }}
          >
            Register now
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

      {/* The planet from the hero, with the logo at its centre and a moon on its ring */}
      <div
        className="relative overflow-hidden bg-void starfield min-h-[22rem] sm:min-h-[30rem] lg:min-h-[36rem] flex items-center justify-center"
        aria-hidden="true"
      >
        <FourPointStar className="twinkle absolute left-[12%] top-[16%] w-5 text-sun" />
        <FourPointStar className="twinkle twinkle-late absolute right-[14%] top-[24%] w-3 text-paper" />
        <FourPointStar className="twinkle twinkle-late absolute left-[20%] bottom-[18%] w-3 text-paper" />
        <FourPointStar className="twinkle absolute right-[18%] bottom-[12%] w-4 text-paper" />

        <div className="final-planet relative w-[min(72%,17rem)] sm:w-[22rem] lg:w-[min(72%,26rem)] aspect-square">
          <div className="final-glow absolute inset-0 rounded-full" />
          <RingHalf half="back" animate={!reduceMotion} seconds={ORBIT_SECONDS} width="w-[165%]" />
          <m.div style={{ scale: planetScale }} className="final-disk absolute inset-0 rounded-full bg-flare overflow-hidden">
            <span className="final-shine absolute inset-0 rounded-full" />
          </m.div>
          <m.div
            style={{ rotate: logoRotate }}
            className="absolute left-[21%] top-[21%] w-[58%] aspect-square"
          >
            <div className="final-logo w-full h-full">
              <img src={logo} alt="" loading="lazy" width={288} height={288} className="w-full h-full rounded-full" />
              <span className="final-logo-ring absolute inset-0 rounded-full" />
            </div>
          </m.div>
          <RingHalf half="front" animate={!reduceMotion} seconds={ORBIT_SECONDS} width="w-[165%]" />
        </div>
      </div>
    </section>
  );
};
