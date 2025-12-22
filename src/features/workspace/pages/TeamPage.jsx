/**
 * TEAM PAGE PLACEHOLDER
 */

import React from 'react';
import { Users } from 'lucide-react';
import { EmptyState } from '@/shared/components/ui/EmptyState';

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Équipe</h1>
        <p className="text-gray-400">Gestion de l'équipe projet</p>
      </div>

      <EmptyState
        icon={Users}
        title="Page Équipe"
        description="Cette page est en cours de développement"
      />
    </div>
  );
}
