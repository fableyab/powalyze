import React from 'react';
import { Card } from '@/shared/components/ui/Card';
import { Button } from '@/shared/components/ui/Button';
import { Badge } from '@/shared/components/ui/Badge';
import Footer from '@/components/landing/Footer';
import { FiCpu, FiZap, FiTrendingUp, FiCheck, FiArrowRight } from 'react-icons/fi';

const AutomatisationIAPage = () => {
  const features = [
    { title: 'IA Générative', desc: 'Automatisation des tâches répétitives avec GPT-4', icon: FiCpu },
    { title: 'Workflows Intelligents', desc: 'Processus automatisés de bout en bout', icon: FiZap },
    { title: 'Analytics Prédictifs', desc: 'Anticipation des risques et opportunités', icon: FiTrendingUp },
  ];

  const useCases = [
    'Génération automatique de rapports PMO',
    'Classification intelligente des documents',
    'Prédiction des délais et budgets',
    'Chatbot assistant PMO 24/7',
    'Extraction de données depuis emails',
    'Recommandations de priorisation',
  ];

  return (
    <div className="min-h-screen bg-neutral-975">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Badge className="mb-4">Innovation IA</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Automatisation & IA</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Libérez le potentiel de l'IA pour automatiser vos processus PMO et gagner jusqu'à 70% de temps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, i) => (
            <Card key={i} className="bg-neutral-950 border-white/10 p-8 text-center hover:border-brand-gold-500/50 transition-all">
              <feature.icon className="text-brand-gold-500 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <Card className="bg-neutral-950 border-white/10 p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Cas d'usage concrets</h2>
            <div className="space-y-3">
              {useCases.map((useCase, i) => (
                <div key={i} className="flex items-center gap-3">
                  <FiCheck className="text-green-500 flex-shrink-0" size={20} />
                  <span className="text-gray-300">{useCase}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border-purple-500/30 p-8">
            <h2 className="text-2xl font-bold text-white mb-4">L'IA au service de votre PMO</h2>
            <p className="text-gray-300 mb-6">
              Découvrez comment nos solutions d'IA peuvent transformer votre manière de piloter les projets.
            </p>
            <Button variant="primary" size="lg" className="w-full">
              Réserver une démo IA <FiArrowRight className="ml-2" />
            </Button>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AutomatisationIAPage;
