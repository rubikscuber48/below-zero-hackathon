import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, Mail, Building, Send } from 'lucide-react';
import { LostInStarsEmblem } from './LostInStarsLogo';
import { easeCinematic, easeSnappy } from '../utils/motion';

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PartnerModal: React.FC<PartnerModalProps> = ({ isOpen, onClose }) => {
  const [partnerForm, setPartnerForm] = useState({
    orgName: '',
    contactName: '',
    email: '',
    tier: 'Technical Infrastructure',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerForm.orgName || !partnerForm.email) return;
    setSubmitted(true);
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
          className="relative w-full max-w-xl bg-[#F7F5EF] border-2 border-black sticker-shadow-red my-8 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-black px-5 py-4 bg-[#F7F5EF]">
            <div className="flex items-center gap-3">
              <LostInStarsEmblem size={30} />
              <div>
                <div className="font-display text-sm tracking-wider text-[#111111]">
                  PARTNER WITH BELOW ZERO
                </div>
                <div className="font-mono-tech text-[10px] text-[#111111] uppercase">
                  Lost in Stars Ecosystem
                </div>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              aria-label="Close modal"
              className="p-1 text-[#111111] hover:text-[#FF1744] border border-black/20 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Content */}
          <div className="p-6">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4 text-center py-6"
              >
                <CheckCircle className="w-12 h-12 text-[#111111] mx-auto animate-pulse" />
                <h3 className="font-display text-xl text-[#111111] uppercase">
                  INQUIRY RECEIVED
                </h3>
                <p className="font-body text-sm text-[#111111]/80 max-w-md mx-auto">
                  Thank you for supporting student innovation! Our partnership leads (Mahima & Mayank) will reach out to <strong className="text-[#111111]">{partnerForm.email}</strong> with the Below Zero sponsorship prospectus.
                </p>
                <div className="pt-4">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onClose}
                    className="bg-[#FFD633] text-black font-display text-xs tracking-wider px-6 py-2.5 border-2 border-black cursor-pointer"
                  >
                    CLOSE
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-mono-tech text-xs text-[#111111] uppercase tracking-wider mb-1.5">
                    Organization / Company Name <span className="text-[#FF1744]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={partnerForm.orgName}
                    onChange={(e) => setPartnerForm({ ...partnerForm, orgName: e.target.value })}
                    placeholder="e.g. Acme Tech Labs / Community Org"
                    className="w-full bg-[#F7F5EF] border border-black/40 focus:border-[#FF1744] focus:outline-none p-3 text-sm text-[#111111] font-body"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono-tech text-xs text-[#111111] uppercase tracking-wider mb-1.5">
                      Contact Person
                    </label>
                    <input
                      type="text"
                      value={partnerForm.contactName}
                      onChange={(e) => setPartnerForm({ ...partnerForm, contactName: e.target.value })}
                      placeholder="e.g. Priya Sharma"
                      className="w-full bg-[#F7F5EF] border border-black/40 focus:border-[#FF1744] focus:outline-none p-3 text-sm text-[#111111] font-body"
                    />
                  </div>
                  <div>
                    <label className="block font-mono-tech text-xs text-[#111111] uppercase tracking-wider mb-1.5">
                      Official Email <span className="text-[#FF1744]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={partnerForm.email}
                      onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })}
                      placeholder="contact@acme.org"
                      className="w-full bg-[#F7F5EF] border border-black/40 focus:border-[#FF1744] focus:outline-none p-3 text-sm text-[#111111] font-body"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono-tech text-xs text-[#111111] uppercase tracking-wider mb-1.5">
                    Interested Partnership Tier
                  </label>
                  <select
                    value={partnerForm.tier}
                    onChange={(e) => setPartnerForm({ ...partnerForm, tier: e.target.value })}
                    className="w-full bg-[#F7F5EF] border border-black/40 focus:border-[#FF1744] focus:outline-none p-3 text-sm text-[#111111] font-body"
                  >
                    <option value="Title Partner">Title Partner (Co-host)</option>
                    <option value="Technical Infrastructure">Technical Infrastructure (Tooling & APIs)</option>
                    <option value="Youth & Education Advocate">Youth & Education Advocate (Grants & Kits)</option>
                    <option value="Community & Ecosystem">Community & Ecosystem Partner</option>
                    <option value="General Sponsorship">General Sponsorship / In-Kind</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono-tech text-xs text-[#111111] uppercase tracking-wider mb-1.5">
                    Note / Preferred Support
                  </label>
                  <textarea
                    rows={3}
                    value={partnerForm.message}
                    onChange={(e) => setPartnerForm({ ...partnerForm, message: e.target.value })}
                    placeholder="Share details on how you'd like to collaborate..."
                    className="w-full bg-[#F7F5EF] border border-black/40 focus:border-[#FF1744] focus:outline-none p-3 text-sm text-[#111111] font-body resize-none"
                  />
                </div>

                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.01, y: -2 }}
                    whileTap={{ scale: 0.98, y: 2 }}
                    type="submit"
                    className="w-full bg-[#FFD633] hover:bg-white text-black font-display text-xs tracking-wider py-3.5 border-2 border-black sticker-shadow-red transition-colors cursor-pointer"
                  >
                    SUBMIT PARTNERSHIP REQUEST
                  </motion.button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
