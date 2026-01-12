# 🚀 GUIDE DE CORRECTION IMMÉDIATE
## Fix des 3 problèmes P1 - Démo Ready en 2h

**Date**: 12 janvier 2026  
**Objectif**: Corriger les 3 blockers critiques avant démo client

---

## ⏱️ TIMELINE (2 heures)

- **0h00-0h20**: Fix RLS Supabase (P1-001)
- **0h20-1h00**: Onboarding auto-création org (P1-002)
- **1h00-1h40**: Messages d'erreur propres (P1-003)
- **1h40-2h00**: Tests complets + déploiement

---

## 🔧 FIX 1: RLS ORGANIZATIONS (20 min)

### Étape 1: Exécuter le SQL (5 min)

1. Ouvrir Supabase Dashboard: https://app.supabase.com
2. Sélectionner le projet Powalyze
3. Aller dans **SQL Editor** (menu gauche)
4. Cliquer **New Query**
5. Copier le contenu de `FIX_RLS_ORGANIZATION_CREATION.sql`
6. Coller dans l'éditeur
7. Cliquer **Run** (Ctrl+Enter)
8. ✅ Vérifier: "Success. No rows returned"

### Étape 2: Vérifier les politiques (5 min)

Dans SQL Editor, exécuter:
```sql
SELECT 
  tablename, 
  policyname, 
  cmd
FROM pg_policies
WHERE tablename IN ('organizations', 'user_organizations')
ORDER BY tablename, policyname;
```

✅ Vérifier la présence de:
- `organizations_insert_policy` (cmd = INSERT)
- `user_organizations_insert_policy` (cmd = INSERT)

### Étape 3: Test manuel (10 min)

1. Ouvrir https://www.powalyze.ch en navigation privée
2. Se connecter avec compte existant
3. Aller sur `/app/environment-admin`
4. Remplir formulaire:
   - Nom: "Test Org Fix"
   - Type: Production
5. Cliquer "Créer l'organisation"
6. ✅ Vérifier: Message succès + organisation apparaît dans liste
7. ✅ Vérifier: Aucune erreur console

**Si erreur persiste**: Vérifier que RLS est ENABLED:
```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'organizations';
-- rowsecurity doit être true
```

---

## 🎯 FIX 2: ONBOARDING AUTO-CRÉATION (40 min)

### Étape 1: Modifier SignUp.jsx (20 min)

**Fichier**: `src/pages/SignUp.jsx`

Remplacer la fonction `handleSignUp` (lignes 38-85) par:

```javascript
const handleSignUp = async (e) => {
  e.preventDefault();
  setError('');
  setInfoMessage('');

  if (password !== confirmPassword) {
    setError('Les mots de passe ne correspondent pas');
    return;
  }

  if (password.length < 8) {
    setError('Le mot de passe doit contenir au moins 8 caractères');
    return;
  }

  setLoading(true);
  
  try {
    // 1. Créer le compte utilisateur
    const { data, error: signUpError } = await signUp(email, password, {
      full_name: fullName
    });

    if (signUpError) {
      if (signUpError.message.includes('already registered')) {
        setError('Un compte existe déjà avec cet email');
      } else {
        setError(signUpError.message || 'Une erreur est survenue');
      }
      setLoading(false);
      return;
    }

    // 2. Créer automatiquement une organisation par défaut
    if (data?.user) {
      setInfoMessage('Configuration de votre espace...');
      
      const { createOrganization } = await import('@/lib/organizationServiceSimple');
      const orgName = fullName 
        ? `Organisation ${fullName}` 
        : `Organisation ${email.split('@')[0]}`;
      
      const orgId = await createOrganization(data.user.id, email, orgName);
      
      if (!orgId) {
        console.error('Failed to create organization');
        // Continuer quand même - l'utilisateur pourra créer une org manuellement
      }
    }

    setSuccess(true);
    
    // 3. Redirection selon confirmation email
    if (data?.session) {
      // Auto-confirmé, redirect immédiatement
      setTimeout(() => {
        navigate('/app/cockpit', { replace: true });
      }, 1500);
    } else if (data?.user && !data?.session) {
      // Email envoyé, attendre confirmation
      setTimeout(() => {
        navigate('/login', { 
          state: { message: 'Compte créé ! Veuillez vérifier votre email pour confirmer votre compte.' } 
        });
      }, 2000);
    }
  } catch (err) {
    console.error('Signup error:', err);
    setError('Une erreur est survenue lors de la création du compte');
    setLoading(false);
  }
};
```

