export type TrackId = 'ai-model' | 'web-dev' | 'game-dev' | 'ai-agents' | 'voice-assistants';

export interface Track {
  id: TrackId;
  number: string;
  title: string;
  tagline: string;
  description: string;
  focusAreas: string[];
  sampleProject: string;
  tools: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TeamMember {
  name: string;
  role: string;
  description: string;
  initials: string;
}

export interface RsvpData {
  id: string;
  fullName: string;
  email: string;
  grade: string;
  school: string;
  track: string;
  teamStatus: string;
  projectIdea: string;
  timestamp: string;
}
