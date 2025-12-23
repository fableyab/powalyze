import React from 'react';
import { FiDollarSign, FiTrendingUp, FiClock, FiTarget } from 'react-icons/fi';
import { Card } from '@/components/ui/card';

const AdminAnalyticsPage = () => {
  const kpis = [
    { label: 'Budget Total', value: '€5.49M', icon: FiDollarSign, color: 'text-green-400', bg: 'bg-green-500/20' },
    { label: 'Dépenses', value: '€2.27M', icon: FiTrendingUp, color: 'text-blue-400', bg: 'bg-blue-500/20' },
    { label: 'Temps Cumulé', value: '12,456h', icon: FiClock, color: 'text-purple-400', bg: 'bg-purple-500/20' },
    { label: 'Objectifs Atteints', value: '78%', icon: FiTarget, color: 'text-[#BFA76A]', bg: 'bg-[#BFA76A]/20' },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Analytics</h1>
        <p className="text-gray-400">Indicateurs de performance globaux</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <Card key={idx} className="bg-[#111] border-white/10 p-6">
              <div className={`w-12 h-12 rounded-lg ${kpi.bg} flex items-center justify-center mb-4`}>
                <Icon className={kpi.color} size={24} />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{kpi.value}</div>
              <div className="text-sm text-gray-400">{kpi.label}</div>
            </Card>
          );
        })}
      </div>

      <Card className="bg-[#111] border-white/10 p-12">
        <p className="text-gray-400 text-center">Graphiques analytiques en construction...</p>
      </Card>
    </div>
  );
};

export default AdminAnalyticsPage;