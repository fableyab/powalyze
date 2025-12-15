import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

const UserProfileForm = () => {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    company: user?.company || '',
    department: user?.department || '',
    role: user?.role || '',
    linkedin: user?.linkedin || '',
    website: user?.website || '',
    bio: user?.bio || ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(formData);
      toast({ title: "Profil mis à jour", description: "Vos informations ont été enregistrées avec succès." });
    } catch (err) {
      toast({ variant: "destructive", title: "Erreur", description: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName">Prénom</Label>
          <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="bg-black/50 border-white/10" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Nom</Label>
          <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="bg-black/50 border-white/10" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" value={formData.email} disabled className="bg-black/50 border-white/10 opacity-50 cursor-not-allowed" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Téléphone</Label>
          <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} className="bg-black/50 border-white/10" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Entreprise</Label>
          <Input id="company" name="company" value={formData.company} onChange={handleChange} className="bg-black/50 border-white/10" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="department">Département</Label>
          <Input id="department" name="department" value={formData.department} onChange={handleChange} className="bg-black/50 border-white/10" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Poste / Rôle</Label>
          <Input id="role" name="role" value={formData.role} onChange={handleChange} className="bg-black/50 border-white/10" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn Profile</Label>
          <Input id="linkedin" name="linkedin" value={formData.linkedin} onChange={handleChange} className="bg-black/50 border-white/10" placeholder="https://linkedin.com/in/..." />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="website">Site Web Entreprise</Label>
          <Input id="website" name="website" value={formData.website} onChange={handleChange} className="bg-black/50 border-white/10" placeholder="https://..." />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} className="bg-black/50 border-white/10 h-24" placeholder="Parlez-nous un peu de vous..." />
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button type="submit" disabled={loading} className="bg-[#BFA76A] text-black hover:bg-white font-bold">
          {loading ? <Loader2 className="animate-spin mr-2" /> : 'Enregistrer les modifications'}
        </Button>
      </div>
    </form>
  );
};

export default UserProfileForm;