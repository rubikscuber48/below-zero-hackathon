import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import logo from '../assets/lost_in_stars_logo.webp';

interface CinematicIntroProps {
  /** Called as the curtain starts to lift, so the hero can animate in behind it. */
  onComplete: () => void;
}

const SESSION_KEY = 'bz_intro_seen_v1';

const hasSeenIntro = () => {
  try {
    return Boolean(sessionStorage.getItem(SESSION_KEY));
  } catch {
    return false;
  }
};

const markIntroSeen = () => {
  try {
    sessionStorage.setItem(SESSION_KEY, 'true');
  } catch {
    // Storage can be unavailable in private modes. The intro just plays again.
  }
};

const ease = [0.16, 1, 0.3, 1] as const;

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(() => !hasSeenIntro() && !reduceMotion);
  const notify = useRef(onComplete);
  notify.current = onComplete;

  const finish = useRef(() => {});
  finish.current = () => {
    markIntroSeen();
    setVisible(false);
    notify.current();
  };

  useEffect(() => {
    if (!visible) {
      notify.current();
      return;
    }
    const timer = setTimeout(() => finish.current(), 1700);
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === 'Escape') finish.current();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', onKey);
    };
    // Runs once on first load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[60] bg-paper text-void flex flex-col items-center justify-center select-none overflow-hidden"
          exit={{ y: '-100%', transition: { duration: 0.75, ease: [0.77, 0, 0.175, 1] } }}
        >
          <button
            type="button"
            onClick={() => finish.current()}
            className="label absolute top-5 right-5 min-h-11 px-3 border border-void/30 hover:border-void cursor-pointer"
          >
            Skip intro
          </button>

          <div className="relative flex flex-col items-center text-center px-5">
            <motion.div
              initial={{ scale: 0.6, opacity: 0, rotate: -30 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.6, ease }}
              className="relative mb-6"
            >
              <img src={logo} alt="" width={112} height={112} className="w-24 h-24 sm:w-28 sm:h-28 rounded-full" />
              <motion.div
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 1.8, opacity: 0 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
                className="absolute inset-0 rounded-full border-2 border-flare"
              />
            </motion.div>

            <div className="overflow-hidden mb-2">
              <motion.p
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.4, delay: 0.3, ease }}
                className="label"
              >
                Lost in Stars presents
              </motion.p>
            </div>

            <div className="overflow-hidden pr-2 pb-2">
              <motion.p
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease }}
                className="display whitespace-nowrap text-[18vw] sm:text-[13vw] 2xl:text-[12rem] [filter:drop-shadow(4px_4px_0_#FF1744)]"
              >
                Below Zero
              </motion.p>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.85 }}
              className="mt-2 text-[1.125rem] font-semibold"
            >
              Lost ideas, found innovation.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="label absolute bottom-6 inset-x-5 flex items-center justify-between gap-4"
          >
            <span>14 November 2026</span>
            <span className="hidden sm:inline">24-hour sprint</span>
            <span>Classes 8–12</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
