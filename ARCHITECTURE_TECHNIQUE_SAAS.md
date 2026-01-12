# Architecture Technique Powalyze SaaS

## Vue d'Ensemble de l'Architecture

Powalyze est une application SaaS moderne construite avec une architecture frontend/backend séparée, optimisée pour la performance, la sécurité et l'évolutivité.

## Stack Technologique

### Frontend
```json
{
  "framework": "React 18.3.1",
  "build": "Vite 4.5.5",
  "routing": "React Router v6",
  "styling": "TailwindCSS 3.x",
  "animations": ["Framer Motion", "GSAP"],
  "icons": "Lucide React",
  "forms": "React Hook Form",
  "http": "TanStack React Query",
  "mobile": "Capacitor 8.x"
}
```

### Backend
```json
{
  "server": "Express.js",
  "runtime": "Node.js",
  "database": "Supabase PostgreSQL",
  "auth": "Supabase Auth + RLS",
  "powerbi": "Azure AD OAuth 2.0",
  "port": 3001
}
```

### Infrastructure
```json
{
  "hosting_frontend": "Vercel",
  "hosting_backend": "VPS with Nginx",
  "cdn": "Vercel Edge Network",
  "ssl": "Automatic HTTPS",
  "monitoring": "Vercel Analytics"
}
```

## Structure du Projet

```
c:\powalyze\
├── src/
│   ├── pages/                # Pages React (100+ fichiers)
│   │   ├── app/             # Pages protégées (/app/*)
│   │   │   ├── CockpitPage.jsx
│   │   │   ├── Settings.jsx
│   │   │   ├── Team.jsx
│   │   │   ├── Documents.jsx
│   │   │   ├── PortfolioReport.jsx
│   │   │   └── ...
│   │   ├── services/        # Pages services publiques
│   │   ├── modules/         # Pages modules
│   │   └── ...
│   ├── components/          # Composants réutilisables
│   │   ├── layout/
│   │   │   ├── CockpitLayout.jsx
│   │   │   ├── Header.jsx
│   │   │   └── Footer.jsx
│   │   └── ui/              # Composants UI (Radix UI)
│   ├── contexts/            # React Contexts
│   │   ├── SupabaseAuthContext.jsx
│   │   ├── ThemeContext.jsx
│   │   └── LanguageContext.jsx
│   ├── lib/                 # Services & utilities (.js only)
│   │   ├── customSupabaseClient.js
│   │   ├── authService.js
│   │   ├── portfolioService.js
│   │   ├── powerbi-reports.js
│   │   └── ...
│   ├── locales/             # Traductions i18n
│   │   ├── fr/common.json  # Français (default)
│   │   ├── en/common.json  # English
│   │   ├── de/common.json  # Deutsch
│   │   └── no/common.json  # Norwegian
│   └── App.jsx              # Router principal (~440 lignes)
├── backend/
│   ├── server.js            # Express server
│   ├── routes/              # API routes
│   ├── services/            # Business logic
│   └── .env                 # Azure AD credentials
├── public/
│   ├── videos/              # Vidéos (manifesto)
│   └── locales/             # Mirror traductions
├── plugins/                 # Vite custom plugins
├── deploy/                  # Scripts déploiement
├── tools/                   # Outils génération
└── dist/                    # Build output
```

## Design System: Swiss Luxury

### Palette de Couleurs
```css
/* Brand Colors */
--brand-gold: #D4AF37;        /* Gold primary */
--brand-blue-dark: #0F2847;   /* Dark blue backgrounds */
--brand-blue: #4A9EFF;        /* Blue accent */

/* Semantic Colors */
--success: #22C55E;           /* Green */
--warning: #F97316;           /* Orange */
--error: #EF4444;             /* Red */
--info: #3B82F6;              /* Blue */

/* UI Colors */
--bg-primary: #020713;        /* Main background */
--bg-card: rgba(0,0,0,0.4);   /* Card backgrounds */
--border-primary: rgba(255,255,255,0.05);
--border-hover: rgba(255,255,255,0.1);
```

### Typographie
```css
/* Headers */
font-family: system-ui, sans-serif;
font-weight: 200; /* extralight */
letter-spacing: -0.02em; /* tight */

/* Body */
font-weight: 300; /* light */

/* Labels */
font-size: 0.75rem; /* text-xs */
text-transform: uppercase;
letter-spacing: 0.1em;
```

