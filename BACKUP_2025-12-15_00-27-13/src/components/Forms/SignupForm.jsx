import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import PasswordStrengthIndicator from '@/components/Auth/PasswordStrengthIndicator';

const SignupForm = () => {
  const { signup, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    phone: '',
    acceptTerms: false,
    acceptPrivacy: false
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({ variant: "destructive", title: "Erreur", description: "Les mots de passe ne correspondent pas." });
      return;
    }
    if (!formData.acceptTerms || !formData.acceptPrivacy) {
      toast({ variant: "destructive", title: "Erreur", description: "Veuillez accepter les conditions." });
      return;
    }

    try {
      await signup(formData);
      toast({ title: "Compte créé", description: "Vous pouvez maintenant vous connecter." });
      navigate('/login');
    } catch (error) {
      toast({ variant: "destructive", title: "Erreur", description: error.message });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Prénom *</Label>
          <Input 
            required
            value={formData.firstName}
            onChange={e => setFormData({...formData, firstName: e.target.value})}
            className="bg-black/50 border-white/10"
          />
        </div>
        <div className="space-y-2">
          <Label>Nom *</Label>
          <Input 
            required
            value={formData.lastName}
            onChange={e => setFormData({...formData, lastName: e.target.value})}
            className="bg-black/50 border-white/10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Email Professionnel *</Label>
        <Input 
          type="email"
          required
          value={formData.email}
          onChange={e => setFormData({...formData, email: e.target.value})}
          className="bg-black/50 border-white/10"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
         <div className="space-y-2">
            <Label>Entreprise</Label>
            <Input 
               value={formData.company}
               onChange={e => setFormData({...formData, company: e.target.value})}
               className="bg-black/50 border-white/10"
            />
         </div>
         <div className="space-y-2">
            <Label>Téléphone</Label>
            <Input 
               value={formData.phone}
               onChange={e => setFormData({...formData, phone: e.target.value})}
               className="bg-black/50 border-white/10"
            />
         </div>
      </div>

      <div className="space-y-2">
        <Label>Mot de passe *</Label>
        <div className="relative">
           <Input 
             type={showPassword ? "text" : "password"}
             required
             value={formData.password}
             onChange={e => setFormData({...formData, password: e.target.value})}
             className="bg-black/50 border-white/10 pr-10"
           />
           <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
           >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
           </button>
        </div>
        <PasswordStrengthIndicator password={formData.password} />
      </div>

      <div className="space-y-2">
        <Label>Confirmer le mot de passe *</Label>
        <Input 
          type="password"
          required
          value={formData.confirmPassword}
          onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
          className="bg-black/50 border-white/10"
        />
      </div>

      <div className="space-y-3 pt-2">
         <div className="flex items-start gap-2">
           <input 
             type="checkbox" 
             id="terms"
             checked={formData.acceptTerms}
             onChange={e => setFormData({...formData, acceptTerms: e.target.checked})}
             className="mt-1 w-4 h-4 rounded border-gray-600 bg-black/50 text-[#BFA76A] focus:ring-[#BFA76A]"
           />
           <Label htmlFor="terms" className="text-sm cursor-pointer text-gray-400 font-normal">
              J'accepte les <span className="text-[#BFA76A] hover:underline">Conditions Générales d'Utilisation</span>
           </Label>
         </div>
         <div className="flex items-start gap-2">
           <input 
             type="checkbox" 
             id="privacy"
             checked={formData.acceptPrivacy}
             onChange={e => setFormData({...formData, acceptPrivacy: e.target.checked})}
             className="mt-1 w-4 h-4 rounded border-gray-600 bg-black/50 text-[#BFA76A] focus:ring-[#BFA76A]"
           />
           <Label htmlFor="privacy" className="text-sm cursor-pointer text-gray-400 font-normal">
              J'accepte la <span className="text-[#BFA76A] hover:underline">Politique de Confidentialité</span>
           </Label>
         </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full bg-[#BFA76A] text-black hover:bg-white font-bold h-11 mt-4">
        {loading ? <Loader2 className="animate-spin mr-2" /> : "Créer mon compte"}
      </Button>
    </form>
  );
};

export default SignupForm;