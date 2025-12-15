
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Bell, Lock, Globe, Star, ArrowRight, ShieldCheck, KeyRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/components/ui/use-toast';

const SettingsPage = () => {
  const { language } = useLanguage();
   const { toast } = useToast();

  const pmoBtnText = {
    fr: "Voir la solution PMO",
    en: "View PMO Solution",
    de: "PMO-Lösung anzeigen"
  };

   const handle2FA = () => {
      toast({ title: "2FA activé", description: "Votre second facteur est enregistré." });
   };

   const handlePassword = () => {
      toast({ title: "Mot de passe mis à jour", description: "Votre mot de passe a été modifié." });
   };

  return (
    <div className="max-w-3xl space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-display font-bold text-white">Paramètres</h1>
        <Link to="/pmo-solution">
          <Button className="bg-[#BFA76A] text-black hover:bg-white font-bold border border-[#BFA76A]">
            <Star size={16} className="mr-2" /> {pmoBtnText[language] || pmoBtnText.en} <ArrowRight size={16} className="ml-2" />
          </Button>
        </Link>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
         <div className="p-6 border-b border-white/10 bg-[#1A1A1A]">
            <h2 className="text-lg font-bold text-white flex items-center gap-2"><Bell size={20} className="text-[#BFA76A]"/> Notifications</h2>
         </div>
         <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
               <div>
                  <Label className="text-base text-white">Mises à jour de projet</Label>
                  <p className="text-sm text-gray-500">Recevoir des emails lors des changements de statut.</p>
               </div>
               <Switch defaultChecked onChange={(checked) => toast({ title: checked ? "Activé" : "Désactivé", description: "Préférence sauvegardée." })} />
            </div>
            <div className="flex items-center justify-between">
               <div>
                  <Label className="text-base text-white">Nouveaux documents</Label>
                  <p className="text-sm text-gray-500">Alerte lors de l'upload de nouveaux fichiers.</p>
               </div>
               <Switch defaultChecked onChange={(checked) => toast({ title: checked ? "Activé" : "Désactivé", description: "Préférence sauvegardée." })} />
            </div>
            <div className="flex items-center justify-between">
               <div>
                  <Label className="text-base text-white">Newsletter</Label>
                  <p className="text-sm text-gray-500">Actualités et conseils PMO.</p>
               </div>
               <Switch onChange={(checked) => toast({ title: checked ? "Inscrit" : "Désinscrit", description: "Préférence sauvegardée." })} />
            </div>
         </div>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
         <div className="p-6 border-b border-white/10 bg-[#1A1A1A]">
            <h2 className="text-lg font-bold text-white flex items-center gap-2"><Globe size={20} className="text-blue-500"/> Préférences</h2>
         </div>
         <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
               <div>
                  <Label className="text-base text-white">Langue</Label>
                  <p className="text-sm text-gray-500">Langue de l'interface.</p>
               </div>
               <Button variant="outline" className="border-white/10 text-sm" onClick={() => toast({ title: "Langue changée", description: "Interface mise à jour en Français." })}>Français</Button>
            </div>
            <div className="rounded-lg border border-white/10 bg-[#0A0A0A] p-4 text-sm text-gray-400">
              Mode sécurisé actif. Les préférences d'apparence sont verrouillées par défaut.
            </div>
         </div>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
         <div className="p-6 border-b border-white/10 bg-[#1A1A1A]">
            <h2 className="text-lg font-bold text-white flex items-center gap-2"><Lock size={20} className="text-red-500"/> Sécurité</h2>
         </div>
         <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
               <div>
                  <Label className="text-base text-white">Double Authentification (2FA)</Label>
                  <p className="text-sm text-gray-400">Sécuriser votre compte avec un second facteur.</p>
               </div>
               <Button onClick={handle2FA} variant="default" className="bg-[#BFA76A] text-black hover:bg-white flex items-center gap-2">
                 <ShieldCheck size={16}/> Activer
               </Button>
            </div>
            <div className="flex items-center justify-between">
               <div>
                  <Label className="text-base text-white">Mot de passe</Label>
                  <p className="text-sm text-gray-400">Mettre à jour immédiatement.</p>
               </div>
               <Button onClick={handlePassword} variant="outline" className="border-white/10 text-white hover:bg-white/5 flex items-center gap-2">
                 <KeyRound size={16}/> Modifier
               </Button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default SettingsPage;
