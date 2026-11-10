/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense, useEffect, useState } from 'react';
import { LazyMotion, MotionConfig, domAnimation } from 'motion/react';
import { Navbar } from './components/Navbar';
import { DepthGauge, MobileRegisterBar } from './components/DepthGauge';
import { SystemTicker } from './components/SystemTicker';
import { Hero } from './components/Hero';
import { Manifesto } from './components/Manifesto';
import { Tracks } from './components/Tracks';
import { ProcessTimeline } from './components/ProcessTimeline';
import { Judging } from './components/Judging';
import { Prizes } from './components/Prizes';
import { Team } from './components/Team';
import { Sponsors } from './components/Sponsors';
import { FAQ } from './components/FAQ';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { Challenge } from './components/Challenge';
import { HowItWorks } from './components/HowItWorks';
import { PlanetTraveler } from './components/PlanetTraveler';
import { TrackMarquee } from './components/TrackMarquee';
import { RegistrationPanel } from './components/RegistrationPanel';
import { EVENT } from './data/event';
import { safeLazy } from './utils/safeLazy';
import { scrollToSection } from './utils/scroll';

const CustomCursor = safeLazy(() => import('./components/CustomCursor').then((mod) => mod.CustomCursor));
const RegistrationNotice = safeLazy(() => import('./components/RegistrationNotice').then((mod) => mod.RegistrationNotice));

const PANEL_STATE = 'bz-registration';

export default function App() {
  const [introDone, setIntroDone] = useState(() => window.bzIntro?.done ?? true);
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [usesMouse] = useState(() => window.matchMedia('(hover: hover) and (pointer: fine)').matches);

  // The opening animation lives in index.html so it can start before this code arrives.
  useEffect(() => {
    const lift = () => setIntroDone(true);
    window.addEventListener('bz:intro-lift', lift, { once: true });
    window.bzIntro?.ready();
    return () => window.removeEventListener('bz:intro-lift', lift);
  }, []);

  // The registration panel is its own step in history, so the phone Back button closes it.
  useEffect(() => {
    const onPop = () => setPanelOpen(window.history.state?.view === PANEL_STATE);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const openPanel = () => {
    window.history.pushState({ view: PANEL_STATE }, '');
    setPanelOpen(true);
  };

  const closePanel = () => {
    setPanelOpen(false);
    if (window.history.state?.view === PANEL_STATE) window.history.back();
  };

  // Every Register button comes through here.
  const handleRegister = () => {
    if (EVENT.registrationEmbedUrl) {
      openPanel();
    } else if (EVENT.registrationUrl) {
      window.open(EVENT.registrationUrl, '_blank', 'noopener');
    } else {
      setNoticeOpen(true);
    }
  };

  const handlePartner = () => {
    window.location.href = `mailto:${EVENT.email}?subject=BELOW%20ZERO%20partnership`;
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <div className="min-h-screen bg-paper text-void flex flex-col selection:bg-flare selection:text-paper">
          <a href="#main" className="skip-link label">
            Skip to main content
          </a>

          {usesMouse && (
            <Suspense fallback={null}>
              <CustomCursor />
            </Suspense>
          )}

          <Navbar onRegisterClick={handleRegister} />
          <DepthGauge />
          <PlanetTraveler />
          <MobileRegisterBar onClick={handleRegister} />

          <main id="main" tabIndex={-1} className="flex-grow outline-none">
            <Hero ready={introDone} onRegisterClick={handleRegister} onExploreClick={() => scrollToSection('#tracks')} />
            <SystemTicker />
            <Manifesto />
            <Challenge />
            <Tracks onRegister={handleRegister} />
            <HowItWorks />
            <ProcessTimeline />
            <Judging />
            <TrackMarquee />
            <Prizes />
            <Sponsors onPartnerClick={handlePartner} />
            <Team />
            <FAQ />
            <FinalCTA onRegisterClick={handleRegister} />
          </main>

          <Footer />

          {noticeOpen && (
            <Suspense fallback={null}>
              <RegistrationNotice isOpen={noticeOpen} onClose={() => setNoticeOpen(false)} />
            </Suspense>
          )}
          <RegistrationPanel isOpen={panelOpen} onClose={closePanel} />
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
