
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Bot, Zap, ShieldAlert, Workflow } from 'lucide-react';

const DiscoverAutomationAI = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <div className="pt-32 pb-20 px-6 container mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
            Automation & IA
          </h1>
          <p className="text-xl text-slate-400">
            Automatisez le banal, focalisez-vous sur le stratégique. IA prédictive intégrée.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="bg-purple-500/10 p-3 rounded-lg h-fit">
                <ShieldAlert className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Alertes Intelligentes</h3>
                <p className="text-slate-400">
                  IA prédictive pour anticiper les risques. Soyez notifié avant que le budget ne dérape ou que le délai ne soit dépassé.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-purple-500/10 p-3 rounded-lg h-fit">
                <Workflow className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Workflows Automatisés</h3>
                <p className="text-slate-400">
                  Déclenchez des actions automatiques basées sur des événements. Validation de budget, création de tâches, notifications Slack/Teams.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-purple-500/10 p-3 rounded-lg h-fit">
                <Bot className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Assistant IA</h3>
                <p className="text-slate-400">
                  Interrogez vos données en langage naturel. "Quel est le projet le plus risqué ce mois-ci ?" L'IA vous répond instantanément.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#1A1A1A] border border-slate-800 rounded-2xl p-2 shadow-2xl shadow-purple-900/20">
             <img 
               src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop" 
               alt="AI Automation" 
               className="rounded-xl w-full h-auto opacity-80 hover:opacity-100 transition-opacity"
             />
          </div>
        </div>

        <div className="text-center">
          <Link to="/demo">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-6 text-lg rounded-full">
              Activer l'IA
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DiscoverAutomationAI;
