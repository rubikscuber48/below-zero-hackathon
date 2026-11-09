/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Navbar } from './components/Navbar';
import { DepthGauge, MobileRegisterBar } from './components/DepthGauge';
import { SystemTicker } from './components/SystemTicker';
import { Hero } from './components/Hero';
import { Manifesto } from './components/Manifesto';
import { Tracks } from './components/Tracks';
import { ProcessTimeline } from './components/ProcessTimeline';
import { Judging } from './components/Judging';
import { Experience } from './components/Experience';
import { Prizes } from './components/Prizes';
import { Team } from './components/Team';
import { Sponsors } from './components/Sponsors';
import { FAQ } from './components/FAQ';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { RsvpModal, RSVP_STORAGE_KEY } from './components/RsvpModal';
import { PartnerModal } from './components/PartnerModal';
import { CustomCursor } from './components/CustomCursor';
import { RsvpData } from './types';

export default function App() {
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [rsvpInitialTrack, setRsvpInitialTrack] = useState('');
  const [isPartnerOpen, setIsPartnerOpen] = useState(false);
  const [registeredPass, setRegisteredPass] = useState<RsvpData | null>(null);

  useEffect(() => {
    const savedPass = localStorage.getItem(RSVP_STORAGE_KEY);
    if (!savedPass) return;

    try {
      setRegisteredPass(JSON.parse(savedPass) as RsvpData);
    } catch {
      localStorage.removeItem(RSVP_STORAGE_KEY);
    }
  }, []);

  const handleOpenRsvp = (trackTitle?: string) => {
    if (trackTitle) {
      setRsvpInitialTrack(trackTitle);
    }
    setIsRsvpOpen(true);
  };

  const handleCloseRsvp = () => {
    setIsRsvpOpen(false);
    setRsvpInitialTrack('');
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
      <Navbar
        onRegisterClick={() => handleOpenRsvp()}
        isRegistered={Boolean(registeredPass)}
        onPassFinderClick={() => handleOpenRsvp()}
      />

      <DepthGauge />
      <MobileRegisterBar isRegistered={Boolean(registeredPass)} onClick={() => handleOpenRsvp()} />

      <main className="flex-grow">
        {/* Hero Section with Countdown Timer and Graphic Showcase */}
        <Hero
          onRegisterClick={() => handleOpenRsvp()}
          onExploreClick={handleExploreClick}
        />

        <SystemTicker />

        {/* The Manifesto */}
        <Manifesto />

        {/* Hackathon Tracks */}
        <Tracks onSelectTrackForRsvp={(track) => handleOpenRsvp(track)} />

        {/* The 24-Hour Build Experience (The Process) */}
        <ProcessTimeline />

        {/* Transparent Judging Philosophy & Rubric */}
        <Judging />

        {/* The Experience (More Than a Hackathon) */}
        <Experience />

        {/* Prizes and Recognition */}
        <Prizes />

        {/* Sponsors and Partners */}
        <Sponsors onPartnerClick={() => setIsPartnerOpen(true)} />

        {/* Organizing Team */}
        <Team />

        {/* FAQ Section */}
        <FAQ />

        {/* Final Yellow Call To Action Poster */}
        <FinalCTA onRegisterClick={() => handleOpenRsvp()} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive RSVP Modal & Pass Generator */}
      <RsvpModal
        isOpen={isRsvpOpen}
        onClose={handleCloseRsvp}
        initialTrack={rsvpInitialTrack}
        onRegistrationChange={setRegisteredPass}
      />

      {/* Partnership Prospectus Request Modal */}
      <PartnerModal
        isOpen={isPartnerOpen}
        onClose={() => setIsPartnerOpen(false)}
      />
    </div>
    </MotionConfig>
  );
}
