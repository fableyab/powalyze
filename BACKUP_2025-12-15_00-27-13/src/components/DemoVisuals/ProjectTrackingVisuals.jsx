import React from 'react';
import PremiumBarChart from '@/components/Charts/PremiumBarChart';
import PremiumPieChart from '@/components/Charts/PremiumPieChart';
import PremiumGanttChart from '@/components/Charts/PremiumGanttChart';
import PremiumKPICard from '@/components/Cards/PremiumKPICard';
import { Briefcase, AlertTriangle, Clock, CheckCircle } from 'lucide-react';

const ProjectTrackingVisuals = ({ data }) => {
  const { kpis, projects } = data;
  
  const statusData = [
     { name: 'On Track', value: projects.filter(p => p.status === 'On Track').length, color: '#10B981' },
     { name: 'At Risk', value: projects.filter(p => p.status === 'At Risk').length, color: '#F59E0B' },
     { name: 'Critical', value: projects.filter(p => p.status === 'Critical').length, color: '#EF4444' },
     { name: 'Completed', value: projects.filter(p => p.status === 'Completed').length, color: '#3A7BFF' },
  ];

  // Top 5 Projects by Budget
  const budgetData = [...projects]
      .sort((a, b) => b.budget - a.budget)
      .slice(0, 5)
      .map(p => ({ name: p.id, value: p.budget, color: '#BFA76A' }));

  const ganttData = projects.slice(0, 5).map((p, i) => ({
      name: p.name,
      start: i * 10,
      duration: 30 + Math.random() * 40,
      status: p.status
  }));

  return (
    <div className="space-y-6">
       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <PremiumKPICard title="Total Projects" value={kpis.projectCount} trend={5} icon={Briefcase} color="blue" />
          <PremiumKPICard title="On Track" value={`${kpis.onTrackPct.toFixed(0)}%`} trend={2} icon={CheckCircle} color="green" />
          <PremiumKPICard title="At Risk" value={`${kpis.atRiskPct.toFixed(0)}%`} trend={-5} trendLabel="improved" icon={AlertTriangle} color="gold" />
          <PremiumKPICard title="Avg Delay" value="1.2 wks" trend={-0.5} icon={Clock} color="purple" />
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#111] p-6 rounded-xl border border-white/10">
             <h3 className="text-white font-bold mb-4">Project Status</h3>
             <PremiumPieChart data={statusData} />
          </div>
          <div className="bg-[#111] p-6 rounded-xl border border-white/10">
             <h3 className="text-white font-bold mb-4">Top Budget Projects</h3>
             <PremiumBarChart data={budgetData} xKey="name" yKey="value" />
          </div>
       </div>

       <div className="bg-[#111] p-6 rounded-xl border border-white/10">
          <h3 className="text-white font-bold mb-4">Timeline View</h3>
          <PremiumGanttChart tasks={ganttData} />
       </div>
    </div>
  );
};

export default ProjectTrackingVisuals;