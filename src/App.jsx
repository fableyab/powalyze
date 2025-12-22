import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Spinner } from '@/shared/components/ui/Spinner';
import WorkspaceLayout from '@/features/workspace/components/WorkspaceLayout';

const DashboardPage = lazy(() => import('@/features/workspace/pages/DashboardPage'));
const ProjectsPage = lazy(() => import('@/features/projects/pages/ProjectsPage'));
const TasksPage = lazy(() => import('@/features/tasks/pages/TasksPage'));
const DocumentsPage = lazy(() => import('@/features/documents/pages/DocumentsPage'));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-neutral-975">
    <Spinner size="lg" />
  </div>
);

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Navigate to="/espace-client/dashboard" replace />} />
        <Route path="/espace-client" element={<WorkspaceLayout />}>
          <Route index element={<Navigate to="/espace-client/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="projets" element={<ProjectsPage />} />
          <Route path="taches" element={<TasksPage />} />
          <Route path="documents" element={<DocumentsPage />} />
        </Route>
        <Route path="/client/*" element={<Navigate to="/espace-client/dashboard" replace />} />
        <Route path="/pmo-*" element={<Navigate to="/espace-client/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/espace-client/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;