### Composants UI

#### Swiss Card
```jsx
className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-[2px] p-6 hover:border-white/10 transition-all duration-500"
```

#### Gold Button
```jsx
className="px-6 py-2.5 bg-[#D4AF37] text-black rounded-[2px] text-xs font-light hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all duration-500 tracking-[0.2em] uppercase"
```

#### Toggle Switch (Swiss Precision)
```jsx
<button className={`relative w-14 h-7 rounded-full transition-all duration-500 ${
  value ? 'bg-[#D4AF37]' : 'bg-white/10'
}`}>
  <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-lg transition-all duration-500 ${
    value ? 'right-1' : 'left-1'
  }`} />
</button>
```

## Architecture Composants

### CockpitLayout (Layout Unifié)
```jsx
import CockpitLayout from "@/components/layout/CockpitLayout";

export default function MyPage() {
  return (
    <CockpitLayout>
      {/* Contenu avec Swiss styling automatique */}
    </CockpitLayout>
  );
}
```

**Fonctionnalités CockpitLayout:**
- Sidebar navigation avec icônes
- Header avec user profile
- Breadcrumbs automatiques
- Background Swiss avec effets
- Responsive mobile/tablet

### ProtectedRoute Pattern
```jsx
// Dans App.jsx
<Route 
  path="/app/cockpit" 
  element={
    <ProtectedRoute>
      <CockpitPage />
    </ProtectedRoute>
  } 
/>
```

## Gestion d'État

### React Contexts
```javascript
// Auth Context
const { user, signIn, signOut, loading } = useAuth();

// Theme Context
const { theme, toggleTheme } = useTheme();

// Language Context (deprecated, use i18n)
const { language, changeLanguage } = useLanguage();
```

### TanStack React Query
```javascript
import { useQuery } from '@tanstack/react-query';

const { data, isLoading, error } = useQuery({
  queryKey: ['projects'],
  queryFn: () => getProjects(userId)
});
```

## Supabase Architecture

### RLS (Row Level Security)
Toutes les tables ont des policies RLS pour isolation multi-tenant:

```sql
-- Example RLS Policy
CREATE POLICY "Users can only see their org data"
ON projects
FOR SELECT
USING (organization_id = auth.jwt() ->> 'organization_id');
```

### Tables Principales
```sql
-- profiles: User profiles linked to auth.users
-- organizations: Tenant isolation
-- projects: Strategic initiatives
-- committees: Governance bodies
-- decisions: Decision log
-- documents: File metadata
-- teams: Team members
-- risks: Risk registry
-- notifications: User notifications
```

### Service Pattern
```javascript
// src/lib/portfolioService.js
import customSupabaseClient from './customSupabaseClient';

export async function getProjects(userId) {
  const { data, error } = await customSupabaseClient
    .from('projects')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}
```

## Power BI Integration

### Architecture
```
Frontend (React)
    ↓ POST /api/powerbi/embed
Backend (Express:3001)
    ↓ Azure AD OAuth 2.0
Azure AD
    ↓ Client Credentials Flow
Power BI Service
    ↓ Embed Token
Backend → Frontend
    ↓ PowerBIEmbed Component
User Browser
```

### Backend Configuration
```javascript
// backend/.env
PBI_CLIENT_ID=xxx          # Azure AD App ID
PBI_TENANT_ID=xxx          # Azure AD Tenant
PBI_CLIENT_SECRET=xxx      # App Secret
PBI_WORKSPACE_ID=xxx       # Power BI Workspace
PBI_REPORT_COMMERCIAL=xxx  # Report IDs...
```

### Frontend Usage
```javascript
import { PowerBIEmbed } from 'powerbi-client-react';

const embedConfig = {
  type: 'report',
  id: reportId,
  embedUrl: embedUrl,
  accessToken: token,
  tokenType: models.TokenType.Embed
};

<PowerBIEmbed embedConfig={embedConfig} />
```

## Internationalisation (i18n)

### Configuration
```javascript
// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'fr',
    supportedLngs: ['fr', 'en', 'de', 'no'],
    detection: {
      order: ['localStorage', 'navigator']
    }
  });
