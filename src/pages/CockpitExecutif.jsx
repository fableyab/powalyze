import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Users, 
  Brain,
  FolderKanban,
  Calendar,
  Zap
} from 'lucide-react';
import { portfolioService } from '@/lib/portfolioService';
import { committeeService } from '@/lib/committeeService';
import { decisionService, riskService, predictiveSignalService } from '@/lib/decisionRiskService';

const CockpitExecutif = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    portfolioHealth: { green: 0, amber: 0, red: 0 },
    atRiskProjects: [],
    pendingDecisions: [],
    criticalRisks: [],
    predictiveSignals: [],
    upcomingCommittees: []
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      // Get organization ID from auth context (hardcoded for demo)
      const orgId = 'org-acme-corp-123';

      // Parallel fetch all dashboard data
      const [
        portfolioData,
        committees,
        decisions,
        risks,
        signals
      ] = await Promise.all([
        portfolioService.getPortfolioDashboard(orgId),
        committeeService.getUpcomingCommittees(orgId, 3),
        decisionService.getAllDecisions(orgId, { status: 'PLANNED' }),
        riskService.getCriticalRisks(orgId),
        predictiveSignalService.getUnacknowledgedSignals(orgId, 70)
      ]);

      // Get at-risk projects
      const atRiskProjects = portfolioData.projectsByHealth?.RED || [];

      setDashboardData({
        portfolioHealth: {
          green: portfolioData.projectsByHealth?.GREEN?.length || 0,
          amber: portfolioData.projectsByHealth?.AMBER?.length || 0,
          red: portfolioData.projectsByHealth?.RED?.length || 0
        },
        atRiskProjects: atRiskProjects.slice(0, 5),
        pendingDecisions: decisions.slice(0, 5),
        criticalRisks: risks.slice(0, 3),
        predictiveSignals: signals.slice(0, 4),
        upcomingCommittees: committees
      });
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A1A2F] flex items-center justify-center">
        <div className="text-[#D4AF37] text-xl">Chargement du cockpit...</div>
      </div>
    );
  }

  const totalProjects = dashboardData.portfolioHealth.green + 
                        dashboardData.portfolioHealth.amber + 
                        dashboardData.portfolioHealth.red;

  const greenPercent = totalProjects ? Math.round((dashboardData.portfolioHealth.green / totalProjects) * 100) : 0;
  const amberPercent = totalProjects ? Math.round((dashboardData.portfolioHealth.amber / totalProjects) * 100) : 0;
  const redPercent = totalProjects ? Math.round((dashboardData.portfolioHealth.red / totalProjects) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#0A1A2F] text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#D4AF37] mb-2">Cockpit Exécutif</h1>
        <p className="text-slate-400">Vue d'ensemble de votre portefeuille et gouvernance</p>
      </div>

      {/* Main Grid: 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (60%) - 2 cols */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Portfolio Health */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 shadow-lg"
          >
            <h2 className="text-xl font-semibold text-[#D4AF37] mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Santé du Portefeuille
            </h2>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500">{dashboardData.portfolioHealth.green}</div>
                <div className="text-sm text-slate-400">GREEN</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-500">{dashboardData.portfolioHealth.amber}</div>
                <div className="text-sm text-slate-400">AMBER</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500">{dashboardData.portfolioHealth.red}</div>
                <div className="text-sm text-slate-400">RED</div>
              </div>
            </div>

            {/* Health Bar */}
            <div className="w-full h-6 bg-slate-800 rounded-full overflow-hidden flex">
              {greenPercent > 0 && (
                <div 
                  className="bg-green-500 h-full flex items-center justify-center text-xs font-semibold"
                  style={{ width: `${greenPercent}%` }}
                >
                  {greenPercent > 10 && `${greenPercent}%`}
                </div>
              )}
              {amberPercent > 0 && (
                <div 
                  className="bg-amber-500 h-full flex items-center justify-center text-xs font-semibold"
                  style={{ width: `${amberPercent}%` }}
                >
                  {amberPercent > 10 && `${amberPercent}%`}
                </div>
              )}
              {redPercent > 0 && (
                <div 
                  className="bg-red-500 h-full flex items-center justify-center text-xs font-semibold"
                  style={{ width: `${redPercent}%` }}
                >
                  {redPercent > 10 && `${redPercent}%`}
                </div>
              )}
            </div>
          </motion.section>

          {/* Projects at Risk */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 shadow-lg"
          >
            <h2 className="text-xl font-semibold text-[#D4AF37] mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Projets à Risque
            </h2>
            
            {dashboardData.atRiskProjects.length === 0 ? (
              <p className="text-slate-400 text-sm">Aucun projet à risque</p>
            ) : (
              <div className="space-y-3">
                {dashboardData.atRiskProjects.map((project, idx) => (
                  <Link 
                    key={project.id}
                    to={`/app/projects/${project.id}`}
                    className="block bg-slate-800/50 rounded-lg p-3 hover:bg-slate-700/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-semibold text-white">{project.name}</div>
                        <div className="text-sm text-slate-400">Status: {project.status}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-red-900/30 text-red-400 text-xs rounded-full">RED</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </motion.section>

          {/* Pending Decisions */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 shadow-lg"
          >
            <h2 className="text-xl font-semibold text-[#D4AF37] mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Décisions en Attente
            </h2>
            
            {dashboardData.pendingDecisions.length === 0 ? (
              <p className="text-slate-400 text-sm">Aucune décision en attente</p>
            ) : (
              <div className="space-y-3">
                {dashboardData.pendingDecisions.map((decision) => (
                  <Link 
                    key={decision.id}
                    to={`/app/decisions/${decision.id}`}
                    className="block bg-slate-800/50 rounded-lg p-3 hover:bg-slate-700/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-semibold text-white">{decision.title}</div>
                        <div className="text-sm text-slate-400">{decision.decision_type}</div>
                      </div>
                      <div className="text-xs text-slate-500">
                        {decision.impact_summary?.substring(0, 50)}...
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </motion.section>
        </div>

        {/* Right Column (40%) - 1 col */}
        <div className="space-y-6">
          
          {/* AI Signals */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 shadow-lg"
          >
            <h2 className="text-xl font-semibold text-[#D4AF37] mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Signaux IA
            </h2>
            
            {dashboardData.predictiveSignals.length === 0 ? (
              <p className="text-slate-400 text-sm">Aucun signal actif</p>
            ) : (
              <div className="space-y-3">
                {dashboardData.predictiveSignals.map((signal) => (
                  <div 
                    key={signal.id}
                    className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-3"
                  >
                    <div className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-amber-500 mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white">{signal.message}</div>
                        <div className="text-xs text-amber-400 mt-1">
                          Score: {signal.score}/100
                        </div>
                        {signal.recommended_action && (
                          <div className="text-xs text-slate-400 mt-2 line-clamp-2">
                            {signal.recommended_action}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.section>

          {/* Upcoming Committees */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 shadow-lg"
          >
            <h2 className="text-xl font-semibold text-[#D4AF37] mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Prochains Comités
            </h2>
            
            {dashboardData.upcomingCommittees.length === 0 ? (
              <p className="text-slate-400 text-sm">Aucun comité planifié</p>
            ) : (
              <div className="space-y-3">
                {dashboardData.upcomingCommittees.map((committee) => (
                  <Link 
                    key={committee.id}
                    to={`/app/committees/${committee.id}`}
                    className="block bg-slate-800/50 rounded-lg p-3 hover:bg-slate-700/50 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="w-4 h-4 text-blue-400" />
                      <span className="font-semibold text-white">{committee.committee_type}</span>
                    </div>
                    <div className="text-xs text-slate-400">
                      {new Date(committee.date).toLocaleDateString('fr-FR', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                    {committee.participants && (
                      <div className="text-xs text-slate-500 mt-1">
                        {committee.participants.length} participants
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default CockpitExecutif;
