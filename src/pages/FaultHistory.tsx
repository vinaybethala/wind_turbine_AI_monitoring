import React, { useState } from 'react';
import { useSystem } from '../context/SystemContext';
import { StatusBadge, getSeverityColorType } from '../components/StatusBadge';
import { format } from 'date-fns';
import { Search, Filter } from 'lucide-react';

export const FaultHistory: React.FC = () => {
  const { faultHistory } = useSystem();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredHistory = faultHistory.filter(fault => 
    fault.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fault.sensor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fault.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 flex flex-col h-full">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Fault History</h1>
          <p className="text-sm text-textMuted">Log of all simulated faults and system alerts</p>
        </div>
      </div>

      <div className="glass-panel flex-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-white/5 flex gap-4 items-center bg-panel/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" size={16} />
            <input 
              type="text" 
              placeholder="Search faults..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-background border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-textMain focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-background border border-white/10 rounded-lg text-sm text-textMuted hover:text-textMain transition-colors">
            <Filter size={16} /> Filters
          </button>
        </div>
        
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-panelHover/50 sticky top-0 z-10 shadow-md">
              <tr>
                <th className="px-6 py-4 font-semibold text-textMuted uppercase tracking-wider text-xs">Time</th>
                <th className="px-6 py-4 font-semibold text-textMuted uppercase tracking-wider text-xs">Fault Type</th>
                <th className="px-6 py-4 font-semibold text-textMuted uppercase tracking-wider text-xs">Sensor</th>
                <th className="px-6 py-4 font-semibold text-textMuted uppercase tracking-wider text-xs">Severity</th>
                <th className="px-6 py-4 font-semibold text-textMuted uppercase tracking-wider text-xs">Value</th>
                <th className="px-6 py-4 font-semibold text-textMuted uppercase tracking-wider text-xs">Action</th>
                <th className="px-6 py-4 font-semibold text-textMuted uppercase tracking-wider text-xs">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredHistory.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-textMuted">
                    No faults recorded in the current session.
                  </td>
                </tr>
              ) : (
                filteredHistory.map(fault => (
                  <tr key={fault.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-textMain font-mono text-xs">
                      {format(new Date(fault.timestamp), 'HH:mm:ss')}
                    </td>
                    <td className="px-6 py-4 font-medium text-textMain">
                      {fault.type}
                    </td>
                    <td className="px-6 py-4 text-textMuted">
                      {fault.sensor}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={fault.severity} type={getSeverityColorType(fault.severity)} />
                    </td>
                    <td className="px-6 py-4 text-textMain">
                      {fault.value !== 0 ? fault.value.toFixed(1) : '-'}
                    </td>
                    <td className="px-6 py-4 text-textMuted">
                      {fault.action}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={fault.status} type={fault.status === 'Resolved' ? 'green' : 'amber'} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
