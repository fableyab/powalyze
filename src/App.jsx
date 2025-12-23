import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Spinner } from '@/components/ui/spinner';

// Layouts
import WorkspaceLayout from './pages/EspacePro/WorkspaceLayout';
import AdminLayout from './pages/EspaceAdmin/AdminLayout';

// Public Pages
const HomePage = lazy(() => import('./pages/Home'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PMOStrategiquePage = lazy(() => import('./pages/services/PMOStrategiquePage'));
const AutomatisationIAPage = lazy(() => import('./pages/services/AutomatisationIAPage'));

// Espace Pro Pages
const DashboardPagePro = lazy(() => import('./pages/EspacePro/DashboardPage'));
const ProjectsPagePro = lazy(() => import('./pages/EspacePro/ProjectsPage'));
const DocumentsPagePro = lazy(() => import('./pages/EspacePro/DocumentsPage'));
const PowerBIPagePro = lazy(() => import('./pages/EspacePro/PowerBIPage'));

// Espace Admin Pages
const DashboardPageAdmin = lazy(() => import('./pages/EspaceAdmin/DashboardPage'));
const ProjectsPageAdmin = lazy(() => import('./pages/EspaceAdmin/ProjectsPage'));
const AnalyticsPageAdmin = lazy(() => import('./pages/EspaceAdmin/AnalyticsPage'));
const UsersPageAdmin = lazy(() => import('./pages/EspaceAdmin/UsersPage'));
const AuditPageAdmin = lazy(() => import('./pages/EspaceAdmin/AuditPage'));

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
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services/pmo-strategique" element={<PMOStrategiquePage />} />
        <Route path="/services/automatisation-ia" element={<AutomatisationIAPage />} />
        
        {/* Espace Pro Routes */}
        <Route path="/espace-pro" element={<WorkspaceLayout />}>
          <Route index element={<Navigate to="/espace-pro/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPagePro />} />
          <Route path="projets" element={<ProjectsPagePro />} />
          <Route path="documents" element={<DocumentsPagePro />} />
          <Route path="power-bi" element={<PowerBIPagePro />} />
        </Route>
        
        {/* Espace Admin Routes */}
        <Route path="/espace-admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/espace-admin/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPageAdmin />} />
          <Route path="projets" element={<ProjectsPageAdmin />} />
          <Route path="analytics" element={<AnalyticsPageAdmin />} />
          <Route path="utilisateurs" element={<UsersPageAdmin />} />
          <Route path="audit" element={<AuditPageAdmin />} />
        </Route>
        
        {/* Legacy Redirects */}
        <Route path="/espace-client" element={<Navigate to="/espace-pro/power-bi" replace />} />
        <Route path="/espace-client/*" element={<Navigate to="/espace-pro/power-bi" replace />} />
        <Route path="/client/*" element={<Navigate to="/espace-pro/dashboard" replace />} />
        
        {/* 404 Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
