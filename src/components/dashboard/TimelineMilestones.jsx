import React from 'react';
import { projects } from '../../data/demoData';
import { Calendar, CheckCircle, Clock, Circle } from 'lucide-react';

const TimelineMilestones = () => {
  const allMilestones = projects.flatMap(p => 
    p.milestones.map(m => ({ ...m, projectName: p.name, projectColor: getProjectColor(p.id) }))
  ).sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 8);

  function getProjectColor(id) {
    const colors = ['blue', 'purple', 'green', 'amber', 'red'];
    return colors[(id - 1) % colors.length];
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-blue-600" />;
      case 'overdue': return <Circle className="w-4 h-4 text-red-600" />;
      default: return <Circle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'border-green-500 bg-green-50';
      case 'in-progress': return 'border-blue-500 bg-blue-50';
      case 'overdue': return 'border-red-500 bg-red-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Calendar className="w-5 h-5" />
        Timeline des Jalons
      </h3>
      
      <div className="space-y-4">
        {allMilestones.map((milestone) => (
          <div 
            key={milestone.id}
            className={`flex items-center gap-4 p-4 rounded-lg border-l-4 ${getStatusColor(milestone.status)} transition-all hover:shadow-md`}
          >
            <div className="flex-shrink-0">
              {getStatusIcon(milestone.status)}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">{milestone.title}</p>
              <p className="text-sm text-gray-600">{milestone.projectName}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {new Date(milestone.date).toLocaleDateString('fr-CH')}
              </p>
              <p className="text-xs text-gray-500 capitalize">{milestone.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineMilestones;
