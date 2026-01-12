import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import customSupabaseClient from '@/lib/customSupabaseClient';
import {
  getTeamMembers,
  getPendingInvitations,
  inviteTeamMember,
  updateMemberRole,
  removeMember,
  cancelInvitation,
  resendInvitation
} from '@/lib/teamService';
import CockpitLayout from '@/components/layout/CockpitLayout';
import { 
  Users, 
  Crown, 
  Star, 
  CheckCircle, 
  Shield,
  Mail,
  Search,
  UserPlus,
  Edit,
  Trash2,
  Clock,
  RefreshCw,
  X,
  Copy,
  Check,
  Loader2,
  AlertCircle
} from 'lucide-react';

export default function Team() {
  const { user } = useAuth();
  const [members, setMembers] = useState([]);
  const [pendingInvitations, setPendingInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [organizationId, setOrganizationId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [copiedUrl, setCopiedUrl] = useState(null);
  const [processingMember, setProcessingMember] = useState(null);

  const [inviteForm, setInviteForm] = useState({
    email: '',
    role: 'viewer'
  });

  useEffect(() => {
    if (user) {
      loadOrganizationData();
    }
  }, [user]);

  const loadOrganizationData = async () => {
    setLoading(true);
    try {
      const { data: userOrg, error: orgError } = await customSupabaseClient
        .from('user_organizations')
        .select('organization_id, role')
        .eq('user_id', user.id)
        .single();

      if (orgError) throw orgError;

      setOrganizationId(userOrg.organization_id);
      setUserRole(userOrg.role);

      await Promise.all([
        loadMembers(userOrg.organization_id),
        loadPendingInvitations(userOrg.organization_id)
      ]);
    } catch (error) {
      console.error('Error loading organization:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMembers = async (orgId) => {
    const { data, error } = await getTeamMembers(orgId);
    if (!error) setMembers(data || []);
  };

  const loadPendingInvitations = async (orgId) => {
    const { data, error } = await getPendingInvitations(orgId);
    if (!error) setPendingInvitations(data || []);
  };

  const handleInvite = async (e) => {
    e.preventDefault();
    
    if (!inviteForm.email || !inviteForm.role) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    setProcessingMember('invite');
    try {
      const { data, error } = await inviteTeamMember({
        email: inviteForm.email,
        organizationId,
        role: inviteForm.role,
        invitedBy: user.id
      });

      if (error) {
        alert(`❌ ${error.message}`);
      } else {
        const url = data.invitationUrl;
        await navigator.clipboard.writeText(url);
        alert(`✅ Invitation créée!\n\n📋 URL copiée dans le presse-papier:\n${url}\n\nEnvoyez cette URL à ${inviteForm.email}`);
        
        setInviteForm({ email: '', role: 'viewer' });
        setShowInviteModal(false);
        await loadPendingInvitations(organizationId);
      }
    } catch (error) {
      alert(`❌ ${error.message}`);
    } finally {
      setProcessingMember(null);
    }
  };

  const handleUpdateRole = async (membershipId, currentRole) => {
    const roles = ['viewer', 'analyst', 'manager', 'admin'];
    const newRole = prompt(`Choisissez le nouveau rôle:\n- viewer (Observateur)\n- analyst (Analyste)\n- manager (Manager)\n- admin (Administrateur)\n\nRôle actuel: ${currentRole}`, currentRole);
    
    if (!newRole || newRole === currentRole) return;
    if (!roles.includes(newRole.toLowerCase())) {
      alert('Rôle invalide');
      return;
    }

    setProcessingMember(membershipId);
    try {
      const { error } = await updateMemberRole(membershipId, newRole.toLowerCase());
      if (error) {
        alert(`❌ ${error.message}`);
      } else {
        alert('✅ Rôle mis à jour!');
        await loadMembers(organizationId);
      }
    } catch (error) {
      alert(`❌ ${error.message}`);
    } finally {
      setProcessingMember(null);
    }
  };

  const handleRemoveMember = async (membershipId, memberName) => {
    if (!confirm(`Retirer ${memberName} de l'équipe ?`)) return;

    setProcessingMember(membershipId);
    try {
      const { error } = await removeMember(membershipId);
      if (error) {
        alert(`❌ ${error.message}`);
      } else {
        alert('✅ Membre retiré');
        await loadMembers(organizationId);
      }
    } catch (error) {
      alert(`❌ ${error.message}`);
    } finally {
      setProcessingMember(null);
    }
  };

  const handleCancelInvitation = async (invitationId, email) => {
    if (!confirm(`Annuler l'invitation de ${email} ?`)) return;

    setProcessingMember(invitationId);
    try {
      const { error } = await cancelInvitation(invitationId);
      if (error) {
        alert(`❌ ${error.message}`);
      } else {
        alert('✅ Invitation annulée');
        await loadPendingInvitations(organizationId);
      }
    } catch (error) {
      alert(`❌ ${error.message}`);
    } finally {
      setProcessingMember(null);
    }
  };

  const handleResendInvitation = async (invitationId) => {
    setProcessingMember(invitationId);
    try {
      const { data, error } = await resendInvitation(invitationId);
      if (error) {
        alert(`❌ ${error.message}`);
      } else {
        await navigator.clipboard.writeText(data.invitationUrl);
        alert(`✅ Invitation renvoyée!\n\nURL copiée:\n${data.invitationUrl}`);
      }
    } catch (error) {
      alert(`❌ ${error.message}`);
    } finally {
      setProcessingMember(null);
    }
  };

  const copyInvitationUrl = async (token) => {
    const url = `${window.location.origin}/accept-invitation?token=${token}`;
    await navigator.clipboard.writeText(url);
    setCopiedUrl(token);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const getRoleIcon = (role) => {
    const icons = {
      admin: Crown,
      manager: Star,
      analyst: CheckCircle,
      viewer: Shield
    };
    return icons[role] || Shield;
  };

  const getRoleConfig = (role) => {
    const configs = {
      admin: {
        color: 'text-[#D4AF37]',
        bg: 'bg-[#D4AF37]/10',
        border: 'border-[#D4AF37]/30',
        label: 'Admin'
      },
      manager: {
        color: 'text-blue-400',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/30',
        label: 'Manager'
      },
      analyst: {
        color: 'text-green-400',
        bg: 'bg-green-500/10',
        border: 'border-green-500/30',
        label: 'Analyst'
      },
      viewer: {
        color: 'text-white/60',
        bg: 'bg-white/5',
        border: 'border-white/10',
        label: 'Viewer'
      }
    };
    return configs[role] || configs.viewer;
  };

  const filteredMembers = members.filter(member =>
    member.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isAdmin = userRole === 'admin' || userRole === 'manager';

  if (loading) {
    return (
      <CockpitLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 text-[#D4AF37] animate-spin" />
        </div>
      </CockpitLayout>
    );
  }

  return (
    <CockpitLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-light text-white tracking-tight">Team Management</h1>
            <p className="text-sm text-white/40 mt-1">
              {members.length} membre{members.length > 1 ? 's' : ''} actif{members.length > 1 ? 's' : ''}
              {pendingInvitations.length > 0 && ` • ${pendingInvitations.length} invitation${pendingInvitations.length > 1 ? 's' : ''} en attente`}
            </p>
          </div>

          {isAdmin && (
            <button
              onClick={() => setShowInviteModal(true)}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#D4AF37] text-black rounded-[2px] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all duration-500 text-sm tracking-[0.1em] uppercase"
            >
              <UserPlus className="w-4 h-4" />
              Inviter un membre
            </button>
          )}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            placeholder="Rechercher un membre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/40 backdrop-blur-xl border border-white/5 rounded-[2px] pl-12 pr-4 py-3 text-sm text-white placeholder-white/30 focus:border-[#D4AF37]/30 focus:outline-none transition-all duration-500"
          />
        </div>

        {/* Pending Invitations */}
        {pendingInvitations.length > 0 && (
          <div className="bg-[#020713] border border-white/10 rounded-[2px] p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-amber-400" />
              <h2 className="text-lg font-light text-white">Invitations en attente</h2>
            </div>

            <div className="space-y-3">
              {pendingInvitations.map((invitation) => {
                const config = getRoleConfig(invitation.role);
                const expiresAt = new Date(invitation.expires_at);
                const daysLeft = Math.ceil((expiresAt - new Date()) / (1000 * 60 * 60 * 24));

                return (
                  <div
                    key={invitation.id}
                    className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-[2px] hover:bg-white/[0.07] transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center justify-center w-10 h-10 bg-amber-500/10 border border-amber-500/30 rounded-full">
                          <Mail className="w-5 h-5 text-amber-400" />
                        </div>
                        <div>
                          <p className="text-sm text-white font-light">{invitation.email}</p>
                          <p className="text-xs text-white/40">
                            Expire dans {daysLeft} jour{daysLeft > 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className={`px-3 py-1.5 ${config.bg} border ${config.border} rounded-[2px]`}>
                        <span className={`text-xs ${config.color} uppercase tracking-wider`}>
                          {config.label}
                        </span>
                      </div>

                      {isAdmin && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => copyInvitationUrl(invitation.token)}
                            disabled={processingMember === invitation.id}
                            className="p-2 bg-white/5 rounded-[2px] hover:bg-[#D4AF37]/10 transition-colors disabled:opacity-50"
                            title="Copier le lien"
                          >
                            {copiedUrl === invitation.token ? (
                              <Check className="w-4 h-4 text-green-400" />
                            ) : (
                              <Copy className="w-4 h-4 text-white/60" />
                            )}
                          </button>
                          <button
                            onClick={() => handleResendInvitation(invitation.id)}
                            disabled={processingMember === invitation.id}
                            className="p-2 bg-white/5 rounded-[2px] hover:bg-blue-500/10 transition-colors disabled:opacity-50"
                            title="Renvoyer"
                          >
                            {processingMember === invitation.id ? (
                              <Loader2 className="w-4 h-4 animate-spin text-white/60" />
                            ) : (
                              <RefreshCw className="w-4 h-4 text-white/60" />
                            )}
                          </button>
                          <button
                            onClick={() => handleCancelInvitation(invitation.id, invitation.email)}
                            disabled={processingMember === invitation.id}
                            className="p-2 bg-white/5 rounded-[2px] hover:bg-red-500/10 transition-colors disabled:opacity-50"
                            title="Annuler"
                          >
                            <X className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Members List */}
        <div className="space-y-3">
          {filteredMembers.length === 0 ? (
            <div className="bg-[#020713] border border-white/10 rounded-[2px] p-12 text-center">
              <Users className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <p className="text-white/40">
                {searchTerm ? 'Aucun membre trouvé' : 'Aucun membre dans l\'équipe'}
              </p>
            </div>
          ) : (
            filteredMembers.map((member) => {
              const RoleIcon = getRoleIcon(member.role);
              const config = getRoleConfig(member.role);
              const isProcessing = processingMember === member.id;

              return (
                <div
                  key={member.id}
                  className="group bg-[#020713] border border-white/10 rounded-[2px] p-6 hover:bg-white/[0.02] transition-all duration-500"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`flex items-center justify-center w-12 h-12 ${config.bg} border ${config.border} rounded-full`}>
                        <span className={`text-lg font-light ${config.color}`}>
                          {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </span>
                      </div>

                      <div className="flex-1">
                        <h3 className="text-base font-light text-white mb-1">{member.name}</h3>
                        <div className="flex items-center gap-4 text-xs text-white/40">
                          <span className="flex items-center gap-1.5">
                            <Mail className="w-3 h-3" />
                            {member.email}
                          </span>
                          <span>•</span>
                          <span>Rejoint le {member.joinedAt}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className={`flex items-center gap-2 px-4 py-2 ${config.bg} border ${config.border} rounded-[2px]`}>
                        <RoleIcon className={`w-4 h-4 ${config.color}`} />
                        <span className={`text-xs font-light ${config.color} uppercase tracking-[0.15em]`}>
                          {config.label}
                        </span>
                      </div>

                      {isAdmin && member.userId !== user.id && (
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <button
                            onClick={() => handleUpdateRole(member.id, member.role)}
                            disabled={isProcessing}
                            className="p-2 bg-white/5 rounded-[2px] hover:bg-[#D4AF37]/10 transition-colors disabled:opacity-50"
                            title="Changer le rôle"
                          >
                            {isProcessing ? (
                              <Loader2 className="w-3 h-3 animate-spin text-white/40" />
                            ) : (
                              <Edit className="w-3 h-3 text-white/40 hover:text-[#D4AF37]" />
                            )}
                          </button>
                          <button
                            onClick={() => handleRemoveMember(member.id, member.name)}
                            disabled={isProcessing}
                            className="p-2 bg-white/5 rounded-[2px] hover:bg-red-500/10 transition-colors disabled:opacity-50"
                            title="Retirer de l'équipe"
                          >
                            <Trash2 className="w-3 h-3 text-white/40 hover:text-red-400" />
                          </button>
                        </div>
                      )}

                      {member.userId === user.id && (
                        <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-[2px]">
                          <span className="text-xs text-white/40">Vous</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Info Box */}
        {!isAdmin && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-[2px] p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-white/80 mb-1">Permissions limitées</p>
              <p className="text-xs text-white/60">
                Seuls les administrateurs et managers peuvent inviter des membres ou modifier les rôles.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50 p-4" onClick={() => setShowInviteModal(false)}>
          <div className="bg-[#020713] border border-white/10 rounded-[2px] p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-light text-white mb-6 tracking-tight">Inviter un membre</h2>
            
            <form onSubmit={handleInvite} className="space-y-4 mb-6">
              <div>
                <label className="block text-xs text-white/40 mb-2 uppercase tracking-[0.1em]">Email</label>
                <input
                  type="email"
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                  placeholder="membre@company.com"
                  className="w-full bg-black/40 backdrop-blur-xl border border-white/5 rounded-[2px] px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#D4AF37]/30 focus:outline-none transition-all duration-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-xs text-white/40 mb-2 uppercase tracking-[0.1em]">Rôle</label>
                <select 
                  value={inviteForm.role}
                  onChange={(e) => setInviteForm({ ...inviteForm, role: e.target.value })}
                  className="w-full bg-black/40 backdrop-blur-xl border border-white/5 rounded-[2px] px-4 py-2.5 text-sm text-white focus:border-[#D4AF37]/30 focus:outline-none transition-all duration-500"
                >
                  <option value="viewer">Viewer (Observateur)</option>
                  <option value="analyst">Analyst (Analyste)</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin (Administrateur)</option>
                </select>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-[2px] p-3">
                <p className="text-xs text-white/60">
                  ℹ️ Un lien d'invitation sera généré. Vous devrez l'envoyer manuellement au membre invité par email.
                </p>
              </div>
            </form>
            
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowInviteModal(false)}
                disabled={processingMember === 'invite'}
                className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-[2px] text-xs text-white hover:bg-white/10 transition-all duration-500 tracking-[0.1em] uppercase disabled:opacity-50"
              >
                Annuler
              </button>
              <button
                onClick={handleInvite}
                disabled={processingMember === 'invite'}
                className="flex-1 px-4 py-2.5 bg-[#D4AF37] text-black rounded-[2px] text-xs hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all duration-500 tracking-[0.1em] uppercase font-medium disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {processingMember === 'invite' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Création...
                  </>
                ) : (
                  'Créer l\'invitation'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </CockpitLayout>
  );
}
