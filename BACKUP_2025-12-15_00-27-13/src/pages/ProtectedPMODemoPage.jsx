import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { useLanguage } from '@/context/LanguageContext';
import InteractiveExamples from '@/components/Service/InteractiveExamples';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProtectedPMODemoPage = () => {
  const { language } = useLanguage();

  const content = {
    fr: {
      title: 'Démonstration Interactive PMO',
      subtitle: 'Découvrez nos outils de pilotage de portefeuille de projets en action',
      sections: {
        portfolio: {
          title: 'Suivi du Portefeuille',
          description: 'Visualisez l\'état de tous vos projets en temps réel avec nos tableaux de bord PMO avancés'
        },
        budget: {
          title: 'Gestion Budgétaire',
          description: 'Suivi complet des budgets, des dépenses et des écarts de prévisions'
        },
        resources: {
          title: 'Allocation des Ressources',
          description: 'Optimisez l\'allocation de vos équipes et ressources sur l\'ensemble du portefeuille'
        },
        insights: {
          title: 'Insights & Recommandations',
          description: 'Obtenez des analyses prédictives pour anticiper les risques et optimiser votre ROI'
        }
      }
    },
    en: {
      title: 'Interactive PMO Demo',
      subtitle: 'Discover our project portfolio management tools in action',
      sections: {
        portfolio: {
          title: 'Portfolio Tracking',
          description: 'View the status of all your projects in real-time with our advanced PMO dashboards'
        },
        budget: {
          title: 'Budget Management',
          description: 'Complete tracking of budgets, expenses and forecast variances'
        },
        resources: {
          title: 'Resource Allocation',
          description: 'Optimize allocation of your teams and resources across the portfolio'
        },
        insights: {
          title: 'Insights & Recommendations',
          description: 'Get predictive analytics to anticipate risks and optimize your ROI'
        }
      }
    },
    de: {
      title: 'Interaktive PMO-Demo',
      subtitle: 'Entdecken Sie unsere Tools zur Verwaltung des Projektportfolios in Aktion',
      sections: {
        portfolio: {
          title: 'Portfolio-Tracking',
          description: 'Zeigen Sie den Status aller Ihre Projekte in Echtzeit mit unseren fortschrittlichen PMO-Dashboards'
        },
        budget: {
          title: 'Budgetverwaltung',
          description: 'Vollständige Verfolgung von Budgets, Ausgaben und Prognoseabweichungen'
        },
        resources: {
          title: 'Ressourcenallokation',
          description: 'Optimieren Sie die Allokation Ihrer Teams und Ressourcen im gesamten Portfolio'
        },
        insights: {
          title: 'Erkenntnisse & Empfehlungen',
          description: 'Erhalten Sie prädiktive Analysen, um Risiken zu antizipieren und Ihre ROI zu optimieren'
        }
      }
    }
  };

  const t = content[language] || content.fr;

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans">
      <Navbar />
      
      <main>
        {/* Header Section */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-[#050505] to-[#050505] z-0"></div>
          <div className="container mx-auto px-6 relative z-10">
            <Link to="/services/pmo-strategique" className="inline-flex items-center gap-2 text-[#BFA76A] hover:text-white transition-colors mb-8">
              <ArrowLeft size={18} />
              Retour aux services
            </Link>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">{t.title}</h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">{t.subtitle}</p>
            </motion.div>
          </div>
        </section>

        {/* Interactive Examples Section */}
        <section className="py-20 container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <InteractiveExamples type="pmo" />
            
            {/* Features Grid */}
            <div className="mt-20">
              <h2 className="text-3xl font-bold text-center mb-12">Fonctionnalités Principales</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Object.values(t.sections).map((section, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] rounded-xl border border-white/10 hover:border-[#BFA76A]/50 transition-all"
                  >
                    <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#BFA76A]"></div>
                      {section.title}
                    </h3>
                    <p className="text-gray-400">{section.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="py-20 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold">Prêt à transformer votre PMO ?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Découvrez comment nos solutions peuvent optimiser votre portefeuille de projets et maximiser votre ROI.
            </p>
            <Link 
              to="/contact" 
              className="inline-block bg-[#BFA76A] text-black font-bold px-8 py-3 rounded-full hover:bg-white transition-colors"
            >
              Demander une démo personnalisée
            </Link>
          </motion.div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
};

export default ProtectedPMODemoPage;
