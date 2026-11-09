import React from 'react';
import lostInStarsLogo from '../assets/lost_in_stars_logo.jpg';
import lostInStarsPoster from '../assets/lost_in_stars_poster.jpg';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const LostInStarsEmblem: React.FC<{ size?: number; className?: string }> = ({
  size = 48,
  className = '',
}) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative shrink-0 rounded-full overflow-hidden border-2 border-[#FF1744] shadow-[0_0_18px_rgba(255,23,68,0.45)] bg-[#F7F5EF] group select-none ${className}`}
    >
      <img
        src={lostInStarsLogo}
        alt="Lost in Stars Logo"
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        loading="eager"
      />
      {/* Subtle glass reflection ring */}
      <div className="absolute inset-0 rounded-full border border-black/25 pointer-events-none" />
    </div>
  );
};

export const LostInStarsLogo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
}) => {
  const pixelSize = size === 'sm' ? 36 : size === 'md' ? 46 : size === 'lg' ? 60 : 76;

  return (
    <div className={`inline-flex items-center gap-3 sm:gap-3.5 select-none ${className}`}>
      <LostInStarsEmblem size={pixelSize} />
      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span className="font-display text-sm tracking-widest text-[#111111] uppercase">
              LOST IN STARS
            </span>
            <span className="inline-block w-1.5 h-1.5 bg-[#FF1744] rotate-45 animate-pulse"></span>
          </div>
          <span className="font-mono-tech text-[10px] tracking-wider text-[#FFD633] uppercase mt-0.5">
            Official Organizer
          </span>
        </div>
      )}
    </div>
  );
};

