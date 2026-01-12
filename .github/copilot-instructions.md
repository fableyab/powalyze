# Powalyze Codebase Guidelines

> **Quick Start**: Terminal 1: `npm run dev` (frontend port 3000) | Terminal 2: `cd backend && npm run dev` (Power BI API port 3001)

## Architecture Overview

**Powalyze** is a hybrid SaaS platform for strategic portfolio management and executive governance, built with:
- **Frontend**: React 18 + Vite (ESM-only, type: "module" in package.json)
- **Backend**: Express.js Power BI embed token API (port 3001, Azure AD OAuth)
- **Database**: Supabase PostgreSQL with RLS (Row Level Security) for multi-tenant isolation
- **Mobile**: Capacitor 8.x for iOS/Android native builds (AppId: `com.powalyze.app`)
- **Styling**: TailwindCSS + custom brand system (gold/blue gradients)
- **Animations**: Framer Motion (page transitions) + GSAP (interactive UI)

**⚠️ Security Note**: Supabase credentials are currently hardcoded in `src/lib/customSupabaseClient.js` (not env vars) - production consideration needed

### Key Structure
- `src/pages/` — All routes (~100+ pages): public landing, services, modules, auth-gated app
- `src/components/` — Reusable UI (Header, Footer, Radix UI primitives, custom forms)
- `src/contexts/` — React contexts (SupabaseAuthContext, ThemeContext, LanguageContext)
- `src/lib/` — Services layer (`.js` only, NO `.ts` - authService, portfolioService, powerbi-reports)
- `backend/` — Node.js server for Power BI embed tokens (Azure AD client credentials)
- `plugins/` — Custom Vite plugins (visual-editor, selection-mode, iframe-route-restoration)

## Brand Identity

### Colors (strict usage)
- **Gold**: `#D4AF37` — Primary brand color for CTAs, headings, accents (defined in tailwind.config.js as `brand.gold.DEFAULT`)
- **Blue**: `#4A9EFF` — Secondary accent for gradients (NOT the default - use `brand.blue.DEFAULT: '#0F2847'` for dark blue backgrounds)
- **Black**: `#000000` — Main backgrounds
- **Gradient pattern**: `from-[#D4AF37] to-[#4A9EFF]` or `bg-gradient-to-r from-brand-gold to-brand-blue` for buttons/icons
- **Brand blue variants**: `brand.blue.dark: '#0A1A2F'`, `brand.blue.light: '#1A3A5C'`

### Typography
- Use `font-extralight` for large headings (h1) to match brand aesthetic
- Use `font-light` for body text and descriptions
- NO custom fonts loaded - relies on system fonts

### Language Defaults
- **French (`fr`)** is the default language (not English)
- Use `const { t } = useTranslation('common')` for all user-facing strings
- Translation files: `src/locales/{fr,en,de,no}/common.json`
- Detection order: localStorage → navigator language

## Development Commands

```bash
# Frontend dev server (port 3000, binds to IPv6 :: for all interfaces)
npm run dev                 # Accessible at http://localhost:3000

# Backend Power BI server (SEPARATE TERMINAL - required for Power BI features)
cd backend && npm run dev   # Runs on port 3001, requires .env configuration

# Build & Deployment
npm run build:full          # Build with LLMS pre-generation (runs tools/generate-llms.js)
npm run build               # Standard production build to dist/
npm run preview             # Preview production build locally

# Mobile development
npx cap sync               # Sync changes to native projects after build
npx cap open ios          # Open Xcode IDE (macOS only, requires iOS project)
npx cap open android      # Open Android Studio IDE (requires Android SDK)

# Deployment
npm run deploy             # Deploy to default environment
npm run deploy:prod        # Deploy to production (runs scripts/deploy.js --prod)
```

**Development workflow**: Terminal 1 runs `npm run dev`, Terminal 2 runs `cd backend && npm run dev` (or skip backend if not testing Power BI features)

