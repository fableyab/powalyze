# 🎯 GUIDE : Persistance des données activée

## ✅ Ce qui est maintenant opérationnel

### 1. **Services Supabase créés**

Trois nouveaux services pour gérer la persistance des données :

#### `src/lib/initiativeService.js`
- `createInitiative()` - Créer un nouveau projet
- `getInitiatives()` - Récupérer tous les projets d'une organisation
- `getInitiativeById()` - Détails d'un projet
- `updateInitiative()` - Modifier un projet
- `deleteInitiative()` - Supprimer un projet

#### `src/lib/riskService.js`
- `createRisk()` - Créer un risque lié à un projet
- `getRisks()` - Tous les risques d'un projet
- `getRisksByOrganization()` - Tous les risques de l'organisation
- `getRiskById()` - Détails d'un risque
- `updateRisk()` - Modifier un risque
- `deleteRisk()` - Supprimer un risque
- `createRiskAction()` - Ajouter une action de mitigation

#### `src/lib/decisionService.js`
- `createDecision()` - Créer une décision
- `getDecisions()` - Toutes les décisions de l'organisation
- `getDecisionById()` - Détails d'une décision
- `updateDecision()` - Modifier une décision
- `deleteDecision()` - Supprimer une décision
- `getPriorityDecisions()` - Décisions urgentes (échéance proche)

---

### 2. **Formulaires fonctionnels**

Les 3 formulaires persistent maintenant les données en BDD :

#### `/app/projects/new` (ProjectNew.jsx)
✅ Enregistre dans `initiatives` :
- Nom du projet
- Description + objectif
- Budget (dans description)
- Responsable (dans description)
- Status : `planned` par défaut
- Lié à l'utilisateur actuel (`owner_id`)

#### `/app/risks/new` (RiskNew.jsx)
✅ Enregistre dans `risks` :
- **Sélection du projet** (liste dynamique des projets)
- Titre du risque
- Probabilité (0.25, 0.5, 0.75, 1.0)
- Impact (0.25, 0.5, 0.75, 1.0)
- Plan d'action (description)
- Status : `open` par défaut

#### `/app/decisions/new` (DecisionNew.jsx)
✅ Enregistre dans `decisions` :
- Titre de la décision
- Description + contexte
- Séance/comité (dans description)
- Responsable (dans description)
- Échéance (`due_date`)
- Niveau d'impact : `low`, `medium`, `high`
- Status : `pending` par défaut

---

### 3. **Tables Supabase utilisées**

D'après ton schéma SQL existant (`SUPABASE_SCHEMA_COMPLETE.sql`) :

```sql
-- INITIATIVES (projets)
initiatives {
  id uuid PRIMARY KEY
  organization_id uuid → lien multi-tenant
  name text
  description text
  status text (planned/in_progress/completed/on_hold)
  progress numeric (0-100)
  owner_id uuid → utilisateur responsable
  start_date date
  end_date date
  created_at timestamptz
}

-- RISKS (risques)
risks {
  id uuid PRIMARY KEY
  initiative_id uuid → lien vers projet
  name text
  description text
  probability numeric (0-1)
  impact numeric (0-1)
  status text (open/mitigated/closed)
  created_at timestamptz
}

-- DECISIONS (décisions)
decisions {
  id uuid PRIMARY KEY
  organization_id uuid → lien multi-tenant
  title text
  description text
  impact_level text (low/medium/high)
  due_date date
  status text (pending/approved/rejected)
  created_at timestamptz
}
```

**RLS (Row Level Security)** est activé sur toutes les tables → isolation automatique par organisation.

---

## 🚀 Comment tester

### 1. Créer un projet
1. Va sur `/app/cockpit`
2. Clique "Nouveau projet" (Actions rapides)
3. Remplis le formulaire :
   - Nom : "Programme Cloud Migration"
   - Responsable : "Jean Dupont"
   - Budget : "500 k€"
   - Objectif : "Migrer 20 applications vers Azure"
4. Clique **Enregistrer le projet**
5. ✅ Toast de confirmation : "Projet créé"
6. Redirection vers `/app/projects`

### 2. Créer un risque
1. Va sur `/app/cockpit`
2. Clique "Nouveau risque"
3. Sélectionne le projet créé ci-dessus
4. Remplis :
   - Titre : "Retard migration bases de données"
   - Probabilité : Élevée (75%)
   - Impact : Élevé
   - Plan d'action : "Recruter expert DBA externe"
