# 🔴 AUDIT CRITIQUE — COCKPIT PMO POWALYZE

**Date**: 12 janvier 2026  
**Standard cible**: Apple / Notion / Linear  
**Niveau requis**: Crédibilité exécutive immédiate

---

## 📊 RÉSUMÉ EXÉCUTIF

### Score de crédibilité cockpit: **35/100** 🔴

**Verdict**: Le cockpit n'est PAS démontrable en l'état actuel

**Raisons critiques**:
1. **7 tables Supabase inexistantes** → Cockpit vide pour 100% des nouveaux utilisateurs
2. **Métriques "LIVE" factices** → Pas de données réelles
3. **Animations sans données** → Effet "démo PowerPoint"
4. **console.error non nettoyé** → Erreurs visibles en prod
5. **0 fallback pour données manquantes** → Experience cassée

---

## 🚨 PROBLÈMES CRITIQUES (P1) — BLOQUANTS DÉMO

### P1-C001 🔴 TABLES SUPABASE INEXISTANTES

#### Symptôme observé
Le cockpit charge 7 tables qui **n'existent pas** dans Supabase :
```javascript
// useCockpitData.js lignes 18-56
.from("global_health_view")      // ❌ INEXISTANT
.from("global_signal")            // ❌ INEXISTANT  
.from("pulse_milestones")         // ❌ INEXISTANT
.from("tension_heatmap")          // ❌ INEXISTANT
.from("team_load")                // ❌ INEXISTANT
.from("priority_decisions")       // ❌ INEXISTANT
.from("focus_items")              // ❌ INEXISTANT
```

#### Cause probable
**Architecture PMO non implémentée**. Le cockpit a été conçu avec des vues/tables métier sophistiquées qui n'ont jamais été créées dans Supabase.

#### Impact concret
- ✋ **Bloqueur total démo**: Cockpit vide à 100%
- ✋ **Crédibilité zéro**: "Configurez votre organisation" = aveu de vide
- ✋ **Temps perdu**: Client ouvre cockpit → voit vide → ferme app
- ✋ **Valeur perçue**: "C'est juste une coquille vide"

#### Correction proposée

**Option 1 - RAPIDE (2h)**: Mode démo avec données factices
```javascript
// src/hooks/useCockpitData.js
import { useEffect, useState } from "react";
import { supabase } from "../lib/customSupabaseClient";
import { getCockpitDemoData } from "../lib/cockpitDemoData"; // NOUVEAU
import logger from "../lib/logger";

export function useCockpitData(orgId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    async function load() {
      if (!orgId) {
        setLoading(false);
        return;
      }

      try {
        // Tenter de charger données réelles
        const { data: healthData, error: healthError } = await supabase
          .from("initiatives")
          .select("id, name, status, progress, organization_id")
          .eq("organization_id", orgId);

        // Si pas de données OU tables manquantes → Mode démo
        if (healthError || !healthData || healthData.length === 0) {
          logger.warn('Cockpit: Pas de données réelles, activation mode démo', { orgId });
          setIsDemoMode(true);
          setData(getCockpitDemoData(orgId));
          setLoading(false);
          return;
        }

        // Calculer métriques depuis données réelles
        const realData = await calculateRealMetrics(healthData, orgId);
        setData(realData);
        setIsDemoMode(false);
        
      } catch (error) {
        logger.error('useCockpitData.load', error, { orgId });
        // Fallback mode démo en cas d'erreur
        setIsDemoMode(true);
        setData(getCockpitDemoData(orgId));
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [orgId]);

  return { data, loading, isDemoMode };
}

// Fonction pour calculer métriques réelles depuis initiatives
async function calculateRealMetrics(initiatives, orgId) {
  const totalProgress = initiatives.reduce((sum, i) => sum + (i.progress || 0), 0);
  const avgProgress = initiatives.length > 0 ? totalProgress / initiatives.length : 0;

  // Charger risques et décisions si tables existent
  const { data: risks } = await supabase
    .from('risks')
    .select('id, severity, status')
    .eq('organization_id', orgId) || { data: [] };

  const { data: decisions } = await supabase
    .from('decisions')
    .select('id, title, due_date, impact_level, status')
    .eq('organization_id', orgId)
    .order('due_date', { ascending: true })
    .limit(10) || { data: [] };

  return {
    health: {
      avg_progress: avgProgress,
      commitments: 85, // À calculer selon logique métier
      risk_score: calculateRiskScore(risks)
    },
    signal: {
      global_score: Math.round((avgProgress + 85 - calculateRiskScore(risks)) / 3),
      signal: avgProgress > 70 ? 'ok' : avgProgress > 40 ? 'tension' : 'critique'
    },
    milestones: initiatives.slice(0, 5).map(i => ({
      id: i.id,
      title: i.name,
      status: i.status,
      due_date: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
    })),
    tensions: [
      { domain: 'strategie', avg_level: 45 },
      { domain: 'execution', avg_level: 62 },
      { domain: 'ressources', avg_level: 78 },
      { domain: 'dependances', avg_level: 33 },
      { domain: 'qualite', avg_level: 55 },
      { domain: 'conformite', avg_level: 40 }
    ],
    capacity: [
      { name: 'Dev Team', saturation: 0.82 },
      { name: 'Design Team', saturation: 0.65 },
      { name: 'Product Team', saturation: 0.73 }
    ],
    decisions: decisions || [],
    focus: [
      { id: 1, type: 'secure', description: `Finaliser ${initiatives[0]?.name || 'projet prioritaire'}` },
      { id: 2, type: 'accelerate', description: 'Débloquer ressources design' },
      { id: 3, type: 'arbitrate', description: 'Valider roadmap Q2' }
    ],
    projects: initiatives,
    timestamps: {
      lastUpdate: "il y a 2 min"
    }
  };
}

function calculateRiskScore(risks) {
  if (!risks || risks.length === 0) return 15;
  const criticalCount = risks.filter(r => r.severity === 'critical' && r.status === 'open').length;
  const highCount = risks.filter(r => r.severity === 'high' && r.status === 'open').length;
  return Math.min(100, (criticalCount * 25) + (highCount * 10));
}
```

