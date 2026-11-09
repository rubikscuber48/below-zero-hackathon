import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LostInStarsEmblem } from './LostInStarsLogo';

interface CinematicIntroProps {
  onComplete: () => void;
}

const SESSION_KEY = 'bz_intro_seen_v1';

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'shutter' | 'emblem' | 'title' | 'exit'>('shutter');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // If user has already seen it in this session, make it ultra brief or complete immediately
    const seen = sessionStorage.getItem(SESSION_KEY);
    if (seen) {
      setIsDone(true);
      onComplete();
      return;
    }

    // Choreographed 1.8s Cinematic Sequence
    const t1 = setTimeout(() => setPhase('emblem'), 200);
    const t2 = setTimeout(() => setPhase('title'), 700);
    const t3 = setTimeout(() => setPhase('exit'), 1500);
    const t4 = setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setIsDone(true);
      onComplete();
    }, 2000);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === 'Escape') {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
        sessionStorage.setItem(SESSION_KEY, 'true');
        setIsDone(true);
        onComplete();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  const handleSkip = () => {
    sessionStorage.setItem(SESSION_KEY, 'true');
    setIsDone(true);
    onComplete();
  };

  if (isDone) return null;

  return (
    <AnimatePresence>
      {phase !== 'exit' ? (
        <motion.div
          key="intro-screen"
          className="fixed inset-0 z-50 bg-[#F7F5EF] flex flex-col items-center justify-center select-none overflow-hidden"
          exit={{
            y: '-100%',
            transition: { duration: 0.75, ease: [0.77, 0, 0.175, 1] },
          }}
        >
          {/* Subtle Technical Grid Lines in Intro */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/40"></div>
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/40"></div>
          </div>

          {/* Top Metadata */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute top-8 left-8 right-8 flex items-center justify-between font-mono-tech text-[11px] text-[#111111]/70"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#FF1744] inline-block animate-ping"></span>
              <span className="text-[#FFD633] font-bold">LOST IN STARS</span>
              <span>// SYS.2026.INIT</span>
            </div>
            <button
              onClick={handleSkip}
              className="text-[#111111]/60 hover:text-[#111111] border border-black/20 hover:border-black px-2 py-0.5 tracking-wider transition-colors cursor-pointer"
            >
              SKIP [ESC]
            </button>
          </motion.div>

          {/* Center Stage Animation */}
          <div className="relative flex flex-col items-center justify-center text-center z-10 px-4">
            {/* Animated Emblem */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0, rotate: -30 }}
              animate={{
                scale: 1,
                opacity: 1,
                rotate: 0,
                transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
              }}
              className="mb-6 relative"
            >
              <LostInStarsEmblem size={72} />
              {/* Outer pulsing ring */}
              <motion.div
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 1.8, opacity: 0 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
                className="absolute inset-0 rounded-full border-2 border-[#FF1744]"
              />
            </motion.div>

            {/* Sub-label */}
            <div className="overflow-hidden mb-2">
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="font-mono-tech text-xs tracking-[0.3em] text-[#FFD633] uppercase font-bold"
              >
                STUDENT HACKATHON
              </motion.div>
            </div>

            {/* Massive Heading Unveil */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-5xl sm:text-7xl md:text-8xl tracking-tight text-[#111111] uppercase drop-shadow-[4px_4px_0_#FF1744]"
              >
                BELOW ZERO
              </motion.h1>
            </div>

            {/* Tagline Fade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="mt-3 font-heading text-sm sm:text-base font-semibold text-[#111111]/80"
            >
              Lost Ideas, <span className="text-[#FF1744]">Found Innovation.</span>
            </motion.div>
          </div>

          {/* Bottom Coordinate Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="absolute bottom-8 left-8 right-8 flex items-center justify-between font-mono-tech text-[10px] text-[#111111]/50"
          >
            <span>MID-NOV 2026 // 24-HOUR SPRINT</span>
            <span className="text-[#FFD633]">READY TO BUILD</span>
            <span>CLASSES 8–12</span>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
