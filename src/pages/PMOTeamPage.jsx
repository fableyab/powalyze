/**
 * PMO TEAM PAGE
 * ==============
 * 
 * Page de gestion des membres de l'équipe PMO.
 * Utilise PMODataContext pour les données (vierge par défaut).
 * 
 * FONCTIONNALITÉS:
 * - Liste des membres avec filtres
 * - Ajout/modification/suppression de membres
 * - Gestion des compétences et projets
 * - Indicateurs de disponibilité
 * 
 * @author POWALYZE
 * @version 2.0.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Plus, Search, Users, Mail, Phone, Calendar,
  Edit, Trash2, X, Save, Star, Award, Clock, MapPin,
  Briefcase, MoreHorizontal, Check, User, Filter, Play
} from 'lucide-react';
import { usePMOData } from '@/context/PMODataContext';

// Legacy data - non utilisé
const legacyTeamMembers = [
  {
    id: 1,
    name: "Marc Dubois",
    role: "Chef de Projet Senior",
    email: "marc.dubois@powalyze.com",
    phone: "+41 79 123 45 67",
    location: "Geneve",
    department: "PMO",
    avatar: "MD",
    skills: ["Agile", "PRINCE2", "Power BI", "SAP"],
    projects: ["Migration Cloud Azure", "Refonte ERP SAP"],
    availability: 85,
    status: "active",
    joinDate: "2022-03-15"
  },
  {
    id: 2,
    name: "Sophie Laurent",
    role: "Data Analyst",
    email: "sophie.laurent@powalyze.com",
    phone: "+41 79 234 56 78",
    location: "Lausanne",
    department: "Analytics",
    avatar: "SL",
    skills: ["Power BI", "Python", "SQL", "Azure"],
    projects: ["Dashboard Power BI Finance", "Data Lake Implementation"],
    availability: 60,
    status: "active",
    joinDate: "2023-01-10"
  },
  {
    id: 3,
    name: "Jean Petit",
    role: "Developpeur Full Stack",
    email: "jean.petit@powalyze.com",
    phone: "+41 79 345 67 89",
    location: "Zurich",
    department: "Tech",
    avatar: "JP",
    skills: ["React", "Node.js", "TypeScript", "AWS"],
    projects: ["Migration Cloud Azure"],
    availability: 100,
    status: "active",
    joinDate: "2023-06-20"
  },
  {
    id: 4,
    name: "Anna Martin",
    role: "Consultante SAP",
    email: "anna.martin@powalyze.com",
    phone: "+41 79 456 78 90",
    location: "Berne",
    department: "Consulting",
    avatar: "AM",
    skills: ["SAP S/4HANA", "SAP FI/CO", "ABAP"],
    projects: ["Refonte ERP SAP"],
    availability: 40,
    status: "busy",
    joinDate: "2022-09-01"
  },
  {
    id: 5,
    name: "Pierre Keller",
    role: "Architecte Cloud",
    email: "pierre.keller@powalyze.com",
    phone: "+41 79 567 89 01",
    location: "Geneve",
    department: "Tech",
    avatar: "PK",
    skills: ["Azure", "AWS", "Kubernetes", "Terraform"],
    projects: ["Migration Cloud Azure", "Data Lake Implementation"],
    availability: 75,
    status: "active",
    joinDate: "2023-02-28"
  }
];

const departments = ["PMO", "Analytics", "Tech", "Consulting", "Design", "Marketing"];
const roles = ["Chef de Projet Senior", "Data Analyst", "Developpeur Full Stack", "Consultante SAP", "Architecte Cloud", "Designer UX", "Product Owner"];
const locations = ["Geneve", "Lausanne", "Zurich", "Berne", "Bale"];

const PMOTeamPage = () => {
  // Utilisation du contexte PMO
  const { team: contextTeam, updateTeam, loadDemoData } = usePMOData();
  const [teamMembers, setTeamMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [notification, setNotification] = useState(null);

  // Synchroniser avec le contexte
  useEffect(() => {
    setTeamMembers(contextTeam);
  }, [contextTeam]);

  // Mettre à jour le contexte
  useEffect(() => {
    if (teamMembers.length > 0 || contextTeam.length > 0) {
      updateTeam(teamMembers);
    }
  }, [teamMembers]);
  const [viewMode, setViewMode] = useState('grid');

  // Form state
  const [memberForm, setMemberForm] = useState({
    name: '',
    role: 'Chef de Projet Senior',
    email: '',
    phone: '',
    location: 'Geneve',
    department: 'PMO',
    skills: [],
    availability: 100,
    status: 'active'
  });

  const [newSkill, setNewSkill] = useState('');

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Generate avatar from name
  const getAvatar = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Add new member
  const handleAddMember = () => {
    if (!memberForm.name || !memberForm.email) {
      showNotification('Veuillez remplir le nom et email', 'error');
      return;
    }

    const newMember = {
      ...memberForm,
      id: Date.now(),
      avatar: getAvatar(memberForm.name),
      projects: [],
      joinDate: new Date().toISOString().split('T')[0]
    };

    setTeamMembers([...teamMembers, newMember]);
    setShowAddModal(false);
    resetForm();
    showNotification('Membre ajoute avec succes!');
  };

  // Update member
  const handleUpdateMember = () => {
    if (!memberForm.name || !memberForm.email) {
      showNotification('Veuillez remplir le nom et email', 'error');
      return;
    }

    const updatedMembers = teamMembers.map(member =>
      member.id === selectedMember.id
        ? { ...member, ...memberForm, avatar: getAvatar(memberForm.name) }
        : member
    );

    setTeamMembers(updatedMembers);
    setShowEditModal(false);
    setSelectedMember(null);
    resetForm();
    showNotification('Membre mis a jour!');
  };

  // Delete member
  const handleDeleteMember = (memberId) => {
    setTeamMembers(teamMembers.filter(m => m.id !== memberId));
    setShowEditModal(false);
    setSelectedMember(null);
    showNotification('Membre supprime!');
  };

  // Reset form
  const resetForm = () => {
    setMemberForm({
      name: '',
      role: 'Chef de Projet Senior',
      email: '',
      phone: '',
      location: 'Geneve',
      department: 'PMO',
      skills: [],
      availability: 100,
      status: 'active'
    });
    setNewSkill('');
  };

  // Open edit modal
  const openEditModal = (member) => {
    setSelectedMember(member);
    setMemberForm({
      name: member.name,
      role: member.role,
      email: member.email,
      phone: member.phone || '',
      location: member.location,
      department: member.department,
      skills: member.skills || [],
      availability: member.availability,
      status: member.status
    });
    setShowEditModal(true);
  };

  // Add skill
  const addSkill = () => {
    if (newSkill && !memberForm.skills.includes(newSkill)) {
      setMemberForm({
        ...memberForm,
        skills: [...memberForm.skills, newSkill]
      });
      setNewSkill('');
    }
  };

  // Remove skill
  const removeSkill = (skill) => {
    setMemberForm({
      ...memberForm,
      skills: memberForm.skills.filter(s => s !== skill)
    });
  };

  // Filter members
  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || member.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  // Stats
  const stats = {
    total: teamMembers.length,
    active: teamMembers.filter(m => m.status === 'active').length,
    busy: teamMembers.filter(m => m.status === 'busy').length,
    avgAvailability: Math.round(teamMembers.reduce((acc, m) => acc + m.availability, 0) / teamMembers.length)
  };

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
            <h1 className="text-3xl font-bold">Equipe PMO</h1>
            <p className="text-gray-400">Gerez votre equipe et leurs competences</p>
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
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
          >
            <option value="all" className="bg-[#1A1A1A]">Tous les departements</option>
            {departments.map(dept => (
              <option key={dept} value={dept} className="bg-[#1A1A1A]">{dept}</option>
            ))}
          </select>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#BFA76A] text-black font-semibold rounded-lg hover:bg-[#D4AF37] transition-colors"
          >
            <Plus size={20} />
            Nouveau Membre
          </motion.button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-xl p-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#BFA76A]/20 rounded-lg">
              <Users className="text-[#BFA76A]" size={24} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Membres</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 border border-white/10 rounded-xl p-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <Check className="text-green-500" size={24} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Disponibles</p>
              <p className="text-2xl font-bold text-green-400">{stats.active}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-xl p-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-500/20 rounded-lg">
              <Clock className="text-orange-500" size={24} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Occupes</p>
              <p className="text-2xl font-bold text-orange-400">{stats.busy}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 border border-white/10 rounded-xl p-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Award className="text-blue-500" size={24} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Disponibilite Moy.</p>
              <p className="text-2xl font-bold text-blue-400">{stats.avgAvailability}%</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Empty State */}
      {teamMembers.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20"
        >
          <div className="w-24 h-24 rounded-full bg-[#BFA76A]/10 flex items-center justify-center mb-6">
            <Users className="text-[#BFA76A]" size={48} />
          </div>
          <h2 className="text-2xl font-bold mb-2">Aucun membre</h2>
          <p className="text-gray-400 mb-6 text-center max-w-md">
            Votre equipe est vide. Ajoutez votre premier membre ou chargez les donnees de demonstration.
          </p>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-[#BFA76A] text-black font-semibold rounded-lg hover:bg-[#D4AF37] transition-colors"
            >
              <Plus size={20} />
              Ajouter un membre
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

      {/* Team Grid */}
      {teamMembers.length > 0 && (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member, idx) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[#BFA76A]/50 transition-all cursor-pointer"
            onClick={() => openEditModal(member)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#BFA76A] to-[#D4AF37] flex items-center justify-center text-black font-bold text-lg">
                  {member.avatar || member.name?.split(' ').map(n => n[0]).join('') || 'U'}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-gray-400 text-sm">{member.role}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                member.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'
              }`}>
                {member.status === 'active' ? 'Disponible' : 'Occupe'}
              </span>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <Mail size={16} />
                <span className="truncate">{member.email}</span>
              </div>
              {member.phone && (
                <div className="flex items-center gap-2 text-gray-400">
                  <Phone size={16} />
                  <span>{member.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin size={16} />
                <span>{member.location || 'Non specifie'}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Briefcase size={16} />
                <span>{member.department}</span>
              </div>
            </div>

            {/* Availability Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Disponibilite</span>
                <span className="text-[#BFA76A] font-semibold">{member.availability}%</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${member.availability}%` }}
                  transition={{ duration: 1, delay: idx * 0.1 }}
                  className={`h-full rounded-full ${
                    member.availability >= 70 ? 'bg-green-500' :
                    member.availability >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                />
              </div>
            </div>

            {/* Skills */}
            {member.skills && member.skills.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {member.skills.slice(0, 4).map(skill => (
                  <span key={skill} className="px-2 py-1 bg-[#BFA76A]/10 text-[#BFA76A] rounded text-xs">
                    {skill}
                  </span>
                ))}
                {member.skills.length > 4 && (
                  <span className="px-2 py-1 bg-white/10 text-gray-400 rounded text-xs">
                    +{member.skills.length - 4}
                  </span>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>
      )}

      {/* Add Member Modal */}
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
                <h2 className="text-2xl font-bold">Nouveau Membre</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Nom complet *</label>
                  <input
                    type="text"
                    value={memberForm.name}
                    onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                    placeholder="Prenom Nom"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email *</label>
                  <input
                    type="email"
                    value={memberForm.email}
                    onChange={(e) => setMemberForm({ ...memberForm, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                    placeholder="email@powalyze.com"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Telephone</label>
                  <input
                    type="tel"
                    value={memberForm.phone}
                    onChange={(e) => setMemberForm({ ...memberForm, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                    placeholder="+41 79 000 00 00"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Role</label>
                    <select
                      value={memberForm.role}
                      onChange={(e) => setMemberForm({ ...memberForm, role: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                    >
                      {roles.map(role => (
                        <option key={role} value={role} className="bg-[#1A1A1A]">{role}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Departement</label>
                    <select
                      value={memberForm.department}
                      onChange={(e) => setMemberForm({ ...memberForm, department: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                    >
                      {departments.map(dept => (
                        <option key={dept} value={dept} className="bg-[#1A1A1A]">{dept}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Localisation</label>
                  <select
                    value={memberForm.location}
                    onChange={(e) => setMemberForm({ ...memberForm, location: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                  >
                    {locations.map(loc => (
                      <option key={loc} value={loc} className="bg-[#1A1A1A]">{loc}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Disponibilite (%)</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={memberForm.availability}
                    onChange={(e) => setMemberForm({ ...memberForm, availability: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>0%</span>
                    <span className="text-[#BFA76A] font-bold">{memberForm.availability}%</span>
                    <span>100%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Competences</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                      className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                      placeholder="Ajouter une competence..."
                    />
                    <button
                      onClick={addSkill}
                      className="px-4 py-2 bg-[#BFA76A] text-black rounded-lg hover:bg-[#D4AF37] transition-colors"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {memberForm.skills.map(skill => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-[#BFA76A]/20 text-[#BFA76A] rounded-full text-sm flex items-center gap-2"
                      >
                        {skill}
                        <button onClick={() => removeSkill(skill)} className="hover:text-red-400">
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-3 border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleAddMember}
                    className="flex-1 px-4 py-3 bg-[#BFA76A] text-black font-semibold rounded-lg hover:bg-[#D4AF37] transition-colors flex items-center justify-center gap-2"
                  >
                    <Save size={20} />
                    Ajouter
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Member Modal */}
      <AnimatePresence>
        {showEditModal && selectedMember && (
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
                <h2 className="text-2xl font-bold">Modifier Membre</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Nom complet *</label>
                  <input
                    type="text"
                    value={memberForm.name}
                    onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email *</label>
                  <input
                    type="email"
                    value={memberForm.email}
                    onChange={(e) => setMemberForm({ ...memberForm, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Telephone</label>
                  <input
                    type="tel"
                    value={memberForm.phone}
                    onChange={(e) => setMemberForm({ ...memberForm, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Role</label>
                    <select
                      value={memberForm.role}
                      onChange={(e) => setMemberForm({ ...memberForm, role: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                    >
                      {roles.map(role => (
                        <option key={role} value={role} className="bg-[#1A1A1A]">{role}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Departement</label>
                    <select
                      value={memberForm.department}
                      onChange={(e) => setMemberForm({ ...memberForm, department: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                    >
                      {departments.map(dept => (
                        <option key={dept} value={dept} className="bg-[#1A1A1A]">{dept}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Localisation</label>
                  <select
                    value={memberForm.location}
                    onChange={(e) => setMemberForm({ ...memberForm, location: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                  >
                    {locations.map(loc => (
                      <option key={loc} value={loc} className="bg-[#1A1A1A]">{loc}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Statut</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        value="active"
                        checked={memberForm.status === 'active'}
                        onChange={(e) => setMemberForm({ ...memberForm, status: e.target.value })}
                        className="w-4 h-4"
                      />
                      <span className="text-green-400">Disponible</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        value="busy"
                        checked={memberForm.status === 'busy'}
                        onChange={(e) => setMemberForm({ ...memberForm, status: e.target.value })}
                        className="w-4 h-4"
                      />
                      <span className="text-orange-400">Occupe</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Disponibilite (%)</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={memberForm.availability}
                    onChange={(e) => setMemberForm({ ...memberForm, availability: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>0%</span>
                    <span className="text-[#BFA76A] font-bold">{memberForm.availability}%</span>
                    <span>100%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Competences</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                      className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
                      placeholder="Ajouter une competence..."
                    />
                    <button
                      onClick={addSkill}
                      className="px-4 py-2 bg-[#BFA76A] text-black rounded-lg hover:bg-[#D4AF37] transition-colors"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {memberForm.skills.map(skill => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-[#BFA76A]/20 text-[#BFA76A] rounded-full text-sm flex items-center gap-2"
                      >
                        {skill}
                        <button onClick={() => removeSkill(skill)} className="hover:text-red-400">
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => handleDeleteMember(selectedMember.id)}
                    className="px-4 py-3 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors flex items-center gap-2"
                  >
                    <Trash2 size={18} />
                  </button>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 px-4 py-3 border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleUpdateMember}
                    className="flex-1 px-4 py-3 bg-[#BFA76A] text-black font-semibold rounded-lg hover:bg-[#D4AF37] transition-colors flex items-center justify-center gap-2"
                  >
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

export default PMOTeamPage;
