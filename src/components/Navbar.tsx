import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Menu, X, Volume2, VolumeX, Music, Ticket } from 'lucide-react';
import { isSoundEnabled, toggleSound, playSfx } from '../utils/audio';
import { ambientMusic } from '../utils/ambientMusic';
import lostInStarsLogo from '../assets/lost_in_stars_logo.jpg';

interface NavbarProps {
  onRegisterClick: () => void;
  isRegistered: boolean;
  onPassFinderClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onRegisterClick,
  isRegistered,
  onPassFinderClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('manifesto');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 25,
    restDelta: 0.001,
  });

  const navLinks = [
    { name: 'Manifesto', href: '#manifesto', id: 'manifesto' },
    { name: 'Tracks', href: '#tracks', id: 'tracks' },
    { name: 'Timeline', href: '#process', id: 'process' },
    { name: 'Judging', href: '#judging', id: 'judging' },
    { name: 'Prizes', href: '#prizes', id: 'prizes' },
    { name: 'Sponsors', href: '#sponsors', id: 'sponsors' },
    { name: 'Team', href: '#team', id: 'team' },
    { name: 'FAQ', href: '#faq', id: 'faq' },
  ];

  useEffect(() => {
    setSoundOn(isSoundEnabled());
    const unsub = ambientMusic.subscribe((playing) => {
      setMusicPlaying(playing);
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Section scroll observer for active indicator
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-48% 0px -50% 0px' }
    );

    navLinks.forEach((link) => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });

    return () => {
      unsub();
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleToggleSound = () => {
    const newState = toggleSound();
    setSoundOn(newState);
  };

  const handleToggleMusic = () => {
    playSfx('click');
    ambientMusic.toggle();
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    e.preventDefault();
    playSfx('click');
    setActiveSection(id);
    const scroll = () => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    if (mobileMenuOpen) {
      // Wait for the menu to finish collapsing, or the layout shift cancels the scroll.
      setMobileMenuOpen(false);
      setTimeout(scroll, 340);
    } else {
      scroll();
    }
  };

  const primaryLabel = isRegistered ? 'View pass' : 'Register';
  const handlePrimary = () => {
    playSfx('click');
    setMobileMenuOpen(false);
    isRegistered ? onPassFinderClick() : onRegisterClick();
  };
  const iconBtn = 'w-11 h-11 flex items-center justify-center cursor-pointer hover:text-sun transition-colors';

  return (
    <header className="sticky top-0 z-50 bg-void text-paper border-b border-paper/30">
      <motion.div style={{ scaleX }} className="absolute left-0 right-0 bottom-[-1px] h-[2px] bg-flare origin-left" aria-hidden="true" />
      <div className="wrap h-16 flex items-center justify-between gap-6">
        <a href="#hero" onClick={(e) => handleNavClick(e, '#hero', 'hero')} className="flex items-center gap-3 shrink-0">
          <img src={lostInStarsLogo} alt="Lost in Stars" width={44} height={44} className="w-11 h-11 rounded-full" />
          <span className="display text-[1.75rem] leading-none whitespace-nowrap">Below Zero</span>
        </a>

        <nav aria-label="Primary" className="hidden xl:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              aria-current={activeSection === link.id ? 'location' : undefined}
              onClick={(e) => handleNavClick(e, link.href, link.id)}
              className={`label py-2 border-b-2 transition-colors hover:text-sun ${
                activeSection === link.id ? 'border-flare' : 'border-transparent'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button type="button" onClick={handleToggleMusic} aria-pressed={musicPlaying} aria-label="Ambient music" className={`hidden xl:flex ${iconBtn} ${musicPlaying ? 'text-sun' : ''}`}>
            <Music className="w-5 h-5" />
          </button>
          <button type="button" onClick={handleToggleSound} aria-pressed={soundOn} aria-label="Interface sounds" className={`hidden xl:flex ${iconBtn}`}>
            {soundOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
          <button
            type="button"
            onClick={handlePrimary}
            className="display text-[1.25rem] leading-none bg-sun text-void h-11 px-4 ml-2 cursor-pointer whitespace-nowrap hover:bg-paper transition-colors inline-flex items-center gap-2"
          >
            {isRegistered && <Ticket className="w-4 h-4" />}
            {primaryLabel}
          </button>
          <button
            type="button"
            onClick={() => {
              playSfx('click');
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            className={`xl:hidden ml-1 ${iconBtn}`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="xl:hidden overflow-hidden border-t border-paper/30 max-h-[calc(100svh-4rem)] overflow-y-auto"
          >
            <nav aria-label="Mobile" className="wrap py-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.id)}
                  className="display text-[2.75rem] flex items-center min-h-14 border-b border-paper/20"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex gap-2 pt-3">
                <button type="button" onClick={handleToggleMusic} aria-pressed={musicPlaying} className="label min-h-12 flex-1 border border-paper/40 inline-flex items-center justify-center gap-2">
                  <Music className="w-4 h-4" /> Music {musicPlaying ? 'on' : 'off'}
                </button>
                <button type="button" onClick={handleToggleSound} aria-pressed={soundOn} className="label min-h-12 flex-1 border border-paper/40 inline-flex items-center justify-center gap-2">
                  {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />} Sounds {soundOn ? 'on' : 'off'}
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
