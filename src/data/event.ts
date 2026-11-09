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
  /**
   * REGISTRATION LINK. Paste the live form URL here (Google Forms, Fillout, etc).
   * Every Register button opens it. While empty, the buttons explain that
   * registration has not opened yet.
   */
  registrationUrl: 'https://forms.gle/EkegWVdGvFhTw3V68',
};

/**
 * Prize details. Leave a field empty until it is confirmed.
 * An empty amount shows "To be announced". Winner and sponsor rows stay hidden when empty.
 */
export const PRIZES = {
  champion: { amount: '', winner: '', sponsor: '' },
  firstRunnerUp: { amount: '', winner: '', sponsor: '' },
  secondRunnerUp: { amount: '', winner: '', sponsor: '' },
};

/**
 * Timeline phases. `confirmedWindow` is displayed only when filled in.
 * The earlier site listed 00H–06H, 06H–14H, 14H–20H and 20H–24H.
 */
export const PHASES = [
  {
    num: '01',
    word: 'Think',
    description: 'Understand the problem and develop an idea.',
    activity: 'Scope the MVP and commit to a tech stack',
    confirmedWindow: null as string | null,
  },
  {
    num: '02',
    word: 'Build',
    description: 'Create your solution during the hackathon.',
    activity: 'Get the core loop running end to end',
    confirmedWindow: null as string | null,
  },
  {
    num: '03',
    word: 'Test',
    description: 'Refine, debug, and improve your project.',
    activity: 'Break it, then fix what broke',
    confirmedWindow: null as string | null,
  },
  {
    num: '04',
    word: 'Present',
    description: 'Present your solution to the judges.',
    activity: 'Demo working software live',
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

/** Add each profile URL once it is verified. Links without a URL stay hidden. */
export const SOCIALS = [
  { name: 'Instagram', href: '' },
  { name: 'X', href: '' },
  { name: 'GitHub', href: '' },
  { name: 'Discord', href: '' },
];
