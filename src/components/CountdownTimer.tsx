import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, Check } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer: React.FC<{ onRsvpClick?: () => void }> = ({ onRsvpClick }) => {
  // Target: Mid-November 2026 (November 14, 2026 09:00:00 AM IST)
  const targetDate = new Date('2026-11-14T09:00:00+05:30').getTime();

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [calendarSaved, setCalendarSaved] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const title = encodeURIComponent('BELOW ZERO 2026 — 24-Hour Student Hackathon');
  const details = encodeURIComponent(
    'BELOW ZERO organized by LOST IN STARS. Offline 24h Hackathon for Classes 8-12. Tracks: AI Model Making, Web Dev, Game Dev, AI Agents, Voice Assistants. Contact: official.lostinstars@gmail.com'
  );
  const location = encodeURIComponent('Delhi NCR In-Person Arena (TBA)');
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261114T033000Z/20261115T033000Z&details=${details}&location=${location}`;

  const padZero = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="border-2 border-[#FF1744] bg-[#F7F5EF] p-4 sm:p-5 sticker-shadow-red relative">
      {/* Header Tag */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/20 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF1744] animate-ping" />
          <span className="font-mono-tech text-xs tracking-wider text-[#FFD633] uppercase font-bold">
            COUNTDOWN TO ARENA LAUNCH
          </span>
        </div>
        <div className="font-mono-tech text-[10px] text-[#111111]/60 tracking-wider">
          MID NOVEMBER 2026 // 24-HOUR SPRINT
        </div>
      </div>

      {/* Numerical Counter Grid with Spring Bounce */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center mb-4">
        {[
          { label: 'DAYS', value: timeLeft.days },
          { label: 'HOURS', value: timeLeft.hours },
          { label: 'MINUTES', value: timeLeft.minutes },
          { label: 'SECONDS', value: timeLeft.seconds },
        ].map((item, idx) => (
          <div
            key={item.label}
            className="border border-black/30 p-2 sm:p-3 bg-[#F7F5EF] flex flex-col items-center justify-center relative overflow-hidden group"
          >
            <div className="font-display text-2xl sm:text-4xl text-[#111111] group-hover:text-[#FFD633] transition-colors leading-none tracking-tight">
              {padZero(item.value)}
            </div>
            <div className="font-mono-tech text-[9px] sm:text-[10px] text-[#111111]/60 mt-1 uppercase tracking-wider">
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* Action Footer */}
      <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-tech text-[#111111]/70">
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-[#FFD633]" />
          <span>DOORS OPEN 08:30 AM IST</span>
        </div>

        <a
          href={googleCalendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            setCalendarSaved(true);
            setTimeout(() => setCalendarSaved(false), 4000);
          }}
          className="border border-black/40 hover:border-[#FFD633] hover:text-[#FFD633] px-3 py-1.5 transition-colors flex items-center gap-1.5 cursor-pointer text-[11px]"
        >
          {calendarSaved ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-400">CALENDAR OPENED</span>
            </>
          ) : (
            <>
              <Calendar className="w-3.5 h-3.5 text-[#FF1744]" />
              <span>SAVE TO GOOGLE CALENDAR</span>
            </>
          )}
        </a>
      </div>
    </div>
  );
};
