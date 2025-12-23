# 🔄 Guide de Migration Powalyze v2

## 📋 Vue d'ensemble

Cette migration transforme complètement Powalyze en un **SaaS professionnel, cohérent et responsive**.

### ✅ Problèmes Résolus

1. **✅ Projets qui disparaissent** → localStorage avec useLocalStorage hook
2. **✅ Documents qui disparaissent** → localStorage + versioning
3. **✅ Pas de responsive** → Design system complet avec 6 breakpoints
4. **✅ Pas de page Power BI** → Page complète avec intégration iframe
5. **✅ Pas de gestion clients** → Système multi-tenant complet
6. **✅ Architecture désorganisée** → Nouvelle architecture claire

## 🏗️ Nouvelle Architecture

### Structure des Dossiers

```
src/
├── components/
│   ├── layout/              # ✨ NOUVEAU
│   │   ├── Header.jsx       # Header responsive avec menu mobile
│   │   └── Footer.jsx       # Footer responsive
│   └── ui/                  # ✨ NOUVEAU - Composants réutilisables
│       ├── Button.jsx       # Système de boutons (6 variants)
│       ├── Card.jsx         # Cards avec Grid & Stat
│       ├── Modal.jsx        # Modal responsive
│       ├── Input.jsx        # Input, Textarea, Select
│       └── FileUploader.jsx # Upload drag & drop
│
├── contexts/                # ♻️ REFACTORÉ
│   ├── ProjectsContext.jsx  # ✨ Avec localStorage persistence
│   ├── DocumentsContext.jsx # ✨ Avec versioning
│   └── ClientsContext.jsx   # ✨ Multi-tenant system
│
├── hooks/                   # ✨ NOUVEAU
│   ├── useLocalStorage.js   # Persistance cross-tab
│   ├── useResponsive.js     # Détection device
│   └── useFileUpload.js     # Upload avec progression
│
├── pages/
│   ├── client/              # ✨ NOUVEAU - Pages client
│   │   ├── Dashboard.jsx    # Tableau de bord avec KPI
│   │   ├── Projects.jsx     # Liste projets filtrables
│   │   ├── Documents.jsx    # Gestion documents
│   │   └── PowerBI.jsx      # ⭐ Analytics Power BI
│   └── admin/               # ✨ NOUVEAU - Admin Powalyze
│       └── Clients.jsx      # Gestion organisations/users
│
├── utils/                   # ✨ NOUVEAU
│   └── demo-data.js         # Données de démonstration
│
├── App.jsx                  # ♻️ Routes simplifiées
├── main.jsx                 # ♻️ Nouveaux contexts
└── tailwind.config.js       # ♻️ Design system complet
```

## 🎨 Design System

### Breakpoints (Nouveau)

```javascript
// tailwind.config.js
screens: {
  xs: '375px',   // Petits téléphones
  sm: '640px',   // Grands téléphones
  md: '768px',   // Tablettes
  lg: '1024px',  // Laptops
  xl: '1280px',  // Desktops
  2xl: '1536px', // Grands écrans
}
```

### Couleurs (Nouveau)

**Gold Palette:**
```javascript
gold: {
  50: '#FAF8F3',
  100: '#F5F1E7',
  // ...
  primary: '#D4AF37',  // Or principal
  secondary: '#BFA76A', // Or secondaire
  // ...
  900: '#3D3318',
}
```

**Dark Palette:**
```javascript
dark: {
  50: '#F5F5F5',
  // ...
  primary: '#111111',  // Fond principal
  bg: '#0A0A0A',       // Fond sombre
  // ...
  900: '#000000',
}
```

## 🔧 Hooks Personnalisés

### useLocalStorage (Nouveau)

**Persistance automatique avec synchronisation cross-tab:**

```javascript
import { useLocalStorage } from '../hooks/useLocalStorage';

function MyComponent() {
  const [data, setData, removeData] = useLocalStorage('myKey', initialValue);
  
  // Synchronisé automatiquement entre onglets!
  return <div>{data}</div>;
}
```

