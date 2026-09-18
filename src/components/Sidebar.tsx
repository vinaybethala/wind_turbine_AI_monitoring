import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Activity, 
  BrainCircuit, 
  BarChart3, 
  History, 
  Wrench, 
  Network, 
  Settings 
} from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Live Monitoring', path: '/monitoring', icon: Activity },
  { name: 'AI Prediction', path: '/ai', icon: BrainCircuit },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  { name: 'Fault History', path: '/history', icon: History },
  { name: 'Maintenance', path: '/maintenance', icon: Wrench },
  { name: 'System Status', path: '/status', icon: Network },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-panel border-r border-white/5 h-full flex flex-col hidden md:flex">
      <div className="p-6 border-b border-white/5">
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primaryDark bg-clip-text text-transparent leading-tight">
          Wind Turbine AI
        </h1>
        <p className="text-[10px] text-textMuted uppercase tracking-widest mt-1">
          Predictive Maintenance
        </p>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              isActive 
                ? "bg-primary/10 text-primary" 
                : "text-textMuted hover:bg-white/5 hover:text-textMain"
            )}
          >
            <item.icon size={18} />
            {item.name}
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 border-t border-white/5 text-xs text-textMuted/50 text-center">
        Prototype Project v1.0
      </div>
    </aside>
  );
};
