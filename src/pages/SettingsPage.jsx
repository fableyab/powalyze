import React from 'react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const SettingsPage = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({ title: "Paramètres enregistrés", description: "Vos préférences ont été mises à jour." });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
       <Navbar />
       <main className="flex-grow pt-32 pb-20 container mx-auto px-6">
          <h1 className="text-3xl font-bold mb-8">Paramètres</h1>
          
          <div className="max-w-2xl bg-[#111] border border-white/10 rounded-xl p-8 space-y-8">
             <div className="space-y-4">
                <h3 className="text-xl font-bold border-b border-white/10 pb-2">Notifications</h3>
                <div className="flex items-center justify-between">
                   <span>Emails de marketing</span>
                   <Switch />
                </div>
                <div className="flex items-center justify-between">
                   <span>Alertes de sécurité</span>
                   <Switch defaultChecked />
                </div>
             </div>

             <div className="space-y-4">
                <h3 className="text-xl font-bold border-b border-white/10 pb-2">Confidentialité</h3>
                <div className="flex items-center justify-between">
                   <span>Profil public</span>
                   <Switch />
                </div>
             </div>

             <div className="pt-4">
                <Button onClick={handleSave} className="bg-[#BFA76A] text-black hover:bg-white font-bold">Enregistrer</Button>
             </div>
          </div>
       </main>
       <FooterSection />
    </div>
  );
};

export default SettingsPage;