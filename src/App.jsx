import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Spinner } from './components/ui/spinner';

// Layouts
import WorkspaceLayout from './pages/EspacePro/WorkspaceLayout';
import EspaceAdminLayout from './pages/EspaceAdmin/AdminLayout';
import AdminLayout from './pages/Admin/AdminLayout';

// Public Pages
const HomePage = lazy(() => import('./pages/Home'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));

// Service Pages
const ServicesPage = lazy(() => import('./pages/services/ServicesPage'));
const PmoGovernance = lazy(() => import('./pages/services/PmoGovernance'));
const PmoOperations = lazy(() => import('./pages/services/PmoOperations'));
const PmoStrategy = lazy(() => import('./pages/services/PmoStrategy'));
const PmoAudit = lazy(() => import('./pages/services/PmoAudit'));
const PmoImplementation = lazy(() => import('./pages/services/PmoImplementation'));
const PilotageITPage = lazy(() => import('./pages/services/PilotageITPage'));
const PMOStrategiquePage = lazy(() => import('./pages/services/PMOStrategiquePage'));
const DataPowerBIPage = lazy(() => import('./pages/services/DataPowerBIPage'));
const AutomatisationIAPage = lazy(() => import('./pages/services/AutomatisationIAPage'));
const PortefeuillesPriorisationPage = lazy(() => import('./pages/services/PortefeuillesPriorisationPage'));
const ReportingExecutifPage = lazy(() => import('./pages/services/ReportingExecutifPage'));

// Dashboard Pages (NEW - /dashboard)
const DashboardMain = lazy(() => import('./pages/Dashboard/DashboardMain'));
const DashboardProjectDetail = lazy(() => import('./pages/Dashboard/DashboardProjectDetail'));
const DashboardSettings = lazy(() => import('./pages/Dashboard/DashboardSettings'));

// Espace Pro Pages (Portail Utilisateur)
const DashboardPagePro = lazy(() => import('./pages/EspacePro/DashboardPage'));
const ProjectsPagePro = lazy(() => import('./pages/EspacePro/ProjectsPage'));
const NouveauProjet = lazy(() => import('./pages/EspacePro/NouveauProjet'));
const DocumentsPagePro = lazy(() => import('./pages/EspacePro/DocumentsPage'));
const PowerBIPagePro = lazy(() => import('./pages/EspacePro/PowerBIPage'));
const PowerBIDemoPage = lazy(() => import('./pages/EspacePro/PowerBIDemoPage'));
const CalendrierPagePro = lazy(() => import('./pages/EspacePro/CalendrierPage'));
const EquipePagePro = lazy(() => import('./pages/EspacePro/EquipePage'));
const TachesPagePro = lazy(() => import('./pages/EspacePro/TachesPage'));
const RapportsPagePro = lazy(() => import('./pages/EspacePro/RapportsPage'));
const ParametresPagePro = lazy(() => import('./pages/EspacePro/ParametresPage'));
const ConnecteursPagePro = lazy(() => import('./pages/EspacePro/ConnecteursPage'));
const NotificationsPagePro = lazy(() => import('./pages/EspacePro/NotificationsPage'));
const ProfilPagePro = lazy(() => import('./pages/EspacePro/ProfilPage'));

// Admin Portal Pages (Portail Admin pour Powalyze)
const DashboardPageAdmin = lazy(() => import('./pages/Admin/DashboardPage'));
const UsersPageAdmin = lazy(() => import('./pages/Admin/UsersPage'));
const OrganizationsPageAdmin = lazy(() => import('./pages/Admin/OrganizationsPage'));
const ProjectsPageAdmin = lazy(() => import('./pages/Admin/ProjectsPage'));
const SettingsPageAdmin = lazy(() => import('./pages/Admin/SettingsPage'));

