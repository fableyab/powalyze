import React from 'react';
import { DollarSign, Target, Trophy, Users, Globe } from 'lucide-react';
import PremiumLineChart from '@/components/Charts/PremiumLineChart';
import PremiumPieChart from '@/components/Charts/PremiumPieChart';
import PremiumKPICard from '@/components/Cards/PremiumKPICard';

const SalesPerformanceVisuals = () => {
  // Mock Sales Data
  const salesData = [
     { month: 'Jan', revenue: 45000, target: 40000 },
     { month: 'Feb', revenue: 52000, target: 42000 },
     { month: 'Mar', revenue: 49000, target: 45000 },
     { month: 'Apr', revenue: 61000, target: 48000 },
     { month: 'May', revenue: 58000, target: 50000 },
     { month: 'Jun', revenue: 72000, target: 55000 },
  ];

  const regionData = [
     { name: 'North America', value: 35000, color: '#3A7BFF' },
     { name: 'Europe', value: 45000, color: '#BFA76A' },
     { name: 'Asia Pacific', value: 25000, color: '#10B981' },
  ];

  return (
    <div className="space-y-6">
       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <PremiumKPICard title="Total Revenue" value="€337k" trend={18} icon={DollarSign} color="green" />
          <PremiumKPICard title="Conversion Rate" value="3.2%" trend={0.5} icon={Target} color="blue" />
          <PremiumKPICard title="New Customers" value="142" trend={12} icon={Users} color="purple" />
          <PremiumKPICard title="Avg Deal Size" value="€2.4k" trend={-3} icon={Trophy} color="gold" />
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#111] p-6 rounded-xl border border-white/10">
             <h3 className="text-white font-bold mb-4">Revenue vs Target</h3>
             <PremiumLineChart 
                data={salesData} 
                xKey="month" 
                series={[
                   { key: 'target', name: 'Target', color: '#666' },
                   { key: 'revenue', name: 'Revenue', color: '#10B981' }
                ]} 
             />
          </div>
          <div className="bg-[#111] p-6 rounded-xl border border-white/10">
             <h3 className="text-white font-bold mb-4">Sales by Region</h3>
             <PremiumPieChart data={regionData} />
          </div>
       </div>
    </div>
  );
};

export default SalesPerformanceVisuals;