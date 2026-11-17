import React, { useRef, useMemo } from 'react';
import {
  Car,
  ArrowUp,
  ArrowLeft,
  ArrowRight,
  Gauge,
  Info,
  Activity,
  Layers,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useSimulationPlayback } from './useSimulationPlayback';
import SimulationHeader from './SimulationHeader';

// 12 Diverse vehicles traversing the junction across classified groups:
// Cars, Delivery Vans (LGV), Heavy Goods Vehicles (HGV), Public Transit Buses, and Motorcycles
const VEHICLES = [
  {
    id: 'V1',
    plate: 'EV24',
    type: 'Car',
    name: 'Electric Hatchback',
    color: '#06b6d4',
    path: 'left',
    laneName: 'Left Lane (D1)',
    tStart: 0.04,
    tCross: 0.16,
    tEnd: 0.38,
    length: 25,
    width: 13,
    queuePos: { x: 290, y: 298, rotation: 0 },
    countCategory: 'left'
  },
  {
    id: 'V2',
    plate: 'LGV1',
    type: 'LGV',
    name: 'Delivery Van',
    color: '#f59e0b',
    path: 'ahead',
    laneName: 'Ahead Lane (D2)',
    tStart: 0.08,
    tCross: 0.22,
    tEnd: 0.44,
    length: 31,
    width: 14,
    queuePos: { x: 330, y: 298, rotation: 0 },
    countCategory: 'ahead'
  },
  {
    id: 'V3',
    plate: 'CAR2',
    type: 'Car',
    name: 'Saloon Sedan',
    color: '#38bdf8',
    path: 'right',
    laneName: 'Right Lane (D3)',
    tStart: 0.14,
    tCross: 0.30,
    tEnd: 0.54,
    length: 26,
    width: 13,
    queuePos: { x: 370, y: 302, rotation: 0 },
    countCategory: 'right'
  },
  {
    id: 'V4',
    plate: 'OPP1',
    type: 'Car',
    name: 'Opposing Traffic',
    color: '#94a3b8',
    path: 'southbound',
    laneName: 'North Approach',
    tStart: 0.18,
    tCross: 0.34,
    tEnd: 0.58,
    length: 25,
    width: 13,
    queuePos: { x: 250, y: 50, rotation: 180 },
    countCategory: null
  },
  {
    id: 'V5',
    plate: 'HGV3',
    type: 'HGV',
    name: '3-Axle Rigid HGV',
    color: '#ef4444',
    path: 'ahead',
    laneName: 'Ahead Lane (D2)',
    tStart: 0.26,
    tCross: 0.42,
    tEnd: 0.66,
    length: 44,
    width: 15,
    queuePos: { x: 330, y: 348, rotation: 0 },
    countCategory: 'ahead'
  },
  {
    id: 'V6',
    plate: 'CAR4',
    type: 'Car',
    name: 'Executive SUV',
    color: '#10b981',
    path: 'left',
    laneName: 'Left Lane (D1)',
    tStart: 0.32,
    tCross: 0.48,
    tEnd: 0.72,
    length: 26,
    width: 14,
    queuePos: { x: 290, y: 345, rotation: 0 },
    countCategory: 'left'
  },
  {
    id: 'V7',
    plate: 'BUS5',
    type: 'Bus',
    name: 'Double-Decker Bus',
    color: '#e11d48',
    path: 'ahead',
    laneName: 'Ahead Lane (D2)',
    tStart: 0.44,
    tCross: 0.58,
    tEnd: 0.82,
    length: 46,
    width: 15,
    queuePos: { x: 330, y: 405, rotation: 0 },
    countCategory: 'ahead'
  },
  {
    id: 'V8',
    plate: 'CRS2',
    type: 'LGV',
    name: 'Cross-Street Van',
    color: '#64748b',
    path: 'eastbound',
    laneName: 'West Approach',
    tStart: 0.36,
    tCross: 0.50,
    tEnd: 0.76,
    length: 29,
    width: 13,
    queuePos: { x: 70, y: 120, rotation: 90 },
    countCategory: null
  },
  {
    id: 'V9',
    plate: 'MOTO',
    type: 'Motorcycle',
    name: 'Courier Motorbike',
    color: '#ec4899',
    path: 'ahead',
    laneName: 'Ahead Lane (D2)',
    tStart: 0.52,
    tCross: 0.66,
    tEnd: 0.88,
    length: 17,
    width: 9,
    queuePos: { x: 330, y: 465, rotation: 0 },
    countCategory: null
  },
  {
    id: 'V10',
    plate: 'VAN6',
    type: 'LGV',
    name: 'Service Van',
    color: '#f97316',
    path: 'right',
    laneName: 'Right Lane (D3)',
    tStart: 0.58,
    tCross: 0.72,
    tEnd: 0.94,
    length: 30,
    width: 14,
    queuePos: { x: 370, y: 355, rotation: 0 },
    countCategory: 'right'
  },
  {
    id: 'V11',
    plate: 'CAR7',
    type: 'Car',
    name: 'Compact EV',
    color: '#14b8a6',
    path: 'left',
    laneName: 'Left Lane (D1)',
    tStart: 0.65,
    tCross: 0.80,
    tEnd: 0.98,
    length: 25,
    width: 13,
    queuePos: { x: 290, y: 395, rotation: 0 },
    countCategory: 'left'
  },
  {
    id: 'V12',
    plate: 'CAR8',
    type: 'Car',
    name: 'Family Estate',
    color: '#0284c7',
    path: 'ahead',
    laneName: 'Ahead Lane (D2)',
    tStart: 0.72,
    tCross: 0.88,
    tEnd: 1.00,
    length: 26,
    width: 13,
    queuePos: { x: 330, y: 515, rotation: 0 },
    countCategory: 'ahead'
  }
];

