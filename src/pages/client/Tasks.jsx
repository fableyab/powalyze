import React, { useState, useMemo } from 'react';
import { CheckCircle2, Circle, Clock, AlertCircle, Plus, Calendar, User, Tag, Search } from 'lucide-react';
import { useTasks } from '../../contexts/TasksContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';

const statusConfig = {
  pending: { label: 'À faire', icon: Circle, color: 'text-dark-300', bg: 'bg-dark-700' },
  'in-progress': { label: 'En cours', icon: Clock, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  completed: { label: 'Terminé', icon: CheckCircle2, color: 'text-green-400', bg: 'bg-green-500/10' },
  blocked: { label: 'Bloqué', icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-500/10' },
};

const priorityConfig = {
  low: { label: 'Basse', color: 'text-dark-300', bg: 'bg-dark-700' },
  medium: { label: 'Moyenne', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  high: { label: 'Haute', color: 'text-red-400', bg: 'bg-red-500/10' },
};

const TaskCard = ({ task, onEdit, onUpdateStatus }) => {
  const StatusIcon = statusConfig[task.status].icon;
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed';

  return (
    <Card className="hover:border-gold-primary/30 transition-all duration-200 cursor-pointer group" onClick={() => onEdit(task)}>
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-white font-medium group-hover:text-gold-primary transition-colors truncate">
                {task.title}
              </h3>
              {isOverdue && (
                <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-full whitespace-nowrap">
                  En retard
                </span>
              )}
            </div>
            {task.description && (
              <p className="text-dark-300 text-sm line-clamp-2">{task.description}</p>
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              const statuses = ['pending', 'in-progress', 'completed', 'blocked'];
              const currentIndex = statuses.indexOf(task.status);
              const nextStatus = statuses[(currentIndex + 1) % statuses.length];
              onUpdateStatus(task.id, nextStatus);
            }}
            className={`${statusConfig[task.status].bg} ${statusConfig[task.status].color} p-2 rounded-lg hover:opacity-80 transition-opacity flex-shrink-0`}
          >
            <StatusIcon className="w-5 h-5" />
          </button>
        </div>

        {task.status === 'in-progress' && task.progress !== undefined && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-dark-300">
              <span>Progression</span>
              <span>{task.progress}%</span>
            </div>
            <div className="h-1.5 bg-dark-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-gold-primary to-gold-secondary transition-all duration-300"
                style={{ width: `${task.progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 text-sm text-dark-300">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(task.dueDate).toLocaleDateString('fr-FR')}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{task.assignedTo}</span>
          </div>

          <span className={`px-2 py-0.5 rounded-full text-xs ${priorityConfig[task.priority].bg} ${priorityConfig[task.priority].color}`}>
            {priorityConfig[task.priority].label}
          </span>
        </div>

        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {task.tags.map((tag, index) => (
              <span key={index} className="px-2 py-0.5 bg-dark-700 text-dark-300 text-xs rounded-full flex items-center gap-1">
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {task.status === 'blocked' && task.blockedReason && (
          <div className="mt-2 p-2 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400 text-xs flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {task.blockedReason}
            </p>
          </div>
        )}

        <div className="pt-2 border-t border-dark-700 text-xs text-dark-400">
          Projet: {task.projectName}
        </div>
      </div>
    </Card>
  );
};

const TaskModal = ({ task, onClose, onSave }) => {
  const [formData, setFormData] = useState(task || {
    title: '',
    description: '',
    projectId: '1',
    projectName: 'Site e-commerce',
    status: 'pending',
    priority: 'medium',
    assignedTo: '',
    dueDate: '',
    tags: [],
    progress: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Modal isOpen={true} onClose={onClose} title={task ? 'Modifier la tâche' : 'Nouvelle tâche'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Titre"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />

        <div>
          <label className="block text-dark-200 text-sm font-medium mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold-primary"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-dark-200 text-sm font-medium mb-2">Statut</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold-primary"
            >
              {Object.entries(statusConfig).map(([value, config]) => (
                <option key={value} value={value}>{config.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-dark-200 text-sm font-medium mb-2">Priorité</label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold-primary"
            >
              {Object.entries(priorityConfig).map(([value, config]) => (
                <option key={value} value={value}>{config.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Assigné à"
            value={formData.assignedTo}
            onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
            required
          />

          <Input
            label="Date d'échéance"
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            required
          />
        </div>

        {formData.status === 'in-progress' && (
          <div>
            <label className="block text-dark-200 text-sm font-medium mb-2">
              Progression: {formData.progress || 0}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={formData.progress || 0}
              onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit">
            {task ? 'Enregistrer' : 'Créer'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default function Tasks() {
  const { tasks, addTask, updateTask, getTaskStats } = useTasks();
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [viewMode, setViewMode] = useState('all');

  const stats = getTaskStats();

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
      const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, searchQuery, filterStatus, filterPriority]);

  const groupedTasks = useMemo(() => {
    return {
      pending: filteredTasks.filter(t => t.status === 'pending'),
      'in-progress': filteredTasks.filter(t => t.status === 'in-progress'),
      completed: filteredTasks.filter(t => t.status === 'completed'),
      blocked: filteredTasks.filter(t => t.status === 'blocked'),
    };
  }, [filteredTasks]);

  const handleSaveTask = (taskData) => {
    if (selectedTask) {
      updateTask(selectedTask.id, taskData);
    } else {
      addTask(taskData);
    }
  };

  const handleUpdateStatus = (taskId, newStatus) => {
    updateTask(taskId, { status: newStatus });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Gestion des tâches</h1>
          <p className="text-dark-300">Suivez et organisez vos tâches par projet</p>
        </div>
        <Button onClick={() => { setSelectedTask(null); setShowModal(true); }}>
          <Plus className="w-5 h-5 mr-2" />
          Nouvelle tâche
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card className="bg-gradient-to-br from-gold-primary/20 to-gold-secondary/10 border-gold-primary/30">
          <div className="text-center">
            <p className="text-3xl font-bold text-gold-primary">{stats.total}</p>
            <p className="text-dark-300 text-sm">Total</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-dark-300">{stats.pending}</p>
            <p className="text-dark-300 text-sm">À faire</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-400">{stats.inProgress}</p>
            <p className="text-dark-300 text-sm">En cours</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-400">{stats.completed}</p>
            <p className="text-dark-300 text-sm">Terminées</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-red-400">{stats.blocked}</p>
            <p className="text-dark-300 text-sm">Bloquées</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-orange-400">{stats.overdue}</p>
            <p className="text-dark-300 text-sm">En retard</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-gold-primary">{stats.completionRate}%</p>
            <p className="text-dark-300 text-sm">Complétées</p>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
              <input
                type="text"
                placeholder="Rechercher une tâche..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-gold-primary"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold-primary"
            >
              <option value="all">Tous les statuts</option>
              {Object.entries(statusConfig).map(([value, config]) => (
                <option key={value} value={value}>{config.label}</option>
              ))}
            </select>

            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold-primary"
            >
              <option value="all">Toutes les priorités</option>
              {Object.entries(priorityConfig).map(([value, config]) => (
                <option key={value} value={value}>{config.label}</option>
              ))}
            </select>

            <button
              onClick={() => setViewMode(viewMode === 'all' ? 'kanban' : 'all')}
              className="px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white hover:bg-dark-600 transition-colors"
            >
              {viewMode === 'all' ? 'Vue Kanban' : 'Vue Liste'}
            </button>
          </div>
        </div>
      </Card>

      {viewMode === 'all' ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={(task) => { setSelectedTask(task); setShowModal(true); }}
              onUpdateStatus={handleUpdateStatus}
            />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Object.entries(statusConfig).map(([status, config]) => (
            <div key={status} className="space-y-3">
              <div className={`p-3 rounded-lg ${config.bg}`}>
                <div className="flex items-center gap-2">
                  <config.icon className={`w-5 h-5 ${config.color}`} />
                  <h3 className={`font-semibold ${config.color}`}>
                    {config.label} ({groupedTasks[status].length})
                  </h3>
                </div>
              </div>
              <div className="space-y-3">
                {groupedTasks[status].map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={(task) => { setSelectedTask(task); setShowModal(true); }}
                    onUpdateStatus={handleUpdateStatus}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredTasks.length === 0 && (
        <Card className="text-center py-12">
          <p className="text-dark-300 text-lg">Aucune tâche trouvée</p>
          <p className="text-dark-400 mt-2">Essayez de modifier vos filtres ou créez une nouvelle tâche</p>
        </Card>
      )}

      {showModal && (
        <TaskModal
          task={selectedTask}
          onClose={() => { setShowModal(false); setSelectedTask(null); }}
          onSave={handleSaveTask}
        />
      )}
    </div>
  );
}
