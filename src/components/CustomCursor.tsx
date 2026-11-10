import React, { useEffect, useState } from 'react';
import { m, useSpring, useMotionValue } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [cursorState, setCursorState] = useState<'default' | 'pointer' | 'card' | 'text'>('default');
  const [cursorLabel, setCursorLabel] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Lead cursor spring physics (crisp and immediate)
  const springX = useSpring(mouseX, { stiffness: 500, damping: 28, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 28, mass: 0.4 });

  // Trailing follow shadow spring physics (soft, inertial lag that feels connected to hand movement)
  const trailSpringX = useSpring(mouseX, { stiffness: 180, damping: 22, mass: 0.8 });
  const trailSpringY = useSpring(mouseY, { stiffness: 180, damping: 22, mass: 0.8 });

  useEffect(() => {
    // Detect touch device (disable custom cursor on touch/mobile)
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check for arena/card hover
      const arenaCard = target.closest('[data-cursor="arena"]');
      if (arenaCard) {
        setCursorState('card');
        setCursorLabel('TARGET');
        return;
      }

      // Check for interactive buttons or links
      const clickable = target.closest('button, a, input, [role="button"], [data-cursor="pointer"]');
      if (clickable) {
        setCursorState('pointer');
        setCursorLabel('');
        return;
      }

      // Check for headings/text
      const textElement = target.closest('h1, h2, h3, .font-display');
      if (textElement) {
        setCursorState('text');
        setCursorLabel('');
        return;
      }

      setCursorState('default');
      setCursorLabel('');
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouch || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none">
      {/* 1. Trailing Inertial Follow Shadow / Kinetic Halo */}
      <m.div
        style={{
          x: trailSpringX,
          y: trailSpringY,
        }}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center will-change-transform"
      >
        {cursorState === 'default' && (
          <div className="w-9 h-9 border border-flare/40 rounded-full bg-flare/10 transition-transform duration-150 shadow-[0_0_12px_color-mix(in_srgb,var(--color-flare)_25%,transparent)]" />
        )}

        {cursorState === 'pointer' && (
          <div className="w-14 h-14 border-2 border-sun/60 bg-sun/15 sticker-shadow-red transition-all duration-200" />
        )}

        {cursorState === 'card' && (
          <div className="w-20 h-10 border border-flare/60 bg-flare/15 transition-all duration-200" />
        )}

        {cursorState === 'text' && (
          <div className="w-3 h-8 bg-sun/20 border border-sun/40" />
        )}
      </m.div>

      {/* 2. Primary Neo-Brutalist Lead Cursor */}
      <m.div
        style={{
          x: springX,
          y: springY,
        }}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center will-change-transform"
      >
        {cursorState === 'default' && (
          <div className="relative flex items-center justify-center">
            {/* Center solid precision dot */}
            <div className="w-2.5 h-2.5 bg-flare border border-void shadow-[1px_1px_0px_var(--color-paper)]" />
            {/* Inner crosshair notch */}
            <div className="absolute w-5 h-5 border border-void/60 pointer-events-none" />
          </div>
        )}

        {cursorState === 'pointer' && (
          <m.div
            initial={{ scale: 0.6, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            className="w-10 h-10 border-2 border-sun bg-flare flex items-center justify-center sticker-shadow-black"
          >
            <div className="w-2 h-2 bg-paper" />
          </m.div>
        )}

        {cursorState === 'card' && (
          <m.div
            initial={{ scale: 0.7 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 450, damping: 22 }}
            className="px-3 py-1 border-2 border-flare bg-paper sticker-shadow-yellow flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 bg-flare animate-ping" />
            <span className="font-mono-tech text-label font-bold uppercase tracking-widest text-sun">
              {cursorLabel || 'ARENA'}
            </span>
          </m.div>
        )}

        {cursorState === 'text' && (
          <m.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            className="w-1 h-7 bg-flare shadow-[0_0_8px_var(--color-flare)]"
          />
        )}
      </m.div>
    </div>
  );
};