// High-fidelity position calculation along junction turning trajectories
function getVehicleState(vehicle, progress, playbackState) {
  const { path, tStart, tCross, tEnd, queuePos } = vehicle;

  // In idle state, park vehicle in its queued formation on approach
  if (playbackState === 'idle') {
    return {
      x: queuePos.x,
      y: queuePos.y,
      rotation: queuePos.rotation || 0,
      visible: true,
      crossing: false,
      hasCrossed: false
    };
  }

  // Not yet appeared
  if (progress < tStart) {
    return {
      x: queuePos.x,
      y: queuePos.y + 40,
      rotation: 0,
      visible: false,
      crossing: false,
      hasCrossed: false
    };
  }

  // Completed its run
  if (progress > tEnd) {
    let exitX = 0;
    let exitY = 0;
    let exitRot = 0;
    if (path === 'left') {
      exitX = -40; exitY = 200; exitRot = -90;
    } else if (path === 'ahead') {
      exitX = 330; exitY = -40; exitRot = 0;
    } else if (path === 'right') {
      exitX = 660; exitY = 160; exitRot = 90;
    } else if (path === 'southbound') {
      exitX = 250; exitY = 420; exitRot = 180;
    } else if (path === 'eastbound') {
      exitX = 660; exitY = 120; exitRot = 90;
    }
    return {
      x: exitX,
      y: exitY,
      rotation: exitRot,
      visible: false,
      crossing: false,
      hasCrossed: true
    };
  }

  const t = (progress - tStart) / (tEnd - tStart);
  const crossing = Math.abs(progress - tCross) < 0.022;
  const hasCrossed = progress >= tCross;

  let x = 330;
  let y = 350;
  let rotation = 0;

  if (path === 'left') {
    // Approaches from South (x=290, y=370) to junction entrance (x=290, y=225)
    // Then curves smoothly left to (x=-30, y=200)
    if (t < 0.45) {
      const approachT = t / 0.45;
      x = 290;
      y = 370 - approachT * (370 - 225);
      rotation = 0;
    } else {
      const turnT = (t - 0.45) / 0.55;
      const p0 = { x: 290, y: 225 };
      const p1 = { x: 275, y: 200 };
      const p2 = { x: -30, y: 200 };
      const u = 1 - turnT;
      x = u * u * p0.x + 2 * u * turnT * p1.x + turnT * turnT * p2.x;
      y = u * u * p0.y + 2 * u * turnT * p1.y + turnT * turnT * p2.y;
      rotation = -turnT * 90;
    }
  } else if (path === 'ahead') {
    // Straight through from (330, 370) to (330, -30)
    x = 330;
    y = 370 - t * 410;
    rotation = 0;
  } else if (path === 'right') {
    // Approaches from South (x=370, y=370) to (x=370, y=210)
    // Then curves right to (x=650, y=160)
    if (t < 0.45) {
      const approachT = t / 0.45;
      x = 370;
      y = 370 - approachT * (370 - 210);
      rotation = 0;
    } else {
      const turnT = (t - 0.45) / 0.55;
      const p0 = { x: 370, y: 210 };
      const p1 = { x: 400, y: 160 };
      const p2 = { x: 650, y: 160 };
      const u = 1 - turnT;
      x = u * u * p0.x + 2 * u * turnT * p1.x + turnT * turnT * p2.x;
      y = u * u * p0.y + 2 * u * turnT * p1.y + turnT * turnT * p2.y;
      rotation = turnT * 90;
    }
  } else if (path === 'southbound') {
    // North to South straight line (opposing movement)
    x = 250;
    y = -30 + t * 430;
    rotation = 180;
  } else if (path === 'eastbound') {
    // West to East straight line (cross movement)
    x = -30 + t * 680;
    y = 120;
    rotation = 90;
  }

  return {
    x,
    y,
    rotation,
    visible: true,
    crossing,
    hasCrossed
  };
}

