import React from 'react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { FolderPlus, FileText, Settings, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const ClientSpacePage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      <Navbar />
      
      <main className="pt-32 pb-20 container mx-auto px-6">
         <div className="flex justify-between items-end mb-12">
            <div>
               <h1 className="text-4xl font-bold text-white mb-2">Espace <span className="text-[#BFA76A]">Client</span></h1>
               <p className="text-gray-400">Bienvenue, {user?.name || 'Invité'}. Gérez vos projets et documents.</p>
            </div>
            <Link to="/client/new-project">
               <Button className="bg-[#BFA76A] text-black hover:bg-white font-bold">
                  <FolderPlus size={18} className="mr-2"/> Nouveau Projet
               </Button>
            </Link>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-[#111] border-white/10 p-6 flex items-center gap-4 hover:border-[#BFA76A] transition-colors cursor-pointer">
               <div className="bg-blue-500/20 p-3 rounded-full text-blue-500"><FileText size={24}/></div>
               <div>
                  <h3 className="font-bold text-lg">Documents</h3>
                  <p className="text-sm text-gray-500">12 fichiers partagés</p>
               </div>
            </Card>
            <Card className="bg-[#111] border-white/10 p-6 flex items-center gap-4 hover:border-[#BFA76A] transition-colors cursor-pointer">
               <div className="bg-green-500/20 p-3 rounded-full text-green-500"><Settings size={24}/></div>
               <div>
                  <h3 className="font-bold text-lg">Paramètres</h3>
                  <p className="text-sm text-gray-500">Configuration du compte</p>
               </div>
            </Card>
            <Card className="bg-[#111] border-white/10 p-6 flex items-center gap-4 hover:border-[#BFA76A] transition-colors cursor-pointer">
               <div className="bg-purple-500/20 p-3 rounded-full text-purple-500"><User size={24}/></div>
               <div>
                  <h3 className="font-bold text-lg">Profil</h3>
                  <p className="text-sm text-gray-500">Modifier vos infos</p>
               </div>
            </Card>
         </div>

         <div className="bg-[#111] rounded-xl border border-white/10 p-8 text-center">
            <h3 className="text-xl font-bold mb-4">Vos Projets Actifs</h3>
            <p className="text-gray-500 mb-8">Vous n'avez aucun projet actif pour le moment.</p>
            <Link to="/contact">
               <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">Contacter le support</Button>
            </Link>
         </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default ClientSpacePage;