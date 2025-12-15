
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Phone, Building, Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ProfilePage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'Utilisateur',
    email: user?.email || 'user@example.com',
    phone: '+41 22 123 45 67',
    company: 'Acme Corp'
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    toast({ title: "Profil mis à jour", description: "Vos informations ont été enregistrées avec succès." });
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-display font-bold text-white mb-8">Mon Profil</h1>

      <div className="bg-[#111] border border-white/10 rounded-xl p-8">
         <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#BFA76A] to-[#8C7A4B] flex items-center justify-center text-4xl font-bold text-black shadow-lg">
               {user?.name?.charAt(0) || 'U'}
            </div>
            <div>
               <h2 className="text-2xl font-bold text-white">{user?.name || 'Utilisateur'}</h2>
               <p className="text-gray-400">{user?.email}</p>
               <Button variant="link" className="text-[#BFA76A] p-0 h-auto mt-2">Changer l'avatar</Button>
            </div>
         </div>

         <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <Label htmlFor="name">Nom Complet</Label>
                  <div className="relative">
                     <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                     <Input 
                        id="name"
                        value={formData.name} 
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        disabled={!isEditing} 
                        className="pl-10 bg-[#0A0A0A] border-white/10 focus:border-[#BFA76A] transition-colors" />
                  </div>
               </div>
               <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                     <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                     <Input 
                        id="email"
                        value={formData.email} 
                        disabled 
                        className="pl-10 bg-[#0A0A0A] border-white/10 opacity-50" />
                  </div>
               </div>
               <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <div className="relative">
                     <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                     <Input 
                        id="phone"
                        value={formData.phone} 
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        disabled={!isEditing} 
                        className="pl-10 bg-[#0A0A0A] border-white/10 focus:border-[#BFA76A] transition-colors" />
                  </div>
               </div>
               <div className="space-y-2">
                  <Label htmlFor="company">Entreprise</Label>
                  <div className="relative">
                     <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                     <Input 
                        id="company"
                        value={formData.company} 
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        disabled={!isEditing} 
                        className="pl-10 bg-[#0A0A0A] border-white/10 focus:border-[#BFA76A] transition-colors" />
                  </div>
               </div>
            </div>

            <div className="pt-4 flex justify-end gap-4">
               {isEditing ? (
                  <>
                     <Button type="button" variant="ghost" onClick={() => setIsEditing(false)}>Annuler</Button>
                     <Button type="submit" className="bg-[#BFA76A] text-black font-bold hover:bg-white"><Save size={16} className="mr-2"/> Enregistrer</Button>
                  </>
               ) : (
                  <Button type="button" onClick={() => setIsEditing(true)} variant="outline" className="border-white/10">Modifier le profil</Button>
               )}
            </div>
         </form>
      </div>
    </div>
  );
};

export default ProfilePage;
