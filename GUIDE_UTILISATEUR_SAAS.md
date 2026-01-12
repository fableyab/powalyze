# Guide d'Utilisation Powalyze SaaS

## Vue d'ensemble

Powalyze est une plateforme SaaS de gestion de portefeuille stratégique et de gouvernance exécutive, conçue selon les standards Swiss Luxury.

## Architecture de la Plateforme

### Frontend
- **Framework**: React 18 + Vite 4.5.5
- **Design System**: Swiss Luxury Patek Philippe Edition
- **Layout**: CockpitLayout unifié pour toutes les pages applicatives
- **Styling**: TailwindCSS + animations Framer Motion
- **Mobile**: Capacitor 8.x pour iOS/Android

### Backend
- **API**: Express.js (port 3001)
- **Base de données**: Supabase PostgreSQL avec RLS
- **Power BI**: Intégration via Azure AD OAuth
- **Authentification**: Supabase Auth avec RLS multi-tenant

### Couleurs de la Marque
- **Gold**: `#D4AF37` - Couleur primaire pour CTAs, accents
- **Blue**: `#4A9EFF` - Secondaire pour gradients
- **Black**: `#000000` - Arrière-plans principaux
- **Gradient**: `from-[#D4AF37] to-[#4A9EFF]` pour boutons/icônes

## Fonctionnalités Principales

### 1. Executive Cockpit (`/app/cockpit`)
Centre de commande stratégique pour la gouvernance du portefeuille.

**Métriques Clés:**
- Initiatives Actives: 24 projets en cours
- Investissement Total: €12.4M
- Risques Critiques: 3 identifiés
- Livraison à Temps: 87%

**Sections:**
- Actions rapides (Nouvelle initiative, Log risque, Créer décision, Upload document)
- Priorités stratégiques avec barres de progression
- Activités récentes avec statuts
- Navigation vers Portfolio, Risques, Décisions

### 2. Portfolio Management (`/app/portfolio`)
Gestion complète des initiatives stratégiques.

**Fonctionnalités:**
- Vue d'ensemble du portefeuille
- Métriques par initiative
- Barres de progression animées
- Statuts: On Track, At Risk, Critical
- Budget tracking et ROI

### 3. Gestion des Risques (`/app/alerts`, `/app/risks`)
Centre d'intelligence des risques pour la prise de décision exécutive.

**Capacités:**
- Tensions critiques identifiées
- Risques émergents
- Dérives détectées
- Impact total calculé
- Plans d'atténuation

### 4. Gestion des Décisions (`/app/decisions`)
Journal de gouvernance et traçabilité des décisions.

**Informations:**
- Historique complet des décisions
- Contexte et justifications
- Suivi d'implémentation
- Comités associés

### 5. Team Management (`/app/team`, `/app/settings`)
Gestion collaborative de l'équipe et des accès.

**Rôles:**
- **Admin** (Crown/Gold): Accès complet système
- **Manager** (Star/Blue): Gestion complète projets
- **Analyst** (CheckCircle/Green): Édition projets
- **Viewer** (Shield/Grey): Lecture seule

**Fonctionnalités:**
- Invitation de membres par email
- Gestion des permissions
- Statuts: Active, Pending
- Actions: Edit, Delete membres

### 6. Documents (`/app/documents`)
Bibliothèque centralisée de documents.

**Types:**
- Reports (Rapports exécutifs)
- Financial (Analyses financières)
- Governance (Documentation gouvernance)
- Strategy (Feuilles de route)

**Actions:**
- Upload/Download
- View en ligne
- Suppression avec confirmation
- Recherche et filtres

### 7. Notifications (`/app/notifications`)
Centre de notifications avec types variés.

**Types:**
- Alert (rose): Alertes critiques
- Info (blue): Informations
- Success (green): Confirmations
- Default (gold): Notifications générales

**Actions:**
- Mark All Read
- Delete All (avec confirmation)
- Actions individuelles

### 8. Settings (`/app/settings`)
Configuration complète de la plateforme.

**Sections:**
- **Profile**: Nom, Email, Timezone
- **Language**: en, fr, de, no
- **Notifications**: Email, Push, Alertes, Rapports
- **Security**: 2FA toggle
- **Team Collaborators**: Gestion équipe avec invitation
- **Danger Zone**: Suppression compte

## Composants Réutilisables

### CockpitLayout
Layout unifié pour toutes les pages `/app/*`:
```jsx
<CockpitLayout>
  {/* Contenu de la page */}
</CockpitLayout>
```

### Swiss Luxury Card
Pattern standard pour les cartes:
```jsx
<div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-[2px] p-6 hover:border-white/10 transition-all duration-500">
  {/* Contenu */}
</div>
```

### Typography Swiss
- Headers: `font-extralight tracking-tight`
- Subheaders: `text-xs text-white/40 tracking-[0.1em] uppercase`
- Body: `font-light text-white/60`

## Flux d'Authentification

1. **Login** (`/login`): Authentification Supabase
2. **RLS Context**: Filtrage automatique par `organization_id`
3. **Protected Routes**: `<ProtectedRoute>` wrapper dans App.jsx
4. **Redirect**: Après auth → `/app/cockpit` (dashboard)

## Données Mock pour Demo

Toutes les pages utilisent des données mock pour démonstration immédiate:
- 24 projets actifs
- 4 membres d'équipe
- 5 documents
- 4 notifications
- 4 priorités stratégiques

## Commandes de Développement

```bash
# Frontend dev (port 3000)
npm run dev

# Backend Power BI (port 3001, terminal séparé)
cd backend && npm run dev

# Build production
npm run build

# Deploy Vercel
vercel --prod

# Mobile sync
npx cap sync
npx cap open ios/android
```

## URLs de Production

- **Site principal**: https://www.powalyze.com
- **Cockpit**: https://www.powalyze.com/app/cockpit
- **Portfolio**: https://www.powalyze.com/app/portfolio
- **Settings**: https://www.powalyze.com/app/settings
- **Risks**: https://www.powalyze.com/app/alerts
- **Team**: https://www.powalyze.com/app/team
- **Documents**: https://www.powalyze.com/app/documents
- **Notifications**: https://www.powalyze.com/app/notifications

## Support et Contact

- **HQ Geneva**: Rue du Rhône, 1204 Geneva, Switzerland
- **Email Contact**: contact@powalyze.com
- **Email Sales**: sales@powalyze.com
- **Phone CH**: +41 22 xxx xx xx
- **Phone FR**: +33 1 xx xx xx xx
- **Hours**: Mon-Fri 9:00-18:00 CET

## Prochaines Étapes

1. Connecter données réelles Supabase
2. Intégrer Power BI avec tokens valides
3. Implémenter upload fichiers Documents
4. Ajouter envoi emails pour invitations Team
5. Configurer notifications en temps réel
6. Ajouter tests automatisés

---

© 2024 Powalyze - Swiss Precision in Portfolio Governance
