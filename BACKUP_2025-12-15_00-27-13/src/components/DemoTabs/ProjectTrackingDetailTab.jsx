import React from 'react';
import PremiumKPICard from '@/components/PremiumVisuals/PremiumKPICard';
import PremiumTable from '@/components/PremiumVisuals/PremiumTable';
import PremiumGanttChart from '@/components/PremiumVisuals/PremiumGanttChart';
import { Briefcase, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

const ProjectTrackingDetailTab = ({ data }) => {
  const { projects, timelineData, kpis } = data;

  const columns = [
    { header: "Project Name", accessorKey: "name" },
    { header: "Manager", accessorKey: "manager" },
    { 
      header: "Status", 
      accessorKey: "status",
      render: (row) => (
        <span className={`px-2 py-1 rounded text-xs font-bold ${
          row.status === 'Critical' ? 'bg-red-500/20 text-red-500' :
          row.status === 'At Risk' ? 'bg-yellow-500/20 text-yellow-500' :
          row.status === 'Completed' ? 'bg-blue-500/20 text-blue-500' :
          'bg-green-500/20 text-green-500'
        }`}>{row.status}</span>
      )
    },
    { 
      header: "Budget", 
      accessorKey: "budget", 
      render: (row) => `€${row.budget.toLocaleString()}` 
    },
    { 
      header: "Progress", 
      accessorKey: "progress",
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-16 h-1.5 bg-[#333] rounded-full overflow-hidden">
            <div className="h-full bg-[#BFA76A]" style={{ width: `${row.progress}%` }} />
          </div>
          <span className="text-xs">{row.progress}%</span>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <PremiumKPICard title="Total Projects" value={kpis?.projectCount || projects.length} trend="up" trendValue="+3" icon={Briefcase} color="blue" />
        <PremiumKPICard title="On Track" value={`${kpis?.onTrackPct?.toFixed(0) || 0}%`} trend="up" trendValue="+5%" icon={CheckCircle} color="green" />
        <PremiumKPICard title="At Risk" value={`${kpis?.atRiskPct?.toFixed(0) || 0}%`} trend="down" trendValue="-2%" icon={AlertTriangle} color="gold" />
        <PremiumKPICard title="Avg Delay" value="1.5 wks" trend="neutral" trendValue="0" icon={Clock} color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PremiumTable columns={columns} data={projects} className="h-full" />
        </div>
        <div className="lg:col-span-1">
          <PremiumGanttChart tasks={timelineData} />
        </div>
      </div>
    </div>
  );
};

export default ProjectTrackingDetailTab;