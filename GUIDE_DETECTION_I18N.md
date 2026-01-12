# 🔍 Script Détection Clés i18n Manquantes

## 🎯 Objectif
Identifier tous les textes hardcodés dans `src/pages/app/` qui devraient être dans `common.json`

---

## 🚀 Utilisation

### PowerShell (Windows)
```powershell
# 1. Chercher tous les textes français hardcodés
Select-String -Path "src/pages/app/*.jsx" -Pattern '"[A-ZÀÉÈ][a-zàéèêëïî]+ [a-zàéèêëïî]+"' -AllMatches | ForEach-Object { $_.Matches.Value } | Sort-Object -Unique

# 2. Chercher tous les useTranslation manquants
Get-ChildItem -Path "src/pages/app" -Filter "*.jsx" -Recurse | Select-String -Pattern "export default function" | Where-Object { $_.Line -notmatch "useTranslation" } | Select-Object Path, LineNumber

# 3. Liste fichiers sans import react-i18next
Get-ChildItem -Path "src/pages/app" -Filter "*.jsx" -Recurse | Where-Object { (Get-Content $_.FullName -Raw) -notmatch "from 'react-i18next'" } | Select-Object Name
```

### Bash (Mac/Linux)
```bash
# 1. Chercher textes français hardcodés
grep -rn '"[A-ZÀÉÈ][a-zàéèêëïî]* [a-zàéèêëïî]*"' src/pages/app/ | cut -d':' -f3 | sort -u

# 2. Fichiers sans useTranslation
grep -L "useTranslation" src/pages/app/*.jsx

# 3. Compter occurrences
grep -c "useTranslation" src/pages/app/*.jsx | grep ":0$"
```

---

## 📊 Résultats Attendus

### Exemple Output PowerShell
```
"Initialisation du cockpit intelligent"
"Analyse des données en cours"
"Aucun projet actif"
"Créer un nouveau projet"
```

### Priorités de Traduction

#### 🔴 P0 - Critique (User-facing direct)
- **Cockpit.jsx**: Messages loading, empty states
- **Dashboard.jsx**: Widgets, métriques
- **Projects.jsx**: Titres colonnes, boutons CTA

#### 🟡 P1 - Important (Fréquent)
- **Portfolio.jsx**: Labels graphiques
- **Reports.jsx**: Titres rapports
- **Settings.jsx**: Labels formulaires

#### 🟢 P2 - Nice-to-have (Rare)
- Messages d'erreur techniques
- Tooltips avancés
- Admin pages

---

## 🛠️ Template Ajout Traductions

### 1. Ajouter clés dans `src/locales/fr/common.json`
```json
{
  "cockpit": {
    "loading": "Initialisation du cockpit intelligent...",
    "analyzing": "Analyse des données en cours",
    "noData": "Aucune donnée disponible",
    "createFirst": "Créer votre premier projet"
  }
}
```

### 2. Dupliquer dans EN/DE/NO
```json
// en/common.json
{
  "cockpit": {
    "loading": "Initializing intelligent cockpit...",
    "analyzing": "Analyzing data in progress",
    "noData": "No data available",
    "createFirst": "Create your first project"
  }
}

// de/common.json
{
  "cockpit": {
    "loading": "Intelligentes Cockpit wird initialisiert...",
    "analyzing": "Datenanalyse läuft",
    "noData": "Keine Daten verfügbar",
    "createFirst": "Erstellen Sie Ihr erstes Projekt"
  }
}

// no/common.json
{
  "cockpit": {
    "loading": "Initialiserer intelligent cockpit...",
    "analyzing": "Analyserer data",
    "noData": "Ingen data tilgjengelig",
    "createFirst": "Opprett ditt første prosjekt"
  }
}
```

### 3. Utiliser dans composant
```jsx
// AVANT
<div className="text-white/80 mt-6 font-light">
  Initialisation du cockpit intelligent...
</div>

// APRÈS
import { useTranslation } from 'react-i18next';

export default function CockpitPage() {
  const { t } = useTranslation('common');
  
  return (
    <div className="text-white/80 mt-6 font-light">
      {t('cockpit.loading')}
    </div>
  );
}
```

---

## 🔥 Script Auto-Extraction (Avancé)

Créer `tools/extract-i18n-keys.js`:

```javascript
#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const PAGES_DIR = 'src/pages/app';
const REGEX = /"([A-ZÀÉÈ][a-zàéèêëïî]+ [a-zàéèêëïî]+[^"]+)"/g;

function extractHardcodedStrings(dir) {
  const results = [];
  const files = fs.readdirSync(dir, { recursive: true });
  
  files.forEach(file => {
    if (!file.endsWith('.jsx')) return;
    
    const filePath = path.join(dir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const matches = content.matchAll(REGEX);
    
    for (const match of matches) {
      results.push({
        file: file,
        text: match[1],
        line: content.substring(0, match.index).split('\n').length
      });
    }
  });
  
  return results;
}

const hardcoded = extractHardcodedStrings(PAGES_DIR);

console.log('🔍 Textes hardcodés trouvés:', hardcoded.length);
console.log('\n📋 Détails:\n');
hardcoded.forEach(({ file, text, line }) => {
  console.log(`${file}:${line} → "${text}"`);
});

// Export JSON
fs.writeFileSync(
  'i18n-todo.json',
  JSON.stringify(hardcoded, null, 2)
);
console.log('\n✅ Résultats exportés dans i18n-todo.json');
```

### Exécution
```bash
node tools/extract-i18n-keys.js
```

---

## 📊 Statistiques Actuelles (12 jan 2026)

### Pages avec useTranslation ✅
- `Header.jsx` ✅
- `LanguageSwitcher.jsx` ✅
- `LandingPage.jsx` ✅ (probablement)

### Pages SANS useTranslation ❌
- `Cockpit.jsx` ❌ (847 lignes)
- `Dashboard.jsx` ❌
- `Projects.jsx` ❌
- `Portfolio.jsx` ❌
- `Reports.jsx` ❌
- `Risks.jsx` ❌
- `Decisions.jsx` ❌

**Total estimé**: ~15-20 pages à migrer

---

## 🎯 Plan d'Action

### Phase 1: Pages Critiques (P0)
1. Cockpit.jsx
2. Dashboard.jsx
3. Projects.jsx

### Phase 2: Pages Fréquentes (P1)
4. Portfolio.jsx
5. Reports.jsx
6. Settings.jsx

### Phase 3: Pages Restantes (P2)
7. Toutes les autres pages app/

---

## ✅ Validation

Après ajout traductions, tester:

```javascript
// DevTools Console
i18n.changeLanguage('en');
// Vérifier que tous les textes changent

i18n.changeLanguage('de');
// Vérifier que tous les textes changent

i18n.changeLanguage('fr');
// Revenir au français
```

---

**Date**: 12 janvier 2026  
**Statut**: 🚧 Script prêt à utiliser  
**Dépendances**: Node.js (pour script auto-extraction)
