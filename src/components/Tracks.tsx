import React, { useEffect, useRef, useState } from 'react';
import { m, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import type { Track, TrackId } from '../types';
import { TRACKS } from '../data/tracks';
import { easeCinematic, Reveal } from '../utils/motion';
import { playSfx } from '../utils/audio';
import { SectionHead } from './Editorial';

interface TracksProps {
  onRegister: () => void;
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

interface Look {
  art: React.ReactNode;
  span: string;
  tone: string;
  artBox: string;
  titleSize: string;
  rule: string;
}

/** How each track looks. The words are in data/tracks.ts. */
const LOOK: Record<TrackId, Look> = {
  'ai-model': {
    art: <ModelArt />,
    span: 'lg:col-span-7',
    tone: 'bg-flare text-void',
    artBox: 'aspect-square right-[3%] top-[3%] w-[26%] sm:w-[34%] max-w-[20rem]',
    titleSize: 'text-[min(18cqw,10rem)]',
    rule: 'border-void',
  },
  'web-dev': {
    art: <WebArt />,
    span: 'lg:col-span-5',
    tone: 'bg-paper text-void',
    artBox: 'aspect-square right-[2%] top-[3%] w-[26%] sm:w-[34%] max-w-[15rem]',
    titleSize: 'text-[min(16.5cqw,8rem)]',
    rule: 'border-void',
  },
  'game-dev': {
    art: <GameArt />,
    span: 'lg:col-span-5',
    tone: 'bg-sun text-void',
    artBox: 'aspect-square right-[3%] top-[3%] w-[26%] sm:w-[34%] max-w-[15rem]',
    titleSize: 'text-[min(16.5cqw,8rem)]',
    rule: 'border-void',
  },
  'ai-agents': {
    art: <AgentArt />,
    span: 'lg:col-span-7',
    tone: 'bg-void text-paper',
    artBox: 'aspect-square right-[3%] top-[4%] w-[26%] sm:w-[34%] max-w-[20rem] text-flare',
    titleSize: 'text-[min(20cqw,11rem)]',
    rule: 'border-paper',
  },
  'voice-assistants': {
    art: <VoiceArt />,
    span: 'lg:col-span-12',
    tone: 'bg-flare text-void',
    artBox: 'left-[9.5rem] sm:left-[15rem] right-5 top-8 h-[5.5rem] sm:h-[9rem]',
    titleSize: 'text-[min(14cqw,15rem)]',
    rule: 'border-void',
  },
};

const TrackPanel: React.FC<{ track: Track; onRsvp: () => void; index: number }> = ({ track, onRsvp, index }) => {
  const [open, setOpen] = useState(false);
  const panelId = `track-${track.id}`;
  const look = LOOK[track.id];
  const cardRef = useRef<HTMLElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  // The title rests over the description, so it needs to know how tall the description is.
  useEffect(() => {
    const card = cardRef.current;
    const reveal = revealRef.current;
    if (!card || !reveal) return;
    const observer = new ResizeObserver(() => card.style.setProperty('--reveal-h', `${reveal.offsetHeight}px`));
    observer.observe(reveal);
    return () => observer.disconnect();
  }, []);

  return (
    <Reveal delay={index % 2 ? 0.08 : 0} className={`col-span-12 ${look.span} flex`}>
      <article
        ref={cardRef}
        data-cursor="arena"
        className={`@container group relative overflow-hidden w-full flex flex-col p-5 sm:p-8 min-h-[30rem] ${open ? 'is-open' : ''} ${look.tone}`}
      >
        <div className={`track-art absolute pointer-events-none ${look.artBox}`} aria-hidden="true">
          {look.art}
        </div>

        <div className="relative">
          <div className="track-number display text-[clamp(5rem,20cqw,9rem)]" aria-hidden="true">
            {track.number}
          </div>
          <p className="label mt-3 max-w-[62cqw]">{track.tagline}</p>
        </div>

        <div className="relative mt-auto pt-8">
          <h3 className={`track-title relative z-10 display ${look.titleSize}`}>
            {track.titleLines.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </h3>
          <div ref={revealRef} className="track-reveal">
            <p className="body-copy mt-4 font-medium">{track.description}</p>
            <ul className="flex flex-wrap gap-2 mt-5" aria-label="Recommended tools">
              {track.tools.map((tool) => (
                <li key={tool} className={`label border px-2.5 py-1 normal-case ${look.rule}`}>
                  {tool}
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => {
              playSfx('click');
              setOpen(!open);
            }}
            className={`label mt-6 w-full min-h-12 flex items-center justify-between border-t cursor-pointer ${look.rule}`}
          >
            {open ? 'Hide details' : 'Show details'}
            {open ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <m.div
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
                    <ul className="mt-2 text-body leading-relaxed font-medium">
                      {track.focusAreas.map((a) => (
                        <li key={a}>{a}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="label">Example build</p>
                    <p className="mt-2 text-body leading-snug font-medium">{track.sampleProject}</p>
                    <p className="mt-2 text-body leading-snug">You are free to propose your own problem.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onRsvp}
                  className={`label mt-3 min-h-12 px-4 border-2 cursor-pointer ${look.rule}`}
                >
                  Register now
                </button>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </article>
    </Reveal>
  );
};

export const Tracks: React.FC<TracksProps> = ({ onRegister }) => (
  <section id="tracks" className="section bg-void text-paper">
    <div className="wrap">
      <SectionHead
        id="tracks"
        title={['Five tracks.', 'Pick one.']}
        intro={<p>Choose the domain that excites you, form a team, and build working software.</p>}
      />
      <div className="grid grid-cols-12 gap-px bg-paper/30 border border-paper/30">
        {TRACKS.map((track, i) => (
          <TrackPanel key={track.id} track={track} index={i} onRsvp={onRegister} />
        ))}
      </div>
    </div>
  </section>
);
