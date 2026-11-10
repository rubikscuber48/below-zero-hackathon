/** Every section in page order. The navigation, side gauge, footer, and section numbers read from here. */
export const SECTIONS = [
  { id: 'hero', number: '00', name: 'Top', onLight: false },
  { id: 'manifesto', number: '01', name: 'Event brief', onLight: true },
  { id: 'challenge', number: '02', name: 'The challenge', onLight: true },
  { id: 'tracks', number: '03', name: 'Tracks', onLight: false },
  { id: 'how', number: '04', name: 'How it works', onLight: true },
  { id: 'process', number: '05', name: 'Event timeline', short: 'Schedule', onLight: true },
  { id: 'judging', number: '06', name: 'Judging criteria', short: 'Judging', onLight: true },
  { id: 'prizes', number: '07', name: 'Prizes', onLight: true },
  { id: 'sponsors', number: '08', name: 'Sponsors and partners', short: 'Sponsors', onLight: false },
  { id: 'team', number: '09', name: 'Team', onLight: true },
  { id: 'faq', number: '10', name: 'FAQ', onLight: true },
  { id: 'register', number: '11', name: 'Registration', short: 'Register', onLight: false },
] as const;

export type SectionId = (typeof SECTIONS)[number]['id'];

export const sectionInfo = (id: SectionId) => SECTIONS.find((s) => s.id === id)!;
