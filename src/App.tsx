/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Navbar } from './components/Navbar';
import { CinematicIntro } from './components/CinematicIntro';
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
import { RegistrationNotice } from './components/RegistrationNotice';
import { RegistrationPanel } from './components/RegistrationPanel';
import { EVENT } from './data/event';
import { CustomCursor } from './components/CustomCursor';

export default function App() {
  const [introDone, setIntroDone] = useState(false);
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);

  // Every Register button comes through here. Set EVENT.registrationUrl to go live.
  const handleRegister = () => {
    if (EVENT.registrationEmbedUrl) {
      setPanelOpen(true);
    } else if (EVENT.registrationUrl) {
      window.open(EVENT.registrationUrl, '_blank', 'noopener');
    } else {
      setNoticeOpen(true);
    }
  };

  const handlePartner = () => {
    window.location.href = `mailto:${EVENT.email}?subject=BELOW%20ZERO%20partnership`;
  };

  const handleExploreClick = () => {
    const target = document.querySelector('#tracks');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen bg-[#F7F5EF] text-[#111111] flex flex-col selection:bg-[#FF1744] selection:text-[#111111] relative font-body">
      {/* Neo-brutalist Interactive Custom Cursor */}
      <CustomCursor />

      {/* Sticky Top Navigation */}
      <Navbar onRegisterClick={handleRegister} />

      <CinematicIntro onComplete={() => setIntroDone(true)} />

      <DepthGauge />
      <MobileRegisterBar onClick={handleRegister} />

      <main className="flex-grow">
        {/* Hero Section with Countdown Timer and Graphic Showcase */}
        <Hero
          ready={introDone}
          onRegisterClick={handleRegister}
          onExploreClick={handleExploreClick}
        />

        <SystemTicker />

        {/* The Manifesto */}
        <Manifesto />

        <Challenge />

        {/* Hackathon Tracks */}
        <Tracks onRegister={handleRegister} />

        <HowItWorks />

        {/* The 24-Hour Build Experience (The Process) */}
        <ProcessTimeline />

        {/* Transparent Judging Philosophy & Rubric */}
        <Judging />

        {/* Prizes and Recognition */}
        <Prizes />

        {/* Sponsors and Partners */}
        <Sponsors onPartnerClick={handlePartner} />

        {/* Organizing Team */}
        <Team />

        {/* FAQ Section */}
        <FAQ />

        {/* Final Yellow Call To Action Poster */}
        <FinalCTA onRegisterClick={handleRegister} />
      </main>

      {/* Footer */}
      <Footer />

      <RegistrationNotice isOpen={noticeOpen} onClose={() => setNoticeOpen(false)} />
      <RegistrationPanel isOpen={panelOpen} onClose={() => setPanelOpen(false)} />
    </div>
    </MotionConfig>
  );
}
