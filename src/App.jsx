
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/SupabaseAuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Loader2 } from 'lucide-react';
import ScrollToTop from '@/components/ScrollToTop';
import ProtectedRoute from '@/components/ProtectedRoute';
import DeviceRedirect from '@/components/DeviceRedirect';
import DesktopLayoutWrapper from '@/components/layout/DesktopLayoutWrapper';
import ErrorBoundary from '@/components/ErrorBoundary';

// Public Pages
import LandingPage from '@/pages/LandingPage';
import PMO from '@/pages/PMO';
import DemoMode from '@/pages/DemoMode';
import DecisionEngine from '@/pages/DecisionEngine';
import Product from '@/pages/Product';
import Solutions from '@/pages/Solutions';
import Resources from '@/pages/Resources';
import CaseStudies from '@/pages/CaseStudies';
// import Services from '@/pages/Services';
import Methode from '@/pages/Methode';
import DemoPage from '@/pages/DemoPage';
import Login from '@/pages/Login';
import SignUp from '@/pages/SignUp';
import AcceptInvitation from '@/pages/auth/AcceptInvitation';
import About from '@/pages/About';
import ConsultingAndSaaS from '@/pages/ConsultingAndSaaS';
import AICore from '@/pages/AICore';
import Blog from '@/pages/Blog';
import BlogArticle from '@/pages/BlogArticle';
import Contact from '@/pages/Contact';
import Legal from '@/pages/Legal';
import FAQ from '@/pages/FAQ';

// New Premium Pages
import Features from '@/pages/Features';
import Platform from '@/pages/Platform';
import Governance from '@/pages/Governance';
import Scenarios from '@/pages/Scenarios';
import Onboarding from '@/pages/Onboarding';

// Services Pages
import PMOService from '@/pages/services/PMOService';
import DataService from '@/pages/services/DataService';
import PowerBIService from '@/pages/services/PowerBIService';
import SaaSService from '@/pages/services/SaaSService';
import IAService from '@/pages/services/IAService';

// Modules Pages
import PortfolioManagerModule from '@/pages/modules/PortfolioManagerModule';
import ExecutiveDashboardModule from '@/pages/modules/ExecutiveDashboardModule';
import DecisionHubModule from '@/pages/modules/DecisionHubModule';
import PredictiveIntelligenceModule from '@/pages/modules/PredictiveIntelligenceModule';

// V2 Projects Pages
import ProjectsListV2 from '@/pages/projects/ProjectsList';
import ProjectNewV2 from '@/pages/projects/ProjectNew';
import ProjectDetailV2 from '@/pages/projects/ProjectDetail';

// V2 Portfolios Pages
import PortfoliosListV2 from '@/pages/portfolios/PortfoliosList';
import PortfolioDetailV2 from '@/pages/portfolios/PortfolioDetail';

// V2 Dashboard Executive
import DashboardExecutiveV2 from '@/pages/DashboardExecutive';

// Cockpit Demo
import CockpitDemo from '@/pages/CockpitDemo';

// Demo Complete pour clients
import DemoComplete from '@/pages/DemoComplete';

// New Concrete Pages
// import PlateformePage from '@/pages/PlateformePage';
import SolutionsPage from '@/pages/SolutionsPage';
import DemoPageNew from '@/pages/DemoPageNew';

// Solution Detail Pages
import PMOPage from '@/pages/solutions/PMOPage';
import DataBIPage from '@/pages/solutions/DataBIPage';
import ChefsProjetPage from '@/pages/solutions/ChefsProjetPage';
import DirectionPage from '@/pages/solutions/DirectionPage';
import ConseilPage from '@/pages/solutions/ConseilPage';

// Premium Module Pages
import PortfolioManager from '@/pages/PortfolioManager';
import ExecutiveDashboard from '@/pages/ExecutiveDashboard';
import AppModulesPage from '@/pages/AppModulesPage';
import CockpitExecutifPublic from '@/pages/CockpitExecutifPublic';
import RiskManager from '@/pages/RiskManager';
import PowerBIReportsPage from '@/pages/PowerBIReportsPage';
import PowerBIReports from '@/pages/PowerBIReports';
import AIAnalyticsPage from '@/pages/AIAnalyticsPage';
import AIAnalytics from '@/pages/AIAnalytics';
import PerformanceMonitoring from '@/pages/PerformanceMonitoring';

