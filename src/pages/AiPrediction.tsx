import React from 'react';
import { useSystem } from '../context/SystemContext';
import { StatusBadge } from '../components/StatusBadge';
import { BrainCircuit, Database, GitMerge } from 'lucide-react';
import { cn } from '../lib/utils';

export const AiPrediction: React.FC = () => {
  const { aiState, history } = useSystem();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white mb-1">AI Fault Prediction</h1>
          <p className="text-sm text-textMuted">Machine learning model details and classification</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Model Info */}
        <div className="glass-panel p-6">
          <div className="flex justify-between items-start mb-6 border-b border-white/5 pb-4">
            <h2 className="text-lg font-semibold tracking-wide uppercase flex items-center gap-2">
              <BrainCircuit className="text-primary" size={20} />
              AI Engine
            </h2>
            <StatusBadge status="ACTIVE" type="green" pulse />
          </div>

          <div className="space-y-6 text-sm">
            <div className="grid grid-cols-3 gap-2">
              <span className="text-textMuted col-span-1">Model:</span>
              <span className="font-semibold text-textMain col-span-2">Random Forest Classifier</span>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <span className="text-textMuted col-span-1">Mode:</span>
              <span className="col-span-2">
                <StatusBadge status={aiState.predictionMode === 'DEMO' ? 'DEMO / SIMULATION' : 'LIVE API'} type="blue" />
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <span className="text-textMuted col-span-1">Purpose:</span>
              <span className="text-textMain col-span-2">Wind Turbine Fault Classification</span>
            </div>
            
            <div className="mt-6">
              <h3 className="text-textMuted mb-2 flex items-center gap-2"><Database size={16}/> Input Features:</h3>
              <ul className="list-disc list-inside text-textMain ml-4 space-y-1">
                <li>DC Motor Temperature</li>
                <li>Current Sensor</li>
                <li>Vibration Sensor</li>
                <li>RPM from Hall Effect Sensor</li>
                <li>Operating Time</li>
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="text-textMuted mb-2 flex items-center gap-2"><GitMerge size={16}/> Output Classes:</h3>
              <ul className="list-disc list-inside text-textMain ml-4 space-y-1">
                <li>Normal Operation</li>
                <li>Bearing Fault</li>
                <li>Motor Fault</li>
              </ul>
            </div>
            
            <div className="mt-6 p-4 bg-status-blue/10 border border-status-blue/20 rounded-lg text-status-blue">
               <p className="font-semibold mb-1">Architecture Note:</p>
               <p className="text-xs">The current prediction logic uses a deterministic simulation model for demonstration purposes. It can be replaced by a real Random Forest API backend without redesigning the frontend.</p>
            </div>
          </div>
        </div>

        {/* Live Probabilities */}
        <div className="glass-panel p-6 flex flex-col">
          <h2 className="text-lg font-semibold tracking-wide uppercase mb-6 border-b border-white/5 pb-4">Live Probabilities</h2>
          
          <div className="flex-1 flex flex-col justify-center space-y-8">
            <ProbabilityDetail 
              label="Normal Operation Probability" 
              probability={aiState.normalProbability} 
              color="bg-status-green" 
              desc="System is running within expected parameters."
            />
            <ProbabilityDetail 
              label="Bearing Fault Probability" 
              probability={aiState.bearingFaultProbability} 
              color="bg-status-amber" 
              desc="Signaled by increasing vibration, increasing temperature, and RPM drop."
            />
            <ProbabilityDetail 
              label="Motor Fault Probability" 
              probability={aiState.motorFaultProbability} 
              color="bg-status-red" 
              desc="Signaled by increasing current draw, increasing temperature, and RPM drop."
            />
          </div>
        </div>

      </div>
    </div>
  );
};

const ProbabilityDetail: React.FC<{ label: string, probability: number, color: string, desc: string }> = ({ label, probability, color, desc }) => (
  <div>
    <div className="flex justify-between items-end mb-2">
      <span className="text-base font-medium text-textMain">{label}</span>
      <span className="text-xl font-bold text-textMain">{probability.toFixed(1)}%</span>
    </div>
    <div className="w-full bg-panelHover rounded-full h-3 border border-white/5 overflow-hidden mb-2">
      <div className={cn("h-3 rounded-full transition-all duration-700 ease-in-out", color)} style={{ width: `${probability}%` }}></div>
    </div>
    <p className="text-xs text-textMuted">{desc}</p>
  </div>
);
