import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, X, Trash2, Edit2, Calendar, User, Tag,
  Upload, FileText, Download, Eye, Paperclip
} from 'lucide-react';

const KanbanDemo = () => {
  // États pour les colonnes Kanban
  const [columns, setColumns] = useState({
    todo: { title: 'À faire', tasks: [] },
    inProgress: { title: 'En progression', tasks: [] },
    done: { title: 'Terminé', tasks: [] }
  });

  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [documents, setDocuments] = useState([]);

  // Charger les données depuis localStorage au démarrage
  useEffect(() => {
    const savedColumns = localStorage.getItem('kanban_columns');
    const savedDocuments = localStorage.getItem('kanban_documents');
    
    if (savedColumns) {
      setColumns(JSON.parse(savedColumns));
    }
    
    if (savedDocuments) {
      setDocuments(JSON.parse(savedDocuments));
    }
  }, []);

  // Sauvegarder automatiquement les colonnes
  useEffect(() => {
    localStorage.setItem('kanban_columns', JSON.stringify(columns));
  }, [columns]);

  // Sauvegarder automatiquement les documents
  useEffect(() => {
    localStorage.setItem('kanban_documents', JSON.stringify(documents));
  }, [documents]);

  // Ouvrir une tâche pour la voir/éditer
  const openTask = (task, columnId) => {
    setSelectedTask({ ...task, columnId });
    setShowTaskModal(true);
  };

  // Créer une nouvelle tâche
  const createTask = (columnId, taskData) => {
    const newTask = {
      id: Date.now().toString(),
      title: taskData.title,
      description: taskData.description || '',
      assignee: taskData.assignee || '',
      dueDate: taskData.dueDate || '',
      tags: taskData.tags || [],
      attachments: taskData.attachments || [],
      createdAt: new Date().toISOString()
    };

    setColumns(prev => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        tasks: [...prev[columnId].tasks, newTask]
      }
    }));
  };

  // Mettre à jour une tâche
  const updateTask = (taskId, columnId, updates) => {
    setColumns(prev => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        tasks: prev[columnId].tasks.map(task =>
          task.id === taskId ? { ...task, ...updates } : task
        )
      }
    }));
  };

  // Supprimer une tâche
  const deleteTask = (taskId, columnId) => {
    setColumns(prev => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        tasks: prev[columnId].tasks.filter(task => task.id !== taskId)
      }
    }));
    setShowTaskModal(false);
  };

  // Déplacer une tâche entre colonnes
  const moveTask = (taskId, fromColumn, toColumn) => {
    const task = columns[fromColumn].tasks.find(t => t.id === taskId);
    if (!task) return;

    setColumns(prev => ({
      ...prev,
      [fromColumn]: {
        ...prev[fromColumn],
        tasks: prev[fromColumn].tasks.filter(t => t.id !== taskId)
      },
      [toColumn]: {
        ...prev[toColumn],
        tasks: [...prev[toColumn].tasks, task]
      }
    }));
  };

  // Upload de document
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newDoc = {
          id: Date.now().toString() + Math.random(),
          name: file.name,
          size: file.size,
          type: file.type,
          uploadedAt: new Date().toISOString(),
          data: e.target.result // En base64
        };
        
        setDocuments(prev => [...prev, newDoc]);
      };
      reader.readAsDataURL(file);
    });
  };

  // Télécharger un document
  const downloadDocument = (doc) => {
    const link = document.createElement('a');
    link.href = doc.data;
    link.download = doc.name;
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Gestion des Tâches</h1>
          <p className="text-gray-400">Organisez vos tâches avec des colonnes Kanban</p>
        </div>

        {/* Section Documents */}
        <div className="mb-8 bg-[#1A1A1A] rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FileText className="text-[#BFA76A]" />
              Documents
            </h2>
            <label className="flex items-center gap-2 px-4 py-2 bg-[#BFA76A] text-black rounded-lg cursor-pointer hover:bg-[#D4AF37] transition-colors">
              <Upload size={18} />
              <span>Uploader</span>
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {documents.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Aucun document. Cliquez sur "Uploader" pour ajouter des fichiers.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {documents.map(doc => (
                <div
                  key={doc.id}
                  className="bg-[#0F0F0F] border border-white/10 rounded-lg p-4 hover:border-[#BFA76A]/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2 flex-1">
                      <FileText className="text-[#BFA76A]" size={20} />
                      <span className="text-white font-medium truncate">{doc.name}</span>
                    </div>
                    <button
                      onClick={() => downloadDocument(doc)}
                      className="text-gray-400 hover:text-[#BFA76A] transition-colors"
                    >
                      <Download size={18} />
                    </button>
                  </div>
                  <div className="text-xs text-gray-500">
                    {(doc.size / 1024).toFixed(2)} KB • {new Date(doc.uploadedAt).toLocaleDateString('fr-FR')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(columns).map(([columnId, column]) => (
            <div
              key={columnId}
              className="bg-[#1A1A1A] rounded-xl p-4 border border-white/10"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">
                  {column.title}
                  <span className="ml-2 text-sm text-gray-500">
                    ({column.tasks.length})
                  </span>
                </h3>
                <button
                  onClick={() => {
                    setSelectedTask({ columnId });
                    setShowNewTaskModal(true);
                  }}
                  className="text-[#BFA76A] hover:text-[#D4AF37] transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>

              {/* Tasks */}
              <div className="space-y-3">
                {column.tasks.map(task => (
                  <motion.div
                    key={task.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    onClick={() => openTask(task, columnId)}
                    className="bg-[#0F0F0F] border border-white/10 rounded-lg p-4 cursor-pointer hover:border-[#BFA76A]/50 transition-all"
                  >
                    <h4 className="text-white font-medium mb-2">{task.title}</h4>
                    {task.description && (
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                        {task.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-xs">
                      {task.assignee && (
                        <span className="flex items-center gap-1 text-gray-500">
                          <User size={14} />
                          {task.assignee}
                        </span>
                      )}
                      {task.dueDate && (
                        <span className="flex items-center gap-1 text-gray-500">
                          <Calendar size={14} />
                          {new Date(task.dueDate).toLocaleDateString('fr-FR')}
                        </span>
                      )}
                    </div>
                    {task.attachments?.length > 0 && (
                      <div className="mt-2 flex items-center gap-1 text-[#BFA76A] text-xs">
                        <Paperclip size={12} />
                        {task.attachments.length} fichier(s)
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Voir/Éditer Tâche */}
      <AnimatePresence>
        {showTaskModal && selectedTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowTaskModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Détails de la tâche</h2>
                <button
                  onClick={() => setShowTaskModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Titre */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Titre</label>
                  <input
                    type="text"
                    value={selectedTask.title}
                    onChange={(e) => setSelectedTask({ ...selectedTask, title: e.target.value })}
                    className="w-full bg-[#0F0F0F] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#BFA76A] focus:outline-none"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Description</label>
                  <textarea
                    value={selectedTask.description || ''}
                    onChange={(e) => setSelectedTask({ ...selectedTask, description: e.target.value })}
                    rows={4}
                    className="w-full bg-[#0F0F0F] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#BFA76A] focus:outline-none resize-none"
                  />
                </div>

                {/* Assigné à */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Assigné à</label>
                  <input
                    type="text"
                    value={selectedTask.assignee || ''}
                    onChange={(e) => setSelectedTask({ ...selectedTask, assignee: e.target.value })}
                    className="w-full bg-[#0F0F0F] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#BFA76A] focus:outline-none"
                  />
                </div>

                {/* Date d'échéance */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Date d'échéance</label>
                  <input
                    type="date"
                    value={selectedTask.dueDate || ''}
                    onChange={(e) => setSelectedTask({ ...selectedTask, dueDate: e.target.value })}
                    className="w-full bg-[#0F0F0F] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#BFA76A] focus:outline-none"
                  />
                </div>

                {/* Déplacer vers */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Statut</label>
                  <select
                    value={selectedTask.columnId}
                    onChange={(e) => {
                      moveTask(selectedTask.id, selectedTask.columnId, e.target.value);
                      setSelectedTask({ ...selectedTask, columnId: e.target.value });
                    }}
                    className="w-full bg-[#0F0F0F] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#BFA76A] focus:outline-none"
                  >
                    <option value="todo">À faire</option>
                    <option value="inProgress">En progression</option>
                    <option value="done">Terminé</option>
                  </select>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    updateTask(selectedTask.id, selectedTask.columnId, {
                      title: selectedTask.title,
                      description: selectedTask.description,
                      assignee: selectedTask.assignee,
                      dueDate: selectedTask.dueDate
                    });
                    setShowTaskModal(false);
                  }}
                  className="flex-1 px-4 py-3 bg-[#BFA76A] text-black font-semibold rounded-lg hover:bg-[#D4AF37] transition-colors"
                >
                  Sauvegarder
                </button>
                <button
                  onClick={() => deleteTask(selectedTask.id, selectedTask.columnId)}
                  className="px-4 py-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Nouvelle Tâche */}
      <AnimatePresence>
        {showNewTaskModal && selectedTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowNewTaskModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-6 w-full max-w-lg"
            >
              <h2 className="text-xl font-bold text-white mb-4">Nouvelle tâche</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  createTask(selectedTask.columnId, {
                    title: formData.get('title'),
                    description: formData.get('description'),
                    assignee: formData.get('assignee'),
                    dueDate: formData.get('dueDate')
                  });
                  setShowNewTaskModal(false);
                }}
                className="space-y-4"
              >
                <input
                  type="text"
                  name="title"
                  placeholder="Titre de la tâche"
                  required
                  className="w-full bg-[#0F0F0F] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#BFA76A] focus:outline-none"
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  rows={3}
                  className="w-full bg-[#0F0F0F] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#BFA76A] focus:outline-none resize-none"
                />
                <input
                  type="text"
                  name="assignee"
                  placeholder="Assigné à"
                  className="w-full bg-[#0F0F0F] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#BFA76A] focus:outline-none"
                />
                <input
                  type="date"
                  name="dueDate"
                  className="w-full bg-[#0F0F0F] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#BFA76A] focus:outline-none"
                />
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowNewTaskModal(false)}
                    className="flex-1 px-4 py-3 border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-white"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-[#BFA76A] text-black font-semibold rounded-lg hover:bg-[#D4AF37] transition-colors"
                  >
                    Créer
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default KanbanDemo;