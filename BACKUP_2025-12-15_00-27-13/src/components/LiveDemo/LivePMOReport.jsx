import React from 'react';
import { useLiveData } from '@/hooks/useLiveData';
import PremiumKPICard from '@/components/PremiumVisuals/PremiumKPICard';
import { Shield, AlertTriangle, Activity, Loader2, List } from 'lucide-react';

const LivePMOReport = () => {
  const { data, loading } = useLiveData('pmo');

  if (loading || !data) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-[#BFA76A] w-10 h-10" /></div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <PremiumKPICard 
             title="Portfolio Health" 
             value={`${data.portfolioHealth.toFixed(0)}%`} 
             trend="neutral" 
             trendValue="Stable" 
             icon={Activity} 
             color="green" 
          />
          <PremiumKPICard 
             title="Compliance Rate" 
             value={`${data.complianceRate.toFixed(1)}%`} 
             trend="up" 
             trendValue="+0.2%" 
             icon={Shield} 
             color="blue" 
          />
          <PremiumKPICard 
             title="Active Risks" 
             value={data.activeRisks} 
             trend="down" 
             trendValue="-1" 
             icon={AlertTriangle} 
             color="red" 
          />
          <PremiumKPICard 
             title="Open Issues" 
             value={data.openIssues} 
             trend="up" 
             trendValue="+2" 
             icon={List} 
             color="gold" 
          />
       </div>
    </div>
  );
};

export default LivePMOReport;