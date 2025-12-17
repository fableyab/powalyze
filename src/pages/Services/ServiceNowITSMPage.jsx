import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { Plug, Check, ArrowRight, AlertCircle, Clock, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ServiceNowITSMPage = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Helmet>
        <title>ServiceNow & ITSM | Powalyze</title>
        <meta name="description" content="Intégration ServiceNow, BMC Remedy et outils ITSM pour un pilotage unifié des incidents et projets." />
      </Helmet>
      <Navbar />

      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              ServiceNow & <span className="text-[#62D84E]">ITSM</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Intégrez ServiceNow, BMC Remedy, Jira Service Management et autres outils ITSM pour un pilotage unifié des incidents, changements et projets IT.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              { icon: AlertCircle, title: 'Incident Management', desc: 'Corrélation automatique incidents ↔ projets avec impact analysis' },
              { icon: Clock, title: 'Change Management', desc: 'Validation CAB intégrée, planning changes synchro avec roadmap PMO' },
              { icon: Layers, title: 'Service Catalog', desc: 'Catalogue services IT accessible depuis portail PMO unifié' }
            ].map((feature, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-8">
                <feature.icon size={32} className="text-[#62D84E] mb-4" />
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/pmo-360-demo">
              <Button className="h-14 px-10 bg-[#62D84E] text-black hover:bg-[#4BC23A] font-bold text-lg">
                Planifier l'intégration
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default ServiceNowITSMPage;
