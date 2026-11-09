import React, { useEffect, useState } from 'react';

const STOPS = [
  { id: 'hero', depth: '0', name: 'Top' },
  { id: 'manifesto', depth: '−01', name: 'Manifesto' },
  { id: 'tracks', depth: '−02', name: 'Tracks' },
  { id: 'process', depth: '−03', name: 'Timeline' },
  { id: 'judging', depth: '−04', name: 'Judging' },
  { id: 'experience', depth: '−05', name: 'Experience' },
  { id: 'prizes', depth: '−06', name: 'Prizes' },
  { id: 'sponsors', depth: '−07', name: 'Sponsors' },
  { id: 'team', depth: '−08', name: 'Team' },
  { id: 'faq', depth: '−09', name: 'FAQ' },
  { id: 'register', depth: '−10', name: 'Register' },
];

const LIGHT = new Set(['manifesto', 'process', 'judging', 'prizes', 'team', 'register']);

/** Thermometer down the page edge: shows how far below zero you are. */
export const DepthGauge: React.FC = () => {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-48% 0px -50% 0px' },
    );
    STOPS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Page sections"
      className={`hidden xl:flex fixed right-3 top-1/2 -translate-y-1/2 z-40 flex-col items-end transition-colors ${LIGHT.has(active) ? 'text-void' : 'text-paper'}`}
    >
      {STOPS.map((s) => {
        const isActive = s.id === active;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-label={s.name}
            aria-current={isActive ? 'location' : undefined}
            className="flex items-center justify-end gap-1.5 h-6 w-12 group/tick"
          >
            {isActive && <span className="text-[11px] font-bold tabular-nums">{s.depth}</span>}
            <span
              className={`block h-[2px] bg-current transition-all duration-300 ${
                isActive ? 'w-4' : 'w-2 opacity-60 group-hover/tick:w-4 group-hover/tick:opacity-100'
              }`}
            />
          </a>
        );
      })}
    </nav>
  );
};
