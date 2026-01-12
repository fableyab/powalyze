# 🚀 DÉPLOYER LES CORRECTIONS SUR VERCEL

## 📊 Situation Actuelle

### ✅ Ce qui est déployé sur Vercel :
- URL: `powalyze-v2-3w2lx8mk4-powalyzes-projects.vercel.app`
- Version: ANCIENNE (en anglais)

### 📦 Ce qui attend d'être déployé (3 commits) :
```
7e710aa8 ✨ Restructuration complète page création de projet
f39db698 🇫🇷 FORCE FRANÇAIS: Désactivation détection langue
cae5a69a 🚀 Mise à jour: Français par défaut + Fix RLS
```

### 🔒 Problème :
Le push GitHub échoue : `Permission denied to fableyab`

---

## ✅ SOLUTION RAPIDE : Copie Manuelle (10 min)

Puisque le push GitHub est bloqué, copiez manuellement les 2 fichiers critiques :

### 📁 Fichier 1 : `src/lib/i18n.js`

**Action** : Sur GitHub, allez sur ce fichier et remplacez son contenu par :

```javascript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import frCommon from '@/locales/fr/common.json';
import enCommon from '@/locales/en/common.json';
import deCommon from '@/locales/de/common.json';
import noCommon from '@/locales/no/common.json';

const resources = {
  fr: { common: frCommon },
  en: { common: enCommon },
  de: { common: deCommon },
  no: { common: noCommon }
};

// FORCE FRENCH - NO LANGUAGE DETECTION
i18n
  .use(initReactI18next)
  .init({
    resources,
    defaultNS: 'common',
    lng: 'fr', // HARDCODED FRENCH
    fallbackLng: 'fr',
    supportedLngs: ['fr', 'en', 'de', 'no'],
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;
```

---

### 📁 Fichier 2 : `src/lib/i18n/useDictionary.js`

**Action** : Sur GitHub, allez sur ce fichier et remplacez son contenu par :

```javascript
import { useState, useEffect } from 'react';
import { defaultLocale } from './config';
import enDict from './dictionaries/en.json';
import frDict from './dictionaries/fr.json';
import deDict from './dictionaries/de.json';
import noDict from './dictionaries/no.json';

const dictionaries = {
  en: enDict,
  fr: frDict,
  de: deDict,
  no: noDict
};

export function useDictionary() {
  // FORCE FRENCH BY DEFAULT - NO DETECTION
  const [locale, setLocaleState] = useState(() => {
    const stored = localStorage.getItem('powalyze-locale');
    // Si pas de locale stockée, forcer français
    if (!stored) {
      localStorage.setItem('powalyze-locale', 'fr');
      return 'fr';
    }
    return stored;
  });
  
  const [dict, setDict] = useState(() => dictionaries[locale] || dictionaries.fr);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const newDict = dictionaries[locale] || dictionaries.fr;
    setDict(newDict);
  }, [locale]);

  const setLocale = (newLocale) => {
    localStorage.setItem('powalyze-locale', newLocale);
    setLocaleState(newLocale);
  };

  return { dict, locale, setLocale, loading };
}
```

---

## 🔄 Procédure sur GitHub

### ÉTAPE 1 : Ouvrir le repository
```
https://github.com/Powalyze/powalyzeV2
```

### ÉTAPE 2 : Éditer le premier fichier

1. Naviguez vers : **`src/lib/i18n.js`**
2. Cliquez l'icône **✏️ Edit** (en haut à droite)
3. **Sélectionnez tout** (`Ctrl+A`)
4. **Collez** le nouveau code (ci-dessus)
5. En bas : **Commit message** : `fix: Force French as default language`
6. **Commit directly to main**
7. Cliquez **Commit changes**

### ÉTAPE 3 : Éditer le second fichier

1. Naviguez vers : **`src/lib/i18n/useDictionary.js`**
2. Cliquez l'icône **✏️ Edit**
3. **Sélectionnez tout** (`Ctrl+A`)
4. **Collez** le nouveau code (ci-dessus)
5. En bas : **Commit message** : `fix: Force FR in useDictionary hook`
6. **Commit directly to main**
7. Cliquez **Commit changes**

---

## 🎯 Résultat Attendu

### Après 2-3 minutes :

1. **Vercel détecte les commits** automatiquement
2. **Nouveau build** démarre
3. **Déploiement automatique** vers production
4. **Site en français** : https://powalyze.com

### Vérification :

Ouvrez : https://powalyze.com

Vous devez voir :
- ✅ **"Le système d'exploitation pour votre gouvernance"** (FR)
- ❌ PAS "The operating system..." (EN)

---

## 📝 Note sur ProjectNew.jsx

La restructuration complète de la page `/app/projects/new` est aussi dans le commit local.

**Si vous voulez la déployer aussi** :

1. Sur GitHub, naviguez vers **`src/pages/app/ProjectNew.jsx`**
2. Ouvrez le fichier local : `c:\powalyze\src\pages\app\ProjectNew.jsx`
3. Copiez TOUT le contenu
4. Remplacez sur GitHub
5. Commit : `feat: Premium project creation page with 6 sections`

**Mais ce n'est pas urgent** - la langue française est prioritaire.

---

## 🆘 Alternative : Token GitHub

Si vous préférez pusher normalement (recommandé pour la suite) :

### Créer un Personal Access Token

1. **https://github.com/settings/tokens/new**
2. **Note** : "Powalyze Deploy"
3. **Expiration** : 90 days
4. **Scopes** : ✅ `repo` (cocher TOUTE la section)
5. **Generate token**
6. **COPIEZ** le token (vous ne le verrez qu'une fois !)

### Configurer Git avec le token

```powershell
cd c:\powalyze
git remote set-url origin https://YOUR_TOKEN_HERE@github.com/Powalyze/powalyzeV2.git
git push origin main
```

**Remplacez** `YOUR_TOKEN_HERE` par votre token

---

## ✅ Checklist Déploiement

- [ ] Fichier `i18n.js` édité sur GitHub
- [ ] Fichier `useDictionary.js` édité sur GitHub
- [ ] Attendre 3 minutes (build Vercel)
- [ ] Tester https://powalyze.com
- [ ] Vérifier langue = français
- [ ] (Optionnel) Éditer `ProjectNew.jsx` sur GitHub

---

## 🎉 Après Déploiement

Vous aurez :
- ✅ Site en **français par défaut**
- ✅ Nouvelle version React+Vite déployée
- ✅ Pas de redirection `#for-who`

Il restera juste à :
- 🔧 Exécuter le script SQL RLS sur Supabase
- ✨ (Optionnel) Déployer la nouvelle page ProjectNew

---

## ⏱️ Temps Estimé

- **Copie manuelle des 2 fichiers** : 5 minutes
- **Build + déploiement Vercel** : 3 minutes
- **Total** : **8 minutes**

vs

- **Créer token GitHub** : 3 minutes
- **Configurer + push** : 2 minutes
- **Build + déploiement** : 3 minutes
- **Total** : **8 minutes**

**Les deux méthodes prennent le même temps !**

Choisissez celle qui vous convient le mieux. 🚀
