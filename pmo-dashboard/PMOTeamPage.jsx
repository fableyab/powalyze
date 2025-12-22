import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Plus, Search, MoreHorizontal, Mail, Phone, Calendar,
  Briefcase, Star, Award, Clock, TrendingUp, Users, MapPin, Zap,
  ChevronRight, MessageCircle, Video, CheckCircle2, AlertCircle
} from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    name: "Marc Dubois",
    role: "Senior Project Manager",
    department: "PMO",
    email: "m.dubois@powalyze.com",
    phone: "+41 79 123 45 67",
    location: "Genève",
    avatar: "MD",
    status: "available",
    skills: ["PMO", "Agile", "SAP", "Azure"],
    activeProjects: 3,
    completedProjects: 12,
    utilization: 85,
    performance: 94,
    joinDate: "2022-03-15",
    bio: "15 ans d'expérience en gestion de projets IT, certifié PMP et SAFe."
  },
  {
    id: 2,
    name: "Sophie Laurent",
    role: "Data Analyst Lead",
    department: "Data & BI",
    email: "s.laurent@powalyze.com",
    phone: "+41 79 234 56 78",
    location: "Lausanne",
    avatar: "SL",
    status: "busy",
    skills: ["Power BI", "Python", "SQL", "Azure Synapse"],
    activeProjects: 2,
    completedProjects: 8,
    utilization: 92,
    performance: 98,
    joinDate: "2021-09-01",
    bio: "Experte en analytics et visualisation de données, spécialiste Power BI."
  },
  {
    id: 3,
    name: "Jean Petit",
    role: "Technical Architect",
    department: "IT Infrastructure",
    email: "j.petit@powalyze.com",
    phone: "+41 79 345 67 89",
    location: "Genève",
    avatar: "JP",
    status: "available",
    skills: ["Azure", "AWS", "DevOps", "Kubernetes"],
    activeProjects: 2,
    completedProjects: 15,
    utilization: 78,
    performance: 91,
    joinDate: "2020-06-01",
    bio: "Architecte cloud certifié Azure Solutions Architect Expert."
  },
  {
    id: 4,
    name: "Anna Martin",
    role: "Business Analyst",
    department: "PMO",
    email: "a.martin@powalyze.com",
    phone: "+41 79 456 78 90",
    location: "Zürich",
    avatar: "AM",
    status: "away",
    skills: ["BPMN", "Requirements", "Agile", "JIRA"],
    activeProjects: 2,
    completedProjects: 6,
    utilization: 70,
    performance: 89,
    joinDate: "2023-01-15",
    bio: "Analyste métier spécialisée dans la transformation digitale."
  },
  {
    id: 5,
    name: "Pierre Keller",
    role: "Data Engineer",
    department: "Data & BI",
    email: "p.keller@powalyze.com",
    phone: "+41 79 567 89 01",
    location: "Genève",
    avatar: "PK",
    status: "available",
    skills: ["Azure Data Factory", "Databricks", "Python", "Spark"],
    activeProjects: 1,
    completedProjects: 4,
    utilization: 65,
    performance: 95,
    joinDate: "2023-06-01",
    bio: "Ingénieur data spécialisé dans les pipelines ETL et Data Lakes."
  },
  {
    id: 6,
    name: "Luc Bernard",
    role: "DevOps Engineer",
    department: "IT Infrastructure",
    email: "l.bernard@powalyze.com",
    phone: "+41 79 678 90 12",
    location: "Lausanne",
    avatar: "LB",
    status: "busy",
    skills: ["CI/CD", "Terraform", "Docker", "GitLab"],
    activeProjects: 2,
    completedProjects: 7,
    utilization: 88,
    performance: 92,
    joinDate: "2022-11-01",
    bio: "Expert DevOps et automatisation, spécialiste Infrastructure as Code."
  },
  {
    id: 7,
    name: "Claire Fischer",
    role: "Scrum Master",
    department: "PMO",
    email: "c.fischer@powalyze.com",
    phone: "+41 79 789 01 23",
    location: "Genève",
    avatar: "CF",
    status: "available",
    skills: ["Scrum", "Kanban", "SAFe", "Coaching"],
    activeProjects: 3,
    completedProjects: 9,
    utilization: 82,
    performance: 96,
    joinDate: "2021-04-01",
    bio: "Scrum Master certifiée PSM II, coach agile pour équipes distribuées."
  },
  {
    id: 8,
    name: "Thomas Weber",
    role: "Security Consultant",
    department: "Security",
    email: "t.weber@powalyze.com",
    phone: "+41 79 890 12 34",
    location: "Zürich",
    avatar: "TW",
    status: "away",
    skills: ["Cybersecurity", "Audit", "ISO 27001", "Pentest"],
    activeProjects: 1,
    completedProjects: 5,
    utilization: 55,
    performance: 93,
    joinDate: "2022-08-15",
    bio: "Consultant cybersécurité, certifié CISSP et ISO 27001 Lead Auditor."
  }
];

