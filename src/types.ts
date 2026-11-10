export type TrackId = 'ai-model' | 'web-dev' | 'game-dev' | 'ai-agents' | 'voice-assistants';

export interface Track {
  id: TrackId;
  number: string;
  title: string;
  /** The title as it breaks across lines on the track card. */
  titleLines: string[];
  tagline: string;
  description: string;
  focusAreas: string[];
  sampleProject: string;
  tools: string[];
}
