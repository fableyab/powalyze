# 🚀 Guide de Déploiement - Système d'Invitations et Alertes

## ✅ Ce qui a été corrigé

### 1. **Génération des Alertes** (/app/alerts)
- ✅ Ajout de messages d'erreur explicites
- ✅ Affichage du nombre d'alertes générées par catégorie
- ✅ Vérification de l'existence de l'organization_id
- ✅ Alertes utilisateur en cas d'erreur

**Fonctionnalités:**
- Génère des alertes automatiques pour:
  - Risques avec probabilité × impact > 56% (critiques)
  - Risques avec probabilité × impact > 36% (hautes)
  - Décisions avec échéance proche ou dépassée
  - Projets en difficulté ou en retard

### 2. **Système d'Invitations d'Équipe** (/app/team)
- ✅ Création de la table `invitations` avec RLS
- ✅ Service complet `teamService.js` avec toutes les fonctions
- ✅ Page `AcceptInvitation.jsx` pour accepter les invitations
- ✅ Refonte complète de `Team.jsx` avec intégration Supabase
- ✅ Gestion des rôles (Admin, Manager, Analyst, Viewer)
- ✅ Génération de tokens d'invitation sécurisés

**Fonctionnalités:**
- Inviter des membres par email (génère un lien d'invitation)
- Gestion des rôles avec permissions
- Voir les invitations en attente
- Renvoyer ou annuler les invitations
- Acceptation d'invitation avec création de compte ou connexion
- Modifier le rôle d'un membre
- Retirer un membre de l'équipe

---

## 🗄️ ÉTAPE 1: Déployer la Migration Supabase

### A. Se connecter à Supabase
```bash
# Ouvrir: https://supabase.com/dashboard
# Sélectionner votre projet Powalyze
# Aller dans: SQL Editor
```

### B. Exécuter le script de migration

**Fichier:** `c:\powalyze\supabase\migrations\team_invitations.sql`

Copier-coller tout le contenu du fichier dans le SQL Editor et exécuter.

**Ce script crée:**
- ✅ Table `invitations` avec tous les champs nécessaires
- ✅ Index pour optimiser les performances
- ✅ Politiques RLS (Row Level Security)
- ✅ Fonction pour nettoyer les invitations expirées
- ✅ Ajout de colonnes à `user_organizations`:
  - `invited_at` (date d'invitation)
  - `invited_by` (qui a invité)
  - `last_active_at` (dernière activité)

### C. Vérifier la migration

Dans Supabase SQL Editor:
```sql
-- Vérifier que la table existe
SELECT * FROM invitations LIMIT 1;

-- Vérifier les colonnes de user_organizations
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'user_organizations';
```

---

## 📦 ÉTAPE 2: Construire et Déployer le Frontend

### A. Build local
```bash
cd c:\powalyze
npm run build
```

**Vérifier qu'il n'y a pas d'erreurs de compilation.**

### B. Déployer sur Vercel
```bash
npm run deploy
# ou
vercel --prod
```

**Attendre la fin du déploiement (~45-60 secondes)**

---

## 🧪 ÉTAPE 3: Tester les Fonctionnalités

### Test 1: Génération des Alertes

1. **Se connecter** sur https://www.powalyze.com/login
2. **Aller sur** https://www.powalyze.com/app/alerts
3. **Cliquer** sur "Générer les alertes"
4. **Résultats attendus:**
   - Message avec le nombre d'alertes générées
   - Détails: X risques, Y décisions, Z projets
   - Si 0 alertes: Message expliquant pourquoi

**Si aucune alerte n'est générée:**
- Vérifier que vous avez des risques avec `status='open'`
- Vérifier que vous avez des décisions avec `due_date`
- Vérifier que vous avez des projets avec `status IN ('in_progress', 'at_risk')`

**SQL pour créer des données de test:**
```sql
-- Créer un risque critique (probability=0.8, impact=0.9)
INSERT INTO risks (organization_id, title, description, probability, impact, status, initiative_id)
VALUES 
  ('YOUR_ORG_ID', 'Risque de dépassement budgétaire', 'Budget dépassé de 30%', 0.8, 0.9, 'open', 'SOME_INITIATIVE_ID');

-- Créer une décision urgente
INSERT INTO decisions (organization_id, title, description, impact_level, due_date, status)
VALUES 
  ('YOUR_ORG_ID', 'Validation budget Q2', 'Décision urgente', 'high', CURRENT_DATE + INTERVAL '2 days', 'pending');
```

### Test 2: Invitations d'Équipe

#### 2.1 Créer une invitation

1. **Se connecter en tant qu'admin** sur https://www.powalyze.com/login
2. **Aller sur** https://www.powalyze.com/app/team
3. **Cliquer** sur "Inviter un membre"
4. **Remplir:**
   - Email: `nouveau.membre@example.com`
   - Rôle: Analyst
5. **Cliquer** "Créer l'invitation"
6. **Résultat attendu:**
   - Message de confirmation
   - URL d'invitation copiée dans le presse-papier
   - Invitation apparaît dans "Invitations en attente"

#### 2.2 Accepter l'invitation

**Option 1: Nouvel utilisateur**
1. **Ouvrir l'URL** d'invitation dans un navigateur privé
2. **Voir** les détails de l'invitation (organisation, rôle, inviteur)
3. **Remplir le formulaire:**
   - Nom complet
   - Mot de passe (min 6 caractères)
   - Confirmer le mot de passe
4. **Cliquer** "Créer mon compte"
5. **Résultat attendu:**
   - Message "Invitation acceptée !"
   - Redirection vers le dashboard
   - Utilisateur apparaît dans la liste de l'équipe avec le bon rôle

**Option 2: Utilisateur existant**
1. **Ouvrir l'URL** d'invitation
2. **Cliquer** "Déjà un compte ? Se connecter"
3. **Entrer le mot de passe**
4. **Se connecter**
5. **Résultat attendu:** Même que Option 1

#### 2.3 Gestion des membres

**Changer le rôle:**
1. **Survoler** un membre dans la liste
2. **Cliquer** sur l'icône "Edit" (crayon)
3. **Entrer** le nouveau rôle (viewer/analyst/manager/admin)
4. **Confirmer**
5. **Résultat:** Rôle mis à jour instantanément

**Retirer un membre:**
1. **Survoler** un membre
2. **Cliquer** sur l'icône "Trash" (poubelle)
3. **Confirmer**
4. **Résultat:** Membre retiré de la liste

**Renvoyer une invitation:**
1. **Voir** "Invitations en attente"
2. **Cliquer** sur l'icône "RefreshCw" (flèche circulaire)
3. **Résultat:** Nouvelle URL générée, expiration prolongée de 7 jours

---

## 🔐 ÉTAPE 4: Configuration Email (Optionnel mais Recommandé)

### Option A: Supabase Auth (Plus simple)

**Dans Supabase Dashboard:**
1. Aller dans **Authentication** → **Email Templates**
2. Créer un template personnalisé pour "Invite user"
3. Variables disponibles:
   - `{{ .ConfirmationURL }}` - URL d'invitation
   - `{{ .SiteURL }}` - https://www.powalyze.com

**Template HTML suggéré:**
```html
<h2>Vous êtes invité(e) sur Powalyze</h2>
<p>Cliquez sur le lien ci-dessous pour accepter l'invitation:</p>
<a href="{{ .ConfirmationURL }}">Accepter l'invitation</a>
```

### Option B: Service externe (Resend, SendGrid, etc.)

**Pour automatiser l'envoi:**
1. Créer un compte sur [Resend.com](https://resend.com) (gratuit jusqu'à 3000 emails/mois)
2. Obtenir une API key
3. Créer une Supabase Edge Function:

```bash
# Dans Supabase CLI
supabase functions new send-invitation-email
```

**Code de la fonction:**
```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const { email, invitationUrl, role, organizationName } = await req.json()
  
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`
    },
    body: JSON.stringify({
      from: 'Powalyze <noreply@powalyze.com>',
      to: email,
      subject: `Invitation à rejoindre ${organizationName}`,
      html: `
        <h1>Vous êtes invité(e)!</h1>
        <p>Cliquez ci-dessous pour accepter:</p>
        <a href="${invitationUrl}">Accepter l'invitation</a>
      `
    })
  })
  
  return new Response(JSON.stringify(await res.json()), {
    headers: { 'Content-Type': 'application/json' }
  })
})
```

**Puis dans `teamService.js`, ligne ~130:**
```javascript
// Appeler la fonction Edge
await customSupabaseClient.functions.invoke('send-invitation-email', {
  body: { 
    email, 
    invitationUrl, 
    role, 
    organizationName: 'Votre Organisation' 
  }
});
```

---

## 🐛 Troubleshooting

### Problème: "Aucune organisation trouvée"
**Cause:** L'utilisateur n'est pas dans la table `user_organizations`

**Solution:**
```sql
-- Vérifier
SELECT * FROM user_organizations WHERE user_id = 'USER_ID';

