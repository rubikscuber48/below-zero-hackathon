import React from 'react';
import { Reveal } from '../utils/motion';
import { SectionHead } from './Editorial';

const STEPS = [
  { num: '1', title: 'Register', text: 'Free for students in Classes 8⁠–⁠12.' },
  { num: '2', title: 'Form a team', text: 'Come solo or as a team of up to four.' },
  { num: '3', title: 'Pick a track', text: 'Choose one primary track for your project.' },
  { num: '4', title: 'Build and demo', text: '24 hours in person, then show it working.' },
];

const INCLUDED = ['Free entry for accepted teams', 'Meals and beverages', 'High-speed LAN and power', 'Lost in Stars swag'];

const FLOOR = [
  { title: 'Senior mentors', text: 'AI researchers, founders, and senior developers help you get unstuck.' },
  { title: 'Rapid workshops', text: 'Short sessions on vision models, agent loops, and voice pipelines.' },
  { title: 'Maker culture', text: 'Meet school builders from across Delhi NCR in a safe, high-energy space.' },
  { title: 'Live jury stage', text: 'Show working software to engineers and peers, and get merit-based feedback.' },
];

export const HowItWorks: React.FC = () => (
  <section id="how" className="section bg-paper text-void">
    <div className="wrap">
      <SectionHead depth="04" label="How it works" title={['Four steps', 'to the floor.']} />

      <ol className="grid sm:grid-cols-2 lg:grid-cols-4 border-y-2 border-void">
        {STEPS.map((s, i) => (
          <Reveal
            key={s.num}
            delay={i * 0.06}
            className={`py-6 lg:px-6 lg:first:pl-0 border-void ${i < 3 ? 'border-b sm:max-lg:odd:border-r lg:border-b-0 lg:border-r' : ''} sm:max-lg:[&:nth-child(3)]:border-b-0 sm:max-lg:px-5 sm:max-lg:odd:pl-0`}
          >
            <li className="list-none">
              <span className="display text-[clamp(5rem,9vw,9rem)] text-flare block" aria-hidden="true">
                {s.num}
              </span>
              <h3 className="display text-[clamp(2.25rem,3.2vw,3.25rem)] mt-2">{s.title}</h3>
              <p className="body-copy mt-2">{s.text}</p>
            </li>
          </Reveal>
        ))}
      </ol>

      <div className="grid grid-cols-12 gap-x-6 gap-y-8 mt-12 lg:mt-16">
        <div className="col-span-12 lg:col-span-4 bg-void text-paper p-6">
          <h3 className="label text-sun">Included for every team</h3>
          <ul className="mt-3">
            {INCLUDED.map((item) => (
              <li key={item} className="display text-[clamp(1.75rem,2.3vw,2.25rem)] border-t border-paper/30 py-2.5">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <ul className="col-span-12 lg:col-span-8 grid sm:grid-cols-2 gap-x-8">
          {FLOOR.map((f) => (
            <li key={f.title} className="border-t border-void py-4">
              <h3 className="display text-[clamp(2rem,2.8vw,2.75rem)]">{f.title}</h3>
              <p className="text-[1.0625rem] leading-snug mt-1.5">{f.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);