### useResponsive (Nouveau)

**Détection responsive en temps réel:**

```javascript
import { useResponsive } from '../hooks/useResponsive';

function MyComponent() {
  const { isMobile, isTablet, isDesktop, breakpoints } = useResponsive();
  
  return (
    <div>
      {isMobile && <MobileMenu />}
      {isDesktop && <DesktopNav />}
    </div>
  );
}
```

### useFileUpload (Nouveau)

**Upload de fichiers avec progression:**

```javascript
import { useFileUpload } from '../hooks/useFileUpload';

function UploadComponent() {
  const { files, addFiles, uploadAll, removeFile } = useFileUpload();
  
  return <FileUploader onUploadComplete={handleComplete} />;
}
```

## 📦 Contexts Refactorés

### ProjectsContext

**Avant:**
```javascript
// Pas de persistance
const [projects, setProjects] = useState([]);
```

**Après:**
```javascript
// Avec localStorage automatique
const { projects, createProject, updateProject } = useProjects();

// Les projets persistent automatiquement!
createProject(newProject); // Sauvegardé dans localStorage
```

**Nouvelles fonctionnalités:**
- ✅ Persistence localStorage
- ✅ Filtrage avancé
- ✅ Statistiques
- ✅ Association documents/tâches

### DocumentsContext

**Avant:**
```javascript
// Documents disparaissent après refresh
```

**Après:**
```javascript
const { documents, addDocument, addDocumentVersion } = useDocuments();

// Avec versioning!
addDocumentVersion(docId, newVersion); // Historique complet
```

**Nouvelles fonctionnalités:**
- ✅ Persistence localStorage
- ✅ Versioning (v1, v2, v3...)
- ✅ Catégorisation
- ✅ Tags
- ✅ Filtrage avancé

### ClientsContext (Nouveau)

**Système multi-tenant complet:**

```javascript
const { 
  organizations, 
  users,
  createOrganization,
  createResponsible,
  createPartner 
} = useClients();

// Créer une organisation
const org = await createOrganization({
  name: 'TechCorp',
  email: 'contact@techcorp.com'
});

// Créer un responsable
const responsible = await createResponsible(org.id, {
  firstName: 'Jean',
  lastName: 'Dupont',
  email: 'jean@techcorp.com'
});

// Email automatique envoyé (console.log pour démo, prêt pour API)
```

**Hiérarchie:**
```
powalyze-admin
    └── Organization
            ├── Responsible (1)
            └── Partners (n)
```

## 🚀 Routes Simplifiées

### Avant (Complexe)

```javascript
<Route path="/client/space" />
<Route path="/espace-client" />
<Route path="/espace-admin" />
<Route path="/admin" />
// Confusion sur les noms!
```

### Après (Clair)

```javascript
// Pages publiques
<Route path="/" />
<Route path="/connexion" />

// Espace client (Responsable + Partenaires)
<Route path="/espace-client" />
<Route path="/espace-client/projets" />
<Route path="/espace-client/documents" />
<Route path="/espace-client/power-bi" />  // ⭐ NOUVEAU

// Admin Powalyze
<Route path="/admin/clients" />
<Route path="/admin/clients/:id" />
<Route path="/admin/utilisateurs" />
```

## 📱 Responsive Design

### Header

**Mobile (< 768px):**
- Menu burger
- Logo + bouton menu
- Overlay full-screen

**Desktop (> 768px):**
- Navigation horizontale
- Actions inline
- User info visible

### Cards & Grids

**Avant:**
```javascript
<div className="grid grid-cols-3">
  {/* Cassé sur mobile! */}
</div>
```

**Après:**
```javascript
<Card.Grid cols={{ xs: 1, sm: 2, lg: 3, xl: 4 }}>
  {/* Responsive automatique! */}
</Card.Grid>
```

### Modal

**Mobile:** Plein écran
**Desktop:** Centré avec max-width

