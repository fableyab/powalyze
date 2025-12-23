# 🚀 Powalyze - Plateforme SaaS de Gestion de Projets

**Powalyze** est une plateforme SaaS professionnelle et complètement responsive pour la gestion de projets, documents et analytics Power BI.

## ✨ Fonctionnalités Principales

### 🎯 Pour les Clients (Responsables & Partenaires)

- **📊 Dashboard interactif** avec KPI en temps réel
- **📁 Gestion de projets** avec filtres, progression et statuts
- **📄 Gestion de documents** avec upload drag & drop, versioning et catégorisation
- **📈 Power BI Analytics** - Intégration complète de rapports Power BI
- **💾 Persistance des données** - localStorage avec synchronisation cross-tab
- **📱 Design 100% responsive** - Mobile, tablette, desktop

### 🔧 Pour les Administrateurs Powalyze

- **🏢 Gestion des clients** - Créer et gérer les organisations
- **👥 Gestion des utilisateurs** - Responsables et partenaires avec hiérarchie
- **🔐 Système de credentials** - Génération automatique de mots de passe
- **📧 Notifications email** - Envoi automatique des identifiants (simulé, prêt pour API)
- **📊 Statistiques globales** - Vue d'ensemble de tous les clients

## 🏗️ Architecture Technique

### Stack Technologique

- **React 18.2.0** - Framework UI
- **Vite 7.3.0** - Build tool ultra-rapide
- **Tailwind CSS** - Styling avec design system complet
- **React Router** - Navigation
- **UUID** - Génération d'IDs uniques
- **localStorage** - Persistance des données

### Structure du Projet

```
powalyze/
├── src/
│   ├── components/
│   │   ├── layout/          # Header, Footer (responsive)
│   │   └── ui/              # Button, Card, Modal, Input, FileUploader
│   ├── contexts/            # State management
│   │   ├── ProjectsContext.jsx    # Gestion des projets
│   │   ├── DocumentsContext.jsx   # Gestion des documents
│   │   └── ClientsContext.jsx     # Gestion clients/users
│   ├── hooks/               # Custom hooks
│   │   ├── useLocalStorage.js     # Persistance + sync
│   │   ├── useResponsive.js       # Détection device
│   │   └── useFileUpload.js       # Upload avec progression
│   ├── pages/
│   │   ├── client/          # Pages espace client
│   │   │   ├── Dashboard.jsx      # Tableau de bord
│   │   │   ├── Projects.jsx       # Liste projets
│   │   │   ├── Documents.jsx      # Gestion documents
│   │   │   └── PowerBI.jsx        # ⭐ Analytics Power BI
│   │   └── admin/           # Pages administration
│   │       └── Clients.jsx        # Gestion clients
│   ├── utils/
│   │   └── demo-data.js     # Données de démonstration
│   ├── App.jsx              # Routes principales
│   ├── main.jsx             # Point d'entrée
│   └── index.css            # Styles globaux
├── tailwind.config.js       # Configuration Tailwind
└── package.json
```

## 🎨 Design System

### Breakpoints Responsive

```javascript
xs:  375px  // Petits téléphones
sm:  640px  // Grands téléphones
md:  768px  // Tablettes
lg:  1024px // Laptops
xl:  1280px // Desktops
2xl: 1536px // Grands écrans
```

### Palette de Couleurs

**Gold (Primary)**
- gold-primary: `#D4AF37`
- gold-secondary: `#BFA76A`
- gold-50 → gold-900

**Dark (Background)**
- dark-primary: `#111111`
- dark-bg: `#0A0A0A`
- dark-50 → dark-900

## 📦 Installation

### Prérequis

- Node.js 18+ 
- npm ou yarn

### Étapes d'installation

```bash
# 1. Cloner le repo
git clone https://github.com/fableyab/powalyze.git
cd powalyze

# 2. Installer les dépendances
npm install

# 3. Lancer en développement
npm run dev

# 4. Builder pour production
npm run build

# 5. Preview production
npm run preview
```

## 🚀 Déploiement

### GitHub Pages

```bash
npm run build
npm run deploy
```

L'application sera disponible sur: `https://fableyab.github.io/powalyze/`

### Autres plateformes

- **Vercel**: Connecter le repo GitHub
- **Netlify**: Drag & drop du dossier `dist/`
- **AWS S3 + CloudFront**: Upload `dist/` vers S3