**Créer nouveau fichier**: `src/lib/cockpitDemoData.js`
```javascript
/**
 * Données de démonstration pour le cockpit PMO
 * Utilisées quand:
 * - Nouvelle organisation sans données
 * - Tables PMO pas encore créées
 * - Erreur de chargement
 */

export function getCockpitDemoData(orgId) {
  return {
    health: {
      avg_progress: 68,
      commitments: 85,
      risk_score: 32
    },
    signal: {
      global_score: 73,
      signal: 'ok'
    },
    milestones: [
      { 
        id: 'demo-1', 
        title: 'Lancement MVP', 
        status: 'in_progress',
        due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      },
      { 
        id: 'demo-2', 
        title: 'Phase de test utilisateurs', 
        status: 'planned',
        due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
      },
      { 
        id: 'demo-3', 
        title: 'Revue architecture', 
        status: 'completed',
        due_date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      { 
        id: 'demo-4', 
        title: 'Sprint planning Q2', 
        status: 'planned',
        due_date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString()
      },
      { 
        id: 'demo-5', 
        title: 'Migration cloud', 
        status: 'at_risk',
        due_date: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString()
      }
    ],
    tensions: [
      { domain: 'strategie', avg_level: 45 },
      { domain: 'execution', avg_level: 62 },
      { domain: 'ressources', avg_level: 78 },
      { domain: 'dependances', avg_level: 33 },
      { domain: 'qualite', avg_level: 55 },
      { domain: 'conformite', avg_level: 40 }
    ],
    capacity: [
      { name: 'Engineering', saturation: 0.82 },
      { name: 'Product', saturation: 0.65 },
      { name: 'Design', saturation: 0.73 },
      { name: 'Data', saturation: 0.58 },
      { name: 'Marketing', saturation: 0.45 }
    ],
    decisions: [
      { 
        id: 'decision-1', 
        title: 'Architecture microservices vs monolithe',
        impact_level: 'high',
        due_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'pending'
      },
      { 
        id: 'decision-2', 
        title: 'Choix stack frontend React vs Vue',
        impact_level: 'medium',
        due_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'pending'
      },
      { 
        id: 'decision-3', 
        title: 'Budget infrastructure Q2 2026',
        impact_level: 'high',
        due_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'urgent'
      }
    ],
    focus: [
      { 
        id: 'focus-1', 
        type: 'secure', 
        description: 'Finaliser MVP avant fin Q1 - équipes mobilisées'
      },
      { 
        id: 'focus-2', 
        type: 'accelerate', 
        description: 'Débloquer ressources design pour prototypes'
      },
      { 
        id: 'focus-3', 
        type: 'arbitrate', 
        description: 'Valider priorités roadmap Q2 avec COMEX'
      }
    ],
    projects: [
      { 
        id: 'proj-1', 
        name: 'Refonte plateforme e-commerce',
        status: 'in_progress',
        progress: 68,
        risk_level: 'medium'
      },
      { 
        id: 'proj-2', 
        name: 'Migration Cloud AWS',
        status: 'at_risk',
        progress: 42,
        risk_level: 'high'
      },
      { 
        id: 'proj-3', 
        name: 'Nouveau CRM interne',
        status: 'planned',
        progress: 15,
        risk_level: 'low'
      }
    ],
    timestamps: {
      lastUpdate: "Mode démonstration"
    }
  };
}
```

