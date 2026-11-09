import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { EVENT } from '../data/event';

/** Full-screen view of the Google Form, so students register without leaving the site. */
export const RegistrationPanel: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="BELOW ZERO registration"
          className="fixed inset-0 z-[55] bg-paper flex flex-col"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <header className="bg-void text-paper border-b-2 border-flare">
            <div className="wrap h-16 flex items-center justify-between gap-4">
              <h2 className="display text-[1.5rem] sm:text-[1.75rem] whitespace-nowrap">Register</h2>
              <div className="flex items-center gap-2 sm:gap-4">
                <a
                  href={EVENT.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label min-h-11 inline-flex items-center underline underline-offset-4 hover:text-sun"
                >
                  Open in new tab
                </a>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close registration"
                  className="w-11 h-11 flex items-center justify-center cursor-pointer hover:text-sun"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
          </header>
          <div className="relative flex-1 min-h-0">
            <p className="absolute inset-x-0 top-10 text-center body-copy mx-auto" aria-hidden="true">
              Loading the form
            </p>
            <iframe
              src={EVENT.registrationEmbedUrl}
              title="BELOW ZERO registration form"
              className="relative w-full h-full border-0"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
