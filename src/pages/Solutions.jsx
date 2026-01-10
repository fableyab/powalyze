import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Target,
  Users,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  Lightbulb
} from 'lucide-react';

const Solutions = () => {
  const solutions = [
    {
      icon: Target,
      title: 'PMO Stratégique',
      description: 'Pour les PMO et responsables de portefeuilles projets',
      benefits: [
        'Centralisation complète de tous vos projets',
        'Vision 360° du portefeuille en temps réel',
        'Alertes automatiques sur les dérives',
        'Rapports exécutifs automatisés'
      ],
      path: '/pmo',
      cta: 'Découvrir PMO',
      color: 'from-amber-500/20 to-orange-500/20'
    },
    {
      icon: Briefcase,
      title: 'Direction Générale',
      description: 'Pour les C-Level et comités de direction',
      benefits: [
        'Cockpit exécutif synthétique',
        'Priorisation stratégique IA',
        'Scénarios de décision comparés',
        'Indicateurs stratégiques clés'
      ],
      path: '/solutions/executive',
      cta: 'Solution Direction',
      color: 'from-blue-500/20 to-indigo-500/20'
    },
    {
      icon: Users,
      title: 'Équipes Projets',
      description: 'Pour les chefs de projets et collaborateurs terrain',
      benefits: [
        'Interface intuitive et moderne',
        'Collaboration en temps réel',
        'Gestion des tâches et documents',
        'Mobile-first pour le terrain'
      ],
      path: '/solutions/teams',
      cta: 'Solution Équipes',
      color: 'from-emerald-500/20 to-teal-500/20'
    }
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center pt-32 pb-20 px-4">
        <div 
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
        
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#D4AF37]/30 bg-[#D4AF37]/10 rounded-full mb-8 text-sm text-[#D4AF37]">
            <Lightbulb className="w-4 h-4" />
            <span>Solutions par métier</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-extralight mb-6 leading-tight">
            Une solution pour <span className="text-[#D4AF37]">chaque besoin</span>
          </h1>
          
          <p className="text-xl text-white/60 mb-12 max-w-3xl mx-auto font-light">
            PMO, Direction, Équipes terrain : Powalyze s'adapte à votre rôle 
            pour vous offrir exactement ce dont vous avez besoin.
          </p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-24 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <div 
                key={index}
                className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-white/[0.07] hover:border-[#D4AF37]/50 transition-all duration-300"
              >
                {/* Header avec gradient */}
                <div className={`bg-gradient-to-br ${solution.color} p-8 border-b border-white/10`}>
                  <div className="w-14 h-14 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                    <solution.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-light mb-2">{solution.title}</h3>
                  <p className="text-white/70 text-sm font-light">{solution.description}</p>
                </div>
                
                {/* Benefits */}
                <div className="p-8">
                  <ul className="space-y-4 mb-8">
                    {solution.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-white/70 font-light">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link 
                    to={solution.path}
                    className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-[#B89659] transition-colors font-medium"
                  >
                    {solution.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-24 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extralight mb-4">
              Pourquoi choisir <span className="text-[#D4AF37]">Powalyze</span> ?
            </h2>
            <p className="text-white/60 text-lg font-light max-w-2xl mx-auto">
              Une plateforme pensée pour tous les acteurs de la transformation
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <h3 className="text-xl font-light mb-4">Interface unique, vues multiples</h3>
              <p className="text-white/60 font-light leading-relaxed">
                Chaque utilisateur accède à une vue adaptée à son rôle, sans multiplier 
                les outils. Du PMO au terrain, une seule plateforme synchronisée.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <h3 className="text-xl font-light mb-4">Données consolidées en temps réel</h3>
              <p className="text-white/60 font-light leading-relaxed">
                Fini les fichiers Excel éparpillés. Toute votre donnée projet centralisée, 
                mise à jour instantanément, accessible partout.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <h3 className="text-xl font-light mb-4">IA au service de la décision</h3>
              <p className="text-white/60 font-light leading-relaxed">
                Le Decision Engine analyse votre portefeuille et recommande les meilleures 
                actions pour optimiser la valeur et réduire les risques.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <h3 className="text-xl font-light mb-4">Déploiement rapide</h3>
              <p className="text-white/60 font-light leading-relaxed">
                Onboarding guidé, templates prêts à l'emploi, formation incluse. 
                Vos équipes sont opérationnelles en quelques jours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-extralight mb-6">
            Trouvez la solution adaptée à <span className="text-[#D4AF37]">votre besoin</span>
          </h2>
          <p className="text-white/60 mb-10 text-lg font-light">
            Discutons de votre contexte et de vos objectifs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg"
              className="bg-[#D4AF37] hover:bg-[#B89659] text-[#000000] font-medium"
            >
              <Link to="/contact">
                Parler à un expert
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button 
              asChild
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/5"
            >
              <Link to="/demo-mode">
                Voir la démo
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Solutions;