-- Ajouter si manquant
INSERT INTO user_organizations (user_id, organization_id, role)
VALUES ('USER_ID', 'ORG_ID', 'admin');
```

### Problème: "Invitation introuvable"
**Cause:** Token invalide ou invitation expirée

**Solution:**
```sql
-- Vérifier l'invitation
SELECT * FROM invitations WHERE token = 'TOKEN';

-- Prolonger l'expiration si nécessaire
UPDATE invitations 
SET expires_at = NOW() + INTERVAL '7 days', status = 'pending'
WHERE token = 'TOKEN';
```

### Problème: "Permission denied" lors de la création d'invitation
**Cause:** RLS policies mal configurées

**Solution:**
```sql
-- Vérifier les policies
SELECT * FROM pg_policies WHERE tablename = 'invitations';

-- Re-créer les policies si nécessaire (voir team_invitations.sql)
```

### Problème: Alertes ne se génèrent pas
**Cause:** Pas de données source (risques, décisions, projets)

**Solution:**
```sql
-- Vérifier les données
SELECT COUNT(*) FROM risks WHERE status = 'open';
SELECT COUNT(*) FROM decisions WHERE status = 'pending' AND due_date IS NOT NULL;
SELECT COUNT(*) FROM initiatives WHERE status IN ('in_progress', 'at_risk');

