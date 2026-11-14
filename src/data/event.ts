/**
 * Single source of truth for event facts. Components and index.html both read
 * from here, so a change only needs making once.
 *
 * vite.config.ts imports this file, so keep it free of image imports.
 * Portraits and logos belong in people.ts.
 */

export const EVENT = {
  /** Public address of the site, used for sharing and search tags. Keep the trailing slash. */
  siteUrl: 'https://belowzero2027.xyz/',
  /** Short date for tight spaces. */
  dateLabel: '31 March',
  /** Full date for sentences. */
  dateLong: '31 March 2027',
  startTimeLabel: '9:00 AM IST',
  location: 'Delhi NCR',
  /**
   * Set to an ISO string (e.g. '2027-03-31T09:00:00+05:30') once the date is
   * final. The countdown and "Save to calendar" return to the hero when set.
   */
  confirmedStart: '2027-03-31T09:00:00+05:30' as string | null,
  /** Event end, used for the calendar link. */
  confirmedEnd: '2027-04-01T09:00:00+05:30' as string | null,
  email: 'official.lostinstars@gmail.com',
  /**
   * REGISTRATION LINK. Paste the live form URL here (Google Forms, Fillout, etc).
   * Every Register button opens it. While empty, the buttons explain that
   * registration has not opened yet.
   */
  registrationUrl: 'https://forms.gle/EkegWVdGvFhTw3V68',
  /** The same form in Google's embeddable view. Register buttons show it on the site when set. */
  registrationEmbedUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLSc0qr6u0LYtSEN8Kq4jPkQ2Sgk3IU8iU85G4Haz7hscX8ijQQ/viewform?embedded=true',
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

/** Add each profile URL once it is verified. Links without a URL stay hidden. */
export const SOCIALS = [
  { name: 'Instagram', href: 'https://www.instagram.com/lostinstars_official/' },
  { name: 'X', href: '' },
  { name: 'GitHub', href: '' },
  { name: 'Discord', href: '' },
];
