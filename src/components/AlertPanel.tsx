import React from 'react';
import { useSystem } from '../context/SystemContext';
import { AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { format } from 'date-fns';
import { Alert } from '../types';

export const AlertPanel: React.FC = () => {
  const { alerts, acknowledgeAlert } = useSystem();

  if (alerts.length === 0) return null;

  return (
    <div className="fixed top-20 right-6 z-50 flex flex-col gap-3 max-w-sm w-full">
      {alerts.map(alert => (
        <AlertItem key={alert.id} alert={alert} onAcknowledge={() => acknowledgeAlert(alert.id)} />
      ))}
    </div>
  );
};

const AlertItem: React.FC<{ alert: Alert; onAcknowledge: () => void }> = ({ alert, onAcknowledge }) => {
  const isCritical = alert.severity === 'CRITICAL';
  const isWarning = alert.severity === 'WARNING';

  const Icon = isCritical ? AlertCircle : isWarning ? AlertTriangle : Info;

  return (
    <div className={cn(
      "glass-panel overflow-hidden animate-in slide-in-from-right-8 duration-300",
      isCritical && "border-status-red shadow-glow-red",
      isWarning && "border-status-amber"
    )}>
      <div className={cn(
        "px-4 py-2 flex items-center justify-between border-b border-white/10",
        isCritical ? "bg-status-red/20" : isWarning ? "bg-status-amber/20" : "bg-status-blue/20"
      )}>
        <div className="flex items-center gap-2">
          <Icon size={16} className={cn(
            isCritical ? "text-status-red" : isWarning ? "text-status-amber" : "text-status-blue"
          )} />
          <span className="font-semibold text-sm tracking-wider uppercase">
            {alert.type}
          </span>
        </div>
        <button onClick={onAcknowledge} className="text-textMuted hover:text-white transition-colors">
          <X size={16} />
        </button>
      </div>
      
      <div className="p-4 bg-panel/50">
        <p className="text-sm font-medium text-textMain mb-2">{alert.message}</p>
        
        <div className="grid grid-cols-2 gap-2 text-xs text-textMuted mb-3">
          <div>
            <span className="block opacity-70">Source</span>
            <span className="font-medium text-textMain">{alert.sensor}</span>
          </div>
          <div>
            <span className="block opacity-70">Time</span>
            <span>{format(new Date(alert.timestamp), 'HH:mm:ss')}</span>
          </div>
          {alert.value !== 0 && (
             <div>
               <span className="block opacity-70">Value</span>
               <span className="font-medium text-textMain">{alert.value} (Limit: {alert.threshold})</span>
             </div>
          )}
        </div>
        
        <div className="bg-background/50 p-2 rounded text-xs border border-white/5">
          <span className="font-semibold text-primary mr-2">Action:</span>
          {alert.action}
        </div>
      </div>
    </div>
  );
};
