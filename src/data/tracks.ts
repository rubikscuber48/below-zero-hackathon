import type { Track } from '../types';

export const TRACKS: Track[] = [
  {
    id: 'ai-model',
    number: '01',
    title: 'AI Model Making',
    titleLines: ['AI Model', 'Making'],
    tagline: 'Algorithms and neural systems',
    description:
      'Develop, fine-tune, and deploy machine learning models. Turn raw data, loss functions, and neural architectures into practical tools.',
    focusAreas: ['Computer Vision', 'Predictive Classification', 'Natural Language Processing', 'Data Synthesis'],
    sampleProject: 'Fine-tuned vision model detecting local environmental hazards or crop diseases.',
    tools: ['PyTorch', 'TensorFlow', 'Scikit-Learn', 'Hugging Face'],
  },
  {
    id: 'web-dev',
    number: '02',
    title: 'Web Development',
    titleLines: ['Web', 'Development'],
    tagline: 'Modern high-impact platforms',
    description:
      'Build high-performance web applications, interactive software, and student utility hubs that solve real-world problems.',
    focusAreas: ['Interactive SPAs', 'Offline-First Architectures', 'Student Productivity Hubs', 'Real-Time Utility'],
    sampleProject: 'Peer-to-peer resource exchange platform for high school research initiatives.',
    tools: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS'],
  },
  {
    id: 'game-dev',
    number: '03',
    title: 'Game Development',
    titleLines: ['Game', 'Development'],
    tagline: 'Interactive mechanics and worlds',
    description:
      'Bring your imagination to life through original mechanics, physics-driven gameplay, and atmospheric digital environments.',
    focusAreas: ['2D Pixel Platformers', 'Narrative Simulators', 'Physics-Driven Puzzles', 'Educational Mechanics'],
    sampleProject: 'Gravity-manipulation arcade puzzle game teaching orbital celestial physics.',
    tools: ['Godot', 'Unity', 'Phaser.js', 'Kaboom.js'],
  },
  {
    id: 'ai-agents',
    number: '04',
    title: 'AI Agents',
    titleLines: ['AI', 'Agents'],
    tagline: 'Autonomous systems and tool use',
    description:
      'Build agentic loops capable of multi-step reasoning, external tool execution, browser automation, and self-correcting logic.',
    focusAreas: ['Multi-Step Planners', 'Browser Automations', 'Research Synthesizers', 'Code Verification Loops'],
    sampleProject: 'Autonomous curriculum coach that breaks a complex syllabus into daily hands-on experiments.',
    tools: ['LangChain', 'Function Calling', 'Agentic Workflows', 'Python'],
  },
  {
    id: 'voice-assistants',
    number: '05',
    title: 'Voice Assistants',
    titleLines: ['Voice Assistants'],
    tagline: 'Conversational audio interfaces',
    description:
      'Design natural voice-first experiences that understand spoken commands, multilingual dialogue, and real-time audio generation.',
    focusAreas: ['Speech-to-Intent', 'Hands-Free Access', 'Multilingual Dialogue', 'Assistive Speech Systems'],
    sampleProject: 'Voice-controlled accessibility assistant for visual impairment in school libraries.',
    tools: ['Web Speech API', 'Whisper', 'ElevenLabs', 'Realtime Audio'],
  },
];