// New Pages
import DiscoverPMOStrategic from '@/pages/DiscoverPMOStrategic';
import DiscoverDataPowerBI from '@/pages/DiscoverDataPowerBI';
import DiscoverAutomationAI from '@/pages/DiscoverAutomationAI';
import CockpitExecutif from '@/pages/CockpitExecutif';
import CGU from '@/pages/CGU';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfService from '@/pages/TermsOfService';

// Value proposition pages
import VisionClaire from '@/pages/VisionClaire';
import GouvernanceStructuree from '@/pages/GouvernanceStructuree';
import MaitriseRisques from '@/pages/MaitriseRisques';
import PriseDecision from '@/pages/PriseDecision';
import OrganisationAlignee from '@/pages/OrganisationAlignee';
import ResultatsMesurables from '@/pages/ResultatsMesurables';

// Feature pages
import VisionUnifiee from '@/pages/VisionUnifiee';
import PilotageExecutif from '@/pages/PilotageExecutif';
import Tracabilite from '@/pages/Tracabilite';
import Modularite from '@/pages/Modularite';

// Protected Pages
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const DashboardNew = lazy(() => import('@/pages/DashboardNew'));
const DashboardPremium = lazy(() => import('@/pages/DashboardPremium'));
const DashboardRevolutionary = lazy(() => import('@/pages/app/DashboardRevolutionary'));
const DashboardSensible = lazy(() => import('@/pages/app/DashboardSensible'));
const ProjetsSensible = lazy(() => import('@/pages/app/ProjetsSensible'));
const PortfolioSensible = lazy(() => import('@/pages/app/PortfolioSensible'));
const AlertesSensible = lazy(() => import('@/pages/app/AlertesSensible'));
const EquipeSensible = lazy(() => import('@/pages/app/EquipeSensible'));
const DocumentsSensible = lazy(() => import('@/pages/app/DocumentsSensible'));
const Projects = lazy(() => import('@/pages/Projects'));
const ProjectsNew = lazy(() => import('@/pages/ProjectsNew'));
const ProjectsList = lazy(() => import('@/pages/ProjectsList'));
const ProjectsPremium = lazy(() => import('@/pages/ProjectsPremium'));
const ProjectsKanban = lazy(() => import('@/pages/ProjectsKanban'));
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail'));
const ProjectEdit = lazy(() => import('@/pages/ProjectEdit'));
const ProjectNew = lazy(() => import('@/pages/ProjectNew'));
const Portfolio = lazy(() => import('@/pages/Portfolio'));
const PortfolioOverview = lazy(() => import('@/pages/PortfolioOverview'));
const PortfolioPremium = lazy(() => import('@/pages/PortfolioPremium'));
const PortfolioAnalytics = lazy(() => import('@/pages/PortfolioAnalytics'));
const PortfolioSegment = lazy(() => import('@/pages/PortfolioSegment'));
const Workspaces = lazy(() => import('@/pages/Workspaces'));
const WorkspaceDetail = lazy(() => import('@/pages/WorkspaceDetail'));

const PredictiveIntelligence = lazy(() => import('@/pages/PredictiveIntelligence'));
const Admin = lazy(() => import('@/pages/Admin'));
const SystemHealth = lazy(() => import('@/pages/SystemHealth'));
const AuditLogs = lazy(() => import('@/pages/AuditLogs'));
const Tasks = lazy(() => import('@/pages/Tasks'));
const Documents = lazy(() => import('@/pages/Documents'));
const Analytics = lazy(() => import('@/pages/Analytics'));
const AnalyticsHub = lazy(() => import('@/pages/AnalyticsHub'));
const DecisionRoom = lazy(() => import('@/pages/DecisionRoom'));
const TheaterPage = lazy(() => import('@/pages/TheaterPage'));
const ExecutiveHub = lazy(() => import('@/pages/ExecutiveHub'));
const InsightCommandCenter = lazy(() => import('@/pages/InsightCommandCenter'));
const HowItWorks = lazy(() => import('@/pages/HowItWorks'));
const PitchDeck = lazy(() => import('@/pages/PitchDeck'));
const PowerBIHub = lazy(() => import('@/pages/PowerBIHub'));
const Connectors = lazy(() => import('@/pages/Connectors'));

