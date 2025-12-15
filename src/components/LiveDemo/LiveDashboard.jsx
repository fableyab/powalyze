import React from 'react';
import { useLiveData } from '@/hooks/useLiveData';
import PremiumKPICard from '@/components/PremiumVisuals/PremiumKPICard';
import { Activity, DollarSign, Users, Briefcase, Clock, AlertTriangle } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const LiveDashboard = () => {
  const { data, loading } = useLiveData('kpi');

  if (loading || !data) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-[#BFA76A] w-10 h-10" /></div>;

  const donutData = [
    { name: 'On Track', value: 65, color: '#10B981' },
    { name: 'At Risk', value: 25, color: '#F59E0B' },
    { name: 'Critical', value: 10, color: '#EF4444' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <PremiumKPICard 
             title="Active Projects" 
             value={data.activeProjects} 
             trend="up" 
             trendValue="+2" 
             icon={Briefcase} 
             color="blue" 
          />
          <PremiumKPICard 
             title="Budget Spent" 
             value={`${data.budgetConsumed}%`} 
             trend={data.budgetConsumed > 75 ? "down" : "up"} 
             trendValue="+0.5%" 
             icon={DollarSign} 
             color={data.budgetConsumed > 80 ? "red" : "gold"} 
          />
          <PremiumKPICard 
             title="Active Risks" 
             value={data.risks} 
             trend="up" 
             trendValue="+1" 
             icon={AlertTriangle} 
             color="red" 
          />
          <PremiumKPICard 
             title="Efficiency" 
             value={`${data.efficiency}%`} 
             trend="up" 
             trendValue="+1.2%" 
             icon={Users} 
             color="green" 
          />
          <PremiumKPICard 
             title="Schedule Var" 
             value={`${data.scheduleVariance}w`} 
             trend="neutral" 
             trendValue="0.1" 
             icon={Clock} 
             color="purple" 
          />
          <PremiumKPICard 
             title="Revenue" 
             value={`$${(data.revenue/1000).toFixed(0)}k`} 
             trend="up" 
             trendValue="+5%" 
             icon={Activity} 
             color="gold" 
          />
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[#1A1A1A] p-6 rounded-xl border border-white/5">
             <h3 className="text-white font-bold mb-4">System Status</h3>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-black/40 rounded-lg">
                   <div className="text-green-500 font-mono text-xl">24ms</div>
                   <div className="text-xs text-gray-500 uppercase">Latency</div>
                </div>
                <div className="p-4 bg-black/40 rounded-lg">
                   <div className="text-blue-500 font-mono text-xl">Active</div>
                   <div className="text-xs text-gray-500 uppercase">WebSocket</div>
                </div>
                <div className="p-4 bg-black/40 rounded-lg">
                   <div className="text-white font-mono text-xl">{new Date(data.timestamp).toLocaleTimeString()}</div>
                   <div className="text-xs text-gray-500 uppercase">Last Sync</div>
                </div>
                <div className="p-4 bg-black/40 rounded-lg">
                   <div className="text-[#BFA76A] font-mono text-xl">AES-256</div>
                   <div className="text-xs text-gray-500 uppercase">Encryption</div>
                </div>
             </div>
          </div>
          <div className="bg-[#1A1A1A] p-6 rounded-xl border border-white/5 flex flex-col justify-center items-center">
             <h3 className="text-white font-bold mb-2">Project Health</h3>
             <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                   <PieChart>
                      <Pie
                         data={donutData}
                         innerRadius={40}
                         outerRadius={60}
                         paddingAngle={5}
                         dataKey="value"
                      >
                         {donutData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                         ))}
                      </Pie>
                      <Tooltip contentStyle={{backgroundColor: '#111', borderColor: '#333'}} />
                   </PieChart>
                </ResponsiveContainer>
             </div>
          </div>
       </div>
    </div>
  );
};

export default LiveDashboard;