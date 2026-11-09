import React from 'react';
import { Reveal } from '../utils/motion';
import { FourPointStar, SectionHead } from './Editorial';
import { PRIZES } from '../data/event';

/** Amount always shows, marked as pending until set. Winner and sponsor appear only once confirmed. */
const PrizeFacts: React.FC<{ prize: { amount: string; winner: string; sponsor: string }; className?: string }> = ({
  prize,
  className = '',
}) => (
  <dl className={`label ${className}`}>
    <div className="flex flex-wrap gap-x-2">
      <dt>Prize amount:</dt>
      <dd>{prize.amount || 'To be announced'}</dd>
    </div>
    {prize.winner && (
      <div className="flex flex-wrap gap-x-2 mt-1">
        <dt>Winner:</dt>
        <dd>{prize.winner}</dd>
      </div>
    )}
    {prize.sponsor && (
      <div className="flex flex-wrap gap-x-2 mt-1">
        <dt>Sponsored by:</dt>
        <dd>{prize.sponsor}</dd>
      </div>
    )}
  </dl>
);

const CHAMPION_PERKS = [
  'Cast grand trophy and official Lost in Stars winner honors',
  'Certificate of Technical Excellence (Distinction)',
  '1-on-1 mentorship and incubation pathways with senior AI engineers',
  'Ecosystem partner credits and priority access to future programs',
];

const RUNNERS = [
  {
    place: 'Second place',
    title: 'First runner-up',
    details: PRIZES.firstRunnerUp,
    perks: ['First runner-up trophy', 'Certificate of High Distinction', 'Partner perks and tool credits', 'Spotlight in the Lost in Stars Innovation Archive'],
  },
  {
    place: 'Third place',
    title: 'Second runner-up',
    details: PRIZES.secondRunnerUp,
    perks: ['Second runner-up trophy', 'Certificate of Outstanding Performance', 'Developer tooling and cloud vouchers', 'Community Builder Collective entry'],
  },
];

const TRACK_AWARDS = ['AI Model Making', 'Web Development', 'Game Development', 'AI Agents', 'Voice Assistants'];

const SPECIAL = [
  { title: 'Most Innovative Project', desc: 'For the boldest, most creative solution.' },
  { title: 'Best Technical Execution', desc: 'For code architecture, live stability, and engineering rigor.' },
  { title: 'Best User Experience', desc: 'For clean, accessible, human-centered product design.' },
];

export const Prizes: React.FC = () => (
  <section id="prizes" className="section bg-paper text-void">
    <div className="wrap">
      <SectionHead
        depth="07"
        label="Prizes"
        title={['Build it.', 'Earn it.']}
        intro={<p>Every attending builder receives a verified Certificate of Participation.</p>}
      />

      {/* Main prize */}
      <Reveal>
        <article className="@container relative overflow-hidden bg-void text-paper p-6 sm:p-10 lg:p-14">
          <div className="absolute inset-0 starfield opacity-60" aria-hidden="true" />
          <FourPointStar className="hidden sm:block absolute right-6 top-6 w-14 text-sun" />
          <div className="relative">
            <p className="label text-sun">First place overall</p>
            <h3 className="display text-sun text-[19.5cqw] sm:text-[17.5cqw] mt-4">
              Below Zero
              <br />
              Champions
            </h3>
            <PrizeFacts prize={PRIZES.champion} className="border-t-2 border-flare pt-3 mt-8 text-sun" />
            <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 mt-4">
              {CHAMPION_PERKS.map((perk) => (
                <li key={perk} className="border-t border-paper/30 py-2.5 text-[1.0625rem] font-medium leading-snug">
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </Reveal>

      {/* Runners-up */}
      <div className="grid md:grid-cols-2 gap-px bg-void border-x border-b border-void">
        {RUNNERS.map((r, i) => (
          <Reveal key={r.title} delay={i * 0.08} className="@container bg-paper p-6 sm:p-8">
            <p className="label">{r.place}</p>
            <h3 className="display whitespace-nowrap text-[min(13cqw,6.5rem)] mt-3">{r.title}</h3>
            <PrizeFacts prize={r.details} className="mt-3" />
            <ul className="mt-5 text-[1.0625rem] font-medium leading-relaxed">
              {r.perks.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      {/* Track awards */}
      <div className="mt-16 lg:mt-24">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 mb-5">
          <h3 className="display text-[clamp(2.75rem,4.5vw,4.5rem)]">Track awards</h3>
          <p className="text-[1.0625rem] font-medium">Details to be announced.</p>
        </div>
        <ul className="grid grid-cols-2 lg:grid-cols-5 gap-px bg-void border border-void">
          {TRACK_AWARDS.map((t) => (
            <li key={t} className="last:col-span-2 lg:last:col-span-1 bg-flare p-4 min-h-36 flex items-end display text-[clamp(1.25rem,2.6vw,2.625rem)] leading-[0.92]">
              {t}
            </li>
          ))}
        </ul>
      </div>

      {/* Special recognition */}
      <div className="grid grid-cols-12 gap-x-6 gap-y-5 mt-16 lg:mt-24">
        <h3 className="display col-span-12 lg:col-span-3 text-[clamp(2.75rem,4.5vw,4.5rem)]">Special recognition</h3>
        <ul className="col-span-12 lg:col-span-9">
          {SPECIAL.map((s) => (
            <li key={s.title} className="grid sm:grid-cols-2 gap-x-6 gap-y-1 border-t border-void py-4">
              <span className="display text-[clamp(2rem,3vw,3rem)] leading-none">{s.title}</span>
              <span className="text-[1.0625rem] font-medium leading-snug sm:self-center">{s.desc}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Sponsor rewards */}
      <div className="bg-sun mt-16 lg:mt-24 p-6 sm:p-8 grid lg:grid-cols-2 gap-3 items-baseline">
        <h3 className="display text-[clamp(2.75rem,4.5vw,4.5rem)]">Sponsor rewards</h3>
        <p className="body-copy font-medium">Partner credits, developer tooling, and cloud vouchers are planned. Sponsors and amounts will be confirmed with each partner.</p>
      </div>
    </div>
  </section>
);
