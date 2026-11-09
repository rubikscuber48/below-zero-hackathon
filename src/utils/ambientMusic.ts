/**
 * Daisy Bell Ambient Music Synthesizer for Below Zero // Lost in Stars.
 * Uses an original Web Audio arrangement of the public-domain composition,
 * with warm chord pads, stereo delay diffusion, and a softly voiced melody.
 */

class AmbientMusicEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private delayNode1: DelayNode | null = null;
  private delayNode2: DelayNode | null = null;
  private delayFeedback: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private activeVoices: { osc: OscillatorNode; gain: GainNode }[] = [];
  private sequenceTimer: number | null = null;
  private bellTimer: number | null = null;
  private chordIndex = 0;
  private melodyIndex = 0;
  private volume = 0.35; // Default soothing volume
  private listeners: ((playing: boolean) => void)[] = [];

  // Warm C-major chord cycle for the Daisy Bell arrangement (frequencies in Hz)
  private chords = [
    // Cmaj7 (C, E, G, B)
    [130.81, 164.81, 196.0, 246.94],
    // Fmaj7 (F, A, C, E)
    [174.61, 220.0, 261.63, 329.63],
    // G7 (G, B, D, F)
    [196.0, 246.94, 293.66, 349.23],
    // C6 (C, E, G, A)
    [130.81, 164.81, 196.0, 220.0],
  ];

  // Gentle lead phrase from Daisy Bell, voiced as original soft synth tones.
  private melodyNotes = [
    392.0, 392.0, 440.0, 493.88, 523.25, 493.88, 440.0, 392.0,
    329.63, 392.0, 440.0, 392.0, 329.63, 0,
    392.0, 392.0, 440.0, 493.88, 523.25, 587.33, 659.25, 659.25,
    587.33, 523.25, 493.88, 440.0, 392.0, 0,
  ];

  private getAudioContext(): AudioContext | null {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
    return this.ctx;
  }

  private initAudioChain(): void {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    if (this.masterGain) return; // Already initialized

    // Master Gain
    this.masterGain = ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, ctx.currentTime);

    // Warm Lowpass Biquad Filter (soothing warmth, rolls off harsh highs)
    this.filterNode = ctx.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.setValueAtTime(650, ctx.currentTime);
    this.filterNode.Q.setValueAtTime(1.2, ctx.currentTime);

    // Stereo Space Delay / Reverb simulation
    this.delayNode1 = ctx.createDelay();
    this.delayNode1.delayTime.setValueAtTime(0.48, ctx.currentTime);

    this.delayNode2 = ctx.createDelay();
    this.delayNode2.delayTime.setValueAtTime(0.72, ctx.currentTime);

    this.delayFeedback = ctx.createGain();
    this.delayFeedback.gain.setValueAtTime(0.38, ctx.currentTime);

    // Analyser Node for Real-time Waveform visualization
    this.analyser = ctx.createAnalyser();
    this.analyser.fftSize = 64;
    this.analyser.smoothingTimeConstant = 0.8;

    // Connect Delay Feedback Loop
    this.filterNode.connect(this.delayNode1);
    this.delayNode1.connect(this.delayNode2);
    this.delayNode2.connect(this.delayFeedback);
    this.delayFeedback.connect(this.filterNode);

    // Connect to Master and Destination
    this.filterNode.connect(this.masterGain);
    this.delayNode1.connect(this.masterGain);
    this.masterGain.connect(this.analyser);
    this.analyser.connect(ctx.destination);
  }

  public getAnalyser(): AnalyserNode | null {
    return this.analyser;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getVolume(): number {
    return this.volume;
  }

  public setVolume(vol: number): void {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.ctx && this.masterGain && this.isPlaying) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.linearRampToValueAtTime(this.volume, now + 0.1);
    }
  }

  public subscribe(listener: (playing: boolean) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify(): void {
    this.listeners.forEach((l) => l(this.isPlaying));
  }

  public start(): void {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    this.initAudioChain();

    if (this.isPlaying) return;
    this.isPlaying = true;

    const now = ctx.currentTime;
    if (this.masterGain) {
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(0.001, now);
      // Gentle 2.5s fade-in
      this.masterGain.gain.linearRampToValueAtTime(this.volume, now + 2.5);
    }

    // Play first chord
    this.playChord(this.chords[this.chordIndex]);

    // Progress chords every 9 seconds
    this.sequenceTimer = window.setInterval(() => {
      this.chordIndex = (this.chordIndex + 1) % this.chords.length;
      this.playChord(this.chords[this.chordIndex]);
    }, 9000);

    // Schedule the soft Daisy Bell lead phrase
    this.melodyIndex = 0;
    this.scheduleDaisyMelody();

    this.notify();
  }

  public pause(): void {
    if (!this.isPlaying) return;
    const ctx = this.getAudioContext();

    if (ctx && this.masterGain) {
      const now = ctx.currentTime;
      // Gentle 1s fade-out
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 1.2);
    }

    if (this.sequenceTimer) {
      clearInterval(this.sequenceTimer);
      this.sequenceTimer = null;
    }

    if (this.bellTimer) {
      clearTimeout(this.bellTimer);
      this.bellTimer = null;
    }

    setTimeout(() => {
      this.stopAllVoices();
      this.isPlaying = false;
      this.notify();
    }, 1300);
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.start();
    }
    return this.isPlaying;
  }

  private playChord(frequencies: number[]): void {
    const ctx = this.getAudioContext();
    if (!ctx || !this.filterNode) return;

    // Cross-fade out previous voices smoothly over 3.5s
    const oldVoices = [...this.activeVoices];
    this.activeVoices = [];
    const now = ctx.currentTime;

    oldVoices.forEach(({ osc, gain }) => {
      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(gain.gain.value, now);
      gain.gain.linearRampToValueAtTime(0.0001, now + 3.5);
      setTimeout(() => {
        try {
          osc.stop();
          osc.disconnect();
          gain.disconnect();
        } catch {}
      }, 3600);
    });

    // Create warm dual-oscillator voices for current chord
    frequencies.forEach((freq, idx) => {
      // 1. Warm Sine / Triangle body
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();

      // Lower root notes use sine for sub warmth, higher use warm triangle
      osc1.type = idx === 0 ? 'sine' : 'triangle';
      osc1.frequency.setValueAtTime(freq, now);

      // 2. Detuned subtle companion for analog chorusing shimmer (+/- 3 cents)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.detune.setValueAtTime(idx % 2 === 0 ? 4 : -4, now);
      osc2.frequency.setValueAtTime(freq, now);

      // Volume allocation per voice (soft balanced sum)
      const targetGain = idx === 0 ? 0.22 : 0.09;

      gain1.gain.setValueAtTime(0.0001, now);
      gain1.gain.linearRampToValueAtTime(targetGain, now + 2.8);

      gain2.gain.setValueAtTime(0.0001, now);
      gain2.gain.linearRampToValueAtTime(targetGain * 0.6, now + 3.2);

      osc1.connect(gain1);
      osc2.connect(gain2);

      gain1.connect(this.filterNode!);
      gain2.connect(this.filterNode!);

      osc1.start(now);
      osc2.start(now);

      this.activeVoices.push({ osc: osc1, gain: gain1 });
      this.activeVoices.push({ osc: osc2, gain: gain2 });
    });
  }

  private scheduleDaisyMelody(): void {
    if (!this.isPlaying) return;

    // Keep the melody sparse and gentle beneath the page content.
    const delay = 520;

    this.bellTimer = window.setTimeout(() => {
      if (!this.isPlaying) return;

      this.playDaisyNote(this.melodyNotes[this.melodyIndex]);
      this.melodyIndex = (this.melodyIndex + 1) % this.melodyNotes.length;
      this.scheduleDaisyMelody();
    }, delay);
  }

  private playDaisyNote(note: number): void {
    const ctx = this.getAudioContext();
    if (!ctx || !this.filterNode) return;

    if (note === 0) return;

    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Pure crystal sine tone
    osc.type = 'sine';
    osc.frequency.setValueAtTime(note, now);

    // Delicate lead envelope: instant soft attack, gentle half-second decay
    const bellVolume = 0.04;
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(bellVolume, now + 0.06);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.48);

    osc.connect(gain);
    gain.connect(this.filterNode);

    osc.start(now);
    osc.stop(now + 0.55);

    setTimeout(() => {
      try {
        osc.disconnect();
        gain.disconnect();
      } catch {}
    }, 700);
  }

  private stopAllVoices(): void {
    this.activeVoices.forEach(({ osc, gain }) => {
      try {
        osc.stop();
        osc.disconnect();
        gain.disconnect();
      } catch {}
    });
    this.activeVoices = [];
  }
}

// Export singleton instance
export const ambientMusic = new AmbientMusicEngine();
