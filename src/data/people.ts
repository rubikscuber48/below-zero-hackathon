/** Teams and partners. Images can be imported here. */

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
    name: 'Ayushman',
    role: 'Website Designer',
    description: 'Designing the BELOW ZERO website.',
    initials: 'AY',
  },
  {
    name: 'Ananya',
    role: 'Creative Director',
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
  {
    name: 'Shiva Singh',
    role: 'Partnership Co-Lead',
    description: 'Co-leading partnerships for BELOW ZERO.',
    initials: 'SS',
  },
];
