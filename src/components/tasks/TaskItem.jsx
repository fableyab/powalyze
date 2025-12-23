import React from 'react';
import { FiCheckSquare, FiSquare, FiEdit, FiTrash2, FiCalendar, FiUser } from 'react-icons/fi';
import { TASK_PRIORITIES } from '@/contexts/TasksContext';

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const priority = TASK_PRIORITIES.find(p => p.id === task.priority);
  
  const priorityColors = {
    red: 'bg-red-500/20 text-red-400 border-red-500/50',
    orange: 'bg-orange-500/20 text-orange-400 border-orange-500/50',
    yellow: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
    green: 'bg-green-500/20 text-green-400 border-green-500/50',
  };

  const statusColors = {
    'todo': 'bg-gray-500/20 text-gray-400 border-gray-500/50',
    'in-progress': 'bg-blue-500/20 text-blue-400 border-blue-500/50',
    'review': 'bg-purple-500/20 text-purple-400 border-purple-500/50',
    'done': 'bg-green-500/20 text-green-400 border-green-500/50',
  };

  return (
    <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#BFA76A]/20 rounded-xl p-6 hover:border-[#BFA76A]/40 transition-all">
      <div className="flex items-start gap-4">
        <button 
          onClick={() => onToggle(task.id)}
          className="mt-1 flex-shrink-0"
        >
          {task.status === 'done' ? (
            <FiCheckSquare className="w-6 h-6 text-green-400" />
          ) : (
            <FiSquare className="w-6 h-6 text-gray-400 hover:text-[#BFA76A] transition-colors" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className={`text-lg font-semibold ${
              task.status === 'done' ? 'text-gray-500 line-through' : 'text-white'
            }`}>
              {task.title}
            </h3>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => onEdit(task)}
                className="p-2 rounded-lg hover:bg-blue-500/20 border border-blue-500/50 text-blue-400 transition-all"
              >
                <FiEdit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="p-2 rounded-lg hover:bg-red-500/20 border border-red-500/50 text-red-400 transition-all"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap mb-3">
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${priorityColors[priority?.color]}`}>
              <span>{priority?.icon}</span>
              {priority?.label}
            </span>
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${statusColors[task.status]}`}>
              {task.status === 'todo' && '⚪ À faire'}
              {task.status === 'in-progress' && '🔵 En cours'}
              {task.status === 'review' && '🟣 En revue'}
              {task.status === 'done' && '🟢 Terminée'}
            </span>
          </div>

          {task.description && (
            <p className="text-gray-400 text-sm mb-3">{task.description}</p>
          )}

          <div className="flex items-center gap-4 text-sm text-gray-400">
            {task.dueDate && (
              <div className="flex items-center gap-2">
                <FiCalendar className="w-4 h-4 text-[#BFA76A]" />
                <span>Échéance: {new Date(task.dueDate).toLocaleDateString('fr-FR')}</span>
              </div>
            )}
            {task.assignee && (
              <div className="flex items-center gap-2">
                <FiUser className="w-4 h-4 text-[#BFA76A]" />
                <span>{task.assignee}</span>
              </div>
            )}
            {task.project && (
              <div className="flex items-center gap-2">
                <span className="text-[#BFA76A]">•</span>
                <span>{task.project}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}