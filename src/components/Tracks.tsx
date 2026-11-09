import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { Track } from '../types';
import { easeCinematic, Reveal } from '../utils/motion';
import { playSfx } from '../utils/audio';
import { SectionHead } from './Editorial';

interface TracksProps {
  onSelectTrackForRsvp: (trackTitle: string) => void;
}

/* One drawing per track, each from that discipline's own vocabulary. */
const ModelArt = () => {
  const layers = [
    [60, 150, 240, 330],
    [30, 105, 180, 255, 330].map((y) => y + 15),
    [105, 195, 285],
  ];
  const xs = [40, 200, 360];
  return (
    <svg viewBox="0 0 400 400" fill="none" stroke="currentColor" className="w-full h-full">
      {layers.slice(0, -1).flatMap((l, a) =>
        l.flatMap((y1, i) => layers[a + 1].map((y2, j) => <line key={`${a}${i}${j}`} x1={xs[a]} y1={y1} x2={xs[a + 1]} y2={y2} strokeWidth="1.25" />)),
      )}
      {layers.flatMap((l, a) => l.map((y, i) => <circle key={`n${a}${i}`} cx={xs[a]} cy={y} r="13" fill="currentColor" />))}
    </svg>
  );
};

const WebArt = () => (
  <svg viewBox="0 0 400 400" fill="none" stroke="currentColor" strokeWidth="3" className="w-full h-full">
    {[0, 42, 84].map((o) => (
      <g key={o} transform={`translate(${o} ${o})`}>
        <rect x="20" y="20" width="270" height="200" fill="#F7F5EF" />
        <line x1="20" y1="54" x2="290" y2="54" />
        <circle cx="40" cy="37" r="5" fill="currentColor" />
        <circle cx="60" cy="37" r="5" fill="currentColor" />
      </g>
    ))}
    <rect x="125" y="170" width="100" height="44" fill="#FF1744" stroke="none" />
    <path d="M125 240h210M125 262h150M125 284h180" />
  </svg>
);

const GameArt = () => (
  <svg viewBox="0 0 400 400" className="w-full h-full" fill="currentColor">
    <path d="M30 330h100v30H30zM170 250h90v30h-90zM300 170h80v30h-80z" />
    {[
      [70, 296],
      [92, 232],
      [122, 186],
      [158, 164],
      [196, 170],
      [226, 206],
    ].map(([x, y]) => (
      <rect key={x} x={x} y={y} width="12" height="12" />
    ))}
    <rect x="196" y="206" width="44" height="44" />
    <circle cx="340" cy="70" r="46" fill="none" stroke="currentColor" strokeWidth="8" />
    <circle cx="340" cy="70" r="16" />
  </svg>
);

const AgentArt = () => {
  const r = 130;
  const nodes = Array.from({ length: 6 }, (_, i) => {
    const t = (i / 6) * Math.PI * 2 - Math.PI / 2;
    return [200 + r * Math.cos(t), 200 + r * Math.sin(t)];
  });
  return (
    <svg viewBox="0 0 400 400" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-full h-full">
      <circle cx="200" cy="200" r={r} strokeDasharray="10 12" />
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <line x1="200" y1="200" x2={x} y2={y} strokeWidth="1.25" />
          <rect x={x - 17} y={y - 17} width="34" height="34" fill={i === 0 ? '#FFD633' : '#000000'} />
        </g>
      ))}
      <rect x="168" y="168" width="64" height="64" fill="#FF1744" stroke="none" />
    </svg>
  );
};

const VoiceArt = () => {
  const bars = Array.from({ length: 96 }, (_, i) => {
    const h = 14 + Math.abs(Math.sin(i * 0.33) * Math.cos(i * 0.09 + 1)) * 150 + (i % 5) * 3;
    return (
      <rect key={i} x={i * 12.5} y={100 - h / 2} width="6" height={h} rx="0" />
    );
  });
  return (
    <svg viewBox="0 0 1200 200" preserveAspectRatio="none" fill="currentColor" className="w-full h-full">
      {bars}
    </svg>
  );
};

