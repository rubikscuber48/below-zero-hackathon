import { useEffect, useRef } from 'react';

/**
 * Behaviour shared by every dialog: the page behind becomes unreachable, Escape
 * closes, and focus returns to whatever opened it. Render the dialog in a portal
 * on document.body so it stays outside the disabled page.
 */
export const useDialog = <T extends HTMLElement>(isOpen: boolean, onClose: () => void) => {
  const focusRef = useRef<T>(null);
  const close = useRef(onClose);
  close.current = onClose;

  useEffect(() => {
    if (!isOpen) return;
    const opener = document.activeElement as HTMLElement | null;
    const page = document.getElementById('root');
    const previousOverflow = document.body.style.overflow;

    page?.setAttribute('inert', '');
    document.body.style.overflow = 'hidden';
    focusRef.current?.focus();

    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close.current();
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('keydown', onKey);
      page?.removeAttribute('inert');
      document.body.style.overflow = previousOverflow;
      opener?.focus?.({ preventScroll: true });
    };
  }, [isOpen]);

  return focusRef;
};
