import React from 'react';
import { useLiveData } from '@/hooks/useLiveData';
import PremiumChart from '@/components/PremiumVisuals/PremiumChart';
import { Loader2 } from 'lucide-react';

const LiveFinancialOverview = () => {
  const { data, loading } = useLiveData('financial');

  if (loading || !data) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-[#BFA76A] w-10 h-10" /></div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
       <h3 className="text-xl font-bold text-white mb-4">Real-Time Financial Forecasting</h3>
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[#1A1A1A] p-6 rounded-xl border border-white/5">
             <h4 className="text-sm text-gray-400 mb-4 uppercase tracking-wider">Budget vs Actual Stream</h4>
             <PremiumChart 
                type="area"
                data={data}
                xKey="name"
                series={[
                   { key: 'actual', name: 'Actual', color: '#BFA76A' },
                   { key: 'forecast', name: 'Forecast', color: '#3A7BFF' }
                ]}
                height={350}
             />
          </div>
          <div className="bg-[#1A1A1A] p-6 rounded-xl border border-white/5">
             <h4 className="text-sm text-gray-400 mb-4 uppercase tracking-wider">Variance Analysis</h4>
             <PremiumChart 
                type="bar"
                data={data}
                xKey="name"
                series={[
                   { key: 'variance', name: 'Variance', color: '#EF4444' }
                ]}
                height={350}
             />
          </div>
       </div>
    </div>
  );
};

export default LiveFinancialOverview;