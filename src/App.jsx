import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import FabriceFaysSite from './components/FabriceFaysSite';

// PMO Pages
import PMOWorkspacePage from './pages/pmo-workspace';
import PMOProjectsPage from './pages/pmo-projects';
import PMOTasksPage from './pages/pmo-tasks';
import PMOCalendarPage from './pages/pmo-calendar';
import PMOTeamPage from './pages/pmo-team';
import PMOReportsPage from './pages/pmo-reports';
import PMOSettingsPage from './pages/pmo-settings';

// Client Portal
import ClientPortalLayout from './pages/ClientPortal/ClientPortalLayout';

function App() {
  return (
    <Routes>
      {/* Site principal Fabrice Fays */}
      <Route path="/" element={<FabriceFaysSite />} />
      
      {/* PMO Dashboard - avec layout */}
      <Route path="/pmo/*" element={
        <MainLayout>
          <Routes>
            <Route path="workspace" element={<PMOWorkspacePage />} />
            <Route path="projects" element={<PMOProjectsPage />} />
            <Route path="tasks" element={<PMOTasksPage />} />
            <Route path="calendar" element={<PMOCalendarPage />} />
            <Route path="team" element={<PMOTeamPage />} />
            <Route path="reports" element={<PMOReportsPage />} />
            <Route path="settings" element={<PMOSettingsPage />} />
          </Routes>
        </MainLayout>
      } />

      {/* Routes PMO legacy */}
      <Route path="/pmo-workspace" element={<MainLayout><PMOWorkspacePage /></MainLayout>} />
      <Route path="/pmo-projects" element={<MainLayout><PMOProjectsPage /></MainLayout>} />
      <Route path="/pmo-tasks" element={<MainLayout><PMOTasksPage /></MainLayout>} />
      <Route path="/pmo-calendar" element={<MainLayout><PMOCalendarPage /></MainLayout>} />
      <Route path="/pmo-team" element={<MainLayout><PMOTeamPage /></MainLayout>} />
      <Route path="/pmo-reports" element={<MainLayout><PMOReportsPage /></MainLayout>} />
      <Route path="/pmo-settings" element={<MainLayout><PMOSettingsPage /></MainLayout>} />
      
      {/* Client Portal */}
      <Route path="/client/*" element={<ClientPortalLayout />} />
    </Routes>
  );
}

export default App;
