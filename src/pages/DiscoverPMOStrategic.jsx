
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle2, Layers, Target, TrendingUp } from 'lucide-react';

const DiscoverPMOStrategic = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <div className="pt-32 pb-20 px-6 container mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            PMO Stratégique
          </h1>
          <p className="text-xl text-slate-400">
            Align strategic vision with operational execution. Real-time portfolio visibility.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="bg-blue-500/10 p-3 rounded-lg h-fit">
                <Target className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Vision 360° pour le Top Management</h3>
                <p className="text-slate-400">
                  Obtenez une vue d'ensemble instantanée de tous vos projets. Identifiez les goulots d'étranglement et alignez les ressources sur les priorités stratégiques.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-blue-500/10 p-3 rounded-lg h-fit">
                <Layers className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Gestion Portefeuille</h3>
                <p className="text-slate-400">
                  Priorisation et suivi en temps réel. Gérez les budgets, les risques et les dépendances entre projets complexes avec une facilité déconcertante.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-blue-500/10 p-3 rounded-lg h-fit">
                <TrendingUp className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Performance & ROI</h3>
                <p className="text-slate-400">
                  Mesurez l'impact réel de chaque initiative. Tableaux de bord financiers intégrés pour suivre le CAPEX/OPEX en temps réel.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#1A1A1A] border border-slate-800 rounded-2xl p-2 shadow-2xl shadow-blue-900/20">
             <img 
               src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop" 
               alt="PMO Dashboard" 
               className="rounded-xl w-full h-auto opacity-80 hover:opacity-100 transition-opacity"
             />
          </div>
        </div>

        <div className="text-center">
          <Link to="/demo">
            <Button size="lg" className="bg-[#4A9EFF] hover:bg-[#0052cc] text-white px-10 py-6 text-lg rounded-full">
              Démarrer la transformation
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DiscoverPMOStrategic;