5. Clique **Enregistrer le risque**
6. ✅ Toast : "Risque créé"

### 3. Créer une décision
1. Va sur `/app/cockpit`
2. Clique "Nouvelle décision"
3. Remplis :
   - Titre : "Valider budget additionnel"
   - Séance : "Comité Portefeuille du 15/01/26"
   - Responsable : "Directeur IT"
   - Échéance : 2026-01-31
   - Niveau d'impact : Élevé
   - Description : "Demande 100k€ supplémentaires pour migration"
5. Clique **Enregistrer la décision**
6. ✅ Toast : "Décision créée"

---

## 🔍 Vérifier les données en BDD

### Option 1 : Interface Supabase
1. Va sur https://supabase.com/dashboard
2. Sélectionne ton projet
3. Menu **Table Editor**
4. Consulte les tables :
   - `initiatives` → tes projets
   - `risks` → tes risques
   - `decisions` → tes décisions

### Option 2 : SQL Query
Dans Supabase SQL Editor :

```sql
-- Tous les projets
SELECT * FROM initiatives ORDER BY created_at DESC;

-- Tous les risques avec leurs projets
SELECT r.*, i.name as project_name 
FROM risks r
JOIN initiatives i ON i.id = r.initiative_id
ORDER BY r.created_at DESC;

-- Toutes les décisions
SELECT * FROM decisions ORDER BY created_at DESC;
```

---

## 📊 Prochaines étapes pour "du jamais vu"

### 1. Pages de listing fonctionnelles
Créer les pages qui affichent les données réelles :

- `/app/projects` → Liste des projets avec `initiativeService.getInitiatives()`
- `/app/risks` → Liste des risques
- `/app/decisions` → Liste des décisions

### 2. Cockpit avec données réelles
Tu as déjà `/app/cockpit-data` qui lit les vraies données !

**À faire** : Remplacer la route par défaut :
```jsx
// Dans App.jsx, ligne 324
<Route path="cockpit" element={<CockpitPageData />} />
// au lieu de <CockpitPage /> (version statique)
```

### 3. Alertes automatiques
Créer une table `alerts` et générer automatiquement :

```sql
CREATE TABLE alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  type text NOT NULL, -- 'risk', 'decision', 'project'
  severity text NOT NULL, -- 'low', 'medium', 'high', 'critical'
  title text NOT NULL,
  description text,
  related_id uuid, -- ID du risque/projet/décision
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now()
);
```

**Générer alertes** :
- Projet > 80% budget → alerte "Dépassement budgétaire"
- Risque probabilité > 0.75 ET impact > 0.75 → alerte "Risque critique"
- Décision due_date < 7 jours → alerte "Décision urgente"

### 4. Timeline unifiée
Une vue chronologique de tout :

```jsx
// Pseudo-code
const timeline = [
  ...projects.map(p => ({ type: 'project', date: p.created_at, ...p })),
  ...risks.map(r => ({ type: 'risk', date: r.created_at, ...r })),
  ...decisions.map(d => ({ type: 'decision', date: d.created_at, ...d })),
].sort((a, b) => new Date(b.date) - new Date(a.date));
```

### 5. Insights automatiques
Utiliser les données pour générer des insights :

```js
const insights = {
  projectsAtRisk: projects.filter(p => p.progress < 50 && new Date(p.end_date) < addDays(new Date(), 30)),
  criticalRisks: risks.filter(r => r.probability * r.impact > 0.5),
  urgentDecisions: decisions.filter(d => d.due_date && differenceInDays(new Date(d.due_date), new Date()) < 7),
};
```

### 6. Guidage scénarisé
Après création d'un risque :

```jsx
toast({
  title: "Risque créé",
  description: "Voulez-vous créer un plan d'action associé ?",
  action: <Button onClick={() => navigate(`/app/risks/${riskId}/actions/new`)}>Créer action</Button>
});
```

---

## 🔐 Sécurité et multi-tenant

### Actuellement implémenté
✅ **Row Level Security (RLS)** activé sur toutes les tables
✅ **Policies** configurées pour isoler par `organization_id`
✅ **user_organizations** table → lien users ↔ orgs

### Flow d'authentification
1. User se connecte → `auth.users` (Supabase Auth)
2. Récupération de l'organisation :
   ```js
   const { data: userOrg } = await supabase
     .from('user_organizations')
     .select('organization_id')
     .eq('user_id', user.id)
     .single();
   ```
3. Toutes les queries filtrent automatiquement par `organization_id`
4. RLS empêche les accès cross-organisation