### Étape 2: Vérifier import (5 min)

En haut du fichier `SignUp.jsx`, ajouter si manquant:
```javascript
// Pas besoin d'import en haut, on fait un dynamic import dans handleSignUp
// C'est mieux pour le code splitting
```

### Étape 3: Test local (15 min)

```powershell
# Terminal 1
npm run dev

# Ouvrir http://localhost:3000/signup
# Créer un compte test:
# - Email: test+001@example.com
# - Password: TestTest123!
# - Nom: Jean Test

# ✅ Vérifier:
# 1. Message "Configuration de votre espace..."
# 2. Redirection vers /app/cockpit
# 3. Dashboard affiche données (pas écran vide)
# 4. Vérifier dans Supabase Table Editor:
#    - Nouvelle ligne dans 'organizations' (Organisation Jean Test)
#    - Nouvelle ligne dans 'user_organizations' (role = admin)
```

---

## 💬 FIX 3: MESSAGES D'ERREUR PROPRES (40 min)

### Étape 1: Créer errorMessages.js (10 min)

**Nouveau fichier**: `src/lib/errorMessages.js`

```javascript
/**
 * Messages d'erreur centralisés pour l'application
 * User-friendly, sans détails techniques
 */

export const ErrorMessages = {
  // Organisations
  NO_ORGANIZATION: {
    title: "Configuration requise",
    description: "Créez ou rejoignez une organisation pour accéder à cette fonctionnalité.",
    action: "Configurer mon espace",
    actionRoute: "/app/environment-admin"
  },
  
  ORGANIZATION_CREATE_FAILED: {
    title: "Erreur de création",
    description: "Impossible de créer l'organisation. Veuillez réessayer.",
    action: "Réessayer"
  },

  // Authentification
  UNAUTHORIZED: {
    title: "Accès refusé",
    description: "Vous n'avez pas les permissions nécessaires pour cette action.",
    action: "Retour",
    actionRoute: "/app/cockpit"
  },

  SESSION_EXPIRED: {
    title: "Session expirée",
    description: "Veuillez vous reconnecter pour continuer.",
    action: "Se reconnecter",
    actionRoute: "/login"
  },

  // Réseau
  NETWORK_ERROR: {
    title: "Erreur de connexion",
    description: "Vérifiez votre connexion internet et réessayez.",
    action: "Réessayer"
  },

  SERVER_ERROR: {
    title: "Erreur serveur",
    description: "Une erreur temporaire est survenue. Veuillez réessayer dans quelques instants.",
    action: "Réessayer"
  },

  // Données
  DATA_LOAD_FAILED: {
    title: "Chargement impossible",
    description: "Les données n'ont pas pu être chargées. Veuillez réessayer.",
    action: "Réessayer"
  },

  DATA_SAVE_FAILED: {
    title: "Enregistrement impossible",
    description: "Les modifications n'ont pas pu être enregistrées. Veuillez réessayer.",
    action: "Réessayer"
  },

  // Générique
  UNKNOWN_ERROR: {
    title: "Erreur inattendue",
    description: "Une erreur est survenue. Si le problème persiste, contactez le support.",
    action: "Réessayer"
  }
};

/**
 * Mapper une erreur technique vers un message user-friendly
 */
export function getErrorMessage(error) {
  if (!error) return ErrorMessages.UNKNOWN_ERROR;

  const errorString = error.message || error.toString().toLowerCase();

  // Mapping erreurs communes
  if (errorString.includes('organization')) {
    if (errorString.includes('not found') || errorString.includes('aucune organisation')) {
      return ErrorMessages.NO_ORGANIZATION;
    }
    if (errorString.includes('create') || errorString.includes('insert')) {
      return ErrorMessages.ORGANIZATION_CREATE_FAILED;
    }
  }

  if (errorString.includes('unauthorized') || errorString.includes('permission')) {
    return ErrorMessages.UNAUTHORIZED;
  }

  if (errorString.includes('session') || errorString.includes('token')) {
    return ErrorMessages.SESSION_EXPIRED;
  }

  if (errorString.includes('network') || errorString.includes('fetch')) {
    return ErrorMessages.NETWORK_ERROR;
  }

  if (errorString.includes('500') || errorString.includes('server')) {
    return ErrorMessages.SERVER_ERROR;
  }

  return ErrorMessages.UNKNOWN_ERROR;
}

/**
 * Logger l'erreur technique en console (dev uniquement)
 */
export function logError(context, error, additionalData = {}) {
  if (process.env.NODE_ENV === 'development') {
    console.group(`❌ [ERROR] ${context}`);
    console.error('Error:', error);
    console.log('Additional data:', additionalData);
    console.groupEnd();
  }
}
```

