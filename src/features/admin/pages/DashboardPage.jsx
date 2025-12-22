import React from 'react';
import { Card } from '@/shared/components/ui/Card';
import { Badge } from '@/shared/components/ui/Badge';
import { FiTrendingUp, FiUsers, FiAlertTriangle, FiActivity } from 'react-icons/fi';

const DashboardPage = () => {
  const stats = [
    { label: 'Projets Actifs', value: '12', change: '+8%', icon: FiActivity, color: 'green' },
    { label: 'Utilisateurs', value: '87', change: '+12', icon: FiUsers, color: 'blue' },
    { label: 'Tâches en Retard', value: '5', change: '-2', icon: FiAlertTriangle, color: 'red' },
    { label: 'ROI Global', value: '€2.3M', change: '+15%', icon: FiTrendingUp, color: 'gold' },
  ];

  return (
    <div className="p-8 bg-neutral-975 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Admin</h1>
        <p className="text-gray-400">Vue d'ensemble complète de la plateforme</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map(stat => (
          <Card key={stat.label} className="bg-neutral-950 border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <stat.icon className="text-brand-gold-500" size={24} />
              <Badge variant={stat.change.startsWith('+') ? 'success' : 'error'}>{stat.change}</Badge>
            </div>
            <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-neutral-950 border-white/10 p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Activité Récente</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-brand-gold-500 mt-2" />
                <div className="flex-1">
                  <p className="text-white text-sm">Nouveau projet créé par Jean Dupont</p>
                  <p className="text-gray-400 text-xs mt-1">Il y a {i * 2} heures</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="bg-neutral-950 border-white/10 p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Alertes Système</h3>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <FiAlertTriangle className="text-red-500 mt-1" />
                <div className="flex-1">
                  <p className="text-white text-sm">Tâche en retard - Migration Azure</p>
                  <p className="text-gray-400 text-xs mt-1">Échéance dépassée de {i} jours</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
