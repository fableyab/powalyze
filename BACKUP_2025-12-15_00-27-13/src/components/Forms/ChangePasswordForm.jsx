import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

const ChangePasswordForm = () => {
  const { changePassword } = useAuth(); // Assuming authService has this, mock handles it
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleChange = (e) => {
    setPasswords(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      toast({ variant: "destructive", title: "Erreur", description: "Les nouveaux mots de passe ne correspondent pas." });
      return;
    }
    if (passwords.new.length < 8) {
      toast({ variant: "destructive", title: "Erreur", description: "Le mot de passe doit contenir au moins 8 caractères." });
      return;
    }
    
    setLoading(true);
    try {
      // Mock call
      await new Promise(r => setTimeout(r, 1000)); 
      toast({ title: "Succès", description: "Mot de passe modifié avec succès." });
      setPasswords({ current: '', new: '', confirm: '' });
    } catch (err) {
      toast({ variant: "destructive", title: "Erreur", description: "Impossible de modifier le mot de passe." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div className="space-y-2">
        <Label htmlFor="current">Mot de passe actuel</Label>
        <Input type="password" id="current" name="current" value={passwords.current} onChange={handleChange} className="bg-black/50 border-white/10" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="new">Nouveau mot de passe</Label>
        <Input type="password" id="new" name="new" value={passwords.new} onChange={handleChange} className="bg-black/50 border-white/10" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm">Confirmer le mot de passe</Label>
        <Input type="password" id="confirm" name="confirm" value={passwords.confirm} onChange={handleChange} className="bg-black/50 border-white/10" required />
      </div>
      <Button type="submit" disabled={loading} className="w-full border-white/10" variant="outline">
        {loading ? <Loader2 className="animate-spin mr-2" /> : 'Changer le mot de passe'}
      </Button>
    </form>
  );
};

export default ChangePasswordForm;