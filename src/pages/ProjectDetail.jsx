
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  DollarSign, 
  Target, 
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  MessageSquare,
  History,
  Printer 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { exportToPDF, exportToPPTX, exportToExcel } from '@/lib/exportUtils';
import { initiativeService } from '@/lib/initiativeService';
import customSupabaseClient from '@/lib/customSupabaseClient';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const ProjectDetail = ({ language }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for burnup/burndown since we might not have it in DB yet
  const chartData = [
    { week: 'W1', planned: 10, actual: 12 },
    { week: 'W2', planned: 25, actual: 22 },
    { week: 'W3', planned: 40, actual: 35 },
    { week: 'W4', planned: 55, actual: 48 },
    { week: 'W5', planned: 70, actual: 65 },
    { week: 'W6', planned: 85, actual: 90 },
    { week: 'W7', planned: 100, actual: null },
  ];

  useEffect(() => {
    const fetchProject = async () => {
      try {
        console.log('🔍 Chargement projet:', id);
        
        // Récupérer l'initiative directement depuis Supabase
        const { data, error } = await customSupabaseClient
          .from('initiatives')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) {
          console.error('❌ Erreur Supabase:', error);
          throw error;
        }

        if (!data) {
          console.error('❌ Projet introuvable');
          setError('Projet introuvable');
          return;
        }

        console.log('✅ Projet chargé:', data);
        
        // Mapper les données au format attendu
        setProject({
          id: data.id,
          name: data.name,
          description: data.description || '',
          progress: data.progress || 0,
          budget_actual: data.budget || 0,
          budget_planned: data.budget || 0,
          start_date: data.start_date,
          end_date: data.end_date,
          status: data.status || 'planned',
          priority: data.priority || 'medium',
          health: data.status === 'at_risk' ? 'RED' : data.status === 'in_progress' ? 'AMBER' : 'GREEN',
          risks: [],
          decisions: [],
          documents: [],
          comments: []
        });
        
      } catch (error) {
        console.error('❌ Error loading project:', error);
        setError(error.message || 'Erreur lors du chargement du projet');
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchProject();
    }
  }, [id]);


  const handleExport = (type) => {
    if (type === 'pdf') exportToPDF('project-report');
    if (type === 'pptx') exportToPPTX(project, "Project is progressing well with slight deviation in timeline.");
    if (type === 'excel') exportToExcel([{ name: 'Project Data', data: [project] }]);
  };

  const getStatusColor = (status) => {
    const colors = {
      'NOT_STARTED': 'bg-slate-500',
      'IN_PROGRESS': 'bg-blue-500',
      'AT_RISK': 'bg-amber-500',
      'BLOCKED': 'bg-red-500',
      'DONE': 'bg-green-500'
    };
    return colors[status] || 'bg-slate-500';
  };

  const getHealthColor = (health) => {
    const colors = {
      'GREEN': 'text-green-500',
      'AMBER': 'text-amber-500',
      'RED': 'text-red-500'
    };
    return colors[health] || 'text-slate-500';
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Target },
    { id: 'risks', label: 'Risques', icon: AlertTriangle },
    { id: 'decisions', label: 'Décisions', icon: CheckCircle },
    { id: 'actions', label: 'Actions', icon: Clock },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'history', label: 'Historique', icon: History }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A1A2F] flex items-center justify-center">
        <div className="text-[#D4AF37]">Chargement des données du projet...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0A1A2F] p-6">
        <Link to="/app/portfolio" className="inline-flex items-center text-slate-400 hover:text-[#D4AF37] mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Retour au portfolio
        </Link>
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 mt-4">
          <div className="flex items-center gap-3 text-red-400">
            <AlertTriangle className="w-5 h-5" />
            <div>
              <div className="font-semibold">Erreur</div>
              <div className="text-sm">{error}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0A1A2F] p-6">
        <Link to="/app/portfolio" className="inline-flex items-center text-slate-400 hover:text-[#D4AF37] mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Retour au portfolio
        </Link>
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6 mt-4">
          <div className="flex items-center gap-3 text-amber-400">
            <AlertTriangle className="w-5 h-5" />
            <div>
              <div className="font-semibold">Projet introuvable</div>
              <div className="text-sm">Le projet demandé n'existe pas ou a été supprimé.</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-[#0A1A2F] min-h-screen p-6" id="project-report">
      <Link to="/app/portfolio" className="inline-flex items-center text-slate-400 hover:text-[#D4AF37] mb-4 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Retour au portfolio
      </Link>

      {/* Header with Project Info */}
      <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-[#D4AF37]">{project.name}</h1>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
              <span className={`text-2xl ${getHealthColor(project.health)}`}>●</span>
            </div>
            <p className="text-slate-400 mt-2 max-w-2xl">{project.description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
              <div>
                <span className="text-slate-500">Sponsor:</span>
                <div className="text-white font-medium">{project.sponsor?.first_name} {project.sponsor?.last_name}</div>
              </div>
              <div>
                <span className="text-slate-500">PM:</span>
                <div className="text-white font-medium">{project.project_manager?.first_name} {project.project_manager?.last_name}</div>
              </div>
              <div>
                <span className="text-slate-500">Début:</span>
                <div className="text-white font-medium">{project.start_date}</div>
              </div>
              <div>
                <span className="text-slate-500">Fin:</span>
                <div className="text-white font-medium">{project.end_date}</div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleExport('excel')} className="border-slate-700 text-slate-300 hover:bg-slate-800">
              Excel
            </Button>
            <Button variant="outline" onClick={() => handleExport('pptx')} className="border-slate-700 text-slate-300 hover:bg-slate-800">
              PPTX
            </Button>
            <Button className="bg-[#D4AF37] hover:bg-[#B5952F] text-black" onClick={() => handleExport('pdf')}>
              <Printer className="w-4 h-4 mr-2" /> PDF
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 shadow-lg relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/5 rounded-bl-full group-hover:bg-blue-500/10 transition-colors" />
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-900/30 text-blue-400 rounded-lg"><Target className="w-5 h-5" /></div>
            <span className="text-slate-400 font-medium text-sm">Avancement</span>
          </div>
          <div className="text-3xl font-bold text-white">{project.progress}%</div>
          <div className="w-full bg-slate-800 rounded-full h-2 mt-4">
            <div className="bg-blue-600 h-2 rounded-full relative" style={{ width: `${project.progress}%` }}>
              <div className="absolute right-0 -top-1 w-4 h-4 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-900/30 text-emerald-400 rounded-lg"><DollarSign className="w-5 h-5" /></div>
            <span className="text-slate-400 font-medium text-sm">Budget Consommé</span>
          </div>
          <div className="text-3xl font-bold text-white">CHF {project.budget_actual?.toLocaleString()}</div>
          <div className="text-xs text-slate-500 mt-1">sur CHF {project.budget_planned?.toLocaleString()} prévu</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-900/30 text-purple-400 rounded-lg"><Calendar className="w-5 h-5" /></div>
            <span className="text-slate-400 font-medium text-sm">Timeline</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Début:</span>
              <span className="font-medium text-slate-300">{project.start_date || 'N/A'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Fin:</span>
              <span className="font-medium text-slate-300">{project.end_date || 'N/A'}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm rounded-xl border border-slate-700/50 shadow-lg overflow-hidden">
        <div className="flex border-b border-slate-700">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-[#D4AF37] text-black'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-[#D4AF37] mb-4">Analyse Burndown</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="colorPlanned" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#1E3A8A" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#1E3A8A" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="week" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} />
                        <Area type="monotone" dataKey="planned" stroke="#D4AF37" fillOpacity={1} fill="url(#colorPlanned)" />
                        <Area type="monotone" dataKey="actual" stroke="#3b82f6" fillOpacity={1} fill="url(#colorActual)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-[#D4AF37] mb-4">Résumé Rapide</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-slate-700">
                      <span className="text-slate-400">Risques ouverts:</span>
                      <span className="font-semibold text-red-400">{project.risks?.filter(r => r.status === 'OPEN').length || 0}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-700">
                      <span className="text-slate-400">Décisions en attente:</span>
                      <span className="font-semibold text-amber-400">{project.decisions?.filter(d => d.status === 'PLANNED').length || 0}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-700">
                      <span className="text-slate-400">Documents:</span>
                      <span className="font-semibold text-blue-400">{project.documents?.length || 0}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-400">Commentaires:</span>
                      <span className="font-semibold text-slate-300">{project.comments?.length || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'risks' && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-[#D4AF37] mb-4">Risques du Projet</h3>
              {(!project.risks || project.risks.length === 0) ? (
                <p className="text-slate-400">Aucun risque identifié</p>
              ) : (
                project.risks.map((risk) => (
                  <div key={risk.id} className="bg-slate-800/50 rounded-lg p-4 border-l-4 border-red-500">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold text-white">{risk.title}</h4>
                        <p className="text-sm text-slate-400 mt-1">{risk.description}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        risk.severity >= 20 ? 'bg-red-900/30 text-red-400' :
                        risk.severity >= 15 ? 'bg-amber-900/30 text-amber-400' :
                        'bg-yellow-900/30 text-yellow-400'
                      }`}>
                        Sévérité: {risk.severity}
                      </span>
                    </div>
                    <div className="flex gap-4 mt-3 text-xs text-slate-500">
                      <span>Probabilité: {risk.probability}/5</span>
                      <span>Impact: {risk.impact}/5</span>
                      <span>Statut: {risk.status}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'decisions' && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-[#D4AF37] mb-4">Décisions du Projet</h3>
              {(!project.decisions || project.decisions.length === 0) ? (
                <p className="text-slate-400">Aucune décision enregistrée</p>
              ) : (
                project.decisions.map((decision) => (
                  <div key={decision.id} className="bg-slate-800/50 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold text-white">{decision.title}</h4>
                        <p className="text-sm text-slate-400 mt-1">{decision.description}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        decision.status === 'TAKEN' ? 'bg-green-900/30 text-green-400' :
                        decision.status === 'REJECTED' ? 'bg-red-900/30 text-red-400' :
                        'bg-blue-900/30 text-blue-400'
                      }`}>
                        {decision.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'actions' && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-[#D4AF37] mb-4">Actions en Cours</h3>
              <p className="text-slate-400">Fonctionnalité à venir</p>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-[#D4AF37] mb-4">Documents du Projet</h3>
              {(!project.documents || project.documents.length === 0) ? (
                <p className="text-slate-400">Aucun document</p>
              ) : (
                project.documents.map((doc) => (
                  <div key={doc.id} className="bg-slate-800/50 rounded-lg p-4 flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-400" />
                    <div className="flex-1">
                      <div className="font-semibold text-white">{doc.title}</div>
                      <div className="text-xs text-slate-500">{doc.document_type} - {doc.file_size}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-[#D4AF37] mb-4">Historique des Modifications</h3>
              {(!project.comments || project.comments.length === 0) ? (
                <p className="text-slate-400">Aucun historique</p>
              ) : (
                project.comments.map((comment) => (
                  <div key={comment.id} className="bg-slate-800/50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <MessageSquare className="w-4 h-4 text-slate-400 mt-1" />
                      <div className="flex-1">
                        <div className="text-sm text-slate-300">{comment.content}</div>
                        <div className="text-xs text-slate-500 mt-1">
                          Par {comment.user?.first_name} {comment.user?.last_name} - {new Date(comment.created_at).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
