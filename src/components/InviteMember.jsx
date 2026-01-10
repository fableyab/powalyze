import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { adminService } from '@/lib/adminService';
import { UserPlus, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

/**
 * Composant d'invitation de membres d'équipe
 * Permet aux admins d'inviter de nouveaux membres avec un rôle spécifique
 */
const InviteMember = ({ onMemberInvited }) => {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    role: 'viewer'
  });

  const roles = [
    { value: 'admin', label: 'Administrateur', description: 'Accès complet' },
    { value: 'pmo', label: 'PMO', description: 'Gestion de portefeuille' },
    { value: 'manager', label: 'Manager', description: 'Gestion de projets' },
    { value: 'contributor', label: 'Contributeur', description: 'Édition limitée' },
    { value: 'viewer', label: 'Lecteur', description: 'Lecture seule' },
    { value: 'auditor', label: 'Auditeur', description: 'Accès audit' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.role) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive"
      });
      return;
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Erreur",
        description: "Format d'email invalide",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      await adminService.inviteTeamMember(
        formData.email,
        formData.role,
        profile?.tenant_id
      );

      setSuccess(true);
      toast({
        title: "✅ Invitation envoyée",
        description: `Un email d'invitation a été envoyé à ${formData.email}`,
      });

      // Reset form
      setFormData({ email: '', role: 'viewer' });

      // Notifier le parent pour refresh la liste
      if (onMemberInvited) {
        onMemberInvited();
      }

      // Clear success message après 3s
      setTimeout(() => setSuccess(false), 3000);

    } catch (error) {
      console.error('Erreur invitation:', error);
      toast({
        title: "❌ Erreur",
        description: error.message || "Impossible d'envoyer l'invitation",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const selectedRole = roles.find(r => r.value === formData.role);

  return (
    <Card className="bg-[#1A1A1A] border-[#333333]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <UserPlus className="w-5 h-5 text-[#4A9EFF]" />
          Inviter un membre
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300">
              Adresse email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="nom@entreprise.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              disabled={loading}
              className="bg-[#0F0F0F] border-[#333333] text-white placeholder:text-slate-500 focus:border-[#4A9EFF]"
            />
          </div>

          {/* Role Select */}
          <div className="space-y-2">
            <Label htmlFor="role" className="text-slate-300">
              Rôle
            </Label>
            <Select
              value={formData.role}
              onValueChange={(value) => setFormData({ ...formData, role: value })}
              disabled={loading}
            >
              <SelectTrigger className="bg-[#0F0F0F] border-[#333333] text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1A1A] border-[#333333]">
                {roles.map((role) => (
                  <SelectItem 
                    key={role.value} 
                    value={role.value}
                    className="text-white hover:bg-[#4A9EFF]/10"
                  >
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{role.label}</span>
                      <span className="text-xs text-slate-400">{role.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedRole && (
              <p className="text-xs text-slate-400">
                {selectedRole.description}
              </p>
            )}
          </div>

          {/* Success Message */}
          {success && (
            <Alert className="bg-green-500/10 border-green-500/50">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <AlertDescription className="text-green-400">
                Invitation envoyée avec succès !
              </AlertDescription>
            </Alert>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4A9EFF] hover:bg-[#0052cc] text-white font-medium shadow-lg shadow-[#4A9EFF]/20"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4 mr-2" />
                Envoyer l'invitation
              </>
            )}
          </Button>

          {/* Info Alert */}
          <Alert className="bg-[#4A9EFF]/10 border-[#4A9EFF]/30">
            <AlertCircle className="h-4 w-4 text-[#4A9EFF]" />
            <AlertDescription className="text-slate-300 text-sm">
              Le membre recevra un email avec un lien pour créer son mot de passe et accéder à la plateforme.
            </AlertDescription>
          </Alert>
        </form>
      </CardContent>
    </Card>
  );
};

export default InviteMember;