-- Si 0, créer des données de test (voir section Test 1)
```

---

## 📊 Statistiques

**Fichiers créés/modifiés:**
- ✅ `supabase/migrations/team_invitations.sql` (NOUVEAU)
- ✅ `src/lib/teamService.js` (NOUVEAU)
- ✅ `src/pages/auth/AcceptInvitation.jsx` (NOUVEAU)
- ✅ `src/pages/app/AlertsPage.jsx` (MODIFIÉ)
- ✅ `src/pages/app/Team.jsx` (RECRÉÉ COMPLÈTEMENT)
- ✅ `src/App.jsx` (MODIFIÉ - ajout route /accept-invitation)

**Lignes de code:**
- ~1500 lignes ajoutées
- ~200 lignes modifiées

**Fonctionnalités ajoutées:**
- ✅ Système complet d'invitations par email
- ✅ Gestion des rôles et permissions
- ✅ Acceptation d'invitation avec création de compte
- ✅ Génération d'alertes améliorée avec retours d'erreurs
- ✅ Copie automatique des URLs d'invitation

---

## 🎯 Prochaines Étapes (Optionnel)

### Améliorations futures:

1. **Notifications push** pour les nouvelles invitations
2. **Logs d'audit** pour les changements de rôles
3. **Emails automatiques** via Supabase Edge Functions
4. **Invitation en masse** (import CSV)
5. **Expiration automatique** des invitations (cron job)
6. **2FA (Two-Factor Authentication)** pour les admins
7. **Gestion des permissions** par rôle (lecture/écriture granulaire)

---

## ✅ Checklist de Déploiement

- [ ] Migration SQL exécutée dans Supabase
- [ ] Build frontend sans erreurs
- [ ] Déploiement Vercel réussi
- [ ] Test génération d'alertes (OK)
- [ ] Test création d'invitation (OK)
- [ ] Test acceptation d'invitation (OK)
- [ ] Test changement de rôle (OK)
- [ ] Test retrait de membre (OK)
- [ ] Configuration email (optionnel)

---

## 🆘 Support

Si vous rencontrez des problèmes:

1. **Vérifier les logs Supabase:** Dashboard → Logs
2. **Vérifier la console navigateur:** F12 → Console
3. **Vérifier la base de données:** SQL Editor → SELECT * FROM invitations
4. **Tester avec des données de test** (voir section Tests)

---

**Date de création:** ${new Date().toLocaleDateString('fr-FR')}  
**Version:** 1.0.0  
**Auteur:** GitHub Copilot