// Governance SaaS Pages
const PortfolioView = lazy(() => import('@/pages/PortfolioView'));
const CommitteeView = lazy(() => import('@/pages/CommitteeView'));
const DecisionHub = lazy(() => import('@/pages/DecisionHub'));
const RiskIntelligence = lazy(() => import('@/pages/RiskIntelligence'));
const ReportBuilder = lazy(() => import('@/pages/ReportBuilder'));
const Reports = lazy(() => import('@/pages/Reports'));
const ReportsList = lazy(() => import('@/pages/ReportsList'));
const ReportsHome = lazy(() => import('@/pages/ReportsHome'));
const ReportViewer = lazy(() => import('@/pages/ReportViewer'));
const ReportDetail = lazy(() => import('@/pages/ReportDetail'));
const PowerBIReportViewer = lazy(() => import('@/pages/PowerBIReportViewer'));
const Integrations = lazy(() => import('@/pages/Integrations'));
const CustomDashboard = lazy(() => import('@/pages/CustomDashboard'));
const Team = lazy(() => import('@/pages/Team'));
const Settings = lazy(() => import('@/pages/Settings'));
const Messages = lazy(() => import('@/pages/Messages'));
const Notifications = lazy(() => import('@/pages/Notifications'));
const Alerts = lazy(() => import('@/pages/Alerts'));
const RiskHeatmap = lazy(() => import('@/pages/RiskHeatmap'));

// App Layout & Pages
const AppLayout = lazy(() => import('@/layouts/AppLayout'));
const CockpitV2 = lazy(() => import('@/pages/app/CockpitV2'));
// CockpitPage supprimé (doublon de Cockpit.jsx)
const CockpitPageData = lazy(() => import('@/pages/app/CockpitPageData'));
const ProjectsApp = lazy(() => import('@/pages/app/Projects'));
const RisksApp = lazy(() => import('@/pages/app/Risks'));
const DecisionsApp = lazy(() => import('@/pages/app/Decisions'));
const AlertsPageApp = lazy(() => import('@/pages/app/AlertsPage'));
const PortfolioApp = lazy(() => import('@/pages/app/Portfolio'));
const PortfolioReport = lazy(() => import('@/pages/app/PortfolioReport'));
const ProjectNewApp = lazy(() => import('@/pages/app/ProjectNew'));
const RiskNewApp = lazy(() => import('@/pages/app/RiskNew'));
const DecisionNewApp = lazy(() => import('@/pages/app/DecisionNew'));
const EnvironmentAdmin = lazy(() => import('@/pages/app/EnvironmentAdmin'));
const DocumentsApp = lazy(() => import('@/pages/app/Documents'));
const SettingsApp = lazy(() => import('@/pages/app/Settings'));
// LoginAuth supprimé (doublon de Login.jsx principal)
const RegisterAuth = lazy(() => import('@/pages/auth/Register'));

// Mobile Pages
const MobileLayout = lazy(() => import('@/components/mobile/MobileLayout'));
const MobileCockpit = lazy(() => import('@/pages/mobile/MobileCockpit'));
const MobilePortfolio = lazy(() => import('@/pages/mobile/MobilePortfolio'));
const MobileProject = lazy(() => import('@/pages/mobile/MobileProject'));
const MobileRisks = lazy(() => import('@/pages/mobile/MobileRisks'));
const MobileProfile = lazy(() => import('@/pages/mobile/MobileProfile'));

// Tablet Pages
const TabletLayout = lazy(() => import('@/components/tablet/TabletLayout'));
const TabletCockpit = lazy(() => import('@/pages/tablet/TabletCockpit'));

// Solutions Pages
const SolutionPMO = lazy(() => import('@/pages/solutions/SolutionPMO'));
const SolutionData = lazy(() => import('@/pages/solutions/SolutionData'));
const SolutionGovernance = lazy(() => import('@/pages/solutions/SolutionGovernance'));
const SolutionAutomation = lazy(() => import('@/pages/solutions/SolutionAutomation'));
const SolutionExecutive = lazy(() => import('@/pages/solutions/SolutionExecutive'));
const SolutionTeams = lazy(() => import('@/pages/solutions/SolutionTeams'));

const LoadingFallback = () => (
  <div className="flex h-screen w-full items-center justify-center bg-black">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="h-8 w-8 animate-spin text-[#4A9EFF]" />
      <p className="text-slate-500 text-sm font-medium tracking-widest uppercase">Loading Powalyze OS</p>
    </div>
  </div>
);

