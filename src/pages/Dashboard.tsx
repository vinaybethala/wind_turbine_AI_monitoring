import React from 'react';
import { useSystem } from '../context/SystemContext';
import { SensorCard } from '../components/SensorCard';
import { GaugeChart } from '../components/GaugeChart';
import { Thermometer, Zap, RefreshCw, Activity, AlertTriangle } from 'lucide-react';
import { cn } from '../lib/utils';
import { getSeverityColorType, StatusBadge } from '../components/StatusBadge';

export const Dashboard: React.FC = () => {
  const { sensors, aiState, systemState, thresholds } = useSystem();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Overview Dashboard</h1>
        <p className="text-sm text-textMuted">AI-Powered IoT Condition Monitoring & Predictive Maintenance</p>
      </div>

      {/* Turbine Overview & AI Prediction */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Turbine Health Overview */}
        <div className="glass-panel p-6 lg:col-span-1 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-lg font-semibold tracking-wide uppercase">Turbine Overview</h2>
            <StatusBadge 
              status={systemState.turbineStatus} 
              type={systemState.turbineStatus === 'RUNNING' ? 'green' : 'red'} 
              pulse={systemState.turbineStatus === 'RUNNING'} 
            />
          </div>
          
          <GaugeChart value={aiState.turbineHealth} title="Turbine Health" />
          
          <div className="mt-6 p-4 bg-background/50 rounded-lg border border-white/5 text-center">
            <p className="text-sm text-textMuted uppercase tracking-wider mb-1">Operating State</p>
            <p className={cn(
              "text-lg font-bold",
              aiState.predictionSeverity === 'CRITICAL' ? "text-status-red" :
              aiState.predictionSeverity === 'WARNING' ? "text-status-amber" :
              systemState.turbineStatus === 'STOPPED' ? "text-status-red" : "text-status-green"
            )}>
              {aiState.predictionMessage}
            </p>
          </div>
        </div>

        {/* AI Prediction Panel */}
        <div className="glass-panel p-6 lg:col-span-2 flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold tracking-wide uppercase flex items-center gap-2">
                <BrainIcon /> AI Fault Prediction
              </h2>
              <span className="text-xs text-textMuted mt-1 flex items-center gap-1">
                 <StatusBadge status={aiState.predictionMode + " MODE"} type="blue" />
              </span>
            </div>
            
            <div className="text-right">
              <p className="text-xs text-textMuted uppercase tracking-wider mb-1">Current Prediction</p>
              <div className="flex items-center gap-2 justify-end">
                {aiState.predictionSeverity !== 'INFO' && <AlertTriangle size={16} className={cn(
                  aiState.predictionSeverity === 'CRITICAL' ? 'text-status-red' : 'text-status-amber'
                )}/>}
                <span className={cn(
                  "font-bold uppercase tracking-wider",
                  aiState.predictionSeverity === 'CRITICAL' ? 'text-status-red' : 
                  aiState.predictionSeverity === 'WARNING' ? 'text-status-amber' : 'text-status-green'
                )}>
                  {aiState.predictionMessage}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-6 flex-1 flex flex-col justify-center">
            <ProbabilityBar label="Normal Operation" probability={aiState.normalProbability} color="bg-status-green" />
            <ProbabilityBar label="Bearing Fault" probability={aiState.bearingFaultProbability} color="bg-status-amber" />
            <ProbabilityBar label="Motor Fault" probability={aiState.motorFaultProbability} color="bg-status-red" />
          </div>
        </div>
      </div>

      {/* Live Sensor Cards */}
      <h2 className="text-lg font-semibold tracking-wide uppercase mt-8 mb-4 border-b border-white/10 pb-2">Live Sensors</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <SensorCard 
          title="DC Motor Temp" 
          value={sensors.temperature} 
          unit="°C" 
          icon={Thermometer} 
          normalThreshold={thresholds.tempWarning} 
          criticalThreshold={thresholds.tempCritical} 
        />
        <SensorCard 
          title="Current" 
          value={sensors.current} 
          unit="A" 
          icon={Zap} 
          normalThreshold={thresholds.currentWarning} 
          criticalThreshold={thresholds.currentCritical} 
        />
        <SensorCard 
          title="Vibration" 
          value={sensors.vibration} 
          unit="mm/s" 
          icon={Activity} 
          normalThreshold={thresholds.vibrationWarning} 
          criticalThreshold={thresholds.vibrationCritical} 
        />
        <SensorCard 
          title="Hall Effect (RPM)" 
          value={sensors.rpm} 
          unit="RPM" 
          icon={RefreshCw} 
          normalThreshold={800} // Example threshold for low RPM
          criticalThreshold={500} 
          isInverse={true} // Lower RPM is bad
        />
      </div>
    </div>
  );
};

const ProbabilityBar: React.FC<{ label: string, probability: number, color: string }> = ({ label, probability, color }) => (
  <div>
    <div className="flex justify-between items-end mb-1">
      <span className="text-sm font-medium text-textMain">{label}</span>
      <span className="text-sm font-bold text-textMain">{probability.toFixed(1)}%</span>
    </div>
    <div className="w-full bg-panelHover rounded-full h-2.5 border border-white/5 overflow-hidden">
      <div className={cn("h-2.5 rounded-full transition-all duration-700 ease-in-out", color)} style={{ width: `${probability}%` }}></div>
    </div>
  </div>
);

const BrainIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/>
    <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/>
    <path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M19.967 17.484A4 4 0 0 1 18 18"/>
  </svg>
);
