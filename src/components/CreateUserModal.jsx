import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Loader2, Mail, Lock, User, Shield, Eye, EyeOff } from 'lucide-react';
import { ROLES, PERMISSIONS } from '@/lib/permissions';

const CreateUserModal = ({ isOpen, onClose, onUserCreated }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [autoGeneratePassword, setAutoGeneratePassword] = useState(true);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: ROLES.COLLABORATEUR,
    password: '',
    modules: {
      pmo: false,
      finance: false,
      risks: false,
      reports: true
    },
    powerbi: false,
    sendInvitation: true
  });

  const generatePassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  React.useEffect(() => {
    if (autoGeneratePassword && isOpen) {
      setFormData(prev => ({ ...prev, password: generatePassword() }));
    }
  }, [autoGeneratePassword, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('module_')) {
      const moduleName = name.replace('module_', '');
      setFormData(prev => ({
        ...prev,
        modules: { ...prev.modules, [moduleName]: checked }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleCreate = async () => {
    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast({ 
        variant: "destructive", 
        title: "Validation Error", 
        description: "Prénom, nom et email sont obligatoires." 
      });
      return;
    }

    if (!formData.password || formData.password.length < 8) {
      toast({ 
        variant: "destructive", 
        title: "Validation Error", 
        description: "Le mot de passe doit contenir au moins 8 caractères." 
      });
      return;
    }

    setLoading(true);
    try {
      // 1. Créer l'utilisateur dans Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: formData.email,
        password: formData.password,
        email_confirm: true,
        user_metadata: {
          first_name: formData.firstName,
          last_name: formData.lastName
        }
      });

      if (authError) throw authError;

      // 2. Récupérer le tenant_id de l'admin
      const { data: adminProfile } = await supabase
        .from('profiles')
        .select('tenant_id')
        .eq('user_id', user.id)
        .single();

      // 3. Créer le profil avec rôle et permissions
      const { error: profileError } = await supabase.from('profiles').insert({
        user_id: authData.user.id,
        email: formData.email,
        first_name: formData.firstName,
        last_name: formData.lastName,
        role: formData.role,
        tenant_id: adminProfile?.tenant_id,
        status: 'active',
        modules_access: formData.modules,
        powerbi_access: formData.powerbi,
        created_at: new Date(),
        updated_at: new Date()
      });

      if (profileError) throw profileError;

      // 4. Envoyer l'invitation par email si activé
      if (formData.sendInvitation) {
        await sendInvitationEmail({
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          password: formData.password,
          role: formData.role
        });
      }

      toast({ 
        title: "✅ Utilisateur créé", 
        description: `${formData.firstName} ${formData.lastName} a été ajouté avec succès.` 
      });

      if (onUserCreated) onUserCreated();
      onClose();
      resetForm();
    } catch (error) {
      console.error("Error creating user:", error);
      toast({ 
        variant: "destructive", 
        title: "❌ Erreur", 
        description: error.message || "Impossible de créer l'utilisateur." 
      });
    } finally {
      setLoading(false);
    }
  };

  const sendInvitationEmail = async (userData) => {
    try {
      // FUTURE: Email service integration (SendGrid, Mailgun, or SMTP)
      // This will be implemented when email service is configured
      console.log('📧 Invitation envoyée à:', userData.email);
      
      // Example API call for email service:
      // await fetch('/api/send-invitation', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(userData)
      // });
    } catch (error) {
      console.error('Erreur envoi email:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      role: ROLES.COLLABORATEUR,
      password: '',
      modules: { pmo: false, finance: false, risks: false, reports: true },
      powerbi: false,
      sendInvitation: true
    });
    setAutoGeneratePassword(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1A1A1A] border-slate-800 text-white sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <User className="w-5 h-5 text-[#D4AF37]" />
            Créer un utilisateur
          </DialogTitle>
          <p className="text-sm text-slate-400">Administration des accès Powalyze</p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Informations personnelles */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#D4AF37] uppercase tracking-wide">
              Informations personnelles
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Prénom *</label>
                <Input 
                  name="firstName" 
                  value={formData.firstName} 
                  onChange={handleChange}
                  className="bg-black border-slate-800 text-white" 
                  placeholder="Jean" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Nom *</label>
                <Input 
                  name="lastName" 
                  value={formData.lastName} 
                  onChange={handleChange}
                  className="bg-black border-slate-800 text-white" 
                  placeholder="Dupont" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Email *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <Input 
                  type="email"
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange}
                  className="bg-black border-slate-800 text-white pl-10" 
                  placeholder="jean.dupont@entreprise.ch" 
                />
              </div>
            </div>
          </div>

          {/* Rôle */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#D4AF37] uppercase tracking-wide">
              Rôle & Permissions
            </h3>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Rôle *</label>
              <select 
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-slate-800 bg-black px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#4A9EFF]"
              >
                <option value={ROLES.ADMIN}>Admin - Tous les droits</option>
                <option value={ROLES.MANAGER}>Manager - Gestion d'équipe</option>
                <option value={ROLES.COLLABORATEUR}>Collaborateur - Modification projets</option>
                <option value={ROLES.LECTURE_SEULE}>Lecture seule - Consultation</option>
              </select>
            </div>

            {/* Description du rôle */}
            <div className="bg-black/50 border border-slate-800 rounded-lg p-3 text-xs text-slate-400">
              {formData.role === ROLES.ADMIN && (
                <div className="space-y-1">
                  <p className="font-semibold text-white">Admin - Droits complets :</p>
                  <ul className="list-disc list-inside space-y-0.5 ml-2">
                    <li>Créer / Supprimer des comptes</li>
                    <li>Modifier les rôles</li>
                    <li>Gérer les intégrations (Power BI, Salesforce)</li>
                    <li>Accès à toutes les données</li>
                  </ul>
                </div>
              )}
              {formData.role === ROLES.MANAGER && (
                <div className="space-y-1">
                  <p className="font-semibold text-white">Manager - Gestion d'équipe :</p>
                  <ul className="list-disc list-inside space-y-0.5 ml-2">
                    <li>Créer et gérer des projets</li>
                    <li>Gérer les équipes</li>
                    <li>Voir les rapports Power BI</li>
                    <li>Pas de suppression de comptes</li>
                  </ul>
                </div>
              )}
              {formData.role === ROLES.COLLABORATEUR && (
                <div className="space-y-1">
                  <p className="font-semibold text-white">Collaborateur - Modification :</p>
                  <ul className="list-disc list-inside space-y-0.5 ml-2">
                    <li>Modifier les projets assignés</li>
                    <li>Voir les rapports</li>
                    <li>Pas de suppression</li>
                    <li>Pas de gestion utilisateurs</li>
                  </ul>
                </div>
              )}
              {formData.role === ROLES.LECTURE_SEULE && (
                <div className="space-y-1">
                  <p className="font-semibold text-white">Lecture seule - Consultation :</p>
                  <ul className="list-disc list-inside space-y-0.5 ml-2">
                    <li>Accès en consultation uniquement</li>
                    <li>Aucun droit d'édition</li>
                    <li>Aucun droit de suppression</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Modules autorisés */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#D4AF37] uppercase tracking-wide">
              Modules autorisés
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <label className="flex items-center gap-2 bg-black/50 border border-slate-800 rounded-lg p-3 cursor-pointer hover:bg-black/70 transition-colors">
                <input 
                  type="checkbox"
                  name="module_pmo"
                  checked={formData.modules.pmo}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-slate-700 text-[#4A9EFF] focus:ring-[#4A9EFF]"
                />
                <span className="text-sm text-white">PMO</span>
              </label>
              <label className="flex items-center gap-2 bg-black/50 border border-slate-800 rounded-lg p-3 cursor-pointer hover:bg-black/70 transition-colors">
                <input 
                  type="checkbox"
                  name="module_finance"
                  checked={formData.modules.finance}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-slate-700 text-[#4A9EFF] focus:ring-[#4A9EFF]"
                />
                <span className="text-sm text-white">Finance</span>
              </label>
              <label className="flex items-center gap-2 bg-black/50 border border-slate-800 rounded-lg p-3 cursor-pointer hover:bg-black/70 transition-colors">
                <input 
                  type="checkbox"
                  name="module_risks"
                  checked={formData.modules.risks}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-slate-700 text-[#4A9EFF] focus:ring-[#4A9EFF]"
                />
                <span className="text-sm text-white">Risques</span>
              </label>
              <label className="flex items-center gap-2 bg-black/50 border border-slate-800 rounded-lg p-3 cursor-pointer hover:bg-black/70 transition-colors">
                <input 
                  type="checkbox"
                  name="module_reports"
                  checked={formData.modules.reports}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-slate-700 text-[#4A9EFF] focus:ring-[#4A9EFF]"
                />
                <span className="text-sm text-white">Rapports</span>
              </label>
            </div>
          </div>

          {/* Accès Power BI */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 bg-black/50 border border-slate-800 rounded-lg p-4 cursor-pointer hover:bg-black/70 transition-colors">
              <input 
                type="checkbox"
                name="powerbi"
                checked={formData.powerbi}
                onChange={handleChange}
                className="w-4 h-4 rounded border-slate-700 text-[#4A9EFF] focus:ring-[#4A9EFF]"
              />
              <div>
                <span className="text-sm font-medium text-white">Accès Power BI</span>
                <p className="text-xs text-slate-400">Autoriser l'accès aux rapports Power BI</p>
              </div>
            </label>
          </div>

          {/* Mot de passe */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#D4AF37] uppercase tracking-wide">
              Mot de passe
            </h3>
            <label className="flex items-center gap-2">
              <input 
                type="checkbox"
                checked={autoGeneratePassword}
                onChange={(e) => setAutoGeneratePassword(e.target.checked)}
                className="w-4 h-4 rounded border-slate-700 text-[#4A9EFF] focus:ring-[#4A9EFF]"
              />
              <span className="text-sm text-slate-300">Générer automatiquement</span>
            </label>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Mot de passe *</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <Input 
                  type={showPassword ? "text" : "password"}
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange}
                  disabled={autoGeneratePassword}
                  className="bg-black border-slate-800 text-white pl-10 pr-10" 
                  placeholder="Min. 8 caractères" 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {autoGeneratePassword && (
                <p className="text-xs text-[#D4AF37]">
                  ✓ Mot de passe généré automatiquement (envoyé par email)
                </p>
              )}
            </div>
          </div>

          {/* Invitation */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 bg-[#4A9EFF]/10 border border-[#4A9EFF]/30 rounded-lg p-4 cursor-pointer hover:bg-[#4A9EFF]/20 transition-colors">
              <input 
                type="checkbox"
                name="sendInvitation"
                checked={formData.sendInvitation}
                onChange={handleChange}
                className="w-4 h-4 rounded border-slate-700 text-[#4A9EFF] focus:ring-[#4A9EFF]"
              />
              <div>
                <span className="text-sm font-medium text-white">Envoyer l'invitation par email</span>
                <p className="text-xs text-slate-400">L'utilisateur recevra un email avec ses identifiants</p>
              </div>
            </label>
          </div>
        </div>

        <DialogFooter className="border-t border-slate-800 pt-4">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            Annuler
          </Button>
          <Button 
            onClick={handleCreate}
            className="bg-[#4A9EFF] text-white hover:bg-[#0052cc]"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Création...
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 mr-2" />
                Créer & Envoyer
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserModal;
