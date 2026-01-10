import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, Calendar, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const DemoPageNew = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0A1A2F] to-[#1A3A5C] text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-6"
          >
            Découvrez Powalyze <span className="text-[#D4AF37]">En Action</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 mb-8"
          >
            Vidéo de démonstration, démo interactive ou rendez-vous personnalisé
          </motion.p>
        </div>
      </section>

      {/* Video Demo Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0A1A2F] mb-4">Démonstration vidéo (3 min)</h2>
            <p className="text-lg text-slate-600">Découvrez les fonctionnalités clés de Powalyze</p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative aspect-video rounded-2xl overflow-hidden border-4 border-slate-200 bg-slate-100 shadow-2xl"
          >
            <video 
              controls 
              playsInline
              className="w-full h-full object-contain bg-black"
            >
              <source src="/videos/pmo-data-expert.mp4" type="video/mp4" />
            </video>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <p className="text-sm text-slate-600 mb-6">
              Vue portefeuille • Alerte IA • Préparation comité • Arbitrage • Dashboard Power BI • Décision tracée
            </p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center mb-6">
                <Play className="text-[#D4AF37]" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-[#0A1A2F] mb-4">Essai gratuit 14 jours</h2>
              <p className="text-lg text-slate-600 mb-6">
                Testez toutes les fonctionnalités de Powalyze pendant 14 jours, sans carte bancaire.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                  </div>
                  <span className="text-slate-700">Accès complet à tous les modules</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                  </div>
                  <span className="text-slate-700">Aucune carte bancaire requise</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                  </div>
                  <span className="text-slate-700">Support inclus</span>
                </li>
              </ul>
              <Link to="/signup" className="inline-flex items-center gap-2 px-8 py-3 bg-[#D4AF37] hover:bg-[#B89659] text-black font-medium rounded-full transition">
                Démarrer l'essai gratuit
                <ArrowRight size={20} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-50 p-8 rounded-2xl border border-slate-200"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center mb-6">
                <Calendar className="text-[#D4AF37]" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-[#0A1A2F] mb-4">Démo personnalisée</h3>
              <p className="text-slate-600 mb-6">
                Réservez un créneau avec nos experts pour une démonstration adaptée à vos besoins.
              </p>
              <ul className="space-y-2 mb-6 text-sm text-slate-600">
                <li>• 30 minutes avec un expert</li>
                <li>• Cas d'usage spécifiques à votre organisation</li>
                <li>• Questions-réponses</li>
                <li>• Sans engagement</li>
              </ul>
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#0A1A2F] hover:bg-[#0A1A2F] hover:text-white text-[#0A1A2F] font-medium rounded-full transition">
                Réserver une démo
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0A1A2F] text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Convaincu ? Commencez maintenant</h2>
          <p className="text-lg text-white/80 mb-8">14 jours gratuits, sans carte bancaire</p>
          <Link to="/signup" className="inline-block px-8 py-3 bg-[#D4AF37] hover:bg-[#B89659] text-black font-medium rounded-full transition">
            Créer mon compte gratuitement
          </Link>
        </div>
      </section>
      <Footer />    </div>
  );
};

export default DemoPageNew;
