import React from 'react';
import { FiActivity, FiEdit, FiTrash } from 'react-icons/fi';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const AdminAuditPage = () => {
  const auditLogs = [
    { id: 1, user: 'Marie Dubois', action: 'create', target: 'Projet Migration Azure', timestamp: '2025-12-23 14:32:18' },
    { id: 2, user: 'Thomas Martin', action: 'edit', target: 'Budget E-commerce B2B', timestamp: '2025-12-23 12:15:42' },
    { id: 3, user: 'Sophie Laurent', action: 'delete', target: 'Document V1.pdf', timestamp: '2025-12-23 09:48:25' },
    { id: 4, user: 'Lucas Bernard', action: 'create', target: 'Tâche Design Mobile', timestamp: '2025-12-22 16:22:33' },
  ];

  const getActionIcon = (action) => {
    switch (action) {
      case 'create': return <FiActivity className="text-green-400" size={20} />;
      case 'edit': return <FiEdit className="text-yellow-400" size={20} />;
      case 'delete': return <FiTrash className="text-red-400" size={20} />;
      default: return <FiActivity className="text-gray-400" size={20} />;
    }
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Journal d'Audit</h1>
        <p className="text-gray-400">Traçabilité complète des actions</p>
      </div>

      <Card className="bg-[#111] border-white/10">
        <div className="divide-y divide-white/10">
          {auditLogs.map((log) => (
            <div key={log.id} className="p-6 hover:bg-white/5 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  {getActionIcon(log.action)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-medium text-white">{log.user}</span>
                    <Badge className="bg-white/10 text-gray-400 border-white/20">{log.action}</Badge>
                  </div>
                  <p className="text-sm text-gray-400 mb-1">{log.target}</p>
                  <p className="text-xs text-gray-500">{log.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AdminAuditPage;