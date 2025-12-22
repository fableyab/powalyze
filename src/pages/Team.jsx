import React from 'react';
import PageHeader from '../components/common/PageHeader';
import { team, projects } from '../data/demoData';
import { Mail, Briefcase, UserPlus } from 'lucide-react';

const Team = () => {
  const getProjectNames = (projectIds) => {
    return projects
      .filter(p => projectIds.includes(p.id))
      .map(p => p.name);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Équipe"
        subtitle={`${team.length} membres actifs dans le portefeuille`}
        action={
          <button className="btn-primary flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            Ajouter un membre
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map(member => (
          <div 
            key={member.id}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            {/* Avatar */}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <Briefcase className="w-4 h-4" />
                  {member.role}
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="mb-4 pb-4 border-b border-gray-200">
              <a 
                href={`mailto:${member.email}`}
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                {member.email}
              </a>
            </div>

            {/* Projects */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Projets assignés ({member.projectsIds.length})
              </p>
              <div className="space-y-1">
                {getProjectNames(member.projectsIds).map((projectName, index) => (
                  <p key={index} className="text-sm text-gray-700">{projectName}</p>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Compétences
              </p>
              <div className="flex flex-wrap gap-2">
                {member.skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