type TrackDef = Track & {
  art: React.ReactNode;
  span: string;
  tone: string;
  artBox: string;
  titleSize: string;
  titleLines: string[];
  rule: string;
};

const TRACKS: TrackDef[] = [
  {
    id: 'ai-model',
    number: '01',
    title: 'AI Model Making',
    titleLines: ['AI Model', 'Making'],
    tagline: 'Algorithms and neural systems',
    description:
      'Develop, fine-tune, and deploy machine learning models. Turn raw data, loss functions, and neural architectures into practical tools.',
    focusAreas: ['Computer Vision', 'Predictive Classification', 'Natural Language Processing', 'Data Synthesis'],
    sampleProject: 'Fine-tuned vision model detecting local environmental hazards or crop diseases.',
    tools: ['PyTorch', 'TensorFlow', 'Scikit-Learn', 'Hugging Face'],
    art: <ModelArt />,
    span: 'lg:col-span-7',
    tone: 'bg-flare text-void',
    artBox: 'aspect-square right-[3%] top-[3%] w-[26%] sm:w-[44%] max-w-[26rem]',
    titleSize: 'text-[min(18cqw,10rem)]',
    rule: 'border-void',
  },
  {
    id: 'web-dev',
    number: '02',
    title: 'Web Development',
    titleLines: ['Web', 'Development'],
    tagline: 'Modern high-impact platforms',
    description:
      'Build high-performance web applications, interactive software, and student utility hubs that solve real-world problems.',
    focusAreas: ['Interactive SPAs', 'Offline-First Architectures', 'Student Productivity Hubs', 'Real-Time Utility'],
    sampleProject: 'Peer-to-peer resource exchange platform for high school research initiatives.',
    tools: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS'],
    art: <WebArt />,
    span: 'lg:col-span-5',
    tone: 'bg-paper text-void',
    artBox: 'aspect-square right-[2%] top-[3%] w-[26%] sm:w-[48%] max-w-[20rem]',
    titleSize: 'text-[min(16.5cqw,8rem)]',
    rule: 'border-void',
  },
  {
    id: 'game-dev',
    number: '03',
    title: 'Game Development',
    titleLines: ['Game', 'Development'],
    tagline: 'Interactive mechanics and worlds',
    description:
      'Bring your imagination to life through original mechanics, physics-driven gameplay, and atmospheric digital environments.',
    focusAreas: ['2D Pixel Platformers', 'Narrative Simulators', 'Physics-Driven Puzzles', 'Educational Mechanics'],
    sampleProject: 'Gravity-manipulation arcade puzzle game teaching orbital celestial physics.',
    tools: ['Godot', 'Unity', 'Phaser.js', 'Kaboom.js'],
    art: <GameArt />,
    span: 'lg:col-span-5',
    tone: 'bg-sun text-void',
    artBox: 'aspect-square right-[3%] top-[3%] w-[26%] sm:w-[48%] max-w-[20rem]',
    titleSize: 'text-[min(16.5cqw,8rem)]',
    rule: 'border-void',
  },
  {
    id: 'ai-agents',
    number: '04',
    title: 'AI Agents',
    titleLines: ['AI', 'Agents'],
    tagline: 'Autonomous systems and tool use',
    description:
      'Build agentic loops capable of multi-step reasoning, external tool execution, browser automation, and self-correcting logic.',
    focusAreas: ['Multi-Step Planners', 'Browser Automations', 'Research Synthesizers', 'Code Verification Loops'],
    sampleProject: 'Autonomous curriculum coach that breaks a complex syllabus into daily hands-on experiments.',
    tools: ['LangChain', 'Function Calling', 'Agentic Workflows', 'Python'],
    art: <AgentArt />,
    span: 'lg:col-span-7',
    tone: 'bg-void text-paper',
    artBox: 'aspect-square right-[3%] top-[4%] w-[26%] sm:w-[44%] max-w-[26rem] text-flare',
    titleSize: 'text-[min(20cqw,11rem)]',
    rule: 'border-paper',
  },
  {
    id: 'voice-assistants',
    number: '05',
    title: 'Voice Assistants',
    titleLines: ['Voice Assistants'],
    tagline: 'Conversational audio interfaces',
    description:
      'Design natural voice-first experiences that understand spoken commands, multilingual dialogue, and real-time audio generation.',
    focusAreas: ['Speech-to-Intent', 'Hands-Free Access', 'Multilingual Dialogue', 'Assistive Speech Systems'],
    sampleProject: 'Voice-controlled accessibility assistant for visual impairment in school libraries.',
    tools: ['Web Speech API', 'Whisper', 'ElevenLabs', 'Realtime Audio'],
    art: <VoiceArt />,
    span: 'lg:col-span-12',
    tone: 'bg-flare text-void',
    artBox: 'left-[9.5rem] sm:left-[15rem] right-5 top-8 h-[5.5rem] sm:h-[9rem]',
    titleSize: 'text-[min(14cqw,15rem)]',
    rule: 'border-void',
  },
];

