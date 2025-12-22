/**
 * SETTINGS PAGE PLACEHOLDER
 */

import React from 'react';
import { Settings } from 'lucide-react';
import { EmptyState } from '@/shared/components/ui/EmptyState';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Paramètres</h1>
        <p className="text-gray-400">Configuration du cockpit</p>
      </div>

      <EmptyState
        icon={Settings}
        title="Page Paramètres"
        description="Cette page est en cours de développement"
      />
    </div>
  );
}
