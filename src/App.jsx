
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { DemoModeProvider } from '@/context/DemoModeContext';
import { AzureAdProvider } from '@/context/AzureAdContext';
import { SettingsProvider } from '@/context/SettingsContext';
import { ProjectProvider } from '@/context/ProjectContext';
import { ConsultationProvider } from '@/context/ConsultationContext';
import { BlogProvider } from '@/context/BlogContext';
import { AppointmentProvider } from '@/context/AppointmentContext';
import { Toaster } from '@/components/ui/toaster';
import { Loader2 } from 'lucide-react';
import LiveChat from '@/components/ui/LiveChat';
import AnalyticsListener from '@/components/AnalyticsListener';
import CookieBanner from '@/components/CookieBanner';
import AuthGuard from '@/components/AuthGuard';
import ErrorBoundary from '@/components/ErrorBoundary';
import ErrorFallback from '@/components/ErrorFallback';
import SkipLink from '@/components/Accessibility/SkipLink';

// Eager load critical pages
import Home from '@/pages/Home';

// Lazy load Pages
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const FAQPage = lazy(() => import('@/pages/FAQPage'));
const BlogPage = lazy(() => import('@/pages/Blog/BlogPage'));
const BlogPostReader = lazy(() => import('@/pages/Blog/BlogPostReader'));
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'));
const RGPDPage = lazy(() => import('@/pages/RGPDPage'));
const TermsPage = lazy(() => import('@/pages/TermsPage'));
const ConfidentialityPage = lazy(() => import('@/pages/ConfidentialityPage'));
const LegalNotice = lazy(() => import('@/pages/LegalNotice'));
const CookiePolicy = lazy(() => import('@/pages/CookiePolicy'));
const PMOSolutionPage = lazy(() => import('@/pages/PMOSolutionPage')); 
const AppointmentBooking = lazy(() => import('@/pages/AppointmentBooking'));

// Services
const ServicesPage = lazy(() => import('@/pages/ServicesPage'));
const PilotageITPage = lazy(() => import('@/pages/Services/PilotageIT'));
const PMOStrategiquePage = lazy(() => import('@/pages/Services/StrategicPMO'));
const DataPowerBIPage = lazy(() => import('@/pages/Services/DataPowerBIPage'));
const AutomationIAPage = lazy(() => import('@/pages/Services/AutomationAI'));
const PortfolioPage = lazy(() => import('@/pages/Services/PortfolioPage'));
const ExecutiveReportingPage = lazy(() => import('@/pages/Services/ExecutiveReporting'));
const GovernanceRiskPage = lazy(() => import('@/pages/Services/GovernanceRisk'));

// Client Portal (New)
const ClientPortalLayout = lazy(() => import('@/pages/ClientPortal/ClientPortalLayout'));
const ClientDashboard = lazy(() => import('@/pages/ClientPortal/DashboardPage'));
const ClientProjects = lazy(() => import('@/pages/ClientPortal/ProjectsPage'));
const ClientProjectDetails = lazy(() => import('@/pages/ClientPortal/ProjectDetailsPage'));
const ClientDocuments = lazy(() => import('@/pages/ClientPortal/DocumentsPage'));
const ClientConnectors = lazy(() => import('@/pages/ClientPortal/ConnectorsPage'));
const ClientProfile = lazy(() => import('@/pages/ClientPortal/ProfilePage'));
const ClientSettings = lazy(() => import('@/pages/ClientPortal/SettingsPage'));
const AppointmentManagement = lazy(() => import('@/pages/ClientPortal/AppointmentManagement'));
const RescheduleAppointment = lazy(() => import('@/pages/ClientPortal/RescheduleAppointment'));
const CancelAppointment = lazy(() => import('@/pages/ClientPortal/CancelAppointment'));

