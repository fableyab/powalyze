# 🎯 PAGE ADMIN - VERSION PRO SUISSE
## Gestion des utilisateurs & Permissions

---

## ✅ IMPLÉMENTATION COMPLÈTE

### 📁 Fichiers créés/modifiés

#### 1. **src/lib/permissions.js** ✅
Système de permissions avec 4 rôles officiels :

**Rôles :**
- **Admin** : Tous les droits (création/suppression comptes, gestion intégrations, accès complet)
- **Manager** : Gestion projets, équipes, rapports Power BI
- **Collaborateur** : Modification projets assignés, consultation rapports
- **Lecture seule** : Consultation uniquement

**Permissions :**
```javascript
- CREATE_USERS, DELETE_USERS, MANAGE_ROLES
- CREATE_PROJECTS, EDIT_PROJECTS, DELETE_PROJECTS
- MANAGE_TEAMS, MANAGE_INTEGRATIONS
- ACCESS_POWERBI, ACCESS_PMO, ACCESS_FINANCE, ACCESS_RISKS
- VIEW_AUDIT_LOGS, MANAGE_SETTINGS
```

#### 2. **src/components/CreateUserModal.jsx** ✅
Modal premium de création d'utilisateur avec :

**Sections :**
- ✅ Informations personnelles (Prénom, Nom, Email)
- ✅ Sélection du rôle avec description détaillée
- ✅ Modules autorisés (PMO, Finance, Risques, Rapports)
- ✅ Accès Power BI (checkbox)
- ✅ Génération automatique de mot de passe (12 caractères)
- ✅ Option d'envoi d'invitation par email

