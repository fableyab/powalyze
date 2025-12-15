import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { Button } from '@/components/ui/button';
import { Lock, ArrowLeft } from 'lucide-react';

const BackupCodesPage = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-md bg-[#111] border border-white/10 rounded-2xl p-8 shadow-2xl text-center">
           <div className="flex justify-center mb-6">
              <Lock className="w-12 h-12 text-[#BFA76A]" />
           </div>
           <h1 className="text-2xl font-bold mb-4">Codes de Secours</h1>
           <p className="text-gray-400 text-sm mb-8">
              Utilisez l'un de ces codes si vous n'avez pas accès à votre téléphone. Chaque code ne peut être utilisé qu'une seule fois.
           </p>
           
           <div className="bg-black/50 p-4 rounded-lg border border-white/10 grid grid-cols-2 gap-4 font-mono text-[#BFA76A] mb-8">
              <div>1234-5678</div>
              <div>8765-4321</div>
              <div>1122-3344</div>
              <div>5566-7788</div>
           </div>

           <Link to="/profile">
              <Button variant="outline" className="w-full border-white/10"><ArrowLeft size={16} className="mr-2"/> Retour au profil</Button>
           </Link>
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default BackupCodesPage;