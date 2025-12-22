/**
 * GLOBAL PROVIDERS
 * Centralise tous les providers de l'app
 */

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { WorkspaceProvider } from '@/features/workspace/context/WorkspaceContext';
import { NotificationProvider } from '@/shared/components/feedback/NotificationProvider';

export function AppProviders({ children }) {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <WorkspaceProvider>
          {children}
        </WorkspaceProvider>
      </NotificationProvider>
    </BrowserRouter>
  );
}
