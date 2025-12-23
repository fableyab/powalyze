import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { PMODataProvider } from './contexts/PMODataContext';
import { AuthProvider } from './contexts/AuthContext';
import { ClientProvider } from './contexts/ClientContext';
import { DocumentsProvider } from './contexts/DocumentsContext';
import { ProjectsProvider } from './contexts/ProjectsContext';
import { TasksProvider } from './contexts/TasksContext';
import { DashboardProvider } from './contexts/DashboardContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PMODataProvider>
          <ClientProvider>
            <DocumentsProvider>
              <ProjectsProvider>
                <TasksProvider>
                  <DashboardProvider>
                    <App />
                  </DashboardProvider>
                </TasksProvider>
              </ProjectsProvider>
            </DocumentsProvider>
          </ClientProvider>
        </PMODataProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
