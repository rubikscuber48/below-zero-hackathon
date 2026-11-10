import React, { useEffect, useState } from 'react';
import { EVENT } from '../data/event';

const UNITS = [
  { label: 'Days', ms: 86400000 },
  { label: 'Hrs', ms: 3600000 },
  { label: 'Min', ms: 60000 },
  { label: 'Sec', ms: 1000 },
];

/** Compact live countdown. Shows nothing without a confirmed date, or once the event has started. */
export const CountdownTimer: React.FC<{ className?: string }> = ({ className = '' }) => {
  const target = EVENT.confirmedStart ? new Date(EVENT.confirmedStart).getTime() : 0;
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!target) return;
    const interval = setInterval(() => {
      const current = Date.now();
      setNow(current);
      if (current >= target) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [target]);

  let remaining = target - now;
  if (!target || remaining <= 0) return null;

  const parts = UNITS.map((unit) => {
    const value = Math.floor(remaining / unit.ms);
    remaining -= value * unit.ms;
    return { label: unit.label, value: String(value).padStart(2, '0') };
  });

  return (
    <div role="timer" aria-label="Time until BELOW ZERO starts" className={`flex items-baseline gap-3 sm:gap-4 ${className}`}>
      {parts.map((part) => (
        <span key={part.label} className="flex items-baseline gap-1">
          <span className="display text-d1 leading-none tabular-nums text-sun">{part.value}</span>
          <span className="label">{part.label}</span>
        </span>
      ))}
    </div>
  );
};

const toCalendarTime = (iso: string) => new Date(iso).toISOString().replace(/[-:]|\.\d{3}/g, '');

/** Link that opens the event pre-filled in Google Calendar. */
export const calendarUrl = () => {
  if (!EVENT.confirmedStart || !EVENT.confirmedEnd) return '';
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: 'BELOW ZERO: 24-hour student hackathon',
    dates: `${toCalendarTime(EVENT.confirmedStart)}/${toCalendarTime(EVENT.confirmedEnd)}`,
    details: `Organized by Lost in Stars. Register: ${EVENT.registrationUrl}`,
    location: 'Delhi NCR',
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};
