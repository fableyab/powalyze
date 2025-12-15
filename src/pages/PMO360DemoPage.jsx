import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { Button } from '@/components/ui/button';
import { CheckCircle, PieChart, TrendingUp, DollarSign, Layout, Star, Shield, Users, Zap } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-[#111] p-6 rounded-xl border border-white/10 hover:border-[#BFA76A]/50 transition-all duration-300 h-full flex flex-col">
    <div className="w-12 h-12 bg-[#BFA76A]/10 rounded-full flex items-center justify-center text-[#BFA76A] mb-4">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400 leading-relaxed flex-grow">{description}</p>
  </div>
);

const PMO360DemoPage = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#BFA76A]/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#BFA76A] font-bold tracking-widest uppercase text-sm mb-4 block">
              Solution Intégrée
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              Powalyze <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BFA76A] to-[#E3D5A5]">PMO 360</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              Découvrez la puissance de notre solution PMO intégrée. Centralisez, analysez et optimisez la gestion de votre portefeuille de projets.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://powalyze.ch/pmo-360-demo" target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#BFA76A] text-black hover:bg-white font-bold h-14 px-8 text-lg w-full sm:w-auto">
                   Demander une Consultation
                </Button>
              </a>
              <Link to="/pmo-360-demo">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 h-14 px-8 text-lg w-full sm:w-auto">
                   Commencer la Démonstration
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="py-20 px-6">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-5xl font-bold mb-6">Modules Principaux</h2>
               <p className="text-gray-400 max-w-2xl mx-auto">
                  Découvrez les piliers de notre solution, conçus pour couvrir tous les aspects de la gestion de projet moderne.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               <Link to="/pmo-360-demo?tab=tracking" className="block h-full">
                  <FeatureCard 
                     icon={Layout} 
                     title="Project Tracking" 
                     description="Suivi détaillé de l'avancement, des jalons et des livrables pour chaque projet du portefeuille."
                  />
               </Link>
               <Link to="/pmo-360/financial-overview" className="block h-full">
                  <FeatureCard 
                     icon={DollarSign} 
                     title="Financial Overview" 
                     description="Contrôle budgétaire précis, suivi du CAPEX/OPEX et prévisions financières automatisées."
                  />
               </Link>
               <Link to="/pmo-360/sales-performance" className="block h-full">
                  <FeatureCard 
                     icon={TrendingUp} 
                     title="Sales Performance" 
                     description="Alignement entre les opportunités commerciales et la capacité de livraison des projets."
                  />
               </Link>
               <Link to="/pmo-360/pmo-report" className="block h-full">
                  <FeatureCard 
                     icon={PieChart} 
                     title="PMO Reporting" 
                     description="Rapports exécutifs consolidés pour la direction générale et les comités de pilotage."
                  />
               </Link>
            </div>
         </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-[#0F0F0F] border-y border-white/5">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
               <h2 className="text-3xl font-bold mb-4">Pourquoi choisir PMO 360 ?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
               <div className="p-6">
                  <div className="text-5xl font-bold text-[#BFA76A] mb-4">+30%</div>
                  <h3 className="text-xl font-bold text-white mb-2">Productivité</h3>
                  <p className="text-gray-400">Gagnez du temps sur le reporting manuel et concentrez-vous sur l'analyse.</p>
               </div>
               <div className="p-6 border-x border-white/5">
                  <div className="text-5xl font-bold text-[#3A7BFF] mb-4">-20%</div>
                  <h3 className="text-xl font-bold text-white mb-2">Coûts Opérationnels</h3>
                  <p className="text-gray-400">Optimisez l'allocation des ressources et réduisez les gaspillages.</p>
               </div>
               <div className="p-6">
                  <div className="text-5xl font-bold text-green-500 mb-4">100%</div>
                  <h3 className="text-xl font-bold text-white mb-2">Visibilité</h3>
                  <p className="text-gray-400">Accédez à une donnée fiable et unique pour toutes vos décisions.</p>
               </div>
            </div>
         </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-6">
         <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Cas d'Usage</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="bg-[#111] p-8 rounded-xl border border-white/10">
                  <Shield className="text-[#BFA76A] mb-4" size={32} />
                  <h3 className="text-xl font-bold mb-2">Secteur Bancaire</h3>
                  <p className="text-gray-400">Mise en conformité réglementaire et pilotage de 50+ projets de transformation digitale simultanés.</p>
               </div>
               <div className="bg-[#111] p-8 rounded-xl border border-white/10">
                  <Zap className="text-[#BFA76A] mb-4" size={32} />
                  <h3 className="text-xl font-bold mb-2">Industrie</h3>
                  <p className="text-gray-400">Optimisation de la chaîne de production et suivi en temps réel des coûts de fabrication (CAPEX).</p>
               </div>
               <div className="bg-[#111] p-8 rounded-xl border border-white/10">
                  <Users className="text-[#BFA76A] mb-4" size={32} />
                  <h3 className="text-xl font-bold mb-2">Services Publics</h3>
                  <p className="text-gray-400">Transparence budgétaire et suivi de l'impact citoyen des projets d'infrastructure.</p>
               </div>
            </div>
         </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6">
         <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Plans & Tarifs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {/* Starter */}
               <div className="bg-[#111] p-8 rounded-xl border border-white/10 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-2">Starter</h3>
                  <div className="text-3xl font-bold text-white mb-6">CHF 2'500<span className="text-sm text-gray-500 font-normal">/mois</span></div>
                  <ul className="space-y-3 text-gray-400 mb-8 flex-grow">
                     <li className="flex gap-2"><CheckCircle size={16} className="text-green-500"/> 5 Utilisateurs</li>
                     <li className="flex gap-2"><CheckCircle size={16} className="text-green-500"/> Dashboard Standard</li>
                     <li className="flex gap-2"><CheckCircle size={16} className="text-green-500"/> Support Email</li>
                  </ul>
                  <Button variant="outline" className="w-full border-white/20">Choisir</Button>
               </div>
               
               {/* Pro (Featured) */}
               <div className="bg-[#1A1A1A] p-8 rounded-xl border border-[#BFA76A] relative flex flex-col transform scale-105 shadow-2xl shadow-[#BFA76A]/10">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#BFA76A] text-black px-4 py-1 text-xs font-bold rounded-full uppercase">Populaire</div>
                  <h3 className="text-xl font-bold text-white mb-2">Professional</h3>
                  <div className="text-3xl font-bold text-[#BFA76A] mb-6">CHF 5'000<span className="text-sm text-gray-500 font-normal">/mois</span></div>
                  <ul className="space-y-3 text-gray-300 mb-8 flex-grow">
                     <li className="flex gap-2"><CheckCircle size={16} className="text-[#BFA76A]"/> 20 Utilisateurs</li>
                     <li className="flex gap-2"><CheckCircle size={16} className="text-[#BFA76A]"/> Custom Power BI Reports</li>
                     <li className="flex gap-2"><CheckCircle size={16} className="text-[#BFA76A]"/> Support Prioritaire</li>
                  </ul>
                  <Button className="w-full bg-[#BFA76A] text-black hover:bg-white font-bold">Commencer</Button>
               </div>

               {/* Enterprise */}
               <div className="bg-[#111] p-8 rounded-xl border border-white/10 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-2">Enterprise</h3>
                  <div className="text-3xl font-bold text-white mb-6">Sur Mesure</div>
                  <ul className="space-y-3 text-gray-400 mb-8 flex-grow">
                     <li className="flex gap-2"><CheckCircle size={16} className="text-green-500"/> Utilisateurs Illimités</li>
                     <li className="flex gap-2"><CheckCircle size={16} className="text-green-500"/> Déploiement On-Premise</li>
                     <li className="flex gap-2"><CheckCircle size={16} className="text-green-500"/> Dedicated Success Manager</li>
                  </ul>
                  <a href="https://powalyze.ch/pmo-360-demo" target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button variant="outline" className="w-full border-white/20">Nous Contacter</Button>
                  </a>
               </div>
            </div>
         </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-[#0F0F0F]">
         <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8 flex justify-center gap-1 text-[#BFA76A]">
               <Star fill="currentColor" />
               <Star fill="currentColor" />
               <Star fill="currentColor" />
               <Star fill="currentColor" />
               <Star fill="currentColor" />
            </div>
            <blockquote className="text-2xl italic text-white mb-6">
               "PMO 360 a transformé notre façon de piloter les projets. Nous sommes passés d'une gestion réactive à une gestion proactive basée sur la donnée."
            </blockquote>
            <cite className="text-gray-400 not-italic block font-bold">- Directeur de Programme, Banque Privée Suisse</cite>
         </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6">
         <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Questions Fréquentes</h2>
            <Accordion type="single" collapsible className="w-full">
               <AccordionItem value="item-1" className="border-white/10">
                  <AccordionTrigger className="text-white hover:text-[#BFA76A]">Combien de temps faut-il pour déployer PMO 360 ?</AccordionTrigger>
                  <AccordionContent className="text-gray-400">
                     Le déploiement standard prend entre 2 et 4 semaines, selon la complexité de vos sources de données actuelles.
                  </AccordionContent>
               </AccordionItem>
               <AccordionItem value="item-2" className="border-white/10">
                  <AccordionTrigger className="text-white hover:text-[#BFA76A]">Est-ce compatible avec SAP / JIRA / DevOps ?</AccordionTrigger>
                  <AccordionContent className="text-gray-400">
                     Oui, PMO 360 utilise la puissance de Power BI pour se connecter à des centaines de sources de données, y compris les ERP et outils de gestion standards.
                  </AccordionContent>
               </AccordionItem>
               <AccordionItem value="item-3" className="border-white/10">
                  <AccordionTrigger className="text-white hover:text-[#BFA76A]">Mes données sont-elles sécurisées ?</AccordionTrigger>
                  <AccordionContent className="text-gray-400">
                     Absolument. Nous utilisons l'infrastructure sécurisée de Microsoft Azure et respectons les normes de conformité suisses (nLPD) et européennes (GDPR).
                  </AccordionContent>
               </AccordionItem>
            </Accordion>
         </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default PMO360DemoPage;