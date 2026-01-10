import React from 'react';
import { Briefcase, BarChart2, FileText, TrendingUp, BarChart3, Settings, FolderOpen, Users, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ModulesHighTech() {
  const { t } = useTranslation('landing');
  const modules = [
    { icon: Briefcase, title: "Portfolio Manager", desc: "Pilotez tous vos projets en un seul endroit" },
    { icon: BarChart2, title: "Executive Dashboard", desc: "Vue stratégique pour le comité exécutif" },
    { icon: FileText, title: "Decision Hub", desc: "Traçabilité complète des décisions" },
    { icon: TrendingUp, title: "Predictive Intelligence", desc: "Alertes prédictives et recommandations IA" },
    { icon: BarChart3, title: "Power BI Integration", desc: "Dashboards avancés et insights temps réel" },
    { icon: Settings, title: "Governance Engine", desc: "Automatisation des processus de gouvernance" },
    { icon: FolderOpen, title: "Documents", desc: "Gestion centralisée des documents" },
    { icon: Users, title: "Collaboration", desc: "Travail d'équipe et communication" },
    { icon: Zap, title: "Integrations", desc: "Connexion avec vos outils existants" }
  ];

  return (
    <section className="py-16 md:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6 animate-fadeIn">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-4">
            {t('modules.title', 'Modules SaaS Powalyze')}
          </h2>
          <p className="text-[#4A9EFF] text-lg md:text-xl">
            {t('modules.subtitle', 'Une plateforme modulaire qui s\'adapte à vos besoins')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modules.map((module, i) => (
            <div
              key={i}
              className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl hover:border-[#D4AF37]/40 hover:bg-white/[0.07] transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 shrink-0 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center group-hover:bg-[#D4AF37]/20 transition">
                  <module.icon className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{module.title}</h3>
                  <p className="text-sm text-white/60">{module.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
