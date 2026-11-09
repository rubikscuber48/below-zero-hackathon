import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { CharacterReveal } from '../utils/motion';
import { playSfx } from '../utils/audio';
import { EVENT } from '../data/event';
import { CountdownTimer } from './CountdownTimer';
import { FourPointStar } from './Editorial';
import lostInStarsLogo from '../assets/lost_in_stars_logo.webp';

interface HeroProps {
  onRegisterClick: () => void;
  onExploreClick: () => void;
}

const FACTS = [
  { label: 'Duration', value: '24 hours', note: 'Non-stop' },
  { label: 'Date', value: EVENT.dateLabel, note: 'Final date to be confirmed' },
  { label: 'Location', value: 'Delhi NCR', note: 'Venue shared with accepted teams' },
  { label: 'Event type', value: 'In-person', note: 'Student hackathon, Classes 8–12' },
];

export const Hero: React.FC<HeroProps> = ({ onRegisterClick, onExploreClick }) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const orbitY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const orbitRotate = useTransform(scrollYProgress, [0, 1], [-14, 4]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative overflow-hidden bg-void text-paper min-h-[calc(100svh-4rem)] flex flex-col"
    >
      <div className="absolute inset-0 starfield opacity-70" aria-hidden="true" />

      <div className="relative flex-1 flex flex-col overflow-hidden">
        {/* The ring from the Lost in Stars logo, drifting behind the wordmark and cut off at the zero line */}
        <motion.svg
          aria-hidden="true"
          style={{ y: orbitY, rotate: orbitRotate }}
          viewBox="0 0 1000 400"
          className="absolute left-[-12%] top-[4%] w-[124%] text-flare"
          fill="none"
        >
          <ellipse cx="500" cy="200" rx="490" ry="130" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="862" cy="112" r="16" fill="#FFD633" />
        </motion.svg>
        <FourPointStar className="hidden sm:block absolute left-[46%] top-[8%] w-4 text-paper" />
        <FourPointStar className="hidden sm:block absolute left-[30%] top-[6%] w-6 text-sun" />

      <div className="wrap relative flex-1 flex flex-col pt-6">
        <p className="label flex items-center gap-3">
          <img src={lostInStarsLogo} alt="" width={36} height={36} className="w-9 h-9 rounded-full" />
          Lost in Stars presents
        </p>

        <h1
          aria-label="Below Zero"
          className="display flex-1 flex flex-col sm:flex-row sm:gap-[0.16em] justify-end text-[35.5vw] sm:text-[20.6vw] 2xl:text-[min(20.6vw,20rem)] leading-[0.8] pt-10 sm:pt-16 whitespace-nowrap"
        >
          <CharacterReveal text="BELOW" delay={0.05} stagger={0.035} />
          <CharacterReveal text="ZERO" delay={0.24} stagger={0.035} className="text-sun" />
        </h1>
      </div>
      </div>

      {/* The zero line. Everything else on the page sits below it. */}
      <div className="relative mt-3" aria-hidden="true">
        <div className="h-1 bg-flare" />
        <div
          className="h-3"
          style={{
            backgroundImage: 'linear-gradient(to right, #FF1744 2px, transparent 2px)',
            backgroundSize: '4.5vw 100%',
          }}
        />
      </div>

      <div className="wrap relative grid grid-cols-12 gap-x-6 gap-y-6 py-7">
        <p className="display col-span-12 lg:col-span-6 text-[clamp(2.75rem,6vw,6rem)]">
          Lost ideas,
          <br />
          found innovation.
        </p>
        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <p className="body-copy">
            A 24-hour offline hackathon for school students. Free to enter. Bring your ideas and build working
            software across five tracks.
          </p>
          <div className="mt-5 flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              className="btn btn-solid-sun"
              onClick={() => {
                playSfx('click');
                onRegisterClick();
              }}
            >
              Register your interest
            </button>
            <button
              type="button"
              className="btn btn-line btn-line-sun text-paper"
              onClick={() => {
                playSfx('click');
                onExploreClick();
              }}
            >
              <span>Explore tracks</span>
            </button>
          </div>
        </div>
      </div>

      {EVENT.confirmedStart && (
        <div className="wrap relative pb-6">
          <CountdownTimer onRsvpClick={onRegisterClick} />
        </div>
      )}

      <div className="relative border-t border-paper/30">
      <dl className="wrap grid grid-cols-2 lg:grid-cols-4">
        {FACTS.map((f, i) => (
          <div
            key={f.label}
            className={`py-4 pr-3 ${i % 2 ? 'pl-3 lg:pl-5' : ''} ${i === 2 ? 'lg:pl-5' : ''} ${i < 2 ? 'border-b border-paper/30 lg:border-b-0' : ''} ${
              i < 3 ? 'lg:border-r border-paper/30' : ''
            } ${i % 2 === 0 ? 'border-r lg:border-r border-paper/30' : ''}`}
          >
            <dt className="label text-sun">{f.label}</dt>
            <dd className="display text-[clamp(1.5rem,3.3vw,3.5rem)] mt-1.5 whitespace-nowrap">{f.value}</dd>
            <dd className="text-[0.9375rem] leading-snug mt-1.5 text-paper/80">{f.note}</dd>
          </div>
        ))}
      </dl>
      </div>
    </section>
  );
};