// Auth
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const SignupPage = lazy(() => import('@/pages/SignupPage'));
const ForgotPasswordPage = lazy(() => import('@/pages/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('@/pages/ResetPasswordPage'));
const EmailVerificationPage = lazy(() => import('@/pages/Auth/EmailVerificationPage'));
const VerifyEmailTokenPage = lazy(() => import('@/pages/Auth/VerifyEmailTokenPage'));
const TwoFactorAuthLoginPage = lazy(() => import('@/pages/Auth/TwoFactorAuthLoginPage'));
const BackupCodesPage = lazy(() => import('@/pages/Auth/BackupCodesPage'));
const OAuthCallback = lazy(() => import('@/pages/auth/OAuthCallback'));

// Demos
const PMOExecutiveDashboardDemoPage = lazy(() => import('@/pages/PMOExecutiveDashboardDemoPage'));
const PMODemoPage = lazy(() => import('@/pages/PMODemoPage'));
const ProtectedPMODemoPage = lazy(() => import('@/pages/ProtectedPMODemoPage'));
const ProtectedExecutiveReportingDemoPage = lazy(() => import('@/pages/ProtectedExecutiveReportingDemoPage'));
const PowerBIAdvancedPage = lazy(() => import('@/pages/PowerBIAdvancedPage'));
const PortfolioShowcasePage = lazy(() => import('@/pages/PortfolioPage'));
const CaseStudyDetail = lazy(() => import('@/pages/portfolio/CaseStudyDetail'));
const FinancialReportPage = lazy(() => import('@/pages/FinancialReportPage'));
const InteractivePreviewPage = lazy(() => import('@/pages/InteractivePreviewPage'));
const ExecutiveDashboardPage = lazy(() => import('@/pages/ExecutiveDashboardPage'));
const LiveDemoPage = lazy(() => import('@/pages/LiveDemoPage'));
const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
const PowerBIEmbedPage = lazy(() => import('@/pages/PowerBIEmbedPage'));

// Admin
const ConsultationAdminPage = lazy(() => import('@/pages/Admin/ConsultationAdminPage'));
const ConsultationStatisticsPage = lazy(() => import('@/pages/Admin/ConsultationStatisticsPage'));

const PageLoader = () => (
  <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
    <Loader2 className="h-10 w-10 animate-spin text-[#BFA76A]" />
  </div>
);

const AppRoutes = () => {
  return (
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/about" element={<AboutPage />} />
         <Route path="/a-propos" element={<AboutPage />} />
         <Route path="/contact" element={<ContactPage />} />
         <Route path="/appointment-booking" element={<AppointmentBooking />} />
         
         {/* Auth */}
         <Route path="/login" element={<LoginPage />} />
         <Route path="/signup" element={<SignupPage />} />
         <Route path="/forgot-password" element={<ForgotPasswordPage />} />
         <Route path="/reset-password" element={<ResetPasswordPage />} />
         <Route path="/email-verification" element={<EmailVerificationPage />} />
         <Route path="/verify-email/:token" element={<VerifyEmailTokenPage />} />
         <Route path="/2fa-login" element={<TwoFactorAuthLoginPage />} />
         <Route path="/backup-codes" element={<BackupCodesPage />} />
         <Route path="/auth/callback" element={<OAuthCallback />} />
         
         {/* Client Portal (New) */}
         <Route path="/espace-client" element={<AuthGuard><ClientPortalLayout /></AuthGuard>}>
            <Route index element={<ClientDashboard />} />
            <Route path="projets" element={<ClientProjects />} />
            <Route path="projets/:id" element={<ClientProjectDetails />} />
            <Route path="documents" element={<ClientDocuments />} />
            <Route path="connecteurs" element={<ClientConnectors />} />
            <Route path="profil" element={<ClientProfile />} />
            <Route path="parametres" element={<ClientSettings />} />
            <Route path="appointments" element={<AppointmentManagement />} />
            <Route path="reschedule/:id" element={<RescheduleAppointment />} />
            <Route path="cancel/:id" element={<CancelAppointment />} />
         </Route>

         {/* Public Content */}
         <Route path="/services" element={<ServicesPage />} />
         <Route path="/services/pilotage-it" element={<PilotageITPage />} />
         <Route path="/services/pmo-strategique" element={<PMOStrategiquePage />} />
         <Route path="/services/strategic-pmo" element={<PMOStrategiquePage />} />
         <Route path="/services/business-intelligence" element={<DataPowerBIPage />} />
         <Route path="/services/data-power-bi" element={<DataPowerBIPage />} />
         <Route path="/services/data-analytics" element={<DataPowerBIPage />} />
         <Route path="/services/automation-ai" element={<AutomationIAPage />} />
         <Route path="/services/digital-transformation" element={<AutomationIAPage />} />
         <Route path="/services/automatisation-ia" element={<AutomationIAPage />} />
         <Route path="/services/portefeuilles-priorisation" element={<PortfolioPage />} />
         <Route path="/services/reporting-executif" element={<ExecutiveReportingPage />} />
         <Route path="/services/pmo-governance" element={<PMOStrategiquePage />} />
         <Route path="/services/governance-risk" element={<GovernanceRiskPage />} />
         <Route path="/services/pilotage-programmes" element={<GovernanceRiskPage />} />
         
         {/* Solutions */}
         <Route path="/pmo-solution" element={<PMOSolutionPage />} />

         {/* Demos */}
         <Route path="/pmo-demo" element={<PMODemoPage />} />
         <Route path="/pmo-protected-demo" element={<AuthGuard><ProtectedPMODemoPage /></AuthGuard>} />
         <Route path="/pmo-360-demo" element={<PMOExecutiveDashboardDemoPage />} />
         <Route path="/reporting-protected-demo" element={<AuthGuard><ProtectedExecutiveReportingDemoPage /></AuthGuard>} />
         <Route path="/financial-report" element={<FinancialReportPage />} />
         <Route path="/interactive-preview" element={<InteractivePreviewPage />} />
         <Route path="/executive-dashboard" element={<ExecutiveDashboardPage />} />
         <Route path="/live-demo" element={<LiveDemoPage />} />
         <Route path="/power-bi-advanced" element={<PowerBIAdvancedPage />} />
         <Route path="/dashboard" element={<AuthGuard><DashboardPage /></AuthGuard>} />
         <Route path="/powerbi-embed-page" element={<AuthGuard><PowerBIEmbedPage /></AuthGuard>} />

         {/* Content Pages */}
         <Route path="/blog" element={<BlogPage />} />
         <Route path="/blog/:slug" element={<BlogPostReader />} />
         <Route path="/consultation-confirmation" element={<ContactPage />} />
         <Route path="/faq" element={<FAQPage />} />
         <Route path="/portfolio" element={<PortfolioShowcasePage />} />
         <Route path="/portfolio/:id" element={<CaseStudyDetail />} />

         {/* Legal */}
         <Route path="/rgpd" element={<RGPDPage />} />
         <Route path="/confidentialite" element={<ConfidentialityPage />} />
         <Route path="/terms" element={<TermsPage />} />
         <Route path="/privacy-policy" element={<PrivacyPolicy />} />
         <Route path="/legal-notice" element={<LegalNotice />} />
         <Route path="/cookie-policy" element={<CookiePolicy />} />
         <Route path="/terms-and-conditions" element={<TermsPage />} />

         {/* Admin */}
         <Route path="/admin/consultations" element={<AuthGuard requireAdmin={true}><ConsultationAdminPage /></AuthGuard>} />
         <Route path="/admin/statistics" element={<AuthGuard requireAdmin={true}><ConsultationStatisticsPage /></AuthGuard>} />

         <Route path="*" element={<Home />} />
      </Routes>
  );
};

const App = () => (
  <React.StrictMode>
    <ErrorBoundary fallback={<ErrorFallback />}>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <AzureAdProvider>
              <DemoModeProvider>
                <SettingsProvider>
                  <ProjectProvider>
                    <ConsultationProvider>
                      <BlogProvider>
                        <AppointmentProvider>
                           {(() => {
                             const UseHash = import.meta.env.VITE_USE_HASH_ROUTER === 'true';
                             const RouterImpl = UseHash ? HashRouter : BrowserRouter;
                             return (
                               <RouterImpl>
                                 <AnalyticsListener />
                                 <SkipLink />
                                 <div id="main-content">
                                   <Suspense fallback={<PageLoader />}>
                                      <AppRoutes />
                                   </Suspense>
                                 </div>
                                 <CookieBanner />
                                 <LiveChat />
                                 <Toaster />
                               </RouterImpl>
                             );
                           })()}
                        </AppointmentProvider>
                      </BlogProvider>
                    </ConsultationProvider>
                  </ProjectProvider>
                </SettingsProvider>
              </DemoModeProvider>
            </AzureAdProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

export default App;
