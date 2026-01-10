import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Users,
  Activity,
  BarChart3,
  CheckCircle2,
  XCircle,
  Clock,
  Target,
  Zap,
  Brain,
  Shield,
  Gauge
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const DemoMode = () => {
  const portfolio = {
    name: "Transformation Digitale 2026",
    progress: 62,
    budget: 54,
    criticalRisks: 1,
    capacity: "Modérée",
    health: "Stable"
  };

  const projects = [
    {
      id: 1,
      name: "Migration Cloud (Azure)",
      progress: 78,
      budget: 82,
      status: "En cours",
      statusColor: "text-blue-400",
      aiRecommendation: "Dépassement probable - Réviser périmètre Cloud"
    },
    {
      id: 2,
      name: "ERP NextGen (SAP S/4HANA)",
      progress: 41,
      budget: 65,
      status: "Sous tension",
      statusColor: "text-orange-400",
      aiRecommendation: "Retard de 6-8 semaines - Ajouter 2 FTE"
    },
    {
      id: 3,
      name: "Digital Workplace 2.0",
      progress: 67,
      budget: 58,
      status: "En bonne voie",
      statusColor: "text-green-400",
      aiRecommendation: "Opportunité d'accélération - Vélocité stable"
    }
  ];

  const criticalRisk = {
    title: "Retard ERP impactant la supply chain",
    probability: "Élevée",
    impact: "Très élevé",
    propagation: "ERP → Cloud → Logistique",
    mitigation: "Renforcer l'équipe Finance + prioriser modules core"
  };

  const aiRecommendations = [
    "Ajouter 2 FTE sur ERP NextGen (module Finance)",
    "Revoir le périmètre Cloud - réduire scope Phase 1",
    "Accélérer Digital Workplace - capitaliser sur vélocité actuelle"
  ];

  const performance = {
    totalCapacity: 39,
    charge: 92,
    velocity: "Stable",
    overload: "IT Infrastructure"
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      {/* Texture */}
      <div 
        className="fixed inset-0 opacity-[0.015] pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      <Header />

      {/* HERO - INTRO DEMO */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-green-400/30 bg-green-400/10 rounded-full mb-6 text-sm text-green-400">
              <Activity className="w-4 h-4" />
              <span>Mode Démo - Données fictives</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extralight mb-6">
              Tableau de bord<br />
              <span className="text-[#D4AF37]">Transformation Digitale 2026</span>
            </h1>

            <p className="text-lg font-light text-white/70 max-w-3xl mx-auto mb-8">
              Découvrez comment Powalyze centralise vos projets, anticipe les risques et optimise vos décisions.
            </p>

            <Link 
              to="/signup" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#D4AF37] text-[#000000] font-medium hover:bg-[#B89659] transition-all rounded-sm text-sm uppercase tracking-wide"
            >
              Créer mon compte
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* PORTEFEUILLE STRATÉGIQUE */}
      <section className="relative py-12 px-4 sm:px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-extralight mb-8">Portefeuille stratégique</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="bg-white/[0.02] border border-white/10 rounded-sm p-6">
                <TrendingUp className="w-8 h-8 text-blue-400 mb-3" />
                <div className="text-3xl font-light mb-2">{portfolio.progress}%</div>
                <div className="text-sm font-light text-white/60">Avancement global</div>
              </div>

              <div className="bg-white/[0.02] border border-white/10 rounded-sm p-6">
                <DollarSign className="w-8 h-8 text-green-400 mb-3" />
                <div className="text-3xl font-light mb-2">{portfolio.budget}%</div>
                <div className="text-sm font-light text-white/60">Budget consommé</div>
              </div>

              <div className="bg-white/[0.02] border border-white/10 rounded-sm p-6">
                <AlertTriangle className="w-8 h-8 text-red-400 mb-3" />
                <div className="text-3xl font-light mb-2">{portfolio.criticalRisks}</div>
                <div className="text-sm font-light text-white/60">Risques critiques</div>
              </div>

              <div className="bg-white/[0.02] border border-white/10 rounded-sm p-6">
                <Users className="w-8 h-8 text-[#D4AF37] mb-3" />
                <div className="text-2xl font-light mb-2">{portfolio.capacity}</div>
                <div className="text-sm font-light text-white/60">Capacité disponible</div>
              </div>

              <div className="bg-white/[0.02] border border-white/10 rounded-sm p-6">
                <Activity className="w-8 h-8 text-cyan-400 mb-3" />
                <div className="text-2xl font-light mb-2">{portfolio.health}</div>
                <div className="text-sm font-light text-white/60">Santé globale</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PROJETS */}
      <section className="relative py-12 px-4 sm:px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-extralight mb-8">Projets en cours</h2>

            <div className="space-y-6">
              {projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-white/[0.02] border border-white/10 rounded-sm p-6 hover:border-[#D4AF37]/50 transition-all"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    <div className="flex-1">
                      <h3 className="text-xl font-light mb-2">{project.name}</h3>
                      <div className={`text-sm ${project.statusColor} mb-4`}>{project.status}</div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm font-light text-white/50 mb-2">Avancement</div>
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-blue-400"
                                style={{ width: `${project.progress}%` }}
                              />
                            </div>
                            <span className="text-sm font-light">{project.progress}%</span>
                          </div>
                        </div>

                        <div>
                          <div className="text-sm font-light text-white/50 mb-2">Budget</div>
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${project.budget > 75 ? 'bg-orange-400' : 'bg-green-400'}`}
                                style={{ width: `${project.budget}%` }}
                              />
                            </div>
                            <span className="text-sm font-light">{project.budget}%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="lg:w-80 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-sm p-4">
                      <div className="flex items-start gap-3">
                        <Brain className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-medium text-[#D4AF37] mb-1">Recommandation IA</div>
                          <div className="text-sm font-light text-white/80">{project.aiRecommendation}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* RISK MANAGER */}
      <section className="relative py-12 px-4 sm:px-6 border-t border-white/5 bg-gradient-to-b from-transparent to-red-900/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-extralight mb-8">Risk Manager</h2>

            <div className="bg-red-500/10 border border-red-500/30 rounded-sm p-8">
              <div className="flex items-start gap-4 mb-6">
                <Shield className="w-10 h-10 text-red-400 shrink-0" />
                <div>
                  <h3 className="text-2xl font-light text-red-400 mb-2">{criticalRisk.title}</h3>
                  <div className="flex flex-wrap gap-4 text-sm font-light text-white/60">
                    <span>Probabilité: <span className="text-red-400">{criticalRisk.probability}</span></span>
                    <span>Impact: <span className="text-red-400">{criticalRisk.impact}</span></span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm font-medium text-white/70 mb-3">Propagation</div>
                  <div className="flex items-center gap-2 text-sm font-light text-white/60">
                    <Target className="w-4 h-4 text-red-400" />
                    {criticalRisk.propagation}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-white/70 mb-3">Plan de mitigation</div>
                  <div className="flex items-start gap-2 text-sm font-light text-white/60">
                    <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                    {criticalRisk.mitigation}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI ANALYTICS */}
      <section className="relative py-12 px-4 sm:px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-extralight mb-8">AI Analytics</h2>

            <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-sm p-8">
              <div className="flex items-start gap-4 mb-6">
                <Brain className="w-10 h-10 text-[#D4AF37] shrink-0" />
                <div>
                  <h3 className="text-2xl font-light mb-2">Recommandations intelligentes</h3>
                  <p className="text-sm font-light text-white/60">Analyse prédictive basée sur vos données projets</p>
                </div>
              </div>

              <div className="space-y-4">
                {aiRecommendations.map((rec, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-white/[0.02] border border-white/10 rounded-sm">
                    <Zap className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span className="text-sm font-light text-white/80">{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PERFORMANCE MONITORING */}
      <section className="relative py-12 px-4 sm:px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-extralight mb-8">Performance Monitoring</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/[0.02] border border-white/10 rounded-sm p-6">
                <Users className="w-8 h-8 text-blue-400 mb-3" />
                <div className="text-3xl font-light mb-2">{performance.totalCapacity}</div>
                <div className="text-sm font-light text-white/60">Capacité totale (personnes)</div>
              </div>

              <div className="bg-white/[0.02] border border-white/10 rounded-sm p-6">
                <Gauge className="w-8 h-8 text-orange-400 mb-3" />
                <div className="text-3xl font-light mb-2">{performance.charge}%</div>
                <div className="text-sm font-light text-white/60">Charge actuelle</div>
              </div>

              <div className="bg-white/[0.02] border border-white/10 rounded-sm p-6">
                <Activity className="w-8 h-8 text-green-400 mb-3" />
                <div className="text-2xl font-light mb-2">{performance.velocity}</div>
                <div className="text-sm font-light text-white/60">Vélocité</div>
              </div>

              <div className="bg-white/[0.02] border border-red-500/10 rounded-sm p-6">
                <AlertTriangle className="w-8 h-8 text-red-400 mb-3" />
                <div className="text-lg font-light mb-2">{performance.overload}</div>
                <div className="text-sm font-light text-white/60">Zone de surcharge</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative py-24 px-4 sm:px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-extralight mb-6">
              Prêt à piloter vos projets<br />avec cette clarté ?
            </h2>
            <p className="text-lg font-light text-white/60 mb-12 max-w-2xl mx-auto">
              Créez votre compte et configurez votre premier tableau de bord en moins de 2 minutes
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/signup" 
                className="px-8 py-4 bg-[#D4AF37] text-[#000000] font-medium hover:bg-[#B89659] transition-all rounded-sm text-sm uppercase tracking-wide"
              >
                Créer un compte gratuit
              </Link>
              <Link 
                to="/contact" 
                className="px-8 py-4 border border-white/20 text-white font-light hover:bg-white/5 transition-all rounded-sm text-sm"
              >
                Parler à un expert
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DemoMode;
