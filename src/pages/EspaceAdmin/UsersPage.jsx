import React from 'react';
import { FiMail, FiShield, FiEdit } from 'react-icons/fi';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';

const AdminUsersPage = () => {
  const users = [
    { id: 1, name: 'Marie Dubois', email: 'marie.dubois@powalyze.com', role: 'Chef de Projet', isAdmin: true },
    { id: 2, name: 'Thomas Martin', email: 'thomas.martin@powalyze.com', role: 'Développeur', isAdmin: false },
    { id: 3, name: 'Sophie Laurent', email: 'sophie.laurent@powalyze.com', role: 'Product Owner', isAdmin: false },
    { id: 4, name: 'Lucas Bernard', email: 'lucas.bernard@powalyze.com', role: 'Designer UX', isAdmin: false },
    { id: 5, name: 'Emma Petit', email: 'emma.petit@powalyze.com', role: 'Analyste Data', isAdmin: false },
    { id: 6, name: 'Hugo Moreau', email: 'hugo.moreau@powalyze.com', role: 'DevOps', isAdmin: true },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Utilisateurs</h1>
        <p className="text-gray-400">Gestion des membres et permissions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <Card key={user.id} className="bg-[#111] border-white/10 p-6">
            <div className="flex items-start gap-4">
              <Avatar size="lg">{user.name}</Avatar>
              <div className="flex-1">
                <h3 className="font-bold text-white mb-1">{user.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                  <FiMail size={14} />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">{user.role}</Badge>
                  {user.isAdmin && (
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/50">
                      <FiShield size={12} className="mr-1" />
                      Admin
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <button className="mt-4 w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-2 rounded-lg transition-all">
              <FiEdit size={16} />
              Modifier
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminUsersPage;