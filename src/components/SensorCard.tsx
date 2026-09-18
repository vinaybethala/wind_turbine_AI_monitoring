import React from 'react';
import { LucideIcon } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

interface SensorCardProps {
  title: string;
  value: number | string;
  unit: string;
  icon: LucideIcon;
  normalThreshold: number;
  criticalThreshold: number;
  trend?: 'up' | 'down' | 'stable';
  isInverse?: boolean; // If true, lower is worse (like RPM)
}

export const SensorCard: React.FC<SensorCardProps> = ({
  title, value, unit, icon: Icon, normalThreshold, criticalThreshold, trend, isInverse = false
}) => {
  let statusType: 'green' | 'amber' | 'red' = 'green';
  let statusText = 'Normal';
  
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;

  if (isInverse) {
    if (numericValue < criticalThreshold) {
      statusType = 'red';
      statusText = 'Critical';
    } else if (numericValue < normalThreshold) {
      statusType = 'amber';
      statusText = 'Warning';
    }
  } else {
    if (numericValue > criticalThreshold) {
      statusType = 'red';
      statusText = 'Critical';
    } else if (numericValue > normalThreshold) {
      statusType = 'amber';
      statusText = 'Warning';
    }
  }

  return (
    <div className="glass-panel p-5 flex flex-col justify-between h-full hover:bg-panelHover transition-colors duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center text-textMuted">
          <Icon size={18} className="mr-2 text-primary" />
          <h3 className="text-sm font-medium uppercase tracking-wider">{title}</h3>
        </div>
        <StatusBadge status={statusText} type={statusType} pulse={statusType === 'red'} />
      </div>
      
      <div className="mt-2">
        <div className="flex items-baseline">
          <span className="text-4xl font-bold text-textMain tracking-tight">{value}</span>
          <span className="ml-1 text-lg text-textMuted">{unit}</span>
        </div>
        
        <div className="mt-4 flex flex-col gap-1 text-xs text-textMuted">
          <div className="flex justify-between">
            <span>Normal:</span>
            <span>{isInverse ? `> ${normalThreshold}` : `< ${normalThreshold}`} {unit}</span>
          </div>
          <div className="flex justify-between">
            <span>Critical:</span>
            <span>{isInverse ? `< ${criticalThreshold}` : `> ${criticalThreshold}`} {unit}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
