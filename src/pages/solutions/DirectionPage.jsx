import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TrendingUp, CheckCircle2, ArrowRight, Gauge, AlertCircle, Eye, PieChart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const DirectionPage = () => {
  const benefits = [
    { icon: Gauge, title: 'Cockpit temps réel', description: 'Vue synthétique de tous vos indicateurs stratégiques' },
    { icon: PieChart, title: 'KPI stratégiques', description: 'Tableaux de bord exécutifs personnalisés' },
    { icon: AlertCircle, title: 'Alertes critiques', description: 'Notification immédiate des situations à risque' },
    { icon: Eye, title: 'Vision synthétique', description: 'Compréhension globale sans se perdre dans les détails' }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <section className="bg-gradient-to-br from-brand-blue-dark to-brand-blue-light text-white py-32 mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <TrendingUp className="text-brand-gold" size={48} />
              <h1 className="text-5xl font-bold">Direction Générale</h1>
            </div>
            <p className="text-2xl text-white/80 mb-8">
              Cockpit exécutif avec KPI stratégiques, alertes critiques et vision globale.
            </p>
            <p className="text-lg text-white/70 max-w-3xl">
              Prenez les bonnes décisions au bon moment. Powalyze vous donne une vision claire et 
              synthétique de votre portefeuille stratégique, avec les alertes qui comptent vraiment.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-brand-blue-dark mb-12 text-center">Pour la Direction</h2>
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

      <section className="py-20 bg-brand-blue-dark text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Pilotez avec clarté et confiance</h2>
          <p className="text-xl text-white/80 mb-8">
            Découvrez comment Powalyze transforme votre pilotage exécutif
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-gold hover:bg-brand-gold-dark text-black font-semibold rounded-full transition-all transform hover:scale-105"
          >
            Demander une démo <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DirectionPage;
