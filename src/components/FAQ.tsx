import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { easeCinematic } from '../utils/motion';
import { playSfx } from '../utils/audio';
import { EVENT } from '../data/event';
import { SideHead } from './Editorial';

const GROUPS: { name: string; items: { q: string; a: string }[] }[] = [
  {
    name: 'Eligibility',
    items: [
      { q: 'Who can participate?', a: 'Participation is exclusively for school students currently enrolled in Classes 8 through 12.' },
      {
        q: 'Do I need hackathon experience or advanced coding skills?',
        a: 'No prior hackathon experience is needed. Whether you are building your first neural network or your first web game, mentors will be on the floor to help you past technical hurdles.',
      },
    ],
  },
  {
    name: 'Registration',
    items: [
      { q: 'Is there a registration or entry fee?', a: 'No. BELOW ZERO is free for all accepted students. Food, beverages, power, Wi-Fi, mentorship, and swag are covered by Lost in Stars and our partners.' },
      { q: 'How do I register my interest?', a: 'Use any Register button on this site to open the registration form.' },
    ],
  },
  {
    name: 'Team formation',
    items: [
      { q: 'How big can a team be?', a: 'Teams can have 1 to 4 members.' },
      { q: 'Can I register without a team?', a: 'Yes. You can register solo or with your pre-formed squad.' },
    ],
  },
  {
    name: 'Tracks',
    items: [
      { q: 'What are the five tracks?', a: 'AI Model Making, Web Development, Game Development, AI Agents, and Voice Assistants.' },
      { q: 'Do I have to choose one track?', a: 'Teams select one primary track when they submit their project.' },
    ],
  },
  {
    name: 'Rules',
    items: [
      { q: 'Does my project have to be new?', a: 'Yes. Projects must be original works conceived and created during the event. All participants must agree to the Code of Conduct.' },
      { q: 'Who owns what we build?', a: 'Intellectual property remains 100% owned by the student creators.' },
      { q: 'How are projects judged?', a: 'Each team is evaluated during a live demo. The proposed criteria are in the Judging section of this page and are subject to confirmation.' },
      { q: 'Will participants receive certificates?', a: 'Yes. All attending hackers receive a verified Certificate of Participation from Lost in Stars. Prize details will be confirmed in the Prizes section.' },
    ],
  },
  {
    name: 'Logistics',
    items: [
      { q: 'When and where is it?', a: 'Mid-November 2026, in person in Delhi NCR. The final date is still to be confirmed. Venue details and logistics will be emailed directly to accepted teams.' },
      { q: 'What is provided on the day?', a: 'Food, beverages, power, Wi-Fi, mentorship, and swag.' },
    ],
  },
];

export const FAQ: React.FC = () => {
  const [open, setOpen] = useState<string | null>('Eligibility-0');

  return (
    <section id="faq" className="section bg-paper text-void">
      <div className="wrap grid grid-cols-12 gap-x-6 gap-y-10">
        <div className="col-span-12 lg:col-span-4">
          <SideHead
            depth="10"
            label="FAQ"
            title={['Questions,', 'answered.']}
            intro={
              <p>
                Anything else? Write to
                <a className="block py-2.5 text-[1rem] underline underline-offset-4 [overflow-wrap:anywhere]" href={`mailto:${EVENT.email}`}>
                  {EVENT.email}
                </a>
              </p>
            }
          />
        </div>

        <div className="col-span-12 lg:col-span-8 border-b border-void">
          {GROUPS.map((group) => (
            <div key={group.name} className="grid sm:grid-cols-[9.5rem_1fr] gap-x-6 border-t border-void pt-4 pb-3">
              <h3 className="label pt-3 mb-1 sm:mb-0">{group.name}</h3>
              <div>
                {group.items.map((item, idx) => {
                  const key = `${group.name}-${idx}`;
                  const isOpen = open === key;
                  const id = key.replace(/\s/g, '-');
                  return (
                    <div key={key} className={idx ? 'border-t border-void/20' : ''}>
                      <h4>
                        <button
                          type="button"
                          id={`q-${id}`}
                          aria-expanded={isOpen}
                          aria-controls={`a-${id}`}
                          onClick={() => {
                            playSfx('click');
                            setOpen(isOpen ? null : key);
                          }}
                          className="w-full min-h-14 py-3 flex items-center justify-between gap-5 text-left cursor-pointer text-[clamp(1.125rem,1.5vw,1.3125rem)] font-semibold leading-snug hover:underline underline-offset-4"
                        >
                          {item.q}
                          {isOpen ? <Minus className="w-6 h-6 shrink-0 text-flare" /> : <Plus className="w-6 h-6 shrink-0" />}
                        </button>
                      </h4>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={`a-${id}`}
                            role="region"
                            aria-labelledby={`q-${id}`}
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.28, ease: easeCinematic }}
                            className="overflow-hidden"
                          >
                            <p className="body-copy pb-5">{item.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
