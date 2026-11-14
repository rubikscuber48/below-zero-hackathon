import React from 'react';
import { Reveal } from '../utils/motion';
import { LEADERSHIP, ORGANIZERS, Person } from '../data/people';
import { FourPointStar, SectionHead } from './Editorial';
import logo from '../assets/lost_in_stars_logo.webp';

const PRINCIPLES = [
  { title: 'Zero entry fee', desc: 'Free for all accepted student hackers' },
  { title: 'Real code, no slides', desc: 'Judged on functional prototypes' },
  { title: 'High-caliber mentorship', desc: 'Active industry engineers and researchers' },
  { title: 'Classes 8–12 dedicated', desc: 'A safe, inspiring offline environment' },
];

const Portrait: React.FC<{ person: Person; size: string }> = ({ person, size }) => (
  <div className="relative aspect-[3/4] bg-void text-paper overflow-hidden starfield">
    {person.photo ? (
      <img src={person.photo} alt={`Portrait of ${person.name}`} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
    ) : (
      <>
        <FourPointStar className="absolute top-4 right-4 w-6 text-sun" />
        <span aria-hidden="true" className={`display absolute left-3 bottom-1 text-flare ${size}`}>
          {person.initials}
        </span>
      </>
    )}
  </div>
);

export const Team: React.FC = () => (
  <section id="team" className="section bg-paper text-void">
    <div className="wrap">
      <SectionHead
        id="team"
        layout="stacked"
        title={['Organized by', 'Lost in Stars.']}
        intro={<p>An independent creative and technology movement that has run two hackathons.</p>}
      />

      <div className="grid grid-cols-12 gap-x-6 gap-y-12">
        <div className="col-span-12 lg:col-span-5">
          <h3 className="label border-t border-void pt-3 mb-4">Leadership</h3>
          {LEADERSHIP.map((p) => (
            <Reveal key={p.name}>
              <Portrait person={p} size="text-[clamp(10rem,24vw,24rem)]" />
              <p className="display text-d4 mt-4">{p.name}</p>
              <p className="label mt-2">{p.role}</p>
              <p className="body-copy mt-3">{p.description}</p>
            </Reveal>
          ))}
        </div>

        <div className="col-span-12 lg:col-span-7">
          <h3 className="label border-t border-void pt-3 mb-4">Organizers</h3>
          <div className="grid grid-cols-2 xl:grid-cols-6 gap-x-5 gap-y-8">
            {ORGANIZERS.map((p, i) => {
              // Five organizers: three across, then the last two as wider side-by-side cards.
              const wide = i >= 3;
              const last = i === ORGANIZERS.length - 1 && ORGANIZERS.length % 2 === 1;
              const span = wide ? 'xl:col-span-3' : 'xl:col-span-2';
              const row = wide || last ? 'flex gap-5' : '';
              return (
                <Reveal
                  key={p.name}
                  delay={i * 0.08}
                  className={`${span} ${last ? 'col-span-2' : ''} ${i === 3 ? 'xl:flex xl:gap-5' : row}`}
                >
                  <div className={last ? 'w-28 sm:w-36 shrink-0' : i === 3 ? 'xl:w-36 xl:shrink-0' : wide ? 'xl:w-36 xl:shrink-0' : ''}>
                    <Portrait person={p} size="text-[clamp(5.5rem,7vw,7.5rem)]" />
                  </div>
                  <div className={last ? 'min-w-0 flex-1' : wide ? 'xl:min-w-0 xl:flex-1' : ''}>
                    <p className={`display text-d2 ${last ? '' : wide ? 'mt-3 xl:mt-0' : 'mt-3'}`}>{p.name}</p>
                    <p className="label mt-2">{p.role}</p>
                    <p className="text-body leading-snug mt-2">{p.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-14 border-t border-void pt-5 flex items-start gap-5">
            <img src={logo} alt="Lost in Stars logo" loading="lazy" width={96} height={96} className="w-20 h-20 sm:w-24 sm:h-24 rounded-full shrink-0" />
            <p className="body-copy">
              Lost in Stars gives school students a genuine arena to build real, deployable technology, with a focus
              on shipping working software and fostering student agency.
            </p>
          </div>
          <ul className="grid sm:grid-cols-2 gap-x-6 mt-6">
            {PRINCIPLES.map((p) => (
              <li key={p.title} className="border-t border-void py-3">
                <span className="display text-d1 leading-none block">{p.title}</span>
                <span className="text-body leading-snug block mt-1">{p.desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);
