import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Brain, Sparkles, TrendingUp, Target } from 'lucide-react';

const AICore = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        
        {/* HERO */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[#D4AF37]/10">
              <Brain className="w-8 h-8 text-[#D4AF37]" />
            </div>
            <div className="flex-1">
              <h1 className="text-[28px] font-semibold tracking-tight text-[#D4AF37]">
                Powalyze AI Core — Intelligence générative & prédictive
              </h1>

              <p className="mt-3 text-sm text-blue-600 font-medium">
                L'IA qui analyse vos projets, vos données et vos risques pour renforcer vos décisions.
              </p>

              <p className="mt-2 max-w-3xl text-xs text-slate-600 leading-relaxed">
                Une IA gouvernée, traçable et alignée avec les standards internationaux, intégrée directement dans votre cockpit décisionnel. Analyse automatique, prédictions fiables et scénarios intelligents pour une gouvernance renforcée.
              </p>
            </div>
          </div>
        </motion.section>

        {/* FONCTIONNALITÉS */}
        <section className="mt-8 grid gap-6 md:grid-cols-3">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Analyse générative
              </p>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              Synthèse automatique de vos indicateurs clés, tensions et insights. L'IA lit vos rapports Power BI et génère des résumés exécutifs.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Prédictions
              </p>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              Retards probables, risques émergents, dérives budgétaires et capacité réelle. Anticipez les tensions avant qu'elles n'impactent vos projets.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-5 h-5 text-purple-600" />
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Scénarios intelligents
              </p>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              Scénarios optimistes, réalistes et prudents basés sur vos données historiques et vos contraintes actuelles.
            </p>
          </motion.div>

        </section>

        {/* SECTION TECHNIQUE */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-10 rounded-xl border border-slate-200 bg-white p-8"
        >
          <h2 className="text-xl font-semibold text-slate-900 mb-6">
            Comment ça fonctionne ?
          </h2>
          
          <div className="space-y-4 text-sm text-slate-700">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold text-xs">
                1
              </div>
              <div>
                <p className="font-medium mb-1">Connexion à vos données</p>
                <p className="text-xs text-slate-600">Power BI, exports Excel, bases de données projets, calendriers, budgets et risques.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-semibold text-xs">
                2
              </div>
              <div>
                <p className="font-medium mb-1">Analyse automatique</p>
                <p className="text-xs text-slate-600">L'IA détecte les tensions, calcule les prédictions et génère des insights exécutifs.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-semibold text-xs">
                3
              </div>
              <div>
                <p className="font-medium mb-1">Recommandations traçables</p>
                <p className="text-xs text-slate-600">Chaque recommandation est documentée, sourcée et alignée avec votre gouvernance.</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 rounded-xl border border-slate-900 bg-slate-900 p-8 text-center text-white shadow-lg"
        >
          <p className="text-lg font-semibold">
            Prêt à activer Powalyze AI Core ?
          </p>
          <p className="mt-2 text-sm text-slate-300">
            Je vous accompagne pour intégrer l'IA dans votre gouvernance, avec une approche adaptée à votre maturité et vos standards d'excellence.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
            <Link to="/contact">
              <button className="rounded-md bg-white px-6 py-2.5 text-sm font-medium text-slate-900 hover:bg-slate-100 transition-colors w-full sm:w-auto">
                Parler de votre contexte
              </button>
            </Link>
            <Link to="/consulting">
              <button className="rounded-md border border-white px-6 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors w-full sm:w-auto">
                Découvrir l'offre complète
              </button>
            </Link>
          </div>
        </motion.section>

      </main>
      
      <Footer />
    </div>
  );
};

export default AICore;
