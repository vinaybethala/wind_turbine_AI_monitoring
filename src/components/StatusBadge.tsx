import React from 'react';
import { cn } from '../lib/utils';
import { Severity } from '../types';

interface StatusBadgeProps {
  status: string;
  type?: 'green' | 'amber' | 'red' | 'blue' | 'gray';
  pulse?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, type = 'gray', pulse = false }) => {
  const typeStyles = {
    green: 'bg-status-green/20 text-status-green border-status-green/50',
    amber: 'bg-status-amber/20 text-status-amber border-status-amber/50',
    red: 'bg-status-red/20 text-status-red border-status-red/50 shadow-glow-red',
    blue: 'bg-status-blue/20 text-status-blue border-status-blue/50',
    gray: 'bg-status-gray/20 text-status-gray border-status-gray/50',
  };

  const dotStyles = {
    green: 'bg-status-green',
    amber: 'bg-status-amber',
    red: 'bg-status-red',
    blue: 'bg-status-blue',
    gray: 'bg-status-gray',
  };

  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border', typeStyles[type])}>
      <span className={cn('mr-1.5 h-2 w-2 rounded-full', dotStyles[type], pulse && 'animate-pulse')} />
      {status}
    </span>
  );
};

export const getSeverityColorType = (severity: Severity) => {
  switch (severity) {
    case 'INFO': return 'blue';
    case 'WARNING': return 'amber';
    case 'CRITICAL': return 'red';
    default: return 'gray';
  }
};
