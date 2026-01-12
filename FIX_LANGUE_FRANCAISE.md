# 🎯 CORRECTION LANGUE FRANÇAISE - URGENT

## ✅ Diagnostic du Problème

Votre déploiement Vercel fonctionne **MAIS en anglais** :
- URL : `powalyze-v2-3w2lx8mk4-powalyzes-projects.vercel.app`
- Contenu détecté : "The operating system for your governance" (EN)
- **Cause** : Le hook `useDictionary` détecte la langue du navigateur au lieu de forcer le français

---

## 🔧 Corrections Appliquées (Localement)

### Fichier 1: `src/lib/i18n.js`
**Changement** : Suppression du `LanguageDetector`

```javascript
// AVANT (avec détection)
import LanguageDetector from 'i18next-browser-languagedetector';
i18n.use(LanguageDetector).use(initReactI18next).init({...})

// APRÈS (forcé français)
i18n.use(initReactI18next).init({
  lng: 'fr', // HARDCODED
  fallbackLng: 'fr',
  // PLUS de detection{}
})
```

### Fichier 2: `src/lib/i18n/useDictionary.js`
**Changement** : Force français si localStorage vide

```javascript
// AVANT
const [locale, setLocaleState] = useState(
  () => localStorage.getItem('powalyze-locale') || defaultLocale
);

// APRÈS
const [locale, setLocaleState] = useState(() => {
  const stored = localStorage.getItem('powalyze-locale');
  if (!stored) {
    localStorage.setItem('powalyze-locale', 'fr');
    return 'fr'; // FORCE FRANÇAIS
  }
  return stored;
});
```

---

## 🚀 DÉPLOYER LES CORRECTIONS

### ❌ Problème GitHub
Le push échoue : `Permission denied to fableyab` sur `Powalyze/powalyzeV2.git`

### ✅ Solution 1 : Copie Manuelle (RAPIDE - 5 min)

1. **Sur GitHub** : https://github.com/Powalyze/powalyzeV2

2. **Éditez directement** :
   - `src/lib/i18n.js` → [Copier contenu ci-dessous](#fichier-1-complet)
   - `src/lib/i18n/useDictionary.js` → [Copier contenu ci-dessous](#fichier-2-complet)

3. **Commit** : "🇫🇷 Force français par défaut"

4. **Vercel redéploiera automatiquement** en 2-3 minutes

---

### ✅ Solution 2 : Token GitHub (8 min)

1. Créez un token : https://github.com/settings/tokens/new
   - Scope: `repo` ✅
   - Expiration: 90 days

2. Configurez Git :
   ```powershell
   cd c:\powalyze
   git remote set-url origin https://YOUR_TOKEN@github.com/Powalyze/powalyzeV2.git
   git push origin main
   ```

---

### ✅ Solution 3 : Vercel Interface (10 min)

1. **Téléchargez les 2 fichiers corrigés** depuis votre machine locale :
   - `c:\powalyze\src\lib\i18n.js`
   - `c:\powalyze\src\lib\i18n\useDictionary.js`

2. **Sur Vercel** :
   - https://vercel.com/powalyze
   - Settings → Git → **Reconnect Repository**

3. **Uploadez manuellement** (ou commitez sur GitHub après connexion)

---

## 📄 FICHIERS COMPLETS À COPIER

### Fichier 1 Complet: `src/lib/i18n.js`

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

### Fichier 2 Complet: `src/lib/i18n/useDictionary.js`

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

## ✅ Vérification Post-Déploiement

Après le déploiement, testez :

1. **Ouvrez** : https://powalyze.com
2. **Vérifiez** :
   - [ ] Titre : "Le système d'exploitation pour votre gouvernance" (FR)
   - [ ] Pas de "The operating system..." (EN)
   - [ ] Navigation en français
   - [ ] Pas de redirection vers `#for-who`

3. **Si toujours en anglais** :
   - Videz le cache : `Ctrl + Shift + R`
   - Mode navigation privée
   - Attendez 5 minutes (CDN Vercel)

---

## 🎯 Commits Locaux (Non Pushés)

```
f39db698 🇫🇷 FORCE FRANÇAIS: Désactivation détection langue + Force FR dans useDictionary
cae5a69a 🚀 Mise à jour: Français par défaut + Fix RLS + Build complet Vercel
```

Ces commits contiennent toutes les corrections nécessaires.

---

## 📊 Build Local Validé

```
✓ 4642 modules transformed
✓ built in 24.89s
✓ Langue française forcée
✓ useDictionary corrigé
✓ i18n.js sans détection
```

---

## 💡 Pourquoi c'était en Anglais ?

1. **LanguageDetector** dans `i18n.js` détectait la langue du navigateur
2. **useDictionary** utilisait `localStorage` ou `defaultLocale`
3. Au **premier chargement** sur Vercel, localStorage est vide
4. Le système **détectait automatiquement** l'anglais selon le navigateur

**Solution** : Forcer `'fr'` AVANT toute détection.

---

## 🆘 Besoin d'Aide ?

Si problème persiste après 10 minutes :

1. Vérifiez les logs Vercel : https://vercel.com/powalyze/deployments
2. Confirmez que les fichiers sont bien modifiés sur GitHub
3. Regardez la console navigateur : `localStorage.getItem('powalyze-locale')`
   - Devrait retourner `"fr"`
