import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Download, Share2, FileText, TrendingUp, TrendingDown,
  DollarSign, Users, Calendar, Target, AlertTriangle, CheckCircle,
  BarChart3, PieChart, Activity, Clock, Filter, Printer, Mail,
  Copy, Check, X, Linkedin, Twitter
} from 'lucide-react';

const PMOReportsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [showShareModal, setShowShareModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [notification, setNotification] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  const reportRef = useRef(null);

  // KPI Data
  const kpis = {
    revenue: { value: 2450000, change: 12.5, label: 'Revenus CHF' },
    projects: { value: 8, change: 2, label: 'Projets Actifs' },
    completion: { value: 87, change: 5, label: 'Taux Completion' },
    budget: { value: 94, change: -2, label: 'Budget Utilise' }
  };

  // Project data
  const projectStats = [
    { name: 'Migration Cloud Azure', progress: 75, budget: 450000, spent: 337500, status: 'on-track' },
    { name: 'Dashboard Power BI Finance', progress: 60, budget: 85000, spent: 51000, status: 'on-track' },
    { name: 'Refonte ERP SAP', progress: 45, budget: 890000, spent: 400500, status: 'at-risk' },
    { name: 'Data Lake Implementation', progress: 30, budget: 320000, spent: 96000, status: 'on-track' },
    { name: 'Portail Client NextGen', progress: 85, budget: 125000, spent: 106250, status: 'on-track' }
  ];

  // Team performance
  const teamPerformance = [
    { name: 'Marc Dubois', tasks: 24, completed: 22, efficiency: 92 },
    { name: 'Sophie Laurent', tasks: 18, completed: 17, efficiency: 94 },
    { name: 'Jean Petit', tasks: 21, completed: 19, efficiency: 90 },
    { name: 'Anna Martin', tasks: 15, completed: 14, efficiency: 93 },
    { name: 'Pierre Keller', tasks: 20, completed: 18, efficiency: 90 }
  ];

  // Risk indicators
  const risks = [
    { id: 1, title: 'Retard livraison SAP', level: 'high', project: 'Refonte ERP SAP', impact: 'Budget +15%' },
    { id: 2, title: 'Ressource indisponible', level: 'medium', project: 'Migration Cloud Azure', impact: 'Delai +1 sem' },
    { id: 3, title: 'Changement scope', level: 'low', project: 'Dashboard Power BI', impact: 'Mineur' }
  ];

  // Monthly revenue data for chart
  const monthlyData = [
    { month: 'Jan', revenue: 180000, target: 200000 },
    { month: 'Fev', revenue: 220000, target: 200000 },
    { month: 'Mar', revenue: 195000, target: 210000 },
    { month: 'Avr', revenue: 240000, target: 220000 },
    { month: 'Mai', revenue: 210000, target: 230000 },
    { month: 'Juin', revenue: 280000, target: 250000 }
  ];

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Export to PDF
  const handleExportPDF = async () => {
    setIsExporting(true);
    
    // Simulate PDF generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create a simple text-based report for download
    const reportContent = `
RAPPORT PMO - POWALYZE
======================
Date: ${new Date().toLocaleDateString('fr-FR')}
Periode: ${selectedPeriod === 'month' ? 'Mensuel' : selectedPeriod === 'quarter' ? 'Trimestriel' : 'Annuel'}

INDICATEURS CLES
----------------
Revenus: CHF ${kpis.revenue.value.toLocaleString()} (${kpis.revenue.change > 0 ? '+' : ''}${kpis.revenue.change}%)
Projets Actifs: ${kpis.projects.value}
Taux de Completion: ${kpis.completion.value}%
Budget Utilise: ${kpis.budget.value}%

PROJETS EN COURS
----------------
${projectStats.map(p => `- ${p.name}: ${p.progress}% complete, Budget: CHF ${p.budget.toLocaleString()}`).join('\n')}

PERFORMANCE EQUIPE
------------------
${teamPerformance.map(t => `- ${t.name}: ${t.completed}/${t.tasks} taches (${t.efficiency}% efficacite)`).join('\n')}

RISQUES IDENTIFIES
------------------
${risks.map(r => `- [${r.level.toUpperCase()}] ${r.title} - ${r.project}`).join('\n')}

---
Rapport genere automatiquement par Powalyze PMO
https://powalyze.com
    `;

    // Create and download file
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rapport-pmo-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    setIsExporting(false);
    setShowExportModal(false);
    showNotification('Rapport exporte avec succes!');
  };

  // Print report
  const handlePrint = () => {
    window.print();
    showNotification('Impression lancee!');
  };

  // Share functions
  const handleShare = (method) => {
    const reportUrl = window.location.href;
    const reportTitle = 'Rapport PMO - Powalyze';
    const reportText = `Consultez le rapport PMO: Revenus CHF ${kpis.revenue.value.toLocaleString()}, ${kpis.projects.value} projets actifs, ${kpis.completion.value}% de completion.`;

    switch (method) {
      case 'copy':
        navigator.clipboard.writeText(reportUrl);
        showNotification('Lien copie dans le presse-papier!');
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(reportTitle)}&body=${encodeURIComponent(reportText + '\n\n' + reportUrl)}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(reportUrl)}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(reportText)}&url=${encodeURIComponent(reportUrl)}`);
        break;
    }
    setShowShareModal(false);
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
            className="fixed top-6 right-6 z-50 px-6 py-3 rounded-lg shadow-lg bg-green-500"
          >
            <div className="flex items-center gap-2">
              <Check size={20} />
              <span>{notification.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8" ref={reportRef}>
        <div className="flex items-center gap-4">
          <Link to="/pmo-workspace" className="p-2 hover:bg-white/10 rounded-lg transition-colors print:hidden">
            <ArrowLeft className="text-[#BFA76A]" size={24} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Rapports PMO</h1>
            <p className="text-gray-400">Analyse et KPIs de votre portefeuille</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 print:hidden">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#BFA76A]"
          >
            <option value="month" className="bg-[#1A1A1A]">Ce mois</option>
            <option value="quarter" className="bg-[#1A1A1A]">Ce trimestre</option>
            <option value="year" className="bg-[#1A1A1A]">Cette annee</option>
          </select>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowShareModal(true)}
            className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
          >
            <Share2 size={18} />
            Partager
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowExportModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#BFA76A] text-black font-semibold rounded-lg hover:bg-[#D4AF37] transition-colors"
          >
            <Download size={18} />
            Exporter
          </motion.button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-[#BFA76A]/20 rounded-lg">
              <DollarSign className="text-[#BFA76A]" size={24} />
            </div>
            <span className={`flex items-center gap-1 text-sm ${kpis.revenue.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {kpis.revenue.change > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              {kpis.revenue.change}%
            </span>
          </div>
          <p className="text-gray-400 text-sm">{kpis.revenue.label}</p>
          <p className="text-2xl font-bold">CHF {(kpis.revenue.value / 1000000).toFixed(2)}M</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 border border-white/10 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Target className="text-blue-500" size={24} />
            </div>
            <span className="flex items-center gap-1 text-sm text-green-400">
              <TrendingUp size={16} />
              +{kpis.projects.change}
            </span>
          </div>
          <p className="text-gray-400 text-sm">{kpis.projects.label}</p>
          <p className="text-2xl font-bold">{kpis.projects.value}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <CheckCircle className="text-green-500" size={24} />
            </div>
            <span className="flex items-center gap-1 text-sm text-green-400">
              <TrendingUp size={16} />
              +{kpis.completion.change}%
            </span>
          </div>
          <p className="text-gray-400 text-sm">{kpis.completion.label}</p>
          <p className="text-2xl font-bold">{kpis.completion.value}%</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 border border-white/10 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <Activity className="text-purple-500" size={24} />
            </div>
            <span className={`flex items-center gap-1 text-sm ${kpis.budget.change < 0 ? 'text-green-400' : 'text-orange-400'}`}>
              {kpis.budget.change < 0 ? <TrendingDown size={16} /> : <TrendingUp size={16} />}
              {kpis.budget.change}%
            </span>
          </div>
          <p className="text-gray-400 text-sm">{kpis.budget.label}</p>
          <p className="text-2xl font-bold">{kpis.budget.value}%</p>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-xl p-6"
        >
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <BarChart3 className="text-[#BFA76A]" size={24} />
            Revenus vs Objectifs
          </h3>
          <div className="space-y-4">
            {monthlyData.map((data, idx) => (
              <div key={data.month} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{data.month}</span>
                  <span className="text-gray-400">CHF {(data.revenue / 1000).toFixed(0)}K / {(data.target / 1000).toFixed(0)}K</span>
                </div>
                <div className="relative h-6 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(data.target / 300000) * 100}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                    className="absolute h-full bg-gray-600 rounded-full"
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(data.revenue / 300000) * 100}%` }}
                    transition={{ duration: 1, delay: idx * 0.1 }}
                    className={`absolute h-full rounded-full ${data.revenue >= data.target ? 'bg-[#BFA76A]' : 'bg-blue-500'}`}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#BFA76A]" />
              <span>Realise</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-600" />
              <span>Objectif</span>
            </div>
          </div>
        </motion.div>

        {/* Project Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 border border-white/10 rounded-xl p-6"
        >
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <PieChart className="text-[#BFA76A]" size={24} />
            Avancement Projets
          </h3>
          <div className="space-y-4">
            {projectStats.map((project, idx) => (
              <div key={project.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="truncate flex-1">{project.name}</span>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      project.status === 'on-track' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'
                    }`}>
                      {project.status === 'on-track' ? 'En ligne' : 'A risque'}
                    </span>
                    <span className="text-[#BFA76A] font-semibold">{project.progress}%</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 1, delay: idx * 0.1 }}
                    className={`h-full rounded-full ${
                      project.status === 'on-track' ? 'bg-[#BFA76A]' : 'bg-orange-500'
                    }`}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Budget: CHF {(project.budget / 1000).toFixed(0)}K</span>
                  <span>Depense: CHF {(project.spent / 1000).toFixed(0)}K ({Math.round(project.spent / project.budget * 100)}%)</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Team & Risks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-xl p-6"
        >
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Users className="text-[#BFA76A]" size={24} />
            Performance Equipe
          </h3>
          <div className="space-y-4">
            {teamPerformance.map((member, idx) => (
              <div key={member.name} className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#BFA76A] to-[#D4AF37] flex items-center justify-center text-black font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-semibold">{member.name}</span>
                    <span className="text-[#BFA76A]">{member.efficiency}%</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>{member.completed}/{member.tasks} taches</span>
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${member.efficiency}%` }}
                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                        className="h-full bg-[#BFA76A] rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Risks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 border border-white/10 rounded-xl p-6"
        >
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <AlertTriangle className="text-[#BFA76A]" size={24} />
            Risques Identifies
          </h3>
          <div className="space-y-4">
            {risks.map(risk => (
              <div key={risk.id} className="p-4 bg-white/5 rounded-lg border-l-4" style={{
                borderColor: risk.level === 'high' ? '#ef4444' : risk.level === 'medium' ? '#f59e0b' : '#22c55e'
              }}>
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold">{risk.title}</h4>
                    <p className="text-sm text-gray-400">{risk.project}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    risk.level === 'high' ? 'bg-red-500/20 text-red-400' :
                    risk.level === 'medium' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {risk.level === 'high' ? 'Eleve' : risk.level === 'medium' ? 'Moyen' : 'Faible'}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mt-2">Impact: {risk.impact}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Partager le rapport</h2>
                <button onClick={() => setShowShareModal(false)} className="p-2 hover:bg-white/10 rounded-lg">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => handleShare('copy')}
                  className="w-full flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-[#BFA76A] transition-colors"
                >
                  <div className="p-3 bg-[#BFA76A]/20 rounded-lg">
                    <Copy className="text-[#BFA76A]" size={24} />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">Copier le lien</p>
                    <p className="text-sm text-gray-400">Partager via le presse-papier</p>
                  </div>
                </button>

                <button
                  onClick={() => handleShare('email')}
                  className="w-full flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-[#BFA76A] transition-colors"
                >
                  <div className="p-3 bg-blue-500/20 rounded-lg">
                    <Mail className="text-blue-500" size={24} />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">Email</p>
                    <p className="text-sm text-gray-400">Envoyer par email</p>
                  </div>
                </button>

                <button
                  onClick={() => handleShare('linkedin')}
                  className="w-full flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-[#BFA76A] transition-colors"
                >
                  <div className="p-3 bg-[#0077b5]/20 rounded-lg">
                    <Linkedin className="text-[#0077b5]" size={24} />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">LinkedIn</p>
                    <p className="text-sm text-gray-400">Partager sur LinkedIn</p>
                  </div>
                </button>

                <button
                  onClick={() => handleShare('twitter')}
                  className="w-full flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-[#BFA76A] transition-colors"
                >
                  <div className="p-3 bg-[#1da1f2]/20 rounded-lg">
                    <Twitter className="text-[#1da1f2]" size={24} />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">Twitter</p>
                    <p className="text-sm text-gray-400">Partager sur Twitter</p>
                  </div>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Export Modal */}
      <AnimatePresence>
        {showExportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowExportModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Exporter le rapport</h2>
                <button onClick={() => setShowExportModal(false)} className="p-2 hover:bg-white/10 rounded-lg">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleExportPDF}
                  disabled={isExporting}
                  className="w-full flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-[#BFA76A] transition-colors disabled:opacity-50"
                >
                  <div className="p-3 bg-red-500/20 rounded-lg">
                    <FileText className="text-red-500" size={24} />
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-semibold">Exporter en PDF</p>
                    <p className="text-sm text-gray-400">Telecharger le rapport complet</p>
                  </div>
                  {isExporting && (
                    <div className="animate-spin w-5 h-5 border-2 border-[#BFA76A] border-t-transparent rounded-full" />
                  )}
                </button>

                <button
                  onClick={handlePrint}
                  className="w-full flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-[#BFA76A] transition-colors"
                >
                  <div className="p-3 bg-purple-500/20 rounded-lg">
                    <Printer className="text-purple-500" size={24} />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">Imprimer</p>
                    <p className="text-sm text-gray-400">Lancer l'impression</p>
                  </div>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PMOReportsPage;
