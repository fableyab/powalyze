/**
 * Organization Service - VERSION SIMPLIFIÉE
 * L'organisation est OPTIONNELLE - pas de blocage si absente
 */

import customSupabaseClient from './customSupabaseClient';

/**
 * Obtenir l'organization_id de l'utilisateur (SANS auto-création)
 * Retourne null si pas d'organisation - AUCUNE ERREUR
 */
export async function getUserOrganizationId(userId) {
  try {
    const { data, error } = await customSupabaseClient
      .from('user_organizations')
      .select('organization_id')
      .eq('user_id', userId)
      .maybeSingle(); // maybeSingle = pas d'erreur si vide

    if (error) {
      console.log('⚠️ Pas d\'organisation trouvée (normal)');
      return null;
    }

    if (!data) {
      console.log('⚠️ Utilisateur sans organisation (OK)');
      return null;
    }

    console.log('✅ Organization ID:', data.organization_id);
    return data.organization_id;
  } catch (error) {
    console.error('❌ Erreur getUserOrganizationId:', error);
    return null;
  }
}

/**
 * Créer une organisation pour un utilisateur
 * Optionnel - seulement si l'utilisateur le demande
 */
export async function createOrganization(userId, userEmail, orgName = null) {
  try {
    // Générer un nom par défaut si non fourni
    const defaultName = orgName || `Organisation ${userEmail.split('@')[0]}`;

    // 1. Créer l'organisation
    const { data: newOrg, error: createError } = await customSupabaseClient
      .from('organizations')
      .insert([{ name: defaultName }])
      .select()
      .single();

    if (createError) {
      console.error('❌ Erreur création organisation:', createError);
      return null;
    }

    console.log('✅ Organisation créée:', newOrg.id);

    // 2. Lier l'utilisateur à l'organisation
    const { error: linkError } = await customSupabaseClient
      .from('user_organizations')
      .insert([{
        user_id: userId,
        organization_id: newOrg.id,
        role: 'admin'
      }]);

    if (linkError) {
      console.error('❌ Erreur liaison user-org:', linkError);
      return null;
    }

    console.log('✅ Utilisateur lié à l\'organisation');
    return newOrg.id;
  } catch (error) {
    console.error('❌ Erreur createOrganization:', error);
    return null;
  }
}

/**
 * Obtenir les détails de l'organisation de l'utilisateur
 */
export async function getUserOrganization(userId) {
  try {
    const { data, error } = await customSupabaseClient
      .from('user_organizations')
      .select('organization_id, role, organizations(*)')
      .eq('user_id', userId)
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    return {
      id: data.organization_id,
      name: data.organizations?.name,
      role: data.role
    };
  } catch (error) {
    console.error('❌ Erreur getUserOrganization:', error);
    return null;
  }
}

/**
 * Mettre à jour le nom de l'organisation
 */
export async function updateOrganization(organizationId, updates) {
  try {
    const { error } = await customSupabaseClient
      .from('organizations')
      .update(updates)
      .eq('id', organizationId);

    if (error) {
      console.error('❌ Erreur updateOrganization:', error);
      return false;
    }

    console.log('✅ Organisation mise à jour');
    return true;
  } catch (error) {
    console.error('❌ Erreur updateOrganization:', error);
    return false;
  }
}

export default {
  getUserOrganizationId,
  createOrganization,
  getUserOrganization,
  updateOrganization
};
