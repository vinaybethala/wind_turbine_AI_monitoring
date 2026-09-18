import React from 'react';
import { useSystem } from '../context/SystemContext';
import { cn } from '../lib/utils';
import { ShieldAlert } from 'lucide-react';

export const TurbineVisual: React.FC = () => {
  const { systemState, aiState } = useSystem();
  
  const isRunning = systemState.turbineStatus === 'RUNNING';
  const isCritical = aiState.predictionSeverity === 'CRITICAL';
  const isWarning = aiState.predictionSeverity === 'WARNING';

  // Base colors
  const towerColor = "#94a3b8";
  const bladeColor = "#cbd5e1";
  const nacelleColor = "#e2e8f0";
  
  // Status glow
  let glowColor = "rgba(34, 197, 94, 0.2)"; // Green
  if (isCritical) glowColor = "rgba(239, 68, 68, 0.4)";
  else if (isWarning) glowColor = "rgba(245, 158, 11, 0.3)";

  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center bg-background/50 rounded-xl border border-white/5 overflow-hidden">
      
      {/* Background glow based on status */}
      <div 
        className="absolute inset-0 transition-colors duration-1000"
        style={{ background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 60%)` }}
      />
      
      {!isRunning && (
        <div className="absolute top-4 right-4 z-10 animate-pulse flex items-center gap-2 text-status-red bg-status-red/10 px-3 py-1.5 rounded-md border border-status-red/30">
          <ShieldAlert size={18} />
          <span className="font-bold tracking-widest text-sm">TURBINE STOPPED</span>
        </div>
      )}

      {/* SVG Illustration */}
      <div className="relative z-0 w-64 h-80">
        <svg viewBox="0 0 200 300" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="towerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="50%" stopColor={towerColor} />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
            <linearGradient id="nacelleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor={nacelleColor} />
            </linearGradient>
          </defs>

          {/* Tower */}
          <path d="M 90 300 L 110 300 L 105 100 L 95 100 Z" fill="url(#towerGradient)" />
          
          {/* Base */}
          <path d="M 70 300 L 130 300 L 125 290 L 75 290 Z" fill="#334155" />

          {/* Nacelle (Generator housing) */}
          <rect x="80" y="80" width="50" height="25" rx="10" fill="url(#nacelleGradient)" />
          
          {/* Hub */}
          <circle cx="85" cy="92.5" r="8" fill="#f8fafc" />
          
          {/* Rotating Blades Group */}
          <g 
            style={{ 
              transformOrigin: '85px 92.5px',
              animation: isRunning ? 'spin 3s linear infinite' : 'none'
            }}
          >
            {/* Blade 1 */}
            <path d="M 85 92.5 Q 95 30 85 10 Q 75 30 85 92.5" fill={bladeColor} opacity={0.9} />
            {/* Blade 2 */}
            <path d="M 85 92.5 Q 140 120 155 135 Q 130 145 85 92.5" fill={bladeColor} opacity={0.9} />
            {/* Blade 3 */}
            <path d="M 85 92.5 Q 30 120 15 135 Q 40 145 85 92.5" fill={bladeColor} opacity={0.9} />
          </g>
        </svg>
      </div>
      
      {/* Sensor Indicators (Decorative) */}
      <div className="absolute left-1/4 top-1/2 flex items-center gap-2 bg-panel/80 px-2 py-1 rounded text-xs text-textMuted backdrop-blur-sm border border-white/10">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
        Sensors Active
      </div>
      
    </div>
  );
};
