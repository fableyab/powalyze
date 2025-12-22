import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ProgressAreaChart = ({ data }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Progression dans le temps</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
          <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e5e7eb', 
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#1e3a8a" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorProgress)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressAreaChart;
