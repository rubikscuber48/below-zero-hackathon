/**
 * Single source of truth for facts that are still being finalised.
 * Everything here renders only when it is set, so an unconfirmed detail
 * can never appear on the site by accident.
 */

export const EVENT = {
  /** Shown until an exact date is set below. */
  dateLabel: 'Mid-November',
  /**
   * Set to an ISO string (e.g. '2026-11-14T09:00:00+05:30') once the date is
   * final. The countdown and "Save to calendar" return to the hero when set.
   */
  confirmedStart: null as string | null,
  email: 'official.lostinstars@gmail.com',
};

/**
 * Timeline phases. `confirmedWindow` is displayed only when filled in.
 * The previous site listed 00H–06H, 06H–14H, 14H–20H and 20H–24H.
 */
export const PHASES = [
  {
    num: '01',
    word: 'Think',
    tagline: 'Deconstruct problems and choose a track',
    description:
      'Check in, hear the opening keynote and get your track toolchain. Teams find a real problem, set the limits of their MVP and sort out API keys.',
    activity: 'Scope the MVP and commit to a tech stack',
    deliverables: ['System architecture diagram', 'Repo initialization', 'Tech stack commitment'],
    confirmedWindow: null as string | null,
  },
  {
    num: '02',
    word: 'Build',
    tagline: 'Core implementation',
    description:
      'Uninterrupted engineering. Teams build models, interfaces, backends and agent workflows with senior mentors on the floor.',
    activity: 'Get the core loop running end to end',
    deliverables: ['Functional core', 'Database integration', 'End-to-end execution flow'],
    confirmedWindow: null as string | null,
  },
  {
    num: '03',
    word: 'Test',
    tagline: 'Stress tests and edge cases',
    description:
      'Where a script becomes software. Run benchmarks, fix leaks, tighten response times and verify your deployment.',
    activity: 'Break it, then fix what broke',
    deliverables: ['Passing automated tests', 'Zero critical crashes', 'Offline fallback logic'],
    confirmedWindow: null as string | null,
  },
  {
    num: '04',
    word: 'Present',
    tagline: 'Live proof over decks',
    description:
      'No presentation slides. Teams run live code in front of industry judges and answer for what they built.',
    activity: 'Demo working software to the jury',
    deliverables: ['Live browser or terminal demo', 'Public open-source repo', 'Code execution review'],
    confirmedWindow: null as string | null,
  },
];

export interface Partner {
  name: string;
  /** Imported image URL. Rendered untouched, at its own proportions and colours. */
  logo: string;
  href?: string;
}

/** Add confirmed partners here. Empty tiers show an open slot. */
export const PARTNERS: Record<'title' | 'main' | 'supporting' | 'community', Partner[]> = {
  title: [],
  main: [],
  supporting: [],
  community: [],
};

export interface Person {
  name: string;
  role: string;
  description: string;
  initials: string;
  /** Imported portrait. Until set, the frame shows the person's initials. */
  photo?: string;
}

export const LEADERSHIP: Person[] = [
  {
    name: 'Divyansh Mishra',
    role: 'Lead Organizer & Founder',
    description:
      'Leading the mission, architecture, and execution of BELOW ZERO while building the Lost in Stars student builder collective.',
    initials: 'DM',
  },
];

export const ORGANIZERS: Person[] = [
  {
    name: 'Ananya',
    role: 'Lead Designer & Creative Director',
    description: 'Driving visual identity, brand systems, and high-contrast digital experiences.',
    initials: 'AN',
  },
  {
    name: 'Mahima',
    role: 'Partnerships & Outreach Co-Lead',
    description: 'Leading outreach with high schools, technology partners, and builder networks across Delhi NCR.',
    initials: 'MH',
  },
  {
    name: 'Mayank',
    role: 'Partnerships & Operations Co-Lead',
    description: 'Managing partner deliverables, event logistics, and hacker support.',
    initials: 'MY',
  },
];

/** These were placeholders on the previous site. Replace each href with the real profile. */
export const SOCIALS = ['Instagram', 'X', 'GitHub', 'Discord'].map((name) => ({
  name,
  href: `mailto:${EVENT.email}?subject=COMMUNITY_ACCESS`,
}));
