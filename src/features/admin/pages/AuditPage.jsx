import React from 'react';
import { Card } from '@/shared/components/ui/Card';
import { Badge } from '@/shared/components/ui/Badge';
import { FiActivity, FiUser, FiEdit, FiTrash } from 'react-icons/fi';

const AuditPage = () => {
  const auditLogs = [
    { id: 1, user: 'Jean Dupont', action: 'Création projet', target: 'Migration Azure', timestamp: '2025-12-23 14:32', type: 'create' },
    { id: 2, user: 'Marie Martin', action: 'Modification tâche', target: 'Setup CI/CD', timestamp: '2025-12-23 13:15', type: 'edit' },
    { id: 3, user: 'Admin System', action: 'Suppression document', target: 'Old Charter.pdf', timestamp: '2025-12-23 12:08', type: 'delete' },
    { id: 4, user: 'Sophie Bernard', action: 'Ajout membre équipe', target: 'Lucas Petit', timestamp: '2025-12-23 11:45', type: 'create' },
  ];

  const getIcon = (type) => {
    if (type === 'create') return <FiActivity className="text-green-500" />;
    if (type === 'edit') return <FiEdit className="text-yellow-500" />;
    return <FiTrash className="text-red-500" />;
  };

  return (
    <div className="p-8 bg-neutral-975 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Audit & Logs</h1>
        <p className="text-gray-400">Historique des actions utilisateurs</p>
      </div>
      <Card className="bg-neutral-950 border-white/10">
        <div className="divide-y divide-white/10">
          {auditLogs.map(log => (
            <div key={log.id} className="p-6 hover:bg-white/5 transition-colors">
              <div className="flex items-start gap-4">
                <div className="mt-1">{getIcon(log.type)}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <FiUser className="text-gray-400" size={14} />
                    <span className="text-white font-semibold">{log.user}</span>
                    <Badge variant="outline" size="sm">{log.action}</Badge>
                  </div>
                  <p className="text-gray-400 text-sm mb-1">Cible: <span className="text-white">{log.target}</span></p>
                  <p className="text-gray-500 text-xs">{log.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AuditPage;