const StatusIndicator = ({ status }) => {
  const colors = {
    available: 'bg-green-500',
    busy: 'bg-red-500',
    away: 'bg-yellow-500'
  };
  const labels = {
    available: 'Disponible',
    busy: 'Occupé',
    away: 'Absent'
  };
  return (
    <div className="flex items-center gap-2">
      <div className={`w-2.5 h-2.5 rounded-full ${colors[status]} animate-pulse`} />
      <span className="text-xs text-gray-400">{labels[status]}</span>
    </div>
  );
};

const ProgressCircle = ({ value, size = 48, label }) => (
  <div className="relative" style={{ width: size, height: size }}>
    <svg className="w-full h-full transform -rotate-90">
      <circle
        cx={size/2}
        cy={size/2}
        r={(size-8)/2}
        strokeWidth="4"
        stroke="#333"
        fill="none"
      />
      <circle
        cx={size/2}
        cy={size/2}
        r={(size-8)/2}
        strokeWidth="4"
        stroke={value >= 80 ? '#22c55e' : value >= 50 ? '#3b82f6' : '#f59e0b'}
        fill="none"
        strokeDasharray={`${(value / 100) * Math.PI * (size-8)} ${Math.PI * (size-8)}`}
        strokeLinecap="round"
      />
    </svg>
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="text-xs font-bold">{value}%</span>
    </div>
  </div>
);

const TeamPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [selectedMember, setSelectedMember] = useState(null);

  const departments = [...new Set(teamMembers.map(m => m.department))];

  const filteredMembers = teamMembers.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = departmentFilter === 'all' || m.department === departmentFilter;
    return matchesSearch && matchesDept;
  });

  const stats = {
    total: teamMembers.length,
    available: teamMembers.filter(m => m.status === 'available').length,
    avgUtilization: Math.round(teamMembers.reduce((sum, m) => sum + m.utilization, 0) / teamMembers.length),
    totalProjects: teamMembers.reduce((sum, m) => sum + m.activeProjects, 0)
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link to="/pmo-workspace" className="flex items-center gap-2 text-gray-400 hover:text-white">
                <ArrowLeft size={20} />
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#BFA76A] to-[#D4AF37] flex items-center justify-center font-black text-black">
                  <Users size={20} />
                </div>
                <div>
                  <div className="font-bold text-white">Équipe</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest">Gestion des ressources</div>
                </div>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] text-black text-sm font-bold hover:opacity-90">
              <Plus size={16} />
              Ajouter Membre
            </button>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-[#111] rounded-xl p-5 border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <Users size={20} className="text-[#BFA76A]" />
                <span className="text-2xl font-bold">{stats.total}</span>
              </div>
              <div className="text-xs text-gray-500">Membres Total</div>
            </div>
            <div className="bg-[#111] rounded-xl p-5 border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle2 size={20} className="text-green-400" />
                <span className="text-2xl font-bold">{stats.available}</span>
              </div>
              <div className="text-xs text-gray-500">Disponibles</div>
            </div>
            <div className="bg-[#111] rounded-xl p-5 border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp size={20} className="text-blue-400" />
                <span className="text-2xl font-bold">{stats.avgUtilization}%</span>
              </div>
              <div className="text-xs text-gray-500">Utilisation Moy.</div>
            </div>
            <div className="bg-[#111] rounded-xl p-5 border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <Briefcase size={20} className="text-purple-400" />
                <span className="text-2xl font-bold">{stats.totalProjects}</span>
              </div>
              <div className="text-xs text-gray-500">Projets Actifs</div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center justify-between mb-6 bg-[#111] rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Rechercher un membre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#BFA76A]/50 w-64"
                />
              </div>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none"
              >
                <option value="all">Tous les départements</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div className="text-sm text-gray-500">
              {filteredMembers.length} membre(s)
            </div>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMembers.map((member, idx) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setSelectedMember(member)}
                className="bg-[#111] rounded-xl border border-white/10 hover:border-[#BFA76A]/50 transition-all overflow-hidden cursor-pointer group"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#BFA76A] to-[#8B7355] flex items-center justify-center text-lg font-bold text-black">
                      {member.avatar}
                    </div>
                    <StatusIndicator status={member.status} />
                  </div>

                  <h3 className="font-bold text-white text-lg mb-1">{member.name}</h3>
                  <p className="text-sm text-[#BFA76A] mb-1">{member.role}</p>
                  <p className="text-xs text-gray-500 mb-4 flex items-center gap-1">
                    <MapPin size={12} /> {member.location} · {member.department}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {member.skills.slice(0, 3).map(skill => (
                      <span key={skill} className="px-2 py-1 bg-white/5 rounded text-[10px] text-gray-400">
                        {skill}
                      </span>
                    ))}
                    {member.skills.length > 3 && (
                      <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-gray-500">
                        +{member.skills.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/5 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-white">{member.utilization}%</div>
                      <div className="text-[10px] text-gray-500">Utilisation</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-white">{member.activeProjects}</div>
                      <div className="text-[10px] text-gray-500">Projets actifs</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 px-5 py-3 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-white">
                    <Mail size={14} />
                  </button>
                  <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-white">
                    <MessageCircle size={14} />
                  </button>
                  <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-white">
                    <Video size={14} />
                  </button>
                  <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-white">
                    <Calendar size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Member Detail Modal */}
          {selectedMember && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
              onClick={() => setSelectedMember(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-[#111] rounded-2xl border border-white/10 max-w-2xl w-full overflow-hidden"
                onClick={e => e.stopPropagation()}
              >
                <div className="p-8">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#BFA76A] to-[#8B7355] flex items-center justify-center text-2xl font-bold text-black">
                      {selectedMember.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h2 className="text-2xl font-bold">{selectedMember.name}</h2>
                        <StatusIndicator status={selectedMember.status} />
                      </div>
                      <p className="text-[#BFA76A] mb-1">{selectedMember.role}</p>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <MapPin size={14} /> {selectedMember.location} · {selectedMember.department}
                      </p>
                    </div>
                    <button className="text-gray-500 hover:text-white" onClick={() => setSelectedMember(null)}>✕</button>
                  </div>

                  <p className="text-gray-400 mb-6">{selectedMember.bio}</p>

                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-white/5 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-[#BFA76A]">{selectedMember.utilization}%</div>
                      <div className="text-xs text-gray-500">Utilisation</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-green-400">{selectedMember.performance}%</div>
                      <div className="text-xs text-gray-500">Performance</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-blue-400">{selectedMember.activeProjects}</div>
                      <div className="text-xs text-gray-500">Projets actifs</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-purple-400">{selectedMember.completedProjects}</div>
                      <div className="text-xs text-gray-500">Terminés</div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-gray-400 mb-3">Compétences</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.skills.map(skill => (
                        <span key={skill} className="px-3 py-1.5 bg-[#BFA76A]/20 text-[#BFA76A] rounded-lg text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <a href={`mailto:${selectedMember.email}`} className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                      <Mail size={16} /> Email
                    </a>
                    <a href={`tel:${selectedMember.phone}`} className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                      <Phone size={16} /> Appeler
                    </a>
                    <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] text-black rounded-xl font-bold">
                      <Calendar size={16} /> Planifier
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Demo Badge */}
      <div className="fixed bottom-6 right-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] rounded-full text-black text-sm font-bold shadow-lg">
          <Zap size={16} />
          Mode Démo Live
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
