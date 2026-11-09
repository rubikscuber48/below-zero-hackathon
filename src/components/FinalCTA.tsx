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
  const logoRotate = useTransform(scrollYProgress, [0, 1], [-22, 0]);

  return (
    <section ref={ref} id="register" className="section bg-sun text-void overflow-hidden">
      <div className="wrap">
        <h2 className="display text-[16vw] md:text-[10.5vw] 2xl:text-[10rem] leading-[0.86]">
          <Lines lines={['Ready', 'to build?']} />
        </h2>

        <div className="grid grid-cols-12 gap-x-6 gap-y-8 mt-12 border-t-4 border-void pt-6">
          <motion.img
            style={{ rotate: logoRotate }}
            src={logo}
            alt="Lost in Stars logo"
            loading="lazy"
            className="col-span-5 sm:col-span-3 lg:col-span-2 rounded-full w-full max-w-44"
          />
          <p className="display col-span-12 sm:col-span-9 lg:col-span-5 text-[clamp(2.5rem,4.2vw,4.5rem)] leading-[0.95]">
            24 hours. <span className="whitespace-nowrap">Classes 8–12.</span> <span className="whitespace-nowrap">{EVENT.dateLabel}</span> in Delhi NCR. Free to enter.
          </p>
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-4 lg:items-end lg:self-end">
            <button
              type="button"
              className="btn btn-solid-void w-full lg:w-auto text-[1.75rem]! min-h-20! px-10!"
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
      </div>
    </section>
  );
};