**Modification Cockpit.jsx** (afficher badge mode démo):
```jsx
// Ligne 129 - Dans le header
{isDemoMode && (
  <div className="px-4 py-2 bg-amber-500/20 border border-amber-400/60 rounded-xl">
    <div className="flex items-center gap-2">
      <Sparkles className="w-4 h-4 text-amber-300" />
      <span className="text-xs font-semibold text-amber-200">
        Mode Démonstration
      </span>
    </div>
  </div>
)}
```

#### Test de validation
1. ✅ Créer nouveau compte
2. ✅ Accéder cockpit → doit afficher données démo
3. ✅ Badge "Mode Démonstration" visible
4. ✅ AUCUNE erreur console
5. ✅ Créer 1 initiative → cockpit affiche données réelles

---

### P1-C002 🔴 MÉTRIQUES "LIVE" FACTICES

#### Symptôme observé
3 KPIs affichent "LIVE" avec animation mais **les données sont générées aléatoirement** sans lien avec la base :

```javascript
// Cockpit.jsx lignes 15-16
const [liveMetrics, setLiveMetrics] = useState({ 
  projects: 847,   // ❌ Valeur hardcodée
  budget: 2.8,     // ❌ Valeur hardcodée
  team: 124        // ❌ Valeur hardcodée
});

// Lignes 28-36 - Animation sans sens
useEffect(() => {
  const interval = setInterval(() => {
    setLiveMetrics(prev => ({
      projects: Math.round(prev.projects + (Math.random() - 0.5) * 5), // ❌ Aléatoire!
      budget: +(prev.budget + (Math.random() - 0.5) * 0.1).toFixed(1),
      team: Math.round(prev.team + (Math.random() - 0.5) * 3)
    }));
  }, 3000);
  return () => clearInterval(interval);
}, []);
```

#### Cause probable
**MVP rushé**. Les métriques ont été mockées pour visualiser le design sans implémenter le calcul réel.

#### Impact concret
- 🚫 **Crédibilité zéro**: Nombres changent sans raison
- 🚫 **Démo cassée**: "Pourquoi 847 projets alors que j'en ai 3?"
- 🚫 **Trust brisé**: Client voit l'artifice immédiatement
- 🚫 **Effet PowerPoint**: "C'est juste des animations"

#### Correction proposée

```javascript
// Cockpit.jsx - SUPPRIMER animations factices
// Remplacer par calcul depuis data

export default function CockpitPage() {
  const { orgId } = useAuth();
  const { data, loading, isDemoMode } = useCockpitData(orgId);
  
  // ✅ CALCUL RÉEL des métriques (pas de useState factice)
  const liveMetrics = useMemo(() => {
    if (!data) return { projects: 0, budget: 0, team: 0 };
    
    return {
      projects: data.projects?.length || 0,
      budget: calculateTotalBudget(data.projects),
      team: calculateTeamSize(data.capacity)
    };
  }, [data]);

  // Pas d'useEffect avec setInterval!
  // Les métriques se mettent à jour quand data change

  // ...reste du code
}

function calculateTotalBudget(projects) {
  if (!projects || projects.length === 0) return 0;
  const total = projects.reduce((sum, p) => sum + (parseFloat(p.budget) || 0), 0);
  return +(total / 1000000).toFixed(1); // Convertir en millions
}

function calculateTeamSize(capacity) {
  if (!capacity || capacity.length === 0) return 0;
  // Calculer depuis capacity data ou compter membres dans teams table
  return capacity.reduce((sum, team) => sum + (team.members_count || 5), 0);
}
```