// Detailed SVG representation of a vehicle
function VehicleMarker({ vehicle, state }) {
  const { x, y, rotation, visible, crossing } = state;
  const { color, type, length, width, plate } = vehicle;
  if (!visible) return null;

  const halfL = length / 2;
  const halfW = width / 2;

  return (
    <g transform={`translate(${x.toFixed(1)}, ${y.toFixed(1)}) rotate(${rotation.toFixed(1)})`} className="pointer-events-none">
      {/* Sensor Detection Halo when crossing count line */}
      {crossing && (
        <circle
          cx="0"
          cy="0"
          r={length * 0.85}
          fill="none"
          stroke="#38bdf8"
          strokeWidth="3.5"
          opacity="0.8"
        />
      )}

      {/* Vehicle drop shadow */}
      <rect
        x={-halfW + 1}
        y={-halfL + 2}
        width={width}
        height={length}
        rx="3.5"
        fill="rgba(0,0,0,0.5)"
      />

      {/* Vehicle Body Chassis */}
      <rect
        x={-halfW}
        y={-halfL}
        width={width}
        height={length}
        rx="3.5"
        fill={color}
        stroke="#ffffff"
        strokeWidth="0.8"
      />

      {/* Front Windshield (Heading up: negative Y is front) */}
      <rect
        x={-halfW + 2}
        y={-halfL + (type === 'HGV' ? 3 : 5)}
        width={width - 4}
        height={type === 'HGV' ? 4 : 5}
        rx="1"
        fill="#0f172a"
        opacity="0.85"
      />

      {/* Roof Cabin / Cargo Trailer */}
      {type === 'HGV' ? (
        <rect
          x={-halfW + 1.5}
          y={-halfL + 12}
          width={width - 3}
          height={length - 14}
          rx="1.5"
          fill="#334155"
          stroke="#64748b"
          strokeWidth="0.6"
        />
      ) : type === 'Bus' ? (
        <rect
          x={-halfW + 2}
          y={-halfL + 12}
          width={width - 4}
          height={length - 16}
          rx="1"
          fill="#ffffff"
          opacity="0.3"
        />
      ) : (
        <rect
          x={-halfW + 2.5}
          y={-halfL + 12}
          width={width - 5}
          height={length - 17}
          rx="1"
          fill="#0f172a"
          opacity="0.55"
        />
      )}

      {/* Front Headlights */}
      <circle cx={-halfW + 2.5} cy={-halfL + 1.5} r="1.5" fill="#fef08a" />
      <circle cx={halfW - 2.5} cy={-halfL + 1.5} r="1.5" fill="#fef08a" />

      {/* Rear Tail Lights */}
      <circle cx={-halfW + 2.5} cy={halfL - 1.5} r="1.5" fill="#ef4444" />
      <circle cx={halfW - 2.5} cy={halfL - 1.5} r="1.5" fill="#ef4444" />

      {/* Blinking turn indicator */}
      {vehicle.path === 'left' && (
        <circle cx={-halfW - 1.5} cy={-halfL + 3} r="2" fill="#fbbf24" />
      )}
      {vehicle.path === 'right' && (
        <circle cx={halfW + 1.5} cy={-halfL + 3} r="2" fill="#fbbf24" />
      )}

      {/* Vehicle identifier plate */}
      <text
        x="0"
        y={type === 'HGV' ? -1 : 1.5}
        fill="#ffffff"
        fontSize="6"
        fontWeight="bold"
        fontFamily="monospace"
        textAnchor="middle"
        pointerEvents="none"
      >
        {plate}
      </text>
    </g>
  );
}

