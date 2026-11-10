import React, { useState } from 'react';
import { m, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { playSfx } from '../utils/audio';
import { scrollToSection } from '../utils/scroll';
import { setActiveSection, useActiveSection } from '../hooks/useActiveSection';
import type { SectionId } from '../data/sections';
import lostInStarsLogo from '../assets/lost_in_stars_logo.webp';

const NAV_LINKS: { name: string; href: string; id: SectionId }[] = [
  { name: 'Tracks', href: '#tracks', id: 'tracks' },
  { name: 'About', href: '#manifesto', id: 'manifesto' },
  { name: 'Schedule', href: '#process', id: 'process' },
  { name: 'FAQ', href: '#faq', id: 'faq' },
];

interface NavbarProps {
  onRegisterClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onRegisterClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 25,
    restDelta: 0.001,
  });

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: SectionId) => {
    e.preventDefault();
    playSfx('click');
    setActiveSection(id);
    const scroll = () => scrollToSection(href);
    if (mobileMenuOpen) {
      // Wait for the menu to finish collapsing, or the layout shift cancels the scroll.
      setMobileMenuOpen(false);
      setTimeout(scroll, 340);
    } else {
      scroll();
    }
  };

  const handlePrimary = () => {
    playSfx('click');
    setMobileMenuOpen(false);
    onRegisterClick();
  };

  return (
    <header className="sticky top-0 z-50 bg-void text-paper border-b border-paper/30">
      <m.div style={{ scaleX }} className="absolute left-0 right-0 bottom-[-1px] h-[2px] bg-flare origin-left" aria-hidden="true" />
      <div className="wrap h-16 flex items-center justify-between gap-6">
        <a href="#hero" onClick={(e) => handleNavClick(e, '#hero', 'hero')} className="flex items-center gap-3 shrink-0">
          <img src={lostInStarsLogo} alt="Lost in Stars" width={44} height={44} className="w-11 h-11 rounded-full" />
          <span className="display hidden min-[360px]:inline text-d1 leading-none whitespace-nowrap">Below Zero</span>
        </a>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
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
          <button
            type="button"
            onClick={handlePrimary}
            data-magnetic
            className="press display hidden md:inline-flex items-center text-ui bg-sun text-void h-11 px-4 ml-2 cursor-pointer whitespace-nowrap hover:bg-paper transition-colors"
          >
            Register
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
            className="md:hidden ml-1 w-11 h-11 flex items-center justify-center cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <m.div
            id="mobile-menu"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden border-t border-paper/30 max-h-[calc(100svh-4rem)] overflow-y-auto"
          >
            <nav aria-label="Mobile" className="wrap py-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.id)}
                  className="display text-d3 flex items-center min-h-14 border-b border-paper/20"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
};
