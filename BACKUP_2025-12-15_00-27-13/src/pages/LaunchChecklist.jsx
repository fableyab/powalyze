import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { CheckCircle2, Circle, ArrowRight, Download, Calendar, Timer, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const ChecklistItem = ({ label, checked, onChange }) => (
  <div 
    onClick={onChange}
    className={`flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
      checked 
      ? 'bg-[#BFA76A]/10 border-[#BFA76A]/30' 
      : 'bg-[#0A0A0A] border-white/10 hover:border-white/20'
    }`}
  >
    <div className={`mt-1 transition-colors ${checked ? 'text-[#BFA76A]' : 'text-gray-600'}`}>
      {checked ? <CheckCircle2 size={20} /> : <Circle size={20} />}
    </div>
    <span className={`text-sm ${checked ? 'text-white' : 'text-gray-400'}`}>{label}</span>
  </div>
);

const LaunchChecklist = () => {
  const [tasks, setTasks] = useState({
    seo: false,
    performance: false,
    security: false,
    content: false,
    analytics: false,
    legal: false,
    social: false,
    backup: false
  });

  const calculateProgress = () => {
    const total = Object.keys(tasks).length;
    const completed = Object.values(tasks).filter(Boolean).length;
    return (completed / total) * 100;
  };

  const toggleTask = (key) => {
    setTasks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Launch Date Logic
  const launchDate = new Date('2025-12-31T00:00:00');
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = launchDate - now;

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen">
      <SEO 
        title="Launch Checklist - Powalyze"
        description="Préparez votre lancement avec notre checklist interactive complète."
      />
      <Navbar />

      <div className="pt-32 pb-20 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl md:text-5xl font-display text-white mb-6">
                Checklist de Lancement <span className="text-[#BFA76A]">Opérationnel</span>
              </h1>
              <p className="text-gray-400 text-lg font-light mb-8">
                Assurez le succès de votre déploiement grâce à notre méthodologie rigoureuse. Suivez chaque étape critique avant le jour J.
              </p>
              
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                   <span>Progression globale</span>
                   <span>{Math.round(calculateProgress())}%</span>
                </div>
                <Progress value={calculateProgress()} className="h-2 bg-white/10" />
              </div>
            </motion.div>

            <section>
              <h2 className="text-2xl font-display text-white mb-6 flex items-center gap-3">
                <ShieldCheck className="text-[#BFA76A]" /> Pré-Lancement (Technique)
              </h2>
              <div className="grid gap-4">
                <ChecklistItem 
                  label="Optimisation SEO (Meta tags, Sitemap, Robots.txt)" 
                  checked={tasks.seo} 
                  onChange={() => toggleTask('seo')} 
                />
                <ChecklistItem 
                  label="Test de Performance & Load Testing" 
                  checked={tasks.performance} 
                  onChange={() => toggleTask('performance')} 
                />
                <ChecklistItem 
                  label="Audit de Sécurité & SSL" 
                  checked={tasks.security} 
                  onChange={() => toggleTask('security')} 
                />
                 <ChecklistItem 
                  label="Configuration des Backups Automatiques" 
                  checked={tasks.backup} 
                  onChange={() => toggleTask('backup')} 
                />
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-display text-white mb-6 flex items-center gap-3">
                <Calendar className="text-[#BFA76A]" /> Go-to-Market
              </h2>
              <div className="grid gap-4">
                 <ChecklistItem 
                  label="Validation Contenu & Traductions" 
                  checked={tasks.content} 
                  onChange={() => toggleTask('content')} 
                />
                <ChecklistItem 
                  label="Setup Analytics & Conversion Tracking" 
                  checked={tasks.analytics} 
                  onChange={() => toggleTask('analytics')} 
                />
                <ChecklistItem 
                  label="Conformité Légale (GDPR, CGU)" 
                  checked={tasks.legal} 
                  onChange={() => toggleTask('legal')} 
                />
                <ChecklistItem 
                  label="Planification Réseaux Sociaux" 
                  checked={tasks.social} 
                  onChange={() => toggleTask('social')} 
                />
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-[#0A0A0A] border border-[#BFA76A]/20 rounded-xl p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#BFA76A] to-transparent"></div>
              <h3 className="text-white font-display text-xl mb-6">Compte à Rebours</h3>
              
              <div className="grid grid-cols-4 gap-2 mb-6">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div key={unit} className="bg-white/5 rounded p-2">
                    <div className="text-2xl font-bold text-[#BFA76A]">{value || 0}</div>
                    <div className="text-[10px] text-gray-500 uppercase">{unit}</div>
                  </div>
                ))}
              </div>
              
              <div className="text-xs text-gray-400">Date cible : 31 Décembre 2025</div>
            </div>

            <div className="bg-[#111] border border-white/5 rounded-xl p-8">
               <h3 className="text-white font-display text-lg mb-4">Téléchargements</h3>
               <div className="space-y-4">
                 <Button variant="outline" className="w-full justify-between border-white/10 hover:border-[#BFA76A] text-gray-300 hover:text-white">
                    Checklist PDF <Download size={16} />
                 </Button>
                 <Button variant="outline" className="w-full justify-between border-white/10 hover:border-[#BFA76A] text-gray-300 hover:text-white">
                    Guide de Secours <Download size={16} />
                 </Button>
               </div>
            </div>
            
             <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-6 flex gap-4">
               <AlertTriangle className="text-yellow-500 shrink-0" size={24} />
               <div className="text-sm">
                 <h4 className="text-yellow-500 font-bold mb-1">Point Critique</h4>
                 <p className="text-gray-400">N'oubliez pas de tester le tunnel de paiement en mode production avant le lancement public.</p>
               </div>
             </div>
          </div>
        </div>
      </div>

      <FooterSection />
    </div>
  );
};

export default LaunchChecklist;