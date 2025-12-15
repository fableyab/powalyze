import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { Target, ShieldCheck, Database, Bot, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ServiceCard = ({ icon: Icon, title, desc, link, image }) => (
  <Link to={link} className="group block h-full">
    <div className="bg-[#111] rounded-xl border border-white/10 h-full flex flex-col hover:border-[#BFA76A]/50 transition-all duration-300 overflow-hidden relative">
       {/* Image Overlay */}
       <div className="h-48 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/60 z-10 group-hover:bg-black/40 transition-colors"></div>
          {image}
       </div>
       
       <div className="p-8 flex-1 flex flex-col relative z-20 -mt-10">
          <div className="w-16 h-16 bg-[#111] rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#BFA76A] transition-colors border border-white/10 shadow-xl">
             <Icon size={32} className="text-[#BFA76A] group-hover:text-black transition-colors" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#BFA76A] transition-colors">{title}</h3>
          <p className="text-gray-400 mb-8 flex-1 leading-relaxed">{desc}</p>
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white group-hover:gap-3 transition-all mt-auto">
             En savoir plus <ArrowRight size={16} />
          </div>
       </div>
    </div>
  </Link>
);

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Helmet>
        <title>Services | Powalyze</title>
        <meta name="description" content="Découvrez nos services de conseil : PMO Stratégique, Gouvernance, Business Intelligence et Automation." />
      </Helmet>
      <Navbar />

      <main className="pt-32 pb-20 px-6">
         <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-20 relative">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#BFA76A] blur-[100px] opacity-20 -z-10"></div>
               <span className="text-[#BFA76A] font-bold uppercase tracking-[0.2em] mb-4 block text-xs">Notre Expertise</span>
               <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Solutions pour Dirigeants</h1>
               <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                  Une suite complète de services pour transformer votre organisation, du pilotage stratégique à l'intelligence artificielle.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
               <ServiceCard 
                 icon={Target}
                 title="PMO & Gouvernance"
                 desc="Alignez vos portefeuilles de projets avec la stratégie globale. Pilotage, priorisation et optimisation des ressources."
                 link="/services/pmo-governance"
                 image={<img alt="Strategic meeting in glass boardroom" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1690191967971-8cc8e7e2c295" />}
               />
               <ServiceCard 
                 icon={ShieldCheck}
                 title="Pilotage de Programmes"
                 desc="Sécurisez vos opérations complexes avec des cadres de gouvernance robustes et une gestion proactive des risques."
                 link="/services/pilotage-programmes"
                 image={<img alt="Global program map visualization" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1667371927761-8fa90f33a248" />}
               />
               <ServiceCard 
                 icon={Database}
                 title="Data Analytics"
                 desc="Transformez vos données en leviers de décision. Dashboards Power BI, Data Warehousing et Analytics avancé."
                 link="/services/data-analytics"
                 image={<img alt="Data analytics dashboard close-up" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1571677246347-5040036b95cc" />}
               />
               <ServiceCard 
                 icon={Bot}
                 title="Transformation Digitale"
                 desc="Automatisez les tâches à faible valeur ajoutée et intégrez l'IA pour prédire les dérives projets."
                 link="/services/digital-transformation"
                 image={<img alt="AI brain network concept" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1549925245-f20a1bac6454" />}
               />
            </div>

            {/* CTA */}
            <div className="bg-[#111] border border-[#BFA76A]/30 p-12 rounded-2xl text-center relative overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
               <div className="relative z-10">
                  <h2 className="text-3xl font-display font-bold mb-6">Besoin d'un accompagnement sur-mesure ?</h2>
                  <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                     Chaque organisation est unique. Discutons de vos défis spécifiques.
                  </p>
                  <a href="https://powalyze.ch/pmo-360-demo" target="_blank" rel="noopener noreferrer">
                     <Button className="h-14 px-10 text-lg bg-[#BFA76A] text-black hover:bg-white font-bold">
                        Prendre rendez-vous
                     </Button>
                  </a>
               </div>
            </div>
         </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default ServicesPage;