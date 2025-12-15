
import React, { useState } from 'react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import SEO from '@/components/SEO';
import ServiceCard from '@/components/ServiceCard';
import { Activity, Target, BarChart3, Cpu, Layers, FileBarChart, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

const ServicesPage = () => {
  const [searchTerm, setSearchQuery] = useState("");

  const allServices = [
    { 
      id: "pilotage-it", 
      icon: Activity, 
      title: "Pilotage IT", 
      desc: "Optimisez votre infrastructure IT avec une gestion stratégique et une gouvernance efficace.",
      link: "/services/pilotage-it",
      category: "Gouvernance"
    },
    { 
      id: "pmo-strategique", 
      icon: Target, 
      title: "PMO Stratégique", 
      desc: "Alignez vos projets avec la stratégie d'entreprise grâce à une gestion de portefeuille optimisée.",
      link: "/services/pmo-strategique",
      category: "PMO"
    },
    { 
      id: "data-power-bi", 
      icon: BarChart3, 
      title: "Data & Power BI", 
      desc: "Transformez vos données en insights actionnables avec nos solutions de BI avancée.",
      link: "/services/data-power-bi",
      category: "Data"
    },
    { 
      id: "automatisation-ia", 
      icon: Cpu, 
      title: "Automatisation & IA", 
      desc: "Automatisez vos processus métier et exploitez l'IA pour améliorer l'efficacité opérationnelle.",
      link: "/services/automatisation-ia",
      category: "Automation"
    },
    { 
      id: "portefeuilles-priorisation", 
      icon: Layers, 
      title: "Portefeuilles & Priorisation", 
      desc: "Gérez efficacement votre portefeuille avec une priorisation basée sur la valeur.",
      link: "/services/portefeuilles-priorisation",
      category: "PMO"
    },
    { 
      id: "reporting-executif", 
      icon: FileBarChart, 
      title: "Reporting Exécutif", 
      desc: "Fournissez aux décideurs des rapports clairs pour une gouvernance optimale.",
      link: "/services/reporting-executif",
      category: "Data"
    }
  ];

  const filteredServices = allServices.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans">
      <SEO 
        title="Nos Services | Powalyze"
        description="Découvrez l'ensemble de nos expertises en PMO, Data et Gouvernance."
      />
      <Navbar />
      
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 px-6 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#BFA76A]/5 rounded-full blur-[120px] pointer-events-none"></div>
           <div className="container mx-auto max-w-7xl relative z-10 text-center">
              <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
                 Nos Expertises
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
                 Une suite complète de solutions pour accompagner votre transformation digitale et organisationnelle.
              </p>
              
              {/* Search */}
              <div className="max-w-md mx-auto relative">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                 <Input 
                    type="text" 
                    placeholder="Rechercher un service..." 
                    className="pl-12 bg-[#111] border-white/10 text-white h-12 rounded-full focus:border-[#BFA76A]"
                    value={searchTerm}
                    onChange={(e) => setSearchQuery(e.target.value)}
                 />
              </div>
           </div>
        </section>

        {/* Services Grid */}
        <section className="pb-24 px-6">
           <div className="container mx-auto max-w-7xl">
              {filteredServices.length > 0 ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredServices.map((service, index) => (
                       <motion.div
                          key={service.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                       >
                          <ServiceCard {...service} />
                       </motion.div>
                    ))}
                 </div>
              ) : (
                 <div className="text-center py-20 text-gray-500">
                    Aucun service trouvé pour "{searchTerm}".
                 </div>
              )}
           </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
};

export default ServicesPage;