```

### Usage
```javascript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation('common');
  return <h1>{t('welcome.title')}</h1>;
}
```

## Routing Architecture

### App.jsx Structure
```jsx
<BrowserRouter>
  <Suspense fallback={<LoadingScreen />}>
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/contact" element={<Contact />} />
      
      {/* Protected App Routes */}
      <Route path="/app" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="/app/cockpit" />} />
        <Route path="cockpit" element={<CockpitPage />} />
        <Route path="cockpit-static" element={<CockpitPage />} />
        <Route path="cockpit-14kpis" element={<CockpitPageData />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="reports/portfolio" element={<PortfolioReport />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="team" element={<Team />} />
        <Route path="documents" element={<Documents />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  </Suspense>
</BrowserRouter>
```

## Build & Deployment

### Build Process
```bash
# Vite build with LLMS generation
npm run build:full

# Output: dist/ directory
# - HTML entry point
# - JS chunks (code-split by route)
# - CSS bundle (TailwindCSS purged)
# - Assets (images, fonts, videos)
```

### Vercel Configuration
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

### Backend Deployment (VPS)
```bash
# PM2 process manager
pm2 start backend/server.js --name powalyze-backend

# Nginx reverse proxy
location /api {
  proxy_pass http://localhost:3001;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection 'upgrade';
}
```

## Performance Optimizations

### Code Splitting
- Route-based: Chaque page est un lazy import
- Component-based: Composants lourds lazy-loaded
- Bundle size: ~1.35MB gzipped

### Caching Strategy
```javascript
// React Query cache
queryClient.setDefaultOptions({
  queries: {
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000 // 10 minutes
  }
});
```

### Image Optimization
- Format: WebP avec fallback
- Lazy loading: `loading="lazy"`
- CDN: Vercel Edge Network

## Security

### Authentication
- Supabase Auth (JWT tokens)
- RLS enforcement (database level)
- HTTPS only (enforced)

### CORS Configuration
```javascript
// backend/server.js
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
```

### Environment Variables
```bash
# Frontend (Vite)
VITE_SUPABASE_URL=xxx
VITE_SUPABASE_ANON_KEY=xxx

# Backend (Node.js)
PBI_CLIENT_ID=xxx
PBI_CLIENT_SECRET=xxx
FRONTEND_URL=https://www.powalyze.com
```

## Monitoring & Analytics

### Vercel Analytics
- Page views tracking
- Core Web Vitals
- Error tracking

### Error Handling
```javascript
// Global error boundary
<ErrorBoundary fallback={<ErrorPage />}>
  <App />
</ErrorBoundary>
```

## Mobile Architecture (Capacitor)

### Configuration
```typescript
// capacitor.config.ts
const config: CapacitorConfig = {
  appId: 'com.powalyze.app',
  appName: 'Powalyze',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    iosScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#000000'
    },
    StatusBar: {
      style: 'dark'
    }
  }
};
```

### Build Process
```bash
# 1. Build web app
npm run build

# 2. Sync to native projects
npx cap sync

# 3. Open in IDE
npx cap open ios
npx cap open android
```

## Testing Strategy

### Manual Testing
- Desktop: Chrome, Firefox, Safari
- Mobile: iOS Safari, Android Chrome
- Responsive: 320px → 2560px
- Guides: TEST_GUIDE_RESPONSIVE.md

### Future: Automated Testing
```javascript
// Planned: Vitest + Testing Library
describe('CockpitPage', () => {
  it('renders executive metrics', () => {
    render(<CockpitPage />);
    expect(screen.getByText('Active Initiatives')).toBeInTheDocument();
  });
});
```

## Scalability Considerations

### Database
- Supabase scales automatically
- RLS policies enforce tenant isolation
- Connection pooling via pgBouncer

### Frontend
- Vercel Edge CDN (global)
- Automatic scaling
- Serverless functions

### Backend
- VPS can scale vertically
- Load balancer for horizontal scaling
- PM2 cluster mode for multi-core

---

## Références Techniques

- **Vite**: https://vitejs.dev
- **React**: https://react.dev
- **Supabase**: https://supabase.com/docs
- **TailwindCSS**: https://tailwindcss.com
- **Capacitor**: https://capacitorjs.com
- **Power BI Embedded**: https://docs.microsoft.com/power-bi/developer/embedded/

---

© 2024 Powalyze - Swiss Precision Engineering
