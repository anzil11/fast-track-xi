import React, { useRef, useMemo } from 'react';
import {
  Activity,
  Gauge,
  Info,
  Clock,
  CheckCircle2,
  Cpu,
  Layers,
  Zap,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useSimulationPlayback } from './useSimulationPlayback';
import SimulationHeader from './SimulationHeader';

// Stream of sample vehicles driving over the MetroCount pneumatic road tubes
const ATC_VEHICLES = [
  {
    id: 'atc-1',
    type: 'Car',
    name: 'Family Hatchback',
    plate: 'CAR 01',
    color: '#0284c7',
    speed: 31.8,
    wheelbase: 2.65,
    axles: 2,
    schemeF: 'Class 2 (Short)',
    lane: 'Eastbound (Lane 1)',
    dir: 'east',
    tStart: 0.05,
    tTubeA: 0.22,
    tTubeB: 0.25,
    tEnd: 0.45,
    length: 26,
    width: 13
  },
  {
    id: 'atc-2',
    type: 'LGV',
    name: 'Delivery Van',
    plate: 'VAN 02',
    color: '#f59e0b',
    speed: 29.4,
    wheelbase: 3.75,
    axles: 2,
    schemeF: 'Class 3 (2-Axle Long)',
    lane: 'Eastbound (Lane 1)',
    dir: 'east',
    tStart: 0.20,
    tTubeA: 0.38,
    tTubeB: 0.41,
    tEnd: 0.60,
    length: 32,
    width: 14
  },
  {
    id: 'atc-3',
    type: 'Car',
    name: 'Westbound Saloon',
    plate: 'CAR 03',
    color: '#94a3b8',
    speed: 33.1,
    wheelbase: 2.78,
    axles: 2,
    schemeF: 'Class 2 (Short)',
    lane: 'Westbound (Lane 2)',
    dir: 'west',
    tStart: 0.28,
    tTubeA: 0.48,
    tTubeB: 0.51,
    tEnd: 0.70,
    length: 26,
    width: 13
  },
  {
    id: 'atc-4',
    type: 'HGV',
    name: '3-Axle Freight Truck',
    plate: 'HGV 04',
    color: '#ef4444',
    speed: 26.8,
    wheelbase: 6.45,
    axles: 3,
    schemeF: 'Class 6 (3-Axle Rigid)',
    lane: 'Eastbound (Lane 1)',
    dir: 'east',
    tStart: 0.45,
    tTubeA: 0.62,
    tTubeB: 0.65,
    tEnd: 0.85,
    length: 44,
    width: 15
  },
  {
    id: 'atc-5',
    type: 'Bus',
    name: 'Transit Coach',
    plate: 'BUS 05',
    color: '#10b981',
    speed: 25.2,
    wheelbase: 5.85,
    axles: 2,
    schemeF: 'Class 4 (Bus/Coach)',
    lane: 'Eastbound (Lane 1)',
    dir: 'east',
    tStart: 0.60,
    tTubeA: 0.76,
    tTubeB: 0.79,
    tEnd: 0.96,
    length: 46,
    width: 15
  },
  {
    id: 'atc-6',
    type: 'Car',
    name: 'Electric SUV',
    plate: 'EV 06',
    color: '#06b6d4',
    speed: 34.6,
    wheelbase: 2.92,
    axles: 2,
    schemeF: 'Class 2 (Short)',
    lane: 'Eastbound (Lane 1)',
    dir: 'east',
    tStart: 0.74,
    tTubeA: 0.88,
    tTubeB: 0.91,
    tEnd: 1.00,
    length: 27,
    width: 14
  }
];