## 💾 Migration des Données

### Étape 1: Exporter les anciennes données

```javascript
// Dans la console du navigateur (ancien site)
const oldProjects = JSON.parse(localStorage.getItem('projects'));
console.log(JSON.stringify(oldProjects));
// Copier la sortie
```

### Étape 2: Importer dans le nouveau système

```javascript
// Dans la console (nouveau site)
import { initializeDemoData } from './utils/demo-data';

// Option A: Utiliser les données demo
initializeDemoData();

// Option B: Importer vos données
localStorage.setItem('powalyze_projects', JSON.stringify(yourProjects));
localStorage.setItem('powalyze_documents', JSON.stringify(yourDocuments));
```

## 🔐 Système d'Authentification

### Nouveau flux

1. Admin Powalyze crée une organisation
2. Admin crée un responsable → Email automatique avec credentials
3. Responsable se connecte → Peut créer des partenaires
4. Partenaires reçoivent email automatique

### Mots de passe

**Génération automatique:** 12 caractères sécurisés

```javascript
// Exemple de mot de passe généré
"aB3!xP9#mK2@"
```

## 📈 Intégration Power BI

### Configuration

1. **Publier sur Power BI Service:**
   - Ouvrir Power BI Desktop
   - Fichier → Publier → Publier sur le web

2. **Récupérer le lien:**
   - Power BI Service → Votre rapport
   - Fichier → Intégrer → Publier sur le web
   - Copier le lien iframe

3. **Configurer dans Powalyze:**

```javascript
// src/pages/client/PowerBI.jsx
const reports = [
  {
    id: 'overview',
    name: 'Vue d\'ensemble',
    embedUrl: 'https://app.powerbi.com/view?r=VOTRE_ID_ICI', // ⭐ Remplacer
    // ...
  }
];
```

## 🐛 Points d'Attention

### localStorage vs Backend

**Actuel:** localStorage (démo)

**Production:** Remplacer par API calls

```javascript
// Avant (actuel)
const [projects, setProjects] = useLocalStorage('powalyze_projects', []);

// Après (production)
const { data: projects } = useQuery('/api/projects');
```

### Emails

**Actuel:** console.log (simulation)

**Production:** Intégrer SendGrid/AWS SES

```javascript
// Dans ClientsContext.jsx
const sendWelcomeEmail = async (user, password) => {
  // TODO: Remplacer par vraie API
  const response = await fetch('/api/send-email', {
    method: 'POST',
    body: JSON.stringify({ to: user.email, password })
  });
};
```

## ✅ Checklist de Migration

### Phase 1: Installation
- [ ] `npm install`
- [ ] Vérifier que Tailwind est configuré
- [ ] Lancer `npm run dev`

### Phase 2: Données
- [ ] Les données demo s'affichent
- [ ] Créer un projet → persiste après refresh
- [ ] Upload document → reste dans la liste

### Phase 3: Responsive
- [ ] Tester sur mobile (DevTools)
- [ ] Menu burger fonctionne
- [ ] Grilles s'adaptent

### Phase 4: Power BI
- [ ] Remplacer les IDs de rapports
- [ ] Tester l'intégration iframe
- [ ] Vérifier que les filtres fonctionnent

### Phase 5: Production
- [ ] Build: `npm run build`
- [ ] Test production: `npm run preview`
- [ ] Deploy: `npm run deploy`

## 🆘 Support

**Problèmes courants:**

1. **Tailwind ne fonctionne pas:**
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

2. **Routes 404:**
   - Vérifier `base` dans `vite.config.js`
   - Pour GitHub Pages: `base: '/powalyze/'`
   - Pour domaine: `base: '/'`

3. **Données disparaissent:**
   - Vérifier localStorage dans DevTools
   - Réinitialiser: `resetDemoData()`

## 📞 Contact

- Email: support@powalyze.com
- GitHub: https://github.com/fableyab/powalyze/issues

---

**Migration réalisée le 23 décembre 2024** 🚀
