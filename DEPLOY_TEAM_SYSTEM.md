# 🚀 Déploiement rapide - Système d'invitation

## ⚡ Quick Start (2 minutes)

### 1️⃣ Appliquer la migration SQL

**Aller sur Supabase Dashboard:**
```
https://supabase.com/dashboard/project/xqwcpewngbxnkcytztzk
```

**Étapes:**
1. Cliquer sur **SQL Editor** (menu gauche)
2. Cliquer sur **New query**
3. Copier-coller le fichier : `supabase/migrations/20260107_team_invitations.sql`
4. Cliquer sur **RUN** (Ctrl+Enter)

✅ Vérifier que tout est vert (no errors)

---

### 2️⃣ Tester la migration

Dans le même SQL Editor, exécuter :

```sql
-- Vérifier que la table existe
SELECT * FROM public.team LIMIT 1;

-- Vérifier que le trigger existe
SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';

-- Vérifier que la fonction existe
SELECT * FROM pg_proc WHERE proname = 'get_team_members';
```

✅ Si aucune erreur → migration OK !

---

### 3️⃣ Build & Deploy

```powershell
npm run build
vercel --prod
```

---

### 4️⃣ Test final

1. Se connecter sur https://www.powalyze.com
2. Aller sur **Admin** → Onglet **Équipe**
3. Inviter un membre test
4. Vérifier qu'il apparaît dans le tableau avec statut "En attente"

---

## 🎯 C'est prêt !

Le système d'invitation est maintenant opérationnel.

**Documentation complète:** `docs/TEAM_INVITATION_SYSTEM.md`
