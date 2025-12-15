import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1A1A1A] border border-white/10 p-3 rounded-lg shadow-xl">
        <p className="text-white font-bold mb-1">{payload[0].name}</p>
        <p className="text-[#BFA76A]">
          {payload[0].value.toLocaleString()} ({((payload[0].percent || 0) * 100).toFixed(1)}%)
        </p>
      </div>
    );
  }
  return null;
};

const PremiumPieChart = ({ data, dataKey = "value", nameKey = "name", colors = [], height = 300, innerRadius = 60 }) => {
  const defaultColors = ['#BFA76A', '#3A7BFF', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
  const chartColors = colors.length ? colors : defaultColors;

  return (
    <div style={{ width: '100%', height: height }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={innerRadius + 40}
            paddingAngle={5}
            dataKey={dataKey}
            nameKey={nameKey}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle"
            formatter={(value) => <span className="text-gray-400 text-xs ml-1">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PremiumPieChart;