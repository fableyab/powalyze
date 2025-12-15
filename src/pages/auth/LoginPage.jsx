import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import LoginForm from '@/components/Forms/LoginForm';
import OAuthButtons from '@/components/Auth/OAuthButtons';
import Logo from '@/components/ui/Logo';
import SEO from '@/components/SEO';
import { Shield, Lock, Key } from 'lucide-react';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col relative overflow-hidden">
      <SEO title="Connexion | Powalyze" description="Connectez-vous à votre espace client sécurisé." />
      
      {/* Fluid Background */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/90 to-[#0A0A0A]/60"></div>
      <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-[#BFA76A]/5 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
      
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-24 px-4 relative z-10">
        <div className="w-full max-w-md bg-[#111]/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl animate-in fade-in zoom-in duration-500 border-t-2 border-t-[#BFA76A]">
           
           <div className="flex justify-center mb-6">
              <Logo className="h-10" />
           </div>

           <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2 text-white font-display">Connexion</h1>
              <p className="text-gray-400 text-sm">Accédez à votre espace premium Powalyze</p>
           </div>
           
           <OAuthButtons />
           
           <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10"></span></div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest"><span className="bg-[#111] px-2 text-gray-500">Ou email</span></div>
           </div>

           <LoginForm />

           <div className="mt-8 pt-6 border-t border-white/5 text-center text-sm text-gray-400">
              Pas encore de compte ?{' '}
              <Link to="/signup" className="text-[#BFA76A] hover:underline font-bold transition-colors">S'inscrire</Link>
           </div>
           
           <div className="mt-6 flex justify-center gap-6 text-[10px] text-gray-600 uppercase tracking-widest font-bold">
               <div className="flex items-center gap-1"><Shield size={10} /> Secure SSL</div>
               <div className="flex items-center gap-1"><Lock size={10} /> Encrypted</div>
           </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default LoginPage;