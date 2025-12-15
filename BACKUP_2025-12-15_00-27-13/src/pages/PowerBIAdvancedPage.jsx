import React from 'react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Zap, Layout, Settings, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PowerBIAdvancedPage = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-20 container mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
           Power BI <span className="text-[#BFA76A]">Advanced</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
           Allez au-delà des rapports standards. Découvrez nos capacités avancées en modélisation de données, DAX complexe et architectures d'entreprise.
        </p>
        <div className="flex justify-center gap-4">
           <Link to="/contact">
              <Button className="bg-[#BFA76A] text-black hover:bg-white font-bold h-12 px-8">
                 Parler à un Expert
              </Button>
           </Link>
           <Link to="/pmo-demo">
              <Button variant="outline" className="h-12 px-8 border-white/20 text-white hover:bg-white/10">
                 Voir la Solution PMO
              </Button>
           </Link>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 bg-[#111]">
         <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
               <h2 className="text-3xl font-bold mb-6">Capacités Techniques</h2>
               
               <div className="flex gap-4">
                  <div className="mt-1"><Zap className="text-[#BFA76A]" size={24}/></div>
                  <div>
                     <h3 className="text-xl font-bold mb-2">DAX Optimisé</h3>
                     <p className="text-gray-400">Création de mesures complexes, Time Intelligence, et optimisation des performances de calcul.</p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="mt-1"><Layout className="text-[#BFA76A]" size={24}/></div>
                  <div>
                     <h3 className="text-xl font-bold mb-2">Modélisation en Étoile</h3>
                     <p className="text-gray-400">Architecture de données robuste (Star Schema) pour des rapports rapides et maintenables.</p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="mt-1"><Settings className="text-[#BFA76A]" size={24}/></div>
                  <div>
                     <h3 className="text-xl font-bold mb-2">Row-Level Security (RLS)</h3>
                     <p className="text-gray-400">Sécurisation des données par utilisateur, rôle ou département.</p>
                  </div>
               </div>
            </div>
            
            <div className="relative bg-[#0A0A0A] rounded-xl border border-white/10 p-8 flex flex-col justify-center">
               <div className="absolute inset-0 bg-gradient-to-br from-[#BFA76A]/5 to-transparent rounded-xl"></div>
               <h3 className="text-2xl font-bold mb-6 relative z-10">Exemple de Mesure DAX</h3>
               <pre className="bg-[#1A1A1A] p-4 rounded-lg text-sm text-gray-300 font-mono overflow-x-auto relative z-10 border border-white/5">
{`YTD Revenue = 
CALCULATE(
    [Total Revenue],
    DATESYTD('Date'[Date])
)`}
               </pre>
               <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500 mb-4">Nous auditons et optimisons vos modèles existants.</p>
                  <Link to="/contact">
                     <Button variant="outline" size="sm" className="border-[#BFA76A] text-[#BFA76A] hover:bg-[#BFA76A] hover:text-black">
                        Demander un Audit
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

export default PowerBIAdvancedPage;