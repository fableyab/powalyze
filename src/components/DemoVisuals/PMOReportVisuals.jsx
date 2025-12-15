import React from 'react';
import PremiumBarChart from '@/components/Charts/PremiumBarChart';
import PremiumPieChart from '@/components/Charts/PremiumPieChart';
import PremiumKPICard from '@/components/Cards/PremiumKPICard';
import { Shield, AlertTriangle, CheckCircle, Activity } from 'lucide-react';
import { RiskHeatmap } from '@/components/ui/AdvancedCharts'; // Reusing existing heatmap

const PMOReportVisuals = ({ data }) => {
  const { risks, kpis } = data;

  const riskDistribution = [
     { name: 'High', value: risks.filter(r => r.impact === 'High' || r.impact === 'Critical').length, color: '#EF4444' },
     { name: 'Medium', value: risks.filter(r => r.impact === 'Medium').length, color: '#F59E0B' },
     { name: 'Low', value: risks.filter(r => r.impact === 'Low').length, color: '#10B981' },
  ];

  return (
    <div className="space-y-6">
       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <PremiumKPICard title="Portfolio Health" value={`${kpis.portfolioHealth.toFixed(1)}%`} trend={-2} icon={Activity} color="blue" />
          <PremiumKPICard title="Active Risks" value={risks.length} trend={4} icon={AlertTriangle} color="red" />
          <PremiumKPICard title="Compliance" value="98%" trend={0} icon={Shield} color="green" />
          <PremiumKPICard title="Mitigated" value="12" trend={3} icon={CheckCircle} color="gold" />
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#111] p-6 rounded-xl border border-white/10">
             <h3 className="text-white font-bold mb-4">Risk Severity Distribution</h3>
             <PremiumPieChart data={riskDistribution} />
          </div>
          <div className="bg-[#111] p-6 rounded-xl border border-white/10">
             <h3 className="text-white font-bold mb-4">Risk Heatmap</h3>
             <RiskHeatmap data={risks.slice(0, 10)} />
          </div>
       </div>
    </div>
  );
};

export default PMOReportVisuals;