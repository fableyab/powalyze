# Guide de Déploiement: Système Demo/Prod

## 🎯 Objectif
Mettre en place un système multi-environnement permettant:
- **Version Demo**: Organisation partagée avec données de démonstration pour tous les utilisateurs
- **Version Prod**: Une organisation de production par client avec leurs données réelles

## 📋 Fichiers Créés

### 1. Migration SQL
**Fichier**: `migrations/add-demo-prod-environments.sql`
- Ajoute la colonne `environment` ('demo'/'prod') à la table `organizations`
- Crée l'organisation de démonstration avec UUID fixe: `00000000-0000-0000-0000-000000000001`
- Seed data: 3 initiatives, 3 décisions, 3 comités, 3 documents

### 2. Service Environnement
**Fichier**: `src/lib/environmentService.js`
- `getDemoOrganization()`: Récupérer l'org demo
- `giveDemoAccess(userId)`: Donner accès demo à un utilisateur
- `getUserOrganizations(userId)`: Lister toutes les orgs d'un utilisateur
- `createClientOrganization(clientName, adminUserId)`: Créer une org prod pour un client

### 3. Composant UI
**Fichier**: `src/components/OrganizationSwitcher.jsx`
- Sélecteur d'organisation dans la navbar
- Permet de basculer entre Demo et Prod
- Affichage conditionnel (si plusieurs orgs uniquement)

### 4. Page Admin
**Fichier**: `src/pages/app/EnvironmentAdmin.jsx`
- Interface de gestion des environnements
- Création de nouvelles organisations
- Activation de l'accès démo
- Statistiques par organisation

### 5. Mise à jour du service existant
**Fichier**: `src/lib/organizationService.js`
- Ajout du paramètre `environment` à `getOrCreateUserOrganization()`
- Gestion des organisations multiples par utilisateur

## 🚀 Étapes de Déploiement

### Étape 1: Exécuter la migration SQL

**Option A: Via PowerShell** (recommandé)
```powershell
.\deploy-demo-prod-migration.ps1
```
Le script copie le SQL dans le presse-papiers. Ensuite:
1. Ouvrez https://supabase.com/dashboard
2. Sélectionnez votre projet
3. Allez dans SQL Editor
4. Collez et exécutez la migration

**Option B: Manuellement**
1. Ouvrez `migrations/add-demo-prod-environments.sql`
2. Copiez tout le contenu
3. Allez dans Supabase SQL Editor
4. Collez et exécutez

**⚠️ Vérification**: Après exécution, vérifiez:
```sql
-- Doit retourner la colonne 'environment'
SELECT * FROM organizations LIMIT 1;

-- Doit retourner l'organisation demo
SELECT * FROM organizations WHERE id = '00000000-0000-0000-0000-000000000001';
```

### Étape 2: Ajouter le composant OrganizationSwitcher

Modifier `src/components/Header.jsx` ou le layout principal pour ajouter le sélecteur:
```javascript
import OrganizationSwitcher from '@/components/OrganizationSwitcher';

// Dans le render, après les autres éléments de navigation:
<OrganizationSwitcher />
```

### Étape 3: Ajouter la route admin des environnements

Modifier `src/App.jsx`:
```javascript
import EnvironmentAdmin from '@/pages/app/EnvironmentAdmin';

// Dans les routes protégées:
<Route 
  path="/admin/environments" 
  element={
    <ProtectedRoute>
      <EnvironmentAdmin />
    </ProtectedRoute>
  } 
/>
```

### Étape 4: Tester localement

```bash
# Terminal 1: Frontend
npm run dev

# Terminal 2: Backend (si Power BI requis)
cd backend
npm run dev
```

**Tests à effectuer**:
1. Créer un nouveau compte → doit créer une org prod automatiquement
2. Activer l'accès démo depuis `/admin/environments`
3. Basculer entre demo et prod avec OrganizationSwitcher
4. Vérifier l'isolation des données (demo vs prod)

### Étape 5: Déployer sur Vercel

```powershell
# Build
npm run build

# Deploy
vercel --prod --yes
```

Ou via GitHub:
```powershell
git add .
git commit -m "feat: add demo/prod multi-tenant system"
git push origin main
```

## 📊 Utilisation du Système

### Pour les Administrateurs

