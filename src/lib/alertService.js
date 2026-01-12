/**
 * Service de gestion des alertes automatiques
 * Génération intelligente d'alertes pour risques, décisions et projets
 */

import customSupabaseClient from '@/lib/customSupabaseClient';

/**
 * Créer une nouvelle alerte
 */
export async function createAlert({
  organizationId,
  type,
  severity,
  title,
  message,
  relatedId
}) {
  try {
    const { data, error } = await customSupabaseClient
      .from('alerts')
      .insert([{
        organization_id: organizationId,
        type,
        severity,
        title,
        message,
        related_id: relatedId,
        is_read: false
      }])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating alert:', error);
    return { data: null, error };
  }
}

/**
 * Récupérer toutes les alertes d'une organisation
 */
export async function getAlerts(organizationId, options = {}) {
  try {
    const { isRead, type, severity, limit = 50 } = options;

    let query = customSupabaseClient
      .from('alerts')
      .select('*')
      .eq('organization_id', organizationId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (typeof isRead === 'boolean') {
      query = query.eq('is_read', isRead);
    }

    if (type) {
      query = query.eq('type', type);
    }

    if (severity) {
      query = query.eq('severity', severity);
    }

    const { data, error } = await query;

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching alerts:', error);
    return { data: [], error };
  }
}

/**
 * Marquer une alerte comme lue
 */
export async function markAlertAsRead(alertId) {
  try {
    const { data, error } = await customSupabaseClient
      .from('alerts')
      .update({ is_read: true })
      .eq('id', alertId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error marking alert as read:', error);
    return { data: null, error };
  }
}

/**
 * Marquer toutes les alertes comme lues
 */
export async function markAllAlertsAsRead(organizationId) {
  try {
    const { data, error } = await customSupabaseClient
      .from('alerts')
      .update({ is_read: true })
      .eq('organization_id', organizationId)
      .eq('is_read', false);

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error marking all alerts as read:', error);
    return { data: null, error };
  }
}

/**
 * Supprimer une alerte
 */
export async function deleteAlert(alertId) {
  try {
    const { error } = await customSupabaseClient
      .from('alerts')
      .delete()
      .eq('id', alertId);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting alert:', error);
    return { error };
  }
}

/**
 * Compter les alertes non lues
 */
export async function getUnreadAlertsCount(organizationId) {
  try {
    const { count, error } = await customSupabaseClient
      .from('alerts')
      .select('*', { count: 'exact', head: true })
      .eq('organization_id', organizationId)
      .eq('is_read', false);

    if (error) throw error;
    return { count, error: null };
  } catch (error) {
    console.error('Error counting unread alerts:', error);
    return { count: 0, error };
  }
}

/**
 * GÉNÉRATION AUTOMATIQUE D'ALERTES
 */

/**
 * Générer des alertes pour les risques critiques
 */
export async function generateRiskAlerts(organizationId) {
  try {
    // Récupérer tous les risques avec leurs projets
    const { data: risks, error: risksError } = await customSupabaseClient
      .from('risks')
      .select(`
        *,
        initiative:initiatives (
          id,
          name,
          organization_id
        )
      `)
      .eq('status', 'open');

    if (risksError) throw risksError;

    const alerts = [];

    for (const risk of risks) {
      // Vérifier que le risque appartient à l'organisation
      if (risk.initiative?.organization_id !== organizationId) continue;

      const score = risk.probability * risk.impact;

      // Alertes selon la criticité
      if (score > 0.56) {
        // Critique (> 56%)
        alerts.push({
          organizationId,
          type: 'risk',
          severity: 'critical',
          title: `🚨 Risque critique détecté`,
          message: `Le risque "${risk.name}" du projet "${risk.initiative.name}" a un score de criticité de ${Math.round(score * 100)}% (probabilité: ${Math.round(risk.probability * 100)}%, impact: ${Math.round(risk.impact * 100)}%). Action immédiate requise.`,
          relatedId: risk.id
        });
      } else if (score > 0.36) {
        // Haut (> 36%)
        alerts.push({
          organizationId,
          type: 'risk',
          severity: 'high',
          title: `⚠️ Risque élevé à surveiller`,
          message: `Le risque "${risk.name}" du projet "${risk.initiative.name}" présente un score de ${Math.round(score * 100)}%. Surveillez son évolution et planifiez des actions d'atténuation.`,
          relatedId: risk.id
        });
      }
    }

    // Créer toutes les alertes
    const results = await Promise.all(
      alerts.map(alert => createAlert(alert))
    );

    return { 
      generated: alerts.length,
      alerts: results.map(r => r.data).filter(Boolean),
      error: null 
    };
  } catch (error) {
    console.error('Error generating risk alerts:', error);
    return { generated: 0, alerts: [], error };
  }
}

/**
 * Générer des alertes pour les décisions urgentes
 */
export async function generateDecisionAlerts(organizationId) {
  try {
    const { data: decisions, error: decisionsError } = await customSupabaseClient
      .from('decisions')
      .select('*')
      .eq('organization_id', organizationId)
      .eq('status', 'pending')
      .not('due_date', 'is', null);

    if (decisionsError) throw decisionsError;

    const alerts = [];
    const now = new Date();

    for (const decision of decisions) {
      const dueDate = new Date(decision.due_date);
      const daysUntilDue = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));

      if (daysUntilDue < 0) {
        // Échéance dépassée
        alerts.push({
          organizationId,
          type: 'decision',
          severity: 'critical',
          title: `🚨 Décision en retard`,
          message: `La décision "${decision.title}" aurait dû être prise il y a ${Math.abs(daysUntilDue)} jour(s). Impact: ${decision.impact_level}. Action immédiate requise.`,
          relatedId: decision.id
        });
      } else if (daysUntilDue <= 3) {
        // Échéance dans 3 jours
        alerts.push({
          organizationId,
          type: 'decision',
          severity: 'high',
          title: `⏰ Décision urgente à prendre`,
          message: `La décision "${decision.title}" doit être prise dans ${daysUntilDue} jour(s). Impact: ${decision.impact_level}.`,
          relatedId: decision.id
        });
      } else if (daysUntilDue <= 7) {
        // Échéance dans 7 jours
        alerts.push({
          organizationId,
          type: 'decision',
          severity: 'medium',
          title: `📅 Décision à anticiper`,
          message: `La décision "${decision.title}" doit être prise dans ${daysUntilDue} jours. Impact: ${decision.impact_level}.`,
          relatedId: decision.id
        });
      }
    }

    const results = await Promise.all(
      alerts.map(alert => createAlert(alert))
    );

    return { 
      generated: alerts.length,
      alerts: results.map(r => r.data).filter(Boolean),
      error: null 
    };
  } catch (error) {
    console.error('Error generating decision alerts:', error);
    return { generated: 0, alerts: [], error };
  }
}

