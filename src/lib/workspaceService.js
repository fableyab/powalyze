/**
 * ======================================================================
 * SERVICE POWALYZE - Création Organisation + Workspace + Membership
 * ======================================================================
 * 
 * Architecture Workspaces avec trigger auto-fill created_by
 * Compatible avec MIGRATION_WORKSPACES_COMPLETE_RLS.sql
 * 
 * Tables Supabase :
 * - organizations(id, name, created_by, created_at)
 * - workspaces(id, organization_id, name, owner_id, created_by, created_at)
 * - memberships(id, workspace_id, user_id, role, created_at)
 * 
 * ======================================================================
 */

import customSupabaseClient from './customSupabaseClient';

/**
 * Créer une organisation avec son workspace principal et membership
 * 
 * @param {string} organizationName - Nom de l'organisation
 * @param {string} userId - ID de l'utilisateur créateur (auth.uid())
 * @returns {Promise<{organization, workspace, membership}>}
 */
export async function createOrganizationWithWorkspaceAndMembership(
  organizationName,
  userId
) {
  try {
    console.log('🚀 Création organisation:', organizationName);

    // 1) Créer l'organisation
    // ✅ created_by rempli automatiquement par le trigger auto_set_created_by()
    const { data: org, error: orgError } = await customSupabaseClient
      .from('organizations')
      .insert({
        name: organizationName,
        // created_by: userId  ← OPTIONNEL car trigger auto-fill
      })
      .select('id, name')
      .single();

    if (orgError) {
      console.error('❌ Erreur création organisation:', orgError);
      throw new Error(`Erreur création organisation: ${orgError.message}`);
    }

    console.log('✅ Organisation créée:', org);

    // 2) Créer le workspace principal rattaché à l'organisation
    const defaultWorkspaceName = `${organizationName} – Portefeuille principal`;

    const { data: workspace, error: wsError } = await customSupabaseClient
      .from('workspaces')
      .insert({
        organization_id: org.id,
        name: defaultWorkspaceName,
        owner_id: userId,
        // created_by: userId  ← OPTIONNEL car trigger auto-fill
      })
      .select('id, name, organization_id, owner_id')
      .single();

    if (wsError) {
      console.error('❌ Erreur création workspace:', wsError);
      throw new Error(`Erreur création workspace: ${wsError.message}`);
    }

    console.log('✅ Workspace créé:', workspace);

    // 3) Créer le membership du créateur (owner)
    const { data: membership, error: memError } = await customSupabaseClient
      .from('memberships')
      .insert({
        workspace_id: workspace.id,
        user_id: userId,
        role: 'owner',
      })
      .select('id, workspace_id, user_id, role')
      .single();

    if (memError) {
      console.error('❌ Erreur création membership:', memError);
      throw new Error(`Erreur création membership: ${memError.message}`);
    }

    console.log('✅ Membership créé:', membership);

    // 4) Retourner les objets créés
    return {
      success: true,
      organization: {
        id: org.id,
        name: org.name,
      },
      workspace: {
        id: workspace.id,
        name: workspace.name,
        organization_id: workspace.organization_id,
        owner_id: workspace.owner_id,
      },
      membership: {
        id: membership.id,
        workspace_id: membership.workspace_id,
        user_id: membership.user_id,
        role: membership.role,
      },
    };

  } catch (error) {
    console.error('❌ Erreur globale createOrganizationWithWorkspaceAndMembership:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Obtenir les workspaces d'un utilisateur (en tant que owner ou member)
 * 
 * @param {string} userId - ID de l'utilisateur
 * @returns {Promise<Array>}
 */
export async function getUserWorkspaces(userId) {
  try {
    // Récupérer les workspaces via memberships
    const { data: memberships, error: memError } = await customSupabaseClient
      .from('memberships')
      .select(`
        workspace_id,
        role,
        workspaces (
          id,
          name,
          organization_id,
          owner_id,
          created_at,
          organizations (
            id,
            name
          )
        )
      `)
      .eq('user_id', userId);

    if (memError) {
      console.error('❌ Erreur récupération workspaces:', memError);
      throw memError;
    }

    return memberships.map(m => ({
      ...m.workspaces,
      role: m.role,
    }));

  } catch (error) {
    console.error('❌ Erreur getUserWorkspaces:', error);
    return [];
  }
}

/**
 * Obtenir les organisations créées par un utilisateur
 * 
 * @param {string} userId - ID de l'utilisateur
 * @returns {Promise<Array>}
 */
export async function getUserOrganizations(userId) {
  try {
    const { data: orgs, error } = await customSupabaseClient
      .from('organizations')
      .select('id, name, created_at')
      .eq('created_by', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Erreur récupération organisations:', error);
      throw error;
    }

    return orgs || [];

  } catch (error) {
    console.error('❌ Erreur getUserOrganizations:', error);
    return [];
  }
}

/**
 * Ajouter un membre à un workspace
 * 
 * @param {string} workspaceId - ID du workspace
 * @param {string} userEmail - Email de l'utilisateur à ajouter
 * @param {string} role - Rôle (owner, admin, member)
 * @param {string} currentUserId - ID de l'utilisateur courant (doit être owner)
 * @returns {Promise<{success, membership}>}
 */
export async function addMemberToWorkspace(
  workspaceId,
  userEmail,
  role = 'member',
  currentUserId
) {
  try {
    // 1) Vérifier que l'utilisateur courant est owner du workspace
    const { data: workspace, error: wsError } = await customSupabaseClient
      .from('workspaces')
      .select('owner_id')
      .eq('id', workspaceId)
      .single();

    if (wsError || !workspace) {
      throw new Error('Workspace introuvable');
    }

    if (workspace.owner_id !== currentUserId) {
      throw new Error('Seul le propriétaire peut ajouter des membres');
    }

    // 2) Trouver l'utilisateur par email
    const { data: users, error: userError } = await customSupabaseClient
      .from('auth.users')
      .select('id')
      .eq('email', userEmail)
      .single();

    if (userError || !users) {
      throw new Error(`Utilisateur ${userEmail} introuvable`);
    }

    const targetUserId = users.id;

    // 3) Vérifier si déjà membre
    const { data: existing, error: existError } = await customSupabaseClient
      .from('memberships')
      .select('id')
      .eq('workspace_id', workspaceId)
      .eq('user_id', targetUserId)
      .single();

    if (existing) {
      return {
        success: false,
        error: 'Cet utilisateur est déjà membre du workspace',
      };
    }

    // 4) Créer le membership
    const { data: membership, error: memError } = await customSupabaseClient
      .from('memberships')
      .insert({
        workspace_id: workspaceId,
        user_id: targetUserId,
        role: role,
      })
      .select()
      .single();

    if (memError) {
      throw memError;
    }

    return {
      success: true,
      membership,
    };

  } catch (error) {
    console.error('❌ Erreur addMemberToWorkspace:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export default {
  createOrganizationWithWorkspaceAndMembership,
  getUserWorkspaces,
  getUserOrganizations,
  addMemberToWorkspace,
};
