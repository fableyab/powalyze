import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useNavigate } from 'react-router-dom';
import customSupabaseClient from '@/lib/customSupabaseClient';
import { 
  getAlerts, 
  markAlertAsRead, 
  markAllAlertsAsRead, 
  deleteAlert,
  generateAllAlerts
} from '@/lib/alertService';
import { ErrorMessages, logError } from '@/lib/errorMessages';
import logger from '@/lib/logger';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import CockpitLayout from '@/components/layout/CockpitLayout';
import { 
  Bell, 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  CheckCircle2, 
  X,
  Trash2,
  RefreshCw,
  CheckCheck
} from 'lucide-react';

const AlertsPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'critical', 'high'
  const [generating, setGenerating] = useState(false);

  // Charger les alertes
  useEffect(() => {
    if (user) {
      loadAlerts();
    }
  }, [user, filter]);

  const loadAlerts = async () => {
    setLoading(true);
    
    try {
      // Récupérer l'organization_id de l'utilisateur
      const { data: userOrgs, error: userOrgsError } = await customSupabaseClient
        .from('user_organizations')
        .select('organization_id')
        .eq('user_id', user.id);

      if (userOrgsError) throw userOrgsError;

      if (!userOrgs || userOrgs.length === 0) {
        logger.warn('Aucune organisation trouvée pour charger les alertes', { userId: user?.id });
        setAlerts([]);
        setLoading(false);
        return;
      }

      const organizationId = userOrgs[0].organization_id;

      const options = {};
      if (filter === 'unread') {
        options.isRead = false;
      } else if (filter === 'critical') {
        options.severity = 'critical';
      } else if (filter === 'high') {
        options.severity = 'high';
      }

      const { data, error } = await getAlerts(organizationId, options);
      
      if (error) throw error;
      setAlerts(data || []);
    } catch (error) {
      logger.error('AlertsPage.loadAlerts', error, { userId: user?.id });
      setAlerts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (alertId) => {
    try {
      await markAlertAsRead(alertId);
      setAlerts(alerts.map(alert => 
        alert.id === alertId ? { ...alert, is_read: true } : alert
      ));
    } catch (error) {
      logger.error('AlertsPage.handleMarkAsRead', error, { alertId });
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      // Récupérer l'organization_id
      const { data: userOrgs } = await customSupabaseClient
        .from('user_organizations')
        .select('organization_id')
        .eq('user_id', user.id)
        .single();

      await markAllAlertsAsRead(userOrgs.organization_id);
      setAlerts(alerts.map(alert => ({ ...alert, is_read: true })));
    } catch (error) {
      logger.error('AlertsPage.handleMarkAllAsRead', error, { userId: user?.id });
    }
  };

  const handleDelete = async (alertId) => {
    try {
      await deleteAlert(alertId);
      setAlerts(alerts.filter(alert => alert.id !== alertId));
    } catch (error) {
      logger.error('AlertsPage.handleDelete', error, { alertId });
    }
  };

  const handleGenerateAlerts = async () => {
    setGenerating(true);
    
    try {
      // Récupérer les organisations de l'utilisateur (peut être plusieurs)
      const { data: userOrgs, error: orgError } = await customSupabaseClient
        .from('user_organizations')
        .select('organization_id')
        .eq('user_id', user.id);

      logger.debug('Recherche organisations pour user', { userId: user.id, userOrgs, orgError });

      if (orgError) {
        logError('AlertsPage.generateAlerts', orgError, { userId: user.id });
        toast({
          variant: "destructive",
          title: ErrorMessages.DATA_LOAD_FAILED.title,
          description: "Impossible de charger vos organisations. Veuillez réessayer."
        });
        return;
      }

      if (!userOrgs || userOrgs.length === 0) {
        logError('AlertsPage.generateAlerts', new Error('No organization found'), { 
          userId: user.id, 
          email: user.email 
        });
        toast({
          variant: "destructive",
          title: ErrorMessages.NO_ORGANIZATION.title,
          description: ErrorMessages.NO_ORGANIZATION.description,
          action: (
            <Button 
              size="sm"
              onClick={() => window.location.href = ErrorMessages.NO_ORGANIZATION.actionRoute}
            >
              {ErrorMessages.NO_ORGANIZATION.action}
            </Button>
          )
        });
        return;
      }

      // Prendre la première organisation (ou permettre à l'utilisateur de choisir si plusieurs)
      const organizationId = userOrgs[0].organization_id;
      
      if (userOrgs.length > 1) {
        logger.warn(`${userOrgs.length} organisations trouvées, utilisation de la première`, { userOrgs });
      }

      logger.debug('Génération des alertes pour organisation', { organizationId });

      const result = await generateAllAlerts(organizationId);
      
      logger.debug('Résultat génération', result);

      if (result.error) {
        logger.error('AlertsPage.generateAlerts', result.error, { organizationId });
        alert(`❌ Erreur lors de la génération des alertes:\n\n${result.error.message || 'Erreur inconnue'}\n\n➡️ Vérifiez les logs de la console (F12) pour plus de détails.`);
      } else if (result.total > 0) {
        alert(`✅ ${result.total} alertes générées avec succès!\n\n📊 Détails:\n- 🔴 Risques: ${result.risks}\n- 📋 Décisions: ${result.decisions}\n- 📁 Projets: ${result.projects}`);
        loadAlerts(); // Recharger les alertes
      } else {
        alert(`ℹ️ Aucune nouvelle alerte à générer.\n\n➡️ Vérifiez que vous avez des données:\n\n1. Risques avec status='open'\n2. Décisions avec due_date définie\n3. Projets avec status='in_progress' ou 'at_risk'\n\n💡 Astuce: Créez d'abord des risques, décisions ou projets dans les pages correspondantes.`);
      }
    } catch (error) {
      logger.error('AlertsPage.handleGenerateAlerts', error, { userId: user?.id });
      alert(`❌ Erreur inattendue:\n\n${error.message || 'Erreur inconnue'}\n\nStack: ${error.stack || 'N/A'}\n\n➡️ Consultez la console (F12) pour plus de détails.`);
    } finally {
      setGenerating(false);
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'high':
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case 'medium':
        return <Info className="w-5 h-5 text-yellow-500" />;
      case 'low':
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'border-red-500/30 bg-red-500/5';
      case 'high':
        return 'border-orange-500/30 bg-orange-500/5';
      case 'medium':
        return 'border-yellow-500/30 bg-yellow-500/5';
      case 'low':
        return 'border-blue-500/30 bg-blue-500/5';
      default:
        return 'border-white/10 bg-white/[0.02]';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'risk': return '🎯 Risque';
      case 'decision': return '⚖️ Décision';
      case 'project': return '📊 Projet';
      case 'milestone': return '🎯 Jalon';
      default: return type;
    }
  };

  const stats = {
    total: alerts.length,
    unread: alerts.filter(a => !a.is_read).length,
    critical: alerts.filter(a => a.severity === 'critical').length,
    high: alerts.filter(a => a.severity === 'high').length
  };

  return (
    <CockpitLayout>
      <div className="min-h-screen bg-black text-white p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#4A9EFF] flex items-center justify-center">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-extralight text-[#D4AF37]">Centre d'alertes</h1>
                <p className="text-sm text-white/50 font-light">Surveillez les signaux critiques en temps réel</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleGenerateAlerts}
                disabled={generating}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-sm font-light text-sm flex items-center gap-2 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${generating ? 'animate-spin' : ''}`} />
                {generating ? 'Génération...' : 'Générer alertes'}
              </button>

              <button
                onClick={handleMarkAllAsRead}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-sm font-light text-sm flex items-center gap-2 transition-colors"
              >
                <CheckCheck className="w-4 h-4" />
                Tout marquer lu
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="p-4 border border-white/10 bg-white/[0.02] rounded-sm">
              <div className="text-2xl font-extralight text-white mb-1">{stats.total}</div>
              <div className="text-xs text-white/50 font-light">Total</div>
            </div>
            <div className="p-4 border border-blue-500/30 bg-blue-500/5 rounded-sm">
              <div className="text-2xl font-extralight text-blue-400 mb-1">{stats.unread}</div>
              <div className="text-xs text-white/50 font-light">Non lues</div>
            </div>
            <div className="p-4 border border-red-500/30 bg-red-500/5 rounded-sm">
              <div className="text-2xl font-extralight text-red-400 mb-1">{stats.critical}</div>
              <div className="text-xs text-white/50 font-light">Critiques</div>
            </div>
            <div className="p-4 border border-orange-500/30 bg-orange-500/5 rounded-sm">
              <div className="text-2xl font-extralight text-orange-400 mb-1">{stats.high}</div>
              <div className="text-xs text-white/50 font-light">Élevées</div>
            </div>
          </div>

          {/* Filtres */}
          <div className="flex items-center gap-2 mt-6">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-sm font-light text-sm transition-colors ${
                filter === 'all' 
                  ? 'bg-[#D4AF37] text-black' 
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              Toutes
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-sm font-light text-sm transition-colors ${
                filter === 'unread' 
                  ? 'bg-[#D4AF37] text-black' 
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              Non lues
            </button>
            <button
              onClick={() => setFilter('critical')}
              className={`px-4 py-2 rounded-sm font-light text-sm transition-colors ${
                filter === 'critical' 
                  ? 'bg-[#D4AF37] text-black' 
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              Critiques
            </button>
            <button
              onClick={() => setFilter('high')}
              className={`px-4 py-2 rounded-sm font-light text-sm transition-colors ${
                filter === 'high' 
                  ? 'bg-[#D4AF37] text-black' 
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              Élevées
            </button>
          </div>
        </div>

        {/* Liste des alertes */}
        <div className="space-y-3">
          {loading ? (
            <div className="text-center py-12 text-white/50 font-light">
              Chargement des alertes...
            </div>
          ) : alerts.length === 0 ? (
            <div className="text-center py-12 border border-white/10 bg-white/[0.02] rounded-sm">
              <Bell className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <p className="text-white/50 font-light mb-4">Aucune alerte pour le moment</p>
              <button
                onClick={handleGenerateAlerts}
                className="px-6 py-2 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-white font-light rounded-sm hover:scale-105 transition-transform"
              >
                Générer des alertes
              </button>
            </div>
          ) : (
            alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 border rounded-sm transition-all ${getSeverityColor(alert.severity)} ${
                  alert.is_read ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1">{getSeverityIcon(alert.severity)}</div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-xs px-2 py-1 bg-white/10 rounded-sm font-light">
                          {getTypeLabel(alert.type)}
                        </span>
                        <h3 className="font-light text-white">{alert.title}</h3>
                        {!alert.is_read && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {!alert.is_read && (
                          <button
                            onClick={() => handleMarkAsRead(alert.id)}
                            className="p-1 hover:bg-white/10 rounded-sm transition-colors"
                            title="Marquer comme lu"
                          >
                            <CheckCircle2 className="w-4 h-4 text-white/50" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(alert.id)}
                          className="p-1 hover:bg-red-500/20 rounded-sm transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4 text-white/50" />
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-sm text-white/70 font-light mb-2">
                      {alert.message}
                    </p>
                    
                    <div className="text-xs text-white/40 font-light">
                      {new Date(alert.created_at).toLocaleString('fr-FR')}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </CockpitLayout>
  );
};

export default AlertsPage;