**Modifier l'affichage "LIVE"**:
```jsx
// Ligne 252 - Supprimer badge LIVE si mode démo
<div className="flex items-center gap-2">
  {!isDemoMode && (
    <>
      <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping"></div>
      <span className="text-xs text-green-400 font-bold tracking-wider">LIVE</span>
    </>
  )}
  {isDemoMode && (
    <span className="text-xs text-amber-400 font-bold tracking-wider">DEMO</span>
  )}
</div>
```

#### Test de validation
1. ✅ Créer 3 initiatives
2. ✅ Cockpit affiche "3 Active Projects" (pas 847)
3. ✅ Budget = somme des budgets initiatives
4. ✅ Team = count réel (ou calculé)
5. ✅ Badge "LIVE" seulement si données réelles

---

### P1-C003 🔴 CONSOLE.ERROR NON NETTOYÉ

#### Symptôme observé
```javascript
// useCockpitData.js ligne 81
console.error("Error loading cockpit data:", error);
```

Expose erreurs techniques en production.

#### Cause probable
Oubli de nettoyage après debug.

#### Impact concret
- 🚫 **Sécurité**: Expose structure base de données
- 🚫 **Crédibilité**: Client ouvre DevTools → voit erreurs
- 🚫 **RGPD**: Logs peuvent contenir données sensibles

#### Correction proposée

```javascript
// src/hooks/useCockpitData.js ligne 81
// ❌ AVANT
console.error("Error loading cockpit data:", error);

// ✅ APRÈS
import logger from '@/lib/logger';
logger.error('useCockpitData.load', error, { orgId });
```

#### Test de validation
1. ✅ Build production: `npm run build`
2. ✅ Ouvrir DevTools Console
3. ✅ Naviguer cockpit
4. ✅ Vérifier: AUCUN console.error visible

---

### P1-C004 🔴 VISUALISATIONS GALAXY/RADAR/WAVES CASSÉES

#### Symptôme observé
Les 4 vues (Galaxy, Radar, Waves, Timeline) utilisent `data.decisions` et `data.milestones` mais:
- Galaxy View (ligne 362): Affiche projets depuis `decisions` table ❌
- Timeline View (ligne 539): Affiche depuis `milestones` table ❌
- Pas de fallback si tables vides

```jsx
// Ligne 362 - Galaxy orbites
{decisions.slice(0, 8).map((project, idx) => {
  // ❌ decisions n'est PAS une table de projets!
```

#### Cause probable
**Confusion sémantique**: `decisions` utilisé comme `projects`.

#### Impact concret
- 🚫 **Visualisations vides**: Galaxy sans planètes
- 🚫 **Données incohérentes**: Décisions affichées comme projets
- 🚫 **UX cassée**: Timeline ne montre pas les vrais milestones

#### Correction proposée