export default function ATCAnimation() {
  const containerRef = useRef(null);
  const { isWhite } = useTheme();

  const {
    playbackState,
    isPlaying,
    progress,
    prefersReducedMotion,
    togglePlay,
    replay
  } = useSimulationPlayback({
    totalDurationMs: 6500,
    stepCount: 8,
    containerRef
  });

  const showFinal = prefersReducedMotion || playbackState === 'completed';

  // Base starting cumulative daily counts
  // Final target count reaches 8,432 veh/day
  const baseVolume = 8426;
  const countedVehicles = useMemo(() => {
    if (showFinal) return ATC_VEHICLES.length;
    return ATC_VEHICLES.filter((v) => progress >= v.tTubeB).length;
  }, [showFinal, progress]);

  const currentVolume = baseVolume + countedVehicles;

  // Active vehicle striking the tube sensor
  const activeStrike = useMemo(() => {
    if (!isPlaying) return null;
    return (
      ATC_VEHICLES.find(
        (v) => Math.abs(progress - v.tTubeA) < 0.025 || Math.abs(progress - v.tTubeB) < 0.025
      ) || null
    );
  }, [isPlaying, progress]);

  // Is Tube A or Tube B currently compressed by tires
  const isTubeAActive = Boolean(
    activeStrike && Math.abs(progress - activeStrike.tTubeA) < 0.022
  );
  const isTubeBActive = Boolean(
    activeStrike && Math.abs(progress - activeStrike.tTubeB) < 0.022
  );

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-3xl mx-auto rounded-3xl p-4 sm:p-6 flex flex-col justify-between overflow-hidden transition-colors border shadow-2xl ${
        isWhite
          ? 'bg-slate-50 border-slate-300 text-slate-800'
          : 'bg-slate-900/95 border-sky-500/30 text-slate-100 shadow-[0_0_50px_rgba(14,165,233,0.12)]'
      }`}
    >
      {/* Background Track Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      {/* Top Header & Simulation Controls */}
      <SimulationHeader
        title="Automatic Traffic Count (ATC) Setup"
        icon={Activity}
        accentColor="#0284c7"
        playbackState={playbackState}
        onTogglePlay={togglePlay}
        onReplay={replay}
      />

      {/* Reduced Motion Notice */}
      {prefersReducedMotion && (
        <div className="relative z-10 mt-2 px-3.5 py-2 rounded-xl bg-sky-500/10 border border-sky-500/30 text-xs font-mono text-sky-700 dark:text-sky-300 flex items-center gap-2">
          <Info className="w-4 h-4 shrink-0" />
          <span>Reduced motion active: showing final 7-day ATC speed & volume telemetry.</span>
        </div>
      )}

      {/* Main ATC Roadway & Roadside Unit Scene */}
      <div className="relative z-10 my-4">
        <div
          className={`relative w-full rounded-2xl border p-3 sm:p-4 overflow-hidden flex flex-col justify-between shadow-inner ${
            isWhite ? 'bg-white border-slate-200' : 'bg-slate-950/90 border-slate-800'
          }`}
        >
          {/* Top Bar inside Scene */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono mb-2 z-20">
            <div className="flex items-center gap-2">
              <span
                className={`px-2.5 py-1 rounded-lg font-bold border ${
                  isWhite
                    ? 'bg-sky-100 text-sky-800 border-sky-200'
                    : 'bg-sky-950/80 text-sky-300 border-sky-500/30'
                }`}
              >
                7-Day ATC Continuous Monitoring
              </span>
              <span
                className={`hidden sm:inline px-2 py-0.5 rounded text-[11px] border ${
                  isWhite
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30'
                }`}
              >
                "Store Every Axle" (&lt;1ms Precision)
              </span>
            </div>

            <span
              className={`text-[11px] px-2.5 py-1 rounded-lg border font-semibold ${
                isWhite
                  ? 'bg-slate-100 text-slate-700 border-slate-200'
                  : 'bg-slate-900/90 text-slate-300 border-slate-700'
              }`}
            >
              MetroCount® MC5900 Series RSU
            </span>
          </div>

          {/* SVG Roadway, Tube Sensors, and Vehicle Flow */}
          <div className="relative w-full rounded-xl overflow-hidden border border-slate-700/40 bg-slate-950 flex items-center justify-center">
            <svg
              viewBox="0 0 620 320"
              className="w-full h-auto max-h-[340px] block select-none"
              style={{
                backgroundColor: isWhite ? '#1e293b' : '#080d1a'
              }}
            >
              <defs>
                <linearGradient id="roadSurface" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={isWhite ? '#334155' : '#0f172a'} />
                  <stop offset="100%" stopColor={isWhite ? '#1e293b' : '#080d1a'} />
                </linearGradient>

                <linearGradient id="tubeGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#0284c7" />
                </linearGradient>
              </defs>

              {/* Roadway Canvas */}
              <rect x="0" y="0" width="620" height="320" fill="url(#roadSurface)" />

              {/* Road Verge / Grass Shoulders */}
              {/* North verge (top) */}
              <rect x="0" y="0" width="620" height="36" fill={isWhite ? '#f1f5f9' : '#030712'} stroke={isWhite ? '#cbd5e1' : '#1e293b'} strokeWidth="1" />
              {/* South verge (bottom - where MetroCount RSU is secured) */}
              <rect x="0" y="270" width="620" height="50" fill={isWhite ? '#f1f5f9' : '#030712'} stroke={isWhite ? '#cbd5e1' : '#1e293b'} strokeWidth="1" />

              {/* Road Markings */}
              {/* North Edge Line */}
              <line x1="0" y1="42" x2="620" y2="42" stroke="#ffffff" strokeWidth="2" opacity="0.8" />
              {/* South Edge Line */}
              <line x1="0" y1="264" x2="620" y2="264" stroke="#ffffff" strokeWidth="2" opacity="0.8" />

              {/* Centerline: Dashed White Line separating Westbound & Eastbound */}
              <line x1="0" y1="153" x2="620" y2="153" stroke="#ffffff" strokeWidth="2" strokeDasharray="14 10" opacity="0.6" />

              {/* Directional Painted Lane Guides */}
              <text x="35" y="100" fill={isWhite ? '#94a3b8' : '#475569'} fontSize="9" fontWeight="bold" fontFamily="monospace">
                ← WESTBOUND (LANE 2)
              </text>
              <text x="35" y="210" fill={isWhite ? '#94a3b8' : '#475569'} fontSize="9" fontWeight="bold" fontFamily="monospace">
                EASTBOUND (LANE 1) →
              </text>

              {/* ============================================================= */}
              {/* METROCOUNT® MC5900 ROADSIDE UNIT (RSU) HARDWARE ON VERGE */}
              {/* ============================================================= */}
              {/* Roadside Post / Lamp Column */}
              <rect x="290" y="275" width="8" height="40" rx="1.5" fill="#64748b" />
              <circle cx="294" cy="275" r="4" fill="#94a3b8" />

              {/* Security Chain Wrapping Post */}
              <rect x="286" y="284" width="16" height="4" rx="1" fill="#cbd5e1" opacity="0.75" />

              {/* Heavy Duty Weatherproof RSU Enclosure (Peli-Case Type) */}
              <g transform="translate(298, 275)">
                <rect x="0" y="0" width="34" height="28" rx="4" fill="#0f172a" stroke="#0284c7" strokeWidth="1.8" />
                <rect x="4" y="5" width="26" height="18" rx="2" fill="#1e293b" />
                {/* RSU Brand Badge */}
                <text x="17" y="13" fill="#38bdf8" fontSize="4.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  METROCOUNT
                </text>
                <text x="17" y="19" fill="#94a3b8" fontSize="4" fontFamily="monospace" textAnchor="middle">
                  MC5900 RSU
                </text>

                {/* Status LEDs on RSU */}
                <circle cx="7" cy="8" r="1.5" fill={isTubeAActive || isTubeBActive ? '#22c55e' : '#15803d'} className={isTubeAActive || isTubeBActive ? 'animate-ping' : ''} />
                <circle cx="27" cy="8" r="1.5" fill="#38bdf8" />
              </g>

              {/* Lead-in Air Hoses from RSU to Road Tubes */}
              <path d="M 298 286 Q 280 286 280 264" fill="none" stroke="#64748b" strokeWidth="2.5" />
              <path d="M 298 290 Q 320 290 320 264" fill="none" stroke="#64748b" strokeWidth="2.5" />

              {/* ============================================================= */}
              {/* DUAL PNEUMATIC ROAD TUBES ACROSS THE CARRIAGEWAY (1.00m GAP) */}
              {/* ============================================================= */}
              {/* Tube A (First axle impact sensor) */}
              <line
                x1="280"
                y1="40"
                x2="280"
                y2="265"
                stroke={isTubeAActive ? '#38bdf8' : '#0f172a'}
                strokeWidth={isTubeAActive ? '4.5' : '3.5'}
                className="transition-all duration-75"
              />
              {/* Tube A Highlight line */}
              <line
                x1="280"
                y1="40"
                x2="280"
                y2="265"
                stroke={isTubeAActive ? '#ffffff' : '#38bdf8'}
                strokeWidth="1.2"
                strokeDasharray={isTubeAActive ? 'none' : '4 2'}
                opacity={isTubeAActive ? '1' : '0.6'}
              />

              {/* Tube B (Second axle impact sensor - spaced exactly 1.00m) */}
              <line
                x1="320"
                y1="40"
                x2="320"
                y2="265"
                stroke={isTubeBActive ? '#38bdf8' : '#0f172a'}
                strokeWidth={isTubeBActive ? '4.5' : '3.5'}
                className="transition-all duration-75"
              />
              {/* Tube B Highlight line */}
              <line
                x1="320"
                y1="40"
                x2="320"
                y2="265"
                stroke={isTubeBActive ? '#ffffff' : '#38bdf8'}
                strokeWidth="1.2"
                strokeDasharray={isTubeBActive ? 'none' : '4 2'}
                opacity={isTubeBActive ? '1' : '0.6'}
              />

              {/* Road Tube Road Surface Fixing Cleats */}
              <rect x="277" y="40" width="6" height="4" rx="1" fill="#94a3b8" />
              <rect x="317" y="40" width="6" height="4" rx="1" fill="#94a3b8" />
              <rect x="277" y="151" width="6" height="4" rx="1" fill="#94a3b8" />
              <rect x="317" y="151" width="6" height="4" rx="1" fill="#94a3b8" />
              <rect x="277" y="262" width="6" height="4" rx="1" fill="#94a3b8" />
              <rect x="317" y="262" width="6" height="4" rx="1" fill="#94a3b8" />

              {/* Tube Calibration Spacing Measurement Label */}
              <g transform="translate(300, 25)">
                <line x1="-18" y1="0" x2="18" y2="0" stroke="#38bdf8" strokeWidth="1" />
                <line x1="-18" y1="-3" x2="-18" y2="3" stroke="#38bdf8" strokeWidth="1" />
                <line x1="18" y1="-3" x2="18" y2="3" stroke="#38bdf8" strokeWidth="1" />
                <text x="0" y="-4" fill="#38bdf8" fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  1.00m CALIBRATED GAP
                </text>
              </g>

              {/* Tube Labels */}
              <text x="280" y="260" fill="#38bdf8" fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="end">
                TUBE A&nbsp;
              </text>
              <text x="320" y="260" fill="#38bdf8" fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="start">
                &nbsp;TUBE B
              </text>

              {/* ============================================================= */}
              {/* VEHICLES ANIMATED OVER THE PNEUMATIC TUBES */}
              {/* ============================================================= */}
              {ATC_VEHICLES.map((vehicle) => {
                const { tStart, tEnd, dir, length, width, color, plate, type, speed } = vehicle;

                let visible = false;
                let posX = 0;
                let posY = dir === 'east' ? 208 : 98; // lane Y center
                let rotation = dir === 'east' ? 90 : -90; // horizontal movement

                if (playbackState === 'idle') {
                  // Park 2 sample vehicles in view on approach
                  if (vehicle.id === 'atc-1') {
                    visible = true;
                    posX = 180;
                  } else if (vehicle.id === 'atc-3') {
                    visible = true;
                    posX = 420;
                  }
                } else if (progress >= tStart && progress <= tEnd) {
                  visible = true;
                  const localT = (progress - tStart) / (tEnd - tStart);
                  if (dir === 'east') {
                    // Moving left-to-right (x: -50 to 670)
                    posX = -50 + localT * 720;
                  } else {
                    // Moving right-to-left (x: 670 to -50)
                    posX = 670 - localT * 720;
                  }
                }

                if (!visible) return null;

                const halfL = length / 2;
                const halfW = width / 2;
                const isCrossing =
                  Math.abs(progress - vehicle.tTubeA) < 0.025 ||
                  Math.abs(progress - vehicle.tTubeB) < 0.025;

                return (
                  <g key={vehicle.id} transform={`translate(${posX.toFixed(1)}, ${posY}) rotate(${rotation})`}>
                    {/* Sensor Trigger Impact Pulse Ring */}
                    {isCrossing && (
                      <circle cx="0" cy="0" r={length * 0.9} fill="none" stroke="#38bdf8" strokeWidth="3" opacity="0.85" />
                    )}

                    {/* Shadow */}
                    <rect x={-halfW + 1} y={-halfL + 2} width={width} height={length} rx="3" fill="rgba(0,0,0,0.5)" />

                    {/* Vehicle Body */}
                    <rect x={-halfW} y={-halfL} width={width} height={length} rx="3.5" fill={color} stroke="#ffffff" strokeWidth="0.8" />

                    {/* Windshield */}
                    <rect x={-halfW + 2} y={-halfL + 4} width={width - 4} height={4} rx="1" fill="#0f172a" opacity="0.85" />

                    {/* Roof / Trailer */}
                    {type === 'HGV' ? (
                      <rect x={-halfW + 1.5} y={-halfL + 11} width={width - 3} height={length - 13} rx="1.5" fill="#334155" stroke="#64748b" strokeWidth="0.5" />
                    ) : (
                      <rect x={-halfW + 2} y={-halfL + 11} width={width - 4} height={length - 15} rx="1" fill="#0f172a" opacity="0.55" />
                    )}

                    {/* Headlights */}
                    <circle cx={-halfW + 2} cy={-halfL + 1.5} r="1.5" fill="#fef08a" />
                    <circle cx={halfW - 2} cy={-halfL + 1.5} r="1.5" fill="#fef08a" />

                    {/* Tail Lights */}
                    <circle cx={-halfW + 2} cy={halfL - 1.5} r="1.5" fill="#ef4444" />
                    <circle cx={halfW - 2} cy={halfL - 1.5} r="1.5" fill="#ef4444" />

                    {/* Plate Tag */}
                    <text x="0" y="1" fill="#ffffff" fontSize="5.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                      {plate}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Active Axle Telemetry Ticker */}
          <div
            className={`mt-3 px-3 py-2 rounded-xl flex flex-wrap items-center justify-between gap-2 text-xs font-mono border transition-colors ${
              activeStrike
                ? 'bg-sky-500/20 border-sky-400 text-sky-700 dark:text-sky-300 font-bold'
                : isWhite
                ? 'bg-slate-100 border-slate-200 text-slate-600'
                : 'bg-slate-900/60 border-slate-800 text-slate-400'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${activeStrike ? 'bg-cyan-400 animate-ping' : 'bg-emerald-500'}`} />
              <span>
                {activeStrike ? (
                  <>
                    RSU TIMESTAMP CAPTURE: <strong>{activeStrike.name}</strong> | Speed:{' '}
                    <strong>{activeStrike.speed} mph</strong> | Wheelbase: {activeStrike.wheelbase}m | {activeStrike.schemeF}
                  </>
                ) : (
                  'METROCOUNT® RSU ACTIVE: Ready to time-stamp individual axle strikes (<1ms)'
                )}
              </span>
            </div>
            <span className="text-[11px] font-semibold text-sky-600 dark:text-sky-400">
              UK Scheme F / COBA Compliant
            </span>
          </div>

          {/* Live ATC Speed & Volume Telemetry Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3">
            {/* Speed Analytics Card */}
            <div
              className={`p-3.5 rounded-2xl border flex items-center justify-between ${
                isWhite ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/80 border-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-sky-500/20 text-sky-500">
                  <Gauge className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400 font-semibold uppercase">85th %ile Speed</div>
                  <div className={`text-base font-extrabold font-mono ${isWhite ? 'text-slate-900' : 'text-white'}`}>
                    34.8 <span className="text-xs font-normal text-slate-400">mph</span>
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-500/10 text-sky-600 dark:text-sky-300 border border-sky-500/30">
                Mean: 31.4
              </span>
            </div>

            {/* Total 24h Flow Volume */}
            <div
              className={`p-3.5 rounded-2xl border flex items-center justify-between ${
                isWhite ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/80 border-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-500">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400 font-semibold uppercase">Daily Volume</div>
                  <div className={`text-base font-extrabold font-mono ${isWhite ? 'text-slate-900' : 'text-white'}`}>
                    {currentVolume.toLocaleString()} <span className="text-xs font-normal text-slate-400">veh/day</span>
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30">
                24/7 Flow
              </span>
            </div>

            {/* Classification Breakdown */}
            <div
              className={`p-3.5 rounded-2xl border flex items-center justify-between ${
                isWhite ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/80 border-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-500">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400 font-semibold uppercase">Axle Classification</div>
                  <div className={`text-base font-extrabold font-mono ${isWhite ? 'text-slate-900' : 'text-white'}`}>
                    Scheme F <span className="text-xs font-normal text-slate-400">12-Class</span>
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30">
                COBA Ready
              </span>
            </div>
          </div>

          {/* Classification Stats Bar */}
          <div
            className={`pt-2 border-t flex flex-wrap items-center justify-between gap-2 text-xs font-mono ${
              isWhite ? 'border-slate-200 text-slate-600' : 'border-slate-800 text-slate-400'
            }`}
          >
            <div className="flex flex-wrap items-center gap-2 text-[11px]">
              <span className="font-semibold text-slate-500">Vehicle Classes:</span>
              <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-500/20">
                Cars: 6,482 (76.9%)
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                LGVs: 1,354 (16.1%)
              </span>
              <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-700 dark:text-red-300 border border-red-500/20">
                HGVs: 468 (5.5%)
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                Buses: 128 (1.5%)
              </span>
            </div>

            <div className="text-right">
              <span className="font-bold text-sky-600 dark:text-sky-400 font-mono">
                Speed Compliance: 94.2% ≤ 35mph
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Takeaway & Reporting Breakdown */}
      <div
        className={`relative z-10 rounded-2xl p-3.5 border text-xs font-mono flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
          isWhite ? 'bg-white border-slate-200' : 'bg-slate-950/80 border-slate-800'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-sky-500/20 text-sky-500">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase">TAKEAWAY</div>
            <div className={`text-xs font-medium ${isWhite ? 'text-slate-800' : 'text-slate-200'}`}>
              "Store Every Axle" technology captures precise time-stamps, speed and wheelbase for every passing vehicle.
            </div>
          </div>
        </div>
        <div className="text-right text-xs shrink-0 font-bold text-sky-600 dark:text-sky-400">
          Duration: 7, 14, 28 Days or Multi-Month
        </div>
      </div>
    </div>
  );
}

