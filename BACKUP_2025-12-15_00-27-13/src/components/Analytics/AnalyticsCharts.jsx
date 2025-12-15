import React from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';

const COLORS = ['#BFA76A', '#3A7BFF', '#10B981', '#F59E0B', '#EF4444'];

export const TrendChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
      <XAxis dataKey="date" stroke="#666" fontSize={12} tickLine={false} />
      <YAxis stroke="#666" fontSize={12} tickLine={false} />
      <Tooltip 
        contentStyle={{ backgroundColor: '#111', borderColor: '#333', color: '#fff' }}
        itemStyle={{ color: '#fff' }}
      />
      <Legend />
      <Line type="monotone" dataKey="count" stroke="#BFA76A" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Total Events" />
      <Line type="monotone" dataKey="users" stroke="#3A7BFF" strokeWidth={2} dot={{ r: 4 }} name="Unique Users" />
    </LineChart>
  </ResponsiveContainer>
);

export const DistributionChart = ({ data, title }) => (
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={100}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333', color: '#fff' }} />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
);

export const BarMetricChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
      <XAxis dataKey="name" stroke="#666" fontSize={12} />
      <YAxis stroke="#666" fontSize={12} />
      <Tooltip cursor={{ fill: '#ffffff10' }} contentStyle={{ backgroundColor: '#111', borderColor: '#333', color: '#fff' }} />
      <Bar dataKey="value" fill="#BFA76A" radius={[4, 4, 0, 0]} name="Count" />
    </BarChart>
  </ResponsiveContainer>
);