### Pour aller plus loin
- **Rôles** : admin, member, viewer → permissions différentes
- **Invitations** : système d'invitation d'utilisateurs dans une org
- **Logs d'audit** : tracer toutes les modifications

---

## 🎨 Architecture "jamais vu"

### Vision globale
```
┌─────────────────────────────────────────────────────┐
│           COCKPIT EXÉCUTIF (Temps réel)             │
├─────────────────────────────────────────────────────┤
│  📊 KPIs automatiques    │  🚨 Alertes intelligentes│
│  • 12 projets actifs     │  • 3 risques critiques    │
│  • 87% dans les délais   │  • 2 décisions urgentes   │
│  • 2.4M€ engagés         │  • 1 dépassement budget   │
├──────────────────────────┴──────────────────────────┤
│         📈 TIMELINE UNIFIÉE (Scrollable)            │
│  [Projet créé] [Risque ajouté] [Décision prise]    │
│     ↓              ↓                ↓                │
│  [Alerte]      [Action]        [Suivi]              │
├─────────────────────────────────────────────────────┤
│              🎯 ACTIONS GUIDÉES                     │
│  → "Vous avez 3 risques sans plan d'action"        │
│  → "2 décisions arrivent à échéance cette semaine" │
│  → "Voulez-vous créer un comité de revue ?"        │
└─────────────────────────────────────────────────────┘
```

### Technologies déjà en place
- ✅ Vite + React 18
- ✅ Supabase (PostgreSQL + RLS)
- ✅ React Router
- ✅ Tailwind CSS + brand colors
- ✅ Framer Motion (animations)
- ✅ Toast notifications

### Ce qui manque pour "jamais vu"
- 🔄 Real-time subscriptions (Supabase Realtime)
- 📊 Charts dynamiques (Recharts déjà installé)
- 🤖 Suggestions IA (analyse des patterns)
- 📧 Notifications email (via Supabase Edge Functions)
- 📱 Push notifications mobile (Capacitor)

---

## 💡 Exemple concret : Real-time dashboard

```jsx
// src/pages/app/CockpitRealtime.jsx
import { useEffect, useState } from 'react';
import customSupabaseClient from '@/lib/customSupabaseClient';

export default function CockpitRealtime() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Chargement initial
    loadProjects();

    // Souscription aux changements en temps réel
    const subscription = customSupabaseClient
      .channel('projects-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'initiatives' },
        (payload) => {
          console.log('Change received!', payload);
          loadProjects(); // Recharger les données
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function loadProjects() {
    const { data } = await customSupabaseClient
      .from('initiatives')
      .select('*')
      .order('created_at', { ascending: false });
    setProjects(data || []);
  }

  return (
    <div>
      <h1>Projets en temps réel</h1>
      {projects.map(p => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  );
}
```

---

## 🎓 Ressources

### Documentation Supabase
- [JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Realtime](https://supabase.com/docs/guides/realtime)

### Ton schéma SQL
- Fichier : `SUPABASE_SCHEMA_COMPLETE.sql`
- Contient : Toutes les tables, indexes, RLS policies, views

### Services créés
- `src/lib/initiativeService.js`
- `src/lib/riskService.js`
- `src/lib/decisionService.js`

---

## ✅ Récapitulatif

| Fonctionnalité | Status | Notes |
|----------------|--------|-------|
| **Base de données** | ✅ Activée | Supabase PostgreSQL |
| **Tables** | ✅ Existantes | initiatives, risks, decisions |
| **RLS** | ✅ Configuré | Isolation par organisation |
| **Services** | ✅ Créés | 3 services JS avec toutes les méthodes |
| **Formulaires** | ✅ Fonctionnels | ProjectNew, RiskNew, DecisionNew |
| **Persistance** | ✅ Active | Les données sont enregistrées en BDD |
| **Pages listing** | ⏳ À créer | Afficher les projets/risques/décisions |
| **Cockpit dynamique** | ⏳ Optionnel | Route /app/cockpit-data existe |
| **Alertes auto** | ⏳ À implémenter | Table + logique de génération |
| **Real-time** | ⏳ À activer | Supabase Realtime disponible |

---

**🎉 TU AS MAINTENANT UNE BASE SOLIDE POUR "DU JAMAIS VU" !**

Tout ce que tu crées est persisté, multi-tenant, sécurisé par RLS. 
La prochaine étape est d'exploiter ces données pour créer des insights, 
alertes intelligentes, et guidages automatiques. 🚀
