import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, Sparkles, Music, ChevronDown, ChevronUp } from 'lucide-react';
import { ambientMusic } from '../utils/ambientMusic';
import { playSfx } from '../utils/audio';

export const AmbientPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const unsubscribe = ambientMusic.subscribe((playing) => {
      setIsPlaying(playing);
    });

    // Auto-dismiss initial hint after 8 seconds
    const hintTimer = setTimeout(() => setShowHint(false), 8000);

    return () => {
      unsubscribe();
      clearTimeout(hintTimer);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Audio Visualizer Canvas Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const analyser = ambientMusic.getAnalyser();
    const dataArray = new Uint8Array(32);

    const render = () => {
      if (!canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (analyser && isPlaying) {
        analyser.getByteFrequencyData(dataArray);
      } else {
        dataArray.fill(0);
      }

      const barCount = 14;
      const barWidth = 3;
      const gap = 2;
      const startX = (canvas.width - (barCount * barWidth + (barCount - 1) * gap)) / 2;

      for (let i = 0; i < barCount; i++) {
        // Calculate height based on frequency or fallback subtle idle breathing
        let val = isPlaying ? (dataArray[i * 2] || 0) / 255 : 0;
        if (!isPlaying) {
          val = 0.08 + Math.sin(Date.now() * 0.003 + i * 0.4) * 0.05;
        }

        const barHeight = Math.max(3, val * (canvas.height - 2));
        const x = startX + i * (barWidth + gap);
        const y = canvas.height - barHeight;

        // Colors alternating between Red (#FF1744) and Yellow (#FFD633)
        ctx.fillStyle = i % 3 === 0 ? '#FF1744' : i % 3 === 1 ? '#FFD633' : '#FFFFFF';
        ctx.fillRect(x, y, barWidth, barHeight);
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying]);

  const handleToggle = () => {
    playSfx('click');
    setHasInteracted(true);
    setShowHint(false);
    ambientMusic.toggle();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    ambientMusic.setVolume(val);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 select-none">
      {/* Initial Soothing Music Invitation Tooltip */}
      <AnimatePresence>
        {showHint && !isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute bottom-full right-0 mb-3 w-64 bg-[#F7F5EF] border-2 border-[#FFD633] sticker-shadow-red p-3 pointer-events-auto"
          >
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#FFD633] animate-pulse" />
              <span className="font-mono-tech text-[10px] text-[#FFD633] uppercase font-bold tracking-widest">
                IMMERSIVE SOUNDSCAPE
              </span>
            </div>
            <p className="font-heading text-xs text-[#111111]/90 leading-tight">
              Tap play below to start the gentle Daisy Bell synth arrangement while you explore.
            </p>
            <button
              onClick={handleToggle}
              className="mt-2 w-full bg-[#FFD633] hover:bg-white text-black font-display text-[10px] tracking-wider py-1.5 border border-black flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Play className="w-3 h-3 fill-black" />
              <span>PLAY AMBIENCE</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Ambient Player Capsule */}
      <div className="bg-[#F7F5EF]/95 backdrop-blur-md border-2 border-black sticker-shadow-yellow overflow-hidden transition-all duration-300">
        
        {/* Compact Bar */}
        <div className={`flex items-center gap-3 px-3 py-2 ${isExpanded ? '' : 'player-compact'}`}>
          {/* Play/Pause Tactile Button */}
          <button
            onClick={handleToggle}
            aria-label={isPlaying ? 'Pause ambient music' : 'Play ambient music'}
            className={`w-9 h-9 flex items-center justify-center border-2 transition-all cursor-pointer ${
              isPlaying
                ? 'bg-[#FF1744] text-[#111111] border-black shadow-[2px_2px_0px_#FFD633]'
                : 'bg-[#FFD633] text-black border-black hover:bg-white shadow-[2px_2px_0px_#FFFFFF]'
            }`}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 fill-current ml-0.5" />
            )}
          </button>

          {/* Track Info & Visualizer */}
          <div className="flex flex-col cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
            <div className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-[#FF1744] animate-ping' : 'bg-white/40'}`} />
              <span className="font-mono-tech text-[9px] text-[#111111]/60 uppercase tracking-widest">
                {isPlaying ? 'PLAYING NOW' : 'AMBIENT SOUND'}
              </span>
            </div>
            <div className="font-display text-xs text-[#111111] uppercase tracking-wider flex items-center gap-1.5">
              <span>DAISY BELL // SYNTH ARRANGEMENT</span>
            </div>
          </div>

          {/* Real-time Equalizer Waveform Canvas */}
          <div className="w-16 h-7 bg-[#F7F5EF] border border-black/20 flex items-center justify-center px-1">
            <canvas ref={canvasRef} width={64} height={24} className="w-full h-full" />
          </div>

          {/* Expand/Collapse Toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label="Toggle music player options"
            className="p-1 text-[#111111]/60 hover:text-[#111111] transition-colors cursor-pointer"
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>

        {/* Expanded Controls: Volume Slider & Sound Details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="border-t border-black/20 px-3.5 py-2.5 bg-[#F7F5EF]/90 space-y-2"
            >
              {/* Volume Slider */}
              <div className="flex items-center gap-2.5">
                {volume === 0 ? (
                  <VolumeX className="w-3.5 h-3.5 text-[#111111]/50 shrink-0" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-[#FFD633] shrink-0" />
                )}
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full h-1 bg-white/20 accent-[#FF1744] cursor-pointer"
                  aria-label="Ambient volume"
                />
                <span className="font-mono-tech text-[10px] text-[#111111]/60 w-8 text-right">
                  {Math.round(volume * 100)}%
                </span>
              </div>

              {/* Subtitle description */}
              <div className="flex items-center justify-between text-[9px] font-mono-tech text-[#111111]/50 pt-1 border-t border-black/10">
                <span>WARM PADS & SOFT MELODY</span>
                <span className="text-[#FFD633]">C-MAJOR // PUBLIC DOMAIN</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
