import React from 'react';
import PremiumKPICard from '@/components/PremiumVisuals/PremiumKPICard';
import PremiumChart from '@/components/PremiumVisuals/PremiumChart';
import { Target, Trophy, Globe, Users } from 'lucide-react';

const SalesPerformanceTab = ({ data }) => {
  const { salesTrend, byRegion } = data;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <PremiumKPICard title="Revenue YTD" value="€450k" trend="up" trendValue="+18%" icon={Trophy} color="gold" />
        <PremiumKPICard title="Conversion" value="3.2%" trend="up" trendValue="+0.4%" icon={Target} color="green" />
        <PremiumKPICard title="New Clients" value="124" trend="down" trendValue="-2%" icon={Users} color="blue" />
        <PremiumKPICard title="Global Reach" value="14" subValue="Countries" trend="neutral" trendValue="=" icon={Globe} color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-white font-bold mb-4">Sales Trend vs Target</h3>
          <PremiumChart 
            type="area"
            data={salesTrend}
            xKey="month"
            series={[
              { key: 'target', name: 'Target', color: '#333' },
              { key: 'revenue', name: 'Revenue', color: '#10B981' }
            ]}
          />
        </div>
        <div>
          <h3 className="text-white font-bold mb-4">Revenue by Region</h3>
          <PremiumChart 
            type="bar"
            data={byRegion}
            xKey="name"
            series={[
              { key: 'value', name: 'Revenue', color: '#3A7BFF' }
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default SalesPerformanceTab;