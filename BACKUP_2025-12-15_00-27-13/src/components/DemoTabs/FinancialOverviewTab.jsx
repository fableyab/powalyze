import React from 'react';
import PremiumKPICard from '@/components/PremiumVisuals/PremiumKPICard';
import PremiumChart from '@/components/PremiumVisuals/PremiumChart';
import { DollarSign, TrendingUp, PieChart as PieIcon, Wallet } from 'lucide-react';

const FinancialOverviewTab = ({ data }) => {
  const { trendData, costDistribution } = data;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <PremiumKPICard title="Total Budget" value="€2.4M" trend="up" trendValue="+12%" icon={Wallet} color="blue" />
        <PremiumKPICard title="Actual Cost" value="€1.1M" trend="down" trendValue="-5%" icon={DollarSign} color="green" />
        <PremiumKPICard title="Variance" value="-8.4%" subValue="Under Budget" trend="up" trendValue="+2%" icon={TrendingUp} color="gold" />
        <PremiumKPICard title="Forecast" value="€2.3M" trend="neutral" trendValue="Stable" icon={PieIcon} color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h3 className="text-white font-bold mb-4">Budget vs Actual vs Forecast</h3>
          <PremiumChart 
            type="line"
            data={trendData}
            xKey="month"
            series={[
              { key: 'planned', name: 'Budget', color: '#666' },
              { key: 'actual', name: 'Actual', color: '#BFA76A' },
              { key: 'forecast', name: 'Forecast', color: '#3A7BFF' }
            ]}
          />
        </div>
        <div className="lg:col-span-1">
          <h3 className="text-white font-bold mb-4">Cost Distribution</h3>
          <PremiumChart 
            type="pie"
            data={costDistribution}
          />
        </div>
      </div>
    </div>
  );
};

export default FinancialOverviewTab;