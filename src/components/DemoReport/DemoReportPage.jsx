import React, { useState } from 'react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { useDemoMode } from '@/context/DemoModeContext';
import { Card, KPICard, StatusBadge } from '@/components/ui/DashboardComponents';
import { GanttChart, RiskHeatmap } from '@/components/ui/AdvancedCharts';
import { AlertTriangle, Download, Briefcase, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DemoReportPage = () => {
  const { isDemoMode, demoData, toggleDemoMode } = useDemoMode();
  const [filter, setFilter] = useState('All');

  if (!isDemoMode || !demoData) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
         <Navbar />
         <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
            <h1 className="text-3xl font-bold mb-4">PMO Executive Report</h1>
            <p className="text-gray-400 mb-8">Enable demo mode to view the sample Executive PMO Report.</p>
            <Button onClick={toggleDemoMode} className="bg-[#BFA76A] text-black font-bold">
               Enable Demo Mode
            </Button>
         </div>
         <FooterSection />
      </div>
    );
  }

  const { projects, kpis, risks } = demoData;
  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.status === filter);

  // Transform projects for Gantt
  const ganttTasks = projects.map(p => ({
     name: p.name,
     start: new Date(p.startDate).getMonth() * 10, // Mock positioning
     duration: 30, // Mock duration
     status: p.status
  }));

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
       <Navbar />
       
       <main className="flex-grow pt-32 pb-20 container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
             <div>
                <h1 className="text-3xl font-display font-bold text-white mb-2">Executive Project Portfolio</h1>
                <p className="text-gray-400">Quarterly Performance Review - Q4 2024</p>
             </div>
             <div className="flex gap-2">
                <Button variant="outline" className="border-white/10" onClick={() => window.print()}>
                   <Download size={16} className="mr-2"/> Export PDF
                </Button>
             </div>
          </div>

          {/* KPI Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
             {kpis.map(kpi => (
                <KPICard 
                   key={kpi.id} 
                   title={kpi.label} 
                   value={kpi.value} 
                   change={kpi.change} 
                   trend={kpi.trend} 
                   icon={kpi.icon} 
                   color={kpi.color === 'text-blue-500' ? 'blue' : 'gold'}
                />
             ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
             {/* Project Table */}
             <div className="lg:col-span-2 space-y-6">
                <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
                   <div className="p-4 border-b border-white/10 flex justify-between items-center">
                      <h3 className="font-bold text-white flex items-center gap-2">
                         <Briefcase size={18} className="text-[#BFA76A]" /> Active Projects
                      </h3>
                      <div className="flex gap-2">
                         {['All', 'In Progress', 'Completed'].map(f => (
                            <button 
                              key={f}
                              onClick={() => setFilter(f)}
                              className={`text-xs px-2 py-1 rounded ${filter === f ? 'bg-[#333] text-white' : 'text-gray-500 hover:text-white'}`}
                            >
                               {f}
                            </button>
                         ))}
                      </div>
                   </div>
                   <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                         <thead className="bg-[#1C1C1C] text-gray-400 font-bold">
                            <tr>
                               <th className="p-4">Project Name</th>
                               <th className="p-4">Manager</th>
                               <th className="p-4">Budget</th>
                               <th className="p-4">Progress</th>
                               <th className="p-4">Status</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-white/5">
                            {filteredProjects.map(p => (
                               <tr key={p.id} className="hover:bg-white/5">
                                  <td className="p-4 font-medium text-white">{p.name}</td>
                                  <td className="p-4 text-gray-400">{p.manager}</td>
                                  <td className="p-4 text-gray-300">
                                     {p.budget.toLocaleString()} {p.currency}
                                  </td>
                                  <td className="p-4">
                                     <div className="flex items-center gap-2">
                                        <div className="w-20 h-1.5 bg-[#333] rounded-full">
                                           <div className="h-full bg-[#BFA76A]" style={{ width: `${p.progress}%` }}></div>
                                        </div>
                                        <span className="text-xs">{p.progress}%</span>
                                     </div>
                                  </td>
                                  <td className="p-4">
                                     <StatusBadge status={p.status} />
                                  </td>
                               </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                </div>

                {/* Gantt Chart */}
                <div className="bg-[#111] border border-white/10 rounded-xl p-6">
                   <h3 className="font-bold text-white mb-6">Strategic Timeline</h3>
                   <GanttChart tasks={ganttTasks} />
                </div>
             </div>

             {/* Sidebar Risks */}
             <div className="space-y-6">
                <Card>
                   <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                      <AlertTriangle size={18} className="text-red-500" /> Critical Risks
                   </h3>
                   <div className="space-y-3">
                      {risks.slice(0, 4).map(r => (
                         <div key={r.id} className="p-3 bg-red-900/10 border-l-2 border-red-500 rounded-sm">
                            <div className="font-bold text-white text-sm mb-1">{r.name}</div>
                            <div className="text-xs text-gray-400">Impact: {r.impact} • {r.project}</div>
                         </div>
                      ))}
                   </div>
                </Card>

                <Card>
                   <h3 className="font-bold text-white mb-4">Risk Heatmap</h3>
                   <div className="h-64">
                      <RiskHeatmap data={risks} />
                   </div>
                </Card>
             </div>
          </div>
       </main>
       
       <FooterSection />
    </div>
  );
};

export default DemoReportPage;