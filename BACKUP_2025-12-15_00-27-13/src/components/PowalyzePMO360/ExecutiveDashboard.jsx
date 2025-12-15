import React from 'react';
import { motion } from 'framer-motion';
import KPICard from './KPICard';
import { Briefcase, Activity, DollarSign, AlertTriangle, Clock } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

const ExecutiveDashboard = ({ data }) => {
  const { kpis, projects, costTrends } = data;

  const statusData = [
    { name: 'On Track', value: projects.filter(p => p.status === 'On Track').length, color: '#10B981' },
    { name: 'At Risk', value: projects.filter(p => p.status === 'At Risk').length, color: '#F59E0B' },
    { name: 'Critical', value: projects.filter(p => p.status === 'Critical').length, color: '#EF4444' },
  ];

  return (
    <div className="space-y-6">
      {/* 1. KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard title="Total Projects" value={kpis.projectCount} trend="up" trendValue="+3" icon={Briefcase} color="blue" delay={0.1} />
        <KPICard title="Portfolio Health" value={`${kpis.portfolioHealth.toFixed(0)}%`} target="85%" status={kpis.portfolioHealth > 80 ? 'On Track' : 'At Risk'} icon={Activity} color="gold" delay={0.2} />
        <KPICard title="Budget Consumed" value={`${kpis.budgetConsumedPct.toFixed(1)}%`} trend="up" trendValue="+12%" icon={DollarSign} color="green" delay={0.3} />
        <KPICard title="Critical Projects" value={statusData[2].value} status="Critical" icon={AlertTriangle} color="red" delay={0.4} />
        <KPICard title="Schedule Var." value={`${kpis.scheduleVariance} wks`} trend="down" trendValue="-0.5" icon={Clock} color="blue" delay={0.5} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 2. STATUS DISTRIBUTION */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-[#111] border border-white/10 rounded-xl p-6"
        >
          <h3 className="text-lg font-bold text-white mb-4">Project Status Distribution</h3>
          <div className="h-64 relative">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                   <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                   >
                      {statusData.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                   </Pie>
                   <Tooltip 
                      contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #333', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff' }}
                   />
                </PieChart>
             </ResponsiveContainer>
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                   <div className="text-3xl font-bold text-white">{kpis.projectCount}</div>
                   <div className="text-xs text-gray-500 uppercase">Total</div>
                </div>
             </div>
          </div>
          <div className="flex justify-center gap-4 mt-4">
             {statusData.map((s, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
                   <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                   {s.name}: <span className="text-white font-bold">{s.value}</span>
                </div>
             ))}
          </div>
        </motion.div>

        {/* 3. BUDGET TRENDS */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-[#111] border border-white/10 rounded-xl p-6"
        >
           <h3 className="text-lg font-bold text-white mb-4">Budget vs Realized (YTD)</h3>
           <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={costTrends} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <XAxis dataKey="month" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `€${val/1000}k`} />
                    <Tooltip 
                       cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                       contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
                    />
                    <Bar dataKey="planned" fill="#333" radius={[4, 4, 0, 0]} name="Planned Budget" />
                    <Bar dataKey="actual" fill="#BFA76A" radius={[4, 4, 0, 0]} name="Actual Cost" />
                 </BarChart>
              </ResponsiveContainer>
           </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ExecutiveDashboard;