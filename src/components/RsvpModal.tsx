import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, Ticket, Copy, Check, Download, AlertCircle, Sparkles } from 'lucide-react';
import { LostInStarsEmblem } from './LostInStarsLogo';
import { RsvpData } from '../types';
import { easeCinematic, easeSnappy } from '../utils/motion';
import { playSfx } from '../utils/audio';

interface RsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTrack?: string;
  onRegistrationChange?: (pass: RsvpData | null) => void;
}

export const RSVP_STORAGE_KEY = 'below_zero_rsvp_pass';
const COUNT_KEY = 'below_zero_rsvp_count_v1';
const BASE_COUNT = 342;

export const RsvpModal: React.FC<RsvpModalProps> = ({
  isOpen,
  onClose,
  initialTrack = '',
  onRegistrationChange,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    grade: 'Class 10',
    school: '',
    track: initialTrack || 'AI Model Making',
    teamStatus: 'Solo Builder (Looking for a team)',
    projectIdea: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedPass, setSubmittedPass] = useState<RsvpData | null>(null);
  const [copied, setCopied] = useState(false);
  const [rsvpCount, setRsvpCount] = useState<number>(BASE_COUNT);

  // Sync initialTrack if passed
  useEffect(() => {
    if (initialTrack) {
      setFormData((prev) => ({ ...prev, track: initialTrack }));
    }
  }, [initialTrack]);

  // Load existing pass if user previously RSVPed
  useEffect(() => {
    const saved = localStorage.getItem(RSVP_STORAGE_KEY);
    if (saved) {
      try {
        const savedPass = JSON.parse(saved) as RsvpData;
        setSubmittedPass(savedPass);
        onRegistrationChange?.(savedPass);
      } catch (e) {
        console.error(e);
      }
    }

    const savedCount = localStorage.getItem(COUNT_KEY);
    if (savedCount) {
      setRsvpCount(parseInt(savedCount, 10));
    } else {
      setRsvpCount(BASE_COUNT);
    }
  }, [onRegistrationChange]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your full name';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.school.trim()) errs.school = 'Please enter your school or institution';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const passData: RsvpData = {
      id: `BZ-2026-${randomSuffix}`,
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      grade: formData.grade,
      school: formData.school.trim(),
      track: formData.track,
      teamStatus: formData.teamStatus,
      projectIdea: formData.projectIdea.trim(),
      timestamp: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(passData));
    const newCount = rsvpCount + 1;
    localStorage.setItem(COUNT_KEY, newCount.toString());
    setRsvpCount(newCount);
    setSubmittedPass(passData);
    onRegistrationChange?.(passData);
    playSfx('success');
  };

  const handleCopyPassId = () => {
    if (!submittedPass) return;
    navigator.clipboard.writeText(submittedPass.id);
    playSfx('click');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleResetPass = () => {
    localStorage.removeItem(RSVP_STORAGE_KEY);
    setSubmittedPass(null);
    onRegistrationChange?.(null);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#F7F5EF]/85 backdrop-blur-sm overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.93, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.93, y: 20 }}
          transition={{ duration: 0.35, ease: easeSnappy }}
          className="relative w-full max-w-2xl bg-[#F7F5EF] border-2 border-black sticker-shadow-red my-8 overflow-hidden"
        >
          {/* Top Header Bar */}
          <div className="flex items-center justify-between border-b-2 border-black px-5 py-4 bg-[#F7F5EF]">
            <div className="flex items-center gap-3">
              <LostInStarsEmblem size={32} />
              <div>
                <div className="font-display text-sm tracking-wider text-[#111111]">
                  BELOW ZERO // 2026
                </div>
                <div className="font-mono-tech text-[10px] text-[#111111] tracking-widest uppercase">
                  Interactive RSVP & Pass Generator
                </div>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              aria-label="Close modal"
              className="p-1 text-[#111111] hover:text-[#FF1744] hover:bg-white/10 transition-colors border border-black/20 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-7 max-h-[80vh] overflow-y-auto">
            {submittedPass ? (
              /* Digital Hacker Pass Display */
              <div className="space-y-6">
                <div className="border border-[#FF1744] bg-[#F7F5EF] p-3 flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#111111] shrink-0" />
                  <div className="font-mono-tech text-xs text-[#111111]">
                    <span className="text-[#111111] font-bold">INTEREST REGISTERED!</span> Your preliminary Below Zero 2026 pass has been generated.
                  </div>
                </div>

                {/* The Hacker Pass Card with Holographic Shine */}
                <motion.div
                  initial={{ rotateX: 20, opacity: 0 }}
                  animate={{ rotateX: 0, opacity: 1 }}
                  transition={{ duration: 0.5, ease: easeCinematic }}
                  className="border-2 border-black bg-[#F7F5EF] p-5 sm:p-6 relative sticker-shadow-yellow overflow-hidden"
                >
                  {/* Background watermark */}
                  <div className="absolute right-2 -bottom-6 opacity-10 pointer-events-none select-none">
                    <span className="font-display text-9xl text-[#111111]">BZ</span>
                  </div>

                  {/* Pass Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-black/20 pb-4">
                    <div className="flex items-center gap-3">
                      <LostInStarsEmblem size={44} />
                      <div>
                        <div className="font-mono-tech text-[10px] text-[#FF1744] font-bold tracking-widest uppercase">
                          LOST IN STARS PRESENTS
                        </div>
                        <div className="font-display text-xl sm:text-2xl text-[#111111] tracking-wide">
                          BELOW ZERO
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono-tech text-[10px] text-[#111111]/60 uppercase">
                        HACKER PASS ID
                      </div>
                      <div className="font-mono-tech text-base sm:text-lg font-bold text-[#111111] tracking-wider">
                        {submittedPass.id}
                      </div>
                    </div>
                  </div>

                  {/* Pass Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5 border-b-2 border-black/20">
                    <div>
                      <div className="font-mono-tech text-[10px] text-[#111111]/60 uppercase">
                        ATTENDEE NAME
                      </div>
                      <div className="font-heading text-lg font-bold text-[#111111] tracking-wide uppercase mt-0.5">
                        {submittedPass.fullName}
                      </div>
                    </div>
                    <div>
                      <div className="font-mono-tech text-[10px] text-[#111111]/60 uppercase">
                        ELIGIBILITY / GRADE
                      </div>
                      <div className="font-mono-tech text-sm font-semibold text-[#111111] mt-0.5">
                        {submittedPass.grade} • {submittedPass.school}
                      </div>
                    </div>
                    <div>
                      <div className="font-mono-tech text-[10px] text-[#111111]/60 uppercase">
                        SELECTED TRACK
                      </div>
                      <div className="font-heading text-sm font-bold text-[#FF1744] uppercase mt-0.5">
                        {submittedPass.track}
                      </div>
                    </div>
                    <div>
                      <div className="font-mono-tech text-[10px] text-[#111111]/60 uppercase">
                        EVENT TIMEFRAME
                      </div>
                      <div className="font-mono-tech text-xs text-[#111111] mt-0.5">
                        Mid-Nov 2026 // 24-Hour Sprint
                      </div>
                    </div>
                  </div>

                  {/* Barcode & Verification */}
                  <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      {/* Simulated barcode */}
                      <div className="flex gap-1 h-8 items-end">
                        {[3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3, 2, 3, 8, 4, 6].map((w, i) => (
                          <span
                            key={i}
                            className="bg-white"
                            style={{
                              width: `${w * 1.5}px`,
                              height: i % 2 === 0 ? '100%' : '75%',
                            }}
                          ></span>
                        ))}
                      </div>
                      <div className="font-mono-tech text-[9px] text-[#111111]/60 tracking-widest mt-1">
                        AUTHENTICATED // STUDENT HACKATHON PASS
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-mono-tech text-[10px] bg-[#FF1744] text-[#111111] px-2 py-0.5 uppercase tracking-wider font-bold">
                        VERIFIED APPLICANT
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Pass Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleCopyPassId}
                    className="inline-flex items-center gap-2 border-2 border-black bg-[#F7F5EF] hover:bg-white hover:text-black text-[#111111] px-4 py-2 font-mono-tech text-xs font-bold transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-[#111111]" />
                        <span>COPIED PASS ID</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>COPY PASS ID</span>
                      </>
                    )}
                  </motion.button>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleResetPass}
                      className="font-mono-tech text-xs text-[#111111]/60 hover:text-[#FF1744] underline cursor-pointer"
                    >
                      Register Another Student
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={onClose}
                      className="bg-[#FFD633] text-black border-2 border-black hover:bg-white px-5 py-2 font-display text-xs tracking-wider uppercase transition-colors cursor-pointer"
                    >
                      DONE
                    </motion.button>
                  </div>
                </div>
              </div>
            ) : (
              /* Registration Form */
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border border-black/20 bg-[#F7F5EF]/60 p-3 mb-2 flex items-center justify-between">
                  <span className="font-mono-tech text-xs text-[#111111]/80">
                    Total RSVPs Received: <strong className="text-[#111111]">{rsvpCount} students</strong>
                  </span>
                  <span className="font-mono-tech text-[10px] bg-[#FF1744] text-[#111111] px-2 py-0.5 uppercase">
                    LIMITED CAPACITY
                  </span>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block font-mono-tech text-xs text-[#111111] uppercase tracking-wider mb-1.5">
                    Full Name <span className="text-[#FF1744]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full bg-[#F7F5EF] border border-black/40 focus:border-[#FF1744] focus:outline-none p-3 text-sm text-[#111111] font-body"
                  />
                  {errors.fullName && (
                    <p className="font-mono-tech text-[11px] text-[#FF1744] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block font-mono-tech text-xs text-[#111111] uppercase tracking-wider mb-1.5">
                    Student / Parent Email <span className="text-[#FF1744]">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="aarav@example.com"
                    className="w-full bg-[#F7F5EF] border border-black/40 focus:border-[#FF1744] focus:outline-none p-3 text-sm text-[#111111] font-body"
                  />
                  {errors.email && (
                    <p className="font-mono-tech text-[11px] text-[#FF1744] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Grade & School */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono-tech text-xs text-[#111111] uppercase tracking-wider mb-1.5">
                      Class / Grade (Classes 8–12) <span className="text-[#FF1744]">*</span>
                    </label>
                    <select
                      value={formData.grade}
                      onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                      className="w-full bg-[#F7F5EF] border border-black/40 focus:border-[#FF1744] focus:outline-none p-3 text-sm text-[#111111] font-body"
                    >
                      <option value="Class 8">Class 8</option>
                      <option value="Class 9">Class 9</option>
                      <option value="Class 10">Class 10</option>
                      <option value="Class 11">Class 11</option>
                      <option value="Class 12">Class 12</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-mono-tech text-xs text-[#111111] uppercase tracking-wider mb-1.5">
                      School / Institution <span className="text-[#FF1744]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.school}
                      onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                      placeholder="e.g. Delhi Public School"
                      className="w-full bg-[#F7F5EF] border border-black/40 focus:border-[#FF1744] focus:outline-none p-3 text-sm text-[#111111] font-body"
                    />
                    {errors.school && (
                      <p className="font-mono-tech text-[11px] text-[#FF1744] mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.school}
                      </p>
                    )}
                  </div>
                </div>

                {/* Primary Track Selection */}
                <div>
                  <label className="block font-mono-tech text-xs text-[#111111] uppercase tracking-wider mb-1.5">
                    Interested Track <span className="text-[#FF1744]">*</span>
                  </label>
                  <select
                    value={formData.track}
                    onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                    className="w-full bg-[#F7F5EF] border border-black/40 focus:border-[#FF1744] focus:outline-none p-3 text-sm text-[#111111] font-body"
                  >
                    <option value="AI Model Making">Track 01: AI Model Making</option>
                    <option value="Web Development">Track 02: Web Development</option>
                    <option value="Game Development">Track 03: Game Development</option>
                    <option value="AI Agents">Track 04: AI Agents</option>
                    <option value="Voice Assistants">Track 05: Voice Assistants</option>
                  </select>
                </div>

                {/* Team Status */}
                <div>
                  <label className="block font-mono-tech text-xs text-[#111111] uppercase tracking-wider mb-1.5">
                    Team Preference
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono-tech">
                    {[
                      'Solo Builder (Looking for a team)',
                      'Solo Builder (Working alone)',
                      'Existing Team (Have members)',
                      'Just exploring / First hackathon',
                    ].map((status) => (
                      <label
                        key={status}
                        className={`border p-2.5 cursor-pointer flex items-center gap-2 transition-colors ${
                          formData.teamStatus === status
                            ? 'border-[#FFD633] bg-white/5 text-[#111111]'
                            : 'border-black/20 text-[#111111]/70 hover:border-black/40'
                        }`}
                      >
                        <input
                          type="radio"
                          name="teamStatus"
                          value={status}
                          checked={formData.teamStatus === status}
                          onChange={(e) => setFormData({ ...formData, teamStatus: e.target.value })}
                          className="accent-[#FF1744]"
                        />
                        <span>{status}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Submit CTA */}
                <div className="pt-3">
                  <motion.button
                    whileHover={{ scale: 1.01, y: -2 }}
                    whileTap={{ scale: 0.98, y: 2 }}
                    type="submit"
                    className="w-full bg-[#FFD633] hover:bg-white text-black font-display text-sm tracking-wider py-3.5 px-6 border-2 border-black sticker-shadow-red transition-colors cursor-pointer"
                  >
                    CLAIM YOUR BELOW ZERO PASS
                  </motion.button>
                  <p className="font-mono-tech text-[10px] text-[#111111]/50 text-center mt-2">
                    * Note: Official physical venue confirmation & final schedules will be dispatched to your registered email.
                  </p>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
