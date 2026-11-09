import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { EVENT, SOCIALS } from '../data/event';
import logo from '../assets/lost_in_stars_logo.webp';
import { easeSnappy } from '../utils/motion';

export const Footer: React.FC = () => {
  const [legalModalContent, setLegalModalContent] = useState<'privacy' | 'terms' | null>(null);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Manifesto', href: '#manifesto' },
    { name: 'Tracks', href: '#tracks' },
    { name: 'Timeline', href: '#process' },
    { name: 'Judging', href: '#judging' },
    { name: 'Experience', href: '#experience' },
    { name: 'Prizes', href: '#prizes' },
    { name: 'Sponsors', href: '#sponsors' },
    { name: 'Team', href: '#team' },
    { name: 'FAQ', href: '#faq' },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const elem = document.querySelector(href);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-void text-paper">
      <div className="wrap pt-14 pb-8">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 lg:col-span-5">
            <div className="flex items-center gap-4">
              <img src={logo} alt="Lost in Stars logo" loading="lazy" width={80} height={80} className="w-20 h-20 rounded-full" />
              <p className="label">Organized by Lost in Stars</p>
            </div>
            <p className="display text-[clamp(3rem,5vw,5rem)] mt-5">
              Lost ideas,
              <br />
              found innovation.
            </p>
          </div>

          <nav aria-label="Footer" className="col-span-6 lg:col-span-3">
            <h2 className="label text-sun">Navigation</h2>
            <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} onClick={(e) => handleScrollTo(e, link.href)} className="inline-flex items-center min-h-11 font-medium hover:text-sun">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-6 lg:col-span-2">
            <h2 className="label text-sun">Social</h2>
            <ul className="mt-3">
              {SOCIALS.map((s) => (
                <li key={s.name}>
                  <a href={s.href} className="inline-flex items-center min-h-11 font-medium hover:text-sun">
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 lg:col-span-2">
            <h2 className="label text-sun">Contact</h2>
            <a href={`mailto:${EVENT.email}`} className="inline-flex items-center min-h-11 mt-3 font-medium break-all hover:text-sun">
              {EVENT.email}
            </a>
          </div>
        </div>

        <div className="mt-12 pt-4 border-t border-paper/30 flex flex-wrap items-center justify-between gap-x-6 gap-y-1 text-[0.9375rem]">
          <p>© 2026 Lost in Stars</p>
          <div className="flex gap-6">
            <button type="button" onClick={() => setLegalModalContent('privacy')} className="min-h-11 cursor-pointer hover:text-sun">
              Privacy Policy
            </button>
            <button type="button" onClick={() => setLegalModalContent('terms')} className="min-h-11 cursor-pointer hover:text-sun">
              Terms and Conditions
            </button>
          </div>
        </div>
      </div>

      {/* Legal Modal Popup with AnimatePresence */}
      <AnimatePresence>
        {legalModalContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#F7F5EF]/85 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.92, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 15 }}
              transition={{ duration: 0.3, ease: easeSnappy }}
              className="bg-[#F7F5EF] border-2 border-black sticker-shadow-red max-w-xl w-full p-6 text-[#111111] max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-black/20 pb-3 mb-4">
                <h4 className="font-display text-lg text-[#111111] uppercase">
                  {legalModalContent === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
                </h4>
                <button
                  onClick={() => setLegalModalContent(null)}
                  className="p-1 text-[#111111] hover:text-[#FF1744] border border-black/20 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="font-body text-xs text-[#111111]/80 space-y-3 leading-relaxed">
                {legalModalContent === 'privacy' ? (
                  <>
                    <p>
                      Below Zero is committed to protecting the privacy of participating students and their guardians. Information collected through RSVP forms (student names, educational institutions, grades, email addresses) is used strictly for event coordination, team formation, and hackathon communications.
                    </p>
                    <p>
                      We do not sell, rent, or distribute personal information to third-party commercial brokers. All data handling complies with student data privacy ethics. For queries, contact official.lostinstars@gmail.com.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Participation in BELOW ZERO is open to registered students in Classes 8 through 12. All participants must agree to the Hackathon Code of Conduct: fostering an inclusive, collaborative, respectful, and safe physical environment.
                    </p>
                    <p>
                      Projects built during the 24 hours must be original works conceived and created during the event timeline. Intellectual property remains 100% owned by the student creators.
                    </p>
                  </>
                )}
              </div>

              <div className="mt-6 pt-3 border-t border-black/20 text-right">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setLegalModalContent(null)}
                  className="bg-[#FFD633] text-black font-display text-xs px-4 py-2 cursor-pointer"
                >
                  ACKNOWLEDGE
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};