## Critical Patterns

### Authentication Flow
- **Primary hook**: `const { user, signIn, signOut, loading } = useAuth()` from `@/contexts/SupabaseAuthContext`
- **Supabase client**: Import from `@/lib/customSupabaseClient.js` (hardcoded URL/key in file, NOT using env vars - this is a security concern for production)
- **Protected routes**: Wrap with `<ProtectedRoute>` component in App.jsx (handles redirect to /login if not authenticated)
- **Auth check pattern**: `if (!user) return <Navigate to="/login" replace />`
- **RLS context**: All database queries inherit user context automatically via Supabase RLS policies (enforce organization_id filtering in queries)
- **Capacitor mobile auth**: StatusBar + SplashScreen configured in main.jsx for native platforms

### Routing Architecture
- **Router**: React Router v6 (BrowserRouter) with Suspense lazy loading for code splitting
- **Route definitions**: ALL in `/src/App.jsx` (~400+ lines, single source of truth)
- **Public pages**: Landing, PMO, Product, Features, Pricing, Contact, Resources, About
- **Auth pages**: Login (`/login`), SignUp (`/signup`) - redirect to `/dashboard` after auth
- **App pages (protected)**: Dashboard, Projects, Reports, Cockpit, Portfolio, Documents
- **Special routes**: `/demo-mode` (demo sandbox), `/admin` (admin panel)
- **Mobile redirects**: `<DeviceRedirect>` component handles iOS/Android route adjustments

### Multi-Language (i18n)
- **Library**: i18next + react-i18next + i18next-browser-languagedetector
- **Config**: `/src/i18n.js` (imported in `src/lib/i18n.js`, then imported in main.jsx before React render)
- **Supported**: `fr` (default/fallback), `en`, `de`, `no` (Norwegian); `es`, `it` exist but non-functional
- **JSON structure**: `src/locales/{lang}/common.json` (single namespace: 'common') + `public/locales/` mirror
- **Detection**: Order is `localStorage` → `navigator.language` (browser language)
- **Usage**: `const { t } = useTranslation('common'); t('key.path')` or deprecated `useLanguage()` hook from LanguageContext
- **Language switching**: Updates localStorage → auto-detects on page reload
- **CRITICAL**: When adding new translation keys, update ALL active language files simultaneously (fr, en, de, no minimum)
- **Example translation structure**:
  ```javascript
  // src/locales/fr/common.json
  {
    "nav": {
      "home": "Accueil",
      "about": "À propos"
    }
  }
  // Component usage: {t('nav.home')}
  ```

### Power BI Integration
- **Architecture**: Frontend → Backend (localhost:3001) → Azure AD → Power BI Service
- **Backend generates**: Embed tokens via Azure AD OAuth2 client credentials flow (requires separate Node.js process)
- **API endpoints**:
  - `POST /api/powerbi/embed` — Generate embed token with `{ reportType, userId, filters? }`
  - `GET /api/powerbi/status` — Health check
  - `POST /api/decision-engine/*` — Decision engine routes (separate module)