const App = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <LanguageProvider>
          <ThemeProvider>
            <Router>
              <ScrollToTop />
              <DeviceRedirect>
                <DesktopLayoutWrapper>
                  <Suspense fallback={<LoadingFallback />}>
                    <Routes>
                {/* Public Website Routes */}
                <Route path="/" element={<LandingPage />} />
                
                {/* New Concrete Pages */}
                {/* <Route path="/plateforme" element={<PlateformePage />} /> */}
                <Route path="/solutions-page" element={<SolutionsPage />} />
                <Route path="/demo-new" element={<DemoPageNew />} />
                
                <Route path="/product" element={<Product />} />
                <Route path="/solutions" element={<Solutions />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/case-studies" element={<CaseStudies />} />
                <Route path="/pmo" element={<PMO />} />
                <Route path="/demo-mode" element={<DemoMode />} />
                <Route path="/decision-engine" element={<DecisionEngine />} />
                {/* <Route path="/about" element={<About />} /> */}
                {/* <Route path="/services" element={<Services />} /> */}
                <Route path="/methode" element={<Methode />} />
                <Route path="/solutions/pmo" element={<SolutionPMO />} />
                <Route path="/services/pmo" element={<SolutionPMO />} />
                <Route path="/services/data" element={<SolutionData />} />
                <Route path="/services/governance" element={<SolutionGovernance />} />
                <Route path="/services/automation" element={<SolutionAutomation />} />
                <Route path="/solutions/executive" element={<SolutionExecutive />} />
                <Route path="/solutions/teams" element={<SolutionTeams />} />
                <Route path="/demo" element={<DemoPage />} />
                <Route path="/consulting" element={<ConsultingAndSaaS />} />
                <Route path="/ai-core" element={<AICore />} />
                {/* Blog supprimé - pas de blog sur le site */}
                {/* New Premium Pages */}
                <Route path="/features" element={<Features />} />
                <Route path="/platform" element={<Platform />} />
                <Route path="/governance" element={<Governance />} />
                <Route path="/scenarios" element={<Scenarios />} />
                <Route path="/onboarding" element={<Onboarding />} />
                
                <Route path="/contact" element={<Contact />} />
                <Route path="/legal" element={<Legal />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogArticle />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/accept-invitation" element={<AcceptInvitation />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<RegisterAuth />} />

                {/* Services Pages */}
                <Route path="/services/pmo-service" element={<PMOService />} />
                <Route path="/services/data-service" element={<DataService />} />
                <Route path="/services/powerbi-service" element={<PowerBIService />} />
                <Route path="/services/saas-service" element={<SaaSService />} />
                <Route path="/services/ia-service" element={<IAService />} />

                {/* Modules Detail Pages */}
                <Route path="/modules/portfolio-manager-detail" element={<PortfolioManagerModule />} />
                <Route path="/modules/executive-dashboard-detail" element={<ExecutiveDashboardModule />} />
                <Route path="/modules/decision-hub-detail" element={<DecisionHubModule />} />
                <Route path="/modules/predictive-intelligence-detail" element={<PredictiveIntelligenceModule />} />

                {/* New Discovery & Legal Routes */}
                <Route path="/discover/pmo-strategique" element={<DiscoverPMOStrategic />} />
                <Route path="/discover/data-powerbi" element={<DiscoverDataPowerBI />} />
                <Route path="/discover/automation-ai" element={<DiscoverAutomationAI />} />
                <Route path="/discover/cockpit-executif" element={<CockpitExecutif />} />
                <Route path="/cgu" element={<CGU />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                
                {/* Value Proposition Pages */}
                <Route path="/vision-claire" element={<VisionClaire />} />
                <Route path="/gouvernance-structuree" element={<GouvernanceStructuree />} />
                <Route path="/prise-decision" element={<PriseDecision />} />
                <Route path="/organisation-alignee" element={<OrganisationAlignee />} />
                <Route path="/resultats-mesurables" element={<ResultatsMesurables />} />
                
                {/* Feature Pages */}
                <Route path="/vision-unifiee" element={<VisionUnifiee />} />
                <Route path="/pilotage-executif" element={<PilotageExecutif />} />
                <Route path="/tracabilite" element={<Tracabilite />} />
                <Route path="/modularite" element={<Modularite />} />
                <Route path="/organisation-alignee" element={<OrganisationAlignee />} />
                <Route path="/resultats-mesurables" element={<ResultatsMesurables />} />

                {/* Premium Module Pages */}
                <Route path="/modules/portfolio-manager" element={<PortfolioManager />} />
                <Route path="/portfolio-manager" element={<PortfolioManager />} />
                <Route path="/modules/cockpit-executif" element={<CockpitExecutifPublic />} />
                <Route path="/executive-dashboard" element={<ExecutiveDashboard />} />
                <Route path="/modules/risk-manager" element={<RiskManager />} />
                <Route path="/app-modules" element={<AppModulesPage />} />
                <Route path="/risk-manager" element={<RiskManager />} />
                <Route path="/modules/powerbi-reports" element={<PowerBIReportsPage />} />
                <Route path="/powerbi-reports" element={<PowerBIReports />} />
                <Route path="/modules/ai-analytics" element={<AIAnalyticsPage />} />
                <Route path="/ai-analytics" element={<AIAnalytics />} />
                <Route path="/modules/performance-monitoring" element={<PerformanceMonitoring />} />
                <Route path="/performance-monitoring" element={<PerformanceMonitoring />} />
                
                {/* About Page */}
                <Route path="/about" element={<About />} />

                {/* SaaS Access Redirects */}
                <Route path="/saas" element={<Navigate to="/signup" replace />} />
                
                {/* Protected App Routes */}
                <Route path="/app" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
                  <Route index element={<Navigate to="/app/cockpit" replace />} />
                  <Route path="cockpit" element={<DashboardSensible />} />
                  <Route path="cockpit-v2" element={<CockpitV2 />} />
                  <Route path="cockpit-14kpis" element={<CockpitPageData />} />
                  {/* cockpit-static supprimé (doublon CockpitPage.jsx) */}
                  <Route path="dashboard-vision" element={<DashboardRevolutionary />} />
                  <Route path="dashboard-sensible" element={<DashboardSensible />} />
                  <Route path="projets-sensible" element={<ProjetsSensible />} />
                  <Route path="portfolio-sensible" element={<PortfolioSensible />} />
                  <Route path="alertes-sensible" element={<AlertesSensible />} />
                  <Route path="equipe-sensible" element={<EquipeSensible />} />
                  <Route path="documents-sensible" element={<DocumentsSensible />} />
                  <Route path="portfolio" element={<PortfolioApp />} />
                  <Route path="projects" element={<ProjectsApp />} />
                  <Route path="projects/new" element={<ProjectNewApp />} />
                  <Route path="documents" element={<DocumentsApp />} />
                  <Route path="settings" element={<SettingsApp />} />
                  <Route path="team" element={<Team />} />
                  <Route path="notifications" element={<Notifications />} />
                  <Route path="messages" element={<Messages />} />
                  <Route path="integrations" element={<Integrations />} />
                  <Route path="powerbi-hub" element={<PowerBIHub />} />
                  <Route path="predictive-intelligence" element={<PredictiveIntelligence />} />
                  <Route path="reports" element={<ReportsHome />} />
                  <Route path="portfolios" element={<PortfolioView />} />
                  <Route path="programs" element={<div>Programmes</div>} />
                  <Route path="committees" element={<CommitteeView />} />
                  <Route path="committees/preparation" element={<div>Préparation comités</div>} />
                  <Route path="committees/history" element={<div>Historique comités</div>} />
                  <Route path="decisions" element={<DecisionsApp />} />
                  <Route path="decisions/new" element={<DecisionNewApp />} />
                  <Route path="actions" element={<div>Actions</div>} />
                  <Route path="impacts" element={<div>Impacts</div>} />
                  <Route path="risks" element={<RisksApp />} />
                  <Route path="risks/new" element={<RiskNewApp />} />
                  <Route path="alerts" element={<AlertsPageApp />} />
                  <Route path="maitrise-risques" element={<MaitriseRisques />} />
                  <Route path="signals" element={<div>Signaux IA</div>} />
                  <Route path="recommendations" element={<div>Recommandations</div>} />
                  <Route path="reporting" element={<PowerBIReports />} />
                  <Route path="kpi" element={<div>KPI</div>} />
                  <Route path="exports" element={<div>Exports</div>} />
                  <Route path="referentials" element={<div>Référentiels</div>} />
                  <Route path="users" element={<Team />} />
                  <Route path="roles" element={<div>Rôles & permissions</div>} />
                  <Route path="audit" element={<AuditLogs />} />
                  <Route path="profile" element={<div>Mon compte</div>} />
                </Route>
                
                {/* V2 ROUTES - New Architecture */}
                <Route path="/dashboard-executive" element={<ProtectedRoute><DashboardExecutiveV2 /></ProtectedRoute>} />
                
                {/* Demo Routes */}
                <Route path="/cockpit-demo" element={<CockpitDemo />} />
                <Route path="/demo-complete" element={<DemoComplete />} />
                <Route path="/demo" element={<DemoComplete />} />
                
                <Route path="/portfolios" element={<ProtectedRoute><PortfoliosListV2 /></ProtectedRoute>} />
                <Route path="/portfolios/:id" element={<ProtectedRoute><PortfolioDetailV2 /></ProtectedRoute>} />
                
                <Route path="/projects-v2" element={<ProtectedRoute><ProjectsListV2 /></ProtectedRoute>} />
                <Route path="/projects-v2/new" element={<ProtectedRoute><ProjectNewV2 /></ProtectedRoute>} />
                <Route path="/projects-v2/:id" element={<ProtectedRoute><ProjectDetailV2 /></ProtectedRoute>} />
                
                {/* Legacy Protected Routes - Redirect to new structure */}
                <Route path="/app/dashboard" element={<Navigate to="/app/cockpit" replace />} />
                <Route path="/app/dashboard-new" element={<Navigate to="/app/cockpit" replace />} />
                <Route path="/app/dashboard-premium" element={<Navigate to="/app/cockpit" replace />} />
                <Route path="/app/projects-new" element={<Navigate to="/app/projects" replace />} />
                <Route path="/app/projects-premium" element={<Navigate to="/app/projects" replace />} />
                <Route path="/app/projects/kanban" element={<ProtectedRoute><ProjectsKanban /></ProtectedRoute>} />
                <Route path="/app/projects/new" element={<ProtectedRoute><ProjectNew /></ProtectedRoute>} />
                <Route path="/app/projects/:id" element={<ProtectedRoute><ProjectDetail /></ProtectedRoute>} />
                <Route path="/app/projects/:id/edit" element={<ProtectedRoute><ProjectEdit /></ProtectedRoute>} />
                <Route path="/app/portfolio" element={<ProtectedRoute><PortfolioOverview /></ProtectedRoute>} />
                <Route path="/app/portfolio-premium" element={<ProtectedRoute><PortfolioPremium /></ProtectedRoute>} />
                <Route path="/app/portfolio/analytics" element={<ProtectedRoute><PortfolioAnalytics /></ProtectedRoute>} />
                <Route path="/app/portfolio/:segment" element={<ProtectedRoute><PortfolioSegment /></ProtectedRoute>} />
                <Route path="/app/workspaces" element={<ProtectedRoute><Workspaces /></ProtectedRoute>} />
                <Route path="/app/workspaces/:id" element={<ProtectedRoute><WorkspaceDetail /></ProtectedRoute>} />
                
                {/* New Governance SaaS Routes */}
                <Route path="/app/portfolio-view" element={<ProtectedRoute><PortfolioView /></ProtectedRoute>} />
                <Route path="/app/committees" element={<ProtectedRoute><CommitteeView /></ProtectedRoute>} />
                <Route path="/app/committees/:id" element={<ProtectedRoute><CommitteeView /></ProtectedRoute>} />
                <Route path="/app/decisions" element={<ProtectedRoute><DecisionHub /></ProtectedRoute>} />
                <Route path="/app/decisions/:id" element={<ProtectedRoute><DecisionHub /></ProtectedRoute>} />
                <Route path="/app/risk-intelligence" element={<ProtectedRoute><RiskIntelligence /></ProtectedRoute>} />
                
                <Route path="/app/predictive-intelligence" element={<ProtectedRoute><PredictiveIntelligence /></ProtectedRoute>} />
                <Route path="/app/reports" element={<ProtectedRoute><ReportsList /></ProtectedRoute>} />
                <Route path="/app/reports/powerbi" element={<ProtectedRoute><ReportsHome /></ProtectedRoute>} />
                <Route path="/app/report-builder" element={<ProtectedRoute><ReportBuilder /></ProtectedRoute>} />
                <Route path="/app/report-detail/:id" element={<ProtectedRoute><ReportViewer /></ProtectedRoute>} />
                <Route path="/app/reports/:id" element={<ProtectedRoute><ReportViewer /></ProtectedRoute>} />
                <Route path="/app/reports/builder" element={<ProtectedRoute><ReportBuilder /></ProtectedRoute>} />
                <Route path="/app/reports/legacy" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
                <Route path="/app/reports/portfolio" element={<ProtectedRoute><PortfolioReport /></ProtectedRoute>} />
                <Route path="/app/powerbi" element={<ProtectedRoute><PowerBIReports /></ProtectedRoute>} />
                <Route path="/app/powerbi/:id" element={<ProtectedRoute><PowerBIReportViewer /></ProtectedRoute>} />
                <Route path="/app/alerts" element={<ProtectedRoute><Alerts /></ProtectedRoute>} />
                <Route path="/app/risks" element={<ProtectedRoute><RiskHeatmap /></ProtectedRoute>} />
                <Route path="/app/risk-heatmap" element={<ProtectedRoute><RiskHeatmap /></ProtectedRoute>} />
                <Route path="/app/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
                <Route path="/app/documents" element={<ProtectedRoute><Documents /></ProtectedRoute>} />
                <Route path="/app/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
                <Route path="/app/analytics-hub" element={<ProtectedRoute><AnalyticsHub /></ProtectedRoute>} />
                <Route path="/app/decision-room" element={<ProtectedRoute><DecisionRoom /></ProtectedRoute>} />
                <Route path="/app/theater" element={<ProtectedRoute><TheaterPage /></ProtectedRoute>} />
                <Route path="/app/executive-hub" element={<ProtectedRoute><ExecutiveHub /></ProtectedRoute>} />
                <Route path="/app/insight-command-center" element={<ProtectedRoute><InsightCommandCenter /></ProtectedRoute>} />
                <Route path="/app/how-it-works" element={<HowItWorks />} />
                <Route path="/app/pitch-deck" element={<PitchDeck />} />
                <Route path="/app/powerbi-hub" element={<ProtectedRoute><PowerBIHub /></ProtectedRoute>} />
                <Route path="/app/integrations" element={<ProtectedRoute><Integrations /></ProtectedRoute>} />
                <Route path="/app/connectors" element={<ProtectedRoute><Connectors /></ProtectedRoute>} />
                <Route path="/app/custom-dashboard" element={<ProtectedRoute><CustomDashboard /></ProtectedRoute>} />
                <Route path="/app/admin" element={<ProtectedRoute requiredRole="Admin"><Admin /></ProtectedRoute>} />
                <Route path="/app/admin/environments" element={<ProtectedRoute><EnvironmentAdmin /></ProtectedRoute>} />
                <Route path="/app/system-health" element={<ProtectedRoute requiredRole="Admin"><SystemHealth /></ProtectedRoute>} />
                <Route path="/app/audit" element={<ProtectedRoute requiredRole="Admin"><AuditLogs /></ProtectedRoute>} />
                <Route path="/app/team" element={<ProtectedRoute><Team /></ProtectedRoute>} />
                <Route path="/app/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                <Route path="/app/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
                <Route path="/app/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
                
                {/* Mobile Routes */}
                <Route path="/mobile" element={<ProtectedRoute><MobileLayout /></ProtectedRoute>}>
                  <Route index element={<Navigate to="/mobile/cockpit" replace />} />
                  <Route path="cockpit" element={<MobileCockpit />} />
                  <Route path="portfolio" element={<MobilePortfolio />} />
                  <Route path="project/:id" element={<MobileProject />} />
                  <Route path="risks" element={<MobileRisks />} />
                  <Route path="profile" element={<MobileProfile />} />
                </Route>

                {/* Tablet Routes */}
                <Route path="/tablet" element={<ProtectedRoute><TabletLayout /></ProtectedRoute>}>
                  <Route index element={<Navigate to="/tablet/cockpit" replace />} />
                  <Route path="cockpit" element={<TabletCockpit />} />
                  <Route path="portfolio" element={<Navigate to="/tablet/cockpit" />} />
                  <Route path="analytics" element={<Navigate to="/tablet/cockpit" />} />
                  <Route path="risks" element={<Navigate to="/tablet/cockpit" />} />
                  <Route path="profile" element={<Navigate to="/tablet/cockpit" />} />
                </Route>
                
                {/* Catch-all Redirect */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </DesktopLayoutWrapper>
        </DeviceRedirect>
        <Toaster />
      </Router>
    </ThemeProvider>
  </LanguageProvider>
</AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
