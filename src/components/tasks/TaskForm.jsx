import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { TASK_PRIORITIES, TASK_STATUSES } from '@/contexts/TasksContext';

export default function TaskForm({ task, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    priority: task?.priority || 'moyenne',
    status: task?.status || 'todo',
    dueDate: task?.dueDate || '',
    assignee: task?.assignee || '',
    project: task?.project || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#BFA76A]/30 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1A1A1A] to-[#0F0F0F] border-b border-[#BFA76A]/20 px-8 py-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] bg-clip-text text-transparent">
            {task ? 'Éditer la tâche' : 'Nouvelle tâche'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/5 transition-all"
          >
            <FiX className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Titre *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#BFA76A]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#BFA76A]/50"
              placeholder="Titre de la tâche"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#BFA76A]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#BFA76A]/50 resize-none"
              placeholder="Description de la tâche..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Priorité</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#BFA76A]/20 rounded-lg text-white focus:outline-none focus:border-[#BFA76A]/50"
              >
                {TASK_PRIORITIES.map(p => (
                  <option key={p.id} value={p.id}>{p.icon} {p.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Statut</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#BFA76A]/20 rounded-lg text-white focus:outline-none focus:border-[#BFA76A]/50"
              >
                {TASK_STATUSES.map(s => (
                  <option key={s.id} value={s.id}>{s.icon} {s.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Échéance</label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#BFA76A]/20 rounded-lg text-white focus:outline-none focus:border-[#BFA76A]/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Assigné à</label>
              <input
                type="text"
                value={formData.assignee}
                onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#BFA76A]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#BFA76A]/50"
                placeholder="Nom de la personne"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Projet</label>
            <input
              type="text"
              value={formData.project}
              onChange={(e) => setFormData({ ...formData, project: e.target.value })}
              className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#BFA76A]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#BFA76A]/50"
              placeholder="Nom du projet"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-all"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={!formData.title.trim()}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#BFA76A]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {task ? 'Enregistrer' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}