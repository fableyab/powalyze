import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { Network, Check, ArrowRight, Database, Lock, Workflow } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const SAPConnectorPage = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Helmet>
        <title>Connecteur SAP | Powalyze</title>
        <meta name="description" content="Intégration native SAP ERP, S/4HANA et SuccessFactors pour un pilotage temps réel." />
      </Helmet>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-transparent"></div>
        <div className="absolute top-20 left-0 w-96 h-96 bg-blue-600 blur-[150px] opacity-10"></div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-600/30 px-4 py-2 rounded-full mb-6">
                <Network className="text-blue-500" size={16} />
                <span className="text-xs uppercase tracking-wider text-blue-500 font-semibold">ERP Enterprise</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
                Connecteur <span className="text-blue-500">SAP</span>
              </h1>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Synchronisez SAP ERP, S/4HANA, SuccessFactors et Ariba avec vos tableaux de bord PMO. Reporting financier temps réel, gestion RH et procurement intégrés.
              </p>
              <div className="flex gap-4">
                <Link to="/pmo-360-demo">
                  <Button className="h-14 px-8 bg-blue-600 text-white hover:bg-blue-700 font-bold text-lg">
                    Voir la démo <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="h-14 px-8 border-white/20 text-white hover:bg-white/5">
                    Contact
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-[#111] to-[#1a1a1a] rounded-2xl border border-white/10 p-8 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-blue-600/20 rounded-xl flex items-center justify-center">
                    <Network size={32} className="text-blue-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">SAP Ecosystem</div>
                    <div className="text-2xl font-bold">ERP Intégré</div>
                  </div>
                </div>
                <div className="space-y-3">
                  {['SAP ERP 6.0', 'S/4HANA Cloud', 'SuccessFactors', 'Ariba Network'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-black/30 p-3 rounded-lg">
                      <Check size={18} className="text-green-500" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-[#0F0F0F]">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Intégration Complète</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Connectez tous les modules SAP à votre écosystème PMO
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Database,
                title: 'Données Financières',
                desc: 'FICO, controlling, comptabilité analytique synchronisés avec vos projets. Suivi budget et écarts en temps réel.',
                color: '#3B82F6'
              },
              {
                icon: Lock,
                title: 'Sécurité SAP Native',
                desc: 'RFC sécurisé, authentification SAP, gestion des rôles et authorizations. Conformité SOX et audit trail.',
                color: '#BFA76A'
              },
              {
                icon: Workflow,
                title: 'Workflows Automatisés',
                desc: 'Création automatique de commandes, validation budgétaire, notification escalations via SAP Workflow.',
                color: '#10B981'
              }
            ].map((feature, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-8 hover:border-blue-500/50 transition-all">
                <div className="w-14 h-14 rounded-xl bg-black/50 flex items-center justify-center mb-6">
                  <feature.icon size={28} style={{ color: feature.color }} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl font-display font-bold mb-12 text-center">Cas d'Usage Enterprise</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Pilotage Financier',
                desc: 'Consolidation automatique des coûts projets depuis SAP FICO. Analyse des écarts budgétaires, forecast et reforecast en 1 clic.',
                metrics: ['Temps de clôture -70%', 'Précision 99.8%', 'Conformité SOX']
              },
              {
                title: 'Gestion RH & Ressources',
                desc: 'SuccessFactors intégré : planification ressources, gestion compétences, onboarding automatique sur les projets.',
                metrics: ['Affectation en 2min', 'Turnover -25%', 'Satisfaction 4.7/5']
              },
              {
                title: 'Procurement & Achats',
                desc: 'Ariba Network connecté pour le suivi des commandes, réceptions, facturations liées aux projets. Workflow validation intégré.',
                metrics: ['Lead time -40%', 'Savings +15%', 'Supplier score visible']
              },
              {
                title: 'Reporting Exécutif SAP',
                desc: 'Dashboards Power BI alimentés par SAP BW/4HANA. Vue consolidée de tous les projets avec drill-down jusqu\'aux écritures comptables.',
                metrics: ['Temps réel', '50+ KPIs', 'Export Excel/PDF']
              }
            ].map((usecase, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-8 hover:border-blue-500/30 transition-all">
                <h3 className="text-2xl font-bold mb-4">{usecase.title}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{usecase.desc}</p>
                <div className="flex flex-wrap gap-3">
                  {usecase.metrics.map((metric, j) => (
                    <span key={j} className="text-xs bg-blue-600/10 text-blue-500 px-3 py-1 rounded-full font-semibold">
                      {metric}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-br from-[#111] to-[#1a1a1a] border border-blue-600/30 rounded-2xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-display font-bold mb-6">Connecter SAP maintenant</h2>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Installation certifiée SAP. Conformité garantie. Support dédié.
              </p>
              <Link to="/pmo-360-demo">
                <Button className="h-14 px-10 bg-blue-600 text-white hover:bg-blue-700 font-bold text-lg">
                  Planifier l'intégration
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default SAPConnectorPage;
