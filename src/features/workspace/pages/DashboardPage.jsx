/**
 * DASHBOARD PAGE
 * Vue d'ensemble du cockpit PMO
 */

import React from 'react';
import { Link } from 'react-router-dom';
import {
  FolderKanban, CheckSquare, AlertTriangle, TrendingUp,
  Users, Calendar, FileText, Clock, ArrowRight, Activity
} from 'lucide-react';
import { Card } from '@/shared/components/ui/Card';
import { Badge } from '@/shared/components/ui/Badge';
import { Button } from '@/shared/components/ui/Button';
import { Progress } from '@/shared/components/ui/Progress';
import { Avatar } from '@/shared/components/ui/Avatar';
import { useWorkspace } from '../context/WorkspaceContext';
import { ROUTES, PROJECT_STATUS, TASK_STATUS } from '@/lib/constants';
import { formatCurrency, percentage } from '@/lib/utils';

export default function DashboardPage() {
  const { state } = useWorkspace();
  const { projects, tasks, team, events } = state;

  // Stats calculées
  const stats = {
    totalProjects: projects.length,
    activeProjects: projects.filter(p => p.status === 'active').length,
    completedProjects: projects.filter(p => p.status === 'completed').length,
    totalBudget: projects.reduce((sum, p) => sum + (p.budget || 0), 0),
    totalSpent: projects.reduce((sum, p) => sum + (p.spent || 0), 0),
    pendingTasks: tasks.filter(t => t.status !== 'done').length,
    completedTasks: tasks.filter(t => t.status === 'done').length,
    criticalTasks: tasks.filter(t => t.priority === 'critical' && t.status !== 'done').length,
    upcomingEvents: events.filter(e => new Date(e.date) >= new Date()).length,
  };

  const budgetUsage = percentage(stats.totalSpent, stats.totalBudget);

  // Projets actifs
  const activeProjects = projects.filter(p => p.status === 'active').slice(0, 5);

  // Tâches urgentes
  const urgentTasks = tasks
    .filter(t => t.priority === 'critical' && t.status !== 'done')
    .slice(0, 5);

  // Événements à venir
  const upcomingEventsList = events
    .filter(e => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Vue d'ensemble de votre cockpit PMO</p>
      </div>

      {/* KPIs Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Projets Actifs */}
        <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-500/30 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <FolderKanban className="text-blue-400" size={24} />
            </div>
            <Badge variant="info" className="text-xs">{stats.activeProjects} actifs</Badge>
          </div>
          <p className="text-3xl font-bold text-white mb-1">{stats.totalProjects}</p>
          <p className="text-sm text-gray-400">Projets totaux</p>
          <div className="mt-3 pt-3 border-t border-blue-500/20">
            <Link to={ROUTES.PROJECTS} className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
              Voir tous <ArrowRight size={12} />
            </Link>
          </div>
        </Card>

        {/* Tâches */}
        <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border-purple-500/30 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <CheckSquare className="text-purple-400" size={24} />
            </div>
            <Badge variant="purple" className="text-xs">{stats.criticalTasks} critiques</Badge>
          </div>
          <p className="text-3xl font-bold text-white mb-1">{stats.pendingTasks}</p>
          <p className="text-sm text-gray-400">Tâches en cours</p>
          <div className="mt-3 pt-3 border-t border-purple-500/20">
            <Link to={ROUTES.TASKS} className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1">
              Voir toutes <ArrowRight size={12} />
            </Link>
          </div>
        </Card>

        {/* Budget */}
        <Card className="bg-gradient-to-br from-green-500/20 to-green-600/10 border-green-500/30 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
              <TrendingUp className="text-green-400" size={24} />
            </div>
            <Badge variant="success" className="text-xs">{budgetUsage}%</Badge>
          </div>
          <p className="text-3xl font-bold text-white mb-1">{formatCurrency(stats.totalBudget)}</p>
          <p className="text-sm text-gray-400">Budget total</p>
          <div className="mt-3">
            <Progress value={stats.totalSpent} max={stats.totalBudget} variant="success" />
          </div>
        </Card>

        {/* Équipe */}
        <Card className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 border-orange-500/30 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
              <Users className="text-orange-400" size={24} />
            </div>
            <Badge variant="warning" className="text-xs">{stats.upcomingEvents} events</Badge>
          </div>
          <p className="text-3xl font-bold text-white mb-1">{team.length}</p>
          <p className="text-sm text-gray-400">Membres actifs</p>
          <div className="mt-3 pt-3 border-t border-orange-500/20">
            <Link to={ROUTES.TEAM} className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1">
              Voir l'équipe <ArrowRight size={12} />
            </Link>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Projets Actifs */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Activity size={20} className="text-brand-gold-500" />
              Projets actifs
            </h2>
            <Link to={ROUTES.PROJECTS}>
              <Button variant="ghost" size="sm">Voir tout</Button>
            </Link>
          </div>

          {activeProjects.length === 0 ? (
            <p className="text-gray-400 text-center py-8">Aucun projet actif</p>
          ) : (
            <div className="space-y-3">
              {activeProjects.map(project => (
                <div key={project.id} className="p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{project.name}</h3>
                      <p className="text-xs text-gray-400 mt-1">{project.code}</p>
                    </div>
                    <Badge variant={PROJECT_STATUS[project.status?.toUpperCase()?.replace('-', '_')]?.color}>
                      {project.status}
                    </Badge>
                  </div>
                  <Progress value={project.progress} showLabel />
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Tâches Critiques */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <AlertTriangle size={20} className="text-red-500" />
              Tâches critiques
            </h2>
            <Link to={ROUTES.TASKS}>
              <Button variant="ghost" size="sm">Voir tout</Button>
            </Link>
          </div>

          {urgentTasks.length === 0 ? (
            <p className="text-gray-400 text-center py-8">Aucune tâche critique</p>
          ) : (
            <div className="space-y-3">
              {urgentTasks.map(task => (
                <div key={task.id} className="p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-white">{task.title}</h3>
                    <Badge variant="error" className="text-xs">Critique</Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {task.dueDate}
                    </span>
                    {task.assignee && (
                      <span className="flex items-center gap-1">
                        <Avatar size="xs" name={task.assignee} />
                        {task.assignee}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Événements à venir */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Calendar size={20} className="text-brand-gold-500" />
            Événements à venir
          </h2>
          <Link to={ROUTES.CALENDAR}>
            <Button variant="ghost" size="sm">Voir calendrier</Button>
          </Link>
        </div>

        {upcomingEventsList.length === 0 ? (
          <p className="text-gray-400 text-center py-8">Aucun événement planifié</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingEventsList.map(event => (
              <div key={event.id} className="p-4 bg-gray-800/50 rounded-lg">
                <Badge variant="info" className="mb-2 text-xs">{event.type}</Badge>
                <h3 className="font-semibold text-white mb-2">{event.title}</h3>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <Calendar size={12} />
                  {new Date(event.date).toLocaleDateString('fr-FR')}
                </p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
