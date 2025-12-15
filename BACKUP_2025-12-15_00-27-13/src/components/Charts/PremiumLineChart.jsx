import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1A1A1A] border border-white/10 p-3 rounded-lg shadow-xl">
        <p className="text-gray-400 text-xs mb-1">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <p className="text-white font-bold">
              {entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
            </p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const PremiumLineChart = ({ data, xKey, series, height = 300 }) => {
  return (
    <div style={{ width: '100%', height: height }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
          <XAxis 
            dataKey={xKey} 
            stroke="#666" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
            dy={10}
          />
          <YAxis 
            stroke="#666" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          {series.map((s, i) => (
            <Line 
              key={i}
              type="monotone" 
              dataKey={s.key} 
              name={s.name}
              stroke={s.color} 
              strokeWidth={3}
              dot={{ r: 4, fill: '#111', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: s.color }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PremiumLineChart;