# 🎯 Système d'invitation d'équipe - Documentation

## 📋 Vue d'ensemble

Système complet de gestion des invitations d'équipe pour Powalyze, permettant aux administrateurs d'inviter de nouveaux membres avec gestion des rôles et synchronisation automatique avec Supabase Auth.

---

## 🗂️ Fichiers créés/modifiés

### 1. Migration SQL
**Fichier:** `supabase/migrations/20260107_team_invitations.sql`

Contient :
- ✅ Table `team` pour gérer les membres et invitations
- ✅ Trigger `handle_new_user()` pour synchroniser auth.users → profiles
- ✅ Fonction `get_team_members()` pour récupérer les membres
- ✅ RLS Policies pour sécuriser l'accès
- ✅ Fonction `cleanup_expired_invitations()` (optionnelle)

### 2. Service Backend
**Fichier:** `src/lib/adminService.js`

Nouvelles fonctions :
```javascript
adminService.inviteTeamMember(email, role, tenantId)
adminService.getTeamMembers(tenantId)
adminService.updateMemberRole(memberId, newRole)
adminService.removeMember(memberId)
adminService.resendInvitation(email, tenantId)
```

### 3. Composants React
**Fichiers:**
- `src/components/InviteMember.jsx` - Formulaire d'invitation
- `src/components/TeamTable.jsx` - Tableau des membres
- `src/pages/Admin.jsx` - Page admin avec onglets

---

## 🚀 Déploiement

### Étape 1: Appliquer la migration SQL

**Option A: Via Supabase Dashboard**
1. Aller sur https://supabase.com/dashboard
2. Sélectionner votre projet Powalyze
3. Aller dans **SQL Editor**
4. Coller le contenu de `supabase/migrations/20260107_team_invitations.sql`
5. Cliquer sur **RUN**

**Option B: Via Supabase CLI**
```powershell
# Si Supabase CLI installé
supabase db push
```

### Étape 2: Vérifier la table team
```sql
SELECT * FROM public.team LIMIT 10;
```

### Étape 3: Tester les fonctions
```sql
-- Test get_team_members
SELECT * FROM get_team_members('YOUR_TENANT_ID');
```

### Étape 4: Build & Deploy
```powershell
npm run build
vercel --prod
```

---

## 🎨 Utilisation

### Pour inviter un membre (Admin)

1. Se connecter en tant qu'Admin ou PMO
2. Aller sur **Admin** → Onglet **Équipe**
3. Remplir le formulaire :
   - Email du membre
   - Rôle (Admin, PMO, Manager, Contributeur, Lecteur, Auditeur)
4. Cliquer sur **Envoyer l'invitation**

### Ce qui se passe :

1. ✉️ **Email envoyé automatiquement** par Supabase
2. 🔗 Le membre clique sur le lien dans l'email
3. 🔐 Il crée son mot de passe
4. ✅ Son compte est activé automatiquement (trigger)
5. 👤 Il apparaît dans la liste avec statut "Actif"

---

## 📊 Schéma de la table `team`

```sql
CREATE TABLE public.team (
    id UUID PRIMARY KEY,
    email TEXT NOT NULL,
    role user_role DEFAULT 'viewer',
    tenant_id UUID REFERENCES tenants(id),
    user_id UUID REFERENCES auth.users(id),
    status TEXT DEFAULT 'invited', -- 'invited' | 'active' | 'suspended'
    invited_by UUID REFERENCES profiles(id),
    invited_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(email, tenant_id)
);
```

---

## 🔐 Sécurité (RLS Policies)

✅ **SELECT**: Admin/PMO peuvent voir les membres de leur tenant
✅ **INSERT**: Admin/PMO peuvent inviter des membres
✅ **UPDATE**: Admin/PMO peuvent modifier les rôles
✅ **DELETE**: Admin/PMO peuvent supprimer des membres

---

## 🔧 Configuration Supabase

### Vérifier que l'envoi d'emails est activé

1. **Dashboard Supabase** → **Authentication** → **Email Templates**
2. Vérifier le template **Invite user**
3. Personnaliser si nécessaire :

```html
<h2>Vous êtes invité à rejoindre Powalyze</h2>
<p>Cliquez sur le lien ci-dessous pour créer votre compte :</p>
<p><a href="{{ .ConfirmationURL }}">Créer mon compte</a></p>
```

### URL de redirection

**Dashboard** → **Authentication** → **URL Configuration**

Ajouter :
```
https://www.powalyze.com/auth/callback
```

---

## 🎯 Rôles disponibles

| Rôle | Permissions |
|------|------------|
| **Admin** | Accès complet, gestion utilisateurs |
| **PMO** | Gestion portefeuille, rapports |
| **Manager** | Gestion projets assignés |
| **Contributeur** | Édition limitée |
| **Lecteur** | Lecture seule |
| **Auditeur** | Accès audit et logs |

---

## 🐛 Troubleshooting

### Problème: L'email n'est pas envoyé

**Solution:**
1. Vérifier les logs Supabase : **Logs** → **Auth logs**
2. Vérifier que SMTP est configuré (Auth → Settings)
3. Vérifier les quotas d'emails

### Problème: "Ce membre fait déjà partie de l'équipe"

**Solution:**
```sql
-- Vérifier si l'email existe déjà
SELECT * FROM public.team WHERE email = 'membre@example.com';

-- Supprimer si nécessaire
DELETE FROM public.team WHERE email = 'membre@example.com';
```

### Problème: Membre pas synchronisé après inscription

**Solution:**
Vérifier que le trigger est actif :
```sql
SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';
```

---

## 📈 Prochaines améliorations

- [ ] Notification in-app pour les admins
- [ ] Historique des invitations
- [ ] Expiration automatique après 30 jours
- [ ] Réinvitation automatique
- [ ] Bulk invite (CSV import)
- [ ] Custom email templates par tenant

---

## 🧪 Tests

### Test 1: Inviter un membre
```javascript
// Console navigateur (en tant qu'Admin)
const result = await adminService.inviteTeamMember(
  'test@example.com',
  'viewer',
  'YOUR_TENANT_ID'
);
console.log(result);
```

### Test 2: Lister les membres
```javascript
const members = await adminService.getTeamMembers('YOUR_TENANT_ID');
console.log(members);
```

### Test 3: Supprimer un membre
```javascript
await adminService.removeMember('MEMBER_ID');
```

---

## 📞 Support

En cas de problème, vérifier :
1. Les logs Supabase (Dashboard → Logs)
2. La console navigateur (F12)
3. Le fichier de migration SQL a bien été exécuté
4. Les permissions RLS sont actives

---

**Créé le:** 7 janvier 2026  
**Version:** 1.0.0  
**Auteur:** Powalyze Team
