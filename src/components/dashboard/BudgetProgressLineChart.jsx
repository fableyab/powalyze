import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BudgetProgressLineChart = ({ data }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Budget vs Consommé</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
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
            formatter={(value) => `CHF ${(value / 1000).toFixed(0)}K`}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="budget" 
            stroke="#d97706" 
            strokeWidth={3}
            name="Budget Total"
            dot={{ fill: '#d97706', r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="spent" 
            stroke="#1e3a8a" 
            strokeWidth={3}
            name="Consommé"
            dot={{ fill: '#1e3a8a', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BudgetProgressLineChart;
