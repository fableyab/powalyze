import React from 'react';
import { useLiveData } from '@/hooks/useLiveData';
import PremiumTable from '@/components/PremiumVisuals/PremiumTable';
import { Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const LiveProjectTracking = () => {
  const { data, loading } = useLiveData('project');

  if (loading || !data) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-[#BFA76A] w-10 h-10" /></div>;

  const columns = [
    { header: "Project Name", accessorKey: "name" },
    { 
       header: "Status", 
       accessorKey: "status",
       render: (row) => (
          <span className={`px-2 py-1 rounded text-xs font-bold ${
             row.status === 'Critical' ? 'bg-red-500/20 text-red-500' :
             row.status === 'At Risk' ? 'bg-yellow-500/20 text-yellow-500' :
             row.status === 'Completed' ? 'bg-blue-500/20 text-blue-500' :
             'bg-green-500/20 text-green-500'
          }`}>
             {row.status}
          </span>
       )
    },
    {
       header: "Progress",
       accessorKey: "progress",
       render: (row) => (
          <div className="w-full flex items-center gap-2">
             <Progress value={row.progress} className="h-2 bg-[#333] w-24" />
             <span className="text-xs w-8 text-right font-mono">{row.progress}%</span>
          </div>
       )
    },
    {
       header: "Budget Util.",
       accessorKey: "spent",
       render: (row) => {
          const pct = (row.spent / row.budget) * 100;
          return (
             <div className="flex flex-col text-xs">
                <span className="text-white">€{row.spent.toLocaleString()}</span>
                <span className="text-gray-500 text-[10px]">of €{row.budget.toLocaleString()} ({pct.toFixed(0)}%)</span>
             </div>
          );
       }
    },
    {
       header: "Health Score",
       accessorKey: "health",
       render: (row) => (
          <span className={`font-mono font-bold ${
             row.health > 90 ? 'text-green-500' : 
             row.health > 70 ? 'text-yellow-500' : 'text-red-500'
          }`}>
             {row.health}/100
          </span>
       )
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
       <div className="flex justify-between items-end">
         <h3 className="text-xl font-bold text-white">Real-Time Project Portfolio</h3>
         <div className="text-xs text-green-500 font-mono animate-pulse">● Live Updating</div>
       </div>
       <PremiumTable columns={columns} data={data} />
    </div>
  );
};

export default LiveProjectTracking;