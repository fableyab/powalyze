import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages publiques (landing)
import Home from './pages/Home';
import Login from './pages/Login';

// Pages workspace (espace client)
import Dashboard from './pages/workspace/Dashboard';
import Projects from './pages/workspace/Projects';
import Tasks from './pages/workspace/Tasks';
import Team from './pages/workspace/Team';
import Calendar from './pages/workspace/Calendar';
import Reports from './pages/workspace/Reports';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import WorkspaceLayout from './layouts/WorkspaceLayout';

// Route protégée
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Routes publiques */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
      </Route>

      {/* Routes workspace protégées */}
      <Route
        path="/workspace"
        element={
          <ProtectedRoute>
            <WorkspaceLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="projects" element={<Projects />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="team" element={<Team />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="reports" element={<Reports />} />
      </Route>

      {/* Anciennes routes pour compatibilité */}
      <Route path="/pmo-workspace" element={<Navigate to="/workspace" replace />} />
      <Route path="/pmo-projects" element={<Navigate to="/workspace/projects" replace />} />
      <Route path="/pmo-tasks" element={<Navigate to="/workspace/tasks" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