const TrackPanel: React.FC<{ track: TrackDef; onRsvp: () => void; index: number }> = ({ track, onRsvp, index }) => {
  const [open, setOpen] = useState(false);
  const panelId = `track-${track.id}`;

  return (
    <Reveal delay={index % 2 ? 0.08 : 0} className={`col-span-12 ${track.span} flex`}>
      <article
        data-cursor="arena"
        className={`@container group relative overflow-hidden w-full flex flex-col p-5 sm:p-8 min-h-[34rem] ${track.tone}`}
      >
        <div className={`track-art absolute pointer-events-none ${track.artBox}`} aria-hidden="true">
          {track.art}
        </div>

        <div className="relative">
          <div className="track-number display text-[clamp(6rem,24cqw,11rem)] leading-[0.8]" aria-hidden="true">
            {track.number}
          </div>
          <p className="label mt-3">{track.tagline}</p>
        </div>

        <div className="relative mt-auto pt-14">
          <h3 className={`display ${track.titleSize}`}>
            {track.titleLines.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </h3>
          <p className="body-copy mt-4 font-medium">{track.description}</p>

          <ul className="flex flex-wrap gap-2 mt-5" aria-label="Recommended tools">
            {track.tools.map((tool) => (
              <li key={tool} className={`border px-2.5 py-1 text-[0.875rem] font-semibold ${track.rule}`}>
                {tool}
              </li>
            ))}
          </ul>

          <button
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => {
              playSfx('click');
              setOpen(!open);
            }}
            className={`label mt-6 w-full min-h-12 flex items-center justify-between border-t cursor-pointer ${track.rule}`}
          >
            {open ? 'Hide details' : 'Show details'}
            {open ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id={panelId}
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                transition={{ duration: 0.35, ease: easeCinematic }}
                className="overflow-hidden"
              >
                <div className="grid sm:grid-cols-2 gap-6 pt-3 pb-2">
                  <div>
                    <p className="label">Focus areas</p>
                    <ul className="mt-2 text-[1.0625rem] leading-relaxed font-medium">
                      {track.focusAreas.map((a) => (
                        <li key={a}>{a}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="label">Example build</p>
                    <p className="mt-2 text-[1.0625rem] leading-snug font-medium">{track.sampleProject}</p>
                    <p className="mt-2 text-[0.9375rem] leading-snug">You are free to propose your own problem.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onRsvp}
                  className={`label mt-3 min-h-12 px-4 border-2 cursor-pointer ${track.rule}`}
                >
                  Register for this track
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </article>
    </Reveal>
  );
};

export const Tracks: React.FC<TracksProps> = ({ onSelectTrackForRsvp }) => (
  <section id="tracks" className="section bg-void text-paper">
    <div className="wrap">
      <SectionHead
        depth="02"
        label="Tracks"
        title={['Five tracks.', 'Pick one.']}
        intro={<p>Choose the domain that excites you, form a team, and build working software.</p>}
      />
      <div className="grid grid-cols-12 gap-px bg-paper/30 border border-paper/30">
        {TRACKS.map((track, i) => (
          <TrackPanel key={track.id} track={track} index={i} onRsvp={() => onSelectTrackForRsvp(track.title)} />
        ))}
      </div>
    </div>
  </section>
);
