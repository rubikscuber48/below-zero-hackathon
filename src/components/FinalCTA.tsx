import React, { useRef } from 'react';
import { m, useScroll, useTransform } from 'motion/react';
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

      {/* The planet from the hero, with the logo at its centre */}
      <div
        className="relative overflow-hidden bg-void starfield min-h-[22rem] sm:min-h-[30rem] lg:min-h-[36rem] flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="relative w-[min(72%,17rem)] sm:w-[22rem] lg:w-[min(72%,26rem)] aspect-square">
          <m.div style={{ scale: planetScale }} className="absolute inset-0 rounded-full bg-flare" />
          <svg
            viewBox="0 0 1000 400"
            fill="none"
            className="absolute left-1/2 top-1/2 w-[165%] -translate-x-1/2 -translate-y-1/2 overflow-visible"
          >
            <g transform="rotate(-14 500 200)">
              <ellipse cx="500" cy="200" rx="490" ry="130" stroke="#F7F5EF" strokeWidth="2.5" />
              <circle cx="990" cy="200" r="15" fill="#FFD633" />
            </g>
          </svg>
          <m.img
            style={{ rotate: logoRotate }}
            src={logo}
            alt=""
            loading="lazy"
            width={288}
            height={288}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[58%] rounded-full"
          />
        </div>
      </div>
    </section>
  );
};
