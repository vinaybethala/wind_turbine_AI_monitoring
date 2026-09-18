import React from 'react';
import { useSystem } from '../context/SystemContext';
import { TurbineVisual } from '../components/TurbineVisual';
import { TrendChart } from '../components/TrendChart';
import { StatusBadge } from '../components/StatusBadge';

export const LiveMonitoring: React.FC = () => {
  const { systemState, history, sensors } = useSystem();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Live Monitoring</h1>
          <p className="text-sm text-textMuted">Real-time sensor data and visualization</p>
        </div>
        {systemState.demoMode && (
          <div className="flex items-center gap-2 bg-status-blue/10 border border-status-blue/30 px-3 py-1.5 rounded text-sm text-status-blue font-semibold animate-pulse">
            SIMULATION MODE ACTIVE
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Visual */}
        <div className="lg:col-span-1 glass-panel p-6 flex flex-col h-[500px]">
          <h2 className="text-lg font-semibold tracking-wide uppercase mb-4">System State</h2>
          <div className="flex-1 rounded-lg overflow-hidden border border-white/5">
            <TurbineVisual />
          </div>
          
          <div className="mt-4 space-y-2 text-sm text-textMuted">
             <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <span>Relay State</span>
                <StatusBadge status={systemState.relayStatus} type={systemState.relayStatus === 'ON' ? 'green' : 'red'} />
             </div>
             <div className="flex justify-between items-center pt-1">
                <span>Last Update</span>
                <span className="font-mono text-textMain">{new Date(sensors.timestamp).toLocaleTimeString()}</span>
             </div>
          </div>
        </div>

        {/* Right Column: Live Graphs */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <TrendChart 
            title="Temperature Trend" 
            data={history} 
            dataKey="temperature" 
            color="#f59e0b" 
            unit="°C" 
          />
          <TrendChart 
            title="Vibration Trend" 
            data={history} 
            dataKey="vibration" 
            color="#ef4444" 
            unit="mm/s" 
          />
          <TrendChart 
            title="Current Trend" 
            data={history} 
            dataKey="current" 
            color="#38bdf8" 
            unit="A" 
          />
          <TrendChart 
            title="Rotor Speed Trend" 
            data={history} 
            dataKey="rpm" 
            color="#8b5cf6" 
            unit="RPM" 
          />
        </div>
      </div>
    </div>
  );
};
