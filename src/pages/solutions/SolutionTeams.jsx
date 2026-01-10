import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Users,
  CheckSquare,
  MessageSquare,
  FileText,
  ArrowRight,
  CheckCircle2,
  Smartphone
} from 'lucide-react';

const SolutionTeams = () => {
  const features = [
    {
      icon: CheckSquare,
      title: 'Gestion des tâches intuitive',
      description: 'Kanban, listes, calendrier : organisez comme vous voulez',
      benefits: [
        'Interface moderne et fluide',
        'Drag & drop naturel',
        'Filtres intelligents',
        'Vue personnalisable'
      ]
    },
    {
      icon: MessageSquare,
      title: 'Collaboration temps réel',
      description: 'Commentaires, mentions, notifications instantanées',
      benefits: [
        'Chat intégré par projet',
        'Mentions @utilisateur',
        'Notifications push',
        'Historique complet'
      ]
    },
    {
      icon: FileText,
      title: 'Documents centralisés',
      description: 'Tous vos fichiers au même endroit, toujours à jour',
      benefits: [
        'Upload drag & drop',
        'Versioning automatique',
        'Preview en ligne',
        'Partage sécurisé'
      ]
    },
    {
      icon: Smartphone,
      title: 'Mobile-first',
      description: 'Travaillez depuis n\'importe où, même offline',
      benefits: [
        'App iOS et Android',
        'Mode offline',
        'Synchronisation auto',
        'Interface optimisée'
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
            <Users className="w-4 h-4" />
            <span>Solution Équipes</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-extralight mb-6 leading-tight">
            L'outil que vos <span className="text-[#D4AF37]">équipes terrain</span> vont adopter
          </h1>
          
          <p className="text-xl text-white/60 mb-12 max-w-3xl mx-auto font-light">
            Interface moderne, collaboration fluide, mobile-first : 
            tout ce dont vos équipes ont besoin pour exécuter efficacement.
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
              <Link to="/demo-mode">
                Voir la démo
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
              Conçu pour les <span className="text-[#D4AF37]">équipes opérationnelles</span>
            </h2>
            <p className="text-white/60 text-lg font-light max-w-2xl mx-auto">
              Simple, rapide, mobile : tout pour être efficace au quotidien
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

      {/* Why Teams Love It */}
      <section className="py-24 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-extralight mb-12 text-center">
            Pourquoi les équipes <span className="text-[#D4AF37]">adorent</span> Powalyze
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <h3 className="text-xl font-light mb-3">💨 Rapide à prendre en main</h3>
              <p className="text-white/60 font-light">
                Interface intuitive, onboarding guidé : vos équipes sont opérationnelles 
                en quelques minutes, sans formation complexe.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <h3 className="text-xl font-light mb-3">📱 Pensé mobile d'abord</h3>
              <p className="text-white/60 font-light">
                Vos équipes terrain travaillent depuis leur smartphone ? Powalyze 
                offre la même expérience sur mobile que sur desktop.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <h3 className="text-xl font-light mb-3">🎯 Concentré sur l'essentiel</h3>
              <p className="text-white/60 font-light">
                Pas de fonctionnalités superflues. Juste ce qu'il faut pour 
                gérer vos tâches, collaborer et avancer.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <h3 className="text-xl font-light mb-3">🔗 Toujours synchronisé</h3>
              <p className="text-white/60 font-light">
                Modification en temps réel, notifications instantanées : 
                toute l'équipe reste alignée, où qu'elle soit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Integration with PMO */}
      <section className="py-24 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-gradient-to-br from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/30 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-extralight mb-4">
              Équipes terrain + PMO = <span className="text-[#D4AF37]">vision unifiée</span>
            </h2>
            <p className="text-white/60 mb-8 font-light max-w-2xl mx-auto">
              Vos équipes travaillent, le PMO supervise, la direction pilote. 
              Tout est connecté dans une seule plateforme.
            </p>
            <Button 
              asChild
              size="lg"
              className="bg-[#D4AF37] hover:bg-[#B89659] text-[#000000] font-medium"
            >
              <Link to="/pmo">
                Découvrir la vision PMO
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-extralight mb-6">
            Offrez à vos équipes le <span className="text-[#D4AF37]">meilleur outil</span>
          </h2>
          <p className="text-white/60 mb-10 text-lg font-light">
            Simple, moderne, efficace : tout pour réussir vos projets
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg"
              className="bg-[#D4AF37] hover:bg-[#B89659] text-[#000000] font-medium"
            >
              <Link to="/signup">
                Créer mon compte
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

      <Footer />
    </div>
  );
};

export default SolutionTeams;
