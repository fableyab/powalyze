import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ProjectsProvider } from './contexts/ProjectsContext';
import { DocumentsProvider } from './contexts/DocumentsContext';
import { ClientsProvider } from './contexts/ClientsContext';
import { TasksProvider } from './contexts/TasksContext';
import { initializeDemoData } from './utils/demo-data';
import App from './App';
import './index.css';

// Initialiser les données de démonstration au premier chargement
initializeDemoData();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ClientsProvider>
        <ProjectsProvider>
          <DocumentsProvider>
            <TasksProvider>
              <App />
            </TasksProvider>
          </DocumentsProvider>
        </ProjectsProvider>
      </ClientsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
