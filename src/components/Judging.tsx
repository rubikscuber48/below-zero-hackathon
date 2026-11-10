import React, { useState } from 'react';
import { m, AnimatePresence } from 'motion/react';
import { easeSnappy } from '../utils/motion';
import { SideHead } from './Editorial';
import { playSfx } from '../utils/audio';

interface Criterion {
  id: string;
  num: string;
  title: string;
  weight: string;
  question: string;
  details: string;
  proTip: string;
  rubric: string[];
}

export const Judging: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  const criteria: Criterion[] = [
    {
      id: 'innovation',
      num: '01',
      title: 'INNOVATION & ORIGINALITY',
      weight: '25%',
      question: 'Does this tackle a real friction point in a bold, inventive way rather than replicating a generic tutorial?',
      details: 'Judges evaluate whether the project presents an original angle, a novel combination of existing technologies, or a courageous approach to an unsolved problem for students or communities.',
      proTip: 'Show why existing tools fail to solve this nuance and how your hackathon build introduces a smarter angle.',
      rubric: [
        'Novelty of approach and problem formulation',
        'Creative departure from boilerplate templates',
        'Distinctive user value proposition'
      ]
    },
    {
      id: 'execution',
      num: '02',
      title: 'WORKING PROTOTYPE',
      weight: '25%',
      question: 'Does the software run and complete its core user loop live without smoke and mirrors?',
      details: 'Working software is our highest priority. We evaluate whether the core feature actually functions on-device or live on web, and whether code was authentically written and committed during the 24-hour hackathon window.',
      proTip: 'A smaller scope that runs flawlessly live beats an over-ambitious project that crashes on step 2.',
      rubric: [
        'Live functional demo during the 3-minute pitch',
        'Clean error handling and operational reliability',
        'Authentic code commits made during the event'
      ]
    },
    {
      id: 'ai-depth',
      num: '03',
      title: 'TECHNICAL & AI DEPTH',
      weight: '20%',
      question: 'Is AI or complex engineering thoughtfully integrated and strictly justified for this solution?',
      details: 'Judges assess whether AI models, agents, voice pipelines, or algorithms are genuinely needed and properly implemented, rather than superficial API wrapper hype with no technical substance.',
      proTip: 'Explain why an AI model was strictly necessary here instead of a traditional deterministic formula or database query.',
      rubric: [
        'Appropriate model selection and pipeline tuning',
        'Latency considerations and prompt engineering rigor',
        'System architecture clarity and sound technical choices'
      ]
    },
    {
      id: 'impact',
      num: '04',
      title: 'REAL-WORLD VIABILITY',
      weight: '15%',
      question: 'Who suffers from the problem today, and could this project evolve into a real, deployable tool?',
      details: 'We want student inventions that could realistically be deployed in high schools, local communities, or the open source developer ecosystem beyond the hackathon weekend.',
      proTip: 'Define your exact target persona in your opening 20 seconds and quantify what measurably changes for them.',
      rubric: [
        'Clear identification of real users or beneficiaries',
        'Practical feasibility and scalability pathway',
        'Social or community relevance'
      ]
    },
    {
      id: 'design',
      num: '05',
      title: 'UI & INTERACTION CRAFT',
      weight: '10%',
      question: 'Is the interface intuitive, responsive, and crafted with high design discipline?',
      details: 'First impressions matter. Judges assess how effectively the user experience guides the user, typography choices, visual hierarchy, mobile responsiveness, and tactile micro-interactions.',
      proTip: 'Eliminate visual clutter. Ensure a judge looking at the screen understands what to do in under 3 seconds.',
      rubric: [
        'Intuitive layout and typographic clarity',
        'Zero broken styling or awkward viewport shifts',
        'Smooth user guidance and immediate feedback'
      ]
    },
    {
      id: 'pitch',
      num: '06',
      title: 'PITCH & CODE INTEGRITY',
      weight: '5%',
      question: 'Can the team articulate their architecture, trade-offs, and lessons learned with complete honesty?',
      details: 'Communication and engineering ethics. Judges evaluate how cohesively the team presents, how questions are answered, and total transparency regarding libraries used versus what was built during the hackathon.',
      proTip: 'Be completely honest about external libraries vs what you wrote in 24 hours. Transparency earns maximum respect.',
      rubric: [
        'Crisp 3-minute pitch with equal team participation',
        'Clear articulation of engineering trade-offs',
        'Absolute transparency on tools and code origin'
      ]
    }
  ];

  const current = criteria[selectedIdx];

  return (
    <section id="judging" className="section bg-paper text-void">
      <div className="wrap grid grid-cols-12 gap-x-6 gap-y-10">
        <div className="col-span-12 lg:col-span-4">
          <SideHead
            id="judging"
            title={['How you', 'are judged.']}
            intro={
              <>
                <span className="label inline-block bg-sun px-2 py-1 mb-3">Proposed</span>
                <p>These criteria and weights are suggestions until officially confirmed.</p>
              </>
            }
          />
        </div>

        <div className="col-span-12 lg:col-span-8 grid xl:grid-cols-2 gap-x-10 gap-y-8">
          <ul className="border-t border-void self-start">
            {criteria.map((item, idx) => {
              const isSelected = selectedIdx === idx;
              return (
                <li key={item.id} className="border-b border-void">
                  <button
                    type="button"
                    aria-pressed={isSelected}
                    aria-controls="judging-detail"
                    onClick={() => {
                      playSfx('hover');
                      setSelectedIdx(idx);
                    }}
                    className={`w-full text-left px-3 py-3 cursor-pointer transition-colors ${isSelected ? 'bg-void text-paper' : 'hover:bg-sun'}`}
                  >
                    <span className="flex items-baseline justify-between gap-4">
                      <span className="display text-d1">{item.title}</span>
                      <span className="display text-d1">{item.weight}</span>
                    </span>
                    <span className="block h-2 mt-2 bg-flare" style={{ width: `${parseInt(item.weight, 10) * 4}%` }} />
                  </button>
                </li>
              );
            })}
          </ul>

          <div id="judging-detail" aria-live="polite">
            <AnimatePresence mode="wait">
              <m.div
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: easeSnappy }}
              >
                <p className="text-d1 font-bold leading-tight">{current.question}</p>
                <p className="label mt-6">Judges check for</p>
                <ul className="mt-2 text-body font-medium leading-relaxed">
                  {current.rubric.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <div className="mt-6 bg-sun p-5">
                  <p className="label">Tip for builders</p>
                  <p className="mt-1.5 text-body font-medium leading-snug">{current.proTip}</p>
                </div>
              </m.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
