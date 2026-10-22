import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook to govern simulation playback conforming to:
 * - Show complete still frame initially.
 * - Start only when "Play example" is pressed.
 * - "Pause" while playing, "Resume" when paused.
 * - "Replay" resets scene and all displayed figures to starting state.
 * - Run a short finite sequence, then stop on a useful final result. Do not loop indefinitely.
 * - Pause off-screen playback (IntersectionObserver) & hidden tabs (visibilitychange).
 * - Honour reduced-motion preferences with static result & plain-language notice.
 * - Accessible controls.
 */
export function useSimulationPlayback({
  totalDurationMs = 4500,
  stepCount = 3,
  containerRef
}) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [playbackState, setPlaybackState] = useState('idle'); // 'idle' | 'playing' | 'paused' | 'completed'
  const [progress, setProgress] = useState(0); // 0 to 1
  const [currentStep, setCurrentStep] = useState(0); // 0 to stepCount
  const [replayKey, setReplayKey] = useState(0);

  const startTimeRef = useRef(null);
  const pausedProgressRef = useRef(0);
  const animFrameRef = useRef(null);
  const wasPlayingOffscreenRef = useRef(false);

  // Check prefers-reduced-motion on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    if (mediaQuery.matches) {
      setPlaybackState('completed');
      setProgress(1);
      setCurrentStep(stepCount);
    }

    const handler = (e) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) {
        setPlaybackState('completed');
        setProgress(1);
        setCurrentStep(stepCount);
      }
    };
    mediaQuery.addEventListener?.('change', handler);
    return () => mediaQuery.removeEventListener?.('change', handler);
  }, [stepCount]);

  // Main finite playback loop
  useEffect(() => {
    if (playbackState !== 'playing') {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    startTimeRef.current = performance.now() - (pausedProgressRef.current * totalDurationMs);

    const tick = (now) => {
      const elapsed = now - startTimeRef.current;
      const currentProg = Math.min(1, elapsed / totalDurationMs);
      pausedProgressRef.current = currentProg;
      setProgress(currentProg);

      const step = Math.min(stepCount, Math.floor(currentProg * stepCount));
      setCurrentStep(step);

      if (currentProg < 1) {
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        // Stop on useful final result, do not loop
        setPlaybackState('completed');
        setCurrentStep(stepCount);
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [playbackState, totalDurationMs, stepCount, replayKey]);

  // Pause on hidden tabs
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        if (playbackState === 'playing') {
          wasPlayingOffscreenRef.current = true;
          setPlaybackState('paused');
        }
      } else if (wasPlayingOffscreenRef.current) {
        wasPlayingOffscreenRef.current = false;
        setPlaybackState('playing');
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [playbackState]);

  // Pause off-screen playback via IntersectionObserver
  useEffect(() => {
    if (!containerRef?.current || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && playbackState === 'playing') {
          wasPlayingOffscreenRef.current = true;
          setPlaybackState('paused');
        } else if (entry.isIntersecting && wasPlayingOffscreenRef.current) {
          wasPlayingOffscreenRef.current = false;
          setPlaybackState('playing');
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [playbackState, containerRef]);

  const play = useCallback(() => {
    if (playbackState === 'completed') {
      pausedProgressRef.current = 0;
      setProgress(0);
      setCurrentStep(0);
      setReplayKey((k) => k + 1);
    }
    setPlaybackState('playing');
  }, [playbackState]);

  const pause = useCallback(() => {
    setPlaybackState('paused');
  }, []);

  const resume = useCallback(() => {
    setPlaybackState('playing');
  }, []);

  const togglePlay = useCallback(() => {
    if (playbackState === 'idle') {
      play();
    } else if (playbackState === 'playing') {
      pause();
    } else if (playbackState === 'paused') {
      resume();
    } else if (playbackState === 'completed') {
      play();
    }
  }, [playbackState, play, pause, resume]);

  const replay = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    pausedProgressRef.current = 0;
    setProgress(0);
    setCurrentStep(0);
    setReplayKey((k) => k + 1);
    setPlaybackState('idle');
  }, []);

  return {
    playbackState, // 'idle' | 'playing' | 'paused' | 'completed'
    isPlaying: playbackState === 'playing',
    isPaused: playbackState === 'paused',
    isCompleted: playbackState === 'completed',
    isIdle: playbackState === 'idle',
    progress,
    currentStep,
    replayKey,
    prefersReducedMotion,
    togglePlay,
    play,
    pause,
    resume,
    replay
  };
}
