import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Shield, Key, History, Save, Bell, LogOut, FileText } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import TwoFactorAuthSetup from '@/components/Auth/TwoFactorAuthSetup';
import { Switch } from '@/components/ui/switch';

const MyAccountDashboard = () => {
  const { user, updateProfile, logout } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [is2FAOpen, setIs2FAOpen] = useState(false);
  const [formData, setFormData] = useState({
     name: user?.name || '',
     email: user?.email || '',
     company: user?.company || ''
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
       await updateProfile(formData);
       toast({ title: "Profil mis à jour", description: "Vos modifications ont été enregistrées." });
    } catch (e) {
       toast({ variant: "destructive", title: "Erreur", description: "Impossible de mettre à jour le profil." });
    } finally {
       setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />
      <main className="pt-32 pb-20 container mx-auto px-6 max-w-6xl">
         {/* Profile Header Card */}
         <div className="bg-[#111] border border-white/10 rounded-xl p-8 mb-8 flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 bg-gradient-to-br from-[#BFA76A] to-[#8C7A4B] rounded-full flex items-center justify-center text-4xl font-bold text-black shadow-lg shadow-[#BFA76A]/20">
               {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-grow text-center md:text-left">
               <h1 className="text-3xl font-display font-bold mb-2">{user?.name || 'Utilisateur'}</h1>
               <p className="text-gray-400">{user?.email}</p>
               <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
                  <span className="px-3 py-1 bg-green-500/10 text-green-500 border border-green-500/20 rounded-full text-xs font-bold uppercase">Compte Actif</span>
                  <span className="px-3 py-1 bg-[#BFA76A]/10 text-[#BFA76A] border border-[#BFA76A]/20 rounded-full text-xs font-bold uppercase">{user?.role || 'Membre'}</span>
               </div>
            </div>
            <div>
               <Button onClick={logout} variant="outline" className="border-red-900/50 text-red-400 hover:bg-red-900/20">
                  <LogOut size={16} className="mr-2"/> Déconnexion
               </Button>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
               <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden sticky top-32">
                  <Tabs defaultValue="profile" orientation="vertical" className="w-full">
                     <TabsList className="flex flex-col h-auto bg-transparent p-0">
                        <TabsTrigger value="profile" className="w-full justify-start px-6 py-4 border-l-2 border-transparent data-[state=active]:bg-[#1A1A1A] data-[state=active]:border-[#BFA76A] rounded-none">
                           <User size={18} className="mr-3" /> Informations
                        </TabsTrigger>
                        <TabsTrigger value="security" className="w-full justify-start px-6 py-4 border-l-2 border-transparent data-[state=active]:bg-[#1A1A1A] data-[state=active]:border-[#BFA76A] rounded-none">
                           <Shield size={18} className="mr-3" /> Sécurité & 2FA
                        </TabsTrigger>
                        <TabsTrigger value="notifications" className="w-full justify-start px-6 py-4 border-l-2 border-transparent data-[state=active]:bg-[#1A1A1A] data-[state=active]:border-[#BFA76A] rounded-none">
                           <Bell size={18} className="mr-3" /> Notifications
                        </TabsTrigger>
                        <TabsTrigger value="history" className="w-full justify-start px-6 py-4 border-l-2 border-transparent data-[state=active]:bg-[#1A1A1A] data-[state=active]:border-[#BFA76A] rounded-none">
                           <History size={18} className="mr-3" /> Historique
                        </TabsTrigger>
                     </TabsList>
                  </Tabs>
               </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
               <Tabs defaultValue="profile" className="w-full">
                  <TabsContent value="profile" className="mt-0">
                     <div className="bg-[#111] border border-white/10 rounded-xl p-8">
                        <h2 className="text-xl font-bold mb-6">Informations Personnelles</h2>
                        <form onSubmit={handleUpdate} className="space-y-6 max-w-xl">
                           <div className="space-y-2">
                              <Label>Nom Complet</Label>
                              <Input 
                                 value={formData.name} 
                                 onChange={e => setFormData({...formData, name: e.target.value})}
                                 className="bg-black/50 border-white/10 focus:border-[#BFA76A]" 
                              />
                           </div>
                           <div className="space-y-2">
                              <Label>Email</Label>
                              <Input 
                                 value={formData.email} 
                                 disabled 
                                 className="bg-black/30 border-white/5 text-gray-400 cursor-not-allowed" 
                              />
                           </div>
                           <div className="space-y-2">
                              <Label>Entreprise</Label>
                              <Input 
                                 value={formData.company} 
                                 onChange={e => setFormData({...formData, company: e.target.value})}
                                 className="bg-black/50 border-white/10 focus:border-[#BFA76A]" 
                              />
                           </div>
                           <div className="pt-4">
                              <Button type="submit" disabled={loading} className="bg-[#BFA76A] text-black font-bold hover:bg-white">
                                 <Save size={16} className="mr-2" /> Enregistrer les modifications
                              </Button>
                           </div>
                        </form>
                     </div>
                  </TabsContent>

                  <TabsContent value="security" className="mt-0">
                     <div className="space-y-6">
                        <div className="bg-[#111] border border-white/10 rounded-xl p-8">
                           <h2 className="text-xl font-bold mb-6">Authentification à Deux Facteurs</h2>
                           <div className="flex items-center justify-between">
                              <div>
                                 <p className="text-gray-300 font-medium">Activer le 2FA</p>
                                 <p className="text-sm text-gray-500">Ajoutez une couche de sécurité supplémentaire.</p>
                              </div>
                              <Button variant="outline" className="border-white/10" onClick={() => setIs2FAOpen(!is2FAOpen)}>
                                 {is2FAOpen ? 'Masquer' : 'Configurer'}
                              </Button>
                           </div>
                           {is2FAOpen && (
                              <div className="mt-6 border-t border-white/10 pt-6">
                                 <TwoFactorAuthSetup userId={user?.id} onComplete={() => toast({ title: "2FA Activé" })} />
                              </div>
                           )}
                        </div>

                        <div className="bg-[#111] border border-white/10 rounded-xl p-8">
                           <h2 className="text-xl font-bold mb-6">Mot de Passe</h2>
                           <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                 <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500"><Key size={20}/></div>
                                 <div>
                                    <p className="text-white font-medium">Dernière modification</p>
                                    <p className="text-sm text-gray-500">Il y a 3 mois</p>
                                 </div>
                              </div>
                              <Button variant="outline" className="border-white/10">Modifier</Button>
                           </div>
                        </div>
                     </div>
                  </TabsContent>

                  <TabsContent value="history" className="mt-0">
                     <div className="bg-[#111] border border-white/10 rounded-xl p-8">
                        <h2 className="text-xl font-bold mb-6">Historique d'Activité</h2>
                        <div className="space-y-4">
                           {[1, 2, 3].map((i) => (
                              <div key={i} className="flex items-center justify-between p-4 border border-white/5 rounded-lg bg-black/20">
                                 <div className="flex items-center gap-4">
                                    <History size={16} className="text-gray-500" />
                                    <div>
                                       <p className="text-sm font-medium text-white">Connexion au Dashboard</p>
                                       <p className="text-xs text-gray-500">IP: 192.168.1.{i} • Chrome on Windows</p>
                                    </div>
                                 </div>
                                 <span className="text-xs text-gray-400">Il y a {i * 2} heures</span>
                              </div>
                           ))}
                        </div>
                     </div>
                  </TabsContent>
               </Tabs>
            </div>
         </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default MyAccountDashboard;