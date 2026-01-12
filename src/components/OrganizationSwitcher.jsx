/**
 * Sélecteur d'organisation - Permet de basculer entre Demo et Prod
 */
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import environmentService from '@/lib/environmentService';
import { useToast } from '@/components/ui/use-toast';
import { Building2, Eye, Briefcase, ChevronDown } from 'lucide-react';

export default function OrganizationSwitcher() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [organizations, setOrganizations] = useState([]);
  const [currentOrg, setCurrentOrg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (user?.id) {
      loadOrganizations();
    }
  }, [user]);

  async function loadOrganizations() {
    try {
      setLoading(true);
      const { organizations: orgs } = await environmentService.getUserOrganizations(user.id);
      setOrganizations(orgs || []);

      // Récupérer l'org actuelle depuis localStorage ou utiliser la première
      const savedOrgId = localStorage.getItem('currentOrganizationId');
      const current = orgs?.find(o => o.id === savedOrgId) || orgs?.[0];
      
      if (current) {
        setCurrentOrg(current);
        localStorage.setItem('currentOrganizationId', current.id);
      }
    } catch (error) {
      console.error('Error loading organizations:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les organisations",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }

  async function switchOrganization(org) {
    setCurrentOrg(org);
    localStorage.setItem('currentOrganizationId', org.id);
    setIsOpen(false);
    
    toast({
      title: "Organisation changée",
      description: `Vous êtes maintenant sur "${org.name}"`
    });

    // Recharger la page pour mettre à jour toutes les données
    window.location.reload();
  }

  if (loading || !currentOrg) {
    return null;
  }

  // N'afficher que si l'utilisateur a plusieurs organisations
  if (organizations.length <= 1) {
    return null;
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors text-white border border-slate-700"
      >
        {currentOrg.isDemo ? (
          <Eye className="w-4 h-4 text-blue-400" />
        ) : (
          <Briefcase className="w-4 h-4 text-[#D4AF37]" />
        )}
        <span className="text-sm font-medium">{currentOrg.name}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full mt-2 right-0 w-72 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 overflow-hidden">
            <div className="p-3 border-b border-slate-700">
              <p className="text-xs text-slate-400 uppercase font-semibold">Changer d'organisation</p>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {organizations.map((org) => (
                <button
                  key={org.id}
                  onClick={() => switchOrganization(org)}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-700 transition-colors text-left ${
                    org.id === currentOrg.id ? 'bg-slate-700' : ''
                  }`}
                >
                  {org.isDemo ? (
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      <Eye className="w-5 h-5 text-blue-400" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{org.name}</p>
                    <p className="text-xs text-slate-400">
                      {org.isDemo ? 'Environnement de démonstration' : 'Environnement de production'}
                    </p>
                  </div>
                  {org.id === currentOrg.id && (
                    <div className="w-2 h-2 rounded-full bg-[#D4AF37] flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
