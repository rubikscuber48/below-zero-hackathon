import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, m } from 'motion/react';
import { X } from 'lucide-react';
import { easeSnappy } from '../utils/motion';
import { useDialog } from '../hooks/useDialog';

export type LegalKind = 'privacy' | 'terms';

const COPY: Record<LegalKind, { title: string; paragraphs: string[] }> = {
  privacy: {
    title: 'Privacy Policy',
    paragraphs: [
      'Below Zero is committed to protecting the privacy of participating students and their guardians. Information collected through registration forms (student names, educational institutions, grades, email addresses) is used strictly for event coordination, team formation, and hackathon communications.',
      'We do not sell, rent, or distribute personal information to third-party commercial brokers. All data handling complies with student data privacy ethics. For queries, contact official.lostinstars@gmail.com.',
    ],
  },
  terms: {
    title: 'Terms and Conditions',
    paragraphs: [
      'Participation in BELOW ZERO is open to registered students in Classes 8 through 12. All participants must agree to the Hackathon Code of Conduct: fostering an inclusive, collaborative, respectful, and safe physical environment.',
      'Projects built during the 24 hours must be original works conceived and created during the event timeline. Intellectual property remains 100% owned by the student creators.',
    ],
  },
};

export const LegalDialog: React.FC<{ kind: LegalKind | null; onClose: () => void }> = ({ kind, onClose }) => {
  const closeRef = useDialog<HTMLButtonElement>(kind !== null, onClose);
  // Keeps the text in place while the dialog animates away.
  const lastKind = useRef<LegalKind>('privacy');
  if (kind) lastKind.current = kind;
  const { title, paragraphs } = COPY[lastKind.current];

  return createPortal(
    <AnimatePresence>
      {kind && (
        <m.div
          className="fixed inset-0 z-[55] bg-void/80 flex items-end sm:items-center justify-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <m.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="legal-title"
            initial={{ y: 28 }}
            animate={{ y: 0 }}
            exit={{ y: 28 }}
            transition={{ duration: 0.28, ease: easeSnappy }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full sm:max-w-2xl max-h-[85svh] overflow-y-auto bg-paper text-void p-6 sm:p-10 border-t-4 sm:border-4 border-flare"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 w-11 h-11 flex items-center justify-center cursor-pointer hover:text-flare"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 id="legal-title" className="display text-d3 pr-10">
              {title}
            </h2>
            <div className="mt-5 space-y-4">
              {paragraphs.map((p) => (
                <p key={p} className="body-copy">
                  {p}
                </p>
              ))}
            </div>
            <button type="button" onClick={onClose} className="btn btn-solid-void mt-7 w-full sm:w-auto">
              Close
            </button>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};