- **Report types**: commercial, finance, pmo, predictive, operational, strategic (mapped in server.js REPORTS object)
- **Frontend library**: `powerbi-client-react` (PowerBIEmbed component from `powerbi-reports.js` service)
- **Backend config**: `/backend/.env` requires: PBI_CLIENT_ID, PBI_TENANT_ID, PBI_CLIENT_SECRET, PBI_WORKSPACE_ID, PBI_REPORT_* IDs
- **CORS config**: Backend accepts requests from `FRONTEND_URL` env var (defaults to http://localhost:5173 for local dev)
- **Setup docs**: `/backend/README.md` (step-by-step Azure AD app registration + workspace setup)
- **Security**: Backend validates all requests, frontend NEVER sees Azure AD credentials


### Styling Conventions
- **TailwindCSS only** - NO inline styles unless absolutely necessary (e.g., dynamic values from state)
- **Responsive breakpoints**: `md:` (768px+), `lg:` (1024px+), configured in tailwind.config.js
- **Animations**: 
  - Use `framer-motion` for page transitions (AnimatePresence, motion.div with initial/animate/exit)
  - Use GSAP for complex/interactive UI animations (scroll-triggered, timelines)
- **Radix UI primitives**: Pre-integrated (@radix-ui/react-*) - use these for dialogs, dropdowns, accordions
- **Shadcn/ui pattern**: Components in `src/components/ui/` follow shadcn conventions (cn() utility from lib/utils)
- **Dark mode**: Configured via `darkMode: ["class"]` in Tailwind - toggle with ThemeContext

### Component Structure
- **Public pages**: `src/pages/` (e.g., MaitriseRisques.jsx, Governance.jsx)
- **Services pages**: `src/pages/services/` (PMOService.jsx, DataService.jsx, PowerBIService.jsx, SaaSService.jsx, IAService.jsx)
- **Module pages**: `src/pages/modules/` (ExecutiveDashboardModule.jsx, DecisionHubModule.jsx, PredictiveIntelligenceModule.jsx, PortfolioManagerModule.jsx)
- **Solution pages**: `src/pages/solutions/` (PMOPage.jsx, DataBIPage.jsx, DirectionPage.jsx, ConseilPage.jsx)
- **App pages (protected)**: `src/pages/app/` or root (Dashboard.jsx, Projects.jsx, Documents.jsx)
- **Mobile-specific**: `src/pages/mobile/` (tablet/ also exists for iPad layouts)
- **Layout pattern**: Public pages MUST include `<Header />` and footer, app pages use `<DesktopLayoutWrapper>`

### Supabase Schema
- **Schema file**: `SUPABASE_SCHEMA_COMPLETE.sql` (complete DDL with RLS policies)
- **Key tables**: 
  - `organizations` — Multi-tenant root entity
  - `user_organizations` — User-to-org mapping with roles
  - `initiatives` — Projects/portfolios (linked to org)
  - `milestones` — Timeline events for initiatives
  - `risks` + `risk_actions` — Risk management
  - `decisions` — COMEX decision tracking
  - `committees`, `documents`, `teams` — Governance modules
- **RLS enabled**: ALL tables have Row Level Security policies for multi-tenant isolation
- **Foreign keys**: `organization_id` links most entities, `user_id` from `auth.users`
- **IMPORTANT**: Never query without proper `organization_id` filtering (RLS enforces this, but be explicit)
- **Query pattern example**:
  ```javascript
  // src/lib/projectService.js
  export async function getProjects(organizationId) {
    const { data, error } = await supabase
      .from('initiatives')
      .select('*')
      .eq('organization_id', organizationId); // ALWAYS filter by org
    if (error) throw error;
    return data;
  }
  ```

## Custom Vite Plugins

1. **visual-editor** (`plugins/visual-editor/`) — Inline editing mode for components (dev-only)
2. **selection-mode** (`plugins/selection-mode/`) — Visual selection tools (dev-only)
3. **iframe-route-restoration** (`plugins/vite-plugin-iframe-route-restoration.js`) — Restores routes in iframe contexts (injected via vite.config.js)
4. **Error handlers** (in vite.config.js): Injects runtime error handlers that postMessage to parent window (for Vite overlay, runtime errors, console.error)

All plugins are registered in `vite.config.js` and only active in development mode.

## Mobile (Capacitor)

- **Config**: `/capacitor.config.ts` (TypeScript - one of few .ts files in project)
- **AppId**: `com.powalyze.app` (for App Store/Play Store)
- **Build output**: `dist/` (Vite build target)
- **Workflow**: `npm run build` → `npx cap sync` → `npx cap open ios/android`
- **Plugins**: SplashScreen (2s duration, black bg), StatusBar (dark style), Keyboard, App
- **Schemes**: Uses https scheme on both iOS/Android (required for secure contexts)
- **IMPORTANT**: Always run `npx cap sync` after changing native plugin configs or adding new Capacitor plugins

## Testing & QA

- **No automated tests** currently configured (no Jest/Vitest/Playwright setup)
- **Manual testing guides**: 
  - `/TEST_GUIDE_RESPONSIVE.md` — Responsive design testing checklist
  - `/GUIDE_TEST_COMPLET.md` — Complete functional testing scenarios
- **Demo mode**: `/demo-mode` route (sandbox with mock data, no auth required)
- **QA pattern**: Test on desktop (Chrome/Firefox), mobile browsers (Safari iOS, Chrome Android), and native apps

## Deployment

### Frontend (Vercel)
- **Config**: `/vercel.json` (rewrites all routes to index.html for SPA, static asset caching)
- **Build command**: `npm run build:full` (includes LLMS generation)
- **Output**: `dist/` directory (static files)
- **Environment variables**: Supabase URL + anon key (currently hardcoded in customSupabaseClient.js)

### Backend (VPS)
- **Deployment scripts**: `/deploy/` folder (auto-config.sh, deploy-to-vps.ps1, install-nginx.sh)
- **Target**: Self-hosted VPS with Nginx reverse proxy
- **Requirements**: Node.js, PM2 (process manager), Nginx
- **Environment variables**: Azure AD credentials (PBI_CLIENT_ID, PBI_TENANT_ID, PBI_CLIENT_SECRET, workspace/report IDs)
- **Guides**: `/deploy/README-VPS-DEPLOYMENT.md`, `/DEPLOYMENT_GUIDE.md`

## Common Tasks

### Adding a new page
1. Create component in `src/pages/MyPage.jsx` (use existing pages as templates)
2. Import in `/src/App.jsx`: `import MyPage from '@/pages/MyPage';`
3. Add route: `<Route path="/my-page" element={<MyPage />} />`
4. If public: Add to Header navigation in `src/components/Header.jsx`
5. If protected: Wrap with `<Route path="/my-page" element={<ProtectedRoute><MyPage /></ProtectedRoute>} />`

### Adding a service integration
1. Create service file in `src/lib/myService.js` (NOT .ts)
2. Import Supabase: `import customSupabaseClient from '@/lib/customSupabaseClient';`
3. Export async functions: `export async function getMyData(userId) { ... }`
4. Use in components: `import { getMyData } from '@/lib/myService';`
5. Handle errors with try/catch and toast notifications

### Modifying brand colors
- Edit `/tailwind.config.js` → `theme.extend.colors.brand` object
- **DO NOT** change `#D4AF37` (gold) or `#0F2847` (brand blue) without design approval
- Update CSS variables in `/src/index.css` if modifying HSL-based colors (--primary, --secondary, etc.)

### Translation keys
1. Add key to `src/locales/fr/common.json` (default language)
2. Copy to `en/common.json`, `de/common.json`, `no/common.json`
3. Translate values for each locale
4. Use in component: `{t('new.key.path')}`
5. **NEVER** leave untranslated keys - breaks in non-French locales

## Critical Context for New Developers

### File Organization
- **Services MUST be .js** — Everything in `src/lib/` is JavaScript, NO `.ts` files
- **Public/locales mirror** — `public/locales/{lang}/` mirrors `src/locales/{lang}/` for static access
- **Routes are centralized** — App.jsx contains ALL 440+ lines of route definitions; do NOT create separate route files
- **Import aliases** — Use `@/` prefix (configured in vite.config.js) for all imports: `@/lib/utils`, `@/components/Header`
- **Service pattern** — Every Supabase query belongs in `src/lib/` services, never directly in components

### Data Flow & State Management
- **Supabase RLS is the boundary** — User context flows from auth → RLS policies automatically filter data
- **Query client** — TanStack React Query instance in `src/lib/queryClient.js` (imported globally)
- **No Redux/Zustand** — State management is contexts (Auth, Theme, Language) + React Query for data
- **ProtectedRoute wrapper** — All auth-gated pages wrapped in App.jsx routes; check `!user` in components as fallback

### Styling Rules (Strict)
- Gold (`#D4AF37`) is NEVER changed without design approval
- Every button/CTA uses gradient: `from-brand-gold to-brand-blue`
- No inline styles except for dynamic values (e.g., `style={{width: dynamicValue}}`)
- Radix UI + Tailwind + GSAP animations compose the UI system

## Avoid (Critical)

- ❌ **TypeScript in src/lib/** — All service files MUST be .js (capacitor.config.ts is exception, not rule)
- ❌ **Hardcoded API URLs** — Backend CORS origin configured in server.js (frontend dev: http://localhost:5173)
- ❌ **Supabase queries in components** — Abstract to src/lib/ services only
- ❌ **Skipping RLS organization_id checks** — Every query must filter by organization_id (RLS enforces, but be explicit)
- ❌ **Generic button colors** — Use brand gradients or explicit brand color classes
- ❌ **Inline styles over Tailwind** — Add utilities to tailwind.config.js if needed
- ❌ **Direct Capacitor API calls** — Use plugins/ abstractions or defer to mobile-specific pages
- ❌ **Changing Supabase credentials location** — Currently hardcoded in customSupabaseClient.js (not using .env) by design
- ❌ **Creating .ts files in src/lib/** — This breaks the established pattern (everything is .js except capacitor.config.ts)

## PowerShell Deployment Patterns

**Critical**: Many deployment scripts are PowerShell (.ps1). To run them:
```powershell
# If execution policy error, run:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Deploy examples:
.\deploy.ps1                    # General deployment
.\DEPLOY_NOW.ps1               # Immediate deployment
.\deploy-vercel-prod.ps1       # Vercel production deploy
```

**Common deployment files**: `deploy.ps1`, `deploy-supabase-tables.ps1`, `deploy-vercel-prod.ps1`, `apply-organizations-fix.ps1`


## Key Files Reference

- Auth: `/src/contexts/SupabaseAuthContext.jsx`
- Supabase client: `/src/lib/customSupabaseClient.js`
- Routes: `/src/App.jsx`
- Styling: `/tailwind.config.js`, `/src/index.css`
- Power BI backend: `/backend/server.js`
- Deployment: `/deploy/` directory, `/DEPLOYMENT_GUIDE.md`

## Important Context Windows Notes

When working with large files (App.jsx has 513 lines, SUPABASE_SCHEMA_COMPLETE.sql has 322 lines):
- Read files in sections if needed, don't try to load everything at once
- App.jsx contains ALL routes (~100+ pages) - search for specific routes instead of reading entire file
- Use grep_search to find patterns across multiple files efficiently
- For Supabase schema changes, always reference SUPABASE_SCHEMA_COMPLETE.sql first

## Error Handling Patterns

### Toast notifications (preferred)
```javascript
import { useToast } from '@/components/ui/use-toast';

const { toast } = useToast();
toast({
  title: "Success",
  description: "Operation completed successfully"
});
```

### Service layer error handling
```javascript
// src/lib/myService.js
export async function fetchData(orgId) {
  try {
    const { data, error } = await supabase
      .from('table')
      .select('*')
      .eq('organization_id', orgId);
    
    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('fetchData error:', err);
    return { data: null, error: err.message };
  }
}
```

## Testing Strategy

**Manual testing only** - no automated test suite exists:
1. Run `npm run dev` for frontend
2. Run `cd backend && npm run dev` for Power BI features
3. Test responsive layouts using browser DevTools (mobile/tablet/desktop)
4. Use `/demo-mode` route for sandbox testing without auth
5. Check console for errors (Vite overlay will show build errors automatically)
6. Reference `TEST_GUIDE_RESPONSIVE.md` and `GUIDE_TEST_COMPLET.md` for checklists
