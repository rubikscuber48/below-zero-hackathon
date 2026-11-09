import React from 'react';
import { motion, useScroll, useTransform, useInView, Variants, HTMLMotionProps } from 'motion/react';

// Coherent Easing & Transitions
export const easeSnappy = [0.16, 1, 0.3, 1] as const;
export const easeCinematic = [0.22, 1, 0.36, 1] as const;
export const easeBounceSubtle = [0.34, 1.56, 0.64, 1] as const;

export const springTactile = {
  type: 'spring',
  stiffness: 400,
  damping: 30,
};

export const springCard = {
  type: 'spring',
  stiffness: 300,
  damping: 24,
};

// Container Stagger Variants
export const containerStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const containerStaggerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.1,
    },
  },
};

// Item Reveal Variants
export const itemFadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: easeSnappy,
    },
  },
};

export const itemFadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: easeCinematic,
    },
  },
};

export const itemSlideLeft: Variants = {
  hidden: { opacity: 0, x: -35 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: easeSnappy,
    },
  },
};

export const itemSlideRight: Variants = {
  hidden: { opacity: 0, x: 35 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: easeSnappy,
    },
  },
};

// Masked Reveal Heading Component
interface MaskedHeadingProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const MaskedHeading: React.FC<MaskedHeadingProps> = ({
  children,
  className = '',
  delay = 0,
}) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '115%', opacity: 0.2 }}
        whileInView={{ y: '0%', opacity: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{
          duration: 0.85,
          delay,
          ease: easeCinematic,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// Word-by-Word Reveal Component
interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export const WordReveal: React.FC<WordRevealProps> = ({
  text,
  className = '',
  delay = 0,
}) => {
  const words = text.split(' ');

  return (
    <motion.span
      className={`inline-flex flex-wrap gap-x-[0.28em] ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.04,
            delayChildren: delay,
          },
        },
      }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '100%', opacity: 0 },
              visible: {
                y: '0%',
                opacity: 1,
                transition: {
                  duration: 0.55,
                  ease: easeSnappy,
                },
              },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

// Viewport Scroll Reveal Wrapper
interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  delay?: number;
  duration?: number;
  className?: string;
  viewportMargin?: string;
}

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
    <motion.div
      className={className}
      initial={getInitial()}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: viewportMargin as any }}
      transition={{
        duration,
        delay,
        ease: easeSnappy,
      }}
    >
      {children}
    </motion.div>
  );
};

export const Reveal = ScrollReveal;

// Interactive Tactile Button with Spring Physics
interface TactileButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
  className?: string;
  stickerColor?: 'red' | 'white' | 'yellow' | 'black';
}

export const TactileButton: React.FC<TactileButtonProps> = ({
  children,
  className = '',
  onClick,
  stickerColor = 'red',
  type = 'button',
  ...props
}) => {
  const getShadowClass = () => {
    switch (stickerColor) {
      case 'red':
        return 'sticker-shadow-red';
      case 'white':
        return 'sticker-shadow-white';
      case 'yellow':
        return 'sticker-shadow-yellow';
      case 'black':
        return 'sticker-shadow-black';
    }
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{
        x: -3,
        y: -3,
        transition: { type: 'spring', stiffness: 500, damping: 20 },
      }}
      whileTap={{
        x: 3,
        y: 3,
        transition: { type: 'spring', stiffness: 500, damping: 20 },
      }}
      className={`cursor-pointer ${getShadowClass()} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

// Smooth Animated Number Counter for Viewport Entry
interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  prefix = '',
  suffix = '',
  duration = 1.4,
  className = '',
}) => {
  const [display, setDisplay] = React.useState(0);
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  React.useEffect(() => {
    if (!isInView) return;
    let startTimestamp: number | null = null;
    let frameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(Math.floor(eased * value));

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setDisplay(value);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{display.toLocaleString()}{suffix}
    </span>
  );
};

// Character-by-character Hero Headline Reveal
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
    <motion.span
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
          <motion.span
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
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

// Cinematic Text Reveal combining masked clipping, vertical movement, and blur decrease
interface CinematicTextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down';
}

export const CinematicTextReveal: React.FC<CinematicTextRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}) => {
  const initialY = direction === 'up' ? 36 : -36;

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: initialY, opacity: 0, filter: 'blur(10px)' }}
        whileInView={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{
          duration: 0.85,
          delay,
          ease: easeCinematic,
        }}
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
};

// 3D Pointer-Responsive Tilt Panel with subtle spring interpolation
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 7,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = React.useState(0);
  const [rotateY, setRotateY] = React.useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only apply on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -maxTilt;
    const rotY = ((x - centerX) / centerX) * maxTilt;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    onMouseLeave?.();
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 24,
      }}
      style={{
        transformStyle: 'preserve-3d',
        transformPerspective: 1000,
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};


