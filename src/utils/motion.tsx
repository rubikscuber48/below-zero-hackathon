import React from 'react';
import { m } from 'motion/react';

export const easeSnappy = [0.16, 1, 0.3, 1] as const;
export const easeCinematic = [0.22, 1, 0.36, 1] as const;

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  delay?: number;
  duration?: number;
  className?: string;
  viewportMargin?: string;
}

/** Fades content in the first time it scrolls into view. */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.65,
  className = '',
  viewportMargin = '-60px',
}) => {
  const getInitial = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: 32 };
      case 'down':
        return { opacity: 0, y: -32 };
      case 'left':
        return { opacity: 0, x: -36 };
      case 'right':
        return { opacity: 0, x: 36 };
      case 'scale':
        return { opacity: 0, scale: 0.92 };
      default:
        return { opacity: 0, y: 32 };
    }
  };

  return (
    <m.div
      className={className}
      initial={getInitial()}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: viewportMargin as never }}
      transition={{
        duration,
        delay,
        ease: easeSnappy,
      }}
    >
      {children}
    </m.div>
  );
};

export const Reveal = ScrollReveal;

/** Letters that rise into place one after another. */
interface CharacterRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export const CharacterReveal: React.FC<CharacterRevealProps> = ({
  text,
  className = '',
  delay = 0.1,
  stagger = 0.04,
}) => {
  const chars = Array.from(text);

  return (
    <m.span
      className={`inline-block overflow-hidden ${className}`}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
    >
      {chars.map((char, index) => (
        <span key={index} className="inline-block overflow-hidden">
          <m.span
            className="inline-block"
            variants={{
              hidden: { y: '110%', opacity: 0 },
              visible: {
                y: '0%',
                opacity: 1,
                transition: {
                  duration: 0.7,
                  ease: easeCinematic,
                },
              },
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </m.span>
        </span>
      ))}
    </m.span>
  );
};
