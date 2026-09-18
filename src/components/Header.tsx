import React from 'react';
import { useSystem } from '../context/SystemContext';
import { StatusBadge } from './StatusBadge';
import { Bell, Cloud, Cpu, User } from 'lucide-react';

export const Header: React.FC = () => {
  const { systemState, sensors, alerts } = useSystem();
  const unreadAlerts = alerts.length;

  return (
    <header className="h-16 bg-panel border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex-1 overflow-hidden">
        <h2 className="text-sm font-semibold truncate text-textMain hidden sm:block">
          Wind turbine AI monitoring productive maintainance & fault detection system
        </h2>
      </div>

      <div className="flex items-center gap-6 ml-4">
        {/* Status Indicators */}
        <div className="hidden lg:flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-textMuted">
            <Cpu size={14} /> ESP32
            <StatusBadge status="CONNECTED" type={systemState.demoMode ? 'blue' : 'green'} />
          </div>
          <div className="flex items-center gap-1.5 text-textMuted">
            <Cloud size={14} /> Cloud
            <StatusBadge status="CONNECTED" type="green" />
          </div>
        </div>

        {/* Timestamp */}
        <div className="hidden md:block text-xs text-textMuted font-mono">
          {new Date(sensors.timestamp).toLocaleTimeString()}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 border-l border-white/10 pl-6">
          <button className="relative p-2 text-textMuted hover:text-textMain transition-colors rounded-full hover:bg-white/5">
            <Bell size={18} />
            {unreadAlerts > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-status-red rounded-full animate-pulse" />
            )}
          </button>
          
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
            <User size={16} />
          </div>
        </div>
      </div>
    </header>
  );
};
