import React from 'react';
import { useSystem } from '../context/SystemContext';
import { StatusBadge } from '../components/StatusBadge';
import { Cpu, Cloud, BrainCircuit, ShieldCheck, Activity, ArrowDown } from 'lucide-react';
import { cn } from '../lib/utils';

export const SystemStatus: React.FC = () => {
  const { systemState, aiState, sensors } = useSystem();

  const isSim = systemState.demoMode;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-2xl font-bold tracking-tight text-white mb-2">IoT Architecture Status</h1>
        <p className="text-sm text-textMuted">End-to-end data flow and component health</p>
      </div>

      <div className="flex flex-col items-center gap-2 relative">
        
        {/* Turbine & Sensors */}
        <NodeCard 
          icon={Activity} 
          title="Wind Turbine & Sensors" 
          status={isSim ? "SIMULATED" : "ACTIVE"}
          type={isSim ? "blue" : "green"}
          details={[
            { label: 'Sensors', value: '4/4 Online' },
            { label: 'State', value: systemState.turbineStatus }
          ]}
        />

        <DataFlow active />

        {/* ESP32 */}
        <NodeCard 
          icon={Cpu} 
          title="ESP32 Microcontroller" 
          status={isSim ? "SIMULATED" : "CONNECTED"}
          type={isSim ? "blue" : "green"}
          details={[
            { label: 'Last Update', value: '1 sec ago' },
            { label: 'Latency', value: '12ms' }
          ]}
        />

        <DataFlow active />

        {/* Cloud */}
        <NodeCard 
          icon={Cloud} 
          title="Cloud Server (Node.js)" 
          status="CONNECTED"
          type="green"
          details={[
            { label: 'Packets/s', value: '2.4' },
            { label: 'Uptime', value: '99.9%' }
          ]}
        />

        <DataFlow active />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <div className="flex flex-col items-center">
            {/* AI Engine */}
            <NodeCard 
              icon={BrainCircuit} 
              title="AI Prediction Engine" 
              status="ACTIVE"
              type="green"
              details={[
                { label: 'Model', value: 'Random Forest' },
                { label: 'Health', value: `${aiState.turbineHealth}%` }
              ]}
              className="w-full"
            />
          </div>
          
          <div className="flex flex-col items-center">
             {/* Protection */}
             <NodeCard 
              icon={ShieldCheck} 
              title="Protection System" 
              status={systemState.autoShutdownEnabled ? "READY" : "DISABLED"}
              type={systemState.autoShutdownEnabled ? "green" : "gray"}
              details={[
                { label: 'Relay', value: systemState.relayStatus },
                { label: 'E-Stop', value: systemState.emergencyStop ? 'ENGAGED' : 'READY' }
              ]}
              className="w-full"
            />
          </div>
        </div>
        
      </div>
    </div>
  );
};

const NodeCard: React.FC<{
  icon: any, title: string, status: string, type: any, details: {label: string, value: string}[], className?: string
}> = ({ icon: Icon, title, status, type, details, className }) => (
  <div className={cn("glass-panel p-4 w-full md:w-96 flex flex-col items-center border-t-4", 
    type === 'green' ? 'border-t-status-green' : type === 'blue' ? 'border-t-status-blue' : 'border-t-status-gray',
    className
  )}>
    <div className="flex w-full justify-between items-start mb-3">
       <div className="flex items-center gap-3">
         <div className="p-2 bg-white/5 rounded-lg"><Icon className="text-textMain" size={20} /></div>
         <h3 className="font-semibold text-textMain">{title}</h3>
       </div>
       <StatusBadge status={status} type={type} />
    </div>
    
    <div className="w-full grid grid-cols-2 gap-2 text-xs">
      {details.map((d, i) => (
        <div key={i} className="bg-background/50 p-2 rounded border border-white/5 flex flex-col">
           <span className="text-textMuted">{d.label}</span>
           <span className="font-medium text-textMain">{d.value}</span>
        </div>
      ))}
    </div>
  </div>
);

const DataFlow: React.FC<{ active: boolean }> = ({ active }) => (
  <div className="py-2 flex flex-col items-center justify-center text-primary/50 relative h-12">
    <ArrowDown size={24} className={cn("absolute", active && "animate-bounce")} />
  </div>
);
