import React, { useState } from 'react';
import { m, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { easeCinematic } from '../utils/motion';
import { playSfx } from '../utils/audio';
import { EVENT } from '../data/event';
import { FAQ_GROUPS } from '../data/faq';
import { SideHead } from './Editorial';

export const FAQ: React.FC = () => {
  const [open, setOpen] = useState<string | null>('Eligibility-0');

  return (
    <section id="faq" className="section bg-paper text-void">
      <div className="wrap grid grid-cols-12 gap-x-6 gap-y-10">
        <div className="col-span-12 lg:col-span-4">
          <SideHead
            id="faq"
            title={['Questions,', 'answered.']}
            intro={
              <p>
                Anything else? Write to
                <a className="block py-2.5 text-body underline underline-offset-4 [overflow-wrap:anywhere]" href={`mailto:${EVENT.email}`}>
                  {EVENT.email}
                </a>
              </p>
            }
          />
        </div>

        <div className="col-span-12 lg:col-span-8 border-b border-void">
          {FAQ_GROUPS.map((group) => (
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
                          className="w-full min-h-14 py-3 flex items-center justify-between gap-5 text-left cursor-pointer text-lead font-semibold leading-snug hover:underline underline-offset-4"
                        >
                          {item.q}
                          {isOpen ? <Minus className="w-6 h-6 shrink-0 text-flare" /> : <Plus className="w-6 h-6 shrink-0" />}
                        </button>
                      </h4>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <m.div
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
                          </m.div>
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
