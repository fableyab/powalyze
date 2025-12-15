import React from 'react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const HelpPage = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
       <Navbar />
       <main className="flex-grow pt-32 pb-20 container mx-auto px-6">
          <h1 className="text-3xl font-bold mb-4 text-center">Centre d'Aide & FAQ</h1>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">Trouvez des réponses à vos questions courantes sur nos services de consultation et l'utilisation de la plateforme.</p>
          
          <div className="max-w-3xl mx-auto">
             <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-white/10">
                   <AccordionTrigger>Comment fonctionne la consultation ?</AccordionTrigger>
                   <AccordionContent className="text-gray-400">
                      Une fois votre demande envoyée, notre équipe analyse vos besoins et vous propose un créneau avec l'expert le plus qualifié sous 24h.
                   </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-white/10">
                   <AccordionTrigger>Est-ce gratuit ?</AccordionTrigger>
                   <AccordionContent className="text-gray-400">
                      La première consultation de qualification (30 min) est offerte pour évaluer l'adéquation de nos services avec vos besoins.
                   </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-white/10">
                   <AccordionTrigger>Comment activer le 2FA ?</AccordionTrigger>
                   <AccordionContent className="text-gray-400">
                      Rendez-vous dans votre Profil > Sécurité et activez l'authentification à deux facteurs pour sécuriser votre compte.
                   </AccordionContent>
                </AccordionItem>
             </Accordion>
          </div>
       </main>
       <FooterSection />
    </div>
  );
};

export default HelpPage;