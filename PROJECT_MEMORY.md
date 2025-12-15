# 📚 RÉFÉRENCE PROJET POWALYZE - MÉMOIRE PERSISTANTE

**Dernière mise à jour**: 15 Décembre 2025 à 00:27  
**Session**: Downloads & PDF System Implementation

---

## 🎯 RÉSUMÉ DU PROJET

**Projet**: POWALYZE - Portfolio PMO/Data/IA Consulting  
**Type**: React 18 + Vite (SPA)  
**Emplacement**: `c:\Users\fabri\OneDrive\Bureau\POWALYZE FINAL`  
**Langue Primaire**: Français  
**Langues Supportées**: FR, EN, DE (via LanguageContext)

### Propriétaire
- **Nom**: Fabrice Fays (Fabrice Dubois dans certains contextes)
- **LinkedIn**: https://www.linkedin.com/in/fabrice-fays/
- **Téléphone**: +33(0) 6 15 76 70 67
- **Email**: Contact via Formspree (xeoyznlq)

---

## 🏗️ STACK TECHNIQUE

### Frontend
```json
{
  "core": ["React 18", "Vite", "React Router v7"],
  "styling": ["Tailwind CSS", "shadcn/ui", "Framer Motion"],
  "icons": ["Lucide React"],
  "utilities": ["jsPDF 2.5.2", "html2canvas", "date-fns"]
}
```

### State Management
- **LanguageContext** - Gestion multilingue (FR/EN/DE)
- **AuthContext** - Authentification (4 OAuth: Azure, Google, GitHub, LinkedIn)
- **ClientContext** - Gestion projets/documents client

### Build & Deploy
- **Build**: `npm run build` → Vite
- **Dev**: `npm run dev` → `http://localhost:3002`
- **Build Time**: ~39.41s (dernière)
- **Bundle Size**: 1.42 MB (~411 kB gzipped)
- **Modules**: 4378

---

## 📁 STRUCTURE CLÉS

```
src/
├── components/
│   ├── landing/
│   │   ├── Navbar.jsx (FR/EN/DE, auth menu, language selector)
│   │   ├── HeroSection.jsx
│   │   ├── Services.jsx (6 service cards)
│   │   ├── DemoInteractiveSection.jsx (3 interactive demos)
│   │   ├── CaseStudiesSection.jsx (3 expandable case studies)
│   │   ├── TrustMetricsSection.jsx (50+ Clients, 200+ Projects, etc.)
│   │   ├── DownloadSection.jsx ⭐ [NEW - PDF downloads]
│   │   ├── ValuePropSection.jsx
│   │   ├── PmoTrackingSection.jsx
│   │   ├── FooterSection.jsx
│   │   └── ...
│   ├── Service/
│   │   ├── ServiceLayout.jsx ⭐ [MODIFIED - +DownloadSection]
│   │   ├── ServiceHero.jsx
│   │   ├── ServiceSidebar.jsx (Contact CTA)
│   │   └── InteractiveExamples.jsx
│   ├── Forms/
│   │   └── ConsultationForm.jsx (Formspree integration)
│   └── ...
├── pages/
│   ├── Home.jsx ⭐ [MODIFIED - +DownloadSection]
│   ├── Services/
│   │   ├── ServicesPage.jsx
│   │   ├── PMOStrategiquePage.jsx
│   │   ├── DataPowerBIPage.jsx
│   │   ├── AutomationAI.jsx
│   │   ├── PortfolioPage.jsx
│   │   ├── ExecutiveReporting.jsx
│   │   ├── PilotageIT.jsx
│   │   └── GovernanceRisk.jsx
│   ├── ClientPortal/
│   │   ├── ClientPortalLayout.jsx
│   │   ├── DocumentsPage.jsx ⭐ [NEW - Grid design + PDF generation]
│   │   ├── ProjectsPage.jsx
│   │   ├── ProfilePage.jsx
│   │   └── SettingsPage.jsx
│   ├── About/AboutPage.jsx (Powalyze first, Gunvor, Airbus, Caterpillar)
│   ├── Contact/ContactPage.jsx
│   ├── Blog/BlogPage.jsx (9 articles)
│   ├── FAQ/FAQPage.jsx
│   ├── Auth/ (LoginPage, SignupPage, ForgotPasswordPage)
│   ├── Legal/ (RGPD, Privacy, Terms, etc.)
│   └── Demos/ (8+ demo pages)
├── context/
│   ├── LanguageContext.jsx (FR/EN/DE + localStorage)
│   ├── AuthContext.jsx (Login/Signup/OAuth)
│   └── ClientContext.jsx (Projects/Documents)
├── data/
│   └── clientDocuments.js (8+ sample documents)
├── lib/
│   └── serviceContent.js (Service descriptions)
├── utils/
│   ├── pdfGenerator.js ⭐ [NEW - 3 PDF generators]
│   ├── structuredData.js (SEO schema)
│   ├── seoData.js (Meta tags)
│   └── ...
└── styles/
    ├── index.css (Tailwind)
    └── ...

public/
├── llms.txt (AI assistant context)
└── images/

plugins/
├── vite-plugin-iframe-route-restoration.js
├── vite-plugin-selection-mode.js
├── vite-plugin-edit-mode.js
└── ...
```

