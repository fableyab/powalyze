import React from 'react';
import { 
  Cpu, 
  BarChart3, 
  Zap, 
  Target,
  FileText,
  TrendingUp
} from 'lucide-react';

const Features = () => {
  const services = [
    {
      icon: Cpu,
      title: 'Pilotage IT',
      description: 'Optimisez votre infrastructure IT avec une gestion stratégique et une gouvernance efficace pour soutenir vos objectifs métier.',
      link: '/services/it-management'
    },
    {
      icon: TrendingUp,
      title: 'PMO Stratégique',
      description: 'Alignez vos projets avec la stratégie d\'entreprise grâce à une gestion de portefeuille optimisée et une gouvernance de projet robuste.',
      link: '/pmo-demo'
    },
    {
      icon: BarChart3,
      title: 'Data & Power BI',
      description: 'Transformez vos données en insights actionnables avec nos solutions de business intelligence et de visualisation avancée.',
      link: '/services/power-bi'
    },
    {
      icon: Zap,
      title: 'Automatisation & IA',
      description: 'Automatisez vos processus métier et exploitez l\'IA pour améliorer l\'efficacité opérationnelle et la prise de décision.',
      link: '/services/automation-ai'
    },
    {
      icon: Target,
      title: 'Portefeuilles & Priorisation',
      description: 'Gérez efficacement votre portefeuille de projets avec une priorisation intelligente basée sur la valeur métier.',
      link: '/services/portfolio-management'
    },
    {
      icon: FileText,
      title: 'Reporting Exécutif',
      description: 'Fournissez aux décideurs des rapports clairs et actionnables pour une gouvernance d\'entreprise optimale.',
      link: '/services/executive-reporting'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Nos Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <a
                key={index}
                href={service.link}
                className="group bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-2xl hover:border-blue-400 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
