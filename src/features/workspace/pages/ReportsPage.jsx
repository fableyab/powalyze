/**
 * REPORTS PAGE PLACEHOLDER
 */

import React from 'react';
import { BarChart3 } from 'lucide-react';
import { EmptyState } from '@/shared/components/ui/EmptyState';

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Rapports</h1>
        <p className="text-gray-400">Tableaux de bord et analytics</p>
      </div>

      <EmptyState
        icon={BarChart3}
        title="Page Rapports"
        description="Cette page est en cours de développement"
      />
    </div>
  );
}
