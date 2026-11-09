import React from 'react';
import { Reveal } from '../utils/motion';
import { SectionHead } from './Editorial';

const ROWS = [
  {
    tag: 'Office hours',
    title: 'Active senior mentorship',
    description:
      'Continuous guidance from AI researchers, founders, and senior developers who help with your architecture and unblock tricky bugs.',
  },
  {
    tag: 'Tech sessions',
    title: 'Rapid AI and build workshops',
    description: 'Flash workshops on vision models, agent loops, voice pipelines, and prompt optimization, about 20 minutes each.',
  },
  {
    tag: 'Collaborative',
    title: 'Student maker culture',
    description: 'Meet high school builders from across Delhi NCR in a safe, high-energy space made for Classes 8⁠–⁠12.',
  },
  {
    tag: 'Real demos',
    title: 'Live showcase and jury stage',
    description: 'Show working software to a jury of engineers and peers, and get merit-based feedback.',
  },
];

const INCLUDED = [
  'Free entry for accepted teams',
  'Meals and beverages provided',
  'High-speed LAN and power stations',
  'Lost in Stars streetwear swag',
];

export const Experience: React.FC = () => (
  <section id="experience" className="section bg-void text-paper">
    <div className="wrap">
      <SectionHead depth="50" label="Experience" title={['More than', 'a hackathon.']} />
      <div className="grid grid-cols-12 gap-x-6 gap-y-10">
        <div className="col-span-12 lg:col-span-4">
          <div className="lg:sticky lg:top-24 bg-sun text-void p-6">
            <p className="display text-[clamp(2.5rem,4vw,4rem)]">Included for every team</p>
            <ul className="mt-5">
              {INCLUDED.map((item) => (
                <li key={item} className="border-t border-void py-2.5 font-semibold text-[1.0625rem]">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-8">
          {ROWS.map((row, i) => (
            <Reveal key={row.title} delay={i * 0.05} className="grid sm:grid-cols-8 gap-x-6 gap-y-2 border-t border-paper/30 py-7">
              <p className="label text-sun sm:col-span-2 sm:pt-2">{row.tag}</p>
              <div className="sm:col-span-6">
                <h3 className="display text-[clamp(2.75rem,5vw,5rem)]">{row.title}</h3>
                <p className="body-copy mt-3 text-paper/85">{row.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);
