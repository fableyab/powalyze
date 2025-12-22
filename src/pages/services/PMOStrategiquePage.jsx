import React from 'react';
import { Card } from '@/shared/components/ui/Card';
import { Button } from '@/shared/components/ui/Button';
import { Badge } from '@/shared/components/ui/Badge';
import Footer from '@/components/landing/Footer';
import { FiCheck, FiArrowRight, FiTrendingUp, FiShield, FiZap } from 'react-icons/fi';

const PMOStrategiquePage = () => {
  const features = [
    { title: 'Pilotage Multi-Projets', desc: 'Vue 360° sur tous vos projets stratégiques', icon: FiTrendingUp },
    { title: 'Gouvernance PMO', desc: 'Standards et processus certifiés PMI/PRINCE2', icon: FiShield },
    { title: 'Dashboards Exécutifs', desc: 'KPIs et reporting temps réel pour le COMEX', icon: FiZap },
  ];

  const benefits = [
    'Portfolio management avancé',
    'Gestion des risques intégrée',
    'Allocation optimisée des ressources',
    'Alignement stratégique',
    'ROI et business case tracking',
    'Audit et conformité',
  ];

  return (
    <div className="min-h-screen bg-neutral-975">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Badge className="mb-4">Service Premium</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">PMO Stratégique</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Accompagnement expert pour structurer votre PMO et piloter vos projets stratégiques avec excellence
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
            <h2 className="text-2xl font-bold text-white mb-6">Ce qui est inclus</h2>
            <div className="space-y-3">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-3">
                  <FiCheck className="text-green-500 flex-shrink-0" size={20} />
                  <span className="text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-brand-gold-500/20 to-brand-gold-600/10 border-brand-gold-500/30 p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Prêt à transformer votre PMO ?</h2>
            <p className="text-gray-300 mb-6">
              Nos experts vous accompagnent pour mettre en place un PMO performant aligné sur vos objectifs stratégiques.
            </p>
            <Button variant="primary" size="lg" className="w-full">
              Demander une démo <FiArrowRight className="ml-2" />
            </Button>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PMOStrategiquePage;
