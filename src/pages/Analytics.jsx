
import React from 'react';
import { BarChart3, TrendingUp, PieChart, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend } from 'recharts';

const Analytics = () => {
  const data = [
    { name: 'Jan', value: 4000, budget: 2400 },
    { name: 'Feb', value: 3000, budget: 1398 },
    { name: 'Mar', value: 2000, budget: 9800 },
    { name: 'Apr', value: 2780, budget: 3908 },
    { name: 'May', value: 1890, budget: 4800 },
    { name: 'Jun', value: 2390, budget: 3800 },
    { name: 'Jul', value: 3490, budget: 4300 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics & Reporting</h1>
          <p className="text-slate-500">Deep dive into your portfolio performance metrics.</p>
        </div>
        <div className="flex gap-2">
           <select className="bg-[#141414] border border-slate-800 text-white text-sm rounded-md px-3 py-2">
             <option>Last 30 Days</option>
             <option>Last Quarter</option>
             <option>Year to Date</option>
           </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Spend" value="CHF 1.2M" trend="+12%" trendUp={true} icon={TrendingUp} />
        <StatCard title="Project Velocity" value="84 pts" trend="-5%" trendUp={false} icon={Activity} />
        <StatCard title="Resource Load" value="92%" trend="+2%" trendUp={true} icon={PieChart} />
        <StatCard title="ROI" value="145%" trend="+15%" trendUp={true} icon={BarChart3} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#141414] p-6 rounded-xl border border-slate-800">
          <h3 className="text-lg font-bold text-white mb-6">Budget vs Actuals</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4A574" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#D4A574" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="value" stroke="#D4A574" fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#141414] p-6 rounded-xl border border-slate-800">
          <h3 className="text-lg font-bold text-white mb-6">Resource Allocation</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                />
                <Legend />
                <Bar dataKey="value" name="Development" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="budget" name="Management" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, trend, trendUp, icon: Icon }) => (
  <div className="bg-[#141414] p-6 rounded-xl border border-slate-800">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
        <Icon size={20} />
      </div>
      <div className={`flex items-center gap-1 text-xs font-bold ${trendUp ? 'text-green-500' : 'text-red-500'}`}>
        {trend}
        {trendUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
      </div>
    </div>
    <div className="text-2xl font-bold text-white mb-1">{value}</div>
    <div className="text-slate-500 text-xs uppercase">{title}</div>
  </div>
);

export default Analytics;
