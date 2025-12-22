import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Spinner } from '@/shared/components/ui/Spinner';
import WorkspaceLayout from '@/features/workspace/components/WorkspaceLayout';
import AdminLayout from '@/features/admin/components/AdminLayout';

const HomePage = lazy(() => import('@/pages/Home'));
const SignupPage = lazy(() => import('@/pages/SignupPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const PMOStrategiquePage = lazy(() => import('@/pages/services/PMOStrategiquePage'));
const AutomatisationIAPage = lazy(() => import('@/pages/services/AutomatisationIAPage'));
const DashboardPagePro = lazy(() => import('@/features/workspace/pages/DashboardPage'));
const ProjectsPagePro = lazy(() => import('@/features/projects/pages/ProjectsPage'));
const TasksPagePro = lazy(() => import('@/features/tasks/pages/TasksPage'));
const DocumentsPagePro = lazy(() => import('@/features/documents/pages/DocumentsPage'));
const IntegrationsPagePro = lazy(() => import('@/features/integrations/pages/IntegrationsPage'));
const DashboardPageAdmin = lazy(() => import('@/features/admin/pages/DashboardPage'));
const ProjectsPageAdmin = lazy(() => import('@/features/admin/pages/ProjectsPage'));
const TasksPageAdmin = lazy(() => import('@/features/admin/pages/TasksPage'));
const AnalyticsPageAdmin = lazy(() => import('@/features/admin/pages/AnalyticsPage'));
const UsersPageAdmin = lazy(() => import('@/features/admin/pages/UsersPage'));
const IntegrationsPageAdmin = lazy(() => import('@/features/admin/pages/IntegrationsPage'));
const AuditPageAdmin = lazy(() => import('@/features/admin/pages/AuditPage'));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-neutral-975">
    <Spinner size="lg" />
  </div>
);

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services/pmo-strategique" element={<PMOStrategiquePage />} />
        <Route path="/services/automatisation-ia" element={<AutomatisationIAPage />} />
        <Route path="/espace-pro" element={<WorkspaceLayout workspaceType="pro" />}>
          <Route index element={<Navigate to="/espace-pro/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPagePro />} />
          <Route path="projets" element={<ProjectsPagePro />} />
          <Route path="taches" element={<TasksPagePro />} />
          <Route path="documents" element={<DocumentsPagePro />} />
          <Route path="connecteurs" element={<IntegrationsPagePro />} />
        </Route>
        <Route path="/espace-admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/espace-admin/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPageAdmin />} />
          <Route path="projets" element={<ProjectsPageAdmin />} />
          <Route path="taches" element={<TasksPageAdmin />} />
          <Route path="analytics" element={<AnalyticsPageAdmin />} />
          <Route path="utilisateurs" element={<UsersPageAdmin />} />
          <Route path="connecteurs" element={<IntegrationsPageAdmin />} />
          <Route path="audit" element={<AuditPageAdmin />} />
        </Route>
        <Route path="/espace-client/*" element={<Navigate to="/espace-pro/dashboard" replace />} />
        <Route path="/client/*" element={<Navigate to="/espace-pro/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
