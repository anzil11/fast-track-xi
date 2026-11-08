import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Activity, Radio, EyeOff, Sparkles } from 'lucide-react';

export default function BackgroundAnimation() {
  const { isWhite } = useTheme();
  const canvasRef = useRef(null);

  // Background animation active state (can be toggled by user)
  const [isAnimationActive, setIsAnimationActive] = useState(true);
  const [showControlsHint, setShowControlsHint] = useState(false);
  const [pulseCount, setPulseCount] = useState(0);

  // Mouse interaction state
  const mouseRef = useRef({
    x: -1000,
    y: -1000,
    active: false,
    radius: 160,
    lastMove: 0
  });

  // Animation frame and resize refs
  const rafRef = useRef(null);
  const nodesRef = useRef([]);
  const packetsRef = useRef([]);
  const dimensionsRef = useRef({ width: 0, height: 0, dpr: 1 });

  // 1. Initialize Survey Nodes & Telemetry Network (Optimized density)
  const initNetwork = useCallback((width, height) => {
    // Determine lightweight node density based on screen size for silky 60-120fps
    const isMobile = width < 768;
    const nodeCount = isMobile ? 16 : Math.min(Math.floor((width * height) / 45000), 32);

    const nodes = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        baseRadius: Math.random() * 1.6 + 1.2,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.025,
        type: i % 3 === 0 ? 'radar' : i % 3 === 1 ? 'count' : 'waypoint',
      });
    }

    // Telemetry data packets traveling along nodes
    const packets = [];
    const packetCount = isMobile ? 4 : 8;
    for (let i = 0; i < packetCount; i++) {
      packets.push({
        sourceIndex: Math.floor(Math.random() * nodeCount),
        targetIndex: Math.floor(Math.random() * nodeCount),
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.005,
        size: Math.random() * 1.4 + 1.2
      });
    }

    nodesRef.current = nodes;
    packetsRef.current = packets;
  }, []);

  // 2. Setup canvas, DPR scaling, and event listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let resizeTimer = null;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        dimensionsRef.current = { width, height, dpr };
        initNetwork(width, height);
      }, 100);
    };

    // Initial sizing
    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    dimensionsRef.current = { width, height, dpr };
    initNetwork(width, height);

    window.addEventListener('resize', handleResize, { passive: true });

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
      mouseRef.current.lastMove = Date.now();
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [initNetwork]);

  // 3. Render Animation Loop (Hardware-accelerated, single-pass batching)
  useEffect(() => {
    if (!isAnimationActive) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let radarPingRadius = 0;
    let radarPingAlpha = 0;
    let isScrolling = false;
    let scrollTimeout = null;

    const onScroll = () => {
      isScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 80);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const render = () => {
      const { width, height, dpr } = dimensionsRef.current;
      if (width === 0 || height === 0) {
        rafRef.current = requestAnimationFrame(render);
        return;
      }

      // If user is actively scrolling, skip heavy draw to preserve 60/120fps scroll smoothness
      if (isScrolling) {
        rafRef.current = requestAnimationFrame(render);
        return;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const nodes = nodesRef.current;
      const mouse = mouseRef.current;
      const now = Date.now();
      const nodeCount = nodes.length;

      // Theme-specific colors
      const nodeColorPrimary = isWhite ? 'rgba(1, 106, 151, ' : 'rgba(46, 163, 217, ';
      const nodeColorSecondary = isWhite ? 'rgba(38, 51, 93, ' : 'rgba(56, 189, 248, ';
      const lineColorBase = isWhite ? 'rgba(1, 106, 151, 0.12)' : 'rgba(46, 163, 217, 0.16)';
      const packetColor = isWhite ? '#016a97' : '#38bdf8';
      const packetGlowColor = isWhite ? 'rgba(1, 106, 151, 0.25)' : 'rgba(56, 189, 248, 0.3)';
      const maxConnectDistance = isWhite ? 120 : 135;
      const maxConnectDistanceSq = maxConnectDistance * maxConnectDistance;

      // Mouse radar sweep ring
      if (mouse.active && now - mouse.lastMove < 2000) {
        radarPingRadius += 1.2;
        if (radarPingRadius > 130) radarPingRadius = 0;
        radarPingAlpha = Math.max(0, (1 - radarPingRadius / 130) * (isWhite ? 0.2 : 0.35));

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, radarPingRadius, 0, Math.PI * 2);
        ctx.strokeStyle = isWhite ? `rgba(1, 106, 151, ${radarPingAlpha})` : `rgba(46, 163, 217, ${radarPingAlpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // 1. Move survey nodes
      for (let i = 0; i < nodeCount; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        if (mouse.active) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < mouse.radius * mouse.radius) {
            const dist = Math.sqrt(distSq);
            const pullFactor = (1 - dist / mouse.radius) * 0.012;
            node.x += dx * pullFactor;
            node.y += dy * pullFactor;
          }
        }

        node.pulsePhase += node.pulseSpeed;
      }

      // 2. High performance single-path batch line drawing (1 draw call instead of 100)
      ctx.beginPath();
      for (let i = 0; i < nodeCount; i++) {
        const ni = nodes[i];
        for (let j = i + 1; j < nodeCount; j++) {
          const nj = nodes[j];
          const dx = ni.x - nj.x;
          const dy = ni.y - nj.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxConnectDistanceSq) {
            ctx.moveTo(ni.x, ni.y);
            ctx.lineTo(nj.x, nj.y);
          }
        }
      }
      ctx.strokeStyle = lineColorBase;
      ctx.lineWidth = 0.75;
      ctx.stroke();

      // 3. Draw nodes
      for (let i = 0; i < nodeCount; i++) {
        const node = nodes[i];
        const pulse = Math.sin(node.pulsePhase) * 0.5;
        const currentRadius = Math.max(0.8, node.baseRadius + pulse);

        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        const nodeAlpha = isWhite ? 0.45 : 0.7;
        ctx.fillStyle = `${node.type === 'radar' ? nodeColorPrimary : nodeColorSecondary}${nodeAlpha})`;
        ctx.fill();
      }

      // 4. Draw data packets (fast dual-arc glow without slow shadowBlur)
      const packets = packetsRef.current;
      for (let k = 0; k < packets.length; k++) {
        const p = packets[k];
        const source = nodes[p.sourceIndex % nodeCount];
        const target = nodes[p.targetIndex % nodeCount];

        if (source && target) {
          const dx = target.x - source.x;
          const dy = target.y - source.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxConnectDistanceSq * 2.25) {
            p.progress += p.speed;
            if (p.progress >= 1) {
              p.progress = 0;
              p.sourceIndex = p.targetIndex;
              p.targetIndex = Math.floor(Math.random() * nodeCount);
            }

            const currentX = source.x + dx * p.progress;
            const currentY = source.y + dy * p.progress;

            // Soft outer glow ring
            ctx.beginPath();
            ctx.arc(currentX, currentY, p.size * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = packetGlowColor;
            ctx.fill();

            // Sharp core dot
            ctx.beginPath();
            ctx.arc(currentX, currentY, p.size, 0, Math.PI * 2);
            ctx.fillStyle = packetColor;
            ctx.fill();
          } else {
            p.targetIndex = Math.floor(Math.random() * nodeCount);
          }
        }
      }

      ctx.restore();
      rafRef.current = requestAnimationFrame(render);
    };

    // Auto-pause RAF when window/tab is hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      } else if (isAnimationActive) {
        rafRef.current = requestAnimationFrame(render);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    rafRef.current = requestAnimationFrame(render);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('scroll', onScroll);
      clearTimeout(scrollTimeout);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isAnimationActive, isWhite]);

  return (
    <>
      {/* 1. Global Interactive Telemetry Canvas (Hardware-Accelerated) */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
        style={{
          opacity: isAnimationActive ? 1 : 0
        }}
        aria-hidden="true"
      />

      {/* 2. Ambient Motorway Speed Tracks / Diagonal Telemetry Rays */}
      {isAnimationActive && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          {/* Angled Speed Beam 1 */}
          <div
            className={`absolute -top-40 -left-40 w-[140vw] h-[2px] -rotate-12 pointer-events-none opacity-30 ${
              isWhite ? 'speed-track-light' : 'speed-track-dark'
            }`}
            style={{
              animationDuration: '7s'
            }}
          />

          {/* Angled Speed Beam 2 (lower screen) */}
          <div
            className={`absolute top-[65%] -left-40 w-[140vw] h-[1.5px] rotate-6 pointer-events-none opacity-20 ${
              isWhite ? 'speed-track-light' : 'speed-track-dark'
            }`}
            style={{
              animationDuration: '11s',
              animationDelay: '3s'
            }}
          />

          {/* Corner Ambient Halo Gradients */}
          <div
            className={`absolute top-0 right-0 w-[550px] h-[450px] rounded-full blur-[140px] pointer-events-none transition-colors duration-500 ${
              isWhite ? 'bg-[#016a97]/[0.04]' : 'bg-[#2ea3d9]/[0.07]'
            }`}
          />
          <div
            className={`absolute bottom-0 left-0 w-[600px] h-[500px] rounded-full blur-[160px] pointer-events-none transition-colors duration-500 ${
              isWhite ? 'bg-[#2ea3d9]/[0.03]' : 'bg-[#016a97]/[0.10]'
            }`}
          />
        </div>
      )}

      {/* 3. Subtle Floating Background Motion Controller (Bottom-Right Widget) */}
      <div
        className="fixed bottom-4 right-4 z-40 hidden sm:flex items-center"
        onMouseEnter={() => setShowControlsHint(true)}
        onMouseLeave={() => setShowControlsHint(false)}
      >
        <div
          className={`flex items-center gap-2 px-2.5 py-1.5 rounded-full border shadow-lg backdrop-blur-md transition-all duration-300 text-xs font-mono ${
            isWhite
              ? 'bg-white/85 border-slate-300 text-slate-700 shadow-slate-200/50'
              : 'bg-[#0b142d]/85 border-[#26335d] text-slate-300 shadow-[0_0_15px_rgba(46,163,217,0.2)]'
          }`}
        >
          {/* Active Sensor Beacon Pulse */}
          <span className="relative flex h-2 w-2">
            {isAnimationActive && (
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isWhite ? 'bg-[#016a97]' : 'bg-[#2ea3d9]'
                }`}
              />
            )}
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                isAnimationActive
                  ? isWhite
                    ? 'bg-[#016a97]'
                    : 'bg-[#2ea3d9]'
                  : 'bg-slate-400'
              }`}
            />
          </span>

          <span className="text-[10px] uppercase font-bold tracking-wider">
            {isAnimationActive ? 'Survey Radar' : 'Radar Muted'}
          </span>

          {/* Toggle Button */}
          <button
            type="button"
            onClick={() => setIsAnimationActive((prev) => !prev)}
            aria-label={isAnimationActive ? 'Pause Background Animation' : 'Resume Background Animation'}
            data-cursor-text={isAnimationActive ? 'PAUSE' : 'PLAY'}
            className={`p-1 rounded-full transition-colors ml-0.5 ${
              isWhite
                ? 'hover:bg-slate-200 text-slate-600'
                : 'hover:bg-[#1a2955] text-cyan-300'
            }`}
            title={isAnimationActive ? 'Mute Background Network Animation' : 'Enable Background Network Animation'}
          >
            {isAnimationActive ? (
              <Radio className="w-3.5 h-3.5 animate-pulse" />
            ) : (
              <EyeOff className="w-3.5 h-3.5 text-slate-400" />
            )}
          </button>
        </div>
      </div>
    </>
  );
}
