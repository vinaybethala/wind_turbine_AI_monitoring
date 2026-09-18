import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

interface TrendChartProps {
  data: any[];
  dataKey: string;
  color: string;
  title: string;
  unit?: string;
}

export const TrendChart: React.FC<TrendChartProps> = ({ data, dataKey, color, title, unit = '' }) => {
  return (
    <div className="glass-panel p-4 h-64 flex flex-col">
      <h3 className="text-sm font-medium text-textMuted mb-2 tracking-wider">{title}</h3>
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id={`color-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis 
              dataKey="timestamp" 
              tickFormatter={(tick) => format(new Date(tick), 'HH:mm:ss')} 
              stroke="#64748b" 
              fontSize={10}
              tickMargin={8}
            />
            <YAxis stroke="#64748b" fontSize={10} tickFormatter={(val) => `${val}${unit}`} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '0.5rem', color: '#f8fafc' }}
              itemStyle={{ color: color }}
              labelFormatter={(label) => format(new Date(label as string | number), 'HH:mm:ss')}
            />
            <Area 
              type="monotone" 
              dataKey={dataKey} 
              stroke={color} 
              strokeWidth={2}
              fillOpacity={1} 
              fill={`url(#color-${dataKey})`} 
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