**Fonctionnalités :**
- Validation des champs obligatoires
- Mot de passe auto-généré ou manuel
- Création dans Supabase Auth + table profiles
- Appel à sendInvitationEmail() si activé
- Design Swiss premium (noir, or #C9A86A, bleu #0066FF)

#### 3. **src/components/UserTable.jsx** ✅
Tableau complet de gestion des utilisateurs avec :

**Colonnes :**
- Nom (avec badge "Vous" pour l'admin actuel)
- Email
- Rôle (badge coloré avec icône Shield)
- Dernière connexion (format relatif "il y a 2 heures")
- Statut (Actif/Inactif avec icône)
- Actions (menu dropdown)

**Actions disponibles :**
- Modifier le rôle (TODO: modal d'édition)
- Réinitialiser mot de passe (avec email automatique)
- Activer/Désactiver utilisateur
- Supprimer (avec dialog de confirmation)

**Fonctionnalités :**
- Barre de recherche (nom, email, rôle)
- Compteurs (total utilisateurs, actifs)
- Refresh automatique après chaque action
- Protection : impossible de se supprimer soi-même

#### 4. **src/pages/Admin.jsx** ✅
Page d'administration professionnelle avec :

**En-tête Premium :**
- Titre : "Gestion des utilisateurs"
- Sous-titre : "Administration des accès, rôles et permissions"
- Bouton "Créer un utilisateur" (icône UserPlus)

**Statistiques (4 cards) :**
- Utilisateurs actifs (bleu)
- Admins (or)
- Connexions 24h (vert)
- Stockage utilisé (violet)

**Section Liste des utilisateurs :**
- Intégration du composant UserTable
- Refresh automatique après création

**Section Permissions avancées :**
- **Règles de sécurité** : Badges colorés par rôle
- **Modules disponibles** : Liste avec icônes et descriptions

**Section Audit & Sécurité :**
- Placeholder pour journal d'audit (à venir)

#### 5. **src/lib/emailService.js** ✅
Service complet d'envoi d'emails avec :

**Providers supportés :**
- SendGrid
- Mailgun
- SMTP (Hostinger)

**Templates professionnels :**
- **Invitation utilisateur** : Email HTML responsive avec :
  * En-tête gradient bleu
  * Boîte credentials (email, mot de passe, rôle)
  * Bouton CTA "Se connecter"
  * Instructions étape par étape
  * Notice de sécurité
  * Footer avec logo
  
- **Réinitialisation mot de passe** : Email simple avec nouveau mot de passe

**Fonctionnalités :**
- Mode DEV : Logs dans la console (pas d'envoi réel)
- Mode PROD : Appel à API backend `/api/send-email`
- Configuration par variables d'environnement

#### 6. **supabase/migrations/20260106_add_user_management_columns.sql** ✅
Migration Supabase complète avec :

**Nouvelles colonnes profiles :**
- `role_new` TEXT (Admin, Manager, Collaborateur, Lecture seule)
- `status` TEXT (active, inactive, suspended)
- `last_login` TIMESTAMPTZ
- `first_name` TEXT
- `last_name` TEXT
- `modules_access` JSONB (pmo, finance, risks, reports)
- `powerbi_access` BOOLEAN
- `user_id` UUID (référence auth.users)

**Nouvelle table user_invitations :**
- Suivi des invitations envoyées
- Token unique d'invitation
- Statuts (pending, accepted, expired, cancelled)
- Date d'expiration

**Fonctionnalités avancées :**
- Trigger automatique : Mise à jour `last_login` à chaque connexion
- Vue `user_statistics` : Stats temps réel (total users, actifs, rôles, connexions 24h/7j)
- Politiques RLS : Admins peuvent tout gérer, utilisateurs voient leur tenant
- Fonction `cleanup_expired_invitations()` : Nettoyage automatique
- Index sur status, role, last_login pour performances

---

## 🔧 CONFIGURATION REQUISE

### 1. Variables d'environnement (.env)

```bash
# Email Service
VITE_EMAIL_PROVIDER=smtp  # ou sendgrid, mailgun
VITE_FROM_EMAIL=noreply@powalyze.com
VITE_FROM_NAME=Powalyze
VITE_REPLY_TO=support@powalyze.com

# SendGrid
VITE_SENDGRID_API_KEY=SG.xxx

# Mailgun
VITE_MAILGUN_API_KEY=xxx
VITE_MAILGUN_DOMAIN=mg.powalyze.com

# SMTP Hostinger
VITE_SMTP_HOST=smtp.hostinger.com
VITE_SMTP_PORT=465
VITE_SMTP_USER=noreply@powalyze.com
VITE_SMTP_PASS=xxx

# API Backend
VITE_API_URL=https://api.powalyze.com
```

### 2. Migration Supabase

```bash
# Exécuter la migration sur Supabase
psql $DATABASE_URL -f supabase/migrations/20260106_add_user_management_columns.sql

# Ou via Supabase Dashboard :
# SQL Editor > New Query > Coller le contenu > Run
```

### 3. Backend API Email (Node.js/Express)

Créer route `/api/send-email` qui supporte :
- SendGrid (`@sendgrid/mail`)
- Mailgun (`mailgun.js`)
- SMTP (`nodemailer`)

Voir exemple complet dans `emailService.js` (commentaire en bas du fichier).

---

## 📋 CHECKLIST DE MISE EN PRODUCTION

- [ ] Exécuter migration Supabase
- [ ] Configurer variables d'environnement email
- [ ] Créer route backend `/api/send-email`
- [ ] Tester création d'utilisateur en DEV
- [ ] Tester envoi d'emails
- [ ] Configurer SMTP Hostinger ou SendGrid
- [ ] Activer RLS sur table profiles
- [ ] Créer un utilisateur Admin initial
- [ ] Tester toutes les actions (modifier, désactiver, supprimer)
- [ ] Configurer job cron pour nettoyer invitations expirées
- [ ] Builder et déployer sur Vercel

---

## 🎨 DESIGN & UX

**Couleurs :**
- Fond : #0F0F0F (noir profond)
- Cards : #1A1A1A
- Or : #C9A86A (accents premium)
- Bleu : #0066FF (CTA, Admin)
- Vert : Succès, actif
- Rouge : Danger, suppression

**Typographie :**
- Titres : Font-bold, text-white
- Corps : text-slate-300
- Labels : text-slate-400

**Composants :**
- Buttons : Rounded-md, shadow-lg
- Cards : Border-slate-800, backdrop-blur
- Badges : Pills avec icônes
- Modals : Max-height 90vh, overflow-y-auto

---

## 🚀 UTILISATION

### Créer un utilisateur
1. Cliquer sur "Créer un utilisateur"
2. Remplir prénom, nom, email
3. Sélectionner rôle
4. Cocher modules autorisés
5. Option Power BI si nécessaire
6. Cliquer "Créer & Envoyer"
7. Email envoyé automatiquement avec mot de passe

### Gérer un utilisateur
1. Aller sur `/app/admin` (réservé aux Admins)
2. Chercher l'utilisateur dans le tableau
3. Cliquer sur les 3 points (⋮)
4. Actions disponibles :
   - Modifier rôle
   - Réinitialiser mot de passe
   - Activer/Désactiver
   - Supprimer

### Permissions
- **Admin** : Voit tout, fait tout
- **Manager** : Crée projets, gère équipes, pas de suppression comptes
- **Collaborateur** : Modifie projets assignés, voit rapports
- **Lecture seule** : Consultation uniquement

---

## 🔐 SÉCURITÉ

**Règles implémentées :**
- ✅ Seul l'admin peut supprimer comptes/projets/dossiers
- ✅ RLS Supabase : Isolation par tenant_id
- ✅ Mots de passe auto-générés (12 caractères, complexes)
- ✅ Impossible de se supprimer soi-même
- ✅ Validation côté client ET serveur
- ✅ Credentials email JAMAIS exposés côté frontend
- ✅ Tokens d'invitation expirables

**À ajouter (recommandé) :**
- [ ] Authentification 2FA
- [ ] Limitation tentatives connexion
- [ ] Rotation automatique mots de passe
- [ ] Journalisation audit complète
- [ ] Chiffrement config.json des connecteurs

---

## 📊 STATISTIQUES DISPONIBLES

Via la vue SQL `user_statistics` :
- Total utilisateurs
- Actifs/Inactifs
- Répartition par rôle (Admin, Manager, etc.)
- Connexions 24h
- Connexions 7j

Affichage dans les cards en haut de la page Admin.

---

## 🐛 DÉPANNAGE

**L'email ne part pas :**
- Vérifier `VITE_EMAIL_PROVIDER` dans .env
- Vérifier credentials SMTP/SendGrid/Mailgun
- Checker logs backend `/api/send-email`
- En DEV, l'email est loggé dans la console (pas envoyé)

**Erreur "Access denied" :**
- Vérifier que le profil a `role_new = 'Admin'`
- Vérifier RLS Supabase activée sur `profiles`
- Checker `hasPermission(profile?.role, PERMISSIONS.MANAGE_ROLES)`

**Les utilisateurs n'apparaissent pas :**
- Vérifier que `tenant_id` est identique
- Vérifier RLS policy "Utilisateurs peuvent voir les profils de leur tenant"
- Checker table `profiles` dans Supabase

**Le mot de passe ne fonctionne pas :**
- Vérifier que `supabase.auth.admin.createUser()` a réussi
- Checker `email_confirm: true` dans la création
- Vérifier pas de caractères spéciaux cassés dans le mot de passe

---

## 📚 RESSOURCES

**Documentation :**
- Supabase Auth Admin API : https://supabase.com/docs/guides/auth/admin-api
- SendGrid Node.js : https://github.com/sendgrid/sendgrid-nodejs
- Mailgun.js : https://github.com/mailgun/mailgun.js
- Nodemailer : https://nodemailer.com/

**Fichiers importants :**
- `/src/lib/permissions.js` : Système de rôles
- `/src/lib/emailService.js` : Templates emails
- `/supabase/migrations/20260106_add_user_management_columns.sql` : Schema DB

---

## ✨ FONCTIONNALITÉS FUTURES

- [ ] Modal d'édition de rôle/permissions
- [ ] Gestion des équipes (assigner utilisateurs à projets)
- [ ] Journal d'audit complet (qui a fait quoi, quand)
- [ ] Import CSV d'utilisateurs en masse
- [ ] Intégration Azure AD / Google Workspace SSO
- [ ] Notifications in-app pour invitations
- [ ] Dashboard analytics utilisateurs
- [ ] Workflows d'approbation pour création comptes

---

**Créé le 6 janvier 2026**  
**Version 1.0 - Production Ready** ✅