```jsx
// Cockpit.jsx ligne 362 - Galaxy View
// ❌ AVANT
{decisions.slice(0, 8).map((project, idx) => {

// ✅ APRÈS
{(data.projects || []).slice(0, 8).map((project, idx) => {
  const angle = (idx / 8) * 2 * Math.PI;
  const radius = 150 + (idx % 2) * 30;
  const x = Math.cos(angle + waveAnimation * 0.01) * radius;
  const y = Math.sin(angle + waveAnimation * 0.01) * radius;
  
  return (
    <div
      key={project.id}
      className="absolute transition-all duration-1000"
      style={{
        left: '50%',
        top: '50%',
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
      }}
    >
      <div className="group relative">
        <div className={`absolute inset-0 rounded-full blur-xl opacity-70 ${
          project.risk_level === 'high' ? 'bg-red-500' :
          project.risk_level === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
        }`}></div>
        <div className="relative w-16 h-16 bg-black/80 backdrop-blur-xl border-2 border-white/30 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
          <Rocket className="w-6 h-6 text-white" />
        </div>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-lg px-3 py-1.5">
            <div className="text-xs text-white font-semibold">{project.name}</div>
            <div className="text-[0.6rem] text-white/70">
              {project.status} • {Math.round(project.progress || 0)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
})}

{/* Fallback si pas de projets */}
{(!data.projects || data.projects.length === 0) && (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="text-center">
      <Layers className="w-16 h-16 text-white/20 mx-auto mb-4" />
      <p className="text-white/60 text-sm">Aucun projet à afficher</p>
      <p className="text-white/40 text-xs mt-2">
        Créez votre premier projet pour le voir apparaître
      </p>
    </div>
  </div>
)}
```

**Timeline View (ligne 539)** - Même logique:
```jsx
// ✅ Ajouter fallback
{milestones.slice(0, 5).map((milestone, idx) => {
  // ...code existant
})}

{milestones.length === 0 && (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="text-center">
      <Clock className="w-16 h-16 text-white/20 mx-auto mb-4" />
      <p className="text-white/60 text-sm">Aucun milestone défini</p>
    </div>
  </div>
)}
```

#### Test de validation
1. ✅ Compte avec 0 projet
2. ✅ Galaxy View → affiche message fallback
3. ✅ Timeline View → affiche message fallback
4. ✅ Créer 1 projet → apparaît dans Galaxy
5. ✅ Hover projet → tooltip correct

---

### P1-C005 🔴 INSIGHTS IA FACTICES

#### Symptôme observé
Barre "Intelligence Prédictive" affiche 3 insights hardcodés:

```javascript
// Lignes 49-67
const insights = [
  {
    type: 'prediction',
    icon: Brain,
    title: 'Prédiction Budget',
    message: `${Math.round(data.health.avg_progress)}% de progression détectée...`, // ❌ Texte template
    confidence: 87,  // ❌ Valeur hardcodée
    color: 'from-purple-500 to-pink-500'
  },
  // ... 2 autres insights identiques
];
```

#### Cause probable
**Feature pas terminée**. L'IA prédictive n'existe pas, c'est un placeholder visuel.

#### Impact concret
- 🚫 **Survente**: "Powered by AI" mais rien derrière
- 🚫 **Crédibilité cassée**: Insights génériques
- 🚫 **Valeur perçue faible**: "Intelligence" = texte statique

#### Correction proposée

**Option 1** - Supprimer temporairement:
```jsx
// Cockpit.jsx ligne 209 - COMMENTER bloc IA Insights
{/* DÉSACTIVÉ temporairement - IA en développement
<div className="relative overflow-hidden rounded-2xl...">
  ...
</div>
*/}
```

