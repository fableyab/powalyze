import React from 'react';
import { Link } from 'react-router-dom';
import { FiFolder, FiCheckSquare, FiDollarSign, FiUsers, FiArrowRight, FiCalendar } from 'react-icons/fi';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const DashboardPage = () => {
  const stats = [
    { label: 'Projets Actifs', value: '12', icon: FiFolder, color: 'text-[#BFA76A]', bg: 'bg-[#BFA76A]/20' },
    { label: 'Tâches en Cours', value: '47', icon: FiCheckSquare, color: 'text-blue-400', bg: 'bg-blue-500/20' },
    { label: 'Budget Total', value: '€5.49M', icon: FiDollarSign, color: 'text-green-400', bg: 'bg-green-500/20' },
    { label: 'Membres Équipe', value: '6', icon: FiUsers, color: 'text-purple-400', bg: 'bg-purple-500/20' },
  ];

  const activeProjects = [
    { id: 1, name: 'Migration Azure', code: 'AZ-001', progress: 45, status: 'En cours', priority: 'Haute' },
    { id: 2, name: 'E-commerce B2B', code: 'EC-002', progress: 62, status: 'En cours', priority: 'Moyenne' },
    { id: 3, name: 'ISO 27001', code: 'SEC-003', progress: 28, status: 'Planification', priority: 'Haute' },
  ];

  const criticalTasks = [
    { id: 1, title: 'Revue architecture cloud', project: 'Migration Azure', priority: 'Critique', dueDate: '2025-12-26' },
    { id: 2, title: 'Tests intégration paiement', project: 'E-commerce B2B', priority: 'Haute', dueDate: '2025-12-28' },
    { id: 3, title: 'Audit sécurité infrastructure', project: 'ISO 27001', priority: 'Critique', dueDate: '2025-12-24' },
  ];

  const upcomingEvents = [
    { id: 1, title: 'Comité de pilotage', date: '2025-12-24', time: '10:00', type: 'meeting' },
    { id: 2, title: 'Livraison Sprint 5', date: '2025-12-27', time: '17:00', type: 'delivery' },
    { id: 3, title: 'Formation équipe DevOps', date: '2025-12-30', time: '14:00', type: 'training' },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Vue d'ensemble de vos projets et activités</p>
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
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Projets Actifs */}
        <Card className="bg-[#111] border-white/10 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Projets Actifs</h2>
            <Link to="/espace-pro/projets" className="flex items-center gap-2 text-[#BFA76A] hover:text-[#BFA76A]/80 transition-colors">
              <span className="text-sm">Voir tout</span>
              <FiArrowRight size={16} />
            </Link>
          </div>
          <div className="space-y-4">
            {activeProjects.map((project) => (
              <div key={project.id} className="border border-white/10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-white">{project.name}</h3>
                    <p className="text-sm text-gray-400">{project.code}</p>
                  </div>
                  <Badge className={project.priority === 'Haute' ? 'bg-red-500/20 text-red-400 border-red-500/50' : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'}>
                    {project.priority}
                  </Badge>
                </div>
                <Progress value={project.progress} className="mb-2" />
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">{project.status}</span>
                  <span className="text-[#BFA76A] font-medium">{project.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Tâches Critiques */}
        <Card className="bg-[#111] border-white/10 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Tâches Critiques</h2>
            <Link to="/espace-pro/taches" className="flex items-center gap-2 text-[#BFA76A] hover:text-[#BFA76A]/80 transition-colors">
              <span className="text-sm">Voir tout</span>
              <FiArrowRight size={16} />
            </Link>
          </div>
          <div className="space-y-3">
            {criticalTasks.map((task) => (
              <div key={task.id} className="border border-white/10 rounded-lg p-4 hover:border-[#BFA76A]/50 transition-colors cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-white">{task.title}</h3>
                  <Badge className={task.priority === 'Critique' ? 'bg-red-500/20 text-red-400 border-red-500/50' : 'bg-orange-500/20 text-orange-400 border-orange-500/50'}>
                    {task.priority}
                  </Badge>
                </div>
                <p className="text-sm text-gray-400 mb-2">{task.project}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FiCalendar size={14} />
                  <span>Échéance: {task.dueDate}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Événements à venir */}
      <Card className="bg-[#111] border-white/10 p-6">
        <h2 className="text-xl font-bold text-white mb-6">Événements à Venir</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="border border-white/10 rounded-lg p-4 hover:border-[#BFA76A]/50 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-[#BFA76A]/20 flex items-center justify-center">
                  <FiCalendar className="text-[#BFA76A]" size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-white">{event.title}</h3>
                  <p className="text-sm text-gray-400">{event.date} à {event.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default DashboardPage;