## 🔐 Authentification

### Comptes de démonstration

**Responsable:**
- Email: `jean.dupont@techcorp-demo.com`
- Mot de passe: `Demo123!`

**Admin Powalyze:**
- Email: `admin@powalyze.com`
- Mot de passe: `Admin123!`

## 📈 Intégration Power BI

### Configuration

1. Publiez vos rapports sur Power BI Service
2. Obtenez les liens d'intégration (Fichier → Intégrer → Publier sur le web)
3. Éditez `src/pages/client/PowerBI.jsx`
4. Remplacez `YOUR_REPORT_ID` par vos vrais IDs

```javascript
embedUrl: 'https://app.powerbi.com/view?r=VOTRE_VRAI_ID'
```

### Documentation Power BI

- [Power BI Embedded](https://docs.microsoft.com/fr-fr/power-bi/collaborate-share/service-embed-secure)
- [Power BI Service](https://app.powerbi.com)

## 💾 Données de Démonstration

Les données de démo sont automatiquement initialisées au premier chargement:

- **5 projets** (différents statuts et priorités)
- **7 documents** (PDF, Excel, contrats)
- **1 organisation** (TechCorp Solutions)
- **3 utilisateurs** (1 responsable, 2 partenaires)

### Gestion des données

```javascript
import { initializeDemoData, resetDemoData, clearAllData } from './utils/demo-data';

// Réinitialiser les données demo
resetDemoData();

// Vider toutes les données
clearAllData();
```

## 🐛 Résolution de Problèmes

### Problème: Projets/Documents disparaissent

**Solution:** Les données sont sauvegardées dans localStorage. Si vous videz le cache du navigateur, les données seront perdues. Utilisez `resetDemoData()` pour réinitialiser.

### Problème: Page blanche après build

**Solution:** Vérifiez la configuration de base dans `vite.config.js`:

```javascript
export default defineConfig({
  base: '/powalyze/', // Pour GitHub Pages
  // base: '/',         // Pour domaine custom
})
```

### Problème: Import errors

**Solution:** Tous les imports utilisent des chemins relatifs. Vérifiez qu'il n'y a pas d'alias `@/` dans les imports.

## 🔄 Migration depuis l'ancienne version

Si vous aviez l'ancienne architecture, voici les changements majeurs:

### Contexts

- ❌ `ClientContext` → ✅ `ClientsContext` (nouveau système multi-tenant)
- ❌ `ProjectContext` → ✅ `ProjectsContext` (avec localStorage)
- ❌ `TaskContext` → ✅ Intégré dans ProjectsContext

### Routes

- ❌ `/client/space` → ✅ `/espace-client`
- ❌ `/admin` → ✅ `/admin/clients`
- ❌ `/espace-admin` → ✅ `/admin` (nouvelle structure)

### Composants

- Tous les composants UI sont maintenant dans `components/ui/`
- Header responsive avec menu burger mobile
- FileUploader avec drag & drop

## 📱 Support Responsive

### Mobile (< 768px)

- Menu burger dans le header
- Grilles en 1 colonne
- Modal plein écran
- Boutons full-width

### Tablet (768px - 1024px)

- Menu burger ou navigation simplifiée
- Grilles en 2 colonnes
- Espacement optimisé

### Desktop (> 1024px)

- Navigation complète dans le header
- Grilles multi-colonnes
- Sidebar optionnelle
- Modals centrés

## 🤝 Contribuer

### Standards de code

- **ESLint**: Code JavaScript/React
- **Prettier**: Formatage automatique
- **Commits**: Messages descriptifs avec emojis

### Emojis de commit

- ✨ `:sparkles:` - Nouvelle fonctionnalité
- 🐛 `:bug:` - Correction de bug
- 📝 `:memo:` - Documentation
- 🎨 `:art:` - UI/Design
- ♻️ `:recycle:` - Refactoring
- 🔧 `:wrench:` - Configuration

## 📄 Licence

Propriétaire - Powalyze © 2024

## 🆘 Support

- **Email**: support@powalyze.com
- **Documentation**: https://docs.powalyze.com
- **GitHub Issues**: https://github.com/fableyab/powalyze/issues

---

**Développé avec ❤️ par l'équipe Powalyze**
