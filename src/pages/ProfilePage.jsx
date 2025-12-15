import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Shield, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  if (!user) return null; // Protected route handles redirect, but just in case

  return (
    <>
      <Helmet>
        <title>{t('auth.profile')} | Powalyze</title>
      </Helmet>
      
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-6 py-12 mt-20">
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="max-w-4xl mx-auto"
          >
             <h1 className="text-3xl font-bold text-white mb-8 border-l-4 border-[#BFA76A] pl-4">{t('auth.profile')}</h1>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {/* Left Column: ID Card */}
               <div className="col-span-1">
                 <div className="bg-[#111] border border-white/10 rounded-2xl p-6 text-center shadow-lg">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#BFA76A] to-[#8C7A4B] rounded-full mx-auto flex items-center justify-center mb-4">
                       <span className="text-3xl font-bold text-black">{user.name?.charAt(0) || "U"}</span>
                    </div>
                    <h2 className="text-xl font-bold text-white">{user.name}</h2>
                    <p className="text-[#BFA76A] text-sm uppercase tracking-wider mt-1">{user.role === 'demo' ? 'Demo Account' : 'Standard Member'}</p>
                    
                    <div className="mt-6 space-y-3">
                       <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/5">
                          <Settings className="mr-2 h-4 w-4" /> {t('auth.editProfile')}
                       </Button>
                       <Button variant="destructive" onClick={() => logout()} className="w-full bg-red-900/20 text-red-400 hover:bg-red-900/40 border border-red-900/50">
                          <LogOut className="mr-2 h-4 w-4" /> {t('auth.logout')}
                       </Button>
                    </div>
                 </div>
               </div>

               {/* Right Column: Details */}
               <div className="col-span-1 md:col-span-2 space-y-6">
                 
                 {/* Personal Info */}
                 <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                       <Shield className="text-[#BFA76A]" size={18} /> Account Information
                    </h3>
                    <div className="space-y-4">
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="bg-black/40 p-4 rounded-lg border border-white/5">
                             <div className="flex items-center gap-3 mb-1">
                                <User size={14} className="text-gray-500" />
                                <span className="text-xs text-gray-400 uppercase tracking-wider">{t('auth.fullName')}</span>
                             </div>
                             <p className="text-white font-medium pl-6">{user.name}</p>
                          </div>
                          <div className="bg-black/40 p-4 rounded-lg border border-white/5">
                             <div className="flex items-center gap-3 mb-1">
                                <Mail size={14} className="text-gray-500" />
                                <span className="text-xs text-gray-400 uppercase tracking-wider">{t('auth.email')}</span>
                             </div>
                             <p className="text-white font-medium pl-6 truncate">{user.email}</p>
                          </div>
                       </div>
                       
                       <div className="bg-black/40 p-4 rounded-lg border border-white/5">
                          <div className="flex items-center gap-3 mb-1">
                             <Calendar size={14} className="text-gray-500" />
                             <span className="text-xs text-gray-400 uppercase tracking-wider">{t('auth.memberSince')}</span>
                          </div>
                          <p className="text-white font-medium pl-6">
                             {user.joined ? new Date(user.joined).toLocaleDateString() : 'N/A'}
                          </p>
                       </div>
                    </div>
                 </div>

                 {/* Subscription Status (Mock) */}
                 <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
                     <h3 className="text-lg font-semibold text-white mb-4">Subscription Plan</h3>
                     <div className="flex items-center justify-between p-4 bg-[#BFA76A]/10 border border-[#BFA76A]/20 rounded-lg">
                        <div>
                           <p className="text-[#BFA76A] font-bold">Free Tier</p>
                           <p className="text-xs text-gray-400">Basic dashboard access</p>
                        </div>
                        <Link to="/rendez-vous-gratuit">
                           <Button size="sm" className="bg-[#BFA76A] text-black hover:bg-white hover:text-black">Upgrade</Button>
                        </Link>
                     </div>
                 </div>

               </div>
             </div>
          </motion.div>
        </main>
        
        <FooterSection />
      </div>
    </>
  );
};

export default ProfilePage;