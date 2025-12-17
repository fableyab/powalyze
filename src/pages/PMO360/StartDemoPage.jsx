import React from 'react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { Button } from '@/components/ui/button';
import { ArrowRight, Layout, DollarSign, TrendingUp, PieChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const StepCard = ({ icon: Icon, title, desc, to, color="white" }) => (
  <div className="bg-[#0F0F0F] border border-white/10 rounded-2xl p-6 h-full flex flex-col">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
        <Icon size={20} className={color === 'gold' ? 'text-[#BFA76A]' : 'text-white'} />
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
    </div>
    <p className="text-gray-400 flex-1">{desc}</p>
    <div className="mt-6">
      <Link to={to} className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#BFA76A]">
        Ouvrir <ArrowRight size={16} />
      </Link>
    </div>
  </div>
);

const StartDemoPage = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-10 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <p className="text-[11px] tracking-[0.35em] text-[#BFA76A] font-bold uppercase">Démonstration guidée</p>
            <h1 className="mt-3 text-4xl md:text-6xl font-display font-bold">Démarrer la Démonstration PMO 360</h1>
            <p className="mt-4 text-lg text-gray-400">Explorez les modules clés en 4 étapes. Pas d'inscription requise.</p>
            <div className="mt-6 flex justify-center gap-3">
              <Link to="/pmo-360-demo?tab=tracking"><Button className="bg-[#BFA76A] text-black font-bold">Commencer</Button></Link>
              <Link to="/contact"><Button variant="outline" className="border-white/20 text-white hover:bg-white/10">Parler à un expert</Button></Link>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StepCard icon={Layout} title="1. Project Tracking" desc="Suivez l'avancement, les jalons et les risques par projet." to="/pmo-360-demo?tab=tracking" color="gold" />
            <StepCard icon={DollarSign} title="2. Financial Overview" desc="Budget vs Réel, CAPEX/OPEX et prévisions." to="/pmo-360/financial-overview" />
            <StepCard icon={TrendingUp} title="3. Sales Performance" desc="Alignement pipeline vs capacité de livraison." to="/pmo-360/sales-performance" />
            <StepCard icon={PieChart} title="4. PMO Reporting" desc="Vue exécutive consolidée pour la direction." to="/pmo-360/pmo-report" />
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center bg-[#0F0F0F] border border-[#BFA76A]/30 p-10 rounded-2xl">
            <h2 className="text-2xl font-display font-bold mb-3">Besoin d'un accompagnement sur-mesure ?</h2>
            <p className="text-gray-400 mb-6">Nous adaptons PMO 360 à votre contexte: intégrations, KPIs, gouvernance.</p>
            <Link to="/contact"><Button className="bg-[#BFA76A] text-black font-bold">Demander une consultation</Button></Link>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
};

export default StartDemoPage;