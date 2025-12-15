import React from 'react';
import PremiumKPICard from '@/components/PremiumVisuals/PremiumKPICard';
import PremiumRiskMatrix from '@/components/PremiumVisuals/PremiumRiskMatrix';
import PremiumChart from '@/components/PremiumVisuals/PremiumChart';
import { Shield, AlertCircle, CheckSquare, Activity } from 'lucide-react';

const DemoPMOReportTab = ({ data }) => {
  const { risks, statusCounts } = data;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <PremiumKPICard title="Portfolio Health" value="88%" trend="up" trendValue="+2%" icon={Activity} color="green" />
        <PremiumKPICard title="Active Risks" value={risks.length} trend="down" trendValue="-1" icon={AlertCircle} color="red" />
        <PremiumKPICard title="Compliance" value="95%" trend="neutral" trendValue="=" icon={Shield} color="blue" />
        <PremiumKPICard title="Mitigated" value="12" subValue="Risks Closed" trend="up" trendValue="+4" icon={CheckSquare} color="gold" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-white font-bold mb-4">Portfolio Risk Profile</h3>
          <PremiumRiskMatrix risks={risks} />
        </div>
        <div>
          <h3 className="text-white font-bold mb-4">Project Status Breakdown</h3>
          <PremiumChart 
            type="pie"
            data={statusCounts}
          />
        </div>
      </div>
    </div>
  );
};

export default DemoPMOReportTab;