**Créer une organisation client**:
```javascript
import environmentService from '@/lib/environmentService';

// Créer org prod pour nouveau client
const { organization } = await environmentService.createClientOrganization(
  "Nom du Client",
  adminUserId
);
```

**Donner accès démo à un utilisateur**:
```javascript
await environmentService.giveDemoAccess(userId);
```

### Pour les Utilisateurs

1. **Inscription**: Crée automatiquement une organisation prod
2. **Accès démo**: Demander à un admin d'activer l'accès via `/admin/environments`
3. **Basculement**: Utiliser le sélecteur dans la navbar

### Isolation des Données

**RLS Supabase** filtre automatiquement par `organization_id`:
- Chaque requête hérite du contexte utilisateur
- Les politiques RLS vérifient que `organization_id` correspond
- Impossible d'accéder aux données d'une autre organisation

**Contexte actif**: Stocké dans localStorage
```javascript
// Récupérer l'org active
const currentOrgId = localStorage.getItem('currentOrganizationId');
```

## 🔧 Maintenance

### Ajouter des données de démo

```sql
-- Exemples: ajouter plus d'initiatives à l'org demo
INSERT INTO initiatives (name, status, organization_id) VALUES
('Nouvelle Initiative Demo', 'active', '00000000-0000-0000-0000-000000000001');
```

### Réinitialiser l'org demo

```sql
-- Supprimer toutes les données (CASCADE via foreign keys)
DELETE FROM initiatives WHERE organization_id = '00000000-0000-0000-0000-000000000001';
DELETE FROM decisions WHERE organization_id = '00000000-0000-0000-0000-000000000001';
DELETE FROM committees WHERE organization_id = '00000000-0000-0000-0000-000000000001';
DELETE FROM documents WHERE organization_id = '00000000-0000-0000-0000-000000000001';

-- Re-seed avec le script migrations/add-demo-prod-environments.sql
```

### Migrer un client de demo à prod

```sql
-- Créer nouvelle org prod
INSERT INTO organizations (name, environment) VALUES ('Client X', 'prod') RETURNING id;

-- Copier les données (remplacer NEW_ORG_ID)
INSERT INTO initiatives (organization_id, name, status, ...)
SELECT 'NEW_ORG_ID', name, status, ... 
FROM initiatives 
WHERE organization_id = '00000000-0000-0000-0000-000000000001';

-- Lier l'utilisateur à la nouvelle org
INSERT INTO user_organizations (user_id, organization_id, role)
VALUES ('USER_ID', 'NEW_ORG_ID', 'admin');
```

## 🐛 Dépannage

### Problème: L'utilisateur ne voit pas l'org demo
**Solution**: Vérifier l'accès dans `user_organizations`:
```sql
SELECT * FROM user_organizations WHERE user_id = 'USER_ID';
```
Si absent, donner l'accès:
```javascript
await environmentService.giveDemoAccess(userId);
```

### Problème: Les données demo ne s'affichent pas
**Solution**: Vérifier que la migration a bien créé les données:
```sql
SELECT COUNT(*) FROM initiatives WHERE organization_id = '00000000-0000-0000-0000-000000000001';
-- Doit retourner au moins 3
```

### Problème: Erreur RLS lors du changement d'org
**Solution**: Recharger la page après le changement:
```javascript
// Déjà implémenté dans OrganizationSwitcher.jsx
window.location.reload();
```

## 📝 Checklist de Déploiement

- [ ] Migration SQL exécutée sur Supabase
- [ ] Organisation demo créée (UUID: 00000000-0000-0000-0000-000000000001)
- [ ] Données de seed présentes (3 initiatives, 3 décisions, etc.)
- [ ] OrganizationSwitcher ajouté au layout
- [ ] Route `/admin/environments` ajoutée
- [ ] Tests locaux passés (création org, accès demo, basculement)
- [ ] Build réussie (`npm run build`)
- [ ] Déployé sur Vercel
- [ ] Tests en production (signup, demo access, isolation des données)

## 🎉 Résultat Attendu

- ✅ Nouveaux utilisateurs ont automatiquement une org prod
- ✅ Les admins peuvent créer des orgs clients
- ✅ L'org demo est accessible à tous les utilisateurs autorisés
- ✅ Les données sont complètement isolées entre les environnements
- ✅ Interface de basculement intuitive dans la navbar
- ✅ Page admin pour gérer les environnements

