import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Sparkles, Zap, TrendingUp, Eye, Target, Cpu, Network } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CognitiveTheater() {
  return (
    <div className="min-h-screen bg-black text-slate-200">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.4)_0.5px,transparent_0.5px),linear-gradient(90deg,rgba(212,175,55,0.4)_0.5px,transparent_0.5px)] bg-[size:40px_40px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          {/* Surtitle */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <Brain className="w-5 h-5 text-[#D4AF37]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-light">
              Intelligence décisionnelle augmentée
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-extralight text-white mb-6 tracking-tight leading-[0.95]">
            Cognitive
            <span className="block mt-2 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] bg-clip-text text-transparent">
              Theater
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 font-light max-w-3xl mx-auto mb-12 leading-relaxed">
            Visualisez l'invisible. Une salle de contrôle immersive où vos données stratégiques 
            prennent vie en temps réel pour des décisions COMEX éclairées.
          </p>

          {/* Video/Visual Placeholder */}
          <div className="flex items-center justify-center mt-16 mb-16">
            <div className="relative w-full max-w-5xl">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] via-[#4A9EFF] to-[#D4AF37] rounded-2xl blur-2xl opacity-20 animate-pulse" />
              
              {/* Main Visual */}
              <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-[#D4AF37]/20 shadow-[0_0_80px_rgba(212,175,55,0.3)] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Brain className="w-24 h-24 text-[#D4AF37] mx-auto mb-6 animate-pulse" />
                    <p className="text-slate-400 font-light text-sm">
                      Expérience immersive en cours de développement
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-black to-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-white mb-4">
              Une expérience décisionnelle révolutionnaire
            </h2>
            <p className="text-slate-300 font-light max-w-2xl mx-auto">
              Le Cognitive Theater transforme vos KPIs en insights visuels immersifs pour une gouvernance stratégique optimale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl border border-[#D4AF37]/20 bg-slate-900/40 backdrop-blur-sm hover:border-[#D4AF37]/40 transition-all duration-300">
              <Eye className="w-10 h-10 text-[#D4AF37] mb-4" />
              <h3 className="text-xl font-light text-white mb-3">Visualisation 360°</h3>
              <p className="text-slate-400 text-sm font-light leading-relaxed">
                Murs de données interactifs affichant vos KPIs stratégiques en temps réel sur écrans géants.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl border border-[#D4AF37]/20 bg-slate-900/40 backdrop-blur-sm hover:border-[#D4AF37]/40 transition-all duration-300">
              <Network className="w-10 h-10 text-[#D4AF37] mb-4" />
              <h3 className="text-xl font-light text-white mb-3">Connexions intelligentes</h3>
              <p className="text-slate-400 text-sm font-light leading-relaxed">
                L'IA révèle les corrélations cachées entre vos initiatives, risques et performances.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl border border-[#D4AF37]/20 bg-slate-900/40 backdrop-blur-sm hover:border-[#D4AF37]/40 transition-all duration-300">
              <Target className="w-10 h-10 text-[#D4AF37] mb-4" />
              <h3 className="text-xl font-light text-white mb-3">Scénarios prédictifs</h3>
              <p className="text-slate-400 text-sm font-light leading-relaxed">
                Simulez l'impact de vos décisions avec des modèles prédictifs avancés en live.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-2xl border border-[#D4AF37]/20 bg-slate-900/40 backdrop-blur-sm hover:border-[#D4AF37]/40 transition-all duration-300">
              <Cpu className="w-10 h-10 text-[#D4AF37] mb-4" />
              <h3 className="text-xl font-light text-white mb-3">Alertes cognitives</h3>
              <p className="text-slate-400 text-sm font-light leading-relaxed">
                Le système détecte les signaux faibles et alerte votre COMEX avant les crises.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-white mb-4">
              Cas d'usage stratégiques
            </h2>
          </div>

          <div className="space-y-8">
            {/* Use Case 1 */}
            <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/20 backdrop-blur-sm">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-light text-white mb-3">Réunions COMEX augmentées</h3>
                  <p className="text-slate-300 font-light leading-relaxed">
                    Transformez vos comités exécutifs en sessions stratégiques immersives. 
                    Visualisez les KPIs clés, explorez les scénarios, prenez des décisions éclairées collectivement.
                  </p>
                </div>
              </div>
            </div>

            {/* Use Case 2 */}
            <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/20 backdrop-blur-sm">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-light text-white mb-3">Pilotage de crise</h3>
                  <p className="text-slate-300 font-light leading-relaxed">
                    En situation critique, le Cognitive Theater devient votre centre de commandement. 
                    Données en temps réel, simulations instantanées, collaboration maximale.
                  </p>
                </div>
              </div>
            </div>

            {/* Use Case 3 */}
            <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/20 backdrop-blur-sm">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-light text-white mb-3">Revue stratégique annuelle</h3>
                  <p className="text-slate-300 font-light leading-relaxed">
                    Présentez votre bilan annuel avec impact. Le Cognitive Theater offre une expérience 
                    mémorable pour vos boards et comités de direction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-slate-900/50 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-light text-white mb-6">
            Réservez votre expérience Cognitive Theater
          </h2>
          <p className="text-slate-300 font-light mb-8 max-w-2xl mx-auto">
            Découvrez comment cette salle immersive peut transformer votre gouvernance stratégique.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/demo"
              className="px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-white rounded-lg font-medium hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-300"
            >
              Demander une démo
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 border border-[#D4AF37] text-[#D4AF37] rounded-lg font-medium hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
