import React from 'react';
import { Card } from '@/shared/components/ui/Card';
import { FiTrendingUp, FiDollarSign, FiClock, FiTarget } from 'react-icons/fi';

const AnalyticsPage = () => {
  const kpis = [
    { label: 'Budget Total', value: '€5.49M', icon: FiDollarSign, color: 'green' },
    { label: 'Dépenses', value: '€2.27M', icon: FiTrendingUp, color: 'blue' },
    { label: 'Temps Cumulé', value: '12,456h', icon: FiClock, color: 'yellow' },
    { label: 'Objectifs Atteints', value: '78%', icon: FiTarget, color: 'purple' },
  ];

  return (
    <div className="p-8 bg-neutral-975 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Analytics & KPIs</h1>
        <p className="text-gray-400">Indicateurs clés de performance</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map(kpi => (
          <Card key={kpi.label} className="bg-neutral-950 border-white/10 p-6">
            <kpi.icon className="text-brand-gold-500 mb-4" size={32} />
            <p className="text-gray-400 text-sm mb-1">{kpi.label}</p>
            <p className="text-3xl font-bold text-white">{kpi.value}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsPage;
