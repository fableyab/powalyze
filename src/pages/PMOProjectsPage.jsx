/**
 * PMO PROJECTS PAGE
 * =================
 * 
 * Page de gestion des projets PMO.
 * Utilise PMODataContext pour les données (vierge par défaut, demo sur demande).
 * 
 * FONCTIONNALITÉS:
 * - Liste des projets avec filtres et recherche
 * - Ajout/modification/suppression de projets
 * - Vue détaillée de chaque projet
 * - Statistiques globales du portefeuille
 * 
 * @author POWALYZE
 * @version 2.0.0
 */

import React, { useState, useEffect } from 'react';
import KPIDashboardPremium from '../components/KPIDashboardPremium';
import ProgressAreaChart from '../components/ProgressAreaChart';
import BudgetProgressLineChart from '../components/BudgetProgressLineChart';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save } from 'lucide-react';
import { usePMOData } from '@/context/PMODataContext';

// Ces données ne sont plus utilisées - tout vient du contexte
const legacyProjects = [
  {
    id: 1,
    name: "Migration Cloud Azure",
    description: "Migration complete de l'infrastructure vers Azure avec mise en place du DevOps",
    client: "Swiss Bank Corp",
    status: "in-progress",
    priority: "high",
    progress: 75,
    budget: 450000,
    spent: 337500,
    startDate: "2024-09-01",
    endDate: "2025-03-31",
    manager: "Marc Dubois",
    team: ["Marc Dubois", "Pierre Keller", "Jean Petit"],
    tags: ["Cloud", "Azure", "DevOps"],
    tasks: { total: 45, completed: 34 },
    risks: 2
  },
  {
    id: 2,
    name: "Dashboard Power BI Finance",
    description: "Creation de tableaux de bord analytiques pour le departement Finance",
    client: "Credit Suisse",
    status: "in-progress",
    priority: "high",
    progress: 60,
    budget: 85000,
    spent: 51000,
    startDate: "2024-11-01",
    endDate: "2025-02-28",
    manager: "Sophie Laurent",
    team: ["Sophie Laurent", "Anna Martin"],
    tags: ["Power BI", "Finance", "Analytics"],
    tasks: { total: 28, completed: 17 },
    risks: 0
  },
  {
    id: 3,
    name: "Refonte ERP SAP",
    description: "Migration vers SAP S/4HANA et optimisation des processus metier",
    client: "Nestle SA",
    status: "at-risk",
    priority: "high",
    progress: 45,
    budget: 890000,
    spent: 400500,
    startDate: "2024-06-15",
    endDate: "2025-06-30",
    manager: "Anna Martin",
    team: ["Anna Martin", "Marc Dubois", "Jean Petit", "Luc Bernard"],
    tags: ["SAP", "ERP", "S/4HANA"],
    tasks: { total: 120, completed: 54 },
    risks: 3
  },
  {
    id: 4,
    name: "Data Lake Implementation",
    description: "Mise en place d'un Data Lake pour centraliser toutes les donnees",
    client: "Swisscom",
    status: "in-progress",
    priority: "medium",
    progress: 30,
    budget: 320000,
    spent: 96000,
    startDate: "2024-12-01",
    endDate: "2025-08-31",
    manager: "Pierre Keller",
    team: ["Pierre Keller", "Sophie Laurent"],
    tags: ["Data", "Lake", "Big Data"],
    tasks: { total: 65, completed: 20 },
    risks: 1
  },
  {
    id: 5,
    name: "Portail Client NextGen",
    description: "Developpement d'un nouveau portail client moderne et responsive",
    client: "UBS",
    status: "completed",
    priority: "medium",
    progress: 100,
    budget: 125000,
    spent: 118000,
    startDate: "2024-04-01",
    endDate: "2024-12-15",
    manager: "Jean Petit",
    team: ["Jean Petit", "Sophie Laurent"],
    tags: ["Web", "React", "Portal"],
    tasks: { total: 42, completed: 42 },
    risks: 0
  },
  {
    id: 6,
    name: "Automatisation RH",
    description: "Automatisation des processus RH avec workflows intelligents",
    client: "Rolex",
    status: "planned",
    priority: "low",
    progress: 0,
    budget: 95000,
    spent: 0,
    startDate: "2025-02-01",
    endDate: "2025-07-31",
    manager: "Marc Dubois",
    team: ["Marc Dubois"],
    tags: ["RH", "Automation", "Workflow"],
    tasks: { total: 0, completed: 0 },
    risks: 0
  }
];

