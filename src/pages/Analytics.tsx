import React from 'react';
import { useSystem } from '../context/SystemContext';
import { TrendChart } from '../components/TrendChart';
import { Activity, Thermometer, Zap, RefreshCw } from 'lucide-react';
import { cn } from '../lib/utils';

export const Analytics: React.FC = () => {
  const { history, aiState } = useSystem();

  // Simple aggregation for demo purposes based on recent history
  const validHistory = history.length > 0 ? history : [{ temperature: 0, current: 0, vibration: 0, rpm: 0 }];
  
  const maxTemp = Math.max(...validHistory.map(h => h.temperature));
  const avgTemp = validHistory.reduce((acc, h) => acc + h.temperature, 0) / validHistory.length;
  
  const maxVib = Math.max(...validHistory.map(h => h.vibration));
  const avgVib = validHistory.reduce((acc, h) => acc + h.vibration, 0) / validHistory.length;
  
  const maxCurr = Math.max(...validHistory.map(h => h.current));
  const avgCurr = validHistory.reduce((acc, h) => acc + h.current, 0) / validHistory.length;
  
  const minRpm = Math.min(...validHistory.map(h => h.rpm));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white mb-1">System Analytics</h1>
        <p className="text-sm text-textMuted">Historical trends and aggregated performance metrics</p>
      </div>

      {/* Aggregate Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Thermometer} title="Avg Temperature" value={avgTemp.toFixed(1)} unit="°C" max={maxTemp.toFixed(1)} />
        <StatCard icon={Activity} title="Avg Vibration" value={avgVib.toFixed(2)} unit="mm/s" max={maxVib.toFixed(2)} />
        <StatCard icon={Zap} title="Avg Current" value={avgCurr.toFixed(2)} unit="A" max={maxCurr.toFixed(2)} />
        <StatCard icon={RefreshCw} title="Min RPM" value={minRpm.toFixed(0)} unit="RPM" max="-" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6 flex flex-col h-[350px]">
           <h2 className="text-sm font-semibold tracking-wide uppercase text-textMuted mb-2">Temperature vs Time</h2>
           <TrendChart data={history} dataKey="temperature" color="#f59e0b" title="" unit="°C" />
        </div>
        <div className="glass-panel p-6 flex flex-col h-[350px]">
           <h2 className="text-sm font-semibold tracking-wide uppercase text-textMuted mb-2">Vibration vs Time</h2>
           <TrendChart data={history} dataKey="vibration" color="#ef4444" title="" unit="mm/s" />
        </div>
        <div className="glass-panel p-6 flex flex-col h-[350px]">
           <h2 className="text-sm font-semibold tracking-wide uppercase text-textMuted mb-2">Current vs Time</h2>
           <TrendChart data={history} dataKey="current" color="#38bdf8" title="" unit="A" />
        </div>
        <div className="glass-panel p-6 flex flex-col h-[350px]">
           <h2 className="text-sm font-semibold tracking-wide uppercase text-textMuted mb-2">Rotor Speed (RPM) vs Time</h2>
           <TrendChart data={history} dataKey="rpm" color="#8b5cf6" title="" unit="RPM" />
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: any, title: string, value: string, unit: string, max: string }> = ({ icon: Icon, title, value, unit, max }) => (
  <div className="glass-panel p-4 flex flex-col justify-between">
    <div className="flex items-center text-textMuted mb-2">
      <Icon size={16} className="mr-2 text-primary" />
      <h3 className="text-xs font-medium uppercase tracking-wider">{title}</h3>
    </div>
    <div className="flex items-baseline mb-2">
      <span className="text-2xl font-bold text-textMain">{value}</span>
      <span className="ml-1 text-sm text-textMuted">{unit}</span>
    </div>
    {max !== "-" && (
      <div className="text-xs text-textMuted border-t border-white/5 pt-2 mt-auto">
        Max recorded: <span className="text-textMain font-medium">{max} {unit}</span>
      </div>
    )}
  </div>
);
