import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, Users, CalendarCheck, FileCheck, AlertTriangle, BarChart3, Shield } from 'lucide-react';

const PlateformePage = () => {
  const modules = [
    {
      icon: LayoutDashboard,
      title: 'Cockpit Exécutif',
      description: 'Vue d\'ensemble temps réel de votre gouvernance avec KPI, alertes et décisions critiques.',
      features: ['Dashboard temps réel', 'Alertes intelligentes', 'KPI stratégiques']
    },
    {
      icon: FolderKanban,
      title: 'Portfolio Manager',
      description: 'Gestion centralisée de vos portefeuilles, programmes et projets avec scoring IA.',
      features: ['Vue portefeuille', 'Scoring IA', 'Suivi budgétaire']
    },
    {
      icon: CalendarCheck,
      title: 'Committee Center',
      description: 'Préparation automatique de comités avec ordre du jour, points critiques et compte-rendu.',
      features: ['Préparation auto', 'Ordre du jour', 'Export CR']
    },
    {
      icon: FileCheck,
      title: 'Decision Hub',
      description: 'Registre complet des décisions avec impacts, actions et traçabilité totale.',
      features: ['Registre décisions', 'Traçabilité', 'Impact analysis']
    },
    {
      icon: AlertTriangle,
      title: 'Risk Intelligence',
      description: 'Détection et priorisation des risques avec signaux IA et recommandations.',
      features: ['Détection IA', 'Scoring risques', 'Recommandations']
    },
    {
      icon: BarChart3,
      title: 'Reporting Power BI',
      description: 'Intégration native Power BI pour dashboards personnalisés et exports automatiques.',
      features: ['Dashboards BI', 'Exports auto', 'KPI métier']
    },
    {
      icon: Shield,
      title: 'Sécurité & Audit',
      description: 'Journalisation complète, gestion des rôles et conformité réglementaire.',
      features: ['Audit logs', 'RBAC', 'Conformité']
    },
    {
      icon: Users,
      title: 'Administration',
      description: 'Gestion des utilisateurs, organisations et paramètres centralisés.',
      features: ['Users management', 'Multi-org', 'Settings']
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#f5e3a3]" />
            <span className="text-xs tracking-[0.25em] uppercase text-[#0A1A2F] font-light">Powalyze</span>
          </Link>
          <Link to="/signup" className="px-6 py-2 bg-[#D4AF37] hover:bg-[#B89659] text-black font-medium rounded-full transition">
            Essayer gratuitement
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0A1A2F] to-[#1A3A5C] text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-6"
          >
            La Plateforme de Gouvernance <span className="text-[#D4AF37]">All-in-One</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 mb-8 max-w-3xl mx-auto"
          >
            Unifiez vos portefeuilles, vos comités, vos décisions et vos risques dans une seule plateforme intelligente.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-4 justify-center"
          >
            <Link to="/signup" className="px-8 py-3 bg-[#D4AF37] hover:bg-[#B89659] text-black font-medium rounded-full transition">
              Démarrer gratuitement
            </Link>
            <Link to="/contact" className="px-8 py-3 border-2 border-white/30 hover:bg-white/10 text-white font-medium rounded-full transition">
              Demander une démo
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0A1A2F] mb-4">8 Modules Intégrés</h2>
            <p className="text-xl text-slate-600">Tout ce dont vous avez besoin pour piloter votre gouvernance</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modules.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-lg transition group"
              >
                <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  <module.icon className="text-[#D4AF37]" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-[#0A1A2F] mb-2">{module.title}</h3>
                <p className="text-sm text-slate-600 mb-4">{module.description}</p>
                <ul className="space-y-1">
                  {module.features.map((feature, i) => (
                    <li key={i} className="text-xs text-slate-500 flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-[#D4AF37]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0A1A2F] text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à transformer votre gouvernance ?</h2>
          <p className="text-lg text-white/80 mb-8">Essayez Powalyze gratuitement pendant 14 jours</p>
          <Link to="/signup" className="inline-block px-8 py-3 bg-[#D4AF37] hover:bg-[#B89659] text-black font-medium rounded-full transition">
            Démarrer maintenant
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PlateformePage;