### Étape 2: Créer ErrorView component (10 min)

**Nouveau fichier**: `src/components/ErrorView.jsx`

```javascript
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ErrorView({ 
  error, 
  onRetry,
  message = null 
}) {
  const navigate = useNavigate();

  // Si message custom fourni
  const displayMessage = message || {
    title: "Une erreur est survenue",
    description: "Veuillez réessayer ou contacter le support si le problème persiste.",
    action: "Réessayer"
  };

  const handleAction = () => {
    if (onRetry) {
      onRetry();
    } else if (displayMessage.actionRoute) {
      navigate(displayMessage.actionRoute);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center max-w-md px-6">
        <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
        
        <h3 className="text-xl font-semibold text-white mb-2">
          {displayMessage.title}
        </h3>
        
        <p className="text-slate-400 mb-6">
          {displayMessage.description}
        </p>

        {(onRetry || displayMessage.actionRoute) && (
          <Button
            onClick={handleAction}
            className="bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF]"
          >
            {displayMessage.action}
          </Button>
        )}
      </div>
    </div>
  );
}
```

### Étape 3: Modifier AlertsPage.jsx (10 min)

**Fichier**: `src/pages/app/AlertsPage.jsx`

Remplacer la ligne 137 (le `alert()` problématique):

```javascript
// ❌ AVANT (ligne 137)
alert(`❌ Aucune organisation trouvée pour votre compte.\n\nEmail: ${user.email}\nUser ID: ${user.id}\n\n➡️ Solution:\n1. Contactez votre administrateur\n2. Ou exécutez ce script SQL dans Supabase:\n\nINSERT INTO user_organizations (user_id, organization_id, role)\nSELECT '${user.id}', id, 'admin'\nFROM organizations\nLIMIT 1;`);

// ✅ APRÈS
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { ErrorMessages, logError } from '@/lib/errorMessages';
import { useNavigate } from 'react-router-dom';

// Dans le composant:
const { toast } = useToast();
const navigate = useNavigate();

// Remplacer l'alert par:
logError('AlertsPage', new Error('No organization found'), { 
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
      onClick={() => navigate(ErrorMessages.NO_ORGANIZATION.actionRoute)}
    >
      {ErrorMessages.NO_ORGANIZATION.action}
    </Button>
  )
});
```

### Étape 4: Appliquer pattern aux services (10 min)

**Exemple - Modifier un service** (`src/lib/environmentService.js`):

```javascript
// ❌ AVANT
async createOrganization(name, environment = 'prod', userId) {
  try {
    // ...
  } catch (error) {
    console.error('Error creating organization:', error);
    return { organization: null, error };
  }
}

// ✅ APRÈS
import { logError } from './errorMessages';

async createOrganization(name, environment = 'prod', userId) {
  try {
    // ...
  } catch (error) {
    logError('environmentService.createOrganization', error, { name, environment, userId });
    return { organization: null, error };
  }
}
```

---

## 🧪 TESTS COMPLETS (20 min)

