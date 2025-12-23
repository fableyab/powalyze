import React from 'react';
import { FiMail, FiPhone, FiMapPin, FiShield } from 'react-icons/fi';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';

const EquipePage = () => {
  const team = [
    { id: 1, name: 'Marie Dubois', role: 'Chef de Projet', email: 'marie.dubois@powalyze.com', phone: '+41 78 123 45 67', projects: 3, isAdmin: true },
    { id: 2, name: 'Thomas Martin', role: 'Développeur Senior', email: 'thomas.martin@powalyze.com', phone: '+41 78 234 56 78', projects: 2, isAdmin: false },
    { id: 3, name: 'Sophie Laurent', role: 'Product Owner', email: 'sophie.laurent@powalyze.com', phone: '+41 78 345 67 89', projects: 4, isAdmin: false },
    { id: 4, name: 'Lucas Bernard', role: 'Designer UX/UI', email: 'lucas.bernard@powalyze.com', phone: '+41 78 456 78 90', projects: 2, isAdmin: false },
    { id: 5, name: 'Emma Petit', role: 'Analyste Data', email: 'emma.petit@powalyze.com', phone: '+41 78 567 89 01', projects: 3, isAdmin: false },
    { id: 6, name: 'Hugo Moreau', role: 'DevOps Engineer', email: 'hugo.moreau@powalyze.com', phone: '+41 78 678 90 12', projects: 5, isAdmin: true },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Équipe</h1>
        <p className="text-gray-400">Gestion des membres et collaborateurs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[#111] border-white/10 p-6">
          <div className="text-3xl font-bold text-white mb-1">{team.length}</div>
          <div className="text-sm text-gray-400">Membres</div>
        </Card>
        <Card className="bg-[#111] border-white/10 p-6">
          <div className="text-3xl font-bold text-white mb-1">{team.filter(m => m.isAdmin).length}</div>
          <div className="text-sm text-gray-400">Admins</div>
        </Card>
        <Card className="bg-[#111] border-white/10 p-6">
          <div className="text-3xl font-bold text-white mb-1">{team.reduce((sum, m) => sum + m.projects, 0)}</div>
          <div className="text-sm text-gray-400">Projets Assignés</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map(member => (
          <Card key={member.id} className="bg-[#111] border-white/10 p-6 hover:border-[#BFA76A]/50 transition-all">
            <div className="flex items-start gap-4 mb-4">
              <Avatar size="lg">{member.name}</Avatar>
              <div className="flex-1">
                <h3 className="font-bold text-white mb-1">{member.name}</h3>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50 text-xs">{member.role}</Badge>
                {member.isAdmin && (
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/50 text-xs ml-2">
                    <FiShield size={10} className="mr-1" />
                    Admin
                  </Badge>
                )}
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <FiMail size={14} />
                <span className="truncate">{member.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <FiPhone size={14} />
                <span>{member.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <FiMapPin size={14} />
                <span>{member.projects} projet(s)</span>
              </div>
            </div>
            <button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-2 rounded-lg text-sm transition-all">
              Voir Profil
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EquipePage;