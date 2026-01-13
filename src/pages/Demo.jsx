import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Sparkles, TrendingUp, Users, CheckCircle, Zap, Globe } from 'lucide-react';
import { LogoWithText } from '@/components/LogoPowalyze';
import { useDictionary } from '@/lib/i18n/useDictionary';
import { locales, localeNames } from '@/lib/i18n/config';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Demo() {
  const { dict, locale, setLocale, loading } = useDictionary();
  const [showLangMenu, setShowLangMenu] = React.useState(false);

  if (!dict) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Sparkles className="w-12 h-12 text-[#D4AF37] animate-pulse" />
      </div>
    );
  }

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
            <Play className="w-5 h-5 text-[#D4AF37]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-light">
              Découvrez Powalyze en action
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-extralight text-white mb-6 tracking-tight leading-[0.95]">
            Le manifeste
            <span className="block mt-2 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] bg-clip-text text-transparent">
              Powalyze
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 font-light max-w-3xl mx-auto mb-12 leading-relaxed">
            Plongez dans notre vision : une gouvernance stratégique guidée par la donnée, 
            la transparence exécutive et l'intelligence décisionnelle.
          </p>

          {/* Video Container */}
          <div className="flex items-center justify-center mt-12 px-4 sm:px-6 mb-12">
            <div className="relative w-full max-w-4xl aspect-video rounded-lg overflow-hidden border border-slate-700/50 shadow-2xl">
              <video
                className="w-full h-full object-cover bg-black"
                controls
                preload="metadata"
                poster="/images/video-poster.jpg"
              >
                <source src="/videos/manifeste.mp4" type="video/mp4" />
                Votre navigateur ne supporte pas la lecture de vidéos.
              </video>
            </div>
          </div>

          {/* Key Messages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-slate-800/50 bg-slate-900/20 backdrop-blur-sm">
              <TrendingUp className="w-8 h-8 text-[#D4AF37] mb-4" />
              <h3 className="text-sm font-medium text-white uppercase tracking-[0.2em] mb-2">
                Vision stratégique
              </h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                Transformez vos données en décisions exécutives éclairées avec notre cockpit stratégique en temps réel.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-slate-800/50 bg-slate-900/20 backdrop-blur-sm">
              <Users className="w-8 h-8 text-[#D4AF37] mb-4" />
              <h3 className="text-sm font-medium text-white uppercase tracking-[0.2em] mb-2">
                Collaboration COMEX
              </h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                Alignez vos équipes exécutives autour d'une source unique de vérité pour des décisions collectives.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-slate-800/50 bg-slate-900/20 backdrop-blur-sm">
              <Zap className="w-8 h-8 text-[#D4AF37] mb-4" />
              <h3 className="text-sm font-medium text-white uppercase tracking-[0.2em] mb-2">
                Agilité exécutive
              </h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                Réagissez instantanément aux signaux critiques avec nos alertes intelligentes et tableaux de bord adaptatifs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Features Section */}
      <section className="py-24 px-6 bg-[#000000] relative overflow-hidden border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 mb-6">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#D4AF37]">
                Fonctionnalités démonstrées
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extralight text-white mb-4 tracking-tight">
              Ce que vous découvrirez
            </h2>
            <p className="text-slate-400 font-light max-w-2xl mx-auto">
              Une plateforme complète pour piloter votre stratégie avec précision et agilité
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {demoFeatures.map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-lg border border-slate-800/50 bg-slate-900/10 hover:bg-slate-900/30 hover:border-[#D4AF37]/30 transition-all duration-500"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#4A9EFF]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <CheckCircle className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-white uppercase tracking-[0.15em] mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-light leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-black to-slate-900/50 relative overflow-hidden border-t border-slate-800/50">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 mb-8">
            <Globe className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#D4AF37]">
              Prêt à commencer ?
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-extralight text-white mb-6 tracking-tight">
            Passez à l'action
          </h2>
          
          <p className="text-lg text-slate-300 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
            Demandez une démo personnalisée ou créez votre compte gratuitement pour découvrir 
            toute la puissance de Powalyze.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="group relative px-8 py-4 rounded-[2px] bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-black text-xs font-medium tracking-[0.2em] uppercase transition-all duration-500 hover:shadow-lg hover:shadow-[#D4AF37]/20 overflow-hidden"
            >
              <span className="relative z-10">Demander une démo</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
            </Link>
            
            <Link
              to="/signup"
              className="px-8 py-4 rounded-[2px] border border-slate-700 text-slate-200 text-xs font-light tracking-[0.2em] uppercase hover:border-[#D4AF37] hover:text-white transition-all duration-500"
            >
              Créer un compte gratuit
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-8 mt-12 pt-8 border-t border-slate-800/50">
            <div className="text-[9px] tracking-[0.25em] uppercase text-slate-400">ISO 27001</div>
            <div className="w-px h-3 bg-slate-700" />
            <div className="text-[9px] tracking-[0.25em] uppercase text-slate-400">SOC 2 Type II</div>
            <div className="w-px h-3 bg-slate-700" />
            <div className="text-[9px] tracking-[0.25em] uppercase text-slate-400">GDPR Compliant</div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Demo Features Data
const demoFeatures = [
  {
    title: "Cockpit stratégique",
    description: "Vue d'ensemble temps réel de votre portefeuille de projets avec KPIs exécutifs et signaux critiques."
  },
  {
    title: "Pulse des enjeux",
    description: "Suivi automatisé des jalons critiques avec alertes intelligentes pour anticiper les retards."
  },
  {
    title: "Heatmap des tensions",
    description: "Visualisation instantanée des zones à risque de votre organisation pour prioriser les actions."
  },
  {
    title: "Priorités COMEX",
    description: "Alignement des décisions exécutives avec suivi d'impact et gestion collaborative."
  },
  {
    title: "Gouvernance intégrée",
    description: "Framework complet de gouvernance avec comités, décisions et documentation centralisée."
  },
  {
    title: "Analytics prédictifs",
    description: "Intelligence artificielle pour anticiper les dérives budgétaires et optimiser l'allocation de ressources."
  },
  {
    title: "Gestion des risques",
    description: "Cartographie complète des risques avec plans d'action et suivi de mitigation automatisé."
  },
  {
    title: "Reporting exécutif",
    description: "Génération automatique de rapports de direction avec visualisations Power BI intégrées."
  }
];
            
            <div className="mb-12 max-w-lg mx-auto">
                <div className="flex justify-between text-slate-400 mb-6 text-sm font-medium">
                    <span>5 Users</span>
                    <span>100+ Users</span>
                </div>
                
                <Slider
                    defaultValue={[users]}
                    max={100}
                    min={5}
                    step={1}
                    onValueChange={(vals) => setUsers(vals[0])}
                    className="w-full py-4"
                />
                
                <div className="mt-6 text-[#D4A574] font-bold text-xl">{users} Users</div>
            </div>

            <div className="bg-[#0F0F0F] p-8 rounded-xl border border-slate-800 inline-block min-w-[300px]">
                <div className="text-slate-500 text-sm uppercase font-bold mb-2">Estimated Monthly Cost</div>
                <div className="text-4xl font-bold text-white">
                    {calculatePrice(users) === "Custom" ? "Contact Us" : `CHF ${calculatePrice(users)}`}
                </div>
                <div className="text-slate-500 text-xs mt-2">Billed Annually</div>
            </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const Feature = ({ icon: Icon, title, desc }) => (
    <div className="text-center p-6 bg-[#141414] rounded-xl border border-slate-800">
        <Icon className="w-8 h-8 text-[#D4A574] mx-auto mb-4" />
        <h3 className="text-white font-bold mb-2">{title}</h3>
        <p className="text-slate-400 text-sm">{desc}</p>
    </div>
);

export default Demo;
