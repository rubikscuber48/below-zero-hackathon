import React, { Suspense, useState } from 'react';
import { EVENT, SOCIALS } from '../data/event';
import { SECTIONS } from '../data/sections';
import { isSoundEnabled, toggleSound } from '../utils/audio';
import logo from '../assets/lost_in_stars_logo.webp';
import { safeLazy } from '../utils/safeLazy';
import { scrollToSection } from '../utils/scroll';
import type { LegalKind } from './LegalDialog';

const LegalDialog = safeLazy(() => import('./LegalDialog').then((mod) => mod.LegalDialog));

const FOOTER_LINKS = SECTIONS.filter((s) => s.id !== 'hero');

export const Footer: React.FC = () => {
  const [legal, setLegal] = useState<LegalKind | null>(null);
  const [legalOpened, setLegalOpened] = useState(false);
  const [soundOn, setSoundOn] = useState(isSoundEnabled);
  const liveSocials = SOCIALS.filter((link) => link.href);

  const openLegal = (kind: LegalKind) => {
    setLegalOpened(true);
    setLegal(kind);
  };

  return (
    <footer className="bg-void text-paper">
      <div className="wrap pt-14 pb-8">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 lg:col-span-5">
            <p className="display text-d4">Below Zero</p>
            <p className="body-copy mt-2">Lost ideas, found innovation.</p>
            <div className="flex items-center gap-3 mt-5">
              <img src={logo} alt="Lost in Stars logo" loading="lazy" width={56} height={56} className="w-14 h-14 rounded-full" />
              <p className="label">Organized by Lost in Stars</p>
            </div>
          </div>

          <nav aria-label="Footer" className="col-span-6 lg:col-span-3">
            <h2 className="label text-sun">Navigation</h2>
            <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(`#${link.id}`);
                    }}
                    className="inline-flex items-center min-h-11 font-medium hover:text-sun"
                  >
                    {'short' in link ? link.short : link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {liveSocials.length > 0 && (
            <div className="col-span-6 lg:col-span-2">
              <h2 className="label text-sun">Social</h2>
              <ul className="mt-3">
                {liveSocials.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center min-h-11 font-medium hover:text-sun">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="col-span-12 lg:col-span-2">
            <h2 className="label text-sun">Contact</h2>
            <a href={`mailto:${EVENT.email}`} className="inline-flex items-center min-h-11 mt-3 font-medium [overflow-wrap:anywhere] hover:text-sun">
              <span>
                {EVENT.email.split('@')[0]}
                <wbr />@{EVENT.email.split('@')[1]}
              </span>
            </a>
          </div>
        </div>

        <div className="mt-12 pt-4 border-t border-paper/30 flex flex-wrap items-center justify-between gap-x-6 gap-y-1 text-body">
          <p>© 2026 Lost in Stars</p>
          <div className="flex flex-wrap gap-x-6">
            <button
              type="button"
              aria-pressed={soundOn}
              onClick={() => setSoundOn(toggleSound())}
              className="min-h-11 cursor-pointer hover:text-sun"
            >
              Sounds {soundOn ? 'on' : 'off'}
            </button>
            <button type="button" onClick={() => openLegal('privacy')} className="min-h-11 cursor-pointer hover:text-sun">
              Privacy Policy
            </button>
            <button type="button" onClick={() => openLegal('terms')} className="min-h-11 cursor-pointer hover:text-sun">
              Terms and Conditions
            </button>
          </div>
        </div>
      </div>

      {legalOpened && (
        <Suspense fallback={null}>
          <LegalDialog kind={legal} onClose={() => setLegal(null)} />
        </Suspense>
      )}
    </footer>
  );
};
