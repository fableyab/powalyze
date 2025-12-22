/**
 * TASKS PAGE PLACEHOLDER
 */

import React from 'react';
import { CheckSquare } from 'lucide-react';
import { EmptyState } from '@/shared/components/ui/EmptyState';

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Tâches</h1>
        <p className="text-gray-400">Gestion des tâches du cockpit</p>
      </div>

      <EmptyState
        icon={CheckSquare}
        title="Page Tâches"
        description="Cette page est en cours de développement"
      />
    </div>
  );
}
