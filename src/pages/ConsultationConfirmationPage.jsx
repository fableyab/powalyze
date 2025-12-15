import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, Clock, FileText, Share2, Download } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ConsultationConfirmationPage = () => {
  const { toast } = useToast();
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ title: "Lien copié", description: "Le lien vers cette page a été copié." });
  };

  const handleDownload = () => {
    toast({ title: "Téléchargement", description: "Votre récapitulatif PDF est en cours de téléchargement..." });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
       <Navbar />
       <main className="flex-grow flex items-center justify-center py-24 px-4">
          <div className="max-w-4xl w-full space-y-10 animate-in fade-in slide-in-from-bottom-10 duration-700">
             
             <div className="text-center">
                <div className="flex justify-center mb-6">
                   <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                      <CheckCircle className="w-12 h-12 text-green-500" strokeWidth={1.5} />
                   </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Demande Confirmée</h1>
                <p className="text-xl text-gray-400 font-light max-w-xl mx-auto leading-relaxed">
                   Votre demande de consultation (Ref: #CONS-{Math.floor(Math.random()*10000)}) a été enregistrée.
                </p>
             </div>

             <div className="bg-[#111] border border-white/10 rounded-2xl p-8 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                   <h3 className="text-lg font-bold flex items-center gap-2"><Clock size={20} className="text-[#BFA76A]"/> Timeline de Traitement</h3>
                   <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={handleShare}><Share2 size={16}/></Button>
                      <Button variant="ghost" size="sm" onClick={handleDownload}><Download size={16}/></Button>
                   </div>
                </div>
                
                <div className="relative">
                   <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-white/10"></div>
                   
                   <div className="relative flex gap-6 mb-8">
                      <div className="w-12 h-12 rounded-full bg-[#BFA76A] flex items-center justify-center shrink-0 z-10 font-bold text-black border-4 border-[#111]">1</div>
                      <div>
                         <h4 className="font-bold text-white text-lg">Demande Reçue</h4>
                         <p className="text-gray-400 text-sm">Votre dossier a été transmis à notre équipe d'experts.</p>
                         <span className="text-xs text-[#BFA76A] mt-1 block">Complété à l'instant</span>
                      </div>
                   </div>

                   <div className="relative flex gap-6 mb-8 opacity-50">
                      <div className="w-12 h-12 rounded-full bg-[#222] flex items-center justify-center shrink-0 z-10 font-bold text-gray-500 border-4 border-[#111]">2</div>
                      <div>
                         <h4 className="font-bold text-white text-lg">Analyse Préliminaire</h4>
                         <p className="text-gray-400 text-sm">Nous analysons vos besoins pour sélectionner l'expert le plus pertinent.</p>
                         <span className="text-xs text-gray-500 mt-1 block">En attente</span>
                      </div>
                   </div>

                   <div className="relative flex gap-6 opacity-50">
                      <div className="w-12 h-12 rounded-full bg-[#222] flex items-center justify-center shrink-0 z-10 font-bold text-gray-500 border-4 border-[#111]">3</div>
                      <div>
                         <h4 className="font-bold text-white text-lg">Planification</h4>
                         <p className="text-gray-400 text-sm">Vous recevrez une invitation calendaire pour valider le créneau.</p>
                         <span className="text-xs text-gray-500 mt-1 block">Sous 24h</span>
                      </div>
                   </div>
                </div>
             </div>

             <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                   <Button variant="outline" className="border-white/10 h-12 px-8 text-white hover:bg-white hover:text-black">
                      Retour à l'accueil
                   </Button>
                </Link>
                <Link to="/resources">
                   <Button className="bg-[#BFA76A] text-black hover:bg-white font-bold h-12 px-8">
                      Parcourir nos ressources <ArrowRight size={16} className="ml-2" />
                   </Button>
                </Link>
             </div>
          </div>
       </main>
       <FooterSection />
    </div>
  );
};

export default ConsultationConfirmationPage;