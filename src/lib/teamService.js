import customSupabaseClient from './customSupabaseClient';

/**
 * Générer un token unique pour l'invitation
 */
function generateInvitationToken() {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Récupérer tous les membres d'une organisation
 */
export async function getTeamMembers(organizationId) {
  try {
    const { data, error } = await customSupabaseClient
      .from('user_organizations')
      .select(`
        id,
        role,
        created_at,
        invited_at,
        invited_by,
        last_active_at,
        user:user_id (
          id,
          email,
          raw_user_meta_data
        )
      `)
      .eq('organization_id', organizationId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Formater les données
    const members = data.map(member => ({
      id: member.id,
      userId: member.user?.id,
      name: member.user?.raw_user_meta_data?.full_name || member.user?.email?.split('@')[0] || 'Utilisateur',
      email: member.user?.email,
      role: member.role,
      status: 'active',
      joinedAt: new Date(member.created_at).toLocaleDateString('fr-FR'),
      invitedAt: member.invited_at,
      invitedBy: member.invited_by,
      lastActiveAt: member.last_active_at
    }));

    return { data: members, error: null };
  } catch (error) {
    console.error('Error fetching team members:', error);
    return { data: [], error };
  }
}

/**
 * Récupérer les invitations en attente
 */
export async function getPendingInvitations(organizationId) {
  try {
    const { data, error } = await customSupabaseClient
      .from('invitations')
      .select(`
        id,
        email,
        role,
        status,
        created_at,
        expires_at,
        invited_by:invited_by_user_id (
          email,
          raw_user_meta_data
        )
      `)
      .eq('organization_id', organizationId)
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error fetching pending invitations:', error);
    return { data: [], error };
  }
}

/**
 * Inviter un nouveau membre
 */
export async function inviteTeamMember({ email, organizationId, role, invitedBy }) {
  try {
    // Vérifier si l'utilisateur existe déjà dans cette organisation
    const { data: existingMember } = await customSupabaseClient
      .from('user_organizations')
      .select('id, user:user_id(email)')
      .eq('organization_id', organizationId)
      .eq('user_id', email)
      .single();

    if (existingMember) {
      return { 
        data: null, 
        error: { message: 'Cet utilisateur est déjà membre de l\'organisation' } 
      };
    }

    // Vérifier si une invitation existe déjà
    const { data: existingInvitation } = await customSupabaseClient
      .from('invitations')
      .select('id, status')
      .eq('email', email)
      .eq('organization_id', organizationId)
      .eq('status', 'pending')
      .single();

    if (existingInvitation) {
      return { 
        data: null, 
        error: { message: 'Une invitation est déjà en attente pour cet email' } 
      };
    }

    // Générer un token unique
    const token = generateInvitationToken();

    // Créer l'invitation
    const { data: invitation, error: invitationError } = await customSupabaseClient
      .from('invitations')
      .insert({
        email,
        organization_id: organizationId,
        invited_by_user_id: invitedBy,
        role,
        token,
        status: 'pending',
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 jours
      })
      .select()
      .single();

    if (invitationError) throw invitationError;

    // Envoyer l'email d'invitation via Supabase Auth
    const invitationUrl = `${window.location.origin}/accept-invitation?token=${token}`;
    
    // Note: Pour envoyer l'email, vous devez configurer un système d'emails
    // Vous pouvez utiliser Supabase Functions ou un service externe comme Resend/SendGrid
    // Pour l'instant, on retourne les données nécessaires
    
    return { 
      data: {
        invitation,
        invitationUrl,
        message: 'Invitation créée avec succès'
      }, 
      error: null 
    };
  } catch (error) {
    console.error('Error inviting team member:', error);
    return { data: null, error };
  }
}

/**
 * Renvoyer une invitation
 */
export async function resendInvitation(invitationId) {
  try {
    const { data: invitation, error: fetchError } = await customSupabaseClient
      .from('invitations')
      .select('*')
      .eq('id', invitationId)
      .single();

    if (fetchError) throw fetchError;

    // Vérifier si l'invitation est encore valide
    if (invitation.status !== 'pending') {
      return { 
        data: null, 
        error: { message: 'Cette invitation n\'est plus en attente' } 
      };
    }

    // Prolonger la date d'expiration
    const { data, error } = await customSupabaseClient
      .from('invitations')
      .update({
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      })
      .eq('id', invitationId)
      .select()
      .single();

    if (error) throw error;

    const invitationUrl = `${window.location.origin}/accept-invitation?token=${invitation.token}`;

    return { 
      data: {
        invitation: data,
        invitationUrl,
        message: 'Invitation renvoyée avec succès'
      }, 
      error: null 
    };
  } catch (error) {
    console.error('Error resending invitation:', error);
    return { data: null, error };
  }
}

/**
 * Annuler une invitation
 */
export async function cancelInvitation(invitationId) {
  try {
    const { data, error } = await customSupabaseClient
      .from('invitations')
      .update({ status: 'cancelled' })
      .eq('id', invitationId)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error cancelling invitation:', error);
    return { data: null, error };
  }
}

/**
 * Accepter une invitation (utilisé dans la page AcceptInvitation)
 */
export async function acceptInvitation(token, userId) {
  try {
    // Récupérer l'invitation
    const { data: invitation, error: fetchError } = await customSupabaseClient
      .from('invitations')
      .select('*')
      .eq('token', token)
      .single();

    if (fetchError) throw fetchError;

    if (!invitation) {
      return { data: null, error: { message: 'Invitation introuvable' } };
    }

    if (invitation.status !== 'pending') {
      return { data: null, error: { message: 'Cette invitation n\'est plus valide' } };
    }

    if (new Date(invitation.expires_at) < new Date()) {
      return { data: null, error: { message: 'Cette invitation a expiré' } };
    }

    // Ajouter l'utilisateur à l'organisation
    const { data: userOrg, error: userOrgError } = await customSupabaseClient
      .from('user_organizations')
      .insert({
        user_id: userId,
        organization_id: invitation.organization_id,
        role: invitation.role,
        invited_at: invitation.created_at,
        invited_by: invitation.invited_by_user_id
      })
      .select()
      .single();

    if (userOrgError) throw userOrgError;

    // Marquer l'invitation comme acceptée
    const { error: updateError } = await customSupabaseClient
      .from('invitations')
      .update({ 
        status: 'accepted',
        accepted_at: new Date().toISOString()
      })
      .eq('id', invitation.id);

    if (updateError) throw updateError;

    return { data: userOrg, error: null };
  } catch (error) {
    console.error('Error accepting invitation:', error);
    return { data: null, error };
  }
}

/**
 * Mettre à jour le rôle d'un membre
 */
export async function updateMemberRole(userOrganizationId, newRole) {
  try {
    const { data, error } = await customSupabaseClient
      .from('user_organizations')
      .update({ role: newRole })
      .eq('id', userOrganizationId)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error updating member role:', error);
    return { data: null, error };
  }
}

/**
 * Supprimer un membre de l'organisation
 */
export async function removeMember(userOrganizationId) {
  try {
    const { error } = await customSupabaseClient
      .from('user_organizations')
      .delete()
      .eq('id', userOrganizationId);

    if (error) throw error;

    return { data: true, error: null };
  } catch (error) {
    console.error('Error removing member:', error);
    return { data: null, error };
  }
}

/**
 * Vérifier si un utilisateur est admin
 */
export async function isUserAdmin(userId, organizationId) {
  try {
    const { data, error } = await customSupabaseClient
      .from('user_organizations')
      .select('role')
      .eq('user_id', userId)
      .eq('organization_id', organizationId)
      .single();

    if (error) throw error;

    return data?.role === 'admin' || data?.role === 'manager';
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}