---

## 🎨 DESIGN SYSTEM

### Couleurs
```css
--primary: #BFA76A (Gold - accents, CTAs, highlights)
--bg-dark: #0A0A0A (Page background)
--bg-card: #111 / #1A1A1A (Card backgrounds)
--text-light: #FFFFFF (Primary text)
--text-muted: #999 / #666 (Secondary text)
--border: rgba(255, 255, 255, 0.1)
```

### Typo
- **Display Font**: Custom (serif-like for headings)
- **Body Font**: System sans-serif
- **Headings**: Bold, 3xl-5xl sizes
- **Body**: Regular, gray-300/400

### Composants
- **Buttons**: Primary (#BFA76A) / Ghost / Outline
- **Cards**: Dark bg with subtle borders
- **Animations**: Framer Motion (stagger, hover, scroll)
- **Icons**: Lucide React (24-32px)

---

## 🔗 ROUTES & URLS

### Production
```
https://powalyze.ch/
```

### Local Dev
```
http://localhost:3002
```

### Routes Principales
```
/                              Home (9 sections + DownloadSection)
/about                         About Fabrice
/contact                       Contact Form
/blog                          9 Articles Blog
/faq                           FAQ Page

/services                      Services Overview
/services/pmo-strategique      PMO Strategic
/services/data-power-bi        Data & Power BI
/services/automatisation-ia    Automation & AI
/services/pilotage-it          IT Governance
/services/portefeuilles-priorisation  Portfolio
/services/reporting-executif   Executive Reporting
/services/governance-risk      Governance (uses PMO content)

/espace-client                 Client Portal (Protected)
/espace-client/projets         Projects
/espace-client/documents       Documents ⭐ [NEW - Grid + PDFs]
/espace-client/profil          Profile
/espace-client/parametres      Settings

/login                         Login (4 OAuth options)
/signup                        Register
/forgot-password               Password Reset

/pmo-demo                      PMO Demo
/pmo-360-demo                  360 Executive Dashboard
/power-bi-advanced             Power BI Advanced
/portfolio                     Portfolio Showcase
/live-demo                     Live Interactive Demo
/executive-dashboard           Executive Dashboard
/financial-report              Financial Report
/interactive-preview           Interactive Preview

/rgpd                          RGPD Policy
/privacy-policy                Privacy Policy
/cookie-policy                 Cookie Policy
/terms                         Terms of Service
/legal-notice                  Legal Notice
```

---

## 📥 SYSTÈME DE TÉLÉCHARGEMENTS [NEW]

### Composant DownloadSection
**Fichier**: `src/components/landing/DownloadSection.jsx`  
**Utilisation**: 
- Page Home (après ValuePropSection)
- Toutes les pages Services (avant FooterSection)

**Contenu**:
1. **PMO Stratégique PDF** (3.5 MB)
   - Méthodologie, bénéfices, timeline

2. **Data & Power BI PDF** (2.8 MB)
   - Architecture data, dashboards, best practices

3. **Automation & IA PDF** (3.2 MB)
   - RPA, Machine Learning, use cases

**Features**:
- ✓ Multilingue (FR/EN/DE)
- ✓ Animations Framer Motion
- ✓ Responsive design
- ✓ Loading states
- ✓ Toast notifications
- ✓ Hover effects

### PDF Generator
**Fichier**: `src/utils/pdfGenerator.js`  
**Fonctions**:
- `generateStrategicPMOPDF(language)` → jsPDF
- `generateDataPowerBIPDF(language)` → jsPDF
- `generateAutomationAIPDF(language)` → jsPDF
- `downloadPDF(doc, filename)` → Trigger download
- `generateAndDownloadPDF(fn, filename, language)`

**Contenu Localisé**: Chaque PDF a contenu FR/EN/DE

### DocumentsPage
**Fichier**: `src/pages/ClientPortal/DocumentsPage.jsx`  
**Design**: Grid 3 colonnes (mobile responsive)  
**Features**:
- Search par nom/description
- Filter par catégories (Méthodologie, Technologie, Innovation)
- 3 PDFs POWALYZE + documents client
- PDF generation on-demand
- Loading states
- Empty state

---

## 📋 MODIFICATIONS RÉCENTES (Session Downloads)

### Fichiers Créés ✨
```
src/components/landing/DownloadSection.jsx     288 lines
src/utils/pdfGenerator.js                      309 lines
BACKUP_SESSION_DOWNLOADS.md                    Documentation
```

### Fichiers Modifiés ✏️
```
src/pages/Home.jsx
  → +1 import DownloadSection
  → +1 <DownloadSection /> avant PmoTrackingSection

src/pages/ClientPortal/DocumentsPage.jsx
  → Refactorisation complète (table → grid)
  → +LanguageContext, +pdfGenerator imports
  → Category filtering
  → PDF generation

src/components/Service/ServiceLayout.jsx
  → +1 import DownloadSection
  → +1 <DownloadSection /> avant FooterSection
```

### Build Status
```
✓ Compilation réussie: 39.41s
✓ Modules: 4378
✓ Bundle: 1.42 MB (411 kB gzipped)
✓ Sauvegarde créée: BACKUP_2025-12-15_00-27-13 (2.15 MB)
```

---

## 🎯 FONCTIONNALITÉS CLÉS PAR PAGE

### Home.jsx
1. **Navbar** - Navigation + Language Selector (FR/EN/DE) + Auth
2. **HeroSection** - Video background + CTAs
3. **Services** - 6 service cards
4. **DemoInteractiveSection** - 3 interactive demos
5. **CaseStudiesSection** - 3 expandable case studies with metrics
6. **TrustMetricsSection** - 50+ Clients, 200+ Projects, +35% Gains, 12+ Years
7. **ValuePropSection** - Benefits + features
8. **DownloadSection** ⭐ - 3 downloadable PDFs
9. **PmoTrackingSection** - Dashboard features
10. **Final CTA** - "Prêt à transformer votre PMO?"
11. **FooterSection** - Links + contact info

### DocumentsPage
- **Search Bar** - Real-time search
- **Category Filters** - Méthodologie, Technologie, Innovation, All
- **Document Grid** - 3 columns (responsive)
- **Each Card**:
  - Icon + Type badge
  - Title + Description
  - Size + Category
  - Download button (with PDF generation)

### Service Pages (via ServiceLayout)
- **Hero** - Service title + breadcrumbs
- **Intro** - Service description
- **Challenges** - 2-column grid of challenges
- **Methodology** - Numbered steps
- **Use Cases** - Detailed scenarios
- **Benefits** - Checklist style
- **Interactive Examples** - Dynamic component
- **DownloadSection** ⭐ - 3 PDFs
- **Sidebar** - Contact CTA + quick info
- **Footer** - Links

---

## 🔐 AUTHENTIFICATION

### OAuth Providers (4)
1. **Azure** - Microsoft enterprise
2. **Google** - Personal accounts
3. **GitHub** - Developer focus
4. **LinkedIn** - Professional focus

### Flows
- **Login** → OAuth selection → Token stored in localStorage
- **Signup** → Register → Auto-login
- **Forgot Password** → Email reset link (mock)
- **Demo User** → Auto-created on first visit

### Session Management
- localStorage key: `powalyze_auth`
- User object: `{ id, email, name, avatar, provider, createdAt }`

---

## 🌐 MULTILINGUE (FR/EN/DE)

### Context
**File**: `src/context/LanguageContext.jsx`
```javascript
const { language, changeLanguage } = useLanguage();
// language: 'fr' | 'en' | 'de'
// changeLanguage('en') → updates localStorage + document.documentElement.lang
```

### Implémentation
- **localStorage key**: `powalyze_language`
- **Default**: FR
- **Selector**: Navbar dropdown (3 flags)
- **Content**: Service descriptions, PDFs, UI labels

### Support
- ✓ Home page (all sections)
- ✓ Service pages (all content)
- ✓ Blog articles (9 posts)
- ✓ PDFs (3 services)
- ✓ UI labels (buttons, menus, etc.)
- ✓ Structured data (SEO)

---

## 📈 SEO & METADATA

### SEO Data File
**Location**: `src/utils/seoData.js`  
**Updates**: Numéro phone (+33...), company info

### Structured Data
**Location**: `src/utils/structuredData.js`  
**Schema Types**: Organization, LocalBusiness, Service

### Helmet Integration
- Title tags
- Meta descriptions
- OG tags (social sharing)
- Canonical URLs

---

## 💾 SAUVEGARDE RÉCENTE

**Dossier**: `BACKUP_2025-12-15_00-27-13/`  
**Taille**: 2.15 MB (715 files)  
**Contenu**: 
- src/ (code source complet)
- public/ (assets)
- plugins/ (custom Vite plugins)
- Config files (package.json, vite.config.js, etc.)

---

## 🚀 COMMANDES ESSENTIELLES

```bash
# Installation
npm install

# Développement
npm run dev              # → http://localhost:3002

# Build
npm run build            # Production build
npm run preview          # Preview build locally

# Audit
npm audit                # Check vulnerabilities
npm audit fix            # Auto-fix (if possible)
```

---

## 🐛 TROUBLESHOOTING RAPIDE

### PDFs ne se téléchargent pas
1. Vérifier console browser (F12)
2. Chercher erreurs jsPDF
3. Vérifier `src/utils/pdfGenerator.js`

### Multilingue ne change pas
1. Vérifier LanguageContext import
2. Vérifier localStorage `powalyze_language`
3. Refresh page après changement de langue

### Style cassé après build
1. Vérifier Tailwind CSS build
2. Run `npm run build` à nouveau
3. Clear browser cache

### Animations trop lentes
1. Vérifier Framer Motion `transition`
2. Réduire `duration` values
3. Vérifier GPU acceleration (will-change CSS)

---

## 📞 CONTACTS & LIENS IMPORTANTS

- **LinkedIn**: https://www.linkedin.com/in/fabrice-fays/
- **Téléphone**: +33(0) 6 15 76 70 67
- **Email Form**: Formspree (xeoyznlq)
- **Local Dev**: http://localhost:3002
- **Production**: https://powalyze.ch/

---

## ✅ CHECKLIST DE MAINTENANCE

- [ ] Weekly: Check console errors on live site
- [ ] Monthly: Update dependencies (`npm outdated`)
- [ ] Monthly: Monitor PDF downloads (analytics)
- [ ] Quarterly: Security audit (`npm audit`)
- [ ] Quarterly: SEO check (Lighthouse, Core Web Vitals)
- [ ] Yearly: Content refresh (blog, case studies)

---

**Document créé**: 15 Décembre 2025  
**Prochaine revue**: À déterminer  
**Responsable**: Fabrice Fays (POWALYZE)