/**
 * Générer des alertes pour les projets à risque
 */
export async function generateProjectAlerts(organizationId) {
  try {
    const { data: initiatives, error: initiativesError } = await customSupabaseClient
      .from('initiatives')
      .select('*')
      .eq('organization_id', organizationId)
      .in('status', ['in_progress', 'at_risk']);

    if (initiativesError) throw initiativesError;

    const alerts = [];
    const now = new Date();

    for (const project of initiatives) {
      // Alerte si le projet est marqué "at_risk"
      if (project.status === 'at_risk') {
        alerts.push({
          organizationId,
          type: 'project',
          severity: 'high',
          title: `⚠️ Projet en difficulté`,
          message: `Le projet "${project.name}" est marqué comme à risque. Avancement: ${project.progress}%. Revoyez les priorités et les ressources allouées.`,
          relatedId: project.id
        });
      }

      // Alerte si progression < 30% et date de fin proche
      if (project.end_date && project.progress < 30) {
        const endDate = new Date(project.end_date);
        const daysRemaining = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24));

        if (daysRemaining <= 30 && daysRemaining > 0) {
          alerts.push({
            organizationId,
            type: 'project',
            severity: 'medium',
            title: `📊 Projet en retard potentiel`,
            message: `Le projet "${project.name}" n'est avancé qu'à ${project.progress}% alors qu'il se termine dans ${daysRemaining} jours. Planifiez une revue avec le sponsor.`,
            relatedId: project.id
          });
        }
      }

      // Alerte si progression stagnante (< 5%)
      if (project.status === 'in_progress' && project.progress < 5) {
        alerts.push({
          organizationId,
          type: 'project',
          severity: 'medium',
          title: `⏸️ Projet stagnant`,
          message: `Le projet "${project.name}" est en cours mais avec seulement ${project.progress}% de progression. Vérifiez les blocages potentiels.`,
          relatedId: project.id
        });
      }
    }

    const results = await Promise.all(
      alerts.map(alert => createAlert(alert))
    );

    return { 
      generated: alerts.length,
      alerts: results.map(r => r.data).filter(Boolean),
      error: null 
    };
  } catch (error) {
    console.error('Error generating project alerts:', error);
    return { generated: 0, alerts: [], error };
  }
}

/**
 * Générer toutes les alertes automatiques
 */
export async function generateAllAlerts(organizationId) {
  try {
    const [risks, decisions, projects] = await Promise.all([
      generateRiskAlerts(organizationId),
      generateDecisionAlerts(organizationId),
      generateProjectAlerts(organizationId)
    ]);

    return {
      total: risks.generated + decisions.generated + projects.generated,
      risks: risks.generated,
      decisions: decisions.generated,
      projects: projects.generated,
      error: null
    };
  } catch (error) {
    console.error('Error generating all alerts:', error);
    return { total: 0, risks: 0, decisions: 0, projects: 0, error };
  }
}