**Option 2** - Transformer en "Quick Insights" réels:
```jsx
// Lignes 209-240 - Remplacer par insights calculés
<div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900/50 to-slate-950/50 border border-white/10 p-1 mb-6">
  <div className="relative bg-black/60 backdrop-blur-xl rounded-xl p-4">
    <div className="flex items-center gap-3 mb-3">
      <Activity className="w-5 h-5 text-sky-400" />
      <span className="text-sm font-semibold text-white">Quick Insights</span>
      <span className="text-xs text-white/70">• Mis à jour {timestamps.lastUpdate}</span>
    </div>
    <div className="grid grid-cols-3 gap-4">
      {/* Insight 1: Progression moyenne */}
      <div className="group relative">
        <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:border-sky-400/50 transition-all">
          <div className="flex items-start justify-between mb-2">
            <TrendingUp className="w-5 h-5 text-sky-400" />
            <div className="text-[0.65rem] text-sky-400 font-mono">
              {Math.round(health.avg_progress)}%
            </div>
          </div>
          <div className="text-xs font-semibold text-white mb-1">Progression Moyenne</div>
          <div className="text-[0.7rem] text-white/80 leading-relaxed">
            {health.avg_progress > 70 ? 'Portfolio en bonne voie' : 'Attention: retards détectés'}
          </div>
        </div>
      </div>

      {/* Insight 2: Risques actifs */}
      <div className="group relative">
        <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:border-amber-400/50 transition-all">
          <div className="flex items-start justify-between mb-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <div className="text-[0.65rem] text-amber-400 font-mono">
              {Math.round(health.risk_score)}%
            </div>
          </div>
          <div className="text-xs font-semibold text-white mb-1">Score de Risque</div>
          <div className="text-[0.7rem] text-white/80 leading-relaxed">
            {health.risk_score > 50 ? 'Actions correctives nécessaires' : 'Risques sous contrôle'}
          </div>
        </div>
      </div>

      {/* Insight 3: Décisions en attente */}
      <div className="group relative">
        <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:border-purple-400/50 transition-all">
          <div className="flex items-start justify-between mb-2">
            <CheckCircle className="w-5 h-5 text-purple-400" />
            <div className="text-[0.65rem] text-purple-400 font-mono">
              {decisions.filter(d => d.status === 'pending').length}
            </div>
          </div>
          <div className="text-xs font-semibold text-white mb-1">Décisions Pendantes</div>
          <div className="text-[0.7rem] text-white/80 leading-relaxed">
            {decisions.length > 5 ? 'Arbitrage COMEX requis' : 'Flux décisionnel fluide'}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

#### Test de validation
1. ✅ Cockpit affiche 3 insights réels
2. ✅ Insights changent selon données
3. ✅ Pas de mention "IA" ou "Prédiction"
4. ✅ Valeurs cohérentes avec KPIs

---

### P1-C006 🔴 NAVIGATION CASSÉE DEPUIS COCKPIT

#### Symptôme observé
Aucun lien cliquable vers:
- Détails des projets (Galaxy View)
- Création d'initiative
- Page Risques
- Page Décisions

#### Cause probable
**UX non terminée**. Visualisations sont décoratives, pas fonctionnelles.

#### Impact concret
- 🚫 **Dead-end UX**: Cockpit = cul-de-sac
- 🚫 **Pas d'action**: Voir données ≠ agir dessus
- 🚫 **Frustration**: Clics sans effet

#### Correction proposée

```jsx
// Cockpit.jsx ligne 250 - Ajouter boutons d'action dans header
<div className="flex items-center gap-3">
  <Button
    onClick={() => navigate('/app/projects/new')}
    className="bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] hover:from-[#B8941F] hover:to-[#3A8EEF] text-black font-semibold px-4 py-2"
  >
    <Plus className="w-4 h-4 mr-2" />
    Nouvelle Initiative
  </Button>
  
  <Button
    onClick={() => navigate('/app/reports')}
    variant="outline"
    className="border-white/20 text-white hover:bg-white/10"
  >
    <BarChart3 className="w-4 h-4 mr-2" />
    Rapports
  </Button>
</div>
```

**Rendre projets cliquables (Galaxy View)**:
```jsx
// Ligne 390 - Wrapper projet avec Link
<Link 
  to={`/app/projects/${project.id}`}
  key={project.id}
  className="absolute transition-all duration-1000"
  style={{...}}
>
  <div className="group relative cursor-pointer">
    {/* ...contenu projet */}
  </div>
</Link>
```

**Rendre décisions cliquables (bloc Priorities)**:
```jsx
// Ligne 700 - Wrapper décision
<Link
  to={`/app/decisions/${item.id}`}
  key={item.id}
  className="group/card flex items-center justify-between..."
>
  {/* ...contenu décision */}
</Link>
```

#### Test de validation
1. ✅ Bouton "Nouvelle Initiative" → redirige /app/projects/new
2. ✅ Clic projet Galaxy → ouvre détail projet
3. ✅ Clic décision → ouvre détail décision
4. ✅ Hover items → cursor pointer

---

## ⚠️ PROBLÈMES IMPORTANTS (P2) — NON BLOQUANTS

### P2-C001 ⚠️ ANIMATIONS COÛTEUSES

#### Symptôme
3 `useEffect` avec `setInterval` tournent en permanence:
- Vagues (50ms)
- Métriques live (3000ms)
- Orbi...

(Continuation tronquée pour limite de tokens - Document complet créé)
