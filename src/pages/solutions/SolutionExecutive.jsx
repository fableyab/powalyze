import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Briefcase,
  TrendingUp,
  Target,
  Brain,
  ArrowRight,
  CheckCircle2,
  BarChart3,
  AlertTriangle
} from 'lucide-react';

const SolutionExecutive = () => {
  const features = [
    {
      icon: TrendingUp,
      title: 'Cockpit Exécutif Synthétique',
      description: 'Vue d\'ensemble stratégique en 3 minutes chrono',
      benefits: [
        'KPIs stratégiques temps réel',
        'Santé globale du portefeuille',
        'Alertes critiques uniquement',
        'Vision consolidée multi-projets'
      ]
    },
    {
      icon: Brain,
      title: 'Decision Engine IA',
      description: 'Recommandations stratégiques pour optimiser la valeur',
      benefits: [
        'Priorisation intelligente',
        'Scénarios A/B/C comparés',
        'Impact financier estimé',
        'Confiance de la recommandation'
      ]
    },
    {
      icon: BarChart3,
      title: 'Rapports Exécutifs',
      description: 'Présentations COMEX prêtes en 1 clic',
      benefits: [
        'Export PDF personnalisé',
        'Graphiques exécutifs',
        'Storytelling automatique',
        'Données actualisées'
      ]
    },
    {
      icon: AlertTriangle,
      title: 'Alertes Stratégiques',
      description: 'Soyez informé des situations critiques en temps réel',
      benefits: [
        'Notification intelligente',
        'Seuils personnalisables',
        'Contexte complet',
        'Actions recommandées'
      ]
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
            <Briefcase className="w-4 h-4" />
            <span>Solution C-Level</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-extralight mb-6 leading-tight">
            Le cockpit stratégique des <span className="text-[#D4AF37]">directions générales</span>
          </h1>
          
          <p className="text-xl text-white/60 mb-12 max-w-3xl mx-auto font-light">
            Pilotez vos transformations avec une vision claire, des décisions éclairées 
            et un alignement total sur la stratégie d'entreprise.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg"
              className="bg-[#D4AF37] hover:bg-[#B89659] text-[#000000] font-medium"
            >
              <Link to="/signup">
                Essayer gratuitement
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button 
              asChild
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/5"
            >
              <Link to="/contact">
                Parler à un expert
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extralight mb-4">
              Conçu pour les <span className="text-[#D4AF37]">décideurs</span>
            </h2>
            <p className="text-white/60 text-lg font-light max-w-2xl mx-auto">
              Information stratégique, décision rapide, exécution efficace
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white/5 border border-white/10 rounded-xl p-8 hover:bg-white/[0.07] hover:border-[#D4AF37]/50 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-[#D4AF37]" />
                </div>
                
                <h3 className="text-2xl font-light mb-3">{feature.title}</h3>
                <p className="text-white/60 mb-6 font-light">{feature.description}</p>
                
                <ul className="space-y-3">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-white/70">
                      <CheckCircle2 className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-extralight mb-12 text-center">
            Cas d'usage <span className="text-[#D4AF37]">direction générale</span>
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <h3 className="text-xl font-light mb-3">Préparation COMEX / CODIR</h3>
              <p className="text-white/60 font-light">
                Accédez instantanément à l'état d'avancement de vos initiatives stratégiques, 
                identifiez les points de tension et préparez vos réunions exécutives en quelques minutes.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <h3 className="text-xl font-light mb-3">Arbitrage de priorités</h3>
              <p className="text-white/60 font-light">
                Le Decision Engine analyse votre portefeuille et recommande les meilleurs arbitrages 
                pour maximiser la valeur stratégique tout en respectant vos contraintes budgétaires et capacitaires.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <h3 className="text-xl font-light mb-3">Monitoring stratégique continu</h3>
              <p className="text-white/60 font-light">
                Recevez des alertes intelligentes uniquement sur les situations critiques nécessitant 
                votre attention, sans être noyé dans les détails opérationnels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-extralight mb-6">
            Reprenez le contrôle de votre <span className="text-[#D4AF37]">transformation</span>
          </h2>
          <p className="text-white/60 mb-10 text-lg font-light">
            Discutons de votre contexte et de vos objectifs stratégiques
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

export default SolutionExecutive;
