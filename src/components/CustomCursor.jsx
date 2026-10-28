import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function CustomCursor() {
  const { isWhite } = useTheme();

  // Fine pointer detection (desktop mouse vs touch)
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [cursorAccent, setCursorAccent] = useState(null);
  const [ripples, setRipples] = useState([]);

  // Refs for direct DOM manipulation (60-120fps silky smooth performance)
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const auraRef = useRef(null);

  // Position coordinates
  const mouseRef = useRef({ x: -100, y: -100 });
  const ringPosRef = useRef({ x: -100, y: -100 });
  const auraPosRef = useRef({ x: -100, y: -100 });
  const rafIdRef = useRef(null);

  // 1. Check if device supports fine pointer (mouse/trackpad)
  useEffect(() => {
    const checkFinePointer = () => {
      const fine = window.matchMedia('(pointer: fine)').matches;
      setIsFinePointer(fine);
    };

    checkFinePointer();
    const mql = window.matchMedia('(pointer: fine)');
    mql.addEventListener('change', checkFinePointer);
    return () => mql.removeEventListener('change', checkFinePointer);
  }, []);

  // 2. High-performance RAF animation loop for smooth trailing follower
  useEffect(() => {
    if (!isFinePointer) return;

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animate = () => {
      const targetX = mouseRef.current.x;
      const targetY = mouseRef.current.y;

      // Smooth lerp for ring (elastic trailing effect)
      ringPosRef.current.x = lerp(ringPosRef.current.x, targetX, 0.22);
      ringPosRef.current.y = lerp(ringPosRef.current.y, targetY, 0.22);

      // Slower lerp for ambient aura
      auraPosRef.current.x = lerp(auraPosRef.current.x, targetX, 0.12);
      auraPosRef.current.y = lerp(auraPosRef.current.y, targetY, 0.12);

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPosRef.current.x}px, ${ringPosRef.current.y}px, 0)`;
      }

      if (auraRef.current) {
        auraRef.current.style.transform = `translate3d(${auraPosRef.current.x}px, ${auraPosRef.current.y}px, 0)`;
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [isFinePointer]);

  // 3. Mouse event listeners (movement, hover detection, clicking)
  useEffect(() => {
    if (!isFinePointer) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      mouseRef.current.x = clientX;
      mouseRef.current.y = clientY;

      // Instant positioning for precision center dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }

      if (!isVisible) {
        setIsVisible(true);
        // Sync ring position immediately on initial entry
        ringPosRef.current.x = clientX;
        ringPosRef.current.y = clientY;
        auraPosRef.current.x = clientX;
        auraPosRef.current.y = clientY;
      }

      // Check hovered element
      const target = e.target;
      if (!target) return;

      const interactiveEl = target.closest(
        'a, button, input, textarea, select, summary, [role="button"], [role="link"], .cursor-pointer, .interactive-hover, [data-cursor-text]'
      );

      if (interactiveEl) {
        setIsHovered(true);
        const text = interactiveEl.getAttribute('data-cursor-text');
        setCursorText(text || '');

        const customAccent = interactiveEl.getAttribute('data-cursor-accent');
        setCursorAccent(customAccent || null);
      } else {
        setIsHovered(false);
        setCursorText('');
        setCursorAccent(null);
      }
    };

    const handleMouseDown = (e) => {
      setIsMouseDown(true);
      // Spawn a ripple animation at click location
      const newRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY
      };
      setRipples((prev) => [...prev.slice(-4), newRipple]);

      // Remove ripple after animation completes
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 700);
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isFinePointer, isVisible]);

  if (!isFinePointer) return null;

  // Theme color accents
  const brandPrimary = cursorAccent || (isWhite ? '#016a97' : '#2ea3d9');
  const brandGlow = isWhite ? 'rgba(1, 106, 151, 0.25)' : 'rgba(46, 163, 217, 0.45)';

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[9999] overflow-hidden transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* 1. Ambient Trailing Glow Aura */}
      <div
        ref={auraRef}
        className="absolute top-0 left-0 w-32 h-32 -mt-16 -ml-16 rounded-full blur-2xl pointer-events-none transition-transform duration-75 will-change-transform"
        style={{
          background: `radial-gradient(circle, ${brandGlow} 0%, transparent 70%)`,
          opacity: isHovered ? 0.8 : 0.4
        }}
      />

      {/* 2. Smooth Follower Ring / Interactive Reticle */}
      <div
        ref={ringRef}
        className="absolute top-0 left-0 will-change-transform pointer-events-none"
      >
        <div
          className={`flex items-center justify-center -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-200 ease-out backdrop-blur-[2px] ${
            cursorText
              ? 'px-3 py-1.5 min-w-[72px] h-[32px] rounded-full'
              : isMouseDown
              ? 'w-6 h-6 scale-90'
              : isHovered
              ? 'w-14 h-14 scale-100'
              : 'w-9 h-9'
          }`}
          style={{
            borderColor: brandPrimary,
            backgroundColor: isHovered
              ? isWhite
                ? 'rgba(1, 106, 151, 0.12)'
                : 'rgba(46, 163, 217, 0.18)'
              : 'transparent',
            boxShadow: isHovered
              ? `0 0 20px ${brandGlow}, inset 0 0 10px ${brandGlow}`
              : `0 0 10px ${brandGlow}`
          }}
        >
          {/* Action text badge (when element has data-cursor-text) */}
          {cursorText && (
            <span
              className="text-[10px] font-mono font-bold tracking-wider uppercase select-none transition-opacity duration-200"
              style={{
                color: isWhite ? '#016a97' : '#ffffff',
                textShadow: isWhite ? 'none' : '0 0 8px rgba(46, 163, 217, 0.8)'
              }}
            >
              {cursorText}
            </span>
          )}

          {/* Radar survey crosshair marks when hovered and no text */}
          {isHovered && !cursorText && (
            <div className="absolute inset-0 flex items-center justify-center opacity-40">
              <span
                className="w-full h-[1px] absolute"
                style={{ backgroundColor: brandPrimary }}
              />
              <span
                className="h-full w-[1px] absolute"
                style={{ backgroundColor: brandPrimary }}
              />
            </div>
          )}
        </div>
      </div>

      {/* 3. Precision Lead Dot (Zero Latency) */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 will-change-transform pointer-events-none"
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-150 ${
            isMouseDown
              ? 'w-2 h-2 scale-150'
              : isHovered && cursorText
              ? 'w-0 h-0 opacity-0'
              : isHovered
              ? 'w-1.5 h-1.5'
              : 'w-2 h-2'
          }`}
          style={{
            backgroundColor: brandPrimary,
            boxShadow: `0 0 8px ${brandPrimary}`
          }}
        />
      </div>

      {/* 4. Click Ripples (Dynamic Radar Ping on Click) */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border pointer-events-none animate-ping"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            width: '36px',
            height: '36px',
            borderColor: brandPrimary,
            animationDuration: '650ms',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
          }}
        />
      ))}
    </div>
  );
}
