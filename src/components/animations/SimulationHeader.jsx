import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function SimulationHeader({
  title,
  icon: Icon,
  accentColor = '#0284c7',
  playbackState, // 'idle' | 'playing' | 'paused' | 'completed'
  onTogglePlay,
  onReplay,
  ariaTitle
}) {
  const { isWhite } = useTheme();

  const getPlayButtonContent = () => {
    switch (playbackState) {
      case 'playing':
        return (
          <>
            <Pause className="w-3.5 h-3.5" />
            <span>Pause</span>
          </>
        );
      case 'paused':
        return (
          <>
            <Play className="w-3.5 h-3.5" />
            <span>Resume</span>
          </>
        );
      case 'completed':
        return (
          <>
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Replay</span>
          </>
        );
      case 'idle':
      default:
        return (
          <>
            <Play className="w-3.5 h-3.5" />
            <span>Play example</span>
          </>
        );
    }
  };

  const getPlayButtonAriaLabel = () => {
    switch (playbackState) {
      case 'playing':
        return 'Pause survey animation';
      case 'paused':
        return 'Resume survey animation';
      case 'completed':
        return 'Replay survey animation';
      case 'idle':
      default:
        return 'Play survey animation example';
    }
  };

  return (
    <div
      className={`relative z-10 flex flex-wrap items-center justify-between border-b pb-3 gap-2 text-xs font-mono transition-colors ${
        isWhite ? 'border-slate-200' : 'border-slate-800'
      }`}
    >
      {/* Title & Badge */}
      <div className="flex items-center gap-2.5 flex-wrap">
        {Icon && (
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
            style={{
              backgroundColor: `${accentColor}20`,
              color: accentColor
            }}
          >
            <Icon className="w-3.5 h-3.5" />
          </div>
        )}
        <h3
          className={`font-bold font-display text-sm tracking-wide ${
            isWhite ? 'text-slate-900' : 'text-white'
          }`}
        >
          {title}
        </h3>
        <span
          className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
            isWhite
              ? 'bg-slate-100 border-slate-300 text-slate-700'
              : 'bg-slate-800/90 border-slate-700 text-slate-300'
          }`}
        >
          Illustrative example
        </span>
      </div>

      {/* Playback Controls */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onTogglePlay}
          aria-label={getPlayButtonAriaLabel()}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isWhite
              ? 'bg-slate-900 hover:bg-slate-800 text-white focus:ring-slate-900 focus:ring-offset-white'
              : 'bg-sky-500 hover:bg-sky-400 text-slate-950 focus:ring-sky-400 focus:ring-offset-slate-950'
          }`}
        >
          {getPlayButtonContent()}
        </button>

        <button
          type="button"
          onClick={onReplay}
          aria-label="Reset and replay animation"
          title="Reset animation to initial frame"
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs transition-colors border focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isWhite
              ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 focus:ring-slate-400 focus:ring-offset-white'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700 focus:ring-slate-500 focus:ring-offset-slate-950'
          }`}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
}
