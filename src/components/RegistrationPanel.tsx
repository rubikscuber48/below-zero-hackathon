import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, m } from 'motion/react';
import { X } from 'lucide-react';
import { EVENT } from '../data/event';
import { useDialog } from '../hooks/useDialog';

const SLOW_AFTER_MS = 12000;

/** Full-screen view of the Google Form, so students register without leaving the site. */
export const RegistrationPanel: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const closeRef = useDialog<HTMLButtonElement>(isOpen, onClose);
  const [status, setStatus] = useState<'loading' | 'slow' | 'loaded'>('loading');

  useEffect(() => {
    if (!isOpen) return;
    setStatus('loading');
    const timer = setTimeout(() => setStatus((s) => (s === 'loading' ? 'slow' : s)), SLOW_AFTER_MS);
    return () => clearTimeout(timer);
  }, [isOpen]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <m.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="registration-panel-title"
          className="fixed inset-0 z-[55] bg-paper text-void flex flex-col"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="bg-void text-paper border-b-2 border-flare">
            <div className="wrap h-16 flex items-center justify-between gap-4">
              <h2 id="registration-panel-title" className="display text-d1 whitespace-nowrap">
                Register
              </h2>
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
          </div>
          <div className="relative flex-1 min-h-0">
            {status === 'loading' && (
              <p role="status" className="absolute inset-x-0 top-10 text-center body-copy mx-auto">
                Loading the form
              </p>
            )}
            <iframe
              src={EVENT.registrationEmbedUrl}
              title="BELOW ZERO registration form"
              onLoad={() => setStatus('loaded')}
              className="relative w-full h-full border-0"
            />
            {status === 'slow' && (
              <div role="alert" className="absolute inset-0 bg-paper flex flex-col items-center justify-center gap-5 p-6 text-center">
                <p className="body-copy font-medium">The form is taking too long to load here. Open it in a new tab to register.</p>
                <a className="btn btn-solid-void" href={EVENT.registrationUrl} target="_blank" rel="noopener noreferrer">
                  Open the form
                </a>
              </div>
            )}
          </div>
        </m.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};
