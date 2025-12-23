import React, { useState } from 'react';
import { FiPlus, FiFilter } from 'react-icons/fi';
import { useTasksContext, TASK_STATUSES } from '@/contexts/TasksContext';
import TaskItem from '@/components/tasks/TaskItem';
import TaskForm from '@/components/tasks/TaskForm';

export default function TachesPage() {
  const { tasks, createTask, updateTask, deleteTask, toggleTaskStatus } = useTasksContext();
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredTasks = statusFilter === 'all' 
    ? tasks 
    : tasks.filter(task => task.status === statusFilter);

  const stats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    review: tasks.filter(t => t.status === 'review').length,
    done: tasks.filter(t => t.status === 'done').length,
  };

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
    } else {
      createTask(taskData);
    }
    setShowForm(false);
    setEditingTask(null);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette tâche ?')) {
      deleteTask(taskId);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] bg-clip-text text-transparent">
            Tâches
          </h1>
          <p className="text-gray-400 mt-2">Gestion et suivi des tâches projet</p>
        </div>
        <button
          onClick={() => { setEditingTask(null); setShowForm(true); }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#BFA76A]/20 transition-all"
        >
          <FiPlus className="w-5 h-5" />
          Nouvelle Tâche
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#BFA76A]/20 rounded-xl p-6 hover:border-[#BFA76A]/40 transition-all">
          <div className="text-3xl font-bold text-white mb-1">{stats.total}</div>
          <div className="text-sm text-gray-400">Total</div>
        </div>
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#BFA76A]/20 rounded-xl p-6 hover:border-[#BFA76A]/40 transition-all">
          <div className="text-3xl font-bold text-gray-400 mb-1">{stats.todo}</div>
          <div className="text-sm text-gray-400">À faire</div>
        </div>
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#BFA76A]/20 rounded-xl p-6 hover:border-[#BFA76A]/40 transition-all">
          <div className="text-3xl font-bold text-blue-400 mb-1">{stats.inProgress}</div>
          <div className="text-sm text-gray-400">En cours</div>
        </div>
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#BFA76A]/20 rounded-xl p-6 hover:border-[#BFA76A]/40 transition-all">
          <div className="text-3xl font-bold text-purple-400 mb-1">{stats.review}</div>
          <div className="text-sm text-gray-400">En revue</div>
        </div>
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#BFA76A]/20 rounded-xl p-6 hover:border-[#BFA76A]/40 transition-all">
          <div className="text-3xl font-bold text-green-400 mb-1">{stats.done}</div>
          <div className="text-sm text-gray-400">Terminées</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#BFA76A]/20 rounded-xl p-4">
        <div className="flex items-center gap-2 flex-wrap">
          <FiFilter className="w-5 h-5 text-[#BFA76A]" />
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              statusFilter === 'all'
                ? 'bg-[#BFA76A]/20 text-[#BFA76A] border border-[#BFA76A]/50'
                : 'bg-[#0A0A0A] text-gray-400 border border-[#BFA76A]/20 hover:text-white'
            }`}
          >
            Toutes ({stats.total})
          </button>
          {TASK_STATUSES.map(status => (
            <button
              key={status.id}
              onClick={() => setStatusFilter(status.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                statusFilter === status.id
                  ? 'bg-[#BFA76A]/20 text-[#BFA76A] border border-[#BFA76A]/50'
                  : 'bg-[#0A0A0A] text-gray-400 border border-[#BFA76A]/20 hover:text-white'
              }`}
            >
              {status.icon} {status.label} ({stats[status.id] || 0})
            </button>
          ))}
        </div>
      </div>

      {/* Tasks List */}
      {filteredTasks.length === 0 ? (
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#BFA76A]/20 rounded-xl p-12">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#BFA76A]/20 to-[#D4AF37]/10 border border-[#BFA76A]/30 flex items-center justify-center">
              <FiPlus className="w-12 h-12 text-[#BFA76A]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {statusFilter !== 'all' ? 'Aucune tâche dans ce statut' : 'Aucune tâche'}
            </h3>
            <p className="text-gray-400 mb-8">
              {statusFilter !== 'all'
                ? 'Essayez de sélectionner un autre filtre'
                : 'Commencez par créer votre première tâche'
              }
            </p>
            <button
              onClick={() => { setEditingTask(null); setShowForm(true); }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#BFA76A]/20 transition-all"
            >
              <FiPlus className="w-5 h-5" />
              Créer une tâche
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTaskStatus}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      )}

      {/* Task Form Modal */}
      {showForm && (
        <TaskForm
          task={editingTask}
          onClose={() => { setShowForm(false); setEditingTask(null); }}
          onSave={handleSaveTask}
        />
      )}
    </div>
  );
}