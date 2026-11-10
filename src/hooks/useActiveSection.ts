import { useSyncExternalStore } from 'react';
import { SECTIONS, type SectionId } from '../data/sections';

let active: SectionId = 'hero';
let observer: IntersectionObserver | null = null;
const listeners = new Set<() => void>();

export const setActiveSection = (id: SectionId) => {
  if (id === active) return;
  active = id;
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveSection(e.target.id as SectionId)),
      { rootMargin: '-48% 0px -50% 0px' },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer!.observe(el);
    });
  }
  return () => {
    listeners.delete(listener);
    if (!listeners.size) {
      observer?.disconnect();
      observer = null;
    }
  };
};

/** The section at the middle of the screen. All callers share one observer. */
export const useActiveSection = () => useSyncExternalStore(subscribe, () => active);
