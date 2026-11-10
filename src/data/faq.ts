import { EVENT } from './event';

export const FAQ_GROUPS: { name: string; items: { q: string; a: string }[] }[] = [
  {
    name: 'Eligibility',
    items: [
      { q: 'Who can participate?', a: 'Participation is exclusively for school students currently enrolled in Classes 8 through 12.' },
      {
        q: 'Do I need hackathon experience or advanced coding skills?',
        a: 'No prior hackathon experience is needed. Whether you are building your first neural network or your first web game, mentors will be on the floor to help you past technical hurdles.',
      },
    ],
  },
  {
    name: 'Registration',
    items: [
      { q: 'Is there a registration or entry fee?', a: 'No. BELOW ZERO is free for all accepted students. Food, beverages, power, Wi-Fi, mentorship, and swag are covered by Lost in Stars and our partners.' },
      { q: 'How do I register my interest?', a: 'Use any Register button on this site to open the registration form.' },
    ],
  },
  {
    name: 'Team formation',
    items: [
      { q: 'How big can a team be?', a: 'Teams can have 1 to 4 members.' },
      { q: 'Can I register without a team?', a: 'Yes. You can register solo or with your pre-formed squad.' },
    ],
  },
  {
    name: 'Tracks',
    items: [
      { q: 'What are the five tracks?', a: 'AI Model Making, Web Development, Game Development, AI Agents, and Voice Assistants.' },
      { q: 'Do I have to choose one track?', a: 'Teams select one primary track when they submit their project.' },
    ],
  },
  {
    name: 'Rules',
    items: [
      { q: 'Does my project have to be new?', a: 'Yes. Projects must be original works conceived and created during the event. All participants must agree to the Code of Conduct.' },
      { q: 'Who owns what we build?', a: 'Intellectual property remains 100% owned by the student creators.' },
      { q: 'How are projects judged?', a: 'Each team is evaluated during a live demo. The proposed criteria are in the Judging section of this page and are subject to confirmation.' },
      { q: 'Will participants receive certificates?', a: 'Yes. All attending hackers receive a verified Certificate of Participation from Lost in Stars. Prize details will be confirmed in the Prizes section.' },
    ],
  },
  {
    name: 'Logistics',
    items: [
      { q: 'When and where is it?', a: `${EVENT.dateLong}, starting at ${EVENT.startTimeLabel}, in person in ${EVENT.location}. Venue details and logistics will be emailed directly to accepted teams.` },
      { q: 'What is provided on the day?', a: 'Food, beverages, power, Wi-Fi, mentorship, and swag.' },
    ],
  },
];
