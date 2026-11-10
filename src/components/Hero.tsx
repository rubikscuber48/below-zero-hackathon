import React, { useEffect, useRef } from 'react';
import { m, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { CharacterReveal } from '../utils/motion';
import { playSfx } from '../utils/audio';
import { EVENT } from '../data/event';
import { calendarUrl, CountdownTimer } from './CountdownTimer';
import { FourPointStar } from './Editorial';
import { useMediaQuery } from '../hooks/useMediaQuery';
import lostInStarsLogo from '../assets/lost_in_stars_logo.webp';

interface HeroProps {
  onRegisterClick: () => void;
  onExploreClick: () => void;
  /** False while the opening animation still covers the page. */
  ready: boolean;
}

const FACTS = [
  { label: 'Event', value: 'Student hackathon', note: 'Classes 8–12' },
  { label: 'Date', value: EVENT.dateLabel, note: `Starts ${EVENT.startTimeLabel}` },
  { label: 'Duration', value: '24 hours', note: 'Non-stop' },
  { label: 'Format', value: 'Offline', note: `In person, ${EVENT.location}` },
];

const titleClass =
  'display flex-1 flex flex-col sm:flex-row sm:items-end sm:gap-[0.16em] justify-end sm:justify-between text-[35.5vw] sm:text-[20.6vw] 2xl:text-[min(20.6vw,20rem)] leading-[0.8] pt-10 sm:pt-16 pb-3 whitespace-nowrap';

const Intro: React.FC<{ hidden?: boolean }> = ({ hidden }) => (
  <p className={`label flex items-center gap-3 ${hidden ? 'invisible' : ''}`}>
    <img src={lostInStarsLogo} alt="" width={36} height={36} className="w-9 h-9 rounded-full" />
    Lost in Stars presents
  </p>
);

export const Hero: React.FC<HeroProps> = ({ onRegisterClick, onExploreClick, ready }) => {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const wide = useMediaQuery('(min-width: 640px)');
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // The planet's height, as a % of the title area. 100 puts its centre exactly on the zero line.
  const rise = useMotionValue(reduceMotion ? 100 : 165);
  useEffect(() => {
    if (!ready || reduceMotion) return;
    const from = rise.get();
    const start = performance.now() + 100;
    let frame = requestAnimationFrame(function tick(now) {
      const t = Math.min(Math.max((now - start) / 1500, 0), 1);
      rise.set(from + (100 - from) * (t === 1 ? 1 : 1 - 2 ** (-10 * t)));
      if (t < 1) frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, [ready, reduceMotion, rise]);

  // Scrolling sinks it below the line.
  const centreY = useTransform([rise, scrollYProgress], ([r, s]: number[]) => r + s * 90);
  const top = useMotionTemplate`${centreY}%`;
  const clip = useMotionTemplate`circle(var(--planet-r) at var(--planet-x) ${centreY}%)`;

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  // Slides without fading, so the browser can draw this text as soon as the page is ready.
  const slideUp = (delay: number) => ({
    initial: { y: 18 },
    animate: { y: ready ? 0 : 18 },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section
      ref={ref}
      id="hero"
      className="relative overflow-hidden bg-void text-paper min-h-[calc(100svh-4rem)] flex flex-col"
    >
      <div className="absolute inset-0 starfield opacity-70" aria-hidden="true" />
      <div className="absolute inset-0 overflow-hidden opacity-45" aria-hidden="true">
        <div className="star-drift starfield" />
      </div>

      <div className="hero-stage @container relative flex-1 flex flex-col overflow-hidden">
        <m.div
          aria-hidden="true"
          style={{ top }}
          className="absolute left-[var(--planet-x)] w-[calc(var(--planet-r)*2)] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full bg-flare"
        />
        <m.svg
          aria-hidden="true"
          style={{ top }}
          viewBox="0 0 1000 400"
          fill="none"
          className="absolute left-[var(--planet-x)] w-[calc(var(--planet-r)*3.5)] -translate-x-1/2 -translate-y-1/2 overflow-visible"
        >
          <g transform="rotate(-14 500 200)">
            <ellipse cx="500" cy="200" rx="490" ry="130" stroke="#F7F5EF" strokeWidth="2.5" />
            {reduceMotion ? (
              <circle cx="990" cy="200" r="15" fill="#FFD633" />
            ) : (
              <circle r="15" fill="#FFD633">
                <animateMotion
                  dur="26s"
                  repeatCount="indefinite"
                  path="M990 200a490 130 0 1 1-980 0a490 130 0 1 1 980 0"
                />
              </circle>
            )}
          </g>
        </m.svg>

        <FourPointStar className="twinkle twinkle-late absolute right-[7%] top-[16%] w-3 text-paper" />

        <div className="wrap relative flex-1 flex flex-col pt-6">
          <div className="flex items-center justify-between gap-4 min-h-9">
            <Intro />
            <FourPointStar className="twinkle hidden lg:block w-6 text-sun shrink-0" />
            <FourPointStar className="twinkle twinkle-late hidden sm:block w-4 text-paper shrink-0" />
            {wide && <CountdownTimer />}
          </div>
          <h1 aria-label="Below Zero" className={titleClass}>
            <React.Fragment key={String(ready)}>
              <CharacterReveal text="BELOW" delay={0.05} stagger={0.035} />
              <CharacterReveal text="ZERO" delay={0.24} stagger={0.035} className="text-sun" />
            </React.Fragment>
          </h1>
        </div>

        {/* The same wordmark in black, visible only where the planet sits behind it */}
        <m.div
          aria-hidden="true"
          style={{ clipPath: clip, WebkitClipPath: clip }}
          className="absolute inset-0 flex flex-col pointer-events-none text-void"
        >
          <div className="wrap relative flex-1 flex flex-col pt-6">
            <Intro hidden />
            <div className={titleClass}>
              <React.Fragment key={String(ready)}>
                <CharacterReveal text="BELOW" delay={0.05} stagger={0.035} />
                <CharacterReveal text="ZERO" delay={0.24} stagger={0.035} />
              </React.Fragment>
            </div>
          </div>
        </m.div>
      </div>

      {/* The zero line. Everything else on the page sits below it. */}
      <m.div
        className="relative origin-left"
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: ready ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="h-1 bg-flare" />
        <div
          className="h-3"
          style={{
            backgroundImage: 'linear-gradient(to right, #FF1744 2px, transparent 2px)',
            backgroundSize: '4.5vw 100%',
          }}
        />
      </m.div>

      <div className="wrap relative grid grid-cols-12 gap-x-6 gap-y-6 py-7">
        <m.p {...slideUp(0.45)} className="display col-span-12 lg:col-span-6 text-[8.6vw] sm:text-[clamp(2.75rem,6vw,4rem)] lg:text-[4.3vw] 2xl:text-[4.25rem]">
          24 hours. Zero limits.
          <br />
          Build what matters.
        </m.p>
        <m.div {...fadeUp(0.55)} className="col-span-12 lg:col-span-6 lg:col-start-7">
          <p className="body-copy">
            A free, in-person hackathon for school students. Choose one of five tracks and build working software.
          </p>
          <div className="mt-5 flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              data-register-cta
              className="btn btn-solid-sun"
              onClick={() => {
                playSfx('click');
                onRegisterClick();
              }}
            >
              Register now
            </button>
            <button
              type="button"
              className="btn btn-line text-paper"
              onClick={() => {
                playSfx('click');
                onExploreClick();
              }}
            >
              <span>Explore tracks</span>
            </button>
          </div>
        </m.div>
      </div>

      {!wide && <CountdownTimer className="wrap relative pb-5" />}

      <m.div {...fadeUp(0.65)} className="relative border-t border-paper/30">
        <dl className="wrap grid grid-cols-2 lg:grid-cols-[1.4fr_1fr_0.8fr_0.8fr]">
          {FACTS.map((f, i) => (
            <div
              key={f.label}
              className={`py-4 pr-3 ${i % 2 ? 'pl-3 lg:pl-5' : ''} ${i === 2 ? 'lg:pl-5' : ''} ${
                i < 2 ? 'border-b border-paper/30 lg:border-b-0' : ''
              } ${i < 3 ? 'lg:border-r border-paper/30' : ''} ${i % 2 === 0 ? 'border-r lg:border-r border-paper/30' : ''}`}
            >
              <dt className="label text-sun">{f.label}</dt>
              <dd className="display text-d1 lg:text-d2 mt-1.5 lg:whitespace-nowrap">{f.value}</dd>
              <dd className="text-body leading-snug mt-1.5 text-paper/80">
                {f.note}
                {f.label === 'Date' && calendarUrl() && (
                  <a
                    href={calendarUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block underline underline-offset-4 hover:text-sun py-2.5 lg:py-1"
                  >
                    Add to calendar
                  </a>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </m.div>
    </section>
  );
};