export const HeroOrbitalGraphic: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full max-w-[520px] aspect-square flex items-center justify-center select-none ${className}`}>
      {/* Outer SVG System with Rotating Rings and Crosshairs */}
      <svg
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_0_2px_#000000]"
      >
        {/* Background dark grid circles */}
        <circle cx="300" cy="300" r="280" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="6 6" />
        <circle cx="300" cy="300" r="240" stroke="#FF1744" strokeWidth="2" strokeOpacity="0.4" />
        <circle cx="300" cy="300" r="190" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.3" />

        {/* Outer Heavy Red Angular Frame Brackets */}
        <path d="M 60 140 L 60 60 L 140 60" stroke="#FF1744" strokeWidth="5" fill="none" />
        <path d="M 540 140 L 540 60 L 460 60" stroke="#FF1744" strokeWidth="5" fill="none" />
        <path d="M 60 460 L 60 540 L 140 540" stroke="#FF1744" strokeWidth="5" fill="none" />
        <path d="M 540 460 L 540 540 L 460 540" stroke="#FF1744" strokeWidth="5" fill="none" />

        {/* Technical crosshairs & axis lines */}
        <line x1="20" y1="300" x2="100" y2="300" stroke="#FFFFFF" strokeWidth="1.5" />
        <line x1="500" y1="300" x2="580" y2="300" stroke="#FFFFFF" strokeWidth="1.5" />
        <line x1="300" y1="20" x2="300" y2="100" stroke="#FFFFFF" strokeWidth="1.5" />
        <line x1="300" y1="500" x2="300" y2="580" stroke="#FFFFFF" strokeWidth="1.5" />

        {/* Outer Orbital Ellipse 1 (White) - Animated Continuous Rotation */}
        <g style={{ transformOrigin: '300px 300px' }} className="animate-spin-slow">
          <ellipse
            cx="300"
            cy="300"
            rx="270"
            ry="90"
            transform="rotate(-26 300 300)"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            fill="none"
          />
          {/* Orbital Node on White Ring */}
          <circle cx="570" cy="300" r="6" fill="#FF1744" stroke="#FFFFFF" strokeWidth="2" />
        </g>

        {/* Outer Orbital Ellipse 2 (Red Accent) - Reverse Rotation */}
        <g style={{ transformOrigin: '300px 300px' }} className="animate-spin-reverse-slow">
          <ellipse
            cx="300"
            cy="300"
            rx="250"
            ry="70"
            transform="rotate(38 300 300)"
            stroke="#FF1744"
            strokeWidth="2.5"
            strokeDasharray="16 8"
            fill="none"
          />
          {/* Orbital Node on Red Ring */}
          <circle cx="50" cy="300" r="5" fill="#FFD633" stroke="#000000" strokeWidth="1.5" />
        </g>

        {/* Big 4-Pointed Sparkle Stars with Shimmer */}
        {/* Top-Right Sparkle */}
        <g style={{ transformOrigin: '470px 175px' }} className="animate-pulse-subtle">
          <path
            d="M 470 150 Q 470 175 495 175 Q 470 175 470 200 Q 470 175 445 175 Q 470 175 470 150 Z"
            fill="#FFFFFF"
          />
        </g>
        {/* Bottom-Left Sparkle */}
        <g style={{ transformOrigin: '130px 445px' }} className="animate-pulse-subtle">
          <path
            d="M 130 420 Q 130 445 155 445 Q 130 445 130 470 Q 130 445 105 445 Q 130 445 130 420 Z"
            fill="#FFFFFF"
          />
        </g>
        {/* Small Yellow Stars */}
        <polygon
          points="150,180 155,192 168,193 158,202 161,215 150,208 139,215 142,202 132,193 145,192"
          fill="#FFD633"
        />
        <polygon
          points="460,420 465,432 478,433 468,442 471,455 460,448 449,455 452,442 442,433 455,432"
          fill="#FFD633"
        />

        {/* Streetwear Typography Badges in SVG */}
        <rect x="75" y="85" width="130" height="26" fill="#000000" stroke="#FFFFFF" strokeWidth="1.5" />
        <text x="85" y="103" fill="#FFFFFF" fontFamily="JetBrains Mono" fontSize="11" fontWeight="bold" letterSpacing="1.5">
          [SYS.24H_CYCLE]
        </text>

        <rect x="380" y="495" width="165" height="26" fill="#000000" stroke="#FF1744" strokeWidth="2" />
        <text x="390" y="513" fill="#FFD633" fontFamily="JetBrains Mono" fontSize="11" fontWeight="bold" letterSpacing="1.5">
          MID_NOV_2026.DELHI
        </text>

        {/* Small Crosshairs */}
        <circle cx="50" cy="50" r="3" fill="#FF1744" />
        <circle cx="550" cy="50" r="3" fill="#FFFFFF" />
        <circle cx="50" cy="550" r="3" fill="#FFFFFF" />
        <circle cx="550" cy="550" r="3" fill="#FF1744" />
      </svg>

      {/* Central Core: The Official Lost in Stars Circular Emblem */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-[#FF1744] shadow-[0_0_50px_rgba(255,23,68,0.55)] bg-[#F7F5EF] z-20 pointer-events-auto group">
          <img
            src={lostInStarsLogo}
            alt="Lost in Stars Official Logo"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          {/* Pulsing radar ping around the core */}
          <div className="absolute inset-0 rounded-full border-2 border-[#FFD633] animate-ping opacity-25 pointer-events-none" />
          <div className="absolute inset-0 rounded-full border border-black/30 pointer-events-none" />
        </div>
      </div>

      {/* Floating Sticker Stamp Top-Right with Organic Float */}
      <div className="absolute -top-4 -right-4 sm:top-2 sm:right-2 bg-[#F7F5EF] border-2 border-[#FF1744] sticker-shadow-red px-3 py-1.5 rotate-6 z-30 animate-float">
        <span className="font-display text-xs text-[#FFD633] tracking-wider block">
          LOST IN STARS
        </span>
        <span className="font-mono-tech text-[9px] text-[#111111] tracking-widest block">
          MID-NOV 2026
        </span>
      </div>

      {/* Floating Sticker Stamp Bottom-Left with Reverse Float */}
      <div className="absolute -bottom-4 -left-4 sm:bottom-4 sm:left-2 bg-[#F7F5EF] border-2 border-black sticker-shadow-white px-3 py-1.5 -rotate-3 z-30 animate-float-reverse">
        <span className="font-mono-tech text-[10px] text-[#FF1744] font-bold tracking-widest block">
          24H // CLASSES 8–12
        </span>
        <span className="font-display text-xs text-[#111111] tracking-wider block">
          STUDENT HACKATHON
        </span>
      </div>
    </div>
  );
};

export const LostInStarsPosterCard: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-full max-w-sm border-2 border-[#FF1744] sticker-shadow-yellow bg-[#F7F5EF] p-2.5 select-none ${className}`}>
      <div className="relative overflow-hidden group">
        <img
          src={lostInStarsPoster}
          alt="Lost in Stars Official Artwork"
          className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/85 to-transparent p-3 text-center">
          <span className="font-mono-tech text-[10px] text-[#FFD633] uppercase font-bold tracking-widest block">
            OFFICIAL ARTWORK
          </span>
          <span className="font-display text-xs text-[#111111] uppercase tracking-wider block mt-0.5">
            LOST IN STARS // BELOW ZERO
          </span>
        </div>
      </div>
    </div>
  );
};
