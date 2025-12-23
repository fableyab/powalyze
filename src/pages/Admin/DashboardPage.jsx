import React from 'react';
import { FiUsers, FiGrid, FiBriefcase, FiActivity, FiTrendingUp, FiAlertCircle } from 'react-icons/fi';

function DashboardPage() {
  const stats = [
    {
      label: 'Utilisateurs Actifs',
      value: '1,247',
      change: '+12%',
      trend: 'up',
      icon: FiUsers,
      color: 'from-blue-500 to-blue-600',
    },
    {
      label: 'Organisations',
      value: '87',
      change: '+5',
      trend: 'up',
      icon: FiGrid,
      color: 'from-purple-500 to-purple-600',
    },
    {
      label: 'Projets Actifs',
      value: '342',
      change: '+23',
      trend: 'up',
      icon: FiBriefcase,
      color: 'from-green-500 to-green-600',
    },
    {
      label: 'Taux d\'Activité',
      value: '94.2%',
      change: '+2.1%',
      trend: 'up',
      icon: FiActivity,
      color: 'from-orange-500 to-orange-600',
    },
  ];

  const recentActivities = [
    { user: 'Marie Dubois', action: 'Nouvelle organisation créée', org: 'TechCorp SA', time: 'Il y a 5 min' },
    { user: 'Jean Martin', action: 'Projet approuvé', org: 'Innovation Labs', time: 'Il y a 12 min' },
    { user: 'Sophie Laurent', action: '25 utilisateurs ajoutés', org: 'Global Ventures', time: 'Il y a 1 h' },
    { user: 'Pierre Durand', action: 'Paramètres mis à jour', org: 'System Config', time: 'Il y a 2 h' },
  ];

  const alerts = [
    { type: 'warning', message: '3 organisations en attente de validation', count: 3 },
    { type: 'info', message: '12 nouveaux utilisateurs cette semaine', count: 12 },
    { type: 'success', message: '98% de disponibilité système', count: 98 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] bg-clip-text text-transparent">
          Dashboard Administration
        </h1>
        <p className="text-gray-400 mt-2">Vue d'ensemble de la plateforme Powalyze</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#BFA76A]/20 rounded-xl p-6 hover:border-[#BFA76A]/40 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
                <div className="flex items-center gap-2">
                  <FiTrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-green-500 text-sm font-medium">{stat.change}</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {alerts.map((alert, index) => {
          const bgColors = {
            warning: 'from-orange-500/10 to-orange-600/5 border-orange-500/30',
            info: 'from-blue-500/10 to-blue-600/5 border-blue-500/30',
            success: 'from-green-500/10 to-green-600/5 border-green-500/30',
          };
          const textColors = {
            warning: 'text-orange-400',
            info: 'text-blue-400',
            success: 'text-green-400',
          };
          return (
            <div
              key={index}
              className={`bg-gradient-to-br ${bgColors[alert.type]} border rounded-xl p-4 flex items-center gap-4`}
            >
              <FiAlertCircle className={`w-8 h-8 ${textColors[alert.type]}`} />
              <div className="flex-1">
                <p className="text-white font-medium">{alert.message}</p>
              </div>
              <div className={`text-2xl font-bold ${textColors[alert.type]}`}>{alert.count}</div>
            </div>
          );
        })}
      </div>

      {/* Recent Activities */}
      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#BFA76A]/20 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Activités Récentes</h2>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-[#0A0A0A] rounded-lg border border-[#BFA76A]/10 hover:border-[#BFA76A]/30 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#BFA76A] to-[#D4AF37] flex items-center justify-center font-bold text-sm">
                  {activity.user.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-white font-medium">{activity.user}</p>
                  <p className="text-gray-400 text-sm">{activity.action} - {activity.org}</p>
                </div>
              </div>
              <p className="text-gray-500 text-sm">{activity.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;