export default function TrafficAnimation() {
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
    totalDurationMs: 6800,
    stepCount: 12,
    containerRef
  });

  // Base starting counts
  // Target totals from user specification:
  // Left: 142 veh/h | Ahead: 588 veh/h | Right: 96 veh/h | Approach Total: 826 vehicles
  const baseLeft = 139;
  const baseAhead = 584;
  const baseRight = 94;

  const showFinal = prefersReducedMotion || playbackState === 'completed';

  // Compute live counts based on vehicle line crossings
  const leftCrossed = useMemo(() => {
    if (showFinal) return 3;
    return VEHICLES.filter((v) => v.countCategory === 'left' && progress >= v.tCross).length;
  }, [showFinal, progress]);

  const aheadCrossed = useMemo(() => {
    if (showFinal) return 4;
    return VEHICLES.filter((v) => v.countCategory === 'ahead' && progress >= v.tCross).length;
  }, [showFinal, progress]);

  const rightCrossed = useMemo(() => {
    if (showFinal) return 2;
    return VEHICLES.filter((v) => v.countCategory === 'right' && progress >= v.tCross).length;
  }, [showFinal, progress]);

  const leftCount = baseLeft + leftCrossed;
  const aheadCount = baseAhead + aheadCrossed;
  const rightCount = baseRight + rightCrossed;
  const approachTotal = leftCount + aheadCount + rightCount;

  // Active crossing vehicle for detection banner
  const activeVehicle = useMemo(() => {
    if (!isPlaying) return null;
    return VEHICLES.find((v) => Math.abs(progress - v.tCross) < 0.024) || null;
  }, [isPlaying, progress]);

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
        title="Junction Turning Count Example"
        icon={Car}
        accentColor="#0284c7"
        playbackState={playbackState}
        onTogglePlay={togglePlay}
        onReplay={replay}
      />

      {/* Reduced Motion Notice */}
      {prefersReducedMotion && (
        <div className="relative z-10 mt-2 px-3.5 py-2 rounded-xl bg-sky-500/10 border border-sky-500/30 text-xs font-mono text-sky-700 dark:text-sky-300 flex items-center gap-2">
          <Info className="w-4 h-4 shrink-0" />
          <span>Reduced motion active: showing final junction turning counts.</span>
        </div>
      )}

      {/* Main Junction Setup Stage */}
      <div className="relative z-10 my-4">
        <div
          className={`relative w-full rounded-2xl border p-3 sm:p-4 overflow-hidden flex flex-col justify-between shadow-inner ${
            isWhite ? 'bg-white border-slate-200' : 'bg-slate-950/90 border-slate-800'
          }`}
        >
          {/* Top Bar inside Scene: Period & Tagline */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono mb-2 z-20">
            <div className="flex items-center gap-2">
              <span
                className={`px-2.5 py-1 rounded-lg font-bold border ${
                  isWhite
                    ? 'bg-sky-100 text-sky-800 border-sky-200'
                    : 'bg-sky-950/80 text-sky-300 border-sky-500/30'
                }`}
              >
                Example period: 08:00-09:00
              </span>
              <span
                className={`hidden sm:inline px-2 py-0.5 rounded text-[11px] border ${
                  isWhite
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30'
                }`}
              >
                12 Sample Vehicles
              </span>
            </div>

            <span
              className={`text-[11px] px-2.5 py-1 rounded-lg border font-semibold ${
                isWhite
                  ? 'bg-slate-100 text-slate-700 border-slate-200'
                  : 'bg-slate-900/90 text-slate-300 border-slate-700'
              }`}
            >
              Classified Turning Movement Setup
            </span>
          </div>

          {/* SVG Junction Diagram & Vehicle Animation */}
          <div className="relative w-full rounded-xl overflow-hidden border border-slate-700/40 bg-slate-950 flex items-center justify-center">
            <svg
              viewBox="0 0 620 380"
              className="w-full h-auto max-h-[380px] block select-none"
              style={{
                backgroundColor: isWhite ? '#1e293b' : '#0b1120'
              }}
            >
              <defs>
                {/* Yellow Box Junction Diagonal Hatching Pattern */}
                <pattern id="boxJunctionHatch" width="16" height="16" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="16" stroke="#eab308" strokeWidth="1.2" opacity="0.4" />
                </pattern>

                {/* Road surface texture */}
                <linearGradient id="asphaltGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={isWhite ? '#334155' : '#0f172a'} />
                  <stop offset="100%" stopColor={isWhite ? '#1e293b' : '#070d1a'} />
                </linearGradient>
              </defs>

              {/* Base Road Network (Full Intersection Surface) */}
              <rect x="0" y="0" width="620" height="380" fill="url(#asphaltGradient)" />

              {/* Curbs / Pavement Islands around Junction Corners */}
              {/* Corner Top-Left (NW) */}
              <path
                d="M 0 0 L 230 0 L 230 75 Q 230 100 205 100 L 0 100 Z"
                fill={isWhite ? '#f8fafc' : '#030712'}
                stroke={isWhite ? '#cbd5e1' : '#1e293b'}
                strokeWidth="1.5"
              />
              {/* Corner Top-Right (NE) */}
              <path
                d="M 410 0 L 620 0 L 620 100 L 435 100 Q 410 100 410 75 Z"
                fill={isWhite ? '#f8fafc' : '#030712'}
                stroke={isWhite ? '#cbd5e1' : '#1e293b'}
                strokeWidth="1.5"
              />
              {/* Corner Bottom-Left (SW) */}
              <path
                d="M 0 240 L 205 240 Q 230 240 230 265 L 230 380 L 0 380 Z"
                fill={isWhite ? '#f8fafc' : '#030712'}
                stroke={isWhite ? '#cbd5e1' : '#1e293b'}
                strokeWidth="1.5"
              />
              {/* Corner Bottom-Right (SE) */}
              <path
                d="M 410 380 L 410 265 Q 410 240 435 240 L 620 240 L 620 380 Z"
                fill={isWhite ? '#f8fafc' : '#030712'}
                stroke={isWhite ? '#cbd5e1' : '#1e293b'}
                strokeWidth="1.5"
              />

              {/* Center Box Junction (Conflict Area with Yellow Hatch) */}
              <rect
                x="240"
                y="110"
                width="160"
                height="120"
                fill="url(#boxJunctionHatch)"
                stroke="#eab308"
                strokeWidth="1.5"
                strokeDasharray="4 2"
                rx="3"
                opacity="0.85"
              />

              {/* Road Arm Labels */}
              <text x="320" y="24" fill={isWhite ? '#94a3b8' : '#64748b'} fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                ↑ EXIT: NORTHBOUND (AHEAD)
              </text>
              <text x="75" y="175" fill={isWhite ? '#94a3b8' : '#64748b'} fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                ← EXIT: WEST (LEFT)
              </text>
              <text x="545" y="175" fill={isWhite ? '#94a3b8' : '#64748b'} fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                → EXIT: EAST (RIGHT)
              </text>

              {/* Dashed Lane Dividers on South Approach */}
              {/* Divider between Northbound exit lane and Left Turn lane */}
              <line x1="270" y1="240" x2="270" y2="380" stroke="#ffffff" strokeWidth="2" strokeDasharray="6 6" opacity="0.6" />
              {/* Divider between Left Turn lane and Ahead lane */}
              <line x1="310" y1="240" x2="310" y2="380" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.6" />
              {/* Divider between Ahead lane and Right Turn lane */}
              <line x1="350" y1="240" x2="350" y2="380" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.6" />

              {/* Painted Directional Arrows on South Approach Asphalt */}
              {/* Lane 1: Left Arrow */}
              <g transform="translate(290, 345)" opacity="0.7">
                <path d="M 0 5 L 0 -8 M 0 -8 L -6 -2 M 0 -8 L -8 -8 L -8 0" stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              {/* Lane 2: Straight Arrow */}
              <g transform="translate(330, 345)" opacity="0.7">
                <path d="M 0 6 L 0 -8 M 0 -8 L -4 -2 M 0 -8 L 4 -2" stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              {/* Lane 3: Right Arrow */}
              <g transform="translate(370, 345)" opacity="0.7">
                <path d="M 0 5 L 0 -8 M 0 -8 L 6 -2 M 0 -8 L 8 -8 L 8 0" stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </g>

              {/* Induction Detection Loops on Road (D1, D2, D3) */}
              <rect x="276" y="278" width="28" height="18" rx="2" fill={activeVehicle?.laneName?.includes('D1') ? 'rgba(6, 182, 212, 0.4)' : 'rgba(56, 189, 248, 0.1)'} stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="2 1" />
              <text x="290" y="290" fill="#38bdf8" fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle">D1</text>

              <rect x="316" y="278" width="28" height="18" rx="2" fill={activeVehicle?.laneName?.includes('D2') ? 'rgba(6, 182, 212, 0.4)' : 'rgba(56, 189, 248, 0.1)'} stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="2 1" />
              <text x="330" y="290" fill="#38bdf8" fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle">D2</text>

              <rect x="356" y="278" width="28" height="18" rx="2" fill={activeVehicle?.laneName?.includes('D3') ? 'rgba(6, 182, 212, 0.4)' : 'rgba(56, 189, 248, 0.1)'} stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="2 1" />
              <text x="370" y="290" fill="#38bdf8" fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle">D3</text>

              {/* VIRTUAL COUNT LINE (Across Inbound South Lanes) */}
              <g>
                <line
                  x1="270"
                  y1="272"
                  x2="390"
                  y2="272"
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                  strokeDasharray="4 3"
                />
                {/* Glowing Laser Nodes at ends */}
                <circle cx="270" cy="272" r="3" fill="#0284c7" />
                <circle cx="390" cy="272" r="3" fill="#0284c7" />
                <text x="400" y="275" fill="#38bdf8" fontSize="8" fontWeight="bold" fontFamily="monospace">
                  COUNT LINE
                </text>
              </g>

              {/* Stop line for Northbound exit */}
              <line x1="230" y1="240" x2="270" y2="240" stroke="#ffffff" strokeWidth="2.5" opacity="0.8" />

              {/* Render Animated Fleet of Vehicles */}
              {VEHICLES.map((vehicle) => {
                const state = getVehicleState(vehicle, progress, playbackState);
                return (
                  <VehicleMarker
                    key={vehicle.id}
                    vehicle={vehicle}
                    state={state}
                  />
                );
              })}
            </svg>
          </div>

          {/* Active Sensor Live Ticker */}
          <div
            className={`mt-3 px-3 py-1.5 rounded-lg flex items-center justify-between text-xs font-mono border transition-colors ${
              activeVehicle
                ? 'bg-sky-500/20 border-sky-400 text-sky-700 dark:text-sky-300 font-bold'
                : isWhite
                ? 'bg-slate-100 border-slate-200 text-slate-600'
                : 'bg-slate-900/60 border-slate-800 text-slate-400'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${activeVehicle ? 'bg-cyan-400 animate-ping' : 'bg-emerald-500'}`} />
              <span>
                {activeVehicle ? (
                  <>
                    DETECTION RECORDED: <strong>{activeVehicle.name}</strong> ({activeVehicle.type}) → {activeVehicle.laneName}
                  </>
                ) : (
                  'DETECTION READY: Loops D1 (Left), D2 (Ahead), D3 (Right) Calibrated'
                )}
              </span>
            </div>
            <span className="text-[11px] font-semibold text-sky-600 dark:text-sky-400 hidden sm:inline">
              ISO / UK DfT Survey Format
            </span>
          </div>

          {/* Turn Movement Metrics Dashboard */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3">
            {/* Left Turn Box */}
            <div
              className={`p-3 rounded-xl border flex items-center justify-between ${
                isWhite ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/80 border-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                  <ArrowLeft className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400 font-semibold uppercase">Left (Westbound)</div>
                  <div className={`text-base font-extrabold font-mono ${isWhite ? 'text-slate-900' : 'text-white'}`}>
                    {leftCount} <span className="text-xs font-normal text-slate-400">veh/h</span>
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-500 border border-cyan-500/30">
                17.2%
              </span>
            </div>

            {/* Ahead Box */}
            <div
              className={`p-3 rounded-xl border flex items-center justify-between ${
                isWhite ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/80 border-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-sky-500/20 text-sky-400">
                  <ArrowUp className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400 font-semibold uppercase">Ahead (Northbound)</div>
                  <div className={`text-base font-extrabold font-mono ${isWhite ? 'text-slate-900' : 'text-white'}`}>
                    {aheadCount} <span className="text-xs font-normal text-slate-400">veh/h</span>
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-500/10 text-sky-500 border border-sky-500/30">
                71.2%
              </span>
            </div>

            {/* Right Turn Box */}
            <div
              className={`p-3 rounded-xl border flex items-center justify-between ${
                isWhite ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/80 border-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                  <ArrowRight className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400 font-semibold uppercase">Right (Eastbound)</div>
                  <div className={`text-base font-extrabold font-mono ${isWhite ? 'text-slate-900' : 'text-white'}`}>
                    {rightCount} <span className="text-xs font-normal text-slate-400">veh/h</span>
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/30">
                11.6%
              </span>
            </div>
          </div>

          {/* Classification Breakdown Pills */}
          <div
            className={`pt-2 border-t flex flex-wrap items-center justify-between gap-2 text-xs font-mono ${
              isWhite ? 'border-slate-200 text-slate-600' : 'border-slate-800 text-slate-400'
            }`}
          >
            <div className="flex flex-wrap items-center gap-2 text-[11px]">
              <span className="font-semibold text-slate-500">Fleet Class:</span>
              <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border border-cyan-500/20">
                Cars: 595 (72%)
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-300 border border-amber-500/20">
                LGV: 148 (18%)
              </span>
              <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-600 dark:text-red-300 border border-red-500/20">
                HGV: 58 (7%)
              </span>
              <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-300 border border-rose-500/20">
                Bus: 25 (3%)
              </span>
            </div>

            <div className="text-right">
              <span className="font-bold">
                Approach Total:{' '}
                <strong className="text-sky-600 dark:text-sky-400 text-sm ml-1 font-mono">
                  {approachTotal}
                </strong>{' '}
                vehicles
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
            <Gauge className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase">TAKEAWAY</div>
            <div className={`text-xs font-medium ${isWhite ? 'text-slate-800' : 'text-slate-200'}`}>
              Counts are grouped by movement and reporting period.
            </div>
          </div>
        </div>
        <div className="text-right text-xs shrink-0 font-bold text-sky-600 dark:text-sky-400">
          Period Total: 826 veh/h
        </div>
      </div>
    </div>
  );
}
