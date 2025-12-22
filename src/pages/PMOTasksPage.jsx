/**
 * PMO TASKS PAGE - KANBAN BOARD
 * =============================
 * 
 * Page de gestion des tâches avec vue Kanban.
 * Utilise PMODataContext pour les données (vierge par défaut).
 * 
 * FONCTIONNALITÉS:
 * - Vue Kanban avec 4 colonnes (A faire, En cours, En revue, Terminé)
 * - Drag & drop simulation
 * - Sous-tâches et tags
 * - Filtres par priorité et recherche
 * 
 * @author POWALYZE
 * @version 2.0.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Plus, Search, Filter, CheckSquare, Clock, AlertTriangle,
  MoreHorizontal, Edit, Trash2, X, Save, Check, Calendar, User,
  Flag, Tag, ChevronDown, GripVertical, Play
} from 'lucide-react';
import { usePMOData } from '@/context/PMODataContext';

// Legacy data - non utilisé, tout vient du contexte
const legacyTasks = [
  {
    id: 1,
    title: "Finaliser documentation technique Azure",
    description: "Completer la documentation d'architecture pour la migration cloud",
    status: "in-progress",
    priority: "high",
    project: "Migration Cloud Azure",
    assignee: "Marc Dubois",
    dueDate: "2025-01-22",
    tags: ["Documentation", "Azure"],
    subtasks: [
      { id: 1, title: "Schema d'architecture", completed: true },
      { id: 2, title: "Guide de deploiement", completed: false },
      { id: 3, title: "Procedures de rollback", completed: false }
    ]
  },
  {
    id: 2,
    title: "Creer dashboard KPI Finance",
    description: "Developper les visualisations Power BI pour les KPIs financiers",
    status: "todo",
    priority: "high",
    project: "Dashboard Power BI Finance",
    assignee: "Sophie Laurent",
    dueDate: "2025-01-25",
    tags: ["Power BI", "Finance"],
    subtasks: [
      { id: 1, title: "Connexion donnees SAP", completed: true },
      { id: 2, title: "Visualisations revenus", completed: false }
    ]
  },
  {
    id: 3,
    title: "Tests unitaires module facturation",
    description: "Ecrire et executer les tests pour le nouveau module",
    status: "todo",
    priority: "medium",
    project: "Refonte ERP SAP",
    assignee: "Jean Petit",
    dueDate: "2025-01-24",
    tags: ["Testing", "SAP"],
    subtasks: []
  },
  {
    id: 4,
    title: "Revue de code pipelines ETL",
    description: "Analyser et optimiser les pipelines de donnees",
    status: "in-progress",
    priority: "medium",
    project: "Data Lake Implementation",
    assignee: "Pierre Keller",
    dueDate: "2025-01-23",
    tags: ["ETL", "Data"],
    subtasks: [
      { id: 1, title: "Pipeline clients", completed: true },
      { id: 2, title: "Pipeline transactions", completed: true },
      { id: 3, title: "Pipeline produits", completed: false }
    ]
  },
  {
    id: 5,
    title: "Formation utilisateurs SAP",
    description: "Preparer et animer la session de formation",
    status: "done",
    priority: "high",
    project: "Refonte ERP SAP",
    assignee: "Anna Martin",
    dueDate: "2025-01-20",
    tags: ["Formation", "SAP"],
    subtasks: [
      { id: 1, title: "Support de formation", completed: true },
      { id: 2, title: "Exercices pratiques", completed: true }
    ]
  },
  {
    id: 6,
    title: "Configuration monitoring Azure",
    description: "Mettre en place les alertes et dashboards de monitoring",
    status: "review",
    priority: "medium",
    project: "Migration Cloud Azure",
    assignee: "Pierre Keller",
    dueDate: "2025-01-26",
    tags: ["Azure", "Monitoring"],
    subtasks: []
  }
];

const statusConfig = {
  'todo': { label: 'A faire', color: '#6b7280', bgColor: 'bg-gray-500/20' },
  'in-progress': { label: 'En cours', color: '#3b82f6', bgColor: 'bg-blue-500/20' },
  'review': { label: 'En revue', color: '#8b5cf6', bgColor: 'bg-purple-500/20' },
  'done': { label: 'Termine', color: '#22c55e', bgColor: 'bg-green-500/20' }
};

const priorityConfig = {
  'low': { label: 'Basse', color: '#6b7280', icon: Flag },
  'medium': { label: 'Moyenne', color: '#f59e0b', icon: Flag },
  'high': { label: 'Haute', color: '#ef4444', icon: Flag }
};

const projects = ["Migration Cloud Azure", "Dashboard Power BI Finance", "Refonte ERP SAP", "Data Lake Implementation", "PMO"];
const assignees = ["Marc Dubois", "Sophie Laurent", "Jean Petit", "Anna Martin", "Pierre Keller"];

const PMOTasksPage = () => {
  // Utilisation du contexte PMO
  const { tasks: contextTasks, updateTasks, loadDemoData } = usePMOData();
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [notification, setNotification] = useState(null);
  const [viewMode, setViewMode] = useState('kanban');

  // Synchroniser avec le contexte
  useEffect(() => {
    setTasks(contextTasks);
  }, [contextTasks]);

  // Mettre à jour le contexte
  useEffect(() => {
    if (tasks.length > 0 || contextTasks.length > 0) {
      updateTasks(tasks);
    }
  }, [tasks]);

  // Form state
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    project: 'PMO',
    assignee: 'Marc Dubois',
    dueDate: '',
    tags: [],
    subtasks: []
  });

  const [newTag, setNewTag] = useState('');
  const [newSubtask, setNewSubtask] = useState('');

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Add task
  const handleAddTask = () => {
    if (!taskForm.title) {
      showNotification('Veuillez entrer un titre', 'error');
      return;
    }

    const newTask = {
      ...taskForm,
      id: Date.now(),
      subtasks: taskForm.subtasks.map((st, idx) => ({ id: idx + 1, title: st, completed: false }))
    };

    setTasks([...tasks, newTask]);
    setShowAddModal(false);
    resetForm();
    showNotification('Tache ajoutee avec succes!');
  };

  // Update task
  const handleUpdateTask = () => {
    if (!taskForm.title) {
      showNotification('Veuillez entrer un titre', 'error');
      return;
    }

    const updatedTasks = tasks.map(task =>
      task.id === selectedTask.id
        ? { ...task, ...taskForm }
        : task
    );

    setTasks(updatedTasks);
    setShowEditModal(false);
    setSelectedTask(null);
    resetForm();
    showNotification('Tache mise a jour!');
  };

  // Delete task
  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(t => t.id !== taskId));
    setShowEditModal(false);
    setSelectedTask(null);
    showNotification('Tache supprimee!');
  };

  // Update task status (drag & drop simulation)
  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
    showNotification('Statut mis a jour!');
  };

  // Toggle subtask
  const toggleSubtask = (taskId, subtaskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          subtasks: task.subtasks.map(st =>
            st.id === subtaskId ? { ...st, completed: !st.completed } : st
          )
        };
      }
      return task;
    }));
  };

  // Reset form
  const resetForm = () => {
    setTaskForm({
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium',
      project: 'PMO',
      assignee: 'Marc Dubois',
      dueDate: '',
      tags: [],
      subtasks: []
    });
    setNewTag('');
    setNewSubtask('');
  };

  // Open edit modal
  const openEditModal = (task) => {
    setSelectedTask(task);
    setTaskForm({
      title: task.title,
      description: task.description || '',
      status: task.status,
      priority: task.priority,
      project: task.project,
      assignee: task.assignee,
      dueDate: task.dueDate || '',
      tags: task.tags || [],
      subtasks: task.subtasks || []
    });
    setShowEditModal(true);
  };

  // Add tag
  const addTag = () => {
    if (newTag && !taskForm.tags.includes(newTag)) {
      setTaskForm({ ...taskForm, tags: [...taskForm.tags, newTag] });
      setNewTag('');
    }
  };

  // Remove tag
  const removeTag = (tag) => {
    setTaskForm({ ...taskForm, tags: taskForm.tags.filter(t => t !== tag) });
  };

  // Add subtask
  const addSubtask = () => {
    if (newSubtask) {
      setTaskForm({
        ...taskForm,
        subtasks: [...taskForm.subtasks, { id: Date.now(), title: newSubtask, completed: false }]
      });
      setNewSubtask('');
    }
  };

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Group tasks by status for Kanban
  const tasksByStatus = {
    'todo': filteredTasks.filter(t => t.status === 'todo'),
    'in-progress': filteredTasks.filter(t => t.status === 'in-progress'),
    'review': filteredTasks.filter(t => t.status === 'review'),
    'done': filteredTasks.filter(t => t.status === 'done')
  };

  // Stats
  const stats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    done: tasks.filter(t => t.status === 'done').length
  };

  // Task Card Component
  const TaskCard = ({ task }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-[#1A1A1A] border border-white/10 rounded-xl p-4 cursor-pointer hover:border-[#BFA76A]/50 transition-all"
      onClick={() => openEditModal(task)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Flag size={14} style={{ color: priorityConfig[task.priority].color }} />
          <span className="text-xs text-gray-400">{task.project}</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteTask(task.id);
          }}
          className="p-1 hover:bg-red-500/20 rounded text-gray-400 hover:text-red-400 transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </div>

      <h4 className="font-semibold mb-2 line-clamp-2">{task.title}</h4>

      {task.subtasks && task.subtasks.length > 0 && (
        <div className="mb-3">
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
            <CheckSquare size={12} />
            <span>{task.subtasks.filter(st => st.completed).length}/{task.subtasks.length} sous-taches</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#BFA76A] rounded-full transition-all"
              style={{ width: `${(task.subtasks.filter(st => st.completed).length / task.subtasks.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#BFA76A] flex items-center justify-center text-black text-xs font-bold">
            {task.assignee.split(' ').map(n => n[0]).join('')}
          </div>
          <span className="text-xs text-gray-400">{task.assignee.split(' ')[0]}</span>
        </div>
        {task.dueDate && (
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Calendar size={12} />
            {new Date(task.dueDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
          </div>
        )}
      </div>

      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {task.tags.slice(0, 2).map(tag => (
            <span key={tag} className="px-2 py-0.5 bg-[#BFA76A]/10 text-[#BFA76A] rounded text-xs">
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-6">
      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-6 right-6 z-50 px-6 py-3 rounded-lg shadow-lg ${
              notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'
            }`}
          >
            <div className="flex items-center gap-2">
              <Check size={20} />
              <span>{notification.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link to="/pmo-workspace" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowLeft className="text-[#BFA76A]" size={24} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Taches PMO</h1>
            <p className="text-gray-400">Gerez vos taches et suivez leur progression</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A] w-48"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
          >
            <option value="all" className="bg-[#1A1A1A]">Tous les statuts</option>
            {Object.entries(statusConfig).map(([key, config]) => (
              <option key={key} value={key} className="bg-[#1A1A1A]">{config.label}</option>
            ))}
          </select>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#BFA76A] text-black font-semibold rounded-lg hover:bg-[#D4AF37] transition-colors"
          >
            <Plus size={20} />
            Nouvelle Tache
          </motion.button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Total</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-gray-400 text-sm">A faire</p>
          <p className="text-2xl font-bold text-gray-400">{stats.todo}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-gray-400 text-sm">En cours</p>
          <p className="text-2xl font-bold text-blue-400">{stats.inProgress}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Terminees</p>
          <p className="text-2xl font-bold text-green-400">{stats.done}</p>
        </div>
      </div>

      {/* Empty State */}
      {tasks.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20"
        >
          <div className="w-24 h-24 rounded-full bg-[#BFA76A]/10 flex items-center justify-center mb-6">
            <CheckSquare className="text-[#BFA76A]" size={48} />
          </div>
          <h2 className="text-2xl font-bold mb-2">Aucune tache</h2>
          <p className="text-gray-400 mb-6 text-center max-w-md">
            Votre tableau Kanban est vide. Creez votre premiere tache ou chargez les donnees de demonstration.
          </p>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-[#BFA76A] text-black font-semibold rounded-lg hover:bg-[#D4AF37] transition-colors"
            >
              <Plus size={20} />
              Creer une tache
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={loadDemoData}
              className="flex items-center gap-2 px-6 py-3 border border-[#BFA76A] text-[#BFA76A] font-semibold rounded-lg hover:bg-[#BFA76A]/10 transition-colors"
            >
              <Play size={20} />
              Charger Demo
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Kanban Board */}
      {tasks.length > 0 && (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(statusConfig).map(([status, config]) => (
          <div key={status} className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: config.color }} />
                <h3 className="font-semibold">{config.label}</h3>
              </div>
              <span className="px-2 py-1 bg-white/10 rounded text-sm">{tasksByStatus[status]?.length || 0}</span>
            </div>

            <div className="space-y-3 min-h-[200px]">
              {(tasksByStatus[status] || []).map(task => (
                <TaskCard key={task.id} task={task} />
              ))}

              {/* Quick add button */}
              <button
                onClick={() => {
                  setTaskForm({ ...taskForm, status });
                  setShowAddModal(true);
                }}
                className="w-full p-3 border border-dashed border-white/20 rounded-xl text-gray-400 hover:border-[#BFA76A] hover:text-[#BFA76A] transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={18} />
                Ajouter
              </button>
            </div>
          </div>
        ))}
      </div>
      )}

      {/* Add Task Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Nouvelle Tache</h2>
                <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-white/10 rounded-lg">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Titre *</label>
                  <input
                    type="text"
                    value={taskForm.title}
                    onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                    placeholder="Titre de la tache"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Description</label>
                  <textarea
                    value={taskForm.description}
                    onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A] resize-none"
                    rows={3}
                    placeholder="Description detaillee..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Statut</label>
                    <select
                      value={taskForm.status}
                      onChange={(e) => setTaskForm({ ...taskForm, status: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                    >
                      {Object.entries(statusConfig).map(([key, config]) => (
                        <option key={key} value={key} className="bg-[#1A1A1A]">{config.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Priorite</label>
                    <select
                      value={taskForm.priority}
                      onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                    >
                      {Object.entries(priorityConfig).map(([key, config]) => (
                        <option key={key} value={key} className="bg-[#1A1A1A]">{config.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Projet</label>
                    <select
                      value={taskForm.project}
                      onChange={(e) => setTaskForm({ ...taskForm, project: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                    >
                      {projects.map(project => (
                        <option key={project} value={project} className="bg-[#1A1A1A]">{project}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Assignee</label>
                    <select
                      value={taskForm.assignee}
                      onChange={(e) => setTaskForm({ ...taskForm, assignee: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                    >
                      {assignees.map(assignee => (
                        <option key={assignee} value={assignee} className="bg-[#1A1A1A]">{assignee}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Date limite</label>
                  <input
                    type="date"
                    value={taskForm.dueDate}
                    onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Tags</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTag()}
                      className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                      placeholder="Ajouter un tag..."
                    />
                    <button onClick={addTag} className="px-4 py-2 bg-[#BFA76A] text-black rounded-lg hover:bg-[#D4AF37]">
                      <Plus size={20} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {taskForm.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-[#BFA76A]/20 text-[#BFA76A] rounded-full text-sm flex items-center gap-2">
                        {tag}
                        <button onClick={() => removeTag(tag)} className="hover:text-red-400"><X size={14} /></button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-3 border border-white/10 rounded-lg hover:bg-white/5">
                    Annuler
                  </button>
                  <button onClick={handleAddTask} className="flex-1 px-4 py-3 bg-[#BFA76A] text-black font-semibold rounded-lg hover:bg-[#D4AF37] flex items-center justify-center gap-2">
                    <Save size={20} />
                    Ajouter
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Task Modal */}
      <AnimatePresence>
        {showEditModal && selectedTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowEditModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Modifier Tache</h2>
                <button onClick={() => setShowEditModal(false)} className="p-2 hover:bg-white/10 rounded-lg">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Titre *</label>
                  <input
                    type="text"
                    value={taskForm.title}
                    onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Description</label>
                  <textarea
                    value={taskForm.description}
                    onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A] resize-none"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Statut</label>
                    <select
                      value={taskForm.status}
                      onChange={(e) => setTaskForm({ ...taskForm, status: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                    >
                      {Object.entries(statusConfig).map(([key, config]) => (
                        <option key={key} value={key} className="bg-[#1A1A1A]">{config.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Priorite</label>
                    <select
                      value={taskForm.priority}
                      onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                    >
                      {Object.entries(priorityConfig).map(([key, config]) => (
                        <option key={key} value={key} className="bg-[#1A1A1A]">{config.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Projet</label>
                    <select
                      value={taskForm.project}
                      onChange={(e) => setTaskForm({ ...taskForm, project: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                    >
                      {projects.map(project => (
                        <option key={project} value={project} className="bg-[#1A1A1A]">{project}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Assignee</label>
                    <select
                      value={taskForm.assignee}
                      onChange={(e) => setTaskForm({ ...taskForm, assignee: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                    >
                      {assignees.map(assignee => (
                        <option key={assignee} value={assignee} className="bg-[#1A1A1A]">{assignee}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Date limite</label>
                  <input
                    type="date"
                    value={taskForm.dueDate}
                    onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                  />
                </div>

                {/* Subtasks */}
                {taskForm.subtasks && taskForm.subtasks.length > 0 && (
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Sous-taches</label>
                    <div className="space-y-2">
                      {taskForm.subtasks.map(st => (
                        <div key={st.id} className="flex items-center gap-3 p-2 bg-white/5 rounded-lg">
                          <input
                            type="checkbox"
                            checked={st.completed}
                            onChange={() => {
                              const updated = taskForm.subtasks.map(s =>
                                s.id === st.id ? { ...s, completed: !s.completed } : s
                              );
                              setTaskForm({ ...taskForm, subtasks: updated });
                            }}
                            className="w-4 h-4"
                          />
                          <span className={st.completed ? 'line-through text-gray-500' : ''}>{st.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => handleDeleteTask(selectedTask.id)}
                    className="px-4 py-3 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/10 flex items-center gap-2"
                  >
                    <Trash2 size={18} />
                  </button>
                  <button onClick={() => setShowEditModal(false)} className="flex-1 px-4 py-3 border border-white/10 rounded-lg hover:bg-white/5">
                    Annuler
                  </button>
                  <button onClick={handleUpdateTask} className="flex-1 px-4 py-3 bg-[#BFA76A] text-black font-semibold rounded-lg hover:bg-[#D4AF37] flex items-center justify-center gap-2">
                    <Save size={20} />
                    Sauvegarder
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PMOTasksPage;
