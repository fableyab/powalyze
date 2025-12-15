import React from 'react';
import { useLiveData } from '@/hooks/useLiveData';
import PremiumChart from '@/components/PremiumVisuals/PremiumChart';
import { Loader2 } from 'lucide-react';

const LiveSalesPerformance = () => {
  const { data, loading } = useLiveData('sales');

  if (loading || !data) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-[#BFA76A] w-10 h-10" /></div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
       <h3 className="text-xl font-bold text-white mb-4">Global Sales Stream</h3>
       <div className="bg-[#1A1A1A] p-6 rounded-xl border border-white/5">
          <PremiumChart 
             type="bar"
             data={data}
             xKey="region"
             series={[
                { key: 'sales', name: 'Current Sales', color: '#10B981' },
                { key: 'target', name: 'Target', color: '#333' }
             ]}
             height={400}
          />
       </div>
    </div>
  );
};

export default LiveSalesPerformance;