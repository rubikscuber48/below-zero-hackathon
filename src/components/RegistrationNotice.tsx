import React from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, m } from 'motion/react';
import { X } from 'lucide-react';
import { EVENT } from '../data/event';
import { useDialog } from '../hooks/useDialog';

/** Shown by Register buttons until EVENT.registrationUrl is set. */
export const RegistrationNotice: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const closeRef = useDialog<HTMLButtonElement>(isOpen, onClose);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
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
            aria-labelledby="registration-title"
            initial={{ y: 28 }}
            animate={{ y: 0 }}
            exit={{ y: 28 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full sm:max-w-xl bg-sun text-void p-6 sm:p-10 border-2 border-void shadow-[8px_8px_0_#FF1744]"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 w-11 h-11 flex items-center justify-center cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <p className="label">Registration</p>
            <h2 id="registration-title" className="display text-d4 mt-3">
              Opening soon
            </h2>
            <p className="body-copy font-medium mt-4">
              The registration form is not live yet. Email us and we will let you know when it opens.
            </p>
            <a
              href={`mailto:${EVENT.email}?subject=BELOW%20ZERO%20registration`}
              className="btn btn-solid-void mt-6 w-full sm:w-auto"
            >
              Email Lost in Stars
            </a>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};
