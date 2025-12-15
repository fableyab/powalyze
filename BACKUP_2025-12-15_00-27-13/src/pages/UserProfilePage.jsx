import React, { useState } from 'react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Shield, User, Lock, History } from 'lucide-react';
import UserProfileForm from '@/components/Forms/UserProfileForm';
import ChangePasswordForm from '@/components/Forms/ChangePasswordForm';
import TwoFactorAuthSetup from '@/components/Auth/TwoFactorAuthSetup';
import { Switch } from '@/components/ui/switch';
import { twoFactorAuthService } from '@/services/auth/twoFactorAuthService';
import { useToast } from '@/components/ui/use-toast';

const UserProfilePage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  const [is2FASetup, setIs2FASetup] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const toggle2FA = async (enabled) => {
    if (enabled) {
      setIs2FASetup(true);
    } else {
      try {
        await twoFactorAuthService.disableTwoFactorAuth(user.id);
        setTwoFactorEnabled(false);
        toast({ title: "2FA Désactivé", description: "L'authentification à deux facteurs est désactivée." });
      } catch (err) {
        toast({ variant: "destructive", title: "Erreur", description: "Impossible de modifier le 2FA." });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
       <Navbar />
       <main className="flex-grow pt-32 pb-20 container mx-auto px-6">
          <h1 className="text-3xl font-bold mb-8">Mon Profil</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
             {/* Sidebar */}
             <div className="space-y-2">
                <Button variant={activeTab === 'profile' ? 'secondary' : 'ghost'} className="w-full justify-start text-left" onClick={() => setActiveTab('profile')}><User size={18} className="mr-2"/> Informations</Button>
                <Button variant={activeTab === 'security' ? 'secondary' : 'ghost'} className="w-full justify-start text-left" onClick={() => setActiveTab('security')}><Shield size={18} className="mr-2"/> Sécurité</Button>
                <Button variant={activeTab === 'activity' ? 'secondary' : 'ghost'} className="w-full justify-start text-left" onClick={() => setActiveTab('activity')}><History size={18} className="mr-2"/> Historique</Button>
             </div>

             {/* Content */}
             <div className="lg:col-span-3 bg-[#111] border border-white/10 rounded-xl p-8 min-h-[500px]">
                {activeTab === 'profile' && <UserProfileForm />}

                {activeTab === 'security' && (
                   <div className="space-y-8 animate-in fade-in">
                      <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-white/5">
                         <div>
                            <h3 className="font-bold flex items-center gap-2"><Lock size={18}/> Authentification à deux facteurs</h3>
                            <p className="text-sm text-gray-400">Ajoutez une couche de sécurité supplémentaire à votre compte.</p>
                         </div>
                         <Switch checked={twoFactorEnabled} onCheckedChange={toggle2FA} />
                      </div>
                      
                      {is2FASetup && !twoFactorEnabled && (
                         <div className="bg-black/30 p-6 rounded-lg border border-white/10">
                            <h3 className="font-bold mb-4">Configuration 2FA</h3>
                            <TwoFactorAuthSetup 
                              userId={user?.id} 
                              onComplete={() => {
                                setTwoFactorEnabled(true);
                                setIs2FASetup(false);
                              }} 
                            />
                         </div>
                      )}

                      <div className="p-4 bg-black/30 rounded-lg border border-white/5">
                         <h3 className="font-bold mb-4">Changer de mot de passe</h3>
                         <ChangePasswordForm />
                      </div>
                   </div>
                )}
                
                {activeTab === 'activity' && (
                    <div className="space-y-4 animate-in fade-in">
                       <h3 className="font-bold">Dernières connexions</h3>
                       <div className="text-sm text-gray-400 space-y-2">
                          <div className="flex justify-between py-3 border-b border-white/5">
                             <span>Paris, FR (Chrome on Windows)</span>
                             <span>Il y a 2 heures</span>
                          </div>
                          <div className="flex justify-between py-3 border-b border-white/5">
                             <span>Geneva, CH (Safari on iPhone)</span>
                             <span>Hier</span>
                          </div>
                          <div className="flex justify-between py-3 border-b border-white/5">
                             <span>London, UK (Firefox on Mac)</span>
                             <span>Il y a 3 jours</span>
                          </div>
                       </div>
                    </div>
                )}
             </div>
          </div>
       </main>
       <FooterSection />
    </div>
  );
};

export default UserProfilePage;