// Espace Admin Pages (Legacy - à supprimer après migration)
const DashboardPageEspaceAdmin = lazy(() => import('./pages/EspaceAdmin/DashboardPage'));
const ProjectsPageEspaceAdmin = lazy(() => import('./pages/EspaceAdmin/ProjectsPage'));
const AnalyticsPageEspaceAdmin = lazy(() => import('./pages/EspaceAdmin/AnalyticsPage'));
const UsersPageEspaceAdmin = lazy(() => import('./pages/EspaceAdmin/UsersPage'));
const AuditPageEspaceAdmin = lazy(() => import('./pages/EspaceAdmin/AuditPage'));
const TachesPageEspaceAdmin = lazy(() => import('./pages/EspaceAdmin/TachesPage'));
const ConnecteursPageEspaceAdmin = lazy(() => import('./pages/EspaceAdmin/ConnecteursPage'));
const ParametresPageEspaceAdmin = lazy(() => import('./pages/EspaceAdmin/ParametresPage'));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-[#0A0A0A]">
    <Spinner size="lg" />
  </div>
);

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/contact" element={<ContactPage />} />
        
        {/* Service Pages */}
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/pmo-governance" element={<PmoGovernance />} />
        <Route path="/services/pmo-operations" element={<PmoOperations />} />
        <Route path="/services/pmo-strategy" element={<PmoStrategy />} />
        <Route path="/services/pmo-audit" element={<PmoAudit />} />
        <Route path="/services/pmo-implementation" element={<PmoImplementation />} />
        <Route path="/services/pilotage-it" element={<PilotageITPage />} />
        <Route path="/services/pmo-strategique" element={<PMOStrategiquePage />} />
        <Route path="/services/data-powerbi" element={<DataPowerBIPage />} />
        <Route path="/services/automatisation-ia" element={<AutomatisationIAPage />} />
        <Route path="/services/portefeuilles-priorisation" element={<PortefeuillesPriorisationPage />} />
        <Route path="/services/reporting-executif" element={<ReportingExecutifPage />} />
        
        {/* DASHBOARD ROUTES (NEW - /dashboard) */}
        <Route path="/dashboard" element={<DashboardMain />} />
        <Route path="/dashboard/projet/:projectId" element={<DashboardProjectDetail />} />
        <Route path="/dashboard/projet/:projectId/settings" element={<DashboardSettings />} />
        
        {/* NOUVEAU PORTAIL ADMIN (/admin) - Pour la société Powalyze */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPageAdmin />} />
          <Route path="utilisateurs" element={<UsersPageAdmin />} />
          <Route path="organisations" element={<OrganizationsPageAdmin />} />
          <Route path="projets" element={<ProjectsPageAdmin />} />
          <Route path="parametres" element={<SettingsPageAdmin />} />
        </Route>
        
        {/* PORTAIL UTILISATEUR (/espace-pro) - Pour les clients/équipes */}
        <Route path="/espace-pro" element={<WorkspaceLayout />}>
          <Route index element={<Navigate to="/espace-pro/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPagePro />} />
          <Route path="projets" element={<ProjectsPagePro />} />
          <Route path="projets/nouveau" element={<NouveauProjet />} />
          <Route path="documents" element={<DocumentsPagePro />} />
          <Route path="power-bi" element={<PowerBIPagePro />} />
          <Route path="power-bi-demo" element={<PowerBIDemoPage />} />
          <Route path="calendrier" element={<CalendrierPagePro />} />
          <Route path="equipe" element={<EquipePagePro />} />
          <Route path="taches" element={<TachesPagePro />} />
          <Route path="rapports" element={<RapportsPagePro />} />
          <Route path="parametres" element={<ParametresPagePro />} />
          <Route path="connecteurs" element={<ConnecteursPagePro />} />
          <Route path="notifications" element={<NotificationsPagePro />} />
          <Route path="profil" element={<ProfilPagePro />} />
        </Route>
        
        {/* Legacy Espace Admin Routes (à migrer vers /admin) */}
        <Route path="/espace-admin" element={<EspaceAdminLayout />}>
          <Route index element={<Navigate to="/espace-admin/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPageEspaceAdmin />} />
          <Route path="projets" element={<ProjectsPageEspaceAdmin />} />
          <Route path="analytics" element={<AnalyticsPageEspaceAdmin />} />
          <Route path="utilisateurs" element={<UsersPageEspaceAdmin />} />
          <Route path="audit" element={<AuditPageEspaceAdmin />} />
          <Route path="taches" element={<TachesPageEspaceAdmin />} />
          <Route path="connecteurs" element={<ConnecteursPageEspaceAdmin />} />
          <Route path="parametres" element={<ParametresPageEspaceAdmin />} />
        </Route>
        
        {/* Legacy Redirects */}
        <Route path="/espace-client" element={<Navigate to="/espace-pro/dashboard" replace />} />
        <Route path="/espace-client/projets" element={<Navigate to="/espace-pro/projets" replace />} />
        <Route path="/espace-client/projets/nouveau" element={<Navigate to="/espace-pro/projets/nouveau" replace />} />
        <Route path="/espace-client/taches" element={<Navigate to="/espace-pro/taches" replace />} />
        <Route path="/espace-client/*" element={<Navigate to="/espace-pro/dashboard" replace />} />
        <Route path="/client/space" element={<Navigate to="/espace-pro/dashboard" replace />} />
        <Route path="/client/*" element={<Navigate to="/espace-pro/dashboard" replace />} />
        
        {/* 404 Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
