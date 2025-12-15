import React from 'react';
import { PageHeader, Card } from '@/components/ui/DashboardComponents';
import { Database, ShieldCheck, Zap, Users, Globe, Sliders } from 'lucide-react';
import { Link } from 'react-router-dom';

const NavCard = ({ icon: Icon, title, desc, link, color = "text-[#BFA76A]" }) => (
  <Link to={link}>
    <Card className="group h-64 flex flex-col items-center justify-center text-center hover:bg-[#252525] transition-all duration-300 border border-transparent hover:border-[#333] cursor-pointer">
      <div className={`p-6 rounded-full bg-[#0A0A0A] ${color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={40} strokeWidth={1} />
      </div>
      <h3 className="text-xl font-light text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-500 max-w-[200px]">{desc}</p>
    </Card>
  </Link>
);

const NavigationPage = () => {
  return (
    <div>
      <PageHeader 
        title="Navigation Globale" 
        subtitle="Hub Centralisé des Domaines"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <NavCard 
          icon={Database} 
          title="Data Architecture" 
          desc="Modélisation, flux et qualité des données d'entreprise."
          link="/analysis"
        />
        <NavCard 
          icon={ShieldCheck} 
          title="Gouvernance & PMO" 
          desc="Standards, méthodes et conformité des projets."
          link="/portfolios"
          color="text-[#3A7BFF]"
        />
        <NavCard 
          icon={Zap} 
          title="Automatisation" 
          desc="Bots, workflows intelligents et IA générative."
          link="/reporting"
        />
        <NavCard 
          icon={Users} 
          title="Ressources Humaines" 
          desc="Allocation, capacité et suivi des temps."
          link="/kpis"
          color="text-[#3A7BFF]"
        />
        <NavCard 
          icon={Globe} 
          title="Stratégie Global" 
          desc="Alignement business et roadmap long terme."
          link="/portfolios"
        />
        <NavCard 
          icon={Sliders} 
          title="Paramètres" 
          desc="Configuration des seuils et administration."
          link="/"
          color="text-gray-400"
        />
      </div>
    </div>
  );
};

export default NavigationPage;