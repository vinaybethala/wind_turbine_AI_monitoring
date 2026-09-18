import React from 'react';
import { useSystem } from '../context/SystemContext';
import { Settings as SettingsIcon, Play, Square, AlertOctagon, RotateCcw } from 'lucide-react';
import { cn } from '../lib/utils';

export const Settings: React.FC = () => {
  const { systemState, setDemoScenario, toggleDemoMode, triggerEmergencyStop, resetSystem, thresholds, updateThresholds } = useSystem();

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white mb-1">System Settings & Controls</h1>
        <p className="text-sm text-textMuted">Configure thresholds and prototype demo scenarios</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Prototype Controls */}
        <div className="glass-panel p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6 pb-2 border-b border-white/5">
             <h2 className="text-lg font-semibold tracking-wide uppercase flex items-center gap-2">
               <SettingsIcon className="text-primary" size={20} /> Prototype Controls
             </h2>
             <button 
                onClick={toggleDemoMode}
                className={cn(
                  "px-3 py-1 text-xs font-bold rounded uppercase tracking-wider transition-colors",
                  systemState.demoMode ? "bg-status-blue/20 text-status-blue border border-status-blue/50" : "bg-white/10 text-textMuted border border-white/20"
                )}
             >
               {systemState.demoMode ? 'Simulation ON' : 'Simulation OFF'}
             </button>
          </div>

          <div className="space-y-4 flex-1">
             <h3 className="text-sm font-medium text-textMuted mb-2">Fault Simulation Scenarios</h3>
             <div className="grid grid-cols-2 gap-3">
                <DemoBtn 
                  active={systemState.demoScenario === 'NORMAL'} 
                  onClick={() => setDemoScenario('NORMAL')}
                  color="green"
                >
                  Normal Mode
                </DemoBtn>
                <DemoBtn 
                  active={systemState.demoScenario === 'BEARING_FAULT'} 
                  onClick={() => setDemoScenario('BEARING_FAULT')}
                  color="amber"
                >
                  Simulate Bearing Fault
                </DemoBtn>
                <DemoBtn 
                  active={systemState.demoScenario === 'MOTOR_FAULT'} 
                  onClick={() => setDemoScenario('MOTOR_FAULT')}
                  color="amber"
                >
                  Simulate Motor Fault
                </DemoBtn>
                <DemoBtn 
                  active={systemState.demoScenario === 'CRITICAL_FAULT'} 
                  onClick={() => setDemoScenario('CRITICAL_FAULT')}
                  color="red"
                >
                  Simulate Critical Fault
                </DemoBtn>
             </div>
             
             <div className="pt-6 mt-6 border-t border-white/5 flex gap-3">
               <button 
                 onClick={resetSystem}
                 className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-textMain py-2.5 rounded-lg text-sm font-semibold transition-colors border border-white/10"
               >
                 <RotateCcw size={16} /> Reset System
               </button>
               <button 
                 onClick={triggerEmergencyStop}
                 disabled={systemState.turbineStatus === 'STOPPED'}
                 className="flex-1 flex items-center justify-center gap-2 bg-status-red/20 hover:bg-status-red/30 text-status-red py-2.5 rounded-lg text-sm font-bold transition-colors border border-status-red/50 disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 <AlertOctagon size={16} /> EMERGENCY STOP
               </button>
             </div>
          </div>
        </div>

        {/* Threshold Configuration */}
        <div className="glass-panel p-6">
          <h2 className="text-lg font-semibold tracking-wide uppercase mb-6 pb-2 border-b border-white/5">
             Alert Thresholds
          </h2>
          
          <div className="space-y-4">
             <ThresholdInput 
               label="Temp Warning (°C)" 
               value={thresholds.tempWarning} 
               onChange={(v) => updateThresholds({ tempWarning: v })} 
             />
             <ThresholdInput 
               label="Temp Critical (°C)" 
               value={thresholds.tempCritical} 
               onChange={(v) => updateThresholds({ tempCritical: v })} 
             />
             <div className="h-px w-full bg-white/5 my-2"></div>
             <ThresholdInput 
               label="Vibration Warning (mm/s)" 
               value={thresholds.vibrationWarning} 
               onChange={(v) => updateThresholds({ vibrationWarning: v })} 
             />
             <ThresholdInput 
               label="Vibration Critical (mm/s)" 
               value={thresholds.vibrationCritical} 
               onChange={(v) => updateThresholds({ vibrationCritical: v })} 
             />
             <div className="h-px w-full bg-white/5 my-2"></div>
             <ThresholdInput 
               label="Current Warning (A)" 
               value={thresholds.currentWarning} 
               onChange={(v) => updateThresholds({ currentWarning: v })} 
             />
             <ThresholdInput 
               label="Current Critical (A)" 
               value={thresholds.currentCritical} 
               onChange={(v) => updateThresholds({ currentCritical: v })} 
             />
          </div>
          
          <div className="mt-6 p-3 bg-status-blue/10 rounded border border-status-blue/20 text-xs text-status-blue">
            These are prototype thresholds for educational demonstration purposes.
          </div>
        </div>

      </div>
    </div>
  );
};

const DemoBtn: React.FC<{ active: boolean, onClick: () => void, children: React.ReactNode, color: 'green' | 'amber' | 'red' }> = ({ active, onClick, children, color }) => {
  const colorMap = {
    green: 'active:bg-status-green/30 border-status-green/50 text-status-green',
    amber: 'active:bg-status-amber/30 border-status-amber/50 text-status-amber',
    red: 'active:bg-status-red/30 border-status-red/50 text-status-red shadow-glow-red',
  };

  return (
    <button 
      onClick={onClick}
      className={cn(
        "p-3 text-xs font-semibold uppercase tracking-wider rounded-lg border transition-all text-center",
        active ? cn("bg-opacity-20", colorMap[color], `bg-status-${color}/20`) : "bg-panelHover text-textMuted border-white/10 hover:border-white/30"
      )}
    >
      {children}
    </button>
  );
};

const ThresholdInput: React.FC<{ label: string, value: number, onChange: (val: number) => void }> = ({ label, value, onChange }) => (
  <div className="flex justify-between items-center">
    <span className="text-sm text-textMain">{label}</span>
    <input 
      type="number" 
      value={value} 
      onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
      className="bg-background border border-white/10 rounded px-2 py-1 w-24 text-right text-sm text-textMain focus:outline-none focus:border-primary"
      step="0.1"
    />
  </div>
);
