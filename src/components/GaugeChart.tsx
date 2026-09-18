import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface GaugeChartProps {
  value: number; // 0-100
  title: string;
}

export const GaugeChart: React.FC<GaugeChartProps> = ({ value, title }) => {
  const normalizedValue = Math.max(0, Math.min(100, value));
  
  const data = [
    { name: 'Health', value: normalizedValue },
    { name: 'Empty', value: 100 - normalizedValue }
  ];

  let color = '#22c55e'; // green
  let statusText = 'Excellent';
  if (normalizedValue < 50) {
    color = '#ef4444'; // red
    statusText = 'Critical';
  } else if (normalizedValue < 75) {
    color = '#f59e0b'; // amber
    statusText = 'Warning';
  } else if (normalizedValue < 90) {
    statusText = 'Healthy';
  }

  return (
    <div className="relative w-full h-52 flex flex-col items-center justify-end pb-2">
      <div className="absolute inset-0 top-0 h-40">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="100%"
              startAngle={180}
              endAngle={0}
              innerRadius="75%"
              outerRadius="100%"
              paddingAngle={0}
              dataKey="value"
              stroke="none"
              cornerRadius={5}
            >
              <Cell fill={color} style={{ filter: `drop-shadow(0 0 8px ${color}66)` }} />
              <Cell fill="#334155" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-col items-center z-10 mt-28">
        <span className="text-4xl font-bold text-textMain leading-none">{normalizedValue}%</span>
        <span className="text-xs font-medium text-textMuted uppercase tracking-wider mt-2">{title}</span>
        <span style={{ color }} className="mt-1 font-bold text-sm uppercase tracking-wide">{statusText}</span>
      </div>
    </div>
  );
};