### Test 1: Création organisation (5 min)

```
1. Ouvrir navigation privée
2. Aller sur /app/environment-admin (se connecter si nécessaire)
3. Créer organisation "Test QA"
4. ✅ Vérifier: pas d'erreur RLS
5. ✅ Vérifier: toast succès propre
6. ✅ Vérifier: organisation dans liste
```

### Test 2: Signup complet (5 min)

```
1. Navigation privée
2. /signup
3. Créer compte test+002@example.com
4. ✅ Vérifier: message "Configuration..."
5. ✅ Vérifier: redirect /app/cockpit
6. ✅ Vérifier: dashboard avec données
```

### Test 3: Messages d'erreur (5 min)

```
1. Déconnecter internet (mode avion)
2. Essayer de charger /app/projects
3. ✅ Vérifier: ErrorView ou toast propre
4. ✅ Vérifier: pas de "user_id" ou "SQL"
5. ✅ Vérifier: bouton "Réessayer" visible
6. Reconnecter internet + cliquer Réessayer
7. ✅ Vérifier: données chargées
```

### Test 4: Console logs (5 min)

```
1. Ouvrir DevTools console
2. Vérifier mode: console.log(process.env.NODE_ENV)
3. Forcer une erreur (créer org avec nom vide)
4. En DEV: ✅ Voir logs détaillés
5. En PROD: ✅ Pas de logs techniques
```

---

## 🚀 DÉPLOIEMENT (Variable selon méthode)

### Option A: Vercel auto-deploy (Git push)

```powershell
git add .
git commit -m "fix(P1): RLS organizations + onboarding + error messages

- Fix RLS policies pour autoriser création organisations
- Auto-création organisation lors du signup
- Messages d'erreur user-friendly (pas de SQL/IDs)
- ErrorView component + errorMessages.js centralisé"

git push origin main
```

Attendre 2-3 min → Vercel auto-déploie.

### Option B: Build + deploy manuel

```powershell
# Build
npm run build:full

# Vérifier build
ls dist/  # Doit contenir index.html

# Deploy
vercel --prod

# Vider cache
# Aller sur vercel.com → Settings → Clear Build Cache
```

---

## ✅ CHECKLIST FINALE

Avant de dire "DÉMO READY":

- [ ] RLS SQL exécuté sur Supabase
- [ ] Création organisation fonctionne (test manuel)
- [ ] Signup crée organisation automatiquement
- [ ] Messages d'erreur propres (pas de SQL)
- [ ] Logs techniques seulement en console dev
- [ ] Toasts utilisent ErrorMessages
- [ ] Code déployé sur production
- [ ] Cache Vercel vidé
- [ ] Test complet signup → cockpit → navigation

---

## 🆘 TROUBLESHOOTING

### "RLS policy error" persiste après SQL

**Solution**:
```sql
-- Vérifier RLS activé
SELECT tablename, rowsecurity FROM pg_tables 
WHERE tablename = 'organizations';

-- Si rowsecurity = false:
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

-- Re-run FIX_RLS_ORGANIZATION_CREATION.sql
```

### "Organization not created after signup"

**Vérifier**:
1. Console browser: erreurs JS ?
2. Supabase logs: erreurs INSERT ?
3. Test direct:
```javascript
// Dans browser console
const { createOrganization } = await import('/src/lib/organizationServiceSimple.js');
await createOrganization('test-user-id', 'test@example.com', 'Test Org');
```

### "Toast not showing"

**Vérifier**:
1. `<Toaster />` dans App.jsx ou main layout
2. Import correct: `import { useToast } from '@/components/ui/use-toast';`
3. Shadcn toast installé: `npx shadcn-ui@latest add toast`

---

## 📞 CONTACT / SUPPORT

Si blocage > 30 min sur un fix:
1. Documenter erreur exacte (screenshot + console)
2. Vérifier ce guide étape par étape
3. Rollback si nécessaire: `git reset --hard HEAD~1`

**Standard**: Les 3 fixes P1 doivent être réalisables en 2h max par dev senior.

---

**Fin du guide** - Ready to fix! 🚀
