import React from 'react';
import { Reveal } from '../utils/motion';
import { Lines } from './Editorial';
import { sectionInfo } from '../data/sections';

const CONDITIONS = [
  { title: 'Find a real problem', text: 'Pick something worth solving for students or communities.' },
  { title: 'Build it in 24 hours', text: 'Work solo or in a team of up to four, in one of five tracks.' },
  { title: 'Prove it works', text: 'No presentation slides. Run live code in front of the judges.' },
];

export const Challenge: React.FC = () => (
  <section id="challenge" className="section bg-flare text-void overflow-hidden">
    <div className="wrap">
      <div className="flex items-baseline gap-4 border-t border-void pt-5">
        <span className="display text-d4" aria-hidden="true">
          {sectionInfo('challenge').number}
        </span>
        <p className="label">{sectionInfo('challenge').name}</p>
      </div>

      <h2 className="display text-d6 mt-8">
        <Lines lines={['No slides.']} />
        <Lines lines={['No shortcuts.']} className="lg:pl-[16%]" delay={0.1} />
        <Lines lines={['Just proof.']} className="lg:pl-[32%]" delay={0.2} />
      </h2>

      <ol className="grid md:grid-cols-3 border-t-2 border-void mt-12 lg:mt-16">
        {CONDITIONS.map((c, i) => (
          <li
            key={c.title}
            className="list-none py-5 md:px-6 md:first:pl-0 md:last:pr-0 border-b md:border-b-0 md:border-r last:border-0 border-void"
          >
            <Reveal delay={i * 0.07}>
              <h3 className="display text-d2">{c.title}</h3>
              <p className="body-copy font-medium mt-2">{c.text}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  </section>
);
