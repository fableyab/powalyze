import React from 'react';
import PremiumLineChart from '@/components/Charts/PremiumLineChart';
import PremiumBarChart from '@/components/Charts/PremiumBarChart';
import PremiumKPICard from '@/components/Cards/PremiumKPICard';
import { DollarSign, TrendingUp, Wallet, PieChart } from 'lucide-react';

const FinancialOverviewVisuals = ({ data }) => {
  const { kpis, costs } = data;

  const costVsBudget = [
     { name: 'Planned', value: kpis.totalBudget, color: '#333' },
     { name: 'Actual', value: kpis.totalSpent, color: '#BFA76A' },
  ];

  const varianceData = costs.map(c => ({
      name: c.month,
      variance: c.actual - c.planned,
      color: c.actual > c.planned ? '#EF4444' : '#10B981'
  }));

  return (
    <div className="space-y-6">
       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <PremiumKPICard title="Total Budget" value={`€${(kpis.totalBudget/1000000).toFixed(1)}M`} trend={0} icon={Wallet} color="blue" />
          <PremiumKPICard title="Spent YTD" value={`€${(kpis.totalSpent/1000000).toFixed(1)}M`} trend={12} icon={DollarSign} color="gold" />
          <PremiumKPICard title="Cost Variance" value={`${(kpis.budgetConsumedPct - 100).toFixed(1)}%`} trend={-2} trendLabel="over budget" icon={TrendingUp} color="red" />
          <PremiumKPICard title="Forecast" value={`€${(kpis.totalBudget * 1.1 / 1000000).toFixed(1)}M`} trend={10} icon={PieChart} color="purple" />
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[#111] p-6 rounded-xl border border-white/10">
             <h3 className="text-white font-bold mb-4">Budget vs Actual Trends</h3>
             <PremiumLineChart 
                data={costs} 
                xKey="month" 
                series={[
                   { key: 'planned', name: 'Planned', color: '#666' },
                   { key: 'actual', name: 'Actual', color: '#BFA76A' }
                ]} 
             />
          </div>
          <div className="bg-[#111] p-6 rounded-xl border border-white/10">
             <h3 className="text-white font-bold mb-4">Variance by Month</h3>
             <PremiumBarChart data={varianceData} xKey="name" yKey="variance" color="#EF4444" />
          </div>
       </div>
    </div>
  );
};

export default FinancialOverviewVisuals;