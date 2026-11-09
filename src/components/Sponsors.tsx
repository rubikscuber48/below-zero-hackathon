import React from 'react';
import { Mail } from 'lucide-react';
import { Reveal } from '../utils/motion';
import { playSfx } from '../utils/audio';
import { EVENT, PARTNERS, Partner } from '../data/event';
import { SectionHead } from './Editorial';

interface SponsorsProps {
  onPartnerClick: () => void;
}

const REACH = [
  { label: 'Target participants', value: '300+ students' },
  { label: 'Eligibility', value: 'Classes 8–12' },
  { label: 'Location', value: 'Delhi NCR' },
  { label: 'Duration', value: '24 hours' },
];

const Logo: React.FC<{ partner: Partner; className: string }> = ({ partner, className }) => {
  const img = <img src={partner.logo} alt={partner.name} loading="lazy" className={`object-contain ${className}`} />;
  return partner.href ? (
    <a href={partner.href} target="_blank" rel="noopener noreferrer">
      {img}
    </a>
  ) : (
    img
  );
};

const OpenSlot: React.FC<{ onClick: () => void; children: React.ReactNode; className?: string }> = ({
  onClick,
  children,
  className = '',
}) => (
  <button
    type="button"
    onClick={() => {
      playSfx('click');
      onClick();
    }}
    className={`border border-dashed border-paper/50 hover:border-sun hover:text-sun transition-colors cursor-pointer flex items-center justify-center text-center ${className}`}
  >
    {children}
  </button>
);

export const Sponsors: React.FC<SponsorsProps> = ({ onPartnerClick }) => (
  <section id="sponsors" className="section bg-void text-paper">
    <div className="wrap">
      <SectionHead
        depth="07"
        label="Sponsors"
        title={['Back the next', 'builders.']}
        intro={<p>BELOW ZERO is free for students. Sponsorship pays for connectivity, meals, compute, awards, and certificates.</p>}
      />

      {/* Title */}
      <Reveal>
        <article className="bg-sun text-void grid grid-cols-12 gap-x-6 gap-y-6 p-6 sm:p-10 lg:p-14 min-h-[26rem]">
          <div className="col-span-12 lg:col-span-8 flex flex-col justify-between gap-8">
            <p className="label">Title partner</p>
            {PARTNERS.title.length ? (
              <Logo partner={PARTNERS.title[0]} className="max-h-48 w-auto bg-paper p-4" />
            ) : (
              <p className="display text-[clamp(4.5rem,11vw,12rem)]">
                Your name
                <br />
                goes here
              </p>
            )}
          </div>
          <div className="col-span-12 lg:col-span-4 lg:self-end">
            <p className="text-[1.125rem] font-medium leading-snug">
              Naming presence across the 24 hours, the opening keynote, a customized challenge track, and a seat on the jury.
            </p>
            <button
              type="button"
              className="btn btn-solid-void mt-5 w-full"
              onClick={() => {
                playSfx('click');
                onPartnerClick();
              }}
            >
              Request prospectus
            </button>
          </div>
        </article>
      </Reveal>

      {/* Main */}
      <div className="grid md:grid-cols-2 gap-px bg-paper/30 border-x border-b border-paper/30">
        {[
          { role: 'Technical infrastructure', scope: 'Foundational AI models, cloud credits, API keys, and hands-on workshops.' },
          { role: 'Education advocate', scope: 'Participation grants, prototyping kits, student awards, and resource stipends.' },
        ].map((tier, i) => (
          <div key={tier.role} className="bg-void p-6 sm:p-8 flex flex-col justify-between gap-8 min-h-64">
            {PARTNERS.main[i] && <Logo partner={PARTNERS.main[i]} className="max-h-24 w-auto bg-paper p-3" />}
            <h3 className="display text-[clamp(3rem,5.5vw,6rem)]">{tier.role}</h3>
            <p className="body-copy text-paper/85">{tier.scope}</p>
          </div>
        ))}
      </div>

      {/* Supporting */}
      <div className="grid grid-cols-12 gap-x-6 gap-y-5 mt-14">
        <div className="col-span-12 lg:col-span-3">
          <h3 className="display text-[clamp(2.5rem,3.5vw,3.5rem)]">Supporting partners</h3>
        </div>
        <div className="col-span-12 lg:col-span-9 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {PARTNERS.supporting.map((p) => (
            <div key={p.name} className="bg-paper p-3 h-24 flex items-center justify-center">
              <Logo partner={p} className="max-h-full max-w-full" />
            </div>
          ))}
          {Array.from({ length: Math.max(0, 4 - PARTNERS.supporting.length) }).map((_, i) => (
            <OpenSlot key={i} onClick={onPartnerClick} className="h-24 label">
              Open slot
            </OpenSlot>
          ))}
        </div>
      </div>

      {/* Community */}
      <div className="mt-10 border-y border-paper/30 py-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="label text-sun">Community partners</h3>
          <p className="mt-1 text-[1.0625rem] max-w-[60ch]">
            Student developer communities, hack clubs, and computer science societies.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-6">
          {PARTNERS.community.map((p) => (
            <Logo key={p.name} partner={p} className="max-h-12 w-auto bg-paper p-1" />
          ))}
          <button type="button" className="label min-h-12 underline underline-offset-4 cursor-pointer hover:text-sun" onClick={onPartnerClick}>
            Join as a community partner
          </button>
        </div>
      </div>

      <dl className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6 mt-12">
        {REACH.map((r) => (
          <div key={r.label}>
            <dt className="label text-paper/80">{r.label}</dt>
            <dd className="display text-[clamp(2.25rem,3.5vw,3.5rem)] mt-1">{r.value}</dd>
          </div>
        ))}
      </dl>
      <a href={`mailto:${EVENT.email}?subject=BELOW%20ZERO%20PARTNERSHIP`} className="inline-flex items-center gap-2 mt-8 min-h-12 font-semibold underline underline-offset-4 break-all">
        <Mail className="w-5 h-5 shrink-0" />
        {EVENT.email}
      </a>
    </div>
  </section>
);
