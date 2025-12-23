import React from 'react';
import { FiFolder, FiUsers, FiAlertTriangle, FiTrendingUp } from 'react-icons/fi';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const AdminDashboardPage = () => {
  const stats = [
    { label: 'Projets Actifs', value: '12', trend: '+8%', icon: FiFolder, color: 'text-[#BFA76A]', bg: 'bg-[#BFA76A]/20' },
    { label: 'Utilisateurs', value: '87', trend: '+12', icon: FiUsers, color: 'text-blue-400', bg: 'bg-blue-500/20' },
    { label: 'Tâches en Retard', value: '5', trend: '-2', icon: FiAlertTriangle, color: 'text-red-400', bg: 'bg-red-500/20' },
    { label: 'ROI Global', value: '€2.3M', trend: '+15%', icon: FiTrendingUp, color: 'text-green-400', bg: 'bg-green-500/20' },
  ];

  const recentActivity = [
    { id: 1, user: 'Marie Dubois', action: 'a créé le projet', target: 'Migration Cloud AWS', time: 'Il y a 2h' },
    { id: 2, user: 'Thomas Martin', action: 'a modifié', target: 'Budget Q1 2025', time: 'Il y a 4h' },
    { id: 3, user: 'Sophie Laurent', action: 'a terminé', target: 'Sprint 12 - Dev Mobile', time: 'Il y a 6h' },
    { id: 4, user: 'Lucas Bernard', action: 'a ajouté', target: '3 nouveaux membres', time: 'Il y a 8h' },
  ];

  const systemAlerts = [
    { id: 1, type: 'warning', message: 'Licence Power BI expire dans 15 jours', severity: 'Moyenne' },
    { id: 2, type: 'info', message: 'Mise à jour système disponible v2.1.0', severity: 'Faible' },
    { id: 3, type: 'warning', message: '3 projets dépassent leur budget alloué', severity: 'Haute' },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Dashboard Admin</h1>
        <p className="text-gray-400">Vue d'ensemble de la plateforme et supervision globale</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} className="bg-[#111] border-white/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${stat.bg} flex items-center justify-center`}>
                  <Icon className={stat.color} size={24} />
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/50 text-xs">{stat.trend}</Badge>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Activité Récente */}
        <Card className="bg-[#111] border-white/10 p-6">
          <h2 className="text-xl font-bold text-white mb-6">Activité Récente</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-white/10 last:border-0">
                <div className="w-10 h-10 rounded-full bg-[#BFA76A]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#BFA76A] font-bold text-sm">{activity.user.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white">
                    <span className="font-medium">{activity.user}</span>
                    <span className="text-gray-400"> {activity.action} </span>
                    <span className="text-[#BFA76A]">{activity.target}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Alertes Système */}
        <Card className="bg-[#111] border-white/10 p-6">
          <h2 className="text-xl font-bold text-white mb-6">Alertes Système</h2>
          <div className="space-y-4">
            {systemAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
                <FiAlertTriangle className="text-yellow-400 flex-shrink-0 mt-1" size={20} />
                <div className="flex-1">
                  <p className="text-sm text-white mb-2">{alert.message}</p>
                  <Badge className={alert.severity === 'Haute' ? 'bg-red-500/20 text-red-400 border-red-500/50' : alert.severity === 'Moyenne' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50' : 'bg-blue-500/20 text-blue-400 border-blue-500/50'}>
                    {alert.severity}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardPage;