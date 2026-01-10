import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Building, Users, Database, Briefcase, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SolutionsPage = () => {
  const solutions = [
    {
      icon: Building,
      title: 'PMO & Direction',
      description: 'Pilotage stratégique du portefeuille projet avec vision unifiée et décisions tracées.',
      benefits: ['Vue portefeuille 360°', 'Comités automatisés', 'Décisions tracées', 'Alertes IA'],
      cta: 'Pour les PMO',
      link: '/solutions/pmo'
    },
    {
      icon: Database,
      title: 'Data & BI',
      description: 'Consolidation des données projet et intégration Power BI pour reporting temps réel.',
      benefits: ['Données unifiées', 'Dashboards Power BI', 'KPI temps réel', 'Exports automatiques'],
      cta: 'Pour les Data Analysts',
      link: '/solutions/data-bi'
    },
    {
      icon: Briefcase,
      title: 'Chefs de Projet',
      description: 'Suivi quotidien des projets avec risques, décisions et collaboration équipe.',
      benefits: ['Suivi projet simplifié', 'Gestion risques', 'Décisions collaboratives', 'Reporting auto'],
      cta: 'Pour les CP',
      link: '/solutions/chefs-projet'
    },
    {
      icon: TrendingUp,
      title: 'Direction Générale',
      description: 'Cockpit exécutif avec KPI stratégiques, alertes critiques et vision globale.',
      benefits: ['Cockpit temps réel', 'KPI stratégiques', 'Alertes critiques', 'Vision synthétique'],
      cta: 'Pour la Direction',
      link: '/solutions/direction'
    },
    {
      icon: Users,
      title: 'Conseil & Transformation',
      description: 'Accélération des missions avec templates, méthodologies et livrables ready-to-use.',
      benefits: ['Templates prêts', 'Best practices', 'Gain de temps', 'Crédibilité client'],
      cta: 'Pour les Consultants',
      link: '/solutions/conseil'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0A1A2F] to-[#1A3A5C] text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-6"
          >
            Une Solution Pour Chaque <span className="text-[#D4AF37]">Métier</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 max-w-3xl mx-auto"
          >
            Powalyze s'adapte à votre rôle : PMO, Data Analyst, Chef de Projet, Direction, Consultant
          </motion.p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-12">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition"
              >
                <div className="grid md:grid-cols-2 gap-8 p-8">
                  <div>
                    <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center mb-6">
                      <solution.icon className="text-[#D4AF37]" size={32} />
                    </div>
                    <h3 className="text-3xl font-bold text-brand-blue-dark mb-4">{solution.title}</h3>
                    <p className="text-lg text-slate-600 mb-6">{solution.description}</p>
                    <Link 
                      to={solution.link}
                      className="inline-block px-6 py-3 bg-brand-gold hover:bg-brand-gold-dark text-black font-medium rounded-full transition"
                    >
                      {solution.cta}
                    </Link>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-brand-blue-dark mb-4">Bénéfices clés</h4>
                    <ul className="space-y-3">
                      {solution.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-brand-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-brand-gold" />
                          </div>
                          <span className="text-slate-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-blue-dark text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Votre métier mérite un outil adapté</h2>
          <p className="text-lg text-white/80 mb-8">Découvrez comment Powalyze s'adapte à vos besoins</p>
          <Link to="/contact" className="inline-block px-8 py-3 bg-brand-gold hover:bg-brand-gold-dark text-black font-medium rounded-full transition">
            Demander une démo personnalisée
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SolutionsPage;
