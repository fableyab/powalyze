
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BarChart2, Database, Lock, RefreshCw } from 'lucide-react';

const DiscoverDataPowerBI = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <div className="pt-32 pb-20 px-6 container mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
            Data Intelligence & Power BI
          </h1>
          <p className="text-xl text-slate-400">
            Transform raw data into actionable insights. Advanced Power BI implementation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
           <div className="bg-[#1A1A1A] border border-slate-800 rounded-2xl p-2 shadow-2xl shadow-yellow-900/20 order-2 md:order-1">
             <img 
               src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
               alt="Data Analytics" 
               className="rounded-xl w-full h-auto opacity-80 hover:opacity-100 transition-opacity"
             />
          </div>

          <div className="space-y-8 order-1 md:order-2">
            <div className="flex gap-4">
              <div className="bg-yellow-500/10 p-3 rounded-lg h-fit">
                <RefreshCw className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Reporting Automatisé</h3>
                <p className="text-slate-400">
                  Plus d'Excel manuel. Données live. Connectez vos sources de données et laissez Powalyze générer vos rapports exécutifs automatiquement.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-yellow-500/10 p-3 rounded-lg h-fit">
                <BarChart2 className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Power BI Embedded</h3>
                <p className="text-slate-400">
                  Intégration native de vos rapports Power BI directement dans votre portail. Une expérience fluide sans changer d'outil.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-yellow-500/10 p-3 rounded-lg h-fit">
                <Lock className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Sécurité RLS</h3>
                <p className="text-slate-400">
                  Row Level Security (RLS) garantit que chaque utilisateur ne voit que les données auxquelles il a droit. Gouvernance des données stricte.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link to="/demo">
            <Button size="lg" className="bg-[#FFD700] hover:bg-[#e6c200] text-black font-bold px-10 py-6 text-lg rounded-full">
              Optimiser mes données
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DiscoverDataPowerBI;