const statusConfig = {
  'planned': { label: 'Planifie', color: '#6b7280', bgColor: 'bg-gray-500/20' },
  'in-progress': { label: 'En cours', color: '#3b82f6', bgColor: 'bg-blue-500/20' },
  'at-risk': { label: 'A risque', color: '#f59e0b', bgColor: 'bg-orange-500/20' },
  'completed': { label: 'Termine', color: '#22c55e', bgColor: 'bg-green-500/20' }
};

const priorityConfig = {
  'low': { label: 'Basse', color: '#6b7280' },
  'medium': { label: 'Moyenne', color: '#f59e0b' },
  'high': { label: 'Haute', color: '#ef4444' }
};

const clients = ["Swiss Bank Corp", "Credit Suisse", "Nestle SA", "Swisscom", "UBS", "Rolex", "Autre"];
const managers = ["Marc Dubois", "Sophie Laurent", "Jean Petit", "Anna Martin", "Pierre Keller"];

const PMOProjectsPage = () => {
  // Utilisation du contexte PMO pour les données
  const { projects: contextProjects, updateProjects, loadDemoData } = usePMOData();
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [notification, setNotification] = useState(null);
  // Upload de fichier pour le projet
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Ajout automatique d'un projet de démonstration premium si la liste est vide
  useEffect(() => {
    if (projects.length === 0) {
      setProjects([
        {
          id: 1,
          name: "Projet Pilote – Transformation Digitale 2025",
          description: "Projet d’exemple complet permettant de découvrir toutes les fonctionnalités PMO de Powalyze : tâches, risques, jalons, documents, KPI et suivi global.",
          client: "Client Démo Premium",
          status: "in-progress",
          priority: "high",
          budget: 120000,
          spent: 48000,
          startDate: "2025-01-15",
          endDate: "2025-10-30",
          manager: "Powalyze PMO Team",
          tags: ["Transformation", "Digital", "Exemple", "Premium"],
          team: ["Powalyze PMO Team", "IT Lead", "Équipe Dev", "QA"],
          tasks: {
            total: 6,
            completed: 2,
            details: [
              { title: "Analyse initiale", duree: "5 jours", responsable: "PMO", statut: "Terminé" },
              { title: "Kickoff projet", duree: "1 jour", responsable: "Chef de projet", statut: "Terminé" },
              { title: "Planification détaillée", duree: "7 jours", responsable: "PMO", statut: "En cours" },
              { title: "Architecture technique", duree: "10 jours", responsable: "IT Lead", statut: "À faire" },
              { title: "Développement du module pilote", duree: "20 jours", responsable: "Équipe Dev", statut: "À faire" },
              { title: "Phase de tests & validation", duree: "12 jours", responsable: "QA", statut: "À faire" }
            ]
          },
          risks: [
            {
              titre: "Retard fournisseur",
              probabilite: "Moyenne",
              impact: "Moyen",
              mitigation: "Suivi hebdomadaire + contrat révisé"
            },
            {
              titre: "Manque de ressources internes",
              probabilite: "Faible",
              impact: "Élevé",
              mitigation: "Renfort externe possible"
            },
            {
              titre: "Dépendance à un outil tiers",
              probabilite: "Faible",
              impact: "Moyen",
              mitigation: "Alternative identifiée"
            }
          ],
          milestones: [
            { titre: "M1 – Analyse & Kickoff", date: "2025-02-01", statut: "Terminé" },
            { titre: "M2 – Planification validée", date: "2025-03-01", statut: "En cours" },
            { titre: "M3 – Module pilote livré", date: "2025-06-15", statut: "À venir" },
            { titre: "M4 – Go‑Live", date: "2025-10-30", statut: "À venir" }
          ],
          documents: [
            { nom: "Charte projet.pdf", type: "Document initial", taille: "320 KB" },
            { nom: "Planning détaillé.xlsx", type: "Planning", taille: "180 KB" },
            { nom: "Spécifications fonctionnelles.docx", type: "Documentation", taille: "540 KB" }
          ],
          kpis: [
            // À compléter selon affichage souhaité
          ]
        }
      ]);
    }
  }, [projects.length]);

  // Synchroniser avec le contexte
  useEffect(() => {
    setProjects(contextProjects);
  }, [contextProjects]);

  // Mettre à jour le contexte quand les projets changent
  useEffect(() => {
    if (projects.length > 0 || contextProjects.length > 0) {
      updateProjects(projects);
    }
  }, [projects]);

  // Form state
  const [projectForm, setProjectForm] = useState({
    name: '',
    description: '',
    client: 'Swiss Bank Corp',
    status: 'planned',
    priority: 'medium',
    budget: '',
    startDate: '',
    endDate: '',
    manager: 'Marc Dubois',
    tags: []
  });

  const [newTag, setNewTag] = useState('');

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Add project avec upload de fichier
  const handleAddProject = async () => {
    setUploadError(null);
    if (!projectForm.name) {
      showNotification('Veuillez entrer un nom de projet', 'error');
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      Object.entries(projectForm).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v, i) => formData.append(`${key}[${i}]`, v));
        } else {
          formData.append(key, value);
        }
      });
      if (uploadedFile) {
        formData.append('file', uploadedFile);
      }

      // Remplace l'URL par celle de ton backend/API
      const response = await fetch('/api/projects', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du projet");
      }

      // Optionnel : récupérer le projet créé depuis la réponse
      // const createdProject = await response.json();
      // setProjects([...projects, createdProject]);

      // Pour démo locale : ajoute le projet côté front
      const newProject = {
        ...projectForm,
        id: Date.now(),
        progress: 0,
        spent: 0,
        budget: parseFloat(projectForm.budget) || 0,
        team: [projectForm.manager],
        tasks: { total: 0, completed: 0 },
        risks: 0,
        fileName: uploadedFile ? uploadedFile.name : undefined
      };
      setProjects([...projects, newProject]);
      setShowAddModal(false);
      resetForm();
      setUploadedFile(null);
      showNotification('Projet créé avec succès!');
    } catch (err) {
      setUploadError(err.message || 'Erreur lors de la création du projet');
      showNotification(err.message || 'Erreur lors de la création du projet', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  // Update project
  const handleUpdateProject = () => {
    if (!projectForm.name) {
      showNotification('Veuillez entrer un nom de projet', 'error');
      return;
    }

    const updatedProjects = projects.map(project =>
      project.id === selectedProject.id
        ? { 
            ...project, 
            ...projectForm,
            budget: parseFloat(projectForm.budget) || project.budget
          }
        : project
    );

    setProjects(updatedProjects);
    setShowEditModal(false);
    setSelectedProject(null);
    resetForm();
    showNotification('Projet mis a jour!');
  };

  // Delete project
  const handleDeleteProject = (projectId) => {
    setProjects(projects.filter(p => p.id !== projectId));
    setShowEditModal(false);
    setShowViewModal(false);
    setSelectedProject(null);
    showNotification('Projet supprime!');
  };

  // Reset form
  const resetForm = () => {
    setProjectForm({
      name: '',
      description: '',
      client: 'Swiss Bank Corp',
      status: 'planned',
      priority: 'medium',
      budget: '',
      startDate: '',
      endDate: '',
      manager: 'Marc Dubois',
      tags: []
    });
    setNewTag('');
  };

  // Open view modal
  const openViewModal = (project) => {
    setSelectedProject(project);
    setShowViewModal(true);
  };

  // Open edit modal
  const openEditModal = (project) => {
    setSelectedProject(project);
    setProjectForm({
      name: project.name,
      description: project.description || '',
      client: project.client,
      status: project.status,
      priority: project.priority,
      budget: project.budget.toString(),
      startDate: project.startDate || '',
      endDate: project.endDate || '',
      manager: project.manager,
      tags: project.tags || []
    });
    setShowEditModal(true);
  };

  // Add tag
  const addTag = () => {
    if (newTag && !projectForm.tags.includes(newTag)) {
      setProjectForm({ ...projectForm, tags: [...projectForm.tags, newTag] });
      setNewTag('');
    }
  };

  // Remove tag
  const removeTag = (tag) => {
    setProjectForm({ ...projectForm, tags: projectForm.tags.filter(t => t !== tag) });
  };

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Stats
  const stats = {
    total: projects.length,
    active: projects.filter(p => p.status === 'in-progress').length,
    atRisk: projects.filter(p => p.status === 'at-risk').length,
    completed: projects.filter(p => p.status === 'completed').length,
    totalBudget: projects.reduce((acc, p) => acc + p.budget, 0),
    totalSpent: projects.reduce((acc, p) => acc + p.spent, 0)
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-6">
      {/* Section Dashboard du Projet */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold mb-4 text-blue-200">Dashboard du Projet</h2>
        <KPIDashboardPremium />
        <div className="mt-8">
          <ProgressAreaChart />
        </div>
        <div className="mt-8">
          <BudgetProgressLineChart />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 mt-8">
          {/* Placeholder pour Heatmap des risques */}
          <div className="rounded-xl bg-[#101c2c] p-6 shadow flex flex-col items-center justify-center min-h-[180px]">
            <span className="text-lg font-semibold text-orange-100 mb-2">Heatmap des risques</span>
            <span className="text-xs text-orange-300">(à intégrer)</span>
          </div>
          {/* Placeholder pour Timeline des jalons */}
          <div className="rounded-xl bg-[#101c2c] p-6 shadow flex flex-col items-center justify-center min-h-[180px]">
            <span className="text-lg font-semibold text-green-100 mb-2">Timeline des jalons</span>
            <span className="text-xs text-green-300">(à intégrer)</span>
          </div>
        </div>
      </section>
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
            <h1 className="text-3xl font-bold">Projets PMO</h1>
            <p className="text-gray-400">Gerez votre portefeuille de projets</p>
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
            Nouveau Projet
          </motion.button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <FolderKanban className="text-[#BFA76A]" size={24} />
            <div>
              <p className="text-gray-400 text-sm">Total</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Clock className="text-blue-400" size={24} />
            <div>
              <p className="text-gray-400 text-sm">En cours</p>
              <p className="text-2xl font-bold text-blue-400">{stats.active}</p>
            </div>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-orange-400" size={24} />
            <div>
              <p className="text-gray-400 text-sm">A risque</p>
              <p className="text-2xl font-bold text-orange-400">{stats.atRisk}</p>
            </div>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-400" size={24} />
            <div>
              <p className="text-gray-400 text-sm">Termines</p>
              <p className="text-2xl font-bold text-green-400">{stats.completed}</p>
            </div>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <DollarSign className="text-[#BFA76A]" size={24} />
            <div>
              <p className="text-gray-400 text-sm">Budget Total</p>
              <p className="text-xl font-bold">CHF {(stats.totalBudget / 1000000).toFixed(2)}M</p>
            </div>
          </div>
        </div>
      </div>

      {/* Empty State - Aucun projet */}
      {projects.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20"
        >
          <div className="w-24 h-24 rounded-full bg-[#BFA76A]/10 flex items-center justify-center mb-6">
            <FolderKanban className="text-[#BFA76A]" size={48} />
          </div>
          <h2 className="text-2xl font-bold mb-2">Aucun projet</h2>
          <p className="text-gray-400 mb-6 text-center max-w-md">
            Votre espace projet est vierge. Creez votre premier projet ou chargez les donnees de demonstration.
          </p>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-[#BFA76A] text-black font-semibold rounded-lg hover:bg-[#D4AF37] transition-colors"
            >
              <Plus size={20} />
              Creer un projet
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

      {/* Projects Grid */}
      {projects.length > 0 && (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-[#BFA76A]/50 transition-all"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-start justify-between mb-3">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${statusConfig[project.status]?.bgColor || 'bg-gray-500/20'}`} style={{ color: statusConfig[project.status]?.color || '#6b7280' }}>
                  {statusConfig[project.status]?.label || 'Inconnu'}
                </span>
                <span className="px-2 py-1 rounded text-xs" style={{ color: priorityConfig[project.priority]?.color || '#6b7280', backgroundColor: (priorityConfig[project.priority]?.color || '#6b7280') + '20' }}>
                  {priorityConfig[project.priority]?.label || 'Normal'}
                </span>
              </div>
              <h3 className="font-bold text-lg mb-1">{project.name}</h3>
              <p className="text-gray-400 text-sm">{project.client}</p>
            </div>

            {/* Progress */}
            <div className="px-6 py-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Progression</span>
                <span className="text-[#BFA76A] font-semibold">{project.progress}%</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${project.progress}%` }}
                  transition={{ duration: 1, delay: idx * 0.1 }}
                  className={`h-full rounded-full ${
                    project.status === 'at-risk' ? 'bg-orange-500' :
                    project.status === 'completed' ? 'bg-green-500' : 'bg-[#BFA76A]'
                  }`}
                />
              </div>
            </div>

            {/* Info */}
            <div className="px-6 py-4 space-y-2 text-sm">
              <div className="flex items-center justify-between text-gray-400">
                <span className="flex items-center gap-2">
                  <DollarSign size={14} />
                  Budget
                </span>
                <span>CHF {(project.budget / 1000).toFixed(0)}K</span>
              </div>
              <div className="flex items-center justify-between text-gray-400">
                <span className="flex items-center gap-2">
                  <Users size={14} />
                  Equipe
                </span>
                <span>{project.team?.length || 0} membres</span>
              </div>
              <div className="flex items-center justify-between text-gray-400">
                <span className="flex items-center gap-2">
                  <Target size={14} />
                  Taches
                </span>
                <span>{project.tasks?.completed || 0}/{project.tasks?.total || 0}</span>
              </div>
              {project.risks > 0 && (
                <div className="flex items-center justify-between text-orange-400">
                  <span className="flex items-center gap-2">
                    <AlertTriangle size={14} />
                    Risques
                  </span>
                  <span>{project.risks}</span>
                </div>
              )}
            </div>

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="px-6 py-3 border-t border-white/10">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-[#BFA76A]/10 text-[#BFA76A] rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="px-6 py-4 border-t border-white/10 flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openViewModal(project)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:border-[#BFA76A] transition-colors"
              >
                <Eye size={16} />
                Voir
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openEditModal(project)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#BFA76A] text-black font-semibold rounded-lg hover:bg-[#D4AF37] transition-colors"
              >
                <Edit size={16} />
                Modifier
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
      )}

      {/* View Project Modal */}
      <AnimatePresence>
        {showViewModal && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowViewModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${statusConfig[selectedProject.status].bgColor}`} style={{ color: statusConfig[selectedProject.status].color }}>
                    {statusConfig[selectedProject.status].label}
                  </span>
                  <h2 className="text-2xl font-bold mt-2">{selectedProject.name}</h2>
                  <p className="text-gray-400">{selectedProject.client}</p>
                </div>
                <button onClick={() => setShowViewModal(false)} className="p-2 hover:bg-white/10 rounded-lg">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm text-gray-400 mb-2">Description</h3>
                  <p>{selectedProject.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                                                  {/* Champ d'upload de fichier */}
                                                  <div>
                                                    <label className="block text-sm text-gray-400 mb-2">Joindre un fichier</label>
                                                    <input
                                                      type="file"
                                                      accept=".pdf,.doc,.docx,.png,.jpg"
                                                      onChange={e => setUploadedFile(e.target.files[0])}
                                                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                                                    />
                                                    {uploadedFile && (
                                                      <div className="mt-2 text-xs text-gray-400">Fichier sélectionné : {uploadedFile.name}</div>
                                                    )}
                                                    {uploadError && (
                                                      <div className="mt-2 text-xs text-red-400">{uploadError}</div>
                                                    )}
                                                  </div>
                                  {/* Champ d'upload de fichier */}
                                  <div>
                                    <label className="block text-sm text-gray-400 mb-2">Joindre un fichier</label>
                                    <input
                                      type="file"
                                      onChange={e => setUploadedFile(e.target.files[0])}
                                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                                    />
                                    {uploadedFile && (
                                      <div className="mt-2 text-xs text-gray-400">Fichier sélectionné : {uploadedFile.name}</div>
                                    )}
                                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h3 className="text-sm text-gray-400 mb-1">Budget</h3>
                    <p className="text-xl font-bold">CHF {selectedProject.budget.toLocaleString()}</p>
                    <p className="text-sm text-gray-400">Depense: CHF {selectedProject.spent.toLocaleString()} ({Math.round(selectedProject.spent / selectedProject.budget * 100)}%)</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h3 className="text-sm text-gray-400 mb-1">Progression</h3>
                    <p className="text-xl font-bold text-[#BFA76A]">{selectedProject.progress}%</p>
                    <div className="w-full h-2 bg-white/10 rounded-full mt-2">
                      <div className="h-full bg-[#BFA76A] rounded-full" style={{ width: `${selectedProject.progress}%` }} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm text-gray-400 mb-2">Date debut</h3>
                    <p className="flex items-center gap-2">
                      <Calendar size={16} className="text-[#BFA76A]" />
                      {new Date(selectedProject.startDate).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-400 mb-2">Date fin</h3>
                    <p className="flex items-center gap-2">
                      <Calendar size={16} className="text-[#BFA76A]" />
                      {new Date(selectedProject.endDate).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm text-gray-400 mb-2">Responsable</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#BFA76A] flex items-center justify-center text-black font-bold">
                      {selectedProject.manager.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span>{selectedProject.manager}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm text-gray-400 mb-2">Equipe ({selectedProject.team.length})</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.team.map(member => (
                      <div key={member} className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg">
                        <div className="w-6 h-6 rounded-full bg-[#BFA76A]/50 flex items-center justify-center text-xs font-bold">
                          {member.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm">{member}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      setShowViewModal(false);
                      openEditModal(selectedProject);
                    }}
                    className="flex-1 px-4 py-3 bg-[#BFA76A] text-black font-semibold rounded-lg hover:bg-[#D4AF37] flex items-center justify-center gap-2"
                  >
                    <Edit size={20} />
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDeleteProject(selectedProject.id)}
                    className="px-4 py-3 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/10 flex items-center gap-2"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Project Modal */}
      <AnimatePresence>
        {showEditModal && selectedProject && (
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
                <h2 className="text-2xl font-bold">Modifier Projet</h2>
                <button onClick={() => setShowEditModal(false)} className="p-2 hover:bg-white/10 rounded-lg">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Nom du projet *</label>
                  <input
                    type="text"
                    value={projectForm.name}
                    onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Description</label>
                  <textarea
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A] resize-none"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Client</label>
                    <select
                      value={projectForm.client}
                      onChange={(e) => setProjectForm({ ...projectForm, client: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                    >
                      {clients.map(client => (
                        <option key={client} value={client} className="bg-[#1A1A1A]">{client}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Responsable</label>
                    <select
                      value={projectForm.manager}
                      onChange={(e) => setProjectForm({ ...projectForm, manager: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                    >
                      {managers.map(manager => (
                        <option key={manager} value={manager} className="bg-[#1A1A1A]">{manager}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Statut</label>
                    <select
                      value={projectForm.status}
                      onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value })}
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
                      value={projectForm.priority}
                      onChange={(e) => setProjectForm({ ...projectForm, priority: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                    >
                      {Object.entries(priorityConfig).map(([key, config]) => (
                        <option key={key} value={key} className="bg-[#1A1A1A]">{config.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Budget (CHF)</label>
                  <input
                    type="number"
                    value={projectForm.budget}
                    onChange={(e) => setProjectForm({ ...projectForm, budget: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                    placeholder="100000"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Date debut</label>
                    <input
                      type="date"
                      value={projectForm.startDate}
                      onChange={(e) => setProjectForm({ ...projectForm, startDate: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Date fin</label>
                    <input
                      type="date"
                      value={projectForm.endDate}
                      onChange={(e) => setProjectForm({ ...projectForm, endDate: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                    />
                  </div>
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
                    {projectForm.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-[#BFA76A]/20 text-[#BFA76A] rounded-full text-sm flex items-center gap-2">
                        {tag}
                        <button onClick={() => removeTag(tag)} className="hover:text-red-400"><X size={14} /></button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => handleDeleteProject(selectedProject.id)}
                    className="px-4 py-3 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/10 flex items-center gap-2"
                  >
                    <Trash2 size={18} />
                  </button>
                  <button onClick={() => setShowEditModal(false)} className="flex-1 px-4 py-3 border border-white/10 rounded-lg hover:bg-white/5">
                    Annuler
                  </button>
                  <button onClick={handleUpdateProject} className="flex-1 px-4 py-3 bg-[#BFA76A] text-black font-semibold rounded-lg hover:bg-[#D4AF37] flex items-center justify-center gap-2">
                    <Save size={20} />
                    Sauvegarder
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Project Modal */}
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
                <h2 className="text-2xl font-bold">Nouveau Projet</h2>
                <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-white/10 rounded-lg">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Nom du projet *</label>
                  <input
                    type="text"
                    value={projectForm.name}
                    onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                    placeholder="Nom du projet"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Description</label>
                  <textarea
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A] resize-none"
                    rows={3}
                    placeholder="Description du projet..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Client</label>
                    <select
                      value={projectForm.client}
                      onChange={(e) => setProjectForm({ ...projectForm, client: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                    >
                      {clients.map(client => (
                        <option key={client} value={client} className="bg-[#1A1A1A]">{client}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Responsable</label>
                    <select
                      value={projectForm.manager}
                      onChange={(e) => setProjectForm({ ...projectForm, manager: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                    >
                      {managers.map(manager => (
                        <option key={manager} value={manager} className="bg-[#1A1A1A]">{manager}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Budget (CHF)</label>
                  <input
                    type="number"
                    value={projectForm.budget}
                    onChange={(e) => setProjectForm({ ...projectForm, budget: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                    placeholder="100000"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Date debut</label>
                    <input
                      type="date"
                      value={projectForm.startDate}
                      onChange={(e) => setProjectForm({ ...projectForm, startDate: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Date fin</label>
                    <input
                      type="date"
                      value={projectForm.endDate}
                      onChange={(e) => setProjectForm({ ...projectForm, endDate: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-3 border border-white/10 rounded-lg hover:bg-white/5">
                    Annuler
                  </button>
                  <button
                    onClick={handleAddProject}
                    className="flex-1 px-4 py-3 bg-[#BFA76A] text-black font-semibold rounded-lg hover:bg-[#D4AF37] flex items-center justify-center gap-2 disabled:opacity-60"
                    disabled={isUploading}
                  >
                    <Save size={20} />
                    {isUploading ? 'Envoi en cours...' : 'Créer'}
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

// À AJUSTER : Ajoutez la logique d'envoi du fichier dans handleAddProject si besoin d'upload côté serveur
export default PMOProjectsPage;
