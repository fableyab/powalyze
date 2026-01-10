import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Building, CheckCircle2, ArrowRight, Eye, Users, FileText, Bell } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PMOPage = () => {
  const benefits = [
    { icon: Eye, title: 'Vue portefeuille 360°', description: 'Visualisez tous vos projets et initiatives dans une seule interface unifiée' },
    { icon: Users, title: 'Comités automatisés', description: 'Préparez et animez vos comités stratégiques avec des dashboards temps réel' },
    { icon: FileText, title: 'Décisions tracées', description: 'Historique complet de toutes les décisions, arbitrages et actions' },
    { icon: Bell, title: 'Alertes IA', description: 'Détection automatique des risques et recommandations intelligentes' }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-blue-dark to-brand-blue-light text-white py-32 mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <Building className="text-brand-gold" size={48} />
              <h1 className="text-5xl font-bold">PMO & Direction</h1>
            </div>
            <p className="text-2xl text-white/80 mb-8">
              Pilotage stratégique du portefeuille projet avec vision unifiée et décisions tracées.
            </p>
            <p className="text-lg text-white/70 max-w-3xl">
              Transformez votre PMO en centre de pilotage stratégique. Powalyze unifie vos projets, 
              vos indicateurs et vos décisions dans une plateforme intelligente qui anticipe les risques 
              et accélère vos arbitrages.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-brand-blue-dark mb-12 text-center">Bénéfices clés</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-slate-200 p-8 hover:shadow-xl transition"
              >
                <benefit.icon className="text-brand-gold mb-4" size={40} />
                <h3 className="text-xl font-bold text-brand-blue-dark mb-3">{benefit.title}</h3>
                <p className="text-slate-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-brand-blue-dark mb-12 text-center">Fonctionnalités pour les PMO</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-brand-blue-dark mb-4">Portfolio Manager</h3>
              <p className="text-slate-600 mb-6">
                Gérez l'ensemble de votre portefeuille projets avec une vue consolidée sur les budgets, 
                les risques, les dépendances et l'avancement.
              </p>
              <ul className="space-y-3">
                {['Cartographie des projets et programmes', 'Priorisation multicritères', 'Suivi budgétaire temps réel', 'Matrice de dépendances'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="text-brand-gold flex-shrink-0 mt-1" size={20} />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-brand-blue-dark mb-4">Committee Center</h3>
              <p className="text-slate-600 mb-6">
                Préparez et animez vos comités de pilotage avec des supports automatisés et des décisions tracées.
              </p>
              <ul className="space-y-3">
                {['Templates de préparation comité', 'Dashboard exécutif temps réel', 'Historique des décisions', 'Suivi des actions'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="text-brand-gold flex-shrink-0 mt-1" size={20} />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-blue-dark text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Prêt à transformer votre PMO ?</h2>
          <p className="text-xl text-white/80 mb-8">
            Découvrez comment Powalyze peut structurer votre pilotage stratégique
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-gold hover:bg-brand-gold-dark text-black font-semibold rounded-full transition-all transform hover:scale-105"
          >
            Demander une démo
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PMOPage;
