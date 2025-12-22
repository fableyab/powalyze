import React from 'react';
import { Card } from '@/shared/components/ui/Card';
import { Badge } from '@/shared/components/ui/Badge';
import { Avatar } from '@/shared/components/ui/Avatar';
import { Button } from '@/shared/components/ui/Button';
import { useWorkspace } from '@/features/workspace/context/WorkspaceContext';
import { FiMail, FiShield, FiEdit } from 'react-icons/fi';

const UsersPage = () => {
  const { state } = useWorkspace();

  return (
    <div className="p-8 bg-neutral-975 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Utilisateurs</h1>
        <p className="text-gray-400">Gestion des membres et permissions</p>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {state.team.map(member => (
          <Card key={member.id} className="bg-neutral-950 border-white/10 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar name={member.name} size="lg" />
                <div>
                  <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <FiMail className="text-gray-400" size={14} />
                    <span className="text-gray-400 text-sm">{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline">{member.role}</Badge>
                    <Badge variant="secondary"><FiShield size={12} className="mr-1" />Admin</Badge>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" icon={<FiEdit />}>Éditer</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;
