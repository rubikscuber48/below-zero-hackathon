/**
 * Prize details. Leave a field empty until it is confirmed.
 * An empty amount shows "To be announced". Winner and sponsor rows stay hidden when empty.
 */
export const PRIZES = {
  champion: { amount: '', winner: '', sponsor: '' },
  firstRunnerUp: { amount: '', winner: '', sponsor: '' },
  secondRunnerUp: { amount: '', winner: '', sponsor: '' },
};

export const CHAMPION_PERKS = [
  'Cast grand trophy and official Lost in Stars winner honors',
  'Certificate of Technical Excellence (Distinction)',
  '1-on-1 mentorship and incubation pathways with senior AI engineers',
  'Ecosystem partner credits and priority access to future programs',
];

export const RUNNERS = [
  {
    place: 'Second place',
    title: 'First runner-up',
    details: PRIZES.firstRunnerUp,
    perks: ['First runner-up trophy', 'Certificate of High Distinction', 'Partner perks and tool credits', 'Spotlight in the Lost in Stars Innovation Archive'],
  },
  {
    place: 'Third place',
    title: 'Second runner-up',
    details: PRIZES.secondRunnerUp,
    perks: ['Second runner-up trophy', 'Certificate of Outstanding Performance', 'Developer tooling and cloud vouchers', 'Community Builder Collective entry'],
  },
];

export const SPECIAL = [
  { title: 'Most Innovative Project', desc: 'For the boldest, most creative solution.' },
  { title: 'Best Technical Execution', desc: 'For code architecture, live stability, and engineering rigor.' },
  { title: 'Best User Experience', desc: 'For clean, accessible, human-centered product design.' },
];
